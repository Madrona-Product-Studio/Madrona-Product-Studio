// One metadata table for the whole site. Plain ESM (.mjs) so that both the
// build-time prerender (scripts/prerender.mjs, Node) and the React app
// (LabMeta, the /thinking feed, the article headers) import the same rows.
// Types live in siteMeta.d.mts next to this file.
//
// Per route: title, description, h1 (the static H1 crawlers see), body (the
// noscript summary for non-article pages), ogImage, article dates, faq,
// noindex. Article routes also carry their full prose in
// scripts/thinking-content.json, keyed by the same path.

export const SITE_ORIGIN = "https://www.madronaproduct.com";
export const SITE_NAME = "Madrona Product Studio";
export const DEFAULT_OG_IMAGE = "/og-main.png";
export const DEFAULT_OG_ALT =
  "Madrona Product Studio: the frond lockup on evergreen charcoal. A senior digital product studio built for the AI era.";

// The starter guide's FAQ. Rendered on the page and emitted as FAQPage
// structured data from the same array so the two can never drift.
export const starterGuideFaq = [
  {
    q: "What does this cost?",
    a: "GitHub and Vercel have free tiers that will carry you a long way. The agents are the real cost: Claude Code comes with Claude Pro and Codex comes with ChatGPT Plus, each about $20 a month as I write this. Starting with just Claude Code is fine.",
  },
  {
    q: "I'm not on a Mac. Does this still work?",
    a: "Yes. Everything here runs on Windows and Linux too, and both installers cover all three. The guide reads Mac because that is what I work on, but nothing about the loop is Mac-only.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You need to describe what you want clearly and look carefully at what you get back. You will absorb more than you expect by asking why, but the agents supply the syntax. You supply the judgment.",
  },
  {
    q: "Can it break something?",
    a: "The agents ask before running commands or changing files, and git means every committed change is saved and reversible. The honest risk is not a broken computer. It is shipping something you didn't look at, which is what the habits are for.",
  },
  {
    q: "What if the agent gets stuck?",
    a: "Commit what works, clear the conversation, and restate the goal in one sentence. If it is still circling, ask the other agent. A second opinion usually breaks the loop, which is half the reason we run two.",
  },
  {
    q: "How long until I have something real?",
    a: "An afternoon for the setup, a weekend for a first version you can put in front of someone. The loop is fast. The judgment takes longer, and that part is the fun.",
  },
];

// The 404 page: rendered by src/pages/NotFound.tsx and baked into
// dist/404.html by the prerender so Vercel answers unknown paths with a real
// 404 status and the same copy.
export const notFound = {
  title: "Page not found · Madrona Product Studio",
  kicker: "404",
  h1: "That page isn't here.",
  body: "The link may be old, or the address may have a typo in it. Everything we publish is a click away from these.",
  links: [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/ai-opportunities", label: "Find your AI opportunities" },
    { to: "/connect", label: "Get in touch" },
  ],
};

