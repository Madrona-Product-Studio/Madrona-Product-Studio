# Madrona Signal Assessment
## 01 — Assessment Engine Specification

# 1. Purpose

The engine turns seven user answers into four things:

1. a changing internal map of eight business signals
2. four Madrona pathway scores
3. an archetype
4. a recommended first engagement

The engine must remain:

- deterministic
- interpretable
- easy to tune
- separate from presentation
- separate from optional LLM synthesis

The Signal Brain consumes the same engine state used to create the final result. There should be no “fake visualization state” that diverges from actual scoring.

---

# 2. Core signal model

Use eight internal signals:

```ts
export type Signal =
  | "trust"
  | "acquisition"
  | "retention"
  | "operations"
  | "capacity"
  | "systems"
  | "product"
  | "clarity";
```

Interpretation:

| Signal | Meaning |
|---|---|
| `trust` | How clearly the business communicates value and creates confidence |
| `acquisition` | Ability to attract and convert the right customers |
| `retention` | Ability to keep customers engaged and returning |
| `operations` | Manual coordination, repetitive work, process friction |
| `capacity` | Degree to which people are stretched or key individuals are bottlenecks |
| `systems` | Fragmentation across tools, data, processes and handoffs |
| `product` | Need or opportunity to create something new |
| `clarity` | Uncertainty about priorities, positioning, or what to build |

Higher raw values mean stronger evidence of opportunity / friction in that dimension.

---

# 3. Pathway model

The four user-facing Madrona pathways are:

```ts
export type Pathway =
  | "brandWeb"
  | "customersGrowth"
  | "operationsAI"
  | "newProduct";
```

Canonical formulas:

```ts
brandWeb =
  trust * 1.0 +
  acquisition * 0.30 +
  clarity * 0.35;

customersGrowth =
  acquisition * 0.75 +
  retention * 1.0 +
  trust * 0.20;

operationsAI =
  operations * 1.0 +
  systems * 0.90 +
  capacity * 0.70;

newProduct =
  product * 1.0 +
  clarity * 0.55 +
  systems * 0.10;
```

These formulas should live in a single engine module and be unit tested.

---

# 4. Progressive normalization

For final pathway scores, normalize against the maximum possible score for each pathway from the configured question set.

Do not normalize based only on the user's current min/max because this would make weak evidence appear stronger than it is.

Suggested:

```ts
normalized = Math.round(
  Math.min(1, rawPathwayScore / maxPossiblePathwayScore) * 100
);
```

For progressive Signal Brain visualization during the questionnaire, compute both:

```ts
absoluteStrength // against max possible score so far
relativeStrength // compared with other current signals
```

Use absolute strength to represent confidence / evidence accumulation.

Use relative strength to visually compare current hypotheses.

---

# 5. Confidence

Do not equate score magnitude with confidence.

Track confidence separately.

For every signal store:

```ts
type SignalState = {
  raw: number;
  absoluteStrength: number; // 0..1
  relativeStrength: number; // 0..1
  evidenceCount: number;
  confidence: number;       // 0..1
};
```

Recommended v1 confidence:

```ts
confidence =
  clamp(
    0.15 +
    answeredRelevantQuestions / totalRelevantQuestions * 0.85,
    0,
    1
  );
```

A signal that receives a very large weight from one answer can be visually strong but should not yet look fully confirmed.

This distinction is important to the Signal Brain:
- strength = how important the signal currently appears
- confidence = how much evidence has accumulated behind it

---

# 6. Question data model

```ts
export interface AssessmentAnswer {
  id: string;
  label: string;
  description?: string;
  weights: Partial<Record<Signal, number>>;
  readiness?: Readiness;
}

export interface AssessmentQuestion {
  id: string;
  stage: string;
  eyebrow?: string;
  question: string;
  supportingText?: string;
  answers: AssessmentAnswer[];
}

export type Readiness =
  | "fix-specific"
  | "find-focus"
  | "prototype"
  | "build"
  | "outside-perspective";
```

---

# 7. Question set

## Q1 — Business context

**Question**

What kind of business are we looking at?

**Supporting text**

This gives us context. It won’t determine your result.

