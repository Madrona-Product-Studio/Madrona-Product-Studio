import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";

// The Product Builder Thesis — the public articulation of the working theory.
// Source of truth: charlie-hq thinking/madrona/foundation/product-builder-thesis.md.
// This page presents the thesis itself; internal sections (career positioning,
// guardrails, evidence lists) intentionally stay out of the public rendering.

const BUILDS = [
  { who: "Product", what: "builds clarity." },
  { who: "Design", what: "builds understanding and experience." },
  { who: "Engineering", what: "builds capability and leverage." },
  { who: "Research and data", what: "build confidence." },
  { who: "AI", what: "expands the leverage available to everyone." },
];

const CONSTRAINTS = [
  "Choosing the right problems",
  "Understanding customers deeply",
  "Creating clarity",
  "Making good decisions",
  "Maintaining taste and quality",
  "Learning quickly",
];

const STAGES = [
  {
    num: "01",
    title: "Traditional",
    body: "Functions are distinct. Product defines, Design designs, and Engineering implements. AI is mostly an individual productivity tool.",
  },
  {
    num: "02",
    title: "Hybrid",
    body: "Teams prototype more, roles overlap selectively, and AI accelerates parts of the workflow. The broader organization stays largely unchanged.",
  },
  {
    num: "03",
    title: "Product building",
    body: "Small multidisciplinary teams own important problems end to end. AI is part of the operating model. Leadership focuses on clarity, learning, and outcomes.",
  },
];

export default function MadronaV2Thesis() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The Product Builder Thesis · Madrona Product Studio" />
      <M2Nav />

      {/* Hero */}
      <section className="m2-ab3 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">A working theory</p>
        <h1>The Product Builder Thesis</h1>
        <p className="m2-th-standfirst">A point of view on how great software gets built in the AI era, and what that changes about product leadership. It comes from building, and we revise it as the work teaches us.</p>
        <p className="m2-th-byline">Charlie Koch · Founder, Madrona Product Studio</p>
      </section>

      {/* 1 · The core thesis */}
      <section className="m2-ab3 m2-th-section">
        <h2>The core thesis.</h2>
        <blockquote className="m2-ab3-quote">
          <p>AI is not eliminating Product, Design, Engineering, or Research. It is expanding what each discipline can contribute as the cost of building software falls.</p>
        </blockquote>
        <p className="m2-th-body">The strongest teams will not erase specialized craft. They will preserve the distinct perspectives of each discipline while making the boundaries between them more permeable. Everyone builds, but they build different things:</p>
        <ul className="m2-th-list">
          {BUILDS.map((b) => (
            <li key={b.who}><strong>{b.who}</strong><span>{b.what}</span></li>
          ))}
        </ul>
        <p className="m2-th-body">The point is not for every person to do every job. It is for each person to carry more of the work forward from their own vector of strength.</p>
      </section>

      {/* 2 · What changed */}
      <section className="m2-ab3 m2-th-section">
        <h2>What changed.</h2>
        <p className="m2-th-body">For decades, software organizations optimized for specialization, scale, and coordinated handoffs. That made sense when software was expensive to build. AI is changing the equation: the cost of prototyping, implementation, iteration, research synthesis, and validation is falling, and a small team can move from an important problem to working software far faster than before.</p>
        <p className="m2-th-body">As execution gets cheaper, the real constraints shift toward:</p>
        <ul className="m2-th-constraints">
          {CONSTRAINTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <blockquote className="m2-ab3-quote">
          <p>The advantage is no longer shipping more software. It is learning faster through software.</p>
        </blockquote>
      </section>

      {/* 3 · Product leadership */}
      <section className="m2-ab3 m2-th-section">
        <h2>Product leadership is evolving.</h2>
        <p className="m2-th-body">The modern product leader is not primarily a backlog owner, a requirements writer, or a coordinator of functional handoffs. The role is to identify meaningful problems, create clarity around what matters, organize the team around outcomes, use working software to test assumptions, and protect attention from work that does not matter.</p>
        <blockquote className="m2-ab3-quote">
          <p>The role of product leadership is to create the conditions for a multidisciplinary team to solve important customer problems.</p>
        </blockquote>
      </section>

      {/* 4 · Evolution over revolution */}
      <section className="m2-ab3 m2-th-section">
        <h2>Evolution over revolution.</h2>
        <p className="m2-th-body">This is not an argument that traditional product organizations are obsolete. Many companies have real constraints: existing systems, customers, compliance needs, organizational scale. The market is in transition, and the opportunity is to help teams move one meaningful stage forward from wherever they are today.</p>
        <ol className="m2-ab3-ideas m2-th-stages">
          {STAGES.map((s) => (
            <li key={s.num}>
              <p className="m2-th-stage-num">{s.num}</p>
              <h3>{s.title}</h3>
              <span className="m2-ab3-underline" aria-hidden="true" />
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5 · Where we point it */}
      <section className="m2-ab3 m2-th-section">
        <h2>Where we point it.</h2>
        <p className="m2-th-body">The thesis is not only about how software gets built. It is about what is worth building. Problems that once required large organizations, enormous capital, or hundreds of people may now be approachable by small, experienced teams with conviction and judgment.</p>
        <p className="m2-th-body">The hopeful part of this moment is not that companies can build more cheaply. It is that important problems may be more solvable than they have ever been.</p>
        <blockquote className="m2-ab3-quote">
          <p>AI is leverage. What matters is where we choose to apply it.</p>
        </blockquote>
      </section>

      {/* Close */}
      <section className="m2-ab3 m2-th-close">
        <p className="m2-th-body">Madrona exists to put this thesis into practice. Our products and client work are the evidence, and we share what we learn as we go. This is a working document; the moment it stops changing, it has stopped doing its job.</p>
        <div className="m2-th-close-links">
          <a className="m2-text-link" href="/about">Why Madrona exists <span aria-hidden="true">→</span></a>
          <a className="m2-text-link" href="/thinking">What we're learning <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
