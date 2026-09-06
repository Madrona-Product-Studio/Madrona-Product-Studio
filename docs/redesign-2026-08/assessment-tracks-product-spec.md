# Assessment tracks — the two new tracks (DRAFT for Charlie)

Status: draft copy for review, 2026-09-03. Nothing built yet. This spec
mirrors the structure of `ai-opportunity-spec.md` so the new tracks are a
drop-in on the same chassis. Charlie's words are final; these are starts.

Contents: the **"I lead product"** track first, the **"I'm building
something"** track second (search "## THE BUILDER TRACK"), shared engine
notes and open questions at the end.

Copy rule sitewide: **no em-dashes** in any user-facing copy.

## Where this fits

Three "ways in," one chooser front door, phased rollout (Charlie 09-03):

1. **I run a business** — the existing AI Opportunity Assessment
   (`/ai-opportunities`). Payload: automation map + AI moves + live tool
   demos. Untouched.
2. **I lead product** — THIS spec. Payload: a product diagnosis + the
   recommended engagement shape. The most on-brand track (senior product
   lead positioning); Madrona's answer to cxo.dev, one altitude up
   (product decisions, not eng-org mechanics).
3. **I'm building something** — the builder track. Drafted below
   ("## THE BUILDER TRACK"). Payload: a builder's diagnosis + the
   highest-leverage build move, grounded in the Starter Guide.

**Chooser home:** reclaim `/where-to-start` (currently a legacy 301) as a
neutral three-card chooser. Each track lives at its own sub-route; this one
at `/where-to-start/product` (name TBD).

## The chassis it shares with the SMB track

`opener (multi-select inventory) -> per-area anchor + evidence pairs
(flagged areas only) -> AI reality -> blocker -> readiness -> result`

Same interaction: check what's true, we only ask about what you flag,
you keep the read either way. No email gate. Print to keep. Cal.com CTA
at the result. Same chat-history / live-assembling-pane frame.

## The framing shift

SMB opener is **time**-framed ("where does your week go"). A product lead
doesn't feel the problem as time eaten, they feel it as **stuck**. So the
opener is friction-framed, and the anchor scale measures **cost**, not
hours.

## Q0 — the opener (multi-select)

Prompt: **"Where's the product actually stuck?"**
Support: "Tap everything that's true. We only ask about what you flag,
then hand you a read you keep either way."

Chips (id -> label -> area):

| id | chip label | area |
|----|-----------|------|
| roadmap    | The roadmap is a list of requests, not a bet        | direction |
| align      | We can't agree on what to build next                | direction |
| pull       | Leadership and the team pull in different directions | direction |
| blind      | We ship features and can't tell if they worked      | signal |
| research   | Research happens, but nothing changes because of it | signal |
| guessing   | We're guessing at what users actually need          | signal |
| slow       | Idea to shipped takes too long                      | velocity |
| aitools    | We bought AI tools and delivery didn't get faster   | velocity |
| concentrated | Every real decision routes through one or two people | velocity |
| flat       | Usage is flat and we don't know why                 | health |
| onboarding | Onboarding leaks the users we fought to get         | health |
| noneedle   | We ship features that don't move the numbers        | health |

Reply-pill short labels: "Requests, not bets", "What to build next",
"Pulling apart", "Shipping blind", "Research ignored", "Guessing at
needs", "Too slow to ship", "AI tools didn't help", "Decision bottleneck",
"Flat usage", "Onboarding leaks", "Features don't move the number".

Plus free-text: "+ what else is stuck" (optional; echoes in the read,
feeds phase-2 LLM later).

### The four areas (modules)

| area | module label |
|------|-------------|
| direction | Direction |
| signal    | Signal |
| velocity  | Velocity |
| health    | Product health |

An area is flagged when >=1 of its chips is checked. Mint seam after the
opener: "Flagged. {area names}. We only ask about these, then hand you a
read you keep either way."

## Per-area evidence pairs (flagged areas only, order direction ->
signal -> velocity -> health)

Shared cost scale (parallels the SMB hour scale; weights [1,3,6,9,8]):
`["A minor annoyance", "Costs us some speed", "A real drag on the roadmap", "It's what keeps me up at night", "We're stalled until we fix it"]`

**Direction**
- Anchor: "How much is the direction question costing you?"
  Support: "The 'what do we build next, and why' question."
