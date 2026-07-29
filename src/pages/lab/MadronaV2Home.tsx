import { useEffect, useState } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";

import hero1 from "../../../docs/madrona-v2-build-kit/site-assets/hero-1.webp";
import hero2 from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import hero3 from "../../../docs/madrona-v2-build-kit/site-assets/hero-3.webp";
import hero4 from "../../../docs/madrona-v2-build-kit/site-assets/hero-4.webp";
import hero5 from "../../../docs/madrona-v2-build-kit/site-assets/hero-5.webp";
import hero6 from "../../../docs/madrona-v2-build-kit/site-assets/hero-6.webp";
import studioImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/studio-collaboration-wide.webp";
import lilaTile from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sjbgTile from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import lilaYogaTile from "../../../docs/madrona-v2-build-kit/site-assets/lila-yoga-tile.webp";
import gardenHqTile from "../../../docs/madrona-v2-build-kit/site-assets/garden-hq-tile.webp";
import lilaYogaIcon from "../../../docs/madrona-v2-build-kit/site-assets/app-icons/lila-yoga.svg";
import gardenHqIcon from "../../../docs/madrona-v2-build-kit/site-assets/app-icons/garden-hq.svg";
import lilaWordmark from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-wordmark-dark.svg";

// ---- Products (homepage 4-up) --------------------------------------------
const products = [
  { name: "Lila Trips", icon: lilaWordmark, tile: lilaTile, status: "Live", blurb: "Thoughtful travel planning built around place, pace, and what matters to you.", href: "https://lilatrips.com" },
  { name: "San Juan Boating Guide", icon: null, tile: sjbgTile, status: "Live", blurb: "Tide, weather, and anchorage info for safer days on the San Juan Islands.", href: "https://www.sjiboating.com/" },
  { name: "Lila Yoga", icon: lilaYogaIcon, tile: lilaYogaTile, status: "V1", blurb: "A guided introduction to yoga, with style breakdowns, tools, and gentle practice.", href: "https://lila.yoga" },
  { name: "Garden HQ", icon: gardenHqIcon, tile: gardenHqTile, status: "In build", blurb: "Plan your garden, track what you grow, and make better use of your space.", href: "/apps" },
] as const;

// ---- The bridge (own products make the work better) ----------------------
const LeafIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19c0-7 5-13 14-13 0 8-5 13-14 13Z" /><path d="M5 19c3-5 6.5-8 11-9.5" /></svg>;
const CompassIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></svg>;
const CycleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5L20 9" /><path d="M20 4v5h-5" /><path d="M19.5 12a7.5 7.5 0 0 1-12.6 5.5L4 15" /><path d="M4 20v-5h5" /></svg>;

const bridge = [
  { icon: <LeafIcon />, title: "We stay close to the consequences", body: "We make decisions, ship software, feel the results, and see what comes next." },
  { icon: <CompassIcon />, title: "We test ideas in the real world", body: "Our recommendations come from operating real products, not only presenting concepts." },
  { icon: <CycleIcon />, title: "The lessons move both ways", body: "What we learn building our own products improves the client work, and client problems sharpen how we build." },
];

// ---- Consulting (three service areas) ------------------------------------
const PenIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="M14.5 7.5 17 10" /></svg>;
const PeopleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="16.8" cy="9.4" r="2.3" /><path d="M15.3 19a5 5 0 0 1 5.4-4.6" /></svg>;
const GearIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.6M12 18.6v2.6M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" /></svg>;

const consulting = [
  { icon: <PenIcon />, title: "Brand & Web", body: "Sharpen the story and build a digital presence that reflects the quality of the work." },
  { icon: <PeopleIcon />, title: "Customers & Growth", body: "Understand your customers and create experiences that drive trust, action, and growth." },
  { icon: <GearIcon />, title: "Operations & AI", body: "Streamline work, surface insight, and put tools in place that make the team more effective." },
];

const HERO_IMAGES = [
  { src: hero2, alt: "Sunrise light over a forested island in the Salish Sea" },
  { src: hero1, alt: "" },
  { src: hero3, alt: "" },
  { src: hero4, alt: "" },
  { src: hero5, alt: "" },
  { src: hero6, alt: "" },
];
const HERO_INTERVAL = 9000;

