# Madrona Signal Assessment
## 04 — Content + Copy Specification

# 1. Voice

The assessment should sound like Madrona:

- intelligent
- calm
- human
- observant
- direct
- lightly warm
- useful

Avoid:
- diagnostic theater
- consulting jargon
- AI hype
- overly cute quiz language
- certainty the engine cannot support
- personality-test clichés

The system should sound like a good product strategist who is paying attention.

---

# 2. Naming

Working product name:

**Madrona Signal Assessment**

Alternative internal shorthand:
**Signal Check**

For user-facing experience, a lighter intro can say:

> A quick signal check

Avoid calling it:
- business health score
- maturity assessment
- AI diagnostic
- readiness quiz

unless future positioning changes.

---

# 3. Intro

## Eyebrow
A quick signal check

## Headline
Your business is telling you something.

## Body
Seven quick questions. We’ll map the pattern, show where the strongest opportunity may be, and suggest a useful place to start.

## CTA
Start the assessment

## Meta
About 2 minutes. No email required.

Alternative headline:
> Find the throughline.

Do not lead with “AI.”

---

# 4. Questions

Use the question copy in `01-ENGINE-SPEC.md`.

Recommended final question copy:

### Q1
What kind of business are we looking at?

Subcopy:
This gives us context. It won’t determine your result.

### Q2
Where do you feel the most friction right now?

Subcopy:
Pick the thing you notice most often.

### Q3
Which of these sounds most like the business today?

### Q4
What consumes more time than it should?

### Q5
Six months from now, what would make the biggest difference?

Subcopy:
Choose the outcome that would actually change the business.

### Q6
How are you making it work today?

### Q7
What are you ready to do about it?

---

# 5. Interstitial copy

Use sparingly.

## After Q2
Primary:
> That’s a meaningful signal.

Secondary option:
> We’ve got our first real signal.

## After Q3 or Q4
> We’re starting to see a throughline.

## If two pathways remain close
> Two paths are still plausible.

## If a relationship is emerging
> A few of these signals are starting to connect.

## Before Q7
> The shape is getting clearer.

Do not show an interstitial after every answer.

---

# 6. Live analysis status

Deterministic mode:

Allowed:
- Live analysis
- Reading your signals
- Pattern forming
- Updating your map
- Finding relationships
- Weighing possible paths
- Current read
- Live pathway

Avoid:
- AI is thinking
- model confidence
- AI prediction
- AI knows
- neural analysis

unless an actual AI system supports the claim.

LLM-assisted mode:

Allowed:
- AI synthesis active
- AI-assisted analysis
- AI is synthesizing your responses

Still avoid exaggerated language.

---

# 7. Dynamic “current read” examples

These should be generated from actual engine state.

## Trust rising
> The way the business shows up is becoming a stronger signal.

## Acquisition rising
> Customer acquisition is emerging as a meaningful pressure point.

## Retention rising
> The pattern is pointing beyond acquisition toward what happens after the first sale.

## Operations + capacity
> Manual coordination and team capacity are starting to connect.

## Operations + systems
> We’re seeing a relationship between process friction and disconnected systems.

## Product + clarity
> There may be a real product opportunity here, but the shape is still forming.

## Product strong, clarity lower
> The opportunity looks increasingly buildable.

## Close pathways
> Two paths are still plausible.

## Strong primary
> One path is starting to separate from the rest.

## Q5 causes shift
> Your desired outcome just sharpened the direction.

## Q6 confirms previous
> That confirms a pattern we were already seeing.

Do not expose raw scoring language.

---

# 8. Synthesis copy

Three-step sequence:

1. `Reading the pattern…`
2. `Finding the throughline…`
3. `Mapping your strongest opportunity…`

Alternative final line:
`Finding a useful place to start…`

Do not make this longer than ~3 seconds.

---

# 9. Archetype copy

## The Hidden Gem

### Short interpretation
The quality of the business is stronger than the way it currently shows up.

### Full
You’ve already built something worth choosing. The opportunity is making that value easier to understand, trust, and act on—through clearer positioning, stronger identity, and a digital experience that reflects the quality of the business.

### Primary pathway
Brand & Web

---

## The Leaky Bucket

### Short
Interest is there, but too much value is being lost between discovery, purchase, and return.

### Full
The business can attract attention, but the customer journey is not compounding as well as it could. The biggest opportunity may be improving the path from interest to purchase—and from first purchase to an ongoing relationship.

### Primary
Customers & Growth

---

## The Duct-Tape Operator

### Short
The business works because people keep holding the pieces together.

### Full
You’ve found ways to make the operation work, but too much still depends on manual coordination, workarounds, memory, or people moving information between systems. Better workflows, automation, and focused internal tools could create real leverage.

### Primary
Operations & AI

---

## The Bottleneck

### Short
Too much of the business depends on a small number of people knowing how everything works.

### Full
The problem is less “not enough effort” and more concentration of knowledge and decision-making. Clarifying ownership, redesigning workflows, and giving the team better tools can reduce dependency without adding unnecessary process.

