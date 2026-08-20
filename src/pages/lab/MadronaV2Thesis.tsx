import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import PovThumb from "./PovThumb";
import { TypeCircle } from "./TypeMark";
import {
  ArticleHeader,
  ArticleBody,
  ArticleSection,
  Prose,
  Figure,
  type TocItem,
} from "./ArticleTemplate";
import "./madrona-v2.css";
import "./playbook.css";

// The Madrona Product Thesis — the belief layer, on the /thinking reading
// template. Source of truth: charlie-hq thinking/madrona/foundation. Copy and
// figures preserved verbatim; the two-column spreads are re-housed in the
// single-column template (icon rows, constraint chips, the stage ladder).
// Internal sections of the source doc stay out of the public rendering.

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const P = {
  target: "M12 12m-8.2 0a8.2 8.2 0 1 0 16.4 0a8.2 8.2 0 1 0-16.4 0M12 12m-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0",
  pen: "M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3ZM14.5 7.5 17 10",
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  search: "M11 5a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM20 20l-4.3-4.3",
  spark: "M12 4v4M12 16v4M4 12h4M16 12h4M6.8 6.8l2.4 2.4M14.8 14.8l2.4 2.4M17.2 6.8l-2.4 2.4M9.2 14.8l-2.4 2.4",
  problem: "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 8.5v4M12 15.5h.01",
  clarity: "M12 5c5 0 8.5 3.5 9.5 7-1 3.5-4.5 7-9.5 7s-8.5-3.5-9.5-7c1-3.5 4.5-7 9.5-7ZM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  outcome: "M6 21V4M6 4.5h11l-2.2 3L17 10.5H6",
  test: "M10 3v6.3L4.6 18a2 2 0 0 0 1.8 3h11.2a2 2 0 0 0 1.8-3L14 9.3V3M8.5 3h7M7.5 15h9",
  attention: "M7 10V8a5 5 0 0 1 10 0v2M6 10h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
};

const BUILDS = [
  { who: "Product", what: "builds clarity.", icon: P.target, tone: "sprout" },
  { who: "Design", what: "builds understanding and experience.", icon: P.pen, tone: "storefront" },
  { who: "Engineering", what: "builds capability and leverage.", icon: P.code, tone: "layers" },
  { who: "Research and data", what: "build confidence.", icon: P.search, tone: "sprout" },
  { who: "AI", what: "expands the leverage available to everyone.", icon: P.spark, tone: "storefront" },
];

const CONSTRAINTS = [
  "Choosing the right problems",
  "Understanding customers deeply",
  "Creating clarity",
  "Making good decisions",
  "Maintaining taste and quality",
  "Learning quickly",
];

const ROLE = [
  { icon: P.problem, tone: "sprout", text: "Identify meaningful customer and market problems" },
  { icon: P.clarity, tone: "storefront", text: "Create clarity around what matters" },
  { icon: P.outcome, tone: "layers", text: "Organize the team around outcomes" },
  { icon: P.test, tone: "sprout", text: "Use working software to test assumptions" },
  { icon: P.attention, tone: "storefront", text: "Protect attention from work that does not matter" },
];

const STAGES = [
  { num: "01", title: "Traditional", body: "Functions are distinct. Product defines, Design designs, and Engineering implements. AI is mostly an individual productivity tool." },
  { num: "02", title: "Hybrid", body: "Teams prototype more, roles overlap selectively, and AI accelerates parts of the workflow. The broader organization stays largely unchanged." },
  { num: "03", title: "Product building", body: "Small multidisciplinary teams own important problems end to end. AI is part of the operating model. Leadership focuses on clarity, learning, and outcomes." },
];

const TOC: TocItem[] = [
  { id: "core-thesis", label: "The core thesis" },
  { id: "what-changed", label: "What changed" },
  { id: "product-leadership", label: "Product leadership" },
  { id: "evolution", label: "Evolution over revolution" },
  { id: "where-we-point-it", label: "Where we point it" },
];

