import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import WorkRow from "../components/WorkRow";
import PageMeta from "../components/PageMeta";
import { Label, Breath } from "../components/swiss";

export default function Work() {
  const visible = caseStudies.filter((study) => study.category === "recent" && !study.hidden);
  const operated = visible.filter((study) => study.stage === "live" || study.stage === "beta");
  const experiments = visible.filter(
    (study) => study.stage === "prototype" || study.stage === "concept",
  );

  return (
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="Work"
        description="Products Madrona actively runs, plus prototypes and experiments used to test product direction, methods, and technology."
      />

      <section className="grid gap-8 md:grid-cols-[.8fr_1.2fr] md:items-end">
        <div>
          <Label className="mb-5 block">Studio work</Label>
          <h1>Products we build and run.</h1>
        </div>
        <div className="max-w-2xl">
          <Breath>
            These are Madrona&apos;s own products and experiments, not client
            case studies. Some are live and actively operated. Others were
            built to test a product thesis. We show the stage plainly.
          </Breath>
        </div>
      </section>

      <section>
        <div className="mb-10 grid gap-5 md:grid-cols-[.72fr_1.28fr] md:items-end">
          <div>
            <Label className="mb-4 block">Products we run</Label>
            <h2>Live and in active use.</h2>
          </div>
          <p className="max-w-2xl leading-relaxed text-ink70">
            Products designed, built, launched, and operated by Madrona. They
            make the studio accountable to real users, real maintenance, and
            the decisions that only appear after launch.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {operated.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="border-t border-line pt-12">
        <div className="mb-10 grid gap-5 md:grid-cols-[.72fr_1.28fr] md:items-end">
          <div>
            <Label className="mb-4 block">Prototypes and experiments</Label>
            <h2>Built to answer a question.</h2>
          </div>
          <p className="max-w-2xl leading-relaxed text-ink70">
            Working products and concepts used to test direction, behavior,
            or technology. They are not presented as finished client work.
          </p>
        </div>
        <div>
          {experiments.map((study) => (
            <WorkRow key={study.slug} study={study} />
          ))}
        </div>
      </section>
    </div>
  );
}
