# Madrona Product Studio — Site Backlog

## Madrona Open × engine hub — state + queue (handoff 2026-08-15)

**What's live (all shipped + verified 2026-08-15):**
- `madrona-open` is **public**: github.com/Madrona-Product-Studio/madrona-open — installable plugin marketplace (9 plugins, per-plugin READMEs, real `claude plugin validate` in CI). Install: `/plugin marketplace add Madrona-Product-Studio/madrona-open`.
- `/open` page is live, prerendered, in the sitemap — but **pulled from the primary nav** (PR #17; Charlie doesn't like the page yet — see queue item 1). Deep links remain: /consulting Operate ("The tools behind this are open source"), agentic-ops essay close, engine essay close.
- **The engine essay (/thinking/under-the-hood) is the hub** for the "set up an AI-forward studio" series (Charlie's call — no separate pillar piece). It gained the "Build your own / The parts, if you want to set this up yourself" section (PR #15): bootstrap · monitoring · design intelligence layer · image system, each row's aphorism slot swaps to a link as its field note publishes.

**The queue (in order):**
- [ ] **1. Redesign /open** — Charlie: "I don't love it." Diagnosis to test: it's the only pure card-grid page on the site — no artifact imagery, no diagram, no madrona flash, none of the labeled two-column spreads (see CLAUDE.md anti-flatness rule). Run `/design:design-audit` on the page, or build 2–3 genuinely distinct directions and screenshot side-by-side for Charlie to pick (motion-gate style). **When it lands, restore the nav entry** — one-liner in `src/pages/lab/M2Nav.tsx` (commented where it was).
- [ ] **2. Sentry field note** — draft v1 written, awaiting Charlie's voice pass: `~/Developer/hq/charlie-hq/thinking/madrona/writing/one-monitoring-setup-draft-v1.md` (grounded in `madrona-studio/capabilities/observability-sentry/`; honest framing = one standard applied by stakes, NOT full-fleet coverage — don't re-inflate). After the pass: build as a /thinking page (component + thinking-content.json + prerender entry + Article JSON-LD + OG card via /og-image), then swap the hub row's "first field note — landing soon" aphorism for the link.
- [ ] **3. Bootstrap field note** — draft next (source: `madrona-studio/bootstrap/NEW-APP.md` + `bootstrap/template/`). Same publish pattern; swap its hub-row aphorism.
- [ ] **4. Design-intelligence-layer field note** — source: `madrona-design` repo (CATALOG.md, design-audit orchestrator).
- [ ] **5. Image-studio: genericize → publish to madrona-open → field note last** — the 8/13 open-source strategy named it the flagship; it's still absent from the public catalog. Its hub row currently points at Solve-the-system (fine until then).

**Standing rule for this series:** exports in madrona-open are genericized, leak-scanned copies regenerated from studio canonicals — port lessons, never hand-edit only there. Every published field note follows the site pattern: prerender entry, OG card, Charlie voice pass before merge.

## In flight
- [x] **Our POV section — shipped as `/thinking`** (four articles live: Thesis, Under the hood, Agentic operations, Starter guide; /pov and /current redirect). Leftover from the original plan: launch checklist + Madrona Principles still sit in the drawer as unrouted components.

## SEO & Discoverability
- [ ] **NEXT: Google Search Console access** — verify the domain + service-account API access so we can see which queries the /pov articles (a deliberate traffic play) rank and get clicked for. Same setup pattern as the Vercel analytics tool in `~/.claude-tools/analytics/`.
- [ ] Branded OG cards for the four /pov articles (via the /og-image fleet skill) — shares should unfurl on-brand for a traffic-driving section
- [ ] Writing section content — superseded in part by /pov; remaining article targets: fractional product leadership, prototype before PRD
- [ ] Dedicated offering pages — Strategy Sprints, Rapid Prototyping, Fractional Product Leadership as standalone pages with their own URLs

## Design & Brand
- [ ] Wordmark decision — uppercase, lowercase, title case, or small-caps
- [ ] Companion mark / favicon — replace the placeholder "M" circle
- [ ] Studio signature component — `<StudioSignature />` for studio project footers (Lila, HikerLink, etc.)
- [ ] **Bricolage capsize metric fallback** — the display font (Bricolage Grotesque, shipped PR #27) borrows Inter's Arial-based metric fallback for now. Generate a dedicated capsize fallback (`@capsizecss/core` from the woff2) for zero-CLS on first uncached load. Non-blocking (`font-display: optional`).

## Content
- [ ] **Thinking piece — "Sites that are alive" (working title).** The shift from *static* sites (when writing code was expensive, you built once and left it) to sites that are *active*: continuously changing, improving, and adjusting to the needs, attitudes, and mood of the moment. Now that more people can change more things, more often (AI lowered the cost of change), how do we start to think of a site/product as **alive** — a living instrument that adjusts to what's needed right now? Cover both sides: the exciting upside (responsive, always-improving, closer to real needs, experimentation as the default, tighter loop between signal and change) AND the cautions/downsides (thrash and churn, loss of consistency/trust, no stable ground for users, quality + guardrails when everyone can change everything, change for its own sake vs. change that compounds). Ties straight to the studio POV — the engine, "solve the system, not the symptom," AI as leverage applied with judgment. Charlie's framing, 2026-08-16.
- [x] **About: local "from here" block — shipped 2026-08-16.** Added a "From here / Neighbors first." labeled two-column spread as the closing section of About V4 (`MadronaV2About.tsx`): Bellingham/Whatcom-is-home copy on the left, the real madrona-tree photo (`studioProfile.nameStory.imageSrc`) on the right with the name story folded into its caption (no separate "the name" section, per Charlie's call). New `.m2-ab4-place-media` CSS. Also swapped the sitewide footer geo line "PNW, Earth" → "Bellingham, WA" (`SiteFooter.tsx`). QA'd desktop + mobile.
- [ ] **Premium /thinking — Tier 2** (brief: `~/Developer/hq/charlie-hq/briefs/2026-08-16-thinking-premium-articles.md`): newsletter subscribe (needs an ESP, e.g. Resend Broadcasts), RSS feed, author bio block, sticky mini-TOC on desktop. Tier 1 shipped (Bricolage header, "In this article", reading progress, related "Keep reading", share row); likes deferred.
- [ ] Detail offering sections — how we communicate what an actual engagement looks like
- [ ] About page copy polish
- [ ] "We build systems, not just products" positioning. Show that the studio builds reusable infrastructure (component libraries, the capabilities + standards registry, shared packages like @madrona/api-utils) that makes building faster and easier to maintain. A real differentiator vs. studios that ship and leave. Worth surfacing on Approach or About at some point. Source: madrona-studio-capabilities repo.
- [x] "How we can help" question set — self-recognizing prompts that make the offerings concrete. Live as a Home section. Full raw bank to pull from / rotate:
  - Need to pressure-test a new idea before you commit real money to it? *(live)*
  - Sitting on a roadmap question that's been stuck for months? *(live)*
  - Not sure the thing you're imagining is actually worth building?
  - Need a working prototype you can put in front of people, not another deck? *(live)*
  - Want to build an internal tool to streamline how your team operates? *(live)*
  - Trying to add AI to your product without the hallucinations and the hype? *(live)*
  - Built something but not sure it's landing with users?
  - Need real signal on what to keep, cut, or change?
  - Want a senior product voice on your team without a full-time hire?
  - Want what we build to make your next build faster, not just ship and leave? *(systems/loops angle)*

## Done
- [x] Pre-launch design sweep (2026-08-16) — parallel design review across the site, then fixes: **Bricolage Grotesque display font** (retired Fraunces, unified H1s + statements), em-dash cleanup, /apps stage-badge colors (off blue/bark → calm ramp), forest→bark on active filter + /consulting mobile tab, checkup "seven/eight" copy fix (PR #27)
- [x] Premium /thinking articles Tier 1 — new template header (Bricolage + spacing), "In this article" quiet index, reading-progress bar, related "Keep reading", share row; applied to all four articles + /thesis (PRs #18–#26)
- [x] Removed pre-Madrona placeholder case studies (REI x3, Healthline); kept the logo-row tease
- [x] Hero subhead rewrite + comma fix
- [x] Site-wide em-dash sweep (page titles now use ·)
- [x] Sitemap generated from prerender data; /writing noindexed
- [x] Real favicon.png wired up
- [x] OG image URLs made absolute (+ width/height/alt)
- [x] JSON-LD Organization structured data
- [x] Hero cycler phrases — punchier, more opinionated
- [x] Dots animation — working
- [x] OG share image redesign
- [x] HikerLink case study added
- [x] Lila Trips copy update — category-level thesis, em-dash sweep
- [x] Em-dash sweep across all case studies
- [x] Case study card layout — title above image
- [x] Aria Health / Lila Yoga order swap
- [x] Build-time prerendering for SEO
- [x] Sitemap and robots.txt
- [x] Differentiators headline update
