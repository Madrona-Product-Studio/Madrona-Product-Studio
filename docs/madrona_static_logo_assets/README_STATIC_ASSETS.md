# Temporary static logo assets

These files use the approved raster logo as the source of truth while the final
vector reconstruction is still in progress.

## Recommended website usage

- Light desktop header:
  `madrona-approved-logo-offwhite.png`
- Responsive header:
  use one of the `madrona-logo-*-at-2x.png` files
- Favicon:
  `madrona-favicon-32.png` and `madrona-favicon-64.png`
- Social avatar or compact brand mark:
  `madrona-approved-emblem-offwhite.png`
- Dark footer:
  `madrona-approved-logo-reversed-transparent.png`
- Compact mark on dark surfaces:
  `madrona-approved-emblem-reversed-transparent.png`
- Transparent convenience versions:
  use only on white or very light neutral backgrounds

## Important constraints

- Use only the derived reversed assets on dark backgrounds.
- Do not enlarge it beyond its native cropped width.
- Use `object-fit: contain`; never stretch or skew it.
- Keep the source image proportions unchanged.
- The off-white background sampled from the approved artwork is
  approximately rgb(253, 249, 246).
- Treat these as temporary production assets until the manually reconstructed
  vector is approved.
- Rebuild the derived reverse set with
  `node scripts/derive-static-logo-assets.mjs` when the approved raster changes.

## Example HTML

```html
<img
  src="/brand/madrona-approved-logo-offwhite.png"
  alt="Madrona Product Studio"
  width="280"
  height="auto"
/>
```

## Example CSS

```css
.site-logo {
  display: block;
  width: clamp(180px, 22vw, 280px);
  height: auto;
  object-fit: contain;
}
```
