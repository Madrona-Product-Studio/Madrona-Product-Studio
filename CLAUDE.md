# Madrona Product Studio — Design System & Brand Reference

This file is the source of truth for brand and design decisions on this site.
Read it before making styling changes, generating mockups, or producing
anything visual.

**Positioning canon lives elsewhere:** `charlie-hq/madrona-positioning.md`
is the single source of truth for what Madrona is, who it serves, and how
it's positioned. This file executes that positioning visually; when the two
disagree, the canon wins and this file gets updated.

## Brand positioning

Madrona Product Studio is a small, senior product studio in Bellingham,
Washington. Founded by Charlie Koch. The positioning is a senior product lead
at the center, with a trusted network of designers, engineers, and researchers
who come in as engagements require. Local identity is real, not decorative:
Bellingham/Whatcom is home ("from here"), and the studio serves the Pacific
Northwest and beyond.

**One-liner:** We help companies figure out what to build, then build it.

**Three pillars (domain identity, intersection as narrative):** outdoor
advocacy · adventure travel · health & wellness. A client or project fits
by sitting in one pillar; the story is that the studio has lived at the
junction of all three. The local Bellingham/Whatcom identity is separate:
geography-first, capability-led, and does not need to map to the pillars.

**Voice:** "We" throughout, direct, confident, personal, not corporate.
Editorial, not promotional. Restraint is the point.

## Name

**Madrona** (with the trailing -a) is the Washington/Salish Sea spelling of
the Pacific madrone tree (Arbutus menziesii). The -a is not a typo. The same
tree is called "madrone" in Oregon and California and "arbutus" in BC. We use
Madrona — it matches our domains (madronaproduct.com, madronaproductstudio.com)
and the Puget Sound / Salish Sea positioning of the studio.

## The madrona reference

Madronas are coastal PNW trees with peeling red-orange bark that grows on
bluffs above the water. The tree is a sensibility that runs through the
brand — color, texture, gesture — not a depicted object. We avoid literal
tree illustrations in favor of the bark's signature orange-red as the brand's
one accent color.

## Design tokens (authoritative)

All colors and type are defined as CSS custom properties in `src/index.css`
under the `@theme` block. Tailwind picks them up automatically as utilities
(`bg-madrona`, `text-ink70`, `border-line`, etc.). Do not introduce hardcoded hex values
in components — if a color isn't in the system, either it's not needed or
the system needs to change.

### Color palette

The palette is the "swiss/zen" system: layered warm-paper grounds, a five-step
ink ramp, hairlines, and one bark accent. Deliberately lean, each token has a
role. These are the ONLY tokens — there are no legacy `cream`/`ink-light`
aliases (they were removed; use the tokens below).

**Grounds (background and surfaces, lightest → page)**
- `card` `#ffffff` — raised surfaces, the lightest ground
- `paper` `#fdfcfa` — quiet surfaces, light button text on the bark
- `bg` `#f5f1ea` — primary page background

**Ink (text and structure, darkest → faintest)**
- `ink` `#1a1714` — primary text, structural elements, logo wordmark
- `ink70` `#403a33` — secondary text, captions, meta labels
- `clay` `#6f6657` — tertiary body text, the calmer "Breath" line
- `muted` `#8c8378` — micro-labels, quiet eyebrow captions
- `faint` `#b8b0a2` — faintest text, inactive marks

**Hairlines (dividers and quiet borders)**
- `line` `rgba(26,23,20,0.14)` — standard hairline rules and borders
- `line-soft` `rgba(26,23,20,0.08)` — the quietest dividers

**Madrona / the orange (the signature — used sparingly)**
- `madrona` `#E55728` — links, active nav, kickers, the `.m2-pop` flash,
  the frond (day companion `madrona-dark` `#BC431D`; dark-sky companion
  `#F0703F` — value shifts, never hue)
- `madrona-light` `#e8a999` — selection highlights, subtle tinted washes

**Action grounds (the green is retired — see Discipline below)**
- charcoal `#2F3135` — primary CTAs on light grounds; `--cta-band` deep band
- cream `#F7EDE4` — primary CTAs on dark grounds; light-island frames
- (legacy `forest`/`forest-soft` tokens still exist in code but are no
  longer the CTA system; sweep remaining `--forest-soft` uses over time)

