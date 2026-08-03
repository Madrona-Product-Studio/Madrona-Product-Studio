# Site punch list — batch on `site-updates-2026-08-02`

Working doc for tonight's batch of site changes (mostly copy, some images).

Status key: `[ ]` todo · `[~]` in progress · `[x]` done (committed on branch) · `[?]` needs decision · `[→]` deferred to a focused session

### Locked decisions (2026-08-02)
- **Categories → sector language:** Food & agriculture · Travel & hospitality · Health & wellness · Retail & commerce.
- **Logo → deferred** to a dedicated session (skip in this batch).
- **Bellingham → "Pacific Northwest"** in visible copy; keep Bellingham in SEO schema/meta. (Follow-up: update `charlie-hq/madrona-positioning.md`.)

## ▶ RESUME HERE (handoff 2026-08-03, updated)

**Branch:** `hero-template-consistency` (off `main` @ `d447324`; prior `site-updates-2026-08-02` batch is merged to `main`). Typecheck clean, committed locally, **NOT pushed** (Charlie reviewing). Dev server: `npm run dev`.

**Just done: shared page-header template ✅.** Introduced one canonical hero class `.m2-hero` derived from About's exact spec (max-width 1320, `padding-inline: clamp(20px,4vw,48px)`, grid `1fr / 1.22fr`, shared h1/rule/`.m2-ab-headline`/`.m2-ab-body` type). Applied to the three visible non-About pages, each reusing About's `.m2-ab-intro-copy` + `.m2-ab-intro-visual` wrappers with a right-side rounded image (`.m2-hero-media`):
- **How we help** (`/consulting`, `MadronaV2.tsx`) — was BROKEN: it shared `.m2-ap-intro` with Products, so the grid auto-flowed its unwrapped children. Now fixed. Image: `hero-3.webp` (Skagit tulip fields).
- **Products** (`/apps`) — image `apps-hero.webp`.
- **Services** (`/services`) — image `hero-2.webp`.
- **About** (`/about`) — unchanged; it's the reference. Its `.m2-ab-intro` and `.m2-hero` share one grid/container rule (single source of truth).
- Removed the now-dead `.m2-sp-intro` CSS. Left `.m2-ap-intro` (still used by the hidden `/thinking` placeholder) and `.m2-ph-sub` (harmless).
- Verified desktop + mobile on all four; margins/left-edges/type now match.

**Connect decision (Charlie, 2026-08-03): leave as-is.** Connect (`/connect`) keeps its own `.m2-cx-hero` — the bigger "Let's connect." h1 (clamp 3.6–6rem) + the 3 tag chips are a deliberate CTA moment. It already reads as the same two-column rounded-image family, so it's intentionally NOT folded into `.m2-hero`.

**Then remaining:** section-heading type-scale normalization (`[?]`), About "Work worth doing" alignment (`[?]`), imagery session (stale Lila tile + Home section photo), logo rework (deferred).

**Safety refs:** `wip-scratch-2026-08-02` branch holds the old unpushed OG-D4 commit; two git stashes hold earlier scratch. Another agent/session has pushed to `origin/main` during this work (OG versioned-URL) — always fetch + rebase before merging.

### Commits this batch
- `c3a7637` — Batch 1: PNW copy, sector categories, What-we-do connection, About trims
- `e00aa2c` — Connect: Send-a-message primary, scheduling secondary

---

