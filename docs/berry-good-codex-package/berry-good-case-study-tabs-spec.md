# Berry Good Case Study Tabs
## Codex implementation and asset specification

**Project:** Madrona Product Studio consulting website
**Feature:** Berry Good end-to-end demonstration business
**Status:** Build specification, v1
**Primary reference:** `assets/reference/case-study-tabs-master-reference.png`

---

## 1. What this section must communicate

Berry Good is not only a branding sample. It demonstrates how Madrona can improve one business across identity, customer experience, operations, and applied AI.

The section should leave a visitor with this idea:

> One recognizable brand. One connected customer journey. One source of truth behind the scenes.

The experience is organized into five views:

1. Brand system
2. Digital storefront
3. Customer journey
4. Operations
5. AI assistance

Do not label the fourth view “Farm operations.” Use **Operations** everywhere.

---

## 2. Important implementation rule

The provided PNG files are visual references, not production UI assets.

Recreate the layouts with real HTML, CSS, and reusable components. Do not place screenshots of the complete tab views into the site as the final implementation. Individual photography and brand artwork may be image assets, but text, controls, cards, diagrams, and interface mockups should remain real layout elements whenever practical.

Use the exact Berry Good SVG mark files supplied in `assets/brand/`.

---

## 3. Section structure

### Desktop composition

Use a two-part shell:

- Fixed introduction column on the left
- Interactive case-study panel on the right

Suggested grid:

```css
.berry-case-study {
  display: grid;
  grid-template-columns: minmax(280px, 0.72fr) minmax(760px, 2.45fr);
  gap: clamp(32px, 4vw, 72px);
  align-items: stretch;
}
```

Recommended maximum width:

```css
max-width: 1500px;
margin-inline: auto;
```

Outer section treatment:

```css
background: #eee7dc;
border-radius: 32px;
padding: clamp(28px, 4vw, 72px);
```

The right panel should use:

```css
background: #fffdf6;
border: 1px solid rgba(43, 22, 31, 0.14);
border-radius: 22px;
overflow: hidden;
```

### Tablet

Below roughly `1100px`:

- Stack the introduction above the tab panel.
- Keep the tabs horizontal and scrollable.
- The visual and narrative areas may become a 60/40 split.

### Mobile

Below roughly `720px`:

- Do not hide the case study behind a tiny tab control.
- Convert the five views into an accessible accordion or a vertically stacked story.
- Each view should show its headline and summary before revealing its visual.
- Preserve the sequence from Brand system through AI assistance.

---

## 4. Introductory column

### Eyebrow

`ONE BUSINESS, IMPROVED END TO END`

Use Spline Sans Mono or the site’s established micro-label face:

```css
font-size: 12px;
font-weight: 650;
letter-spacing: 0.14em;
text-transform: uppercase;
```

### Demonstration label

`DEMONSTRATION BUSINESS`

Render as a small leaf-tinted pill. It should clearly disclose that Berry Good is fictional without making the case study feel apologetic.

### Title

`Berry Good Berry Farm`

Use the site’s editorial display type at approximately:

```css
font-size: clamp(48px, 4.5vw, 76px);
line-height: 0.95;
letter-spacing: -0.04em;
```

### Description

Use this copy:

> A fictional farm showing how brand, customer experience, operations, and AI can become one coherent business system.

### Three proof points

Show beneath a quiet divider:

- One identity
- One source of truth
- A simpler day for everyone

Use small line icons, not emoji.

---

## 5. Tab navigation

### Labels

Use these exact labels:

- `01 Brand system`
- `02 Digital storefront`
- `03 Customer journey`
- `04 Operations`
- `05 AI assistance`

Short mobile labels may be:

- Brand
- Storefront
- Journey
- Operations
- AI

### Behavior

- Use semantic `button` elements inside a `tablist`.
- Support arrow-key navigation.
- Apply `aria-selected`, `aria-controls`, and matching tab panel IDs.
- Preserve active state in the URL hash only if the site already uses deep links.
- Use a restrained crossfade or 12–20 px horizontal transition between views.
- Respect `prefers-reduced-motion`.

### Styling

Inactive tabs:

```css
color: #6b6862;
background: transparent;
font-weight: 450;
```

Active tab:

```css
color: #221f1c;
font-weight: 700;
```

Use a raspberry or warm terracotta underline, approximately `3px` high. Avoid filled active tabs.

---

## 6. Shared tab-panel template

Every tab should use a consistent internal grammar:

