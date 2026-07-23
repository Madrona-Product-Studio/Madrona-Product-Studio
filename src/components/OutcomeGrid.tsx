import { Link } from "react-router-dom";

export interface Outcome {
  index: string;
  title: string;
  result: string;
  capabilities: string;
  question?: string;
  to: string;
}

export default function OutcomeGrid({ outcomes }: { outcomes: Outcome[] }) {
  return (
    <div className="grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
      {outcomes.map((outcome) => (
        <Link
          key={outcome.index}
          to={outcome.to}
          className="group block border-b border-line py-8 no-underline last:border-b-0 md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
        >
          <span className="mb-10 block font-serif text-3xl font-medium text-madrona/80 md:mb-12">
            {outcome.index}
          </span>
          <h3 className="mb-4 max-w-xs text-[1.75rem] text-ink transition-colors group-hover:text-madrona-dark">
            {outcome.title}
          </h3>
          <p className="mb-7 max-w-sm text-lg leading-relaxed text-ink70">
            {outcome.result}
          </p>
          <p className="text-[13px] font-medium leading-relaxed text-clay">
            {outcome.capabilities}
          </p>
          {outcome.question && (
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {outcome.question}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}