- Evidence (multi): "Where does it break down?"
  Options: "Requests get logged, bets don't get made" · "Leadership and
  the team want different things" · "Every idea sounds reasonable, so
  nothing gets cut" · "We plan quarters we don't finish" · "Honestly, the
  direction is clear" [exclusive]

**Signal**
- Anchor: "How much is flying blind costing you?"
  Support: "Shipping without knowing whether it worked."
- Evidence (multi): "What's the honest state of evidence?"
  Options: "We ship and move on without measuring" · "We have data but it
  doesn't change decisions" · "Research happens, then gets ignored" · "We
  hear from the loudest users, not the real ones" · "We're
  well-instrumented, honestly" [exclusive]

**Velocity**
- Anchor: "How much is the delivery drag costing you?"
  Support: "Idea to shipped, and everything that clogs in between."
- Evidence (multi): "Where does the time actually go?"
  Options: "Decisions wait on one or two people" · "Rework, because we
  built the wrong thing" · "Handoffs between product, design, and eng" ·
  "We bought AI tools and nothing got faster" · "Speed isn't really our
  problem" [exclusive]

**Product health**
- Anchor: "How much is flat product health costing you?"
  Support: "Usage, activation, the numbers that won't move."
- Evidence (multi): "What does the flatness look like?"
  Options: "People sign up and don't come back" · "Onboarding loses them
  early" · "Features ship and the numbers don't move" · "We can't tell
  which users get value" · "The numbers are healthy, honestly" [exclusive]

## Cross-cutting closers (always, in order)

**AI reality:** "Is AI actually changing how you build?"
Support: "Real means it shows up in how the team works, not just a tab
someone has open."
Options: "Not really" · "Individuals use it ad hoc" · "It helps a few
workflows" · "It's part of how the team works" · "It's reshaping our
roadmap"

**Blocker (multi):** "What's kept you from moving on this?"
Support: "No wrong answer. This is the honest part."
Options: "No time to step back and think" · "We lack conviction on the
answer" · "The skill isn't on the team" · "Leadership isn't aligned" ·
"We keep starting and not finishing"

**Readiness:** "What are you ready to do about it?"
Options: "Get a sharp answer to one blocking question" · "Step back and
re-find focus" · "Prototype the answer before committing" · "Put a senior
product voice in the room" · "I mostly want an outside read first"

## The report: the Product Read

Payload FORKS from SMB here. No automation map, no tool demos. Structure:

### 1. Masthead
- Kicker: "Product read · {Month Year}"
- H2: the named read (below)
- Overall line: `{grade}. {note}`

### 2. "What's really going on" — the diagnosis
One tight paragraph built from the dominant area (highest cost-weight) +
its evidence. The one honest sentence a good product advisor says after
listening. This replaces the SMB "your week, sorted" map.

### 3. What we heard (verdicts)
One reflect-don't-sell line per flagged area, derived from anchor +
evidence. Same voice discipline as the SMB engine: mirror what they said
and what it costs; the remedy lives in the move, not here. (20 lines
drafted below.)

### 4. The move — the highest-leverage AI move, then how we'd help
Replaces SMB "ranked moves." Reframed 09-03 (Charlie): the move TEACHES
the best AI leverage for their situation, in Charlie's own language from
his published writing, so the read is worth keeping even if they never
book. The engagement shape is the "want help doing this" follow-on, not
the headline.

Two parts:

**(a) The leverage move** — one per dominant area (highest cost-weight),
sourced from a specific essay:

| dominant area | move copy | source essay |
|---|---|---|
| direction | "Settle the argument with a prototype, not a meeting. When building is cheap, the fastest way to know what to build is to build the smallest real version and put it in front of someone. The roadmap debate is usually a research question in disguise." | The Madrona Product Thesis |
| signal | "Close the loop on every release. AI made research synthesis and validation cheap enough that shipping into the dark is now a choice, not a constraint. Instrument the assumption, not just the feature." | The Madrona Product Thesis |
| velocity | "You bought AI tools and delivery didn't get faster because tools amplify a workflow, they don't fix it. Go upstream and fix the system that produces the work, not the output in front of you. That's the move that compounds." | Solve the system, not the symptom |
| health | "Get an honest read on who actually gets value. That read is the cheapest it has ever been, and it's the input every roadmap bet needs. Flat numbers are usually a signal problem before they're a product problem." | The Madrona Product Thesis |
| none | "The strongest time to sharpen a product is when it's already working. Encode what's working so it compounds instead of merely holding." | The engine behind everything we ship |

