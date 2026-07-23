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
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="Services"
        description="Getting found, coming back, running smoother. New websites, brand, and online stores on Shopify; loyalty and repeat ordering; workflow fixes and AI agents on your real workflows. Every engagement names what would change."
      />

      {/* Intro */}
      <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <Label className="mb-5 block">What we do</Label>
          <h1>Start with what needs to change.</h1>
        </div>
        <div className="max-w-2xl md:pb-1">
          <Breath>
            You do not need to arrive with a feature list or the name of a
            technology. Tell us where customers get stuck or where the week
            disappears. We will help name the right first move.
          </Breath>
        </div>
      </section>

      <section className="grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
        {buckets.map((bucket) => (
          <a
            key={bucket.index}
            href={`#service-${bucket.index}`}
            className="group flex min-h-64 flex-col justify-between border-b border-line py-7 no-underline last:border-0 md:border-0 md:px-7 md:first:pl-0 md:last:pr-0"
          >
            <span className="text-xs font-semibold text-madrona">{bucket.index}</span>
            <div className="mt-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-muted">
                {bucket.label}
              </p>
              <h2 className="text-[1.75rem] text-ink transition-colors group-hover:text-madrona-dark">
                {bucket.index === "01" ? "Get found." : bucket.index === "02" ? "Bring people back." : "Get hours back."}
              </h2>
            </div>
          </a>
        ))}
      </section>

      {buckets.map((bucket, bucketIndex) => (
        <section
          id={`service-${bucket.index}`}
          key={bucket.index}
          className="grid scroll-mt-28 gap-10 border-t border-line pt-10 md:grid-cols-[.72fr_1.28fr] md:gap-20"
        >
          <div>
            <div className="mb-6"><Marker index={bucket.index} /></div>
            <Label className="mb-4 block">{bucket.label}</Label>
            <h2 className="mb-6">
              {bucketIndex === 0 ? "Get found." : bucketIndex === 1 ? "Bring people back." : "Get hours back."}
            </h2>
            <p className="text-lg leading-relaxed text-ink70">{bucket.impact}</p>
          </div>
          <div>
            <p className="mb-8 font-serif text-[1.55rem] font-medium leading-snug text-ink">
              {bucket.door}
            </p>
            <ul className="m-0 list-none divide-y divide-line-soft border-y border-line p-0">
              {bucket.services.map((service) => (
                <li key={service} className="grid grid-cols-[1.5rem_1fr] gap-3 py-4 text-ink">
                  <span className="text-madrona" aria-hidden="true">↳</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            {bucket.callout && (
              <div className="mt-8 rounded-card bg-paper p-6 md:p-8">
                <p className="mb-3 text-ink">
                  <span className="font-semibold">{bucket.callout.heading}</span>{" "}
                  <span className="text-ink70">{bucket.callout.body}</span>
                </p>
                {bucket.callout.to && (
                  <Link to={bucket.callout.to} className="text-sm font-medium">
                    {bucket.callout.linkText}
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* Success criteria — the standing promise */}
      <section className="grid gap-10 bg-ink px-7 py-10 text-paper md:grid-cols-[1fr_auto] md:items-end md:px-10 md:py-12">
        <div>
          <Label className="mb-4 block text-paper/55">The standing promise</Label>
          <h2 className="mb-5 max-w-3xl text-paper">Name the win before the work starts.</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-paper/65">
            Every engagement defines what should change and how we will know.
            An honest expectation with a way to check it, never a guarantee.
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link to="/how-it-works" className="self-center text-sm font-medium text-paper/80 hover:text-paper">
            How it works
          </Link>
          <ConnectCta className="press inline-flex items-center rounded bg-madrona px-6 py-3 text-sm font-medium text-paper no-underline hover:bg-madrona-dark">
            Let&apos;s connect
          </ConnectCta>
        </div>
      </section>
    </div>
  );
}
