# Berry Good Berry Farm
## Brand and Website Implementation Brief for Codex

**Prepared for:** Madrona Product Studio
**Project:** Berry Good demo website
**Creative direction:** Roadside stand editorial
**Status:** Implementation brief, v1

---

## 1. Objective

Apply the Berry Good identity consistently across the website so the finished experience feels like a real, distinctive u-pick farm rather than a generic small-business template or a polished technology product.

The desired balance is:

- **Farmstand warmth:** fruit, fields, signs, paper, honest photography, seasonal specificity, and a human voice.
- **Editorial precision:** disciplined typography, strong hierarchy, generous spacing, restrained color, and clear information design.

The website should feel current and professionally designed, but never slick, corporate, precious, or overly rustic.

Use this document together with:

- `berry-good-brand-guide.md`
- `berry-good-mark.svg`
- `berry-good-mark-one-color.svg`
- The approved brand-board image as a visual reference

The brand-board image is a direction-setting artifact, not a pixel-perfect specification. Use the exact tokens and rules in this document when the image contains small inconsistencies.

---

## 2. Core Brand Idea

**Roadside stand editorial**

Berry Good is a fictional u-pick berry farm in the Nooksack Valley. Its identity combines the warmth and vernacular of a real farmstand with the clarity and confidence of an editorial publication.

The brand world includes:

- Berry rows
- Flats and picking containers
- Row flags
- The roadside stand
- The honor box
- Handwritten harvest boards
- Peak weeks
- Last calls
- Morning conditions
- Seasonal openings and closures

Every page should answer a practical question a visitor might have today:

- What is ripe?
- Can I pick today?
- Which rows are open?
- What should I bring?
- How much does it cost?
- How do I pay?
- When should I arrive?

Avoid abstract farm lifestyle language when a specific, useful detail can be shown instead.

---

## 3. Design Principles

### 3.1 Real before polished

The site should show evidence of a working farm. It should feel maintained by people who picked berries this morning, not by a lifestyle marketing team.

### 3.2 Specific before promotional

Prefer precise operational information over generic adjectives.

Use:

> Raspberries hit peak this morning. Come before Sunday.

Not:

> Our premium raspberry selection is now available for a limited time.

### 3.3 Warmth through materials, not decoration

Create warmth with cream grounds, paper panels, natural photography, fruit color, typography, and spacing. Do not add excessive rustic textures, faux wood, distressed effects, or decorative farm clichés.

### 3.4 Editorial hierarchy

The page should be easy to scan from a distance. Large expressive headlines, compact labels, clean body copy, and strong section breaks should do most of the visual work.

### 3.5 Seasonal and current

Information should feel true this morning. Status, availability, row numbers, opening times, and crop notes should be prominent and easy to update.

---

## 4. Logo System

### 4.1 Required logo variants

Implement and maintain these variants:

1. **Primary lockup**
   Raspberry mark + “Berry Good” wordmark + “Berry Farm” descriptor.

2. **Compact lockup**
   Raspberry mark + “Berry Good,” without the descriptor when space is limited.

3. **Standalone mark**
   Raspberry icon for favicon, social avatar, map pin, and very small placements.

4. **One-color lockup**
   Use for constrained production, stamps, single-color print, and dark-ground reversal.

### 4.2 Current assets

- Full color: `berry-good-mark.svg`
- One color: `berry-good-mark-one-color.svg`

The wordmark is typeset rather than embedded in the mark asset.

### 4.3 Wordmark styling

Set “Berry Good” in **Fraunces**, semibold.

Preferred variable settings when supported:

- Optical size: `144`
- Softness: `70`
- Wonk: enabled
- Weight: approximately `600`

Set “Berry Farm” in **Karla**, uppercase, with generous tracking.

Suggested styling:

```css
.logo-descriptor {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  line-height: 1;
  text-transform: uppercase;
}
```

### 4.4 Clear space

Keep clear space around the complete logo equal to at least one drupelet from the raspberry mark.

### 4.5 Minimum sizes

- Standalone digital mark: `24px` minimum
- Full lockup digital width: target `120px` minimum
- Print mark: `8mm` minimum

