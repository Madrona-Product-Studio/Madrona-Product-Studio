# Madrona Signal Assessment
## 02 — Interface + Motion Design Specification

# 1. Design objective

The assessment should feel like a cutting-edge strategic product, not a decorated questionnaire.

The interface must create three simultaneous impressions:

1. **Editorial intelligence** — confident, thoughtful, well-composed
2. **Technical capability** — clearly more advanced than the rest of the site
3. **Active interpretation** — the experience is visibly learning from each answer

The reference visual direction is a dark, immersive “adaptive pathway” interface with:
- warm editorial type
- dark Madrona surfaces
- subtle technical structure
- luminous but restrained active states
- a large live visualization

Avoid turning this into generic enterprise software.

---

# 2. Overall page architecture

Desktop-first prototype.

Use a full-height assessment shell with a maximum width around `1440–1560px` and a centered immersive panel.

Recommended viewport behavior:

```css
min-height: 100dvh;
padding: clamp(16px, 2vw, 32px);
```

Assessment shell:

```css
border-radius: 24px;
overflow: hidden;
background: var(--assessment-bg);
border: 1px solid rgba(255,255,255,.08);
box-shadow:
  0 30px 80px rgba(0,0,0,.20),
  inset 0 1px 0 rgba(255,255,255,.03);
```

Do not render fake browser chrome in the actual site.

---

# 3. Desktop grid

Use three functional regions:

## A. Progress rail
Width: `220–260px`

Contains:
- Madrona / assessment identifier
- stage progress
- question count
- optional small “analysis status”
- privacy reassurance

Keep visually quiet.

## B. Question workspace
Width: `440–560px`

Contains:
- stage eyebrow
- large question
- supporting text
- answer options
- navigation

This is the primary reading / interaction area.

## C. Signal Brain
Flexible, minimum `520px`

Contains:
- `LIVE PATHWAY` / `LIVE ANALYSIS`
- status line
- graph
- small current-read statement when useful

The brain must get enough space to feel important.

Suggested grid:

```css
grid-template-columns:
  minmax(220px, 0.62fr)
  minmax(440px, 1.25fr)
  minmax(520px, 1.65fr);
```

At narrower desktop widths, collapse the progress rail before shrinking the brain excessively.

---

# 4. Dark-mode visual system

Use an immersive green-black rather than flat black.

Suggested starting tokens:

```css
--assessment-bg: #101613;
--assessment-surface: #151b18;
--assessment-surface-2: #19201c;
--assessment-surface-3: #1d2520;

--assessment-text: #f0ece5;
--assessment-text-secondary: #a6afa8;
--assessment-text-tertiary: #69736d;

--assessment-border: rgba(226,232,226,.10);
--assessment-border-strong: rgba(226,232,226,.18);

--assessment-green: #62a184;
--assessment-green-bright: #82d0aa;
--assessment-green-glow: rgba(83,210,161,.22);

--assessment-orange: #c9663f;
--assessment-orange-bright: #ee936a;
--assessment-orange-glow: rgba(238,147,106,.25);

--assessment-warm: #eee8df;
```

Align with the existing Madrona palette if actual project tokens differ.

---

# 5. Texture

The prototype should have subtle material depth.

Use layers such as:

```css
background:
  radial-gradient(circle at 70% 42%, rgba(72,128,103,.08), transparent 34%),
  linear-gradient(rgba(255,255,255,.012), rgba(255,255,255,.012)),
  #101613;
```

Optional:
- static 1–2% monochrome grain overlay
- extremely faint grid behind the brain
- soft edge vignette
- low-opacity radial field centered on active outcome

Avoid:
- heavy glass blur
- floating glass cards everywhere
- high-saturation gradients
- strong drop shadows
- shiny “AI” styling

---

# 6. Typography

Use the site's actual Madrona type system.

Recommended roles:

## Interface sans
For:
- navigation
- status
- answer controls
- labels
- metadata

## Editorial serif
For:
- major question headlines
- archetype result
- occasional synthesis statements

Suggested scale:

```css
.question {
  font-size: clamp(38px, 3.2vw, 58px);
  line-height: .98;
  letter-spacing: -0.03em;
}

.result-title {
  font-size: clamp(50px, 5vw, 84px);
  line-height: .92;
}

.eyebrow {
  font-size: 12px;
  letter-spacing: .14em;
  text-transform: uppercase;
}
```

Questions should feel like important editorial prompts, not form labels.

---

# 7. Progress rail

