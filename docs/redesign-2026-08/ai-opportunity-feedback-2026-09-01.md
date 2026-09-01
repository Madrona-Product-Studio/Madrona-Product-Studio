# AI Opportunity Assessment — Charlie's preview feedback (2026-09-01)

Branch: `ai-opportunity`. ATTACKED same day (Charlie: "lets fix these
then push"). Resolutions inline per item.

**Resolutions:** #1 no action (scroll-state artifact; first-mount scroll
skip already shipped). #2+#3 form pass: options became a single
hairline-separated checklist (tighter rows, no per-option cards, no
letter badges), Continue smaller with an outline disabled state, spacing
around the free-text and nav. #4 control vocabulary: square check glyphs
for multi-select, round radios for single-select. #5 multi-select pass:
the four evidence questions + the AI blocker are multi-select (anchors,
AI scale, readiness stay single); exclusive options ("mostly handled",
"all of it, evenly", "a dozen small things") clear the others and sit
behind a quiet "or" seam; the engine composes one verdict line per area
from multiple picks (exclusive wins; 3+ picks use the everything-drags
line for words/glue; else first-checked).

## Items

1. **[screenshot: opener, desktop]** Charlie shared the opener view
   (greeting bubble sitting partially under the top bar at his scroll
   position; 12-chip week inventory; live report skeleton right).
   Specific concern not yet stated — placeholder pending his notes.

2. **[screenshot: opener bottom, desktop] Form design pass.** Charlie:
   "some spacing work is needed. buttons are too close. I also think
   those choices could be a little more like checklists and maybe a
   little tighter? the buttons are kinda big. I think a nice form
   design pass would be good."
   - Option buttons: too big, too close together; should read more
     like a checklist (tighter rows, less card-per-option).
   - Visible in shot: Continue button crowds the free-text field and
     the "About two minutes" meta line.

3. **[screenshot: follow-up question island] Question cards sharper.**
   Charlie: "I think these question cards could be a bit better and
   cleaner design as well. just a little sharper on the UI."
   - The light-island question cards (single-select follow-ups) want a
     cleaner, sharper UI pass; same family as item 2's form pass.
   - Shot also shows: disabled Continue reads as washed-out gray block;
     tall pill-radius option rows with roomy padding (ties into the
     "tighter checklist" direction).

4. **Multi-select vs single-select must look different.** Charlie:
   "I think the inputs should be different if its multiple choice vs
   multi select. want to make that clearer."
   - Today both the opener (check-all-that-apply) and the follow-ups
     (pick one) use the same row/marker design. The control should
     signal the mode: checkbox-style marks for multi-select, radio-
     style for single-select (classic form vocabulary).

5. **Rethink which questions are multi-select.** Charlie (pointing at
   "What's the honest state of follow-up?"): "I think some of these
   should maybe be multiselect like this one maybe? can we think about
   what should and shouldn't be multiselect?"
   - The evidence questions especially: several options are often true
     at once for a real owner (inbox questions AND never asking for
     reviews). Forced single-pick loses signal.
   - Needs a deliberate pass over all questions: which are honestly
     one-answer (the hour anchors, readiness) vs which are
     check-what's-true (evidence questions).
   - Engine implication to solve when we attack: evidence answers
     currently index 1:1 into a single verdict line; multi-select means
     composing or ranking multiple verdicts per area, and the "what we
     heard" + moves logic follows.

<!-- append items below as they arrive -->
