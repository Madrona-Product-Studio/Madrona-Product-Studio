import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { HeroChart } from "./HeroChart";

// The hero direction (Charlie, 2026-08-29): the chart-of-the-bay contour
// animation bleeding off the right edge, message left on warm paper.
// The two browser-window artifacts (the assessment's example read and the
// four-ways-in services panel) were cut in the 2026-09-09 density pass: the
// four services were being stated three times on one scroll, and a stranger
// had to decode a three-part report card before learning what the studio is.
// The services now land once, in the question ledger directly below.
function HeroCopy() {
  return <div className="v3-home-copy v3-experiment-copy">
    <h1>A senior digital product studio <span>built for the AI era.</span></h1>
    <p className="v3-lede">We help founders, local businesses, and product teams leverage AI and modern tools to build what actually moves the business.</p>
    <div className="v3-actions"><Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link><Link className="v3-hero-text-link" to="/ai-opportunities" onClick={ctaClick("Find your AI opportunities", "/ai-opportunities", "home-hero")}>Find your AI opportunities <span aria-hidden="true">→</span></Link></div>
  </div>;
}

export function Hero() {
  return <section className="v3-current-hero v3-hero-plain">
    <div className="v3-shell v3-current-main">
      <HeroCopy />
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
    </div>
  </section>;
}