The rail should orient without feeling like a checklist-heavy dashboard.

Use 4 high-level phases:

1. Context
2. Friction
3. Direction
4. Synthesis

Map seven questions to phases.

Example:

- Q1 → Context
- Q2–4 → Friction
- Q5–7 → Direction
- Result → Synthesis

Visual:
- tiny nodes connected vertically
- active phase brighter
- previous phases retain a quiet green check
- future phases recede

Avoid listing all seven question titles permanently. Too noisy.

Optional microcopy:

> Assessment intelligence adapting

only if truthful / appropriate to `analysisMode`.

---

# 8. Question area

Each step:

1. eyebrow / stage
2. question
3. supporting sentence
4. answer list
5. navigation

Keep one question visible at a time.

No card around the entire question area unless needed for structure.

The dark field itself should be the container.

---

# 9. Answer controls

Answer cards should feel responsive and tactile.

Default:

```css
min-height: 62px;
border: 1px solid var(--assessment-border);
border-radius: 14px;
background: rgba(255,255,255,.018);
```

Hover:
- border brightens slightly
- background rises 1–2%
- icon gets a subtle accent
- card translates `-1px` or scale `1.003`

Selected:
- warm orange or green border depending on design choice
- subtle internal gradient
- confirmation dot / check
- optional glow at icon, not around entire card

Selected animation:
- border traces in
- check resolves
- visual pulse exits the card toward the Signal Brain

Do not use giant pill buttons or default radio controls.

---

# 10. Answer-to-brain connection

This is a signature transition.

When an answer is selected:

### Stage 1 — Local confirmation
`0–140ms`
- selected card locks
- icon / edge color activates

### Stage 2 — Signal launch
`120–380ms`
- a small luminous point appears near the right edge of the answer card
- it moves toward the Signal Brain boundary using a curved path
- this can be an overlay SVG between columns

### Stage 3 — Brain ingest
`320–620ms`
- the pulse reaches a new or existing evidence node
- evidence node blooms briefly
- propagation begins

### Stage 4 — Brain rebalance
`500–1250ms`
- active nodes and routes update
- latent routes dim slightly
- likely destination shifts

### Stage 5 — Settle
`1100–1450ms`
- ambient motion returns
- `Continue` is available

Do not force the user to wait the full sequence before navigating. The last 300–500ms can finish while the next question enters.

---

# 11. Navigation

Prefer:
- selected answer auto-enables `Continue`
- Enter key advances
- Back is quiet
- no `Skip` unless explicitly desired

Primary button:
- warm orange or deep green with high contrast
- modest glow only on hover

No huge CTA.

---

# 12. Progress behavior

Avoid a standard percentage ring.

Use one of:
- thin segmented line
- small phase dots
- quiet `04 / 07`

At the top of question workspace:

`QUESTION 04 / 07`

At bottom rail:
small phase line.

The brain itself should communicate emotional progress.

---

# 13. System status language

The experience may display one short live observation near the brain.

Examples:
- `A pattern is starting to form.`
- `Operations is becoming a stronger signal.`
- `We’re seeing a relationship between capacity and systems.`
- `Two paths are still plausible.`
- `Your desired outcome is sharpening the direction.`

These messages must be derived from engine state.

Do not surface more than one at a time.

Visual:
- small icon
- restrained panel or simple text
- never compete with the question

---

# 14. Interstitial moments

Use at most 2–3 brief interstitial transitions in the seven-question flow.

Good places:
- after Q2
- after Q4
- before synthesis

Example interstitial:
dark field, brain centered and slightly enlarged.

Text:

> We’re starting to see a throughline.

Duration:
`700–1100ms`, skippable through the natural flow.

These moments should create drama without slowing the assessment.

---

# 15. Intro screen

Keep simpler than the assessment itself.

Possible copy:

**Eyebrow**
A quick signal check

**Headline**
Your business is telling you something.

**Body**
Seven quick questions. We’ll map the pattern, show where the strongest opportunity may be, and suggest a useful place to start.

**CTA**
Start the assessment

**Meta**
About 2 minutes. No email required.

Visual:
- Signal Brain in dormant state
- only a few dim nodes
- one faint pulse
- promise of what it will become

---

# 16. Final synthesis transition

This should be the most cinematic moment.

After final answer:

### 0–400ms
Question UI gently recedes.

### 350–900ms
Signal Brain expands into more of the available canvas.

### 600–1500ms
Evidence nodes pull into stronger signal clusters.

