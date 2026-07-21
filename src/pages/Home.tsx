import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

/**
 * The homepage — promoted from the home-v2 draft (Charlie, 2026-07-21).
 * Full-bleed harbor hero (overlay on desktop, text-below on mobile),
 * Why we exist (settled problem voice), question-led What we do,
 * agenda strip, curated proof, CTA.
 */

// Charlie's pick (IMG_2872): the working harbor at dusk. Re-encoded to
// strip GPS EXIF and shrink for web; original stays untracked.
const HERO_IMAGE: string | null = "/images/hero-harbor-dusk.jpg";

function Cta({ to = "/how-it-works", children }: { to?: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline">
      {children}
    </Link>
  );
}

export default function Home() {
  const proofWork = caseStudies.filter((s) =>
    ["lila-trips", "san-juan-boating-guide"].includes(s.slug),
  );

  return (
    <div className="space-y-24">
      <PageMeta />

      {/* Full-bleed hero photo — flush under the nav.
          Breakout: center-anchored w-screen; -mt cancels the page's top padding. */}
      <section>
        <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24">
          {HERO_IMAGE ? (
            <img
              src={HERO_IMAGE}
              alt="Fishing boats in the harbor at dusk in Bellingham, Washington"
              className="h-[46vh] md:h-[62vh] w-full object-cover object-[center_42%]"
            />
          ) : (
            <div className="h-[46vh] md:h-[62vh] w-full bg-gradient-to-b from-faint/40 via-bg to-faint/25" />
          )}

          {/* Overlay is desktop-only: on mobile there isn't room for
              both the photo and the words, so the text drops below. */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent" aria-hidden="true" />
              <div className="hidden md:block absolute inset-x-0 bottom-0">
                <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-14 lg:pb-16">
                  <h1 className="mb-5 text-paper max-w-4xl md:text-[2.75rem] lg:text-[3.4rem] leading-[1.08]">
                    Good businesses around here deserve
                    <br />
                    software as good as they are.
                  </h1>
                  <p className="text-paper/85 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                    Madrona is a small, senior team in Bellingham. We figure
                    out what your business actually needs, then we make it
                    real ourselves.
                  </p>
                  <Cta>See how the first conversation works</Cta>
                </div>
              </div>
        </div>

        {/* Mobile hero text: the overlay needs room the phone doesn't have. */}
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

      {/* Why we exist — the owner's words, then ours */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-6">Why we exist</Label>
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
    </div>
  );
}
