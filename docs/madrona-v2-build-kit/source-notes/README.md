# Madrona Product Studio — design review packet

A self-contained snapshot of the site's **organizational design, information
architecture, and page design**, written so a reviewer with no repo access can
critique it. Prepared 2026-07-23.

## What Madrona is (one paragraph)

Madrona Product Studio is a small, senior product/digital studio in Bellingham,
WA. One senior product lead (Charlie Koch) at the center, with a trusted network
of designers/engineers/researchers who come in per engagement. It helps
small-to-medium businesses "figure out what to build, then build it" — websites,
brand, online stores, loyalty/retention, workflow tools, and AI agents. Serves
the Pacific Northwest and beyond. Voice is "we," direct, editorial, restrained.

## The problem we want reviewed (owner's own words)

> "I'm still not feeling this site." · "It doesn't feel sharp, clear and
> interesting. Everything is text, and it feels kinda hard and not simple to get
> the jist of it." · Aspiration: **"really crisp and clean."**

**Diagnosis we already agree on:** the site is a *wall of text*. Every page is
the same rhythm — paragraph → list → hairline → paragraph — with **no imagery,
no diagrams, no visual hierarchy, and no "get the gist in 3 seconds" moments.**
Editorial restraint has tipped into monotony. It reads as thorough but feels
undifferentiated and effortful; you must *read* to understand anything.

A liked reference is **ranchhousedesigns.com** — same warm/editorial sensibility
but *visual*: photography, varied section layouts, scannable. We want to keep
Madrona's calm, senior restraint **and** make it scannable, visual, and sharp.

## What we want from the review

1. **Diagnose the "wall of text" problem** structurally — where does scannability
   break, where should visual hierarchy / imagery / diagrams / summary devices go?
2. **IA / org critique** — is the structure (see `02`) right? Too many pages? Is
   the Grow/Retain/Operate service model legible to a busy SMB owner?
3. **Page design critique** — per-page (see `04`), what should be a *visual* moment
   vs. prose? What's the fastest path to "I get it" on each page?
4. **Concrete, opinionated moves** — not "add whitespace," but "the homepage needs
   X visual device here; the Services page should be a 3-card scan, not 3 text
   blocks," etc.

## Files in this packet

- `01-positioning-and-org.md` — positioning, studio model, service architecture, voice
- `02-information-architecture.md` — sitemap, nav, routes, page purposes, the Connect flow, content inventory
- `03-design-system.md` — tokens, type, structural moves, components, honest current-state notes
- `04-page-by-page.md` — section-by-section content of every page (this is where the text density is visible)

## Hard constraints (things NOT up for debate)

- **Name:** "Madrona" (the -a spelling is intentional, not a typo).
- **One accent color:** madrona bark orange `#c4553a`, used sparingly; it does
  brand-ID *and* CTA duty. No second accent.
- **Type:** Fraunces (serif) for the H1/page-title moment only; Inter for
  everything else. No new fonts.
- **Voice:** "we," editorial, no em-dashes, no hype ("3x your revenue" energy).
- **Local identity is real:** Bellingham/Whatcom + PNW, SMB-focused.
- Tech is React + Vite + Tailwind v4; content lives in TS files. Any redesign
  ships as code (no Figma round-trip required).
