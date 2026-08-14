// VARIANT B — the AI checkup as a full-screen, one-prompt-at-a-time flow.
// No sidebar, no early archetype hints: answers accumulate quietly, a writing
// interstitial builds anticipation, and the archetype reveal is the payoff.
// Immersive chrome (wordmark + progress hairline), auto-advance on
// single-select, keyboard 1-9/Enter, reduced-motion safe.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArchPlate from "./CheckupArchPlate";
import LabMeta from "./LabMeta";
import {
  ARCHETYPES, AI_TRIED, BUSINESSES, STATEMENTS, WINS,
  OFFLINE_ANGLES, label, scoreArchetypes,
} from "./checkupData";
import "./madrona-v2.css";
import "./checkup-b.css";

type Read = {
  whatWeHeard: string;
  centralProblem: string;
  strongestOpportunity: string;
  whatBetterLooksLike: string;
  firstMove: string;
};

const WEEK_IDS = ["hours", "texts-me", "no-time", "burned"] as const;
const PICTURE_IDS = ["web-ok", "one-time", "ai-lost", "idea"] as const;
const pick = (ids: readonly string[]) => STATEMENTS.filter(([id]) => ids.includes(id));

type StepDef =
  | { kind: "intro" }
  | { kind: "single"; title: string; sub?: string; options: readonly (readonly [string, string])[]; get: () => string; set: (v: string) => void }
  | { kind: "multi"; title: string; sub: string; options: readonly (readonly [string, string])[]; quoted?: boolean }
  | { kind: "writing" }
  | { kind: "result" };

