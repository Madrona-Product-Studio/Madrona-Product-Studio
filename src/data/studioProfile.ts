// Single shared source for studio-profile content used by the About page (and any
// other surface that needs the same proof-point / experience language). Keep one
// version of this copy so the site never drifts into conflicting claims.

import portrait from "../../docs/madrona-v2-build-kit/site-assets/about-charlie.webp";
import ownedProductsImg from "../../docs/madrona-v2-build-kit/site-assets/lila-devices.webp";
import communityFood from "../../docs/madrona-v2-build-kit/placeholders/photography/audience-farms-food.webp";
import communityLand from "../../docs/madrona-v2-build-kit/placeholders/photography/audience-outdoor-travel.webp";
import nameStoryImg from "../../docs/madrona-v2-build-kit/site-assets/about-madrona-tree.webp";

export interface StudioProfile {
  intro: {
    heading: string;
    headline: string;
    body: string[];
    portraitSrc: string;
    portraitAlt: string;
  };
  charlie: { name: string; role: string };
  proofPoints: { id: string; title: string; description: string; icon: string }[];
  specialists: { id: string; title: string; tags: string; icon: string; x: number; y: number }[];
  experience: {
    heading: string;
    description: string;
    companies: string[];
    years: string;
  };
  ownedProducts: {
    eyebrow: string;
    heading: string;
    description: string;
    href: string;
    action: string;
    imageSrc: string;
  };
  community: {
    eyebrow: string;
    heading: string;
    description: string;
    images: string[];
    href?: string;
  };
  nameStory: {
    eyebrow: string;
    heading: string;
    description: string;
    imageSrc: string;
  };
}

export const studioProfile: StudioProfile = {
  intro: {
    heading: "About",
    headline: "We’re a small product studio with big depth.",
    body: [
      "Charlie leads each engagement and brings in the right senior specialists, so you get the expertise you need, exactly when you need it.",
      "Madrona stays small by design: fewer layers, faster decisions, and direct accountability from strategy through execution.",
    ],
    portraitSrc: portrait,
    portraitAlt:
      "Charlie Koch, founder of Madrona Product Studio, outdoors at sunset.",
  },
  charlie: { name: "Charlie", role: "Engagement Lead" },
  proofPoints: [
    {
      id: "senior-team",
      title: "Senior team when needed",
      description: "Bring in the right specialists for the work.",
      icon: "senior",
    },
    {
      id: "founder-led",
      title: "Founder-led",
      description: "Direct partnership from first conversation to delivery.",
      icon: "founder",
    },
    {
      id: "small-by-design",
      title: "Small by design",
      description: "Fewer layers. Faster decisions. Clear ownership.",
      icon: "sprig",
    },
  ],
  // Positions are percentages within the square network diagram (portrait at 50,50).
  specialists: [
    { id: "designers", title: "Designers", tags: "Product, UX/UI, Visual", icon: "design", x: 15, y: 20 },
    { id: "researchers", title: "Researchers", tags: "User, Market, Strategy", icon: "research", x: 15, y: 50 },
    { id: "data", title: "Data / Analytics", tags: "Insights, Metrics", icon: "analytics", x: 15, y: 80 },
    { id: "engineers", title: "Engineers", tags: "Web, Mobile, Integrations", icon: "engineer", x: 85, y: 20 },
    { id: "marketers", title: "Marketers", tags: "Go-to-market, Growth", icon: "marketing", x: 85, y: 50 },
    { id: "content", title: "Content / Brand", tags: "Messaging, Copy, Brand voice", icon: "content", x: 85, y: 80 },
  ],
  experience: {
    heading: "Experience that moves things forward.",
    description:
      "The value is not the logos. It is knowing where to focus, what to test, when to simplify, and how to turn an unclear problem into a useful product.",
    companies: ["REI", "Healthline", "Microsoft"],
    years: "15+ years",
  },
  ownedProducts: {
    eyebrow: "Building in the open",
    heading: "We build our own things, too.",
    description:
      "Travel products, wellness tools, trail-safety apps, and community guides. Some are businesses and some simply deserve to exist. Doing the work ourselves keeps our advice honest.",
    href: "/apps",
    action: "See what we build",
    imageSrc: ownedProductsImg,
  },
  community: {
    eyebrow: "Participating here",
    heading: "We support the community and the land we call home.",
    description:
      "Madrona supports local organizations working on food access and land conservation because a healthy business community depends on healthy people and places.",
    images: [communityFood, communityLand],
  },
  nameStory: {
    eyebrow: "The name",
    heading: "Named for the tree at the water’s edge.",
    description:
      "The madrona grows on the bluff, bark peeling, leaning out over the sea. Resilient, unmistakably local, and comfortable at the edge of two worlds. The name reflects the kind of studio we want to build: grounded, adaptable, and connected to place.",
    imageSrc: nameStoryImg,
  },
};
