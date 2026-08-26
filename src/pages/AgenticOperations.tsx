import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import ConnectCta from "../components/ConnectCta";
import { Label, Marker, Breath } from "../components/swiss";

// helm.day is the public, demo-first landing. Never link the real HQ instance.
const HELM_DEMO_URL = "https://helm.day";

// The Berry Good cast: each agent is one beat for the farm, one beat for
// the reader's business. Berry Good is openly ours — a demonstration
// business, never implied to be a client. Rendered as a roster of cards:
// name + rhythm up top, the work in the body, the demo one click away.
const berryGoodCast: { name: string; rhythm: string; body: string; to?: string }[] = [
  {
    name: "The industry agent",
    rhythm: "Runs nightly",
    body: "Gathers the latest agriculture reports, prices, and news overnight, and hands the farm a short what-changed brief. Pointed at your trade instead, it's the cheapest strategy work you'll ever buy.",
    to: "/tools/industry-brief",
  },
  {
    name: "The invoicing agent",
    rhythm: "Runs weekly",
    body: "Drafts the invoices, sends them, and chases the late ones politely. The same agent runs on any business that bills.",
    to: "/tools/invoice-chasing",
  },
  {
    name: "The customer service agent",
    rhythm: "Always on",
    body: "First answers on hours, availability, and orders, in the farm's own voice, with a human one message away. The same agent sits on any inbox.",
    to: "/tools/customer-inbox",
  },
  {
    name: "The ordering surface",
    rhythm: "In season",
    body: "U-pick bookings and standing orders. The first order is a growth move, the reorder a retention move, the packing list behind it an operations move. One surface, all three.",
  },
];

// One rendered artifact beats a paragraph of description: an excerpt of the
// industry agent's what-changed brief, exactly as it lands each morning.
// One routed action only — the flash stays scarce.
const briefRows: { tag: string; text: string; action?: string }[] = [
  {
    tag: "Prices",
    text: "Raspberry flats are up 9% at the wholesale market this week.",
    action: "Routed to action: revisit u-pick pricing before the weekend.",
  },
  {
    tag: "Weather",
    text: "Heat advisory Saturday afternoon; mornings stay clear.",
  },
  {
    tag: "Demand",
    text: "Two cafés asked about standing berry orders in the last five days.",
  },
];

const agentArc = [
  {
    lead: "A base knowledge file.",
    body: "Everything worth knowing about your industry, written down once: the players, the pressures, the calendar, the questions that matter.",
  },
  {
    lead: "A scheduled sweep.",
    body: "The agent reads the sources on a rhythm you set: weekly, nightly, whatever the pace of your industry demands.",
  },
  {
    lead: "A what-changed digest.",
    body: "Not a feed. A short brief of what actually moved since last time, against the base file, so the signal isn't buried in the noise.",
  },
  {
    lead: "Signals routed to action.",
    body: "The changes that matter land where you work, attached to the next step, not filed away in a report nobody opens.",
  },
];

