# Madrona Product Studio — Website Logo Implementation Brief

## Objective

Replace the current Madrona Product Studio logo across the website with the approved final logo system in this package. Use the supplied SVG files directly wherever possible. Do not redraw, trace, recolor, distort, or recreate the logo in CSS.

## Approved assets

### Primary logo on light backgrounds
Use:

`madrona_primary_horizontal_logo.svg`

Recommended locations:
- Desktop site header
- Light navigation bars
- About page header
- Proposal or contact page mastheads
- Open Graph cards with a light background

### Primary logo on dark backgrounds
Use:

`madrona_primary_horizontal_logo_reversed.svg`

Recommended locations:
- Dark forest-green footer
- Dark navigation or promotional panels
- Dark presentation or social graphics

### Standalone mark on light backgrounds
Use:

`madrona_standalone_mark.svg`

Recommended locations:
- Favicon source
- Social avatar
- Small mobile layouts
- Compact branded badges
- Loading or splash states

### Standalone mark on dark backgrounds
Use:

`madrona_standalone_mark_reversed.svg`

Recommended locations:
- Dark social avatars
- Dark app icon treatments
- Small marks inside dark footer or CTA sections

### Stacked lockup
Use:

`madrona_stacked_lockup.svg`

Recommended locations:
- Narrow centered layouts
- Printed collateral
- End cards
- Square promotional graphics

### App icon treatments
Use:

- `madrona_app_icon_light.svg`
- `madrona_app_icon_dark.svg`

Recommended locations:
- PWA icons
- App tiles
- Social profile artwork
- Rounded-square UI placements

## Website implementation

### 1. Desktop header
Use the primary horizontal SVG:

```html
<img
  src="/brand/madrona_primary_horizontal_logo.svg"
  alt="Madrona Product Studio"
  class="site-logo"
/>
```

Recommended starting CSS:

```css
.site-logo {
  display: block;
  width: clamp(190px, 18vw, 280px);
  height: auto;
}
```

Keep the logo vertically centered in the navigation. Do not crop the emblem or compress the wordmark.

### 2. Mobile header
Use either:
- the primary horizontal logo at approximately 150–190 px wide, or
- the standalone mark beside a text label when horizontal space is limited.

Do not reduce the full horizontal logo below 120 px wide.

### 3. Footer
For a footer using Forest Green, use the reversed horizontal logo:

```html
<img
  src="/brand/madrona_primary_horizontal_logo_reversed.svg"
  alt="Madrona Product Studio"
  class="footer-logo"
/>
```

Recommended starting CSS:

```css
.footer-logo {
  display: block;
  width: min(240px, 70vw);
  height: auto;
}
```

### 4. Favicon
Use `madrona_standalone_mark.svg` as the vector source and the included PNG app icons where raster files are required.

Suggested document head:

```html
<link rel="icon" href="/brand/madrona_standalone_mark.svg" type="image/svg+xml" />
<link rel="icon" href="/brand/madrona_app_icon_light_1024px.png" type="image/png" />
<link rel="apple-touch-icon" href="/brand/madrona_app_icon_light_1024px.png" />
```

Generate additional platform-specific favicon sizes from the SVG only when required by the framework.

### 5. Open Graph and social cards
Use the primary horizontal logo on an Off White background. Use the reversed logo when the card background is Forest Green or a dark photograph.

Keep the logo clearly separated from headlines and imagery. Do not place the logo over visually busy areas without a solid or translucent backing panel.

### 6. Social avatar
Use the standalone mark rather than the full wordmark. The light app icon works on neutral surfaces; the dark app icon works well against platform chrome and photographs.

## Brand colors

```css
:root {
  --madrona-forest-green: #1F3B33;
  --madrona-terracotta: #C86A3D;
  --madrona-charcoal: #222222;
  --madrona-mist-gray: #A8A8A8;
  --madrona-off-white: #F7F4EF;
}
```

Use these values consistently. Do not substitute nearby colors unless required for accessibility, and do not recolor individual pieces of the supplied logo.

## Background rules

### Light backgrounds
Use:
- `madrona_primary_horizontal_logo.svg`
- `madrona_standalone_mark.svg`
- dark monochrome versions when color is unavailable

Preferred backgrounds:
- White
- Off White `#F7F4EF`
- Very light neutral gray

### Dark backgrounds
Use:
- `madrona_primary_horizontal_logo_reversed.svg`
- `madrona_standalone_mark_reversed.svg`
- white monochrome versions when needed

Preferred dark background:
- Forest Green `#1F3B33`

## Clear space

Maintain clear space around the logo equal to at least the approximate height of the lowercase “m” in the wordmark.

Do not allow:
- navigation text to touch the logo
- containers to crop the circular mark
- images, rules, or buttons to intrude into the clear-space area

## Minimum sizes

- Primary horizontal logo: 120 px wide minimum; 180 px or greater preferred
- Standalone mark: 32 px minimum; 48 px or greater preferred
- Stacked lockup: 140 px wide minimum

At very small sizes, use the standalone mark and remove the wordmark rather than shrinking the complete logo until the subtitle becomes illegible.

## Prohibited changes

Do not:
- stretch or compress the SVG
- rotate or skew the mark
- alter the circle geometry
- reposition the tree, bluff, or water lines
- change the relationship between the emblem and wordmark
- substitute another typeface inside the logo
- apply drop shadows, bevels, gradients, outlines, or animation to the internal logo artwork
- place the full-color logo on a dark or low-contrast background

The entire SVG may fade or move as one element during a subtle page transition, but its internal pieces should not animate independently.

## File organization

Copy the supplied files into a stable public directory, for example:

```text
/public/brand/
  madrona_primary_horizontal_logo.svg
  madrona_primary_horizontal_logo_reversed.svg
  madrona_standalone_mark.svg
  madrona_standalone_mark_reversed.svg
  madrona_stacked_lockup.svg
  madrona_app_icon_light.svg
  madrona_app_icon_dark.svg
```

Reference these canonical files from all components. Do not duplicate edited copies across feature folders.

## Component recommendation

Create one reusable logo component with explicit variants rather than hardcoding paths throughout the site.

Example React/TypeScript interface:

```tsx
type MadronaLogoVariant =
  | "horizontal"
  | "horizontal-reversed"
  | "standalone"
  | "standalone-reversed"
  | "stacked";

interface MadronaLogoProps {
  variant?: MadronaLogoVariant;
  className?: string;
  priority?: boolean;
}
```

Map each variant to its approved SVG file. Always render meaningful alt text for a linked primary logo. Use an empty alt attribute only when the mark is purely decorative and the adjacent text already names the business.

## Acceptance checklist

- [ ] Desktop header uses the approved primary horizontal SVG
- [ ] Mobile header remains legible and does not crop the emblem
- [ ] Footer uses the reversed version on Forest Green
- [ ] Favicon uses the standalone mark
- [ ] Social avatar uses the standalone mark, not the full wordmark
- [ ] Logo aspect ratio is preserved everywhere
- [ ] Clear space is maintained
- [ ] No local recoloring or geometry edits were added
- [ ] Old logo files and references are removed or redirected
- [ ] Header, footer, favicon, and social metadata are checked in production builds

## Source of truth

The SVG files in this package are the canonical implementation assets. PNG and PDF files are exports for compatibility and should not replace SVG files in normal website use.