### 1000–1900ms
Weak routes fade.
Primary route strengthens.
Secondary route remains visible but quiet.

### 1400–2300ms
Destination / attractor rings become visible.
Active path arcs toward the primary outcome.

### 1900–2600ms
Core and outcome pulse once together.

Copy sequence:
- `Reading the pattern…`
- `Finding the throughline…`
- `Mapping your strongest opportunity…`

### ~2600ms
Lock final graph.
Reveal result content.

Respect reduced motion.

---

# 17. Result layout

Do not immediately replace the brain.

The final brain is visual evidence of the result.

Desktop result:

## Left / center
- archetype
- interpretation
- strongest signals
- best place to start
- recommended engagement

## Right
- final Signal Brain state
- pathway emphasis
- optional primary / secondary pathway label

Suggested hierarchy:

**Eyebrow**
Your current pattern

**Title**
The Duct-Tape Operator

**Interpretation**
2–3 sentences

**Strongest signals**
3 compact rows

**Best place to start**
Operations & AI

**Recommended first move**
Workflow opportunity sprint

**CTA**
Talk through the result

Secondary:
Email this result to me

No lead capture wall before the result.

---

# 18. Motion tokens

Use a shared motion module.

```ts
export const motion = {
  instant: 0.12,
  fast: 0.22,
  standard: 0.4,
  deliberate: 0.7,
  ingest: 0.95,
  brainResponse: 1.2,
  interstitial: 0.9,
  synthesis: 2.6,
};
```

Suggested easing:

```ts
easeOutExpo = [0.16, 1, 0.3, 1];
easeSoft = [0.22, 0.61, 0.36, 1];
```

Use springs sparingly.

Avoid bounce.

---

# 19. Ambient motion

Use ambient animation only inside the Signal Brain / background.

Examples:
- core breath: `scale 1 → 1.025 → 1`
- low-alpha particle drift
- slight path shimmer
- soft moving radial glow
- occasional tiny node pulse

Keep loop durations long:
- `5–12 seconds`
- different phase offsets

Nothing should flash.

---

# 20. Mobile

Do not compress the desktop command center.

Mobile architecture:

1. compact header / progress
2. question
3. answers
4. compact Signal Brain preview
5. continue

Signal Brain:
- can be `320–420px` tall
- simplified labels
- same topology / state
- fewer decorative layers

On answer:
- selected card emits a short upward pulse to the brain
- brain responds
- next question slides in

Result:
- archetype first
- final brain second
- recommendation third
- CTA

---

# 21. Accessibility

Requirements:
- semantic buttons
- visible keyboard focus
- Enter to advance where safe
- no color-only information
- descriptive text for brain state
- reduced-motion mode
- sufficient contrast
- no essential copy rendered only inside SVG

For screen readers, Signal Brain should expose a concise summary:

> Current strongest signals: Operational friction, system fragmentation, and team capacity. Operations & AI is the leading pathway, with Customers & Growth secondary.

Update this via an `aria-live="polite"` region after each settled state, not during every animation frame.

---

# 22. Reduced motion

When `prefers-reduced-motion`:
- no traveling particles
- no node drift
- no path morph animation
- selected answer fades to updated brain state over `150–250ms`
- synthesis uses crossfade / opacity changes
- preserve all meaning

---

# 23. Performance

Targets:
- smooth 60fps on modern desktop
- avoid layout animation for the graph
- animate SVG transforms / opacity / stroke-dashoffset
- memoize graph geometry
- no high-count particle systems
- no video
- no unnecessary blur filters over huge surfaces

---

# 24. Component structure

Suggested:

```text
components/assessment/
  AssessmentShell.tsx
  AssessmentIntro.tsx
  ProgressRail.tsx
  QuestionPanel.tsx
  AnswerOption.tsx
  AnalysisStatus.tsx
  SignalBrain.tsx
  SignalBrainA11y.tsx
  SynthesisTransition.tsx
  ResultView.tsx
  PathwayMatch.tsx
  RecommendationCard.tsx
```

Keep Signal Brain implementation isolated enough to run in its lab.

---

# 25. Interface definition of done

The UI is ready for integration when:

- question hierarchy feels premium with no brain present
- selected answer state feels tactile and fast
- dark palette feels like Madrona, not generic AI software
- the brain has enough canvas space
- progress is useful but quiet
- interstitials add tension without slowing the user
- result preserves the final brain state
- mobile is intentionally redesigned
- reduced motion is complete