1. Dominant visual area
2. Small uppercase category label
3. Outcome-led headline
4. Short explanation
5. Three concrete capabilities
6. Optional supporting tokens or status chips

On wide screens, use a roughly 60/40 split. Alternate visual direction only when it improves the sequence. Do not radically redesign each tab.

Shared capability-list style:

- Three items maximum
- Small circular check icon
- Plain language
- One line when possible

---

# 7. Tab 01: Brand system

## Narrative

**Label:** `BRAND DIRECTION`

**Headline:**

> Warm, trustworthy, and unmistakably local.

**Description:**

> A cohesive identity that shows up on every touchpoint, from the berry box to the roadside sign.

**Capabilities:**

- Visual identity and brand guide
- Packaging, signage, and print
- Photography direction and voice

## Visual composition

Create a warm tabletop brand-world composition using:

- Berry Good brand guide sheet
- Mobile storefront mockup
- Raspberry carton or flat label
- Round picking or product tag
- Thank-you or honor-box card
- Fresh raspberries, leaves, twine, and kraft paper

The existing brand-style image is a directional reference. For production, build the foreground artifacts as separate layers when practical so the composition remains crisp and responsive.

## Color tokens

Show four restrained color dots below the capability list:

- Deep leaf or green-black
- Raspberry
- Gold
- Warm neutral

These are decorative summaries, not the complete palette.

## Reference

`assets/reference/01-brand-system-reference.png`

---

# 8. Tab 02: Digital storefront

## Narrative

**Label:** `DIGITAL STOREFRONT`

**Headline:**

> Know what’s ripe before you go.

**Description:**

> A website that answers the questions customers actually have, beautifully and quickly on any device.

**Capabilities:**

- Live availability and crop updates
- Seasonal commerce and pre-orders
- Hours, directions, and farm information

## Visual composition

Build a desktop browser mockup as the dominant element. Pair it with a mobile view and two smaller information cards.

### Desktop screen content

Header:

- Berry Good logo
- What’s ripe
- Berries
- Visit
- About
- Order now

Hero:

- `Raspberries are at peak.`
- Supporting line: `The best berries. Picked today.`
- Primary action: `Order berries`
- Secondary action: `See what’s ripe`

Below the hero, show a compact availability rail with crop names and status.

### Mobile screen content

Title:

`What’s Ripe Today`

Example statuses:

- Raspberries — Peak
- Blackberries — Picking
- Blueberries — Good
- Tayberries — Limited

Primary action:

`Order now`

### Supporting cards

**Farm info**

- Open today
- 8am–6pm
- Nooksack Valley, WA
- Get directions

**Stay in the loop**

- Peak alerts, updates, and last calls
- Email field and compact submit action

## Reference

`assets/reference/02-digital-storefront-reference.png`

---

# 9. Tab 03: Customer journey

## Narrative

**Label:** `CUSTOMER JOURNEY`

**Headline:**

> Simple from start to pickup.

**Description:**

> A clear, connected experience from discovery to the stand.

**Capabilities:**

- Browse availability
- Order and confirm
- Pickup with ease

## Visual composition

Create a four-step horizontal journey on desktop and vertical journey on mobile.

### Step 1: Discover

Caption:

`See what’s ripe today.`

Screen:

- Availability list
- Crop statuses
- Simple quantity context

### Step 2: Order

Caption:

`Choose berries and a pickup window.`

Screen:

- Product
- Quantity
- Pickup time
- Price
- Continue action

### Step 3: Confirm

Caption:

`Get your confirmation and details.`

Screen:

- Thank-you message
- Order number
- Pickup date and time
- Farm address or instructions
- View order action

### Step 4: Pickup

Caption:

`Park, check in, and we’ll have it ready.`

Screen:

- Welcome message
- Order number
- “I’m here” action
- Brief pickup instruction

Connect the stages using a thin arrow line, but do not imply a complicated process. Include one warm documentary photo of the farmstand at the final stage.

## Reference

`assets/reference/03-customer-journey-reference.png`

---

# 10. Tab 04: Operations

## Narrative

**Label:** `OPERATIONS`

**Headline:**

> Run the day from one simple dashboard.

**Description:**

> Update once. Keep the website, orders, signs, and customers in sync.

**Capabilities:**

- Inventory and crop status
- Orders and pickup queue
- Hours, messages, and publishing

## Visual composition

Show a branded but practical operations dashboard. It should feel lighter and friendlier than enterprise SaaS while remaining credible.

### Navigation

- Dashboard
- Inventory
- Orders
- Pickups
- Messages
- Settings

