// The fixed-scope AI offer (Charlie, 2026-10-01): a named, priced first
// project so a nervous owner can say yes to something specific. One source for
// every place it appears: the AI & Operations page, step 03 of how we work,
// and the assessment's closing step. The price shows only on AI & Operations,
// as a quiet detail (Charlie, 2026-10-01: a big number everywhere could scare
// off smaller businesses). Tool framing stays outcome-first: Claude
// by default, or the AI already inside the tools a business uses. No vendor
// partnership is implied.
export const SETUP_SPRINT = {
  name: "AI Setup Sprint",
  promise: "One job off your plate, running in two weeks.",
  price: "From $1,500",
  href: "/ai-setup#setup",
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

// The AI operations path (Charlie, 2026-10-05): the sendable /ai-setup page.
// Three steps, each saying what the owner walks away with. The assessment is
// a small paid step, credited in full toward setup; the command center is a
// custom dashboard per client (Helm is the example, not the product sold).
export const AI_PATH = [
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
