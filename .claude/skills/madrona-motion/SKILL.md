---
name: madrona-motion
description: Motion and animation best practices for every Madrona product surface — the decision framework, easing curves, durations, physicality, springs, gestures, performance rules, and accessibility that make interfaces feel right. Use when building or reviewing any animation, transition, hover/press state, drawer, toast, popover, or gesture across Madrona app design systems. Derived from Emil Kowalski's design engineering philosophy (animations.dev).
---

# Madrona Motion

Studio-level motion standards, reusable across every Madrona app design system
(`madrona-v2`, `lila-yoga`, and future products). The substance is distilled
from **Emil Kowalski's** design engineering philosophy
([animations.dev](https://animations.dev/)) — the person behind Sonner and Vaul.
These were first proven on Lila Trips; this skill is the portable version so the
same craft bar applies everywhere.

Use it two ways:

- **Building** — read the decision framework and [STANDARDS.md](STANDARDS.md)
  before writing animation code, so motion is justified, correctly eased,
  fast, physically plausible, performant, and accessible from the start.
- **Reviewing** — apply [REVIEW.md](REVIEW.md), which sets a high craft bar
  with non-negotiable standards and a required Before/After output format.

Product design systems already encode a piece of this (e.g. `madrona-v2`'s
interaction spec: "Motion is fast and restrained, 150–300ms"). This skill is the
full reference behind that one-liner.

## Core philosophy

- **Taste is trained, not innate.** Reverse-engineer animations you admire,
  inspect interactions, and ask *why* something feels good. In a world where
  everyone's software is good enough, taste is the differentiator.
- **Unseen details compound.** Most motion details users never consciously
  notice — that's the point. The aggregate of invisible correctness is what
  makes an interface feel loved.
- **Beauty is leverage.** People choose tools on the whole experience, not just
  function. Good defaults and good motion are real differentiators.

## The animation decision framework

Answer these in order **before** writing any animation code.

### 1. Should this animate at all?

Match motion to how often the user sees it.

| Frequency | Decision |
| --- | --- |
| 100+/day (keyboard shortcuts, command-palette toggle) | No animation. Ever. |
| Tens/day (hover effects, list navigation) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, feedback, celebrations) | Can add delight |

**Never animate keyboard-initiated actions** — they repeat hundreds of times a
day and animation makes them feel slow. Raycast has no open/close animation, and
that's correct for something used that often.

### 2. What is the purpose?

Every animation must answer "why does this animate?" Valid purposes: **spatial
consistency**, **state indication**, **explanation**, **feedback**, **preventing
a jarring change**. "It looks cool" on a frequently-seen element is not valid —
when in doubt, delete it.

### 3. What easing?

- Entering / exiting → **`ease-out`** (starts fast, feels responsive)
- Moving / morphing on screen → **`ease-in-out`**
- Hover / color change → **`ease`**
- Constant motion (marquee, progress) → **`linear`**
- Default → **`ease-out`**

**Never `ease-in` on UI** — it delays the exact moment the user is watching.
Built-in CSS easings are too weak; use strong custom curves (see STANDARDS.md).

### 4. How fast?

UI animations stay **under 300ms**. Button press 100–160ms, tooltips 125–200ms,
dropdowns 150–250ms, modals/drawers 200–500ms. Marketing can be longer. Faster
*feels* more performant — a 180ms dropdown reads as snappier than a 400ms one.

## What's in the reference

Load [STANDARDS.md](STANDARDS.md) for the precise values and patterns — cite it
rather than approximating:

- Easing curves (`cubic-bezier` values) and duration tables
- Physicality: never `scale(0)`, origin-aware popovers, press feedback
- Springs (Apple-style vs physics config, when to use)
- Interruptibility (transitions vs keyframes, `@starting-style`)
- Asymmetric enter/exit timing
- Performance (GPU-only properties, Framer Motion caveats, WAAPI)
- Transforms & `clip-path` techniques
- Gestures & drag (momentum, damping, pointer capture)
- Stagger, blur-masked crossfades, accessibility, debugging, cohesion

## Applying this across products

1. In any Madrona repo, read this SKILL and the relevant STANDARDS section
   before touching motion code.
2. Prefer the shared easing curves and duration budgets as design tokens
   (`--ease-out`, `--ease-in-out`, `--ease-drawer`) so every product feels
   coherent.
3. Run [REVIEW.md](REVIEW.md) on any diff that adds or changes animation before
   it ships — approval is earned, not assumed.
4. **Visual QA is required**: screenshot the rendered surface and inspect motion
   (in slow motion / next-day fresh eyes) before declaring UI work done.
