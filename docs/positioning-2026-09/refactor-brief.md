# Homepage refactor brief (2026-09-29)

The single source of truth for the agents building the homepage refactor on branch `positioning-clarity-2026-09`. Read this whole file before touching code.

## What Charlie decided (binding)

- **Refactor, not redesign.** The live homepage's shape stays: hero with a window on the right, the four areas, how we work, contact. The job is to tell the story better.
- **The story:** Madrona is a full-service digital studio with great examples. *Everything here, we built for ourselves first, and we can build it for you.* The studio's own products stop being a side "Our own apps" strip. They become proof of capabilities a business could buy.
- **Keep the four areas, in this order and with these names:** AI & Operations · Brand & Website · Growth & Retention · New Products. (Routes: `/services/ai-operations`, `/services/brand-website`, `/services/growth-retention`, `/services/new-products`.)
- **Go beyond Berry Good.** It is one example among several, never the main event.
- **Audience:** businesses and nonprofits, local and beyond. The hero does not list audiences.
- Illustrative examples are fine and wanted; they must be labeled as examples, never presented as client results.

## Hard rules

- **No em-dashes** anywhere in copy (use commas, periods, or rewrite). Curly apostrophes and quotes in visible copy.
- **Design system:** CLAUDE.md in the repo root. Tokens only (`var(--v3-*)` inside `.v3`; the sky themes re-ground them). One orange accent; at most one orange "flash" phrase per viewport. Hairlines over boxes; left-aligned two-column spreads; no decorative illustration. Windows/artifacts use the existing `.v3-artifact` + `WindowBar` (`src/pages/v3/ReadCard.tsx`) and stay light islands in dusk/night.
- **Honesty:** no invented metrics, no measured time savings, no prices, no client names. Marine inspection appears only as "a marine surveyor" and labeled illustrative ("Illustrative, based on client work in progress"). Chatbots are a capability; name no clients. Healthline: "launched Healthline's first AI patient guidance" (do not tie the 90M audience to that launch).
- **File ownership:** only edit the files your task owns. Do not edit `v3.css`, `HomeV3.tsx`, or another agent's files unless your task says so. Do **not** run git commit/checkout/reset/stash.
- **Grid gotcha:** use `minmax(0,1fr)`, never bare `1fr`, for single-column mobile tracks (bare 1fr overflowed a 390 viewport on this page).
- **Mobile:** must be clean at 390px (16px+ gutters, no horizontal overflow) and at 1440.
- **Motion:** none required. If you add any, follow the `madrona-motion` skill, respect `prefers-reduced-motion`, and keep the resting state fully visible.

## Tools

- Dev server: `http://localhost:5191/` (already running; do not start another). Add `?theme=day` / `?theme=night` / `?theme=dusk`.
- Screenshot: `node ~/.claude-tools/screenshot/shot.mjs <url> <out.png> [width] [height] [selector]` (full page when no selector). Write screenshots to `/private/tmp/claude-501/-Users-charliekoch-Developer-studio-madrona-studio-site/c30b3957-3b06-4175-a4d5-b28adbd4fabd/scratchpad/refactor/`.
- Typecheck: `npx tsc -b` from the repo root.
- Each showcase already renders on the homepage (minimal scaffold in `AreasSection.tsx`, anchors `#area-ai-operations`, `#area-brand-website`, `#area-growth-retention`, `#area-new-products`). Screenshot your area with the selector `#area-<id>`.

## Page structure (target)

1. **Hero** (`Hero.tsx`). Keep the layout, the contour chart, the two CTAs. New headline and lede that say "full-service digital studio, great examples" plainly. The right-hand window keeps the four areas but each row's chips become **real things we've built** (see capabilities below), not small-business chores.
2. **The four areas** (`AreasSection.tsx`, new; replaces `HelpSection` and the Berry Good + apps section on the homepage). One two-column spread per area, alternating sides: a rail (kicker with the area name, the area's plain question, a one-line what-we-do, a short "things we've built" list with small source tags, a link to the service page) and a **showcase** component on the other side.
3. **Why us** (`DepthSection.tsx`, fix the Healthline line per the honesty rule).
4. **How we work** (`PracticeSection.tsx`, unchanged).
5. **Contact band** (in `HomeV3.tsx`).
The Thinking section leaves the homepage.

## The four areas: content

Each question is the area's plain opener (the old ledger's voice). "Built" items carry a source tag.

**01 AI & Operations** — question: “Losing hours to work software should be doing?” — what we do: practical AI and tools on your real workflows, with a person checking anything that matters.
Built: field notes and photos into finished reports (illustrative, marine survey) · bookkeeping, invoicing, and month-end agents (/tools) · customer inbox triage (/tools/customer-inbox) · operations dashboards (Berry Good, Helm).
Showcase: `InspectionShowcase` (the field-notes-to-report workflow window).

**02 Brand & Website** — question: “Website just OK, and not doing the business justice?” — what we do: brands, websites, and online experiences designed and built to a high bar.
Built: brand systems and packaging (Berry Good) · storefronts and online ordering (Berry Good) · local guides with maps and live conditions (San Juan Boating Guide) · booking and sign-up flows.
Showcase: `BrandShowcase` (Berry Good + San Juan).

**03 Growth & Retention** — question: “People buy once, then you never hear from them again?” — what we do: the follow-up, reminders, and answers that keep people coming back, mostly automated, with a person where it counts.
Built: booking, reminder, review, and win-back automations · customer service assistants that answer from your own content (Lila Yoga answers cited to its sources) · onboarding flows (Aria, Lila Trips) · review requests and post-sale follow-up (/tools).
Showcase: `AutomationMap` (new: one customer's journey for a local service business).

**04 New Products** — question: “Have an idea that deserves to become real?” — what we do: from prototype to a launched product. We build and run our own.
Built: AI-planned itineraries and subscriptions (Lila Trips, live) · live maps and conditions (San Juan Boating Guide, live) · voice-first intake (Plainly) · stage-aware health guidance with guardrails (Aria).
Showcase: `ProductsShowcase`.

Product data, images, and links: `src/data/studioProducts.ts`. Berry Good: `src/data/proof.ts`, images imported in `src/pages/v3/BerryGoodSection.tsx`. Agent demos: `src/data/agents.ts`.

## Showcase contract

Each showcase lives in `src/pages/v3/showcase/<Name>.tsx`, exports a **named** component with **no props** (`export function AutomationMap()`), and imports its own CSS file `src/pages/v3/showcase/<name>.css`. It renders at the width of one spread column (about 560 to 640px on desktop, full width on mobile), and must hold up alone in that column. Stubs exist now; replace them.

## Reference

- The marine-survey workflow window built earlier today (hero version): `docs/positioning-2026-09/ref-workflow-panel-hero.tsx.txt`, styles `.v3-flow-*` in `src/pages/v3/home-clarity.css` (you may copy them into your own CSS; do not import home-clarity.css).
- Astra's and Claude's reviews and Charlie's decisions: `docs/positioning-2026-09/consolidated-feedback.md`.
