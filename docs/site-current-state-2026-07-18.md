# Madrona Product Studio site — current-state report

_Date: 2026-07-18 · Repo: `/Users/charliekoch/Developer/studio/madrona-studio-site` · Live: madronaproduct.com_
_Purpose: factual baseline for the queued site revision (3-step engagement model · lifecycle service architecture · three-pillar identity · Bellingham/Whatcom orientation). No recommendations here — facts only._

---

## 1. Tech stack, deploy state, git

**Stack**
- Vite 8 + React 19 + TypeScript, React Router 7 (client-side SPA, `BrowserRouter`).
- Tailwind CSS 4 (via `@tailwindcss/vite`); design tokens as CSS custom properties in `src/index.css` (`@theme` block).
- No CMS — all content lives in TypeScript data files (`src/data/*.ts`) and page components.
- Build pipeline: `optimize-images.mjs` (sharp → WebP) → `tsc` → `vite build` → `prerender.mjs` (per-route static HTML with `<noscript>` content + generated `sitemap.xml`).
- One serverless function: `api/contact.ts` (Vercel function, sends contact-form email via Resend; env vars `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`).
- Deploy target: **Vercel** (`vercel.json` SPA rewrite excluding `/api/`), GitHub remote `Madrona-Product-Studio/Madrona-Product-Studio`.

**Git state — IMPORTANT: deployed site does NOT match local HEAD**
- Local checkout is on branch **`contact-form`** at `fd2d8e2` (2026-07-14, "Add measurable contact form (Resend) replacing bare mailto CTAs").
- **`origin/main` is at `0e89458` (2026-07-13, "Add refined motion…")** — three commits behind local HEAD. Three stacked feature branches are pushed but **unmerged to main**:
  1. `design-token-cleanup` (3b045a1) — swiss/zen palette token unification
  2. `image-optimization` (5776e46) — build-time WebP + CLS-free `<Img>`
  3. `contact-form` (fd2d8e2) — the Resend contact form + `/contact` route
- **Verified against production**: the live JS bundle (`assets/index-MNLdQSWj.js`) contains **no `/contact` route and no `api/contact` call** — its router registers only `/`, `/work`, `/work/:slug`, `/approach`, `/writing`, `/about`, and CTAs are bare `mailto:` links. It also still uses the pre-cleanup token names (`text-cream`, `ink-light`, `cream-dark`). So **production = origin/main (Jul 13)**; the contact form, image optimization, and token cleanup exist only on unmerged branches.
- Working tree: clean of modified tracked files. Untracked only: `.agents/`, `.claude/`, `.vite/`, `skills-lock.json`, `public/og-image-linkedin.png`, `public/og-screenshot.html`, and the research doc `compass_artifact_…_text_markdown.md` (see §5).
- Note: apex `https://madronaproduct.com/` 301s to `https://www.madronaproduct.com/`.

---

## 2. Site map

Routes defined in `src/App.tsx`, all under a shared `Layout` (sticky nav + footer):

| Route | Title | Purpose / content summary |
|---|---|---|
| `/` | Home | Hero with animated word-cycler ("We turn ideas into working products, …"), "What we do differently" (3 capability cards), "How we can help" (5 self-recognition questions), "Recent work" (2 featured case-study cards), condensed "How it works", CTA. |
| `/work` | Work — "What we're building" | All 9 case studies as rows, grouped by maturity stage: Live → Beta → Prototype → Concept. |
| `/work/:slug` | Case study pages (9) | Template per study: Opportunity → Thesis → What We Did → (How It Works / Architecture) → Built With → What We Learned → Status. |
| `/approach` | Approach | Manifesto ("Strategy without software is a slide deck…"), the two-part engagement arc (Strategy sprint → Signal sprint), "The rhythm" (weekly syncs, demos every 1–2 weeks), Product stewardship (retainer), CTA. |
| `/writing` | Writing | **Placeholder** — 3 dummy articles with `url: "#"`; hidden from nav (commented out in `Layout.tsx`) and `noindex`ed by the prerenderer; route still reachable. |
| `/about` | About | Charlie's background (15 yrs REI/Healthline/Microsoft), studio model (one senior lead + network), "Building in the open" (studio projects ethos), "The name" (madrona tree), contact block. |
| `/contact` | Contact (**local branches only — not live**) | Name/email/"What are you building?" form → `POST /api/contact` (Resend), honeypot, GA event; "prefer email?" mailto fallback. On production, `/contact` doesn't exist and CTAs are `mailto:hello@madronaproduct.com`. |

**Case studies (9, all `category: "recent"`, all studio projects — no client work):**

