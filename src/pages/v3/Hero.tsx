import { Link } from "react-router-dom";
import { serviceAreas, type ServiceId } from "../../data/services";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { HeroChart } from "./HeroChart";

// The hero direction (Charlie, 2026-08-29): the chart-of-the-bay contour
// animation bleeding off the right edge (replaced the six-photo rotation),
// message left on warm paper, and two browser-window artifacts (2026-08-28):
// the signal-check example and a plain-words what-we-do window.
const doorRoutes: Record<string, string> = { "operations-and-ai": "/services/ai-operations", "customers-and-growth": "/services/growth-retention", "brand-and-web": "/services/brand-website", "new-products": "/services/new-products" };

// Condensed from each door's homepageItems: the hero window leads with the
// concrete nouns so a first-time visitor can tell what we do at a glance.
const serviceLines: Record<ServiceId, string> = {
  "operations-and-ai": "Automation, AI agents, internal tools",
  "customers-and-growth": "Commerce, loyalty, lifecycle email",
  "brand-and-web": "Positioning, identity, websites and stores",
  "new-products": "Strategy, prototypes, MVPs",
};

function HeroCopy() {
  return <div className="v3-home-copy v3-experiment-copy">
    <h1>A senior product studio <span>for the AI era.</span></h1>
    <p className="v3-lede">We help businesses figure out what AI and modern tools can actually do for them, then build it.</p>
    <div className="v3-actions"><a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a free 30-minute call</a><Link className="v3-hero-text-link" to="/checkup">Take the free signal check <span aria-hidden="true">→</span></Link></div>
  </div>;
}

export function WindowBar({ path, note }: { path: string; note?: string }) {
  return <header className="v3-window-bar"><span className="v3-window-dots" aria-hidden="true"><i /><i /><i /></span><code>{path}</code>{note && <small>{note}</small>}</header>;
}

function DiagnosticCard() {
  const rows = [["Web presence", "Underselling"], ["Repeat customers", "Leaking away"], ["Hours lost to admin", "12+ a week"], ["AI leverage", "Untapped"]];
  const better = [["Clearer offer", "76%"], ["Repeat path", "54%"], ["Admin relief", "68%"]];
  return <article className="v3-artifact v3-wide-diagnostic" aria-label="Signal check example diagnostic">
    <WindowBar path="madronaproduct.com/signal-check" note="example read" />
    <div className="v3-diagnostic-panes">
      <section><h2>Current signals</h2><ul className="v3-diagnostic-status">{rows.map(([label, status], index) => <li key={label}><span>{label}</span><strong className={index === 3 ? "is-bark" : ""}>{status}</strong></li>)}</ul></section>
      <section><h2>What better looks like</h2><ul className="v3-better-bars">{better.map(([label, width], index) => <li key={label}><span>{label}</span><i><b className={index === 2 ? "is-bark" : ""} style={{ width }} /></i><small>{index === 0 ? "Clear" : index === 1 ? "Connected" : "Useful"}</small></li>)}</ul></section>
      <section className="v3-recommendation-pane"><h2>First recommendation</h2><p>Fix the highest-friction handoff before adding another tool.</p><span>Start with the workflow people already repeat.</span></section>
    </div>
  </article>;
}

// The second hero artifact (rethought 2026-08-28): what we do, in concrete
// nouns, so the practice is legible on landing. Door phrases stay on the
// service pages themselves.
function ServicesPanel() {
  return <article className="v3-artifact v3-hero-services">
    <WindowBar path="madronaproduct.com/services" note="four ways in" />
    <ul>{serviceAreas.map(service => <li key={service.id}><Link to={doorRoutes[service.id]}><strong>{service.name}</strong><span>{serviceLines[service.id]}</span><i aria-hidden="true">→</i></Link></li>)}</ul>
  </article>;
}

export function Hero() {
  return <section className="v3-current-hero">
    <div className="v3-shell v3-current-main">
      <HeroCopy />
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-current-cluster"><DiagnosticCard /><div className="v3-current-proof-wrap"><ServicesPanel /></div></div>
    </div>
  </section>;
}
