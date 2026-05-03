export interface ReferralContext {
  source: string;
  headline?: string;
  subhead?: string;
  greeting?: string;
}

const referralMap: Record<string, ReferralContext> = {
  // Travel & hospitality
  airbnb: {
    source: "Airbnb",
    headline: "Building products that create belonging.",
    subhead: "Travel, community, and marketplace products — that's the work I keep coming back to.",
  },
  expedia: {
    source: "Expedia",
    headline: "Building the future of travel, with AI.",
    subhead: "AI-powered travel experiences, marketplace products, and 15 years of shipping at scale.",
  },
  marriott: {
    source: "Marriott",
    headline: "Building loyalty that people actually feel.",
    subhead: "22M-member programs, experiential travel, and the product sense that comes from building through every shift.",
  },
  kindred: {
    source: "Kindred",
    headline: "Trust is the product.",
    subhead: "Two-sided marketplaces, community at scale, and the supply-side challenge that makes it all work.",
  },
  spotnana: {
    source: "Spotnana",
    headline: "Travel infrastructure, rethought.",
    subhead: "15 years building travel and commerce products. Now building with AI every day.",
  },
  fora: {
    source: "Fora",
    headline: "Empowering the people who make travel happen.",
    subhead: "Supply-side marketplace tools, AI-powered experiences, and a love for the craft of travel.",
  },
  disney: {
    source: "Disney",
    headline: "Loyalty that people build their lives around.",
    subhead: "22M-member programs, experiential products, and retention strategies that go deeper than points.",
  },
  carnival: {
    source: "Carnival",
    headline: "The itinerary is the product.",
    subhead: "Experiential travel, digital commerce at scale, and the booking experience that earns the trip.",
  },
  holland: {
    source: "Holland America",
    headline: "The itinerary is the product.",
    subhead: "Experiential travel, product strategy, and the craft of getting people to remarkable places.",
  },

  // Outdoor & wellness
  brooks: {
    source: "Brooks Running",
    headline: "Innovation starts with understanding community.",
    subhead: "Emerging tech, outdoor products, and a deep respect for why people show up every Thursday morning.",
  },
  campspot: {
    source: "Campspot",
    headline: "Outdoor hospitality deserves great product.",
    subhead: "Marketplace thinking, partner success, and a genuine love for getting people outside.",
  },
  outside: {
    source: "Outside",
    headline: "Mapping the way to what matters.",
    subhead: "Outdoor activity apps, content-meets-product, and a career spent getting people outside.",
  },
  classpass: {
    source: "ClassPass",
    headline: "Wellness as a habit, not a transaction.",
    subhead: "Loyalty, marketplace, and the community products that keep people coming back.",
  },
  playlist: {
    source: "Playlist",
    headline: "Wellness as a habit, not a transaction.",
    subhead: "Loyalty, marketplace, community — and a personal yoga practice booked through ClassPass.",
  },

  // Health tech
  "hinge-health": {
    source: "Hinge Health",
    headline: "Health products that actually change outcomes.",
    subhead: "Digital health at scale, AI-powered personalization, and 0-to-1 building in regulated environments.",
  },
  "grow-therapy": {
    source: "Grow Therapy",
    headline: "Community is the most powerful wellness intervention.",
    subhead: "Digital health products, 300K+ member communities, and the infrastructure that makes care accessible.",
  },

  // Tech & marketplace
  zillow: {
    source: "Zillow",
    headline: "Marketplaces are trust engines.",
    subhead: "Two-sided platforms, AI-driven experiences, and the product sense that comes from 15 years of building.",
  },
  compass: {
    source: "Compass",
    headline: "The platform is the differentiator.",
    subhead: "Product organizations, platform thinking, and the tools that give people a genuine edge.",
  },
  twitch: {
    source: "Twitch",
    headline: "Community is the product.",
    subhead: "22M members, 300K+ communities, and the product challenges of belonging at scale.",
  },

  // Generic sources
  linkedin: {
    source: "LinkedIn",
    greeting: "Thanks for clicking through.",
  },
  resume: {
    source: "Resume",
    greeting: "Glad you're here.",
  },
};

export function getReferralContext(searchParams: URLSearchParams): ReferralContext | null {
  const from = searchParams.get("from")?.toLowerCase();
  if (!from) return null;
  return referralMap[from] || { source: from, greeting: `Glad you're here.` };
}
