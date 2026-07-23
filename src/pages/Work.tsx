import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import WorkRow from "../components/WorkRow";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Breath } from "../components/swiss";

// The /work index groups by the lifecycle muscle each project demonstrates,
// mirroring the service architecture — not by product maturity. Prototypes
// are presented as the deliverable of strategy work, not unfinished apps.
const sections = [
  {
    lifecycle: "demand" as const,
    label: "Getting found",
    heading: "Earning attention, honestly.",
    intro:
      "Brand, content, launch, growth. Both of these went from nothing to a live audience, and the marketing work is as much the story as the software.",
  },
  {
    lifecycle: "operations" as const,
    label: "Running smoother",
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
      "A strategy engagement here doesn't end in a deck; it ends in something you can touch. These are ours: some validated with real users through betas and testing panels, some still open theses. Every one of them started as a question.",
  },
];

export default function Work() {
  const recentWork = caseStudies.filter((s) => s.category === "recent" && !s.hidden);

  return (
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="Work"
        description="The work behind the offer: audiences earned for live products, an operation run on agents, and prototypes as the deliverable of strategy work."
      />

      <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <Label className="mb-5 block">Selected work</Label>
          <h1>Ideas made tangible.</h1>
        </div>
        <div className="max-w-2xl">
          <Breath>
            Everything here was built, shipped, and run by the studio. The
            work spans live businesses, tools used every day, and product
            theses made real enough to test.
          </Breath>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <Label className="mb-4 block">The clearest proof</Label>
            <h2>Live and in use.</h2>
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {recentWork
            .filter((study) => ["lila-trips", "san-juan-boating-guide", "helm"].includes(study.slug))
            .map((study) => <CaseStudyCard key={study.slug} study={study} />)}
        </div>
      </section>

      <div className="border-t border-line pt-12">
        <Label>More from the studio</Label>
      </div>

      {sections.map((section) => {
        const items = recentWork.filter(
          (study) =>
            study.lifecycle === section.lifecycle &&
            !["lila-trips", "san-juan-boating-guide", "helm"].includes(study.slug),
        );
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
