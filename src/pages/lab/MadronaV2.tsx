import { useState } from "react";
import LabMeta from "./LabMeta";
import MadronaLogo from "./MadronaLogo";
import BerryGoodCaseStudy from "./BerryGoodCaseStudy";
import "./madrona-v2.css";

import heroImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/hero-pnw-coast-wide.webp";
import heroMountain from "../../../docs/madrona-v2-build-kit/hero-options/hero-mountain-dawn.webp";
import heroCoast from "../../../docs/madrona-v2-build-kit/hero-options/hero-coastal-sunset.webp";
import heroIslandNatural from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-natural.webp";
import heroIslandEditorial from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-editorial.webp";
import heroIslandEnhanced from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-ai-enhanced.webp";
import studioImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/studio-collaboration-wide.webp";
import berryImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp";
import berryOperationsImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-card.webp";
import farmsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-farms-food.webp";
import outdoorsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-outdoor-travel.webp";
import healthImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-health-wellness.webp";
import shopsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-shops-services.webp";
import lilaHero from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-madrona-hero.webp";
import lilaHeroMobile from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-edge-of-the-continent-mobile.webp";
import lilaSupporting from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-madrona-supporting.webp";
import lilaWordmark from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-wordmark-dark.svg";
import sanImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/san-juan-product-proof-wide.webp";

const services = [
  { title: "Brand and growth", lead: "Stand out and stay top of mind.", body: "Positioning, identity, commerce, and customer journeys that help people choose you—and keep coming back.", type: "brand" },
  { title: "New Products & Services", lead: "Build what’s next with real evidence.", body: "Research, prototypes, and focused builds that test demand before the larger investment.", type: "product" },
  { title: "Operations and AI", lead: "Give busywork back to software.", body: "Practical tools and automation that reduce handoffs, simplify decisions, and protect your team’s time.", type: "ops" },
] as const;

const routes = [
  { label: "Direct crossing", distance: "Approx. 20 NM", duration: "2.5–3.5 hours", note: "Faster, with fewer protected fallback points.", verify: "Wind · visibility · fuel · notices" },
  { label: "Island-protected", distance: "Approx. 25 NM", duration: "3.5–5 hours", note: "Longer, with more route choices and possible stops.", verify: "Depths · currents · anchorages · restrictions" },
] as const;

function OfferIcon({ type }: { type: typeof services[number]["type"] }) {
  if (type === "brand") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 35c8-1 13-6 15-15M17 30c-3-2-5-5-5-9 5 0 9 2 11 6m5-6c0-5 3-9 8-11 1 7-1 12-8 15m-15 12h24" /></svg>;
  if (type === "product") return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 34c5-12 11-19 20-22 1 9-2 17-12 22m-8 0h20M19 29l-5-5m13 3 7 1" /><circle cx="25" cy="20" r="2.5" /></svg>;
  return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="8"/><path d="M24 7v6m0 22v6M7 24h6m22 0h6M12 12l5 5m14 14 5 5m0-24-5 5M17 31l-5 5" /></svg>;
}

function AudienceIcon({ type }: { type: "farms" | "outdoors" | "health" | "shops" }) {
  if (type === "farms") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9m0 5c-4 0-7-2.4-7-6 4 0 7 2.4 7 6Zm0-4c0-3.6 2.7-6 7-6 0 3.6-2.7 6-7 6Z" /></svg>;
  if (type === "outdoors") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 18 6.3-10 3.1 4.7 2.2-3.2 5.4 8.5H3.5Z" /><path d="m7.3 12 2.5-4 1.8 2.7M9.5 18c1.8-2.3 3.7-3 5.8-2.2" /></svg>;
  if (type === "health") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.7c0 5.1-8 10.1-8 10.1S4 13.8 4 8.7C4 4 9.8 3 12 6.8 14.2 3 20 4 20 8.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16M6 10v10h12V10M5 10l1.5-5h11l1.5 5M9 20v-6h6v6" /></svg>;
}

function EvidenceOverlay({ label, flow, detail }: { label: string; flow: string; detail: string }) {
  return <div className="m2-evidence-overlay"><small>{label}</small><strong>{flow}</strong><span><i />{detail}</span></div>;
}

