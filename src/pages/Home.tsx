import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import Img from "../components/Img";
import PageMeta from "../components/PageMeta";
import { Label, Breath } from "../components/swiss";
import { useEffect, useRef, useState } from "react";

/**
 * The streamlined expression (site-expression branch): the whole story on
 * one page, told once, in order. Every "way we can help" is a worked
 * example with a real artifact — receipts, not service lists. All copy
 * draft until Charlie's pass.
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Cta({ to = "/how-it-works", children }: { to?: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline">
      {children}
    </Link>
  );
}

/* The receipts: symptom → the real thing → what it means for you. */
const receipts = [
  {
    label: "Getting found",
    symptom: "Selling something great behind a web presence that doesn't do it justice?",
    slug: "san-juan-boating-guide",
    story:
      "We built the San Juan Boating Guide from nothing: purpose-built content, search that works, a real community launch. It found its audience without an ad budget.",
    forYou: "For your business: brand, a website that earns trust, content, e-commerce. Or fixing the site you already have.",
    link: { to: "/work/san-juan-boating-guide", text: "How we built it" },
  },
  {
    label: "Coming back",
    symptom: "Customers love you, but they only hear from you when they walk in?",
    slug: null,
    story:
      "The biggest thing we ever worked on was keeping people: years running membership and loyalty at REI. The small-business version is simpler and pays faster.",
    forYou: "For your business: memberships, repeat ordering, win-back notes, reviews that keep earning.",
    link: null,
  },
  {
    label: "Running smoother",
    symptom: "Watching the week disappear into work that software should be doing?",
    slug: "helm",
    story:
      "Madrona runs on agents and one command surface called Helm. The busywork happens overnight; the whole operation sits on one screen. We build the same thing, sized to your business.",
    forYou: "For your business: your operation mapped, then small tools with one job each. A what's-fresh board. An ordering sheet. A review digest.",
    link: { to: "/work/helm", text: "See how we run on it" },
  },
  {
    label: "Knowing first",
    symptom: "Not sure people will pay for the idea before you spend real money on it?",
    slug: "plainly",
    story:
      "Some of our own ideas earned real users. Others died as cheap prototypes, on purpose. That's the discipline: concept tests, user panels, smoke pages. Real signal, kept small.",
    forYou: "For your business: proof people want it, before the big check. Sometimes the win is the idea you don't build.",
    link: { to: "/work", text: "The shelf, hits and misses" },
  },
];

