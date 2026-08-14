import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./madrona-v2.css";
import "./checkup-c.css";
import ArchPlate from "./CheckupArchPlate";
import {
  AI_TRIED,
  ARCHETYPES,
  BUSINESSES,
  STATEMENTS,
  WINS,
  deriveStage,
  label,
  scoreArchetypes,
  type ArchetypeId,
} from "./checkupData";

type Read = {
  whatWeHeard: string;
  centralProblem: string;
  strongestOpportunity: string;
  whatBetterLooksLike: string;
  firstMove: string;
};

type Answers = {
  business: string;
  statements: string[];
  aiTried: string;
  win: string;
};

const EMPTY: Answers = { business: "", statements: [], aiTried: "", win: "" };
const PRESSURE = ["texts-me", "hours", "one-time", "no-time"];
const SIGNAL = ["web-ok", "ai-lost", "idea", "burned"];

function statementOptions(ids: string[]) {
  return ids.map((id) => [id, label(STATEMENTS, id)] as const);
}

function fallbackRead(id: ArchetypeId, answers: Answers): Read {
  const archetype = ARCHETYPES[id];
  const business = label(BUSINESSES, answers.business).toLowerCase();
  const goal = label(WINS, answers.win).toLowerCase();
  return {
    whatWeHeard: `You are running a ${business} business, and ${answers.statements.map((item) => label(STATEMENTS, item).toLowerCase()).join(" Also, ")}`,
    centralProblem: archetype.portrait,
    strongestOpportunity: `The clearest opening is ${goal}. The right first step should make that easier without adding another system for you to babysit.`,
    whatBetterLooksLike: `The business feels easier to find, choose, and return to. The useful parts run consistently, without depending on you remembering every next step.`,
    firstMove: `Start small. Pick one recurring moment tied to ${goal}, map what happens today, and test the lightest useful improvement with real customers.`,
  };
}

const READ_SECTIONS: { key: keyof Read; number: string; title: string }[] = [
  { key: "whatWeHeard", number: "01", title: "What we heard" },
  { key: "centralProblem", number: "02", title: "The central problem" },
  { key: "strongestOpportunity", number: "03", title: "The strongest opening" },
  { key: "whatBetterLooksLike", number: "04", title: "What better looks like" },
  { key: "firstMove", number: "05", title: "Your first move" },
];

