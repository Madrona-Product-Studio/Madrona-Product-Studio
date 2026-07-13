import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";

/** Portfolio row for the maturity-grouped index on /work: thumbnail, title, what it is, and its key capabilities. */
export default function WorkRow({ study }: { study: CaseStudy }) {
  return (
    <Link
      to={`/work/${study.slug}`}
      className="group flex items-start gap-5 sm:gap-6 py-6 no-underline border-t border-line first:border-t-0 first:pt-0"
    >
      {study.heroImage ? (
        <img
          src={study.heroImage}
          alt={study.heroImageAlt ?? ""}
          className="w-28 sm:w-44 aspect-[4/3] object-cover object-top rounded-card border border-line-soft shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-28 sm:w-44 aspect-[4/3] rounded-card border border-line-soft bg-card shrink-0 flex items-center justify-center text-muted text-xs text-center px-2">
          {study.title}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-[1.3rem] leading-tight tracking-[-0.03em] text-ink group-hover:text-madrona transition-colors mb-1.5">
          {study.title}
        </h3>
        <p className="text-clay text-sm leading-[1.55] max-w-2xl">{study.tagline}</p>
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
      <span
        className="hidden sm:block shrink-0 self-center text-faint text-lg group-hover:text-madrona group-hover:translate-x-0.5 transition-[color,transform] duration-200 ease-snap"
        aria-hidden="true"
      >
        &rarr;
      </span>
    </Link>
  );
}
