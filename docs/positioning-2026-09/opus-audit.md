# Opus 5.5 audit — positioning clarity (2026-09-29)

## Core diagnosis
The site answers "what do you do" with a deliverables menu (4 categories x 12 chips) instead of a point of view about what Charlie is best at. A menu of deliverables reads as an agency; the specific deliverables (invoice chasing, month-end close, win-back email, storefronts, loyalty programs) read as SMB operations. The canon's own guard ("never read as AI automation agency") is violated by the first thing in the hero window.

## Findings
1. Hero headline is category language, not a claim. "A senior digital product studio built for the AI era" (src/pages/v3/Hero.tsx:31) says what kind of company, not what problem or for whom. "AI era" is the crowd's word (canon rejected "AI-native" for this reason).
2. Three audiences in one sentence = no audience. "founders, local businesses, and product teams" (Hero.tsx:32). No one self-identifies.
3. The evidence contradicts the widening. Every piece of client-shaped proof on Home and Services is Berry Good (a berry farm). Tools page = QuickBooks month-end close, invoice chasing. Articles include "12 jobs AI tools already do for small businesses." Copy says product teams; proof says farm stand. Visitors believe proof over copy.
4. Charlie's differentiated strength is nearly invisible on the homepage. Zero credentials above the fold or anywhere on Home. REI (22M-member loyalty, $200M app portfolio), Healthline (AI at 90M monthly users), Microsoft appear only in an About paragraph and on /charlie. The strongest claim ("senior consumer product leader who now builds with AI") is buried.
5. The four doors are peers that aren't peers. Brand & Website is the least differentiated capability (commodity, network-dependent) but sits level with New Products and AI. Growth & Retention is actually Charlie's deepest career credential (REI membership/loyalty) but is rendered as SMB tactics (win-back email, repeat ordering).
6. Homepage repeats the same four categories twice in the first two screens (hero window, then the "Four problems" ledger). Second pass adds symptom questions but no new information about why Madrona.
7. /charlie is actually the clearest articulation on the site ("four ways to read the same career"), which shows the underlying split: the site is trying to serve hiring managers, small-business owners, outdoor/wellness builders, and mission orgs at once. Door 01 "If you're hiring a product leader" is job-search framing on a studio surface, which canon §6 forbids.
8. Nav order leads with Apps (consumer apps portfolio), then Services, Tools (SMB agent demos), Articles (route is /thinking). First nav item suggests an app maker. Label/route mismatch on Articles.

## Layout / spacing (Home)
9. BUG: mobile 390 hero overflows the right gutter. .v3-home-copy, h1, lede, primary button, hero window all measure right=395 on a 390 viewport (zero/negative right gutter; left gutter is 16). Visible in the render: lede and GET IN TOUCH run to the edge.
10. Big dead band between hero hairline and "What we can help with" (~120px of empty top padding on a flat ground) makes the fold feel like the page ended.
11. The problem ledger: questions on the left, service name pushed to the far right with a long connector hairline; ~40% of each row is empty rule. Reads sparse, not structured.
12. Final CTA band: headline + one line in the left third, right two thirds empty charcoal.
13. Section grounds alternate bg/paper without a clear logic; combined with the dead bands it reads as a stack of slabs.

## Proposed offer shape (Opus)
Organize by the kind of problem, with Charlie's real strengths as the spine:
- Figure out what to build: product strategy, opportunity assessment, AI opportunity read. For founders, leaders, product teams.
- Build the first real version: prototype -> MVP -> launch, with real-user signal. For founders and teams with a new bet.
- Put AI to work: AI features in your product, agentic workflows in your operation.
- Grow and keep customers: membership, loyalty, lifecycle (the REI credential). For consumer businesses.
- Fractional product leadership: embedded senior product voice (stewardship).
Brand & web becomes a supporting capability inside "build," not a peer door. Local/PNW stays as a lane and a proof source, not the frame.
