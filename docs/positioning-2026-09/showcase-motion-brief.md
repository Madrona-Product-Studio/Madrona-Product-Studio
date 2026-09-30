# Showcase motion + New Products brief (2026-09-29)

Charlie, on the refactored homepage: "I'd like to add a little animation to the AI operations example. Is there a way to bring that to life? Similarly with the growth and retention diagram." And: "this 'new products' section could be fine tuned a bit and lead with Helm, Lila Trips and San Juan Boating Guide. Let's not feature Plainly and Aria Health. Also that could be better designed. It's a little strange that it has things featured in two different columns. Can we clean that up a bit?"

Everything in `refactor-brief.md` still binds (tokens only, no em-dashes, curly quotes, `minmax(0,1fr)` mobile tracks, clean at 1440 and 390, day/dusk/night, no git commits, only edit files you own; honesty labels stay: "Illustrative, based on client work in progress" for the survey; "Illustrative example" for the plumbing map; product stages live/beta exactly as in `src/data/studioProducts.ts`). Motion work: load the `madrona-motion` skill (`/Users/charliekoch/Developer/studio/madrona-studio/skills/madrona-motion/SKILL.md`) first.

## Current components (your starting point; copy, do not edit)

- AI & Operations showcase: `src/pages/v3/showcase/InspectionShowcase.tsx` + `inspection.css` (before/after: rough field notes with three flagged lines, a "3 lines need the surveyor" bridge, a clean draft report with three findings and three held lines).
- Growth & Retention showcase: `src/pages/v3/showcase/AutomationMap.tsx` + `automation-map.css` (serpentine SVG flow map: Book, Visit on top; After, Later below; review fork Happy / Not happy; legend).
- New Products area: rail content in `src/pages/v3/AreasSection.tsx` (the `new-products` entry: question, does, and an "Also ours" list), showcase `src/pages/v3/showcase/ProductsShowcase.tsx` + `products.css`.

Each option is a new file in `src/pages/lab/showcase/` (a named export with no props) with its own CSS file, a copy of the current component plus your changes. Harness: `/lab/showcase` (all, grouped, each with a Replay button that remounts it) and `/lab/showcase?v=<id>` (one alone).

## Motion rules (all six motion options)

- Resting state complete and legible; a still, no-JS, and reduced motion show the finished state.
- Starts when the showcase is at least ~40% in view (IntersectionObserver), plays once, rests. No loops unless noted, and never a loop that runs forever while the visitor reads.
- Ease-out curves from the skill; no bouncy springs; sequence about 2.5 to 4.5s total; transform and opacity (and SVG stroke-dashoffset) only; no layout shift.
- The motion carries the idea (reading, sorting, a customer moving through), never decoration.

## AI & Operations (three genuinely different concepts)

- **I1 · Reading the notes** (`InsReading`, `ins-reading.css`): a soft highlight sweeps down the field notes line by line; as each sure line is read its finding writes into the report (fade and settle); flagged lines get their ? mark and land as "held" rows; the "3" in the bridge counts up as flags are found.
- **I2 · Sorting sure from unsure** (`InsSort`, `ins-sort.css`): the notes' lines separate: sure lines slide right into the report as findings, the three unsure lines lift out and stack in the middle under "3 lines need the surveyor", then settle into the held rows. The transformation as a sort.
- **I3 · Photos find their place** (`InsPhotos`, `ins-photos.css`): the photo tiles on the notes page travel into their Fig. slots in the report as the matching findings appear; the unmatched photo stays with a held line. The report assembles around the photos.

## Growth & Retention (three genuinely different concepts)

- **G1 · A customer travels the map** (`FlowTraveler`, `flow-traveler.css`): a small token (the customer) moves along the connectors node to node; each node brightens as reached; at the fork the token takes Happy while Not happy briefly highlights as the other path; ends at Books again. May replay once on hover of the map, never an endless loop.
- **G2 · The map plots itself** (`FlowPlot`, `flow-plot.css`): connectors draw (stroke-dashoffset) and nodes settle in sequence along the serpentine, like the bridge trail above it; the fork splits cleanly.
- **G3 · Your calls light up** (`FlowCalls`, `flow-calls.css`): the map is present; a quiet wave runs through the automatic nodes, then the three "your call" moments (assign the tech, tech checks the report, you call them) get a highlight ring one by one with a tiny caption; the point is the human moments.

## New Products (two layout options; static; each renders the whole area spread: rail and showcase)

Lead with Helm (beta; public demo https://helm.day/demo, never the real instance), Lila Trips (live, lilatrips.com), and San Juan Boating Guide (live, sjiboating.com). Plainly and Aria are not on the homepage. One clear layout: no second column of featured items competing with the first. The rail keeps the area kicker (04 New Products), the question "Have an idea that deserves to become real?", the one-line what-we-do, and "More on new products →" to /services/new-products, plus a quiet "See all our products →" to /apps; drop the rail's "Also ours" list.
- **N1 · One lead, two beside** (`NpFeature`, `np-feature.css`): Helm as the lead (large image, capability line, stage, link), Lila Trips and San Juan as two equal smaller tiles beneath it, all in the showcase column.
- **N2 · Three equal rows** (`NpRows`, `np-rows.css`): three rows of equal weight, each image left, name, stage, the capability it proves, and a link, in one column; no card boxes, hairline separated.
Images: use the optimized artifacts from `src/data/studioProducts.ts` (see how `ProductsShowcase.tsx` renders them with `imgProps`). Capability lines (edit lightly for rhythm, keep true): Helm "A command center people and AI agents both work from"; Lila Trips "AI-planned itineraries, with a paid unlock"; San Juan "Live maps and conditions for boaters".

## Verify

Screens at `/lab/showcase?v=<id>&theme=day` and `&theme=dusk`, 1440 and 390, settled; `document.documentElement.scrollWidth` equals the viewport at 390. Files in `/private/tmp/claude-501/-Users-charliekoch-Developer-studio-madrona-studio-site/c30b3957-3b06-4175-a4d5-b28adbd4fabd/scratchpad/showcase/`.
