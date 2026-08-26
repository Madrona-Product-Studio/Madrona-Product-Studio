# Codex handoff

## What is built

- `/v3`: a preview-only homepage with the six sections in the redesign brief: now strip, artifact-led hero, four service doors, skills and stack, proof, and thinking plus the forest CTA/footer.
- A shared, data-driven service page component at `src/pages/v3/ServicePageV3.tsx`.
- `/v3/consulting/work-smarter`: the flagship Operations and AI door, using the shared template and canonical content from `src/data/services.ts`.
- A dedicated `src/pages/v3/v3.css`. No live page, nav component, or `madrona-v2.css` rule was edited.
- Rendered signal-report, what-changed, workflow, and review artifacts in the established white-card and hairline idiom.

## Decisions

- Kept the preview routes on the existing nav and footer so the exploration tests content design rather than introducing a second chrome system.
- Used the existing Salish Sea editorial hero and product-proof imagery. No generated or synthetic placeholder imagery was added.
- Kept the other three homepage doors linked to their existing consulting anchors until their V3 sub-pages exist. Work smarter links to the new V3 flagship route.
- Marked both previews `noindex`.
- Used restrained interaction feedback only: quick button press states and background/color transitions, with reduced-motion handling.

## QA and known gaps

- `npm run build` passes, including TypeScript, Vite, and prerender.
- Screenshot QA completed for both routes at 1440px and 390px. Captures were written to `/private/tmp/madrona-v3-*.png` for this local session.
- Full-repository `npm run lint` still fails on five pre-existing errors in untouched files: `RouteMotion.tsx`, `ArticleTemplate.tsx`, `BerryGoodCaseStudy.tsx`, and `MadronaV2Home.tsx`. The new V3 files pass targeted ESLint.
- Image needs and omitted unsupported proof are listed in `IMAGERY-GAPS.md`.
- The shared template is ready for the other service doors, but only Work smarter is routed in this first swipe as requested.

## Round two: hero lab

Three new hero directions are available together at `/v3/hero-lab`, and individually on the homepage through `/v3?hero=a`, `/v3?hero=b`, and `/v3?hero=c`. The original first-swipe hero remains the default when no query is present.

- **A, Layered cluster:** headline and CTAs on the left; a right-bleed Salish Sea image supports an overlapping example diagnostic plus Built at and Stack panel. This is the closest translation of the CXO reference.
- **B, Full-bleed environment:** the environmental image becomes the full hero field, with a paper headline scrim, floating diagnostic and maturity cards, and an evidence band along the bottom edge.
- **C, Working surface:** the right side becomes a composed Berry Good operating surface, layering the what-changed brief, signal check, workflow, and review artifacts over the demonstration dashboard.

My ranking is **A, then C, then B**. A has the clearest one-viewport story and strongest balance of place, proof, and legibility. C is the most ownable Madrona direction because the work itself becomes the signature art, but its density will require disciplined artifact editing. B has the greatest environmental presence, though the full-bleed photograph competes with the diagnostic information and feels less product-specific.

All variants were screenshot-tested at 1440px and 390px. On narrow screens, overlaps resolve into a deliberate card sequence and environmental imagery crops without horizontal overflow. The round-two captures are in `/private/tmp/v3-hero-{a,b,c}-{desktop,mobile}.png` for this local session.

## Round three: current direction

The no-query `/v3` hero now uses the selected full-bleed direction. It reuses the live homepage's exact six-image set and sequence (`hero-2`, `hero-1`, then `hero-3` through `hero-6`), with its 9-second dwell, 2.6-second crossfade, progressive lazy loading after the first two frames, and manual cycle control. Reduced-motion freezes the automatic rotation on the first frame and removes the crossfade and progress animation.

The first viewport is organized into three jobs:

- A paper scrim carries the headline, descriptor, and dual CTA.
- A two-card cluster shows the four canonical service doors from `services.ts` and one clearly labeled signal-check example.
- A solid Next steps band publishes the three engagement steps and links to How we work.

At 390px, the scrim and two cards stack over the rotating image field, followed by a vertical three-step list. The earlier A, B, and C experiments remain available by query and in `/v3/hero-lab`; the lab now leads with this direction under “Current direction.” Round-three screenshots are in `/private/tmp/v3-round3-{desktop,mobile}.png` for this local session.
