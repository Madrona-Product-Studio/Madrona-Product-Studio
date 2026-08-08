// Structured content model for the Our Apps page. One shape for every product so
// new apps are added as data, not new layouts. Counts/sorting derive from here.
// Content sourced from each product's repository under ~/Developer/apps.
import lilaArtifact from "../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sjbgArtifact from "../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import lilaYogaArtifact from "../../docs/madrona-v2-build-kit/site-assets/lila-yoga-tile.webp";
import ariaArtifact from "../../docs/madrona-v2-build-kit/site-assets/aria-health-tile.webp";
import helmArtifact from "../../docs/madrona-v2-build-kit/site-assets/helm-tile.webp";
import gardenArtifact from "../../docs/madrona-v2-build-kit/site-assets/garden-hq-tile.webp";
import plainlyArtifact from "../../docs/madrona-v2-build-kit/site-assets/plainly-tile.webp";
import iconLilaTrips from "../../docs/madrona-v2-build-kit/site-assets/app-icons/lila-trips.svg";
import iconSanJuan from "../../docs/madrona-v2-build-kit/site-assets/app-icons/san-juan-boating-guide.svg";
import iconLilaYoga from "../../docs/madrona-v2-build-kit/site-assets/app-icons/lila-yoga.svg";
import iconAria from "../../docs/madrona-v2-build-kit/site-assets/app-icons/aria-health.svg";
import iconHelm from "../../docs/madrona-v2-build-kit/site-assets/app-icons/helm.svg";
import iconGardenHq from "../../docs/madrona-v2-build-kit/site-assets/app-icons/garden-hq.svg";
import iconPlainly from "../../docs/madrona-v2-build-kit/site-assets/app-icons/plainly.svg";

export type ProductStage = "live" | "beta" | "in-development" | "prototype" | "concept";

export interface StudioProduct {
  id: string;
  name: string;
  shortDescription: string;
  stage: ProductStage;
  logoSrc: string;
  artifact: {
    src?: string;
    alt: string;
    type: "screenshot" | "map" | "prototype" | "concept-artifact";
    placeholder?: boolean;
  };
  builtFor: string;
  helpsThem: string;
  rightNow: string;
  primaryAction?: { label: string; href: string; external?: boolean };
  sortOrder?: number;
}

export const STAGE_META: Record<ProductStage, { label: string; order: number; definition: string }> = {
  live: { label: "Live", order: 0, definition: "Publicly available and actively maintained." },
  beta: { label: "Beta", order: 1, definition: "Usable by a limited audience while important assumptions are tested." },
  "in-development": { label: "In development", order: 2, definition: "Actively being designed and built." },
  prototype: { label: "Prototype", order: 3, definition: "A working experience used to validate the concept." },
  concept: { label: "Concept", order: 4, definition: "An early idea still being researched and shaped." },
};

export const STAGE_ORDER: ProductStage[] = ["live", "beta", "in-development", "prototype", "concept"];