function OfferVisual({ type }: { type: typeof services[number]["type"] }) {
  if (type === "brand") return <div className="m2-offer-visual m2-offer-brand"><img src={berryImage} alt="Berry Good demonstration brand and commerce system shown across packaging and a digital interface" /><EvidenceOverlay label="Customer path" flow="Attention → purchase → loyalty" detail="A clearer reason to choose and return" /></div>;
  if (type === "product") return <div className="m2-offer-visual m2-offer-product"><img src={sanImage} alt="A route-planning product prototype shown across digital interfaces" /><EvidenceOverlay label="Validation path" flow="Problem → prototype → pilot" detail="Evidence before investment" /></div>;
  return <div className="m2-offer-visual m2-offer-ops"><img src={berryOperationsImage} alt="Berry Good wholesale order moving through inventory, pickup scheduling, and an AI operations assistant" /><EvidenceOverlay label="Operations path" flow="Request → decision → action" detail="Less manual coordination" /></div>;
}

const ownApps = [
  { name: "Lila Trips", short: "Lila", wordmark: lilaWordmark, status: "Live", tagline: "Adventure travel, authored not generated.", blurb: "Destination knowledge, live context, and personal intent, shaped into trips that hold together.", image: lilaHero, href: "https://lilatrips.com" },
  { name: "San Juan Boating Guide", short: "San Juan Boating Guide", wordmark: null, status: "Beta", tagline: "Route context for the Salish Sea.", blurb: "Local planning and on-water context for boaters exploring the San Juan Islands.", image: sanImage, href: "#" },
] as const;

function AppCard({ app, className = "" }: { app: (typeof ownApps)[number]; className?: string }) {
  return (
    <a className={`m2-app-card ${className}`} href={app.href}>
      <div className="m2-app-shot" role="img" aria-label={`${app.name} preview image placeholder`}><span>{app.name}</span><small>App preview</small></div>
      <div className="m2-app-meta">
        <span className="m2-chip">Madrona-owned · {app.status}</span>
        {app.wordmark ? <img className="m2-app-wordmark" src={app.wordmark} alt={app.name} /> : <h3>{app.name}</h3>}
        <p className="m2-app-tagline">{app.tagline}</p>
        <p className="m2-app-blurb">{app.blurb}</p>
        <span className="m2-text-link">Visit {app.short} <span>→</span></span>
      </div>
    </a>
  );
}

function SeeAllApps({ className = "" }: { className?: string }) {
  return <a className={`m2-text-link ${className}`} href="#">See all our apps <span>→</span></a>;
}

function AppsShowcase({ variant }: { variant: string }) {
  if (variant === "b") {
    return (
      <div className="m2-apps-feature">
        <AppCard app={ownApps[0]} className="m2-app-featured" />
        <AppCard app={ownApps[1]} />
      </div>
    );
  }
  if (variant === "c") {
    return (
      <div className="m2-apps-shelf">
        {ownApps.map((app) => <AppCard app={app} key={app.name} />)}
        <a className="m2-apps-more" href="#"><span className="m2-kicker">More from the studio</span><strong>See all our apps</strong><span className="m2-apps-more-arrow">→</span></a>
      </div>
    );
  }
  return <div className="m2-apps-grid">{ownApps.map((app) => <AppCard app={app} key={app.name} />)}</div>;
}

