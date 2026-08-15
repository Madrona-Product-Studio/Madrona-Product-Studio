# Thinking piece — outline / drafting brief

**Working title:** *Constraint is the feature*
_Alternates: "Convert judgment into constraint" · "The shrinking loop"_

**Home:** `/thinking` (a fourth piece alongside The Madrona Product Thesis, Under the hood, The era of agentic operations, A starter guide to building real software with AI)

**What it is:** The ethics-in-practice companion to the starter guide. Where the starter guide is *how* to build with AI, this piece is *where AI earns its place and where a human must stay on the call* — and the throughline that the answer, in both directions, is constraint. Every claim is backed by a mechanism running in one of our shipped apps; nothing theoretical.

**How it stays additive:** Human-in-the-loop threads through all four existing pieces but none names the principle head-on. This one does — and adds the angle none of them touch: safeguards as running agents, and the recursive AI-checks-AI reality.

---

## Thesis

> Good AI product work is the work of converting judgment into constraint — and then keeping that constraint true over time. Every rule you can encode (Lila's whitelist, Aria's escalation triggers, the star's approve-or-surface split) moves a slice of work safely to the machine. A rule you write once decays; a rule that re-checks itself is a safeguard — and you can build the checkers with AI too. What's left in the human's hands isn't there because AI is scary. It's the judgment you haven't been able to encode yet — voice, taste, the high-stakes call — plus the one thing you can never hand off: accountability for the system that watches the system.

Human-in-the-loop isn't babysitting. The loop is where the not-yet-encodable lives, and the craft is shrinking it honestly — never faking that you've encoded something you haven't.

---

## Arc

1. The false binary → the thesis
2. **Bound the decision** — Lila (whitelist + grounding)
3. **The safeguard has to run** — routines, AI-checks-AI, the human as outermost ring *(the freshest movement)*
4. **What stays with the human** — Aria (high-stakes call), voice, taste
5. **Close** — the line is a design decision; the three tests

The shape climbs: one bounded decision → a running system of self-checking agents → the human accountable at the top → the work that's irreducibly theirs. The recursion resolving at human accountability is the payoff.

---

## Movement I — The false binary

- "Is AI good or dangerous" is the wrong altitude. The useful question was never use-it-or-not; it's *what do you hand it, and what makes that safe.*
- Everything we've shipped taught the same lesson: you engineer the division of labor. Constraint is how you convert fuzzy work into work the machine can own.
- Land the thesis. Set up "constraint is the feature" — not a limit on the model, the thing that unlocks trusting it.

## Movement II — Bound the decision

**Proof: Lila** (AI trip planner)

- One section, both facets of a single-shot constraint:
  - **Bounded** — the planner can only recommend from the vetted guide; a Google-verified "Verified Places" whitelist means it physically cannot invent a restaurant.
  - **Grounded** — the prompt is fed live weather, tide tables, NPS alerts, seasonal/celestial data for the actual travel dates, so recommendations anchor to verifiable conditions.
- **Pull-quote:** *"Only recommend from the destination guide... If something isn't in the guide, it doesn't exist for your purposes."*
- Lesson: the power comes from the whitelist and the live data, not the model. Ungrounded generation in a moment that matters (a trip, a livelihood) is worse than no feature.

## Movement III — The safeguard has to run  *(new; the centerpiece)*

- **Guardrails decay.** A whitelist is only true the day you write it — places close, roles fill, data goes stale. The responsible unit isn't the constraint, it's the loop that maintains it. *A constraint you write once isn't a safeguard. A constraint that checks itself is.*
- **The routines, as shipped** — each a small agent whose whole job is keeping another part honest:
  - the ATS-liveness gate that kills phantom roles before they reach him
  - the Verified Places list re-checked against Google so closed venues drop out
  - Lila's post-generation URL sanitizer stripping hallucinated links
  - the nightly sweep; the self-review / visual-QA gate
- **Credibility beat — the guardrail caught something real:** a stripped hallucinated URL, a killed phantom role. Concrete saves prove the guardrails aren't theater.
- **The recursive turn (said plainly):** *Yes — we used AI to build the AI tools that check the AI. That's not the irony, it's the leverage.* You don't hand-babysit; you encode the checker and let it run. The tools help you build the very mechanisms that keep the tools honest.
- **Honest-tension beat:** sometimes you want the ungrounded, creative answer, and the constraint makes the feature worse. Name when you'd loosen the leash — an essay that only sells its thesis reads as marketing; one that names the cost reads as earned.
- **The hinge → Movement IV:** you can automate the checkers, but not the accountability. Someone is the outermost ring — the star confirm, the approval moment. Human judgment is the ground the whole stack stands on. And that work never leaves the human's hands.

## Movement IV — What stays with the human

- **The high-stakes call — Aria** (menopause guidance). AI informs and prepares; it never diagnoses. Persistent "not medical advice" disclaimer, escalate-to-professional at the boundary. *Pull-quote:* *"You are a trusted companion, not a doctor... never diagnose or prescribe."* The higher the cost of being wrong, the more human stays in.
- **Voice** — no AI cover letters; the narrative in his own words. AI drafts scaffolding; the human owns the words that represent them. (The em-dash tell: AI voice is detectable — that's the point.)
- **Taste** — the self-review gate catches its own mechanical bugs, but a human still decides whether it's *good*. Taste is not delegable.

## Movement V — Close: the line is a design decision

- The line isn't fixed; you redraw it per feature with three tests (from the BOLD onepager):
  1. Does it hit a real friction point?
  2. Is it grounded?
  3. Is it reversible / does it move a number?
- Studio stance: ship AI where it earns it, keep a person firmly in charge where it matters — and keep converting judgment into constraint, then keep those constraints running.

---

## Anchor lines (candidates)

- "A constraint you write once isn't a safeguard. A constraint that checks itself is."
- "We used AI to build the AI that checks the AI. That's not the irony — it's the leverage."
- "The loop isn't babysitting. It's where the not-yet-encodable lives."
- "Its power comes from what you constrain it to, not from what you let it say."

## Source material (all verified in-repo)

- **Lila** — `lilatravel/prompts/system-prompt.md`: guide-only hard rule, Verified Places whitelist, live weather/tides/NPS grounding, URL sanitization.
- **Aria** — `aria/src/lib/system-prompt.ts`: companion-not-doctor boundaries, emergency escalation; visible "not medical advice" disclaimers on every page; same-origin API gate.
- **charlie-hq / Helm** — the star convention (agents propose, only the human confirms); nightly sweep auto-approves great-fits, surfaces the judgment calls.
- **Job engine** — no AI cover letters; ATS-liveness gate; resume-only default.
- **Build gates** — visual-QA / self-review discipline (AI catches mechanical bugs, human holds taste).
