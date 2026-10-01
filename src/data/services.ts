// The four service areas: the data the area pages need beyond the visitor
// copy in areas.ts (the summary lede, the hero image, the assessment link).
// Pruned 2026-09-30 when the area pages were leaned out: the value points,
// capability groups, problems, and outputs retired with the old template
// (they are in git history). Canonical labels live here and in areas.ts.
// Order is meaningful (Charlie, 2026-08-29): AI & Operations leads
// (agentic-forward), then Brand & Website, Ecommerce & Loyalty, New Products.
import type { ResponsiveImage } from "../lib/responsiveImage";
import brandArtifact from "../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp?w=640;960;1280&format=webp&as=img";
import customersArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1280&format=webp&as=img";
import operationsArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp?w=640;960;1280&format=webp&as=img";
import newProductsArtifact from "../../docs/madrona-v2-build-kit/product-proof/lila/new-products-idea-to-real.webp?w=640;960;1280&format=webp&as=img";

export type ServiceId = "brand-and-web" | "ecommerce-and-loyalty" | "operations-and-ai" | "new-products";

export interface ServiceArea {
  id: ServiceId;
  name: string; // the descriptive label (eyebrow + side nav)
  summary: string;
  artifact: { src: ResponsiveImage; alt: string; caption: string };
  // Optional interactive entry point (the AI opportunity assessment).
  tryIt?: { label: string; to: string };
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "operations-and-ai",
    name: "AI & Operations",
    summary:
      "We map how work actually happens, identify the highest-friction handoffs, and build practical tools, automations, and AI agents around the real workflow. We run our own studio this way.",
    artifact: { src: operationsArtifact, alt: "Berry Good operations dashboard with an order-intake agent and structured orders", caption: "Berry Good operations dashboard" },
    tryIt: { label: "Not sure where AI fits? Find your AI opportunities", to: "/ai-opportunities" },
  },
  {
    id: "brand-and-web",
    name: "Brand & Website",
    summary:
      "We clarify what makes the business valuable, turn that into a coherent identity and message, and build the website that carries it.",
    artifact: { src: brandArtifact, alt: "Berry Good brand system shown across a palette, packaging, and a website", caption: "Berry Good brand system" },
  },
  {
    id: "ecommerce-and-loyalty",
    name: "Ecommerce & Loyalty",
    summary:
      "We build online stores that make buying easy, then the memberships, rewards, and follow-up that bring people back. It is where we have the most miles: e-commerce platforms for national brands, and REI's membership relaunch.",
    artifact: { src: customersArtifact, alt: "Berry Good customer order journey from browse to checkout", caption: "Berry Good customer order journey" },
  },
  {
    id: "new-products",
    name: "New Products",
    summary:
      "We help you decide what deserves to exist, prove it cheaply, and build the first real version. Strategy, design, and engineering from one senior team.",
    artifact: { src: newProductsArtifact, alt: "Lila Trips on a laptop and phone beside an early route sketch, from idea to product in use", caption: "Lila Trips, built and operated by Madrona" },
  },
];
