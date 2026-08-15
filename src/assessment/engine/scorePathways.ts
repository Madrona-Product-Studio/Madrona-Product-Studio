// Pathway scoring + normalization (01-ENGINE-SPEC §3, §4).
import { QUESTIONS } from "../data/questions.ts";
import { PATHWAY_FORMULAS } from "../data/pathways.ts";
import { PATHWAYS, SIGNALS, answerIds } from "../types.ts";
import type { AnswerMap, AssessmentQuestion, Pathway, PathwayState, Signal } from "../types.ts";
import { clamp, rawSignals } from "./scoreSignals.ts";

export function pathwayScore(raw: Record<Signal, number>, pathway: Pathway): number {
  const formula = PATHWAY_FORMULAS[pathway];
  return SIGNALS.reduce((sum, signal) => sum + raw[signal] * (formula[signal] ?? 0), 0);
}

/** One answer's contribution to a pathway — used to find the true per-question ceiling. */
function answerContribution(
  weights: Partial<Record<Signal, number>>,
  pathway: Pathway,
): number {
  const formula = PATHWAY_FORMULAS[pathway];
  return SIGNALS.reduce(
    (sum, signal) => sum + Math.max(0, weights[signal] ?? 0) * (formula[signal] ?? 0),
    0,
  );
}

/**
 * The max score a pathway could reach across a question set — the best single
 * answer per question, not per-signal maxima (signals compete within a question).
 */
export function maxPossiblePathwayScore(
  pathway: Pathway,
  questions: AssessmentQuestion[],
): number {
  return questions.reduce((total, question) => {
    const best = Math.max(0, ...question.answers.map((a) => answerContribution(a.weights, pathway)));
    return total + best;
  }, 0);
}

export function scorePathways(answers: AnswerMap): Record<Pathway, PathwayState> {
  const answered = QUESTIONS.filter((q) => answerIds(answers, q.id).length > 0);
  const raw = rawSignals(answers);
  const scores = Object.fromEntries(
    PATHWAYS.map((p) => [p, pathwayScore(raw, p)]),
  ) as Record<Pathway, number>;
  const maxCurrent = Math.max(...PATHWAYS.map((p) => scores[p]), 0);

  const states = {} as Record<Pathway, PathwayState>;
  for (const pathway of PATHWAYS) {
    const ceilingSoFar = maxPossiblePathwayScore(pathway, answered);
    const ceilingFull = maxPossiblePathwayScore(pathway, QUESTIONS);
    states[pathway] = {
      raw: scores[pathway],
      absoluteStrength: ceilingSoFar > 0 ? clamp(scores[pathway] / ceilingSoFar, 0, 1) : 0,
      relativeStrength: maxCurrent > 0 ? scores[pathway] / maxCurrent : 0,
      normalized: Math.round(clamp(scores[pathway] / ceilingFull, 0, 1) * 100),
    };
  }
  return states;
}

/** Primary / secondary hypothesis + certainty (03-SIGNAL-BRAIN-SPEC §16). */
export function rankPathways(pathways: Record<Pathway, PathwayState>): {
  primary: Pathway;
  secondary: Pathway;
  gap: number;
  certainty: number;
} {
  const ranked = [...PATHWAYS].sort(
    (a, b) => pathways[b].absoluteStrength - pathways[a].absoluteStrength,
  );
  const gap = pathways[ranked[0]].absoluteStrength - pathways[ranked[1]].absoluteStrength;
  return {
    primary: ranked[0],
    secondary: ranked[1],
    gap,
    certainty: clamp(gap / 0.32, 0, 1),
  };
}
