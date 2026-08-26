# Redesign brief: CXO-inspired homepage + sub-page structure

**Date:** 2026-08-25 · **Owner:** Charlie · **Working agents:** Codex (main tree,
first swipe) + Claude (worktree, review/QA/counter-proposals)
**Status:** exploration on branches. Nothing here ships without Charlie's
explicit go-live sign-off.

## Why

Reference site: **https://www.cxo.dev/** (Claire Vo + Zach Davis's AI
consulting practice). Charlie's read, which this brief encodes: the thing
that makes that site great is **how consumable the information is**. Every
claim is rendered as a designed artifact instead of a paragraph. The Madrona
site needs cleanup, organization, content design, and an imagery update in
that direction.

What Charlie explicitly flagged from CXO.dev (annotated from screenshots):

1. **Services dropdown nav** — four named service pages, one dropdown,
   hairline-divided menu. Services are first-class destinations, not
   sections of one long page.
2. **Service-page hero as artifact** — kicker breadcrumb ("AI TRANSFORMATION
   · COMPANY SYSTEM"), big display statement, 2-3 line lede, one CTA, and a
   *rendered work product* beside it (their readiness report with a 41%
   score) layered over textured art.
3. **Function-module grid** — "Every function needs to go AI-native": a
   two-column statement intro, then a grid of modules, each with colored
   micro-kicker + module name, headline, short lede, and an **embedded UI
   artifact** (chat thread with agent actions, four-stat pipeline row,
   variant cards, a routing table with status labels). Dense but effortless
   to consume.
4. **Skills + stack panel** — one framed panel, two labeled rows: SKILLS
   (four category columns of 3 items each) and STACK (tool logos + names).
   The whole capability story in one glance.
5. **Homepage hero** — announcement bar up top; headline + one-line
   descriptor; dual CTA ("Talk to us" + "Take our assessment"); a
   diagnostic artifact card + client/stack panel overlapping; large
   distinctive art on the right.

Charlie also liked (kept from the prior pass): the `/consulting` door
detail treatment on branch `feature/cxo-inspired-1-4` (chips + shallow
bands, commit 88984ae). That treatment style can be assumed good.

## The one-sentence direction

**Rebuild the homepage and give each service a real page, where every
section proves its claim with a rendered artifact of the work — in
Madrona's warm, light, restrained brand, not CXO's dark terminal one.**

## Brand translation rules (non-negotiable)

CXO.dev's *mechanics* are the reference. Its *aesthetic* is theirs.

- Tokens, type, and palette stay Madrona: warm paper grounds, ink ramp,
  hairlines, bark for brand/links, forest for CTAs. No dark theme, no
  third accent, no monospace body/labels, no terminal chrome
  (`~/path` bars, traffic-light dots). Read `CLAUDE.md` first — the
  design-token and structural-moves sections are canon.
- Artifact cards = white `card` surfaces + hairline borders + uppercase
  micro-labels + status words in muted/ink, with at most one bark accent
  per artifact. See the what-changed brief card on
  `feature/cxo-inspired-1-4` (`src/pages/AgenticOperations.tsx`) for the
  established idiom.
- Voice: "we", direct, plain outcomes, no em-dashes, no hype metrics we
  can't back. Honest statuses are on-brand ("In beta", "Demo", "Coming
  soon").
- Copy lives in narrow measures. Walls of centered text stay banned.

## Proposed IA (Codex: treat as strong default, push back with reasons)

Nav: `Products · Consulting ▾ · Tools · Articles · About` + Contact CTA.
The Consulting dropdown lists the four doors (canonical data:
`src/data/services.ts` — reuse it, don't fork the content):

- `/consulting` — stays: the practice overview + how-we-work. Slimmer once
  sub-pages carry the depth.
- `/consulting/work-smarter` — Operations and AI. Absorbs/replaces
  `/services/agentic-operations` (301 the old URL). Flagship page.
- `/consulting/grow-your-business` — Customers and growth.
- `/consulting/build-trust` — Brand and web.
- `/consulting/new-products` — Build something worth using.

Each sub-page follows one shared template (CXO service-page anatomy,
Madrona idiom):

1. Hero: kicker breadcrumb (door · area name), display statement, short
   lede, primary CTA, and one rendered artifact beside it.
2. Function/offering module grid: 3-5 modules, each an embedded artifact
   (use real Berry Good imagery, the /tools demos, the Helm surface, or
   new artifact cards; every module links somewhere real).
3. Typical problems + what we might make (the chips treatment from
   `feature/cxo-inspired-1-4`).
4. How we start + proof links + CTA band.

Homepage (CXO homepage anatomy, Madrona idiom):

1. Now strip (announcement bar — exists on `feature/cxo-inspired-1-4`;
   reuse or improve it).
2. Hero: headline + one-line descriptor, dual CTA (**Book a 30m free
   chat** + **Take the free signal check** → `/checkup`), one worked
   diagnostic artifact (a signal-check report excerpt is the closest
   analog to CXO's readiness report), strong imagery.
3. Three-to-four door modules with embedded artifacts (the consumable
   grid, not stacked prose sections).
4. Skills + stack panel, Madrona version: SKILLS = the four doors'
   capability columns; STACK = the tools we actually build and run with
   (Claude/Claude Code, OpenAI, Shopify, Vercel, Resend, GA4, Cal.com,
   GitHub, etc. — only tools we genuinely use).
5. Proof: apps rail (Helm/Lila/San Juan), Berry Good, REI/Healthline/
   Microsoft strip, one Chime-style honest outcome block if we have one.
6. Thinking teaser + forest CTA band + footer.

## Imagery direction

CXO uses thermal-map generative art as its signature texture. Madrona's
equivalent must be warm and PNW-coded, not pixel-noise. Options, in
preference order: (1) existing product-proof photography and composites in
`docs/madrona-v2-build-kit/` (Berry Good, Lila, San Juan, Helm);
(2) new madrona-image-studio generations (bark texture, Salish Sea,
berry-farm environmental shots) — Charlie picks from a contact sheet
before anything lands; (3) abstract SVG diagram work in the POV-thumbnail
system's language. No stock, no generic AI-consultancy graphics.

## Working agreement (two-agent protocol)

- **Codex**: works in the main tree. Branch `codex-redesign` off
  `redesign-2026-08`. Dev server port **5173** (default). Builds the first
  swipe: homepage + the shared service sub-page template + at least the
  Work smarter sub-page, as **new preview routes** (`/v3`,
  `/v3/consulting/work-smarter`) so nothing existing breaks. Reuse
  `services.ts`, `now.ts`, existing imagery; don't edit live pages, nav,
  or `madrona-v2.css` core — new CSS goes in a new file.
- **Claude**: works in a separate git worktree on its own branch and port.
  Reviews Codex's output with screenshots (desktop + 390px), files
  concrete critique, builds counter-proposals only where a section falls
  short, and owns visual QA.
- Neither agent edits the other's files. Anything shared (this brief,
  `services.ts` content changes) goes through Charlie.
- Screenshot QA gate applies to every section before it's called done:
  `node ~/.claude-tools/screenshot/shot.mjs <url> <out> [w] [h]`
  (use `shot-wait.mjs` next to it for pages with scroll-reveal).
- Charlie reviews on preview routes/deploys and picks; losing variants get
  deleted before merge (lock-in rule).

## Backlog: to discuss before building (NOT in scope for the first swipe)

- **A sense of time and light (Charlie, 2026-08-25).** The site should feel
  light-aware: possibly an automatic dark mode. Discuss before building.
  Directions to weigh when we do: (1) respect `prefers-color-scheme` with a
  manual toggle (the baseline expectation; CXO.dev has exactly this in its
  utility bar); (2) go further and make it *place-aware* — a warm "dusk
  mode" keyed to actual Bellingham sunset rather than a generic gray-dark
  theme, which would turn a commodity feature into brand (the PNW light is
  the brand); (3) subtler than a full theme: time-aware imagery/hero
  tinting only. Real cost either way: a second palette for the whole token
  system and a canon decision on how bark/forest behave on a dark ground —
  so this needs its own design pass with variants, not a bolt-on.
