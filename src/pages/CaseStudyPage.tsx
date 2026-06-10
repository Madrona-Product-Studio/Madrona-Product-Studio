import type { ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import type { CaseStudy, HowItWorks } from "../data/caseStudies";
import PageMeta from "../components/PageMeta";
import ArchitectureDiagram from "../components/ArchitectureDiagram";

/** Render inline markdown: links [text](url), bold **text**, italics *text*, ~~principle~~ */
let inlineKey = 0;

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Process: links first, then bold, then italics (which may contain links), then ~~
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*(.+?)\*\*|\*(.+?)\*|~~(.+?)~~/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Link
      parts.push(
        <a
          key={inlineKey++}
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
      parts.push(<strong key={inlineKey++}>{renderInline(match[3])}</strong>);
    } else if (match[4]) {
      // Italics — recurse so links inside italics still render
      parts.push(<em key={inlineKey++}>{renderInline(match[4])}</em>);
    } else if (match[5]) {
      // Closing principle (~~text~~)
      parts.push(
        <span key={inlineKey++} className="font-serif font-medium text-ink">
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
    <article>
      <PageMeta title={`${study.title} — Work`} description={study.tagline} />
      <div className="max-w-3xl">
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
          {study.highlights && study.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {study.highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs font-medium text-madrona bg-madrona/8 px-3 py-1.5 rounded"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
          {study.externalUrl && (
            <div className="mt-6">
              <a
                href={study.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-madrona text-cream px-6 py-3 rounded font-medium text-sm hover:bg-madrona-dark transition-colors no-underline"
              >
                View the project &rarr;
              </a>
            </div>
          )}
        </header>
      </div>

      {study.heroImage ? (
        <img
          src={study.heroImage}
          alt={study.heroImageAlt ?? ""}
          className={`w-full object-cover object-top rounded-lg shadow-lg mb-20${study.borderImages ? " border border-cream-dark" : ""}`}
        />
      ) : (
        <div className="aspect-[16/9] bg-cream-dark rounded-lg mb-20 flex items-center justify-center text-ink-light text-sm">
          {study.title} — hero image placeholder (16:9)
        </div>
      )}

      <div className="space-y-16">
        <TextSection title="Opportunity" content={study.opportunity} />
        <TextSection title="Thesis" content={study.thesis} />
        {study.architecture && (
          <ArchitectureDiagram architecture={study.architecture} />
        )}
        {study.howItWorks && <HowItWorksSection howItWorks={study.howItWorks} />}
        <WhatWeDidSection study={study} />
        {study.builtWith.length > 0 && <BuiltWithSection study={study} />}
        <ParagraphsSection title="What we learned" paragraphs={study.whatWeLearned} />
        <StatusSection paragraphs={study.status} />
      </div>

      <div className="flex flex-wrap gap-2 mt-16 pt-10 border-t border-cream-dark max-w-3xl">
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
  const paragraphs = content.split("\n\n");
  return (
    <section className="max-w-3xl">
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">{title}</h2>
      <div className="space-y-5 text-ink-light text-lg leading-relaxed max-w-2xl">
        {paragraphs.map((p, i) => (
          <p key={i}>{renderInline(p)}</p>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection({ howItWorks }: { howItWorks: HowItWorks }) {
  return (
    <section className="max-w-3xl">
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">
        How it works
      </h2>
      {howItWorks.intro && (
        <p className="text-ink-light text-lg leading-relaxed max-w-2xl mb-8">
          {renderInline(howItWorks.intro)}
        </p>
      )}
      <div className="border-l-2 border-madrona/30 pl-6 sm:pl-8">
        {howItWorks.layers.map((layer, i) => (
          <div
            key={layer.label}
            className={`grid grid-cols-1 gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6${
              i > 0 ? " border-t border-cream-dark" : ""
            }`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-madrona sm:pt-2">
              {layer.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className="text-sm text-ink bg-cream-dark/70 px-3 py-1.5 rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatWeDidSection({ study }: { study: CaseStudy }) {
  return (
    <section>
      <div className="max-w-3xl">
        <h2 className="text-xl font-serif font-medium mb-4 text-ink">
          What we did
        </h2>
        <p className="text-ink-light text-lg leading-relaxed max-w-2xl">
          {renderInline(study.whatWeDid.lead)}
        </p>
      </div>
      {study.whatWeDid.items.length > 0 && (
        <div className="mt-12 space-y-16">
          {study.whatWeDid.items.map((item) => (
            <div key={item.label}>
              {item.image && (
                <figure className="mb-6">
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? ""}
                    className={`w-full object-cover rounded-lg shadow-lg${study.borderImages ? " border border-cream-dark" : ""}`}
                    loading="lazy"
                  />
                  {item.caption && (
                    <figcaption className="mt-4 text-sm text-ink-light italic max-w-3xl">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              <div className="max-w-3xl">
                <p className="font-medium text-ink mb-2">{item.label}</p>
                <p className="text-ink-light leading-relaxed max-w-2xl">
                  {renderInline(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function BuiltWithSection({ study }: { study: CaseStudy }) {
  return (
    <section className="max-w-3xl">
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
    <section className="max-w-3xl">
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
    <section className="max-w-3xl">
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
