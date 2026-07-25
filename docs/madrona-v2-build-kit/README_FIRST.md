# Read this first

This package is the source of truth for the Madrona Product Studio V2 concept build.

## Required execution order

1. Inspect the current Madrona repository and its routes, tokens, fonts, layout primitives, image handling, and build commands.
2. Inspect the Berry Good, Lila Trips, and San Juan Boating Guide repositories for accurate brand and product assets.
3. Read `CLAUDE_CODE_BRIEF.md` and the files in `docs/`.
4. Review `references/homepage-north-star.png` before writing layout code.
5. Build `/lab/madrona-system` first.
6. Build the static shell of `/lab/madrona-v2` second.
7. Add the Berry Good interactions from the local fixtures.
8. Replace the generated Lila and San Juan placeholder mockups with repository-accurate assets where practical.
9. Test responsive behavior, accessibility, reduced motion, and build performance.
10. Stop after the two noindex lab routes and report what was built, what was reused, and what still needs replacement.

## Guardrails

- Do not modify public production routes.
- Do not invent clients, outcomes, testimonials, or metrics.
- Berry Good is a Madrona demonstration business, not a client.
- Lila Trips and San Juan Boating Guide are products Madrona builds and operates.
- Generated people, place, and product images are placeholders.
- Use the supplied SVG logo files. Do not redraw the logo from a screenshot.
- The homepage north-star image is the primary visual reference.