export const pages = {
  "/": {
    title: "Madrona Product Studio · PNW, USA",
    description: "Madrona is a full-service digital studio in the Pacific Northwest. Great websites, practical AI tools, and new products, designed and built by a small senior team, with examples of each.",
    h1: "Great digital work, with AI built in.",
    body: "A Pacific Northwest studio. We design websites and brands, build new products, and put AI to work inside your business, with a person checking what matters. Great websites, practical AI tools, and new products, designed and built by a small senior team that brings in specialists as the work needs them. Most of the work on this page we built for ourselves first, and each example is labeled for what it is: our own products, our demonstration business, working demos, or an illustrative example. We can build it for you. AI and operations: field notes into draft reports, bookkeeping and month-end agents, customer inbox triage, operations dashboards. Brand and website: brand systems, storefronts and online ordering, local guides with live maps. Growth and retention: follow-up, reminders, reviews, and guides grounded in your own content, for customers, members, donors, and volunteers. New products: Helm, Lila Trips, and the San Juan Boating Guide. Every engagement starts with a free 30-minute conversation, here in the PNW and beyond.",
  },
  "/ai-opportunities": {
    title: "AI Opportunity Assessment · a free 2-minute read · Madrona Product Studio",
    description: "Flag where your week actually goes and we hand you a short, honest map of where AI can help. About two minutes, no email needed. From Madrona Product Studio in the Pacific Northwest.",
    h1: "Where does your week actually go?",
    ogImage: "/og-ai-opportunities.png",
    body: "Flag what eats your time, and a live opportunity map fills in as you answer. We sort your week into what AI can run itself, what it amplifies, and what stays yours, then name the highest-leverage first move. About two minutes, no email required, and the read is yours to keep. From Madrona Product Studio in the Pacific Northwest.",
  },
  "/services": {
    title: "Services · Madrona Product Studio",
    description: "We help you figure out what to build, then build it. Four areas, one senior team: AI and operations, brand and website, ecommerce and loyalty, and new products, from a small senior team in the Pacific Northwest.",
    h1: "Four areas. One senior team.",
    body: "Four areas, one senior team, and every engagement starts with one free conversation. AI & Operations: get hours back every week, with practical AI and tools on your real workflows, with a person checking anything that matters. Brand & Website: brands and websites, designed and built to a high bar. Ecommerce & Loyalty: online stores that make buying easy, and the memberships, rewards, and follow-up that turn first orders into regulars. New Products: from prototype to launched product. How an engagement runs: a free 30-minute conversation, a written read on where we can help, then a small first project with its win named up front, paid only if it makes sense.",
  },
  "/services/ai-operations": {
    title: "AI & Operations: assessment, AI setup, and a command center · Madrona Product Studio",
    description: "Get your week back. An operations assessment ($300, credited toward setup), an AI setup on the tools you already use with your first jobs running in two weeks (from $1,500), and a custom command center you own. From a small senior studio in the Pacific Northwest.",
    h1: "The invoices, inbox, and follow-up, handled. You just approve.",
    body: "We find where your hours go, set AI up on the tools you already use, and leave you with one place to see what ran and what needs you. Step one, the Operations Assessment: a working session on how your week actually runs, a map of where your hours go, the three to five best opportunities ranked by time saved and effort, and a written plan you keep; $300, credited in full toward setup. Step two, the AI Setup Sprint: AI set up on your tools, with your first jobs running in two weeks, from $1,500, connected to your email, calendar, documents, and books, with your team trained and a written playbook. Step three, the Command Center: a dashboard built for your business and handed over, connected to your email and tools, showing what ran and what needs your okay; quoted after setup, and yours to keep. Your data stays on business accounts, and anything that sends money or messages waits for your approval.",
  },
  "/services/ecommerce-loyalty": {
    title: "Ecommerce & Loyalty: a Shopify store from $2,500, plus rewards that bring customers back · Madrona Product Studio",
    description: "A Shopify store set up in about two weeks from $2,500, with your products loaded and payments and shipping ready, plus rewards and reorder reminders from $750. From a small senior studio in the Pacific Northwest.",
    h1: "Sell online, and turn first orders into regulars.",
    body: "We set up your Shopify store in about two weeks, from $2,500, then add the rewards and reminders that bring people back. Step one, a store review: free, in the first call. Step two, your online store from $2,500: a proven theme, your products loaded, payments, shipping or pickup, and tax set up, and taught to run it yourself; rewards and reorder reminders from $750. Step three, growth only if you want it: follow-up, reviews, and rewards tuned month by month from $300 a month. Your Shopify plan is billed by Shopify directly.",
  },
  "/services/brand-website": {
    title: "Brand & Website: a small business website from $2,000, live in two weeks · Madrona Product Studio",
    description: "A clear, fast website for your small business, designed and built from $2,000 and live in one to two weeks. You can update it yourself, and nothing is monthly unless you want it. From a small senior studio in the Pacific Northwest.",
    h1: "A website you are proud to send people to, live in two weeks.",
    body: "We design and build a clear, fast site for your business, from $2,000. It says what you do, proves it, and you can update it yourself. Step one, a website review: free, in the first call, with an honest read on your current site and a fixed quote. Step two, a new website from $2,000, live in one to two weeks: a few well-built pages that work on every screen and that search engines can read. Bigger sites, or brand and site together, are quoted in writing. Step three, care only if you want it: from $75 a month, or pay as you go.",
  },
  "/services/new-products": {
    title: "New Products: validate an idea from $3,000, then build the first release · Madrona Product Studio",
    description: "Turn a good idea into a real product without betting the business on it. A validation sprint from $3,000 tests the idea with real people; then one senior team builds the smallest version worth shipping. From a small senior studio in the Pacific Northwest.",
    h1: "Turn a good idea into a real product, without betting the business on it.",
    body: "We test the idea with real people first, from $3,000, then build the smallest version worth shipping. Step one, a validation sprint from $3,000: a clickable prototype, sessions with the people it is for, and a written go, change, or stop. Step two, prototype to first release, quoted after validation: design and engineering from one senior team, AI features where they help, and the code and accounts are yours. Step three, a product partner after launch, monthly. We build and run our own products, including Helm and Lila Trips.",
  },
  "/charlie": {
    title: "Charlie Koch · Madrona Product Studio",
    description: "Charlie Koch is the founder of Madrona Product Studio in the Pacific Northwest: a product leader from Microsoft, REI, and Healthline who now ships AI-native products weekly. One career, read four ways, depending on why you're here.",
    noindex: true,
    h1: "Building products and communities people come back to.",
    body: "Charlie Koch builds products people come back to because they are good for them, and has led that work through every platform shift: mobile, membership, and now AI. Charlie Koch led consumer product at Microsoft, REI, and Healthline, and now runs Madrona Product Studio, where he takes products from idea to live software in weeks. Four ways to read the same career: if you're hiring a product leader, if you run a business, if you build in travel, the outdoors, or wellness, and if your work changes lives. Every path starts with a conversation.",
  },
  "/thesis": {
    title: "The Madrona Product Thesis · Madrona Product Studio",
    description: "AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. A working theory from building.",
    article: { datePublished: "2026-08-05", dateModified: "2026-08-07" },
    h1: "The Madrona Product Thesis",
    ogImage: "/og-pov-thesis.png",
    body: "A point of view on how great software gets built in the AI era. The disciplines remain; the boundaries become more permeable. The advantage is no longer shipping more software, it is learning faster through software. Product leadership creates the conditions for a multidisciplinary team to solve important customer problems. AI is leverage; what matters is where we choose to apply it.",
  },
  "/about": {
    title: "About · Madrona Product Studio",
    description: "Building changed what Charlie Koch believes product leadership is for. Madrona is a working theory: can small, senior, AI-enabled teams build products differently, and better?",
    h1: "About",
    body: "Madrona exists to put the Madrona Product Thesis into practice. Our own products and client work are the evidence, built with trusted people across disciplines, and pointed at work that leaves the world a little better than we found it.",
  },
  "/apps": {
    title: "Apps · Madrona Product Studio",
    description: "Apps Madrona builds to solve real customer problems, create useful software, and practice better ways of building.",
    h1: "Our apps",
    body: "Each Madrona product begins with a real customer problem and creates a place to test ideas, improve our methods, and make something useful in its own right.",
  },
  // Resources (2026-09-30): Tools + Articles in one place. /tools and
  // /thinking 301 here (vercel.json); the tool demos and articles keep their
  // own routes below.
  "/resources": {
    title: "Resources · Madrona Product Studio",
    description: "Tools and articles from Madrona Product Studio: interactive demos of the AI agents we deploy on real business workflows, and essays, guides, and artifacts on building software in the AI era.",
    h1: "Resources.",
    body: "Two kinds of resource, one place: tools you can try, and the thinking behind them. The tools are AI agents Madrona builds and deploys on real workflows (month-end close, invoice chasing, cash position, payroll planning, customer email, post-sale follow-up, review requests, best customers, industry intelligence, and contract review), each an interactive demo on Berry Good, our demonstration farm, and each stopping for a person wherever money, customers, or judgment are involved. The articles are essays, guides, and artifacts from inside the studio: the Madrona Product Thesis, the era of agentic operations, a starter guide to building real software with AI, and more.",
  },
  "/thinking/getting-started-with-ai": {
    title: "Getting started with AI: a plain-language guide for small business owners · Madrona Product Studio",
    description: "Where to start with AI in a small business: what AI is good at today, three safe first projects, what to avoid, what it really costs, and a day-by-day plan for your first week.",
    article: { datePublished: "2026-09-30", dateModified: "2026-09-30" },
    h1: "Getting started with AI: a plain-language guide for owners.",
    body: "What AI is actually good at today, three safe first projects, what to avoid, what it costs, and how to spend your first week.",
  },
  "/thinking/ai-prompt-starter-pack": {
    title: "AI prompts for small business owners: a free starter pack · Madrona Product Studio",
    description: "Nine copy-and-paste AI prompts for small business owners: customer replies, review responses, follow-ups, quotes, email summaries, invoice reminders, weekly numbers, checklists, and planning. Works in ChatGPT, Claude, Gemini, or Copilot.",
    article: { datePublished: "2026-09-30", dateModified: "2026-09-30" },
    h1: "An AI prompt starter pack for small business owners.",
    body: "Nine copy-and-paste prompts for the everyday jobs of running a small business: answering customers, handling paperwork, and keeping track of the week.",
  },
  "/thinking/the-era-of-agentic-operations": {
    title: "The era of agentic operations: running a business on AI agents · Madrona Product Studio",
    description: "What agentic AI means for a real business: AI agents handle the workflow automation on a rhythm, one source of truth holds the state, and a person stays in charge. What changes, and how to start small.",
    article: { datePublished: "2026-08-05", dateModified: "2026-08-07" },
    h1: "The era of agentic operations.",
    ogImage: "/og-pov-agentic-operations.png",
    body: "A business used to run on scattered tools and someone’s memory. It can now run on one source of truth and a handful of agents on a rhythm: a nightly sweep, a morning pulse, a daily brief, a weekly sync, rendered live on a command surface. Agents propose; the owner decides and sends. The point is not automation, it is attention. We sell what we run: Madrona itself operates on this exact pattern.",
  },
  "/thinking/starter-guide-to-building-with-ai": {
    title: "A starter guide to building real software with AI: setup, prompts, first steps · Madrona Product Studio",
    description: "How to start building software with AI, in an afternoon: install Claude Code and Codex, set up GitHub and Vercel, the six copy-paste prompts that make AI coding agents actually work, your first build, and an honest FAQ.",
    article: { datePublished: "2026-08-05", dateModified: "2026-08-07" },
    h1: "A starter guide to building real software with AI.",
    ogImage: "/og-pov-starter-guide.png",
    faq: starterGuideFaq,
    body: "You do not need a computer science degree to build real software with AI. This guide covers the whole setup in an afternoon, with the actual keystrokes: install Claude Code (curl -fsSL https://claude.ai/install.sh | bash) and Codex as terminal AI coding agents, GitHub as your source of truth, Vercel deploying every change live, and connectors that give your agent reach. Then the six working prompts that do the heavy lifting: ask for a plan first, make the agent screenshot and check its own work, ask for options not answers, keep a ship gate, make it teach you, and write the rules down once in a CLAUDE.md file. Plus what to build first, the habits that separate shipping from stalling, and answers on cost, Windows vs Mac, safety, and what to do when the agent gets stuck.",
  },
  "/thinking/under-the-hood": {
    title: "The engine behind everything we ship: how we build software with AI · Madrona Product Studio",
    description: "Inside an AI-assisted software development process that ships real products: the bootstrap template, one monitoring setup across the whole portfolio, installed design skills, and the image system: the platform every project inherits, and how to set the same thing up yourself.",
    article: { datePublished: "2026-08-05", dateModified: "2026-08-15" },
    h1: "The engine behind everything we ship.",
    ogImage: "/og-pov-under-the-hood.png",
    body: "Hard-won product judgment, encoded into a platform every project inherits: design systems, proven integrations, hardened code, standards, and quality gates. AI is the power tool; the engine is the judgment it executes. Every launch teaches it something new. The parts, if you want to set this up yourself: a bootstrap template with standards pre-wired and verified green, one monitoring setup (Sentry, health endpoints, uptime checks, one alert destination) applied by stakes across the portfolio, a design intelligence layer installed as agent plugins, and an image system that builds type in code and generates atmosphere. Each part is becoming its own field note; this page collects them as they land.",
  },
  "/thinking/solve-the-system-not-the-symptom": {
    title: "Solve the system, not the symptom: fix the machine, not the output · Madrona Product Studio",
    description: "When something is wrong, the instinct is to fix the thing in front of you. The higher-leverage move is one level down: fix the system that produced it, so everything it makes next is better. Why AI made that trade the default, and how to tell which symptoms are worth it.",
    article: { datePublished: "2026-08-05", dateModified: "2026-08-07" },
    h1: "Solve the system, not the symptom.",
    ogImage: "/og-pov-solve-the-system.png",
    body: "When something is wrong, the instinct is to fix the thing in front of you: recolor the button, redo the one bad output. The higher-leverage move is almost always one level down: fix the system that produced it, so everything it makes next is better. AI made that trade cheap enough to be the default. A worked example: instead of nudging one bad generated image, rewrite the criteria the tool runs on, and the whole set improves at once. Point the tool at the tool. The discipline is spending your attention where it compounds, on the machine, not the symptom, and knowing which symptoms are worth going upstream for.",
  },
  "/thinking/ai-tools-for-small-business": {
    title: "AI Tools for Small Business: The 12 Jobs They Already Do (2026) · Madrona Product Studio",
    description: "A living inventory of what out-of-the-box AI handles for a small business today: month-end close, invoice chasing, customer email, marketing assets, ads, reviews. Claude for Small Business, QuickBooks agents, Gemini, Canva, Shopify Magic and more, each with what it needs from you and where it ends.",
    article: { datePublished: "2026-08-17", dateModified: "2026-08-17" },
    h1: "The 12 jobs AI tools already do for small businesses.",
    ogImage: "/og-pov-ai-tools-inventory.png",
    body: "A lot of the work that fills a small business owner's week is already handled, out of the box, by tools you may be paying for today. Twelve jobs, organized by problem rather than product: month-end close, chasing overdue invoices, knowing your cash position, payroll planning, routine customer email, contract review, marketing assets, running a campaign, ad automation, post-sale follow-up, asking for reviews, and knowing your best customers. Named tools throughout: Claude for Small Business and Claude Cowork, QuickBooks Intuit agents, Gemini in Google Workspace, Microsoft Copilot, Canva Magic Studio, Shopify Magic and Sidekick, Meta Advantage+, Google Performance Max, Square, HubSpot, DocuSign. Each entry carries what it needs from you before it works and where the packaged version ends. Updated as the shelf changes.",
  },
  "/open": {
    title: "Open: our tools, free to use · Madrona Product Studio",
    description: "Open-source Claude Code plugins from Madrona Product Studio: a forkable plain-text operating system kept current by agents, plus the craft catalog we ship polished product with: motion, social images, launch readiness, visual QA. MIT licensed.",
    h1: "Open.",
    body: "Tools we build and use every day, shared because that is what being part of the community is. The belief behind them: the machine is the artifact. The flagship is operating-system, the plain-text engine we run our own studio on: you own the mind; the app renders it. The craft catalog covers motion options, animation vocabulary and review, Open Graph images, a Playwright screenshotter for visual QA, investor-ready audits, go-to-market sweeps, and pre-share cleanup. Install once with the Claude Code plugin marketplace: /plugin marketplace add Madrona-Product-Studio/madrona-open.",
  },
  "/connect": {
    title: "Let's connect · Madrona Product Studio",
    description: "Book a 30-minute call or send us a message about your project. Every path begins with a free 30-minute conversation with a published agenda.",
    h1: "Let's connect.",
    body: "Whatever's easiest: book a 30-minute call or send a message about your project. Every way in starts the same, a free 30-minute conversation with a published agenda. Email hello@madronaproduct.com.",
  },

  // Tool demos: one page per agent. Each is its own high-intent landing page
  // ("AI month-end close QuickBooks"). OG cards come from
  // scripts/make-agent-og.mjs by slug (resolveOgImage).
  "/tools/month-end-close": {
    title: "Month-end close agent (QuickBooks): a working demo · Madrona Product Studio",
    description: "Watch an AI month-end close run: it reconciles QuickBooks against Square and PayPal, flags mismatches for your approval, writes a plain-English P&L, and packages an accountant-ready close. Every step that touches money stops for you.",
    h1: "Month-end close.",
    body: "An AI agent that runs your month-end close: it connects to QuickBooks, Square, and PayPal, reconciles every transaction against the settlements, flags anything unmatched for your review, then writes a plain-English profit-and-loss narrative and packages an accountant-ready close packet. Every step that touches money waits for your approval. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: books that are roughly current and QuickBooks connected once. Where it ends: the mismatches it flags still need your call, and it does not replace the person who owns the numbers. Setup takes about a week, then it is yours to keep.",
  },
  "/tools/invoice-chasing": {
    title: "Invoice-chasing agent (QuickBooks): a working demo · Madrona Product Studio",
    description: "An AI agent that watches for overdue invoices and drafts a polite reminder for each in your voice, queued for your approval. You decide who gets grace; it never sends on its own. Try the live demo.",
    h1: "Invoice chasing.",
    body: "An AI agent that chases overdue invoices: it watches your receivables in QuickBooks, drafts a polite reminder for each overdue account in your own voice, and queues them for your approval. It never sends on its own. You decide who gets a nudge and who gets grace. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: invoices actually issued from the system, and a few lines about your voice. Where it ends: the good customer who is late is a relationship decision, not a workflow. Connects to QuickBooks, email, and Stripe; runs daily; setup takes a few days.",
  },
  "/tools/industry-brief": {
    title: "Industry-intelligence agent: a working demo · Madrona Product Studio",
    description: "An AI agent that reads your industry’s reports, prices, and news overnight, compares them to a base file, and briefs you on what actually changed, each signal with a suggested next move. Try the live demo.",
    h1: "Industry intelligence.",
    body: "An AI agent that runs industry and competitive intelligence: overnight it reads your trade’s reports, prices, competitors, and news, compares everything against a base file of what you already know, and hands you a short brief of what actually changed. A brief, not a feed, with each signal attached to a suggested next move. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: a base file worth comparing against, which we write with you. Where it ends: it surfaces what moved and suggests a move, but the call stays yours. One pattern, any industry; runs nightly; setup takes about a week.",
  },
  "/tools/customer-inbox": {
    title: "Customer-email agent: a working demo · Madrona Product Studio",
    description: "An AI agent that drafts first answers to routine customer questions in your voice (hours, availability, orders) and holds anything sensitive for you. The upset customer always comes to you. Try the live demo.",
    h1: "Customer email.",
    body: "An AI agent that handles routine customer email: it reads new messages, drafts first answers to the routine ones (hours, availability, orders) in your own voice from your FAQ, and holds anything sensitive for you. Every reply waits for your approval before it sends, and the upset customer always routes to you. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: written answers to draw from, your policies and hours and return rules. Where it ends: the message that needs a human, you send yourself. Connects to Gmail or your inbox and your FAQ; runs continuously; setup takes a few days.",
  },
  "/tools/cash-position": {
    title: "Cash-position agent (QuickBooks): a working demo · Madrona Product Studio",
    description: "An AI agent that pulls every account into one honest cash number, forecasts the next 30 days, and flags shortfalls before they bite. It reads and forecasts; it never moves money. Try the live demo.",
    h1: "Cash position.",
    body: "An AI agent that answers what is my cash position right now: it pulls balances from every connected account (bank, cards, Stripe), forecasts the next 30 days of inflows and outflows, and flags a tight week before it becomes a problem, with suggested moves you approve. It reads and forecasts; it never moves money. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: every account connected, because the pulse is only as honest as what it can see. Where it ends: which invoice to chase and whether to dip into savings stays your call. Connects to QuickBooks, bank feeds, and Stripe; runs every morning; setup takes a few days.",
  },
  "/tools/payroll-planning": {
    title: "Payroll-planning agent: a working demo · Madrona Product Studio",
    description: "An AI agent that settles your cash against what is landing, forecasts whether payroll clears, and ranks which invoices to chase so it does. It plans; your provider still runs payroll. Try the live demo.",
    h1: "Payroll planning.",
    body: "An AI agent that plans payroll: before each run it settles your QuickBooks cash against PayPal settlements, forecasts thirty days to the run, and ranks which overdue invoices to chase so payroll clears comfortably. Nothing moves money without your approval. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: your accounts connected and a payroll date to plan toward. Where it ends: this is payroll planning. Running payroll, taxes, benefits, and compliance stay with your provider. Connects to QuickBooks, PayPal, and Gusto; runs before each payroll; setup takes a few days.",
  },
  "/tools/post-sale-followup": {
    title: "Post-sale follow-up agent: a working demo · Madrona Product Studio",
    description: "An AI agent that runs the post-sale follow-up you never get to: thank-yous, check-ins, win-backs for lapsing customers, drafted in your voice and queued for your approval. Try the live demo.",
    h1: "Post-sale follow-up.",
    body: "An AI agent that runs customer follow-up: it watches for new sales and for regulars going quiet, drafts the right note for each moment (a thank-you, a check-in, a win-back) in your own voice, and queues them for your approval. It sends nothing on its own, and hands back anything that is really a service issue. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: a follow-up rhythm you decide once. Where it ends: the tools execute cadence but do not know your regulars. Connects to Square, Shopify, and email; runs daily; setup takes a few days.",
  },
  "/tools/review-requests": {
    title: "Review-requests agent (Google): a working demo · Madrona Product Studio",
    description: "An AI agent that asks the right customers for a review at the right moment in your voice, and drafts your replies. It asks; it never fakes or incentivizes. Try the live demo.",
    h1: "Review requests.",
    body: "An AI agent that collects reviews: it finds happy repeat customers worth asking, drafts a review request in your voice, never with an incentive, and drafts replies to the reviews you get, holding the critical one for you to answer yourself. Every ask and reply waits for your approval. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: your Google Business Profile connected and sales history so it asks the right people. Where it ends: automate the ask, never the review itself, and the unhappy customer is always yours. Connects to Square, Google Business Profile, and email; runs after each sale; setup takes a few days.",
  },
  "/tools/best-customers": {
    title: "Best-customers agent: a working demo · Madrona Product Studio",
    description: "An AI agent that works your sales history into a straight answer: who your best customers are, by margin not just spend, then hands you what to do about it. Try the live demo.",
    h1: "Best customers.",
    body: "An AI agent that tells you who your best customers are: it pulls your full sales history, ranks customers by margin rather than just spend, and surfaces the findings that matter (the channel that out-earns, the nearly-regulars worth winning back, the highest-margin item), each with a suggested move you approve. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: your sales history living somewhere it can read. Where it ends: the analysis is instant, but deciding what to build for your best customers is strategy, and that stays yours. Connects to Square, QuickBooks, and Shopify; runs on demand; setup takes a few days.",
  },
  "/tools/contract-review": {
    title: "Contract-review agent: a working demo · Madrona Product Studio",
    description: "An AI agent that reads a contract before you sign, flags the terms and risks that matter in plain English, and points you to the one clause worth a lawyer. A sharp first read, not legal advice. Try the live demo.",
    h1: "Contract review.",
    body: "An AI agent that reviews a contract before you sign: it reads the document end to end, flags the terms and risks that matter (auto-renewals, one-sided repair clauses, personal guarantees) in plain English, and tells you which one is worth taking to a lawyer. Nothing signs automatically, and it is a first read, not legal advice. Run the interactive demo on Berry Good Berry Farm, our demonstration business. What it needs: the contract as a file it can read and your questions about it. Where it ends: it flags, it does not decide, and it is not your lawyer. The review sharpens your conversation with counsel. Connects to PDF upload and email; runs on demand; setup takes minutes.",
  },

  // Internal surfaces: prerendered so they load as real pages, kept out of
  // the index and the sitemap.
  "/pitch-kit": {
    title: "Pitch Kit · Madrona Product Studio",
    description: "Charlie Koch's positioning kit, an internal rehearsal surface.",
    h1: "The Pitch Kit",
    body: "An internal rehearsal surface for Charlie Koch's positioning. The public version lives at /charlie.",
    noindex: true,
  },
  "/lab/madrona-system": {
    title: "Madrona V2 System Lab",
    description: "The Madrona design-system study: tokens, type, and components in one place.",
    h1: "A warm, practical system for serious work.",
    body: "An internal design-system study for Madrona Product Studio: the palette, the type ramp, and the component vocabulary the site is built from.",
    noindex: true,
  },
};