Each move renders with a "Read the thinking ->" link to its source essay
(the reflect-don't-sell verdicts stay upstream in "what we heard"; the
essay link is where the depth lives).

**(b) How we'd help** — the engagement shape, mapped from readiness
(primary) and dominant area (colors it). Plain, honest about what it is
and isn't. Links to `/how-it-works` and `/charlie`.

Readiness -> shape:
- "Get a sharp answer to one blocking question" -> **Strategy sprint**
- "Step back and re-find focus" -> **Strategy sprint** (wider framing)
- "Prototype the answer before committing" -> **Strategy sprint**
  (prototype-led); if signal-dominant, **Signal sprint**
- "Put a senior product voice in the room" -> **Product stewardship**
- "I mostly want an outside read first" -> the free 30 minutes

### 5. Worth reading
Personalized POV picks from the thinking feed, grounded in the actual
library (not decorative). Mapping:
- **Always:** The Madrona Product Thesis (the backbone of this track).
- Velocity flagged, or the "we bought AI tools and nothing got faster"
  chip checked -> **Solve the system, not the symptom**.
- Readiness = "put a senior product voice in the room", or 3+ areas
  flagged -> **The engine behind everything we ship** (encode judgment,
  compounding, the deliverable is a business that doesn't need us).
Capped at three; the thesis always leads.

### 6. Foot
"Keep this read" (print) · "Assembled from your answers · no email
required"

## Named reads (dominant area by cost-weight; DRAFTS)
- direction: "A roadmap full of requests, waiting for a bet."
- signal: "Shipping into the dark."
- velocity: "The bottleneck wears a lanyard."
- health: "The features that don't move the number."
- none: "A product that's working, worth a sharper look."

## Overall grades (by count of flagged areas)
- 0: "Steady hands." / "Nothing urgent flagged. Worth an outside read all the same."
- 1: "One clear question." / "One part of the product is asking for a decision, and it has a first step."
- 2: "Two knots to cut." / "Two areas flagged. Both are the kind an outside read moves quickly."
- 3+: "A product asking for a point of view." / "Several areas flagged, which usually traces back to one missing decision."

## Verdict lines (reflect, never sell — 4 areas x 5 evidence, DRAFTS)

**Direction** (evidence order above)
1. "Requests get logged but bets don't get made. A backlog is not a strategy; it's a list of everyone else's priorities."
2. "Leadership and the team want different things, so every roadmap is a negotiation instead of a plan. Alignment is the work here, not the obstacle to it."
3. "Every idea sounds reasonable, which is exactly why nothing gets cut. Without a thesis, you can't say no, and a roadmap you can't say no to isn't one."
4. "You plan quarters you don't finish. The gap between the plan and the done is usually a conviction problem wearing a capacity costume."
5. "The direction reads clear to you, which is the moment worth pressure-testing before you pour a quarter into it."

**Signal** (evidence order above)
1. "You ship and move on without measuring, so every release is a guess you never grade. The team is learning nothing from the thing it works hardest on."
2. "You have data but it doesn't change decisions. Data that doesn't move a decision is decoration, and it's expensive decoration."
3. "Research happens and then gets ignored, which is worse than no research: it spends the trust and skips the payoff."
4. "You hear from the loudest users, not the real ones. The squeaky wheel is steering a roadmap the quiet majority never voted for."
5. "You're well-instrumented, which means the raw material for sharper decisions is already sitting there, waiting to be read."

**Velocity** (evidence order above)
1. "Decisions wait on one or two people, so the org moves at the speed of their calendar. That's not a process problem; it's a concentration problem."
2. "The drag is rework, because the wrong thing keeps getting built. Speed isn't the fix when the direction is off; it just gets you to the wrong place sooner."
3. "The time goes to handoffs between product, design, and eng. Every handoff is a chance to lose intent, and you're paying that tax on every feature."
4. "You bought AI tools and delivery didn't get faster, because tools don't fix a workflow, they amplify it. Automating the wrong step just does the wrong thing quicker."
5. "Speed isn't really your problem, which means the real constraint is somewhere upstream of shipping. Worth finding before you optimize the part that already works."

**Product health** (evidence order above)
1. "People sign up and don't come back. Acquisition is filling a bucket that leaks faster than you can pour, and every dollar of growth spend leaks with it."
2. "Onboarding loses them early, which means you're losing users at their most motivated moment. The gap between signup and value is where the product lives or dies."
3. "Features ship and the numbers don't move, which usually means they're answering a question users weren't asking. Output is not the same as impact."
4. "You can't tell which users get value, so you're flying the product on vibes. Without that read, every roadmap bet is placed blind."
5. "The numbers look healthy, which is the best time to ask what would make them compound instead of merely hold."

---

# THE BUILDER TRACK — "I'm building something"

The founder/builder just getting started, or a few steps in and stuck.
Grounded in **A starter guide to building real software with AI** (the
backbone) and **Solve the system, not the symptom** (the judgment cuts).
Same chassis as the other two; payload forks to a builder's diagnosis +
the highest-leverage build move.

## The framing shift

The builder doesn't feel the problem as time (SMB) or as stuck-product
(product lead). They feel it as **momentum**: am I moving, or circling?
So the opener is stage-and-friction framed, and the anchor scale measures
**how much a thing is holding them up**.

## Q0 — the opener (multi-select)

Prompt: **"Where are you, and what's in the way?"**
Support: "Tap everything that's true. We only ask about what you flag,
then hand you a read you keep either way."

Chips (id -> label -> area):

| id | chip label | area |
|----|-----------|------|
| real     | I have an idea but don't know if it's real       | idea |
| shifting | I keep changing what it even is                   | idea |
| who      | I can't tell who it's actually for               | idea |
| cant     | I can picture it but can't build it              | build |
| whatbuild| I can build, but I'm not sure what to build      | build |
| unfinished | I've been building for months without shipping | build |
| untested | I've never put it in front of a real user        | signal |
| nice     | People say nice things but nobody really uses it | signal |
| blind    | I don't know what signal I'm even looking for    | signal |
| nextmove | I have a prototype and don't know the next move  | judgment |
| opinion  | I need a sharp opinion, not more options         | judgment |
| tools    | I'm learning the tools faster than the judgment  | judgment |

Reply-pill short labels: "Is it real?", "Keeps changing", "Who it's for",
"Can't build it", "What to build", "Building forever", "Never tested",
"Nice words, no use", "What signal?", "What's next", "Need an opinion",
"Tools, not judgment".

Plus free-text: "+ what else is in the way" (optional; echoes in the
read, feeds phase-2 LLM later).

### The four areas (modules)

| area | module label |
|------|-------------|
| idea     | The idea |
| build    | The build |
| signal   | Signal |
| judgment | Judgment |

An area is flagged when >=1 of its chips is checked. Mint seam after the
opener: "Flagged. {area names}. We only ask about these, then hand you a
read you keep either way."

## Per-area evidence pairs (flagged areas only, order idea -> build ->
signal -> judgment)

