// Canonical pathway formulas (01-ENGINE-SPEC.md §3) and user-facing copy
// (04-CONTENT-COPY.md §11). Formulas live only here.
import type { Pathway, Signal } from "../types.ts";

/** Signal → coefficient per pathway. Keep in sync with the spec formulas. */
export const PATHWAY_FORMULAS: Record<Pathway, Partial<Record<Signal, number>>> = {
  brandWeb: { trust: 1.0, acquisition: 0.3, clarity: 0.35 },
  customersGrowth: { acquisition: 0.75, retention: 1.0, trust: 0.2 },
  operationsAI: { operations: 1.0, systems: 0.9, capacity: 0.7 },
  newProduct: { product: 1.0, clarity: 0.55, systems: 0.1 },
};

export const PATHWAY_COPY: Record<
  Pathway,
  { name: string; short: string; capabilities: string[] }
> = {
  brandWeb: {
    name: "Brand & Web",
    short: "Make the value of the business easier to understand, trust, and choose.",
    capabilities: [
      "Positioning and strategy",
      "Messaging and voice",
      "Visual identity",
      "Websites and stores",
    ],
  },
  customersGrowth: {
    name: "Customers & Growth",
    short: "Make it easier for the right customers to discover, buy, return, and stay connected.",
    capabilities: [
      "Customer research",
      "Journey and experience design",
      "Commerce and loyalty",
      "Retention and lifecycle communication",
    ],
  },
  operationsAI: {
    name: "Operations & AI",
    short: "Reduce repetitive work and give the team better systems for running the business.",
    capabilities: [
      "Workflow and process design",
      "Automation",
      "AI assistants and agents",
      "Internal tools and dashboards",
    ],
  },
  newProduct: {
    name: "New Product",
    short: "Turn a meaningful opportunity into something useful that real people can use.",
    capabilities: [
      "Product strategy and definition",
      "Experience design",
      "Rapid prototyping",
      "Working software",
    ],
  },
};

export const SIGNAL_LABELS: Record<Signal, string> = {
  trust: "Trust & clarity",
  acquisition: "Customer acquisition",
  retention: "Customer retention",
  operations: "Operational friction",
  capacity: "Team capacity",
  systems: "System fragmentation",
  product: "Product opportunity",
  clarity: "Decision clarity",
};
