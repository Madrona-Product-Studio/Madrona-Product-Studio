import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";

const priorWork = [
  {
    company: "REI",
    logo: "/images/logos/rei-logo.svg",
    projects: "Adventures, Mobile App Portfolio, Membership, Cooperative Action Fund",
  },
  {
    company: "Healthline",
    logo: "/images/logos/healthline-logo.svg",
    projects: "Bezzy, Daily Dose, Chronic Condition Platform",
  },
  {
    company: "Microsoft",
    logo: "/images/logos/microsoft-logo.svg",
    projects: "XBOX, Office, Windows Phone",
  },
  {
    company: "Ford",
    logo: "/images/logos/ford-logo.svg",
    projects: "Global mobile commerce",
  },
];

export default function Work() {
  const recentWork = caseStudies.filter((s) => s.category === "recent");

  return (
    <div className="space-y-32">
      <PageMeta title="Work" description="Recent product work and selected experience from Madrona Product Studio." />

      <section>
        <h1 className="mb-12">Products we've shipped</h1>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {recentWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-10 text-ink-light">Prior to Madrona</h2>
        <div className="space-y-0 divide-y divide-cream-dark">
          {priorWork.map((item) => (
            <div
              key={item.company}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-6"
            >
              <div className="sm:w-32 shrink-0">
                <img
                  src={item.logo}
                  alt={item.company}
                  className="h-8 w-auto opacity-60"
                  loading="lazy"
                />
              </div>
              <p className="text-ink-light">{item.projects}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
