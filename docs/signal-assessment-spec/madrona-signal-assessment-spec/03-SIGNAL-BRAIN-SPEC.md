# Madrona Signal Assessment
## 03 — Signal Brain Visual + Technical Specification

# 1. Why this component matters

The Signal Brain is the signature product interaction.

It must make the user feel that the system is continuously:

- ingesting evidence
- revising its understanding
- connecting observations
- strengthening and weakening hypotheses
- arcing toward a likely opportunity
- retaining uncertainty until enough evidence exists

The reference image is useful because it shows a **route being discovered inside a larger latent network**. The strongest idea to preserve is not the exact node layout. It is the feeling that:

> “There are many possible routes, but the answers are causing one route to light up, branch, bend, and head toward a destination.”

The Signal Brain must be visually beautiful **and causally tied to actual engine state**.

---

# 2. Do not build a radar chart

A radar chart can be used in debug mode if useful.

It must not be the primary visualization.

The production brain should look more like a living graph / adaptive pathway with:
- evidence nodes
- signal hubs
- latent routes
- active route
- pathway attractors
- outcome gravity
- propagation pulses

---

# 3. Mental model: evidence → signal → pathway → outcome

Use four conceptual layers.

They do not need hard vertical dividers, but the geometry should imply progression from left to right.

## Layer A — Evidence
Small nodes generated from answers.

Meaning:
> “Something the user told us.”

Visual:
- small
- numerous
- mostly dim after initial pulse
- left / center-left bias

## Layer B — Signal hubs
Eight persistent semantic nodes:

- trust
- acquisition
- retention
- operations
- capacity
- systems
- product
- clarity

Meaning:
> “What the answer suggests.”

Visual:
- medium
- persistent
- grow / brighten with accumulated evidence
- occupy central field

## Layer C — Pathway attractors
Four Madrona pathways:

- Brand & Web
- Customers & Growth
- Operations & AI
- New Product

Meaning:
> “Where the evidence may be pointing.”

Visual:
- mostly on right side
- initially subtle
- stronger pathways create visible gravitational influence
- do not always show text labels during the questionnaire

## Layer D — Outcome / archetype target
The eventual archetype.

Meaning:
> “The current pattern.”

Visual:
- not fully instantiated until late
- appears as a gravity well / destination ring beyond or near the dominant pathway
- final synthesis resolves into a clear target

---

# 4. The “arcing toward something” behavior

This is critical.

The graph should not merely light up nodes.

It should visibly develop a **trajectory**.

The active route should:
- begin around evidence
- pass through one or more signal hubs
- bend toward the strongest pathway
- strengthen as repeated evidence arrives
- sometimes split when two outcomes remain plausible
- converge again when later answers clarify direction

The right side of the brain should feel like it contains **gravity wells**.

Strong pathway scores exert more visual pull.

This is how the user sees the system “changing its mind.”

---

# 5. Stable deterministic layout

Do not use an unconstrained force simulation that changes randomly between renders.

Random motion will make cause and effect feel fake.

Use a deterministic base layout.

Suggested coordinate space:

```ts
const VIEWBOX = { width: 900, height: 600 };
```

Conceptual x bands:

```ts
evidenceX: 80..240
signalX:   250..560
pathwayX:  610..760
outcomeX:  790..860
```

The actual layout can be more organic than vertical columns, but maintain directional structure.

---

# 6. Base signal positions

Suggested initial positions:

```ts
const signalBase = {
  trust:       { x: 330, y: 120 },
  acquisition: { x: 430, y: 175 },
  retention:   { x: 335, y: 255 },

  capacity:    { x: 300, y: 405 },
  operations:  { x: 425, y: 365 },
  systems:     { x: 520, y: 440 },

  clarity:     { x: 500, y: 120 },
  product:     { x: 560, y: 265 },
};
```

Treat this only as a starting topology. Art-direct actual positions in the lab.

The layout should have:
- varied node spacing
- some overlapping route possibilities
- no perfect symmetry
- no “org chart” feel

---

# 7. Pathway anchors

Suggested:

```ts
const pathwayAnchors = {
  brandWeb:         { x: 710, y: 120 },
  customersGrowth:  { x: 735, y: 245 },
  operationsAI:     { x: 720, y: 395 },
  newProduct:       { x: 735, y: 515 },
};
```

Only the strongest 1–2 should become obviously visible during a normal run.

---

# 8. Archetype destination

Final destination should be near the dominant pathway but offset enough to create a visible final arc.

Example:

