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
    does: "Brands, websites, and online experiences, designed and built to a high bar.",
    makes: ["Websites, designed and built", "Brand systems and packaging", "Online stores and ordering"],
    offer: [
      { name: "Websites", line: "Clear, fast sites that say what you do, prove it, and ask once." },
      { name: "Brand systems", line: "Color, type, and voice that make every touchpoint feel like the same business." },
      { name: "Online stores and ordering", line: "Checkout and ordering with the friction taken out." },
      { name: "Positioning and messaging", line: "The plain-words version of why someone should choose you." },
    ],
  },
  {
    slug: "growth-retention",
    serviceId: "customers-and-growth",
    route: "/services/growth-retention",
    name: "Growth & Retention",
    question: "People buy once, then you never hear from them again?",
    does: "The follow-up, reminders, and answers that keep people coming back, whether they’re customers, members, donors, or volunteers. Mostly automated, with a person where it counts.",
    makes: ["Booking, reminder, and win-back automations", "Review requests and post-sale follow-up", "Onboarding flows"],
    offer: [
      { name: "Follow-up and win-back", line: "The thank-you, the check-in, and the come-back message that rarely gets sent." },
      { name: "Reviews and referrals", line: "Ask the right people at the right moment, and answer every review." },
      { name: "Easier buying and reordering", line: "Fewer steps between wanting it and having it." },
      { name: "Onboarding and memberships", line: "A first week that sticks, and reasons to stay that feel specific to you." },
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
