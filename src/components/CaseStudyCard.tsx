import { Link } from "react-router-dom";
import { STAGE_LABELS, type CaseStudy } from "../data/caseStudies";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: Props) {
  const badge = study.stage ? STAGE_LABELS[study.stage] : study.statusLabel;
  return (
    <Link to={`/work/${study.slug}`} className="group block no-underline">
      <div className="mb-5">
        {badge && (
          <div className="mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-madrona border border-madrona/40 px-1.5 py-0.5 rounded-[3px] leading-none">
              {badge}
            </span>
          </div>
        )}
        <h3 className="text-[1.4rem] leading-[1.04] tracking-[-0.03em] text-ink group-hover:text-madrona transition-colors mb-2">
          {study.title}
        </h3>
        <p className="text-clay text-sm leading-[1.6]">{study.tagline}</p>
        {study.highlights && study.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {study.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] font-medium text-clay border border-line px-2 py-0.5 rounded-[3px]"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
      {study.heroImage ? (
        <img
          src={study.heroImage}
          alt={study.heroImageAlt ?? ""}
          className={`aspect-[4/3] w-full object-cover object-top rounded-card transition-shadow group-hover:shadow-sm${
            study.borderImages ? " border border-line" : " border border-line-soft"
          }`}
          loading="lazy"
        />
      ) : (
        <div className="aspect-[4/3] bg-card rounded-card border border-line-soft flex items-center justify-center text-muted text-sm">
          {study.title}
        </div>
      )}
    </Link>
  );
}
