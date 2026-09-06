import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  presetEvidence,
  pruneAnswers,
  isComplete,
  summarizeAnswers,
  AREA_LABELS,
  type ChipId,
  type OpportunityAnswers,
  type OpportunityReportData,
  type OppQuestion,
} from "./opportunityEngine";
import { encodeAnswers, decodeAnswers } from "./readLink";
import { suggestChips, bridgeHeard, type ChipSuggestion, type AssistStatus } from "../../assessment-ai/client";
import { OpportunityReport, OpportunityReportAssembling } from "./OpportunityReport";
import "../lab/signal-assessment.css";
import "./v3.css";
import "./where-to-start.css";
import "./opportunity-report.css";

// AI Opportunity Assessment (docs/redesign-2026-08/ai-opportunity-spec.md).
// The conversational frame; the engine (opportunityEngine.ts) owns every
// verdict. The result stage is addressable: `?r=` carries the answers, so a
// refresh or a pasted link lands on the same read (readLink.ts).
type Stage = { kind: "opener" } | { kind: "question"; index: number } | { kind: "result" };

const RAIL_PHASES = ["Sounds like you", "Follow-ups", "Your read"];
const VALID_CHIPS: readonly ChipId[] = openerChips.map(c => c.chip);

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

// Merge a new chip set into the answers: keep what's answered, drop the
// areas that are no longer flagged, and pre-check the evidence rows the
// newly flagged chips already answer (an area with one chip never gets the
// evidence question, so the preset is its answer).
function mergeChips(prev: OpportunityAnswers, chips: ChipId[], otherText: string | undefined): OpportunityAnswers {
  const next = pruneAnswers({ ...prev, chips, otherText });
  const added = chips.filter(c => !prev.chips.includes(c));
  const presetAll = presetEvidence(chips) as Record<string, number[]>;
  const presetNew = presetEvidence(added) as Record<string, number[]>;
  const rec = next as unknown as Record<string, number[] | undefined>;
  for (const key of Object.keys(presetAll)) {
    const current = rec[key];
    if (current === undefined) rec[key] = presetAll[key];
    else if (presetNew[key]) rec[key] = Array.from(new Set([...current, ...presetNew[key]])).sort((x, y) => x - y);
  }
  return next;
}

// The booking notes Cal.com prefills so Charlie sees the read with the
// click. Set as data-cal-notes (the embed hook reads it) and inside the
// data-cal-config JSON (Cal's own prefill key).
function buildCalNotes(report: OpportunityReportData, answers: OpportunityAnswers): string {
  const parts = [
    "AI opportunity assessment",
    report.title,
    `flagged: ${answers.chips.map(c => chipShort[c]).join(", ") || "nothing"}`,
  ];
  if (report.nowChip) parts.push(`now: ${report.moves[0].move.headline}`);
  if (answers.otherText?.trim()) parts.push(`in their words: ${answers.otherText.trim()}`);
  return parts.join(" · ");
}

function bookPropsWithNotes(notes: string): ReturnType<typeof bookProps> & { "data-cal-notes"?: string } {
  const props = bookProps();
  if (!Object.keys(props).length) return props;
  return { ...props, "data-cal-notes": notes };
}

