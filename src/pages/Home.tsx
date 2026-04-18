import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { offerings } from "../data/offerings";
import { articles } from "../data/writing";
import CaseStudyCard from "../components/CaseStudyCard";
import OfferingCard from "../components/OfferingCard";

export default function Home() {
  // Mix client and studio work in the featured grid
  const featuredWork = [
    caseStudies.find((s) => s.slug === "rei-membership")!,
    caseStudies.find((s) => s.slug === "fed")!,
    caseStudies.find((s) => s.slug === "rei-adventures")!,
    caseStudies.find((s) => s.slug === "berry-good-berry-farm")!,
  ];
  const latestArticle = articles[0];

  return (
    <div className="space-y-32">
      {/* Hero */}
      <section className="max-w-3xl pt-8 md:pt-16">
        <h1 className="mb-8 leading-tight">
          We help companies figure out what to build — and then build it.
        </h1>
        <p className="text-lg md:text-xl text-ink-light max-w-2xl leading-relaxed">
          Madrona Product Studio is a small, senior product studio based in the
          Pacific Northwest. We partner with teams to shape strategy, ship
          product, and grow what works.
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
            network of designers, engineers, and researchers around the edges,
            modern tools including AI where it actually helps, and a studio
            structure that flexes to the shape of the problem.
          </p>
          <p>
            No pods. No handoffs. No 40-slide decks. Just people who've shipped
            real products, working on the thing that matters most.
          </p>
          <p>
            Some of our work is for clients. Some of it we initiate
            ourselves — tools for communities, products we think should exist,
            ideas we can't stop thinking about. The common thread isn't a
            business model. It's good people making things that matter.
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
