import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import OfferingCard from "../components/OfferingCard";
import { offerings } from "../data/offerings";
import { Label, Marker, Breath } from "../components/swiss";

// Booking destination. When the Cal.com (or similar) account exists, set
// this to the scheduling URL and the CTAs below switch from the contact
// form to direct booking.
const BOOKING_URL: string | null = null;

function BookButton({ children }: { children: React.ReactNode }) {
  const cls =
    "press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline";
  return BOOKING_URL ? (
    <a href={BOOKING_URL} className={cls}>
      {children}
    </a>
  ) : (
    <Link to="/contact" className={cls}>
      {children}
    </Link>
  );
}

const agenda = [
  {
    lead: "Where you're at.",
    body: "How things run today, what's working, and what's eating time or money.",
  },
  {
    lead: "Where you've been.",
    body: "What you've already tried or built, so we don't recommend something you've spent money on twice.",
  },
  {
    lead: "Your biggest opportunities.",
    body: "Where we see room to grow or get more efficient.",
  },
  {
    lead: "What's already on your mind.",
    body: "The list you've been meaning to get to. Bring it.",
  },
];

export default function HowItWorks() {
  return (
    <div className="space-y-24">
      <PageMeta
        title="How it works"
        description="A free 30-minute conversation with a published agenda, a short written assessment, then a scoped proposal if it makes sense. How every Madrona engagement starts."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <h1 className="mb-8">How it works</h1>
        <div className="max-w-2xl">
          <Breath>
            Working with us starts the same way every time. Three steps. The
            first one is free, the agenda is public, and no step commits you
            to the next.
          </Breath>
        </div>
      </section>

      {/* Step 1 */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-4">Step one</Label>
        <h2 className="mb-6">A 30-minute conversation. Free.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            We talk about your business, not about us. The agenda is published
            because you should know exactly what you're saying yes to:
          </p>
        </div>
        <ul className="my-8 space-y-5 border-l-2 border-madrona/30 pl-6 list-none">
          {agenda.map((item) => (
            <li key={item.lead} className="leading-relaxed">
              <span className="font-medium text-ink">{item.lead}</span>{" "}
              <span className="text-ink70">{item.body}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            Thirty minutes, not an hour. A tight conversation respects
            your day, and it's enough to see where the real opportunities
            sit. No pitch, no deck. You'll do most of the talking.
          </p>
        </div>
      </section>

      {/* Step 2 */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">Step two</Label>
        <h2 className="mb-6">A short written assessment.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            Within a week, you get a written assessment: the specific places
            where we think you could grow or run smoother, what we'd tackle
            first, and where we honestly can't help. It's a real piece of
            strategy work, and it's yours to keep whether or not we ever work
            together.
          </p>
        </div>
      </section>

      {/* Step 3 */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Step three</Label>
        <h2 className="mb-6">A scoped proposal, if it makes sense.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            If the assessment points somewhere worth going, we turn it into a
            proposal: scope, cost, and approach, in plain terms. We like to
            start small. Our entry engagement is a fixed $2,500: one specific
            thing fixed or built, with payback you can see. Larger work gets
            scoped from there.
          </p>
          <p>
            And if the assessment doesn't point anywhere? We'll say that too,
            and you're out nothing but 30 minutes.
          </p>
        </div>
      </section>

      {/* Proposal shapes */}
      <section>
        <Label className="block mb-4">The shapes a proposal takes</Label>
        <h2 className="mb-6">Sized to the question.</h2>
        <p className="text-ink70 leading-relaxed mb-12 max-w-2xl">
          Beyond the entry engagement, most proposals land in one of three
          shapes. The assessment tells us which one fits.
        </p>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
          {offerings.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-16">
        <h2 className="mb-5">Book the conversation.</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          Tell us a little about your business and a couple of times that
          work. We'll take it from there.
        </p>
        <BookButton>Book a 30m free chat</BookButton>
      </section>
    </div>
  );
}
