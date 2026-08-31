// The service artifact library (Charlie's picks, 2026-08-30): browser-window
// deliverables that SHOW the work happening — the kinds of assets an
// engagement actually produces. Sheet-approved content, board hues doing the
// semantic color work. Each pairs with a worked-example module slot on the
// V4 service pages; the assessment-v2 report will speak this same language.
import { WindowBar } from "./ReadCard";

// A — the conversation where work happens (agent drafts, human decides).
export function ThreadArtifact() {
  return <article className="v3-artifact sa-thread">
    <WindowBar path="berrygood · customer inbox" note="agent drafts · you decide" />
    <div className="sa-thread-body">
      <div className="sa-msg"><span className="sa-av is-stone">GM</span><div>
        <p className="sa-who">Greenridge Market <small>8:42 AM</small></p>
        <p>Do you have any raspberries left for today?</p></div></div>
      <div className="sa-msg"><span className="sa-av is-charcoal">AI</span><div>
        <p className="sa-who is-plum">Inbox agent <small>8:42 AM</small></p>
        <p>Draft ready: “We have 20 pints picked this morning — want me to hold 6 for your usual pickup?” Inventory checked, price current.</p>
        <div className="sa-acts"><b className="is-go">Send it</b><b>Edit first</b><b>Hold 6 pints</b></div></div></div>
      <div className="sa-msg"><span className="sa-av is-fir">MK</span><div>
        <p className="sa-who">Maya (owner) <small>8:44 AM</small></p>
        <p>Sent. Held the pints.</p></div></div>
      <footer>Drafts wait for you. Nothing sends itself.</footer>
    </div>
  </article>;
}

// B — the week, counted (what the system handled).
export function WeekArtifact() {
  const cells: [string, string, string, string, number][] = [
    ["Orders", "34", "entered from email & voicemail", "fir", 85],
    ["Reminders", "12", "invoices nudged politely", "copper", 60],
    ["Drafts", "6", "waiting for your okay", "stone", 30],
    ["Flags", "2", "needed a human, got one", "orange", 12],
  ];
  return <article className="v3-artifact sa-week">
    <WindowBar path="this week · handled by the system" note="owner reviewed: 15 min" />
    <div className="sa-week-grid">{cells.map(([label, n, sub, hue, pct]) =>
      <section key={label} className={`is-${hue}`}><h3>{label}</h3><strong>{n}</strong><span>{sub}</span><i><b style={{ width: `${pct}%` }} /></i></section>)}
    </div>
    <footer>Counts from the Berry Good demo operation, one real week.</footer>
  </article>;
}

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
export const BUILD_JOURNEY: typeof RETENTION_JOURNEY = {
  path: "new product · idea to real", note: "where ideas stall",
  steps: [
    { tone: "is-fir", title: "The idea", body: "Real problem, real conviction." },
    { tone: "is-copper", title: "The plan", body: "Docs, quotes, big scopes." },
    { tone: "is-broken", tag: "The stall", title: "Waiting", body: "Too big to start, too dear to drop." },
    { tone: "is-fixed", tag: "Installed", title: "In hands", body: "A small prototype with ten real users on it." },
  ],
  footer: "Ideas die in the planning gap. A prototype in hands ends the debate.",
};
export function JourneyArtifact({ data = RETENTION_JOURNEY }: { data?: typeof RETENTION_JOURNEY }) {
  return <article className="v3-artifact sa-jn">
    <WindowBar path={data.path} note={data.note} />
    <div className="sa-jn-body"><ol>
      {data.steps.map(step => <li key={step.title} className={step.tone}>{step.tag && <b>{step.tag}</b>}<h3>{step.title}</h3><span>{step.body}</span></li>)}
    </ol><footer>{data.footer}</footer></div>
  </article>;
}

// G — the identity mini-board: a brand system at a glance (Berry Good).
export function IdentityBoardArtifact() {
  return <article className="v3-artifact sa-id">
    <WindowBar path="berrygood · brand system" note="one identity, every touchpoint" />
    <div className="sa-id-body">
      <div className="sa-id-mark"><strong>Berry Good</strong><span>BERRY FARM</span><p>Roadside-stand editorial. Real fruit, real simple.</p></div>
      <div className="sa-id-side">
        <div className="sa-id-row"><h3>Color</h3><ul>
          <li><i style={{ background: "#B8114D" }} />Raspberry</li>
          <li><i style={{ background: "#3D6B35" }} />Leaf</li>
          <li><i style={{ background: "#FAF5EA" }} />Cream</li>
          <li><i style={{ background: "#33202A" }} />Ink</li>
        </ul></div>
        <div className="sa-id-row"><h3>Type</h3><p className="sa-id-serif">Fraunces</p><p className="sa-id-sans">Karla</p></div>
        <div className="sa-id-row"><h3>Voice</h3><p className="sa-id-voice">"Picked with care in the Nooksack Valley."</p></div>
      </div>
    </div>
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

// E — everything lands somewhere (intake routing).
export function RoutingArtifact() {
  const rows: [string, string, string, string, boolean][] = [
    ["Wholesale order, voicemail", "Orders", "fir", "Entered", true],
    ["Refund ask, tone matters", "Owner", "orange", "Yours", false],
    ["Invoice #241, 3 weeks late", "Bookkeeping", "copper", "Nudged", true],
    ["“Are you open Labor Day?”", "Inbox agent", "plum", "Answered", true],
  ];
  return <article className="v3-artifact sa-rt">
    <WindowBar path="intake · yesterday" note="routed with context" />
    <table>{/* eslint-disable-next-line */}
      <tbody>{rows.map(([what, dest, hue, status, ok]) =>
        <tr key={what}><td>{what}</td><td className={`is-${hue}`}>{dest}</td><td className={ok ? "is-ok" : "is-own"}>{status}</td></tr>)}
      </tbody></table>
  </article>;
}

// F — three versions, one winner (the learn loop).
export function VariantsArtifact() {
  const variants: [string, string, string, string, number, boolean][] = [
    ["Variant A", "“We miss you at the farm stand”", "11%", "stone", 24, false],
    ["Variant B · winner", "“Tayberries are back (3 weeks only)”", "38%", "orange", 82, true],
    ["Variant C", "“10% off your next visit”", "17%", "copper", 37, false],
  ];
  return <article className="v3-artifact sa-vr">
    <WindowBar path="win-back email · subject test" note="sent to 180 lapsed customers" />
    <div className="sa-vr-grid">{variants.map(([label, subject, rate, hue, pct, lead]) =>
      <section key={label} className={lead ? "is-lead" : undefined}><h3>{label}</h3><p>{subject}</p>
        <div className="sa-vr-meter"><strong>{rate}</strong><span>opened</span></div>
        <i className={`is-${hue}`} style={{ width: `${pct}%` }} /></section>)}
    </div>
    <footer>Scarcity beat sentiment and discounts. The next send already knows.</footer>
  </article>;
}
