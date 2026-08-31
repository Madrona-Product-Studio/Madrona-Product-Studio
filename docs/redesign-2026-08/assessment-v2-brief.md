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