export default function MadronaV2() {
  const [route, setRoute] = useState(0);
  const heroChoice = new URLSearchParams(window.location.search).get("hero");
  const heroOptions = {
    coast: { image: heroCoast, className: "m2-hero-coast", alt: "Pebble shoreline and forested headland at sunset" },
    mountain: { image: heroMountain, className: "m2-hero-mountain", alt: "Pacific Northwest mountain ridge beneath a softly colored dawn sky" },
    island: { image: heroIslandNatural, className: "m2-hero-island", alt: "Sun rays breaking through clouds above a forested island" },
    editorial: { image: heroIslandEditorial, className: "m2-hero-island", alt: "Warm sunlight breaking through clouds above a forested island" },
    enhanced: { image: heroIslandEnhanced, className: "m2-hero-island m2-hero-enhanced", alt: "Golden sunlight breaking through clouds above a forested island" },
    original: { image: heroImage, className: "m2-hero-original", alt: "Rocky Pacific Northwest coastline with evergreen trees" },
  } as const;
  const selectedHero = heroOptions[heroChoice as keyof typeof heroOptions] ?? heroOptions.enhanced;
  const appsVariant = new URLSearchParams(window.location.search).get("apps") ?? "a";

  return (
    <main className="m2">
      <LabMeta title="Madrona Product Studio · V2 Concept" />
      <header className="m2-nav">
        <a className="m2-logo-link" href="#top" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
        <nav aria-label="Primary"><a href="#services">Services</a><a href="#process">Approach</a><a href="#products">Our apps</a><a href="#studio">About</a></nav>
        <a className="m2-button m2-nav-cta" href="/connect">Let’s connect</a>
      </header>

      <section id="top" className="m2-hero">
        <div className="m2-hero-copy">
          <p className="m2-kicker">PNW-based digital product studio</p>
          <h1>Good businesses around here deserve software as good as <span className="m2-keep-together">they are.</span></h1>
          <p className="m2-lead">Madrona helps established businesses improve how they look, sell, and operate. We clarify the problem, design the right solution, and build it with a small senior team.</p>
          <div className="m2-actions"><a className="m2-button" href="/connect">Start a conversation</a><a className="m2-button m2-button-secondary" href="#process">See how we work</a></div>
        </div>
        <div className={`m2-hero-visual ${selectedHero.className}`}><img src={selectedHero.image} alt={selectedHero.alt} /></div>
      </section>

      <section className="m2-audiences" aria-labelledby="audience-title">
        <div className="m2-audience-intro"><p className="m2-kicker">Built for businesses that care deeply</p><h2 id="audience-title">Where people, place, and purpose <span className="m2-keep-together">come first.</span></h2><p>We partner with grounded teams whose work makes everyday life richer.</p></div>
        <div className="m2-audience-grid">
          {[
            { image: farmsImage, type: "farms" as const, title: "Farms and food", copy: "From soil to shelf" },
            { image: outdoorsImage, type: "outdoors" as const, title: "Outdoor and travel", copy: "Journeys with substance" },
            { image: healthImage, type: "health" as const, title: "Health and wellness", copy: "Care through clarity" },
            { image: shopsImage, type: "shops" as const, title: "Shops and services", copy: "Local businesses, stronger" },
          ].map(({ image, type, title, copy }) => <article className="m2-audience" key={title}><div className="m2-audience-image"><img src={image} alt="" /></div><div className="m2-audience-caption"><span className="m2-audience-icon"><AudienceIcon type={type} /></span><div><h3>{title}</h3><p>{copy}</p></div></div></article>)}
        </div>
      </section>

      <section id="services" className="m2-services">
        <div className="m2-services-intro">
          <p className="m2-kicker">What we do</p>
          <h2><span>Three ways to move</span><span>a business forward.</span></h2>
          <p>Win and keep customers, build what’s next, and make the work behind it all run better.</p>
          <a className="m2-text-link" href="/lab/madrona-v2/services">Learn more <span>→</span></a>
        </div>
        <div className="m2-offering-grid">
          {services.map((item) => <article className="m2-offering" key={item.title}>
            <div className="m2-offer-heading"><span className="m2-offer-icon"><OfferIcon type={item.type} /></span><div><h3>{item.title}</h3><p>{item.lead}</p></div></div>
            <p className="m2-offer-body">{item.body}</p>
            <OfferVisual type={item.type} />
          </article>)}
        </div>
      </section>

      <BerryGoodCaseStudy />

      <section id="products" className="m2-products">
        <div className="m2-products-intro m2-apps-intro">
          <p className="m2-kicker">Apps from Madrona</p>
          <h2>We build and run our own apps, too.</h2>
          <div className="m2-apps-intro-aside">
            <p>Built and operated by Madrona, these keep our product judgment close to real customers, real constraints, and the consequences of product decisions.</p>
            {appsVariant !== "c" && appsVariant !== "full" && <SeeAllApps className="m2-apps-intro-link" />}
          </div>
        </div>
        {appsVariant === "full" ? (
          <>
            <article className="m2-lila-story">
              <header className="m2-lila-story-header">
                <div>
                  <span className="m2-chip">Madrona-owned · Live product</span>
                  <img className="m2-lila-wordmark" src={lilaWordmark} alt="Lila Trips" />
                  <h3>From place intelligence to days that hold together.</h3>
                </div>
                <div>
                  <p>Lila combines trustworthy destination knowledge, live context, and personal intention to shape trips that feel authored—not generated.</p>
                  <a className="m2-text-link" href="https://lilatrips.com">Visit Lila Trips <span>→</span></a>
                </div>
              </header>
              <figure className="m2-lila-hero">
                <picture>
                  <source media="(max-width: 720px)" srcSet={lilaHeroMobile} />
                  <img src={lilaHero} alt="Lila Trips showing a place-aware Big Sur itinerary across desktop and mobile screens" />
                </picture>
              </figure>
              <div className="m2-lila-support">
                <figure><img src={lilaSupporting} alt="Lila Trips destination intelligence shown across tablet and mobile interfaces" /></figure>
                <div>
                  <p className="m2-kicker">Product in practice</p>
                  <h4>Know the place. Understand the traveler. Shape the days.</h4>
                  <p>The product carries the same point of view from early inspiration through planning and on-trip decisions.</p>
                  <ul>
                    <li><strong>Curated context</strong><span>Place knowledge with enough depth to make useful choices.</span></li>
                    <li><strong>Intent-led planning</strong><span>A trip shaped around pace, energy, and what matters now.</span></li>
                    <li><strong>Useful on the road</strong><span>The itinerary and its details travel together.</span></li>
                  </ul>
                </div>
              </div>
            </article>
            <article className="m2-product-proof m2-san">
              <div><span className="m2-chip">Madrona-owned · Beta</span><h3>San Juan Boating Guide</h3><p>Local route context and planning support for boaters exploring the Salish Sea.</p><div className="m2-segmented">{routes.map((item,index)=><button aria-pressed={route===index} onClick={()=>setRoute(index)} key={item.label}>{item.label}</button>)}</div></div>
              <div className="m2-product-stage"><img src={sanImage} alt="San Juan Boating Guide route-planning interface" /><div className="m2-route"><h4>{routes[route].label}</h4><div><strong>{routes[route].distance}</strong><span>{routes[route].duration}</span></div><p>{routes[route].note}</p><small>Verify: {routes[route].verify}. Interface demonstration only, not current navigational guidance.</small></div></div>
            </article>
          </>
        ) : (
          <AppsShowcase variant={appsVariant} />
        )}
      </section>

      <section id="studio" className="m2-studio">
        <div><p className="m2-kicker">How we work</p><h2>Senior team. Direct partnership. Real outcomes.</h2><div className="m2-studio-facts"><p><strong>15+ years</strong><span>Building products and brands</span></p><p><strong>Founder led</strong><span>No layers between you and the work</span></p><p><strong>Small by design</strong><span>The right specialists, when needed</span></p></div></div>
        <figure><img src={studioImage} alt="Two people collaborating outdoors in the Pacific Northwest" /><figcaption>Temporary concept image for layout direction</figcaption></figure>
      </section>

      <section id="process" className="m2-capabilities">
        <div><p className="m2-kicker">Strategy to launch and beyond</p><h2>From first questions to products that last.</h2></div>
        <ol>{[["01","Direction","Define the problem",heroImage],["02","Identity","Make it coherent",berryImage],["03","Prototype","Make it tangible",lilaHero],["04","Build","Make it real",sanImage],["05","Stewardship","Keep it useful",studioImage]].map(([number,title,copy,image])=><li key={title}><span>{number}</span><div className="m2-capability-art" aria-hidden="true"><img src={image} alt="" /></div><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      </section>

      <section className="m2-cta">
        <div><p className="m2-kicker">Ready to talk?</p><h2>Tell us where the business is getting stuck.</h2><p>Start with a free 30-minute conversation. No pitch deck and no obligation.</p><a className="m2-text-link m2-light-link" href="/connect">Book a time <span>→</span></a></div>
        <div><p className="m2-kicker">Already have something started?</p><h2>Bring the work in progress.</h2><p>We will take a clear-eyed look and reply quickly.</p><a className="m2-text-link m2-light-link" href="/connect">Share your project <span>→</span></a></div>
      </section>

      <footer className="m2-footer"><MadronaLogo variant="horizontal-reversed" /><div><a href="#work">Work</a><a href="#services">Services</a><a href="#process">Process</a><a href="/about">About</a></div><p>Bellingham, Washington<br />hello@madronastudio.com</p><small>V2 concept lab · noindex</small></footer>
    </main>
  );
}
