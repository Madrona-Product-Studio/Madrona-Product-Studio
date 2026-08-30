import { Link } from "react-router-dom";
import { serviceAreas, type ServiceId } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { PracticeSection } from "./PracticeSection";
import "../lab/madrona-v2.css";
import "./v3.css";

// The v3 /services overview (Charlie, 2026-08-30): the capability view — the
// four areas in depth, each driving into its dedicated door page, plus the
// engagement model. Distinct from the home (no Berry/apps duplication).
const doorRoutes: Record<ServiceId, string> = {
  "operations-and-ai": "/services/ai-operations",
  "customers-and-growth": "/services/growth-retention",
  "brand-and-web": "/services/brand-website",
  "new-products": "/services/new-products",
};

function ServiceArea({ area, index }: { area: typeof serviceAreas[number]; index: number }) {
  const light = index % 2 === 1;
  return <section className={`v3-section v3-svc-area${light ? " v3-band-light v3-svc-flip" : ""}`}>
    <div className="v3-shell v3-svc-area-inner">
      <div className="v3-svc-rail">
        <p className="v3-kicker">0{index + 1} · {area.name}</p>
        <h2>{area.outcome}</h2>
        <p className="v3-help-lede">{area.summary}</p>
        <ul className="v3-svc-offerings">{area.homepageItems.map(item => <li key={item}>{item}</li>)}</ul>
        <Link className="v3-practice-link" to={doorRoutes[area.id]}>Explore {area.name} <span aria-hidden="true">→</span></Link>
      </div>
      <figure className="v3-svc-art">
        <img src={area.artifact.src} alt={area.artifact.alt} loading="lazy" />
        <figcaption>{area.artifact.caption}</figcaption>
      </figure>
    </div>
  </section>;
}

export default function ServicesV3() {
  useCalEmbed();
  return <main className="m2 v3">
    <LabMeta title="How we help · Madrona Product Studio" />
    <M2Nav active="services" />

    <section className="v3-current-hero v3-svc-hero">
      <div className="v3-shell">
        <p className="v3-kicker">How we help</p>
        <h1>Four ways in. <span>One practice.</span></h1>
        <p className="v3-lede">We help you find the highest-leverage move, make it real, and let the work compound. The doors are different; the practice behind them is the same.</p>
        <div className="v3-actions">
          <a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a free 30-minute call</a>
          <Link className="v3-hero-text-link" to="/where-to-start">Find where to start <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    {serviceAreas.map((area, index) => <ServiceArea area={area} index={index} key={area.id} />)}

    <PracticeSection />

    <SiteFooter cta />
  </main>;
}
