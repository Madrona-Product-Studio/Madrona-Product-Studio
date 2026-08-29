// TEMP lab (2026-08-29): the skills + stack + tools artifact — one browser
// window replacing the old bare capabilities panel, merged with the live
// site's tools content. ?tools=a|b|c switches variants; winner gets folded
// in and this file deleted (lock-in rule).
import { useState } from "react";
import { Link } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import { WindowBar } from "./Hero";
import "./practice-window-lab.css";

const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];

// The live /tools gallery: deployable agents with one job each.
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

function Head() {
  return <div className="v3-help-head">
    <p className="v3-kicker">Skills, stack, and tools</p>
    <h2>A whole product practice, <span>made legible.</span></h2>
    <p className="v3-help-lede">Senior judgment across the work, tools chosen for the business rather than the pitch, and working agents you can try today.</p>
  </div>;
}

// a — tabbed window: Skills / Stack / Tools, mirroring the Berry Good window.
function TabbedWindow() {
  const [active, setActive] = useState(0);
  const labels = ["Skills", "Stack", "Tools"];
  return <article className="v3-artifact v3-pw v3-pw-tabbed">
    <header className="v3-window-bar v3-berry-bar">
      <span className="v3-window-dots" aria-hidden="true"><i /><i /><i /></span>
      <code>madronaproduct.com/practice</code>
      <div className="v3-berry-tabs" role="tablist" aria-label="Practice areas">
        {labels.map((label, index) => <button key={label} type="button" role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>{label}</button>)}
      </div>
    </header>
    {active === 0 && <div className="v3-pw-skills">{serviceAreas.map(s => <section key={s.id}><strong>{s.name}</strong>{s.homepageItems.map(i => <span key={i}>{i}</span>)}</section>)}</div>}
    {active === 1 && <div className="v3-pw-stack"><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul><p>Chosen for the business, not the pitch. Boring where boring wins, new where new pays.</p></div>}
    {active === 2 && <div className="v3-pw-tools"><ul>{tools.map(([name, to]) => <li key={to}><Link to={to}>{name} <i aria-hidden="true">→</i></Link></li>)}</ul><p>Working agents with one job each. Every one has a live demo.</p></div>}
  </article>;
}

// b — ledger window: all three layers visible at once as labeled rows.
function LedgerWindow() {
  return <article className="v3-artifact v3-pw v3-pw-ledger">
    <WindowBar path="madronaproduct.com/practice" note="skills · stack · tools" />
    <div className="v3-pw-row">
      <h3>Skills</h3>
      <div className="v3-pw-skills">{serviceAreas.map(s => <section key={s.id}><strong>{s.name}</strong>{s.homepageItems.slice(0, 3).map(i => <span key={i}>{i}</span>)}</section>)}</div>
    </div>
    <div className="v3-pw-row">
      <h3>Stack</h3>
      <ul className="v3-pw-stackline">{stack.map(tool => <li key={tool}>{tool}</li>)}</ul>
    </div>
    <div className="v3-pw-row">
      <h3>Tools</h3>
      <div><ul className="v3-pw-toolchips">{tools.map(([name, to]) => <li key={to}><Link to={to}>{name}</Link></li>)}</ul><Link className="v3-pw-all" to="/tools">Try the live demos <span aria-hidden="true">→</span></Link></div>
    </div>
  </article>;
}

// c — console window: the practice rendered as one skills → stack → tools system.
function ConsoleWindow() {
  return <article className="v3-artifact v3-pw v3-pw-console">
    <WindowBar path="madronaproduct.com/practice/system" note="practice.map — live" />
    <div className="v3-pw-console-head" aria-hidden="true">
      <span>01 / inputs</span><span>02 / runtime</span><span>03 / outputs</span>
    </div>
    <div className="v3-pw-console-grid">
      <section className="v3-pw-console-skills">
        <p className="v3-pw-prompt"><b>$</b> list ./skills --active</p>
        <ol>{serviceAreas.map((area, index) => <li key={area.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{area.name}</strong><small>{area.homepageItems.slice(0, 3).join(" · ")}</small></div>
        </li>)}</ol>
      </section>
      <section className="v3-pw-console-stack">
        <p className="v3-pw-prompt"><b>$</b> resolve --stack</p>
        <ul>{stack.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}<i>ready</i></li>)}</ul>
        <small className="v3-pw-runtime">8 dependencies / 0 lock-in</small>
      </section>
      <section className="v3-pw-console-tools">
        <p className="v3-pw-prompt"><b>$</b> run ./tools</p>
        <ul>{tools.map(([name, to], index) => <li key={to}><Link to={to}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><i aria-hidden="true">↗</i></Link></li>)}</ul>
        <Link className="v3-pw-console-cta" to="/tools">Open all live demos <span aria-hidden="true">→</span></Link>
      </section>
    </div>
    <footer className="v3-pw-console-foot"><span><i /> system ready</span><code>judgment → infrastructure → useful work</code></footer>
  </article>;
}

export function PracticeWindowSection() {
  const variant = new URLSearchParams(window.location.search).get("tools") ?? "b";
  const body = variant === "a" ? <TabbedWindow /> : variant === "c" ? <ConsoleWindow /> : <LedgerWindow />;
  return <section className="v3-section v3-band-light v3-pw-section"><div className="v3-shell"><Head />{body}</div></section>;
}