### Main header

`Today at the Farm`

### Overview cards

Crop examples:

- Raspberries — 20 pints — Peak
- Blackberries — 10 pints — Picking
- Blueberries — 42 pints — Good
- Tayberries — 0 pints — Limited

### Lower modules

**Orders**

- Total orders
- Awaiting pickup

**Pickups**

- Next pickup
- Pickup time
- Customer name

**Site status**

- Availability: Live
- Last updated
- Publish updates button

### Messages panel

Examples:

- New message: “Do you have any raspberries left for today?”
- New order: `#BGF-0123`
- Low stock alert: `Tayberries under 10 pints`

The dashboard must use the same brand tokens as the consumer site. Do not switch to generic blue SaaS styling.

## Reference

`assets/reference/04-operations-reference.png`

---

# 11. Tab 05: AI assistance

## Narrative

**Label:** `AI ASSISTANCE`

**Headline:**

> Helpful answers. Handled with care.

**Description:**

> AI helps capture orders and answer questions, so the team can focus on the farm and customers.

**Capabilities:**

- Answer questions in the farm’s voice
- Capture orders by chat or text
- Summarize and route requests

## Visual composition

Use a quiet three-part workflow:

1. Customer conversation
2. AI assistant structure
3. Farm-team review

### Customer conversation

Example:

Customer:
`Hi! Do you have raspberries today?`

Assistant:
`Yes. Raspberries are at peak today.`

Customer:
`Great. Can I get 2 pints?`

Assistant:
`Absolutely. What time would you like to pick them up?`

Customer:
`Tomorrow morning around 10.`

### AI assistant output

Structured order summary:

- 2 pints raspberries
- Pickup: tomorrow at 10:00 AM
- Customer name
- Phone or email
- Total
- Send to farm team

### Farm-team card

- New order from AI
- Order number
- Customer
- Items
- Pickup time
- Accept
- View order

### Capabilities card

- Answer common questions
- Suggest quantities and options
- Capture and confirm orders
- Draft crop and weather updates
- Escalate when needed

Avoid robot icons, neon gradients, glowing effects, chat bubbles everywhere, or language that implies the AI operates without human oversight.

## Reference

`assets/reference/05-ai-assistance-reference.png`

---

## 12. Component inventory

Build the section from reusable components. Suggested component model:

```txt
BerryCaseStudy
├── CaseStudyIntro
├── CaseStudyTabs
│   └── CaseStudyTab
├── CaseStudyPanel
│   ├── PanelVisual
│   └── PanelNarrative
├── CapabilityList
├── DeviceFrame
├── BrowserFrame
├── JourneyStep
├── StatusChip
├── OperationsCard
├── ConversationMessage
└── ColorDots
```

Recommended content configuration:

```ts
type BerryCaseStudyTab = {
  id: "brand" | "storefront" | "journey" | "operations" | "ai";
  number: string;
  label: string;
  eyebrow: string;
  headline: string;
  description: string;
  capabilities: string[];
};
```

Keep copy in data rather than embedding it throughout the components.

---

## 13. Design tokens

Use the established Berry Good palette where the demo UI is shown. Use Madrona site tokens for the outer portfolio shell unless the current section already intentionally blends them.

Suggested local variables:

```css
.berry-case-study {
  --berry-cream: #faf5ea;
  --berry-paper: #fffdf6;
  --berry-butter: #f3e5c3;
  --berry-currant: #2b161f;
  --berry-ink: #33202a;
  --berry-ink-soft: #6b5560;
  --berry-raspberry: #b81f4d;
  --berry-raspberry-deep: #8e1739;
  --berry-leaf: #3d6b35;
  --berry-leaf-soft: #6f9556;
  --berry-gold: #e0a232;
  --berry-border: rgba(43, 22, 31, 0.14);
}
```

