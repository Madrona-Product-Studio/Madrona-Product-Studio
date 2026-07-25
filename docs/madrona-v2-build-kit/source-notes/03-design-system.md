# 03 — Design system & current visual state

The system is a "swiss/zen" execution: warm-paper grounds, a 5-step ink ramp,
hairline rules, one bark-orange accent, mostly-Inter type. Calm and senior by
intent. **The honest problem: it's applied so uniformly that every page looks and
reads the same, and it's ~99% text.**

## Color tokens (the only palette — CSS vars, Tailwind utilities)

Grounds: `card #ffffff` · `paper #fdfcfa` · `bg #f5f1ea` (page)
Ink ramp: `ink #1a1714` · `ink70 #403a33` · `clay #6f6657` · `muted #8c8378` · `faint #b8b0a2`
Accent (madrona bark): `madrona #c4553a` · `madrona-dark #a3432d` · `madrona-light #e8a999`
Hairlines: `line rgba(26,23,20,.14)` · `line-soft rgba(26,23,20,.08)`

The accent does double duty: brand ID **and** the only CTA color. Used sparingly
(links, active nav, CTA buttons, a thin left-edge rule). No second accent allowed.

## Type

- **Fraunces (serif), weight 500** — H1 / page-title moment ONLY, plus rare editorial emphasis.
- **Inter** — H2–H4 (weight 600, tight −0.035em tracking, ~1.04 line-height), body, nav, UI.
- Sizes: H1 2.875→3.25rem · H2 2→2.5rem · H3 1.375→1.5rem · body line-height 1.6.
- The hybrid intent: one editorial serif moment per page, everything else tight Inter.

## Structural moves (the brand on the page)

1. Generous vertical rhythm (`space-y-24`/`space-y-32`).
2. Left-aligned, max-width-constrained content (`max-w-2xl` / `max-w-3xl`). No centered layouts.
3. **Hairline dividers, not boxes.** Card outlines/shadows avoided.
4. **Left-edge madrona rule** (`border-l-2 border-madrona/30 pl-6`) as the signature
   gesture for pull-quotes / callouts. Reused a lot (see note below).
5. **No decorative illustration or iconography.** No icons, no diagrams, no stock art.
   Photography only when real and PNW-coded.

## Motion (subtle)

Scroll-reveal (opacity + 10px rise, one-time), `.press` active-scale on buttons,
typed-headline effect + blinking cursor on the hero. Reduced-motion respected.

## Components (all text/layout; none are visual/media)

`Layout` (sticky nav + footer) · `Wordmark` · `ConnectCta` (the one CTA) ·
`CaseStudyCard` / `WorkRow` (work listing) · `OfferingCard` (proposal shapes) ·
`Img` (build-time WebP, CLS-safe) · `PageMeta` (SEO) · `StudioSignature` (planned) ·
`ArchitectureDiagram` (exists; used on the agentic page) ·
`swiss.tsx` → `Label` (eyebrow micro-caption), `Marker` (a number like "01"),
`Breath` (a large calm intro line).

## Current visual state — the candid assessment

- **Imagery:** exactly ONE real image sitewide — the homepage hero photo.
  Every other page opens with an H1 and goes straight into prose.
- **Repetition of device:** the "eyebrow Label + Marker number + H2 + paragraphs +
  bulleted list" pattern repeats on nearly every section of every page. Pages are
  distinguishable only by their words, not their shape.
- **The madrona left-rule** is the only recurring visual accent, and it's used for
  many different things (pull-quotes, flagship callouts, agenda, success criteria),
  so it stops signaling anything specific.
- **Scannability:** low. There are almost no summary devices — no numbers/stats,
  no cards you can skim, no icons or diagrams to anchor a concept, no before/after,
  no visual "here's the gist." The reader must read full paragraphs to extract
  meaning on every page.
- **Density:** each page is a long single column of similar-weight text blocks;
  little size/whitespace contrast to create a scanning path or focal points.

## The design brief implied by the owner's feedback

Keep the calm, senior, one-accent restraint — but introduce **visual hierarchy and
scannability**: real imagery/texture, at-a-glance summary devices, varied section
layouts (not one column of prose), and a clear "get the gist in 3 seconds" moment
per page. "Crisp and clean," not "sparse and monotonous."
