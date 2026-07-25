# Asset status: rejected for production

The SVG, PNG, and PDF logo reconstructions in this directory do not faithfully
match the approved raster identity direction.

Do not use these reconstructed logo files in production.

## Source of truth

The approved visual direction is documented in:

- `references/logo-system-reference.png`
- `references/website-usage-guide-reference.png`

These raster boards are reference material, not production logo files.

## Required replacement workflow

1. Use the approved raster logo as the sole visual source of truth.
2. Separate the forest and terracotta silhouettes by color.
3. Trace those silhouettes into editable vector paths.
4. Clean nodes and Bézier curves manually.
5. Rebuild only the outer arc as precise circular geometry.
6. Identify and license the exact wordmark typeface, or outline the approved lettering.
7. Use tightly fitted, transparent viewboxes.
8. Build light, reversed, monochrome, standalone, stacked, and app-icon variants from the same master artwork.
9. Overlay every vector against the approved raster at partial opacity.
10. Do not approve an export until silhouette, typography, spacing, and proportions match.

## Temporary website assets

Until replacement vectors are approved, the Codex V2 lab uses the earlier
web-ready assets in:

`docs/madrona-v2-build-kit/brand/madrona/web/`
