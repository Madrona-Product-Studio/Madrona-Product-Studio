import PageMeta from "../components/PageMeta";
import OfferingCard from "../components/OfferingCard";
import ConnectCta from "../components/ConnectCta";
import { offerings } from "../data/offerings";
import { Label, Breath } from "../components/swiss";

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
    lead: "What would better look like.",
    body: "Success in your terms: the numbers you watch, the hours you want back, what you'd love to stop doing by hand.",
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
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="How it works"
        description="A free 30-minute conversation with a published agenda, a short written assessment, then a scoped proposal if it makes sense. How every Madrona engagement starts."
      />

      {/* Intro */}
      <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <Label className="mb-5 block">How it works</Label>
          <h1>No black box. No hard sell.</h1>
        </div>
        <div className="max-w-2xl">
          <Breath>
            Three steps. The first is free, the agenda is public, and no step
            commits you to the next.
          </Breath>
        </div>
      </section>

      <section>
        <div className="grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
          {[
            ["01", "Talk", "A 30-minute conversation. Free.", "We talk about your business, not about us. You do most of the talking."],
            ["02", "Assess", "A short written assessment.", "Within a week, you get our honest read on where to start. It is yours to keep."],
            ["03", "Start", "A scoped first move.", "If there is somewhere worth going, we propose one specific thing with visible payback."],
          ].map(([number, label, title, body]) => (
            <article key={number} className="border-b border-line py-8 last:border-0 md:min-h-[24rem] md:border-0 md:px-8 md:first:pl-0 md:last:pr-0">
              <span className="mb-16 block text-xs font-semibold text-madrona">{number}</span>
              <Label className="mb-4 block">{label}</Label>
              <h2 className="mb-5 text-[1.75rem]">{title}</h2>
              <p className="leading-relaxed text-ink70">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
        <div>
          <Label className="mb-4 block">The public agenda</Label>
          <h2 className="mb-5">You will know what we will ask.</h2>
          <p className="text-lg leading-relaxed text-ink70">
            A tight conversation respects your day. No pitch, no deck, and
            nothing to prepare beyond what is already on your mind.
          </p>
        </div>
        <ol className="m-0 list-none border-t border-line p-0">
          {agenda.map((item) => (
            <li key={item.lead} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <span className="font-medium text-ink">{item.lead}</span>
              <span className="leading-relaxed text-ink70">{item.body}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Signal — how unproven ideas get de-risked (method, not a service) */}
      <section className="grid gap-8 bg-paper p-7 md:grid-cols-[.7fr_1.3fr] md:p-10">
        <div>
          <Label className="mb-4 block">When the idea is unproven</Label>
          <h2>Real customers, before real money.</h2>
        </div>
        <div className="text-lg leading-relaxed text-ink70">
          <p>
            When an assessment points at something nobody's proven yet, we
            don't propose building it. We propose testing it: moderated
            panels, smoke-test pages with a small ad budget, instrumented
            betas, plain old conversations. Real customers before real
            money, and the signal is yours to keep whatever you decide.
          </p>
        </div>
      </section>

      {/* Proposal shapes */}
      <section>
        <Label className="block mb-4">The shapes a proposal takes</Label>
        <h2 className="mb-6">Sized to the question.</h2>
        <p className="text-ink70 leading-relaxed mb-12 max-w-2xl">
          Beyond that first engagement, most proposals land in one of three
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
        <ConnectCta>Let's connect</ConnectCta>
      </section>
    </div>
  );
}
