import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { serviceAreas, type ServiceId } from "../../data/services";
import { areaByServiceId } from "../../data/areas";
import { imgProps, SIZES } from "../../lib/responsiveImage";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { BriefArtifact } from "./V3Artifacts";
import { BuildJourneyArtifact, IdentityBoardArtifact, JourneyArtifact, StorefrontArtifact, ThreadArtifact, VariantsArtifact } from "./ServiceArtifacts";
import { ProductsShowcase } from "./showcase/ProductsShowcase";
import Reveal from "./Reveal";
import { BERRY_URL } from "../../data/proof";
import { ctaClick, outboundClick } from "../../lib/analytics";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

// The area pages, leaned out (Charlie, 2026-09-30: the V4 pages were
// overwhelming and out of date). Four beats, about half the old length:
// the hero asks the homepage's question, "What we make" is one list with a
// line each (it replaced the value points, the four-column strip, and the
// typical-problems list), two worked examples instead of four, and the
// homepage's one-conversation close. Copy comes from data/areas.ts so the
// homepage and these pages say the same thing.

type Example = { kicker: string; title: string; body: string; link?: { to: string; label: string }; Art: () => ReactElement };

const EXAMPLES: Record<ServiceId, Example[]> = {
  "operations-and-ai": [
    { kicker: "Keep review visible", title: "The agent drafts. You decide.", body: "Questions arrive answered, in your voice, waiting for your okay. Nothing sends itself.", link: { to: "/tools/customer-inbox", label: "Try the customer email demo" }, Art: ThreadArtifact },
    { kicker: "Know what changed", title: "Turn scattered signals into a short brief.", body: "An agent watches the sources that matter, explains what moved, and hands you the next step.", link: { to: "/tools/industry-brief", label: "Try the industry intelligence demo" }, Art: BriefArtifact },
  ],
  "brand-and-web": [
    { kicker: "Brand system", title: "One identity, carried everywhere.", body: "Not a logo file. A small system of color, type, and voice that makes every touchpoint feel like the same business.", Art: IdentityBoardArtifact },
    { kicker: "Website and store", title: "Every element earns its place.", body: "A page that converts is built from a few things doing real work: say what you sell, prove it, ask once.", link: { to: BERRY_URL, label: "Visit the Berry Good storefront" }, Art: StorefrontArtifact },
  ],
  "customers-and-growth": [
    { kicker: "Find the leak", title: "Find the leak, wire the return.", body: "The come-back path usually breaks in one quiet spot. We make it visible, then install the fix.", link: { to: "/tools/post-sale-followup", label: "Try the post-sale follow-up demo" }, Art: () => <JourneyArtifact /> },
    { kicker: "Learn what works", title: "Every send teaches the next one.", body: "Small, honest tests show what brings people back, so decisions stop being taste debates.", link: { to: "/tools/review-requests", label: "Try the review requests demo" }, Art: VariantsArtifact },
  ],
  "new-products": [
    { kicker: "Get it in hands", title: "Skip the stall.", body: "Ideas die in the planning gap. A small prototype with real users on it ends the debate faster than any document.", Art: BuildJourneyArtifact },
    { kicker: "Learn from real use", title: "Ship, then improve what matters.", body: "Once it is live, real usage and small tests show what to keep. We run our own products this way.", link: { to: "/apps", label: "See all our products" }, Art: ProductsShowcase },
  ],
};

// AI & Operations points first-timers at the Resources "Start here" shelf.
const START_HERE: Partial<Record<ServiceId, { to: string; label: string }[]>> = {
  "operations-and-ai": [
    { to: "/thinking/getting-started-with-ai", label: "Read the owner’s guide to getting started" },
    { to: "/thinking/ai-prompt-starter-pack", label: "Copy the prompt starter pack" },
    { to: "/resources#tools", label: "Try all the tool demos" },
  ],
};

function ExampleLink({ link, source }: { link: NonNullable<Example["link"]>; source: string }) {
  return link.to.startsWith("http")
    ? <a href={link.to} target="_blank" rel="noopener noreferrer" onClick={outboundClick(link.to, source)}>{link.label} <span aria-hidden="true">↗</span></a>
    : <Link to={link.to}>{link.label} <span aria-hidden="true">→</span></Link>;
}

export default function ServicePageV4({ serviceId }: { serviceId: ServiceId }) {
  const service = serviceAreas.find((item) => item.id === serviceId) ?? serviceAreas[0];
  const area = areaByServiceId(service.id);
  const start = START_HERE[service.id];
  return (
    <div className="m2 v3">
      <LabMeta title={`${service.name} · Madrona Product Studio`} />
      <M2Nav active="services" />
      <main id="main">

      <section className="v4-hero sp-hero v3-shell">
        <div className="v4-hero-copy">
          <p className="v3-kicker">{area.name}</p>
          <h1>{area.question}</h1>
          <p className="v3-lede">{service.summary}</p>
          <div className="v3-actions">
            <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", `${service.id}-hero`)}>Get in touch</Link>
            {service.tryIt && <Link className="v3-hero-text-link" to={service.tryIt.to} onClick={ctaClick(service.tryIt.label, service.tryIt.to, `${service.id}-hero`)}>{service.tryIt.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
        <figure className="v3-service-proof sp-hero-image"><img {...imgProps(service.artifact.src, SIZES.doorHero)} alt={service.artifact.alt} decoding="async" /><figcaption><span>Working proof</span>{service.artifact.caption}</figcaption></figure>
      </section>

      <Reveal as="section" className="v3-section sp-make">
        <div className="v3-shell sp-make-grid">
          <div>
            <p className="v3-kicker">What we make</p>
            <h2>{area.does}</h2>
          </div>
          <ol className="sp-offer">{area.offer.map((o, i) => <li key={o.name}><span>{String(i + 1).padStart(2, "0")}</span><strong>{o.name}</strong><p>{o.line}</p></li>)}</ol>
        </div>
      </Reveal>

      <section className="v4-modules sp-examples v3-shell">
        <Reveal className="v4-modules-intro"><p className="v3-kicker">See it working</p><h2>Two examples, up close.</h2></Reveal>
        {EXAMPLES[service.id].map(({ kicker, title, body, link, Art }) => (
          <Reveal as="article" className="v4-module rv-stagger" key={title}>
            <div className="v4-module-copy">
              <p className="v3-kicker">{kicker}</p>
              <h3>{title}</h3>
              <p>{body}</p>
              {link && <ExampleLink link={link} source={`${service.id}-example`} />}
            </div>
            <div className="v4-module-art"><Art /></div>
          </Reveal>
        ))}
        {start && <Reveal className="sp-start"><p className="v3-kicker">New to AI?</p><div>{start.map(l => <Link key={l.to} to={l.to}>{l.label} <span aria-hidden="true">→</span></Link>)}</div></Reveal>}
      </section>


      </main>

      <SiteFooter />
    </div>
  );
}
