export interface CaseStudyItem {
  label: string;
  description: string;
}

export interface WhatWeDidItem {
  label: string;
  description: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface WhatWeDid {
  lead: string;
  items: WhatWeDidItem[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  tags: string[];
  category: "recent" | "experience";
  externalUrl?: string;
  externalLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  opportunity: string;
  thesis: string;
  whatWeDid: WhatWeDid;
  builtWith: CaseStudyItem[];
  whatWeLearned: string[];
  status: string[];
}

export const caseStudies: CaseStudy[] = [
  // --- Recent work ---
  {
    slug: "lila-trips",
    title: "Lila Trips",
    client: "Studio project",
    tagline:
      "A travel platform for designing transformative trips in sacred landscapes.",
    tags: ["wellness", "travel", "AI", "concept"],
    category: "recent",
    externalUrl: "https://www.lilatrips.com/",
    externalLabel: "lilatrips.com",
    heroImage: "/case-studies/lila-trips/hero.jpg",
    heroImageAlt: "The Lila Trips homepage",
    opportunity:
      "Most travel products are built to optimize — most trails, most sights, least time. That's useful if you're planning a long weekend. It's the wrong frame entirely if you want a trip that actually changes something. The people who travel that way — for intention, for practice, for depth — are underserved by every major travel tool, and the new wave of AI travel apps makes the problem worse, not better. More hallucinated recommendations, more \"optimized\" days, less actual place.",
    thesis:
      "A good trip isn't a list of things to do. It's a weave — of place, timing, weather, sky, wildlife, practice, pace. The information to do that weaving well already exists, scattered across public APIs, citizen science networks, government data, and the lived knowledge of people who know a place. What's missing is a product that pulls it all together into something coherent enough to trust. Build that product — and let AI do the part it's actually good at: sequencing and personalizing, not inventing.",
    whatWeDid: {
      lead: "Built the full product — research, brand, destination guides, planner, and all the infrastructure underneath. Three areas in particular took the most work and make the thing what it is:",
      items: [
        {
          label: "An AI-powered trip planner on a leash.",
          description:
            "Most AI travel products let the model hallucinate freely and hope for the best. Lila does the opposite: every restaurant, trail, hotel, and cultural site exists in a hand-curated guide file, and the AI can only recommend from that corpus. The trade is scale for trust, and it's the right call — itineraries feel authored, not generated. *See the planner at [lilatrips.com/plan](https://www.lilatrips.com/plan).*",
          image: "/case-studies/lila-trips/planner.jpg",
          imageAlt: "A generated Lila Trips itinerary showing day-by-day activities",
          caption: "The planner shapes days from curated guide content — authored, not hallucinated.",
        },
        {
          label: "Destination guides that pull live context from everywhere.",
          description:
            "Each guide is a long-form editorial page backed by live data — NPS trail conditions, iNaturalist wildlife observations, Google Places enrichment for restaurants and hotels, astronomy calculations for the night sky widget, real-time weather, USGS river levels. Tap a condor in the Zion guide and you get 372 real nearby observations. Open the night sky widget and the moon phase is drawn from tonight's synodic age. *[See the guides.](https://www.lilatrips.com/destinations)*",
          image: "/case-studies/lila-trips/destination-guide.jpg",
          imageAlt: "A Lila Trips destination guide page showing terrain, trails, and curated content",
          caption: "Each destination is a long-form guide backed by live data — trails, wildlife, weather, night sky.",
        },
        {
          label: "A practice library woven into the trip.",
          description:
            "The planner draws on a library of contemplative and movement practices (built separately as [Lila.yoga](https://lila.yoga)) and assigns them to days as matched companions. Day 3 at the Narrows might pair with a Taoist water meditation and a Tree Pose at the canyon rim. Not a feature bolted on — a worldview embedded in software.",
          image: "/case-studies/lila-trips/practice-companion.jpg",
          imageAlt: "A practice companion card matched to a day in a Lila Trips itinerary",
          caption: "The AI matches practices to each day based on setting and energy.",
        },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "Vite + React SPA, Tailwind for utility styling",
      },
      {
        label: "Hosting",
        description: "Vercel (static + serverless functions)",
      },
      {
        label: "AI",
        description:
          "Claude API for itinerary generation, refinement, and item alternatives, with NDJSON streaming to keep mobile connections alive during 30+ second generations",
      },
      {
        label: "Storage",
        description: "Supabase (sessions, trip sharing)",
      },
      {
        label: "Live data",
        description:
          "NPS, Google Places, iNaturalist, AstronomyAPI, Open-Meteo, USGS — pulled through cached serverless proxies so API keys never touch the client",
      },
      {
        label: "Email",
        description: "Resend for trip sharing and contact",
      },
    ],
    whatWeLearned: [
      "The hard part of AI-powered product isn't the AI. It's the ground truth underneath it — the guides, the curation, the constrained context, the research, the math. The AI gets the credit; the corpus does the work.",
      "Most AI products are thin. This one is deep by choice, and you can feel the difference the moment you use it.",
    ],
    status: [
      "Live at [lilatrips.com](https://www.lilatrips.com/), in active beta with real users as of this writing. The product has already been through several research and build iterations; the public release is where it meets actual intentional travelers for the first time.",
      "The beta is focused on three things: whether the core planner is usable, whether the experience is actually desirable to the intentional-travel audience we built it for, and whether the AI-generated itineraries hold up in quality and stability across real trips.",
      "What comes next depends on what the users tell us. The likely paths forward are freemium tiers for the planner and guides, referral monetization on bookings, and small-group *Threshold Trips* as a higher-touch product. More destinations will come as the core product earns them.",
      "~~Build real, test real, scale what's earned.~~",
    ],
  },
  {
    slug: "lila-yoga",
    title: "Lila Yoga",
    client: "Bellingham Yoga Collective",
    tagline: "A digital experience for a community yoga studio",
    tags: ["wellness", "yoga", "community"],
    category: "recent",
    opportunity: "Placeholder — the opportunity behind this project.",
    thesis: "Placeholder — the thesis we tested.",
    whatWeDid: { lead: "Placeholder — what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned."],
    status: ["Placeholder."],
  },
  {
    slug: "utah-trip-guide",
    title: "Utah Trip Guide",
    client: "Self-initiated",
    tagline: "An opinionated guide to adventure travel in Utah",
    tags: ["travel", "outdoor", "content"],
    category: "recent",
    opportunity: "Placeholder — the opportunity behind this project.",
    thesis: "Placeholder — the thesis we tested.",
    whatWeDid: { lead: "Placeholder — what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned."],
    status: ["Placeholder."],
  },
  {
    slug: "san-juan-discovery-guide",
    title: "San Juan Discovery Guide",
    client: "San Juan Islands Chamber of Commerce",
    tagline: "A discovery guide for the San Juan Islands",
    tags: ["travel", "local", "community"],
    category: "recent",
    opportunity: "Placeholder — the opportunity behind this project.",
    thesis: "Placeholder — the thesis we tested.",
    whatWeDid: { lead: "Placeholder — what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned."],
    status: ["Placeholder."],
  },
  // --- Selected experience ---
  {
    slug: "rei-adventures",
    title: "REI Adventures",
    client: "REI",
    tagline: "Product strategy for REI's guided trip business",
    tags: ["outdoor", "travel", "strategy"],
    category: "experience",
    opportunity:
      "REI Adventures is one of the largest adventure travel companies in the US, but the digital product experience hadn't kept pace with the quality of the trips themselves.",
    thesis:
      "A modern trip discovery and booking experience — one that felt as considered as the trips — could unlock meaningful growth in a business with strong margins and deep brand affinity.",
    whatWeDid: {
      lead: "Developed the product strategy for trip discovery, booking, and post-trip engagement. Led the team through research, concept development, and initial build.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
    status: ["Shipped."],
  },
  {
    slug: "rei-cooperative-action",
    title: "REI Cooperative Action",
    client: "REI",
    tagline:
      "Uniting REI's member activism and charitable giving programs",
    tags: ["outdoor", "social impact", "membership"],
    category: "experience",
    opportunity: "Placeholder — the opportunity behind this work.",
    thesis: "Placeholder — the thesis we tested.",
    whatWeDid: { lead: "Placeholder — what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned."],
    status: ["Shipped."],
  },
  {
    slug: "healthline-bezzy-daily-dose",
    title: "Healthline — Bezzy + Daily Dose",
    client: "Healthline",
    tagline: "Community and engagement products for health audiences",
    tags: ["health", "community", "consumer"],
    category: "experience",
    opportunity:
      "Healthline reaches hundreds of millions of users, but most visits are transactional — search, read, leave. There was an opportunity to build deeper, ongoing relationships through community and personalized content.",
    thesis:
      "Health content consumers would engage more deeply with a platform that combined peer community with personalized daily content — not just search-driven articles.",
    whatWeDid: {
      lead: "Led the product strategy and launch for Bezzy (peer community for chronic conditions) and Daily Dose (personalized health content), from concept through initial release.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
    status: ["Shipped."],
  },
  {
    slug: "rei-membership",
    title: "REI Membership",
    client: "REI",
    tagline: "Rebuilding REI's member experience",
    tags: ["outdoor", "membership", "e-commerce"],
    category: "experience",
    opportunity:
      "REI's co-op membership — one of the most iconic loyalty programs in retail — needed a modern digital experience that reflected the depth of the member relationship.",
    thesis:
      "Membership at REI is more than a dividend check. A reimagined digital experience could deepen engagement and drive both retention and lifetime value.",
    whatWeDid: {
      lead: "Led the product strategy and roadmap for the membership experience redesign across web and mobile, from discovery through launch.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
    status: ["Shipped."],
  },
];
