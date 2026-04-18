import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";

export default function Work() {
  const clientWork = caseStudies.filter((s) => !s.isStudioProject);
  const studioWork = caseStudies.filter((s) => s.isStudioProject);

  return (
    <div className="space-y-32">
      <section className="max-w-2xl">
        <h1 className="mb-5">Work</h1>
        <p className="text-lg md:text-xl text-ink-light leading-relaxed">
          Product strategy, build, and leadership engagements — plus projects
          we've initiated because they should exist.
        </p>
      </section>

      {/* Client work */}
      <section>
        <h2 className="mb-12">Client engagements</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {clientWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* Studio projects */}
      <section>
        <div className="max-w-2xl mb-12">
          <h2 className="mb-5">Studio projects</h2>
          <p className="text-ink-light text-lg leading-relaxed">
            Not every project starts with a client. Some start with a question,
            a community need, or an idea someone brought to the table that we
            couldn't stop thinking about. Studio projects are how we stay
            sharp, build things we believe in, and work with people who are
            making something worth making.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
          {studioWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
