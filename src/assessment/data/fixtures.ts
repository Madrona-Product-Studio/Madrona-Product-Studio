// Deterministic test profiles (01-ENGINE-SPEC §12).
// Each supplies exact answer IDs for Q1–Q7 and the archetype it must resolve to.
import type { AnswerMap, ArchetypeId } from "../types.ts";

export type TestProfile =
  | "hidden-gem"
  | "leaky-bucket"
  | "duct-tape"
  | "bottleneck"
  | "signal-rich-builder"
  | "ready-builder"
  | "growth-plateau"
  | "stretched-steward";

export const TEST_PROFILES: TestProfile[] = [
  "hidden-gem",
  "leaky-bucket",
  "duct-tape",
  "bottleneck",
  "signal-rich-builder",
  "ready-builder",
  "growth-plateau",
  "stretched-steward",
];

export type Fixture = {
  name: string;
  expectedArchetype: ArchetypeId;
  answers: AnswerMap;
};

export const FIXTURES: Record<TestProfile, Fixture> = {
  "hidden-gem": {
    name: "Hidden Gem",
    expectedArchetype: "hidden-gem",
    answers: {
      "q1-context": "health",
      "q2-friction": "understanding",
      "q3-reality": "better-than-presence",
      "q4-time": "explain",
      "q5-outcome": "understood-trusted",
      "q6-workaround": "nothing-sticks",
      "q7-readiness": "outside-perspective",
    },
  },
  "leaky-bucket": {
    name: "Leaky Bucket",
    expectedArchetype: "leaky-bucket",
    answers: {
      "q1-context": "retail",
      "q2-friction": "repeat-business",
      "q3-reality": "personal-followup",
      "q4-time": "followup",
      "q5-outcome": "customers-return",
      "q6-workaround": "effort-memory",
      "q7-readiness": "fix-specific",
    },
  },
  "duct-tape": {
    name: "Duct-Tape Operator",
    expectedArchetype: "duct-tape",
    answers: {
      "q1-context": "food-farm",
      "q2-friction": "manual-work",
      "q3-reality": "information-everywhere",
      "q4-time": "move-information",
      "q5-outcome": "systems-together",
      "q6-workaround": "patchwork",
      "q7-readiness": "fix-specific",
    },
  },
  bottleneck: {
    name: "Bottleneck",
    expectedArchetype: "bottleneck",
    answers: {
      "q1-context": "food-farm",
      "q2-friction": "manual-work",
      "q3-reality": "few-people-hold-it",
      "q4-time": "coordination",
      "q5-outcome": "less-manual",
      "q6-workaround": "one-person",
      "q7-readiness": "fix-specific",
    },
  },
  "signal-rich-builder": {
    name: "Signal-Rich Builder",
    expectedArchetype: "signal-rich-builder",
    answers: {
      "q1-context": "other",
      "q2-friction": "new-thing",
      "q3-reality": "ideas-no-priority",
      "q4-time": "decide-next",
      "q5-outcome": "new-real",
      "q6-workaround": "not-tackled",
      "q7-readiness": "find-focus",
    },
  },
  "ready-builder": {
    name: "Ready Builder",
    expectedArchetype: "ready-builder",
    answers: {
      "q1-context": "other",
      "q2-friction": "new-thing",
      "q3-reality": "ideas-no-priority",
      "q4-time": "decide-next",
      "q5-outcome": "new-real",
      "q6-workaround": "patchwork",
      "q7-readiness": "build",
    },
  },
  "growth-plateau": {
    name: "Growth Plateau",
    expectedArchetype: "growth-plateau",
    answers: {
      "q1-context": "retail",
      "q2-friction": "more-customers",
      "q3-reality": "attention-disappears",
      "q4-time": "find-convert",
      "q5-outcome": "more-right-customers",
      "q6-workaround": "more-process",
      "q7-readiness": "fix-specific",
    },
  },
  "stretched-steward": {
    name: "Stretched Steward",
    expectedArchetype: "stretched-steward",
    answers: {
      "q1-context": "services",
      "q2-friction": "manual-work",
      "q3-reality": "few-people-hold-it",
      "q4-time": "followup",
      "q5-outcome": "customers-return",
      "q6-workaround": "one-person",
      "q7-readiness": "outside-perspective",
    },
  },
};
