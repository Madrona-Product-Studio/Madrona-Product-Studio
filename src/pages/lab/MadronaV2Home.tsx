import { useEffect, useState } from "react";
import AudienceSection from "./AudienceSection";
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

// ---- Consulting (three service areas) ------------------------------------
const PenIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" /><path d="M14.5 7.5 17 10" /></svg>;
const PeopleIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="16.8" cy="9.4" r="2.3" /><path d="M15.3 19a5 5 0 0 1 5.4-4.6" /></svg>;
const GearIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.8v2.6M12 18.6v2.6M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" /></svg>;

const consulting = [
  { icon: <PenIcon />, title: "Build products and experiences", body: "Websites, commerce, customer experiences, prototypes, AI-enabled features, and new digital products." },
  { icon: <PeopleIcon />, title: "Shape what comes next", body: "Product strategy, positioning, experience direction, growth opportunities, and rapid validation." },
  { icon: <GearIcon />, title: "Help your team build differently", body: "Practical AI-enabled workflows, prototyping methods, cross-functional collaboration, and coaching." },
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
          <p className="m2-kicker">A small senior product studio</p>
          <h1>We build what should exist next.</h1>
          <span className="m2-hero-rule" aria-hidden="true" />
          <p className="m2-lead">
            Madrona builds digital products, websites, and experiences for
            organizations doing meaningful work. We also build our own
            products to explore better ways of creating software in the AI era.
          </p>
          <div className="m2-actions">
            <a className="m2-button" href="/connect">Start a project</a>
            <a className="m2-button m2-button-secondary" href="/consulting">Explore how we help</a>
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

      {/* The kinds of businesses and products we care about */}
      <AudienceSection />

      {/* Products we're building and operating */}
      <section id="work" className="m2-home-products">
        <div className="m2-hp-head">
          <div>
            <p className="m2-kicker">Products we&rsquo;re building and operating</p>
            <p className="m2-hp-intro">Our products are where we put the practice to work. Each one is built to solve a real problem and teaches us something about how small teams can create useful, thoughtful software.</p>
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

      <section className="m2-bridge m2-bridge--compact">
        <p className="m2-kicker">How we work</p>
        <h2>Great products still come from different kinds of thinkers.</h2>
        <div className="m2-bridge-grid">
          <div className="m2-bridge-item">
            <div>
              <p>AI changes what small teams can accomplish, not the value of Product, Design, Engineering, or Research. We believe the best teams stay close to customers, build early, learn continuously, and share responsibility for creating something meaningful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Building alongside clients */}
      <section className="m2-bridge m2-bridge--compact">
        <p className="m2-kicker">Practice, not theory</p>
        <h2>We build alongside our clients.</h2>
        <div className="m2-bridge-grid">
          <div className="m2-bridge-item" data-reveal>
            <div>
              <p>The products we build ourselves keep us close to the work. Every product teaches us something about discovery, design, AI, and customer experience that makes us better partners.</p>
              <h3>We build because it’s the fastest way to learn.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* We also help good businesses build what's next */}
      <section className="m2-consult">
        <div className="m2-consult-body">
          <div className="m2-consult-intro">
            <h2>Good businesses around here deserve software as good as they are.</h2>
            <p>We can help shape the opportunity, build the product, or strengthen how your team carries the work forward.</p>
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
            <p>Madrona is led by Charlie Koch, a product leader with fifteen years of experience building consumer products at scale and bringing new ideas to life with small teams.</p>
            <a className="m2-text-link" href="/consulting">Explore how we help <span aria-hidden="true">→</span></a>
          </div>
          <figure className="m2-consult-art">
            <img src={studioImage} alt="Working through a problem with a client in the Pacific Northwest" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* Dual closing choice */}
      <section className="m2-dualcta">
        <div className="m2-dualcta-col">
          <h2>Have something worth building?</h2>
          <p>Bring us an important problem, an early idea, or a product that needs a new direction.</p>
          <a className="m2-button m2-button-onink" href="/connect">Start a project <span aria-hidden="true">→</span></a>
        </div>
        <div className="m2-dualcta-col">
          <h2>Want to build differently?</h2>
          <p>See how we help teams evolve their product-building practice from where they are today.</p>
          <a className="m2-button m2-button-onink" href="/consulting">Explore how we help <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
