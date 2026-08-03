# Site punch list — batch on `site-updates-2026-08-02`

Working doc for tonight's batch of site changes (mostly copy, some images).
Capture freely; I'll sort raw notes into the right page and mark status.

Status key: `[ ]` todo · `[~]` in progress · `[x]` done (commit) · `[?]` needs decision

### Locked decisions (2026-08-02)
- **Categories → sector language:** Food & agriculture · Travel & hospitality · Health & wellness · Retail & commerce.
- **Logo → deferred** to a dedicated session (skip in this batch).
- **Bellingham → "Pacific Northwest"** in visible copy; keep Bellingham in SEO schema/meta. (Follow-up: update `charlie-hq/madrona-positioning.md`.)

---

## Home (`/`)
- [x] **Hero: make PNW-based clear.** Eyebrow → "A small, senior product studio in the Pacific Northwest"; body → "...here in the Pacific Northwest and beyond." (uncommitted, on branch)
- [?] **"Good businesses around here…" section: add a "what we do" + connect it to "Four ways in. One practice."** (Image #2 ↔ #3.) Root cause found: homepage has its OWN hardcoded `consulting` array in `MadronaV2Home.tsx` with body copy that DIFFERS from the single source of truth (`src/data/services.ts` → `outcome`). The `/consulting` "Four ways in. One practice." section (`MadronaV2.tsx:210`) renders from services.ts. Same four `door` titles, different words, no shared label = the disconnect. **Recommended fix:** (1) add a "WHAT WE DO" kicker to the homepage section (mirror the `/consulting` label); (2) render the four items from `services.ts` (`door` + `outcome`) so copy is identical on both surfaces; (3) point the section link at the full "Four ways in" section. Needs go-ahead (touches the carefully-written copy).
- [?] **Rename the "work we're drawn to" categories to be more investor/business-friendly (`AudienceSection.tsx`).** Current: Farms and food ("From soil to shelf") · Outdoor and travel ("Journeys with substance") · Health and wellness ("Care through clarity") · Shops and services ("Local businesses, stronger"). "Farms and food" reads too generic. Explore recognized-sector language. Options in chat; decision pending. (Note: sub-lines could also shift from poetic → value-oriented to match.)
- [?] **Swap the "Good businesses…" section photo (Image #4).** Currently `studio-collaboration-wide.webp` (stock-feeling couple at laptop). Charlie wants something more relevant, ideally **co-created via the madrona-image-studio scene-direction process** (per [[feedback_app_imagery_process]]); acceptable interim = another strong PNW shot. On-hand candidates: `hero-pnw-coast-wide`, `about-shoreline`, `about-bellingham`, `footer-landscape`, `hero-1..6` (all landscapes, not work scenes). Decision: co-create a relevant scene now, or drop an interim landscape.

## Consulting (`/consulting`)
- [ ]

## Services (`/services`)
- [ ]

## Apps (`/apps`)
- [ ] **Lila Yoga screenshots are out of date** — on both the homepage products grid and the products/apps page (`lila-yoga-tile.webp`). Needs a fresh capture of the current lila.yoga UI, then regenerate the art-directed tile composite (madrona-image-studio process, per [[feedback_app_imagery_process]]). Affects Home + Apps.

## Connect (`/connect`)
- [ ] **Simplify the confusing two-path top section (Image #9).** Currently two equal cards — "Book a conversation" (filled primary "Schedule a call") and "Send a message" (outline "Write to us") — then a big "Send us a message" form + a "What to expect" rail, which duplicates/competes. **Direction:** make **Send a message the main/primary CTA on the left**; demote scheduling to a secondary "schedule a 30m if interested." Remove the redundancy so there's one clear primary path. (Note: sitewide CTA canon is currently "Book a 30m free chat" primary — this flips Connect's emphasis to message-first; worth confirming that's intended sitewide or just here.)

## About (`/about`)
- [ ] **REI logo too small in the credibility logo strip (Image #7).** Row is REI · healthline · Microsoft · "15+ years building consumer products at scale". REI mark renders much smaller / harder to read than the others — bump its size so optical weight matches the rest.
- [?] **"WORK WORTH DOING" section overlaps a homepage section (Image #8) — align them.** About's "We want to spend our energy on things that matter." (farm + coast imagery, "drawn to work that improves health and well-being, strengthens local businesses…") echoes the homepage AudienceSection "The work we're drawn to." Same themes/imagery, different treatment. Decide: align visual/copy treatment, or differentiate so they don't feel redundant. Another instance of the connectedness theme (parking lot).
- [ ] **Remove two sections (Image #6):** (1) "MADRONA IS A WORKING THEORY" — "Can small, senior, AI-enabled teams build products differently, and better?" + the Build→Learn→Refine→Share→Build better cycle diagram; (2) "THE WORK IS THE EVIDENCE" — the 3-column Our own products / Client work / Team evolution block. Confirm nothing else links/depends on them before cutting.

## How it works (`/how-it-works`)
- [ ]

## Work (`/work`) + case studies
- [ ]

## Agentic operations (`/services/agentic-operations`)
- [ ]

## Sitewide (nav, footer, meta, images)
- [?] **Scrub "Bellingham" → more generic PNW (or "Upper Left, USA").** 35 occurrences total; live-visible ones: `SiteFooter.tsx`, `Layout.tsx` footer, `MadronaV2Connect.tsx`, `MadronaV2Home.tsx` hero alt, `PageMeta.tsx`, `index.html` (title/meta + structured data). Rest are legacy/unrouted files (Home/About/HomeLab/brief V*). **Flags:** (1) positioning change — canon says "Bellingham is home, not a market"; if we drop it, update `charlie-hq/madrona-positioning.md` too. (2) Keep Bellingham in SEO structured data (`addressLocality`, `areaServed`) even if visible copy goes generic — local search signal. (3) SJBG case study mention is factual geography — keep. **Rec:** "Pacific Northwest" as the systematic swap (matches investor-friendly direction); "Upper Left, USA" only as one personality accent (About/footer), not sitewide.
- [?] **Page hero templates inconsistent.** About uses the labeled two-column spread (eyebrow + serif statement + structured right-side visual); Services + Apps use the simpler giant-serif-title + subhead, single column, no visual. **Rec: keep About (it's the canon standard per CLAUDE.md rule #6 + commit ab83edc), migrate Services + Apps to match.** Caveat: each needs its own right-side visual (Services → four doors; Apps → product montage) — design work, not a copy-paste. **Confirmed outliers so far: Services, Apps, and Connect ("Let's connect")** all differ from About. Check /consulting too. Connect's right-side visual could be the contact form itself or a PNW shot.
- [?] **Logo legibility / rework (applies everywhere).** Current lockup is a baked raster PNG (`MadronaLogo.tsx` → `docs/madrona_static_logo_assets/`), flagged as a *temporary raster source of truth pending vector reconstruction*. Problems: (1) "product studio" set in pale grey with wide tracking = low contrast; (2) it's pixels, so it muddies when scaled down (nav ~250–280px from 1138px source) and can't be fixed via CSS. Hardest fix; needs a direction decision (see options in chat). Likely path: componentized lockup with a live-text wordmark so color/size/tracking are controllable and crisp everywhere.

---

## Parking lot (needs a decision / later)
- [ ] **Cross-section connectedness theme.** Charlie feels several sections don't feel connected to each other. Homepage ↔ "Four ways in. One practice." is one instance. Watch for others as we walk the pages; consider a consistent labeling/echo system.
