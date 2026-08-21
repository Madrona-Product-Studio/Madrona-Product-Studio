import { useEffect, useRef, useState, type ReactNode } from "react";

/* =========================================================================
   Agent console engine

   A scripted "watch it work" console, driven by a ConsoleScript. Every agent
   demo in the gallery composes one of these instead of hand-rolling its own
   state machine, so the interaction — run, step, stop-for-the-human, resume,
   reveal artifacts, done — stays identical everywhere. The human-approval
   gate is the load-bearing beat: nothing past it happens without the owner.
   Styling lives in agent-demo.css (agentx-* classes).
   ========================================================================= */

export type GateItem = {
  primary: string;              // bold lead (an amount, a customer, an invoice #)
  meta: string;                 // secondary line (date, days overdue, channel)
  issue: string;                // the context — what's ambiguous or being proposed
  suggest: string;              // the agent's drafted action / suggested fix
  approveLabel?: string;        // button label (default "Approve")
  manual?: boolean;             // true → no button; this one is always the owner's to do
  manualNote?: string;          // shown in place of the button when manual
};

export type Phase =
  | {
      kind: "auto";
      running: string;
      done: string;
      ms?: number;
      artifact?: ReactNode;     // revealed when this phase completes
    }
  | {
      kind: "gate";
      running: string;          // label while awaiting the owner
      done: string;             // label once approved
      head: string;
      items: GateItem[];
      approveAllLabel: string;
      continueLabel: string;
    };

export type ConsoleScript = {
  title: string;                // console bar title, e.g. "Berry Good · books"
  command: string;              // e.g. "/close-month"
  meta?: string;                // e.g. "August 2026"
  runLabel: string;
  runHint: string;
  phases: Phase[];
  doneNote: ReactNode;
};

const DEFAULT_MS = 1200;

function Spinner() { return <span className="agentx-spin" aria-hidden="true" />; }
function Check() {
  return (
    <span className="agentx-check" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L19 7" /></svg>
    </span>
  );
}