**Discipline (one orange + opposite ground · canonized 2026-08-30, wrapped
into canon with Charlie's launch-day decisions):** The color logic is one
sentence: **one orange for identity, the opposite ground for action, and
the sky picks the ground.**

- **The orange** — madrona red-orange `#E55728` is THE accent in every sky
  state: links, kickers, the headline flash, active states, the frond.
  Its companion shade shifts *value only, never hue*: `#BC431D` on light
  grounds, `#F0703F` on dark. The old bark (`#c4553a`/`#c86a3d`) and the
  forest-green CTA system are retired.
- **Action = the opposite ground** — primary CTAs are charcoal `#2F3135`
  on light grounds and cream `#F7EDE4` on dark ones; the deep CTA band
  rides `--cta-band`. Orange is never a button.
- **The sky picks the ground (day / dusk / night)** — the site follows
  the real Bellingham sun (engine `src/lib/theme.ts`; header switcher; no
  "Auto" option in the UI — following the sun is just what it does).
  A switcher pin holds only until the sky next changes; on a later visit
  under a different sky the sun takes back over, decided pre-paint in
  `index.html`'s mirror so there is no flash (Charlie, 2026-09-01).
  Day = the warm-paper ramp below · night = Evergreen Charcoal `#2F3135`
  · dusk = Smoky Plum `#4C3843` for ~40min around sunrise and sunset.
  In dark skies, **frames are light islands**: browser-window artifacts,
  panels, and cards go cream with the day ramp re-pinned inside.
- **Sub-item hues come from the frond board** — fir `#394933` · moss
  `#666642` · plum `#513B46` · copper `#A0603A` · sage · stone, worn in
  two registers (pastel wash in day, deep ground in dark skies; see the
  `--hue-*` tokens in v3.css). Mint `#39846d` is the progress/positive
  status color. These are data-viz and category colors, never competing
  accents.

### Typography

- **Display:** Hanken Grotesk — used for the `h1` / page-title moment,
  section statements, and occasional editorial emphasis. Weight 500.
  (Replaced Bricolage Grotesque 2026-08-20; Charlie's pick. Bricolage had
  replaced Fraunces 2026-08-16. The CSS token is still *named* `--font-serif`
  to avoid churn, but it points at the display grotesque — the name is a
  misnomer, not a serif.)
- **Sans (everything else):** Inter — `h2`–`h4` (weight 600, tight tracking),
  body copy, buttons, UI labels, meta text. **Nav:** Figtree.

This is a hybrid: the `h1` carries the Hanken display voice while `h2`–`h4`
stay tight, near-solid-leading Inter (the swiss move). Don't swap in
alternative fonts for variety — stick to these families, vary weight and size.

**Font loading:** the display + body woff2s are self-hosted in
`public/fonts/` and **preloaded in `index.html`** so the real font wins first
paint (`@font-face` uses `font-display: optional`, which will *not* swap a
late-arriving font — so a missing preload silently ships the Arial-metric
fallback to first-time visitors). If you change the display font, update the
`@font-face` in `src/index.css`, the `--font-serif` token, **and** the
matching `<link rel="preload">` in `index.html` together.

### Structural moves (the brand on the page)

1. **Generous whitespace.** Sections are separated by large vertical rhythm
   (space-y-32 or equivalent). The site breathes.
2. **Left-aligned content, max-width constrained.** No centered marketing
   layouts. Hero content lives in `max-w-3xl` or similar.
3. **Hairline dividers, not boxes.** When sections need separation, use
   `border-line` / `border-line-soft` rules. Avoid card outlines and
   shadow-heavy containers.
4. **Left-edge madrona rule as a signature gesture.** A thin left border in
   `border-madrona/30` (see the manifesto block on the homepage) is a
   repeatable structural move. Use it for pull-quotes, callouts, or
   emphasized content — sparingly.
5. **No decorative illustrations or iconography.** No tree icons, no PNW
   landscape illustrations, no generic consultancy graphics. Photography
   (when real) should be environmental and PNW-coded.
6. **Labeled two-column spreads, not stacked centered sections (Charlie,
   2026-08-01 — the anti-flatness rule).** The failure mode that reads
   "generated by AI": a centered kicker + centered headline + a floating
   paragraph, repeated section after section. The approved pattern (About V4,
   Thesis, Who-we-help): every content section is a two-column spread —
   a labeled rail on the left (bark uppercase kicker, a Fraunces serif
   statement doing the intellectual work, short narrow body copy ≤46ch),
   and **structured** content on the right (icon columns with hairline
   dividers, a diagram, tinted chips, photo pairs — never another paragraph).
   Full-width hairlines between sections carry the rhythm. Small tinted
   circle icons (sage `#edefdf`/olive · bark `#f8e6d8` · slate `#e4ebf2`),
   one clean motif per icon, anchor columns. Copy lives in narrow measures;
   walls of centered text are banned. When a section feels flat, the fix is
   structure on the right side, not more copy.
7. **The madrona flash (Charlie, 2026-08-01).** Madrona trees surprise you
   with sudden red-orange. The brand echo: an occasional load-bearing word
   or phrase inside an ink headline flashes bark (`.m2-pop` — e.g. hero
   "…exist **next.**", "Four ways in. **One practice.**", "…figure out what
   to build, **then build it.**", About's bark closing line). At most one
   flash per viewport; always the phrase carrying the meaning, never
   decoration. Section kickers are bark-dark sitewide (the muted-gray
   kicker was retired 2026-08-01).

## Motion / animation

Motion follows the `madrona-motion` skill (`.claude/skills/madrona-motion/`).
Before shipping any animation or transition, run its REVIEW.md bar.

## The engagement model (the front door)

Every page should be able to route here. Three steps, published on
`/how-it-works`:

1. **Free 30-minute conversation** — published agenda: where you're at,
   where you've been, the biggest opportunities to grow or get more
   efficient, and what's already on your mind. (Shortened from 45 in
   canon 2026-07-21.) The primary ask sitewide is **"Get in touch"**,
   routed to `/connect` (Charlie, 2026-08-30; supersedes the earlier
   "Book a 30m free chat" button). Explicitly booking-shaped CTAs (the
   assessment result, /charlie) may open the Cal.com popup directly.
2. **Written assessment** — a short written read on where the studio can
   help (and where it can't). The client keeps it either way.
3. **Scoped proposal** — scope, cost, and approach. First engagements are
   deliberately small, with visible payback. No prices published yet
   (Charlie's call, pending).

Booking runs on the **Cal.com popup embed** (settled 2026-08-23; this
supersedes the earlier Google Calendar recommendation). `CAL_LINK` in
`src/data/booking.ts` is live; `useCalEmbed()` + `bookProps()`/
`bookClick()` (src/pages/lab/useCalEmbed.ts) power every "Schedule a
30-min call" CTA, with `BOOKING_URL` as the no-JS fallback href. Booking
clicks fire the `book_click` event through the shared dual-sink tracker
(`src/lib/analytics.ts` — GA4 + Vercel; its header documents the full
event vocabulary).

## Service architecture (Grow / Retain / Operate — site IA follows it)

Settled 2026-07-23 (Charlie sign-off on
`charlie-hq/briefs/2026-07-22-services-architecture.md`). Internal
vocabulary is **Grow / Retain / Operate** — customer surfaces never say
those words. Each bucket appears as a symptom question (the "door"), an
impact line in the owner's terms, and plain-words offerings:

1. **Grow — "Getting found."** Door: "Selling something great behind a
   web presence that doesn't do it justice?" Offerings: new websites,
   brand, content and marketing, online stores. Impact: more people find
   you, and more of them buy. **Flagship: selling online** — an e-commerce
   callout on `/services` (parallel to agentic operations under Operate),
   framed copy-first around best-practice work: Shopify builds/replatforms,
   the integrations that matter, checkout that converts. No dedicated page
   yet; copy-first until proof lands.
2. **Retain — "Coming back."** Door: "People buy from you once, then you
   never hear from them again?" Offerings: loyalty and memberships,
   repeat ordering, win-back and lifecycle email/SMS, reviews. Impact:
   customers come back more often.
3. **Operate — "Running smoother."** Door: "Watching the week disappear
   into work that software should be doing?" Offerings: workflow fixes,
   small tools with one job, agentic AI. Impact: hours back every week.
   **Flagship: agentic operations** (`/services/agentic-operations`) —
   agents + one command surface. The worked example is **Berry Good
   Berry Farm, openly framed as our demonstration business** (industry
   agent, invoicing agent, customer service agent, the ordering
   surface); dogfood proof is our own operation (Helm demo mode
   `?demo=1` — NEVER link the real HQ instance).

**Channel/fulfillment is not a bucket:** first-purchase path → Grow,
repeat/standing ordering → Retain, behind-the-counter fulfillment →
Operate.

**Signal is method, not a service:** "real customers before real money"
lives on `/how-it-works`, not the services menu.

**Success criteria run through everything:** every engagement names its
win up front in the owner's terms. The published agenda includes "what
would better look like"; every assessment recommendation names its
measure; every scoped proposal item says what changes and how we'll
know. Impact is an honest expectation, never a guarantee — no "3x your
revenue" energy. Proof links are wired copy-first: offerings ship as
copy, case studies and Berry Good demos link in as each proof lands.

The three engagement shapes live on `/how-it-works` as the shapes a
*proposal* takes (they are project shapes, not the service architecture):

1. **Strategy sprint** (2–6 weeks) — sharp point of view on the question
   blocking the roadmap, delivered as a working prototype.
2. **Signal sprint** (4–12 weeks) — the prototype in front of real users.
   Real usage, real signal.
3. **Product stewardship** (3–6 month retainers) — embedded fractional
   senior product voice.

## Content architecture

- **Home** — typed hero (settled headline + descriptor + cycling
  "never been a better time to" line), Why-we-exist two-column spread,
  three question doors (one per bucket), agenda strip, curated proof,
  contact CTA.
- **How it works** — the 3-step engagement model with the published
  30-minute agenda (incl. "what would better look like"), the Signal
  block (real customers before real money), + the proposal shapes.
- **Services** — the three doors: getting found / coming back / running
  smoother, each with impact line and offerings, agentic-operations
  flagship callout, success-criteria strip.
- **Agentic operations** — flagship page: the idea, the Berry Good
  worked example (the agent cast), the anatomy, the dogfood proof
  (Helm demo), start-tiny framing.
- **Apps (/apps)** — the studio product portfolio, filterable by stage.
  (The old /work case-study pages were retired 2026-08-23: orphaned,
  unindexed, old chrome. /work and /work/:slug 301 to /apps; the content
  lives in git history if it's ever rebuilt as V2 pages.)
- **Approach** — philosophy only: manifesto, the rhythm.
- **Writing** — placeholder; hidden from nav and noindexed until real
  articles ship.
- **About** — Charlie's background (three-pillar framing), the studio,
  building in the open, the name, the Bellingham "from here" block,
  contact.
- **Contact** — 3-field form → `/api/contact` (Resend).

## Studio signature footer (planned, not yet built)

Across all studio projects (Lila Trips, Berry Good Berry Farm, Fed, and
future work), a consistent "studio signature strip" will sit below each
project's own footer:

- Full-width thin strip (~48–56px) below the project's native footer
- Visually distinct (shade shift, hairline divider)
- Contains the Madrona wordmark only — right-aligned, links to
  madronaproduct.com
- Reusable `<StudioSignature />` component with `variant="dark" | "light"`
- Language for studio projects: wordmark alone, no "a project of" text
- Language for future client work: TBD (likely "Built by Madrona Product
  Studio")

The wordmark-only approach is intentional — confident, quiet, senior-studio.

## The identity (settled 2026-08-30 — the frond system)

The logo is the **frond**: a sparse red-orange frond (`#E55728`) on an
Evergreen Charcoal disc (`#2F3135`). The production lockup is the
**side-stack**: MADRONA in outlined Figtree 600 spaced caps, a quiet
hairline, then PRODUCT / STUDIO stacked in the orange (the frog
structure). Wordmark is always outlined paths in shipped assets — never a
live webfont, never recolored via CSS filters. Assets live in
`public/brand/` (frond-* files; five palette grounds ship as system
assets for OG cards, studio signatures, and app icons). Favicon is the
bold-stroke frond on the charcoal disc (regular weight washes out below
24px). Generators live in the madrona-studio design library
(`frond-build/gen-lockups-figtree.py`) and `scripts/make-og.mjs` /
`make-agent-og.mjs` for the OG families.

The topo/contour motif (the hero's "chart of the bay" and the static
field on OG cards) is the sanctioned madrona-adjacent visual element —
sensibility over depiction, as always.
