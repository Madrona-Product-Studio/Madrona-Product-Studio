import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

// The service architecture is Grow / Retain / Operate (internal vocabulary;
// see CLAUDE.md and the canon). On the page, each bucket is a symptom
// question, an impact line in the owner's terms, and plain-words offerings.
const buckets = [
  {
    index: "01",
    label: "Getting found",
    door: "Selling something great behind a web presence that doesn't do it justice?",
    impact:
      "What changes: more people find you, and more of them buy. Measured in things you already watch: calls, orders, bookings, customers who say they found you online.",
    services: [
      "New websites that do your work justice",
      "Brand and positioning that sounds like you, not like marketing",
      "Content and marketing that pull their weight, honestly measured",
      "Online stores and a smooth path to the first order",
    ],
  },
  {
    index: "02",
    label: "Coming back",
    door: "People buy from you once, then you never hear from them again?",
    impact:
      "What changes: customers come back more often. Repeat orders, active members, regulars you can actually reach.",
    services: [
      "Loyalty programs and memberships worth joining",
      "Repeat and standing ordering that makes coming back easy",
      "Win-back and lifecycle email and SMS",
      "Reviews: earning them, answering them, learning from them",
    ],
  },
  {
    index: "03",
    label: "Running smoother",
    door: "Watching the week disappear into work that software should be doing?",
    impact:
      "What changes: hours back every week. Work that runs itself, fewer mistakes, a shorter Monday.",
    services: [
      "Workflow fixes that close the places time leaks",
      "Small tools with one job: a what's-fresh board, a review digest, an availability broadcast",
      "Agentic AI in your operation, built on your real workflows",
    ],
    flagship: true,
  },
];

export default function Services() {
  return (
    <div className="space-y-24">
      <PageMeta
        title="Services"
        description="Getting found, coming back, running smoother. New websites, brand, and online stores; loyalty and repeat ordering; workflow fixes and agentic AI on your real workflows. Every engagement names what would change."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <h1 className="mb-8">What we do</h1>
        <div className="max-w-2xl">
          <Breath>
            Three ways a business gets better: more people find you, more of
            them come back, and the work behind the counter runs smoother.
            Pick the part that hurts; we meet you there.
          </Breath>
        </div>
      </section>

      {buckets.map((bucket) => (
        <section key={bucket.index} className="max-w-2xl">
          <div className="mb-6"><Marker index={bucket.index} /></div>
          <Label className="block mb-4">{bucket.label}</Label>
          <h2 className="mb-6">{bucket.door}</h2>
          <p className="text-ink70 leading-relaxed mb-8">{bucket.impact}</p>
          <ul className="border-t border-line divide-y divide-line-soft list-none m-0 p-0">
            {bucket.services.map((s) => (
              <li key={s} className="py-4 text-ink leading-relaxed">
                {s}
              </li>
            ))}
          </ul>
          {bucket.flagship && (
            <div className="mt-10 border-l-2 border-madrona/30 pl-6">
              <p className="text-ink leading-relaxed mb-3">
                <span className="font-medium">The flagship: agentic operations.</span>{" "}
                Business agents on your real workflows, and one command
                surface that shows the whole operation. We run our own studio
                this way.
              </p>
              <Link
                to="/services/agentic-operations"
                className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
              >
                How agentic operations works &rarr;
              </Link>
            </div>
          )}
        </section>
      ))}

      {/* Success criteria — the standing promise */}
      <section className="max-w-2xl border-l-2 border-madrona/30 pl-6">
        <p className="text-ink text-lg leading-relaxed mb-3">
          Every engagement names its win before work starts, in your terms,
          and we measure against it. An honest expectation with a way to
          check it, never a guarantee.
        </p>
        <Link to="/how-it-works" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
          How that works &rarr;
        </Link>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-16">
        <h2 className="mb-5">Not sure which part you need?</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          That's what the first conversation is for. Thirty minutes,
          free, with a published agenda. We'll tell you where we'd start,
          in writing, whether or not you hire us.
        </p>
        <Link
          to="/how-it-works"
          className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
        >
          Book a 30m free chat
        </Link>
      </section>
    </div>
  );
}
