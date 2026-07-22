import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker } from "../components/swiss";

/**
 * The homepage — typed hero promoted from the home-v5 study (Charlie,
 * 2026-07-22). Full-bleed harbor photo with the settled headline and
 * descriptor, a cycling "never been a better time to…" line, then the
 * settled body: Why we exist, question-led What we do, agenda strip,
 * curated proof, CTA.
 */

// Charlie's pick (IMG_2872): the working harbor at dusk. Re-encoded to
// strip GPS EXIF and shrink for web; original stays untracked.
const HERO_IMAGE = "/images/hero-harbor-dusk.jpg";

const PHRASES = [
  "make it happen.",
  "fix that website.",
  "reach new customers.",
  "implement agentic AI.",
  "go direct to customers.",
  "test some new ideas.",
];

function useTypeCycler() {
  const [displayed, setDisplayed] = useState(PHRASES[0]);
  const phraseIndex = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = (callback: () => void, delay: number) => {
      timeout = setTimeout(() => {
        if (!cancelled) callback();
      }, delay);
    };

    const remove = (value: string, done: () => void) => {
      if (cancelled) return;
      if (value.length === 0) {
        done();
        return;
      }
      schedule(() => {
        const next = value.slice(0, -1);
        setDisplayed(next);
        remove(next, done);
      }, 34);
    };

    const type = (value: string, character: number, done: () => void) => {
      if (cancelled) return;
      if (character > value.length) {
        done();
        return;
      }
      schedule(() => {
        setDisplayed(value.slice(0, character));
        type(value, character + 1, done);
      }, 52);
    };

    const cycle = () => {
      schedule(() => {
        remove(PHRASES[phraseIndex.current], () => {
          phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
          schedule(() => type(PHRASES[phraseIndex.current], 1, cycle), 180);
        });
      }, 2200);
    };

    cycle();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return displayed;
}

function Cta({ to = "/how-it-works", children }: { to?: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline">
      {children}
    </Link>
  );
}

