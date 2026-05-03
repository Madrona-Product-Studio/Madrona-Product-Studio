import { Link, useSearchParams } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { getReferralContext } from "../data/referralContext";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, className: visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6" };
}

function TypewriterLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1.1em] bg-madrona/60 ml-0.5 align-text-bottom animate-pulse" />
      )}
    </span>
  );
}

function CapabilityCard({ icon, title, body, delay }: { icon: string; title: string; body: string; delay: number }) {
  const reveal = useScrollReveal();
  return (
    <div
      ref={reveal.ref}
      className={`transition-all duration-700 ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-lg mb-3 text-ink">{title}</h3>
      <p className="text-ink-light text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const referral = getReferralContext(searchParams);
  const featuredWork = caseStudies.filter((s) => s.category === "recent").slice(0, 4);

  // Staggered hero animation
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();
  const s5 = useScrollReveal();

  return (
    <div className="space-y-32">
      <PageMeta />

      {/* Referral greeting */}
      {referral?.greeting && (
        <div className="pt-4 -mb-28">
          <span className="text-xs font-medium uppercase tracking-widest text-madrona/60">
            {referral.greeting}
          </span>
        </div>
      )}

      {/* Hero */}
      <section className="max-w-3xl pt-8 md:pt-16">
        {referral?.headline ? (
          <>
            <h1 className={`mb-6 leading-tight transition-all duration-700 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {referral.headline}
            </h1>
            <p className={`text-lg md:text-xl text-ink-light max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-200 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {referral.subhead}
            </p>
          </>
        ) : (
          <>
            <p className={`text-xs font-medium uppercase tracking-widest text-madrona/60 mb-6 transition-all duration-500 ${heroReady ? "opacity-100" : "opacity-0"}`}>
              Madrona Product Studio
            </p>
            <h1 className={`mb-8 leading-tight transition-all duration-700 delay-100 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              We turn ideas into<br />working product — fast.
            </h1>
          </>
        )}

        <div className={`max-w-2xl transition-all duration-700 delay-300 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="border-l-2 border-madrona/30 pl-6">
            <p className="font-serif text-lg md:text-xl text-ink/70 italic leading-relaxed">
              <TypewriterLine
                text="A small, senior team that holds the whole product in one head — strategy, design, and code — using AI to compress the distance between an idea and something real."
                delay={800}
              />
            </p>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section>
        <div ref={s1.ref} className={`mb-14 transition-all duration-700 ${s1.className}`}>
          <p className="text-xs font-medium uppercase tracking-widest text-ink-light/50 mb-4">What we do differently</p>
          <h2>Most studios hand off. We hold on.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          <CapabilityCard
            icon="&#9672;"
            title="Strategy that ships"
            body="We don't write decks that sit in a drawer. Every engagement starts with strategy and ends with working software. The thinking and the building happen together."
            delay={0}
          />
          <CapabilityCard
            icon="&#9674;"
            title="AI-native workflow"
            body="We use AI to do in weeks what used to take quarters. Not as a gimmick — as a genuine force multiplier that lets a senior team move at startup speed with enterprise judgment."
            delay={150}
          />
          <CapabilityCard
            icon="&#9670;"
            title="Full-spectrum product"
            body="Product vision. Service design. Interaction patterns. Working code. Most teams split these across departments. We hold them together, because that's where the best products come from."
            delay={300}
          />
        </div>
      </section>

      {/* Selected work */}
      <section ref={s2.ref} className={`transition-all duration-700 ${s2.className}`}>
        <p className="text-xs font-medium uppercase tracking-widest text-ink-light/50 mb-4">Recent work</p>
        <h2 className="mb-12">Products we've shipped.</h2>
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

      {/* The thesis */}
      <section ref={s3.ref} className={`transition-all duration-700 ${s3.className}`}>
        <div className="bg-ink rounded-sm px-10 py-12 md:px-14 md:py-16 max-w-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-madrona/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-xs font-medium uppercase tracking-widest text-madrona/60 mb-6 relative z-10">
            Why now
          </p>
          <p className="font-serif text-xl md:text-2xl text-cream/90 italic leading-relaxed mb-4 relative z-10">
            "This is the most exciting time in the history of software to build product.
            AI is compressing teams, eliminating handoffs, and making whole-product
            thinking more valuable than ever."
          </p>
          <p className="text-cream/50 leading-relaxed text-sm relative z-10">
            The companies doing the best work right now are small, senior, and fast.
            We're built for exactly that moment.
          </p>
        </div>
      </section>

      {/* How we work — condensed */}
      <section ref={s4.ref} className={`max-w-2xl transition-all duration-700 ${s4.className}`}>
        <p className="text-xs font-medium uppercase tracking-widest text-ink-light/50 mb-4">How it works</p>
        <h2 className="mb-8">From ambiguity to artifact.</h2>
        <div className="space-y-6 text-ink-light leading-relaxed">
          <p>
            We work at the front end of the product lifecycle — the part where
            you're still figuring out what to build, whether it'll work, and what
            the thing should feel like. Product vision. Service design. Rapid
            prototypes. Working software that makes the abstract concrete.
          </p>
          <p>
            Some of our work is for teams that need a senior product voice to
            sharpen a direction and unblock a roadmap. Some is for founders who
            need a working product, not another slide deck. Some is for
            organizations solving real problems in their communities.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/approach" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            More about our approach &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section ref={s5.ref} className={`max-w-2xl border-t border-cream-dark pt-16 transition-all duration-700 ${s5.className}`}>
        <h2 className="mb-5">Let's talk about what you're building.</h2>
        <p className="text-ink-light text-lg mb-8 leading-relaxed">
          Whether you're shaping a strategy, proving a concept, or looking for
          a senior product partner — we'd love to hear what you're working on.
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
