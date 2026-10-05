import { BRAND_PATH } from "../../data/offer";
import { BrandShowcase } from "./showcase/BrandShowcase";
import { BeforeAfterArtifact } from "./ServiceArtifacts";
import { HeroShot } from "./HeroShot";
import storefrontImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import LandingPage, { type LandingConfig } from "./LandingPage";

// Brand & Website as a landing page (Charlie, 2026-10-05). Offer and prices
// in data/offer.ts (BRAND_PATH): a free review, a simple site from $2,000 in
// one to two weeks, and care only if wanted.
const CONFIG: LandingConfig = {
  slug: "brand-website",
  title: "Brand & Website · Madrona Product Studio",
  kicker: "Brand & Website",
  headline: <>A website you’re proud to send people to, <span>live in two weeks.</span></>,
  lede: "We design and build a clear, fast site that says what you do and proves it, and you can update it yourself. Nothing is monthly unless you want it.",
  worksWith: ["Shopify", "Squarespace", "Webflow", "Google Business Profile", "Square"],
  heroVisual: <HeroShot src={storefrontImage} path="berrygood · website" note="Our demonstration business" alt="The Berry Good Berry Farm website: what's ripe today, berries to order, and pickup" />,
  changes: {
    heading: "Your website, before and after.",
    colAfter: "After launch",
    rows: [
      { job: "First impressions", before: "A site that looks dated, and worse on a phone.", after: "A clean site that looks right on every screen." },
      { job: "Explaining what you do", before: "Customers call to ask what you offer.", after: "The site answers it in plain words, and asks once." },
      { job: "Keeping it current", before: "Waiting on someone to change a price.", after: "You change it yourself in minutes." },
      { job: "Being found", before: "Hard to find when people search.", after: "Built so search engines and maps can read it." },
    ],
  },
  path: {
    heading: "A fixed price, and no monthly fee unless you want one.",
    steps: BRAND_PATH,
    timing: { review: "First call", site: "Weeks 1 and 2", care: "After launch" },
  },
  showcase: {
    kicker: "Work like this",
    heading: "One brand, carried everywhere.",
    intro: "Berry Good Berry Farm, our demonstration business: the brand system, the same site on a phone, and the kind of line we help you find.",
    node: <div className="ais-commerce"><BrandShowcase /><BeforeAfterArtifact /></div>,
  },
  faq: [
    { q: "What does “from $2,000” include?", a: "A few well-built pages, designed and written with you, working on every screen, and set up so search engines can read it. If you need more pages, a store, or a new brand too, we quote it in writing before anything starts." },
    { q: "Can I update it myself?", a: "Yes. We build on a platform you can edit, show you how, and leave a short guide. Care is there if you would rather hand changes off." },
    { q: "Do I have to pay monthly?", a: "No. Your hosting or platform plan is paid directly to the provider. Our care plan is optional, and you can pay as you go instead." },
    { q: "Do you write the words?", a: "Yes, with you. Most sites need clearer words more than new design, so we start there." },
    { q: "What do I need to have ready?", a: "Your logo if you have one, a few photos, and thirty minutes to talk about what you do. We can help with photos and the rest." },
  ],
  final: { heading: "Let’s look at your site together.", line: "Thirty minutes, free. We will tell you what is working, what to fix first, and what it would cost." },
};

export default function BrandLandingPage() {
  return <LandingPage c={CONFIG} />;
}