Shared momentum scale (weights [1,3,6,9,8]):
`["A question in the back of my mind", "Slowing me down", "I keep circling it", "It's the thing stopping me", "I've stalled out here"]`

**The idea**
- Anchor: "How much is the idea question holding you up?"
  Support: "Whether it's real, and who it's for."
- Evidence (multi): "What's fuzzy about it?"
  Options: "I'm not sure the problem is real" · "I can't name who it's
  for" · "It keeps changing shape on me" · "I have too many ideas, not
  one" · "Honestly, the idea is clear" [exclusive]

**The build**
- Anchor: "How much is the building itself holding you up?"
  Support: "Getting from idea to a thing that runs."
- Evidence (multi): "Where does it break down?"
  Options: "I can picture it but can't make it" · "I can make things but
  not sure what to make" · "I start and never finish" · "The tools slow
  me down more than help" · "Building isn't my bottleneck" [exclusive]

**Signal**
- Anchor: "How much is not knowing if it works holding you up?"
  Support: "Whether real people actually want it."
- Evidence (multi): "What's the honest state of signal?"
  Options: "I've never put it in front of a real user" · "People are nice
  but nobody comes back" · "I don't know what to measure" · "I'm building
  on my own hunches" · "I've got real signal already" [exclusive]

**Judgment**
- Anchor: "How much is knowing the next move holding you up?"
  Support: "What to do with what you've got."
- Evidence (multi): "Where are you stuck?"
  Options: "I have a prototype and don't know what's next" · "I want a
  sharp opinion, not more options" · "I'm learning tools faster than
  judgment" · "I can't tell which feedback to trust" · "I know my next
  move" [exclusive]

## Cross-cutting closers (always, in order)

