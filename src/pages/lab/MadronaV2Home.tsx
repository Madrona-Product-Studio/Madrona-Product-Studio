import { useEffect, useState, type ReactNode } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import BerryGoodCaseStudy from "./BerryGoodCaseStudy";
import SiteFooter from "./SiteFooter";
import { ServiceIcon } from "./ServiceIcon";
import { useReveal } from "./useReveal";
import { serviceAreas } from "../../data/services";
import "./madrona-v2.css";

import hero1 from "../../../docs/madrona-v2-build-kit/site-assets/hero-1.webp";
import hero2 from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import hero3 from "../../../docs/madrona-v2-build-kit/site-assets/hero-3.webp";
import hero4 from "../../../docs/madrona-v2-build-kit/site-assets/hero-4.webp";
import hero5 from "../../../docs/madrona-v2-build-kit/site-assets/hero-5.webp";
import hero6 from "../../../docs/madrona-v2-build-kit/site-assets/hero-6.webp";
import studioImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/studio-collaboration-wide.webp";
import farmsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-farms-food.webp";
import outdoorsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-outdoor-travel.webp";
import healthImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-health-wellness.webp";
import shopsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-shops-services.webp";
import lilaHero from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-madrona-hero.webp";
import lilaWordmark from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-wordmark-dark.svg";
import lilaTile from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sjbgTile from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import sanImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/san-juan-product-proof-wide.webp";

function AudienceIcon({ type }: { type: "farms" | "outdoors" | "health" | "shops" }) {
  if (type === "farms") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9m0 5c-4 0-7-2.4-7-6 4 0 7 2.4 7 6Zm0-4c0-3.6 2.7-6 7-6 0 3.6-2.7 6-7 6Z" /></svg>;
  if (type === "outdoors") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 18 6.3-10 3.1 4.7 2.2-3.2 5.4 8.5H3.5Z" /><path d="m7.3 12 2.5-4 1.8 2.7M9.5 18c1.8-2.3 3.7-3 5.8-2.2" /></svg>;
  if (type === "health") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.7c0 5.1-8 10.1-8 10.1S4 13.8 4 8.7C4 4 9.8 3 12 6.8 14.2 3 20 4 20 8.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16M6 10v10h12V10M5 10l1.5-5h11l1.5 5M9 20v-6h6v6" /></svg>;
}

const ownApps = [
  { name: "Lila Trips", short: "Lila", domain: "lilatrips.com", wordmark: lilaWordmark, media: lilaTile, status: "Live", tagline: "Adventure travel, authored not generated.", blurb: "Handpicked travel experiences for curious travelers. Discover, plan, book.", image: lilaHero, href: "https://lilatrips.com" },
  { name: "San Juan Boating Guide", short: "San Juan Boating Guide", domain: "sjiboating.com", wordmark: null, media: sjbgTile, status: "Live", tagline: "Route context for the Salish Sea.", blurb: "Tide-aware routes, local knowledge, and real-time marine conditions.", image: sanImage, href: "https://www.sjiboating.com/" },
] as const;

function SeeAllApps({ className = "" }: { className?: string }) {
  return <a className={`m2-text-link ${className}`} href="/apps">See all our apps <span>→</span></a>;
}

function AppRowCard({ app }: { app: (typeof ownApps)[number] }) {
  return (
    <a className="m2-app-rowcard" href={app.href} data-reveal>
      {app.media ? (
        <div className="m2-app-rowcard-media m2-app-rowcard-media-image">
          <span className="m2-chip">{app.status}</span>
          <img src={app.media} alt={`${app.name} shown across tablet and phone`} />
        </div>
      ) : (
        <div className="m2-app-rowcard-media">
          <span className="m2-chip">{app.status}</span>
          <div className="m2-app-rowcard-brand">{app.wordmark ? <img src={app.wordmark} alt={app.name} /> : <strong>{app.name}</strong>}</div>
          <div className="m2-app-rowcard-shot" role="img" aria-label={`${app.name} preview image placeholder`}><small>App preview</small></div>
        </div>
      )}
      <div className="m2-app-rowcard-body">
        <h3>{app.name}</h3>
        <p>{app.blurb}</p>
        <span className="m2-text-link">Visit {app.domain} <span>→</span></span>
      </div>
    </a>
  );
}

