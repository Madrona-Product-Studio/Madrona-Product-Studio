import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import MadronaLogo from "../lab/MadronaLogo";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { track } from "../../lib/analytics";
import { ReadCard } from "./ReadCard";
import { openerItems, buildSequence, computeReadProfile, computeBuildProfile, buildProgress, buildRecap, type ThreadId, type WhereToStartAnswers, type StepQuestion } from "./whereToStartEngine";
import "../lab/signal-assessment.css";
import "./v3.css";
import "./where-to-start.css";

// Where to Start — the report-first respec of the assessment
// (docs/redesign-2026-08/assessment-respec.md), housed in the same dark app
// shell as the live /checkup (Charlie, 2026-08-29). The right pane is
// reserved: later it shows the report assembling as answers land; blank for
// now. The result is the same ReadCard the homepage hero renders.
type Stage = { kind: "opener" } | { kind: "question"; index: number } | { kind: "result" };

const RAIL_PHASES = ["Sounds like you", "Follow-ups", "Your read"];

export default function WhereToStart() {
  useCalEmbed();
  const [stage, setStage] = useState<Stage>({ kind: "opener" });
  const [threads, setThreads] = useState<ThreadId[]>([]);
  const [answers, setAnswers] = useState<WhereToStartAnswers>({ threads: [] });
  const headingRef = useRef<HTMLHeadingElement>(null);

  const sequence = useMemo(() => buildSequence(threads), [threads]);
  const showResult = stage.kind === "result";
  const question = stage.kind === "question" ? sequence[stage.index] : null;

  // The right pane's assembling card tracks opener checks live (threads state
  // runs ahead of answers.threads until Continue), then answers as they land.
  const liveAnswers = useMemo(() => ({ ...answers, threads }), [answers, threads]);
  const paneProfile = useMemo(
    () => showResult ? computeReadProfile(answers) : computeBuildProfile(liveAnswers),
    [showResult, answers, liveAnswers],
  );
  const progress = useMemo(() => buildProgress(liveAnswers), [liveAnswers]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const toggleThread = (id: ThreadId) =>
    setThreads(current => current.includes(id) ? current.filter(t => t !== id) : [...current, id]);

  const begin = useCallback(() => {
    setAnswers({ threads });
    setStage({ kind: "question", index: 0 });
    track("wts_start", { threads: threads.join(",") });
  }, [threads]);

  const answered = (q: StepQuestion | null): boolean =>
    !!q && (answers[q.id] !== undefined || (q.id === "workflow" && !!answers.workflowText?.trim()));

  const advance = useCallback(() => {
    if (stage.kind !== "question" || !answered(sequence[stage.index])) return;
    track("wts_question", { question: stage.index + 1, question_id: sequence[stage.index].id });
    if (stage.index === sequence.length - 1) {
      setStage({ kind: "result" });
      track("wts_complete", { threads: threads.join(",") });
    } else {
      setStage({ kind: "question", index: stage.index + 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, sequence, answers, threads]);

  const back = useCallback(() => {
    if (stage.kind !== "question") return;
    if (stage.index === 0) setStage({ kind: "opener" });
    else setStage({ kind: "question", index: stage.index - 1 });
  }, [stage]);

  const retake = useCallback(() => {
    setThreads([]);
    setAnswers({ threads: [] });
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
        if (n >= 1 && n <= openerItems.length) toggleThread(openerItems[n - 1].id);
        if (e.key === "Enter" && threads.length) begin();
        return;
      }
      if (stage.kind === "question" && question) {
        const n = Number(e.key);
        if (n >= 1 && n <= question.options.length) setAnswers(a => ({ ...a, [question.id]: n - 1 }));
        if (e.key === "Enter") { e.preventDefault(); advance(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, question, threads, begin, advance]);

  const activePhase = stage.kind === "opener" ? 0 : stage.kind === "question" ? 1 : 2;

  return <div className={`sa wts-sa${showResult ? " sa--result" : ""}${stage.kind === "opener" ? " sa--intro" : ""}`}>
    <LabMeta title="Where to start · a free 2-minute read · Madrona Product Studio" />
    <div className="sa-shell">
      <header className="sa-top">
        <Link to="/" className="sa-wordmark" aria-label="Madrona Product Studio home">
          <MadronaLogo variant="horizontal-reversed" decorative />
        </Link>
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
        <p className="sa-top-note">No email required to see your read.</p>
      </header>

      <div className="sa-body">
        <main className="sa-work">
          {stage.kind === "opener" && (
            <section className="sa-question sa-enter" aria-labelledby="wts-q">
              <p className="sa-count"><em>Where to start</em><span aria-hidden="true"> · </span>Check all that apply</p>
              <h1 id="wts-q" ref={headingRef} tabIndex={-1}>Which of these sound like you?</h1>
              <p className="sa-support">We only ask about what you flag, then hand you a short read you keep either way.</p>
              <div className="sa-answers" role="group" aria-labelledby="wts-q">
                {openerItems.map((item, i) => {
                  const selected = threads.includes(item.id);
                  return <button key={item.id} role="checkbox" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => toggleThread(item.id)}>
                    <span className="sa-answer-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                    <span className="sa-answer-label">{item.statement}</span>
                    <span className="sa-answer-mark" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                  </button>;
                })}
              </div>
              <div className="sa-nav">
                <p className="sa-meta">About two minutes. No email required.</p>
                <button className="sa-primary" disabled={!threads.length} onClick={begin}>Continue <span aria-hidden="true">→</span></button>
              </div>
            </section>
          )}

          {question && stage.kind === "question" && (
            <section key={stage.index} className="sa-question sa-enter" aria-labelledby="wts-q">
              <p className="sa-count"><em>Follow-up</em><span aria-hidden="true"> · </span>Question {String(stage.index + 1).padStart(2, "0")} / {String(sequence.length).padStart(2, "0")}</p>
              <h1 id="wts-q" ref={headingRef} tabIndex={-1}>{question.question}</h1>
              {question.support && <p className="sa-support">{question.support}</p>}
              <div className="sa-answers" role="radiogroup" aria-labelledby="wts-q">
                {question.options.map((option, i) => {
                  const selected = answers[question.id] === i;
                  return <button key={option} role="radio" aria-checked={selected} className={`sa-answer${selected ? " is-selected" : ""}`} onClick={() => setAnswers(a => ({ ...a, [question.id]: i }))}>
                    <span className="sa-answer-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                    <span className="sa-answer-label">{option}</span>
                    <span className="sa-answer-mark" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2.5 6.4 5 8.9 9.6 3.4" /></svg></span>
                  </button>;
                })}
              </div>
              {question.id === "workflow" && (
                <label className="wts-freetext">
                  <span>Or say it in your words. The read gets sharper.</span>
                  <input type="text" maxLength={200} placeholder="The part of the week I dread is…" value={answers.workflowText ?? ""} onChange={e => setAnswers(a => ({ ...a, workflowText: e.target.value }))} />
                </label>
              )}
              <div className="sa-nav">
                <button className="sa-back" onClick={back}>← Back</button>
                <button className="sa-primary" disabled={!answered(question)} onClick={advance}>Continue <span aria-hidden="true">→</span></button>
              </div>
            </section>
          )}

          {showResult && <ResultStage answers={answers} onRetake={retake} />}
        </main>

        {/* The report, assembling: the same frame the live assessment gives
            the Signal Brain, but the visualization IS the report — rows wake
            to "Listening" as threads are flagged, statuses stamp in as
            answers land, and at the end it resolves into the finished card. */}
        <aside className="sa-brain" aria-label="Your report, assembling as you answer">
          <header className="sa-brain-head">
            <p className={`sa-live${showResult ? " sa-live--resolved" : ""}`}>{showResult ? <>Your report</> : <><i aria-hidden="true" /> Live report</>}</p>
            <p className="sa-brain-sub">{showResult ? "Built from your answers." : "Assembles as you answer."}</p>
          </header>
          <div className="sa-brain-canvas wts-pane-canvas">
            <div className={`v3 wts-card wts-card--pane${showResult ? " wts-card--reveal" : ""}`}><ReadCard profile={paneProfile} /></div>
          </div>
          {!showResult && <footer className="sa-brain-foot" aria-live="polite">
            {progress.flaggedTotal ? `${progress.read} of ${progress.flaggedTotal} flagged areas read.` : "Check what sounds like you and the report starts filling in."}
          </footer>}
        </aside>
      </div>

      <footer className="sa-site-foot">
        <p>A free read from Madrona Product Studio, Bellingham WA</p>
        <nav aria-label="Madrona site">
          <Link to="/">madronaproduct.com</Link>
          <Link to="/services">How we help</Link>
          <Link to="/connect">Contact</Link>
        </nav>
      </footer>
    </div>
  </div>;
}

function ResultStage({ answers, onRetake }: { answers: WhereToStartAnswers; onRetake: () => void }) {
  const recap = useMemo(() => buildRecap(answers), [answers]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);
  // The finished report lives in the right pane (it's the resolved state of
  // the assembling card); this column carries the read and the ask.
  return <section className="sa-result sa-enter" aria-labelledby="wts-r">
    <p className="sa-eyebrow">Your read</p>
    <h1 id="wts-r" ref={headingRef} tabIndex={-1}>Where to start.</h1>
    <p className="sa-interpretation">Assembled from your answers. Keep it either way.</p>
    <div className="wts-recap">
      <p className="wts-recap-label">What we heard</p>
      <ul>{recap.map(line => <li key={line}>{line}</li>)}</ul>
    </div>
    <a className="sa-primary sa-primary--wide" href={bookHref()} {...bookProps()} onClick={event => { track("wts_cta_click"); bookClick(event); }}>
      Talk through this read <span aria-hidden="true">→</span>
    </a>
    <p className="sa-cta-fine">A free 30-minute conversation. No email required.</p>
    <div className="sa-retake-links wts-retake">
      <button className="sa-back" onClick={onRetake}>Retake</button>
      <Link className="sa-quiet-link" to="/services">Learn how we work</Link>
    </div>
  </section>;
}