function connectHref(report: OpportunityReportData, answers: OpportunityAnswers): string {
  const q = new URLSearchParams({ from: "ai-opportunities", read: report.title, chips: answers.chips.join(",") });
  if (report.nowChip) q.set("now", report.moves[0].move.headline);
  if (answers.otherText?.trim()) q.set("notes", answers.otherText.trim());
  return `/connect?${q.toString()}`;
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
  const [searchParams, setSearchParams] = useSearchParams();
  // A pasted or refreshed permalink restores the read at the result stage;
  // a partial code just prefills the opener.
  const restored = useRef(decodeAnswers(searchParams.get("r")));
  const restoredComplete = !!restored.current && isComplete(restored.current);
  const [stage, setStage] = useState<Stage>(restoredComplete ? { kind: "result" } : { kind: "opener" });
  const [chips, setChips] = useState<ChipId[]>(restored.current?.chips ?? []);
  const [answers, setAnswers] = useState<OpportunityAnswers>(restored.current ?? { chips: [] });
  const [otherText, setOtherText] = useState(restored.current?.otherText ?? "");
  const [assist, setAssist] = useState<{ status: AssistStatus | "pending" | "idle"; suggestions: ChipSuggestion[] }>({ status: "idle", suggestions: [] });
  const [bridge, setBridge] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const islandRef = useRef<HTMLElement>(null);

  // The sequence follows answers.chips, so history and sequence can't diverge.
  const sequence = useMemo(() => buildSequence(answers.chips), [answers.chips]);
  const showResult = stage.kind === "result";
  const question: OppQuestion | null = stage.kind === "question" ? sequence[stage.index] ?? null : null;

  // The right pane tracks chip selections live (chips state runs ahead of
  // answers.chips until Continue), then answers as they land.
  const liveAnswers = useMemo(
    () => ({ ...answers, chips, otherText: otherText || undefined }),
    [answers, chips, otherText],
  );
  const liveState = useMemo(() => buildLiveState(liveAnswers), [liveAnswers]);
  const progress = useMemo(() => buildProgress(liveAnswers), [liveAnswers]);

  // The report is computed once per answer set and shared by the card and
  // the rail. The permalink is the same answers, packed.
  const report = useMemo(() => (showResult ? computeOpportunityReport(answers) : null), [showResult, answers]);
  const code = useMemo(() => (showResult ? encodeAnswers(answers) : null), [showResult, answers]);
  const permalink = code ? `${window.location.origin}/ai-opportunities?r=${code}` : null;

  // Keep the URL honest: the result carries ?r=, every other stage doesn't.
  // replace, not push, so Back leaves the flow rather than stepping through it.
  useEffect(() => {
    const current = searchParams.get("r");
    if (code && current !== code) setSearchParams({ r: code }, { replace: true });
    else if (!code && current !== null) setSearchParams({}, { replace: true });
  }, [code, searchParams, setSearchParams]);

  // The grounded bridge under "What we heard": fired at the result, shown
  // only if it lands within 3 s, otherwise the rule lines stand alone.
  useEffect(() => {
    if (!report) return;
    setBridge(null);
    if (report.heard.length < 2) return;
    let live = true;
    bridgeHeard({ title: report.title, heard: report.heard, summary: summarizeAnswers(answers) }).then(({ status, paragraph }) => {
      if (!live) return;
      track("wts_ai_assist", { mode: "bridge", status });
      if (paragraph) setBridge(paragraph);
    });
    return () => { live = false; };
  }, [report, answers]);

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
    const text = otherText.trim() || undefined;
    setAnswers((a) => mergeChips(a, chips, text));
    setStage({ kind: "question", index: 0 });
    track("wts_start", { threads: chips.join(",") });
    // The free text becomes chip suggestions, never chips: the call runs in
    // the background and the visitor decides at the first question.
    if (text && assist.status === "idle") {
      setAssist({ status: "pending", suggestions: [] });
      suggestChips(text, chips, VALID_CHIPS).then(({ status, suggestions }) => {
        setAssist({ status, suggestions });
        track("wts_ai_assist", { mode: "chips", status, count: suggestions.length });
      });
    }
  }, [chips, otherText, assist.status]);

  // Adding a suggested chip mid-flow: it joins answers.chips (the sequence
  // follows), with its evidence row pre-checked like any other chip.
  const addSuggestedChip = useCallback((chip: ChipId) => {
    setChips((current) => (current.includes(chip) ? current : [...current, chip]));
    setAnswers((a) => (a.chips.includes(chip) ? a : mergeChips(a, [...a.chips, chip], a.otherText)));
    setAssist((s) => ({ ...s, suggestions: s.suggestions.filter((x) => x.chip !== chip) }));
    track("wts_ai_assist", { mode: "chips", status: "added", chip });
  }, []);

  const answered = (q: OppQuestion | null): boolean =>
    !!q && (q.multi
      ? ((answers[q.id] as number[] | undefined)?.length ?? 0) > 0
      : answers[q.id] !== undefined);

  // Single questions set the index; multi questions toggle it in an array.
  // An exclusive option ("mostly handled") clears the others and vice versa.
  const pick = useCallback((q: OppQuestion, i: number) => {
    setAnswers((a) => {
      if (!q.multi) return { ...a, [q.id]: i };
      const current = (a[q.id] as number[] | undefined) ?? [];
      let next: number[];
      if (current.includes(i)) next = current.filter((n) => n !== i);
      else if (q.exclusive === i) next = [i];
      else next = [...current.filter((n) => n !== q.exclusive), i];
      return { ...a, [q.id]: next.length ? next : undefined };
    });
  }, []);

  const goNext = useCallback((skipped: boolean) => {
    if (stage.kind !== "question") return;
    const q = sequence[stage.index];
    track("wts_question", { question: stage.index + 1, question_id: q.id, skipped });
    if (stage.index === sequence.length - 1) {
      const r = computeOpportunityReport(answers);
      setStage({ kind: "result" });
      track("wts_complete", { threads: answers.chips.join(","), title: r.title, area: r.dominantArea, now: r.nowChip ?? "none" });
    } else {
      setStage({ kind: "question", index: stage.index + 1 });
    }
  }, [stage, sequence, answers]);

  const advance = useCallback(() => {
    if (stage.kind !== "question" || !answered(sequence[stage.index])) return;
    goNext(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, sequence, answers, goNext]);

  // The closers can be skipped: the answer clears (so a stale pick from an
  // earlier pass can't linger) and the read simply says less.
  const skip = useCallback(() => {
    if (!question?.skippable) return;
    setAnswers((a) => ({ ...a, [question.id]: undefined }));
    goNext(true);
  }, [question, goNext]);

  const back = useCallback(() => {
    if (stage.kind !== "question") return;
    if (stage.index === 0) setStage({ kind: "opener" });
    else setStage({ kind: "question", index: stage.index - 1 });
  }, [stage]);

  const retake = useCallback(() => {
    setChips([]);
    setAnswers({ chips: [] });
    setOtherText("");
    setAssist({ status: "idle", suggestions: [] });
    setStage({ kind: "opener" });
    track("wts_retake");
  }, []);

  // Keyboard: digits pick, Enter continues; stays out of the way of typing,
  // of modifier chords, and of buttons (Enter on a focused button is a click).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (e.key === "Enter" && e.target.type !== "email") {
          e.preventDefault();
          if (stage.kind === "opener") { if (chips.length) begin(); }
          else advance();
        }
        return;
      }
      if (e.key === "Enter" && e.target instanceof HTMLButtonElement) return;
      const digit = /^[1-9]$/.test(e.key) ? Number(e.key) : 0;
      if (stage.kind === "opener") {
        if (digit && digit <= openerChips.length) toggleChip(openerChips[digit - 1].chip);
        if (e.key === "Enter" && chips.length) begin();
        return;
      }
      if (stage.kind === "question" && question) {
        if (digit && digit <= question.options.length) pick(question, digit - 1);
        if (e.key === "Enter") { e.preventDefault(); advance(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, question, chips, begin, advance, pick]);

  const activePhase = stage.kind === "opener" ? 0 : stage.kind === "question" ? 1 : 2;
  const pendingSuggestions = stage.kind === "question" && stage.index === 0
    ? assist.suggestions.filter((s) => !answers.chips.includes(s.chip))
    : [];

  return <div className={`sa wts-sa${showResult ? " sa--result" : ""}${stage.kind === "opener" ? " sa--intro" : ""}`}>
    <LabMeta title="AI Opportunity Assessment · a free read in a few minutes · Madrona Product Studio" />
    <div className="sa-shell">
      <header className="sa-top">
        <a className="m2-skip" href="#main">Skip to content</a>
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
              const active = i === activePhase;
              return <span key={title} className={`sa-phase${active ? " is-active" : ""}${done ? " is-done" : ""}`} aria-current={active ? "step" : undefined}>
                <i aria-hidden="true">{done && <svg viewBox="0 0 10 10"><path d="M2 5.2 4.2 7.4 8 3" /></svg>}</i>
                <span className="sa-phase-title">{title}<span className="sr-only">{done ? ", done" : active ? ", current" : ""}</span></span>
              </span>;
            })}
            {/* Phones collapse the phases to dots; this names the current one. */}
            <span className="sa-phase-now" aria-hidden="true">{activePhase + 1} of {RAIL_PHASES.length} · {RAIL_PHASES[activePhase]}</span>
          </nav>
        )}
      </header>

      <div className="sa-body">
        <main id="main" className="sa-work wts-work">
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
                  {sequence.slice(0, stage.index).map((q) => (
                    <Fragment key={q.id}>
                      <AgentBubble>{q.question}</AgentBubble>
                      {answers[q.id] === undefined ? (
                        <div className="wts-you"><div className="wts-you-bubble wts-you-bubble--skipped">Skipped</div></div>
                      ) : q.multi ? (
                        <div className="wts-you">
                          <div className="wts-you-chips">
                            {((answers[q.id] as number[]) ?? []).map((n) => (
                              <span key={n} className="wts-you-chip">{q.options[n]}</span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="wts-you"><div className="wts-you-bubble">{q.options[answers[q.id] as number]}</div></div>
                      )}
                    </Fragment>
                  ))}
                </>
              )}

              {/* The active beat, as a cream light-island (canon: frames are
                  light islands in dark skies). */}
              {stage.kind === "opener" && (
                <>
                  <AgentBubble>
                    <span className="wts-copy-desktop">Answer a few taps and I'll assemble your read as we go. The last three you can skip. It's yours to keep either way.</span>
                    <span className="wts-copy-mobile">Answer a few taps and I'll put your read together. The last three you can skip. It's yours to keep either way.</span>
                  </AgentBubble>
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
                      {openerChips.map((item) => {
                        const selected = chips.includes(item.chip);
                        return <button key={item.chip} type="button" role="checkbox" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => toggleChip(item.chip)}>
                          <span className="wts-ctl wts-ctl--check" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                          <span className="sa-answer-label">{item.label}</span>
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
                      <small>We'll suggest what it sounds like, and bring it up on the call.</small>
                    </label>
                    <div className="sa-nav">
                      <p className="sa-meta">A few minutes. No email required.</p>
                      <button className="sa-primary" disabled={!chips.length} onClick={begin}>Continue <span aria-hidden="true">→</span></button>
                    </div>
                    <p className="wts-keys" aria-hidden="true">1-9 to pick · Enter to continue</p>
                  </section>
                </>
              )}

              {question && stage.kind === "question" && (
                <section ref={islandRef} key={`${question.id}-${stage.index}`} className="sa-question sa-enter wts-island" aria-labelledby="wts-q">
                  <div className="wts-island-head">
                    <AgentMark className="wts-mark--island" />
                    <div>
                      <p className="sa-count"><em>{question.module}</em><span aria-hidden="true"> · </span>Question {String(stage.index + 1).padStart(2, "0")} / {String(sequence.length).padStart(2, "0")}{question.skippable && <span className="wts-optional"> · optional</span>}</p>
                      <h1 id="wts-q" ref={headingRef} tabIndex={-1}>{question.question}</h1>
                      {question.support && <p className="sa-support">{question.support}</p>}
                      <p className="wts-progress" aria-live="polite">
                        {progress.flaggedTotal ? `${progress.read} of ${progress.flaggedTotal} areas read` : ""}
                      </p>
                    </div>
                  </div>
                  {(assist.status === "pending" || pendingSuggestions.length > 0) && stage.index === 0 && (
                    <div className="wts-assist" aria-live="polite">
                      {assist.status === "pending" && !pendingSuggestions.length
                        ? <p className="wts-assist-line"><span className="wts-assist-dot" aria-hidden="true" /> Reading what you wrote…</p>
                        : pendingSuggestions.map((s) => (
                          <p key={s.chip} className="wts-assist-line">
                            <span>Sounds like: <b>{chipShort[s.chip]}</b>. Add it?</span>
                            <button type="button" className="wts-assist-add" onClick={() => addSuggestedChip(s.chip)}>Add</button>
                          </p>
                        ))}
                    </div>
                  )}
                  <div className="sa-answers" role="group" aria-labelledby="wts-q">
                    {question.options.map((option, i) => {
                      const selected = question.multi
                        ? ((answers[question.id] as number[] | undefined) ?? []).includes(i)
                        : answers[question.id] === i;
                      // Honest controls: multi rows are checkboxes; single
                      // rows are toggle buttons (aria-pressed), each a tab
                      // stop, no arrow-key contract to fake.
                      return <Fragment key={option}>
                        {question.exclusive === i && <span className="wts-or" aria-hidden="true">or</span>}
                        {question.multi
                          ? <button type="button" role="checkbox" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => pick(question, i)}>
                            <span className="wts-ctl wts-ctl--check" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                            <span className="sa-answer-label">{option}</span>
                          </button>
                          : <button type="button" aria-pressed={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => pick(question, i)}>
                            <span className="wts-ctl wts-ctl--radio" aria-hidden="true" />
                            <span className="sa-answer-label">{option}</span>
                          </button>}
                      </Fragment>;
                    })}
                  </div>
                  <div className="sa-nav">
                    <button className="sa-back" onClick={back}>← Back</button>
                    <span className="wts-nav-right">
                      {question.skippable && <button className="sa-back wts-skip" onClick={skip}>Skip</button>}
                      <button className="sa-primary" disabled={!answered(question)} onClick={advance}>Continue <span aria-hidden="true">→</span></button>
                    </span>
                  </div>
                  <p className="wts-keys" aria-hidden="true">1-9 to pick · Enter to continue</p>
                </section>
              )}
            </div>
          )}

          {showResult && report && permalink && code && (
            <ResultStage report={report} answers={answers} code={code} onRetake={retake} />
          )}
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
              {showResult && report
                ? <OpportunityReport data={report} permalink={permalink ?? undefined} bridge={bridge} />
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
        <p>A free read from Madrona Product Studio, PNW, USA</p>
        <nav aria-label="Madrona site">
          <Link to="/">madronaproduct.com</Link>
          <Link to="/services">How we help</Link>
          <Link to="/connect">Get in touch</Link>
        </nav>
      </footer>
    </div>
  </div>;
}