export default function MadronaV2Home() {
  useReveal();
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (HERO_IMAGES.length < 2) return;
    const id = window.setTimeout(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), HERO_INTERVAL);
    return () => window.clearTimeout(id);
  }, [heroIndex]);

  return (
    <main className="m2">
      <LabMeta title="Madrona Product Studio" />
      <M2Nav />

      {/* Hero — one studio, two ways of building */}
      <section id="top" className="m2-hero">
        <div className="m2-hero-copy">
          <p className="m2-kicker">A Pacific Northwest product studio</p>
          <h1>We build what should exist next.</h1>
          <span className="m2-hero-rule" aria-hidden="true" />
          <p className="m2-lead">
            Madrona is a small product studio. We create and operate our own
            products, and partner with good businesses to solve meaningful
            problems through strategy, design, and software.
          </p>
          <div className="m2-actions">
            <a className="m2-button" href="/apps">Explore our products</a>
            <a className="m2-button m2-button-secondary" href="/consulting">Work with the studio</a>
          </div>
        </div>
        <div className="m2-hero-visual m2-hero-island m2-hero-rotate">
          {HERO_IMAGES.map((img, i) => (
            <img key={img.src} src={img.src} alt={i === 0 ? "Pacific Northwest landscapes near Bellingham, Washington" : ""} aria-hidden={i === 0 ? undefined : true} className={i === heroIndex ? "is-active" : ""} loading={i === 0 ? "eager" : "lazy"} />
          ))}
          <button type="button" className="m2-hero-cycle" aria-label={`Hero image ${heroIndex + 1} of ${HERO_IMAGES.length}. Show next image.`} onClick={() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)}>
            <svg key={heroIndex} className="m2-hero-cycle-ring" viewBox="0 0 36 36" aria-hidden="true"><circle className="m2-hero-cycle-track" cx="18" cy="18" r="15" /><circle className="m2-hero-cycle-arc" cx="18" cy="18" r="15" /></svg>
          </button>
        </div>
      </section>

      {/* Products we're building and operating */}
      <section id="work" className="m2-home-products">
        <div className="m2-hp-head">
          <div>
            <p className="m2-kicker">Products we&rsquo;re building and operating</p>
            <p className="m2-hp-intro">We make products around travel, place, health, nature, and the ways people organize their lives. Some become businesses. Some are experiments. All start with a problem worth solving.</p>
          </div>
          <a className="m2-text-link m2-hp-viewall" href="/apps">View all products <span aria-hidden="true">→</span></a>
        </div>
        <div className="m2-hp-grid">
          {products.map((p) => (
            <a className="m2-hp-card" href={p.href} key={p.name} data-reveal>
              <div className="m2-hp-card-media">
                <span className="m2-chip">{p.status}</span>
                <img src={p.tile} alt={`${p.name} preview`} loading="lazy" />
              </div>
              <div className="m2-hp-card-body">
                {p.icon ? <img className="m2-hp-card-icon" src={p.icon} alt="" /> : <span className="m2-hp-card-icon m2-hp-card-icon--mark" aria-hidden="true">{p.name.charAt(0)}</span>}
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <span className="m2-text-link">Explore <span aria-hidden="true">→</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* The bridge: building our own makes the work better */}
      <section className="m2-bridge">
        <h2>Building our own products makes the work better.</h2>
        <div className="m2-bridge-grid">
          {bridge.map((b) => (
            <div className="m2-bridge-item" key={b.title} data-reveal>
              <span className="m2-bridge-icon">{b.icon}</span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* We also help good businesses build what's next */}
      <section className="m2-consult">
        <div className="m2-consult-body">
          <div className="m2-consult-intro">
            <h2>Good businesses around here deserve software as good as they are.</h2>
            <p>Senior product help for companies ready to turn a meaningful opportunity into a clearer strategy, a stronger experience, and better software.</p>
            <div className="m2-consult-items">
              {consulting.map((c) => (
                <div className="m2-consult-item" key={c.title}>
                  <span className="m2-svc-ico-ring">{c.icon}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <a className="m2-text-link" href="/consulting">See how we work with companies <span aria-hidden="true">→</span></a>
          </div>
          <figure className="m2-consult-art">
            <img src={studioImage} alt="Working through a problem with a client in the Pacific Northwest" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* Dual closing choice */}
      <section className="m2-dualcta">
        <div className="m2-dualcta-col">
          <h2>Have a business problem?</h2>
          <p>See how we work with companies to solve meaningful problems.</p>
          <a className="m2-button m2-button-onink" href="/consulting">Explore consulting <span aria-hidden="true">→</span></a>
        </div>
        <div className="m2-dualcta-col">
          <h2>Curious what we&rsquo;re building?</h2>
          <p>See the products taking shape inside the studio.</p>
          <a className="m2-button m2-button-onink" href="/apps">Explore our products <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
