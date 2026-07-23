import { Link } from "react-router-dom";
import type { CaseStudy } from "../data/caseStudies";
import Img from "./Img";

interface Props {
  study: CaseStudy;
  problem: string;
  built: string;
  proves: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  compact?: boolean;
}

export default function FeaturedCaseStudy({
  study,
  problem,
  built,
  proves,
  secondaryImage,
  secondaryImageAlt,
  compact = false,
}: Props) {
  return (
    <article className="border-y border-line py-8 md:py-10">
      <div className={`grid gap-9 ${compact ? "md:grid-cols-[1.1fr_.9fr]" : "md:grid-cols-[1.3fr_.7fr]"} md:items-start md:gap-14`}>
        <div className="relative">
          {study.heroImage && (
            <Img
              src={study.heroImage}
              alt={study.heroImageAlt ?? ""}
              className="aspect-[16/10] w-full rounded-card border border-line-soft object-cover object-top"
            />
          )}
          {!compact && secondaryImage && (
            <Img
              src={secondaryImage}
              alt={secondaryImageAlt ?? ""}
              className="mt-4 aspect-[16/10] w-2/3 rounded-card border border-line bg-card object-cover object-top sm:absolute sm:-bottom-8 sm:right-5 sm:mt-0 sm:w-[42%]"
            />
          )}
        </div>
        <div className={!compact && secondaryImage ? "sm:pb-8" : ""}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-[3px] border border-madrona/40 px-2 py-1 text-[11px] font-semibold uppercase tracking-[.12em] text-madrona">
              {study.stage === "live" ? "Live product" : study.stage}
            </span>
            <span className="text-xs text-muted">Designed and operated by Madrona</span>
          </div>
          <h3 className="mb-7 text-[clamp(2rem,4vw,3.2rem)]">{study.title}</h3>
          <dl className="space-y-5">
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-[.12em] text-muted">The problem</dt>
              <dd className="leading-relaxed text-ink70">{problem}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-[.12em] text-muted">What we built</dt>
              <dd className="leading-relaxed text-ink70">{built}</dd>
            </div>
            <div>
              <dt className="mb-1 text-xs font-semibold uppercase tracking-[.12em] text-muted">What it proves</dt>
              <dd className="leading-relaxed text-ink70">{proves}</dd>
            </div>
          </dl>
          <Link to={`/work/${study.slug}`} className="mt-7 inline-block text-sm font-medium">
            Read the case study &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
