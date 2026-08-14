// PROTOTYPE — the AI checkup ("Where could we help?"). Selection-first beats
// on the left, the read assembling live on the right (the Helm brain-builder
// mechanic applied to the written assessment). The heart is the
// sounds-like-you beat: first-person symptom statements from the settled
// problem voice (canon §7.4) and the five 7/21 question rows. The result
// assigns an owner archetype (the Lila traveler-profile move). Route is
// unlinked + noindexed until Charlie approves. Canon: charlie-hq
// thinking/madrona/working/ai-checkup-2026-08-13.md
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ArchPlate from "./CheckupArchPlate";
import {
  ARCHETYPES, AI_TRIED, BUSINESSES, STATEMENTS, WINS,
  OFFLINE_ANGLES, deriveStage, label, scoreArchetypes, type ArchetypeId,
} from "./checkupData";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import "./madrona-v2.css";
import "./checkup.css";

type Read = {
  whatWeHeard: string;
  centralProblem: string;
  strongestOpportunity: string;
  whatBetterLooksLike: string;
  firstMove: string;
};

function offlineRead(business: string, statements: string[], win: string, archetype: ArchetypeId): Read {
  const said = statements.slice(0, 2).map((id) => `"${label(STATEMENTS, id).replace(/\.$/, "")}"`).join(" and ");
  const angle = OFFLINE_ANGLES[archetype];
  return {
    whatWeHeard: `You run a ${label(BUSINESSES, business).toLowerCase()} business, and the win you want is ${label(WINS, win).toLowerCase()}.${said ? ` What stood out: ${said}.` : ""}`,
    centralProblem: angle.problem,
    strongestOpportunity: angle.opportunity,
    whatBetterLooksLike: `Better looks like ${label(WINS, win).toLowerCase()}, visible in numbers you already watch.`,
    firstMove: statements.includes("burned")
      ? "Start with the written assessment. It is free, it is yours to keep, and it is how we earn trust after someone else left things half-finished."
      : "Start with the single biggest point of friction, prove the fix works, and expand only what earns its place.",
  };
}

const BEAT_TITLES = [
  "What kind of business do you run?",
  "Which of these sound like you?",
  "What have you tried with AI so far?",
  "If one thing worked better by winter, what would it be?",
];