function ResultStage({ report, answers, code, onRetake }: {
  report: OpportunityReportData;
  answers: OpportunityAnswers;
  code: string;
  onRetake: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  const notes = useMemo(() => buildCalNotes(report, answers), [report, answers]);

  // "Email me this read": optional, once, nothing else. The server rebuilds
  // the read from the permalink code, so the form only carries an address.
  const [email, setEmail] = useState("");
  const [mail, setMail] = useState<{ state: "idle" | "sending" | "sent" | "error"; note?: string }>({ state: "idle" });
  const honeypot = useRef<HTMLInputElement>(null);
  const sendRead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mail.state === "sending") return;
    setMail({ state: "sending" });
    try {
      const res = await fetch("/api/read", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), r: code, company: honeypot.current?.value ?? "" }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setMail({ state: "sent" });
        track("wts_email_read", { status: "sent" });
      } else {
        setMail({ state: "error", note: typeof body.error === "string" ? body.error : "Something went wrong. Use Copy link to keep this read." });
        track("wts_email_read", { status: "error", code: res.status });
      }
    } catch {
      setMail({ state: "error", note: "Couldn't reach the server. Use Copy link to keep this read." });
      track("wts_email_read", { status: "error", code: 0 });
    }
  };

  // The finished report lives in the right pane (it's the resolved state of
  // the assembling card); this column carries the verdict, the ways in, and
  // the reading. The card owns the report content itself (critic pass 09-01:
  // never print the report twice); the rail is the concierge beside it.
  return <section className="sa-result sa-enter" aria-labelledby="wts-r">
    <p className="sa-eyebrow">Your read</p>
    <h1 id="wts-r" ref={headingRef} tabIndex={-1}>{report.title}</h1>
    <p className="sa-interpretation">{report.overall.note} The full read is yours to keep.</p>
    {/* target=_blank on the fallback href: if the embed doesn't take the click,
        Cal opens beside the read instead of replacing it. */}
    <a className="sa-primary sa-primary--wide" href={bookHref()} target="_blank" rel="noopener noreferrer" {...bookPropsWithNotes(notes)} onClick={bookClick}>
      Talk through this read <span aria-hidden="true">→</span>
    </a>
    <p className="sa-cta-fine">A free 30-minute conversation about what you flagged. Your read comes with the booking.</p>

    <div className="wts-rail-block">
      <p className="wts-rail-label">Other ways in</p>
      <ul className="wts-rail-list">
        <li><Link to={connectHref(report, answers)}>Prefer writing? Send us a note <span aria-hidden="true">→</span></Link><span>Three fields, and a real reply. Your read rides along.</span></li>
        <li><Link to="/services">See how the work happens <span aria-hidden="true">→</span></Link><span>What an engagement looks like, in plain terms.</span></li>
      </ul>
    </div>

    <div className="wts-rail-block">
      <p className="wts-rail-label">Keep it</p>
      {mail.state === "sent" ? (
        <p className="wts-mail-done">Sent. Check your inbox for the read and its link.</p>
      ) : (
        <form className="wts-mail" onSubmit={sendRead}>
          <label className="wts-mail-field">
            <span>Email me this read</span>
            <input type="email" name="email" autoComplete="email" required maxLength={200} placeholder="you@yourbusiness.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <input ref={honeypot} name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="wts-hp" />
          <button type="submit" className="wts-mail-send" disabled={mail.state === "sending" || !email.trim()}>{mail.state === "sending" ? "Sending…" : "Send"}</button>
          <small className={mail.state === "error" ? "is-error" : undefined}>{mail.state === "error" ? mail.note : "Optional. We'll send this read once; nothing else."}</small>
        </form>
      )}
      <p className="wts-mail-alt">Or use Copy link on the card. The link is the read; it comes back whenever you open it.</p>
    </div>

    {report.reading.length > 0 && (
      <div className="wts-rail-block">
        <p className="wts-rail-label">Worth reading, based on your answers</p>
        <ul className="wts-rail-list">
          {report.reading.map((entry) => (
            <li key={entry.href}><Link to={entry.href}>{entry.title} <span aria-hidden="true">→</span></Link></li>
          ))}
        </ul>
      </div>
    )}

    <div className="sa-retake-links wts-retake">
      <button className="sa-back" onClick={onRetake}>Retake</button>
    </div>
  </section>;
}
