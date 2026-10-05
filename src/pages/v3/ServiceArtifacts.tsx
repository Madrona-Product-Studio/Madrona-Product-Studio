// The service artifact library (Charlie's picks, 2026-08-30): browser-window
// deliverables that SHOW the work happening — the kinds of assets an
// engagement actually produces. Sheet-approved content, board hues doing the
// semantic color work. Each pairs with a worked-example module slot on the
// V4 service pages; the assessment-v2 report will speak this same language.
import { WindowBar } from "./ReadCard";



// C — the positioning line, sharpened (before / after).
export function BeforeAfterArtifact() {
  return <article className="v3-artifact sa-ba">
    <WindowBar path="positioning pass · homepage line" note="week two artifact" />
    <div className="sa-ba-grid">
      <section><h3>Walked in with</h3><p className="sa-ba-line is-before">“Quality products and great service since 2011.”</p><p className="sa-ba-note">True of everyone, proof of nothing.</p></section>
      <section><h3>Walked out with</h3><p className="sa-ba-line">“Berries picked this morning. <em>Sold out by noon.</em>”</p><p className="sa-ba-note">Specific, provable, and it sets the buying rhythm.</p></section>
    </div>
  </article>;
}

// D — a four-step path with the break visible. Defaults to the retention
// journey; New Products passes the build path.
interface JourneyStep { tone: string; tag?: string; title: string; body: string }
const RETENTION_JOURNEY: { path: string; note: string; steps: JourneyStep[]; footer: string } = {
  path: "customer journey · first order to second", note: "where customers leak",
  steps: [
    { tone: "is-fir", title: "First order", body: "They found you, they bought." },
    { tone: "is-copper", title: "The visit", body: "Great experience, no follow-up." },
    { tone: "is-broken", tag: "The leak", title: "Silence", body: "Nothing invites them back." },
    { tone: "is-fixed", tag: "Installed", title: "The return", body: "Thank-you, then a reason to come back, timed right." },
  ],
  footer: "Most businesses lose the second order in the quiet spot. We wire it.",
};
const BUILD_JOURNEY: typeof RETENTION_JOURNEY = {
  path: "new product · idea to real", note: "where ideas stall",
  steps: [
    { tone: "is-fir", title: "The idea", body: "Real problem, real conviction." },
    { tone: "is-copper", title: "The plan", body: "Docs, quotes, big scopes." },
    { tone: "is-broken", tag: "The stall", title: "Waiting", body: "Too big to start, too dear to drop." },
    { tone: "is-fixed", tag: "Installed", title: "In hands", body: "A small prototype with ten real users on it." },
  ],
  footer: "Ideas die in the planning gap. A prototype in hands ends the debate.",
};
export function BuildJourneyArtifact() {
  return <JourneyArtifact data={BUILD_JOURNEY} />;
}
export function JourneyArtifact({ data = RETENTION_JOURNEY }: { data?: typeof RETENTION_JOURNEY }) {
  return <article className="v3-artifact sa-jn">
    <WindowBar path={data.path} note={data.note} />
    <div className="sa-jn-body"><ol>
      {data.steps.map(step => <li key={step.title} className={step.tone}>{step.tag && <b>{step.tag}</b>}<h3>{step.title}</h3><span>{step.body}</span></li>)}
    </ol><footer>{data.footer}</footer></div>
  </article>;
}


// H — the storefront teardown: what a page that converts is made of.
export function StorefrontArtifact() {
  return <article className="v3-artifact sa-sf">
    <WindowBar path="the page that converts" note="annotated" />
    <div className="sa-sf-body">
      <div className="sa-sf-el"><span className="sa-sf-tag is-fir">Says what you sell</span><div className="sa-sf-hero">Berries picked this morning. <em>Sold out by noon.</em></div></div>
      <div className="sa-sf-el"><span className="sa-sf-tag is-copper">Proof before the pitch</span><div className="sa-sf-proof"><i>★ 4.9 · 212 reviews</i><i>Featured: Bellingham Herald</i><i>3rd season</i></div></div>
      <div className="sa-sf-el"><span className="sa-sf-tag is-orange">One clear ask</span><div className="sa-sf-cta">Reserve Saturday pickup</div></div>
    </div>
    <footer className="sa-sf-foot">Every element earns its place, or it goes.</footer>
  </article>;
}



// I — the regulars board (Ecommerce & Loyalty, 2026-10-01): a small rewards
// program for Berry Good, our demonstration business. Who is close to a perk,
// who has gone quiet, and the nudge each one gets next. Illustrative numbers.
export function LoyaltyArtifact() {
  const rows: [string, number, string, string][] = [
    ["Greenridge Market", 9, "1 pint to a free flat", "fir"],
    ["The Hendersons", 5, "Halfway to a free flat", "copper"],
    ["Dana R.", 3, "Quiet for 5 weeks: win-back sent", "orange"],
  ];
  return <article className="v3-artifact sa-ly">
    <WindowBar path="berrygood · regulars" note="demo business" />
    <div className="sa-ly-head"><strong>Berry Good regulars</strong><span>Every 10th pint is on the farm</span></div>
    <ul className="sa-ly-rows">{rows.map(([who, pints, next, hue]) => <li key={who}>
      <span className="sa-ly-who">{who}</span>
      <span className="sa-ly-bar" aria-label={`${pints} of 10 pints`}>{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < pints ? `is-${hue}` : undefined} />)}</span>
      <span className={`sa-ly-next is-${hue}`}>{next}</span>
    </li>)}</ul>
    <footer>The punch card, the reminder, and the win-back run on their own. You see who is close.</footer>
  </article>;
}