```ts
[
  {
    id: "retail",
    label: "Retail or online store",
    weights: { acquisition: 1, retention: 1, operations: 1 }
  },
  {
    id: "food-farm",
    label: "Food, farm, or producer",
    weights: { trust: 1, operations: 2, capacity: 1 }
  },
  {
    id: "services",
    label: "Services or appointments",
    weights: { acquisition: 1, retention: 1, operations: 2 }
  },
  {
    id: "hospitality",
    label: "Hospitality or travel",
    weights: { acquisition: 1, retention: 1, operations: 1, systems: 1 }
  },
  {
    id: "health",
    label: "Health or wellness",
    weights: { trust: 2, retention: 1, systems: 1 }
  },
  {
    id: "other",
    label: "Something else",
    weights: {}
  }
]
```

Q1 should be intentionally low-weight.

---

## Q2 — Felt friction

**Question**

Where do you feel the most friction right now?

**Supporting text**

Pick the thing you notice most often.

```ts
[
  {
    id: "understanding",
    label: "People don’t immediately understand why they should choose us",
    weights: { trust: 4, clarity: 2 }
  },
  {
    id: "more-customers",
    label: "We need more of the right customers",
    weights: { acquisition: 4, trust: 1 }
  },
  {
    id: "repeat-business",
    label: "Customers come once, but not often enough again",
    weights: { retention: 4, acquisition: 1 }
  },
  {
    id: "manual-work",
    label: "Too much work still happens manually",
    weights: { operations: 4, capacity: 2 }
  },
  {
    id: "disconnected-systems",
    label: "Our tools and processes don’t really work together",
    weights: { systems: 4, operations: 2 }
  },
  {
    id: "new-thing",
    label: "We have something new we want to build",
    weights: { product: 4, clarity: 2 }
  }
]
```

---

## Q3 — Observable reality

**Question**

Which of these sounds most like the business today?

```ts
[
  {
    id: "better-than-presence",
    label: "The business is better than the way we present it",
    weights: { trust: 4, clarity: 1 }
  },
  {
    id: "attention-disappears",
    label: "We get attention, but too much interest disappears before becoming revenue",
    weights: { acquisition: 4, trust: 1 }
  },
  {
    id: "personal-followup",
    label: "We rely on personal follow-up to keep customers engaged",
    weights: { retention: 3, operations: 2 }
  },
  {
    id: "few-people-hold-it",
    label: "A few people are holding too much of the operation together",
    weights: { capacity: 4, operations: 2 }
  },
  {
    id: "information-everywhere",
    label: "Important information lives across inboxes, spreadsheets, docs, and different tools",
    weights: { systems: 4, operations: 2 }
  },
  {
    id: "ideas-no-priority",
    label: "We have ideas, but struggle to decide what deserves to become real",
    weights: { product: 3, clarity: 4 }
  }
]
```

---

## Q4 — Time drain

**Question**

What consumes more time than it should?

```ts
[
  {
    id: "explain",
    label: "Explaining what we do over and over",
    weights: { trust: 3, clarity: 2 }
  },
  {
    id: "find-convert",
    label: "Finding and converting new customers",
    weights: { acquisition: 4 }
  },
  {
    id: "followup",
    label: "Following up and keeping customers engaged",
    weights: { retention: 3, operations: 1 }
  },
  {
    id: "coordination",
    label: "Scheduling, coordinating, copying, checking, or updating",
    weights: { operations: 4, capacity: 2 }
  },
  {
    id: "move-information",
    label: "Moving information between tools and people",
    weights: { systems: 4, operations: 2 }
  },
  {
    id: "decide-next",
    label: "Figuring out what we should build or improve next",
    weights: { product: 3, clarity: 3 }
  }
]
```

---

## Q5 — Desired outcome

**Question**

Six months from now, what would make the biggest difference?

**Supporting text**

Choose the outcome that would actually change the business.

