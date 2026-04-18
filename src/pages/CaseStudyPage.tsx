// TODO: Replace all placeholder copy in case study data files with real content

import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);

  if (!study) {
    return (
      <div className="max-w-2xl py-24">
        <h1 className="mb-4">Not found</h1>
        <p className="text-ink-light mb-6">
          We couldn't find that case study.
        </p>
        <Link to="/work" className="text-sm font-medium">
          &larr; Back to work
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl">
      <Link
        to="/work"
        className="text-sm text-ink-light hover:text-ink transition-colors mb-12 inline-block"
      >
        &larr; Back to work
      </Link>

      <header className="mb-16">
        <p className="text-sm font-medium uppercase tracking-wider text-ink-light mb-3">
          {study.client}
          {study.isStudioProject && (
            <span className="ml-3 text-xs bg-madrona/10 text-madrona-dark px-2.5 py-1 rounded">
              Studio project
            </span>
          )}
        </p>
        <h1 className="mb-4">{study.title}</h1>
        <p className="text-xl text-ink-light leading-relaxed">
          {study.tagline}
        </p>
      </header>

      {/* TODO: Replace with real hero image */}
      <div className="aspect-[16/9] bg-cream-dark rounded mb-16 flex items-center justify-center text-ink-light text-sm">
        {study.title} — hero image placeholder (16:9)
      </div>

      <div className="space-y-12">
        <Section title="Opportunity" content={study.opportunity} />
        <Section title="Thesis" content={study.thesis} />
        <Section title="What we did" content={study.whatWeDid} />
        <Section title="What we learned" content={study.whatWeLearned} />
        <Section title="Status" content={study.status} />
      </div>

      <div className="flex flex-wrap gap-2 mt-16 pt-10 border-t border-cream-dark">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-cream-dark text-ink-light px-3 py-1.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">{title}</h2>
      <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
        {content}
      </p>
    </section>
  );
}
