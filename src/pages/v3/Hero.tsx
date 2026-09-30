// The homepage hero. Copy left (round-2 option H2's headline and lede,
// 2026-09-29); on the right, the four areas as a route run down the page
// (Charlie, 2026-09-30), drawn into the chart of the bay. The "this week" window
// that sat here moved down to area 01 (showcase/WeekShowcase.tsx), and the
// horizontal bridge strip under the hero retired into this column.
import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { HeroChart } from "./HeroChart";
import { HeroRoute } from "./HeroRoute";

export function Hero() {
  return <section className="v3-current-hero v3-hero-plain hw-hero">
    <div className="v3-shell v3-current-main">
      <div className="v3-home-copy v3-experiment-copy hw-copy">
        <p className="v3-kicker">A Pacific Northwest studio</p>
        <h1>Great digital work, <span>with AI built in.</span></h1>
        <p className="v3-lede">We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.</p>
        <div className="v3-actions">
          <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link>
          <a className="v3-hero-text-link" href="#area-ai-operations" onClick={ctaClick("See the work", "#area-ai-operations", "home-hero")}>See the work <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-route-wrap"><HeroRoute /></div>
    </div>
  </section>;
}
