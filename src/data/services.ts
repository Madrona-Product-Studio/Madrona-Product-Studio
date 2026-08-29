// Single source of truth for the four Madrona expression doors (the practice
// frame, adopted 2026-08-01 — canon: charlie-hq briefs/2026-08-01-offering-
// evolution-integration.md). The services overview and detail pages
// render from this. Canonical labels live here — do not restate in components.
// Order is meaningful (Charlie, 2026-08-29): AI & Operations leads
// (agentic-forward), then Brand & Website, Growth & Retention, New Products.
import brandArtifact from "../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp";
import customersArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp";
import operationsArtifact from "../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";
import newProductsArtifact from "../../docs/madrona-v2-build-kit/product-proof/lila/new-products-idea-to-real.webp";

export type ServiceId = "brand-and-web" | "customers-and-growth" | "operations-and-ai" | "new-products";

export interface ServiceArea {
  id: ServiceId;
  door: string; // the plain-language door phrase (section title on surfaces)
  name: string; // the descriptive label (eyebrow + side nav)
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
  // Optional pointer to a POV article that makes the case for this area.
  pov?: { label: string; to: string };
  // Optional interactive entry point (e.g. the AI checkup).
  tryIt?: { label: string; to: string };
  // Optional pointer to live tool demos (the /tools gallery).
  demos?: { label: string; to: string };
  // Optional pointer to the open-source tools behind this area (/open).
  open?: { label: string; to: string };
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "operations-and-ai",
    door: "Work smarter",
    name: "AI & Operations",
    outcome: "Put AI to work on your real workflows, and get hours back every week.",
    summary:
      "We map how work actually happens, identify the highest-friction handoffs, and build practical tools, automations, and AI agents around the real workflow. We run our own studio this way.",
    homepageItems: ["Workflow and process design", "Automation", "AI assistants and agents", "Internal tools and dashboards"],
    capabilityGroups: [
      { title: "Improve the workflow", items: ["Workflow and process design", "Internal tools", "Systems and integrations", "Dashboards and reporting"] },
      { title: "Add practical AI", items: ["Automation", "AI assistants and agents", "Research and knowledge workflows", "Human-review systems"] },
    ],
    problems: [
      "Everyone says AI would help, but nobody has shown you where to start.",
      "Orders arrive in multiple formats and must be re-entered manually.",
      "Important information lives across inboxes, documents, and spreadsheets.",
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
    startingPoint:
      "An agentic ops setup sprint: we set up agent tooling on the systems you already use, teach it how your business actually works, and teach you to run it. From there, we expand what earns its place.",
    pathSteps: ["Request", "decision", "action"],
    artifact: { src: operationsArtifact, alt: "Berry Good operations dashboard with an order-intake agent and structured orders", caption: "Berry Good operations dashboard" },
    demos: { label: "See the tools we deploy, running live", to: "/tools" },
    pov: { label: "Thinking: The era of agentic operations", to: "/thinking/the-era-of-agentic-operations" },
    tryIt: { label: "Not sure where AI fits? Take the free signal check", to: "/checkup" },
    open: { label: "The tools behind this are open source", to: "/open" },
  },
  {
    id: "brand-and-web",
    door: "Build trust",
    name: "Brand & Website",
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
      { title: "Earn confidence", description: "Show up clearly and consistently across every customer touchpoint." },
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
    door: "Grow your business",
    name: "Growth & Retention",
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
    id: "new-products",
    door: "Build something worth using",
    name: "New Products",
    outcome: "Take a new product from idea to something real people use.",
    summary:
      "We help you decide what deserves to exist, prove it cheaply, and build the first real version. Strategy, design, and engineering from one senior team.",
    homepageItems: ["Product strategy and validation", "Prototypes and MVPs", "AI-enabled features", "Launch and iteration"],
    capabilityGroups: [
      { title: "Figure out what to build", items: ["Product and market strategy", "Concept development", "Prototyping and validation", "Positioning"] },
      { title: "Build and launch it", items: ["MVP design and development", "AI-enabled features", "Launch and early growth", "Iteration from real usage"] },
    ],
    problems: [
      "The idea is promising but unproven.",
      "A prototype would answer more than another meeting.",
      "The team knows roughly what to build but lacks the hands to make it real.",
      "An AI feature makes sense but nobody owns making it real.",
      "The first version needs senior judgment, not a big agency.",
    ],
    outputs: ["Validation read", "Working prototype", "MVP in market", "AI-enabled feature", "Launch plan", "Iteration roadmap"],
    valuePoints: [
      { title: "Prove it cheaply", description: "Test the idea with real people before committing a real budget." },
      { title: "Ship the real thing", description: "One senior team takes the first version all the way to users." },
      { title: "Learn fast", description: "Working software tells you more than any document." },
    ],
    bestFor: "Founders and teams with an important idea that needs to become real.",
    startingPoint: "A validation sprint that tests demand before a real budget is committed. From there, we build the smallest version worth shipping.",
    pathSteps: ["Idea", "prototype", "in use"],
    artifact: { src: newProductsArtifact, alt: "Lila Trips on a laptop and phone beside an early route sketch, from idea to product in use", caption: "Lila Trips, built and operated by Madrona" },
  },
];
