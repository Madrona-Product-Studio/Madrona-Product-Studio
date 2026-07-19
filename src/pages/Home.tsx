import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";
import { useEffect, useRef, useState } from "react";

// Reveal a section once it scrolls into view. Subtle, one-time, and gated:
// the hidden start state lives under html.js-reveal (set before paint), so
// content is never hidden for no-JS, crawlers, or reduced-motion users.
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!document.documentElement.classList.contains("js-reveal")) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useWordCycler(words: string[], enabled = true) {
  const [displayed, setDisplayed] = useState(words[0]);
  const [isActive, setIsActive] = useState(false);
  const wordRef = useRef(0);

  useEffect(() => {
    // Respect reduced motion — hold the first word, skip the typing loop.
    if (!enabled) {
      setDisplayed(words[0]);
      setIsActive(false);
      return;
    }
    const typeSpeed = 80;
    const deleteSpeed = 50;
    const holdDelay = 2400;
    let cancelled = false;

    function schedule(fn: () => void, ms: number) {
      const id = setTimeout(() => { if (!cancelled) fn(); }, ms);
      return id;
    }

    function deleteWord(current: string, onDone: () => void) {
      if (cancelled) return;
      if (current.length === 0) { onDone(); return; }
      schedule(() => {
        const next = current.slice(0, -1);
        setDisplayed(next);
        deleteWord(next, onDone);
      }, deleteSpeed);
    }

    function typeWord(target: string, i: number, onDone: () => void) {
      if (cancelled) return;
      if (i > target.length) { setIsActive(false); onDone(); return; }
      schedule(() => {
        setDisplayed(target.slice(0, i));
        typeWord(target, i + 1, onDone);
      }, typeSpeed);
    }

    function cycle() {
      if (cancelled) return;
      schedule(() => {
        setIsActive(true);
        const currentWord = words[wordRef.current];
        deleteWord(currentWord, () => {
          if (cancelled) return;
          wordRef.current = (wordRef.current + 1) % words.length;
          const nextWord = words[wordRef.current];
          schedule(() => {
            typeWord(nextWord, 1, cycle);
          }, 300);
        });
      }, holdDelay);
    }

    cycle();
    return () => { cancelled = true; };
  }, [words, enabled]);

  const isTyping = displayed.length > 0 && displayed !== words[wordRef.current];

  return { displayed, isTyping, isActive };
}

