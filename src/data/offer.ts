// The fixed-scope AI offer (Charlie, 2026-10-01): a named, priced first
// project so a nervous owner can say yes to something specific. One source for
// every place it appears: the AI & Operations landing page, step 03 of how
// we work, and the assessment's closing step. The price shows only on AI & Operations,
// as a quiet detail (Charlie, 2026-10-01: a big number everywhere could scare
// off smaller businesses). Tool framing stays outcome-first: Claude
// by default, or the AI already inside the tools a business uses. No vendor
// partnership is implied.
export const SETUP_SPRINT = {
  name: "AI Setup Sprint",
  promise: "One job off your plate, running in two weeks.",
  price: "From $1,500",
  href: "/services/ai-operations#setup",
  scope: [
    { name: "Connected to what you use", line: "Email, calendar, documents, and your books (Google Workspace or Microsoft 365, QuickBooks), set up securely." },
    { name: "One real job, end to end", line: "Invoice chasing, the inbox, month-end, or the job that ate last weekend." },
    { name: "Your team can run it", line: "We teach it, and leave a short written playbook." },
    { name: "30 days of check-ins", line: "We tune it once it is doing real work." },
  ],
  terms: "Fixed price and scope, in writing, after the free first conversation.",
  tools: "We set it up on Claude by default, or on the AI already built into the tools you use.",
  after: "Want more after that? An optional monthly plan takes on the next job each month.",
};

// The AI operations path (Charlie, 2026-10-05): the steps on the AI &
// Operations landing page (/services/ai-operations; /ai-setup redirects).
// Three steps, each saying what the owner walks away with. The assessment is
// a small paid step, credited in full toward setup; the command center is a
// custom dashboard per client (Helm is the example, not the product sold).
export type PathStep = { id: string; n: string; name: string; price: string; line: string; gets: string[] };

export const AI_PATH: PathStep[] = [
  {
    id: "assessment",
    n: "01",
    name: "Operations Assessment",
    price: "$300, credited toward setup",
    line: "A working session on how your week actually runs, then a plan you keep.",
    gets: [
      "A map of where your hours go",
      "The three to five best opportunities, ranked by time saved and effort",
      "A written plan: what each would take, and what it would change",
      "The full $300 credited if you go on to setup",
    ],
  },
  {
    id: "setup",
    n: "02",
    name: SETUP_SPRINT.name,
    price: "From $1,500",
    line: SETUP_SPRINT.promise,
    gets: SETUP_SPRINT.scope.map(s => `${s.name}: ${s.line.charAt(0).toLowerCase()}${s.line.slice(1)}`),
  },
  {
    id: "command-center",
    n: "03",
    name: "Command Center",
    price: "Monthly, quoted after setup",
    line: "One screen for the business: what ran, what is waiting on you, and what is next.",
    gets: [
      "A dashboard built for your business, connected to your email and tools",
      "Everything that ran on its own, and everything that needs your okay",
      "New jobs added month by month as the first ones prove out",
    ],
  },
];

// Brand & Website and Ecommerce & Loyalty offers (Charlie, 2026-10-05, after
// a market check: freelance 5-page sites run $1.5-5k, Shopify setups with a
// freelancer or small studio $2-10k, care plans $50-150/mo). The first step is
// free inside the first call; ongoing help is optional, "only if needed".
export const BRAND_PATH: PathStep[] = [
  {
    id: "review", n: "01", name: "Website review", price: "Free, in the first call",
    line: "What your site does well, what it costs you, and what to fix first.",
    gets: ["An honest read on your current site", "What to keep, what to change, and what it would take", "A fixed quote if a new site makes sense"],
  },
  {
    id: "site", n: "02", name: "A new website", price: "From $2,000",
    line: "A clear, fast site for your business, live in one to two weeks.",
    gets: ["A few well-built pages that say what you do and prove it", "Works on every screen, built so search engines can read it", "A site you can update yourself", "Bigger sites, or brand and site together, quoted in writing"],
  },
  {
    id: "care", n: "03", name: "Care, only if you want it", price: "From $75/mo, or pay as you go",
    line: "Updates, new pages, and small fixes when you need them.",
    gets: ["Changes handled for you, so the site stays current", "No contract: pay as you go if you prefer", "Skip it entirely if you'd rather run it yourself"],
  },
];

export const COMMERCE_PATH: PathStep[] = [
  {
    id: "review", n: "01", name: "Store review", price: "Free, in the first call",
    line: "Where buyers drop off today, and what a store would take.",
    gets: ["A look at how you sell now: phone, DMs, or an existing store", "What to set up first for the most sales", "A fixed quote for the build"],
  },
  {
    id: "store", n: "02", name: "Your online store", price: "From $2,500",
    line: "A Shopify store taking orders and payments in about two weeks.",
    gets: ["A store on a proven theme, with your products loaded", "Payments, shipping or pickup, and tax set up", "Taught to run it yourself", "Rewards and reorder reminders added from $750"],
  },
  {
    id: "growth", n: "03", name: "Growth, only if you want it", price: "From $300/mo",
    line: "The follow-up, reviews, and rewards tuned month by month.",
    gets: ["Win-back and review requests running and improving", "A short monthly read on what sold and what to try", "Cancel any time"],
  },
];

// New Products offer (Charlie, 2026-10-05): prove the idea cheaply first;
// the build and the ongoing partnership are quoted once the idea has proof.
export const PRODUCT_PATH: PathStep[] = [
  {
    id: "validate", n: "01", name: "Validation sprint", price: "From $3,000",
    line: "Test the idea with real people before you commit a real budget.",
    gets: ["A clickable prototype of the core idea", "Sessions with the people it is for", "A written go, change, or stop, with what the first version should be"],
  },
  {
    id: "build", n: "02", name: "Prototype to first release", price: "Quoted after validation",
    line: "The smallest version worth shipping, in real hands.",
    gets: ["Design and engineering from one senior team", "AI features where they genuinely help", "Launched, with the measures that matter set up from day one", "The code and accounts are yours"],
  },
  {
    id: "partner", n: "03", name: "Product partner", price: "Monthly, quoted",
    line: "A senior product lead in your corner after launch.",
    gets: ["What to build next, decided from real usage", "Ongoing design and engineering as needed", "Month to month"],
  },
];
