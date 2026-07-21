import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker, Breath } from "../components/swiss";

/**
 * Homepage v2 — the working draft, seeded from home-lab Option D
 * (full-bleed hero, The Letter body). Lives at /home-v2 while it's
 * refined; replaces Home.tsx when Charlie says ready. The current
 * homepage at / is untouched. All copy is draft until approved.
 *
 * HERO IMAGE: set HERO_IMAGE to the real path when Charlie's PNW photo
 * lands (drop the file in public/images/). Until then the placeholder
 * gradient renders.
 */

// Charlie's pick (IMG_2872): the working harbor at dusk. Re-encoded to
// strip GPS EXIF and shrink for web; original stays untracked.
const HERO_IMAGE: string | null = "/images/hero-harbor-dusk.jpg";
const HERO_CAPTION = "The harbor at dusk, Bellingham"; // draft — Charlie confirms wording

function Cta({ to = "/how-it-works", children }: { to?: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline">
      {children}
    </Link>
  );
}

export default function HomeV2() {
  const proofWork = caseStudies.filter((s) =>
    ["lila-trips", "san-juan-boating-guide"].includes(s.slug),
  );

  return (
    <div className="space-y-24">
      <PageMeta title="Homepage v2 (internal draft)" description="Internal working draft." />

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
          <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full -mt-10 pb-4 relative flex items-baseline justify-between gap-4">
            <span className={`text-xs font-medium uppercase tracking-wider ${HERO_IMAGE ? "text-paper/70" : "text-muted"}`}>
              {HERO_IMAGE ? HERO_CAPTION : "PNW hero photo — drop the file in public/images/ and set HERO_IMAGE"}
            </span>
          </div>
        </div>

        <div className="max-w-3xl pt-10">
          <h1 className="mb-6">
            Good businesses around here deserve
            <br />
            software this good.
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

      {/* The letter — founder authority, neighbor register */}
      <section className="max-w-2xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-6">From Charlie</Label>
        <div className="flex gap-6 items-start">
          <div className="w-20 h-20 rounded-full bg-faint/40 border border-line-soft shrink-0 flex items-center justify-center text-[10px] text-muted text-center px-1">
            photo
          </div>
          <div className="space-y-5 text-ink70 text-lg leading-relaxed">
            <p>
              I spent fifteen years leading product at places like REI and
              Healthline. These days I build for businesses closer to home:
              the farm stand, the shop, the outfitter, the nonprofit. The
              ones that are great at what they do and get the least help
              from software.
            </p>
            <p>
              You talk to me, I do the work, and it actually gets finished.
              That's the whole model.
            </p>
          </div>
        </div>
      </section>

      {/* Services: three verbs, plain rows */}
      <section className="max-w-3xl">
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">What we do</Label>
        <div className="border-t border-line divide-y divide-line-soft">
          {[
            ["Get found and chosen", "Brand, a site that does your work justice, fixing the one you have, content, e-commerce."],
            ["Keep them coming back", "Memberships, repeat ordering, win-back, reviews."],
            ["Run smoother", "Your operation mapped, the busywork handed to small tools and agents."],
          ].map(([title, desc]) => (
            <div key={title} className="py-6">
              <h3 className="mb-1.5">{title}.</h3>
              <p className="text-ink70">{desc}</p>
            </div>
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