function RailedApps() {
  return (
    <div className="m2-apps-railed">
      <div className="m2-apps-rail">
        <p className="m2-kicker">Apps from Madrona</p>
        <h2>We build and run our own apps, too.</h2>
        <p>We design, build, and operate our own products to solve real problems we care about, and to keep our judgment close to real customers.</p>
        <SeeAllApps />
      </div>
      <div className="m2-apps-rail-cards">{ownApps.map((app) => <AppRowCard app={app} key={app.name} />)}</div>
    </div>
  );
}

const HWW_ICONS: Record<string, ReactNode> = {
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v4M16 3v4" /></>,
  document: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" /><path d="M14 3v5h5M8.5 13h7M8.5 16.5h5" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h4" /></>,
  chat: <path d="M5 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V5a1 1 0 0 1 1-1z" />,
  warning: <><path d="M12 4 21 19H3z" /><path d="M12 10.5v4M12 17h.01" /></>,
  trend: <><path d="M4 15l5-4 4 3 7-8" /><path d="M17 6h3v3" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.2" /></>,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="16.6" cy="9.6" r="2.2" /><path d="M15.2 19a5 5 0 0 1 5.3-4.6" /></>,
  flag: <><path d="M6 21V4" /><path d="M6 4.5h11l-2.2 3L17 10.5H6z" /></>,
};

function HwwIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{HWW_ICONS[name]}</svg>;
}

type HwwCard =
  | { icon: string; label: string; kind: "bullets"; items: string[] }
  | { icon: string; label: string; kind: "rows"; items: { icon: string; text: string }[] }
  | { icon: string; label: string; kind: "spec"; items: { icon: string; k: string; v: string }[] };

const hwwSteps: { num: string; title: string; sub: string; desc: string; card: HwwCard }[] = [
  {
    num: "01", title: "Talk it through", sub: "A focused 30-minute conversation",
    desc: "We learn where the business is today, what you have already tried, and where the friction is showing up.",
    card: { icon: "calendar", label: "Meeting agenda", kind: "bullets", items: ["Where you are now", "What you have tried", "What better looks like", "Biggest opportunities", "What is on your mind"] },
  },
  {
    num: "02", title: "Get a clear point of view", sub: "A short written assessment",
    desc: "We identify the highest-leverage opportunity, explain what we think is happening, and define how improvement could be measured.",
    card: { icon: "document", label: "Assessment excerpt", kind: "rows", items: [{ icon: "chat", text: "What we heard" }, { icon: "warning", text: "The central problem" }, { icon: "trend", text: "Strongest opportunity" }, { icon: "target", text: "What better looks like" }] },
  },
  {
    num: "03", title: "Decide what to build", sub: "A focused proposal, if it makes sense",
    desc: "We recommend the smallest engagement that can create something useful, visible, and worth learning from.",
    card: { icon: "clipboard", label: "Proposed sprint scope", kind: "spec", items: [{ icon: "target", k: "Focus", v: "Validate onboarding flow" }, { icon: "clock", k: "Timeline", v: "2–3 weeks" }, { icon: "people", k: "Team", v: "Madrona + your team" }, { icon: "flag", k: "Outcome", v: "Tested solution and clear next step" }] },
  },
];

function HwwStepCard({ card }: { card: HwwCard }) {
  return (
    <div className="m2-hww-card">
      <div className="m2-hww-card-head"><span className="m2-hww-card-icon"><HwwIcon name={card.icon} /></span><small>{card.label}</small></div>
      {card.kind === "bullets" && <ul className="m2-hww-bullets">{card.items.map((i) => <li key={i}>{i}</li>)}</ul>}
      {card.kind === "rows" && <ul className="m2-hww-rows">{card.items.map((i) => <li key={i.text}><span className="m2-hww-row-ic"><HwwIcon name={i.icon} /></span>{i.text}<b className="m2-hww-bar" /></li>)}</ul>}
      {card.kind === "spec" && <ul className="m2-hww-spec">{card.items.map((i) => <li key={i.k}><span className="m2-hww-row-ic"><HwwIcon name={i.icon} /></span><strong>{i.k}</strong><span>{i.v}</span></li>)}</ul>}
    </div>
  );
}

