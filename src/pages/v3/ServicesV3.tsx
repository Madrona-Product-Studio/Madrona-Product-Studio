import { Link } from "react-router-dom";
import { AREAS } from "../../data/areas";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { PracticeSection } from "./PracticeSection";
import Reveal from "./Reveal";
import { ctaClick } from "../../lib/analytics";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

// /services, streamlined (Charlie, 2026-09-30: the old overview had become
// the homepage again). A short index of the four areas, each a compact row
// that leads to its page, then the one thing that lives only here: how an
// engagement runs, step by step.
export default function ServicesV3() {
  return <div className="m2 v3">
    <LabMeta title="Services · Madrona Product Studio" />
    <M2Nav active="services" />
    <main id="main">

    <section className="v3-shell sv-hero">
      <p className="v3-kicker">Services</p>
      <h1>Four areas. <span>One senior team.</span></h1>
      <p className="v3-lede">Pick the one that sounds like what you need. Every engagement starts the same way: one free conversation.</p>
    </section>

    <Reveal as="section" className="v3-shell sv-index" aria-label="The four areas">
      <ol>{AREAS.map((a, i) => <li key={a.slug}>
        <Link to={a.route}>
          <span className="sv-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="sv-name">{a.name}</span>
          <span className="sv-body"><strong>{a.headline}</strong><em>{a.does}</em></span>
          <span className="sv-go" aria-hidden="true">→</span>
        </Link>
      </li>)}</ol>
      <p className="sv-assess">Not sure which fits? <Link to="/ai-opportunities" onClick={ctaClick("Find your AI opportunities", "/ai-opportunities", "services-index")}>Take the free two-minute assessment <span aria-hidden="true">→</span></Link></p>
    </Reveal>

    <PracticeSection />

    </main>

    <SiteFooter />
  </div>;
}