function ThinkingDots({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-1.5 h-3 mb-6" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block w-[14px] h-[14px] rounded-full bg-madrona ${
            active ? "animate-dot-bounce" : ""
          }`}
          style={active ? { animationDelay: `${i * 0.15}s` } : undefined}
        />
      ))}
    </div>
  );
}

function WordCyclerText({ displayed, isTyping }: { displayed: string; isTyping: boolean }) {
  return (
    <span>
      {displayed}
      {isTyping ? (
        <span className="inline-block w-[3px] h-[0.8em] bg-madrona/60 ml-0.5 align-text-bottom animate-[cursor-blink_1s_steps(2,start)_infinite]" />
      ) : displayed.length > 0 ? (
        <span className="text-madrona">.</span>
      ) : (
        <span className="inline-block w-[3px] h-[0.8em] bg-madrona/60 ml-0.5 align-text-bottom animate-[cursor-blink_1s_steps(2,start)_infinite]" />
      )}
    </span>
  );
}

// The cycled phrases ARE the offer inventory: one per lifecycle bucket,
// in words a business owner uses. Keep each under ~28 chars so they hold
// one line on desktop; the block below reserves height for mobile wrap.
const heroBuilds = [
  "a website that earns trust",
  "ordering without middlemen",
  "an agent for the busywork",
  "a plan you can act on",
  "the thing customers ask for",
];

const bucketRows = [
  {
    question: "Selling something great behind a web presence that doesn't do it justice?",
    services: "Brand, websites, content, marketing, e-commerce.",
  },
  {
    question: "Watching the week disappear into work that software should be doing?",
    services: "Service blueprinting, efficiencies, AI agents on your real workflows.",
  },
  {
    question: "Want customers ordering and booking from you directly?",
    services: "Direct channels, online ordering, booking, fulfillment.",
  },
];

const steps = [
  {
    index: "01",
    lead: "A free 45-minute conversation.",
    body: "About your business, not about us. The agenda is published, so you know exactly what you're saying yes to.",
  },
  {
    index: "02",
    lead: "A short written assessment.",
    body: "Where we think you could grow or run smoother, in writing. Yours to keep either way.",
  },
  {
    index: "03",
    lead: "A scoped proposal, if it makes sense.",
    body: "Entry engagements are $2,500, fixed: one specific thing fixed or built, with payback you can see.",
  },
];

export default function Home() {
  const featuredWork = caseStudies.filter((s) => s.category === "recent" && !s.hidden).slice(0, 2);
  const cyclerWords = useRef(heroBuilds);
  const reducedMotion = usePrefersReducedMotion();
  const { displayed, isTyping, isActive } = useWordCycler(cyclerWords.current, !reducedMotion);

  // Staggered hero animation
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();
  const s5 = useReveal();

  return (
    <div className="space-y-24">
      <PageMeta />

      {/* Hero */}
      <section className="max-w-3xl pt-8 md:pt-16">
        <div className={`transition-opacity duration-500 ease-snap ${heroReady ? "opacity-100" : "opacity-0"}`}>
          <ThinkingDots active={isActive} />
        </div>
        <h1 className={`mb-8 leading-tight transition-[opacity,transform] duration-500 delay-75 ease-snap ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          We help businesses build<br />
          <span className="block min-h-[2.2em] md:min-h-[1.1em]">
            <WordCyclerText displayed={displayed} isTyping={isTyping} />
          </span>
        </h1>

        <div className={`max-w-2xl transition-[opacity,transform] duration-500 delay-200 ease-snap ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <Breath>
            A senior product studio in Bellingham, Washington. We figure out
            what your business actually needs, then we build it ourselves:
            strategy, design, and working software from one small team.
          </Breath>
        </div>

        <div className={`mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 transition-[opacity,transform] duration-500 delay-300 ease-snap ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <Link
            to="/how-it-works"
            className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
          >
            Book a free 45-minute chat
          </Link>
          <Link to="/services" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            What we do &rarr;
          </Link>
        </div>
      </section>

      {/* What we do — question-led lifecycle buckets */}
      <section ref={s1.ref} data-shown={s1.shown} className="reveal">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-4">What we do</Label>
        <h2 className="mb-10">Wherever the business hurts.</h2>
        <div className="max-w-3xl border-t border-line divide-y divide-line-soft">
          {bucketRows.map((row) => (
            <Link
              key={row.question}
              to="/services"
              className="group block py-6 no-underline"
            >
              <p className="text-[19px] md:text-[22px] tracking-[-0.02em] text-ink leading-[1.25] mb-2 group-hover:text-madrona-dark transition-colors">
                {row.question}
              </p>
              <p className="text-sm text-muted">{row.services}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/services/agentic-operations" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Our flagship: agentic operations &rarr;
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section ref={s2.ref} data-shown={s2.shown} className="reveal max-w-2xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">How it works</Label>
        <h2 className="mb-10">The first conversation is free.</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.index} className="flex gap-6">
              <span className="font-medium text-madrona/60 text-sm pt-1 tabular-nums">{step.index}</span>
              <div>
                <p className="font-medium text-ink mb-1">{step.lead}</p>
                <p className="text-ink70 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/how-it-works" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            See the full agenda &rarr;
          </Link>
        </div>
      </section>

      {/* Proof */}
      <section ref={s3.ref} data-shown={s3.shown} className="reveal">
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Built and running</Label>
        <h2 className="mb-6">We ship our own products too.</h2>
        <p className="text-ink70 leading-relaxed mb-12 max-w-2xl">
          When we say we build, we mean us, actually building. Our own
          products are live and in use, in the places our lives happen: the
          outdoors, adventure travel, and health and wellness.
        </p>
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

      {/* From here */}
      <section ref={s4.ref} data-shown={s4.shown} className="reveal max-w-2xl">
        <div className="mb-6"><Marker index="04" /></div>
        <Label className="block mb-4">From here</Label>
        <h2 className="mb-8">Bellingham is home, not a market.</h2>
        <div className="space-y-6 text-ink70 leading-relaxed">
          <p>
            The berries in our fridge come from farm stands out past Lynden,
            Saturday mornings happen at the farmers market, and Fridays
            include a shift at the food bank. If you run a business in
            Whatcom County, a farm, a shop, an outfitter, a nonprofit, we'd
            especially like to talk. Neighbors first.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/about" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            More about the studio &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section ref={s5.ref} data-shown={s5.shown} className="reveal max-w-2xl border-t border-line pt-16">
        <h2 className="mb-5">Tell us about your business.</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          Forty-five minutes, free, agenda published. Worst case, you leave
          with a written read on your biggest opportunities.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/how-it-works"
            className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
          >
            Book the free 45
          </Link>
          <Link to="/contact" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Or just write us &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
