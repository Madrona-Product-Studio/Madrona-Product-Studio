# AI Opportunity Assessment — the refocus spec (2026-09-01)

Charlie's call: the assessment stops being a five-problem intake (web,
retention, hours, AI, product) and becomes one coherent tool: **helping
owners find the opportunities to leverage AI for efficiency and impact.**
Brand, retention, etc. stay on the site; the tool goes deep on the thing
the studio actually leads with (agentic-forward, 2026-08). The proof
library already exists: ten live agent-tool pages plus the "12 jobs"
artifact. Every finding in the report points at something real.

Copy rule sitewide: **no em-dashes** in any user-facing copy.

## What stays (do not touch)

- The conversational frame shipped 09-01 (PR #63): chat history, agent
  bubbles, reply pills, the mint flag seam, the cream light-island active
  beat, viewport-pinned column scroll, keyboard flow, reduced motion.
- The live-report-assembling right pane concept and its redaction rules
  (answered rows hold their verdict until the reveal).
- No email gate. "Keep this read" print. The Cal.com CTA at the result.
- Analytics event names stay `wts_*` for continuity (see Analytics).

## Naming and routing

- **Name: AI Opportunity Assessment.** Kicker/chrome title: "AI
  opportunity assessment". H1 register follows current tool.
- **URL: `/ai-opportunities`.** 301 `/where-to-start` → `/ai-opportunities`
  (App.tsx Navigate + vercel.json). `/checkup` and `/signal-check`
  redirects re-point to the new URL.
- Page title: "AI Opportunity Assessment · a free 2-minute read ·
  Madrona Product Studio".
- Entry-point copy sweeps (footer, services, agentic-operations page,
  hero label if present): the ask becomes "Find your AI opportunities".

## The flow

`opener (week inventory) -> per-area evidence pairs (flagged areas only)
-> AI reality -> blocker -> readiness -> result`

Typical run (2 areas flagged): 8 questions. Full run: 12.

### Q0 — the opener: the week inventory (multi-select)

Prompt: **"Where does your week actually go?"**
Support: "Tap everything that eats real time. We only ask about what you
flag, then hand you a read you keep either way."

Chips (id → label → area → proof):

| id | chip label | area | proof link |
|----|-----------|------|-----------|
| invoices | Chasing invoices and late payments | money | /tools/invoice-chasing |
| books | Keeping the books current | money | /tools/month-end-close |
| cash | Knowing where cash actually stands | money | /tools/cash-position |
| questions | Answering the same customer questions | customers | /tools/customer-inbox |
| followup | Following up after the sale | customers | /tools/post-sale-followup |
| reviews | Asking for reviews and replying to them | customers | /tools/review-requests |
| quotes | Writing quotes, reports, and write-ups | words | /thinking/ai-tools-for-small-business |
| content | Social posts and marketing content | words | /thinking/ai-tools-for-small-business |
| contracts | Reading contracts and paperwork before signing | words | /tools/contract-review |
| scheduling | Scheduling back-and-forth | glue | /thinking/ai-tools-for-small-business |
| retyping | Retyping things between tools | glue | /thinking/ai-tools-for-small-business |
| industry | Keeping up with what's changing in the industry | glue | /tools/industry-brief |

Plus the free-text: "+ what else eats your week" (optional, feeds the
map as a keep-visible item and phase-2 LLM read later).

Reply-pill short labels (chat history): "Invoice chasing", "The books",
"Cash visibility", "Same questions", "Post-sale follow-up", "Reviews",
"Quotes and write-ups", "Marketing content", "Contracts", "Scheduling",
"Retyping between tools", "Industry keeping-up".

### The four areas (modules)

| area | module label | seam name |
|------|-------------|-----------|
| money | Money admin | Money admin |
| customers | Customers | Customer follow-up |
| words | Words and paper | Words and paper |
| glue | Glue work | Glue work |

An area is flagged when ≥1 of its chips is checked. The mint seam after
the opener reads: "Flagged. {area names, comma-joined}. We only ask
about these, then hand you a read you keep either way."

### Per-area evidence pairs (only for flagged areas, in order money →
customers → words → glue)

Every anchor uses the same hour scale:
`["An hour or so", "2 to 4 hours", "4 to 8 hours", "A full day or more", "I've stopped counting"]`
Hour weights for scoring: `[1, 3, 6, 9, 8]`.

**Money admin**
- Anchor: "How much of a typical week goes to money admin, all in?"
  Support: "Invoices, bookkeeping, checking balances, chasing payments."
- Evidence: "What makes it drag?"
  Options: "Chasing people who owe us" · "Bookkeeping piles up between
  sittings" · "Never sure where cash stands" · "Too many systems that
  don't talk" · "It all lives in my head"

