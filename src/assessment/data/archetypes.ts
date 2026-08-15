// Archetype copy (04-CONTENT-COPY §9) and tunable thresholds (01-ENGINE-SPEC §8).
import type { Archetype, ArchetypeId, Pathway } from "../types.ts";

// Thresholds are configuration, not constants scattered through rules.
// Tuned against the debug fixtures — see engine/resolveArchetype.ts.
export const THRESHOLDS = {
  STRONG: 0.64,
  MODERATE: 0.45,
  VERY_STRONG: 0.76,
};

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  "hidden-gem": {
    id: "hidden-gem",
    name: "The Hidden Gem",
    short: "The quality of the business is stronger than the way it currently shows up.",
    full: "You’ve already built something worth choosing. The opportunity is making that value easier to understand, trust, and act on—through clearer positioning, stronger identity, and a digital experience that reflects the quality of the business.",
    primaryPathway: "brandWeb",
  },
  "leaky-bucket": {
    id: "leaky-bucket",
    name: "The Leaky Bucket",
    short: "Interest is there, but too much value is being lost between discovery, purchase, and return.",
    full: "The business can attract attention, but the customer journey is not compounding as well as it could. The biggest opportunity may be improving the path from interest to purchase—and from first purchase to an ongoing relationship.",
    primaryPathway: "customersGrowth",
  },
  "duct-tape": {
    id: "duct-tape",
    name: "The Duct-Tape Operator",
    short: "The business works because people keep holding the pieces together.",
    full: "You’ve found ways to make the operation work, but too much still depends on manual coordination, workarounds, memory, or people moving information between systems. Better workflows, automation, and focused internal tools could create real leverage.",
    primaryPathway: "operationsAI",
  },
  bottleneck: {
    id: "bottleneck",
    name: "The Bottleneck",
    short: "Too much of the business depends on a small number of people knowing how everything works.",
    full: "The problem is less “not enough effort” and more concentration of knowledge and decision-making. Clarifying ownership, redesigning workflows, and giving the team better tools can reduce dependency without adding unnecessary process.",
    primaryPathway: "operationsAI",
  },
  "signal-rich-builder": {
    id: "signal-rich-builder",
    name: "The Signal-Rich Builder",
    short: "There is something worth building here, but it needs a sharper first shape.",
    full: "You’re seeing a real opportunity, but there are still important decisions about the problem, audience, scope, and first useful version. The best next step is making the idea tangible enough to test before overcommitting.",
    primaryPathway: "newProduct",
  },
  "ready-builder": {
    id: "ready-builder",
    name: "The Ready Builder",
    short: "The problem is understood. Now it needs to become real.",
    full: "You have enough clarity to move beyond exploration. The opportunity is building a focused first version, getting it into people’s hands, and learning from real use rather than continuing to debate the concept.",
    primaryPathway: "newProduct",
  },
  "growth-plateau": {
    id: "growth-plateau",
    name: "The Growth Plateau",
    short: "The fundamentals work, but growth is not compounding the way it could.",
    full: "People can understand and choose the business, but the customer system is not creating enough momentum. A clearer acquisition path, better conversion, or stronger lifecycle experience may unlock the next stage of growth.",
    primaryPathway: "customersGrowth",
  },
  "stretched-steward": {
    id: "stretched-steward",
    name: "The Stretched Steward",
    short: "The business is working, but too much of the experience still depends on personal attention.",
    full: "You care deeply about customers and the quality of the work. That attention is part of what makes the business good—but it can also become the constraint. The opportunity is protecting what matters while giving the operation more leverage.",
    primaryPathway: "operationsAI",
  },
};

/** Fallbacks when no explicit rule triggers (01-ENGINE-SPEC §9). */
export const FALLBACK_BY_PATHWAY: Record<Pathway, ArchetypeId> = {
  brandWeb: "hidden-gem",
  customersGrowth: "growth-plateau",
  operationsAI: "duct-tape",
  newProduct: "signal-rich-builder",
};
