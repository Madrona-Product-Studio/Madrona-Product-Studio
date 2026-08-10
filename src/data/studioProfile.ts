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
    headline: "Hi, I'm Charlie. I build products, and I started Madrona to build the ones that matter.",
    body: [
      "For fifteen years I've built products, at scale at REI and Healthline, and from a blank page here at Madrona. Somewhere in there I got clear about how the good ones actually get made, and what I want to spend that on.",
      "Madrona is where I do that deliberately: a small, senior studio that stays close to the craft, uses AI where it genuinely helps, and points its energy at work that matters.",
    ],
    portraitSrc: portrait,
    portraitAlt:
      "Charlie Koch, founder of Madrona Product Studio, outdoors at sunset.",
  },
  charlie: { name: "Charlie", role: "Founder/Principal" },
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
      id: "work-that-matters",
      title: "Work that matters",
      description: "Energy pointed at good for people and place.",
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
    heading: "Experience at scale, brought close to the work.",
    description:
      "Charlie spent years leading products and teams at scale. Building directly again sharpened a belief that product leadership is about creating the conditions for multidisciplinary teams to solve important customer problems.",
    companies: ["REI", "Healthline", "Microsoft"],
    years: "15+ years",
  },
  ownedProducts: {
    eyebrow: "Practice, not theory",
    heading: "We build our own products, too.",
    description:
      "Each product is designed to create value in its own right while keeping us close to customers, craft, operating decisions, and the realities of learning through working software.",
    href: "/apps",
    action: "See what we build",
    imageSrc: ownedProductsImg,
  },
  community: {
    eyebrow: "Work worth doing",
    heading: "We want to direct our energy toward meaningful problems.",
    description:
      "We are especially drawn to work that improves health and well-being, strengthens local businesses and communities, expands access, and supports a healthier relationship with the places around us.",
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
