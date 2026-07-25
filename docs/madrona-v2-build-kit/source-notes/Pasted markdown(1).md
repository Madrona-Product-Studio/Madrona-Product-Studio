# Madrona Product Studio — Strategic Mechanisms for the Rebuild

Research synthesis, July 2026. Written to inform a fresh build using existing ingredients.

---

## Part 1 — The reframe

### The site isn't under-designed. It's under-mechanized.

The packet diagnoses "wall of text" and prescribes imagery, summary devices, and varied layouts. That diagnosis is right but shallow. It treats a strategy problem as a decoration problem, and if you rebuild on that diagnosis you will get a prettier site with the same conversion rate.

The deeper issue: **every rule in the current design system is a subtraction rule.**

- No boxes, no cards, no shadows
- No icons, no illustration, no diagrams
- No second accent color
- No new fonts
- No stock photography
- No em-dashes, no hype

There is no positive visual vocabulary anywhere in the system — nothing the site *does*, only a list of things it refuses. When your entire toolkit is "text, hairline, left-rule," everything you build becomes text, hairline, left-rule. Uniformity isn't a failure of discipline here. It's the *product* of the discipline. You executed the system correctly and the system produced monotony.

**The fix at the system level:** replace subtraction rules with a small closed set of named, load-bearing devices — six or seven — each with exactly one job. Page variety then comes from *which devices appear in which combination*, not from decoration. Restraint is preserved because the set is small and closed. Monotony is broken because no two pages use the same combination.

### The second reframe: you are not the audience

The reference class you have been designing against is "good studio site." The reference class that matters is "site a Whatcom County business owner trusts enough to book a call."

Those are different design problems. A shop owner, a clinic manager, and a berry farmer are not evaluating your typography. They are running a fast, mostly unconscious credibility check: *Is this real? Is this person good? Can I afford it? What happens if I click?* Stanford's long-running web credibility research is the canonical finding here — a large majority of people judge an organization's credibility primarily on the design of its site, before reading anything. Baymard's work on abandonment finds a large share of users leave sites where contact information isn't obvious.

Your current site answers "is this person thoughtful" beautifully and answers "is this real, can I afford it, what happens next" not at all.

---

## Part 2 — The mechanisms

Nine mechanisms, ordered roughly by leverage-per-unit-effort. The first three are nearly free.

---

### Mechanism 1 — Load-bearing headings (highest leverage, zero design cost)

This is the single most important item in this document.

Nielsen Norman Group's eye-tracking work identifies four scanning patterns. Two matter here:

- **F-pattern** — the reader sweeps the top, sweeps again lower, then runs down the left edge, skipping body text. NN/g's follow-up research reframed this as a *failure state*: it emerges specifically when a page has no bolding, no subheadings, and no visual hierarchy. It is what happens when the page gives the eye nothing to hold.
- **Layer-cake pattern** — the reader hits every heading and skips the prose between, dropping into body text only when a heading signals relevance. NN/g rates this the most effective scanning mode short of reading every word.

Your current pages engineer the F-pattern almost perfectly. Long undifferentiated column, similar-weight blocks, no anchors.

But here's the part that isn't a design fix. Look at your actual headings:

> "Wherever the business hurts."
> "Most ops pain is glue work."
> "Sized to the question."
> "Real customers, before real money."
> "Start tiny."

These are excellent lines. They are also **informationally empty**. In a layer-cake scan the headings may be the *only* thing the visitor reads. A reader who scans your Services page and reads nothing but the H2s learns approximately zero about what you sell.

**The move:** every H2 on the site carries the payload. The poetic line becomes a subhead or a lead sentence underneath, where it still earns its keep for the reader who commits.

| Currently | Carries the payload |
|---|---|
| "Wherever the business hurts." | "Websites, online stores, loyalty, and workflow tools." |
| "Most ops pain is glue work." | "We build AI agents that do the copying and pasting." |
| "Sized to the question." | "Three engagement shapes: 2 weeks, 3 months, or ongoing." |
| "A 30-minute conversation. Free." | (already good — keep) |

