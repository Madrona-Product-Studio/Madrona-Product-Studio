export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export default function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="m-0 grid list-none border-y border-line p-0 md:grid-cols-3 md:divide-x md:divide-line">
      {steps.map((step) => (
        <li
          key={step.index}
          className="border-b border-line py-8 last:border-b-0 md:min-h-72 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
        >
          <span className="mb-14 block font-serif text-4xl font-medium text-madrona/80">
            {step.index}
          </span>
          <h3 className="mb-4 text-2xl text-ink">{step.title}</h3>
          <p className="max-w-sm leading-relaxed text-ink70">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
