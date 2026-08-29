import { Link } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import { WindowBar } from "./Hero";

// The practice window (locked 2026-08-29): skills, stack, and tools as one
// browser-window ledger. Stack shows best-in-class marks across the business
// lifecycle (Charlie's roster; Codex + Klaviyo marks pending — they render
// as letter chips until sourced). The engine layer was considered and cut
// as too much for this artifact.
const stackItems: { name: string; mark?: string }[] = [
  { name: "Claude Code", mark: "/images/stack/anthropic.svg" },
  { name: "Codex" },
  { name: "GitHub", mark: "/images/stack/github.svg" },
  { name: "Vercel", mark: "/images/stack/vercel.svg" },
  { name: "Shopify", mark: "/images/stack/shopify.svg" },
  { name: "Stripe", mark: "/images/stack/stripe.svg" },
  { name: "QuickBooks", mark: "/images/stack/quickbooks.svg" },
  { name: "Square", mark: "/images/stack/square.svg" },
  { name: "Klaviyo" },
  { name: "Cal.com", mark: "/images/stack/caldotcom.svg" },
  { name: "GA4", mark: "/images/stack/googleanalytics.svg" },
];

// Coming-soon entries cover the rest of the skills journey (unlinked until
// their live demos exist on the agent engine).
const upcomingTools = ["SEO health check", "Content drafts", "Win-back emails", "Landing page test"];

const tools = [
  ["Month-end close", "/tools/month-end-close"],
  ["Invoice chasing", "/tools/invoice-chasing"],
  ["Industry brief", "/tools/industry-brief"],
  ["Customer inbox", "/tools/customer-inbox"],
  ["Cash position", "/tools/cash-position"],
  ["Payroll planning", "/tools/payroll-planning"],
  ["Post-sale follow-up", "/tools/post-sale-followup"],
  ["Review requests", "/tools/review-requests"],
  ["Best customers", "/tools/best-customers"],
  ["Contract review", "/tools/contract-review"],
];

export function PracticeWindowSection() {
  return <section className="v3-section v3-band-light v3-pw-section"><div className="v3-shell">
    <div className="v3-help-head">
      <p className="v3-kicker">Skills, stack, and tools</p>
      <h2>A whole product practice, <span>made legible.</span></h2>
      <p className="v3-help-lede">Senior judgment across the work, tools chosen for the business rather than the pitch, and working agents you can try today.</p>
    </div>
    <article className="v3-artifact v3-pw v3-pw-ledger">
      <WindowBar path="madronaproduct.com/practice" note="skills · stack · tools" />
      <div className="v3-pw-row">
        <h3>Skills</h3>
        <div className="v3-pw-skills">{serviceAreas.map(s => <section key={s.id}><strong>{s.name}</strong>{s.homepageItems.slice(0, 3).map(i => <span key={i}>{i}</span>)}</section>)}</div>
      </div>
      <div className="v3-pw-row">
        <h3>Stack</h3>
        <ul className="v3-pw-marks">{stackItems.map(item => <li className="v3-pw-mark" key={item.name}>{item.mark ? <img src={item.mark} alt="" loading="lazy" /> : <i aria-hidden="true">{item.name[0]}</i>}<span>{item.name}</span></li>)}</ul>
      </div>
      <div className="v3-pw-row">
        <h3>Tools</h3>
        <div><ul className="v3-pw-toolchips">{tools.map(([name, to]) => <li key={to}><Link to={to}>{name}</Link></li>)}{upcomingTools.map(name => <li key={name} className="v3-pw-soon">{name}</li>)}</ul><Link className="v3-pw-all" to="/tools">Try the live demos <span aria-hidden="true">→</span></Link></div>
      </div>
    </article>
  </div></section>;
}
