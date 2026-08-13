// PROTOTYPE — the AI checkup ("Where could we help?"). Selection-first beats
// on the left, the read assembling live on the right (the Helm brain-builder
// mechanic applied to the written assessment). Route is unlinked + noindexed
// until Charlie approves. Canon: charlie-hq thinking/madrona/working/
// ai-checkup-2026-08-13.md
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

const FRICTION = [
  ["reentry", "Re-typing orders, invoices, or emails"],
  ["same-questions", "Answering the same questions over and over"],
  ["paperwork", "Chasing payments and paperwork"],
  ["updates", "Keeping the website and socials current"],
  ["coordination", "Scheduling and coordination"],
  ["reports", "Pulling numbers together by hand"],
] as const;

const AI_TRIED = [
  ["nothing", "Nothing yet"],
  ["chatgpt", "ChatGPT here and there"],
  ["experiments", "A few experiments that didn't stick"],
  ["running", "Something running for real"],
] as const;

const CUSTOMER_STUCK = [
  ["finding", "Finding us at all"],
  ["understanding", "Understanding what we offer"],
  ["ordering", "Ordering or booking is clunky"],
  ["return", "They come once and don't come back"],
  ["fine", "Honestly, this part works"],
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

const DOORS: Record<string, { title: string; to: string }> = {
  "operations-and-ai": { title: "Work smarter", to: "/consulting#operations-and-ai" },
  "customers-and-growth": { title: "Grow your business", to: "/consulting#customers-and-growth" },
  "brand-and-web": { title: "Build trust", to: "/consulting#brand-and-web" },
  "new-products": { title: "Build something worth using", to: "/consulting#new-products" },
};

function deriveDoors(friction: string[], customerStuck: string[], win: string): string[] {
  const scores = new Map<string, number>();
  const bump = (id: string, by = 1) => scores.set(id, (scores.get(id) ?? 0) + by);
  if (friction.length) bump("operations-and-ai", friction.length + 1);
  for (const c of customerStuck) {
    if (c === "finding" || c === "understanding") bump("brand-and-web", 2);
    if (c === "ordering" || c === "return") bump("customers-and-growth", 2);
  }
  if (win === "hours" || win === "clarity") bump("operations-and-ai", 2);
  if (win === "new-customers") bump("brand-and-web", 2);
  if (win === "repeat") bump("customers-and-growth", 2);
  if (win === "idea") bump("new-products", 3);
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([id]) => id);
}

function offlineRead(business: string, friction: string[], aiTried: string, customerStuck: string[], win: string): Read {
  const fr = friction.map((f) => label(FRICTION, f).toLowerCase());
  return {
    whatWeHeard: `You run a ${label(BUSINESSES, business).toLowerCase()} business, and the win you want is ${label(WINS, win).toLowerCase()}.`,
    centralProblem: fr.length
      ? `The week is leaking into ${fr.slice(0, 2).join(" and ")}. That is work software should be doing.`
      : "Nothing is on fire, which usually means the opportunity is about growth rather than repair.",
    strongestOpportunity: aiTried === "experiments"
      ? "You have already tried AI, so the gap is not curiosity, it is connecting the tools to your real workflow. That is very fixable."
      : "The biggest gains are usually the unglamorous ones: the repetitive work that eats hours nobody counts.",
    whatBetterLooksLike: `Better looks like: ${label(WINS, win).toLowerCase()}, and you can see it in numbers you already watch.`,
    firstMove: customerStuck.includes("fine")
      ? "Start small and inside the business: pick the single most repetitive task and hand it to a tool built for it."
      : "Start with the single biggest point of friction, prove the fix works, and expand only what earns its place.",
  };
}

const BEAT_TITLES = [
  "What kind of business do you run?",
  "Where does the week disappear?",
  "What have you tried with AI so far?",
  "Where do customers get stuck?",
  "If one thing worked better by winter, what would it be?",
];

