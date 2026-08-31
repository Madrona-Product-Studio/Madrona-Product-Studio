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

// D — the come-back path with the break visible.
export function JourneyArtifact() {
  return <article className="v3-artifact sa-jn">
    <WindowBar path="customer journey · first order to second" note="where customers leak" />
    <div className="sa-jn-body"><ol>
      <li className="is-fir"><h3>First order</h3><span>They found you, they bought.</span></li>
      <li className="is-copper"><h3>The visit</h3><span>Great experience, no follow-up.</span></li>
      <li className="is-broken"><b>The leak</b><h3>Silence</h3><span>Nothing invites them back.</span></li>
      <li className="is-fixed"><b>Installed</b><h3>The return</h3><span>Thank-you, then a reason to come back, timed right.</span></li>
    </ol><footer>Most businesses lose the second order in the quiet spot. We wire it.</footer></div>
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
