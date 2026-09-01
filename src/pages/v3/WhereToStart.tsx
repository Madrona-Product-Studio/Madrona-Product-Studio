import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import MadronaLogo from "../lab/MadronaLogo";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { track } from "../../lib/analytics";
import {
  openerChips,
  chipShort,
  buildSequence,
  computeOpportunityReport,
  buildLiveState,
  buildProgress,
  AREA_LABELS,
  type ChipId,
  type OpportunityAnswers,
  type OppQuestion,
} from "./opportunityEngine";
import { OpportunityReport, OpportunityReportAssembling } from "./OpportunityReport";
import "../lab/signal-assessment.css";
import "./v3.css";
import "./where-to-start.css";
import "./opportunity-report.css";

// AI Opportunity Assessment — reworked from whereToStartEngine to opportunityEngine
// (docs/redesign-2026-08/ai-opportunity-spec.md). Frame is unchanged; engine + report swap.
type Stage = { kind: "opener" } | { kind: "question"; index: number } | { kind: "result" };

const RAIL_PHASES = ["Sounds like you", "Follow-ups", "Your read"];

// Area module labels for the flag seam (derived from flagged chips).
function flagSeamAreas(chips: ChipId[]): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const chip of openerChips) {
    if (chips.includes(chip.chip) && !seen.has(chip.area)) {
      seen.add(chip.area);
      out.push(AREA_LABELS[chip.area]);
    }
  }
  return out.join(", ");
}

// A small madrona frond for the agent avatar (inline path, no webfont).
function AgentMark({ className }: { className?: string }) {
  return (
    <span className={`wts-mark${className ? ` ${className}` : ""}`} aria-hidden="true">
      <svg viewBox="0 0 20 20">
        <path d="M10 16V5" />
        <path d="M10 9.6C10 7.6 11.9 6 14.2 6" />
        <path d="M10 12.4C10 10.6 11.6 9.2 13.6 9.2" />
      </svg>
    </span>
  );
}

function AgentBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="wts-agent">
      <AgentMark />
      <div className="wts-agent-bubble">{children}</div>
    </div>
  );
}

