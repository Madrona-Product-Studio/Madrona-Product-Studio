# Madrona Product Studio — Site Backlog

## In flight
- [ ] **Our POV section (`feature/playbook` branch, unmerged)** — the studio feed at /pov with four articles on the Thesis content template: the Product Thesis, Madrona: under the hood, The era of agentic operations, A starter guide to building with AI. Charlie is iterating before merge; two more pieces (launch checklist, Madrona Principles) sit in the drawer as unrouted components.

## SEO & Discoverability
- [ ] **NEXT: Google Search Console access** — verify the domain + service-account API access so we can see which queries the /pov articles (a deliberate traffic play) rank and get clicked for. Same setup pattern as the Vercel analytics tool in `~/.claude-tools/analytics/`.
- [ ] Branded OG cards for the four /pov articles (via the /og-image fleet skill) — shares should unfurl on-brand for a traffic-driving section
- [ ] Writing section content — superseded in part by /pov; remaining article targets: fractional product leadership, prototype before PRD
- [ ] Dedicated offering pages — Strategy Sprints, Rapid Prototyping, Fractional Product Leadership as standalone pages with their own URLs

## Design & Brand
- [ ] Wordmark decision — uppercase, lowercase, title case, or small-caps
- [ ] Companion mark / favicon — replace the placeholder "M" circle
- [ ] Studio signature component — `<StudioSignature />` for studio project footers (Lila, HikerLink, etc.)

## Content
- [ ] Detail offering sections — how we communicate what an actual engagement looks like
- [ ] About page copy polish
- [ ] "We build systems, not just products" positioning. Show that the studio builds reusable infrastructure (component libraries, the capabilities + standards registry, shared packages like @madrona/api-utils) that makes building faster and easier to maintain. A real differentiator vs. studios that ship and leave. Worth surfacing on Approach or About at some point. Source: madrona-studio-capabilities repo.
- [x] "How we can help" question set — self-recognizing prompts that make the offerings concrete. Live as a Home section. Full raw bank to pull from / rotate:
  - Need to pressure-test a new idea before you commit real money to it? *(live)*
  - Sitting on a roadmap question that's been stuck for months? *(live)*
  - Not sure the thing you're imagining is actually worth building?
  - Need a working prototype you can put in front of people, not another deck? *(live)*
  - Want to build an internal tool to streamline how your team operates? *(live)*
  - Trying to add AI to your product without the hallucinations and the hype? *(live)*
  - Built something but not sure it's landing with users?
  - Need real signal on what to keep, cut, or change?
  - Want a senior product voice on your team without a full-time hire?
  - Want what we build to make your next build faster, not just ship and leave? *(systems/loops angle)*

## Done
- [x] Removed pre-Madrona placeholder case studies (REI x3, Healthline); kept the logo-row tease
- [x] Hero subhead rewrite + comma fix
- [x] Site-wide em-dash sweep (page titles now use ·)
- [x] Sitemap generated from prerender data; /writing noindexed
- [x] Real favicon.png wired up
- [x] OG image URLs made absolute (+ width/height/alt)
- [x] JSON-LD Organization structured data
- [x] Hero cycler phrases — punchier, more opinionated
- [x] Dots animation — working
- [x] OG share image redesign
- [x] HikerLink case study added
- [x] Lila Trips copy update — category-level thesis, em-dash sweep
- [x] Em-dash sweep across all case studies
- [x] Case study card layout — title above image
- [x] Aria Health / Lila Yoga order swap
- [x] Build-time prerendering for SEO
- [x] Sitemap and robots.txt
- [x] Differentiators headline update
