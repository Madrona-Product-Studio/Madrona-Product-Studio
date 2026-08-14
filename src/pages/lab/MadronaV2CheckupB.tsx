// THE MERGED CHECKUP PROTOTYPE — C's editorial staging (split question
// layout, lettered cards, narrated interstitial, field-notes result, forest
// close) on B's mechanics (multi-select statements, keyboard 1-9/Enter,
// auto-advance singles, honest fallback). Display type is tight Inter 600
// (the site's swiss move) — no Fraunces, per Charlie 2026-08-14.
// Route: /lab/checkup-b (unlinked, noindex) until approved.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArchPlate from "./CheckupArchPlate";
import LabMeta from "./LabMeta";
import {
  ARCHETYPES, AI_TRIED, BUSINESSES, OFFLINE_ANGLES, STATEMENTS, WINS,
  label, scoreArchetypes,
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

const WEEK_IDS = ["hours", "texts-me", "no-time", "burned"];
const PICTURE_IDS = ["web-ok", "one-time", "ai-lost", "idea"];
const pickStatements = (ids: string[]) => STATEMENTS.filter(([id]) => ids.includes(id));

const NOTES = [
  "Looking for the throughline…",
  "Separating the symptom from the snag…",
  "Writing your first useful move…",
];

const READ_SECTIONS: { key: keyof Read; title: string }[] = [
  { key: "whatWeHeard", title: "What we heard" },
  { key: "centralProblem", title: "The central problem" },
  { key: "strongestOpportunity", title: "The strongest opening" },
  { key: "whatBetterLooksLike", title: "What better looks like" },
  { key: "firstMove", title: "Your first move" },
];

type StepDef =
  | { kind: "intro" }
  | { kind: "single"; eyebrow: string; title: string; note: string; options: readonly (readonly [string, string])[]; get: () => string; set: (v: string) => void }
  | { kind: "multi"; eyebrow: string; title: string; note: string; options: readonly (readonly [string, string])[] }
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
  const [note, setNote] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [closeVisible, setCloseVisible] = useState(false);
  const advanceTimer = useRef<number | null>(null);
  const closeRef = useRef<HTMLDivElement | null>(null);

  const steps: StepDef[] = useMemo(() => [
    { kind: "intro" },
    { kind: "single", eyebrow: "Your business", title: "What kind of work fills your week?", note: "Pick the closest fit.", options: BUSINESSES, get: () => business, set: setBusiness },
    { kind: "multi", eyebrow: "The daily friction", title: "How does the week actually feel?", note: "Real things owners have told us. Tap everything that rings true.", options: pickStatements(WEEK_IDS) },
    { kind: "multi", eyebrow: "The bigger picture", title: "And any of these?", note: "Same deal. Skip it if nothing fits.", options: pickStatements(PICTURE_IDS) },
    { kind: "single", eyebrow: "Tools so far", title: "Where has AI actually made it into the business?", note: "Personal use counts.", options: AI_TRIED, get: () => aiTried, set: setAiTried },
    { kind: "single", eyebrow: "A useful win", title: "If one thing got easier first, what should it be?", note: "Choose what would matter this season.", options: WINS, get: () => win, set: setWin },
    { kind: "writing" },
    { kind: "result" },
  ], [business, aiTried, win]);

  const questionSteps = steps.filter((x) => x.kind === "single" || x.kind === "multi").length;
  const questionIndex = steps.slice(0, step).filter((x) => x.kind === "single" || x.kind === "multi").length;
  const progress = step === 0 ? 0 : Math.min((questionIndex + (steps[step]?.kind === "writing" || steps[step]?.kind === "result" ? 0 : 1)) / questionSteps, 1);

  const { primary, secondary } = useMemo(
    () => scoreArchetypes(statements, aiTried, win),
    [statements, aiTried, win]
  );
  const arch = ARCHETYPES[primary];

  const go = useCallback((next: number) => {
    setDirection(next < step ? "back" : "forward");
    setLeaving(true);
    window.setTimeout(() => {
      setStep(next);
      setLeaving(false);
      window.scrollTo(0, 0);
    }, 170);
  }, [step]);

  const advance = useCallback(() => go(Math.min(step + 1, steps.length - 1)), [go, step, steps.length]);
  const back = useCallback(() => { if (step > 0 && step < steps.length - 2) go(step - 1); }, [go, step, steps.length]);

  const pickSingle = (set: (v: string) => void) => (id: string) => {
    set(id);
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(advance, 340);
  };
  const toggleMulti = (id: string) =>
    setStatements(statements.includes(id) ? statements.filter((x) => x !== id) : [...statements, id]);

  // Writing interstitial: fire the API, narrate, hold ≥2.4s, then reveal.
  useEffect(() => {
    if (steps[step]?.kind !== "writing") return;
    setNote(0);
    const n1 = window.setTimeout(() => setNote(1), 950);
    const n2 = window.setTimeout(() => setNote(2), 1900);
    let done = false;
    const started = Date.now();
    const finish = (r: Read, off: boolean) => {
      if (done) return;
      done = true;
      const wait = Math.max(0, 2400 - (Date.now() - started));
      window.setTimeout(() => {
        setRead(r); setOffline(off); setRevealed(false);
        go(step + 1);
        window.setTimeout(() => setRevealed(true), 80);
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
    return () => { window.clearTimeout(n1); window.clearTimeout(n2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // Keyboard: 1-9 select, Enter continues.
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

  useEffect(() => {
    const node = closeRef.current;
    if (!node || steps[step]?.kind !== "result") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCloseVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [step, read, steps]);

  function restart() {
    setBusiness(""); setStatements([]); setAiTried(""); setWin("");
    setRead(null); setOffline(false); setRevealed(false);
    go(0);
  }

  const s = steps[step];
  const qNumber = String(Math.min(questionIndex + 1, questionSteps)).padStart(2, "0");

  return (
    <main className="m2 ckb">
      <LabMeta title="Where could we help? · Madrona Product Studio" noindex />

      <header className="ckb-chrome">
        <Link to="/" className="ckb-word">madrona</Link>
        <div className="ckb-progresswrap" aria-hidden="true">
          <span className="ckb-progress" style={{ "--progress": progress, transform: `scaleX(${progress})` } as React.CSSProperties} />
        </div>
        <span className="ckb-time">{s.kind === "result" ? "" : "About a minute"}</span>
      </header>

      <div className={`ckb-stage is-${direction}${leaving ? " is-leaving" : ""}`}>
        {s.kind === "intro" && (
          <section className="ckb-screen ckb-intro">
            <div>
              <p className="m2-kicker">The five-minute read · Free, no email needed</p>
              <h1>Tell us where the week goes.<br /><span className="m2-pop">We'll tell you what we see.</span></h1>
              <p className="ckb-lead">
                Five quick taps. Then we name the pattern, show you what is
                getting in the way, and write you a short read, the same shape
                as the assessment we start every engagement with. Yours to keep
                either way.
              </p>
              <button className="m2-button ckb-start" type="button" onClick={advance}>Start the read</button>
              <p className="ckb-hint">No wrong answers. No prep.</p>
            </div>
          </section>
        )}

        {(s.kind === "single" || s.kind === "multi") && (
          <section className="ckb-screen ckb-question" key={step}>
            <div className="ckb-qrail">
              <p className="ckb-eyebrow">{qNumber} / {String(questionSteps).padStart(2, "0")} · {s.eyebrow}</p>
              <h2 className="ckb-q">{s.title}</h2>
              <p className="ckb-note">{s.note}</p>
              {step > 1 && <button className="ckb-back" type="button" onClick={back}>← Back</button>}
            </div>
            <div className="ckb-qanswers">
              <div className="ckb-answers">
                {s.options.map(([id, text], i) => {
                  const on = s.kind === "single" ? s.get() === id : statements.includes(id);
                  const onPick = s.kind === "single" ? pickSingle(s.set) : toggleMulti;
                  const isQuote = s.kind === "multi";
                  return (
                    <button key={id} type="button" className={`ckb-answer${on ? " is-on" : ""}`}
                      style={{ "--i": i } as React.CSSProperties} onClick={() => onPick(id)} aria-pressed={on}>
                      <span className="ckb-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                      <span className="ckb-answer-text">{isQuote ? <>&ldquo;{text}&rdquo;</> : text}</span>
                      <span className="ckb-mark" aria-hidden="true">
                        <svg viewBox="0 0 16 16"><path d="M3 8.6 6.4 12 13 4.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </button>
                  );
                })}
              </div>
              {s.kind === "multi" && (
                <button className="m2-button ckb-continue" type="button" onClick={advance}>
                  {statements.some((id) => s.options.some(([o]) => o === id)) ? "Continue" : "None of these, continue"}
                </button>
              )}
            </div>
          </section>
        )}

        {s.kind === "writing" && (
          <section className="ckb-screen ckb-writing" aria-live="polite">
            <span className="ckb-writing-mark" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle className="ckb-ring2" cx="60" cy="60" r="52" />
                <circle className="ckb-ring" cx="60" cy="60" r="40" />
                <circle className="ckb-dot" cx="60" cy="60" r="7" />
                <path className="ckb-written-line" d="M30 60 C44 52 69 68 91 57" pathLength="1" />
              </svg>
            </span>
            <p className="ckb-eyebrow">Reading your answers</p>
            <p className="ckb-writing-line" key={note}>{NOTES[note]}</p>
            <p className="ckb-writing-sub">Good advice starts with the shape of the problem.</p>
          </section>
        )}

        {s.kind === "result" && read && (
          <section className={`ckb-result${revealed ? " is-revealed" : ""}`}>
            <div className="ckb-reveal">
              <span className="ckb-plate"><ArchPlate id={primary} /></span>
              <div className="ckb-reveal-copy">
                <p className="ckb-eyebrow">Your owner profile</p>
                <h1 className="ckb-arch">{arch.name}</h1>
                {secondary && <p className="ckb-streak">with a streak of {ARCHETYPES[secondary].name}</p>}
                <p className="ckb-portrait">{arch.portrait}</p>
                <p className="ckb-range">{arch.range}</p>
              </div>
            </div>

            <div className="ckb-notes">
              <div className="ckb-notes-rail">
                <p className="ckb-eyebrow">Your field notes</p>
                <h2>A short read on where you are.</h2>
                <p className="ckb-note">{offline ? "Assembled from your answers." : "Drafted by our AI from your answers. Charlie reads the human version."}</p>
              </div>
              <ol className="ckb-notes-list">
                {READ_SECTIONS.map(({ key, title }, i) => (
                  <li key={key} style={{ "--i": i } as React.CSSProperties}>
                    <span className="ckb-notes-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{read[key]}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div ref={closeRef} className={`ckb-close${closeVisible ? " is-visible" : ""}`}>
              <p className="ckb-eyebrow">How we help {arch.name.replace(/^The /, "the ")}</p>
              <h2>{arch.help}</h2>
              <div className="ckb-doorlinks">
                {arch.doors.map((d) => (
                  <Link key={d.to} to={d.to}>{d.title} <span aria-hidden="true">→</span></Link>
                ))}
              </div>
              <div className="ckb-ctas">
                <Link className="ckb-cta" to="/connect">Get the human read, free</Link>
                <button className="ckb-restart" type="button" onClick={restart}>Start over</button>
              </div>
              <p className="ckb-privacy">
                Answers are used to write your read and, in aggregate, to
                understand what local businesses need. No email required.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