Test for every heading: *if this is the only line the visitor reads on this section, did they learn something concrete?*

This is a copywriting fix that solves a design problem, it costs one afternoon, and it will do more than any imagery you add.

---

### Mechanism 2 — Price qualification

Nobody in your competitive set publishes numbers. Ranch House Designs — your own liked reference — puts **"Services & Pricing" in the primary nav** and offers a "Get Instant Quote" as the hero CTA. That is not an accident. It's the strongest differentiator available to a small firm serving owner-operators.

For an SMB owner, price opacity is the number one source of friction and the number one reason they don't book. They assume they can't afford you, and they leave rather than risk a call where they'll be embarrassed.

Forrester's guidance and the agency lead-gen literature converge on a middle path that doesn't require you to publish a rate card: **price qualification**. "Most engagements start at $X." A range on each proposal shape. What a typical website project costs. The stated effect is twofold — it filters out unaffordable conversations before they consume your time, and it signals confidence to buyers who *can* afford you.

Given the studio's positioning as honest and direct, publishing nothing is actively inconsistent with the voice.

**Minimum version:** three proposal shapes on /how-it-works, each with a starting number and a typical duration. Nothing more.

---

### Mechanism 3 — Chunking (renegotiate the "no boxes" rule)

NN/g's layer-cake research is explicit about what enables scanning on mixed-content pages: group like content, then **visually distinguish each chunk** — with a grid, borders, or colored backgrounds. Cards, in other words.

Your system forbids exactly this. "Hairline dividers, not boxes. Card outlines/shadows avoided."

That rule is the direct mechanical cause of "hard to get the gist." A hairline says *a boundary exists here*. A tonal ground says *this is a unit, take it in as one thing*. Only the second one produces scanning.

You do not need shadows or heavy outlines. You already have three grounds in the palette (`card #ffffff`, `paper #fdfcfa`, `bg #f5f1ea`) that are currently doing almost nothing. Ground-differentiated chunks with generous internal padding and no border at all would be entirely consistent with the calm register — and would immediately produce the layer-cake read you're missing.

---

### Mechanism 4 — Convert the studio's own products from portfolio into pricing proof

You have nine self-initiated projects, no named clients, no testimonials, no numbers. Presented as "case studies," this reads as a portfolio of hobbies. An SMB owner scanning nine prototypes with no client names does not think *this person ships*; they think *this person has a lot of side projects*.

The asset is real. The framing is wrong.

**Reframe them as demonstrations with receipts.** For each one, publish: what it does, how long it took, what it would cost a client, and what's live vs. prototype. Then the collection stops being a portfolio and becomes the thing nobody else in your market offers — **a transparent, verifiable price and scope catalog.**

> "The San Juan Boating Guide took three weeks. That's what a three-week engagement looks like. Click through it."