export default function MadronaV2Checkup() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState("");
  const [friction, setFriction] = useState<string[]>([]);
  const [aiTried, setAiTried] = useState("");
  const [customerStuck, setCustomerStuck] = useState<string[]>([]);
  const [win, setWin] = useState("");
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState<Read | null>(null);
  const [offline, setOffline] = useState(false);

  const stage = aiTried ? deriveStage(aiTried) : null;
  const doors = useMemo(
    () => (win ? deriveDoors(friction, customerStuck, win) : []),
    [friction, customerStuck, win]
  );
  const done = step >= BEAT_TITLES.length;

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  async function getRead() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          business: label(BUSINESSES, business),
          friction: friction.map((f) => label(FRICTION, f)),
          aiTried,
          customerStuck: customerStuck.map((c) => label(CUSTOMER_STUCK, c)),
          win: label(WINS, win),
        }),
      });
      if (!res.ok) throw new Error("offline");
      const body = await res.json();
      setRead(body.read as Read);
      setOffline(false);
    } catch {
      setRead(offlineRead(business, friction, aiTried, customerStuck, win));
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep(0); setBusiness(""); setFriction([]); setAiTried("");
    setCustomerStuck([]); setWin(""); setRead(null); setOffline(false);
  }

  const chips = (
    pairs: readonly (readonly [string, string])[],
    selected: string | string[],
    onPick: (id: string) => void
  ) => (
    <div className="ck-chips">
      {pairs.map(([id, text]) => {
        const on = Array.isArray(selected) ? selected.includes(id) : selected === id;
        return (
          <button key={id} type="button" className={`ck-chip${on ? " is-on" : ""}`} onClick={() => onPick(id)} aria-pressed={on}>
            {text}
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="m2">
      <LabMeta title="Where could we help? · Madrona Product Studio" noindex />
      <M2Nav />

      <section className="ck-head">
        <p className="m2-kicker">A five-minute read · Free, no email needed</p>
        <h1>Tell us where the week goes. <span className="m2-pop">We'll tell you what we see.</span></h1>
        <p className="ck-lead">
          Five quick questions. As you answer, your read assembles alongside,
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
                  {chips(FRICTION, friction, (id) => toggle(friction, setFriction, id))}
                  <button className="m2-button ck-next" type="button" onClick={() => setStep(2)}>
                    {friction.length ? "Next" : "None of these, next"}
                  </button>
                </>
              )}
              {step === 2 && chips(AI_TRIED, aiTried, (id) => { setAiTried(id); setStep(3); })}
              {step === 3 && (
                <>
                  {chips(CUSTOMER_STUCK, customerStuck, (id) => toggle(customerStuck, setCustomerStuck, id))}
                  <button className="m2-button ck-next" type="button" onClick={() => setStep(4)} disabled={!customerStuck.length}>
                    Next
                  </button>
                </>
              )}
              {step === 4 && chips(WINS, win, (id) => { setWin(id); setStep(5); })}
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
              <button className="ck-back" type="button" onClick={() => setStep(4)}>← Back</button>
            </div>
          )}

          {read && (
            <div className="ck-beat">
              <h2>Your read is ready.</h2>
              <p className="ck-beat-note">
                Drafted by our AI from your answers{offline ? " (offline draft, the live version is generated fresh)" : ""}.
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
            <ul className="ck-card-rows">
              <li className={business ? "is-set" : ""}>
                <strong>The business</strong>
                <span>{business ? label(BUSINESSES, business) : "…"}</span>
              </li>
              <li className={step > 1 ? "is-set" : ""}>
                <strong>Where the week goes</strong>
                <span>{step > 1 ? (friction.length ? friction.map((f) => label(FRICTION, f)).join(" · ") : "Nothing flagged") : "…"}</span>
              </li>
              <li className={aiTried ? "is-set" : ""}>
                <strong>AI so far</strong>
                <span>{stage ? stage.note : "…"}</span>
              </li>
              <li className={step > 3 ? "is-set" : ""}>
                <strong>Customer friction</strong>
                <span>{step > 3 ? customerStuck.map((c) => label(CUSTOMER_STUCK, c)).join(" · ") : "…"}</span>
              </li>
              <li className={win ? "is-set" : ""}>
                <strong>What better looks like</strong>
                <span>{win ? label(WINS, win) : "…"}</span>
              </li>
            </ul>
          )}

          {read && (
            <div className="ck-read">
              <div><strong>What we heard</strong><p>{read.whatWeHeard}</p></div>
              <div><strong>The central problem</strong><p>{read.centralProblem}</p></div>
              <div><strong>The strongest opportunity</strong><p>{read.strongestOpportunity}</p></div>
              <div><strong>What better looks like</strong><p>{read.whatBetterLooksLike}</p></div>
              <div><strong>A first move</strong><p>{read.firstMove}</p></div>
              {doors.length > 0 && (
                <div className="ck-doors">
                  <strong>Where we could help</strong>
                  <div className="ck-door-links">
                    {doors.map((d) => (
                      <Link key={d} to={DOORS[d].to}>{DOORS[d].title} <span aria-hidden="true">→</span></Link>
                    ))}
                  </div>
                </div>
              )}
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
