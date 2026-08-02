import { useState, type ReactNode } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import BerryGoodCaseStudy from "./BerryGoodCaseStudy";
import SiteFooter from "./SiteFooter";
import { ServiceIcon } from "./ServiceIcon";
import { useReveal } from "./useReveal";
import { serviceAreas } from "../../data/services";
import { studioProfile } from "../../data/studioProfile";
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

const hwwSteps: { num: string; title: string; sub: string; price: string; paid?: boolean; desc: string; card: HwwCard }[] = [
  {
    num: "01", title: "Talk it through", sub: "A focused 30-minute conversation", price: "Free",
    desc: "We learn where the business is today, what you have already tried, and where the friction is showing up.",
    card: { icon: "calendar", label: "Meeting agenda", kind: "bullets", items: ["Where you are now", "What you have tried", "What better looks like", "Biggest opportunities", "What is on your mind"] },
  },
  {
    num: "02", title: "Get a clear point of view", sub: "A short written assessment", price: "Free",
    desc: "We identify the highest-leverage opportunity, explain what we think is happening, and define how improvement could be measured. You keep it either way.",
    card: { icon: "document", label: "Assessment excerpt", kind: "rows", items: [{ icon: "chat", text: "What we heard" }, { icon: "warning", text: "The central problem" }, { icon: "trend", text: "Strongest opportunity" }, { icon: "target", text: "What better looks like" }] },
  },
  {
    num: "03", title: "Decide what to build", sub: "A focused proposal, if it makes sense", price: "Paid engagement", paid: true,
    desc: "Based on what the first two steps reveal, we recommend the smallest engagement that can create something useful, visible, and worth learning from.",
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
            <p className="m2-hww-sub">{s.sub} <span className={`m2-hww-price${s.paid ? " is-paid" : ""}`}>{s.price}</span></p>
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
        <h1>How we help</h1>
        <span className="m2-ab-rule" aria-hidden="true" />
        <p className="m2-ph-sub">Figure out what to build. Then build it.</p>
        <p>Madrona works with founders, local businesses, and product teams. Every engagement starts small, focused where it will make the biggest difference, and grows from there.</p>
        <a className="m2-ap-jump" href="#process">See how we work <span aria-hidden="true">↓</span></a>
      </section>

      {/* Who we help — the capability claim + the three audiences (Charlie's mockup 2026-08-01) */}
      <section className="m2-who">
        <div className="m2-who-rail">
          <p className="m2-kicker m2-who-kicker">Who we help</p>
          <h2>Modern capability, without the overhead.</h2>
          <span className="m2-who-rule" aria-hidden="true" />
          <p>New tools let a small, senior team deliver work that once required much larger agencies. We bring that leverage to websites, commerce, customer journeys, products, and operating workflows, without adding unnecessary complexity.</p>
        </div>
        <ul className="m2-who-grid">
          <li className="m2-who-col" data-tone="sprout">
            <span className="m2-who-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.2v-7.4" /><path d="M12 12.8C11.6 9.4 9.3 7.5 5.8 7.3c.2 3.5 2.5 5.6 6.2 5.5Z" /><path d="M12 11.2c.3-2.7 2.1-4.3 5.2-4.5-.2 2.8-2.1 4.6-5.2 4.5Z" /><path d="M5.4 20.2c2-.9 4.1-1.3 6.6-1.3s4.6.4 6.6 1.3" /></svg></span>
            <h3>Founders</h3>
            <span className="m2-who-underline" aria-hidden="true" />
            <p>Taking an important idea from concept to a product people actually use.</p>
          </li>
          <li className="m2-who-col" data-tone="storefront">
            <span className="m2-who-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4.6 7h14.8l.9 3c-.4 1.2-1.4 1.9-2.7 1.9-1 0-1.9-.5-2.4-1.3-.5.8-1.4 1.3-2.4 1.3s-1.9-.5-2.4-1.3c-.5.8-1.4 1.3-2.4 1.3-1.3 0-2.3-.7-2.7-1.9l.9-3Z" /><path d="M5.6 12.6V19h12.8v-6.4" /><path d="M10 19v-3.8h4V19" /></svg></span>
            <h3>Local and growing businesses</h3>
            <span className="m2-who-underline" aria-hidden="true" />
            <p>Great at what they do, and ready for software that works as hard as they do.</p>
          </li>
          <li className="m2-who-col" data-tone="layers">
            <span className="m2-who-ico" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 4.8 8 12 12l7.2-4L12 4Z" /><path d="m4.8 12 7.2 4 7.2-4" /><path d="m4.8 16 7.2 4 7.2-4" /></svg></span>
            <h3>Product teams</h3>
            <span className="m2-who-underline" aria-hidden="true" />
            <p>Evolving how they discover, prototype, and ship in the AI era.</p>
          </li>
        </ul>
      </section>

      <section id="services" className="m2-svcmod">
        <div className="m2-svcmod-intro">
          <div>
            <p className="m2-kicker">What we do</p>
            <h2>Four ways in. One practice.</h2>
            <p className="m2-svcmod-lead">The doors are different; the work behind them is the same. We find the most valuable thing to do next, then build it with you.</p>
          </div>
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
              </div>
            </a>
          ))}
        </div>
      </section>

      <BerryGoodCaseStudy />

      <section id="products" className="m2-products">
        <RailedApps />
      </section>

      <section id="studio" className="m2-studio">
        <div>
          <p className="m2-kicker">Who you'll work with</p>
          <h2>Senior team. Direct partnership. Real outcomes.</h2>
          <div className="m2-studio-facts">
            <p><strong>{studioProfile.experience.years}</strong><span>Building consumer products at scale</span></p>
            {studioProfile.proofPoints.filter((pp) => pp.id !== "senior-team").map((pp) => (
              <p key={pp.id}><strong>{pp.title}</strong><span>{pp.description}</span></p>
            ))}
          </div>
        </div>
        <figure><img src={studioImage} alt="Two people collaborating outdoors in the Pacific Northwest" /></figure>
      </section>

      <HowWeWork />

      <SiteFooter />
    </main>
  );
}
