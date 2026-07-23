import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";

export default function About() {
  return (
    <div className="space-y-24">
      <PageMeta title="About" description="Madrona Product Studio is led by Charlie Koch. Fifteen years of product leadership across outdoor, wellness, and health. Based in Bellingham, Washington." />
      <section className="max-w-2xl">
        <h1 className="mb-8">About</h1>
        <div className="space-y-6 text-ink70 text-lg leading-relaxed">
          <p className="font-medium text-ink">
            Fifteen years of product leadership at REI, Healthline, and Microsoft.
          </p>
          <p>
            Charlie Koch started Madrona Product Studio after a career at the
            junction of three threads: outdoor advocacy, adventure travel, and
            health and wellness. The through line was always the same: figure
            out what the product should be, then build it with a small team
            that holds the full picture.
          </p>
          <p>
            Plenty of product leaders have lived in one of those worlds.
            Living at the intersection of all three is what makes the work
            distinctive inside any one of them.
          </p>
          <p>
            The studio is one senior product lead at the center, with a trusted
            network of designers, engineers, and researchers who come in when
            the work calls for them. Every engagement is led personally. The
            team stays small on purpose, because the best products come from a
            few people who are deeply in it, not a large team managing around it.
          </p>
          <p>
            We also build our own things. Travel products, wellness tools, trail
            safety apps, community guides. Not everything has a business model.
            Some of it exists because it should. That's part of what keeps the
            work honest: when you spend time building things you believe in, it
            changes how you show up for everything else.
          </p>
        </div>
      </section>

      {/* TODO: Replace with real photo
      <div className="max-w-sm aspect-[3/4] bg-line rounded flex items-center justify-center text-ink70 text-sm">
        Charlie Koch — photo placeholder (3:4)
      </div>
      */}

      {/* Studio projects ethos */}
      <section className="max-w-2xl">
        <h2 className="mb-5">Building in the open</h2>
        <div className="space-y-6 text-ink70 text-lg leading-relaxed">
          <p>
            Some of the most interesting work starts as a question someone can't
            stop thinking about. A tool their community needs. A product that
            should exist but doesn't. We take those projects seriously, whether
            or not there's a business plan behind them.
          </p>
          <p>
            If you're building something you believe in and could use a senior
            product partner, we'd like to hear about it.
          </p>
        </div>
      </section>

      {/* The name */}
      <section className="max-w-2xl">
        <h2 className="mb-5">The name</h2>
        <p className="text-ink70 text-lg leading-relaxed">
          Named for the madrona tree, the one that grows on the bluff, bark
          peeling, leaning out over the water. It only grows where the edge
          meets the sea.
        </p>
      </section>

      {/* From here */}
      <section className="max-w-2xl">
        <h2 className="mb-5">From here</h2>
        <div className="space-y-6 text-ink70 text-lg leading-relaxed">
          <p>
            The studio is based in Bellingham, and Whatcom County isn't a
            market we researched. It's home. The berries in our fridge come
            from farm stands out past Lynden, Saturday mornings happen at the
            farmers market, Fridays include a shift at the food bank, and some
            weekends go to stewarding land with the Whatcom Land Trust.
          </p>
          <p>
            So if you run a business around here, a farm, a shop, an
            outfitter, a nonprofit, we'd especially like to talk.{" "}
            <Link to="/how-it-works" className="text-madrona hover:text-madrona-dark transition-colors">
              The first conversation is free and the agenda is published.
            </Link>{" "}
            Neighbors first.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-2xl border-t border-line pt-16">
        <h2 className="mb-6">Get in touch</h2>
        <div className="space-y-3 text-lg">
          <p>
            <a
              href="mailto:hello@madronaproduct.com"
              className="text-madrona hover:text-madrona-dark transition-colors"
            >
              hello@madronaproduct.com
            </a>
          </p>
          <p className="text-ink70">Bellingham, Washington</p>
        </div>
      </section>
    </div>
  );
}
