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

const BUSINESSES = [
  ["retail", "Retail or online store"],
  ["food-farm", "Food and farm"],
  ["services", "Services and appointments"],
  ["hospitality", "Hospitality and travel"],
  ["wellness", "Health and wellness"],
  ["other", "Something else"],
] as const;

// The heart of the checkup: the settled problem voice, one statement per row.
const STATEMENTS = [
  ["web-ok", "The website's just ok."],
  ["texts-me", "Ordering still means somebody texts me."],
  ["hours", "I lose hours every week to stuff a computer should be doing."],
  ["one-time", "People buy once, then I never hear from them again."],
  ["ai-lost", "Everyone says AI would help. I wouldn't know where to start."],
  ["idea", "I've got an idea, but I'm not spending real money until I know people will pay."],
  ["burned", "I paid someone to fix things once. It came back half-finished."],
  ["no-time", "I can't stop running the business to fix the business."],
] as const;

const AI_TRIED = [
  ["nothing", "Nothing yet"],
  ["chatgpt", "ChatGPT here and there"],
  ["experiments", "A few experiments that didn't stick"],
  ["running", "Something running for real"],
] as const;

const WINS = [
  ["new-customers", "More new customers"],
  ["repeat", "More repeat customers"],
  ["hours", "Hours back every week"],
  ["clarity", "A clearer picture of the business"],
  ["idea", "Getting the new idea off the ground"],
] as const;

const label = (pairs: readonly (readonly [string, string])[], id: string) =>
  pairs.find(([k]) => k === id)?.[1] ?? id;

// Mirrors api/checkup.ts (prototype duplication; server is authoritative).
function deriveStage(aiTried: string) {
  switch (aiTried) {
    case "nothing": return { label: "Haven't started", note: "No AI in the business yet. The first move matters more than the start date." };
    case "chatgpt": return { label: "Poking at it", note: "Using AI personally, nothing wired into how the business runs yet." };
    case "experiments": return { label: "Tried, nothing stuck", note: "Experiments disconnected from real work. Most businesses are right here." };
    default: return { label: "Running for real", note: "Something is genuinely in production. The question is what earns its place next." };
  }
}

// The owner archetypes — the Lila traveler-profile move. Each "help" line is
// the proven verb-first answer copy from the 7/21 question rows.
export type ArchetypeId = "secret" | "ducttape" | "skeptic" | "onevisit" | "founder";

const ARCHETYPES: Record<ArchetypeId, {
  name: string;
  portrait: string;
  range: string; // the field-guide one-liner under the plate
  help: string;
  doors: { title: string; to: string }[];
}> = {
  secret: {
    name: "The Best-Kept Secret",
    portrait: "Great at the work, undersold by the website. People who find you love you. The problem is the finding.",
    range: "Range: everywhere good work goes underpriced. Rarely photographed.",
    help: "We build the brand, site, content, and store that finally match the work.",
    doors: [
      { title: "Build trust", to: "/consulting#brand-and-web" },
      { title: "Grow your business", to: "/consulting#customers-and-growth" },
    ],
  },
  ducttape: {
    name: "The Duct-Tape Operator",
    portrait: "The business runs on texts, spreadsheets, and memory. It works, because you personally hold it together every week.",
    range: "Habitat: the front counter, the back office, and the inbox, simultaneously.",
    help: "We map how the work actually happens, then build the tools and agents that hand the busywork to software. Channels you own: online ordering, booking, fulfillment.",
    doors: [
      { title: "Work smarter", to: "/consulting#operations-and-ai" },
      { title: "Grow your business", to: "/consulting#customers-and-growth" },
    ],
  },
  skeptic: {
    name: "The Curious Skeptic",
    portrait: "You're pretty sure AI could help the business. Nobody has shown you how, and you're not buying the hype.",
    range: "Diet: proof. Will wait as long as it takes.",
    help: "We work in AI every day. We'll tell you straight where it pays off for your business, and where it won't.",
    doors: [{ title: "Work smarter", to: "/consulting#operations-and-ai" }],
  },
  onevisit: {
    name: "The One-Visit Wonder",
    portrait: "Customers show up, love it, and vanish. The product isn't the problem. The path back is.",
    range: "Sightings: unforgettable. Return schedule: unknown.",
    help: "We give customers useful reasons to return: repeat ordering, memberships, follow-up that doesn't depend on anyone's memory.",
    doors: [{ title: "Grow your business", to: "/consulting#customers-and-growth" }],
  },
  founder: {
    name: "The Kitchen-Table Founder",
    portrait: "The idea is real and it won't leave you alone. You just don't want to bet real money before real people say yes.",
    range: "Migration: upstream, always. Carries everything it owns.",
    help: "We get you real customer signal before real money: concept tests, smoke tests, a prototype kept deliberately small.",
    doors: [{ title: "Build something worth using", to: "/consulting#new-products" }],
  },
};