### 4.6 Approved backgrounds

Use the full-color logo on:

- Cream
- Paper
- Butter
- Currant

Use a reversed or one-color version where contrast requires it.

### 4.7 Do not

- Stretch or compress the mark
- Rotate it
- Add outlines, shadows, gradients, or effects
- Rearrange individual drupelets
- Change leaf placement casually
- Place the full-color raspberry on a raspberry-colored ground
- Place it over busy photography without a containing panel
- Rebuild the mark with emoji, font glyphs, or CSS circles

---

## 5. Color System

Define all colors as global design tokens. Do not introduce additional brand colors unless required for accessibility or system feedback.

### 5.1 Foundation colors

```css
:root {
  --color-cream: #faf5ea;
  --color-paper: #fffdf6;
  --color-butter: #f3e5c3;

  --color-currant: #2b161f;
  --color-currant-soft: #4a2c39;
  --color-ink: #33202a;
  --color-ink-soft: #6b5560;
  --color-faded: #a08d96;
}
```

Roles:

- `cream`: primary page background
- `paper`: cards, forms, pull-outs, and raised surfaces
- `butter`: warm section wash and seasonal callouts
- `currant`: dark sections, headline ink, footer, and premium contrast
- `currant-soft`: raised elements on currant backgrounds
- `ink`: body text
- `ink-soft`: supporting text
- `faded`: nonessential metadata only

### 5.2 Fruit and field colors

```css
:root {
  --color-raspberry: #b81f4d;
  --color-raspberry-deep: #8e1739;
  --color-leaf: #3d6b35;
  --color-leaf-soft: #6f9556;
  --color-gold: #e0a232;
  --color-gold-soft: #f6d488;

  --color-strawberry: #cf5063;
  --color-tayberry: #ab4a3d;
  --color-blueberry: #4f5f8f;
  --color-blackberry: #43304e;
}
```

Roles:

- `raspberry`: primary actions, links, active controls, and logo fruit
- `raspberry-deep`: hover, pressed, and selected states
- `leaf`: eyebrows, status labels, directional accents, and logo leaves
- `leaf-soft`: secondary field accents
- `gold`: ripe-now, peak-season, and important seasonal emphasis
- Crop colors: charts, crop cards, availability keys, and seasonal timelines

### 5.3 Color usage guidance

Use foundation colors for approximately 80 to 90 percent of the interface. Fruit and field colors should behave as signals, not as constant decoration.

Recommended page balance:

- Cream or paper: dominant
- Currant or ink: text and anchors
- Raspberry: actions
- Leaf: labels and field information
- Gold: rare emphasis
- Crop colors: data-specific use only

### 5.4 Accessibility

- Use currant or ink for important text on light backgrounds.
- Do not use faded for body copy, controls, essential dates, or form labels.
- Test all text and interactive states against WCAG AA.
- Do not rely on crop color alone to communicate availability. Pair color with text, shape, or status.

---

## 6. Typography

Load the actual webfonts if licensing and implementation permit.

### 6.1 Font roles

**Fraunces**
The sign painter. Use for page titles, section titles, crop names, pull quotes, and high-emphasis seasonal messages.

**Karla**
The stand window. Use for body copy, navigation, buttons, forms, captions, instructions, and conversational text.

**Spline Sans Mono**
The board. Use for statuses, timestamps, row numbers, open/closed labels, dates, prices, quantities, and micro-labels.

Fallbacks:

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-sans: "Karla", "Helvetica Neue", Arial, sans-serif;
  --font-mono: "Spline Sans Mono", Menlo, Monaco, monospace;
}
```

### 6.2 Suggested type scale

Use responsive `clamp()` values rather than fixed breakpoint jumps.

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: clamp(1.75rem, 3vw, 2.5rem);
  --text-3xl: clamp(2.5rem, 5vw, 4.75rem);
  --text-hero: clamp(3.5rem, 8vw, 7.5rem);
}
```

### 6.3 Type styles

#### Hero title

- Fraunces
- Semibold
- Tight but not compressed line height
- Slightly negative tracking only if required
- Maximum two to three lines

```css
.type-hero {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.035em;
}
```