```ts
outcome = {
  x: 830,
  y: lerp(primaryPathwayAnchor.y, secondaryPathwayAnchor.y, 0.12)
};
```

Late in the assessment:
- render faint concentric rings around this area
- active route begins bending toward it
- rings become more visible as confidence grows

Do not show the archetype name until synthesis.

---

# 9. Evidence nodes

Each answer creates an evidence item:

```ts
type EvidenceNode = {
  id: string;
  questionId: string;
  answerId: string;
  affectedSignals: Signal[];
  createdAtStep: number;
  weightMagnitude: number;
};
```

Position evidence nodes deterministically based on question index and answer ID hash.

Suggested:
- Q1–Q2: left edge
- Q3–Q4: center-left
- Q5–Q7: closer to relevant signal clusters

Do not create more than about `12–16` visually prominent evidence nodes.

If more evidence exists:
- aggregate into clusters
- or render older evidence as tiny low-opacity points

---

# 10. Graph relationships

Create a latent semantic graph.

Core relationships:

```ts
const signalEdges = [
  ["trust", "acquisition"],
  ["acquisition", "retention"],
  ["retention", "operations"],

  ["capacity", "operations"],
  ["operations", "systems"],

  ["clarity", "product"],
  ["product", "systems"],

  ["clarity", "trust"],
  ["clarity", "operations"],
  ["capacity", "retention"],
];
```

Pathway relationships:

```ts
brandWeb:
  trust
  clarity
  acquisition

customersGrowth:
  acquisition
  retention
  trust

operationsAI:
  operations
  systems
  capacity

newProduct:
  product
  clarity
  systems
```

All edges exist latently.

Their visual strength changes.

---

# 11. Edge strength

For signal-to-signal edge:

```ts
edgeStrength =
  min(signalA.strength, signalB.strength)
  * (0.45 + 0.55 * mean(signalA.confidence, signalB.confidence));
```

For signal-to-pathway:

```ts
edgeStrength =
  signalContributionToPathway
  * pathway.relativeStrength
  * (0.5 + 0.5 * signal.confidence);
```

Normalize to `0..1`.

---

# 12. Visual encoding

Do not use every visual channel at maximum strength.

Use restrained combinations.

## Node size
Represents signal strength.

Suggested:

```ts
radius = 5 + 8 * sqrt(relativeStrength);
```

Clamp:
`5..13px`

Confirmed pathway nodes can reach:
`14..18px`

## Node ring
Represents confidence.

Low confidence:
- incomplete / faint outer ring

High confidence:
- complete ring
- slightly brighter

## Glow
Represents current relevance / active processing.

Use only top 1–3 nodes.

## Edge opacity
Represents edge strength.

```ts
opacity = 0.06 + 0.68 * edgeStrength;
```

## Edge width

```ts
width = 0.8 + 2.4 * edgeStrength;
```

## Active route
Use one stronger continuous line:
- green when representing confirmed internal evidence
- transition toward orange as it approaches a likely outcome

This green-to-orange narrative is part of the “thinking → recommendation” story.

Avoid rainbow gradients.

---

# 13. Color semantics

Suggested:

## Latent
`rgba(220,228,222,.10)`

## Weak active
`rgba(121,164,145,.28)`

## Confirmed / evidence
Madrona green / mint

## Emerging recommendation
Madrona orange

## Primary destination
warm orange with restrained glow

## Secondary possibility
muted green or warm gray

A strong result should look like:
- internal route mostly green
- final outbound arc toward recommendation becomes orange
- outcome rings orange

This matches the reference image's strongest visual idea.

---

# 14. Path geometry

Use smooth cubic Bézier curves.

Never connect nodes with straight-line spiderweb edges only.

Suggested helper:

```ts
function curveBetween(a, b, bend = 0.25) {
  const dx = b.x - a.x;
  return `
    M ${a.x} ${a.y}
    C ${a.x + dx * bend} ${a.y},
      ${b.x - dx * bend} ${b.y},
      ${b.x} ${b.y}
  `;
}
```

Introduce controlled vertical curvature for long signal → pathway routes.

The strongest route should look authored, not mechanically shortest.

---

# 15. Attractor behavior

This is how the network visibly “arcs toward something.”

Every signal hub gets a dynamic display position:

```ts
displayPosition =
  basePosition
  + weightedPull(primaryPathway, secondaryPathway)
  * pullAmount
  * confidence;
```

Do not physically drag nodes huge distances.

Suggested maximum drift:
- signals: `10–26px`
- evidence: `4–14px`
- pathway anchors: `0–10px`