**Customers**
- Anchor: "How much of the week goes to customer messages and follow-up?"
  Support: "The inbox, the check-ins, the ones you mean to send."
- Evidence: "What's the honest state of follow-up?"
  Options: "Routine questions eat the inbox" · "Thank-yous and check-ins
  rarely happen" · "We never ask for reviews" · "Follow-up happens when I
  remember" · "It's mostly handled, honestly"

**Words and paper**
- Anchor: "How much of the week goes to writing and paperwork?"
  Support: "Quotes, reports, posts, contracts, forms."
- Evidence: "Which pile is biggest?"
  Options: "Quotes and estimates" · "Reports and write-ups" · "Marketing
  and social content" · "Contracts and forms" · "All of it, evenly"

**Glue work**
- Anchor: "How much of the week disappears into glue work?"
  Support: "Scheduling, retyping, chasing info, keeping up."
- Evidence: "Where does the friction live?"
  Options: "Scheduling back-and-forth" · "Retyping between tools" ·
  "Chasing people for information" · "Keeping up with industry news" ·
  "A dozen small things, none of them big"

### Cross-cutting closers (always, in this order)

**AI reality** (module "AI today"):
"Is AI doing any real work in the business today?"
Support: "Real work means it happens even on your busy weeks."
Options: "Not at all" · "We've poked at ChatGPT" · "It helps with a task
or two" · "It's part of daily work" · "Automation runs on its own"

**Blocker** (module "AI today"):
"What's kept AI from doing more here?"
Support: "No wrong answer. This is the part everyone's honest about in
person."
Options: "No time to figure it out" · "Tried tools that didn't stick" ·
"Don't trust it with customers" · "Our info is scattered everywhere" ·
"Didn't know where to start"

**Readiness** (module "Wrapping up"):
"What are you ready to do about it?"
Options: "Fix something specific that clearly isn't working" · "Step
back and figure out where to focus" · "Prototype a better way before a
big commitment" · "Build the solution and put it into use" · "I mostly
want an outside perspective first"

## The report: the Opportunity Map

The deliverable. Replaces ReadinessReport. Structure top to bottom:

### 1. Masthead
- Kicker: "AI opportunity assessment · {Month Year}"
- H2: the named read (below)
- Overall line: `{grade}. {note}` (below)

### 2. "Your week, sorted" — the map
The visitor's own checked items placed into three groups. Grouped list,
not a 2×2 (narrow pane). Group headers:

- **Runs itself** (automate): invoices · books · cash · questions ·
  reviews · scheduling · retyping · industry
- **You, amplified** (augment): quotes · content · contracts · followup
- **Stays yours** (keep human): always seeded per rules below

Each item renders with its area hue dot and its proof link as a quiet
"live →" affix when the proof is a /tools page (article links get no
affix in the map; they surface in moves).

**Stays-yours rules (honesty layer, always ≥1 line):**
- If blocker answer = "Don't trust it with customers": add "The
  sensitive replies. Drafts wait for your okay; nothing sends itself."
- If `followup` checked: add "The relationships. AI drafts the words;
  the caring stays yours."
- If neither: add "The judgment calls. Pricing, people, and promises
  stay human."

### 3. "Where to start" — ranked moves (Now / Next / Later)
Up to three, ranked by score: `area hour-weight` (from the anchor)
break-ties by area order money → customers → words → glue; within an
area pick the checked chip with a live /tools proof first. Each move:
- Headline (imperative, owner-plain; per-chip table below)
- Support line: honest what-it-does framing
- Proof link: "See the pattern working →" to the chip's proof href
  (label "Read the inventory →" when the proof is the article)

Per-chip move copy:

| chip | headline | support |
|------|----------|---------|
| invoices | Let the invoice chasing run itself. | Overdue invoices get a polite reminder drafted in your voice. You decide who gets grace. |
| books | Make month-end a review, not a project. | The books reconcile against your processors; you approve what's flagged. |
| cash | Start every morning knowing the cash position. | Every account pulled into one honest number, tight weeks flagged early. |
| questions | Give the routine questions a first responder. | First drafts from your real products and policies; sensitive ones come back to you. |
| followup | Run the follow-up you never get to. | The thank-you, the check-in, and the win-back, drafted and queued for your okay. |
| reviews | Ask for the review at the right moment. | The right customers get asked after the right purchase. It asks; it never fakes. |
| quotes | Let AI draft the write-ups you redo every week. | Start with the quote or report that follows the same shape every time. |
| content | Turn one good hour into a month of content. | AI drafts in your voice from what you already know; you edit, it ships. |
| contracts | Read every contract before you sign it. | Terms and risks flagged, with the one clause worth a lawyer pointed out. |
| scheduling | Let the scheduling run itself. | The back-and-forth, confirmations, and reminders held end to end. |
| retyping | Kill the retyping between tools. | Information moves itself between the systems you already use. |
| industry | Get briefed on your trade overnight. | The sources read while you sleep; what actually changed, each with a next move. |