export default function AgenticOperations() {
  return (
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="Workflow automation and practical AI"
        description="Less repetitive work, fewer handoffs, and a clearer view of the operation. Practical automation and AI built around real business workflows."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <Label className="block mb-4">Workflow automation and practical AI</Label>
        <h1 className="mb-8">Make repetitive work run itself.</h1>
        <div className="max-w-2xl">
          <Breath>
            Less repetitive work. Fewer handoffs. One clear view of what
            changed and what needs attention. We use automation and AI where
            they genuinely make the operation easier to run.
          </Breath>
        </div>
      </section>

      <section className="rounded-card bg-ink p-6 text-paper md:p-10">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Label className="mb-3 block text-paper/50">The operating loop</Label>
            <h2 className="max-w-2xl text-paper">From scattered signals to a clear next move.</h2>
          </div>
          <span className="text-xs text-paper/45">One source of truth</span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {[
            ["Watch", "Orders, inboxes, reports, inventory"],
            ["Understand", "What changed and what actually matters"],
            ["Act", "Draft, flag, route, and show the next step"],
          ].map(([title, body], index) => (
            <div key={title} className="contents">
              <article className="rounded bg-paper/7 p-5">
                <span className="mb-10 block text-xs font-semibold text-madrona-light">0{index + 1}</span>
                <h3 className="mb-3 text-xl text-paper">{title}</h3>
                <p className="text-sm leading-relaxed text-paper/60">{body}</p>
              </article>
              {index < 2 && (
                <span className="hidden self-center text-madrona-light md:block" aria-hidden="true">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* The idea */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-4">The idea</Label>
        <h2 className="mb-6">Most ops pain is glue work.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            It's rarely one broken tool. It's the checking, collecting,
            reconciling, and remembering between the tools: the hours that
            disappear into keeping the operation stitched together. That
            glue work is exactly what agents are good at.
          </p>
          <p>
            So we build two things. Agents that run real workflows on a
            schedule: watching, gathering, drafting, flagging. And a command
            surface, a single dashboard rendered from one source of truth,
            where you can see the whole operation at a glance instead of
            holding it in your head.
          </p>
        </div>
      </section>

      {/* The worked example — Berry Good */}
      <section className="max-w-5xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">The worked example</Label>
        <h2 className="mb-6">Berry Good Berry Farm.</h2>
        <div className="max-w-2xl space-y-6 text-ink70 leading-relaxed">
          <p>
            Berry Good is our demonstration business: a small berry farm
            we're building out the way we'd build for a client, so we can
            show these tools on a real operation instead of a slide. A farm
            is a useful example because it has everything a business has: an
            industry that moves, invoices to chase, customers with questions,
            orders to fill. Here's the cast we're standing up around it:
          </p>
        </div>
        <ul className="my-10 grid gap-4 sm:grid-cols-2 list-none m-0 p-0">
          {berryGoodCast.map((item) => (
            <li key={item.name} className="flex">
              <article className="flex w-full flex-col gap-3 rounded-card border border-line bg-card p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                  <span className="whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">{item.rhythm}</span>
                </div>
                <p className="text-sm leading-relaxed text-ink70">{item.body}</p>
                {item.to && (
                  <Link to={item.to} className="mt-auto text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
                    Run the demo &rarr;
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ul>
        <div className="max-w-2xl space-y-6 text-ink70 leading-relaxed">
          <p>
            None of this is berry-specific. Swap the agriculture reports for
            your trade's, point the inbox agent at your inbox, and the same
            cast runs a clinic, an outfitter, or a bakery. Every agent ships
            with you taught to run it: we build it, set it up, and leave you
            capable.
          </p>
        </div>
        <div className="mt-8">
          <Link
            to="/tools"
            className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
          >
            See these agents run &rarr;
          </Link>
        </div>
      </section>

      {/* Anatomy of one agent, beside the artifact it produces */}
      <section className="max-w-5xl">
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">The anatomy</Label>
        <h2 className="mb-6">What's inside an agent.</h2>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className="space-y-6 text-ink70 leading-relaxed">
              <p>
                Take the industry agent apart and there's no magic, just four
                pieces done carefully:
              </p>
            </div>
            <ol className="mt-6 list-none m-0 p-0">
              {agentArc.map((item, i) => (
                <li key={item.lead} className="flex gap-4 border-t border-line-soft py-4 first:border-t-0 leading-relaxed">
                  <span className="pt-0.5 text-xs font-semibold text-madrona">0{i + 1}</span>
                  <div>
                    <span className="font-medium text-ink">{item.lead}</span>{" "}
                    <span className="text-ink70">{item.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <figure className="m-0 self-start overflow-hidden rounded-card border border-line bg-card">
            <figcaption className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">The what-changed brief</span>
              <span className="text-xs text-faint">Tuesday · 6:04 am</span>
            </figcaption>
            <ul className="list-none m-0 divide-y divide-line-soft p-0">
              {briefRows.map((row) => (
                <li key={row.tag} className="px-5 py-4">
                  <div className="flex items-baseline gap-4">
                    <span className="w-16 shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">{row.tag}</span>
                    <div>
                      <p className="m-0 text-sm leading-relaxed text-ink">{row.text}</p>
                      {row.action && <p className="m-0 mt-1.5 text-xs font-medium text-madrona">&rarr; {row.action}</p>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="m-0 border-t border-line-soft px-5 py-3 text-xs text-faint">
              An excerpt of the brief the industry agent drops each morning.
            </p>
          </figure>
        </div>
      </section>

      {/* Dogfood proof */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="04" /></div>
        <Label className="block mb-4">Proof</Label>
        <h2 className="mb-6">We run our own operation this way.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            The studio runs on the same architecture we sell: one
            source-of-truth repo, agents on nightly, morning, and weekly
            rhythms, and a command center called Helm that renders the whole
            operation: priorities, pipelines, watch items, one screen.
          </p>
          <p>
            We didn't build it as a demo. We built it because we needed it,
            and then realized every operation we'd ever seen needed the same
            thing shaped to its own work.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={HELM_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
          >
            See Helm &rarr;
          </a>
          <Link
            to="/apps"
            className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
          >
            See everything we build and run &rarr;
          </Link>
        </div>
      </section>

      {/* Start tiny */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="05" /></div>
        <Label className="block mb-4">Where to start</Label>
        <h2 className="mb-6">One agent, one card, tiny scope.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            You don't buy the whole architecture on day one. A first
            engagement is one agent on one workflow, plus one card on a
            dashboard that proves it's working. Tiny scope, visible payback.
            That's exactly what a first engagement is for. If it earns its
            keep, we grow it from there.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-16">
        <h2 className="mb-5">Curious what this looks like on your operation?</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          That's a 30-minute conversation, and it's free. We'll tell you in
          writing where agents would actually help, and where they wouldn't.
        </p>
        <ConnectCta>Let's connect</ConnectCta>
      </section>
    </div>
  );
}