// The example artifact is always shown on desktop; on mobile it collapses behind
// a toggle so the three-step narrative stays short (button is CSS-hidden ≥761px).
function HwwExample({ card, label }: { card: HwwCard; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`m2-hww-example${open ? " is-open" : ""}`}>
      <button aria-expanded={open} className="m2-hww-example-btn" onClick={() => setOpen((o) => !o)} type="button">
        {open ? "Hide example" : `See example ${label.toLowerCase()}`}
        <span aria-hidden="true" className="m2-hww-example-caret">›</span>
      </button>
      <HwwStepCard card={card} />
    </div>
  );
}

function HowWeWork() {
  return (
    <section id="process" className="m2-hww">
      <div className="m2-hww-rail">
        <p className="m2-kicker">How we work</p>
        <h2>A straightforward way to begin.</h2>
        <p>We start by understanding what is not working, define what better looks like, and recommend the smallest useful next step.</p>
        <span className="m2-hww-rule" aria-hidden="true" />
      </div>
      <div className="m2-hww-steps">
        {hwwSteps.map((s, i) => (
          <div className="m2-hww-step" key={s.num} data-reveal>
            <div className="m2-hww-step-head">
              <span className="m2-hww-num">{s.num}</span>
              {i < hwwSteps.length - 1 && <span className="m2-hww-arrow" aria-hidden="true">→</span>}
            </div>
            <h3>{s.title}</h3>
            <p className="m2-hww-sub">{s.sub}</p>
            <p className="m2-hww-desc">{s.desc}</p>
            <HwwExample card={s.card} label={s.card.label} />
          </div>
        ))}
      </div>
    </section>
  );
}

const HERO_IMAGES = [
  { src: hero2, alt: "Sunrise light over a forested island in the Salish Sea" },
  { src: hero1, alt: "Pebble beach and forested headland under a warm Pacific Northwest sunset" },
  { src: hero3, alt: "Tulip fields in bloom beneath the North Cascades at dusk" },
  { src: hero4, alt: "Sea kayak gliding across calm Salish Sea water at sunset" },
  { src: hero5, alt: "Sunset over the Salish Sea with rocks and forested islands" },
  { src: hero6, alt: "Sailboats moored in a Bellingham marina at sunset" },
];
// Dwell per hero image. Keep in sync with the --m2-hero-interval CSS var below.
const HERO_INTERVAL = 9000;

// EXPLORATION: three homepage identity directions, switchable live via the
// on-page control (or ?hero=1|2|3). Collapse to the chosen one before shipping.
const HERO_VARIANTS = [
  {
    kicker: "A studio of makers · Bellingham",
    headline: "A studio of makers, from Bellingham.",
    lead: "Product leads, marketers, and builders who make good things, for other businesses and for ourselves. This is where we share the work, and where you find a way in.",
    primary: { label: "See what we make", href: "#work" },
    secondary: { label: "Work with us", href: "/consulting" },
  },
  {
    kicker: "Bellingham product studio",
    headline: "We figure out what to build, then build it.",
    lead: "A small studio of senior makers doing the work for good businesses, and for ourselves. Consulting is one way in. The rest is what we make.",
    primary: { label: "See the work", href: "#work" },
    secondary: { label: "Ways to work together", href: "/consulting" },
  },
  {
    kicker: "Bellingham product studio",
    headline: "A studio that makes things worth keeping.",
    lead: "We help businesses build what they need, and we build our own products too. Have a look around, then choose how to work with us.",
    primary: { label: "Our work", href: "#work" },
    secondary: { label: "Consulting", href: "/consulting" },
  },
] as const;

