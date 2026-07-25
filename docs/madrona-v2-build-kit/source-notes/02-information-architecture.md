# 02 — Information architecture

## Global nav (4 items)

`What we do` (/services) · `How it works` (/how-it-works) · `Work` (/work) · `About` (/about)

- Sticky top bar: wordmark left, 4 links right (hamburger on mobile).
- **Approach** and **Writing** exist as routes but are intentionally NOT in nav
  (Approach folded out; Writing hidden until real articles ship).
- No CTA button in the nav. The single primary CTA ("Let's connect") lives in
  page bodies and routes to `/connect`.

## Full route map

| Route | Page | In nav? | Purpose |
|---|---|---|---|
| `/` | Home | (logo) | The whole story in one scroll |
| `/services` | Services / "What we do" | ✓ | The 3-door service menu |
| `/services/agentic-operations` | Agentic operations | via Services | Operate flagship, deep page |
| `/how-it-works` | How it works | ✓ | 3-step engagement model + agenda + proposal shapes |
| `/work` | Work | ✓ | 9 studio case studies grouped by lifecycle |
| `/work/:slug` | Case study | via Work | Per-project template |
| `/about` | About | ✓ | Charlie's background, the studio, the name, "from here" |
| `/approach` | Approach | ✗ (route only) | Philosophy / the rhythm |
| `/connect` | Connect | ✗ (CTA target) | The single "get started" page |
| `/contact` | → redirects to `/connect` | ✗ | Legacy |
| `/writing` | Writing | ✗ (hidden, noindex) | Placeholder |
| `/brief`, `/home-lab` | Internal working pages | ✗ (noindex) | Not public IA |

## The Connect flow (recently unified)

Every primary CTA sitewide is the SAME button — **"Let's connect"** — routing to
`/connect`. That page offers three ways in:
1. **Book a 30-minute call** (Google appointment schedule)
2. **Send a message** (a name/email/"what are you building" form → emails the studio)
3. **Send a text** (wired but hidden until a business SMS number is set)
Plus a plain `hello@madronaproduct.com` mailto fallback.

## Home page — section order (single-scroll narrative)

1. Full-bleed harbor hero photo + typed headline + "Let's connect" CTA
2. **Why we exist** — owner's-voice pull-quote (left) + studio response (right)
3. **What we do** — breadth line + 3 clickable "door" questions → /services
4. **Agenda strip** — the published-agenda trust move → /how-it-works
5. **Proof** — 2 curated case study cards (Lila Trips, San Juan Boating Guide) → /work
6. **CTA** — "Tell us about your business." + "Let's connect"

> Note: the hero photo is the **only** substantial image on the entire site.
> Everything after it is text.

## Work — 9 case studies, grouped by lifecycle (not maturity)

- **Getting found (demand):** Lila Trips *(live)*, San Juan Boating Guide *(live)*
- **Running smoother (operations):** Helm *(beta)* — the studio's own ops surface
- **Strategy, made tangible (strategy):** GardenHQ *(prototype)*, Aria Health
  *(prototype)*, Plainly *(prototype)*, Lila Yoga *(prototype)*, Utah Trip Guide
  *(concept)*, HikerLink *(concept)*

Each project has stage metadata (live / beta / prototype / concept). Case study
template: Opportunity → Thesis → What We Did → What We Learned → Status.

## Proposal shapes (on /how-it-works, as cards)

Strategy sprint · Signal sprint · Product stewardship. (These are the shapes a
*proposal* takes — distinct from the Grow/Retain/Operate service menu.)

## IA questions worth the reviewer's attention

- Home tries to tell the *entire* story in one scroll (why-we-exist + services +
  agenda + proof + CTA). Is it doing too much, or not enough visually to guide it?
- 4 nav items + a hidden Approach + a separate Connect page + Services→Agentic
  sub-page. Is the hierarchy clear, or is key content (Approach, the engagement
  model) buried?
- Services vs. Home "what we do" vs. Work all restate the 3 buckets in prose.
  Is that reinforcing or repetitive?