export const studioProducts: StudioProduct[] = [
  {
    id: "lila-trips",
    name: "Lila Trips",
    stage: "live",
    logoSrc: iconLilaTrips,
    shortDescription: "Thoughtful travel planning built around place, pace, and what matters to you.",
    artifact: { src: lilaArtifact, alt: "Lila Trips shown on a tablet and phones with a trip laid out by day", type: "screenshot" },
    builtFor: "Independent travelers who want a thoughtful trip without weeks of research.",
    helpsThem: "Turn an open-ended idea into a coherent itinerary they can use on the trip.",
    rightNow: "Improving how destination knowledge and traveler preferences shape each day.",
    primaryAction: { label: "Visit Lila", href: "https://lilatrips.com", external: true },
    sortOrder: 1,
  },
  {
    id: "san-juan-boating-guide",
    name: "San Juan Boating Guide",
    stage: "live",
    logoSrc: iconSanJuan,
    shortDescription: "Tide, weather, and anchorage context for boaters exploring the San Juan Islands.",
    artifact: { src: sjbgArtifact, alt: "San Juan Boating Guide shown on a tablet map and a phone with live Salish Sea conditions", type: "map" },
    builtFor: "Boat owners and crew navigating the San Juan Islands.",
    helpsThem: "Turn complex local and spatial information into confident on-water decisions.",
    rightNow: "Expanding anchorage data and refining the mobile map experience.",
    primaryAction: { label: "Open the guide", href: "https://www.sjiboating.com/", external: true },
    sortOrder: 2,
  },
  {
    id: "lila-yoga",
    name: "Lila Yoga",
    stage: "beta",
    logoSrc: iconLilaYoga,
    shortDescription: "A source-grounded introduction to yoga with translations, texts, and guided practice.",
    artifact: { src: lilaYogaArtifact, alt: "Lila Yoga shown on a tablet and phone, source-grounded yoga practice", type: "screenshot" },
    builtFor: "People new to yoga who want practice grounded in the original texts.",
    helpsThem: "Learn foundational yoga philosophy and beginner-first practice, cited to source.",
    rightNow: "Building the corpus and completing the Yoga 101 guided path.",
    primaryAction: { label: "Visit Lila Yoga", href: "https://lila.yoga", external: true },
    sortOrder: 3,
  },
  {
    id: "aria-health",
    name: "Aria Health",
    stage: "beta",
    logoSrc: iconAria,
    shortDescription: "An AI health companion that guides people through menopause with stage-aware support.",
    artifact: { src: ariaArtifact, alt: "Aria Health shown on a tablet and phone, stage-aware menopause guidance", type: "screenshot" },
    builtFor: "People newly navigating menopause who want clear, empathetic guidance.",
    helpsThem: "Understand the transition and what to do next, grounded in evidence.",
    rightNow: "Refining stage-aware guidance and how content adapts to each person.",
    primaryAction: { label: "Visit Aria", href: "https://aria-health-mp.vercel.app", external: true },
    sortOrder: 4,
  },
  {
    id: "helm",
    name: "Helm",
    stage: "beta",
    logoSrc: iconHelm,
    shortDescription: "A personal command center for life and work, built on versioned markdown.",
    artifact: { src: helmArtifact, alt: "Helm shown on a tablet and phone, a personal command center in markdown", type: "screenshot" },
    builtFor: "Makers who work alongside AI agents and live in text.",
    helpsThem: "Keep work, projects, and priorities in one place people and agents can both read.",
    rightNow: "Building agent-native features and a clearer daily operating view.",
    primaryAction: { label: "See the demo", href: "https://helm-os1.vercel.app/editor?demo=1", external: true },
    sortOrder: 1,
  },
  {
    id: "garden-hq",
    name: "Garden HQ",
    stage: "in-development",
    logoSrc: iconGardenHq,
    shortDescription: "A spatially true map for planning and managing a home food garden.",
    artifact: { src: gardenArtifact, alt: "Garden HQ shown on a tablet and phone, a spatially true garden map", type: "screenshot" },
    builtFor: "Home gardeners and small hobby farmers.",
    helpsThem: "See the whole garden and make observation-driven improvements year over year.",
    rightNow: "Building the map foundation — zones, beds, and semantic zoom.",
    primaryAction: { label: "See the demo", href: "https://www.gardenhq.app/", external: true },
    sortOrder: 2,
  },
  {
    id: "plainly",
    name: "Plainly",
    stage: "in-development",
    logoSrc: iconPlainly,
    shortDescription: "A voice-first intake tool that turns a conversation into a therapy-ready profile.",
    artifact: { src: plainlyArtifact, alt: "Plainly shown on a laptop and phone, a voice-first therapy intake tool", type: "prototype" },
    builtFor: "People considering therapy who want to arrive prepared.",
    helpsThem: "Turn a short spoken conversation into a profile a therapist can read in a minute.",
    rightNow: "Refining the voice conversation and how it generates a shareable profile.",
    primaryAction: { label: "Visit Plainly", href: "https://www.plainlytherapy.com/", external: true },
    sortOrder: 3,
  },
];

export function stageCounts(products: StudioProduct[]): Record<ProductStage | "all", number> {
  const counts = { all: products.length } as Record<ProductStage | "all", number>;
  for (const s of STAGE_ORDER) counts[s] = products.filter((p) => p.stage === s).length;
  return counts;
}

export function sortProducts(products: StudioProduct[]): StudioProduct[] {
  return [...products].sort((a, b) => {
    const stageDiff = STAGE_META[a.stage].order - STAGE_META[b.stage].order;
    if (stageDiff !== 0) return stageDiff;
    return (a.sortOrder ?? 99) - (b.sortOrder ?? 99);
  });
}
