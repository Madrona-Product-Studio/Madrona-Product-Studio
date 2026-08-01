import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { studioProfile } from "../../data/studioProfile";
import "./madrona-v2.css";

import emblem from "../../../docs/madrona_static_logo_assets/madrona-approved-emblem-transparent.png";

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

const EVIDENCE = [
  { icon: P.cube, tone: "sprout", title: "Our own products", body: "We build and operate our own products to stay close to customers, ideas, and reality.", href: "/apps", action: "See our products" },
  { icon: P.case, tone: "storefront", title: "Client work", body: "Every organization we work with teaches us something different about the problems they're trying to solve.", href: "/consulting", action: "See how we help" },
  { icon: P.people, tone: "layers", title: "Team evolution", body: "We help product teams adopt better ways of discovering, prototyping, and building with AI.", href: "/consulting", action: "Explore our approach" },
];

// Circular learning loop: five nodes clockwise from the top, emblem center.
const LOOP_NODES = [
  { label: "Build", icon: P.hammer, tone: "sprout", x: 50, y: 10 },
  { label: "Learn", icon: P.book, tone: "storefront", x: 88, y: 37.6 },
  { label: "Refine", icon: P.sliders, tone: "layers", x: 73.5, y: 82.4 },
  { label: "Share", icon: P.leaf, tone: "sprout", x: 26.5, y: 82.4 },
  { label: "Build better", icon: P.chart, tone: "storefront", x: 12, y: 37.6 },
];

const LOOP_ARCS = [
  "M 61.7 11.7 A 40 40 0 0 1 82.8 27.1",
  "M 90.0 49.3 A 40 40 0 0 1 81.9 74.1",
  "M 63.0 87.8 A 40 40 0 0 1 37.0 87.8",
  "M 18.1 74.1 A 40 40 0 0 1 10.0 49.3",
  "M 17.2 27.1 A 40 40 0 0 1 38.3 11.7",
];

const CHIPS = ["Design", "Engineering", "Product", "Research", "Marketing", "Data", "Content", "Strategy"];

export default function MadronaV2About() {
  useReveal();
  const { intro, experience, community } = studioProfile;

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="About · Madrona Product Studio" />
      <M2Nav active="about" />

      {/* 1 · Founder opening */}
      <section className="m2-ab4 m2-ab4-hero">
        <div>
          <p className="m2-kicker m2-who-kicker">About Madrona</p>
          <h1>Building changed what I believe product leadership is for.</h1>
          <span className="m2-who-rule" aria-hidden="true" />
          <div className="m2-ab4-body">
            <p>For most of my career I led product teams at companies with real scale. I loved the work. But somewhere along the way, making products came to mean managing software instead of making it.</p>
            <p>Then the tools changed. AI collapsed the distance between an important problem and working software, and I started building again. Not because I became an engineer, but because a small group of experienced people can now carry an idea all the way to something real.</p>
            <p>That changed what I believe product leadership is for: creating the conditions for a small, senior team to solve problems that matter.</p>
          </div>
        </div>
        <figure className="m2-ab4-portrait">
          <img src={intro.portraitSrc} alt={intro.portraitAlt} />
        </figure>
      </section>

      {/* 2 · The Product Builder Thesis (preview) */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The Product Builder Thesis</p>
          <p className="m2-ab4-statement">AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. The future is not fewer disciplines. It is more integrated ones.</p>
          <a className="m2-text-link" href="/thesis">Read the full Product Builder Thesis <span aria-hidden="true">→</span></a>
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

      {/* 3 · Madrona is a working theory */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Madrona is a working theory</p>
          <h2>Can small, senior, AI-enabled teams build products differently, and better?</h2>
          <p className="m2-ab4-railbody">That's the question we're constantly testing. Every product we ship and every client engagement adds evidence.</p>
          <p className="m2-ab4-loopline" aria-hidden="true">Build <span>→</span> Learn <span>→</span> Refine <span>→</span> Share <span>→</span> Build better</p>
        </div>
        <div className="m2-ab4-loop" role="img" aria-label="The Madrona learning loop: build, learn, refine, share, build better, and repeat">
          <svg className="m2-ab4-loop-arcs" viewBox="0 0 100 100" aria-hidden="true">
            {LOOP_ARCS.map((d) => <path key={d} d={d} markerEnd="url(#loopArrow)" />)}
            <defs>
              <marker id="loopArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0 0.6 5.4 3.5 0 6.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
              </marker>
            </defs>
          </svg>
          <span className="m2-ab4-loop-center"><img src={emblem} alt="" /></span>
          {LOOP_NODES.map((n) => (
            <span className="m2-ab4-loop-node" data-tone={n.tone} key={n.label} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
              <span className="m2-ab4-loop-ico"><I d={n.icon} /></span>
              <span className="m2-ab4-loop-label">{n.label}</span>
            </span>
          ))}
        </div>
      </section>

      {/* 4 · The work is the evidence */}
      <section className="m2-ab4 m2-ab4-sec m2-ab4-sec--full">
        <p className="m2-kicker m2-who-kicker">The work is the evidence</p>
        <ul className="m2-ab4-cols m2-ab4-cols--evidence">
          {EVIDENCE.map((e) => (
            <li key={e.title}>
              <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={e.tone}><I d={e.icon} /></span>
              <h3>{e.title}</h3>
              <p>{e.body}</p>
              <a className="m2-text-link" href={e.href}>{e.action} <span aria-hidden="true">→</span></a>
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
          <a className="m2-text-link" href="/connect">Start a conversation <span aria-hidden="true">→</span></a>
        </div>
        <div className="m2-ab4-worth-media">
          <img src={community.images[0]} alt="Fresh local produce at a Whatcom County market" loading="lazy" />
          <img src={community.images[1]} alt="Conserved Pacific Northwest land above the water" loading="lazy" />
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
