import { PRODUCT_PATH } from "../../data/offer";
import { ProductsShowcase } from "./showcase/ProductsShowcase";
import { BuildJourneyArtifact } from "./ServiceArtifacts";
import LandingPage, { type LandingConfig } from "./LandingPage";

// New Products as a landing page (Charlie, 2026-10-05). Offer in
// data/offer.ts (PRODUCT_PATH): a validation sprint from $3,000, then the
// first release and an ongoing partnership, quoted once the idea has proof.
const CONFIG: LandingConfig = {
  slug: "new-products",
  title: "New Products · Madrona Product Studio",
  kicker: "New Products",
  headline: <>Turn a good idea into a real product, <span>without betting the business on it.</span></>,
  lede: "We test the idea with real people first, then build the smallest version worth shipping. One senior team, from the first sketch to launch.",
  heroVisual: <div className="ais-hero-art"><BuildJourneyArtifact /></div>,
  changes: {
    heading: "Building something new, before and after.",
    colToday: "The usual way",
    colAfter: "With us",
    rows: [
      { job: "Testing the idea", before: "Months of planning before anyone uses it.", after: "Real people using a prototype in weeks." },
      { job: "Deciding what to build", before: "Debates over a long feature list.", after: "What people actually use decides it." },
      { job: "Building it", before: "A big agency quote, or nobody to build it.", after: "One senior team, design through engineering." },
      { job: "After launch", before: "Launched and left.", after: "Watched, measured, and improved." },
    ],
  },
  path: {
    heading: "Prove it before you pay to build it.",
    steps: PRODUCT_PATH,
    timing: { validate: "Weeks 1 to 4", build: "Months 2 and 3", partner: "After launch" },
  },
  showcase: {
    kicker: "We build our own",
    heading: "Products we built, and still run.",
    intro: "We take our own ideas from sketch to launch, so we know what launching takes. Both are live or in beta today.",
    node: <ProductsShowcase without={["san-juan-boating-guide"]} />,
  },
  faq: [
    { q: "What is a validation sprint?", a: "A few weeks to make the idea concrete and put it in front of the people it is for: a clickable prototype, real sessions, and a written go, change, or stop. It is the cheapest way to find out before you spend more." },
    { q: "What does the build cost?", a: "It depends on what validation shows the first version needs, so we quote it in writing after the sprint, before anything starts." },
    { q: "Do I own what you build?", a: "Yes. The code, designs, and accounts are yours." },
    { q: "Can you add AI to it?", a: "Where it genuinely helps the people using it, yes. We build with AI every day, and we will tell you when it is not the right tool." },
    { q: "Will you keep my idea confidential?", a: "Yes. What you share stays between us, and we are glad to sign an NDA." },
  ],
  final: { heading: "Tell us the idea.", line: "Thirty minutes, free. We will tell you how we would test it, and what that would cost." },
};

export default function ProductLandingPage() {
  return <LandingPage c={CONFIG} />;
}
