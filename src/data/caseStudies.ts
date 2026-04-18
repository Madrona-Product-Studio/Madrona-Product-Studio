export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  tags: string[];
  isStudioProject: boolean;
  opportunity: string;
  thesis: string;
  whatWeDid: string;
  whatWeLearned: string;
  status: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "lila-trips",
    title: "Lila Trips",
    client: "Studio Project",
    tagline: "Wellness-infused adventure travel concept",
    tags: ["wellness", "travel", "concept"],
    isStudioProject: true,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "The adventure travel market is booming, but most offerings ignore the wellness dimension. There's a gap for trips that combine physical challenge with intentional recovery and reflection.",
    thesis:
      "Travelers who invest in wellness at home would pay a premium for adventure trips designed with the same intentionality — if the experience felt authentic rather than spa-bolted-on.",
    whatWeDid:
      "Conducted customer discovery interviews, mapped the competitive landscape, developed the brand positioning and initial trip concepts, and built a prototype booking experience.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Concept validated. Exploring go-to-market partners.",
  },
  {
    slug: "rei-membership",
    title: "REI Membership",
    client: "REI",
    tagline: "Rebuilding REI's member experience",
    tags: ["outdoor", "membership", "e-commerce"],
    isStudioProject: false,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "REI's co-op membership — one of the most iconic loyalty programs in retail — needed a modern digital experience that reflected the depth of the member relationship.",
    thesis:
      "Membership at REI is more than a dividend check. A reimagined digital experience could deepen engagement and drive both retention and lifetime value.",
    whatWeDid:
      "Led the product strategy and roadmap for the membership experience redesign across web and mobile, from discovery through launch.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Shipped.",
  },
  {
    slug: "rei-adventures",
    title: "REI Adventures",
    client: "REI",
    tagline: "Product strategy for REI's guided trip business",
    tags: ["outdoor", "travel", "strategy"],
    isStudioProject: false,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "REI Adventures is one of the largest adventure travel companies in the US, but the digital product experience hadn't kept pace with the quality of the trips themselves.",
    thesis:
      "A modern trip discovery and booking experience — one that felt as considered as the trips — could unlock meaningful growth in a business with strong margins and deep brand affinity.",
    whatWeDid:
      "Developed the product strategy for trip discovery, booking, and post-trip engagement. Led the team through research, concept development, and initial build.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Shipped.",
  },
  {
    slug: "healthline-loyalty",
    title: "Healthline Loyalty",
    client: "Healthline",
    tagline: "Launching a rewards program at Healthline",
    tags: ["health", "loyalty", "consumer"],
    isStudioProject: false,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Healthline reaches hundreds of millions of users, but most visits are transactional — search, read, leave. There was an opportunity to build a deeper relationship through a loyalty and rewards program.",
    thesis:
      "Health content consumers would engage more deeply with a platform that rewarded consistent engagement with personalized value — not just points.",
    whatWeDid:
      "Led the product strategy, business case, and launch of Healthline's first loyalty program, from concept through initial release and iteration.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Shipped and iterating.",
  },
  {
    slug: "berry-good-berry-farm",
    title: "Berry Good Berry Farm",
    client: "Studio Project",
    tagline: "Hyperlocal digital presence for a WA farm",
    tags: ["local", "agriculture", "web"],
    isStudioProject: true,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "A small family farm in Washington needed a digital presence that matched the quality of what they grow — something simple, warm, and functional without the overhead of a complex platform.",
    thesis:
      "Local farms don't need e-commerce platforms. They need a clean, fast site that tells people what's in season, where to find them, and why they should care.",
    whatWeDid:
      "Designed and built a lightweight site focused on seasonal availability, farm story, and market schedule. Optimized for mobile and local search.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Live.",
  },
  {
    slug: "fed",
    title: "Fed",
    client: "Studio Project",
    tagline: "Connecting communities to local food banks",
    tags: ["social impact", "food security", "react"],
    isStudioProject: true,
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Food insecurity is a local problem, but most resources for finding food assistance are fragmented, outdated, or hard to navigate — especially on mobile.",
    thesis:
      "A focused, mobile-first tool that makes it dead simple to find nearby food banks and their current hours could meaningfully reduce the friction that keeps people from getting help.",
    whatWeDid:
      "Built a React application that aggregates local food bank data and presents it in a clean, location-aware interface optimized for speed and simplicity.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "In development.",
  },
];
