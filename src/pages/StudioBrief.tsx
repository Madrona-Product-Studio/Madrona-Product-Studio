import PageMeta from "../components/PageMeta";
import { Label } from "../components/swiss";

/**
 * Internal working page — the one-page positioning brief, rendered in the
 * site's own voice and type so it can be refined where it will live.
 * Not in the nav, not prerendered, not for production. Canon:
 * charlie-hq/madrona-positioning.md · conversation: madrona-workshop.md.
 * Blocks marked OPEN are strawmen awaiting Charlie's call.
 */

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="max-w-2xl">
      <Label className="block mb-3">{label}</Label>
      <div className="space-y-4 text-ink70 leading-relaxed">{children}</div>
    </section>
  );
}

function Open({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-madrona/40 pl-5 py-0.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-madrona/70 block mb-1.5">
        Open — needs Charlie's call
      </span>
      <div className="space-y-3 text-ink70 leading-relaxed">{children}</div>
    </div>
  );
}

export default function StudioBrief() {
  return (
    <div className="space-y-16">
      <PageMeta title="Studio brief (internal)" description="Internal working brief." />

      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-6">
          Internal · the one-page brief · refined here, canonized in charlie-hq
        </p>
        <h1 className="mb-6">What Madrona is</h1>
        <p className="font-serif text-2xl md:text-[1.7rem] text-ink leading-snug">
          A senior product studio in Bellingham, Washington. We figure out
          what a business actually needs, then we build it ourselves:
          strategy, design, and working software from one small team.
        </p>
      </section>

      <Block label="The problem we solve">
        <p className="text-ink text-lg">
          "I know parts of my business should work better: the website, the
          ordering, the hours I lose every week. But I can't stop running
          the business to fix the business. Agencies are expensive and speak
          marketing. Freelancers are a gamble I have to manage. So it stays
          broken."
        </p>
        <p>
          The competitor is inertia, not other studios. The whole sales
          motion is three progressively small ways to beat it: a free 45
          with a published agenda, a written assessment, a $2,500 entry
          engagement.
        </p>
      </Block>

      <Block label="Who it's for">
        <p>
          <span className="font-medium text-ink">First:</span> owner-run
          businesses in Bellingham and Whatcom County — farms, shops,
          outfitters, orgs — great at what they do, underserved by software.
        </p>
        <p>
          <span className="font-medium text-ink">Also:</span> founders and
          product teams in our home territory (outdoor advocacy, adventure
          travel, health and wellness) who need senior judgment plus hands
          that build. Served when they arrive, not chased.
        </p>
        <Open>
          <p>
            <span className="font-medium text-ink">Who it's NOT for</span> —
            do we say this publicly? Draft: not a dev shop by the hour, not
            an RFP vendor, not decks-instead-of-change. Refusal is
            positioning; naming it costs some breadth.
          </p>
        </Open>
      </Block>

      <Block label="What we do">
        <p>
          The whole arc of a business: <span className="text-ink">demand</span>{" "}
          (brand, web, content, marketing, e-comm, optimizing what exists) ·{" "}
          <span className="text-ink">operations</span> (blueprinting,
          efficiencies, agents and small tools with one job — the flagship) ·{" "}
          <span className="text-ink">channel</span> (ordering, booking,
          fulfillment). Cut across by{" "}
          <span className="text-ink">signal</span>: real customers before
          real money — panels, smoke tests, instrumented betas.
        </p>
        <Open>
          <p>
            <span className="font-medium text-ink">Proposed fourth bucket:
            "How customers come back."</span> Retention, loyalty, repeat
            orders, memberships, CSA renewals, the email list nobody sends
            to. Completes the arc (find you → run → deliver → come back)
            and it's where the career proof runs deepest. Confirm the
            4-bucket shape and it propagates to Services, Home, and the
            canon.
          </p>
        </Open>
      </Block>

      <Block label="Why us">
        <p>
          The person who makes the strategy makes the thing. We run our own
          operation on what we sell, and our own products are live. We're
          from here, and it shows. AI is our leverage, not our identity:
          senior work at small-business prices because the tooling collapsed
          the cost, not the standard. Small on purpose.
        </p>
        <Open>
          <p>
            <span className="font-medium text-ink">Career proof, mapped to
            the buckets</span> (one quiet provenance line each, not a logo
            wall — verify numbers before anything ships):
          </p>
          <ul className="list-none m-0 p-0 space-y-2">
            <li>Growth &amp; brand → REI: membership growth, brand work, getting people outside.</li>
            <li>Coming back → REI's 22M-member program, Healthline loyalty. The deepest muscle.</li>
            <li>Operations → Microsoft: operations at a scale where nothing about your week will scare us.</li>
            <li>Content &amp; audience → Healthline: content that earned an audience of millions honestly.</li>
          </ul>
        </Open>
      </Block>

      <Block label="The positioning statement">
        <Open>
          <p>
            V1: For owner-run businesses that are great at what they do and
            underserved by software, Madrona is a senior product studio in
            Bellingham that figures out what your business needs and builds
            it, starting small enough to say yes to. Unlike agencies, you
            talk to the person doing the work, and the first conversation is
            free with the agenda published.
          </p>
          <p className="text-sm text-muted">
            (V2 capability-led and V3 short versions in madrona-workshop.md
            Q6 — pick, blend, or rewrite.)
          </p>
        </Open>
      </Block>

      <Block label="Open strategic questions">
        <ul className="list-none m-0 p-0 space-y-3">
          {[
            "Voice tension: the site says \"we,\" but the differentiator is one accountable person. Does About (or the whole site) get more honest first-person?",
            "Pricing transparency: $2,500 entry is drafted public. Do sprint ranges get published too? (Research says almost nobody does — that's the opening.)",
            "Two lanes, one site: do product-org visitors get their own path, or does plain language serve both? (Current bet: one site, plain language.)",
            "Category word: keep \"product studio\" and repositon around it, or rename the category?",
            "Outcomes language: no client outcomes exist yet. Do we mine Lila/San Juan for real numbers, or hold outcome claims until first engagements?",
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
            "No face. Trust for a local buyer is a name and a photo; About still has the placeholder.",
            "Booking is not two clicks: no Cal.com; contact form blocked on the Resend key in Vercel.",
            "Case-study pages still tell the product story, not the demand/ops story the Work index now promises (needs Charlie's raw material).",
            "No proof yet in the two thinnest sections: Berry Good (demand) and the ops case study (operations) are queued but unbuilt.",
            "Off-site presence unmanaged: Google Business Profile, LinkedIn copy, og-image all predate this positioning.",
            "The outreach letter and the site must sound like one voice — outreach-voice.md isn't settled yet.",
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
