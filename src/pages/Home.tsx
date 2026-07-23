import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import ConnectCta from "../components/ConnectCta";
import FeaturedCaseStudy from "../components/FeaturedCaseStudy";
import OutcomeGrid, { type Outcome } from "../components/OutcomeGrid";
import PageMeta from "../components/PageMeta";
import ProcessSteps from "../components/ProcessSteps";
import { Label } from "../components/swiss";

const outcomes: Outcome[] = [
  {
    index: "01",
    title: "Get found",
    result: "Help the right people find you, understand you, and buy.",
    capabilities: "Websites · Positioning · Content · Online stores",
    to: "/services#service-01",
  },
  {
    index: "02",
    title: "Bring customers back",
    result: "Give people a useful reason to return after the first purchase.",
    capabilities: "Loyalty · Memberships · Repeat ordering · Follow-up · Reviews",
    to: "/services#service-02",
  },
  {
    index: "03",
    title: "Run smoother",
    result: "Hand repetitive work to systems built to handle it.",
    capabilities: "Workflow tools · Integrations · Internal software · Practical AI",
    to: "/services#service-03",
  },
];

const process = [
  {
    index: "01",
    title: "Talk for 30 minutes",
    body: "We use a published agenda, so you know exactly what we will cover.",
  },
  {
    index: "02",
    title: "Receive a written assessment",
    body: "You get our honest view of the problem, the opportunity, and how success could be measured. It is yours to keep.",
  },
  {
    index: "03",
    title: "Start with focused work",
    body: "If there is a fit, we propose the smallest useful engagement with visible payback.",
  },
];

const logos = [
  ["/images/logos/rei-logo.svg", "REI"],
  ["/images/logos/healthline-logo.svg", "Healthline"],
  ["/images/logos/microsoft-logo.svg", "Microsoft"],
];