#### Section heading

```css
.type-section-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.025em;
}
```

#### Body

```css
.type-body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.65;
}
```

#### Eyebrow or board label

```css
.type-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.3;
  text-transform: uppercase;
}
```

### 6.4 Typography constraints

- Do not use Fraunces for long body copy.
- Do not overuse uppercase Karla.
- Keep mono labels short.
- Avoid giant centered paragraphs.
- Avoid stacking multiple decorative type treatments in one section.
- Never use an em dash in site copy.

---

## 7. Spacing and Layout

### 7.1 Spacing scale

Use a restrained 4px-based system.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;
}
```

### 7.2 Page container

```css
.site-container {
  width: min(100% - 2rem, 80rem);
  margin-inline: auto;
}
```

On large displays, allow feature photography or dark sections to extend wider while keeping copy on the editorial grid.

### 7.3 Grid

Recommended desktop grid:

- 12 columns
- 24 to 32px gutters
- Text generally spans 5 to 7 columns
- Supporting modules span 3 to 5 columns
- Use asymmetry selectively

Mobile:

- Single content column
- Maintain generous side padding
- Preserve hierarchy instead of shrinking everything proportionally

### 7.4 Section rhythm

Sections should feel distinct and unhurried.

- Standard vertical section padding: `64px` mobile, `96px` desktop
- Hero padding can be larger
- Use thin rules to separate editorial sections
- Alternate cream, paper, butter, and currant intentionally
- Avoid putting every section in a card

---

## 8. Shape, Borders, and Elevation

The visual language should feel printed, posted, or placed on a counter.

### 8.1 Corners

Use modest corner radii.

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 14px;
  --radius-pill: 999px;
}
```

- Buttons: small or pill radius depending on current UI direction
- Cards: 8px maximum in most cases
- Tags/status chips: pill is acceptable
- Avoid highly rounded “SaaS card” styling across the site

### 8.2 Borders

Use fine, warm borders rather than gray UI chrome.

```css
:root {
  --border-subtle: 1px solid rgba(51, 32, 42, 0.18);
  --border-strong: 1px solid rgba(51, 32, 42, 0.38);
}
```

### 8.3 Shadows

Shadows should be rare and nearly invisible.

```css
:root {
  --shadow-paper: 0 8px 24px rgba(43, 22, 31, 0.07);
}
```

Prefer border, contrast, overlap, and background changes to strong elevation.

---

## 9. Core Components

### 9.1 Header

The header should feel like the top of a farm publication, not an app navigation bar.

Requirements:

- Primary logo at left
- Compact navigation
- One clear seasonal CTA, such as “Plan your visit” or “What’s ripe”
- Cream or paper ground
- Thin lower border
- Sticky behavior is acceptable if restrained

On mobile:

- Preserve the logo mark and readable wordmark
- Use a simple menu trigger
- Avoid a full-screen, highly animated menu unless already supported

### 9.2 Buttons

#### Primary button

- Raspberry background
- Paper or white text
- Karla semibold
- Clear hover using raspberry deep
- Minimal or no shadow

#### Secondary button

- Transparent or paper background
- Currant border and text
- Hover with butter or subtle currant tint

#### Text action

- Raspberry text
- Underline on hover
- Optional small leaf, arrow, or line icon

Do not use gradients, glossy effects, oversized icons, or multiple competing primary actions.

### 9.3 Status board

This should be a signature component.

Use it for:

- Open or closed today
- Picking hours
- Crop status
- Open row numbers
- Last updated time
- Weather or field notes

Visual direction:

- Currant ground
- Paper text
- Mono labels
- Gold for peak or urgent ripe-now emphasis
- Structured like a clean harvest board, not a terminal or developer console

Example:

```text
OPEN TODAY
8 AM TO 4 PM

RASPBERRIES    PEAK
BLUEBERRIES    GOOD
STRAWBERRIES   DONE FOR THE YEAR

ROWS 4 THROUGH 9
UPDATED 7:10 AM
```

### 9.4 Crop cards

Each crop card may use its documented crop color, but keep the card structure consistent.

Include:

- Crop name in Fraunces
- Current status
- Approximate season
- Picking note
- Optional field photo
- Link to crop details

Avoid turning the crop colors into large saturated backgrounds unless contrast is confirmed.

### 9.5 Information cards

Use paper panels with thin borders. These should resemble clipped notes, printed inserts, or small editorial modules.

Good uses:

- What to bring
- Pricing
- How picking works
- Honor box instructions
- Accessibility notes
- Farm rules

### 9.6 Forms

Forms should be quiet and straightforward.

- Karla for labels and input text
- Paper or cream inputs
- Currant borders
- Raspberry focus ring
- Helpful supporting text
- Clear error copy in plain language
- Avoid floating labels unless already in the codebase

### 9.7 Announcements

Use a butter or currant strip for time-sensitive announcements.

Examples:

- Raspberries hit peak this morning.
- Closed Tuesday for field recovery.
- Last weekend for tayberries.

The text should be direct and easy to update in content data.

### 9.8 Footer

Use a currant ground with paper text.

Include:

- Compact logo or one-color mark
- Address using fictional data only
- Hours
- Phone using a 555 number
- Social links if present
- “Prepared by Madrona Product Studio” only if appropriate for the demo context

---

## 10. Graphic Devices

Use two or three recurring devices. Do not use every device in every section.

### 10.1 Berry pattern

Create a low-contrast repeating pattern from the raspberry mark.

Use for:

- Large quiet background areas
- Packaging mockups
- Empty states
- Footer or CTA texture

Keep opacity low enough that it behaves like printed paper texture.

### 10.2 Fine editorial rules

Use 1px horizontal or vertical rules to organize content. Rules should use ink or currant at low opacity.

### 10.3 Field flags

Small flag motifs can indicate rows, open areas, or seasonal highlights. Keep them diagrammatic and simple.

### 10.4 Harvest notes

Use small mono labels or handwritten-note styling sparingly for updated times, row details, and personal farm notes.

Do not introduce a separate handwriting font without careful review. A real scanned note or image treatment is preferable to a novelty script font.

---

## 11. Icon System

Use simple one-color line icons with friendly geometry.

Suggested subjects:

- Berry cluster
- Leaf
- Sun
- Field flag
- Flat or basket
- Farm sign
- Honor box
- Calendar
- Clock
- Rain boot
- Accessibility
- Payment

Rules:

- Consistent stroke width
- Rounded or gently softened line joins
- No filled app-style icon tiles
- Use currant by default and leaf or raspberry for semantic emphasis
- Keep icons secondary to text

---

## 12. Photography Direction

### 12.1 Show evidence of the day

Prioritize:

- Fruit on the cane
- Stained hands
- Flats on a table
- Row flags
- Handwritten boards
- The honor box
- Morning light
- Dirt, leaves, and imperfect produce
- Real picking activity
- Wide views that establish the valley and field rows

### 12.2 Image treatment

- Natural color
- Honest crops
- Moderate contrast
- No heavy presets
- No fake film grain by default
- Avoid extreme shallow depth of field on every image
- Use portrait crops for details and wide crops for field context

### 12.3 Avoid

- Generic lifestyle stock
- Studio-perfect fruit arrangements
- Fake rustic props
- Picnic-table clichés unrelated to picking
- Photos that could belong to any premium food brand
- Overly polished influencer imagery

### 12.4 Accessibility

Every meaningful image needs useful alt text describing what is shown, not what mood the image creates.

Good:

> A hand holds a blue picking flat filled with ripe raspberries between two berry rows.

Weak:

> A beautiful day at Berry Good.

---

## 13. Voice and Content Rules

### 13.1 Voice qualities

The voice should be:

- Direct
- Warm
- Specific
- Calm
- Practical
- Seasonal
- Human

It should not be:

- Corporate
- Overwritten
- Cute for its own sake
- Pun-heavy
- Luxury-coded
- Technical
- Promotional

### 13.2 Punctuation

- Use periods, commas, and colons.
- Do not use em dashes.
- Use exclamation marks rarely.
- Avoid title case for full sentences.

### 13.3 Farmstand vocabulary

Prefer:

- Flats
- Rows
- Flags
- The stand
- The board
- The honor box
- Peak
- Picking
- Last call
- Back next June

Avoid:

- Inventory experience
- Premium offering
- Customer journey
- Omnichannel
- Product availability solution
- Curated selection

### 13.4 Copy examples

Use:

> Pay on your way out. Card, cash, or the honor box.

Use:

> Back next June. They were worth it.

Use:

> Rows 4 through 9 are open today. The west end is picking best.

Avoid:

> We support multiple convenient payment options.

Avoid:

> Strawberry season has officially concluded for this year.

### 13.5 Content model

Where practical, keep daily and seasonal information in structured data rather than hard-coding it inside components.

Suggested shape:

```ts
export type CropStatus = "peak" | "good" | "limited" | "not-ready" | "done";

export interface CropUpdate {
  id: string;
  crop: "raspberry" | "strawberry" | "tayberry" | "blueberry" | "blackberry";
  status: CropStatus;
  headline: string;
  detail: string;
  rows?: string;
  updatedAt: string;
}
```

---

## 14. Suggested Homepage Structure

Use the existing site architecture where sensible, but the homepage should ideally communicate the following hierarchy.

### 14.1 Header

Logo, concise navigation, primary visit CTA.

### 14.2 Hero

Large Fraunces statement with one concrete current detail.

Example:

> Pick the valley at its best.

Supporting copy:

> Raspberries are at peak. Rows 4 through 9 are open today.

Actions:

- Plan your visit
- See what’s ripe

Use one strong farm image or a split editorial composition. Avoid generic centered hero templates with a tinted image overlay.

### 14.3 Today at the farm

A high-priority operational board containing:

- Open or closed
- Hours
- Crops available
- Rows open
- Last update
- Any weather or field note

This should appear above broad storytelling content.

### 14.4 What’s ripe

Crop cards or a seasonal table showing current availability. Use crop colors as supporting signals.

### 14.5 How picking works

A concise three- or four-step explanation:

1. Check the board.
2. Grab a flat.
3. Pick the flagged rows.
4. Pay at the stand or honor box.

### 14.6 Farm story

A short editorial section about the farm, valley, growing practices, or fictional family. Keep it credible and modest.

### 14.7 Visit information

Hours, directions, prices, what to bring, children, pets, accessibility, and payment.

### 14.8 Seasonal callout

A larger message for peak weeks, last calls, or upcoming crops.

### 14.9 Footer

Complete practical business details.

---

## 15. Responsive Behavior

### Desktop

- Preserve strong editorial scale
- Use asymmetrical layouts when appropriate
- Allow large headlines and generous whitespace
- Keep operational content immediately visible

### Tablet

- Collapse complex split layouts thoughtfully
- Keep status and visit information high in the hierarchy
- Avoid reducing all spacing too aggressively

### Mobile

- Single-column reading order
- Today’s status should appear immediately after the hero or inside it
- Primary CTA should remain clear
- Logo must remain legible
- Tables should become stacked status rows or horizontally scroll only when truly necessary
- Touch targets should be at least 44px

---

## 16. Motion and Interaction

Motion should feel quiet and physical.

Allowed:

- Gentle image reveal
- Small underline or color transitions
- Slight card lift or background change
- Subtle ticker or board update transition
- Respectful page transitions if already supported

Avoid:

- Bouncy spring animations
- Floating blobs
- Parallax-heavy storytelling
- Constant marquee movement
- Cursor effects
- Overly animated menu systems
- Anything that makes the farm feel like a product launch site

Always honor `prefers-reduced-motion`.

---

## 17. Implementation Priorities

### Phase 1. Foundation

1. Add fonts and fallbacks.
2. Create design tokens for color, typography, spacing, radii, borders, and shadows.
3. Implement the logo lockups.
4. Normalize global typography and backgrounds.
5. Remove any conflicting template styling.

### Phase 2. Core components

1. Header and navigation
2. Buttons and links
3. Status board
4. Crop cards
5. Information cards
6. Forms
7. Announcement strip
8. Footer

### Phase 3. Homepage application

