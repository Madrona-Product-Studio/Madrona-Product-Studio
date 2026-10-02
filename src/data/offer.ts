// The fixed-scope AI offer (Charlie, 2026-10-01): a named, priced first
// project so a nervous owner can say yes to something specific. One source for
// every place it appears: the AI & Operations page, step 03 of how we work,
// and the assessment's closing step. Tool framing stays outcome-first: Claude
// by default, or the AI already inside the tools a business uses. No vendor
// partnership is implied.
export const SETUP_SPRINT = {
  name: "AI Setup Sprint",
  promise: "One job off your plate, running in two weeks.",
  price: "From $1,500",
  priceShort: "from $1,500",
  href: "/services/ai-operations#setup-sprint",
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