```ts
[
  {
    id: "understood-trusted",
    label: "People understand us quickly and trust what they see",
    weights: { trust: 5 }
  },
  {
    id: "more-right-customers",
    label: "More of the right people become customers",
    weights: { acquisition: 5 }
  },
  {
    id: "customers-return",
    label: "Customers come back more often and stay connected",
    weights: { retention: 5 }
  },
  {
    id: "less-manual",
    label: "The business runs with less manual work and fewer dropped balls",
    weights: { operations: 4, capacity: 2 }
  },
  {
    id: "systems-together",
    label: "Our systems work together and give us a clearer view of what’s happening",
    weights: { systems: 5, operations: 1 }
  },
  {
    id: "new-real",
    label: "A new product, service, or experience is real and in people’s hands",
    weights: { product: 5, clarity: 1 }
  }
]
```

---

## Q6 — Current workaround

**Question**

How are you making it work today?

```ts
[
  {
    id: "effort-memory",
    label: "Mostly through personal effort and memory",
    weights: { capacity: 4, operations: 3 }
  },
  {
    id: "patchwork",
    label: "A patchwork of tools and workarounds",
    weights: { systems: 4, operations: 2 }
  },
  {
    id: "one-person",
    label: "One person knows how everything works",
    weights: { capacity: 5, systems: 1 }
  },
  {
    id: "more-process",
    label: "We keep adding process, but it still feels messy",
    weights: { operations: 3, systems: 3 }
  },
  {
    id: "nothing-sticks",
    label: "We’ve tried improving it, but nothing has really stuck",
    weights: { clarity: 3, systems: 1 }
  },
  {
    id: "not-tackled",
    label: "We haven’t really tackled it yet",
    weights: { clarity: 4, product: 1 }
  }
]
```

---

## Q7 — Readiness

**Question**

What are you ready to do about it?

```ts
[
  {
    id: "fix-specific",
    label: "Fix something specific that clearly isn’t working",
    weights: { clarity: -1 },
    readiness: "fix-specific"
  },
  {
    id: "find-focus",
    label: "Step back and figure out where to focus",
    weights: { clarity: 3 },
    readiness: "find-focus"
  },
  {
    id: "prototype",
    label: "Prototype a better way before making a big commitment",
    weights: { product: 2, clarity: 1 },
    readiness: "prototype"
  },
  {
    id: "build",
    label: "Build the solution and put it into use",
    weights: { product: 3 },
    readiness: "build"
  },
  {
    id: "outside-perspective",
    label: "I mostly want an outside perspective first",
    weights: { clarity: 2 },
    readiness: "outside-perspective"
  }
]
```

---

# 8. Archetype engine

Use explicit rules rather than a black-box classification model in v1.

Suggested normalized thresholds:

```ts
const STRONG = 0.64;
const MODERATE = 0.45;
const VERY_STRONG = 0.76;
```

Thresholds should be configuration, not hard-coded throughout the app.

Evaluate highly specific archetypes before broad ones.

Suggested resolution order:

1. Ready Builder
2. Signal-Rich Builder
3. Bottleneck
4. Duct-Tape Operator
5. Stretched Steward
6. Leaky Bucket
7. Growth Plateau
8. Hidden Gem
9. fallback based on primary pathway

---

## Ready Builder

Trigger:
- product >= STRONG
- clarity < STRONG
- readiness === "build"

Description:
> The opportunity is understood. The next job is turning it into something useful that real people can use.

Primary:
`newProduct`

---

## Signal-Rich Builder

Trigger:
- product >= STRONG
- clarity >= STRONG

Description:
> There is a meaningful opportunity here, but it needs sharper definition, validation, and a tangible first version.

Primary:
`newProduct`

---

## Bottleneck

Trigger:
- capacity >= VERY_STRONG
- capacity > systems
- capacity >= operations

Description:
> Too much depends on one or two people knowing, remembering, deciding, or coordinating everything.

Primary:
`operationsAI`

---

## Duct-Tape Operator

Trigger:
- operations >= STRONG
- systems >= STRONG OR capacity >= STRONG

Description:
> The business works because people keep holding the pieces together. Better workflows, tools, and automation could remove a surprising amount of friction.

Primary:
`operationsAI`

---

## Stretched Steward

Trigger:
- capacity >= STRONG
- operations >= MODERATE
- trust >= MODERATE OR retention >= MODERATE

Description:
> You care deeply about the experience and the business is working, but too much still depends on personal attention.

Primary:
`operationsAI`

---

## Leaky Bucket

Trigger:
- retention >= STRONG
OR
- acquisition >= MODERATE AND retention >= MODERATE AND retention >= acquisition * 0.8