1. Rebuild hero hierarchy
2. Add Today at the Farm section
3. Apply crop availability system
4. Improve visit-information hierarchy
5. Add story and photography sections
6. Add seasonal CTA

### Phase 4. Polish

1. Add berry pattern and restrained paper texture
2. Normalize iconography
3. Audit responsive layouts
4. Audit accessibility and contrast
5. Review every line of copy against the voice rules
6. Check all fictional contact details

---

## 18. Acceptance Criteria

The implementation is complete when:

- The exact documented color values are used as shared tokens.
- Fraunces, Karla, and Spline Sans Mono each have clear, consistent roles.
- The logo has primary, compact, standalone, and one-color usages.
- The site does not resemble a generic SaaS or startup template.
- Today’s farm status is prominent and easy to update.
- Buttons, cards, forms, and labels share a consistent visual system.
- Fruit colors are used as signals rather than decoration.
- Photography feels observed, specific, and natural.
- All important color pairings pass WCAG AA.
- Mobile retains hierarchy and practical information.
- No em dashes appear in site copy.
- No real farm identity, address, or phone number has been introduced.
- All phone numbers use the 555 range.
- Motion respects reduced-motion preferences.
- The final site feels like a farm first and a professionally designed website second.

---

## 19. Codex Working Instructions

Before making changes:

1. Inspect the existing project structure and identify the framework, styling approach, font loading, current token system, and reusable components.
2. Reuse sound existing patterns rather than introducing a second design system.
3. Identify which content is hard-coded and which is data-driven.
4. Preserve functioning behavior unless a change is explicitly required by this brief.

During implementation:

1. Work in small, reviewable passes.
2. Centralize brand tokens.
3. Do not scatter raw hex values throughout components.
4. Avoid adding large dependencies for simple styling needs.
5. Keep content editable.
6. Use semantic HTML.
7. Check keyboard navigation, focus states, contrast, and reduced motion.
8. Do not treat the generated brand-board image as a source of exact text, hex codes, or measurements.

After implementation:

1. Run lint, type checks, and tests.
2. Review key pages at mobile, tablet, and desktop widths.
3. Provide a summary of files changed.
4. Call out any areas where the existing architecture prevented full application of the system.
5. Include screenshots or a local preview route when available.

---

## 20. Ready-to-Paste Codex Prompt

```text
Implement the Berry Good Berry Farm identity across the existing website.

Use the attached `berry-good-site-implementation-brief.md` as the primary specification, together with `berry-good-brand-guide.md`, `berry-good-mark.svg`, and `berry-good-mark-one-color.svg`.

The creative direction is “roadside stand editorial”: farmstand warmth and vernacular executed with editorial precision. The result must feel like a real u-pick berry farm, never a SaaS product or generic small-business template.

Start by inspecting the codebase. Summarize the current framework, styling system, reusable components, font setup, and homepage architecture. Then propose a concise implementation plan before editing.

Implementation requirements:

- Centralize all brand colors, typography, spacing, radii, borders, and shadows as shared tokens.
- Use Fraunces for expressive display type, Karla for body and interface copy, and Spline Sans Mono for statuses and operational labels.
- Implement the supplied logo assets with primary, compact, standalone, and one-color treatments.
- Create or refine the header, buttons, links, status board, crop cards, information cards, forms, announcements, and footer.
- Make today’s farm status and crop availability prominent.
- Apply the homepage hierarchy described in the brief while preserving sound existing behavior.
- Use restrained borders and shadows. Avoid over-rounded SaaS cards, gradients, excessive motion, and decorative rustic clichés.
- Make the site fully responsive and accessible.
- Do not use em dashes in any copy.
- Keep all farm identity details fictional and use only 555 phone numbers.

Treat the reference brand-board image as visual direction, not a pixel-perfect or text-accurate source. Use the exact tokens in the implementation brief.

Work in reviewable passes. After each major pass, summarize what changed and identify anything that still needs attention. Run lint, type checks, and tests before finishing.
```

---

## 21. Final Review Question

Before considering any screen finished, ask:

> Does this feel like useful information from the stand window, presented with the care of a good magazine?

If it feels like a technology product, simplify it. If it feels like a themed farm template, sharpen it.
