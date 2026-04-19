import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { offerings } from "../data/offerings";
import { articles } from "../data/writing";
import CaseStudyCard from "../components/CaseStudyCard";
import OfferingCard from "../components/OfferingCard";
import PageMeta from "../components/PageMeta";

export default function Home() {
  const featuredWork = caseStudies.filter((s) => s.category === "recent").slice(0, 4);
  const latestArticle = articles[0];

  return (
    <div className="space-y-24">
      <PageMeta />
      {/* Hero */}
      <section className="max-w-3xl pt-8 md:pt-16">
        <h1 className="mb-8 leading-tight">
          We help companies figure out what to build — and then make it real.
        </h1>
        <p className="text-lg md:text-2xl text-ink-light max-w-2xl leading-relaxed">
          Madrona Product Studio is a small, senior product studio based in the
          Pacific Northwest. We partner with teams to shape strategy, prove
          concepts, and build things that matter.
        </p>
      </section>

      {/* Manifesto */}
      <section className="max-w-2xl">
        <div className="border-l-2 border-madrona/30 pl-8 space-y-6 text-ink-light text-lg leading-relaxed">
          <p>
            Product work is changing. The companies winning right now aren't the
            ones with the biggest product teams. They're the ones that can hold
            the whole product in one head — strategy, customer, design,
            technology — and make coherent decisions fast.
          </p>
          <p>
            We're built for that. A senior product lead at the center, a trusted
            network of designers, engineers, and researchers around the edges.
            Modern tools, including AI where it actually helps, let a small team
            do in weeks what used to take quarters. No pods. No handoffs. No
            40-slide decks.
          </p>
          <p>
            We work at the front end of the product lifecycle — the part where
            you're still figuring out what to build, whether it'll work, and what
            the thing should actually feel like. Product vision. Service design.
            Rapid prototypes. Proofs of concept that make the abstract concrete.
            When it's time to scale, we hand off cleanly.
          </p>
          <p>
            Some of our work is for enterprise teams — where we come in fast,
            sharpen a direction, and ship a concept that unblocks the roadmap.
            Some is for startups and founders — where we're the senior product
            voice a small team can't yet afford full-time. Some is for local
            organizations solving real problems in their communities. And some of
            it we initiate ourselves — tools we think should exist, ideas we
            can't stop thinking about.
          </p>
          <p>
            The common thread isn't a business model. It's curious people who
            like building things that solve real problems — and who've learned
            that the best work happens when someone cares enough to get the
            details right.
          </p>
        </div>
      </section>

      {/* Offerings summary */}
      <section>
        <h2 className="mb-12">What we do</h2>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {offerings.map((o) => (
            <OfferingCard key={o.slug} offering={o} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/approach" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            More about how we work &rarr;
          </Link>
        </div>
      </section>

      {/* Featured work */}
      <section>
        <h2 className="mb-12">Selected work</h2>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {featuredWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/work" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            See all work &rarr;
          </Link>
        </div>
      </section>

      {/* Writing teaser */}
      {latestArticle && (
        <section>
          <h2 className="mb-12">Writing</h2>
          <div className="max-w-xl border-l-2 border-cream-dark pl-8 py-2">
            <h3 className="text-xl mb-3 text-ink">{latestArticle.title}</h3>
            <p className="text-ink-light mb-4 leading-relaxed">
              {latestArticle.description}
            </p>
            <a
              href={latestArticle.url}
              className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read on {latestArticle.source} &rarr;
            </a>
          </div>
          <div className="mt-6">
            <Link to="/writing" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
              All writing &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-2xl border-t border-cream-dark pt-16">
        <h2 className="mb-5">Let's talk about what you're building.</h2>
        <p className="text-ink-light text-lg mb-8 leading-relaxed">
          Whether you're shaping a strategy, launching a product, or looking for
          a senior product voice — we'd love to hear what you're working on.
        </p>
        <a
          href="mailto:hello@madronaproduct.com"
          className="inline-block bg-madrona text-cream px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark transition-colors no-underline"
        >
          Get in touch
        </a>
      </section>
    </div>
  );
}
