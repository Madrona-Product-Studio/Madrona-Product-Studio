import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

// Public demo only. Never link the real HQ / Helm instance from the site.
const HELM_DEMO_URL = "https://helm-os1.vercel.app/?demo=1";

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
    <div className="space-y-24">
      <PageMeta
        title="Agentic operations"
        description="Business agents on your real workflows, and one command surface that shows the whole operation. Madrona runs its own studio this way, and builds the same architecture for clients."
      />

      {/* Intro */}
      <section className="max-w-3xl">
        <Label className="block mb-4">Operations · the flagship</Label>
        <h1 className="mb-8">Agentic operations</h1>
        <div className="max-w-2xl">
          <Breath>
            Business agents working your real workflows, and one command
            surface where the whole operation is legible. Not a chatbot
            bolted onto the side of the business. The business itself,
            running with less friction.
          </Breath>
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

      {/* The worked example */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">A worked example</Label>
        <h2 className="mb-6">The industry agent.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            One agent type we build again and again: an industry and
            competitive intelligence agent that keeps you current without
            costing you a reading habit. It's one pattern that works across
            industries:
          </p>
        </div>
        <ul className="my-8 space-y-5 border-l-2 border-madrona/30 pl-6 list-none">
          {agentArc.map((item) => (
            <li key={item.lead} className="leading-relaxed">
              <span className="font-medium text-ink">{item.lead}</span>{" "}
              <span className="text-ink70">{item.body}</span>
            </li>
          ))}
        </ul>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            We run one on our own industry. The first thing it does for a
            client is usually the cheapest strategy work they've ever
            bought: knowing what changed this week, every week.
          </p>
        </div>
      </section>

      {/* Dogfood proof */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="03" /></div>
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
            See Helm in demo mode &rarr;
          </a>
          <Link
            to="/work/helm"
            className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
          >
            Read the Helm case study &rarr;
          </Link>
        </div>
      </section>

      {/* Start tiny */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="04" /></div>
        <Label className="block mb-4">Where to start</Label>
        <h2 className="mb-6">One agent, one card, tiny scope.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            You don't buy the whole architecture on day one. A first
            engagement is one agent on one workflow, plus one card on a
            dashboard that proves it's working. Tiny scope, visible payback.
            That's what the $2,500 entry engagement is built for. If it
            earns its keep, we grow it from there.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-16">
        <h2 className="mb-5">Curious what this looks like on your operation?</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          That's a 45-minute conversation, and it's free. We'll tell you in
          writing where agents would actually help, and where they wouldn't.
        </p>
        <Link
          to="/how-it-works"
          className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
        >
          See how it works
        </Link>
      </section>
    </div>
  );
}
