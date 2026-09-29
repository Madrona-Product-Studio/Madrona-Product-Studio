// TEMP round-2 option (2026-09-29). H4 · The place.
// Brief: docs/positioning-2026-09/round2-brief.md
// Minimal and typographic. The contour chart stops being background texture
// and becomes the hero's one image: a framed chart plate with a single
// place marker where the latitude and longitude lines cross. The marker
// uses the same coordinates the sky engine runs on (src/lib/theme.ts), so
// the plate, the chart, and the day/dusk/night themes all agree on where
// "here" is. HeroChart stamps those coordinates in its own corner; the plate
// crops that stamp off, since the marker label now carries them.
import { Link } from "react-router-dom";
import { ctaClick } from "../../../lib/analytics";
import { LAT, LON } from "../../../lib/theme";
import { HeroChart } from "../../v3/HeroChart";
import "./hero-place.css";

// 48.7491 → 48°44.9′. Degrees and decimal minutes, the way a chart labels
// its edges.
function dm(value: number) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = ((abs - deg) * 60).toFixed(1);
  return `${deg}°${min}′`;
}

const CAPABILITIES = ["Websites and brands", "New products", "AI inside the business"];

export function HeroPlace() {
  const lat = `${LAT.toFixed(4)}° N`;
  const lon = `${Math.abs(LON).toFixed(4)}° W`;
  return <section className="v3-current-hero v3-hero-plain hp">
    <div className="v3-shell v3-current-main hp-main">
      <div className="v3-home-copy v3-experiment-copy hp-copy">
        <h1>Digital work that makes the business better. <span>From the Pacific Northwest.</span></h1>
        <p className="v3-lede">We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.</p>
        <div className="v3-actions">
          <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "r2-hero-place")}>Get in touch</Link>
          <a className="v3-hero-text-link" href="#work" onClick={ctaClick("See the work", "#work", "r2-hero-place")}>See the work <span aria-hidden="true">→</span></a>
        </div>
        <ul className="hp-caps" aria-label="What we do">
          {CAPABILITIES.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>

      <figure className="hp-plate">
        <div className="hp-chart" aria-hidden="true">
          <div className="hp-chart-art"><HeroChart /></div>
          <i className="hp-rule hp-rule--lat" />
          <i className="hp-rule hp-rule--lon" />
          <span className="hp-edge hp-edge--lat">{dm(LAT)} N</span>
          <span className="hp-edge hp-edge--lon">{dm(LON)} W</span>
          <span className="hp-marker"><b /></span>
        </div>
        <figcaption className="hp-label">
          <strong>Bellingham Bay</strong>
          <span>{lat}, {lon}</span>
        </figcaption>
      </figure>
    </div>
  </section>;
}
