// The four areas, as visitors see them (2026-09-30): one source for the
// homepage spreads (AreasSection), the /services index, and the four area
// pages, so the headline, the one-line promise, and "what we make" read the
// same everywhere. Each area's landing page carries its own deeper copy.
// Canon order: AI & Operations leads.
// The four area ids (formerly in services.ts, retired 2026-10-05 when every
// area became a landing page with its copy in its own page file).
export type ServiceId = "operations-and-ai" | "brand-and-web" | "ecommerce-and-loyalty" | "new-products";

export interface Area {
  slug: string;          // anchor + CSS hook: #area-<slug>
  serviceId: ServiceId;  // the matching entry in services.ts
  route: string;
  name: string;
  headline: string;      // the outcome, stated (2026-10-02: statements, not problem questions)
  does: string;          // one line: what we do about it
  makes: string[];       // homepage rail: three plain lines
}

export const AREAS: Area[] = [
  {
    slug: "ai-operations",
    serviceId: "operations-and-ai",
    route: "/services/ai-operations",
    name: "AI & Operations",
    headline: "Get hours back every week.",
    does: "Practical AI and tools built on your real workflows, with a person checking anything that matters.",
    makes: ["Bookkeeping and invoicing agents", "Customer inbox triage", "Operations dashboards"],
  },
  {
    slug: "brand-website",
    serviceId: "brand-and-web",
    route: "/services/brand-website",
    name: "Brand & Website",
    headline: "A website that does your business justice.",
    does: "Brands and websites, designed and built to a high bar.",
    makes: ["Websites, designed and built", "Brand systems and packaging", "Positioning and messaging"],
  },
  {
    // Charlie, 2026-10-01: Ecommerce & Loyalty replaced Growth & Retention.
    // Selling online and earning the second order are one journey, and it is
    // where the studio's background is deepest (agency e-commerce platforms,
    // REI's membership relaunch).
    slug: "ecommerce-loyalty",
    serviceId: "ecommerce-and-loyalty",
    route: "/services/ecommerce-loyalty",
    name: "Ecommerce & Loyalty",
    headline: "Sell online, and keep them coming back.",
    does: "Online stores that make buying easy, and the memberships, rewards, and follow-up that turn first orders into regulars.",
    makes: ["Online stores and Shopify builds", "Memberships and rewards", "Reorders and win-back follow-up"],
  },
  {
    slug: "new-products",
    serviceId: "new-products",
    route: "/services/new-products",
    name: "New Products",
    headline: "Turn a good idea into a real product.",
    does: "From prototype to launched product. We build and run our own, so we know what launching takes.",
    makes: [],
  },
];

