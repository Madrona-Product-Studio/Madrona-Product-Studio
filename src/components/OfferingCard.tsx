import type { Offering } from "../data/offerings";

interface Props {
  offering: Offering;
}

export default function OfferingCard({ offering }: Props) {
  return (
    <div className="border-t-2 border-madrona/25 pt-8">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-light mb-3">
        {offering.timeline}
      </p>
      <h3 className="text-xl mb-3">{offering.title}</h3>
      <div className="space-y-4 text-ink-light leading-relaxed">
        {offering.description.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {offering.goodFor && (
          <p><span className="font-medium text-ink">Good for:</span> {offering.goodFor}</p>
        )}
        <p><span className="font-medium text-ink">What you walk away with:</span> {offering.outcome}</p>
      </div>
    </div>
  );
}
