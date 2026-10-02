import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { serviceAreas, type ServiceId } from "../../data/services";
import { areaByServiceId } from "../../data/areas";
import { SETUP_SPRINT } from "../../data/offer";
import { imgProps, SIZES } from "../../lib/responsiveImage";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { BriefArtifact } from "./V3Artifacts";
import { BeforeAfterArtifact, BuildJourneyArtifact, IdentityBoardArtifact, LoyaltyArtifact, StorefrontArtifact, ThreadArtifact } from "./ServiceArtifacts";
import { ProductsShowcase } from "./showcase/ProductsShowcase";
import Reveal from "./Reveal";
import { BERRY_URL } from "../../data/proof";
import { ctaClick, outboundClick } from "../../lib/analytics";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

// The area pages, leaned out (Charlie, 2026-09-30: the V4 pages were
// overwhelming and out of date). Four beats, about half the old length:
// the hero states the homepage's headline, "What we make" is one list with a
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
    { kicker: "Website", title: "Say the specific thing.", body: "Most sites say what everyone says. We find the line only you can say, then build the site around it.", link: { to: "https://www.sjiboating.com/", label: "See a site we built and run: sjiboating.com" }, Art: BeforeAfterArtifact },
  ],
  "ecommerce-and-loyalty": [
    { kicker: "The store", title: "Every element earns its place.", body: "A store that sells says what you sell, proves it, and asks once. Then checkout gets out of the way.", link: { to: BERRY_URL, label: "Visit the Berry Good storefront" }, Art: StorefrontArtifact },
    { kicker: "The second order", title: "Turn first orders into regulars.", body: "A simple rewards program, a reminder when someone is close, and a win-back when they go quiet. Mostly automated, and you see who is close.", link: { to: "/tools/post-sale-followup", label: "Try the post-sale follow-up demo" }, Art: LoyaltyArtifact },
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
          <h1>{area.headline}</h1>
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

      {service.id === "operations-and-ai" && <Reveal as="section" className="v3-section sp-sprint" id="setup-sprint" aria-labelledby="sp-sprint-h">
        <div className="v3-shell sp-sprint-grid">
          <div>
            <p className="v3-kicker">The fixed-price start</p>
            <h2 id="sp-sprint-h">{SETUP_SPRINT.name}</h2>
            <p className="sp-sprint-promise">{SETUP_SPRINT.promise}</p>
            <p className="sp-sprint-fine"><strong>{SETUP_SPRINT.price}.</strong> {SETUP_SPRINT.terms}</p>
            <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "setup-sprint")}>Get in touch</Link>
          </div>
          <div>
            <ul className="sp-offer sp-sprint-scope">{SETUP_SPRINT.scope.map((it, i) => <li key={it.name}><span>{String(i + 1).padStart(2, "0")}</span><strong>{it.name}</strong><p>{it.line}</p></li>)}</ul>
            <p className="sp-sprint-note">{SETUP_SPRINT.tools} {SETUP_SPRINT.after}</p>
          </div>
        </div>
      </Reveal>}

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
