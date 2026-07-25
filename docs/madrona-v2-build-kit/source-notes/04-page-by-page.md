# 04 — Page by page

Section-by-section content of every public page, in render order. The point of
this doc is to make the **text density** visible. "🖼" marks the only real
visual moment on the whole site.

---

## Home (`/`)

1. 🖼 **Hero** — full-bleed harbor-at-dusk photo, ink scrim; typed serif headline
   "Good businesses around here deserve software as good as they are." + a cycling
   "…make it happen." line + blinking cursor; **"Let's connect"** button; small
   "Bellingham, Washington" caption. *(The only image on the site.)*
2. **Why we exist** — eyebrow "Why we exist" + Marker 01; two columns: a long
   owner's-voice pull-quote (serif, madrona left-rule) on the left, two studio
   paragraphs on the right.
3. **What we do** — eyebrow + Marker 02; H2 "Wherever the business hurts."; a
   breadth line (shop/clinic/outfitter/family farm); 3 clickable "door" questions,
   each a question + a tiny grey services line, hairline-separated; "Everything we do →".
4. **Agenda strip** — a madrona left-rule paragraph about the published agenda + link.
5. **Proof** — eyebrow + Marker 03 "Things we've built and run"; 2 case-study cards
   (Lila Trips, San Juan Boating Guide); "See all work →".
6. **CTA** — H2 "Tell us about your business." + "Let's connect".

*Text-to-visual: 1 image, then ~5 screens of text.*

---

## Services / "What we do" (`/services`)

1. **Intro** — H1 "What we do" + a `Breath` line (breadth: shop/clinic/outfitter/
   family farm; "three ways we help…").
2–4. **Three buckets**, each identical in shape: Marker (01/02/03) + eyebrow Label
   (Getting found / Coming back / Running smoother) + H2 (the door question) +
   an impact paragraph + a hairline-divided list of 4 offerings.
   - Getting found also has a **"Selling online, handled."** madrona left-rule callout.
   - Running smoother also has **"The flagship: agentic operations."** left-rule callout + link.
5. **Success criteria** — a madrona left-rule paragraph (the standing promise) + link.
6. **CTA** — H2 "Not sure which part you need?" + paragraph + "Let's connect".

*All text. 3 near-identical text blocks are the core of the page.*

---

## Agentic operations (`/services/agentic-operations`)

1. Intro — Label "Operations · the flagship" + H1 + a `Breath` line.
2. **The idea** — Marker 01 + H2 "Most ops pain is glue work." + 2 paragraphs.
3. **Worked example** — Marker 02 + H2 "Berry Good Berry Farm." + paragraph +
   a madrona-left-rule list of the "agent cast" (industry/invoicing/customer-service/
   ordering) + a generalizing paragraph.
4. **Anatomy** — Marker 03 + H2 "What's inside an agent." + a left-rule 4-item list.
5. **Proof (dogfood)** — Marker 04 + H2 "We run our own operation this way." +
   2 paragraphs + 2 links (Helm demo, Helm case study).
6. **Start tiny** — Marker 05 + H2 + paragraph.
7. **CTA** — H2 + paragraph + "Let's connect".
   *(Has an `ArchitectureDiagram` component available; otherwise all text.)*

---

## How it works (`/how-it-works`)

1. Intro — H1 + `Breath` line ("three steps…").
2. **Step 1** — Marker 01 + H2 "A 30-minute conversation. Free." + paragraph +
   a madrona-left-rule 5-item **agenda** list + paragraph.
3. **Step 2** — Marker 02 + H2 "A short written assessment." + paragraph.
4. **Step 3** — Marker 03 + H2 "A scoped proposal, if it makes sense." + 2 paragraphs.
5. **Signal** — Label + H2 "Real customers, before real money." + paragraph.
6. **Proposal shapes** — Label + H2 "Sized to the question." + 3 `OfferingCard`s
   (Strategy sprint / Signal sprint / Product stewardship).
7. **CTA** — H2 "Book the conversation." + paragraph + "Let's connect".

---

## Work (`/work`)

1. Intro — H1 "The work" + `Breath` line.
2–4. **Three lifecycle groups** (Getting found / Running smoother / Strategy made
   tangible), each: a short madrona tick + Label + H2 + intro paragraph + a list of
   `WorkRow`s (title, tagline, stage). 9 projects total. Running-smoother group has
   a "How we build this for clients →" link.

*Rows are text rows (title + tagline + tags), not visual cards with imagery.*

---

## Case study template (`/work/:slug`)

Per-project: Opportunity → Thesis → What We Did → What We Learned → Status.
Predominantly prose sections with stage metadata.

---

## Approach (`/approach`)  *(not in nav)*

1. H1 "Approach" + a big serif pull-quote in a madrona left-rule ("Strategy without
   software is a slide deck…") + 3 paragraphs.
2. **The rhythm** — H2 + one paragraph.
3. **CTA** — H2 "Let's build something." + paragraph + "Let's connect".

---

## About (`/about`)

1. H1 "About" + lead + 4 paragraphs (career, the intersection thesis, the studio
   model, building our own things). *(Has a commented-out photo placeholder — no
   photo currently.)*
2. **Building in the open** — H2 + 2 paragraphs.
3. **The name** — H2 + 1 paragraph.
4. **From here** — H2 + 2 paragraphs (Bellingham/Whatcom, "neighbors first").
5. **Get in touch** — H2 + email + location.

*Longest prose page on the site; zero visuals.*

---

## Connect (`/connect`)  *(the single CTA target)*

1. H1 "Let's connect." + intro line ("whatever's easiest… published agenda").
2. **Book a 30-minute call** — H2-ish + line + "Pick a time" button (booking link).
3. **Send a text** — hidden until a business number is configured.
4. **Send a message** — the form (Name / Email / What are you building) + "Send".
5. `hello@` mailto fallback line.

---

## The pattern to notice

Almost every page = **`Breath`/H1 → repeated (Label + Marker + H2 + paragraphs +
list) blocks → left-rule callout → CTA.** Same skeleton, same weight, everywhere.
The homepage hero is the only place the eye gets a non-text anchor. That is the
core of "everything is text / hard to get the gist."