| Slug | Stage | Tagline (abridged) |
|---|---|---|
| `lila-trips` | Live | AI travel platform for transformative trips in sacred landscapes |
| `san-juan-boating-guide` | Live | Purpose-built web app for boaters cruising the San Juans |
| `helm` | Beta | Command center built on a markdown file you own, legible to agents |
| `plainly` | Prototype | Voice-first intake → shareable therapy profile |
| `aria-health` | Prototype | AI health companion for menopause |
| `lila-yoga` | Prototype | Four card decks for a serious yoga practice |
| `gardenhq` | Prototype | Map/organize/improve your food garden |
| `hikerlink` | Concept | Offline trail safety for Mount Baker, P2P mesh |
| `utah-trip-guide` | Concept | On-trip swipeable, bookable road-trip guide |

Homepage features the first two of `recentOrder` (Lila Trips, San Juan Boating Guide). Old client logos (REI, Healthline, Microsoft, Ford SVGs) still sit in `public/images/logos/` but the pre-Madrona work section was removed from the Work page.

---

## 3. Current messaging (verbatim where quoted)

**Hero (Home):** "We turn ideas into working products," + cycling third line ("lightning fast" · "worth shipping" · "with style" · "no fluff" · "rain or shine" · "people love"). Subhead: "A senior product studio that moves from strategy to design to working software in one motion, using AI to compress the distance between an idea and something real."

**One-liner (CLAUDE.md / meta):** "We help companies figure out what to build — and then build it." Title tag: "Madrona Product Studio · Senior Product Studio, Pacific Northwest."

**Positioning pillars (Home, "What we do differently"):** "Strategy that ships" · "AI-native workflow" · "Full-spectrum product." Approach manifesto: "Strategy without software is a slide deck. Software without strategy is a feature factory."

**Services as currently framed (`src/data/offerings.ts` — 3 offerings, project-arc shaped, not lifecycle-shaped):**
1. **Strategy sprint** (2–6 weeks) — "the question blocking the roadmap" → working prototype as the strategy deliverable.
2. **Signal sprint** (4–12 weeks) — prototype in front of real users; "Real usage, real signal."
3. **Product stewardship** (3–6 month retainers) — embedded fractional senior product voice.
No standalone offering pages — all render as cards on `/approach` (BACKLOG has an open item for dedicated URLs). Note the meta description and prerender copy still say "Strategy sprints, rapid prototyping, and fractional product leadership" — the older names — while the page says Strategy sprint / Signal sprint / Product stewardship (copy drift).

**Engagement-model / process content:** Home "How it works": "Figure it out, then build it… Same team, no handoff. Weeks, not quarters." Approach "The rhythm": "Kickoff call to align on the question. Weekly syncs, async everything else… Working demos every 1-2 weeks." **That is the entirety of process content — there is no intake/qualification sequence described anywhere.**

**Audience cues:** implicitly startup/tech-founder-facing ("founders who've validated the direction," "roadmap question," "add AI to your product"). The hidden referral system (`src/data/referralContext.ts`) personalizes the hero for `?from=` job-search targets (Airbnb, Expedia, Marriott, REI-adjacent, health tech, etc.) — a job-search artifact, first-person "I/my" voice, still shipping.

**Local presence:** "Pacific Northwest" only — footer, About ("Based in the Pacific Northwest… the madrona tree"), JSON-LD address is just `addressRegion: "WA"`. The word **Bellingham appears exactly once in the repo**, deep inside the San Juan Boating Guide case-study body ("from Bellingham and Anacortes staging points"). Whatcom appears zero times.

**Contact/CTA flow:** every page ends in a "Get in touch" CTA. On production: `mailto:hello@madronaproduct.com`. On the unmerged `contact-form` branch: `/contact` page with a 3-field form ("What are you building?"), honeypot, Resend email delivery, GA4 `contact_submit` event. No scheduling link (no Calendly/Cal.com), no phone, no address.

---

## 4. Gap analysis vs the four new directions (factual)

**(a) 3-step engagement model (free 45-min conversation w/ published agenda → written assessment → scoped proposal)**
- No engagement-model page or section exists. Nothing on the site describes a free conversation, a published agenda, a written assessment, or a proposal step.
- The words "free", "assessment", "proposal", "agenda" do not appear anywhere in site copy (grep-verified).
- Closest existing assets: the Approach "rhythm" paragraph (kickoff call → weekly syncs) and the contact form's "What are you building?" prompt — both describe post-sale delivery, not the intake funnel.
- No scheduling/booking integration of any kind.

