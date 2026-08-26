// Madrona Signal Assessment — the dark immersive shell around the Signal
// Brain (spec 02). PROTOTYPE at /signal-check: unlinked, not in the sitemap.
// analysisMode is deterministic in v1 — status copy never claims AI (00 §truthfulness).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignalBrain from "../../components/assessment/SignalBrain.tsx";
import type { BrainMode, SignalBrainHandle } from "../../components/assessment/SignalBrain.tsx";
import type { Signal } from "../../assessment/types.ts";
import { QUESTIONS } from "../../assessment/data/questions.ts";
import { PATHWAY_COPY } from "../../assessment/data/pathways.ts";
import { BOOKING_URL, CAL_LINK } from "../../data/booking.ts";

// Same swap point the rest of the site uses: cal.com when configured,
// otherwise the contact page.
const BOOK_HREF = CAL_LINK ? `https://cal.com/${CAL_LINK}` : (BOOKING_URL ?? "/connect");
const BOOK_EXTERNAL = BOOK_HREF.startsWith("http");
import { computeEngineState, computeResult } from "../../assessment/engine/index.ts";
import { generateCurrentRead } from "../../assessment/brain/currentRead.ts";
import { CLOSE_PATHWAY_GAP } from "../../assessment/brain/model.ts";
import { answerIds } from "../../assessment/types.ts";
import type { AnswerMap, EngineState } from "../../assessment/types.ts";
import { trackAssessment } from "../../assessment/analytics.ts";
import MadronaLogo from "./MadronaLogo.tsx";
import LabMeta from "./LabMeta.tsx";
import "./signal-assessment.css";

export const ANALYSIS_MODE: "deterministic" | "llm-assisted" = "deterministic";

type Stage =
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "interstitial"; nextIndex: number; line: string }
  | { kind: "synthesis" }
  | { kind: "result" };

const RAIL_PHASES = [
  { title: "Context", questions: [0] },
  { title: "Friction", questions: [1, 2, 3] },
  { title: "Direction", questions: [4, 5, 6] },
  { title: "Synthesis", questions: [] },
];

const INTERSTITIALS: Record<number, string> = {
  1: "That’s a meaningful signal.",
  3: "We’re starting to see a throughline.",
  5: "The shape is getting clearer.",
};

const SYNTHESIS_LINES = [
  "Reading the pattern…",
  "Finding the throughline…",
  "Mapping your strongest opportunity…",
];

