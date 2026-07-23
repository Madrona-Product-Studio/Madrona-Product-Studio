import { Link } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import CaseStudyCard from "../components/CaseStudyCard";
import ConnectCta from "../components/ConnectCta";
import PageMeta from "../components/PageMeta";
import { Label } from "../components/swiss";

const outcomes = [
  {
    index: "01",
    title: "Get found.",
    result: "More of the right people discover you, understand you, and buy.",
    services: "Websites · positioning · content · online stores",
  },
  {
    index: "02",
    title: "Bring people back.",
    result: "Turn a first purchase into a customer relationship that lasts.",
    services: "Loyalty · memberships · repeat ordering · win-back",
  },
  {
    index: "03",
    title: "Get hours back.",
    result: "Fix the manual work that quietly consumes the week.",
    services: "Workflow tools · automation · practical AI agents",
  },
];

const process = [
  ["01", "Talk", "A free 30-minute conversation with a public agenda."],
  ["02", "Assess", "A short written assessment. Yours to keep either way."],
  ["03", "Start", "One scoped first move with a result you can see."],
];

export default function Home() {
  const proofWork = caseStudies.filter((study) =>
    ["lila-trips", "san-juan-boating-guide"].includes(study.slug),
  );

  return (
    <div className="space-y-28 md:space-y-36">
      <PageMeta />

      <section className="relative left-1/2 -translate-x-1/2 w-screen -mt-16 md:-mt-24 overflow-hidden bg-ink">
        <img
          src="/images/hero-harbor-dusk.jpg"
          alt="Fishing boats in Bellingham harbor at dusk"
          className="absolute inset-0 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,23,20,.78)_0%,rgba(26,23,20,.48)_52%,rgba(26,23,20,.06)_100%)]" />
        <div className="relative mx-auto flex min-h-[clamp(38rem,72svh,47rem)] max-w-6xl flex-col justify-end px-6 pb-14 pt-16 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            <Label className="mb-5 block text-paper/70">
              Senior product help · Bellingham, Washington
            </Label>
            <h1 className="mb-7 max-w-3xl text-[clamp(3rem,7vw,5.9rem)] leading-[.98] tracking-[-0.035em] text-paper">
              Make the digital side of your business work better.
            </h1>
            <p className="mb-9 max-w-2xl text-lg leading-relaxed text-paper/80 md:text-xl">
              We find the places costing you customers or time, then design
              and build the fix. One senior team from first question to
              finished product.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <ConnectCta className="press inline-flex items-center gap-3 rounded bg-madrona px-7 py-3.5 text-sm font-medium text-paper no-underline hover:bg-madrona-dark">
                Let&apos;s connect <span aria-hidden="true">&rarr;</span>
              </ConnectCta>
              <Link
                to="/work"
                className="text-sm font-medium text-paper/85 hover:text-paper"
              >
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-10 grid gap-5 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <Label>Where we help</Label>
          <h2 className="max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)]">
            Start with what needs to change.
          </h2>
        </div>
        <div className="grid border-y border-line md:grid-cols-3 md:divide-x md:divide-line">
          {outcomes.map((outcome) => (
            <Link
              key={outcome.index}
              to="/services"
              className="group flex min-h-72 flex-col justify-between border-b border-line px-0 py-8 no-underline last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <span className="text-xs font-semibold tracking-[.16em] text-madrona">
                {outcome.index}
              </span>
              <div className="mt-14">
                <h3 className="mb-3 text-[1.8rem] text-ink transition-colors group-hover:text-madrona-dark">
                  {outcome.title}
                </h3>
                <p className="mb-7 max-w-xs text-ink70">{outcome.result}</p>
                <p className="text-xs leading-relaxed text-muted">
                  {outcome.services}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <div>
          <Label className="mb-5 block">How it starts</Label>
          <h2 className="mb-5">A useful first conversation, not a sales call.</h2>
          <p className="max-w-md text-lg leading-relaxed text-ink70">
            You will know what we will ask before the call, and leave with
            something useful whether or not we work together.
          </p>
          <Link
            to="/how-it-works"
            className="mt-7 inline-block text-sm font-medium"
          >
            Read the public agenda &rarr;
          </Link>
        </div>
        <ol className="m-0 list-none border-t border-line p-0">
          {process.map(([index, title, body]) => (
            <li
              key={index}
              className="grid grid-cols-[2.5rem_6rem_1fr] gap-3 border-b border-line py-6"
            >
              <span className="text-xs font-semibold text-madrona">{index}</span>
              <span className="font-semibold text-ink">{title}</span>
              <span className="text-ink70">{body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Label className="mb-4 block">Built, shipped, and run</Label>
            <h2 className="max-w-2xl">Proof should do more talking than we do.</h2>
          </div>
          <Link to="/work" className="text-sm font-medium">
            See all work &rarr;
          </Link>
        </div>
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {proofWork.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      <section className="relative left-1/2 w-screen -translate-x-1/2 bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_auto] md:items-end md:py-20 lg:px-12">
          <div>
            <Label className="mb-4 block text-paper/55">A small studio by design</Label>
            <h2 className="max-w-3xl text-paper">
              Senior attention from the first question to the finished work.
            </h2>
          </div>
          <ConnectCta className="press inline-flex w-fit items-center gap-3 rounded bg-madrona px-7 py-3.5 text-sm font-medium text-paper no-underline hover:bg-madrona-dark">
            Let&apos;s connect <span aria-hidden="true">&rarr;</span>
          </ConnectCta>
        </div>
      </section>
    </div>
  );
}

export function HomeBody() {
  return null;
}