// Strip a trailing slash so "/services/" and "/services" hit the same row.
export function normalizePath(pathname) {
  if (!pathname) return "/";
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return p || "/";
}

// Tool pages get their generated per-agent card by slug; everything else
// falls back to its own ogImage or the sitewide card.
export function resolveOgImage(route, meta) {
  if (meta && meta.ogImage) return meta.ogImage;
  if (route.startsWith("/tools")) {
    const slug = route === "/tools" ? "index" : route.slice("/tools/".length);
    return `/og-agents/${slug}.png`;
  }
  return DEFAULT_OG_IMAGE;
}

export function ogImageAlt(meta) {
  if (!meta || !meta.ogImage) return DEFAULT_OG_ALT;
  return `${meta.h1.replace(/\.$/, "")} · Thinking, Madrona Product Studio`;
}

// Everything the head needs for one route, resolved.
export function metaFor(pathname) {
  const route = normalizePath(pathname);
  const meta = pages[route];
  if (!meta) return null;
  return {
    route,
    url: `${SITE_ORIGIN}${route === "/" ? "" : route}`,
    title: meta.title,
    description: meta.description,
    ogImage: `${SITE_ORIGIN}${resolveOgImage(route, meta)}`,
    ogImageAlt: ogImageAlt(meta),
    ogType: meta.article ? "article" : "website",
    noindex: Boolean(meta.noindex),
    article: meta.article || null,
  };
}

// "August 2026" from "2026-08-05". Used by the article headers and the
// /thinking feed so the visible dates come from the same field the JSON-LD
// datePublished / dateModified use.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function monthLabel(iso, { short = false } = {}) {
  const [y, m] = iso.split("-").map(Number);
  const name = MONTHS[m - 1] || "";
  return `${short ? name.slice(0, 3) : name} ${y}`;
}
export function publishedLabel(route, opts) {
  const a = pages[route]?.article;
  return a ? monthLabel(a.datePublished, opts) : "";
}
export function updatedLabel(route, opts) {
  const a = pages[route]?.article;
  return a ? monthLabel(a.dateModified || a.datePublished, opts) : "";
}
