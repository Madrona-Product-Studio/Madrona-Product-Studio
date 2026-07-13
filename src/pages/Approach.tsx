import { offerings } from "../data/offerings";
import OfferingCard from "../components/OfferingCard";
import PageMeta from "../components/PageMeta";

export default function Approach() {
  const coreEngagement = offerings.filter(o => o.slug !== "product-stewardship");
  const fractional = offerings.find(o => o.slug === "product-stewardship");

  return (
    <div className="space-y-24">
      <PageMeta title="Approach" description="Strategy sprints, signal sprints, and product stewardship. How Madrona Product Studio works." />
      <section className="max-w-2xl">
        <h1 className="mb-12">Approach</h1>
        <div className="border-l-2 border-madrona/30 pl-8 space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-ink leading-tight">
            Strategy without software is a slide deck. Software without strategy is a feature factory.
          </p>
          <div className="space-y-5 text-ink-light text-lg leading-relaxed">
            <p>
              We do both, and we do them together. The gap between "I think we
              should build this" and "here's a working version of it" has collapsed.
              AI, modern tooling, and a senior team that holds the full picture mean
              we ship in weeks what used to take quarters.
            </p>
            <p>
              One senior lead at the center. A trusted network of designers,
              engineers, and researchers around the edges. AI where it pulls its
              weight. No hierarchy, no handoffs, no pods. Engagements are short,
              intense, and high-signal by design.
            </p>
            <p>
              What you get is coherence. The strategy and the prototype are made by
              the same people, which means the prototype actually reflects the
              strategy. The research and the decisions are held in the same head,
              which means the decisions don't drift. The thing we ship is the thing
              we meant to ship.
            </p>
          </div>
        </div>
      </section>

      {/* The engagement arc */}
      <section>
        <p className="text-xs font-medium uppercase tracking-widest text-ink-light/50 mb-4">The engagement</p>
        <h2 className="mb-12">Figure it out, then build it.</h2>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
          {coreEngagement.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </section>

      {/* The rhythm */}
      <section className="max-w-2xl space-y-6">
        <h2>The rhythm</h2>
        <div className="space-y-5 text-ink-light text-lg leading-relaxed">
          <p>
            Kickoff call to align on the question. Weekly syncs, async everything
            else. A shared Slack channel or equivalent. Working demos every 1-2
            weeks so nothing drifts. Direct access to the people doing the work,
            because there's no layer between us.
          </p>
        </div>
      </section>

      {/* Ongoing leadership */}
      {fractional && (
        <section>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-light/50 mb-4">Ongoing</p>
          <div className="max-w-xl">
            <OfferingCard offering={fractional} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-2xl border-t border-cream-dark pt-16">
        <h2 className="mb-5">Let's build something.</h2>
        <p className="text-ink-light text-lg mb-8 leading-relaxed">
          Tell us what you're working on. We'll figure out together whether
          there's a fit.
        </p>
        <a
          href="mailto:hello@madronaproduct.com"
          className="press inline-block bg-madrona text-cream px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
