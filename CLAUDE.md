# Madrona Product Studio — Design System & Brand Reference

This file is the source of truth for brand and design decisions on this site.
Read it before making styling changes, generating mockups, or producing
anything visual.

## Brand positioning

Madrona Product Studio is a small, senior product studio based in the Pacific
Northwest. Founded by Charlie Koch. The positioning is a senior product lead
at the center, with a trusted network of designers, engineers, and researchers
who come in as engagements require.

**One-liner:** We help companies figure out what to build — and then build it.

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
(`bg-madrona`, `text-ink-light`, etc.). Do not introduce hardcoded hex values
in components — if a color isn't in the system, either it's not needed or
the system needs to change.

### Color palette

The palette is deliberately lean. Three color families, each with a role:

**Ink (primary text and structure)**
- `ink` `#1a1a1a` — primary text, structural elements, logo wordmark
- `ink-light` `#4a4a4a` — secondary text, captions, meta labels

**Cream (background and surfaces)**
- `cream` `#faf8f5` — primary page background
- `cream-dark` `#ece8e1` — hairline dividers, quiet borders, image placeholders

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

- **Serif (display):** Fraunces — used for h1/h2/h3/h4, the wordmark, and
  occasional editorial emphasis. Weight 500 by default.
- **Sans (body and UI):** Inter — everything else. Body copy, nav, buttons,
  UI labels, meta text.

The serif carries the editorial, senior-studio feeling. Inter keeps UI and
body copy functional and legible. Don't swap in alternative fonts for
variety — stick to these two, vary weight and size instead.

### Structural moves (the brand on the page)

1. **Generous whitespace.** Sections are separated by large vertical rhythm
   (space-y-32 or equivalent). The site breathes.
2. **Left-aligned content, max-width constrained.** No centered marketing
   layouts. Hero content lives in `max-w-3xl` or similar.
3. **Hairline dividers, not boxes.** When sections need separation, use
   `border-cream-dark` rules. Avoid card outlines and shadow-heavy containers.
4. **Left-edge madrona rule as a signature gesture.** A thin left border in
   `border-madrona/30` (see the manifesto block on the homepage) is a
   repeatable structural move. Use it for pull-quotes, callouts, or
   emphasized content — sparingly.
5. **No decorative illustrations or iconography.** No tree icons, no PNW
   landscape illustrations, no generic consultancy graphics. Photography
   (when real) should be environmental and PNW-coded.

## Offerings (for reference in copy)

1. **Strategy sprints** (2–6 weeks) — sharp point of view on the question
   blocking the roadmap.
2. **Build engagements** (2–6 months) — lead plus right team to ship real
   product.
3. **Fractional product leadership** (3–6 month retainers) — embedded
   senior product voice for early-stage teams.

## Content architecture

- **Home** — hero, manifesto, offerings summary, selected work, writing
  teaser, contact CTA.
- **Work** — split between client engagements (REI Membership, REI
  Adventures, Healthline Loyalty) and studio projects (Lila Trips, Berry
  Good Berry Farm, Fed).
- **Case study pages** — template: Opportunity → Thesis → What We Did →
  What We Learned → Status.
- **Approach** — how we work, philosophy, more detail on offerings.
- **Writing** — article/essay index.
- **About** — Charlie's background, the studio, the network.

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
