import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { serviceAreas, type ServiceId } from "../../data/services";
import { HeroChart } from "./HeroChart";
import { WindowBar } from "./ReadCard";

// The hero direction (Charlie, 2026-08-29): the chart-of-the-bay contour
// animation bleeding off the right edge, message left on warm paper.
// The 2026-09-09 density pass cut the assessment's example read — a stranger
// had to decode a three-part report card before learning what the studio is —
// and kept the services window (Charlie, same day): it is the fastest answer
// to "what do you actually do", so it earns the fold. The two artifacts used
// to overlap in a cluster below the copy; with one left, the hero is a plain
// two-column spread, copy against panel, art behind both.
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
    <h1>A senior digital product studio <span>built for the AI era.</span></h1>
    <p className="v3-lede">We help founders, local businesses, and product teams leverage AI and modern tools to build what actually moves the business.</p>
    <div className="v3-actions"><Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link><Link className="v3-hero-text-link" to="/ai-opportunities" onClick={ctaClick("Find your AI opportunities", "/ai-opportunities", "home-hero")}>Find your AI opportunities <span aria-hidden="true">→</span></Link></div>
  </div>;
}

function ServicesPanel() {
  return <article className="v3-artifact v3-hero-services">
    <WindowBar path="madronaproduct.com/services" note="four ways in" />
    <ul>{serviceAreas.map(service => <li key={service.id}><Link to={doorRoutes[service.id]}><strong>{service.name}</strong><span>{serviceLines[service.id]}</span><i aria-hidden="true">→</i></Link></li>)}</ul>
  </article>;
}

export function Hero() {
  return <section className="v3-current-hero v3-hero-plain">
    <div className="v3-shell v3-current-main">
      <HeroCopy />
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-panel-wrap"><ServicesPanel /></div>
    </div>
  </section>;
}
