import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";

export default function Work() {
  const recentWork = caseStudies.filter((s) => s.category === "recent");
  const experience = caseStudies.filter((s) => s.category === "experience");

  return (
    <div className="space-y-32">
      <PageMeta title="Work" description="Recent product work and selected experience from Madrona Product Studio." />

      <h1>Work</h1>

      <section>
        <h2 className="mb-12">Recent work</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {recentWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-12">Selected experience</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {experience.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
