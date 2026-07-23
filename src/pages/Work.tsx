import { caseStudies, STAGE_ORDER, STAGE_LABELS } from "../data/caseStudies";
import WorkRow from "../components/WorkRow";
import PageMeta from "../components/PageMeta";
import { Label } from "../components/swiss";

export default function Work() {
  const recentWork = caseStudies.filter((s) => s.category === "recent" && !s.hidden);

  return (
    <div className="space-y-32">
      <PageMeta title="Work" description="Recent product work from Madrona Product Studio." />

      <section>
        <h1 className="mb-12">What we're building</h1>
        <div className="space-y-9">
          {STAGE_ORDER.map((stage) => {
            const items = recentWork.filter((s) => s.stage === stage);
            if (items.length === 0) return null;
            return (
              <div key={stage}>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`h-[3px] w-8 shrink-0 ${stage === "live" ? "bg-madrona" : "bg-faint"}`}
                    aria-hidden="true"
                  />
                  <Label>{STAGE_LABELS[stage]}</Label>
                </div>
                <div>
                  {items.map((study) => (
                    <WorkRow key={study.slug} study={study} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
