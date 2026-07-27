// Single source of truth for the three Madrona service areas. Both the homepage
// "What we do" module and the Services page render from this. Canonical labels
// live here — do not restate service content in components.
import brandArtifact from "../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp";
import customersArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp";
import operationsArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";

export type ServiceId = "brand-and-web" | "customers-and-growth" | "operations-and-ai";

export interface ServiceArea {
  id: ServiceId;
  name: string;
  outcome: string;
  summary: string;
  homepageItems: string[];
  capabilityGroups: { title: string; items: string[] }[];
  problems: string[];
  outputs: string[];
  valuePoints: { title: string; description: string }[];
  bestFor: string;
  startingPoint: string;
  pathSteps: string[];
  artifact: { src: string; alt: string; caption: string };
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "brand-and-web",
    name: "Brand and web",
    outcome: "Give people a clear reason to understand, trust, and choose you.",
    summary:
      "We clarify what makes the business valuable, turn that into a coherent identity and message, and build digital experiences that help people take action.",
    homepageItems: ["Positioning and strategy", "Messaging and voice", "Visual identity", "Websites and stores"],
    capabilityGroups: [
      { title: "Strategy and identity", items: ["Positioning and strategy", "Messaging and voice", "Visual identity", "Brand systems"] },
      { title: "Digital experience", items: ["Websites", "Online stores", "Content systems", "UX and conversion improvement"] },
    ],
    problems: [
      "The website undersells the business.",
      "Customers need a personal explanation before they understand the offer.",
      "The brand feels inconsistent or dated.",
      "The site is difficult to update or use.",
      "The online store creates unnecessary friction.",
    ],
    outputs: ["Positioning brief", "Messaging system", "Brand guide", "Website", "Commerce experience", "Content system"],
    valuePoints: [
      { title: "Build trust", description: "Show up clearly and consistently across every customer touchpoint." },
      { title: "Drive action", description: "Make it easier for people to understand, decide, and take the next step." },
      { title: "Scale with confidence", description: "Build a system that can grow with the business." },
    ],
    bestFor: "Businesses whose quality has outgrown how they currently present themselves.",
    startingPoint: "A focused positioning and digital-direction sprint. From there, we design and build what creates the biggest impact.",
    pathSteps: ["Understand", "trust", "choose"],
    artifact: { src: brandArtifact, alt: "Berry Good brand system shown across a palette, packaging, and a storefront", caption: "Berry Good brand system" },
  },
  {
    id: "customers-and-growth",
    name: "Customers and growth",
    outcome: "Make it easier for customers to buy, return, and stay connected.",
    summary:
      "We improve the full customer relationship, from first interest through purchase, follow-up, loyalty, and repeat engagement.",
    homepageItems: ["Customer research", "Journey and experience design", "Commerce and loyalty", "Retention and lifecycle communication"],
    capabilityGroups: [
      { title: "Understand and improve the journey", items: ["Customer research", "Customer journey design", "Commerce and purchasing flows", "UX and conversion improvement"] },
      { title: "Build the relationship", items: ["Memberships and loyalty", "Retention and lifecycle communication", "Reviews and referrals", "Growth experiments and analytics"] },
    ],
    problems: [
      "Customers disappear after the first purchase.",
      "Ordering requires too many manual steps.",
      "The business has customer data but does little with it.",
      "Membership or loyalty feels generic.",
      "Follow-up depends on the owner remembering.",
      "Customers abandon the journey before completing a purchase.",
    ],
    outputs: ["Customer journey map", "Improved buying flow", "Membership or loyalty concept", "Lifecycle communication system", "Reorder experience", "Review or referral program", "Growth dashboard"],
    valuePoints: [
      { title: "Remove friction", description: "Make it easier for customers to move from interest to action." },
      { title: "Build the relationship", description: "Create useful reasons for customers to return and stay connected." },
      { title: "Learn what works", description: "Use customer behavior and feedback to improve the experience." },
    ],
    bestFor: "Businesses that attract customers but lose momentum during purchase, follow-up, or repeat engagement.",
    startingPoint: "A focused customer-journey review and opportunity sprint. From there, we improve the moments that matter most.",
    pathSteps: ["Discover", "purchase", "return"],
    artifact: { src: customersArtifact, alt: "Berry Good customer order journey from browse to checkout", caption: "Berry Good customer order journey" },
  },
  {
    id: "operations-and-ai",
    name: "Operations and AI",
    outcome: "Reduce repetitive work and give your team better tools to run the business.",
    summary:
      "We map how work actually happens, identify the highest-friction handoffs, and build practical tools, automations, and AI assistants around the real workflow.",
    homepageItems: ["Workflow and process design", "Automation", "AI assistants and agents", "Internal tools and dashboards"],
    capabilityGroups: [
      { title: "Improve the workflow", items: ["Workflow and process design", "Internal tools", "Systems and integrations", "Dashboards and reporting"] },
      { title: "Add practical AI", items: ["Automation", "AI assistants and agents", "Research and knowledge workflows", "Human-review systems"] },
    ],
    problems: [
      "Orders arrive in multiple formats and must be re-entered manually.",
      "Important information lives across inboxes, documents, and spreadsheets.",
      "Teams spend time preparing reports instead of acting on them.",
      "AI experiments exist but are disconnected from real work.",
      "Owners cannot easily see what needs attention.",
      "Repetitive decisions consume senior time.",
    ],
    outputs: ["Order-intake agent", "Research assistant", "Internal operations dashboard", "Automated reporting workflow", "Customer-support drafting assistant", "Connected knowledge system", "Approval and review workflow"],
    valuePoints: [
      { title: "Reduce manual work", description: "Remove repetitive copying, checking, and coordination." },
      { title: "Improve decisions", description: "Bring the right information together when someone needs to act." },
      { title: "Keep people in control", description: "Use human review wherever judgment, trust, or accountability matters." },
    ],
    bestFor: "Teams spending too much time copying information, coordinating across tools, or repeating the same decisions.",
    startingPoint: "A workflow audit followed by a focused automation or internal-tool prototype. From there, we expand what earns its place.",
    pathSteps: ["Request", "decision", "action"],
    artifact: { src: operationsArtifact, alt: "Berry Good operations dashboard with an order-intake agent and structured orders", caption: "Berry Good operations dashboard" },
  },
];
