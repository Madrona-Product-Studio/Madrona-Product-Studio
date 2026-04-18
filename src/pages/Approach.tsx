import { offerings } from "../data/offerings";
import OfferingCard from "../components/OfferingCard";

export default function Approach() {
  return (
    <div className="space-y-24">
      <section className="max-w-2xl">
        <h1 className="mb-5">Approach</h1>
        <p className="text-lg md:text-xl text-ink-light leading-relaxed">
          We do three things. Each one is designed to give you senior product
          thinking and the ability to ship — at the scale and pace your
          situation demands.
        </p>
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
            Every engagement is led personally by a senior product leader — not
            handed off to a junior team. We bring in collaborators from our
            network when the work calls for it: designers, engineers, data
            scientists, researchers. The team flexes to the shape of the problem.
          </p>
          <p>
            We work in tight cycles. We're direct about what we see. We'd rather
            ship something real and learn than polish a deck. And we treat your
            product like it's ours — because for the duration of the engagement,
            it is.
          </p>
          <p>
            We use AI where it makes the work better — accelerating research,
            prototyping faster, generating and testing ideas at a pace that
            wasn't possible two years ago. But we know where it helps and where
            it doesn't. The goal is never "fast." It's quality, faster.
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