The purpose is perceptual:
- as Operations & AI strengthens, operations/systems/capacity subtly align toward that anchor
- as New Product strengthens, product/clarity/system paths reorganize toward its gravity well

Pull should be spring-smoothed.

---

# 16. Primary and secondary hypotheses

At each step compute:

```ts
primaryPathway
secondaryPathway
pathwayGap = primaryScore - secondaryScore
```

Use gap to express certainty.

## Small gap
- two possible routes remain visible
- destination rings are faint
- route may branch

## Medium gap
- primary route stronger
- secondary remains visible

## Large gap
- primary route visibly dominates
- secondary fades but remains present

Recommended:

```ts
certainty = clamp(pathwayGap / 0.32, 0, 1);
```

Tune in lab.

---

# 17. State machine

Signal Brain has explicit visual states:

```ts
type BrainPhase =
  | "idle"
  | "ingest"
  | "propagate"
  | "rebalance"
  | "settle"
  | "synthesize"
  | "locked";
```

Do not infer motion behavior ad hoc from React rerenders.

---

# 18. Idle

Purpose:
> The system feels alive before anything happens.

Motion:
- core pulse every `5–7s`
- tiny node luminance shift
- 1–3 ambient particles slowly follow latent edges
- pathway attractor field barely visible

No moving node positions during idle beyond `1–2px` drift.

---

# 19. Ingest

Triggered by answer selection.

Duration:
`180–350ms`

Behavior:
- new evidence node appears
- brief outer bloom
- selected answer signal pulse enters graph
- evidence node receives it

Optional sound: none in v1.

---

# 20. Propagate

Duration:
`350–800ms`

Behavior:
- pulse travels from evidence to affected signal hubs
- paths illuminate in sequence
- node rings react as pulse arrives

Use `stroke-dasharray / dashoffset` or a moving particle along the path.

Do not animate every edge.

Only affected edges.

---

# 21. Rebalance

Duration:
`650–1250ms`

Behavior:
- node sizes interpolate
- confidence rings update
- active edge strengths morph
- top signal hubs shift slightly toward likely pathway
- primary route recalculates
- destination gravity adjusts
- latent paths fade / rise

This is where the brain appears to “change its mind.”

---

# 22. Settle

Duration:
`250–500ms`

Behavior:
- major movement stops
- active route keeps very subtle glow
- system-status copy updates
- ambient mode resumes

---

# 23. Synthesize

Triggered after Q7.

Duration:
`2200–2800ms`

Detailed timeline:

## 0–350ms
Freeze new input.
Core slightly brightens.

## 250–800ms
Evidence nodes reduce opacity.
Signal hubs become primary visual anchors.

## 600–1250ms
Strong signal relationships pull into cleaner topology.

## 900–1600ms
Primary pathway route thickens.
Secondary pathway remains visible at lower strength.

## 1200–2000ms
Destination gravity well appears.
Concentric rings grow outward at low opacity.

## 1500–2250ms
Primary active route visibly arcs into outcome target.

## 1900–2450ms
Core and target pulse in sequence.

## 2300–2700ms
Graph reaches final locked geometry.
Result title begins reveal.

---

# 24. Locked

Final result state.

Behavior:
- no topology drift
- subtle ambient glow only
- final primary route remains
- secondary route remains as context
- strongest three signal hubs retain emphasis
- target rings breathe extremely subtly

The result screen should preserve this final state.

---

# 25. Path discovery algorithm

Do not use graph shortest-path literally.

Create an authored scoring path.

For primary pathway:

1. rank signals by contribution to primary pathway
2. choose top 2–3
3. find semantic edges connecting them where possible
4. if no direct semantic path, connect through a low-opacity bridge node
5. build route:
   evidence → top signal → related signal → pathway → outcome

Use up to `4–6` route segments.

The active route should be understandable visually.

Avoid drawing a single spaghetti path through all strong nodes.

---

# 26. Example states

## Early Hidden Gem
Strong:
- trust
- clarity

Route:
evidence → clarity → trust

Destination:
Brand & Web anchor faint

Later:
clarity → trust → Brand & Web → archetype target

---

## Duct-Tape Operator
Strong:
- capacity
- operations
- systems

Route:
evidence → capacity → operations → systems → Operations & AI

Visual:
- route can have a downward arc that turns strongly right
- final orange rings appear around Operations & AI outcome

This should closely capture the “route is becoming obvious” feeling of the reference image.

---

