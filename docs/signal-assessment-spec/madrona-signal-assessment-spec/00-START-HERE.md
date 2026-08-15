# Madrona Signal Assessment
## Start Here — Claude Code + Codex handoff

### What we are building

Madrona is prototyping a short, high-design business assessment that helps an owner or operator understand where focused product work could create the most leverage.

This is **not** a quiz, Typeform, lead-capture form, or consulting scorecard.

The experience should feel like a sophisticated product that is actively:

- listening
- interpreting
- weighting signals
- changing its hypothesis
- finding relationships
- forming a useful recommendation

The defining product interaction is a persistent animated visualization called the **Signal Brain**.

The emotional goal is:

> “This thing is actually building a picture of my business as I answer.”

The assessment must itself be proof of the kind of sophisticated digital product Madrona can build.

---

# Source-of-truth documents

Read these documents **in order before coding**:

1. `01-ENGINE-SPEC.md`
   - questions
   - answer weights
   - signal model
   - pathway scoring
   - archetype rules
   - result logic
   - debug fixtures

2. `02-INTERFACE-MOTION-SPEC.md`
   - overall interface architecture
   - dark-mode visual system
   - layout
   - typography
   - answer controls
   - progress
   - transition behavior
   - result screen
   - responsive behavior
   - accessibility

3. `03-SIGNAL-BRAIN-SPEC.md`
   - signature visualization
   - graph model
   - visual layers
   - deterministic layout
   - “thinking” state machine
   - signal propagation
   - route strengthening
   - attractor / “arcing toward something” behavior
   - motion timing
   - implementation details
   - `/signal-brain-lab`

4. `04-CONTENT-COPY.md`
   - polished question language
   - interstitial copy
   - archetype language
   - capability copy
   - CTA language
   - AI / privacy claims
   - copy rules

The reference image `reference-signal-brain.png` is **directional inspiration for the Signal Brain only**. The goal is not to trace it literally. Preserve its strongest ideas:

- a graph with a visible current route
- dim latent routes
- active nodes that glow when confirmed
- curved paths that visibly change direction
- a stronger destination / “gravity well” emerging on the right
- concentric activity around a likely outcome
- a sense that the system is actively deciding where the evidence is leading

---

# Critical implementation principle

**Do not build a conventional form and add a visualization afterward.**

The Signal Brain is not decoration. It is a first-class product component and should drive the experience architecture.

The recommended implementation sequence is:

## Phase 1 — Engine
Build the scoring engine and test profiles with no visual polish.

Definition of done:
- all questions render from data
- all answer weights apply correctly
- signals and pathways calculate deterministically
- archetypes resolve consistently
- debug fixtures reproduce expected outcomes

## Phase 2 — Signal Brain lab
Build the Signal Brain independently at:

`/signal-brain-lab`

The lab must provide:
- sliders for all eight signals
- current pathway scores
- confidence
- controls for `idle`, `ingest`, `propagate`, `rebalance`, `synthesize`, `lock`
- test-profile dropdown
- reduced-motion toggle
- replay last transition

**Do not move to the full assessment shell until this visualization is compelling on its own.**

## Phase 3 — Assessment shell
Build:
- intro
- progress
- question area
- answers
- Signal Brain placement
- system-status copy

## Phase 4 — Integration and motion
Connect:
- answer selection
- signal pulse
- topology adjustment
- path strengthening
- current hypothesis
- question transitions

## Phase 5 — Result
Build:
- synthesis sequence
- archetype reveal
- strongest signals
- Madrona pathway match
- recommended starting engagement
- CTA

## Phase 6 — Polish
Tune:
- motion timing
- visual density
- texture
- responsive behavior
- copy
- accessibility
- performance

---

# Working technical stack

Prefer the existing project stack. If no relevant implementation exists yet:

- React / Next.js
- TypeScript
- Framer Motion
- SVG for the Signal Brain
- CSS variables / existing design tokens
- D3 utilities only if they materially simplify path interpolation or geometry

Avoid a canvas/WebGL implementation in v1 unless SVG demonstrably cannot achieve the desired effect. The visualization should be crisp, deterministic, debuggable, and easy to art-direct.

---

# Product truthfulness

V1 may use a deterministic weighted scoring model.

Do not imply that a machine-learning model inferred things it did not infer.

Use:
- `Live analysis`
- `Reading your signals`
- `Pattern forming`
- `Live synthesis`

Only use:
- `AI analysis active`
- `AI is adapting your assessment`
- `AI synthesis`

when the experience is actually connected to an AI model.

Build this as a feature flag:

```ts
analysisMode: "deterministic" | "llm-assisted"
```

The visual sophistication should come from the quality of the product and visualization, not from fake AI language.

---

# MVP scope

Build:
- intro screen
- 7 questions
- persistent evolving Signal Brain
- interstitial moments
- synthesis
- 8 archetypes
- 4 Madrona pathways
- result
- CTA
- debug mode
- Signal Brain lab

Do not build yet:
- auth
- saved accounts
- CRM integration
- production analytics
- admin UI
- email capture before result
- long-form report generation
- complex LLM agent orchestration

---

# Primary acceptance test

A successful prototype should create this emotional arc:

### Start
> “This is different.”

### Q2
> “It’s paying attention.”

### Q3–4
> “I can see a pattern forming.”

### Q5–6
> “That’s surprisingly close to what is actually happening.”

### Synthesis
> “I want to see where this lands.”

### Result
> “That’s useful. I can see why Madrona would start there.”

If the experience instead feels like “a nice form with a chart,” the prototype is not done.

---

# Claude Code / Codex kickoff instruction

Use the following instruction as the initial task:

> Read every file in `/docs/assessment/` before coding. Treat the Signal Brain as the defining product interaction, not a decorative chart. Implement the engine first, then build `/signal-brain-lab` and get the visualization working independently before integrating the assessment UI. Use the supplied reference image only as directional inspiration for route formation, node confirmation, dim latent paths, and an emerging destination. The brain must visibly ingest each answer, redistribute its internal signal weights, strengthen and weaken routes, and arc toward a likely outcome over time. Keep the model deterministic and debuggable in v1. Do not fake AI claims. Once the brain lab is compelling, integrate it into the dark, immersive assessment shell defined in the interface spec.
