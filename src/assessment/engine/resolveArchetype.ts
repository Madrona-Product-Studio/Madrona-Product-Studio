// Explicit archetype rules, evaluated specific → broad (01-ENGINE-SPEC §8).
// Rules read absoluteStrength against the full question set.
//
// One documented tuning vs. the spec: Growth Plateau's `trust >= MODERATE`
// clause is unreachable in practice — trust and acquisition compete for the
// same answer slots, so a strongly acquisition-led run tops out near
// trust 0.39. The clause therefore accepts EITHER moderate trust OR
// acquisition standing clearly on top, which preserves the intent
// ("fundamentals work, growth is not compounding").
import { ARCHETYPES, FALLBACK_BY_PATHWAY, THRESHOLDS } from "../data/archetypes.ts";
import type { Archetype, Pathway, Readiness, Signal } from "../types.ts";

export type ArchetypeInputs = {
  strengths: Record<Signal, number>;
  readiness: Readiness | null;
  primaryPathway: Pathway;
};

type Rule = {
  archetype: Archetype;
  trigger: (inputs: ArchetypeInputs) => boolean;
};

const { STRONG, MODERATE, VERY_STRONG } = THRESHOLDS;

const RULES: Rule[] = [
  {
    archetype: ARCHETYPES["ready-builder"],
    trigger: ({ strengths: s, readiness }) =>
      s.product >= STRONG && s.clarity < STRONG && readiness === "build",
  },
  {
    archetype: ARCHETYPES["signal-rich-builder"],
    trigger: ({ strengths: s }) => s.product >= STRONG && s.clarity >= STRONG,
  },
  {
    archetype: ARCHETYPES.bottleneck,
    trigger: ({ strengths: s }) =>
      s.capacity >= VERY_STRONG && s.capacity > s.systems && s.capacity >= s.operations,
  },
  {
    archetype: ARCHETYPES["duct-tape"],
    trigger: ({ strengths: s }) =>
      s.operations >= STRONG && (s.systems >= STRONG || s.capacity >= STRONG),
  },
  {
    archetype: ARCHETYPES["stretched-steward"],
    trigger: ({ strengths: s }) =>
      s.capacity >= STRONG &&
      s.operations >= MODERATE &&
      (s.trust >= MODERATE || s.retention >= MODERATE),
  },
  {
    archetype: ARCHETYPES["leaky-bucket"],
    trigger: ({ strengths: s }) =>
      s.retention >= STRONG ||
      (s.acquisition >= MODERATE &&
        s.retention >= MODERATE &&
        s.retention >= s.acquisition * 0.8),
  },
  {
    archetype: ARCHETYPES["growth-plateau"],
    trigger: ({ strengths: s }) => {
      const acquisitionLeads = Object.entries(s).every(
        ([signal, value]) => signal === "acquisition" || s.acquisition >= value,
      );
      return (
        s.acquisition >= STRONG &&
        s.retention < STRONG &&
        (s.trust >= MODERATE || acquisitionLeads)
      );
    },
  },
  {
    archetype: ARCHETYPES["hidden-gem"],
    trigger: ({ strengths: s, primaryPathway }) =>
      s.trust >= STRONG && primaryPathway !== "operationsAI",
  },
];

export function resolveArchetype(inputs: ArchetypeInputs): {
  archetype: Archetype;
  usedFallback: boolean;
} {
  for (const rule of RULES) {
    if (rule.trigger(inputs)) return { archetype: rule.archetype, usedFallback: false };
  }
  return {
    archetype: ARCHETYPES[FALLBACK_BY_PATHWAY[inputs.primaryPathway]],
    usedFallback: true,
  };
}
