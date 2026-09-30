// Single shared source for studio-profile content used by the About page (and any
// other surface that needs the same proof-point / experience language). Keep one
// version of this copy so the site never drifts into conflicting claims.

import type { ResponsiveImage } from "../lib/responsiveImage";
// Studio headshot (Charlie, 2026-09-30), shared with /charlie.
import portrait from "../../docs/madrona-v2-build-kit/site-assets/about-charlie-headshot.webp?w=360;520;780&format=webp&as=img";
import nameStoryImg from "../../docs/madrona-v2-build-kit/site-assets/about-madrona-tree.webp?w=640;960;1280&format=webp&as=img";

export interface StudioProfile {
  intro: {
    heading: string;
    headline: string;
    body: string[];
    portraitSrc: ResponsiveImage;
    portraitAlt: string;
  };
  charlie: { name: string; role: string };
  proofPoints: { id: string; title: string; description: string; icon: string }[];
  specialists: { id: string; title: string; tags: string; icon: string; x: number; y: number }[];
  nameStory: {
    eyebrow: string;
    heading: string;
    description: string;
    imageSrc: ResponsiveImage;
  };
}

export const studioProfile: StudioProfile = {
  intro: {
    heading: "About",
    // Streamlined 2026-09-30 (Charlie): what we do, in the homepage's voice,
    // and how the team works. The credentials live in Why us, below it.
    headline: "A small, senior studio in the Pacific Northwest.",
    body: [
      "We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up.",
      "Every engagement is led by Charlie Koch, with trusted senior designers, engineers, and researchers brought in as the work needs them.",
    ],
    portraitSrc: portrait,
    portraitAlt:
      "Charlie Koch, founder of Madrona Product Studio, in a navy blazer against a wood wall.",
  },
  charlie: { name: "Charlie", role: "Founder & Head of Product" },
  proofPoints: [
    {
      id: "senior-team",
      title: "Senior team from the start",
      description: "Senior from the first conversation, with the right specialists brought in as the work needs them.",
      icon: "senior",
    },
    {
      id: "founder-led",
      title: "Founder-led",
      description: "Direct partnership from first conversation to delivery.",
      icon: "founder",
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
  nameStory: {
    eyebrow: "The name",
    heading: "Named for the tree at the water’s edge.",
    description:
      "The madrona grows on the bluff, bark peeling, leaning out over the sea. Resilient, unmistakably local, and comfortable at the edge of two worlds. The name reflects the kind of studio we want to build: grounded, adaptable, and connected to place.",
    imageSrc: nameStoryImg,
  },
};
