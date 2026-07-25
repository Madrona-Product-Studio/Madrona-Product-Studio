# Madrona V2 handoff

## Status

- Working branch: `madrona-v2-codex`
- This is the selected direction to continue toward `main`.
- Do not merge or push to `main` without Charlie's explicit approval.
- The implementation is available at `/lab/madrona-v2`.
- The supporting service detail page is at `/lab/madrona-v2/services`.
- The design-system study is at `/lab/madrona-system`.

## What is implemented

### Homepage concept

- Static Madrona logo assets in the header and footer.
- Pacific Northwest island hero using Charlie's photograph, with a soft
  container-level fade and responsive crop.
- Refined four-audience section with photography and integrated line icons.
- Three-part service architecture:
  - Brand and growth
  - New Products & Services
  - Operations and AI
- Consistent evidence-path overlays across all three service cards.
- Service CTA links to the dedicated V2 service-detail page.
- Berry Good interactive example experience.
- Lila Trips product module built from real product marketing assets.

### Berry Good example experience

The desktop case study uses five keyboard-accessible tabs and mobile uses a
stacked presentation:

1. Brand system
2. Digital storefront
3. Customer journey
4. Operations
5. AI assistance

The current final marketing artwork lives in:

`docs/madrona-v2-build-kit/product-proof/berry-good/`

For direct desktop QA, append one of these query parameters:

- `?berry=brand`
- `?berry=storefront`
- `?berry=journey`
- `?berry=operations`
- `?berry=ai`

Brand system remains the normal default.

### Lila Trips

The homepage module now uses real marketing assets synchronized from:

`/Users/charliekoch/Developer/apps/lilatravel/public/marketing`

The checked-in destination assets live in:

`docs/madrona-v2-build-kit/product-proof/lila/`

Run `node scripts/sync-lila-marketing-assets.mjs` when the source marketing
exports change. The older montage-specific plan remains in
`docs/montage-handoff.md` for provenance, but its fake-screen replacement task
has been superseded by the real marketing-asset implementation.

## Asset and build scripts

- `scripts/build-hero-options.mjs`
  Builds the homepage hero variants.
- `scripts/create-photo-contact-sheet.mjs`
  Creates a contact sheet for evaluating source photography.
- `scripts/derive-static-logo-assets.mjs`
  Derives static logo treatments from the supplied logo package.
- `scripts/prepare-berry-replacement-assets.mjs`
  Converts the six supplied Berry Good compositions to optimized WebP without
  destructive cropping.
- `scripts/sync-lila-marketing-assets.mjs`
  Copies and prepares the selected real Lila marketing exports.
- `scripts/crop-montage-capture.mjs`
  Retained utility from the earlier montage exploration.

## Key implementation files

- `src/pages/lab/MadronaV2.tsx`
- `src/pages/lab/MadronaV2Services.tsx`
- `src/pages/lab/BerryGoodCaseStudy.tsx`
- `src/pages/lab/MadronaSystem.tsx`
- `src/pages/lab/madrona-v2.css`
- `src/App.tsx`

## Source packages retained for handoff

- `docs/madrona-v2-build-kit/`
- `docs/berry-good-codex-package/`
- `docs/madrona_logo_assets/`
- `docs/madrona_static_logo_assets/`

These include reference imagery, briefs, tokens, fixtures, logo treatments,
and the selected optimized product-proof assets. They are intentionally
checked in so the design decisions can be reproduced.

## Related existing-site cleanup

The same branch also contains the supporting clarity edits made while
developing the new direction:

- Adds the three lab routes.
- Renames the existing navigation label from “Work” to “Studio work.”
- Clarifies that the Work page contains Madrona-owned products and experiments,
  not client case studies.
- Tightens the existing Home and Services messaging.
- Removes the now-unused `FeaturedCaseStudy` component.

## Verification

Run:

```bash
npm run build
npm run lint
```

The final Berry Good integration was rendered in desktop and mobile Chrome.
The storefront uses separate desktop and mobile compositions. The three wide
tab compositions use `object-fit: contain`, preserving all UI and labels.

## Next decisions

- Decide when the V2 concept should replace the current root homepage.
- Decide whether `/lab/madrona-v2/services` becomes the production `/services`
  page or is selectively merged into the existing page.
- Replace static logo exports if/when final vectors are approved.
- Continue refining real Lila marketing exports in the Lila repository, then
  rerun the sync script here.
- Merge to `main` only after a final production-route and content review.
