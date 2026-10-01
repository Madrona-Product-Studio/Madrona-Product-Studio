// The four areas, as visitors see them (2026-09-30): one source for the
// homepage spreads (AreasSection), the /services index, and the four area
// pages, so the question, the one-line promise, and "what we make" read the
// same everywhere. services.ts keeps the deeper service data (images, SEO).
// Canon order: AI & Operations leads.
import type { ServiceId } from "./services";

export interface Area {
  slug: string;          // anchor + CSS hook: #area-<slug>
  serviceId: ServiceId;  // the matching entry in services.ts
  route: string;
  name: string;
  question: string;      // the plain question the area answers
  does: string;          // one line: what we do about it
  makes: string[];       // homepage rail: three plain lines
  offer: { name: string; line: string }[]; // area page: what we make, with a line each
}

export const AREAS: Area[] = [
  {
    slug: "ai-operations",
    serviceId: "operations-and-ai",
    route: "/services/ai-operations",
    name: "AI & Operations",
    question: "Losing hours to work software should be doing?",
    does: "Practical AI and tools built on your real workflows, with a person checking anything that matters.",
    makes: ["Bookkeeping and invoicing agents", "Customer inbox triage", "Operations dashboards"],
    offer: [
      { name: "Workflow fixes", line: "We map how the work actually moves, then take out the copying, checking, and chasing." },
      { name: "AI assistants and agents", line: "Drafts, triage, and reports that run on your real systems, with a person approving what matters." },
      { name: "Tools that talk to each other", line: "The systems you already pay for, connected, so information is entered once." },
      { name: "Dashboards", line: "One place to see what ran, what changed, and what needs you." },
    ],
  },
  {
    slug: "brand-website",
    serviceId: "brand-and-web",
    route: "/services/brand-website",
    name: "Brand & Website",
    question: "Website just OK, and not doing the business justice?",
    does: "Brands and websites, designed and built to a high bar.",
    makes: ["Websites, designed and built", "Brand systems and packaging", "Positioning and messaging"],
    offer: [
      { name: "Websites", line: "Clear, fast sites that say what you do, prove it, and ask once." },
      { name: "Brand systems", line: "Color, type, and voice that make every touchpoint feel like the same business." },
      { name: "Positioning and messaging", line: "The plain-words version of why someone should choose you." },
      { name: "Sites you can keep current", line: "Pages, posts, and guides your team can update without calling anyone." },
    ],
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
    question: "Selling online, but people only buy once?",
    does: "Online stores that make buying easy, and the memberships, rewards, and follow-up that turn first orders into regulars.",
    makes: ["Online stores and Shopify builds", "Memberships and rewards", "Reorders and win-back follow-up"],
    offer: [
      { name: "Online stores", line: "Shopify builds and replatforms, with a checkout that gets out of the way." },
      { name: "Ordering and pickup", line: "Order ahead, reorder in a tap, and pickup that runs itself." },
      { name: "Memberships and rewards", line: "Reasons to stay that feel specific to you, for customers, members, or donors." },
      { name: "Follow-up and reviews", line: "The thank-you, the review ask, and the win-back, mostly automated." },
    ],
  },
  {
    slug: "new-products",
    serviceId: "new-products",
    route: "/services/new-products",
    name: "New Products",
    question: "Have an idea that deserves to become real?",
    does: "From prototype to launched product. We build and run our own, so we know what launching takes.",
    makes: [],
    offer: [
      { name: "Validation", line: "Test the idea with real people before committing a real budget." },
      { name: "Prototypes", line: "Something working in people’s hands, fast, to settle the debate." },
      { name: "The first real version", line: "Design and engineering from one senior team, all the way to users." },
      { name: "Launch and iteration", line: "Ship it, watch real usage, and improve what matters." },
    ],
  },
];

export const areaByServiceId = (id: ServiceId) => AREAS.find(a => a.serviceId === id)!;
