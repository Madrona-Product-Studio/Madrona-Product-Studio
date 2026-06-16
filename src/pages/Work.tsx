import { caseStudies, STAGE_ORDER, STAGE_LABELS } from "../data/caseStudies";
import WorkRow from "../components/WorkRow";
import PageMeta from "../components/PageMeta";
import { Label } from "../components/swiss";

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
  const recentWork = caseStudies.filter((s) => s.category === "recent" && !s.hidden);

  return (
    <div className="space-y-32">
      <PageMeta title="Work" description="Recent product work and selected experience from Madrona Product Studio." />

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
