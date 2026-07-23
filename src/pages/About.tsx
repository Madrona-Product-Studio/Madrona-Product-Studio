import { Link } from "react-router-dom";
import ConnectCta from "../components/ConnectCta";
import PageMeta from "../components/PageMeta";
import { Label } from "../components/swiss";

const career = [
  ["/images/logos/rei-logo.svg", "REI"],
  ["/images/logos/healthline-logo.svg", "Healthline"],
  ["/images/logos/microsoft-logo.svg", "Microsoft"],
];

export default function About() {
  return (
    <div className="space-y-28 md:space-y-36">
      <PageMeta
        title="About"
        description="Madrona Product Studio is led by Charlie Koch. Fifteen years of product leadership across outdoor, wellness, and health. Based in Bellingham, Washington."
      />

      <section className="grid gap-10 md:grid-cols-[1.05fr_.95fr] md:items-end md:gap-20">
        <div>
          <Label className="mb-5 block">About Madrona</Label>
          <h1 className="mb-8">Senior attention, all the way through.</h1>
          <p className="max-w-xl text-xl leading-relaxed text-ink70">
            Madrona is led by Charlie Koch, a product leader who has spent
            fifteen years figuring out what to build, leading products at
            meaningful consumer scale, and helping small teams bring the work
            to life.
          </p>
        </div>
        <figure>
          <img
            src="/images/IMG_1988.jpeg"
            alt="The water and islands off Bellingham at sunset"
            className="aspect-[4/3] w-full rounded-card object-cover"
          />
          <figcaption className="mt-3 text-xs text-muted">
            Bellingham Bay, close to home.
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-line py-8">
        <Label className="mb-7 block">Product leadership across</Label>
        <div className="grid grid-cols-3 items-center gap-8 md:max-w-3xl">
          {career.map(([src, name]) => (
            <div key={name} className="flex h-10 items-center">
              <img
                src={src}
                alt={name}
                className="max-h-7 max-w-[7rem] object-contain object-left opacity-60 grayscale"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
        <div>
          <Label className="mb-4 block">The studio model</Label>
          <h2>Small on purpose.</h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-ink70">
          <p>
            Charlie works at the junction of outdoor advocacy, adventure
            travel, and health and wellness. Across those worlds, the through
            line has stayed the same: understand the real problem, decide what
            should exist, then build it with a small team that holds the whole
            picture.
          </p>
          <p>
            Madrona keeps one senior product lead at the center and brings in
            a trusted network of designers, engineers, and researchers when
            the work calls for them. Every engagement is led personally, with
            product design and development staying close to the decisions
            instead of passing through layers.
          </p>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2 md:gap-10">
        <article className="bg-paper p-7 md:p-9">
          <Label className="mb-5 block">Building in the open</Label>
          <h2 className="mb-5 text-[1.8rem]">We build our own things, too.</h2>
          <p className="leading-relaxed text-ink70">
            Travel products, wellness tools, trail-safety apps, and community
            guides. Some are businesses and some simply deserve to exist.
            Doing the work ourselves keeps our advice honest.
          </p>
          <Link to="/work" className="mt-7 inline-block text-sm font-medium">
            See what we build &rarr;
          </Link>
        </article>
        <article className="bg-ink p-7 text-paper md:p-9">
          <Label className="mb-5 block text-paper/55">From here</Label>
          <h2 className="mb-5 text-[1.8rem] text-paper">Neighbors first.</h2>
          <p className="leading-relaxed text-paper/65">
            Whatcom County is not a market we researched. It is home: farm
            stands out past Lynden, Saturdays at the market, Fridays at the
            food bank, and weekends stewarding local land.
          </p>
          <Link
            to="/how-it-works"
            className="mt-7 inline-block text-sm font-medium text-madrona-light hover:text-paper"
          >
            See how a first conversation works &rarr;
          </Link>
        </article>
      </section>

      <section className="grid gap-10 border-t border-line pt-12 md:grid-cols-[1fr_.72fr] md:items-end">
        <div className="md:pb-4">
          <Label className="mb-4 block">The name</Label>
          <h2 className="mb-4">Named for the tree at the water&apos;s edge.</h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink70">
            The madrona grows on the bluff, bark peeling, leaning out over
            the sea. Resilient, unmistakably local, and comfortable at the
            edge of two worlds.
          </p>
          <ConnectCta className="mt-8">Start the conversation</ConnectCta>
        </div>
        <figure>
          <img
            src="/images/IMG_2301.jpeg"
            alt="A rocky shoreline on the Salish Sea at sunset"
            className="aspect-[4/3] w-full rounded-card object-cover"
          />
          <figcaption className="mt-3 text-xs text-muted">
            The water&apos;s edge, close to home.
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