function Receipt({ item, index }: { item: (typeof receipts)[number]; index: number }) {
  const reveal = useReveal();
  const study = item.slug ? caseStudies.find((s) => s.slug === item.slug) : null;
  const flipped = index % 2 === 1;

  return (
    <div ref={reveal.ref} data-shown={reveal.shown} className="reveal border-t border-line pt-12">
      <div className={`grid md:grid-cols-2 gap-10 md:gap-14 items-center ${study ? "" : "md:grid-cols-1"}`}>
        <div className={`${flipped && study ? "md:order-2" : ""} max-w-xl`}>
          <Label className="block mb-4">{item.label}</Label>
          <h3 className="text-[1.4rem] md:text-[1.65rem] leading-snug tracking-[-0.025em] mb-5">
            {item.symptom}
          </h3>
          <p className="text-ink70 leading-relaxed mb-4">{item.story}</p>
          <p className="text-ink leading-relaxed mb-5">{item.forYou}</p>
          {item.link && (
            <Link to={item.link.to} className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
              {item.link.text} &rarr;
            </Link>
          )}
        </div>
        {study?.heroImage && (
          <Link to={`/work/${study.slug}`} className={`${flipped ? "md:order-1" : ""} block`}>
            <Img
              src={study.heroImage}
              alt={study.heroImageAlt ?? study.title}
              className="w-full aspect-[4/3] object-cover object-top rounded-card border border-line-soft"
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const s1 = useReveal();
  const s2 = useReveal();
  const s3 = useReveal();
  const s4 = useReveal();

  return (
    <div className="space-y-28">
      <PageMeta />

      {/* Hero — the harbor, the claim, one door */}
      <section>
        <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24">
          <img
            src={HERO_IMAGE}
            alt="Fishing boats in the harbor at dusk in Bellingham, Washington"
            className="h-[46vh] md:h-[62vh] w-full object-cover object-[center_42%]"
          />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" aria-hidden="true" />
          <div className="hidden md:block absolute inset-x-0 bottom-0">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-14 lg:pb-16">
              <h1 className="mb-5 text-paper max-w-4xl md:text-[2.75rem] lg:text-[3.4rem] leading-[1.08]">
                Good businesses around here deserve
                <br />
                software as good as they are.
              </h1>
              <p className="text-paper/85 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Madrona is a small, senior team in Bellingham. We figure out
                what your business actually needs, then we make it real
                ourselves.
              </p>
              <Cta>See how the first conversation works</Cta>
            </div>
          </div>
        </div>
        <div className="max-w-3xl pt-10 md:hidden">
          <h1 className="mb-6 text-balance">
            Good businesses around here deserve software as good as they are.
          </h1>
          <div className="max-w-2xl">
            <Breath>
              Madrona is a small, senior team in Bellingham. We figure out
              what your business actually needs, then we make it real
              ourselves.
            </Breath>
          </div>
          <div className="mt-8">
            <Cta>See how the first conversation works</Cta>
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section ref={s1.ref} data-shown={s1.shown} className="reveal max-w-2xl">
        <blockquote className="border-l-2 border-madrona/30 pl-6 mb-9 m-0">
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug">
            "I know things should work better around here. The website's
            just ok. Ordering still means somebody texts me. I lose hours
            every week to stuff a computer should be doing. But I can't
            stop running the business to fix the business. And AI...
            everyone says it would help. I wouldn't even know where to
            start. So it stays broken."
          </p>
        </blockquote>
        <div className="space-y-5 text-ink70 text-lg leading-relaxed">
          <p>
            Almost every owner we talk to says a version of this. Excellent
            at what they do, badly served by the software around it, and
            rightly suspicious of everything being sold as AI.
          </p>
          <p>
            Madrona exists to fix that, close to home, one business at a
            time. We build with AI every day, on our own products and our
            own operation, so we can tell you plainly where it helps and
            where it's noise. Strategy through working software, from the
            person who does both.
          </p>
        </div>
      </section>

      {/* The receipts — how we help, shown not listed */}
      <section>
        <div ref={s2.ref} data-shown={s2.shown} className="reveal mb-12 max-w-2xl">
          <Label className="block mb-4">How we help</Label>
          <h2>Real problems, and the proof we can fix them.</h2>
        </div>
        <div className="space-y-16">
          {receipts.map((item, i) => (
            <Receipt key={item.label} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* How it works — the whole model in one breath */}
      <section ref={s3.ref} data-shown={s3.shown} className="reveal max-w-2xl">
        <Label className="block mb-4">How it works</Label>
        <h2 className="mb-10">Three steps. Small on purpose.</h2>
        <div className="space-y-7">
          {[
            ["01", "A 45-minute conversation about your business.", "The agenda is published, so you know exactly what you're saying yes to."],
            ["02", "A written assessment, inside a week.", "Where we think you could grow or run smoother, and where we honestly can't help. Yours to keep either way."],
            ["03", "A proposal sized to say yes to.", "First projects are $2,500, fixed: one specific thing fixed or built, with payback you can see."],
          ].map(([n, lead, body]) => (
            <div key={n} className="flex gap-6">
              <span className="font-medium text-madrona/60 text-sm pt-1 tabular-nums">{n}</span>
              <div>
                <p className="font-medium text-ink mb-1">{lead}</p>
                <p className="text-ink70 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Cta>Read the agenda and book it</Cta>
        </div>
      </section>

      {/* From here + the person — trust, briefly */}
      <section ref={s4.ref} data-shown={s4.shown} className="reveal max-w-2xl border-t border-line pt-14">
        <div className="flex gap-6 items-start">
          <div className="w-20 h-20 rounded-full bg-faint/40 border border-line-soft shrink-0 flex items-center justify-center text-[10px] text-muted text-center px-1">
            photo
          </div>
          <div className="space-y-5 text-ink70 text-lg leading-relaxed">
            <p>
              Madrona is Charlie Koch: fifteen years leading product at REI,
              Healthline, and Microsoft, now building for businesses closer
              to home. Bellingham isn't a market we researched. The berries
              in the fridge come from stands past Lynden, and Fridays
              include a shift at the food bank.
            </p>
            <p className="text-ink">Neighbors first.</p>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/about" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            More about the studio &rarr;
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl border-t border-line pt-14">
        <h2 className="mb-5">Tell us about your business.</h2>
        <p className="text-ink70 text-lg mb-8 leading-relaxed">
          Forty-five minutes. Published agenda. Worst case, you leave with
          a written read on your biggest opportunities.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Cta>Book the first conversation</Cta>
          <Link to="/contact" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Or just write us &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