Description:
> Interest exists, but too much value is being lost between discovery, purchase, and return.

Primary:
`customersGrowth`

---

## Growth Plateau

Trigger:
- acquisition >= STRONG
- trust >= MODERATE
- retention < STRONG

Description:
> The fundamentals are there, but customer growth is not compounding the way it could.

Primary:
`customersGrowth`

---

## Hidden Gem

Trigger:
- trust >= STRONG
- operationsAI is not the dominant pathway

Description:
> The quality of the business is stronger than the way it currently shows up. Clearer positioning and digital experience could make what is already good much easier to understand and choose.

Primary:
`brandWeb`

---

# 9. Fallback archetypes

If no specific rule triggers:

- `brandWeb` → Hidden Gem
- `customersGrowth` → Growth Plateau
- `operationsAI` → Duct-Tape Operator
- `newProduct` → Signal-Rich Builder

Log fallback use in debug mode so weak rules are visible during testing.

---

# 10. Top signals

The result should expose the strongest three signals.

Rank by:

```ts
rankScore =
  absoluteStrength * 0.7 +
  confidence * 0.3;
```

Use user-facing labels:

```ts
{
  trust: "Trust & clarity",
  acquisition: "Customer acquisition",
  retention: "Customer retention",
  operations: "Operational friction",
  capacity: "Team capacity",
  systems: "System fragmentation",
  product: "Product opportunity",
  clarity: "Decision clarity"
}
```

Qualitative level:

- `>= .72` → Strong
- `>= .50` → Emerging
- `< .50` → Supporting

---

# 11. Recommended starting engagement

Map readiness + primary pathway.

## Brand & Web

`find-focus` / `outside-perspective`
→ Positioning & digital direction sprint

`prototype`
→ Brand / website concept sprint

`fix-specific` / `build`
→ Focused brand or web build

---

## Customers & Growth

`find-focus`
→ Customer journey opportunity sprint

`outside-perspective`
→ Growth / retention diagnostic

`prototype`
→ Customer experience prototype

`fix-specific` / `build`
→ Focused customer journey or lifecycle build

---

## Operations & AI

`find-focus` / `outside-perspective`
→ Workflow opportunity sprint

`prototype`
→ Automation / internal-tool prototype

`fix-specific`
→ Focused workflow redesign

`build`
→ Operations automation / internal-tool build

---

## New Product

`find-focus` / `outside-perspective`
→ Product opportunity sprint

`prototype`
→ Product definition + prototype sprint

`fix-specific`
→ Focused product improvement sprint

`build`
→ Focused product build

---

# 12. Debug fixtures

Implement named deterministic response sets.

At minimum:

```ts
type TestProfile =
  | "hidden-gem"
  | "leaky-bucket"
  | "duct-tape"
  | "bottleneck"
  | "signal-rich-builder"
  | "ready-builder"
  | "growth-plateau"
  | "stretched-steward";
```

Each fixture should supply exact answer IDs for Q1–Q7.

Create a debug panel that displays:
- raw signal scores
- normalized signal scores
- confidence
- pathway scores
- primary / secondary pathway
- triggered archetype rule
- fallback status
- readiness
- strongest signals

---

# 13. Engine module boundaries

Suggested structure:

```text
assessment/
  data/
    questions.ts
    archetypes.ts
    pathways.ts
    fixtures.ts

  engine/
    scoreSignals.ts
    normalizeSignals.ts
    scorePathways.ts
    resolveArchetype.ts
    resolveRecommendation.ts
    getTopSignals.ts
    assessmentReducer.ts

  types.ts
```

UI components must not contain scoring rules.

---

# 14. Optional LLM layer — not required for v1

If later using an LLM:
- deterministic engine remains source of truth for scoring
- LLM may rewrite or synthesize explanations from structured engine output
- LLM must not independently change the user’s pathway or archetype unless a future explicit adjudication design is created
- pass structured facts, not the entire UI state

Possible future payload:

```ts
{
  archetype,
  primaryPathway,
  secondaryPathway,
  topSignals,
  readiness,
  businessContext,
  answerSummaries
}
```

This keeps recommendations explainable and prevents the visual engine from drifting away from the result.
