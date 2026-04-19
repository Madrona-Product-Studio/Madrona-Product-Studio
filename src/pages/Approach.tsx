import { offerings } from "../data/offerings";
import OfferingCard from "../components/OfferingCard";
import PageMeta from "../components/PageMeta";

export default function Approach() {
  return (
    <div className="space-y-24">
      <PageMeta title="Approach" description="Strategy sprints, rapid prototyping, and fractional product leadership. How Madrona Product Studio works." />
      <section className="max-w-2xl">
        <h1 className="mb-12">Approach</h1>
        <div className="border-l-2 border-madrona/30 pl-8 space-y-6">
          <p className="font-serif text-2xl md:text-3xl text-ink leading-tight">
            We believe small teams focused on big problems can change the world.
          </p>
          <div className="space-y-5 text-ink-light text-lg leading-relaxed">
            <p>
              That's the thesis, and it's getting more true every year. The tools
              available to a senior operator with good taste and a trusted network
              are better than what most product teams had five years ago. The gap
              between "I think we should build this" and "here's a working version
              of it" has collapsed — if you have the right people and you don't get
              in your own way.
            </p>
            <p>
              Madrona is built around that collapse. We work at the front end of the
              product lifecycle, where clarity matters more than scale. Our
              engagements are short, intense, and small-team by design. One senior
              lead at the center. A trusted network of designers, engineers, and
              researchers around the edges. AI where it pulls its weight. No
              hierarchy, no handoffs, no pods.
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

      {/* Offerings */}
      <section>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {offerings.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="max-w-2xl space-y-6">
        <h2>How we work</h2>
        <div className="space-y-5 text-ink-light text-lg leading-relaxed">
          <p>
            We work in tight cycles. We're direct about what we see. We'd rather
            ship something real and learn than polish a deck. And we treat your
            product like it's ours — because for the duration of the engagement,
            it is.
          </p>
          <p>
            Most of our clients are founders, heads of product, and leadership
            teams at early- and mid-stage companies in outdoor, wellness, health,
            and consumer tech. If that sounds like you, we should talk.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-cream-dark pt-16">
        <h2 className="mb-5">Interested?</h2>
        <p className="text-ink-light text-lg mb-8 leading-relaxed">
          Tell us what you're working on. We'll figure out together whether
          there's a fit.
        </p>
        <a
          href="mailto:hello@madronaproduct.com"
          className="inline-block bg-madrona text-cream px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark transition-colors no-underline"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
