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
