import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

// The service architecture follows the business lifecycle: how customers
// find you (demand), how the work gets done (operations), how what you
// sell reaches people (channel & fulfillment). See CLAUDE.md.
const buckets = [
  {
    index: "01",
    label: "Demand",
    heading: "How customers find you.",
    intro:
      "The front of the business: getting seen, getting understood, getting chosen. We build the pieces that pull people in, and we measure whether they're working.",
    services: [
      "Brand and positioning that sounds like you, not like marketing",
      "A web presence that does your work justice",
      "Optimizing the site you already have: speed, conversion, search",
      "Content people actually want, on a rhythm you can keep",
      "Performance marketing with honest measurement",
      "E-commerce that turns interest into orders",
    ],
  },
  {
    index: "02",
    label: "Operations",
    heading: "How the work gets done.",
    intro:
      "The middle of the business, where the hours go. We map how the operation actually flows, find the places it leaks time or money, and build the tools that close the gaps.",
    services: [
      "Service blueprinting: the whole operation, mapped honestly",
      "Finding the efficiencies worth chasing (and naming the ones that aren't)",
      "AI agents and tools built on your real workflows",
      "Small tools with one job: a what's-fresh board, a field map, a review digest, an availability broadcast",
    ],
    flagship: true,
  },
  {
    index: "03",
    label: "Channel & fulfillment",
    heading: "How it reaches people.",
    intro:
      "The back of the business: the path between someone wanting what you make and having it. We build direct channels and smooth the road behind them.",
    services: [
      "Direct-to-consumer channels you own",
      "Online ordering and booking that works the first time",
      "Fulfillment support that keeps pace with the front door",
    ],
  },
];

export default function Services() {
  return (
    <div className="space-y-24">
      <PageMeta
        title="Services"
        description="Madrona works across the whole arc of a business: demand (brand, web, content, marketing, e-commerce), operations (blueprinting, efficiencies, AI agents), and channel & fulfillment (DTC, ordering, booking)."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <h1 className="mb-8">What we do</h1>
        <div className="max-w-2xl">
          <Breath>
            Every business runs the same arc: customers find you, the work
            gets done, and what you sell reaches people. We work across all
            three. Pick the part that hurts; we meet you there.
          </Breath>
        </div>
      </section>

      {buckets.map((bucket) => (
        <section key={bucket.index} className="max-w-2xl">
          <div className="mb-6"><Marker index={bucket.index} /></div>
          <Label className="block mb-4">{bucket.label}</Label>
          <h2 className="mb-6">{bucket.heading}</h2>
          <p className="text-ink70 leading-relaxed mb-8">{bucket.intro}</p>
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

      {/* Signal — the cross-cutting practice */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="04" /></div>
        <Label className="block mb-4">Signal · how we de-risk all of it</Label>
        <h2 className="mb-6">Real customers, before real money.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            Before anything expensive gets built, we make the idea testable
            and put it in front of real customers: moderated tests through
            panels like UserTesting, smoke-test pages with a small ad budget,
            instrumented betas, and plain old conversations. We run this loop
            on our own products, and it's the cheapest insurance an idea can
            buy.
          </p>
          <p>
            A validation test also makes a natural first engagement: small,
            fast, and the signal is yours to keep whatever you decide to
            build.
          </p>
        </div>
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
