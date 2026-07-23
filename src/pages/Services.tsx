import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import ConnectCta from "../components/ConnectCta";
import { Label, Marker, Breath } from "../components/swiss";

// The service architecture is Grow / Retain / Operate (internal vocabulary;
// see CLAUDE.md and the canon). On the page, each bucket is a symptom
// question, an impact line in the owner's terms, and plain-words offerings.
// Two buckets carry a "flagship" callout — selling online (Getting found)
// and agentic operations (Running smoother).
const buckets = [
  {
    index: "01",
    label: "Getting found",
    door: "Selling something great behind a web presence that doesn't do it justice?",
    impact:
      "What changes: more people find you, and more of them buy. You feel it in the numbers you already watch, calls, orders, bookings, the customers who say they found you online.",
    services: [
      "New websites that do your work justice",
      "Brand and positioning that sound like you, not like marketing",
      "Content and marketing that pull their weight, honestly measured",
      "Online stores that turn browsers into buyers",
    ],
    callout: {
      heading: "Selling online, handled.",
      body:
        "Most online stores leak sales to friction: a checkout that fights the customer, a catalog that's a chore to keep current, a storefront bolted on as an afterthought. We build and upgrade stores on Shopify (or the platform you're already on), wire in the integrations that matter, and shorten the path from found you to bought from you. A new store, a replatform, or fixing the one you've got.",
    },
  },
  {
    index: "02",
    label: "Coming back",
    door: "People buy from you once, then you never hear from them again?",
    impact:
      "What changes: customers come back more often. Repeat orders, active members, regulars you can actually reach.",
    services: [
      "Loyalty and memberships worth joining",
      "Repeat and standing orders that make coming back easy",
      "Win-back and reminder emails and texts",
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
      "Small tools with one job: a booking page that stays in sync, a review digest, a low-stock heads-up",
      "AI agents that handle the busywork, built on your real workflows",
    ],
    callout: {
      heading: "The flagship: agentic operations.",
      body:
        "Business agents on your real workflows, and one command surface that shows the whole operation. We run our own studio this way.",
      to: "/services/agentic-operations",
      linkText: "How agentic operations works →",
    },
  },
];

export default function Services() {
  return (
    <div className="space-y-24">
      <PageMeta
        title="Services"
        description="Getting found, coming back, running smoother. New websites, brand, and online stores on Shopify; loyalty and repeat ordering; workflow fixes and AI agents on your real workflows. Every engagement names what would change."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <h1 className="mb-8">What we do</h1>
        <div className="max-w-2xl">
          <Breath>
            The shop, the clinic, the outfitter, the family farm. Good
            businesses around here come in every shape, and the software
            rarely keeps up. We help in three ways: more people find you,
            more of them come back, and the work behind the counter runs
            smoother. Pick the part that hurts; we meet you there.
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
          {bucket.callout && (
            <div className="mt-10 border-l-2 border-madrona/30 pl-6">
              <p className="text-ink leading-relaxed mb-3">
                <span className="font-medium">{bucket.callout.heading}</span>{" "}
                {bucket.callout.body}
              </p>
              {bucket.callout.to && (
                <Link
                  to={bucket.callout.to}
                  className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
                >
                  {bucket.callout.linkText}
                </Link>
              )}
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
        <ConnectCta>Let's connect</ConnectCta>
      </section>
    </div>
  );
}
