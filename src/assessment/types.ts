// Madrona Signal Assessment — shared engine types.
// Source of truth: docs/signal-assessment-spec (01-ENGINE-SPEC.md).
// The engine is deterministic, interpretable, and separate from presentation.

export type Signal =
  | "trust"
  | "acquisition"
  | "retention"
  | "operations"
  | "capacity"
  | "systems"
  | "product"
  | "clarity";

export const SIGNALS: Signal[] = [
  "trust",
  "acquisition",
  "retention",
  "operations",
  "capacity",
  "systems",
  "product",
  "clarity",
];

export type Pathway =
  | "brandWeb"
  | "customersGrowth"
  | "operationsAI"
  | "newProduct";

export const PATHWAYS: Pathway[] = [
  "brandWeb",
  "customersGrowth",
  "operationsAI",
  "newProduct",
];

export type Readiness =
  | "fix-specific"
  | "find-focus"
  | "prototype"
  | "build"
  | "outside-perspective";

export interface AssessmentAnswer {
  id: string;
  label: string;
  description?: string;
  weights: Partial<Record<Signal, number>>;
  readiness?: Readiness;
}

export interface AssessmentQuestion {
  id: string;
  stage: string;
  eyebrow?: string;
  question: string;
  supportingText?: string;
  answers: AssessmentAnswer[];
}

export type SignalState = {
  raw: number;
  /** Evidence accumulated against the max possible so far (0..1). */
  absoluteStrength: number;
  /** Standing compared with the other current signals (0..1). */
  relativeStrength: number;
  evidenceCount: number;
  confidence: number;
};

export type PathwayState = {
  raw: number;
  /** Against the max possible from questions answered so far (0..1). */
  absoluteStrength: number;
  /** Compared with the other pathways right now (0..1). */
  relativeStrength: number;
  /** Final normalized 0..100 score against the full question set. */
  normalized: number;
};

export type ArchetypeId =
  | "ready-builder"
  | "signal-rich-builder"
  | "bottleneck"
  | "duct-tape"
  | "stretched-steward"
  | "leaky-bucket"
  | "growth-plateau"
  | "hidden-gem";

export interface Archetype {
  id: ArchetypeId;
  name: string;
  short: string;
  full: string;
  primaryPathway: Pathway;
}

export type TopSignal = {
  signal: Signal;
  label: string;
  level: "Strong" | "Emerging" | "Supporting";
  rankScore: number;
};

export type AnswerMap = Partial<Record<string, string>>;

export type EngineState = {
  answers: AnswerMap;
  answeredCount: number;
  signals: Record<Signal, SignalState>;
  pathways: Record<Pathway, PathwayState>;
  primaryPathway: Pathway;
  secondaryPathway: Pathway;
  pathwayGap: number;
  /** 0..1 — how separated the leading hypothesis is. */
  certainty: number;
  readiness: Readiness | null;
};

export type AssessmentResult = {
  state: EngineState;
  archetype: Archetype;
  usedFallback: boolean;
  topSignals: TopSignal[];
  recommendation: Recommendation;
};

export type Recommendation = {
  title: string;
  description: string;
  pathway: Pathway;
};
