export interface Offering {
  title: string;
  slug: string;
  timeline: string;
  description: string;
  outcome: string;
  goodFor?: string;
}

export const offerings: Offering[] = [
  {
    title: "Strategy sprint",
    slug: "strategy-sprint",
    timeline: "2–6 weeks",
    description:
      "We start with the question blocking the roadmap and end with a working prototype you can touch, react to, and show people. Not a deck. Not a wireframe. Working software that makes the abstract concrete.\n\nStrategy and building happen simultaneously. We think by building. The prototype is the strategy deliverable: the product direction, the key decisions, and the evidence, all in a form you can put in front of real people the day the sprint ends.",
    outcome:
      "A working prototype. A product brief. The hard calls, made. Something to react to, not just read about.",
  },
  {
    title: "Signal sprint",
    slug: "signal-sprint",
    timeline: "4–12 weeks",
    description:
      "A prototype without users is a guess. This is where the guess becomes evidence.\n\nThe working prototype goes in front of real people. We instrument it, watch how they use it, and iterate on what we learn. Not a focus group. Not a survey. Real usage, real signal, real decisions about what to keep, what to cut, and what to change.",
    outcome:
      "Validated (or invalidated) hypotheses. A refined prototype shaped by real usage. Clear signal on what to build next, and what to stop building.",
  },
  {
    title: "Product stewardship",
    slug: "product-stewardship",
    timeline: "3–6 month retainers",
    description:
      "A senior product voice embedded in your team, not advising from the outside. Half-time or quarter-time. Same access, same accountability, same judgment as a full-time product leader, without the full-time hire.",
    goodFor:
      "Founders who've validated the direction and need someone to hold it as the team scales. Or organizations that need senior product judgment to shape what's next.",
    outcome:
      "Continuity. The same person who shaped the strategy and built the prototype, now guiding the team building the full thing.",
  },
];