That is a mechanism no competitor has, it solves the pricing-opacity problem in Mechanism 2, and it turns your weakest-looking proof (no clients) into your strongest (nine things you can actually click on, built by the person you'd be hiring).

Corollary: **stop grouping nine projects by lifecycle.** Nine is too many to scan and the lifecycle grouping serves your service architecture, not the visitor. Lead with three you'd stake your reputation on, presented visually with real screenshots. Put the rest in a plain list below.

---

### Mechanism 5 — Name the operating model and make it a feature

Right now the "one senior person plus a network" structure is handled in prose on /about, in a "we" voice that quietly obscures it. That's a hedge, and hedges read as hedges.

The reference case is Dan Mall's SuperFriendly, which ran for over a decade on exactly this structure — one full-time person assembling a bespoke team of specialists per project. He named it publicly (borrowing the "Hollywood model"), explained why it produces *better* staffing than a fixed roster, and made it the lead of the pitch rather than a footnote.

Meanwhile the agency-selection literature is clear that the thing buyers actually fear is the bait-and-switch: the senior person who sells the engagement and then vanishes, replaced by juniors. Buyers reportedly care more about *who specifically will do the work* than about brand, awards, or process documentation.

You are structurally immune to the industry's most common failure mode. Say so. Directly.

> "The person you talk to is the person who does the work. Every time. There is no account team."

That single line does more competitive work than the entire /about page currently does.

**Sub-mechanism:** the "we" voice is worth revisiting. It buys the impression of scale and costs the thing that's actually differentiating. RHD, with 11–50 employees, still puts a named founder and a photograph on the homepage — because people trust people. You have one person and no photograph anywhere on the site. That's exactly backwards.

---

### Mechanism 6 — AI as the price and speed argument, not as a service line

Currently AI appears on the site as a *thing you sell* — agentic operations, agents on workflows. That's the least interesting version of it for this audience. A Whatcom shop owner does not want to buy agents.

Your actual thesis — that AI collapses the team required to ship a v1, so a senior IC delivers what used to need five people — is a **price, speed, and quality argument stated in the owner's terms:**

> "Work that used to take a team of five and four months takes me six weeks. That's why you can afford senior work."

Note how RHD handles AI, because it's instructive in two directions. They use it defensively ("anyone can ask AI to write their ads, none of that builds a brand") — the incumbent's move, protecting a labor-cost structure. And they use it as an entry ramp: a dedicated page for people who started with DIY or AI tools and need help finishing, offering cleanup, refinement, and audits.

That entry ramp is worth stealing outright. In 2026 a huge share of small businesses have a half-built Squarespace or a Lovable prototype they're embarrassed by. "You started it, we'll finish it" is a low-commitment, high-intent front door — and it's a far better first contact than "book a 30-minute strategy conversation."

Your position is strictly stronger than RHD's here: they're defending against AI, you're built on it.

---

### Mechanism 7 — Door design: identity beats symptom

You currently sort visitors by symptom (Getting found / Coming back / Running smoother). RHD sorts by identity (Small Business / Farmers & Ranchers / Rural Health / Organizations).

Symptom doors are the more intelligent architecture — they're the right internal model and they force you to think in outcomes. But they require the visitor to self-diagnose, and self-diagnosis is cognitive work. Identity doors require none: you know who you are in zero seconds.

Note also that the agency lead-gen research is blunt about breadth: a firm that says it serves any business in any industry with any service reads as interchangeable, and interchangeable firms attract price shoppers and long sales cycles. Your packet lists "deliberately broad on verticals" as positioning. That's the hardest possible starting condition for a site to overcome.

**Two options worth weighing:**

- **Keep symptom doors, add an identity strip.** A row of four concrete business types with real local photography — the farm, the clinic, the outfitter, the shop — sitting above the symptom doors. Costs one section, buys instant self-recognition.
- **Lead with one vertical.** You have a genuine wedge in Whatcom agriculture (Berry Good, the grower-organization research, Small Fruit Conference in November). A site that leads with farms and food businesses would be sharper than one that leads with everyone — and "we also work with clinics and shops" costs you nothing to add underneath.

The second is riskier and probably better. Worth deciding deliberately rather than defaulting.

---

### Mechanism 8 — Local as proof, not sentiment

"From here" and "neighbors first" currently live as paragraphs on /about. That's sentiment. Local becomes a *mechanism* when it's verifiable:

- Real photography of real Whatcom places and real local businesses — not a harbor at dusk, which any coastal town could claim
- A map, or at minimum a named service radius
- "We'll come to you" as an explicit offer, since no remote agency can match it
- Named local references and recognizable local logos as soon as you have any
- Physical presence as content: the farmers market, the food bank, the Small Fruit Conference

Local proof is the one form of credibility that can't be commoditized by AI, outsourced, or faked at volume by a national competitor. Right now you're claiming it and not proving it.

---

### Mechanism 9 — Distribute trust signals across the journey

The trust-signal literature is consistent on placement: signals belong at the moments doubt spikes, not clustered on a page nobody visits. Above the fold to set the tone. Adjacent to price, because that's where hesitation peaks. In the footer, where people go to verify you're a real entity.

Your current site has essentially none of these anywhere. The full inventory of available signals you're not using:

- A photograph of the person
- Years of experience as a number (~15)
- Recognizable prior employers (REI, Microsoft, Healthline) — currently buried in About prose, should be visible on the homepage
- A physical address and a phone number
- Anything a past collaborator or client has said about the work
- Live links to things that actually work
- A recency signal — something dated, so the site doesn't look abandoned

RHD stacks these relentlessly: 25 years, 1,200 businesses, a named CEO with a photo, a street address, a fax number, a portfolio gallery, and a continuous stream of "new site now live" posts that function as proof-of-life.

You can't manufacture 1,200 clients. You can put a face, a number, an address, and a date on the site this week.

---

## Part 3 — The reference teardown

**ranchhousedesigns.com** — the right reference class, and worth being precise about *why* you liked it. The mechanisms, stripped of the aesthetic:

| Mechanism | What it does | Steal? |
|---|---|---|
| Pricing in primary nav | Removes the biggest friction for owner-operators | **Yes** |
| Identity-based entry grid (4 audience doors) | Zero-effort self-recognition | Yes, as a strip |
| Named founder, photo, personal story | People trust people | **Yes** |
| Quantified history (25 years, 1,200 brands) | Converts vague credibility into a number | Adapt (15 years, N projects) |
| Galleries by artifact type | Pure visual scan, no reading | **Yes** |
| Continuous "new site live" stream | Proof of life, proof of shipping | **Yes** — cheapest high-value addition |
| Downloadable brochure PDF | Gives the prospect something to forward internally | Maybe |
| "Finish what you started" DIY/AI page | Low-commitment high-intent front door | **Yes** |
| Instant quote CTA | Lower commitment than booking a call | Consider alongside the call |
| Podcast / workbook / academy layer | Authority + email capture | Not yet |
| "Request a Quote" as the universal CTA | Commercial, unambiguous | Weigh against "Let's connect" |

**superfriendlydesign.systems / danmall.com** — the structural reference for one-person-plus-network. Named model, published methodology, the founder as the brand, and a documented working cadence presented as a *product feature*.

---

## Part 4 — The constraint most worth renegotiating

The packet lists hard constraints. Most are fine. Three deserve a second look, because each is currently causing a symptom the packet complains about:

1. **"Hairline dividers, not boxes."** → directly causes the scannability failure. Renegotiate to tonal grounds, no borders. Same restraint, actual chunking.
2. **"No icons, no diagrams, no illustration."** → leaves you with prose as the only explanatory mode for inherently structural ideas (three steps, agent anatomy, before/after). Renegotiate to: no decorative iconography, but structural diagrams permitted where they replace paragraphs.
3. **"Photography only when real and PNW-coded."** → correct rule, catastrophically under-executed at one photo sitewide. Not a constraint problem, a supply problem. **Spend a day taking photographs.** Bellingham in July. Real businesses, real places, your own hands on a keyboard. This is the highest-value single day of work available on this project and it requires no code.

The one accent, the two fonts, the voice, the name — leave them. They're not the problem.

---

## Part 5 — Suggested sequence

Deliberately ordered so the cheap high-leverage work happens before anything gets rebuilt.

1. **Rewrite every H2 to carry its payload.** One afternoon. Largest single improvement available.
2. **Shoot photography.** One day. Removes the "everything is text" problem at the root.
3. **Decide the pricing posture.** One conversation with yourself. Unblocks the Work and How-it-works pages.
4. **Decide the identity question** — broad, or lead with a vertical. This determines the homepage.
5. **Define the closed device set** — the six named devices with one job each. This is the actual design system work, and it should be done as a spec before any page is built.
6. **Build the homepage only.** Prove the system on the hardest page. Do not build eight pages against an unproven system again.
7. **Roll out.**

Steps 1–4 are decisions and content. Nothing in them requires code, and doing them first is what prevents this from becoming the same site in a new outfit.

---

## Part 6 — The one thing to be careful about

The current site's problem is not that it's too restrained. It's that restraint was doing all the work alone. If the rebuild responds to "boring" by adding motion, gradients, and visual noise, you'll lose the one genuinely differentiating quality the site already has — it reads as senior, and almost nothing in this market does.

The target is not *more*. It's **fewer things, doing more work each.**