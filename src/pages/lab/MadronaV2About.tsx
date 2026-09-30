import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import { imgProps, SIZES } from "../../lib/responsiveImage";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { studioProfile } from "../../data/studioProfile";
import { ctaClick } from "../../lib/analytics";
import { DepthSection } from "../v3/DepthSection";
import "./madrona-v2.css";
import "../v3/v3.css";
import "../v3/home-refactor.css";

// About, streamlined (Charlie, 2026-09-30): less manifesto, more of what we
// do and who does it. Four beats: the intro (what we do, how the team works,
// the headshot network), Why us (the career timeline, moved here from the
// homepage), From here, and a closing ask with one quiet link to the Thesis.
// Retired from this page (in git history): Why Madrona exists, the Thesis
// preview, Built with people I trust, and Work worth doing.

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

// Hero proof-point icons (original About hero).
const PROOF_ICONS: Record<string, string> = {
  senior: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  founder: "M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6 6.9 19.3l1-5.7-4.1-4 5.7-.8L12 3.6z",
};

// Specialist node icons for the team network diagram (hero visual).
const SPECIALIST_ICONS: Record<string, string> = {
  design: "M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM13.5 6.5l3 3",
  research: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM20 20l-4.35-4.35",
  analytics: "M4 20h16M7 20v-4.5M12 20V8M17 20v-8",
  engineer: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  marketing: "M3 10v4a1 1 0 0 0 1 1h3l5 4V5L7 9H4a1 1 0 0 0-1 1zM16 9a3.5 3.5 0 0 1 0 6",
  content: "M5 20l1-4L17 5a2 2 0 0 1 3 3L9 19l-4 1zM15 7l3 3",
};

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
        <img {...imgProps(intro.portraitSrc, SIZES.aboutPortrait)} alt={intro.portraitAlt} decoding="async" />
        <figcaption className="m2-ab-net-pill">
          <strong>{charlie.name}</strong>
          <span>{charlie.role}</span>
        </figcaption>
      </figure>

      <div className="m2-ab-net-nodes">
        {specialists.map((s) => (
          <div className="m2-ab-node" key={s.id} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <span className="m2-ab-node-ico"><I d={SPECIALIST_ICONS[s.icon]} /></span>
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
  const { nameStory } = studioProfile;

  return (
    <div className="m2 m2-ab-page">
      <LabMeta title="About · Madrona Product Studio" />
      <M2Nav active="about" />
      <main id="main">

      {/* 1 · The studio (original hero: copy + proof points | network diagram) */}
      <section className="m2-ab-intro v3-shell">
        <div className="m2-ab-intro-copy">
          <h1>{studioProfile.intro.heading}</h1>
          <span className="m2-ab-rule" aria-hidden="true" />
          <p className="m2-ab-headline">{studioProfile.intro.headline}</p>
          <div className="m2-ab-body">
            {studioProfile.intro.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="m2-ab-proof">
            {studioProfile.proofPoints.map((pp) => (
              <li key={pp.id}>
                <span className="m2-ab-proof-ico"><I d={PROOF_ICONS[pp.icon]} /></span>
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

      {/* 2 · Why us (moved from the homepage, 2026-09-30) */}
      <div className="v3 m2-ab-v3">
        <DepthSection />
      </div>

      {/* 3 · From here (local identity + the name, folded in) */}
      <section className="m2-ab4 m2-ab4-sec v3-shell">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">From here</p>
          <h2>Neighbors first.</h2>
          <div className="m2-ab4-body">
            <p>Whatcom County is not a market we researched. It is home. Bellingham is where we live, where we work, and where a lot of our own products start.</p>
            <p>We serve the Pacific Northwest and beyond. Being from here just keeps us close to real people and real problems, which is where product judgment actually comes from.</p>
          </div>
        </div>
        <figure className="m2-ab4-place-media">
          <img {...imgProps(nameStory.imageSrc, SIZES.aboutPlace)} alt="A madrona tree with peeling orange bark on a bluff above the Salish Sea" loading="lazy" decoding="async" />
          <figcaption>Named for the madrona, the tree on the bluff with the peeling orange bark, leaning out over the Salish Sea. It is where the brand's one color comes from.</figcaption>
        </figure>
      </section>

      {/* 4 · The ask */}
      <div className="v3 m2-ab-v3">
        <section className="v3-final-cta"><div className="v3-shell">
          <p className="v3-kicker">Start with a conversation</p>
          <h2>Tell us what you’re working on.</h2>
          <p>The first conversation is free, and it takes 30 minutes.</p>
          <div className="m2-ab-close-actions">
            <Link className="v3-btn v3-btn-light" to="/connect" onClick={ctaClick("Get in touch", "/connect", "about")}>Get in touch</Link>
            <Link className="m2-ab-thesis-link" to="/thesis">Our thinking: the Madrona Product Thesis <span aria-hidden="true">→</span></Link>
          </div>
        </div></section>
      </div>

      </main>

      <SiteFooter cta={false} />
    </div>
  );
}
