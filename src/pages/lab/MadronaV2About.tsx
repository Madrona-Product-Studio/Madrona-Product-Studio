import LabMeta from "./LabMeta";
import MadronaLogo from "./MadronaLogo";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { studioProfile } from "../../data/studioProfile";
import "./madrona-v2.css";

const LOGOS: Record<string, string> = {
  REI: "/images/logos/rei-logo.svg",
  Healthline: "/images/logos/healthline-logo.svg",
  Microsoft: "/images/logos/microsoft-logo.svg",
};

// Simple line icons (single path each) for proof points + specialist nodes.
const ICON_PATHS: Record<string, string> = {
  // proof points
  senior: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  founder: "M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6 6.9 19.3l1-5.7-4.1-4 5.7-.8L12 3.6z",
  sprig: "M11 20c0-6 3.5-10.5 9-11-.3 6-4 10.3-9 11zM11 20c.6-3.8 2.6-6.4 5.5-8.2",
  // specialists
  design: "M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM13.5 6.5l3 3",
  research: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.35-4.35",
  analytics: "M4 20h16M7 20v-4.5M12 20V8M17 20v-8",
  engineer: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  marketing: "M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1zM16 9a3.5 3.5 0 0 1 0 6",
  content: "M5 20l1-4L17 5a2 2 0 0 1 3 3L9 19l-4 1zM15 7l3 3",
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

function TeamNetworkDiagram() {
  const { intro, charlie, specialists } = studioProfile;
  return (
    <div className="m2-ab-net">
      <svg className="m2-ab-net-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {specialists.map((s) => {
          const mx = (50 + s.x) / 2; // horizontal-out, vertical-transition, horizontal-in elbow
          return <path key={s.id} d={`M50 50 C ${mx} 50 ${mx} ${s.y} ${s.x} ${s.y}`} vectorEffect="non-scaling-stroke" />;
        })}
      </svg>

      <figure className="m2-ab-net-portrait">
        <img src={intro.portraitSrc} alt={intro.portraitAlt} />
        <figcaption className="m2-ab-net-pill">
          <strong>{charlie.name}</strong>
          <span>{charlie.role}</span>
        </figcaption>
      </figure>

      <div className="m2-ab-net-nodes">
        {specialists.map((s) => (
          <div className="m2-ab-node" key={s.id} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <span className="m2-ab-node-ico"><Icon name={s.icon} /></span>
            <span className="m2-ab-node-label">
              <strong>{s.title}</strong>
              <span>{s.tags}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MadronaV2About() {
  useReveal();
  const { intro, proofPoints, experience, ownedProducts, community, nameStory } = studioProfile;

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="About · Madrona Product Studio" />
      <header className="m2-nav">
        <a className="m2-logo-link" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
        <nav aria-label="Primary">
          <a href="/services">Services</a>
          <a href="/apps">Our apps</a>
          <a aria-current="page" href="/about">About</a>
        </nav>
        <a className="m2-button m2-nav-cta" href="/connect">Let’s connect</a>
      </header>

      {/* Hero: title + positioning + proof points | team network diagram */}
      <section className="m2-ab-intro">
        <div className="m2-ab-intro-copy">
          <h1>{intro.heading}</h1>
          <span className="m2-ab-rule" aria-hidden="true" />
          <p className="m2-ab-headline">{intro.headline}</p>
          <div className="m2-ab-body">
            {intro.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="m2-ab-proof">
            {proofPoints.map((pp) => (
              <li key={pp.id}>
                <span className="m2-ab-proof-ico"><Icon name={pp.icon} /></span>
                <strong>{pp.title}</strong>
                <span>{pp.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="m2-ab-intro-visual">
          <TeamNetworkDiagram />
        </div>
      </section>

      {/* Experience and credibility */}
      <section className="m2-ab-exp">
        <div className="m2-ab-exp-copy">
          <h2>{experience.heading}</h2>
          <p>{experience.description}</p>
        </div>
        <div className="m2-ab-exp-proof">
          <ul className="m2-ab-exp-logos">
            {experience.companies.map((c) => (
              <li key={c}><img src={LOGOS[c]} alt={c} /></li>
            ))}
          </ul>
          <p className="m2-ab-exp-years"><strong>{experience.years}</strong><span>in product leadership</span></p>
        </div>
      </section>

      {/* Two supporting panels: owned products + community */}
      <section className="m2-ab-panels">
        <article className="m2-ab-panel" data-reveal>
          <div className="m2-ab-panel-copy">
            <p className="m2-kicker">{ownedProducts.eyebrow}</p>
            <h2>{ownedProducts.heading}</h2>
            <p>{ownedProducts.description}</p>
            <a className="m2-text-link" href={ownedProducts.href}>{ownedProducts.action} <span aria-hidden="true">→</span></a>
          </div>
          <div className="m2-ab-panel-media m2-ab-panel-media--single">
            <img src={ownedProducts.imageSrc} alt="A Madrona product shown on a laptop and phone" loading="lazy" />
          </div>
        </article>

        <article className="m2-ab-panel" data-reveal>
          <div className="m2-ab-panel-copy">
            <p className="m2-kicker">{community.eyebrow}</p>
            <h2>{community.heading}</h2>
            <p>{community.description}</p>
            {community.href && (
              <a className="m2-text-link" href={community.href}>Learn more <span aria-hidden="true">→</span></a>
            )}
          </div>
          <div className="m2-ab-panel-media m2-ab-panel-media--pair">
            <img src={community.images[0]} alt="Fresh local produce at a Whatcom County market" loading="lazy" />
            <img src={community.images[1]} alt="Conserved Pacific Northwest land above the water" loading="lazy" />
          </div>
        </article>
      </section>

      {/* The name */}
      <section className="m2-ab-name">
        <div className="m2-ab-name-copy">
          <p className="m2-kicker">{nameStory.eyebrow}</p>
          <h2>{nameStory.heading}</h2>
          <p>{nameStory.description}</p>
        </div>
        <figure className="m2-ab-name-media">
          <img src={nameStory.imageSrc} alt="A Pacific madrona with peeling red-orange bark at the rocky water’s edge" loading="lazy" />
        </figure>
      </section>

      <SiteFooter />
    </main>
  );
}