export default function MadronaV2Home() {
  useReveal();
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroV, setHeroV] = useState(() => {
    const n = parseInt(new URLSearchParams(window.location.search).get("hero") || "1", 10);
    return Number.isFinite(n) ? Math.min(3, Math.max(1, n)) - 1 : 0;
  });
  const hero = HERO_VARIANTS[heroV];
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (HERO_IMAGES.length < 2) return;
    // setTimeout keyed on heroIndex: each advance (auto or via a dot click)
    // reschedules a fresh HERO_INTERVAL, keeping the countdown fill in sync.
    const id = window.setTimeout(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, HERO_INTERVAL);
    return () => window.clearTimeout(id);
  }, [heroIndex]);

  return (
    <main className="m2">
      <LabMeta title="Madrona Product Studio" />
      {/* EXPLORATION control — remove once a hero direction is chosen. */}
      <div style={{ position: "fixed", top: 12, right: 12, zIndex: 200, display: "flex", gap: 6, alignItems: "center", background: "rgba(26,23,20,.9)", padding: "6px 9px", borderRadius: 9, fontSize: 12, boxShadow: "0 6px 18px rgba(0,0,0,.2)" }}>
        <span style={{ color: "#b8b0a2", marginRight: 2 }}>Hero</span>
        {[0, 1, 2].map((i) => (
          <button key={i} onClick={() => setHeroV(i)} style={{ color: heroV === i ? "#1a1714" : "#fff", background: heroV === i ? "#e8a999" : "transparent", border: "1px solid rgba(255,255,255,.28)", borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontWeight: 600 }}>{i + 1}</button>
        ))}
      </div>
      <M2Nav />

      <section id="top" className="m2-hero">
        <div className="m2-hero-copy">
          <p className="m2-kicker">{hero.kicker}</p>
          <h1>{hero.headline}</h1>
          <p className="m2-lead">{hero.lead}</p>
          <div className="m2-actions"><a className="m2-button" href={hero.primary.href}>{hero.primary.label}</a><a className="m2-button m2-button-secondary" href={hero.secondary.href}>{hero.secondary.label}</a></div>
        </div>
        <div className="m2-hero-visual m2-hero-island m2-hero-rotate">
          {HERO_IMAGES.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={i === 0 ? "Pacific Northwest landscapes near Bellingham, Washington" : ""}
              aria-hidden={i === 0 ? undefined : true}
              className={i === heroIndex ? "is-active" : ""}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
          <button
            type="button"
            className="m2-hero-cycle"
            aria-label={`Hero image ${heroIndex + 1} of ${HERO_IMAGES.length}. Show next image.`}
            onClick={() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)}
          >
            {/* keyed on heroIndex so the sweep remounts and restarts in sync with the swap timer */}
            <svg key={heroIndex} className="m2-hero-cycle-ring" viewBox="0 0 36 36" aria-hidden="true">
              <circle className="m2-hero-cycle-track" cx="18" cy="18" r="15" />
              <circle className="m2-hero-cycle-arc" cx="18" cy="18" r="15" />
            </svg>
          </button>
        </div>
      </section>

      <section id="work" className="m2-products">
        <RailedApps />
      </section>

      <BerryGoodCaseStudy />

      <section id="studio" className="m2-studio">
        <div><p className="m2-kicker">Who we are</p><h2>A studio of makers, not a vendor.</h2><div className="m2-studio-facts"><p><strong>Product & design</strong><span>Leads who have shipped at scale</span></p><p><strong>Build & growth</strong><span>Engineers, marketers, makers</span></p><p><strong>Small by design</strong><span>The right people, when it counts</span></p></div></div>
        <figure><img src={studioImage} alt="Two people collaborating outdoors in the Pacific Northwest" /></figure>
      </section>

      <section id="engage" className="m2-svcmod">
        <div className="m2-svcmod-intro">
          <p className="m2-kicker">Ways to work with us</p>
          <h2>Pick a door.</h2>
          <p>However you found us, there is a way in.</p>
        </div>
        <div className="m2-svcmod-cards">
          <a className="m2-svcmod-card" href="/consulting" data-reveal>
            <div className="m2-svcmod-head"><h3>Consulting</h3></div>
            <p className="m2-svcmod-outcome">Help your business get found, keep customers, and run smoother.</p>
            <span className="m2-svcmod-more">Explore consulting <span aria-hidden="true">→</span></span>
          </a>
          <a className="m2-svcmod-card" href="/apps" data-reveal>
            <div className="m2-svcmod-head"><h3>Our apps</h3></div>
            <p className="m2-svcmod-outcome">The products we make, for the world and for ourselves.</p>
            <span className="m2-svcmod-more">See our apps <span aria-hidden="true">→</span></span>
          </a>
          <a className="m2-svcmod-card" href="/connect" data-reveal>
            <div className="m2-svcmod-head"><h3>Start a conversation</h3></div>
            <p className="m2-svcmod-outcome">A free 30-minute chat about what you are trying to do.</p>
            <span className="m2-svcmod-more">Book a chat <span aria-hidden="true">→</span></span>
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
