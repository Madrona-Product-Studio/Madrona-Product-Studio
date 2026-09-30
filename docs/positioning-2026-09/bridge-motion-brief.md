# Bridge strip motion brief (2026-09-29)

Charlie picked option B from the transition round: a strip of the four areas that bridges the hero and "Here's what we build." His reaction to the first build (`src/pages/lab/transition/TransitionPreview.tsx` `BridgeStrip`, styles `.tr-bridge*` in `src/pages/lab/transition/transition.css`, live at `/lab/transition/b?theme=dusk`): **"it kinda just sticks out, which I know is kinda the point, but I wish it was a little more elegant and interesting."** Make it come alive.

**Diagnosis of the current strip:** an opaque cream slab with the same visual weight as the hero window, so in dusk and night it competes with the hero instead of handing off from it; fully static; four identical ↓ arrows read as UI chrome.

Everything in `refactor-brief.md` still binds (tokens only, no em-dashes, curly quotes, `minmax(0,1fr)` mobile tracks, clean at 1440 and 390, day/dusk/night, no git commits, only edit files you own). Load the `madrona-motion` skill (at `/Users/charliekoch/Developer/studio/madrona-studio/skills/madrona-motion/SKILL.md`, and the motion rules it points to) before writing any animation.

## Content (all four options)

The four areas, in order, each a jump link to its section anchor: `#area-ai-operations`, `#area-brand-website`, `#area-growth-retention`, `#area-new-products`. Area data (name, question, built items) is exported as `areas` from `src/pages/v3/AreasSection.tsx`. Short capability words used today: AI & Operations "Reports, finance agents, inbox triage"; Brand & Website "Brands, storefronts, local guides"; Growth & Retention "Follow-up, reviews, onboarding"; New Products "Prototype to launched product".

## Harness

`src/pages/lab/bridge/BridgePreview.tsx`: `/lab/bridge` shows all four stacked live (each under its own hero); `/lab/bridge?v=a|b|c|d` shows one on the full homepage (Hero, the bridge, then the real AreasSection, whose first section gets class `br-after` which removes its top border). Each option is a named export with no props in its own file with its own CSS (`bridge-trail.css`, etc.). It renders directly after the hero section; it may pull itself up into the hero with negative margin and may style the hero's bottom padding via the page class (`.br-a`, `.br-b`, ... on the page root) but must not edit `Hero.tsx`.

## The four directions (genuinely different; do not converge)

- **A · Trail (`BridgeTrail`).** No card. A thin path runs left to right across the width with four waypoints (the areas) sitting on it, like a route on the contour chart above. On first view the line draws itself (stroke-dashoffset) and each waypoint fills as the line reaches it; its label settles in. Hover or focus a waypoint: the dot grows slightly and the label darkens. On phones: a vertical trail. Meaning: a journey through the work.
- **B · Rolling capabilities (`BridgeRoll`).** A quieter strip: translucent or hairline-only, much lighter than the current slab, so the hero's contour ground shows through in dusk and night. Each area's second line slowly rolls through real built things from `areas[i].built` (e.g. Field notes into draft reports → Finance agents → Customer inbox triage), staggered per column, a vertical roll with a soft fade, a long pause between rolls (at least 3s), pausing on hover and when offscreen. Meaning: there is a lot behind each area.
- **C · Peek (`BridgePeek`).** A light hairline strip that settles in on load (a gentle rise and fade, staggered). Hover or focus an area and it lifts a few pixels and reveals a small preview of its showcase (a tiny, simplified rendition in HTML/CSS, not a screenshot: a notes page for AI & Ops, a brand swatch or storefront tile for Brand, three nodes and a fork for Growth, a device tile for New Products). Touch devices: previews show as a small static glyph beside each name instead of hover. Meaning: a taste of what's below.
- **D · Index tabs (`BridgeTabs`).** Four folder-divider tabs rise from the top edge of the next section into the hero, like dividers in a drawer: the section below gets a paper-like top edge with four tab shapes; each tab carries the number and area name. On load the tabs slide up in sequence. Hover or focus lifts a tab and reveals its short capability words. On phones: two rows of tabs or a horizontally scrollable tab row with no page overflow. Meaning: an index into the drawer of work.

## Motion rules

- Resting state complete and legible: a still frame, no-JS, and `prefers-reduced-motion: reduce` must show the finished state (drawn line, first capability, strip in place).
- Ease-out curves (the skill's), no bouncy springs; entrance sequences under ~1.8s; loops (B only) slow and pausable.
- Transform and opacity only (plus stroke-dashoffset for SVG lines). No layout shift.
- Trigger entrances when the element enters the viewport (IntersectionObserver), not on page load if offscreen.
- Keyboard: every area is a real link with a visible focus state.
- Day, dusk, and night: no opaque slab that fights the hero; use tokens; if you use a light island, justify it.

## Verify

Screenshots of `/lab/bridge?v=<x>&theme=dusk` and `&theme=day` at 1440 and 390, settled; confirm `document.documentElement.scrollWidth` equals the viewport width at 390. Put files in `/private/tmp/claude-501/-Users-charliekoch-Developer-studio-madrona-studio-site/c30b3957-3b06-4175-a4d5-b28adbd4fabd/scratchpad/bridge/`.

## Choreography (Charlie, added mid-run, binding for the winner)

The hero's this-week animation plays first; the bridge's entrance waits for it. `src/pages/v3/heroSequence.ts` exposes `afterHero(cb)`: it fires when the hero announces it has settled (about 3.8s after the hero window comes into view), or after a 5.2s fallback. The bridge should start its entrance only when it is in view AND `afterHero` has fired, except: if the visitor has scrolled the hero mostly out of view, play immediately; under reduced motion, show the settled state immediately. Options built before this note get the wiring when the winner is integrated.