export default function Home() {
  const phrase = useTypeCycler();

  return (
    <div className="space-y-24">
      <PageMeta />

      {/* Full-bleed hero photo — flush under the nav.
          Breakout: center-anchored w-screen; -mt cancels the page's top padding. */}
      <section className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24 border-b border-line overflow-hidden bg-ink">
        <img
          src={HERO_IMAGE}
          alt="Fishing boats in Bellingham harbor at dusk"
          className="absolute inset-0 w-full h-full object-cover object-[58%_center]"
        />
        {/* Text sits on the left; the sunset stays bright on the right. */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/50 via-ink/20 to-transparent"
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-12 min-h-[clamp(36rem,68svh,42rem)] pt-12 pb-12 md:pb-14 lg:pb-16 flex flex-col justify-end">
          <div className="max-w-4xl">
            <h1
              className="text-paper max-w-4xl md:text-[2.75rem] lg:text-[3.4rem] leading-[1.08] mb-5"
              style={{ textShadow: "0 1px 4px rgb(from var(--color-ink) r g b / 0.72)" }}
            >
              Good businesses around here deserve{" "}
              <br className="hidden md:block" />
              software as good as they are.
            </h1>

            <p
              className="text-paper/85 text-lg md:text-xl leading-relaxed max-w-3xl mb-8 md:mb-9"
              style={{ textShadow: "0 1px 4px rgb(from var(--color-ink) r g b / 0.72)" }}
            >
              Madrona is a small, senior digital team in the PNW. We focus
              on the problems holding your business back, then build the
              solutions ourselves.
            </p>

            <div className="border-t border-paper/30 pt-6 max-w-3xl">
              <p
                className="font-sans text-base md:text-lg font-medium text-paper/90 mb-2"
                style={{ textShadow: "0 1px 4px rgb(from var(--color-ink) r g b / 0.72)" }}
              >
                There’s never been a better time to
              </p>
              <div
                className="font-serif font-medium text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.08] tracking-[-0.035em] text-madrona-light min-h-[2.2em] md:min-h-[1.1em]"
                style={{ textShadow: "0 1px 4px rgb(from var(--color-ink) r g b / 0.72)" }}
                aria-hidden="true"
              >
                <span>…{phrase}</span>
                <span className="inline-block w-[0.06em] h-[0.85em] bg-madrona-light ml-[0.08em] align-[-0.04em] animate-[cursor-blink_1s_steps(2,start)_infinite]" />
              </div>
              <span className="sr-only">
                Make it happen, fix that website, reach new customers,
                implement agentic AI, go direct to customers, or test new ideas.
              </span>
            </div>

            <div className="mt-9">
              <Link
                to="/how-it-works"
                className="press inline-flex items-center gap-3 bg-madrona text-paper px-7 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
              >
                See how the first conversation works
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-5 right-6 lg:right-12 text-[10px] uppercase tracking-[0.16em] text-paper/70 m-0">
          Bellingham, Washington
        </p>
      </section>

      <HomeBody />
    </div>
  );
}

export function HomeBody() {
  const proofWork = caseStudies.filter((s) =>
    ["lila-trips", "san-juan-boating-guide"].includes(s.slug),
  );

  return (
    <>
      {/* Why we exist — the owner's words on the left, ours on the right */}
      <section>
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-8">Why we exist</Label>
        <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 md:gap-16">
          <blockquote className="m-0 border-l-2 border-madrona/30 pl-6 md:pl-8">
            <p className="font-serif text-[1.35rem] md:text-[1.65rem] text-ink leading-[1.4] m-0">
              &ldquo;I know things should work better around here. The
              website&rsquo;s just ok. Ordering from us is way harder than
              it should be. I lose hours every week to stuff it seems like
              a computer could be doing. But I can&rsquo;t stop running the
              business to fix the business. And AI... everyone says it
              should help, but I wouldn&rsquo;t even know where to start.
              So it stays broken.&rdquo;
            </p>
          </blockquote>
          <div className="space-y-5 text-ink70 text-lg leading-relaxed md:pt-1">
            <p>
              Almost every owner we talk to says a version of this.
              Excellent at what they do, badly served by the software
              around it, and rightly suspicious of everything AI.
            </p>
            <p>
              Madrona exists to fix that, close to home, one business at a
              time. Our small, senior team of builders and marketers helps
              businesses like yours break through the noise and tells you
              plainly how to help your business grow and run better.
            </p>
          </div>
        </div>
      </section>

      {/* What we do — question-led, symptom language */}
      <section>
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">What we do</Label>
        <h2 className="mb-10">Wherever the business hurts.</h2>
        <div className="max-w-3xl border-t border-line divide-y divide-line-soft">
          {[
            {
              question: "Selling something great behind a web presence that doesn't do it justice?",
              services: "Brand, websites, content, marketing, e-commerce.",
            },
            {
              question: "Watching the week disappear into work that software should be doing?",
              services: "Service blueprinting, efficiencies, AI agents on your real workflows.",
            },
            {
              question: "Pretty sure AI could help your business, but nobody's shown you how?",
              services: "We build with it daily. Honest answers on where it helps, and where it doesn't.",
            },
            {
              question: "Want customers ordering and booking from you directly?",
              services: "Direct channels, online ordering, booking, fulfillment.",
            },
            {
              question: "Not sure people will pay for the idea before you spend real money on it?",
              services: "Concept tests, user panels, smoke tests. Real signal, kept small.",
            },
          ].map((row) => (
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
          <Link to="/services" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Everything we do &rarr;
          </Link>
        </div>
      </section>

      {/* Agenda strip — the trust move */}
      <section className="max-w-2xl border-l-2 border-madrona/30 pl-6">
        <p className="text-ink text-lg leading-relaxed mb-3">
          The first conversation has a published agenda. You'll know exactly
          what we'll ask before you say yes, and you keep the written
          assessment either way.
        </p>
        <Link to="/how-it-works" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
          Read the agenda &rarr;
        </Link>
      </section>

      {/* Proof */}
      <section>
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Things we've built and run</Label>
        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
          {proofWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <div className="mt-10">
          <Link to="/work" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            See all work &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-14">
        <h2 className="mb-6">Tell us about your business.</h2>
        <Cta>Book the first conversation</Cta>
      </section>
    </>
  );
}
