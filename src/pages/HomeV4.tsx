import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import Img from "../components/Img";
import { caseStudies } from "../data/caseStudies";

const featuredSlugs = ["lila-trips", "san-juan-boating-guide", "helm"];

function ArrowLink({ to, children, light = false }: { to: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-3 text-sm font-medium no-underline ${
        light ? "text-paper" : "text-ink"
      }`}
    >
      <span className="border-b border-current pb-1">{children}</span>
      <span className="transition-transform duration-200 ease-snap group-hover:translate-x-1" aria-hidden="true">
        &rarr;
      </span>
    </Link>
  );
}

export default function HomeV4() {
  return (
    <div className="space-y-28 md:space-y-40">
      <PageMeta
        title="Homepage V4"
        description="An internal art-direction study for Madrona Product Studio."
      />

      <section className="pt-5 md:pt-12">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem] gap-10 lg:gap-20 items-end">
          <h1 className="text-[clamp(3.2rem,7.5vw,6.9rem)] leading-[0.94] tracking-[-0.055em] max-w-5xl text-balance">
            Software as good as the business behind it.
          </h1>
          <div className="lg:pb-2">
            <p className="text-ink70 text-lg leading-relaxed mb-7">
              Madrona is a senior product studio in Bellingham. We find the
              right digital move, then make it real.
            </p>
            <ArrowLink to="/how-it-works">Start with a conversation</ArrowLink>
          </div>
        </div>

        <div className="relative left-1/2 -translate-x-1/2 w-screen mt-14 md:mt-20">
          <img
            src="/images/hero-harbor-dusk.jpg"
            alt="Fishing boats in Bellingham harbor at dusk"
            className="w-full h-[42vh] md:h-[58vh] object-cover object-[center_42%]"
          />
          <p className="absolute bottom-4 left-6 lg:left-12 text-[10px] uppercase tracking-[0.16em] text-paper/75 m-0">
            Bellingham, Washington
          </p>
        </div>
      </section>

      <HomeV4Body />
    </div>
  );
}

export function HomeV4Body() {
  const featured = featuredSlugs
    .map((slug) => caseStudies.find((study) => study.slug === slug))
    .filter((study) => study !== undefined);

  return (
    <>

      <section>
        <div className="flex items-end justify-between gap-8 border-b border-line pb-5 mb-10 md:mb-14">
          <h2 className="text-base font-sans font-semibold tracking-[-0.02em] m-0">Selected work</h2>
          <Link to="/work" className="text-sm text-muted hover:text-ink transition-colors">All work</Link>
        </div>

        <div className="space-y-20 md:space-y-28">
          {featured.map((study, index) => (
            <Link
              key={study.slug}
              to={`/work/${study.slug}`}
              className={`group grid items-start gap-7 md:gap-12 no-underline ${
                index === 0
                  ? "md:grid-cols-[minmax(0,1.55fr)_minmax(17rem,0.45fr)]"
                  : "md:grid-cols-[minmax(17rem,0.45fr)_minmax(0,1.55fr)]"
              }`}
            >
              <div className={index === 0 ? "" : "md:order-2"}>
                {study.heroImage && (
                  <Img
                    src={study.heroImage}
                    alt={study.heroImageAlt ?? ""}
                    className={`w-full object-cover rounded-card border border-line-soft transition-[filter] duration-200 ${
                      index === 0 ? "aspect-[16/10]" : "aspect-[16/9]"
                    } group-hover:brightness-[0.97]`}
                  />
                )}
              </div>
              <div className={`md:pt-2 ${index === 0 ? "" : "md:order-1 md:self-end md:pb-2"}`}>
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted mb-4">
                  0{index + 1} / {study.stage ?? "Studio project"}
                </p>
                <h3 className="font-serif font-medium text-[clamp(2rem,4vw,3.4rem)] leading-[1] tracking-[-0.04em] text-ink group-hover:text-madrona-dark transition-colors mb-5">
                  {study.title}
                </h3>
                <p className="text-ink70 leading-relaxed max-w-sm mb-7">{study.tagline}</p>
                <span className="inline-flex items-center gap-3 text-sm font-medium text-ink">
                  View project
                  <span className="transition-transform duration-200 ease-snap group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative left-1/2 -translate-x-1/2 w-screen bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 md:gap-24">
            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-paper/55 mb-6">What we do</p>
              <h2 className="text-paper text-[clamp(2.5rem,5vw,4.7rem)] leading-[0.98] tracking-[-0.045em] max-w-lg">
                Find the leverage. Build the fix.
              </h2>
            </div>
            <div className="md:pt-9">
              <p className="text-paper/75 text-lg md:text-xl leading-relaxed max-w-xl mb-12">
                Better ways to get found, keep customers, and run the
                business. Strategy, design, and working software from the
                same senior team.
              </p>
              <div className="border-t border-paper/20">
                {[
                  ["Get found and chosen", "Brand · web · commerce"],
                  ["Keep customers coming back", "Retention · ordering · loyalty"],
                  ["Run smoother", "Workflows · tools · AI agents"],
                ].map(([title, detail]) => (
                  <Link
                    key={title}
                    to="/services"
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-5 border-b border-paper/15 no-underline"
                  >
                    <span className="text-paper text-lg group-hover:text-madrona-light transition-colors">{title}</span>
                    <span className="text-paper/45 text-sm">{detail}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-10">
                <ArrowLink to="/services" light>See what we do</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-10 md:gap-24">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted mb-5">How it starts</p>
          <p className="font-serif text-2xl md:text-3xl leading-snug text-ink max-w-sm">
            A clear conversation before a costly commitment.
          </p>
        </div>
        <div>
          <h2 className="text-[clamp(2.3rem,4.8vw,4.4rem)] leading-[1] tracking-[-0.045em] mb-8">
            You bring the part that feels stuck.
          </h2>
          <p className="text-ink70 text-lg leading-relaxed max-w-2xl mb-9">
            We publish the agenda before we meet. After the conversation,
            you get a written assessment of what matters, what does not, and
            where we can help. You keep it either way.
          </p>
          <ArrowLink to="/how-it-works">Read the agenda</ArrowLink>
        </div>
      </section>

      <section className="border-t border-line pt-12 md:pt-16 pb-6">
        <div className="grid md:grid-cols-[minmax(0,1fr)_auto] gap-10 items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted mb-5">Have something in mind?</p>
            <h2 className="text-[clamp(2.7rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.05em] max-w-4xl m-0">
              Let’s make the business work better.
            </h2>
          </div>
          <div className="md:pb-2">
            <Link
              to="/how-it-works"
              className="press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline whitespace-nowrap"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