export default function WhereToStart() {
  useCalEmbed();
  const [stage, setStage] = useState<Stage>({ kind: "opener" });
  const [chips, setChips] = useState<ChipId[]>([]);
  const [answers, setAnswers] = useState<OpportunityAnswers>({ chips: [] });
  const [otherText, setOtherText] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const islandRef = useRef<HTMLElement>(null);

  const sequence = useMemo(() => buildSequence(chips), [chips]);
  const showResult = stage.kind === "result";
  const question: OppQuestion | null = stage.kind === "question" ? sequence[stage.index] : null;

  // The right pane tracks chip selections live (chips state runs ahead of
  // answers.chips until Continue), then answers as they land.
  const liveAnswers = useMemo(
    () => ({ ...answers, chips, otherText: otherText || undefined }),
    [answers, chips, otherText],
  );
  const liveState = useMemo(() => buildLiveState(liveAnswers), [liveAnswers]);
  const progress = useMemo(() => buildProgress(liveAnswers), [liveAnswers]);

  const firstStage = useRef(true);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    // Keep the active question anchored near the top of its (internally
    // scrolling) column as the chat history grows above it, so answering
    // never pushes the current beat below the fold. Column scroll only; the
    // report pane stays pinned. Reduced-motion jumps instead of animating.
    // Skipped on first mount so the opener greeting isn't clipped off-top.
    if (firstStage.current) { firstStage.current = false; return; }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    islandRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }, [stage]);

  const toggleChip = (id: ChipId) =>
    setChips((current) =>
      current.includes(id) ? current.filter((c) => c !== id) : [...current, id],
    );

  const begin = useCallback(() => {
    setAnswers({ chips, otherText: otherText.trim() || undefined });
    setStage({ kind: "question", index: 0 });
    track("wts_start", { threads: chips.join(",") });
  }, [chips, otherText]);

  const answered = (q: OppQuestion | null): boolean =>
    !!q && answers[q.id] !== undefined;

  const advance = useCallback(() => {
    if (stage.kind !== "question" || !answered(sequence[stage.index])) return;
    track("wts_question", { question: stage.index + 1, question_id: sequence[stage.index].id });
    if (stage.index === sequence.length - 1) {
      setStage({ kind: "result" });
      track("wts_complete", { threads: chips.join(",") });
    } else {
      setStage({ kind: "question", index: stage.index + 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, sequence, answers, chips]);

  const back = useCallback(() => {
    if (stage.kind !== "question") return;
    if (stage.index === 0) setStage({ kind: "opener" });
    else setStage({ kind: "question", index: stage.index - 1 });
  }, [stage]);

  const retake = useCallback(() => {
    setChips([]);
    setAnswers({ chips: [] });
    setOtherText("");
    setStage({ kind: "opener" });
    track("wts_retake");
  }, []);

  // Keyboard: numbers select, Enter continues; stay out of the way of typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) {
        if (e.key === "Enter") { e.preventDefault(); advance(); }
        return;
      }
      if (stage.kind === "opener") {
        const n = Number(e.key);
        if (n >= 1 && n <= openerChips.length) toggleChip(openerChips[n - 1].chip);
        if (e.key === "Enter" && chips.length) begin();
        return;
      }
      if (stage.kind === "question" && question) {
        const n = Number(e.key);
        if (n >= 1 && n <= question.options.length) setAnswers((a) => ({ ...a, [question.id]: n - 1 }));
        if (e.key === "Enter") { e.preventDefault(); advance(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, question, chips, begin, advance]);

  const activePhase = stage.kind === "opener" ? 0 : stage.kind === "question" ? 1 : 2;

  return <div className={`sa wts-sa${showResult ? " sa--result" : ""}${stage.kind === "opener" ? " sa--intro" : ""}`}>
    <LabMeta title="AI Opportunity Assessment · a free 2-minute read · Madrona Product Studio" />
    <div className="sa-shell">
      <header className="sa-top">
        <span className="sa-top-title-wrap">
          <Link to="/" className="sa-wordmark" aria-label="Madrona Product Studio home">
            <MadronaLogo variant="horizontal-reversed" decorative />
          </Link>
          <span className="sa-top-title">AI opportunity assessment</span>
        </span>
        {showResult ? (
          <p className="sa-complete">
            <i aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 5.2 4.2 7.4 8 3" /></svg></i>
            Read complete
          </p>
        ) : (
          <nav className="sa-phases" aria-label="Progress">
            {RAIL_PHASES.map((title, i) => {
              const done = i < activePhase;
              return <span key={title} className={`sa-phase${i === activePhase ? " is-active" : ""}${done ? " is-done" : ""}`}>
                <i aria-hidden="true">{done && <svg viewBox="0 0 10 10"><path d="M2 5.2 4.2 7.4 8 3" /></svg>}</i>
                {title}
              </span>;
            })}
          </nav>
        )}
      </header>

      <div className="sa-body">
        <main className="sa-work wts-work">
          {!showResult && (
            <div className="wts-stream">
              {/* Chat history: the opener turn + every answered follow-up so far. */}
              {stage.kind === "question" && (
                <>
                  <AgentBubble>Where does your week actually go?</AgentBubble>
                  <div className="wts-you">
                    <div className="wts-you-chips">
                      {answers.chips.map((c) => (
                        <span key={c} className="wts-you-chip">{chipShort[c]}</span>
                      ))}
                    </div>
                  </div>
                  <div className="wts-seam">
                    <span className="wts-seam-check" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                    <p><b>Flagged.</b> {flagSeamAreas(answers.chips)}. We only ask about these, then hand you a read you keep either way.</p>
                  </div>
                  {sequence.slice(0, stage.index).map((q) => answers[q.id] !== undefined && (
                    <Fragment key={q.id}>
                      <AgentBubble>{q.question}</AgentBubble>
                      <div className="wts-you"><div className="wts-you-bubble">{q.options[answers[q.id] as number]}</div></div>
                    </Fragment>
                  ))}
                </>
              )}

              {/* The active beat, as a cream light-island (canon: frames are
                  light islands in dark skies). */}
              {stage.kind === "opener" && (
                <>
                  <AgentBubble>Answer a few taps and I'll assemble your read as we go. Nothing's required. It's yours to keep either way.</AgentBubble>
                  <section ref={islandRef} className="sa-question sa-enter wts-island" aria-labelledby="wts-q">
                    <div className="wts-island-head">
                      <AgentMark className="wts-mark--island" />
                      <div>
                        <p className="sa-count"><em>AI opportunity assessment</em><span aria-hidden="true"> · </span>Check all that apply</p>
                        <h1 id="wts-q" ref={headingRef} tabIndex={-1}>Where does your week actually go?</h1>
                        <p className="sa-support">Tap everything that eats real time. We only ask about what you flag, then hand you a read you keep either way.</p>
                      </div>
                    </div>
                    <div className="sa-answers" role="group" aria-labelledby="wts-q">
                      {openerChips.map((item, i) => {
                        const selected = chips.includes(item.chip);
                        return <button key={item.chip} role="checkbox" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => toggleChip(item.chip)}>
                          <span className="sa-answer-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                          <span className="sa-answer-label">{item.label}</span>
                          <span className="sa-answer-mark" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                        </button>;
                      })}
                    </div>
                    <label className="wts-freetext">
                      <span>+ what else eats your week</span>
                      <input
                        type="text"
                        maxLength={200}
                        placeholder="Anything else worth flagging…"
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                      />
                    </label>
                    <div className="sa-nav">
                      <p className="sa-meta">About two minutes. No email required.</p>
                      <button className="sa-primary" disabled={!chips.length} onClick={begin}>Continue <span aria-hidden="true">→</span></button>
                    </div>
                  </section>
                </>
              )}

              {question && stage.kind === "question" && (
                <section ref={islandRef} key={stage.index} className="sa-question sa-enter wts-island" aria-labelledby="wts-q">
                  <div className="wts-island-head">
                    <AgentMark className="wts-mark--island" />
                    <div>
                      <p className="sa-count"><em>{question.module}</em><span aria-hidden="true"> · </span>Question {String(stage.index + 1).padStart(2, "0")} / {String(sequence.length).padStart(2, "0")}</p>
                      <h1 id="wts-q" ref={headingRef} tabIndex={-1}>{question.question}</h1>
                      {question.support && <p className="sa-support">{question.support}</p>}
                    </div>
                  </div>
                  <div className="sa-answers" role="radiogroup" aria-labelledby="wts-q">
                    {question.options.map((option, i) => {
                      const selected = answers[question.id] === i;
                      return <button key={option} role="radio" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => setAnswers((a) => ({ ...a, [question.id]: i }))}>
                        <span className="sa-answer-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                        <span className="sa-answer-label">{option}</span>
                        <span className="sa-answer-mark" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                      </button>;
                    })}
                  </div>
                  <div className="sa-nav">
                    <button className="sa-back" onClick={back}>← Back</button>
                    <button className="sa-primary" disabled={!answered(question)} onClick={advance}>Continue <span aria-hidden="true">→</span></button>
                  </div>
                </section>
              )}
            </div>
          )}

          {showResult && <ResultStage answers={answers} onRetake={retake} />}
        </main>

        {/* The report, assembling: area rows wake to "Listening" as chips are
            flagged, statuses stamp in as answers land, and at the end the
            OpportunityReport resolves into the finished card. */}
        <aside className="sa-brain" aria-label="Your report, assembling as you answer">
          <header className="sa-brain-head">
            <p className={`sa-live${showResult ? " sa-live--resolved" : ""}`}>{showResult ? <>Your report</> : <><i aria-hidden="true" /> Live report</>}</p>
            <p className="sa-brain-sub">{showResult ? "Built from your answers." : "Assembles as you answer."}</p>
          </header>
          <div className="sa-brain-canvas wts-pane-canvas">
            <div className={`v3 wts-card wts-card--pane${showResult ? " wts-card--reveal" : ""}`}>
              {showResult
                ? <OpportunityReport data={computeOpportunityReport(answers)} />
                : <OpportunityReportAssembling live={liveState} />}
            </div>
          </div>
          {!showResult && (
            <footer className="sa-brain-foot" aria-live="polite">
              {progress.flaggedTotal
                ? `${progress.read} of ${progress.flaggedTotal} flagged areas read.`
                : "Check what eats your week and the report starts filling in."}
            </footer>
          )}
        </aside>
      </div>

      <footer className="sa-site-foot">
        <p>A free read from Madrona Product Studio, Bellingham, Washington</p>
        <nav aria-label="Madrona site">
          <Link to="/">madronaproduct.com</Link>
          <Link to="/services">How we help</Link>
          <Link to="/connect">Get in touch</Link>
        </nav>
      </footer>
    </div>
  </div>;
}

function ResultStage({ answers, onRetake }: { answers: OpportunityAnswers; onRetake: () => void }) {
  const report = useMemo(() => computeOpportunityReport(answers), [answers]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  // The finished report lives in the right pane (it's the resolved state of
  // the assembling card); this column carries only the verdict and the ask.
  // The card owns its own content (critic pass 09-01: never print the
  // report twice).
  return <section className="sa-result sa-enter" aria-labelledby="wts-r">
    <p className="sa-eyebrow">Your read</p>
    <h1 id="wts-r" ref={headingRef} tabIndex={-1}>{report.title ?? "Where to start."}</h1>
    <p className="sa-interpretation">{report.overall.note} The full read is yours to keep.</p>
    <a className="sa-primary sa-primary--wide" href={bookHref()} {...bookProps()} onClick={(event) => { track("wts_cta_click"); bookClick(event); }}>
      Talk through this read <span aria-hidden="true">→</span>
    </a>
    <p className="sa-cta-fine">A free 30-minute conversation.</p>
    <div className="sa-retake-links wts-retake">
      <button className="sa-back" onClick={onRetake}>Retake</button>
      <Link className="sa-quiet-link" to="/services">Learn how we work</Link>
    </div>
  </section>;
}
