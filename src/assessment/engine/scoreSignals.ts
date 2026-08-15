// Raw signal accumulation + normalization scaffolding (01-ENGINE-SPEC §2, §4, §5).
import { QUESTIONS } from "../data/questions.ts";
import { SIGNALS } from "../types.ts";
import type { AnswerMap, AssessmentQuestion, Signal, SignalState } from "../types.ts";

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function answeredQuestions(answers: AnswerMap): AssessmentQuestion[] {
  return QUESTIONS.filter((q) => answers[q.id] != null);
}

/** Sum of each question's best positive weight for a signal — the ceiling evidence can reach. */
function maxPossibleRaw(signal: Signal, questions: AssessmentQuestion[]): number {
  return questions.reduce((total, question) => {
    const best = Math.max(0, ...question.answers.map((a) => a.weights[signal] ?? 0));
    return total + best;
  }, 0);
}

export function rawSignals(answers: AnswerMap): Record<Signal, number> {
  const raw = Object.fromEntries(SIGNALS.map((s) => [s, 0])) as Record<Signal, number>;
  for (const question of QUESTIONS) {
    const answerId = answers[question.id];
    if (!answerId) continue;
    const answer = question.answers.find((a) => a.id === answerId);
    if (!answer) throw new Error(`Unknown answer ${answerId} for ${question.id}`);
    for (const signal of SIGNALS) {
      raw[signal] += answer.weights[signal] ?? 0;
    }
  }
  for (const signal of SIGNALS) raw[signal] = Math.max(0, raw[signal]);
  return raw;
}

/**
 * Full per-signal state at any point in the run.
 * absoluteStrength — evidence against the max possible from questions answered so far.
 * relativeStrength — standing against the current strongest signal.
 * confidence      — 0.15 + share of this signal's relevant questions answered (spec §5).
 */
export function scoreSignals(answers: AnswerMap): Record<Signal, SignalState> {
  const answered = answeredQuestions(answers);
  const raw = rawSignals(answers);
  const maxRaw = Math.max(...SIGNALS.map((s) => raw[s]), 0);

  const states = {} as Record<Signal, SignalState>;
  for (const signal of SIGNALS) {
    const ceiling = maxPossibleRaw(signal, answered);
    const relevant = QUESTIONS.filter((q) =>
      q.answers.some((a) => (a.weights[signal] ?? 0) > 0),
    );
    const answeredRelevant = relevant.filter((q) => answers[q.id] != null);
    const evidenceCount = answered.filter((q) => {
      const answer = q.answers.find((a) => a.id === answers[q.id]);
      return ((answer?.weights[signal] ?? 0) > 0);
    }).length;

    states[signal] = {
      raw: raw[signal],
      absoluteStrength: ceiling > 0 ? clamp(raw[signal] / ceiling, 0, 1) : 0,
      relativeStrength: maxRaw > 0 ? raw[signal] / maxRaw : 0,
      evidenceCount,
      confidence:
        relevant.length > 0
          ? clamp(0.15 + (answeredRelevant.length / relevant.length) * 0.85, 0, 1)
          : 0.15,
    };
  }
  return states;
}

/** Signal ceilings for the full configured question set (final normalization). */
export function fullSetSignalCeilings(): Record<Signal, number> {
  return Object.fromEntries(
    SIGNALS.map((s) => [s, maxPossibleRaw(s, QUESTIONS)]),
  ) as Record<Signal, number>;
}

/** absoluteStrength against the FULL question set — what archetype rules evaluate at completion. */
export function finalSignalStrengths(answers: AnswerMap): Record<Signal, number> {
  const raw = rawSignals(answers);
  const ceilings = fullSetSignalCeilings();
  return Object.fromEntries(
    SIGNALS.map((s) => [s, ceilings[s] > 0 ? clamp(raw[s] / ceilings[s], 0, 1) : 0]),
  ) as Record<Signal, number>;
}
