import { useEffect, useState } from "react";
import AudienceSection from "./AudienceSection";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import { ServiceIcon } from "./ServiceIcon";
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
  { name: "Garden HQ", icon: gardenHqIcon, tile: gardenHqTile, status: "In build", blurb: "Plan your garden, track what you grow, and make better use of your space.", href: "https://www.gardenhq.app/" },
] as const;

// ---- How we help (the four expression doors of one practice) -------------
const consulting = [
  { id: "brand-and-web" as const, title: "Build trust", body: "A brand, website, and digital experience that show up as well as you do." },
  { id: "customers-and-growth" as const, title: "Grow your business", body: "Help more people find you, buy from you, and come back again." },
  { id: "operations-and-ai" as const, title: "Work smarter", body: "Get hours back every week with workflow fixes, small tools, and practical AI." },
  { id: "new-products" as const, title: "Build something worth using", body: "Take a new product from idea to real. Prototypes, MVPs, and AI-enabled features." },
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
            <a className="m2-button" href="/connect">Get in touch</a>
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

      {/* We also help good businesses build what's next */}
      <section className="m2-consult">
        <div className="m2-consult-body">
          <div className="m2-consult-intro">
            <h2>Good businesses around here deserve software as good as they are.</h2>
            <p>We help you figure out what to build, then build it. Every engagement starts small, focused where it will make the biggest difference, and grows from there.</p>
            <div className="m2-consult-items">
              {consulting.map((c) => (
                <div className="m2-consult-item" key={c.title}>
                  <ServiceIcon id={c.id} />
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


      {/* Products we're building and operating */}
      <section id="work" className="m2-home-products">
        <div className="m2-hp-head">
          <div>
            <p className="m2-kicker">Apps from Madrona</p>
            <h2>We build and run our own apps, too.</h2>
            <p className="m2-hp-intro">We design, build, and operate our own products to solve real problems we care about, and to keep our judgment close to real customers.</p>
          </div>
          <a className="m2-text-link m2-hp-viewall" href="/apps">See all our apps <span aria-hidden="true">→</span></a>
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

      <SiteFooter />
    </main>
  );
}
