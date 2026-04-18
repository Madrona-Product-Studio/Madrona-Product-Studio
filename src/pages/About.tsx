export default function About() {
  return (
    <div className="space-y-24">
      <section className="max-w-2xl">
        <h1 className="mb-8">About</h1>
        <div className="space-y-6 text-ink-light text-lg leading-relaxed">
          <p>
            Madrona Product Studio is led by Charlie Koch, a senior product
            leader with fifteen years of experience across outdoor, wellness,
            and health. Most recently Group Product Manager at Healthline.
            Before that, nearly a decade at REI leading mobile commerce,
            membership, and the Adventures travel business.
          </p>
          <p>
            The studio works with a trusted network of collaborators —
            designers, engineers, data scientists, researchers — who come in
            when the work calls for them. Every engagement is led personally.
          </p>
          <p>
            Not everything we build is for a client. We also initiate our own
            projects — tools for communities, concepts we believe in, ideas
            that won't let go. It's part of what keeps the work honest. When
            you spend time building things just because they should exist, it
            changes how you show up for everything else.
          </p>
        </div>
      </section>

      {/* TODO: Replace with real photo */}
      <div className="max-w-sm aspect-[3/4] bg-cream-dark rounded flex items-center justify-center text-ink-light text-sm">
        Charlie Koch — photo placeholder (3:4)
      </div>

      {/* Studio projects ethos */}
      <section className="max-w-2xl">
        <h2 className="mb-5">Building in the open</h2>
        <div className="space-y-6 text-ink-light text-lg leading-relaxed">
          <p>
            Some of the most interesting work starts as someone's side project — a
            thing they've been tinkering with nights and weekends, something their
            community needs, an idea that's too good to let sit in a notes app.
            We love those projects.
          </p>
          <p>
            If you're building something you believe in and could use some
            product thinking, design help, or engineering muscle — even if
            there's no business plan yet — we'd like to hear about it. Some of
            our best work has started that way.
          </p>
        </div>
      </section>

      {/* The name */}
      <section className="max-w-2xl">
        <h2 className="mb-5">The name</h2>
        <p className="text-ink-light text-lg leading-relaxed">
          Based in the Pacific Northwest. Named for the madrona tree — the one
          that grows on the bluff, bark peeling, leaning out over the water. It
          only grows where the edge meets the sea.
        </p>
      </section>

      {/* Contact */}
      <section className="max-w-2xl border-t border-cream-dark pt-16">
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
          <p>
            {/* TODO: Replace with real LinkedIn URL */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-madrona hover:text-madrona-dark transition-colors"
            >
              LinkedIn
            </a>
          </p>
          <p className="text-ink-light">Pacific Northwest</p>
        </div>
      </section>
    </div>
  );
}
