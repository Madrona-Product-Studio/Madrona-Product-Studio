# OG image system

Production OG image: `public/og-image.jpg` (1200×630 JPG, referenced from `index.html` OG/Twitter/JSON-LD tags).

**Shipped design: D4** (`og-d4.html`) — approved reversed emblem (large, leading) + wordmark set live in
Poppins 600 over `hero-1.webp` (golden-hour Salish Sea bluff) with a radial ink scrim.

Built per the fleet `/og-image` skill (`~/Developer/.claude/skills/og-image/`).

## Provenance & constraints

- **Logo assets:** `docs/madrona_static_logo_assets/` (approved raster system). Reversed variants on dark/scrimmed
  surfaces only; never scale rasters past native resolution (emblem 369px, full logo 1138×400).
- **Wordmark type:** Poppins 600 is a close visual match to the approved raster face (verified side-by-side in
  `font-check.html`). It is an **approximation** — when the official vector wordmark lands, swap it in.
- **Photography:** `docs/madrona-v2-build-kit/site-assets/hero-1.webp` (real PNW photography, same source as the homepage hero).
- **`plate-bark.png`:** madrona-bark macro generated via Codex (`codex exec 'Use $madrona-image-studio …'`) for the
  B/C2 candidates. Not shipped, kept for sub-page/system use.

## Re-render

```
node ~/.claude-tools/screenshot/shot.mjs "file://$(pwd)/marketing/og/og-d4.html" /tmp/og.png 1200 630
sips -s format jpeg -s formatOptions 85 -z 630 1200 /tmp/og.png --out public/og-image.jpg
```

(The screenshot tool renders at 2x; the sips step downsamples to the final 1200×630.)

`candidates.html` is the comparison contact sheet of every explored direction (A1/A2/B/C1/C2/D/D2–D4).
The old `public/og-image.png`, `og-image-linkedin.png`, and `og-image.svg` are superseded and unreferenced.
