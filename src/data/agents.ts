// The deployable-agent registry — the source of truth for the /agents gallery.
// Each entry has a live interactive demo (built on the AgentConsole engine).
// Add an agent here and it appears in the gallery automatically.

export type AgentEntry = {
  id: string;
  name: string;
  category: string;
  href: string;
  blurb: string;
  connects: string[];
  cadence: string;
};

export const agents: AgentEntry[] = [
  // Bookkeeping & finance
  {
    id: "month-end-close",
    name: "Month-end close",
    category: "Bookkeeping & finance",
    href: "/tools/month-end-close",
    blurb: "Reconciles the books against your processors, flags what needs a human, writes the P&L, and packages an accountant-ready close.",
    connects: ["QuickBooks", "Square", "PayPal"],
    cadence: "Monthly",
  },
  {
    id: "invoice-chasing",
    name: "Invoice chasing",
    category: "Bookkeeping & finance",
    href: "/tools/invoice-chasing",
    blurb: "Watches for overdue invoices and drafts a polite reminder for each in your voice. You decide who gets grace.",
    connects: ["QuickBooks", "Email", "Stripe"],
    cadence: "Daily",
  },
  {
    id: "cash-position",
    name: "Cash position",
    category: "Bookkeeping & finance",
    href: "/tools/cash-position",
    blurb: "Pulls every account into one honest number and flags the tight weeks before they bite. It reads; it never moves money.",
    connects: ["QuickBooks", "Bank feeds", "Stripe"],
    cadence: "Every morning",
  },
  {
    id: "payroll-planning",
    name: "Payroll planning",
    category: "Bookkeeping & finance",
    href: "/tools/payroll-planning",
    blurb: "Settles cash against what’s landing, forecasts whether payroll clears, and ranks which invoices to chase so it does.",
    connects: ["QuickBooks", "PayPal", "Gusto"],
    cadence: "Before each run",
  },

  // Customer & retention
  {
    id: "customer-inbox",
    name: "Customer email",
    category: "Customer & retention",
    href: "/tools/customer-inbox",
    blurb: "Drafts first answers to routine questions in your voice, and hands the sensitive ones back to you.",
    connects: ["Gmail / Inbox", "Your FAQ"],
    cadence: "Continuous",
  },
  {
    id: "post-sale-followup",
    name: "Post-sale follow-up",
    category: "Customer & retention",
    href: "/tools/post-sale-followup",
    blurb: "Runs the thank-you, the check-in, and the win-back you never get to, drafted in your voice, queued for your okay.",
    connects: ["Square", "Shopify", "Email"],
    cadence: "Daily",
  },
  {
    id: "review-requests",
    name: "Review requests",
    category: "Customer & retention",
    href: "/tools/review-requests",
    blurb: "Asks the right customers for a review at the right moment, and drafts your replies. It asks; it never fakes.",
    connects: ["Square", "Google Business", "Email"],
    cadence: "After each sale",
  },

  // Sales & intelligence
  {
    id: "best-customers",
    name: "Best customers",
    category: "Sales & intelligence",
    href: "/tools/best-customers",
    blurb: "Works your sales history into a straight answer (who your best customers are by margin, not just spend), then hands you the move.",
    connects: ["Square", "QuickBooks", "Shopify"],
    cadence: "On demand",
  },
  {
    id: "industry-brief",
    name: "Industry intelligence",
    category: "Market intelligence",
    href: "/tools/industry-brief",
    blurb: "Reads your trade’s sources overnight and briefs you on what actually changed, each signal with a next move.",
    connects: ["Trade sources", "Your base file"],
    cadence: "Nightly",
  },

  // Admin & legal
  {
    id: "contract-review",
    name: "Contract review",
    category: "Admin & legal",
    href: "/tools/contract-review",
    blurb: "Reads a contract before you sign, flags the terms and risks that matter, and points you to the one clause worth a lawyer.",
    connects: ["PDF upload", "Email"],
    cadence: "On demand",
  },
];
