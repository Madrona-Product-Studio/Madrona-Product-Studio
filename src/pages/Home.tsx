import { Link, useSearchParams } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import { getReferralContext } from "../data/referralContext";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";
import { useEffect, useRef, useState } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  // Scroll-reveal fade-in removed — content renders immediately so the page
  // reads as full, not hollow. Spacing alone carries the breathing room.
  return { ref, className: "opacity-100 translate-y-0" };
}

function useWordCycler(words: string[]) {
  const [displayed, setDisplayed] = useState(words[0]);
  const [isActive, setIsActive] = useState(false);
  const wordRef = useRef(0);

  useEffect(() => {
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
  }, [words]);

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

function CapabilityCard({ title, body, delay }: { title: string; body: string; delay: number }) {
  const reveal = useScrollReveal();
  return (
    <div
      ref={reveal.ref}
      className={`transition-all duration-700 ${reveal.className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4"><span className="inline-block w-[14px] h-[14px] rounded-full bg-madrona" aria-hidden="true" /></div>
      <h3 className="text-lg mb-3 text-ink">{title}</h3>
      <p className="text-ink-light text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const referral = getReferralContext(searchParams);
  const featuredWork = caseStudies.filter((s) => s.category === "recent").slice(0, 4);
  const cyclerWords = useRef(["lightning fast", "worth shipping", "with style", "no fluff", "rain or shine", "people love"]);
  const { displayed, isTyping, isActive } = useWordCycler(cyclerWords.current);

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
    <div className="space-y-24">
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
            <div className={`transition-all duration-500 ${heroReady ? "opacity-100" : "opacity-0"}`}>
              <ThinkingDots active={isActive} />
            </div>
            <h1 className={`mb-8 leading-tight transition-all duration-700 delay-100 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              We turn ideas into<br />working products,<br /><span className="whitespace-nowrap"><WordCyclerText displayed={displayed} isTyping={isTyping} /></span>
            </h1>
          </>
        )}

        <div className={`max-w-2xl transition-all duration-700 delay-300 ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Breath>
            A senior product studio that moves from strategy to design to working software in one motion, using AI to compress the distance between an idea and something real.
          </Breath>
        </div>
      </section>

      {/* What makes us different */}
      <section>
        <div ref={s1.ref} className={`mb-14 transition-all duration-700 ${s1.className}`}>
          <div className="mb-6"><Marker index="01" /></div>
          <Label className="block mb-4">What we do differently</Label>
          <h2>Thinking and building, done together.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          <CapabilityCard
            title="Strategy that ships"
            body="We don't write decks that sit in a drawer. Every engagement starts with strategy and ends with working software. The thinking and the building happen together."
            delay={0}
          />
          <CapabilityCard
            title="AI-native workflow"
            body="We use AI to do in weeks what used to take quarters. Not as a gimmick, but as a genuine force multiplier that lets a senior team move at startup speed with enterprise judgment."
            delay={150}
          />
          <CapabilityCard
            title="Full-spectrum product"
            body="Product vision. Service design. Interaction patterns. Working code. Most teams split these across departments. We hold them together, because that's where the best products come from."
            delay={300}
          />
        </div>
      </section>

      {/* How we can help */}
      <section ref={s3.ref} className={`transition-all duration-700 ${s3.className}`}>
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">How we can help</Label>
        <h2 className="mb-10">Where we come in.</h2>
        <div className="max-w-3xl border-t border-line divide-y divide-line-soft">
          {[
            "Need to pressure-test a new idea before you commit real money to it?",
            "Sitting on a roadmap question that's been stuck for months?",
            "Need a working prototype you can put in front of people, not another deck?",
            "Want to build an internal tool to streamline how your team operates?",
            "Trying to add AI to your product without the hallucinations and the hype?",
          ].map((q) => (
            <p key={q} className="py-5 text-[19px] md:text-[22px] tracking-[-0.02em] text-ink leading-[1.2]">
              {q}
            </p>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section ref={s2.ref} className={`transition-all duration-700 ${s2.className}`}>
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Recent work</Label>
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

      {/* How we work — condensed */}
      <section ref={s4.ref} className={`max-w-2xl transition-all duration-700 ${s4.className}`}>
        <div className="mb-6"><Marker index="04" /></div>
        <Label className="block mb-4">How it works</Label>
        <h2 className="mb-8">Figure it out, then build it.</h2>
        <div className="space-y-6 text-ink-light leading-relaxed">
          <p>
            Most engagements follow one arc. First we figure out what to build:
            the strategy, the framing, the hard product decisions. Then we build
            it: a working prototype you can test, demo, or ship. Same team, no
            handoff. Weeks, not quarters.
          </p>
          <p>
            For teams that want this as an ongoing relationship, we also offer
            product stewardship on retainer.
          </p>
        </div>
        <div className="mt-8">
          <Link to="/approach" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            More about how we work &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section ref={s5.ref} className={`max-w-2xl border-t border-cream-dark pt-16 transition-all duration-700 ${s5.className}`}>
        <h2 className="mb-5">Let's talk about what you're building.</h2>
        <p className="text-ink-light text-lg mb-8 leading-relaxed">
          Whether you're shaping a strategy, proving a concept, or looking for
          a senior product partner, we'd love to hear what you're working on.
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