export function AgentConsole({ script }: { script: ConsoleScript }) {
  const { phases } = script;
  const gateIndex = phases.findIndex((p) => p.kind === "gate");

  // step: how many phases have started. 0 = idle. step === i+1 → phases[i] is
  // current; earlier phases are done. gate = paused at the gate for the owner.
  const [step, setStep] = useState(0);
  const [gate, setGate] = useState(false);
  const [approved, setApproved] = useState<boolean[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const started = step > 0;
  const done = step > phases.length;

  // Only non-manual gate items must be approved before the owner can continue.
  const gatePhase = gateIndex >= 0 ? (phases[gateIndex] as Extract<Phase, { kind: "gate" }>) : null;
  const requiredIdx = gatePhase ? gatePhase.items.map((it, i) => (it.manual ? -1 : i)).filter((i) => i >= 0) : [];
  const allApproved = requiredIdx.every((i) => approved[i]);

  function schedule(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }

  function advance(next: number) {
    setStep(next);
    const phase = phases[next - 1];
    if (!phase) return;
    if (phase.kind === "gate") { setGate(true); return; }
    schedule(() => advance(next + 1), phase.ms ?? DEFAULT_MS);
  }

  function run() {
    if (started) return;
    setGate(false);
    setApproved(gatePhase ? gatePhase.items.map(() => false) : []);
    advance(1);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    setGate(false);
    setApproved(gatePhase ? gatePhase.items.map(() => false) : []);
  }

  function approveAll() {
    if (!gatePhase) return;
    setApproved(gatePhase.items.map((it) => !it.manual));
    setGate(false);
    schedule(() => advance(gateIndex + 2), 500); // resume after the gate phase
  }

  function toggleApprove(i: number) {
    setApproved((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  }

  function statusOf(pos: number): "pending" | "running" | "done" {
    if (step > pos) return "done";
    if (step === pos) return "running";
    return "pending";
  }

  return (
    <div className="agentx-console" aria-label="Agent demo console">
      <div className="agentx-console-bar">
        <span className="agentx-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="agentx-console-title">{script.title}</span>
        <span className="agentx-console-badge">{done ? "Complete" : started ? "Running" : "Ready"}</span>
      </div>

      <div className="agentx-console-body">
        <div className="agentx-prompt">
          <span className="agentx-caret" aria-hidden="true">&rsaquo;</span>
          <code>{script.command}</code>
          {script.meta && <span className="agentx-prompt-month">{script.meta}</span>}
        </div>

        {!started && (
          <div className="agentx-runrow">
            <button type="button" className="m2-button agentx-run" onClick={run}>{script.runLabel}</button>
            <span className="agentx-runhint">{script.runHint}</span>
          </div>
        )}

        {started && (
          <ol className="agentx-steps">
            {phases.map((phase, i) => {
              const pos = i + 1;
              const status = statusOf(pos);
              if (status === "pending") return null;
              const isGate = phase.kind === "gate" && step === pos && gate;
              return (
                <li key={i} className={`agentx-step is-${status}`} data-reveal>
                  <span className="agentx-step-icon">{status === "done" ? <Check /> : <Spinner />}</span>
                  <div className="agentx-step-body">
                    <span className="agentx-step-label">{status === "done" ? phase.done : phase.running}</span>

                    {isGate && phase.kind === "gate" && (
                      <div className="agentx-gate">
                        <p className="agentx-gate-head">{phase.head}</p>
                        <ul className="agentx-mismatches">
                          {phase.items.map((it, mi) => (
                            <li key={mi} className={approved[mi] ? "is-approved" : it.manual ? "is-manual" : ""}>
                              <div className="agentx-mm-top">
                                <span className="agentx-mm-amount">{it.primary}</span>
                                <span className="agentx-mm-when">{it.meta}</span>
                                {approved[mi] && <span className="agentx-mm-tag">Approved</span>}
                                {!approved[mi] && it.manual && <span className="agentx-mm-tag is-manual">Your call</span>}
                              </div>
                              <p className="agentx-mm-issue">{it.issue}</p>
                              <p className="agentx-mm-fix"><span aria-hidden="true">↳ </span>{it.suggest}</p>
                              {it.manual ? (
                                <p className="agentx-mm-note">{it.manualNote}</p>
                              ) : (
                                !approved[mi] && (
                                  <button type="button" className="agentx-mm-approve" onClick={() => toggleApprove(mi)}>
                                    {it.approveLabel ?? "Approve"}
                                  </button>
                                )
                              )}
                            </li>
                          ))}
                        </ul>
                        <button type="button" className="m2-button agentx-approve-all" onClick={approveAll}>
                          {allApproved ? phase.continueLabel : phase.approveAllLabel}
                        </button>
                      </div>
                    )}

                    {/* Artifact revealed once this auto phase has completed. */}
                    {phase.kind === "auto" && phase.artifact && status === "done" && (
                      <div className="agentx-step-artifact">{phase.artifact}</div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {done && (
          <div className="agentx-done" data-reveal>
            <p>{script.doneNote}</p>
            <button type="button" className="agentx-replay" onClick={reset}>↺ Run it again</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Artifact building blocks (compose inside a phase's `artifact`) ------ */

export function ArtifactCard({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <div className="agentx-artifact" data-reveal>
      <div className="agentx-artifact-head">
        <span className="agentx-artifact-kicker">{kicker}</span>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// A tidy checklist artifact (close packet, queued items, handled summary).
export function ArtifactList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="agentx-packet-list">
      {items.map((item, i) => (
        <li key={i}>
          <span className="agentx-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L19 7" /></svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

// A small labeled figures table (P&L rows, receivables, etc.). Last row bolds.
export function ArtifactRows({ rows, foot }: { rows: { label: string; value: string }[]; foot?: { label: string; value: string } }) {
  return (
    <dl className="agentx-pnl-rows">
      {rows.map((r) => (<div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>))}
      {foot && <div className="agentx-pnl-net"><dt>{foot.label}</dt><dd>{foot.value}</dd></div>}
    </dl>
  );
}
