import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { serviceAreas, type ServiceId } from "../../data/services";
import { HeroChart } from "./HeroChart";
import { WindowBar } from "./ReadCard";

// The hero direction (Charlie, 2026-08-29): the chart-of-the-bay contour
// animation bleeding off the right edge, message left on warm paper.
// The 2026-09-09 density pass cut the assessment's example read and kept the
// services window; the window then read thin as four rows of grey text, so it
// took on the substance the retired practice window used to carry, at a
// fraction of its size (Charlie, same day).
const doorRoutes: Record<string, string> = { "operations-and-ai": "/services/ai-operations", "customers-and-growth": "/services/growth-retention", "brand-and-web": "/services/brand-website", "new-products": "/services/new-products" };

// Concrete things we actually make, one row each. These replaced the abstract
// capability nouns ("Automation, AI agents, internal tools"): a business owner
// learns more from "Invoice chasing · Customer inbox · Month-end close".
const examples: Record<ServiceId, string[]> = {
  "operations-and-ai": ["Invoice chasing", "Customer inbox", "Month-end close"],
  "brand-and-web": ["Brand systems", "Storefronts", "Landing pages"],
  "customers-and-growth": ["Loyalty programs", "Win-back email", "Repeat ordering"],
  "new-products": ["Prototypes", "MVPs", "AI features"],
};

// The stack the practice window used to list in full. Eight marks is enough to
// place us: the build tools, then the run-the-business roster.
const STACK = ["anthropic", "cursor", "vercel", "github", "shopify", "stripe", "quickbooks", "square"];

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
    <ul>{serviceAreas.map(service => <li key={service.id}><Link to={doorRoutes[service.id]}>
      <strong>{service.name}</strong>
      <span className="v3-hero-chips">{examples[service.id].map(item => <em key={item}>{item}</em>)}</span>
      <i aria-hidden="true">→</i>
    </Link></li>)}</ul>
    <footer className="v3-hero-stack">
      <span>We build with</span>
      <ul>{STACK.map(mark => <li key={mark}><img src={`/images/stack/${mark}.svg`} alt="" loading="lazy" /></li>)}</ul>
    </footer>
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
