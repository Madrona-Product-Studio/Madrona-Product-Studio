# Positioning clarity audit: consolidated feedback

_2026-09-29 · branch `positioning-clarity-2026-09` · two independent reviews (Opus 5.5 and Astra via Codex) of the same renders (11 pages, 1440 + 390) and source. Raw reviews: `opus-audit.md`, `astra-reply.md`._

## The one-sentence diagnosis (both reviewers, independently)

The site sells a **menu of deliverables** (four peer service departments, twelve task chips) when Charlie's real edge is **senior product judgment carried all the way into working software**. The menu's examples (invoice chasing, month-end close, win-back email, storefronts) and the proof (Berry Good for three of four doors, bookkeeping agents on /tools) teach "small-business AI and web agency." The copy says "founders and product teams." The proof wins.

## Where the two reviews agree (high confidence)

| # | Finding | Evidence |
|---|---|---|
| 1 | The hero headline says what kind of company this is, not what problem it solves. "Built for the AI era" describes the moment, not a reason to hire you. | `src/pages/v3/Hero.tsx:31` |
| 2 | "Founders, local businesses, and product teams" is three audiences in one breath. In practice, the examples pick the small-business reading. | `Hero.tsx:18-32`, `HelpSection.tsx:21`, `agents.ts:37`, `opportunityEngine.ts:107` |
| 3 | The small-business read is **upstream too**: the canon's door table points three doors at owner-run businesses and one at founders or product teams. The site faithfully renders that compromise, so fixing it means revisiting the canon, not just the copy. | `thinking/madrona/positioning/business-and-offerings.md:80` |
| 4 | Charlie's differentiator is missing from the homepage: senior consumer product leadership (REI's 22M-member loyalty program and app portfolio, applied AI at Healthline scale) combined with hands-on building now. It appears only in About and on /charlie. | `HomeV3.tsx`, `studioProfile.ts:55` |
| 5 | The four doors aren't true peers. Brand & Website is the least differentiated but gets equal weight. Growth & Retention is Charlie's deepest credential but is rendered as SMB tactics. Product strategy and leadership have **no door at all**. | `services.ts`, `ServicesV3.tsx:48` |
| 6 | The homepage shows the same four categories twice in the first two screens (hero window, then "Four problems"), and real proof doesn't arrive until after the process section. | `HomeV3.tsx:30` |
| 7 | /charlie is job-search framing on a studio surface ("If you're hiring a product leader"), which canon §6 rules out. Its content belongs in About, written in client terms. | `CharliePage.tsx:19,69` |
| 8 | The nav shows the studio's inventory, not the buyer's path. Apps comes first, Apps and Tools overlap, and "Articles" leads to /thinking. | `M2Nav.tsx:15` |
| 9 | **Mobile bug:** at 390px the hero copy, h1, lede, primary button and services window all end at x=395, so there's no right gutter. Measured, and visible in the render. | `.v3-home-copy` et al. |
| 10 | Keep: "We figure out what to build. Then we build it.", direct access to Charlie plus a senior network, the free conversation, the written read, the small first project, teaching the owner, the visual system and the local identity. **This doesn't need a new visual brand.** | `PracticeSection.tsx:21` |

## What Astra added that I didn't have

- **Proof labeling risk (worth fixing no matter what).** The homepage calls Berry Good "a real operation where we build and run everything we sell." Service artifacts cite "one real week" of counts and an email test sent to "180 customers" with precise open rates. /tools clearly labels its demos as scripted, but these don't. Each claim needs to be verified or labeled as an example where it appears. Career proof needs the same care: describe the Healthline audience and Charlie's product responsibility separately, and attribute Microsoft work through Iconmobile. (`ServiceArtifacts.tsx:29,143`, `BerryGoodSection.tsx:43`)
- **/services on mobile:** Brand & Website and New Products keep narrow side-by-side columns while the other sections stack. The New Products image came out blank in the capture, and it needs a check.
- **Contact topics repeat the four departments** (`MadronaV2Connect.tsx:35`). Changing only the headline won't work, because the links, examples and contact choices would keep teaching the old offer.
- **The AI assessment is too narrow to be the second CTA sitewide.** It asks about invoices, books and reviews, and New Products currently routes into it (`ServicePageV4.tsx:42`).
- **Two deep work stories beat seven equal app rows** for selling consulting.

