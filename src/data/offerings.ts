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
      "A sharp point of view on the question blocking the roadmap. Product vision, service design, customer research, strategic framing — whatever it takes to get the team aligned and moving. You leave with a direction, the evidence behind it, and a plan for what to do next.",
  },
  {
    title: "Rapid prototyping",
    slug: "rapid-prototyping",
    timeline: "4–12 weeks",
    description:
      "A working prototype, fast. Not a spec. Not a deck. A real thing people can use — a tool, a product, a proof of concept — built well enough to test the hypothesis and show what the full version should be. When it's ready to scale, we hand off cleanly.",
  },
  {
    title: "Fractional product leadership",
    slug: "fractional-product-leadership",
    timeline: "3–6 month retainers",
    description:
      "An embedded senior product voice for early-stage teams. Half-time or quarter-time. Helpful for founders figuring out what to build, or small teams that need senior judgment without a full-time hire.",
  },
];
