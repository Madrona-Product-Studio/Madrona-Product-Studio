# Round 2 brief (2026-09-29)

Charlie liked the refactored homepage ("a much better place") and wants options to narrow in on. Everything in `refactor-brief.md` still binds (honesty rules, numbers of record, no em-dashes, curly quotes, tokens only, `minmax(0,1fr)` mobile tracks, clean at 1440 and 390, day and night, no git commits). Read it first, then this.

## Charlie's reactions (verbatim themes)

1. **Hero:** doesn't love the headline or body copy. Wants to introduce that we're **Pacific Northwest** based (say "the Pacific Northwest", not Bellingham). Feels we're "not really nailing the AI integration piece". Doesn't love the hero window (the four-area chart) or how it links down.
2. **"Four areas, and the work behind each."** Doesn't love the title.
3. **The inspection diagram:** doesn't love it (reads like a software form; too dense and literal).
4. **Source tags** ("Berry Good · demo business", "San Juan Boating Guide · live") should link to the examples where they exist.
5. **The automation diagram** could be clearer (it is a long list; it should read as a map, closer to his plumber-flowchart reference, in Madrona's style).

## Where options live

Temporary harness: `src/pages/lab/round2/Round2Preview.tsx` at `http://localhost:5191/lab/round2` (all options) and `/lab/round2?only=<id>` (one alone, e.g. `?only=h1`). Each option is its own file in `src/pages/lab/round2/`, a named export with no props, with its own CSS file (e.g. `hero-ai-thread.css`). Stubs exist. Only edit the files you own. Hero options render a full hero section (use the homepage's classes as a base: see `src/pages/v3/Hero.tsx` and `home-refactor.css`; keep the contour chart `HeroChart` if the option uses it). Showcase options render at one spread column (about 600 to 640px desktop, full width mobile).

## Hero options (four genuinely different directions)

Shared lede for all four (options may trim, not add claims): “We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.”
CTAs: **Get in touch** (/connect) and a secondary text link **See the work** (#work anchor, fine to be inert in the harness).

- **H1 · AI at work: a conversation** (`HeroAIThread`). Headline: “Websites, products, and AI that works for your business.” Flash: “Made in the Pacific Northwest.” Right side: an animated window where a customer message arrives (e.g. a request to reschedule a repair), AI drafts the reply and proposes the slot, and a person approves it with one tap; then it settles. Loops slowly or plays once and rests.
- **H2 · AI at work: the week, handled** (`HeroWeek`). Headline: “Great digital work,” flash “with AI built in.” Kicker: “A Pacific Northwest studio”. Right side: an animated “this week” panel where routine jobs tick over from pending to done (invoices sent, reviews requested, a report drafted, new inquiries answered), one item pausing on “needs you”. Distinct motion concept from H1: a list settling into done, not a conversation.
- **H3 · The work itself** (`HeroWork`). Headline: “A Pacific Northwest studio putting AI to work,” flash “for businesses that care about the details.” (you may refine the flash for rhythm; keep it plain). Right side: a static, well-composed collage of real work (Berry Good storefront or brand image, San Juan Boating Guide, Lila Trips) using existing optimized images (see how `src/pages/v3/showcase/BrandShowcase.tsx` and `ProductsShowcase.tsx` import them). No motion.
- **H4 · The place** (`HeroPlace`). Headline: “Digital work that makes the business better.” Flash: “From the Pacific Northwest.” Right side: the contour chart as the hero's image, with a quiet place marker (the existing coordinates 48.7491° N, 122.4787° W, labeled “Bellingham Bay”, or similar). Minimal, typographic. Optionally one small line of the three capabilities under the CTAs. Little or no motion.

**Motion rules (H1, H2):** follow the `madrona-motion` skill (load it). The resting state must be complete and legible (a still frame must tell the story); honor `prefers-reduced-motion` by showing the settled end state; ease-out, no bouncy springs; total sequence under ~6s, then rest at least as long before any loop; no layout shift. Only transform and opacity.

## Section title options (text only, already in the harness)

T1 “Built for ourselves first. Ready for you.” · T2 “Here’s what we build.” · T3 “What we can build for you.” · T4 “Four ways we help.”

## AI & Operations showcase options

Same story as today: a marine surveyor's field notes and photos become a draft report; anything uncertain waits for the surveyor; labeled “Illustrative, based on client work in progress”. No time-saving claims.
- **I1 · Before and after** (`InspectBeforeAfter`): two panels. Before: a page of rough field notes (typeset to feel handwritten-ish using existing fonts, e.g. italic mono; no new fonts, no real client data) with small photo thumbnails (use neutral placeholder tiles, not stock photos). After: a clean finished report page (title, a few numbered findings, photos placed). Between them, one callout: “3 lines need the surveyor”. The transformation is the story, not the UI.
- **I2 · Three steps** (`InspectSteps`): three large, simple frames in sequence: Capture (notes and photos) → Check (a short list with one item flagged for the surveyor) → Report (the finished page). Few words, big shapes.

## Growth & Retention showcase options

Same content as today's AutomationMap (a local plumbing company; one customer from booking to repeat visit; automatic vs “your call”; a good/bad review fork; later reminders; outcomes in words, no numbers). Labeled illustrative. Each option has at most about eight nodes of three to five words each.
- **F1 · Flow map** (`FlowNodes`): a true node-and-connector diagram, left to right on desktop (Book → Visit → After → Later), connectors drawn (SVG or CSS), a clear fork, automatic vs your-call shown by node style (e.g. filled vs outlined) with a two-item legend, not a label on every node. Vertical on mobile.
- **F2 · Two lanes** (`FlowLanes`): a swimlane timeline: top lane “Runs on its own”, bottom lane “You decide”; steps sit in their lane along one time axis, so the ratio of automatic to human is visible at a glance.
- **F3 · The loop** (`FlowLoop`): the customer relationship as a loop (book → visit → review → reminder → book again), with the one human touchpoint and the review fork called out; conveys repeat business visually.

## Also (applied directly to the homepage, not options)

Source tags in `src/pages/v3/AreasSection.tsx` link to the example where one exists: San Juan Boating Guide → https://www.sjiboating.com/ ; Lila Trips → https://lilatrips.com ; Berry Good → the storefront URL in `src/data/proof.ts` ; Demo items → their `/tools/<slug>` page from `src/data/agents.ts`; Helm → https://helm.day/demo (the public demo; never the real instance). Illustrative items stay unlinked. External links open in a new tab with rel="noreferrer" and an ↗ affordance; keep the tag's quiet muted style with a hover state.
