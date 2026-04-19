export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  tags: string[];
  category: "recent" | "experience";
  opportunity: string;
  thesis: string;
  whatWeDid: string;
  whatWeLearned: string;
  status: string;
}

export const caseStudies: CaseStudy[] = [
  // --- Recent work ---
  {
    slug: "lila-trips",
    title: "Lila Trips",
    client: "Lila",
    tagline: "Wellness-infused adventure travel concept",
    tags: ["wellness", "travel", "concept"],
    category: "recent",
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
    slug: "lila-yoga",
    title: "Lila Yoga",
    client: "Bellingham Yoga Collective",
    tagline: "A digital experience for a community yoga studio",
    tags: ["wellness", "yoga", "community"],
    category: "recent",
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Placeholder — the opportunity behind this project.",
    thesis:
      "Placeholder — the thesis we tested.",
    whatWeDid:
      "Placeholder — what we did.",
    whatWeLearned:
      "Placeholder — what we learned.",
    status: "Placeholder.",
  },
  {
    slug: "utah-trip-guide",
    title: "Utah Trip Guide",
    client: "Self-initiated",
    tagline: "An opinionated guide to adventure travel in Utah",
    tags: ["travel", "outdoor", "content"],
    category: "recent",
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Placeholder — the opportunity behind this project.",
    thesis:
      "Placeholder — the thesis we tested.",
    whatWeDid:
      "Placeholder — what we did.",
    whatWeLearned:
      "Placeholder — what we learned.",
    status: "Placeholder.",
  },
  {
    slug: "san-juan-discovery-guide",
    title: "San Juan Discovery Guide",
    client: "San Juan Islands Chamber of Commerce",
    tagline: "A discovery guide for the San Juan Islands",
    tags: ["travel", "local", "community"],
    category: "recent",
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Placeholder — the opportunity behind this project.",
    thesis:
      "Placeholder — the thesis we tested.",
    whatWeDid:
      "Placeholder — what we did.",
    whatWeLearned:
      "Placeholder — what we learned.",
    status: "Placeholder.",
  },
  // --- Selected experience ---
  {
    slug: "rei-adventures",
    title: "REI Adventures",
    client: "REI",
    tagline: "Product strategy for REI's guided trip business",
    tags: ["outdoor", "travel", "strategy"],
    category: "experience",
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
    slug: "rei-cooperative-action",
    title: "REI Cooperative Action",
    client: "REI",
    tagline: "Uniting REI's member activism and charitable giving programs",
    tags: ["outdoor", "social impact", "membership"],
    category: "experience",
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Placeholder — the opportunity behind this work.",
    thesis:
      "Placeholder — the thesis we tested.",
    whatWeDid:
      "Placeholder — what we did.",
    whatWeLearned:
      "Placeholder — what we learned.",
    status: "Shipped.",
  },
  {
    slug: "healthline-bezzy-daily-dose",
    title: "Healthline — Bezzy + Daily Dose",
    client: "Healthline",
    tagline: "Community and engagement products for health audiences",
    tags: ["health", "community", "consumer"],
    category: "experience",
    // TODO: Replace placeholder copy with real content
    opportunity:
      "Healthline reaches hundreds of millions of users, but most visits are transactional — search, read, leave. There was an opportunity to build deeper, ongoing relationships through community and personalized content.",
    thesis:
      "Health content consumers would engage more deeply with a platform that combined peer community with personalized daily content — not just search-driven articles.",
    whatWeDid:
      "Led the product strategy and launch for Bezzy (peer community for chronic conditions) and Daily Dose (personalized health content), from concept through initial release.",
    whatWeLearned:
      "Placeholder — what we learned from this engagement.",
    status: "Shipped.",
  },
  {
    slug: "rei-membership",
    title: "REI Membership",
    client: "REI",
    tagline: "Rebuilding REI's member experience",
    tags: ["outdoor", "membership", "e-commerce"],
    category: "experience",
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
];