Recommended spacing:

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
```

Recommended radii:

```css
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-shell: 32px;
```

Borders should be more prominent than shadows. Use shadows only for physical objects and device mockups.

---

## 14. Typography

Inside Berry Good artifacts:

- Fraunces for expressive display headlines and wordmarks
- Karla for body copy and interface controls
- Spline Sans Mono for statuses, timestamps, micro-labels, and order numbers

In the outer Madrona case-study shell, preserve the site’s typography, but match the visual reference’s editorial hierarchy.

Do not use generated-image text as an exact typographic source. Rebuild all text with real type.

---

## 15. Motion

Use restrained motion only:

- Tab underline slides or fades
- Panel content crossfades over `180–260ms`
- Visual group may translate `12–20px`
- No parallax
- No continuous floating device animations
- No auto-rotating tabs
- Pause motion when the tab is not visible
- Fully support reduced-motion preferences

---

## 16. Accessibility

- All tabs must be keyboard operable.
- Maintain visible focus states.
- Text must remain real and selectable.
- Use descriptive alt text for documentary photography.
- Treat decorative mockup layers as decorative when their information is repeated in accessible text.
- Do not use color alone for crop or operational status.
- Ensure the smallest interface text remains legible at actual rendered size.
- Use a non-tab fallback so the full story remains accessible without JavaScript.

---

## 17. Asset manifest

### Production-ready supplied assets

- `assets/brand/berry-good-mark.svg`
- `assets/brand/berry-good-mark-one-color.svg`
- `berry-good-brand-guide.md`
- `berry-good-site-implementation-brief.md`

### Directional references

- `assets/reference/current-site-section.png`
- `assets/reference/brand-style-guide-reference.png`
- `assets/reference/case-study-tabs-master-reference.png`
- `assets/reference/01-brand-system-reference.png`
- `assets/reference/02-digital-storefront-reference.png`
- `assets/reference/03-customer-journey-reference.png`
- `assets/reference/04-operations-reference.png`
- `assets/reference/05-ai-assistance-reference.png`

Directional references contain generated details and should not be treated as exact production source files.

### Assets still required from implementation

- Real Berry Good web UI built as HTML/CSS components
- Browser and device frames
- Documentary farmstand photograph for the pickup view
- Raspberry product photography with clear usage rights
- Optional paper and kraft textures at subtle opacity
- Custom line icons or a licensed consistent icon set
- Exact final logo lockup if the wordmark is exported rather than typeset

Use existing approved photography when available. Do not scrape or ship imagery without usage rights.

---

## 18. Suggested build sequence

### Phase 1: Structure

- Add the five-tab data model
- Implement semantic tabs
- Build responsive shell
- Place final copy
- Use simple placeholder blocks for visuals

### Phase 2: Shared visual components

- Browser frame
- Mobile device frame
- Capability lists
- Status chips
- Journey step
- Dashboard card
- Conversation card

### Phase 3: Tab-specific compositions

- Brand system composition
- Storefront UI
- Customer journey
- Operations dashboard
- AI workflow

### Phase 4: Finish

- Add licensed photography
- Tune crop and object placement
- Add restrained transitions
- Test responsive behavior
- Accessibility review
- Compare directly with the master reference

---

## 19. Acceptance criteria

The implementation is complete when:

- All five tabs are present and use the approved labels.
- “Operations” is used instead of “Farm operations.”
- The section explains an end-to-end business transformation, not five disconnected services.
- Each tab contains a unique, meaningful visual composition.
- The complete view is recreated with real layout and components, not one baked screenshot.
- Brand, storefront, journey, operations, and AI all feel like parts of the same Berry Good system.
- The tab component is accessible by keyboard and screen reader.
- The mobile experience exposes the complete story without requiring precision tab tapping.
- Generated-image artifacts, illegible microcopy, and inconsistent logo treatments are not copied into production.
- The result feels warm, credible, and local rather than like generic SaaS or a rustic template.

---

## 20. Paste-ready Codex instruction

```txt
Implement the Berry Good end-to-end case-study section using the attached specification and assets.

Read these files first:
- berry-good-case-study-tabs-spec.md
- berry-good-brand-guide.md
- berry-good-site-implementation-brief.md
- assets/reference/case-study-tabs-master-reference.png
- assets/reference/current-site-section.png

Use these logo assets:
- assets/brand/berry-good-mark.svg
- assets/brand/berry-good-mark-one-color.svg

Build five accessible views:
01 Brand system
02 Digital storefront
03 Customer journey
04 Operations
05 AI assistance

Important:
- Use “Operations,” never “Farm operations.”
- Treat the PNG mockups as visual direction, not production assets.
- Rebuild text, cards, dashboards, devices, and journeys with real HTML and CSS.
- Keep the outer section consistent with the Madrona site.
- Keep every Berry Good artifact consistent with the supplied brand system.
- Use real semantic tabs on desktop and a stacked or accordion experience on mobile.
- Preserve the approved narrative copy and capability lists.
- Do not invent neon AI styling, generic blue SaaS UI, fake rustic decoration, or additional brand colors.
- Respect reduced motion and WCAG AA.
- Compare the final result against the master reference and the acceptance criteria before considering the task complete.
```