export default function CheckupC() {
  const [screen, setScreen] = useState(-1);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [read, setRead] = useState<Read | null>(null);
  const [archetypeId, setArchetypeId] = useState<ArchetypeId | null>(null);
  const [stage, setStage] = useState<ReturnType<typeof deriveStage> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingNote, setLoadingNote] = useState("Looking for the throughline");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [screen, isLoading, archetypeId]);

  useEffect(() => {
    if (!isLoading) return;
    const first = window.setTimeout(() => setLoadingNote("Separating the symptom from the snag"), 900);
    const second = window.setTimeout(() => setLoadingNote("Writing your first useful move"), 1900);
    return () => { window.clearTimeout(first); window.clearTimeout(second); };
  }, [isLoading]);

  const choose = (key: keyof Answers, value: string) => {
    // Advance is scheduled OUTSIDE the updater: React StrictMode double-invokes
    // updaters in dev, which double-advanced and skipped screens.
    setAnswers((current) => (
      key === "statements"
        ? { ...current, statements: current.statements.includes(value) ? current.statements : [...current.statements, value] }
        : { ...current, [key]: value }
    ));
    window.setTimeout(() => setScreen((v) => v + 1), 150);
  };

  const finish = async (win: string) => {
    const startedAt = Date.now();
    const completed = { ...answers, win };
    setAnswers(completed);
    setIsLoading(true);
    setLoadingNote("Looking for the throughline");
    const id = scoreArchetypes(completed.statements, completed.aiTried, win).primary;
    const localRead = fallbackRead(id, completed);
    const localStage = deriveStage(completed.aiTried);

    try {
      const response = await fetch("/api/checkup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: label(BUSINESSES, completed.business),
          statements: completed.statements.map((item) => label(STATEMENTS, item)),
          burned: completed.statements.includes("burned"),
          aiTried: completed.aiTried,
          win: label(WINS, win),
          archetype: ARCHETYPES[id].name,
          archetypePortrait: ARCHETYPES[id].portrait,
        }),
      });
      if (!response.ok) throw new Error("Checkup request failed");
      const data = await response.json() as { read?: Read; stage?: ReturnType<typeof deriveStage> };
      setRead(data.read ?? localRead);
      setStage(data.stage && typeof data.stage === "object" ? data.stage : localStage);
    } catch {
      setRead(localRead);
      setStage(localStage);
    } finally {
      const remaining = Math.max(0, 2200 - (Date.now() - startedAt));
      await new Promise((resolve) => window.setTimeout(resolve, remaining));
      setArchetypeId(id);
      setIsLoading(false);
      setScreen(5);
    }
  };

  const restart = () => {
    setAnswers(EMPTY);
    setRead(null);
    setArchetypeId(null);
    setStage(null);
    setIsLoading(false);
    setScreen(-1);
  };

  const goBack = () => {
    if (screen <= 0) {
      setAnswers(EMPTY);
      setScreen(-1);
      return;
    }
    const previousScreen = screen - 1;
    setAnswers((current) => {
      if (previousScreen === 0) return { ...current, business: "" };
      if (previousScreen === 1) return { ...current, statements: current.statements.filter((id) => !PRESSURE.includes(id)) };
      if (previousScreen === 2) return { ...current, statements: current.statements.filter((id) => !SIGNAL.includes(id)) };
      if (previousScreen === 3) return { ...current, aiTried: "" };
      return current;
    });
    setScreen(previousScreen);
  };

  const prompts = [
    { eyebrow: "Your business", title: "What kind of work fills your week?", note: "Pick the closest fit.", options: BUSINESSES, key: "business" as const },
    { eyebrow: "The daily friction", title: "Which part feels most familiar?", note: "Go with the one you notice most often.", options: statementOptions(PRESSURE), key: "statements" as const },
    { eyebrow: "The bigger picture", title: "And which of these is also true?", note: "One honest answer is enough.", options: statementOptions(SIGNAL), key: "statements" as const },
    { eyebrow: "Tools so far", title: "Where has AI actually made it into the business?", note: "Personal use counts.", options: AI_TRIED, key: "aiTried" as const },
    { eyebrow: "A useful win", title: "If one thing got easier first, what should it be?", note: "Choose what would matter this season.", options: WINS, key: "win" as const },
  ];

  const prompt = screen >= 0 && screen < prompts.length ? prompts[screen] : null;
  const progress = screen < 0 ? 0 : Math.min((screen + 1) / prompts.length, 1);

  return (
    <div className="m2 ck-c">
      <header className="ck-c-chrome">
        <Link to="/" className="ck-c-wordmark" aria-label="Madrona Product Studio home">MAD<span>RONA</span></Link>
        <div className="ck-c-progress" aria-label={screen >= 0 && screen < 5 ? `Step ${screen + 1} of 5` : undefined}>
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <span className="ck-c-time">About 45 seconds</span>
      </header>

      <main ref={mainRef} tabIndex={-1} className="ck-c-main">
        {screen === -1 && (
          <section className="ck-c-intro ck-c-settle" aria-labelledby="checkup-title">
            <p className="ck-c-kicker">A quick field check</p>
            <h1 id="checkup-title">Your business is telling you something.</h1>
            <p className="ck-c-deck">Five quick choices. Then we’ll name the pattern, show you what is getting in the way, and give you one sensible place to start.</p>
            <button className="ck-c-primary" onClick={() => setScreen(0)}>Start the checkup <span aria-hidden="true">↗</span></button>
            <p className="ck-c-fine">No email. No prep. Just your honest read.</p>
          </section>
        )}

        {prompt && !isLoading && (
          <section key={screen} className="ck-c-question ck-c-settle" aria-labelledby={`question-${screen}`}>
            <div className="ck-c-question-head">
              <p className="ck-c-kicker">{String(screen + 1).padStart(2, "0")} / 05&nbsp;&nbsp; {prompt.eyebrow}</p>
              <h1 id={`question-${screen}`}>{prompt.title}</h1>
              <p>{prompt.note}</p>
            </div>
            <div className="ck-c-options" role="group" aria-label={prompt.title}>
              {prompt.options.map(([id, text], index) => (
                <button
                  className="ck-c-option"
                  key={id}
                  style={{ "--option-index": index } as React.CSSProperties}
                  onClick={() => prompt.key === "win" ? finish(id) : choose(prompt.key, id)}
                >
                  <span className="ck-c-option-mark" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                  <span>{text}</span>
                  <span className="ck-c-option-arrow" aria-hidden="true">→</span>
                </button>
              ))}
            </div>
            <button className="ck-c-back" onClick={goBack}>← Back</button>
          </section>
        )}

        {isLoading && (
          <section className="ck-c-observe" aria-live="polite">
            <div className="ck-c-observe-mark" aria-hidden="true"><i /><i /><i /></div>
            <p className="ck-c-kicker">Reading your answers</p>
            <h1>{loadingNote}<span aria-hidden="true">.</span></h1>
            <p>Good advice starts with the shape of the problem.</p>
          </section>
        )}

        {archetypeId && read && stage && (
          <article className="ck-c-result">
            <section className="ck-c-reveal" aria-labelledby="result-title">
              <div className="ck-c-plate"><ArchPlate id={archetypeId} /></div>
              <div className="ck-c-reveal-copy">
                <p className="ck-c-kicker">Your owner archetype</p>
                <h1 id="result-title">{ARCHETYPES[archetypeId].name}</h1>
                <p className="ck-c-portrait">{ARCHETYPES[archetypeId].portrait}</p>
                <p className="ck-c-range">{ARCHETYPES[archetypeId].range}</p>
              </div>
            </section>

            <section className="ck-c-read" aria-labelledby="read-title">
              <div className="ck-c-read-intro">
                <p className="ck-c-kicker">Your field notes</p>
                <h2 id="read-title">A short read on where you are.</h2>
                <div className="ck-c-stage"><span>{stage.label}</span><p>{stage.note}</p></div>
              </div>
              <div className="ck-c-notes">
                {READ_SECTIONS.map((section) => (
                  <section key={section.key}>
                    <span>{section.number}</span>
                    <div><h3>{section.title}</h3><p>{read[section.key]}</p></div>
                  </section>
                ))}
              </div>
            </section>

            <section className="ck-c-help">
              <p className="ck-c-kicker">How we help</p>
              <h2>{ARCHETYPES[archetypeId].help}</h2>
              <div className="ck-c-doors">
                {ARCHETYPES[archetypeId].doors.map((door) => <Link key={door.to} to={door.to}>{door.title}<span aria-hidden="true">↗</span></Link>)}
              </div>
              <Link className="ck-c-primary" to="/connect">Get the human read, free <span aria-hidden="true">↗</span></Link>
            </section>

            <footer className="ck-c-result-foot">
              <p>Your answers are used for this read and in aggregate. No email required.</p>
              <button onClick={restart}>Start over</button>
            </footer>
          </article>
        )}
      </main>
    </div>
  );
}
