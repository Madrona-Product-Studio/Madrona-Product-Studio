# Assessment V2 — make it awesome

Charlie, launch night 2026-08-30: "the opportunity assessment report is
lame and I'm willing to rethink this whole thing to make it better. The
questions are not amazing either. The report screen on the homepage is
kinda better than this, and so for sure is the CXO assessment. Break off
another branch dedicated to making this awesome."

This branch (`assessment-v2`) is that rethink. The current tool shipped
with launch at `/where-to-start` and stays live while this cooks.

## What Charlie has said he loves (keep these)

- The **format concept**: adaptive flow in a dark shell, live report
  assembling on the right (redacted → reveal). "Charlie loves the format."
- The **named read** (persona moment) added 08-30 — the ending should
  feel earned, not horoscope-shaped (that killed the old /checkup
  archetypes).
- The **homepage example-read card** ("the report screen on the homepage
  is kinda better than this") — three panes, dense, specific, statuses
  with real language ("UNDERSELLING", "12+ A WEEK"). The real result
  should beat the fake one, and currently doesn't.

## The problems

1. **The name.** "Where to start" is a sentence, not a thing. Candidates
   Charlie floated: pain point assessment · opportunity assessment ·
   **Readiness assessment** (his lean; CXO says "take our assessment",
   their URL is /readiness). Decide name → title, nav label, URL (301
   /where-to-start), CTA copy ("Find where to start" → "Take the
   readiness assessment"?), OG card.
2. **The questions aren't amazing.** Today: 6 opener checkboxes + thin
   follow-ups. CXO reference: 21 questions across modules (culture /
   tech / operations), each question concrete and evidence-flavored
   ("How often do executives show the organization how they use AI in
   real work?" with a think-of-it-this-way subtitle), 1-5 scale +
   "I don't know", keyboard-first. Ours should ask questions a business
   owner feels seen by — specific, plain, one idea each.
3. **The end report is thin.** One flagged run produces: 4 status rows,
   1-3 bars, one recommendation. CXO's live signal matrix shows
   per-module meters filling as you answer. Directions to explore:
   richer scoring (per-area meters with real levels, not one bark
   status), 2-3 recommendations ranked (first move / next / later),
   the named read echoed INSIDE the keepable card, a "share/save this
   read" affordance, maybe per-area mini-verdicts written in the
   what-we-heard voice. The report must feel worth keeping — it IS the
   product of the tool.

## References

- CXO assessment: cxo.dev/readiness — 21 Qs, module progress strips,
  SIGNAL MATRIX side rail (cul/tec/ope 0/7 meters), terminal chrome,
  keyboard hints. Screenshot in Charlie's 08-30 messages.
- Current engine: `src/pages/v3/whereToStartEngine.ts` (threads, moves,
  named reads), shell `src/pages/lab/signal-assessment.css` (restyled
  08-30 to the landed system), `src/pages/v3/WhereToStart.tsx`.
- Old /checkup (SignalAssessment.tsx) — the persona-rich ancestor;
  its respec doc: `docs/redesign-2026-08/assessment-respec.md`.

## Ground rules

- Style guide = the landed system (charcoal shell, one orange #E55728,
  cream ink, Sunlit mint progress, board-hue dots, cream Continue,
  light-island report card that follows the sky theme).
- Success criteria in the owner's terms; impact honest, never
  horoscope. No email gate.
- Preview-first; Charlie signs off before this replaces the live tool.

## Report inspiration (Charlie, 08-30 evening — CXO deliverables board)

The shape he pointed at:
- **Report card**: overall score ("41%") + per-dimension meters with
  WORD grades (MOVING / UNEVEN / EARLY / UNCLEAR / MISSING) + a single
  NEXT block. Madrona translation: per-area meters in the board hues
  with owner-plain grades, the named read as the masthead, first move
  as NEXT.
- **Opportunity Map**: the automate / augment / ignore / kill 2×2 with
  the visitor's own items placed in it. Maps perfectly to the ops
  story; could be the second pane of the report.
- **Anti-To-Do List**: the kill-list artifact — tasks that should stop
  being human work. Great voice fit ("stop doing this by hand").
- **DOWNLOADABLE detailed read**: the on-screen report stays tight; a
  fuller version (PDF or clean print page) is downloadable — "you keep
  the read either way" made literal. Email optional, never gated.

These compose with the artifact library being built on
`post-launch-polish` (thread, counters, routing, journey, variants) —
the assessment report and the service artifacts should feel like the
same family of deliverables.

## Report design status (08-30, late)

The V2 report STRUCTURE shipped to the branch (named read masthead,
overall word grade, hued meters with word grades, ranked Now/Next/Later
moves, print-as-download) — Charlie's verdict: better but "kinda lame."
Four visual directions were then explored and ALL REJECTED (08-30
report-lab): A verdict-hero, B CXO scorecard w/ readiness %, C branded
field report w/ charcoal masthead + timeline, D bento one-pager.

Read on the rejections for the next attempt: the problem is probably
not card layout. Candidate root causes: (1) the CONTENT is still thin —
four meters and three moves can't feel premium regardless of dressing;
the questions rebuild (more modules, more material) may need to come
FIRST; (2) the window-card form factor itself may be the ceiling — a
full-page report view (own route, generous scale, real typography) may
be what "a report worth keeping" wants; (3) it may want something none
of the references have — a bespoke Madrona form. Circle back with
Charlie; don't iterate the card again without new thinking.
