import { STAGE_LABELS, type CaseStudy } from "../data/caseStudies";

const productTypes: Record<NonNullable<CaseStudy["lifecycle"]>, string> = {
  demand: "Live audience and demand product",
  operations: "Internal operations product",
  strategy: "Product strategy prototype",
};

export default function CaseStudySummary({ study }: { study: CaseStudy }) {
  const stage = study.stage ? STAGE_LABELS[study.stage] : study.statusLabel ?? "Current";

  return (
    <section aria-label="Project at a glance" className="mb-16 border-y border-line py-7">
      <p className="mb-6 text-xs font-semibold uppercase tracking-[.14em] text-muted">
        At a glance
      </p>
      <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="mb-2 text-xs font-medium text-muted">Stage</dt>
          <dd className="font-medium text-ink">{stage}</dd>
        </div>
        <div>
          <dt className="mb-2 text-xs font-medium text-muted">Product type</dt>
          <dd className="font-medium leading-snug text-ink">
            {study.lifecycle ? productTypes[study.lifecycle] : "Digital product"}
          </dd>
        </div>
        <div>
          <dt className="mb-2 text-xs font-medium text-muted">Madrona&apos;s role</dt>
          <dd className="font-medium leading-snug text-ink">
            Strategy, design, engineering, and operation
          </dd>
        </div>
        <div>
          <dt className="mb-2 text-xs font-medium text-muted">Current status</dt>
          <dd className="font-medium leading-snug text-ink">
            {study.stage === "live"
              ? "Shipped and operating"
              : study.stage === "beta"
                ? "In active use and evolving"
                : study.stage === "prototype"
                  ? "Built to test the thesis"
                  : "Concept under exploration"}
          </dd>
        </div>
      </dl>
      {study.highlights && study.highlights.length > 0 && (
        <div className="mt-7 border-t border-line-soft pt-6">
          <p className="mb-3 text-xs font-medium text-muted">Key capabilities</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {study.highlights.map((highlight) => (
              <span key={highlight} className="text-sm text-ink70">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
