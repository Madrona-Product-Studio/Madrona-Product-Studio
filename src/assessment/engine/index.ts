// Engine assembly: progressive state for the Signal Brain, final result for the assessment.
import { QUESTIONS } from "../data/questions.ts";
import { SIGNAL_LABELS } from "../data/pathways.ts";
import { SIGNALS, answerIds } from "../types.ts";
import type {
  AnswerMap,
  AssessmentResult,
  EngineState,
  Readiness,
  TopSignal,
} from "../types.ts";
import { finalSignalStrengths, scoreSignals } from "./scoreSignals.ts";
import { rankPathways, scorePathways } from "./scorePathways.ts";
import { resolveArchetype } from "./resolveArchetype.ts";
import { resolveRecommendation } from "./resolveRecommendation.ts";

export { scoreSignals, finalSignalStrengths } from "./scoreSignals.ts";
export { scorePathways, rankPathways, maxPossiblePathwayScore } from "./scorePathways.ts";
export { resolveArchetype } from "./resolveArchetype.ts";
export { resolveRecommendation } from "./resolveRecommendation.ts";

function readinessFrom(answers: AnswerMap): Readiness | null {
  const q7 = QUESTIONS.find((q) => q.id === "q7-readiness");
  if (!q7) return null;
  const answerId = answerIds(answers, q7.id)[0];
  if (!answerId) return null;
  return q7.answers.find((a) => a.id === answerId)?.readiness ?? null;
}

/** The full engine state after any number of answers — the Signal Brain's input. */
export function computeEngineState(answers: AnswerMap): EngineState {
  const signals = scoreSignals(answers);
  const pathways = scorePathways(answers);
  const { primary, secondary, gap, certainty } = rankPathways(pathways);
  return {
    answers,
    answeredCount: QUESTIONS.filter((q) => answerIds(answers, q.id).length > 0).length,
    signals,
    pathways,
    primaryPathway: primary,
    secondaryPathway: secondary,
    pathwayGap: gap,
    certainty,
    readiness: readinessFrom(answers),
  };
}

/** Strongest three signals for the result (01-ENGINE-SPEC §10). */
export function getTopSignals(state: EngineState): TopSignal[] {
  return SIGNALS.map((signal) => {
    const s = state.signals[signal];
    const rankScore = s.absoluteStrength * 0.7 + s.confidence * 0.3;
    const level =
      s.absoluteStrength >= 0.72
        ? ("Strong" as const)
        : s.absoluteStrength >= 0.5
          ? ("Emerging" as const)
          : ("Supporting" as const);
    return { signal, label: SIGNAL_LABELS[signal], level, rankScore };
  })
    .sort((a, b) => b.rankScore - a.rankScore)
    .slice(0, 3);
}

/** Final result after all seven answers. */
export function computeResult(answers: AnswerMap): AssessmentResult {
  const state = computeEngineState(answers);
  const strengths = finalSignalStrengths(answers);
  const { archetype, usedFallback } = resolveArchetype({
    strengths,
    readiness: state.readiness,
    primaryPathway: state.primaryPathway,
  });
  return {
    state,
    archetype,
    usedFallback,
    topSignals: getTopSignals(state),
    recommendation: resolveRecommendation(archetype.primaryPathway, state.readiness),
  };
}
