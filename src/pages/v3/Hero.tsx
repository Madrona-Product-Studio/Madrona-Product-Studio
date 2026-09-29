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
// Homepage refactor, 2026-09-29 (Charlie): the headline says what the studio
// is and that the proof follows; the secondary CTA became "See the work"; the
// window rows now preview the four area spreads below and jump to them.
// Real things we've built, one row per area (homepage refactor, 2026-09-29).
// These replaced the small-business chores ("Invoice chasing · Month-end
// close") so the window previews the proof below it, not a task menu. Each
// chip names something that exists as a product, a demo, or labeled client
// work in the area spread it points at. Review pass (same day): the lede says
// the promise once and leaves the labeling to the spreads; the window note
// says "examples", since its first chip is illustrative client work, not
// something built here first; "Customer assistants" became "Review requests"
// (Lila Yoga is a cited static corpus, not an assistant).
const examples: Record<ServiceId, string[]> = {
  "operations-and-ai": ["Field notes to reports", "Month-end agents", "Ops dashboards"],
  "brand-and-web": ["Brand systems", "Storefronts", "Local guides"],
  "customers-and-growth": ["Win-back flows", "Review requests", "Onboarding"],
  "new-products": ["AI trip planning", "Live maps", "Voice intake"],
};

// Each row jumps to its area spread on this page, where the examples are shown
// and labeled; the spread carries the link on to the service page.
const areaAnchors: Record<ServiceId, string> = { "operations-and-ai": "ai-operations", "brand-and-web": "brand-website", "customers-and-growth": "growth-retention", "new-products": "new-products" };

// The stack the practice window used to list in full. Eight marks is enough to
// place us: the build tools, then the run-the-business roster.
const STACK = ["anthropic", "cursor", "vercel", "github", "shopify", "stripe", "quickbooks", "square"];

function HeroCopy() {
  return <div className="v3-home-copy v3-experiment-copy">
    <h1>A full-service digital studio <span>with the work to prove it.</span></h1>
    <p className="v3-lede">Great websites, practical AI tools, and new products, built by a small senior team with specialists brought in as needed. Most of what follows we built for ourselves first. We can build it for you.</p>
    <div className="v3-actions"><Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link><a className="v3-hero-text-link" href="#area-ai-operations" onClick={ctaClick("See the work", "#area-ai-operations", "home-hero")}>See the work <span aria-hidden="true">→</span></a></div>
  </div>;
}

function ServicesPanel() {
  return <article className="v3-artifact v3-hero-services">
    <WindowBar path="madronaproduct.com/services" note="Examples of our work" />
    <ul>{serviceAreas.map(service => <li key={service.id}><a href={`#area-${areaAnchors[service.id]}`}>
      <strong>{service.name}</strong>
      <span className="v3-hero-chips">{examples[service.id].map(item => <em key={item}>{item}</em>)}</span>
      <i aria-hidden="true">↓</i>
    </a></li>)}</ul>
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