## Home (`/`)
- [x] **Hero: PNW.** Eyebrow → "A small, senior product studio in the Pacific Northwest"; body → "…here in the Pacific Northwest and beyond."
- [x] **"Good businesses…" ↔ "Four ways in. One practice." connection.** Added a "What we do" label; the four doors now render from the `services.ts` source of truth (`door` + `outcome`), so copy matches the What We Do section exactly.
- [→] **Swap the section photo (Image #4).** Held: no on-hand asset improves on the current collaboration photo for a "what we do" context (rest are landscapes). Recommend co-creating a relevant scene in the imagery session rather than dropping a mismatched landscape.

## Consulting (`/consulting`)
- [ ] _(none captured)_

## Services (`/services`)
- [→] Hero template — see Sitewide hero-template item.

## Apps (`/apps`)
- [→] **Lila Yoga screenshots out of date (Home + Apps).** Confirmed stale: current tile shows the old Lila UI (Library/Practice/Favorites, "Morning Grounding Flow"); live is a full redesign ("Welcome to yoga / Five ways in"). Needs a fresh capture + regenerated art-directed tile (madrona-image-studio, [[feedback_app_imagery_process]]).

## Connect (`/connect`)
- [x] **Simplified the confusing two-path top section (Image #9).** Removed the redundant two-card block; "Send us a message" form is now the primary left path; booking moved to the sidebar as a secondary "Prefer to talk first?" card (schedule a 30-min call + what to expect).
- [x] Bellingham → Pacific Northwest (contact line).

## About (`/about`)
- [x] **Removed two sections (Image #6):** "Madrona is a working theory" (loop) + "The work is the evidence" (3-col), plus now-unused consts/import.
- [x] **REI logo enlarged (Image #7)** to match the other credibility marks' optical weight.
- [x] Bellingham → Pacific Northwest (image alt).
- [x] **"WORK WORTH DOING" overlap with Home audience — DONE (2026-08-03, differentiate via copy, Charlie's call).** The echo was that About re-enumerated Home's sectors ("we're drawn to work that improves health and well-being, strengthens local businesses…") and repeated the "drawn to" phrasing from Home's "The work we're drawn to" kicker. Fix: reworked the About body to be principle-first (leverage → deliberate choice → "work we'd be proud to have built" → keep the "software can leave the world a little better" closer). Dropped the domain re-list, the "drawn to" echo, and avoided a fresh "people/place/purpose" echo. Home audience section unchanged (it owns the sectors). Copy-only; twin PNW photos on About kept (visual differentiation was offered and declined). Verified desktop + mobile.

## How it works (`/how-it-works`)
- [ ] _(none captured)_

## Work (`/work`) + case studies
- [ ] _(none captured)_

## Agentic operations (`/services/agentic-operations`)
- [ ] _(none captured)_

## Sitewide (nav, footer, meta, images)
- [x] **Bellingham → Pacific Northwest** in visible copy (footer, legacy footer, Connect, hero alt). Kept in SEO title/meta/structured data. Follow-up: update positioning canon.
- [x] **Categories → sector language** (`AudienceSection.tsx`): Food & agriculture · Travel & hospitality · Health & wellness · Retail & commerce.
- [→] **Page hero templates inconsistent.** About is a rich two-column spread (eyebrow + statement + right-side visual + proof points); Services/Apps/Connect are sparser. **Rec: keep About as the standard, bring the others to parity** — but each needs a bespoke right-side visual (Services → the four doors; Apps → a product montage; Connect → keep its hero image, align text treatment). Real design work → focused session, not a safe autonomous edit.
- [→] **Logo legibility / rework** (deferred by decision). Baked raster; grey "product studio" too light + muddies small. Path: componentized live-text lockup. Dedicated session.

## New (batch, uncommitted / to execute)
- [x] **Home: "Pacific Northwest" → "PNW"** in visible hero copy (eyebrow + body). Alt text kept spelled out.
- [x] **Font flash on load (FOUT) — fixed.** Self-hosted Inter + Fraunces variable woff2 (latin subset, vendored to `public/fonts/` from @fontsource-variable), aliased to the existing "Inter"/"Fraunces" family names in `index.css`, `<link rel="preload">` in index.html, Google Fonts `<link>` removed. **Follow-up (round 2):** Charlie still saw a residual size-shift across pages — root cause was `font-display: optional` locking to a different-width fallback on slower loads. Switched to `font-display: block` so the preloaded font paints directly (no fallback width shown, consistent across pages). If any residual remains, escalate to metric-matched fallback `@font-face` (`size-adjust`/`ascent-override`). **Follow-up (round 3, 2026-08-03 — the escalation): DONE.** Charlie still saw a load-time font shift. Root cause: `font-display: block` reserves space with the *fallback's own* metrics, so the real font reflows when it swaps in. Fix = metric-matched fallbacks + `font-display: swap`. Added `"Inter Fallback"` (over Arial) and `"Fraunces Fallback"` (over Georgia) `@font-face`s with `size-adjust`/`ascent-override`/`descent-override` generated by `@capsizecss/core` from the actual woff2 files; inserted both fallback families into every `--font-*` token stack AND every hardcoded `Inter,…`/`Fraunces,…` stack in `madrona-v2.css` (~40 sites, incl. the `.m2-ab-intro-copy h1`). Measured match: Inter Δwidth 0.12% / Δheight 0% (near-perfect — covers all body/nav/h2–h4); Fraunces Δheight 0% (no vertical reflow) with ~5% h1-only width settle (left-aligned, so only the h1 right edge moves; Georgia beat Times on 3/4 headings). Real fonts stay preloaded so on warm loads no fallback shows at all. No new runtime dep (capsize used one-off to generate the numbers).
- [x] **Section-heading outlier — fixed.** `.m2-who-rail h2` ("WHO WE HELP / Modern capability…") brought down to the shared two-column-spread scale (matches `.m2-ab4-rail h2`).
- [x] **Section-heading type-scale normalization — DONE (2026-08-03, targeted fix, Charlie's call).** Measured actual rendered sizes across all visible pages: page titles (h1) were already consistent (~63px; Connect deliberately 90px); the CTA + card headings were fine. The only real problems in the *section-statement* tier were one outlier — `.m2-studio h2` ("Senior team. Direct partnership. Real outcomes.") at 51px@1280 / up to 72px wide — plus a loose 32–38px spread and a same-text mismatch ("We build and run our own apps, too." was 35px on Home / 32px on Consulting). Fix: added one token `--m2-h-section: clamp(1.95rem, 2.8vw, 2.55rem)` (the About `.m2-ab4-rail` reference) in the `.m2` scope and pointed all nine section-statement rules at it (`.m2-ab4-rail`, `.m2-who-rail`, `.m2-svcmod-intro`, `.m2-sp-title`, `.m2-apps-rail`, `.m2-hww-rail`, `.m2-ap-why-intro`, `.m2-hp-head`, `.m2-consult-intro`, `.m2-studio`). Every section statement now renders 36px@1280 / ~40px wide. Fonts left as-is (Fraunces on About/Who per canon; tight Inter elsewhere) — full font unification was offered and declined. Left `.berry-case-intro h2` (45px, embedded Berry Good demo-brand headline, not a Madrona section head). Verified desktop + mobile on Home/Consulting/Services/Apps; typecheck clean.
- [x] **Favicon — Option A shipped** (bark rounded square, bold white M). New `favicon.svg` + `favicon.png` (512) + `apple-touch-icon.png` (180, full-bleed square for iOS masking); cache-bust bumped `?v=2` → `?v=3`. Contact sheet at `contact-sheets/favicon.html`.

- [?] **Section-heading type scale is inconsistent (Image #10).** The "WHO WE HELP / Modern capability, without the overhead." heading renders much larger than other section headings. CSS has several different h2 clamps (`m2-ab4-rail h2`, `m2-ab3 h2`, `m2-ab4 h2`, etc.). Do a consistency pass so section headings share one type scale sitewide. Ties to the broader consistency theme (hero templates, connectedness).

## Parking lot (needs a decision / later)
- [x] **Cross-section connectedness theme — resolved.** Home "what we do" ↔ "Four ways in" (earlier batch); About "Work worth doing" ↔ Home audience section (2026-08-03, copy differentiation). No open threads.
- [ ] **Update `charlie-hq/madrona-positioning.md`** to reflect the Bellingham → Pacific Northwest positioning shift.
