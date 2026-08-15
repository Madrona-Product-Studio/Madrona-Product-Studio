// Readiness × primary pathway → recommended starting engagement
// (01-ENGINE-SPEC §11, copy from 04-CONTENT-COPY §12).
import type { Pathway, Readiness, Recommendation } from "../types.ts";

const ENGAGEMENTS: Record<string, { title: string; description: string }> = {
  "positioning-direction": {
    title: "Positioning & digital direction sprint",
    description: "Clarify what needs to change, align the story and experience, and leave with a concrete direction to build from.",
  },
  "brand-web-concept": {
    title: "Brand / website concept sprint",
    description: "Make the next version tangible before committing to a full build.",
  },
  "brand-web-build": {
    title: "Focused brand or web build",
    description: "Build the site or identity work that clearly needs to happen, and put it live.",
  },
  "journey-sprint": {
    title: "Customer journey opportunity sprint",
    description: "Map where customers are getting stuck and identify the few changes most likely to improve the experience.",
  },
  "growth-diagnostic": {
    title: "Growth / retention diagnostic",
    description: "Understand where momentum is being lost across discovery, conversion, and return.",
  },
  "cx-prototype": {
    title: "Customer experience prototype",
    description: "Test a better customer journey before investing in the full system.",
  },
  "journey-build": {
    title: "Focused customer journey or lifecycle build",
    description: "Build the specific piece of the customer journey that is leaking the most value.",
  },
  "workflow-sprint": {
    title: "Workflow opportunity sprint",
    description: "Map where time and coordination are going, identify the highest-leverage intervention, and define the smallest useful improvement.",
  },
  "automation-prototype": {
    title: "Automation / internal-tool prototype",
    description: "Turn a manual workflow into a working prototype and learn whether software can meaningfully reduce the load.",
  },
  "workflow-redesign": {
    title: "Focused workflow redesign",
    description: "Fix a specific process that is creating unnecessary work or dropped handoffs.",
  },
  "operations-build": {
    title: "Operations automation / internal-tool build",
    description: "Build and deploy the tool or automation needed to make the operation run better.",
  },
  "product-opportunity": {
    title: "Product opportunity sprint",
    description: "Clarify the problem, audience, value, and best first version.",
  },
  "product-prototype": {
    title: "Product definition + prototype sprint",
    description: "Turn the idea into something tangible enough to test with real people.",
  },
  "product-improvement": {
    title: "Focused product improvement sprint",
    description: "Sharpen the part of the product that clearly is not carrying its weight.",
  },
  "product-build": {
    title: "Focused product build",
    description: "Build a useful first version and get it into the hands of users.",
  },
};

const MAP: Record<Pathway, Record<Readiness, string>> = {
  brandWeb: {
    "find-focus": "positioning-direction",
    "outside-perspective": "positioning-direction",
    prototype: "brand-web-concept",
    "fix-specific": "brand-web-build",
    build: "brand-web-build",
  },
  customersGrowth: {
    "find-focus": "journey-sprint",
    "outside-perspective": "growth-diagnostic",
    prototype: "cx-prototype",
    "fix-specific": "journey-build",
    build: "journey-build",
  },
  operationsAI: {
    "find-focus": "workflow-sprint",
    "outside-perspective": "workflow-sprint",
    prototype: "automation-prototype",
    "fix-specific": "workflow-redesign",
    build: "operations-build",
  },
  newProduct: {
    "find-focus": "product-opportunity",
    "outside-perspective": "product-opportunity",
    prototype: "product-prototype",
    "fix-specific": "product-improvement",
    build: "product-build",
  },
};

export function resolveRecommendation(
  pathway: Pathway,
  readiness: Readiness | null,
): Recommendation {
  const key = MAP[pathway][readiness ?? "find-focus"];
  return { ...ENGAGEMENTS[key], pathway };
}
