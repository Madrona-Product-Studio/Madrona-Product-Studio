import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { studioProfile } from "../../data/studioProfile";
import "./madrona-v2.css";

const LOGOS: Record<string, string> = {
  REI: "/images/logos/rei-logo.svg",
  Healthline: "/images/logos/healthline-logo.svg",
  Microsoft: "/images/logos/microsoft-logo.svg",
};

// About V4 — founder-led point of view, laid out as labeled two-column
// spreads: a rail (kicker + serif statement + copy) on the left, structured
// content (icon columns, diagram, chips, photos) on the right, full-width
// hairlines between sections. Reference: Charlie's mockup 2026-08-01.

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const P = {
  target: "M12 12m-8.2 0a8.2 8.2 0 1 0 16.4 0a8.2 8.2 0 1 0-16.4 0M12 12m-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  venn: "M9.4 9.4m-5.4 0a5.4 5.4 0 1 0 10.8 0a5.4 5.4 0 1 0-10.8 0M14.6 14.6m-5.4 0a5.4 5.4 0 1 0 10.8 0a5.4 5.4 0 1 0-10.8 0",
  cube: "M12 3.6 4.6 7.8v8.4L12 20.4l7.4-4.2V7.8L12 3.6ZM4.6 7.8 12 12l7.4-4.2M12 12v8.4",
  case: "M4 8.5h16v11H4zM9 8.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2.5M4 13h16",
  hammer: "M14 6.2 17.8 10M6.2 21l7.2-7.2M13 5l3.2-1.6 3.4 3.4L18 10l-5-5ZM13.4 13.8 10 10.4",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5ZM20 18v3H6.5A2.5 2.5 0 0 1 4 20.5M9 8h7",
  sliders: "M5 8h14M5 16h14M9 5.5v5M15 13.5v5",
  leaf: "M6 19c0-6.5 4.5-11.5 12-12 0 7.5-4.5 12-12 12ZM6 19c2.5-4.5 5.8-7.3 10-9",
  chart: "M4 20h16M7 20v-5M12 20V9M17 20v-9M14 6l3-3 3 3",
};

const IDEAS = [
  { icon: P.target, tone: "sprout", title: "Clarity matters more.", body: "As execution gets easier, the hard work moves toward customer understanding, judgment, and learning." },
  { icon: P.people, tone: "storefront", title: "Product leadership is evolving.", body: "From managing the work to creating the conditions for great work." },
  { icon: P.venn, tone: "layers", title: "Everyone builds differently.", body: "Each discipline contributes in its own way. AI adds leverage to all of it." },
];

const CHIPS = ["Design", "Engineering", "Product", "Research", "Marketing", "Data", "Content", "Strategy"];

// Hero proof-point icons (original About hero).
const PROOF_ICONS: Record<string, string> = {
  senior: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  founder: "M12 3.6l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.6 6.9 19.3l1-5.7-4.1-4 5.7-.8L12 3.6z",
  sprig: "M11 20c0-6 3.5-10.5 9-11-.3 6-4 10.3-9 11zM11 20c.6-3.8 2.6-6.4 5.5-8.2",
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
        <img src={intro.portraitSrc} alt={intro.portraitAlt} />
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
  const { experience, community } = studioProfile;

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="About · Madrona Product Studio" />
      <M2Nav active="about" />

      {/* 1 · The studio (original hero: copy + proof points | network diagram) */}
      <section className="m2-ab-intro">
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

      {/* 2 · Why Madrona exists (the founder turning point) */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why Madrona exists</p>
          <h2>Building changed what I believe great product leadership is for.</h2>
        </div>
        <div className="m2-ab4-body m2-ab4-why">
          <p>For most of my career I led product teams at companies with real scale. I loved the work. But somewhere along the way, making products came to mean managing software instead of making it.</p>
          <p>Then the tools changed. AI collapsed the distance between an important problem and working software, and I started building again. Not because I became an engineer, but because a small group of experienced people can now carry an idea all the way to something real.</p>
          <p>That changed what I believe product leadership is for: creating the conditions for a small, senior team to solve problems that matter.</p>
          <p className="m2-ab4-why-close">Madrona exists to put that belief into practice.</p>
        </div>
      </section>

      {/* 2 · The Product Builder Thesis (preview) */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">What we believe</p>
          <h2>Madrona Product Thesis</h2>
          <p className="m2-ab4-substatement">AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. The future is not fewer disciplines. It is more integrated ones.</p>
          <a className="m2-text-link" href="/thesis">Read the full Madrona Product Thesis <span aria-hidden="true">→</span></a>
        </div>
        <ul className="m2-ab4-cols">
          {IDEAS.map((idea) => (
            <li key={idea.title}>
              <span className="m2-ab4-ico" data-tone={idea.tone}><I d={idea.icon} /></span>
              <h3>{idea.title}</h3>
              <p>{idea.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 · Built with people I trust */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Built with people I trust</p>
          <div className="m2-ab4-body">
            <p>Over the last fifteen years, I've had the privilege of working alongside incredible people: designers, engineers, researchers, marketers, strategists, data scientists, writers, and product leaders.</p>
            <p>Many of those relationships have lasted for years.</p>
            <p>Madrona is an opportunity to keep building together. Every project is different, so we bring together the right senior people for the work, stay small, and stay close to the decisions.</p>
          </div>
        </div>
        <div className="m2-ab4-network">
          <ul className="m2-ab4-chips" aria-label="Disciplines in the trusted network">
            {CHIPS.map((c, i) => <li key={c} data-tone={["sprout", "storefront", "layers"][i % 3]}>{c}</li>)}
          </ul>
          <div className="m2-ab4-exp">
            <ul className="m2-ab4-logos">
              {experience.companies.map((c) => <li key={c}><img src={LOGOS[c]} alt={c} /></li>)}
            </ul>
            <p><strong>{experience.years}</strong> building consumer products at scale</p>
          </div>
        </div>
      </section>

      {/* 6 · Work worth doing */}
      <section className="m2-ab4 m2-ab4-sec m2-ab4-worth">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Work worth doing</p>
          <h2>We want to spend our energy on things that matter.</h2>
          <div className="m2-ab4-body">
            <p>AI gives small teams extraordinary leverage. That makes where we choose to apply it more important, not less.</p>
            <p>We're drawn to work that improves health and well-being, strengthens local businesses and communities, expands access, supports stewardship, and helps people spend more time doing meaningful work. We believe software can leave the world a little better than it found it.</p>
          </div>
          <a className="m2-text-link" href="/connect">Get in touch <span aria-hidden="true">→</span></a>
        </div>
        <div className="m2-ab4-worth-media">
          <img src={community.images[0]} alt="Fresh local produce at a Pacific Northwest market" loading="lazy" />
          <img src={community.images[1]} alt="Conserved Pacific Northwest land above the water" loading="lazy" />
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
