import type { ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import type { CaseStudy } from "../data/caseStudies";
import PageMeta from "../components/PageMeta";

/** Render inline markdown: links [text](url), bold **text**, and italics *text* */
function renderInline(text: string) {
  const parts: (string | ReactNode)[] = [];
  // Match links, bold, and italics
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|~~([^~]+)~~/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Link
      parts.push(
        <a
          key={key++}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-madrona hover:text-madrona-dark transition-colors"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      // Bold
      parts.push(<strong key={key++}>{match[3]}</strong>);
    } else if (match[4]) {
      // Italics
      parts.push(<em key={key++}>{match[4]}</em>);
    } else if (match[5]) {
      // Closing principle (~~text~~) — rendered as a distinct statement
      parts.push(
        <span key={key++} className="font-serif font-medium text-ink">
          {match[5]}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

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
      <PageMeta title={`${study.title} — Work`} description={study.tagline} />
      <Link
        to="/work"
        className="text-sm text-ink-light hover:text-ink transition-colors mb-12 inline-block"
      >
        &larr; Back to work
      </Link>

      <header className="mb-16">
        <p className="text-sm font-medium uppercase tracking-wider text-ink-light mb-3">
          {study.client}
        </p>
        <h1 className="mb-4">{study.title}</h1>
        <p className="text-xl text-ink-light leading-relaxed">
          {study.tagline}
        </p>
        {study.externalUrl && (
          <p className="mt-4">
            <a
              href={study.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
            >
              {study.externalLabel || study.externalUrl} &rarr;
            </a>
          </p>
        )}
      </header>

      {/* TODO: Replace with real hero image */}
      <div className="aspect-[16/9] bg-cream-dark rounded mb-16 flex items-center justify-center text-ink-light text-sm">
        {study.title} — hero image placeholder (16:9)
      </div>

      <div className="space-y-12">
        <TextSection title="Opportunity" content={study.opportunity} />
        <TextSection title="Thesis" content={study.thesis} />
        <WhatWeDidSection study={study} />
        {study.builtWith.length > 0 && <BuiltWithSection study={study} />}
        <ParagraphsSection title="What we learned" paragraphs={study.whatWeLearned} />
        <StatusSection paragraphs={study.status} />
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

function TextSection({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">{title}</h2>
      <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
        {renderInline(content)}
      </p>
    </section>
  );
}

function WhatWeDidSection({ study }: { study: CaseStudy }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">
        What we did
      </h2>
      <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
        {renderInline(study.whatWeDid.lead)}
      </p>
      {study.whatWeDid.items.length > 0 && (
        <div className="mt-8 space-y-8 max-w-2xl">
          {study.whatWeDid.items.map((item) => (
            <div key={item.label} className="border-t border-cream-dark pt-6">
              <p className="font-medium text-ink mb-2">{item.label}</p>
              <p className="text-ink-light leading-relaxed">
                {renderInline(item.description)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function BuiltWithSection({ study }: { study: CaseStudy }) {
  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">
        Built with
      </h2>
      <dl className="max-w-2xl space-y-3">
        {study.builtWith.map((item) => (
          <div key={item.label} className="flex flex-col sm:flex-row sm:gap-2">
            <dt className="font-medium text-ink sm:min-w-28 shrink-0">
              {item.label}
            </dt>
            <dd className="text-ink-light">{renderInline(item.description)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ParagraphsSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">{title}</h2>
      <div className="space-y-5 text-ink-light text-lg leading-relaxed max-w-2xl">
        {paragraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
      </div>
    </section>
  );
}

function StatusSection({ paragraphs }: { paragraphs: string[] }) {
  // Check if the last paragraph is a closing principle (wrapped in ~~)
  const lastP = paragraphs[paragraphs.length - 1];
  const isClosingPrinciple = lastP?.startsWith("~~") && lastP?.endsWith("~~");
  const bodyParagraphs = isClosingPrinciple
    ? paragraphs.slice(0, -1)
    : paragraphs;

  return (
    <section>
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">Status</h2>
      <div className="space-y-5 text-ink-light text-lg leading-relaxed max-w-2xl">
        {bodyParagraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
      </div>
      {isClosingPrinciple && (
        <p className="mt-8 font-serif text-xl text-ink font-medium max-w-2xl">
          {lastP.slice(2, -2)}
        </p>
      )}
    </section>
  );
}
