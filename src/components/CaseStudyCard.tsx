import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";

interface Props {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: Props) {
  return (
    <Link
      to={`/work/${study.slug}`}
      className="group block no-underline"
    >
      <div className="space-y-1.5 mb-5">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-light">
            {study.client}
          </p>
          {study.statusLabel && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-madrona border border-madrona/30 px-1.5 py-0.5 rounded leading-none">
              {study.statusLabel}
            </span>
          )}
        </div>
        <h3 className="text-xl group-hover:text-madrona transition-colors text-ink">
          {study.title}
        </h3>
        <p className="text-ink-light text-sm leading-relaxed">
          {study.tagline}
        </p>
        {study.highlights && study.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {study.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] font-medium text-madrona bg-madrona/8 px-2 py-0.5 rounded"
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
          className={`aspect-[4/3] w-full object-cover object-top rounded transition-shadow group-hover:shadow-md${study.borderImages ? " border border-cream-dark" : ""}`}
          loading="lazy"
        />
      ) : (
        <div className="aspect-[4/3] bg-cream-dark rounded flex items-center justify-center text-ink-light text-sm transition-shadow group-hover:shadow-md">
          {study.title}
        </div>
      )}
    </Link>
  );
}