**AI reality:** "How are you building with AI today?"
Support: "Where you are in the loop, honestly."
Options: "I haven't really started" · "I poke at ChatGPT" · "I use it for
pieces" · "I build with agents daily" · "I've got a real working loop"

**Blocker (multi):** "What's kept you from shipping this?"
Support: "No wrong answer. This is the honest part."
Options: "No time outside the day job" · "I don't trust it's good enough"
· "I don't know what to build next" · "I keep starting over" · "I'm doing
it alone and stuck"

**Readiness:** "What are you ready to do about it?"
Options: "Get unstuck on one specific thing" · "Step back and find the
real idea" · "Get the smallest version in front of people" · "Get a
senior product brain in the room" · "I mostly want an outside read first"

## The report: the Builder's Read

Same payload family as the product track: diagnosis + move + engagement,
grounded in the Starter Guide.

### 1. Masthead
- Kicker: "Builder's read · {Month Year}"
- H2: the named read (below)
- Overall line: `{grade}. {note}`

### 2. "What's really going on" — the diagnosis
One tight paragraph from the dominant area (highest momentum-weight) +
its evidence. The honest, encouraging thing a builder-friendly advisor
says after listening.

### 3. What we heard (verdicts)
One reflect-don't-sell line per flagged area. Builder voice: honest but
encouraging, never discouraging a person from building. (20 lines below.)

### 4. The move — the highest-leverage build move, then how we'd help

**(a) The leverage move** — one per dominant area, sourced from an essay:

| dominant area | move copy | source essay |
|---|---|---|
| idea | "Stop refining the idea on paper. The cheapest way to find out if it's real is to build the smallest version this week and use it yourself. Ideas stop being precious the moment they meet reality." | A starter guide to building real software with AI |
| build | "You don't need to become an engineer. Set up the loop once, you, the agents, GitHub, Vercel, and the world, and the syntax stops being your problem. That's an afternoon, not a degree." | A starter guide to building real software with AI |
| signal | "Get the smallest real version in front of real people and watch what they do, not what they say. Nice words aren't signal; a second visit is." | A starter guide to building real software with AI |
| judgment | "Ask why, not just what. You're building your own judgment, not just an app, and the fastest way to sharpen it is a sharp outside opinion at the decisions that matter." | Solve the system, not the symptom |
| none | "You're already moving, which is the hard part. The leverage now is building the judgment to aim it, one good question at a time." | Solve the system, not the symptom |

Each move renders with a "Read the thinking ->" link to its source essay.

**(b) How we'd help** — the engagement shape, mapped from readiness
(primary), dominant area colors it. Plain and honest.

Readiness -> shape:
- "Get unstuck on one specific thing" -> **Strategy sprint** (tight)
- "Step back and find the real idea" -> **Strategy sprint** (wider)
- "Get the smallest version in front of people" -> **Signal sprint**
- "Get a senior product brain in the room" -> **Product stewardship**
  (framed for a solo builder as an ongoing sounding board, not a retainer
  of headcount)
- "I mostly want an outside read first" -> the free 30 minutes

### 5. Worth reading
- **Always:** A starter guide to building real software with AI.
- Judgment flagged, or "learning tools faster than judgment" checked ->
  **Solve the system, not the symptom**.
- Readiness = "senior product brain in the room", or thinking past a solo
  build -> **The Madrona Product Thesis**.
Capped at three; the starter guide always leads.

### 6. Foot
"Keep this read" (print) · "Assembled from your answers · no email
required"

## Named reads (dominant area by momentum-weight; DRAFTS)
- idea: "A spark still finding its shape."
- build: "Big idea, missing the loop."
- signal: "Built in the dark."
- judgment: "Ready to ship, one decision short."
- none: "Already moving, worth a sharper eye."

## Overall grades (by count of flagged areas)
- 0: "Off and running." / "Nothing blocking flagged. An outside read still sharpens the aim."
- 1: "One thing in the way." / "One part of the build is the blocker, and it has a first step."
- 2: "Two knots to cut." / "Two areas flagged. Both are the kind a short outside push moves quickly."
- 3+: "Circling the same spot." / "Several areas flagged, which usually traces back to one missing decision or one missing loop."

## Verdict lines (reflect, never sell; encouraging — 4 areas x 5, DRAFTS)

