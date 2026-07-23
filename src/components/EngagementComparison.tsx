import type { Offering } from "../data/offerings";

const summaries: Record<string, { bestFor: string; output: string }> = {
  "strategy-sprint": {
    bestFor: "Clarifying the right problem and direction",
    output: "Direction, priorities, and a working prototype",
  },
  "signal-sprint": {
    bestFor: "Testing an idea with real customers",
    output: "Prototype, evidence, and recommendation",
  },
  "product-stewardship": {
    bestFor: "Ongoing product leadership and building",
    output: "Continuous direction and delivery",
  },
};

export default function EngagementComparison({ offerings }: { offerings: Offering[] }) {
  return (
    <div className="border-y border-line">
      <div className="hidden grid-cols-[1.05fr_1.4fr_.65fr_1.45fr] gap-6 border-b border-line py-4 text-xs font-semibold uppercase tracking-[.1em] text-muted md:grid">
        <span>Engagement</span>
        <span>Best for</span>
        <span>Duration</span>
        <span>Output</span>
      </div>
      {offerings.map((offering) => {
        const summary = summaries[offering.slug];
        return (
          <article
            key={offering.slug}
            className="grid gap-5 border-b border-line py-7 last:border-b-0 md:grid-cols-[1.05fr_1.4fr_.65fr_1.45fr] md:gap-6"
          >
            <div>
              <span className="mb-1 block text-xs font-medium text-muted md:hidden">Engagement</span>
              <h3 className="text-lg">{offering.title}</h3>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-muted md:hidden">Best for</span>
              <p className="text-sm leading-relaxed text-ink70">{summary.bestFor}</p>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-muted md:hidden">Duration</span>
              <p className="text-sm font-medium text-ink">{offering.timeline}</p>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-muted md:hidden">Output</span>
              <p className="text-sm leading-relaxed text-ink70">{summary.output}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