### 4. What we heard (verdicts)
One written line per flagged area, derived from anchor + evidence
(engine authors these; keep the current what-we-heard voice; the free
text echoes in the visitor's own words when present, same pattern as
today's workflow text). Readiness closer line reuses the current five
readiness lines verbatim.

### 5. Foot
"Keep this read ↧" (print; print includes proof URLs spelled out) ·
"Assembled from your answers · no email required"

### Named reads (dominant area by score; DRAFTS, Charlie's words final)
- money: "The back office that runs itself."
- customers: "The follow-up you never get to."
- words: "The writing you do twice."
- glue: "A thousand small jobs, one fix."
- nothing flagged: "The steady ship, worth a second look."

### Overall grades (by count of flagged areas)
- 0: "The steady ship." / "Nothing urgent flagged. Worth an outside read all the same."
- 1: "One clear opportunity." / "One part of the week is asking for leverage, and it has a first step."
- 2: "Hours hiding in plain sight." / "Two areas flagged. Both have patterns already working."
- 3+: "A week's worth of leverage." / "Several areas flagged, which means several honest wins available."

## Live pane while answering (right side)

Same redaction rules as today, re-labeled: rows = the four areas (Money
admin / Customers / Words and paper / Glue work), waking to "Listening"
when an area's chip is checked, redacted chips once its anchor lands.
The map section shows unlabeled shimmer groups. The moves slot hints
"Taking shape. Revealed at the end."

## Engine interfaces (pin these exactly; engine and report build in parallel)

New file `src/pages/v3/opportunityEngine.ts`:

```ts
export type ChipId = "invoices"|"books"|"cash"|"questions"|"followup"|"reviews"|"quotes"|"content"|"contracts"|"scheduling"|"retyping"|"industry";
export type AreaId = "money"|"customers"|"words"|"glue";
export interface OpportunityAnswers {
  chips: ChipId[]; otherText?: string;
  moneyHours?: number; moneyEvidence?: number;
  customersHours?: number; customersEvidence?: number;
  wordsHours?: number; wordsEvidence?: number;
  glueHours?: number; glueEvidence?: number;
  ai?: number; blocker?: number; readiness?: number;
}
export interface OppQuestion { id: keyof OpportunityAnswers; module: string; question: string; support?: string; options: string[] }
export interface MapItem { chip: ChipId; label: string; area: AreaId; proofHref: string; proofLive: boolean }
export interface OppMove { chip: ChipId; headline: string; support: string; proofHref: string; proofLabel: string }
export interface OpportunityReportData {
  title: string;
  overall: { grade: string; note: string };
  map: { runsItself: MapItem[]; amplified: MapItem[]; staysYours: string[] };
  moves: { rank: "Now"|"Next"|"Later"; move: OppMove }[];
  heard: string[];
}
// exports: openerChips, chipShort (reply pills), buildSequence(chips),
// computeOpportunityReport(answers), buildLiveState(answers) for the pane,
// buildProgress(answers)
```

Report component: `src/pages/v3/OpportunityReport.tsx` +
`opportunity-report.css`, same window-artifact language as
ReadinessReport (WindowBar, .v3 scope, board hues: money=copper,
customers=stone, words=plum, glue=fir, AI=moss).

## Analytics

Keep event names: `wts_start` (payload `threads` → comma-joined chips),
`wts_question`, `wts_complete`, `wts_cta_click`, `wts_retake`. Add
`wts_proof_click` with `{ chip }` on any proof-link click in the report.

## What gets removed

- `whereToStartEngine.ts` consumers migrate; the old engine and
  `ReadinessReport.tsx` are deleted once the new flow renders (git
  history keeps them). `ReadCard` stays (homepage hero still uses it);
  the pane's assembling card is rebuilt on the new areas.

## Ship gates

- Preview-first: Charlie walks the flow before any push (hard rule).
- tsc + prod build green; desktop 1440 + mobile 390 screenshots of
  opener, mid-flow, result; reduced-motion sanity check.
- 301s verified; prerender + sitemap updated; OG copy updated.

## Addendum (2026-09-01, Charlie's preview feedback)

Evidence questions and the blocker became MULTI-SELECT (see
ai-opportunity-feedback-2026-09-01.md for the full resolution log):
answers are option-index arrays; "mostly handled" / "all of it, evenly" /
"a dozen small things" are exclusive picks behind an "or" seam; heard
composes one line per area (exclusive wins, 3+ picks use the
everything-drags line where one exists, else first-checked). The form UI
is a hairline checklist with square-check vs radio control vocabulary.