## Signal-Rich Builder
Strong:
- clarity
- product
- systems

Route:
evidence → clarity ↔ product → systems → New Product

Visual:
- two internal paths can briefly compete before converging

---

## Leaky Bucket
Strong:
- acquisition
- retention
- operations moderate

Route:
evidence → acquisition → retention → Customers & Growth

---

# 27. Current-read language generation

Brain component should expose structured state:

```ts
{
  strongestSignals,
  primaryPathway,
  secondaryPathway,
  certainty,
  newEvidence,
  changedSignals
}
```

Use this to generate deterministic short messages.

Examples:

If operations + systems rising:
> We’re seeing a relationship between manual work and disconnected systems.

If trust leads:
> The way the business shows up is becoming a stronger signal.

If primary / secondary gap small:
> Two paths are still plausible.

If Q5 creates large shift:
> Your desired outcome just sharpened the direction.

Avoid repetitive messages.

---

# 28. Background field

Behind graph:
- very low-opacity grid
- 2–4 broad concentric / orbital guides
- optional faint radial arcs around outcome area
- no literal brain silhouette

The “brain” is conceptual, not anatomical.

---

# 29. Particles

Use very few.

Types:

## Ambient
1–3 particles at a time.
Slow.
Opacity < .25.

## Propagation pulse
One clear particle per affected signal route.
Brighter.
Short-lived.

## Synthesis
2–4 pulses can converge.

No snow / starfield effect.

---

# 30. SVG structure

Suggested:

```tsx
<svg viewBox="0 0 900 600">
  <defs>
    <filter id="softGlow">...</filter>
    <radialGradient id="nodeGlow">...</radialGradient>
  </defs>

  <g id="background-guides" />
  <g id="latent-edges" />
  <g id="pathway-fields" />
  <g id="active-route" />
  <g id="evidence-edges" />
  <g id="nodes" />
  <g id="pulses" />
  <g id="outcome-rings" />
</svg>
```

Layer order matters.

---

# 31. Blur / glow constraints

SVG blur can be expensive.

Use:
- small glow radii
- glow only on top active nodes
- duplicate stroke with low-opacity thicker line rather than blur when possible

Example route glow:
- base route `2px`
- underlay route `7px`, opacity `.10`

This often looks better than heavy blur.

---

# 32. Signal Brain lab

Build:

`/signal-brain-lab`

This is mandatory.

Controls:

## Signal sliders
- trust
- acquisition
- retention
- operations
- capacity
- systems
- product
- clarity

Each `0..100`

## Confidence sliders
Optional advanced panel.

## Test profiles
Dropdown:
- Empty
- Hidden Gem
- Leaky Bucket
- Duct-Tape Operator
- Bottleneck
- Signal-Rich Builder
- Ready Builder
- Growth Plateau
- Stretched Steward

## Phase controls
Buttons:
- Idle
- Ingest
- Propagate
- Rebalance
- Synthesize
- Lock
- Replay

## Debug toggles
- Show labels
- Show raw edges
- Show pathway anchors
- Show evidence nodes
- Show geometry bounds
- Reduced motion

## Metrics
- FPS
- node count
- edge count
- primary pathway
- secondary pathway
- certainty

This lab is how we art-direct the brain before integrating it.

---

# 33. Lab acceptance criteria

Do not integrate the brain into the assessment until:

1. Sliders visibly produce different topologies.
2. Duct-Tape and Hidden Gem look materially different.
3. A primary pathway can visibly “pull” the graph toward it.
4. Secondary hypotheses remain visible when scores are close.
5. Switching profiles never causes chaotic jumps.
6. Rebalance feels smooth and deliberate.
7. Synthesis creates a satisfying final arc / destination reveal.
8. The graph remains beautiful with weak, mixed, and strong inputs.
9. It runs smoothly at target size.
10. Reduced motion remains understandable.

---

# 34. Accessibility summary

SVG should have:
- `role="img"`
- descriptive label from state
- hidden decorative paths

Do not expose dozens of SVG nodes individually to screen readers.

Provide one semantic text summary outside the SVG.

---

# 35. Final design test

Show the Signal Brain to someone with **no question UI around it**.

They should be able to say something like:

> “It looks like a system is exploring routes and converging on an answer.”

If it looks like:
- a network diagram
- a decorative node graph
- a data visualization
- a glowing chart

without a sense of directional reasoning, keep working.

The core visual narrative is:

> **Evidence enters. Relationships strengthen. Possibilities compete. A path emerges. The system arcs toward a useful next move.**
