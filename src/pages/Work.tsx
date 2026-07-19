import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import WorkRow from "../components/WorkRow";
import PageMeta from "../components/PageMeta";
import { Label, Breath } from "../components/swiss";

// The /work index groups by the lifecycle muscle each project demonstrates,
// mirroring the service architecture — not by product maturity. Prototypes
// are presented as the deliverable of strategy work, not unfinished apps.
const sections = [
  {
    lifecycle: "demand" as const,
    label: "Demand",
    heading: "Earning attention, honestly.",
    intro:
      "Brand, content, launch, growth. Both of these went from nothing to a live audience, and the marketing work is as much the story as the software.",
  },
  {
    lifecycle: "operations" as const,
    label: "Operations",
    heading: "Running the studio on agents.",
    intro:
      "Our own operation is the ops proof: agents on real workflows, and a command surface that renders the whole business. Helm is the visible part.",
    link: { to: "/services/agentic-operations", text: "How we build this for clients" },
  },
  {
    lifecycle: "strategy" as const,
    label: "Strategy, made tangible",
    heading: "What strategy work leaves behind.",
    intro:
      "A strategy engagement here doesn't end in a deck; it ends in something you can touch. These are ours: some tested with real people, some still open theses. Every one of them started as a question.",
  },
];

export default function Work() {
  const recentWork = caseStudies.filter((s) => s.category === "recent" && !s.hidden);

  return (
    <div className="space-y-24">
      <PageMeta
        title="Work"
        description="The work behind the offer: demand built for live products, an operation run on agents, and prototypes as the deliverable of strategy work."
      />

      <section className="max-w-3xl">
        <h1 className="mb-8">The work</h1>
        <div className="max-w-2xl">
          <Breath>
            Everything here is ours: built, shipped, and run by the studio.
            We show it because it's the same work clients hire us for:
            earning demand, running an operation, and turning strategy into
            something you can touch.
          </Breath>
        </div>
      </section>

      {sections.map((section) => {
        const items = recentWork.filter((s) => s.lifecycle === section.lifecycle);
        if (items.length === 0) return null;
        return (
          <section key={section.lifecycle}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[3px] w-8 shrink-0 bg-madrona" aria-hidden="true" />
              <Label>{section.label}</Label>
            </div>
            <h2 className="mb-5">{section.heading}</h2>
            <p className="text-ink70 leading-relaxed mb-10 max-w-2xl">{section.intro}</p>
            <div>
              {items.map((study) => (
                <WorkRow key={study.slug} study={study} />
              ))}
            </div>
            {section.link && (
              <div className="mt-8">
                <Link
                  to={section.link.to}
                  className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
                >
                  {section.link.text} &rarr;
                </Link>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