**(b) Business-lifecycle service architecture (front: brand/web/content/perf-marketing/e-comm · middle: service blueprinting/efficiencies/AI agents · back: DTC/ordering/booking/fulfillment)**
- Current services are three time-boxed project shapes (strategy sprint / signal sprint / stewardship), organized by engagement arc, not by client business lifecycle.
- None of the lifecycle vocabulary exists in copy: "brand," "performance marketing," "e-commerce/e-comm," "service blueprinting," "fulfillment," "ordering," "booking," "DTC" — zero occurrences (grep-verified). "AI agents" as a service is absent (AI appears as internal workflow — "AI-native workflow" — and as product subject matter in case studies).
- One partial adjacency: the "Full-spectrum product" card mentions "Service design." The Home question list includes "Want to build an internal tool to streamline how your team operates?" (middle-of-business adjacent).
- No service pages exist at all (single `/approach` page; BACKLOG item "Dedicated offering pages" is open and reflects the OLD three offerings).

**(c) Three-pillar domain identity (outdoor advocacy · adventure travel · health & wellness)**
- The raw material largely exists but is not framed as pillars: About says "outdoor, wellness, and health"; README says "the intersection of nature, wellness, and technology"; case studies cluster naturally into travel (Lila Trips, San Juan, Utah), outdoor (HikerLink), and health/wellness (Aria, Plainly, Lila Yoga) — plus two that fit none of the pillars (Helm, GardenHQ).
- "Advocacy" and "adventure travel" as terms: absent. No pillar-based navigation, filtering, or sectioning anywhere; Work groups by maturity stage (live/beta/prototype/concept), tags are freeform per-study.
- No case study involves a paying client or a local business.

**(d) Local Bellingham/Whatcom orientation**
- Absent. Identity is "Pacific Northwest" / Puget Sound–Salish Sea throughout (footer, About, title tag, CLAUDE.md brand doc). One incidental "Bellingham" in a case-study body; zero "Whatcom."
- JSON-LD is `Organization` with `addressRegion: WA` — not `LocalBusiness`, no locality, no geo, no local SEO signals of any kind. No Google Business Profile linkage in the repo.

---

## 5. Other load-bearing facts

- **`BACKLOG.md`** (in repo root, last touched 2026-06-14): open items = writing articles for SEO, dedicated offering pages, wordmark/companion-mark decisions, StudioSignature component, offering-detail content, About polish, "systems not just products" positioning. A rich Done log. It predates and does not mention any of the four new directions.
- **`CLAUDE.md`** (repo) is the brand/design-system source of truth: swiss/zen palette (warm paper grounds, 5-step ink ramp, one `#c4553a` madrona-bark accent that doubles as the CTA color), Fraunces (h1 display serif) + Inter (everything else), left-aligned max-width layouts, hairline dividers, no decorative illustration. **Its "Offerings" and "Content architecture" sections are stale** (still lists "Rapid prototyping," "Fractional product leadership," REI/Healthline client work split, Berry Good Berry Farm/Fed projects that aren't in the site data).
- **Untracked research doc** `compass_artifact_…_text_markdown.md` (root): a competitive study of how product studios package/price/sell (ustwo's Discover/Shape/0-to-1/Boost, Substantial's sprint ladder, sprint pricing anchors, mission-positioning mechanisms). Directly relevant input to the engagement-model revision; not committed.
- **SEO state:** solid technical baseline — build-time prerender of every route with real text in `<noscript>`, generated `sitemap.xml` + `robots.txt`, absolute OG image, JSON-LD Organization, GA4 (`G-MFNPFT3TPX`), `/writing` noindexed. Weaknesses: prerender/meta copy drift (old offering names), zero content marketing (Writing is placeholder and hidden), no local SEO, apex→www redirect.
- **Design system components:** `swiss.tsx` primitives (Label, Marker, Breath), `Img` (WebP + dimensions, on unmerged branch), `OfferingCard`, `CaseStudyCard`, `WorkRow`, `ArchitectureDiagram`, `Wordmark`, `StudioSignature`, `PageMeta`. Motion: scroll-reveal + reduced-motion respect.
- **Job-search residue on a studio site:** the `?from=` referral hero system speaks as "I" and pitches Charlie to employers (Airbnb/Expedia/Marriott/etc.) — tonally distinct from the studio "we" and from a local-services orientation.
- Case-study source assets for San Juan live in `case-study/` (markdown + capture guide).

## Bottom-line deployment caveat

Any revision work should first decide the fate of the three unmerged branches (`design-token-cleanup` → `image-optimization` → `contact-form`, stacked in that order, all pushed). The live site (main, Jul 13) has no contact form and old tokens; local HEAD (Jul 14) has both. Building the revision on top of `contact-form` and merging the stack, or merging the stack first, avoids forking the copy base.
