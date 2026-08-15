// Madrona Signal Assessment — the dark immersive shell around the Signal
// Brain (spec 02). PROTOTYPE at /signal-check: unlinked, not in the sitemap.
// analysisMode is deterministic in v1 — status copy never claims AI (00 §truthfulness).
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SignalBrain from "../../components/assessment/SignalBrain.tsx";
import type { SignalBrainHandle } from "../../components/assessment/SignalBrain.tsx";
import { QUESTIONS } from "../../assessment/data/questions.ts";
import { PATHWAY_COPY } from "../../assessment/data/pathways.ts";
import { computeEngineState, computeResult } from "../../assessment/engine/index.ts";
import { generateCurrentRead } from "../../assessment/brain/currentRead.ts";
import type { AnswerMap, EngineState } from "../../assessment/types.ts";
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
  const selectedAnswer = question ? answers[question.id] : undefined;

  const choose = useCallback(
    (answerId: string) => {
      if (stage.kind !== "question") return;
      const q = QUESTIONS[stage.index];
      const changed = answers[q.id] !== answerId;
      setAnswers((prev) => ({ ...prev, [q.id]: answerId }));
      if (changed) brain.current?.runAnswerSequence(`${q.id}:${answerId}`);
    },
    [stage, answers],
  );

  const advance = useCallback(() => {
    if (stage.kind !== "question") return;
    const index = stage.index;
    if (!answers[QUESTIONS[index].id]) return;
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
    setAnswers({});
    setCurrentRead(null);
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
        if (e.key === "Enter" && answers[q.id]) {
          e.preventDefault();
          advance();
        }
      } else if (stage.kind === "intro" && e.key === "Enter") {
        setStage({ kind: "question", index: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, answers, choose, advance]);

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
    <div className={`sa${showResult ? " sa--result" : ""}${stage.kind === "synthesis" ? " sa--synthesis" : ""}`}>
      <div className="sa-shell">
        {/* ---- Progress rail ---- */}
        <aside className="sa-rail">
          <Link to="/" className="sa-wordmark">
            MAD<span>RONA</span>
            <em>Product Studio</em>
          </Link>

          {stage.kind !== "intro" && (
            <nav className="sa-phases" aria-label="Assessment progress">
              {RAIL_PHASES.map((phase, i) => {
                const done =
                  i < activePhase ||
                  (i === 3 && stage.kind === "result");
                const active = i === activePhase && !(i === 3 && stage.kind === "result");
                return (
                  <div
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
                    <span>{phase.title}</span>
                  </div>
                );
              })}
            </nav>
          )}

          <div className="sa-rail-foot">
            <p className="sa-live-tag">
              <i aria-hidden="true" /> Live analysis
            </p>
            <p>No email required to see your result.</p>
          </div>
        </aside>

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
              <button className="sa-primary" onClick={() => setStage({ kind: "question", index: 0 })}>
                Start the assessment <span aria-hidden="true">→</span>
              </button>
              <p className="sa-meta">About 2 minutes. No email required.</p>
            </section>
          )}

          {question && (
            <section key={stage.kind === "question" ? stage.index : "q"} className="sa-question sa-enter" aria-labelledby="sa-q">
              <p className="sa-count">
                Question {String((stage as { index: number }).index + 1).padStart(2, "0")} / 07
              </p>
              <p className="sa-eyebrow">{question.eyebrow}</p>
              <h1 id="sa-q" ref={headingRef} tabIndex={-1}>
                {question.question}
              </h1>
              {question.supportingText && <p className="sa-support">{question.supportingText}</p>}

              <div className="sa-answers" role="radiogroup" aria-labelledby="sa-q">
                {question.answers.map((answer, i) => {
                  const selected = selectedAnswer === answer.id;
                  return (
                    <button
                      key={answer.id}
                      role="radio"
                      aria-checked={selected}
                      className={`sa-answer${selected ? " is-selected" : ""}`}
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
                <button className="sa-primary" disabled={!selectedAnswer} onClick={advance}>
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
              <p className="sa-interpretation">{result.archetype.full}</p>

              <div className="sa-result-block">
                <h2>Strongest signals</h2>
                <ul className="sa-signals">
                  {result.topSignals.map((t) => (
                    <li key={t.signal}>
                      <span>{t.label}</span>
                      <em className={`sa-level sa-level--${t.level.toLowerCase()}`}>{t.level}</em>
                      <small>{LEVEL_NOTES[t.level]}</small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sa-result-block">
                <h2>Best place to start</h2>
                <p className="sa-pathway">{PATHWAY_COPY[result.archetype.primaryPathway].name}</p>
                <p className="sa-pathway-short">{PATHWAY_COPY[result.archetype.primaryPathway].short}</p>
              </div>

              <div className="sa-result-block">
                <h2>Recommended first move</h2>
                <p className="sa-rec-title">{result.recommendation.title}</p>
                <p className="sa-rec-desc">{result.recommendation.description}</p>
              </div>

              <div className="sa-result-cta">
                <Link className="sa-primary" to="/connect">
                  Talk through the result <span aria-hidden="true">→</span>
                </Link>
                <button className="sa-back" onClick={restart}>
                  Start over
                </button>
              </div>
              <p className="sa-fine">
                This assessment looks for patterns in your answers and maps
                them to common business opportunities. Your answers stay in
                this session unless you choose to share them.
              </p>
            </section>
          )}
        </main>

        {/* ---- Signal Brain ---- */}
        <aside className="sa-brain" aria-label="Live pathway visualization">
          <header className="sa-brain-head">
            <p className="sa-live">
              <i aria-hidden="true" /> Live pathway
            </p>
            <p className="sa-brain-sub">
              {stage.kind === "result"
                ? "Your pattern, mapped"
                : stage.kind === "synthesis"
                  ? "Live synthesis"
                  : engine.answeredCount > 0
                    ? "Reading your signals"
                    : "Waiting for signals"}
            </p>
          </header>
          <div className="sa-brain-canvas">
            <SignalBrain
              ref={brain}
              state={engine}
              reducedMotion={reducedMotion}
              showLabels={stage.kind === "result"}
              showEvidence
            />
          </div>
          <footer className="sa-brain-foot" aria-live="polite">
            {stage.kind === "result" && result
              ? `${PATHWAY_COPY[result.archetype.primaryPathway].name} is the leading pathway.`
              : currentRead ?? "The map fills in as you answer."}
          </footer>
        </aside>
      </div>
    </div>
  );
}
