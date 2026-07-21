import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import Img from "../components/Img";
import PageMeta from "../components/PageMeta";
import { useEffect, useRef, useState } from "react";

/**
 * THE BROADSHEET — the editorial expression (site-expression branch).
 * Madrona told as a magazine feature: full-bleed plates, Fraunces at
 * display scale with italic turns, chaptered structure, one inverted
 * ink plate. Same tokens, new composition. All copy draft until
 * Charlie's pass.
 */

const HERO_IMAGE = "/images/hero-harbor-dusk.jpg";

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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

/** Full-viewport breakout inside the centered page container. */
function Bleed({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`relative left-1/2 -translate-x-1/2 w-screen ${className}`}>
      {children}
    </div>
  );
}

/** Chapter divider: a full rule carrying the numeral and the running head. */
function Chapter({ n, title }: { n: string; title: string }) {
  return (
    <Bleed>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="border-t-2 border-ink pt-4 flex items-baseline justify-between gap-6">
          <span className="font-serif italic text-2xl md:text-3xl text-madrona leading-none">
            {n}
          </span>
          <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-ink70">
            {title}
          </span>
        </div>
      </div>
    </Bleed>
  );
}

function Cta({ to = "/how-it-works", dark = false, children }: { to?: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={`press inline-block px-8 py-3.5 rounded font-medium text-sm no-underline ${
        dark
          ? "bg-paper text-ink hover:bg-card"
          : "bg-madrona text-paper hover:bg-madrona-dark"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);
  const stagger = (i: number) => ({
    className: `transition-[opacity,transform] duration-700 ease-snap ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`,
    style: { transitionDelay: `${i * 120}ms` },
  });

  const sanJuan = caseStudies.find((s) => s.slug === "san-juan-boating-guide");
  const helm = caseStudies.find((s) => s.slug === "helm");
  const plainly = caseStudies.find((s) => s.slug === "plainly");

  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();

  return (
    <div className="space-y-0">
      <PageMeta />

      {/* ============ THE COVER ============ */}
      <Bleed className="-mt-16 md:-mt-24">
        <div className="relative">
          <img
            src={HERO_IMAGE}
            alt="Fishing boats in the harbor at dusk in Bellingham, Washington"
            className="h-[72vh] md:h-[82vh] w-full object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/25" aria-hidden="true" />

          {/* Dateline, set like a masthead plate */}
          <div className={`absolute top-0 inset-x-0 ${stagger(0).className}`} style={stagger(0).style}>
            <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-5">
              <div className="flex items-center justify-between border-b border-paper/20 pb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-paper/80">
                Bellingham, Washington
              </span>
              <span className="hidden sm:block text-[11px] font-medium uppercase tracking-[0.25em] text-paper/60">
                The working waterfront
              </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-12 md:pb-16">
              <h1 className={`text-paper max-w-5xl text-[2.4rem] leading-[1.06] md:text-[2.8rem] lg:text-[4rem] lg:leading-[1.04] tracking-[-0.02em] mb-7 ${stagger(1).className}`} style={stagger(1).style}>
                Good businesses around here deserve
                <br className="hidden md:block" />{" "}
                software <em className="text-paper">as good as they are.</em>
              </h1>
              <p className={`text-paper/85 text-lg md:text-xl leading-relaxed max-w-2xl mb-9 ${stagger(2).className}`} style={stagger(2).style}>
                Madrona is a small, senior team in Bellingham. We figure out
                what your business actually needs, then we make it real
                ourselves.
              </p>
              <div className={`flex flex-wrap items-center gap-x-8 gap-y-4 ${stagger(3).className}`} style={stagger(3).style}>
                <Cta>See how the first conversation works</Cta>
                <Link to="/work" className="text-sm font-medium text-paper/90 hover:text-paper transition-colors">
                  The work &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Bleed>

      {/* The index — where does it hurt? (self-identification, editorial contents) */}
      <section className="py-14 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6">
          {[
            ["Nobody new is finding us", "#found"],
            ["They come once, not twice", "#back"],
            ["The week disappears", "#smoother"],
            ["Is the idea even good?", "#signal"],
          ].map(([label, href], i) => (
            <a
              key={href}
              href={href}
              className="group border-t-2 border-ink pt-3 no-underline"
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-muted mb-1.5">
                0{i + 1}
              </span>
              <span className="block font-serif text-xl text-ink group-hover:text-madrona transition-colors leading-snug">
                {label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ============ CH 01 · WHY WE EXIST ============ */}
      <div className="pt-20 md:pt-28">
        <Chapter n="01" title="Why we exist" />
      </div>

      <section ref={r1.ref} data-shown={r1.shown} className="reveal relative py-20 md:py-28">
        <span
          aria-hidden="true"
          className="hidden lg:block absolute -left-6 top-10 font-serif italic text-[11rem] leading-none text-ink/[0.05] select-none"
        >
          "
        </span>
        <blockquote className="m-0 lg:ml-40 max-w-3xl">
          <p className="font-serif text-[1.55rem] md:text-[2.1rem] leading-[1.25] text-ink">
            "I know things should work better around here. The website's
            just ok. Ordering still means somebody texts me. I lose hours
            every week to stuff a computer should be doing. But I can't
            stop running the business to fix the business. And AI...
            everyone says it would help. I wouldn't even know where to
            start. <span className="italic text-madrona">So it stays broken."</span>
          </p>
          <footer className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            Almost every owner we talk to
          </footer>
        </blockquote>
        <div className="lg:ml-40 max-w-2xl mt-12 space-y-5 text-ink70 text-lg leading-relaxed">
          <p>
            Madrona exists to fix exactly that, close to home, one business
            at a time. Strategy through working software, from the person
            who does both.
          </p>
        </div>
      </section>

      {/* ============ CH 02 · HOW WE HELP ============ */}
      <Chapter n="02" title="How we help — with receipts" />

      {/* Plate: getting found — image bleeds to the right edge */}
      <section id="found" ref={r2.ref} data-shown={r2.shown} className="reveal py-20 md:py-28 scroll-mt-20">
        <Bleed>
          <div className="grid md:grid-cols-2 items-center gap-10 md:gap-0">
            <div className="px-6 lg:pl-[max(3rem,calc((100vw-72rem)/2+3rem))] lg:pr-16 order-2 md:order-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-madrona mb-5">
                Getting found
              </p>
              <h2 className="font-serif font-medium text-[2rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.02em] mb-6">
                Selling something great behind a website that doesn't do it
                justice?
              </h2>
              <p className="text-ink70 leading-relaxed mb-4 max-w-lg">
                We built the San Juan Boating Guide from nothing: purpose-built
                content, search that works, a real community launch. It found
                its audience without an ad budget.
              </p>
              <p className="text-ink leading-relaxed mb-6 max-w-lg">
                For your business: brand, a website that earns trust, content,
                e-commerce. Or fixing the site you already have.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <Link to="/work/san-juan-boating-guide" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
                  How we built it &rarr;
                </Link>
                <Link to="/how-it-works" className="text-sm font-medium text-muted hover:text-madrona transition-colors">
                  Sound like you? Start with the 45 &rarr;
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              {sanJuan?.heroImage && (
                <Img
                  src={sanJuan.heroImage}
                  alt={sanJuan.heroImageAlt ?? sanJuan.title}
                  className="w-full h-[44vh] md:h-[58vh] object-cover object-top"
                />
              )}
            </div>
          </div>
        </Bleed>
      </section>

      {/* Plate: coming back — pure typography on a shifted ground */}
      <Bleed className="bg-paper border-y border-line-soft">
        <section id="back" ref={r3.ref} data-shown={r3.shown} className="reveal max-w-6xl mx-auto px-6 lg:px-12 py-20 md:py-28 scroll-mt-20">
          <div className="md:flex items-end justify-between gap-16">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-madrona mb-5">
                Coming back
              </p>
              <h2 className="font-serif font-medium text-[2rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.02em] mb-6">
                Customers love you, but only hear from you when they
                walk&nbsp;in?
              </h2>
              <p className="text-ink70 leading-relaxed mb-4">
                The biggest thing we ever worked on was keeping people:
                years running membership and loyalty at REI. The
                small-business version is simpler and pays faster.
              </p>
              <p className="text-ink leading-relaxed mb-6">
                For your business: memberships, repeat ordering, win-back
                notes, reviews that keep earning.
              </p>
              <Link to="/how-it-works" className="text-sm font-medium text-muted hover:text-madrona transition-colors">
                Sound like you? Start with the 45 &rarr;
              </Link>
            </div>
            <p className="hidden lg:block font-serif italic text-[5.5rem] leading-none text-ink/[0.07] select-none shrink-0" aria-hidden="true">
              again &amp;<br />again
            </p>
          </div>
        </section>
      </Bleed>

      {/* Plate: knowing first — image bleeds to the left edge */}
      <section id="signal" ref={r4.ref} data-shown={r4.shown} className="reveal py-20 md:py-28 scroll-mt-20">
        <Bleed>
          <div className="grid md:grid-cols-2 items-center gap-10 md:gap-0">
            <div>
              {plainly?.heroImage && (
                <Img
                  src={plainly.heroImage}
                  alt={plainly.heroImageAlt ?? plainly.title}
                  className="w-full h-[44vh] md:h-[58vh] object-cover object-top"
                />
              )}
            </div>
            <div className="px-6 lg:pr-[max(3rem,calc((100vw-72rem)/2+3rem))] lg:pl-16">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-madrona mb-5">
                Knowing first
              </p>
              <h2 className="font-serif font-medium text-[2rem] md:text-[2.6rem] leading-[1.1] tracking-[-0.02em] mb-6">
                Not sure people will pay before you spend real money?
              </h2>
              <p className="text-ink70 leading-relaxed mb-4 max-w-lg">
                Some of our own ideas earned real users. Others died as
                cheap prototypes, on purpose. Concept tests, user panels,
                smoke pages: real signal, kept small.
              </p>
              <p className="text-ink leading-relaxed mb-6 max-w-lg">
                Sometimes the win is the idea you don't build.
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <Link to="/work" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
                  The shelf, hits and misses &rarr;
                </Link>
                <Link to="/how-it-works" className="text-sm font-medium text-muted hover:text-madrona transition-colors">
                  Sound like you? Start with the 45 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </Bleed>
      </section>

      {/* ============ CH 03 · THE INK PLATE — we run on it ============ */}
      <Bleed className="bg-ink"><span id="smoother" className="block scroll-mt-16" />
        <section ref={r5.ref} data-shown={r5.shown} className="reveal max-w-6xl mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="flex items-baseline justify-between gap-6 border-t-2 border-paper/25 pt-4 mb-14 md:mb-20">
            <span className="font-serif italic text-2xl md:text-3xl text-madrona-light leading-none">03</span>
            <span className="text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] text-paper/60">
              Running smoother — we run on it
            </span>
          </div>
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-serif font-medium text-paper text-[2.2rem] md:text-[3rem] leading-[1.08] tracking-[-0.02em] mb-8">
                Watching the week disappear into work that software should
                be doing?
              </h2>
              <div className="space-y-5 text-paper/75 text-lg leading-relaxed max-w-xl">
                <p>
                  Madrona runs on agents and one command surface called
                  Helm. The busywork happens overnight; the whole operation
                  sits on one screen.
                </p>
                <p>
                  We build with AI every day, on our own products and our
                  own operation, so we can tell you plainly where it helps
                  your business and where it's noise. Then we build the
                  same thing, sized to you: small tools with one job. A
                  what's-fresh board. An ordering sheet. A review digest.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Cta to="/work/helm" dark>See how we run on it</Cta>
              </div>
            </div>
            <div className="hidden lg:block">
              {helm?.heroImage && (
                <Img
                  src={helm.heroImage}
                  alt={helm.heroImageAlt ?? helm.title}
                  className="w-full rounded-card border border-paper/15"
                />
              )}
            </div>
          </div>
        </section>
      </Bleed>

      {/* ============ CH 04 · THREE STEPS ============ */}
      <div className="pt-20 md:pt-28">
        <Chapter n="04" title="How it works" />
      </div>

      <section ref={r6.ref} data-shown={r6.shown} className="reveal py-16 md:py-24">
        <h2 className="font-serif font-medium text-[2.2rem] md:text-[3rem] leading-[1.08] tracking-[-0.02em] mb-14 max-w-3xl">
          Three steps.{" "}
          <em className="text-madrona">Small on purpose.</em>
        </h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-10">
          {[
            ["1", "A 45-minute conversation.", "About your business, not about us. The agenda is published, so you know exactly what you're saying yes to."],
            ["2", "An assessment, in writing.", "Inside a week: where you could grow or run smoother, and where we honestly can't help. Yours to keep either way."],
            ["3", "A proposal sized to say yes to.", "First projects are $2,500, fixed. One specific thing fixed or built, with payback you can see."],
          ].map(([n, lead, body]) => (
            <div key={n} className="relative pt-2">
              <span aria-hidden="true" className="block font-serif italic text-[4.5rem] leading-none text-ink/[0.08] select-none mb-4">
                {n}
              </span>
              <p className="font-medium text-ink text-lg mb-2">{lead}</p>
              <p className="text-ink70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <Cta>Read the agenda and book it</Cta>
        </div>
      </section>

      {/* ============ COLOPHON · from here ============ */}
      <Bleed className="bg-paper border-t border-line-soft">
        <section ref={r7.ref} data-shown={r7.shown} className="reveal max-w-6xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="md:grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <p className="font-serif italic text-[2rem] md:text-[2.6rem] leading-[1.15] text-ink mb-10 md:mb-0">
              Neighbors first.
            </p>
            <div className="max-w-xl space-y-5 text-ink70 text-lg leading-relaxed">
              <p>
                Madrona is Charlie Koch: fifteen years leading product at
                REI, Healthline, and Microsoft, now building for businesses
                closer to home. Bellingham isn't a market we researched.
                The berries in the fridge come from stands past Lynden, and
                Fridays include a shift at the food bank.
              </p>
              <p>
                <Link to="/about" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors no-underline">
                  More about the studio &rarr;
                </Link>
              </p>
            </div>
          </div>
          <div className="border-t border-line mt-16 md:mt-20 pt-10 md:flex items-center justify-between gap-10">
            <h2 className="font-serif font-medium text-[1.8rem] md:text-[2.2rem] tracking-[-0.02em] mb-6 md:mb-0">
              Tell us about your business.
            </h2>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 shrink-0">
              <Cta>Book the first conversation</Cta>
              <Link to="/contact" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
                Or just write us &rarr;
              </Link>
            </div>
          </div>
        </section>
      </Bleed>
    </div>
  );
}
