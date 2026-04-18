export interface Offering {
  title: string;
  slug: string;
  timeline: string;
  description: string;
}

export const offerings: Offering[] = [
  {
    title: "Strategy sprints",
    slug: "strategy-sprints",
    timeline: "2–6 weeks",
    description:
      "A sharp point of view on the question blocking the roadmap. We dig into the customer, the market, the product, and come back with a clear recommendation and the evidence behind it.",
  },
  {
    title: "Build engagements",
    slug: "build-engagements",
    timeline: "2–6 months",
    description:
      "We lead, plus the right team, to ship real product. Strategy through launch — including the messy middle where most product work actually happens.",
  },
  {
    title: "Fractional product leadership",
    slug: "fractional-product-leadership",
    timeline: "3–6 month retainers",
    description:
      "Embedded senior product voice for early-stage teams. The strategic thinking and shipping discipline of a VP Product, without the full-time overhead.",
  },
];