export default function Home() {
  const lila = caseStudies.find((study) => study.slug === "lila-trips");
  const sanJuan = caseStudies.find((study) => study.slug === "san-juan-boating-guide");

  if (!lila || !sanJuan) return null;

  return (
    <div className="space-y-28 md:space-y-40">
      <PageMeta />

      <section className="relative left-1/2 -mt-16 w-screen -translate-x-1/2 overflow-hidden bg-ink md:-mt-24">
        <img
          src="/images/hero-harbor-dusk.jpg"
          alt="Fishing boats in Bellingham harbor at dusk"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[58%_center]"
        />
        <div className="absolute inset-0 bg-ink/65 md:bg-ink/55" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[clamp(41rem,76svh,50rem)] max-w-6xl flex-col justify-end px-6 pb-14 pt-20 md:pb-20 lg:px-12">
          <div className="max-w-5xl">
            <Label className="mb-5 block text-paper/75">
              Bellingham product and digital studio
            </Label>
            <h1 className="mb-7 max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-[.98] tracking-[-0.035em] text-paper">
              Good businesses deserve digital tools as good as they are.
            </h1>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-paper/90 md:text-xl">
              Madrona helps independent and growing businesses get found,
              bring customers back, and run smoother. We figure out what to
              build, then design and build it with a small senior team.
            </p>
            <ConnectCta className="press inline-flex min-h-12 items-center gap-3 rounded bg-madrona px-7 py-3.5 text-sm font-medium text-paper no-underline hover:bg-madrona-dark">
              Start with a 30-minute conversation <span aria-hidden="true">&rarr;</span>
            </ConnectCta>
            <p className="mt-7 text-sm text-paper/70">
              15 years building and leading products at REI, Healthline, and Microsoft.
            </p>
          </div>
        </div>
        <p className="absolute bottom-5 right-6 m-0 text-[11px] uppercase tracking-[.15em] text-paper/65 lg:right-12">
          Bellingham, Washington
        </p>
      </section>

      <section>
        <div className="mb-10 max-w-3xl">
          <Label className="mb-5 block">What we do</Label>
          <h2 className="text-[clamp(2.35rem,4.5vw,3.75rem)]">
            Three ways the business gets better.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink70">
            More customers. Stronger relationships. Less manual work.
          </p>
        </div>
        <OutcomeGrid outcomes={outcomes} />
      </section>

      <section>
        <Label className="mb-5 block">Featured work</Label>
        <FeaturedCaseStudy
          study={lila}
          problem="Planning a thoughtful trip meant piecing together dozens of disconnected sources, recommendations, maps, and booking sites."
          built="A destination-intelligence and itinerary platform combining trusted travel guidance with AI-assisted planning."
          proves="Product strategy, information architecture, AI interaction design, editorial content, and the discipline to operate a live product."
          secondaryImage="/case-studies/lila-trips/planner.jpg"
          secondaryImageAlt="A day-by-day itinerary in the Lila Trips planner"
        />
      </section>

      <section className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div>
          <Label className="mb-5 block">Why we exist</Label>
          <h2 className="max-w-xl">You probably already know where the friction is.</h2>
        </div>
        <div>
          <ul className="m-0 mb-8 list-none border-t border-line p-0">
            {[
              "The website undersells the business.",
              "Ordering takes too many steps.",
              "Customers disappear after the first purchase.",
              "Your team works around systems that should be helping them.",
            ].map((item) => (
              <li key={item} className="border-b border-line py-4 text-lg text-ink70">
                {item}
              </li>
            ))}
          </ul>
          <p className="border-l-2 border-madrona/45 pl-6 text-lg leading-relaxed text-ink">
            We find the highest-leverage problem, define what better looks
            like, and build the smallest useful solution. The technology
            follows the problem, not the other way around.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="mb-4 block">How it works</Label>
            <h2 className="max-w-3xl">A straightforward way to begin.</h2>
          </div>
          <Link to="/how-it-works" className="text-sm font-medium">
            See how it works &rarr;
          </Link>
        </div>
        <ProcessSteps steps={process} />
      </section>

      <section className="grid overflow-hidden bg-paper md:grid-cols-2">
        <img
          src="/images/IMG_1929.PNG"
          alt="The Bellingham waterfront at sunset"
          className="h-full min-h-80 w-full object-cover"
        />
        <div className="flex flex-col justify-center p-7 md:p-12">
          <Label className="mb-5 block">The studio</Label>
          <h2 className="mb-6">Senior people, without the agency layers.</h2>
          <div className="space-y-5 leading-relaxed text-ink70">
            <p>
              Every engagement is led personally. Designers, engineers, and
              researchers join when the work calls for them. You work directly
              with the people doing the thinking and building.
            </p>
            <p>
              Experience building and leading consumer products at REI,
              Healthline, and Microsoft, now applied where focused work can
              make an immediate difference.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-9 gap-y-5">
            {logos.map(([src, alt]) => (
              <img key={alt} src={src} alt={alt} className="h-6 w-auto opacity-55 grayscale" />
            ))}
          </div>
          <Link to="/about" className="mt-8 text-sm font-medium">
            About the studio &rarr;
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
          <Label>More work</Label>
          <Link to="/work" className="text-sm font-medium">
            See all work &rarr;
          </Link>
        </div>
        <FeaturedCaseStudy
          compact
          study={sanJuan}
          problem="Boaters needed one trustworthy place to find nearby marinas, anchorages, restaurants, and practical local guidance."
          built="A map-first regional guide designed to be useful on the water, not another generic directory."
          proves="Focused product strategy, local information design, and a useful public product taken from idea to live service."
        />
      </section>

      <section className="relative left-1/2 w-screen -translate-x-1/2 bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20 lg:px-12">
          <div>
            <Label className="mb-4 block text-paper/55">Start here</Label>
            <h2 className="mb-4 max-w-3xl text-paper">
              Tell us where the business is getting stuck.
            </h2>
            <p className="max-w-2xl text-lg text-paper/65">
              Start with a free 30-minute conversation. No pitch deck and no obligation.
            </p>
          </div>
          <ConnectCta className="press inline-flex min-h-12 w-fit items-center gap-3 rounded bg-madrona px-7 py-3.5 text-sm font-medium text-paper no-underline hover:bg-madrona-dark">
            Start the conversation <span aria-hidden="true">&rarr;</span>
          </ConnectCta>
        </div>
      </section>
    </div>
  );
}

export function HomeBody() {
  return null;
}
