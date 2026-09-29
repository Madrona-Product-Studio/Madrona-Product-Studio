import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { HeroChart } from "./HeroChart";
import { WindowBar } from "./ReadCard";

// The hero direction (Charlie, 2026-08-29): the chart-of-the-bay contour
// animation bleeding off the right edge, message left on warm paper.
// The 2026-09-09 density pass cut the assessment's example read and kept the
// services window; the window then read thin as four rows of grey text, so it
// took on the substance the retired practice window used to carry, at a
// fraction of its size (Charlie, same day).
// Positioning clarity pass, 2026-09-29 (Charlie): the hero stopped listing
// four service departments and three audiences. It now says the two things we
// lead with (brand and web, AI in the workflow) and shows one real workflow
// instead of a menu. The window is the marine survey tool, anonymized until
// the client grants reference permission. Its rows are the field-sheet review
// step: the surveyor's shorthand, our reading, and who has to confirm it.
const readings = [
  { sheet: "Minor corrosion on fuel tanks", reading: "Minor corrosion on fuel tanks", area: "Fuel system", status: "Confirmed", tone: "done" },
  { sheet: "Flares x", reading: "Flares expired or missing", area: "Safety equipment", status: "Confirm", tone: "check" },
  { sheet: "ge? detector", reading: "Gas detector, or a generator item?", area: "Unclear", status: "Needs surveyor", tone: "ask" },
];

function HeroCopy() {
  return <div className="v3-home-copy v3-experiment-copy">
    <h1>Better brands, websites, and workflows. <span>Built with AI, done well.</span></h1>
    <p className="v3-lede">For businesses that are better than their brand, their website, or the way their work gets done. We bring twenty years of digital craft and hands-on AI experience, figure out what will actually help, then build it.</p>
    <div className="v3-actions"><Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link><a className="v3-hero-text-link" href="#work" onClick={ctaClick("See the work", "#work", "home-hero")}>See the work <span aria-hidden="true">→</span></a></div>
    <p className="v3-hero-cred">20 years in digital <i aria-hidden="true">·</i> REI <i aria-hidden="true">·</i> Healthline <i aria-hidden="true">·</i> Microsoft, via Iconmobile</p>
  </div>;
}

function WorkflowPanel() {
  return <article className="v3-artifact v3-hero-flow" aria-label="Example: a marine survey report workflow">
    <WindowBar path="marine-survey / field notes to draft" note="client work" />
    <div className="v3-flow-inputs">
      <span>In</span>
      <ul><li><strong>Field sheets</strong><em>photos of handwritten notes</em></li><li><strong>Boat photos</strong><em>straight off the camera</em></li><li><strong>Vessel record</strong><em>by official number</em></li></ul>
    </div>
    <ol className="v3-flow-reads">{readings.map(row => <li key={row.sheet} className={`is-${row.tone}`}>
      <code>&ldquo;{row.sheet}&rdquo;</code>
      <div><strong>{row.reading}</strong><small>{row.area}</small></div>
      <b>{row.status}</b>
    </li>)}</ol>
    <footer className="v3-flow-out"><span>Out</span><p><strong>A draft report in the surveyor&rsquo;s own Word template.</strong> Findings numbered, photos placed, comparable sales pulled. Nothing goes in unconfirmed.</p></footer>
  </article>;
}

export function Hero() {
  return <section className="v3-current-hero v3-hero-plain">
    <div className="v3-shell v3-current-main">
      <HeroCopy />
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-panel-wrap"><WorkflowPanel /><p className="v3-hero-caption">Client work: a marine surveyor&rsquo;s report tool. <a href="#brand">Brand and web work below <span aria-hidden="true">↓</span></a></p></div>
    </div>
  </section>;
}
