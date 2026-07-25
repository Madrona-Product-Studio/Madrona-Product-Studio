# Handoff: Lila Trips montage — real screens on the generated plate

## Goal
Replace the fake phone screens in the Lila Trips product-proof montage with
**real** Lila Trips app screens and the real logo, while keeping the generated
photographic plate (plant, stone, warm light) that we already like.

## Where it lives
- Component: `src/pages/lab/MadronaV2.tsx`, line 114 (`.m2-product-stage`).
- The montage is a single flat placeholder image:
  `docs/madrona-v2-build-kit/placeholders/product-proof/lila-product-proof-wide.webp`
  It bakes in BOTH the photographic plate AND the fake phone screens
  (Big Sur Scenic Drive, Mendocino Coastal Escape, the itinerary list).
- The floating white "YOUR DAY" card (`.m2-plan`) is already live HTML/CSS,
  driven by the `tripPlans` array. It stays as-is. No work there.

## Source material (already on disk)
- Real app: `~/Developer/apps/lilatravel` — runs with `npm run dev` (Vite).
- Real vector logo: `~/Developer/apps/lilatravel/public/logo-120.svg` (clean, 580 bytes).
- Real content matches the montage: the app already has Big Sur / Ventana
  coastal material, so the true screens read as the same trip.

## Plan
1. Run `lilatravel` locally, screenshot 2-3 real views at a phone viewport
   (~390px) with the Playwright shot tool:
   `node ~/.claude-tools/screenshot/shot.mjs <url> <out> 390 <height>`
   Candidates: the day/itinerary view, a destination guide, the planner.
2. Keep the existing photographic plate from the current placeholder webp.
3. Composite real screens + `logo-120.svg` onto the plate via a throwaway HTML
   compositing page (plate as background, screenshots masked into the phone
   frames, logo placed as the wordmark), screenshotted at 2x -> export a new
   `lila-product-proof-wide.webp`.
4. Swap the file and update the `<img>` alt text in `MadronaV2.tsx`.

## Notes
- Do NOT hand this to an image model to generate. Image models mangle the logo
  and UI text. Screenshot the real app instead; only regenerate the plate
  (atmosphere only, never the screens/logo) if we decide we want a fresh one.
  Given we like the current style, default to reusing the existing plate.
- Scope: Lila Trips only for now. Apply the same recipe to other product-proof
  montages (e.g. San Juan Boating Guide) afterward.
- Repo state at handoff: branch `madrona-v2-codex`, with unrelated in-flight
  changes (App.tsx, Home.tsx, Services.tsx, Work.tsx, deleted
  FeaturedCaseStudy.tsx, plus untracked build-kit docs). Commit montage work
  separately from those.
- Follow this repo's own CLAUDE.md rules (they govern positioning/product
  framing and were not in scope of the session where this plan was drafted).