const LEVEL_NOTES: Record<string, string> = {
  Strong: "Clear, repeated evidence",
  Emerging: "A pattern taking shape",
  Supporting: "Present in the background",
};

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export default function SignalAssessment() {
  const [stage, setStage] = useState<Stage>({ kind: "intro" });
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [synthesisLine, setSynthesisLine] = useState(0);
  const [currentRead, setCurrentRead] = useState<string | null>(null);
  const [focusedSignal, setFocusedSignal] = useState<Signal | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const brain = useRef<SignalBrainHandle>(null);
  const prevEngine = useRef<EngineState | null>(null);
  const timers = useRef<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const engine = useMemo(() => computeEngineState(answers), [answers]);
  const result = useMemo(
    () => (stage.kind === "result" ? computeResult(answers) : null),
    [stage.kind, answers],
  );

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(
    () => () => {
      for (const t of timers.current) window.clearTimeout(t);
    },
    [],
  );

  // Current-read line follows settled engine state.
  useEffect(() => {
    if (engine.answeredCount === 0) {
      setCurrentRead(null);
    } else {
      const read = generateCurrentRead(engine, prevEngine.current, currentRead);
      if (read) setCurrentRead(read);
    }
    prevEngine.current = engine;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine]);

  // Move focus to the active heading on stage change.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const question = stage.kind === "question" ? QUESTIONS[stage.index] : null;
  const selectedIds = question ? answerIds(answers, question.id) : [];

  const choose = useCallback(
    (answerId: string) => {
      if (stage.kind !== "question") return;
      const q = QUESTIONS[stage.index];
      const current = answerIds(answers, q.id);
      if (q.multi) {
        if (current.includes(answerId)) {
          // Deselect: the map rebalances on its own; no ingest theater.
          setAnswers((prev) => ({
            ...prev,
            [q.id]: current.filter((id) => id !== answerId),
          }));
          return;
        }
        if (current.length >= (q.maxSelections ?? 3)) return;
        setAnswers((prev) => ({ ...prev, [q.id]: [...current, answerId] }));
        brain.current?.runAnswerSequence(`${q.id}:${answerId}`);
        return;
      }
      const changed = current[0] !== answerId;
      setAnswers((prev) => ({ ...prev, [q.id]: answerId }));
      if (changed) brain.current?.runAnswerSequence(`${q.id}:${answerId}`);
    },
    [stage, answers],
  );

  const begin = useCallback(() => {
    trackAssessment("assessment_start");
    setStage({ kind: "question", index: 0 });
  }, []);

  const advance = useCallback(() => {
    if (stage.kind !== "question") return;
    const index = stage.index;
    if (answerIds(answers, QUESTIONS[index].id).length === 0) return;
    trackAssessment("assessment_question", {
      question: index + 1,
      question_id: QUESTIONS[index].id,
    });
    if (index === QUESTIONS.length - 1) {
      setStage({ kind: "synthesis" });
      setSynthesisLine(0);
      brain.current?.trigger("synthesize");
      const beat = reducedMotion ? 220 : 900;
      later(() => setSynthesisLine(1), beat);
      later(() => setSynthesisLine(2), beat * 2);
      later(() => setStage({ kind: "result" }), reducedMotion ? 800 : 2800);
      return;
    }
    const line = INTERSTITIALS[index];
    if (line && !reducedMotion) {
      setStage({ kind: "interstitial", nextIndex: index + 1, line });
      later(() => setStage({ kind: "question", index: index + 1 }), 1050);
    } else {
      setStage({ kind: "question", index: index + 1 });
    }
  }, [stage, answers, reducedMotion, later]);

  const back = useCallback(() => {
    if (stage.kind !== "question") return;
    if (stage.index === 0) setStage({ kind: "intro" });
    else setStage({ kind: "question", index: stage.index - 1 });
  }, [stage]);

  const restart = useCallback(() => {
    trackAssessment("assessment_retake");
    setAnswers({});
    setCurrentRead(null);
    setFocusedSignal(null);
    prevEngine.current = null;
    brain.current?.trigger("idle");
    setStage({ kind: "intro" });
  }, []);

  // Keyboard: 1–6 select, Enter continues.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage.kind === "question") {
        const q = QUESTIONS[stage.index];
        const n = Number(e.key);
        if (n >= 1 && n <= q.answers.length) {
          choose(q.answers[n - 1].id);
          return;
        }
        if (e.key === "Enter" && answerIds(answers, q.id).length > 0) {
          e.preventDefault();
          advance();
        }
      } else if (stage.kind === "intro" && e.key === "Enter") {
        begin();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, answers, choose, advance, begin]);

  // Completion is the funnel's payoff event: which archetype, which pathway,
  // and whether the call was close. Fires once per computed result.
  useEffect(() => {
    if (!result) return;
    trackAssessment("assessment_complete", {
      archetype: result.archetype.name,
      pathway: PATHWAY_COPY[result.archetype.primaryPathway].name,
      close_second: engine.pathwayGap < CLOSE_PATHWAY_GAP,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const activePhase =
    stage.kind === "synthesis" || stage.kind === "result"
      ? 3
      : stage.kind === "question"
        ? RAIL_PHASES.findIndex((p) => p.questions.includes(stage.index))
        : stage.kind === "interstitial"
          ? RAIL_PHASES.findIndex((p) => p.questions.includes(stage.nextIndex))
          : -1;

  const showResult = stage.kind === "result" && result;

  return (
    <div className={`sa${showResult ? " sa--result" : ""}${stage.kind === "synthesis" ? " sa--synthesis" : ""}${stage.kind === "intro" ? " sa--intro" : ""}`}>
      <LabMeta title="A quick signal check · Madrona Product Studio" />
      <div className="sa-shell">
        {/* ---- Top bar: identity + progress, freeing the full width below ---- */}
        <header className="sa-top">
          <Link to="/" className="sa-wordmark" aria-label="Madrona Product Studio home">
            <MadronaLogo variant="horizontal-reversed" decorative />
          </Link>
          {showResult ? (
            <p className="sa-complete">
              <i aria-hidden="true">
                <svg viewBox="0 0 10 10">
                  <path d="M2 5.2 4.2 7.4 8 3" />
                </svg>
              </i>
              Assessment complete
            </p>
          ) : stage.kind !== "intro" && (
            <nav className="sa-phases" aria-label="Assessment progress">
              {RAIL_PHASES.map((phase, i) => {
                const done = i < activePhase;
                const active = i === activePhase;
                return (
                  <span
                    key={phase.title}
                    className={`sa-phase${active ? " is-active" : ""}${done ? " is-done" : ""}`}
                  >
                    <i aria-hidden="true">
                      {done && (
                        <svg viewBox="0 0 10 10">
                          <path d="M2 5.2 4.2 7.4 8 3" />
                        </svg>
                      )}
                    </i>
                    {phase.title}
                  </span>
                );
              })}
            </nav>
          )}
          <p className="sa-top-note">No email required to see your result.</p>
        </header>

        <div className="sa-body">
        {/* ---- Workspace ---- */}
        <main className="sa-work">
          {stage.kind === "intro" && (
            <section className="sa-intro sa-enter" aria-labelledby="sa-title">
              <p className="sa-eyebrow">A quick signal check</p>
              <h1 id="sa-title" ref={headingRef} tabIndex={-1}>
                Your business is telling you something.
              </h1>
              <p className="sa-deck">
                Seven quick questions. We’ll map the pattern, show where the
                strongest opportunity may be, and suggest a useful place to
                start.
              </p>
              <button className="sa-primary" onClick={begin}>
                Start the assessment <span aria-hidden="true">→</span>
              </button>
              <p className="sa-meta">About 2 minutes. No email required.</p>
            </section>
          )}

          {question && (
            <section key={stage.kind === "question" ? stage.index : "q"} className="sa-question sa-enter" aria-labelledby="sa-q">
              <p className="sa-count">
                <em>{question.eyebrow}</em>
                <span aria-hidden="true"> · </span>
                Question {String((stage as { index: number }).index + 1).padStart(2, "0")} / 07
              </p>
              <h1 id="sa-q" ref={headingRef} tabIndex={-1}>
                {question.question}
              </h1>
              {question.supportingText && <p className="sa-support">{question.supportingText}</p>}

              <div
                className="sa-answers"
                role={question.multi ? "group" : "radiogroup"}
                aria-labelledby="sa-q"
              >
                {question.answers.map((answer, i) => {
                  const selected = selectedIds.includes(answer.id);
                  const atCap =
                    question.multi &&
                    !selected &&
                    selectedIds.length >= (question.maxSelections ?? 3);
                  return (
                    <button
                      key={answer.id}
                      role={question.multi ? "checkbox" : "radio"}
                      aria-checked={selected}
                      className={`sa-answer${selected ? " is-selected" : ""}${atCap ? " is-capped" : ""}`}
                      onClick={() => choose(answer.id)}
                    >
                      <span className="sa-answer-key" aria-hidden="true">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="sa-answer-label">{answer.label}</span>
                      <span className="sa-answer-mark" aria-hidden="true">
                        <svg viewBox="0 0 12 12">
                          <path d="M2.5 6.4 5 8.9 9.6 3.4" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="sa-nav">
                <button className="sa-back" onClick={back}>
                  ← Back
                </button>
                <button className="sa-primary" disabled={selectedIds.length === 0} onClick={advance}>
                  Continue <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          )}

          {stage.kind === "interstitial" && (
            <section className="sa-interstitial sa-enter" aria-live="polite">
              <h1 ref={headingRef} tabIndex={-1}>{stage.line}</h1>
            </section>
          )}

          {stage.kind === "synthesis" && (
            <section className="sa-interstitial sa-synth sa-enter" aria-live="polite">
              <h1 ref={headingRef} tabIndex={-1}>{SYNTHESIS_LINES[synthesisLine]}</h1>
            </section>
          )}

          {showResult && result && (
            <section className="sa-result sa-enter" aria-labelledby="sa-r">
              <p className="sa-eyebrow">Your current pattern</p>
              <h1 id="sa-r" ref={headingRef} tabIndex={-1}>
                {result.archetype.name}
              </h1>
              <p className="sa-interpretation">{result.archetype.short}</p>

              <div className="sa-first-move">
                <h2>Recommended first move</h2>
                <p className="sa-rec-title">{result.recommendation.title}</p>
                <p className="sa-rec-desc">{result.recommendation.description}</p>
                <p className="sa-rec-context">
                  <strong>{PATHWAY_COPY[result.archetype.primaryPathway].name}.</strong>{" "}
                  {PATHWAY_COPY[result.archetype.primaryPathway].short}
                </p>
                <div className="sa-rec-includes">
                  <p className="sa-rec-includes-label">What this could include</p>
                  <ul>
                    {PATHWAY_COPY[result.archetype.primaryPathway].capabilities.map((c) => (
                      <li key={c}>
                        <svg viewBox="0 0 10 10" aria-hidden="true">
                          <path d="M2 5.2 4.2 7.4 8 3" />
                        </svg>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                {BOOK_EXTERNAL ? (
                  <a
                    className="sa-primary sa-primary--wide"
                    href={BOOK_HREF}
                    onClick={() =>
                      trackAssessment("assessment_cta_click", { archetype: result.archetype.name })
                    }
                  >
                    Talk through this result <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    className="sa-primary sa-primary--wide"
                    to={BOOK_HREF}
                    onClick={() =>
                      trackAssessment("assessment_cta_click", { archetype: result.archetype.name })
                    }
                  >
                    Talk through this result <span aria-hidden="true">→</span>
                  </Link>
                )}
                <p className="sa-cta-fine">A 30-minute conversation. No email required.</p>
              </div>
            </section>
          )}
        </main>

        {/* ---- Signal Brain ---- */}
        <aside className="sa-brain" aria-label="Live pathway visualization">
          <header className="sa-brain-head">
            {showResult ? (
              <>
                <p className="sa-live sa-live--resolved">Why this result</p>
                <p className="sa-brain-sub">Where your answers converged.</p>
              </>
            ) : (
              <>
                <p className="sa-live">
                  <i aria-hidden="true" /> Live pathway
                </p>
                <p className="sa-brain-sub">
                  {stage.kind === "synthesis"
                    ? "Live synthesis"
                    : engine.answeredCount > 0
                      ? "Reading your signals"
                      : "Signals to pathways."}
                </p>
              </>
            )}
          </header>
          <div className="sa-brain-canvas">
            <SignalBrain
              ref={brain}
              state={engine}
              reducedMotion={reducedMotion}
              showLabels
              showPathwayAnchors
              showEvidence
              mode={
                (showResult
                  ? "resolved"
                  : stage.kind === "synthesis"
                    ? "synthesizing"
                    : "exploring") as BrainMode
              }
              focusedSignal={showResult ? focusedSignal : null}
            />
          </div>
          {showResult && result && (() => {
            // A genuinely close runner-up stays on the record: the map keeps
            // its anchor lit and the readout names it, instead of pretending
            // the call was decisive.
            const closeSecond =
              engine.pathwayGap < CLOSE_PATHWAY_GAP &&
              engine.secondaryPathway !== result.archetype.primaryPathway
                ? engine.secondaryPathway
                : null;
            return (
            <>
              <ul className="sa-signals">
                {result.topSignals.map((t, i) => (
                  <li key={t.signal}>
                    <button
                      className={`sa-signal-key${focusedSignal === t.signal ? " is-focused" : ""}`}
                      onMouseEnter={() => setFocusedSignal(t.signal)}
                      onMouseLeave={() => setFocusedSignal(null)}
                      onFocus={() => setFocusedSignal(t.signal)}
                      onBlur={() => setFocusedSignal(null)}
                      onClick={() =>
                        setFocusedSignal((current) => (current === t.signal ? null : t.signal))
                      }
                      aria-pressed={focusedSignal === t.signal}
                    >
                      <span>{t.label}</span>
                      <small>{i === 0 ? "Your clearest signal" : LEVEL_NOTES[t.level]}</small>
                    </button>
                  </li>
                ))}
              </ul>
              {closeSecond && (
                <div className="sa-also">
                  <p className="sa-also-name">Close second: {PATHWAY_COPY[closeSecond].name}</p>
                  <p className="sa-also-note">
                    Your answers kept this pathway close behind. Worth bringing
                    into the same conversation.
                  </p>
                </div>
              )}
            </>
            );
          })()}
          {!showResult && (
            <footer className="sa-brain-foot" aria-live="polite">
              {currentRead ?? "The map fills in as you answer."}
            </footer>
          )}
          {showResult && (
            <div className="sa-retake">
              <div className="sa-retake-links">
                <button className="sa-back" onClick={restart}>
                  Retake the assessment
                </button>
                <Link className="sa-quiet-link" to="/services">
                  Learn how we work
                </Link>
              </div>
              <p>This assessment maps patterns in your answers to common business opportunities.</p>
            </div>
          )}
        </aside>
        </div>
        {/* Quiet site-context strip — /checkup strips the normal chrome, so a
            visitor arriving from a shared link still learns whose check this
            is and has a way into the site. */}
        <footer className="sa-site-foot">
          <p>A free signal check from Madrona Product Studio, Bellingham WA</p>
          <nav aria-label="Madrona site">
            <Link to="/">madronaproduct.com</Link>
            <Link to="/services">How we help</Link>
            <Link to="/connect">Contact</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
