// The deployable-agent registry — the source of truth for the /tools gallery
// and the header of every /tools/:slug page. Each entry has an interactive,
// scripted demo (built on the AgentConsole engine); the demo content itself
// lives beside this file in data/agentDemos/<slug>.tsx and is keyed by id.
// Add an agent here + a demo module there and it appears everywhere.

export type AgentProof = "berry" | "helm";

export type AgentEntry = {
  id: string;
  name: string;
  category: string;
  href: string;
  blurb: string;
  connects: string[];
  cadence: string;
  // Hero button labels. runLabel points at the scripted console; deployLabel
  // names what the agent would actually be deployed on, per agent (books,
  // receivables, inbox) rather than a generic "your books" for all ten.
  runLabel: string;
  deployLabel: string;
  // The one real thing each page links to: the live Berry Good storefront for
  // the customer-facing agents, the Helm public demo for the operations ones.
  proof: AgentProof;
  // True for the two agents whose page also carries the live "try it on your
  // own text" panel (api/agent-demo.ts). The finance agents stay scripted.
  liveDemo?: boolean;
};

export const CATEGORY = {
  finance: "Bookkeeping & finance",
  customer: "Customer & retention",
  intelligence: "Sales & market intelligence",
  admin: "Admin & legal",
} as const;

export const agents: AgentEntry[] = [
  // Bookkeeping & finance
  {
    id: "month-end-close",
    name: "Month-end close",
    category: CATEGORY.finance,
    href: "/tools/month-end-close",
    blurb: "Reconciles the books against your processors, flags what needs a human, writes the P&L, and packages an accountant-ready close.",
    connects: ["QuickBooks", "Square", "PayPal"],
    cadence: "Monthly",
    runLabel: "Walk through the close",
    deployLabel: "Deploy this on your books",
    proof: "helm",
  },
  {
    id: "invoice-chasing",
    name: "Invoice chasing",
    category: CATEGORY.finance,
    href: "/tools/invoice-chasing",
    blurb: "Watches for overdue invoices and drafts a polite reminder for each in your voice. You decide who gets grace.",
    connects: ["QuickBooks", "Email", "Stripe"],
    cadence: "Daily",
    runLabel: "Walk through the chase",
    deployLabel: "Deploy this on your receivables",
    proof: "helm",
  },
  {
    id: "cash-position",
    name: "Cash position",
    category: CATEGORY.finance,
    href: "/tools/cash-position",
    blurb: "Pulls every account into one honest number and flags the tight weeks before they bite. It reads; it never moves money.",
    connects: ["QuickBooks", "Bank feeds", "Stripe"],
    cadence: "Every morning",
    runLabel: "Walk through the pulse",
    deployLabel: "Deploy this on your accounts",
    proof: "helm",
  },
  {
    id: "payroll-planning",
    name: "Payroll planning",
    category: CATEGORY.finance,
    href: "/tools/payroll-planning",
    blurb: "Settles cash against what’s landing, forecasts whether payroll clears, and ranks which invoices to chase so it does.",
    connects: ["QuickBooks", "PayPal", "Gusto"],
    cadence: "Before each run",
    runLabel: "Walk through the plan",
    deployLabel: "Deploy this on your payroll",
    proof: "helm",
  },

  // Customer & retention
  {
    id: "customer-inbox",
    name: "Customer email",
    category: CATEGORY.customer,
    href: "/tools/customer-inbox",
    blurb: "Drafts first answers to routine questions in your voice, and hands the sensitive ones back to you.",
    connects: ["Gmail / Inbox", "Your FAQ"],
    cadence: "Continuous",
    runLabel: "Walk through the triage",
    deployLabel: "Deploy this on your inbox",
    proof: "berry",
    liveDemo: true,
  },
  {
    id: "post-sale-followup",
    name: "Post-sale follow-up",
    category: CATEGORY.customer,
    href: "/tools/post-sale-followup",
    blurb: "Runs the thank-you, the check-in, and the win-back you never get to, drafted in your voice, queued for your okay.",
    connects: ["Square", "Shopify", "Email"],
    cadence: "Daily",
    runLabel: "Walk through the follow-ups",
    deployLabel: "Deploy this on your customers",
    proof: "berry",
  },
  {
    id: "review-requests",
    name: "Review requests",
    category: CATEGORY.customer,
    href: "/tools/review-requests",
    blurb: "Asks the right customers for a review at the right moment, and drafts your replies. It asks; it never fakes.",
    connects: ["Square", "Google Business", "Email"],
    cadence: "After each sale",
    runLabel: "Walk through the asks",
    deployLabel: "Deploy this on your reviews",
    proof: "berry",
  },

  // Sales & market intelligence
  {
    id: "best-customers",
    name: "Best customers",
    category: CATEGORY.intelligence,
    href: "/tools/best-customers",
    blurb: "Works your sales history into a straight answer (who your best customers are by margin, not just spend), then hands you the move.",
    connects: ["Square", "QuickBooks", "Shopify"],
    cadence: "On demand",
    runLabel: "Walk through the analysis",
    deployLabel: "Deploy this on your sales history",
    proof: "helm",
  },
  {
    id: "industry-brief",
    name: "Industry intelligence",
    category: CATEGORY.intelligence,
    href: "/tools/industry-brief",
    blurb: "Reads your trade’s sources overnight and briefs you on what actually changed, each signal with a next move.",
    connects: ["Trade sources", "Your base file"],
    cadence: "Nightly",
    runLabel: "Walk through the sweep",
    deployLabel: "Deploy this on your industry",
    proof: "helm",
  },

  // Admin & legal
  {
    id: "contract-review",
    name: "Contract review",
    category: CATEGORY.admin,
    href: "/tools/contract-review",
    blurb: "Reads a contract before you sign, flags the terms and risks that matter, and points you to the one clause worth a lawyer.",
    connects: ["PDF upload", "Email"],
    cadence: "On demand",
    runLabel: "Walk through the review",
    deployLabel: "Deploy this on your next contract",
    proof: "helm",
    liveDemo: true,
  },
];

export function findAgent(slug: string | undefined): AgentEntry | undefined {
  return agents.find((agent) => agent.id === slug);
}
