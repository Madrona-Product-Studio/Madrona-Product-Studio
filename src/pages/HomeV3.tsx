import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import PageMeta from "../components/PageMeta";
import { Label, Marker } from "../components/swiss";

const HERO_IMAGE = "/images/hero-harbor-dusk.jpg";

function Cta({ to = "/how-it-works", children }: { to?: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline"
    >
      {children}
    </Link>
  );
}

const outcomes = [
  {
    title: "Get found and chosen",
    symptom:
      "Your work is better than your website makes it look, or customers have a hard time finding and buying from you.",
    response:
      "We sharpen the story and build the brand, website, content, or online store that does the business justice.",
  },
  {
    title: "Keep customers coming back",
    symptom:
      "People buy once, then the relationship goes quiet, even when there's a good reason for them to return.",
    response:
      "We build the memberships, repeat ordering, useful follow-up, and simple customer systems that make returning easy.",
  },
  {
    title: "Run the business more smoothly",
    symptom:
      "The week disappears into copying, chasing, scheduling, and other work a computer should be helping with.",
    response:
      "We map how the work really happens, find the leverage, and build focused tools and AI agents around your operation.",
  },
];

export default function HomeV3() {
  const proofWork = caseStudies.filter((study) =>
    ["lila-trips", "san-juan-boating-guide"].includes(study.slug),
  );

  return (
    <div className="space-y-24 md:space-y-32">
      <PageMeta
        title="Homepage V3"
        description="An internal homepage direction for Madrona Product Studio."
      />

      <section>
        <div className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24">
          <img
            src={HERO_IMAGE}
            alt="Fishing boats in the harbor at dusk in Bellingham, Washington"
            className="h-[46vh] md:h-[62vh] w-full object-cover object-[center_42%]"
          />
          <div
            className="hidden md:block absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent"
            aria-hidden="true"
          />
          <div className="hidden md:block absolute inset-x-0 bottom-0">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-14 lg:pb-16">
              <h1 className="mb-5 text-paper max-w-4xl md:text-[2.75rem] lg:text-[3.4rem] leading-[1.08]">
                Good businesses around here deserve
                <br />
                software as good as they are.
              </h1>
              <p className="text-paper/85 text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
                Madrona is a small, senior team in Bellingham. We find the
                digital problem holding your business back, then plan and
                build the fix ourselves.
              </p>
              <Cta>See how the first conversation works</Cta>
            </div>
          </div>
        </div>

        <div className="max-w-3xl pt-10 md:hidden">
          <h1 className="mb-6 text-balance">
            Good businesses around here deserve software as good as they are.
          </h1>
          <p className="text-clay text-[18px] leading-[1.5] max-w-2xl">
            Madrona is a small, senior team in Bellingham. We find the
            digital problem holding your business back, then plan and build
            the fix ourselves.
          </p>
          <div className="mt-8">
            <Cta>See how the first conversation works</Cta>
          </div>
        </div>
      </section>

      <section className="max-w-3xl">
        <div className="mb-6"><Marker index="01" /></div>
        <Label className="block mb-5">The problem</Label>
        <h2 className="max-w-2xl mb-8">
          You know something should work better. Finding the right thing to
          fix is the hard part.
        </h2>
        <div className="grid md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 md:gap-14 border-t border-line pt-8">
          <p className="font-serif text-xl md:text-2xl text-ink leading-snug m-0">
            “I can’t stop running the business to fix the business. So it
            stays broken.”
          </p>
          <div className="space-y-4 text-ink70 leading-relaxed">
            <p>
              Sometimes it's obvious: a website that undersells the work,
              ordering that still happens by text, or hours lost to manual
              admin. Often the expensive part isn't the build. It's knowing
              what will actually make a difference.
            </p>
            <p>
              We start there. We separate the useful move from the noise,
              prove it as cheaply as we can, and only then build what the
              business needs. That includes AI: we build with it every day,
              so we can tell you plainly where it helps and where it&rsquo;s
              noise.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6"><Marker index="02" /></div>
        <Label className="block mb-4">What gets better</Label>
        <h2 className="max-w-2xl mb-5">Three outcomes, one accountable team.</h2>
        <p className="text-ink70 text-lg leading-relaxed max-w-2xl mb-12">
          We work across the customer experience and the operation behind it.
          The engagement starts with the constraint that matters most, not a
          predetermined package.
        </p>

        <div className="border-t border-line">
          {outcomes.map((outcome, index) => (
            <Link
              key={outcome.title}
              to="/services"
              className="group grid md:grid-cols-[3rem_minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 md:gap-8 py-8 border-b border-line-soft no-underline"
            >
              <span className="text-xs font-medium text-muted pt-1">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-xl text-ink group-hover:text-madrona-dark transition-colors mb-2">
                  {outcome.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {outcome.symptom}
                </p>
              </div>
              <p className="text-ink70 leading-relaxed md:pt-1">
                {outcome.response}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/services" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Explore what we do &rarr;
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 md:gap-20 border-y border-line py-12 md:py-16">
        <div>
          <Label className="block mb-4">A low-risk place to start</Label>
          <h2>The first conversation isn't a sales mystery.</h2>
        </div>
        <div>
          <p className="text-ink70 text-lg leading-relaxed mb-7">
            We publish the agenda before we meet. We’ll talk about where the
            business is today, what’s getting in the way, and where a small
            change could create real leverage. Afterward, you get our written
            assessment, including where we don’t think you should spend money.
          </p>
          <Link to="/how-it-works" className="text-sm font-medium text-madrona hover:text-madrona-dark transition-colors">
            Read the agenda and all three steps &rarr;
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6"><Marker index="03" /></div>
        <Label className="block mb-4">Proof in working software</Label>
        <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 md:gap-16 mb-12">
          <h2>We make the plan and the thing.</h2>
          <p className="text-ink70 text-lg leading-relaxed max-w-xl">
            These began as uncertain business questions, not feature lists.
            We found the useful shape, built the products, and learned from
            putting them into the world. We bring the same path to client work.
          </p>
        </div>
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

      <section className="max-w-2xl border-t border-line pt-14">
        <Label className="block mb-5">Start with the problem</Label>
        <h2 className="mb-5">What should work better in your business?</h2>
        <p className="text-ink70 text-lg leading-relaxed mb-8">
          You don’t need a brief, a feature list, or the right technical
          words. Bring the part that feels stuck. We’ll help make it legible.
        </p>
        <Cta>Book the first conversation</Cta>
      </section>
    </div>
  );
}
