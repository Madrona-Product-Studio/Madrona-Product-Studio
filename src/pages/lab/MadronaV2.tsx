import { useState, type ReactNode } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import BerryGoodCaseStudy from "./BerryGoodCaseStudy";
import SiteFooter from "./SiteFooter";
import { ServiceIcon } from "./ServiceIcon";
import { useReveal } from "./useReveal";
import { serviceAreas } from "../../data/services";
import "./madrona-v2.css";

import studioImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/studio-collaboration-wide.webp";
import lilaHero from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-madrona-hero.webp";
import lilaWordmark from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-wordmark-dark.svg";
import lilaTile from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sjbgTile from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import sanImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/san-juan-product-proof-wide.webp";

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

export default function MadronaV2() {
  useReveal();

  return (
    <main className="m2">
      <LabMeta title="How we help · Madrona Product Studio" />
      <M2Nav active="consulting" />

      <section className="m2-ap-intro">
        <p className="m2-kicker">How we help</p>
        <h1>Figure out what to build. Then build it.</h1>
        <p>Madrona works with founders, local businesses, and product teams. Every engagement starts small, focused where it will make the biggest difference, and grows from there.</p>
        <a className="m2-ap-jump" href="#process">See how we work <span aria-hidden="true">↓</span></a>
      </section>

      <section id="services" className="m2-svcmod">
        <div className="m2-svcmod-intro">
          <p className="m2-kicker">What we do</p>
          <h2>Four ways in. One practice.</h2>
          <p>The doors are different; the work behind them is the same. We find the most valuable thing to do next, then build it with you.</p>
          <a className="m2-text-link" href="/services">Explore detailed capabilities <span>→</span></a>
        </div>
        <div className="m2-svcmod-cards">
          {serviceAreas.map((service) => (
            <a className="m2-svcmod-card" href={`/services#${service.id}`} key={service.id} data-reveal aria-label={`${service.door} — see related capabilities`}>
              <div className="m2-svcmod-head">
                <ServiceIcon id={service.id} />
                <h3>{service.door}</h3>
              </div>
              <p className="m2-svcmod-outcome">{service.outcome}</p>
              <ul className="m2-svcmod-items">
                {service.homepageItems.slice(0, 3).map((it) => <li key={it}>{it}<span aria-hidden="true">→</span></li>)}
              </ul>
              <span className="m2-svcmod-more">See related capabilities <span aria-hidden="true">→</span></span>
              <div className="m2-svcmod-art">
                <img src={service.artifact.src} alt={service.artifact.alt} loading="lazy" />
                <small className="m2-svcmod-proof">Demonstrated through {service.artifact.caption}</small>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="m2-bridge">
        <p className="m2-kicker">Local and growing businesses</p>
        <h2>Modern capability without a massive team.</h2>
        <div className="m2-bridge-grid">
          <div className="m2-bridge-item">
            <div>
              <p>Local and growing businesses should not need an enterprise budget to create a strong digital experience. New tools let small, senior teams deliver work that once required much larger agencies.</p>
            </div>
          </div>
          <div className="m2-bridge-item">
            <div>
              <p>Madrona brings that leverage to websites, commerce, customer journeys, products, and operating workflows without adding unnecessary complexity.</p>
            </div>
          </div>
        </div>
      </section>

      <BerryGoodCaseStudy />

      <section id="products" className="m2-products">
        <RailedApps />
      </section>

      <section id="studio" className="m2-studio">
        <div><p className="m2-kicker">How we work</p><h2>Senior team. Direct partnership. Real outcomes.</h2><div className="m2-studio-facts"><p><strong>15+ years</strong><span>Building products and brands</span></p><p><strong>Founder led</strong><span>No layers between you and the work</span></p><p><strong>Small by design</strong><span>The right specialists, when needed</span></p></div></div>
        <figure><img src={studioImage} alt="Two people collaborating outdoors in the Pacific Northwest" /></figure>
      </section>

      <HowWeWork />

      <SiteFooter />
    </main>
  );
}