function scoreArchetypes(statements: string[], aiTried: string, win: string) {
  const s = new Map<ArchetypeId, number>();
  const bump = (id: ArchetypeId, by: number) => s.set(id, (s.get(id) ?? 0) + by);
  const has = (id: string) => statements.includes(id);

  if (has("web-ok")) bump("secret", 2);
  if (has("texts-me")) { bump("ducttape", 2); bump("onevisit", 1); }
  if (has("hours")) bump("ducttape", 2);
  if (has("one-time")) bump("onevisit", 2);
  if (has("ai-lost")) bump("skeptic", 2);
  if (has("idea")) bump("founder", 3);
  if (has("burned")) bump("secret", 1);
  if (has("no-time")) bump("ducttape", 1);

  if (win === "new-customers") bump("secret", 2);
  if (win === "repeat") bump("onevisit", 2);
  if (win === "hours") bump("ducttape", 2);
  if (win === "clarity") { bump("ducttape", 1); bump("skeptic", 1); }
  if (win === "idea") bump("founder", 3);
  if ((aiTried === "nothing" || aiTried === "chatgpt") && has("ai-lost")) bump("skeptic", 1);
  if (aiTried === "experiments") bump("skeptic", 1);

  const ranked = [...s.entries()].sort((a, b) => b[1] - a[1]);
  const primary: ArchetypeId = ranked[0]?.[0] ?? "skeptic";
  const secondary = ranked[1] && ranked[1][1] >= 2 ? ranked[1][0] : null;
  return { primary, secondary };
}

const OFFLINE_ANGLES: Record<ArchetypeId, { problem: string; opportunity: string }> = {
  secret: {
    problem: "The gap is between how good the work is and how it reads online. New customers can't see what regulars already know.",
    opportunity: "Closing that gap is very doable, and it usually pays back in the numbers you already watch: calls, orders, bookings.",
  },
  ducttape: {
    problem: "You are the software. Orders, reminders, and follow-ups run through your attention, and your attention is the scarcest thing in the business.",
    opportunity: "The unglamorous automations usually pay first: the re-typing, the reminders, the questions you answer twenty times a week.",
  },
  skeptic: {
    problem: "The blocker isn't the tools, it's translation. Nobody has connected what AI can do to what your week actually looks like.",
    opportunity: "A straight answer exists for your business: where AI genuinely pays off, and where it honestly won't. Getting that answer is a small job, not a leap of faith.",
  },
  onevisit: {
    problem: "First visits are working. The path back isn't built yet, so every month starts from zero.",
    opportunity: "A useful reason to return beats any amount of new marketing, and it is usually cheaper to build.",
  },
  founder: {
    problem: "The risk isn't the idea, it's spending real money before real people have said yes.",
    opportunity: "Demand can be tested small and cheap, before a real budget is committed. Most ideas should be tested exactly that way.",
  },
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
