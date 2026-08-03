# Site punch list — batch on `site-updates-2026-08-02`

Working doc for tonight's batch of site changes (mostly copy, some images).

Status key: `[ ]` todo · `[~]` in progress · `[x]` done (committed on branch) · `[?]` needs decision · `[→]` deferred to a focused session

### Locked decisions (2026-08-02)
- **Categories → sector language:** Food & agriculture · Travel & hospitality · Health & wellness · Retail & commerce.
- **Logo → deferred** to a dedicated session (skip in this batch).
- **Bellingham → "Pacific Northwest"** in visible copy; keep Bellingham in SEO schema/meta. (Follow-up: update `charlie-hq/madrona-positioning.md`.)

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
- [?] **"WORK WORTH DOING" overlaps the Home audience section (Image #8).** Decision pending: align the treatment, or differentiate so they don't feel redundant. (Left as-is this batch.)

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
- [x] **Font flash on load (FOUT) — fixed.** Self-hosted Inter + Fraunces variable woff2 (latin subset, vendored to `public/fonts/` from @fontsource-variable), aliased to the existing "Inter"/"Fraunces" family names in `index.css`, `<link rel="preload">` in index.html, Google Fonts `<link>` removed. **Follow-up (round 2):** Charlie still saw a residual size-shift across pages — root cause was `font-display: optional` locking to a different-width fallback on slower loads. Switched to `font-display: block` so the preloaded font paints directly (no fallback width shown, consistent across pages). If any residual remains, escalate to metric-matched fallback `@font-face` (`size-adjust`/`ascent-override`).
- [x] **Section-heading outlier — fixed.** `.m2-who-rail h2` ("WHO WE HELP / Modern capability…") brought down to the shared two-column-spread scale (matches `.m2-ab4-rail h2`).
- [?] **Full section-heading type-scale normalization (follow-up).** ~30 different h2 clamp rules exist across the CSS (1.7rem–4.5rem). A proper pass would define one shared scale (page-title / section-statement / sub) and map all headings to it. Larger, higher-risk — recommend a dedicated pass.
- [x] **Favicon — Option A shipped** (bark rounded square, bold white M). New `favicon.svg` + `favicon.png` (512) + `apple-touch-icon.png` (180, full-bleed square for iOS masking); cache-bust bumped `?v=2` → `?v=3`. Contact sheet at `contact-sheets/favicon.html`.

- [?] **Section-heading type scale is inconsistent (Image #10).** The "WHO WE HELP / Modern capability, without the overhead." heading renders much larger than other section headings. CSS has several different h2 clamps (`m2-ab4-rail h2`, `m2-ab3 h2`, `m2-ab4 h2`, etc.). Do a consistency pass so section headings share one type scale sitewide. Ties to the broader consistency theme (hero templates, connectedness).

## Parking lot (needs a decision / later)
- [ ] **Cross-section connectedness theme.** Several sections feel disconnected. Addressed: Home "what we do" ↔ "Four ways in". Still open: About "Work worth doing" ↔ Home audience section.
- [ ] **Update `charlie-hq/madrona-positioning.md`** to reflect the Bellingham → Pacific Northwest positioning shift.
