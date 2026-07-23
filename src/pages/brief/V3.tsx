import { Block, Open } from "./shared";

/** Brief v3, 2026-07-20 night. The homepage session settles two things:
 * the problem voice (spoken-register quote, Charlie-approved) and the
 * hero headline. Current until V4 exists — then freeze. */
export default function V3() {
  return (
    <div className="space-y-16">
      <section className="max-w-2xl">
        <h1 className="mb-6">What Madrona is</h1>
        <p className="font-serif text-2xl md:text-[1.7rem] text-ink leading-snug">
          Madrona is a small, senior team in Bellingham, Washington. We
          figure out what your business actually needs, then we make it
          real ourselves.
        </p>
        <p className="text-sm text-muted mt-4">
          Settled hero headline (Charlie's copy): "Good businesses around
          here deserve software as good as they are."
        </p>
        <div className="mt-6">
          <Open>
            <p>
              <span className="font-medium text-ink">The descriptor is
              open.</span> "Product studio" reads software-company to those
              who know the term and nothing to a farm or a guide service.
              Candidates: Madrona Studio · Madrona Digital · plain Madrona
              with a plain-English tagline. Don't decide in copy; decide
              once, here.
            </p>
          </Open>
        </div>
      </section>

      <Block label="Scope — decided">
        <p>
          <span className="font-medium text-ink">Horizontal.</span>{" "}
          Owner-run businesses of any category, Bellingham and Whatcom
          County first. The internal frame is Grow / Retain / Operate;
          that vocabulary stays internal. Everything customer-facing
          speaks symptoms: nobody new is finding us, people come once and
          don't come back, I lose eleven hours a week to this.
        </p>
        <p>
          The outdoor/wellness pillar identity isn't abandoned; it's a
          career asset and a reassurance credential. It is not the studio's
          market filter.
        </p>
      </Block>

      <Block label="The problem we solve">
        <p>
          The spine, kept:{" "}
          <span className="text-ink">
            "I can't stop running the business to fix the business. So it
            stays broken."
          </span>{" "}
          The competitor is inertia, plus its harder cousin: the owner who
          already paid someone once and got something half-finished they
          can't edit. And quieter than both: embarrassment — being great at
          the work and knowing the website undersells it.
        </p>
        <div className="border-l-2 border-madrona/30 pl-5 py-0.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted block mb-1.5">
            Settled 7/20 — the problem voice (homepage session)
          </span>
          <p className="text-ink leading-relaxed">
            "I know things should work better around here. The website's
            just ok. Ordering still means somebody texts me. I lose hours
            every week to stuff a computer should be doing. But I can't
            stop running the business to fix the business. And AI...
            everyone says it would help. I wouldn't even know where to
            start. So it stays broken."
          </p>
          <p className="text-sm text-muted mt-2">
            The burned-before variant (C) remains the outreach-letter voice.
          </p>
        </div>
      </Block>

      <Block label="Who it's for">
        <p>
          <span className="font-medium text-ink">
            Businesses great at what they do and underserved by software.
          </span>{" "}
          That's the segment: a condition, not an industry. Whatcom first,
          any category — farm, shop, outfitter, clinic, nonprofit. Product
          organizations are the second audience, served when they arrive.
        </p>
        <p>
          And the enemy, named: no junior teams, no black-box process, no
          half-finished handoffs you can't edit.
        </p>
      </Block>

      <Block label="What we do (symptom language, three verbs)">
        <p>
          <span className="text-ink font-medium">Get found and chosen</span>{" "}
          — brand, a site that does the work justice, fixing the one you
          have, content, marketing, e-commerce.
        </p>
        <p>
          <span className="text-ink font-medium">Keep them coming back</span>{" "}
          — memberships and loyalty, repeat ordering, win-back, reviews.
          First-class now, not a footnote. It's also the deepest career
          muscle.
        </p>
        <p>
          <span className="text-ink font-medium">Run smoother</span> —
          the operation mapped honestly, efficiencies found, agents and
          small tools with one job doing the busywork.
        </p>
        <p>
          Cut across everything by <span className="text-ink">signal</span>:
          real customers before real money. Sometimes the win is killing
          the idea for $2,500 instead of building it for $50,000.
        </p>
        <Open>
          <p>
            <span className="font-medium text-ink">Build, or build and
            run?</span> "Builds it" is a project business. "Gets it working
            and keeps it working" is a relationship business — and
            marketing, content, and retention aren't built once. This is
            the highest-value open call: it sets the revenue model and the
            one-liner's verb.
          </p>
          <p className="text-sm text-muted">
            Smaller seam, same block: where does ordering/booking/fulfillment
            work live — under growing or under running smoother?
          </p>
        </Open>
      </Block>

      <Block label="Why us">
        <p>
          Seniority, proximity, and actually finishing. The person who
          makes the plan makes the thing, he's from here, and it ships. We
          run our own operation on what we sell, and our own products are
          live. AI is leverage, not identity.
        </p>
        <p className="text-sm text-muted">
          Guards: never sound like an AI automation agency (that segment's
          "we keep up with the changes for you" pitch is cut — true but
          unownable). Career logos (REI, Healthline, Microsoft) are
          reassurance, placed quietly — the real proof is a working thing
          built for a business like yours, which is why the Berry Good
          prototype is the core sales mechanism, not a side project.
        </p>
        <Open>
          <p>
            Verify the reassurance numbers before anything ships: 22M-member
            program, 300K+ communities.
          </p>
        </Open>
      </Block>

      <Block label="How it travels">
        <p>
          The real test isn't the elegant statement; it's whether someone
          at a barbecue can finish the sentence:{" "}
          <span className="text-ink">
            "You should talk to Charlie — he fixes the tech side of small
            businesses, and he's actually good."
          </span>{" "}
          That's the current best referral sentence. Charlie's words final.
        </p>
        <p>
          The first-conversation lead is{" "}
          <span className="text-ink">the published agenda</span>, not
          "free." Every agency has a free intro call; nobody publishes
          what happens in the meeting. The agenda is the trust move and
          the answer to "I'm not doing that again." Free still exists — on
          the offer page, as a fact, not a headline.
        </p>
        <p className="text-sm text-muted">
          The "For X who Y…" statement stays an internal alignment tool
          and never appears on the homepage. Its two load-bearing phrases:
          "great at what they do and underserved by software" · "small
          enough to say yes to."
        </p>
      </Block>

      <Block label="Open questions (in order of what they unblock)">
        <ul className="list-none m-0 p-0 space-y-3">
          {[
            "Build, or build-and-run? Project vs. relationship business; sets the verb, the pricing model, and capacity.",
            "How does the first conversation get created? The ladder closes but doesn't generate. Referral, reputation, prototype-as-gift — this becomes the outreach program.",
            "Naming/descriptor: Madrona Studio · Madrona Digital · plain Madrona + tagline.",
            "Pricing bands: entry $2,500 is set; working assumption $2–6K/mo retainers, $5–15K projects — confirm before publishing beyond the entry.",
            "Voice: the site says \"we\"; the differentiator is one accountable person. Where does \"I\" belong?",
            "Lila validation raw material — makes the signal claim a story.",
          ].map((q) => (
            <li key={q} className="pl-5 border-l-2 border-line leading-relaxed">
              {q}
            </li>
          ))}
        </ul>
      </Block>

      <Block label="Gaps: this brief vs. the site today">
        <ul className="list-none m-0 p-0 space-y-3">
          {[
            "Demand generation: nothing on or off the site creates first conversations yet — the funnel is immaculate and empty.",
            "No face. Trust for a local buyer is a name and a photo; About still has the placeholder.",
            "Booking is not two clicks: no Cal.com; contact form blocked on the Resend key in Vercel.",
            "Site copy still leads with \"free\" and the old three-bucket frame — updates once this brief settles.",
            "Proof queue: Berry Good (the core sales mechanism) and the ops case study are unbuilt.",
            "Off-site: no Google Business Profile; LinkedIn and og-image predate this positioning.",
          ].map((g) => (
            <li key={g} className="pl-5 border-l-2 border-madrona/25 leading-relaxed">
              {g}
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}
