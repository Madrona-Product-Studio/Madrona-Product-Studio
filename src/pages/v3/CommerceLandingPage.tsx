import { COMMERCE_PATH } from "../../data/offer";
import { LoyaltyArtifact, StorefrontArtifact } from "./ServiceArtifacts";
import { HeroShot } from "./HeroShot";
import journeyImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1280&format=webp&as=img";
import LandingPage, { type LandingConfig } from "./LandingPage";

// Ecommerce & Loyalty as a landing page (Charlie, 2026-10-05). Offer and
// prices in data/offer.ts (COMMERCE_PATH): a free review, a Shopify store
// from $2,500 in about two weeks (loyalty from $750), growth only if wanted.
// Charlie: keep the store price near what a DIY Shopify setup costs.

const CONFIG: LandingConfig = {
  slug: "ecommerce-loyalty",
  title: "Ecommerce & Loyalty · Madrona Product Studio",
  kicker: "Ecommerce & Loyalty",
  headline: <>Sell online, and turn first orders <span>into regulars.</span></>,
  lede: "We set up your Shopify store in about two weeks, then add the rewards and reminders that bring people back. You run it; we make it easy to.",
  worksWith: ["Shopify", "PayPal", "Stripe", "QuickBooks", "Google Shopping", "Gmail"],
  heroVisual: <HeroShot src={journeyImage} path="berrygood · from order to pickup" note="Our demonstration business" position="50% 50%" alt="The Berry Good purchase path on four phones: see what is ripe, order and pick a pickup time, get a confirmation, and check in at pickup" />,
  changes: {
    heading: "How you sell, before and after.",
    colAfter: "After setup",
    rows: [
      { job: "Taking orders", before: "Orders by phone, text, and DM.", after: "One store that takes orders and payment, day or night." },
      { job: "Pickup and shipping", before: "Tracking orders on paper.", after: "Every order in one list, with reminders sent for you." },
      { job: "Coming back", before: "Customers buy once and drift.", after: "Rewards and reorder reminders bring them back." },
      { job: "Reviews", before: "Never getting around to asking.", after: "Happy customers asked at the right moment." },
    ],
  },
  path: {
    heading: "Close to doing it yourself, without the weekends.",
    steps: COMMERCE_PATH,
    timing: { review: "First call", store: "Weeks 1 and 2", growth: "After launch" },
  },
  showcase: {
    kicker: "A store, start to finish",
    heading: "From the storefront to the second order.",
    intro: "Berry Good Berry Farm, our demonstration business: what makes the store page sell, and the rewards that bring regulars back.",
    node: <div className="ais-commerce ais-commerce-even"><StorefrontArtifact /><LoyaltyArtifact /></div>,
  },
  faq: [
    { q: "Why Shopify?", a: "It is reliable, easy to run yourself, and has the payments, shipping, and apps a small store needs. If you are on another platform that works for you, we can work with that instead." },
    { q: "What does “from $2,500” include?", a: "A store on a proven theme, your products loaded (you supply photos and descriptions, or we help), payments, shipping or pickup, and tax set up, and an hour teaching you to run it. A large catalog or moving an existing store is quoted in writing." },
    { q: "What will I pay Shopify?", a: "Your Shopify plan is billed by Shopify directly, starting around $39 a month, plus card fees. We will point you to the plan that fits." },
    { q: "What do rewards cost to run?", a: "Setup is from $750. The rewards app is billed by its maker, and many have a free tier for smaller stores." },
    { q: "Do I need the monthly growth plan?", a: "No. It is there if you want the follow-up and reviews tuned for you. Most stores start without it." },
  ],
  final: { heading: "Let’s get your store selling.", line: "Thirty minutes, free. We will look at how you sell today and what a store would take." },
};

export default function CommerceLandingPage() {
  return <LandingPage c={CONFIG} />;
}