### Primary
Operations & AI

---

## The Signal-Rich Builder

### Short
There is something worth building here, but it needs a sharper first shape.

### Full
You’re seeing a real opportunity, but there are still important decisions about the problem, audience, scope, and first useful version. The best next step is making the idea tangible enough to test before overcommitting.

### Primary
New Product

---

## The Ready Builder

### Short
The problem is understood. Now it needs to become real.

### Full
You have enough clarity to move beyond exploration. The opportunity is building a focused first version, getting it into people’s hands, and learning from real use rather than continuing to debate the concept.

### Primary
New Product

---

## The Growth Plateau

### Short
The fundamentals work, but growth is not compounding the way it could.

### Full
People can understand and choose the business, but the customer system is not creating enough momentum. A clearer acquisition path, better conversion, or stronger lifecycle experience may unlock the next stage of growth.

### Primary
Customers & Growth

---

## The Stretched Steward

### Short
The business is working, but too much of the experience still depends on personal attention.

### Full
You care deeply about customers and the quality of the work. That attention is part of what makes the business good—but it can also become the constraint. The opportunity is protecting what matters while giving the operation more leverage.

### Primary
Operations & AI

---

# 10. Signal labels

User-facing:

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

Levels:

- Strong
- Emerging
- Supporting

Avoid:
- Weak
- Bad
- Failing
- Low maturity

---

# 11. Pathway copy

## Brand & Web
### Short
Make the value of the business easier to understand, trust, and choose.

### Capabilities
- Positioning and strategy
- Messaging and voice
- Visual identity
- Websites and stores

---

## Customers & Growth
### Short
Make it easier for the right customers to discover, buy, return, and stay connected.

### Capabilities
- Customer research
- Journey and experience design
- Commerce and loyalty
- Retention and lifecycle communication

---

## Operations & AI
### Short
Reduce repetitive work and give the team better systems for running the business.

### Capabilities
- Workflow and process design
- Automation
- AI assistants and agents
- Internal tools and dashboards

---

## New Product
### Short
Turn a meaningful opportunity into something useful that real people can use.

### Capabilities
- Product strategy and definition
- Experience design
- Rapid prototyping
- Working software

---

# 12. Recommended engagement copy

## Positioning & digital direction sprint
> Clarify what needs to change, align the story and experience, and leave with a concrete direction to build from.

## Brand / website concept sprint
> Make the next version tangible before committing to a full build.

## Customer journey opportunity sprint
> Map where customers are getting stuck and identify the few changes most likely to improve the experience.

## Growth / retention diagnostic
> Understand where momentum is being lost across discovery, conversion, and return.

## Customer experience prototype
> Test a better customer journey before investing in the full system.

## Workflow opportunity sprint
> Map where time and coordination are going, identify the highest-leverage intervention, and define the smallest useful improvement.

## Automation / internal-tool prototype
> Turn a manual workflow into a working prototype and learn whether software can meaningfully reduce the load.

## Focused workflow redesign
> Fix a specific process that is creating unnecessary work or dropped handoffs.

## Operations automation / internal-tool build
> Build and deploy the tool or automation needed to make the operation run better.

## Product opportunity sprint
> Clarify the problem, audience, value, and best first version.

## Product definition + prototype sprint
> Turn the idea into something tangible enough to test with real people.

## Focused product build
> Build a useful first version and get it into the hands of users.

---

# 13. Result CTA

Primary:
> Talk through the result

Supporting:
> Bring the result into a focused conversation with Madrona. We’ll pressure-test the read and talk about whether there’s a useful next step.

Secondary:
> Email this result to me

Optional third:
> Share something already in motion

Do not use:
- Get your free consultation
- Claim your strategy session
- Unlock my report

---

# 14. Privacy

Intro / footer:

> No email required to see your result.

Assessment footer:

> Your answers are used to create this assessment result.

If responses are not stored:
> Your answers stay in this session unless you choose to share them.

If responses are stored, replace with an accurate statement.

Do not say:
> encrypted and never shared

unless technically verified.

---

# 15. AI claims

If `analysisMode === "deterministic"`:

Use:
> This assessment looks for patterns in your answers and maps them to common business opportunities.

If `analysisMode === "llm-assisted"`:

Use:
> AI-assisted synthesis helps turn your answers into a clearer summary. The recommendation is grounded in the signals you provided.

Never imply:
- professional diagnosis
- guaranteed business outcome
- predictive certainty
- proprietary “intelligence” unless meaningfully true

---

# 16. Tone guardrails

Prefer:
> We’re seeing a relationship between capacity and systems.

Over:
> Our AI has detected severe operational inefficiency.

Prefer:
> One path is starting to separate from the rest.

Over:
> We are 86% confident you need Operations & AI.

Prefer:
> This looks like a useful place to start.

Over:
> This is the solution your business needs.

The sophistication should come from restraint.