**The idea** (evidence order above)
1. "You're not sure the problem is real, which is the most important thing to find out and the cheapest to test. Everything downstream is a guess until you do."
2. "You can't name who it's for, so no decision has anyone to answer to. 'Everyone' is the same as no one when you're choosing what to build."
3. "The idea keeps changing shape, which usually means it hasn't met reality yet. Ideas stop shifting the moment a real person touches them."
4. "You have too many ideas, not one, and optionality feels like progress. It isn't; it's the thing standing between you and shipping any of them."
5. "The idea reads clear to you, which is exactly the moment to put it in front of someone before you fall in love with it."

**The build** (evidence order above)
1. "You can picture it but can't make it, which used to be the end of the road and no longer is. The agents supply the syntax; you supply the judgment, and the setup is an afternoon."
2. "You can make things but aren't sure what to make, so the constraint isn't skill, it's direction. Building faster just gets you to the wrong thing sooner."
3. "You start and never finish, which is usually scope, not stamina. Something real and small you'll actually use beats something ambitious you'll abandon."
4. "The tools slow you down more than help, which almost always traces to setup, not the tools. The right loop, set up once, is the difference between fighting them and flying."
5. "Building isn't your bottleneck, which is worth knowing, because it points the real work upstream, at the idea or the signal."

**Signal** (evidence order above)
1. "You've never put it in front of a real user, so every choice so far is a hunch in a fact's clothing. The fastest way to know is to watch one person try it."
2. "People are nice but nobody comes back, and coming back is the only vote that counts. Kind words are the noise; a second visit is the signal."
3. "You don't know what to measure, so you can't tell progress from motion. Pick the one action that means it's working, and watch only that at first."
4. "You're building on your own hunches, which is fine to start and dangerous to keep. Your taste got you here; real users take you the rest of the way."
5. "You've got real signal already, which is the thing most builders never reach. The move now is to read it sharply, not gather more."

**Judgment** (evidence order above)
1. "You have a prototype and don't know the next move, which is the good problem: the making is done and the deciding begins. That's where an outside read earns its keep."
2. "You want a sharp opinion, not more options, and you're right to. Past a point, more options is just a way to avoid the decision."
3. "You're learning the tools faster than the judgment, which is the trap of this moment. The tools are the easy part; knowing what's worth building is the whole game."
4. "You can't tell which feedback to trust, which is its own skill. Not all signal is equal, and learning to weight it is most of the craft."
5. "You know your next move, so the read here is a gut-check, not a map. Worth a second pair of eyes before you commit the time."

---

## Engine notes (for the build, not for review)

- Reuse the `OppQuestion` shape, `buildSequence`, multi-select + exclusive
  machinery verbatim. New types per track: `ProductAreaId`/
  `ProductAnswers` and `BuilderAreaId`/`BuilderAnswers`.
- The chassis (WhereToStart.tsx flow, live pane, keyboard, analytics)
  becomes track-parameterized. Report renderers fork three ways:
  `OpportunityReport.tsx` (SMB) · `ProductReadReport.tsx` ·
  `BuilderReadReport.tsx`. The product and builder reports share a layout
  (diagnosis + verdicts + move + reading), so likely one component with a
  data prop, not two.
- Board hues (frond board, TBD): product = direction/fir · signal/moss ·
  velocity/copper · health/plum. builder = idea/copper · build/fir ·
  signal/moss · judgment/plum.
- Analytics: a `track` param on the existing `wts_*` events (one funnel
  view; leaning this over new prefixes).
- Chooser at `/where-to-start`: three cards -> `/ai-opportunities` (SMB,
  unchanged) · `/where-to-start/product` · `/where-to-start/building`
  (routes TBD, pending names).

## Open questions for Charlie

1. **Payload fork** — agree both new reports are diagnosis + leverage move
   + engagement (not an automation map)? Load-bearing; everything else is
   copy.
2. **Persona labels** — chooser cards: "I run a business" / "I lead
   product" / "I'm building something". Sharp and on-brand, or reword?
   ("I lead product" vs the bigger/muddier "I work at a company" is the
   one most worth deciding.)
3. **Naming** — the two new reads/routes. "The Product Read" and "The
   Builder's Read"? Something else?
4. **Reads and verdicts** — voice calibration across both tracks. Too
   clever anywhere? The builder verdicts especially should stay
   encouraging, never talk someone out of building.
5. **Sequence** — SMB stays flagship-live; which new track do we build
   first? (Product is more on-brand; builder has the cleaner single-essay
   backbone.)