export default function MadronaV2Checkup() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState("");
  const [statements, setStatements] = useState<string[]>([]);
  const [aiTried, setAiTried] = useState("");
  const [win, setWin] = useState("");
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState<Read | null>(null);
  const [offline, setOffline] = useState(false);

  const stage = aiTried ? deriveStage(aiTried) : null;
  const { primary, secondary } = useMemo(
    () => scoreArchetypes(statements, aiTried, win),
    [statements, aiTried, win]
  );
  const guessReady = statements.length > 0;
  const done = step >= BEAT_TITLES.length;

  const toggle = (id: string) =>
    setStatements(statements.includes(id) ? statements.filter((x) => x !== id) : [...statements, id]);

  async function getRead() {
    setLoading(true);
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
          archetype: ARCHETYPES[primary].name,
          archetypePortrait: ARCHETYPES[primary].portrait,
        }),
      });
      if (!res.ok) throw new Error("offline");
      const body = await res.json();
      setRead(body.read as Read);
      setOffline(false);
    } catch {
      setRead(offlineRead(business, statements, win, primary));
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0); setBusiness(""); setStatements([]); setAiTried("");
    setWin(""); setRead(null); setOffline(false);
  }

  const chips = (
    pairs: readonly (readonly [string, string])[],
    selected: string | string[],
    onPick: (id: string) => void,
    quoted = false
  ) => (
    <div className={`ck-chips${quoted ? " ck-chips-quotes" : ""}`}>
      {pairs.map(([id, text]) => {
        const on = Array.isArray(selected) ? selected.includes(id) : selected === id;
        return (
          <button key={id} type="button" className={`ck-chip${on ? " is-on" : ""}`} onClick={() => onPick(id)} aria-pressed={on}>
            {quoted ? <>&ldquo;{text}&rdquo;</> : text}
          </button>
        );
      })}
    </div>
  );

  const arch = ARCHETYPES[primary];

  return (
    <main className="m2">
      <LabMeta title="Where could we help? · Madrona Product Studio" />
      <M2Nav />

      <section className="ck-head">
        <p className="m2-kicker">A five-minute read · Free, no email needed</p>
        <h1>Tell us where the week goes. <span className="m2-pop">We'll tell you what we see.</span></h1>
        <p className="ck-lead">
          Four quick questions. As you answer, your read assembles alongside,
          the same short written assessment we start every engagement with.
          It is yours to keep either way.
        </p>
      </section>

      <section className="ck-layout">
        <div className="ck-beats">
          {!done && (
            <div className="ck-beat">
              <p className="ck-beat-num">{step + 1} of {BEAT_TITLES.length}</p>
              <h2>{BEAT_TITLES[step]}</h2>
              {step === 0 && chips(BUSINESSES, business, (id) => { setBusiness(id); setStep(1); })}
              {step === 1 && (
                <>
                  <p className="ck-beat-note">Real things owners have said to us. Tap everything that rings true.</p>
                  {chips(STATEMENTS, statements, toggle, true)}
                  <button className="m2-button ck-next" type="button" onClick={() => setStep(2)}>
                    {statements.length ? "Next" : "None of these, next"}
                  </button>
                </>
              )}
              {step === 2 && chips(AI_TRIED, aiTried, (id) => { setAiTried(id); setStep(3); })}
              {step === 3 && chips(WINS, win, (id) => { setWin(id); setStep(4); })}
              {step > 0 && (
                <button className="ck-back" type="button" onClick={() => { setRead(null); setStep(step - 1); }}>
                  ← Back
                </button>
              )}
            </div>
          )}

          {done && !read && (
            <div className="ck-beat">
              <h2>That's everything.</h2>
              <p className="ck-beat-note">
                Our AI drafts your read from these answers, in the same shape as
                the written assessment we send clients. It takes a few seconds.
              </p>
              <button className="m2-button" type="button" onClick={getRead} disabled={loading}>
                {loading ? "Writing your read…" : "Get my read"}
              </button>
              <button className="ck-back" type="button" onClick={() => setStep(3)}>← Back</button>
            </div>
          )}

          {read && (
            <div className="ck-beat">
              <h2>Your read is ready.</h2>
              <p className="ck-beat-note">
                {offline ? "Assembled from your answers." : "Drafted by our AI from your answers."}{" "}
                It is a starting point, not a verdict. If you want the human
                version, Charlie reads these personally.
              </p>
              <div className="ck-actions">
                <Link className="m2-button" to="/connect">Get the human read, free</Link>
                <button className="ck-back" type="button" onClick={reset}>Start over</button>
              </div>
              <p className="ck-privacy">
                Answers are used to write your read and, in aggregate, to
                understand what local businesses need. No email required, no
                tracking beyond our normal site analytics.
              </p>
            </div>
          )}
        </div>

        <aside className="ck-card" aria-live="polite">
          <div className="ck-card-head">
            <small>{read ? "Your read" : "Your read, assembling"}</small>
            {stage && <span className="m2-chip">{stage.label}</span>}
          </div>

          {!read && (
            <>
              {guessReady && (
                <div className="ck-guess">
                  <span className="ck-arch-plate"><ArchPlate id={primary} /></span>
                  <div>
                    <strong>Early guess</strong>
                    <span className="ck-arch-name">{arch.name}</span>
                    <p>{arch.portrait}</p>
                  </div>
                </div>
              )}
              <ul className="ck-card-rows">
                <li className={business ? "is-set" : ""}>
                  <strong>The business</strong>
                  <span>{business ? label(BUSINESSES, business) : "…"}</span>
                </li>
                <li className={step > 1 ? "is-set" : ""}>
                  <strong>Sounds like you</strong>
                  <span>{step > 1 ? (statements.length ? statements.map((s) => `"${label(STATEMENTS, s)}"`).join(" ") : "Nothing rang true, noted") : "…"}</span>
                </li>
                <li className={aiTried ? "is-set" : ""}>
                  <strong>AI so far</strong>
                  <span>{stage ? stage.note : "…"}</span>
                </li>
                <li className={win ? "is-set" : ""}>
                  <strong>What better looks like</strong>
                  <span>{win ? label(WINS, win) : "…"}</span>
                </li>
              </ul>
            </>
          )}

          {read && (
            <div className="ck-read">
              <div className="ck-arch">
                <span className="ck-arch-plate ck-arch-plate-lg"><ArchPlate id={primary} /></span>
                <div>
                  <strong>You read as</strong>
                  <span className="ck-arch-name">{arch.name}</span>
                  {secondary && <span className="ck-arch-streak">with a streak of {ARCHETYPES[secondary].name}</span>}
                  <p>{arch.portrait}</p>
                  <p className="ck-arch-range">{arch.range}</p>
                </div>
              </div>
              <div><strong>What we heard</strong><p>{read.whatWeHeard}</p></div>
              <div><strong>The central problem</strong><p>{read.centralProblem}</p></div>
              <div><strong>The strongest opportunity</strong><p>{read.strongestOpportunity}</p></div>
              <div><strong>What better looks like</strong><p>{read.whatBetterLooksLike}</p></div>
              <div><strong>A first move</strong><p>{read.firstMove}</p></div>
              <div className="ck-doors">
                <strong>How we help {arch.name.replace(/^The /, "the ")}</strong>
                <p className="ck-help">{arch.help}</p>
                <div className="ck-door-links">
                  {arch.doors.map((d) => (
                    <Link key={d.to} to={d.to}>{d.title} <span aria-hidden="true">→</span></Link>
                  ))}
                </div>
              </div>
              <div className="ck-doors">
                <strong>Worth a look either way</strong>
                <div className="ck-door-links">
                  <Link to="/thinking/starter-guide-to-building-with-ai">Our starter guide to building with AI <span aria-hidden="true">→</span></Link>
                  <a href="https://github.com/anthropics/knowledge-work-plugins" rel="noopener noreferrer" target="_blank">Anthropic's free small-business toolkit <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          )}
        </aside>
      </section>

      <SiteFooter />
    </main>
  );
}
