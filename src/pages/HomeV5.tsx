import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { HomeBody } from "./Home";

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

export default function HomeV5() {
  const phrase = useTypeCycler();

  return (
    <div className="space-y-24">
      <PageMeta
        title="Homepage V5"
        description="An internal animated-hero study for Madrona Product Studio."
      />

      <section className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24 border-b border-line overflow-hidden bg-ink">
        <img
          src="/images/hero-harbor-dusk.jpg"
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
              Madrona is a small, senior team in Bellingham. We find the
              digital problem holding your business back, then plan and
              build the fix ourselves.
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