export default function MadronaV2CheckupB() {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [business, setBusiness] = useState("");
  const [statements, setStatements] = useState<string[]>([]);
  const [aiTried, setAiTried] = useState("");
  const [win, setWin] = useState("");
  const [read, setRead] = useState<Read | null>(null);
  const [offline, setOffline] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const advanceTimer = useRef<number | null>(null);

  const steps: StepDef[] = useMemo(() => [
    { kind: "intro" },
    { kind: "single", title: "What kind of business do you run?", options: BUSINESSES, get: () => business, set: setBusiness },
    { kind: "multi", title: "How does the week actually feel?", sub: "Real things owners have told us. Tap everything that rings true.", options: pick(WEEK_IDS as unknown as string[]), quoted: true },
    { kind: "multi", title: "And the bigger picture?", sub: "Same deal. Anything here sound familiar?", options: pick(PICTURE_IDS as unknown as string[]), quoted: true },
    { kind: "single", title: "What have you tried with AI so far?", options: AI_TRIED, get: () => aiTried, set: setAiTried },
    { kind: "single", title: "If one thing worked better by winter, what would it be?", options: WINS, get: () => win, set: setWin },
    { kind: "writing" },
    { kind: "result" },
  ], [business, aiTried, win]);

  const questionSteps = steps.filter((s) => s.kind === "single" || s.kind === "multi").length;
  const questionIndex = Math.min(
    steps.slice(0, step).filter((s) => s.kind === "single" || s.kind === "multi").length,
    questionSteps
  );
  const progress = step === 0 ? 0 : Math.min(questionIndex / questionSteps, 1);

  const { primary, secondary } = useMemo(
    () => scoreArchetypes(statements, aiTried, win),
    [statements, aiTried, win]
  );
  const arch = ARCHETYPES[primary];

  const go = useCallback((next: number) => {
    setLeaving(true);
    window.setTimeout(() => {
      setStep(next);
      setLeaving(false);
      window.scrollTo(0, 0);
    }, 240);
  }, []);

  const advance = useCallback(() => go(Math.min(step + 1, steps.length - 1)), [go, step, steps.length]);
  const back = useCallback(() => { if (step > 0 && step < steps.length - 2) go(step - 1); }, [go, step, steps.length]);

  // Single-select: show the selection land, then advance.
  const pickSingle = (set: (v: string) => void) => (id: string) => {
    set(id);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(advance, 320);
  };

  const toggleMulti = (id: string) =>
    setStatements(statements.includes(id) ? statements.filter((x) => x !== id) : [...statements, id]);

  // The writing interstitial: fire the API, hold at least 1.6s, then reveal.
  useEffect(() => {
    if (steps[step]?.kind !== "writing") return;
    let done = false;
    const started = Date.now();
    const finish = (r: Read, off: boolean) => {
      if (done) return;
      done = true;
      const wait = Math.max(0, 1600 - (Date.now() - started));
      window.setTimeout(() => {
        setRead(r); setOffline(off); setRevealed(false);
        go(step + 1);
        window.setTimeout(() => setRevealed(true), 60);
      }, wait);
    };
    (async () => {
      try {
        const res = await fetch("/api/checkup", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            business: label(BUSINESSES, business),
            statements: statements.map((s) => label(STATEMENTS, s)),
            burned: statements.includes("burned"),
            aiTried,
            win: label(WINS, win),
            archetype: arch.name,
            archetypePortrait: arch.portrait,
          }),
        });
        if (!res.ok) throw new Error("offline");
        const body = await res.json();
        finish(body.read as Read, false);
      } catch {
        finish({
          whatWeHeard: `You run a ${label(BUSINESSES, business).toLowerCase()} business, and the win you want is ${label(WINS, win).toLowerCase()}.`,
          centralProblem: OFFLINE_ANGLES[primary].problem,
          strongestOpportunity: OFFLINE_ANGLES[primary].opportunity,
          whatBetterLooksLike: `Better looks like ${label(WINS, win).toLowerCase()}, visible in numbers you already watch.`,
          firstMove: statements.includes("burned")
            ? "Start with the written assessment. It is free, it is yours to keep, and it is how we earn trust after someone else left things half-finished."
            : "Start with the single biggest point of friction, prove the fix works, and expand only what earns its place.",
        }, true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Keyboard: 1-9 select, Enter continues on multi/intro.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = steps[step];
      if (!s) return;
      if (e.key === "Enter" && (s.kind === "intro" || s.kind === "multi")) { advance(); return; }
      const n = Number(e.key);
      if (!n || n < 1) return;
      if (s.kind === "single" && s.options[n - 1]) pickSingle(s.set)(s.options[n - 1][0]);
      if (s.kind === "multi" && s.options[n - 1]) toggleMulti(s.options[n - 1][0]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, steps, statements]);

  function restart() {
    setBusiness(""); setStatements([]); setAiTried(""); setWin("");
    setRead(null); setOffline(false); setRevealed(false);
    go(0);
  }

  const s = steps[step];

  return (
    <main className="m2 ckb">
      <LabMeta title="Where could we help? · Madrona Product Studio" noindex />

      {/* Immersive chrome: wordmark, progress hairline, exit */}
      <header className="ckb-chrome">
        <Link to="/" className="ckb-word">madrona</Link>
        {s.kind !== "intro" && s.kind !== "result" && (
          <span className="ckb-count">{Math.min(questionIndex + (s.kind === "writing" ? 0 : 1), questionSteps)} of {questionSteps}</span>
        )}
        <Link to="/" className="ckb-exit" aria-label="Exit the checkup">✕</Link>
        <span className="ckb-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div className={`ckb-stage${leaving ? " is-leaving" : ""}`}>
        {s.kind === "intro" && (
          <section className="ckb-screen ckb-intro">
            <p className="m2-kicker">The five-minute read · Free, no email needed</p>
            <h1>Tell us where the week goes.<br /><span className="m2-pop">We'll tell you what we see.</span></h1>
            <p className="ckb-lead">
              Five quick questions, all taps. At the end: your owner profile and
              a short written read, the same shape as the assessment we start
              every engagement with. Yours to keep either way.
            </p>
            <button className="m2-button ckb-start" type="button" onClick={advance}>Start the read</button>
            <p className="ckb-hint">About a minute. No wrong answers.</p>
          </section>
        )}

        {(s.kind === "single" || s.kind === "multi") && (
          <section className="ckb-screen">
            <h2 className="ckb-q">{s.title}</h2>
            {s.kind === "multi" && <p className="ckb-sub">{s.sub}</p>}
            <div className={`ckb-answers${s.kind === "multi" && s.quoted ? " is-quotes" : ""}`}>
              {s.options.map(([id, text], i) => {
                const on = s.kind === "single" ? s.get() === id : statements.includes(id);
                const onPick = s.kind === "single" ? pickSingle(s.set) : toggleMulti;
                return (
                  <button key={id} type="button" className={`ckb-answer${on ? " is-on" : ""}`}
                    style={{ transitionDelay: `${i * 35}ms` }} onClick={() => onPick(id)} aria-pressed={on}>
                    <span className="ckb-key" aria-hidden="true">{i + 1}</span>
                    <span>{s.kind === "multi" && s.quoted ? <>&ldquo;{text}&rdquo;</> : text}</span>
                  </button>
                );
              })}
            </div>
            {s.kind === "multi" && (
              <button className="m2-button ckb-continue" type="button" onClick={advance}>
                {statements.some((id) => s.options.some(([o]) => o === id)) ? "Continue" : "None of these, continue"}
              </button>
            )}
            {step > 1 && <button className="ckb-back" type="button" onClick={back}>← Back</button>}
          </section>
        )}

        {s.kind === "writing" && (
          <section className="ckb-screen ckb-writing" aria-live="polite">
            <span className="ckb-writing-mark" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle className="ckb-ring" cx="60" cy="60" r="44" />
                <circle className="ckb-dot" cx="60" cy="60" r="7" />
              </svg>
            </span>
            <p className="ckb-writing-line">Reading your answers…</p>
          </section>
        )}

        {s.kind === "result" && read && (
          <section className={`ckb-screen ckb-result${revealed ? " is-revealed" : ""}`}>
            <div className="ckb-reveal">
              <span className="ckb-plate"><ArchPlate id={primary} /></span>
              <p className="m2-kicker">You read as</p>
              <h1 className="ckb-arch">{arch.name}</h1>
              {secondary && <p className="ckb-streak">with a streak of {ARCHETYPES[secondary].name}</p>}
              <p className="ckb-portrait">{arch.portrait}</p>
              <p className="ckb-range">{arch.range}</p>
            </div>

            <div className="ckb-readgrid">
              {([
                ["What we heard", read.whatWeHeard],
                ["The central problem", read.centralProblem],
                ["The strongest opportunity", read.strongestOpportunity],
                ["What better looks like", read.whatBetterLooksLike],
                ["A first move", read.firstMove],
              ] as const).map(([t, body], i) => (
                <div className="ckb-readrow" style={{ transitionDelay: `${300 + i * 90}ms` }} key={t}>
                  <strong>{t}</strong>
                  <p>{body}</p>
                </div>
              ))}
            </div>

            <div className="ckb-next">
              <div className="ckb-help">
                <strong>How we help {arch.name.replace(/^The /, "the ")}</strong>
                <p>{arch.help}</p>
                <div className="ckb-doorlinks">
                  {arch.doors.map((d) => (
                    <Link key={d.to} to={d.to}>{d.title} <span aria-hidden="true">→</span></Link>
                  ))}
                </div>
              </div>
              <div className="ckb-ctas">
                <Link className="m2-button" to="/connect">Get the human read, free</Link>
                <button className="ckb-back" type="button" onClick={restart}>Start over</button>
              </div>
              <p className="ckb-privacy">
                {offline ? "Assembled from your answers." : "Drafted by our AI from your answers, reviewed approach, honest limits."}{" "}
                Used in aggregate to understand what local businesses need. No
                email required.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
