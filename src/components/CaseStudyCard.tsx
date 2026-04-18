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
      {/* TODO: Replace with real image */}
      <div className="aspect-[4/3] bg-cream-dark rounded mb-5 flex items-center justify-center text-ink-light text-sm transition-shadow group-hover:shadow-md">
        {study.title} — image placeholder
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wider text-ink-light">
          {study.client}
        </p>
        <h3 className="text-xl group-hover:text-madrona transition-colors text-ink">
          {study.title}
        </h3>
        <p className="text-ink-light text-sm leading-relaxed">
          {study.tagline}
        </p>
      </div>
    </Link>
  );
}
