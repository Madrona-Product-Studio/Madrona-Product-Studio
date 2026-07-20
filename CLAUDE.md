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

**Madrona (the signature — used sparingly)**
- `madrona` `#c4553a` — links, active nav, CTA buttons, accent rules
- `madrona-dark` `#a3432d` — hover and pressed states
- `madrona-light` `#e8a999` — selection highlights, subtle tinted washes

**Discipline:** The bark orange is the signature color AND the primary CTA
color. Do not introduce a separate "CTA green" or similar — the whole point
is that one color does brand-ID and interaction-signal work simultaneously.
This means madrona must be used sparingly everywhere else so it reads as
signal, not decoration.

### Typography

- **Serif (display):** Fraunces — used for the `h1` / page-title moment and
  occasional editorial emphasis. Weight 500.
- **Sans (everything else):** Inter — `h2`–`h4` (weight 600, tight tracking),
  body copy, nav, buttons, UI labels, meta text.

This is a hybrid: the `h1` keeps the editorial Fraunces voice while `h2`–`h4`
stay tight, near-solid-leading Inter (the swiss move). Don't swap in
alternative fonts for variety — stick to these two, vary weight and size.

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

## The engagement model (the front door)

Every page should be able to route here. Three steps, published on
`/how-it-works`:

1. **Free 45-minute conversation** — published agenda: where you're at,
   where you've been, the biggest opportunities to grow or get more
   efficient, and what's already on your mind.
2. **Written assessment** — a short written read on where the studio can
   help (and where it can't). The client keeps it either way.
3. **Scoped proposal** — scope, cost, and approach. First engagements are
   deliberately small, with visible payback. No prices published yet
   (Charlie's call, pending).

Booking currently routes through `/contact`; a Cal.com link will replace
it when the account exists (see `BOOKING_URL` in `HowItWorks.tsx`).

## Service architecture (the lifecycle model — site IA follows it)

`/services` is organized by the client's business lifecycle, offer-led:

1. **Demand** (front) — brand, web presence, content, performance
   marketing, e-commerce.
2. **Operations** (middle) — service blueprinting, efficiencies, AI
   agents/tools. **Flagship: agentic operations**
   (`/services/agentic-operations`) — business agents + a centralized
   command surface; the industry agent as the worked example; dogfood
   proof is our own operation (Helm demo mode `?demo=1` — NEVER link the
   real HQ instance).
3. **Channel & fulfillment** (back) — DTC channels, ordering, booking,
   fulfillment support.

The three engagement shapes live on `/how-it-works` as the shapes a
*proposal* takes (they are project shapes, not the service architecture):

1. **Strategy sprint** (2–6 weeks) — sharp point of view on the question
   blocking the roadmap, delivered as a working prototype.
2. **Signal sprint** (4–12 weeks) — the prototype in front of real users.
   Real usage, real signal.
3. **Product stewardship** (3–6 month retainers) — embedded fractional
   senior product voice.

## Content architecture

- **Home** — hero, capability cards, self-recognition questions (lifecycle
  flavored), recent work (with pillars line), how-it-works teaser,
  contact CTA.
- **How it works** — the 3-step engagement model with the published
  45-minute agenda + the proposal shapes.
- **Services** — the lifecycle model: demand / operations / channel &
  fulfillment, with the agentic-operations flagship callout.
- **Agentic operations** — flagship page: the idea, the industry-agent
  worked example, the dogfood proof (Helm demo), start-tiny framing.
- **Work** — 9 studio case studies grouped by maturity stage
  (Live → Beta → Prototype → Concept).
- **Case study pages** — template: Opportunity → Thesis → What We Did →
  What We Learned → Status.
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

## Open brand decisions

These haven't been settled and are good candidates for Claude Design
exploration:

- **Wordmark case** — uppercase, lowercase, title case, small-caps. Currently
  using title case as a placeholder in nav and footer.
- **Companion mark** — deferred until a concrete use case emerges (favicon,
  LinkedIn avatar, etc.). Current favicon is a simple "M" circle placeholder.
- **Whether to use a madrona-inspired visual element anywhere** — e.g., a
  bark-texture hero treatment, a trunk-curve section mark. Leaning toward
  sensibility-over-depiction, but worth exploring.