export default function MadronaV2Thesis() {
  useReveal();

  return (
    <main className="m2 art">
      <LabMeta title="The Madrona Product Thesis · Madrona Product Studio" />
      <M2Nav active="pov" />

      <div className="art-wrap">
        <ArticleHeader
          kicker="A working theory"
          typeMark={<TypeCircle type="Essay" />}
          author="Charlie Koch"
          meta={["5 min read", "August 2026"]}
          title="The Madrona Product Thesis"
          standfirst="A point of view on how great software gets built in the AI era, and what that changes about product leadership. It comes from building, and we revise it as the work teaches us."
          toc={TOC}
          visual={<div className="art-head-plate"><div className="m2-pov-plate"><PovThumb motif="target" /></div></div>}
        />

        <ArticleBody share={{ title: "The Madrona Product Thesis", href: "/thesis" }}>
          <ArticleSection id="core-thesis" num="1" eyebrow="The core thesis" title="AI is not eliminating Product, Design, Engineering, or Research. It is expanding what each discipline can contribute as the cost of building software falls.">
            <Prose>
              <p>The strongest teams will not erase specialized craft. They will preserve the distinct perspectives of each discipline while making the boundaries between them more permeable.</p>
              <p>Everyone builds, but they build different things.</p>
              <p>The pattern is starting to show up in the data. In <a href="https://linear.app/data" target="_blank" rel="noopener noreferrer">Linear's 2026 report</a> on how teams work, product managers and designers ship code at several times the rate they did two years ago — the boundaries becoming permeable in practice, not just in principle.</p>
            </Prose>
            <Figure>
              <ul className="m2-th4-rows">
                {BUILDS.map((b) => (
                  <li key={b.who}>
                    <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={b.tone}><I d={b.icon} /></span>
                    <p><strong>{b.who}</strong> <span>{b.what}</span></p>
                  </li>
                ))}
              </ul>
            </Figure>
          </ArticleSection>

          <ArticleSection id="what-changed" num="2" eyebrow="What changed" title="The advantage is no longer shipping more software. It is learning faster through software.">
            <Prose>
              <p>For decades, software organizations optimized for specialization, scale, and coordinated handoffs. That made sense when software was expensive to build.</p>
              <p>AI is changing the equation. The cost of prototyping, implementation, iteration, research synthesis, and validation is falling, and a small team can move from an important problem to working software far faster than before.</p>
            </Prose>
            <Figure>
              <div className="m2-th4-constraints">
                <p className="m2-th4-label">As execution gets cheaper, the real constraints shift toward:</p>
                <ul className="m2-ab4-chips">
                  {CONSTRAINTS.map((c, i) => <li key={c} data-tone={["sprout", "storefront", "layers"][i % 3]}>{c}</li>)}
                </ul>
              </div>
            </Figure>
          </ArticleSection>

          <ArticleSection id="product-leadership" num="3" eyebrow="Product leadership is evolving" title="The role of product leadership is to create the conditions for a multidisciplinary team to solve important customer problems.">
            <Prose>
              <p>The modern product leader is not primarily a backlog owner, a requirements writer, or a coordinator of functional handoffs. The role is becoming broader and more integrated.</p>
            </Prose>
            <Figure>
              <ul className="m2-th4-rows">
                {ROLE.map((r) => (
                  <li key={r.text}>
                    <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={r.tone}><I d={r.icon} /></span>
                    <p>{r.text}</p>
                  </li>
                ))}
              </ul>
            </Figure>
          </ArticleSection>

          <ArticleSection id="evolution" num="4" eyebrow="Evolution over revolution" title="Every team starts somewhere different. The goal is one stage forward.">
            <Prose>
              <p>This is not an argument that traditional product organizations are obsolete. Many companies have real constraints: existing systems, customers, compliance needs, organizational scale. The market is in transition, and the opportunity is to help teams move one meaningful stage forward from wherever they are today.</p>
            </Prose>
            <Figure>
              <ol className="m2-ab4-cols m2-th4-stages">
                {STAGES.map((s) => (
                  <li key={s.num}>
                    <p className="m2-th-stage-num">{s.num}</p>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </li>
                ))}
              </ol>
            </Figure>
          </ArticleSection>

          <ArticleSection id="where-we-point-it" num="5" eyebrow="Where we point it" title="AI is leverage. What matters is where we choose to apply it.">
            <Prose>
              <p>The thesis is not only about how software gets built. It is about what is worth building. Problems that once required large organizations, enormous capital, or hundreds of people may now be approachable by small, experienced teams with conviction and judgment.</p>
              <p>The hopeful part of this moment is not that companies can build more cheaply. It is that important problems may be more solvable than they have ever been.</p>
              <p>Madrona exists to put this thesis into practice. Our products and client work are the evidence, and we share what we learn as we go. This is a working document; the moment it stops changing, it has stopped doing its job.</p>
            </Prose>
            <div className="m2-th-close-links">
              <Link className="m2-text-link" to="/about">Why Madrona exists <span aria-hidden="true">→</span></Link>
              <Link className="m2-text-link" to="/consulting">How we put it into practice <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>

      <SiteFooter cta={false} />
    </main>
  );
}
