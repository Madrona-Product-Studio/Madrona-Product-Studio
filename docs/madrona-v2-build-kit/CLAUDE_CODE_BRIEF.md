# Madrona Product Studio V2 concept build

## Objective

Create a high-fidelity, noindex V2 design system and homepage concept that feels simple, fast, sharp, warm, senior, interactive, and easy to understand. The result should closely follow `references/homepage-north-star.png` while using accurate repository assets and honest content.

Build only:

- `/lab/madrona-system`
- `/lab/madrona-v2`

The current public site must remain intact.

## Audience

Established, owner-led businesses that have outgrown the digital side of the business. Relevant contexts include farms and food, outdoor and travel, health and wellness, and shops and services.

## Positioning

**Primary headline:** Make the digital side of your business work as well as the business itself.

**Supporting copy:** Madrona helps established businesses improve how they look, sell, and operate. We clarify the problem, design the right solution, and build it with a small senior team.

**Operating model:** Charlie leads every engagement. Senior designers, engineers, researchers, and specialists join when the work calls for them. There is no account team and no handoff to junior staff.

## Service architecture

1. **Brand and web** — Look as good as the business actually is.
2. **Customers and growth** — Make it easier to understand, buy, return, and stay connected.
3. **Operations and AI** — Remove repetitive work and make the business easier to run.

## Proof architecture

- **Berry Good Berry Farm:** an explicitly labeled demonstration of one business improved end to end.
- **Lila Trips and San Juan Boating Guide:** products Madrona builds and operates. They are proof of product judgment and execution, not cross-sells.
- Do not show every prototype. Lead with the strongest live proof.

## Homepage sequence

1. Header
2. Split hero
3. Audience recognition strip
4. Three service areas with useful miniature artifacts
5. Berry Good end-to-end workbench
6. Products Madrona builds and runs
7. Senior studio model
8. Capability sequence from strategy to working software
9. Split conversion CTA
10. Dark forest footer

## Berry Good workbench

Create three connected views:

### Brand system

Show identity, palette, typography, voice before-and-after, and applications. Use the fixtures in `fixtures/berryGoodBrand.ts`.

### Order journey

Show fragmented current ordering versus a designed journey. Include a short deterministic sample order that reveals a customer confirmation and an internal structured order.

### Order intake agent

Use the three fixture scenarios in `fixtures/berryGoodOrders.ts`. Show input, meaningful processing stages, structured output, uncertainty, and explicit human review. Avoid a generic chatbot presentation.

## Product proofs

### Lila Trips

Use repository-accurate assets where possible. Create a compact scenario switcher that changes pace, preference, or duration and updates a coherent day plan. The proof is thoughtful product logic, not merely itinerary generation.

### San Juan Boating Guide

Use repository-accurate map and product assets where possible. Create a compact route comparison using `fixtures/sanJuanRoutes.ts`. Clearly label it as interface demonstration data, not navigational advice.

## Design direction

- Use the supplied logo and exact source colors.
- Preserve warm paper, deep forest, bark orange, and dark ink.
- Use Inter as the primary site typeface and Fraunces as a selective editorial accent.
- Use tonal grouping rather than endless hairlines.
- Use wider layouts for artifacts, maps, and workflows.
- Organic image masks may echo the open-circle/bluff idea, but should not decorate every section.
- Product identities may live inside a consistent Madrona shell.
- Every heading must communicate useful information by itself.

## Interaction rules

Every interaction must reveal useful information. No typewriter effects, autoplay carousels, scroll hijacking, theatrical loading, hover-only content, or decorative 3D. Respect reduced motion. Default states must already communicate value.

## Technical guardrails

Use static local fixtures. Do not add databases, authentication, external APIs, live agents, commerce, or a CMS. Avoid large new dependencies. Preserve current build performance. Lab routes must be noindex.

## Required deliverables

- Working noindex lab routes
- Reusable V2 components
- Structured data separated from component code
- Screenshots at 375px, 768px, and 1440px
- Asset inventory and replacement list
- Accessibility and reduced-motion notes
- Lint, typecheck, test, and build results
- Concise implementation summary