## Proposed offer shape (merged)

Replace four peer departments with a small set of **engagements named for the situation the client is in**. The existing capabilities live underneath them.

| Engagement | Who it's for | What you get |
|---|---|---|
| **Product direction** (sprint) | Founders deciding what to build. Product and business leaders with an unclear opportunity or a contested roadmap. | A framed customer problem, the options weighed, a prototype where it helps, and a recommended next investment with its measure. "Don't build it" is a valid result. |
| **Build or improve** | A founder's first real version, or an established team whose customer experience (membership, commerce, a digital service) needs to work better. | A scoped release with the research and design it needs, built with the right specialists, instrumented, and handed over. Brand and web work lives here when it's the right fix. |
| **Applied AI pilot** | A business or product team with one specific workflow or customer experience worth improving. | An opportunity read, one working implementation, a way to evaluate it, clear human checkpoints, and training for the owner. The bookkeeping agents and Berry Good ops become examples inside this offer. |
| **Senior product partnership** (ongoing) | Teams that need sustained direction, prioritization, and help deciding what to ship. | An embedded, fractional senior product voice. This is the current "stewardship." |

Local businesses and the PNW stay as a lane and a source of proof, and every engagement still works for them. Local just stops being the frame.

## Homepage direction (merged)

1. **Hero:** what Madrona helps you decide and deliver, and for whom, with Charlie by name. CTA: Get in touch. Secondary: See the work.
2. **Why Charlie:** a compact credibility band that ties REI membership and loyalty, consumer product at scale, and applied AI to the work offered, placed early.
3. **Ways to work together:** the 3+1 engagements, each naming the situation and the result. This replaces both the hero window and "Four problems."
4. **Selected work:** two substantial stories (for example a shipped product like Lila, plus a clearly labeled Berry Good), each showing the problem, the decision, what was built, and what happened.
5. **How it works:** conversation, written read, a small first project, and a check on what changed.
6. **The studio:** Charlie leads, the network joins as needed, and owned products keep us honest. The local identity lives here, alongside one article.
7. **Contact:** invite the visitor to describe their situation in plain words.

**Nav:** How we help · Work · About · Articles · Get in touch. Work includes apps, demos and relevant prior experience. Tools and the AI assessment sit under Applied AI.

### Hero candidates

- **A (Astra's pick):** "Figure out what to build. Then make it work." *Madrona helps founders, product teams, and established businesses make clear product decisions and turn them into useful software. Led by Charlie Koch, with senior specialists as the work requires.*
- **B:** "Senior product judgment. From direction to delivery." *Work directly with Charlie Koch to shape a new product, improve an existing experience, or put AI to work on a specific problem.*
- **C:** "An important product problem. An experienced partner." *Madrona is Charlie Koch's product studio for founders and teams deciding what comes next.*
- **D (Opus):** "We figure out what to build. Then we build it." promoted from section title to hero. *Fifteen years leading consumer product at REI and Healthline, now building with a small senior team. For founders, product teams, and businesses with a digital problem worth solving well.*

## Staging

- **Pass 0 (no decision needed):** mobile hero overflow, /services mobile stacking, the blank New Products image, proof labels on artifacts and on the Berry Good claim.
- **Pass 1 (smallest clarity pass):** hero rewrite, replace the duplicate four-problem section with hiring situations, move the credibility band above the process section, give strategy an explicit route, fix contact topics and metadata, and fold /charlie into About.
- **Pass 2 (new version):** the engagement architecture on Home, Services, and Connect, two work stories, and the nav change. Propagate the canon first (business-and-offerings.md → madrona-positioning.md → the site CLAUDE.md).

## Decisions only Charlie can make

1. **The mix:** which 2-3 engagements you most want to win in the next six months, and how much of your time goes to advising, embedded leadership and hands-on building.
2. **Brand and websites:** stay a standalone offer, or only as part of a broader product problem?
3. **Strategy without build:** would you welcome a paid direction sprint that ends in "don't build it"?
4. **Local lane weight:** does "owner-run businesses" stay a named audience in the hero, or move down to a lane?
5. **/charlie:** retire it, or keep it noindexed as an unlinked page for job-search use?
6. **The AI-forward test:** the 08-13 re-weight was going to be validated in real outreach. Did that produce any signal?
