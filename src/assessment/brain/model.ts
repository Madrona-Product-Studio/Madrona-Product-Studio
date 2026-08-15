// Derives the Signal Brain's visual model from real engine state.
// No fake visualization state: everything here is a function of scoring (§1, spec 03).
import { QUESTIONS } from "../data/questions.ts";
import { PATHWAY_FORMULAS } from "../data/pathways.ts";
import { PATHWAYS, SIGNALS, answerIds } from "../types.ts";
import type { EngineState, Pathway, Signal } from "../types.ts";
import {
  PATHWAY_ANCHORS,
  PATHWAY_SIGNALS,
  SIGNAL_BASE,
  SIGNAL_EDGES,
  evidencePosition,
  lerp,
  lerpPoint,
  orderChain,
} from "./geometry.ts";
import type { Point } from "./geometry.ts";

export type EvidenceVis = {
  id: string;
  pos: Point;
  affected: Signal[];
  magnitude: number;
  questionIndex: number;
};

export type SignalVis = {
  id: Signal;
  target: Point;
  radius: number;
  strength: number; // absolute 0..1
  relative: number; // 0..1
  confidence: number; // 0..1
  onPrimaryRoute: boolean;
  onSecondaryRoute: boolean;
};

export type PathwayVis = {
  id: Pathway;
  pos: Point;
  relative: number;
  absolute: number;
  isPrimary: boolean;
  isSecondary: boolean;
};

export type EdgeVis = {
  key: string;
  from: Signal;
  to: Signal | Pathway;
  toKind: "signal" | "pathway";
  strength: number; // 0..1 → opacity/width in renderer
};

export type BrainModel = {
  signals: Record<Signal, SignalVis>;
  pathways: Record<Pathway, PathwayVis>;
  evidence: EvidenceVis[];
  edges: EdgeVis[];
  primaryChain: Signal[];
  secondaryChain: Signal[];
  primaryPathway: Pathway;
  secondaryPathway: Pathway;
  certainty: number;
  /**
   * Certainty tempered by accumulated evidence — what the visualization
   * commits to. One loud answer must not fully commit the brain (§16).
   */
  displayCertainty: number;
  /** Mean confidence of the primary chain — gates how far the route reaches. */
  routeConfidence: number;
  outcome: Point;
  answeredCount: number;
  /** False until any signal has real evidence — everything stays latent. */
  hasEvidence: boolean;
  /** True when the runner-up pathway is close enough to stay called out. */
  contested: boolean;
};

/**
 * Below this gap the top two pathways are genuinely close: the map keeps the
 * runner-up visibly in the picture and the result names it. One threshold
 * shared by brain, current-read copy, and the result readout.
 */
export const CLOSE_PATHWAY_GAP = 0.09;

const MAX_SIGNAL_DRIFT = 24;

function attractorTarget(
  signal: Signal,
  state: EngineState,
): Point {
  const base = SIGNAL_BASE[signal];
  const primary = state.primaryPathway;
  const secondary = state.secondaryPathway;
  const pullFor = (pathway: Pathway, amount: number): Point => {
    const coef = PATHWAY_FORMULAS[pathway][signal] ?? 0;
    if (coef <= 0) return { x: 0, y: 0 };
    const anchor = PATHWAY_ANCHORS[pathway];
    const dx = anchor.x - base.x;
    const dy = anchor.y - base.y;
    const len = Math.hypot(dx, dy) || 1;
    const s = state.signals[signal];
    const drift =
      MAX_SIGNAL_DRIFT * amount * coef * state.pathways[pathway].relativeStrength * s.confidence;
    return { x: (dx / len) * drift, y: (dy / len) * drift };
  };
  const p = pullFor(primary, 1);
  const s = pullFor(secondary, 0.4);
  return { x: base.x + p.x + s.x, y: base.y + p.y + s.y };
}

function chainFor(pathway: Pathway, state: EngineState, count: number): Signal[] {
  const contributors = PATHWAY_SIGNALS[pathway]
    .map((signal) => ({
      signal,
      contribution:
        state.signals[signal].raw * (PATHWAY_FORMULAS[pathway][signal] ?? 0),
    }))
    .filter((c) => c.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, count)
    .map((c) => c.signal);
  return orderChain(contributors, SIGNAL_BASE, PATHWAY_ANCHORS[pathway]);
}

export function evidenceFromAnswers(state: EngineState): EvidenceVis[] {
  const items: EvidenceVis[] = [];
  QUESTIONS.forEach((question, index) => {
    for (const answerId of answerIds(state.answers, question.id)) {
      const answer = question.answers.find((a) => a.id === answerId);
      if (!answer) continue;
      const affected = SIGNALS.filter((s) => (answer.weights[s] ?? 0) > 0);
      const magnitude = affected.reduce((sum, s) => sum + (answer.weights[s] ?? 0), 0);
      items.push({
        id: `${question.id}:${answerId}`,
        pos: evidencePosition(index, answerId, affected),
        affected,
        magnitude,
        questionIndex: index,
      });
    }
  });
  return items;
}

export function deriveBrainModel(state: EngineState): BrainModel {
  const hasEvidence = SIGNALS.some((s) => state.signals[s].raw > 0);
  const primaryChain = chainFor(state.primaryPathway, state, 3);
  const secondaryChain = chainFor(state.secondaryPathway, state, 2).filter(
    (s) => !primaryChain.includes(s),
  );

  const signals = {} as Record<Signal, SignalVis>;
  for (const signal of SIGNALS) {
    const s = state.signals[signal];
    signals[signal] = {
      id: signal,
      target: attractorTarget(signal, state),
      radius: 5.5 + 9 * Math.sqrt(Math.max(0, s.relativeStrength)),
      strength: s.absoluteStrength,
      relative: s.relativeStrength,
      confidence: s.confidence,
      onPrimaryRoute: primaryChain.includes(signal),
      onSecondaryRoute: secondaryChain.includes(signal),
    };
  }

  const pathways = {} as Record<Pathway, PathwayVis>;
  for (const pathway of PATHWAYS) {
    const p = state.pathways[pathway];
    pathways[pathway] = {
      id: pathway,
      pos: PATHWAY_ANCHORS[pathway],
      relative: hasEvidence ? p.relativeStrength : 0,
      absolute: p.absoluteStrength,
      isPrimary: hasEvidence && pathway === state.primaryPathway,
      isSecondary: hasEvidence && pathway === state.secondaryPathway,
    };
  }

  const displayCertainty =
    state.certainty * (0.2 + 0.8 * Math.min(1, state.answeredCount / 5));

  const edges: EdgeVis[] = [];
  for (const [a, b] of SIGNAL_EDGES) {
    const sa = state.signals[a];
    const sb = state.signals[b];
    const strength =
      Math.min(sa.relativeStrength, sb.relativeStrength) *
      (0.45 + 0.55 * ((sa.confidence + sb.confidence) / 2));
    edges.push({ key: `${a}-${b}`, from: a, to: b, toKind: "signal", strength });
  }
  for (const pathway of PATHWAYS) {
    const formula = PATHWAY_FORMULAS[pathway];
    const raw = Object.entries(formula).reduce(
      (sum, [signal, coef]) => sum + state.signals[signal as Signal].raw * (coef ?? 0),
      0,
    );
    for (const signal of PATHWAY_SIGNALS[pathway]) {
      const coef = formula[signal] ?? 0;
      const contribution = raw > 0 ? (state.signals[signal].raw * coef) / raw : 0;
      // Damped early: long signal→pathway strings read as noise before the
      // brain has earned a hypothesis (Charlie, 2026-08-14).
      const strength =
        contribution *
        state.pathways[pathway].relativeStrength *
        (0.5 + 0.5 * state.signals[signal].confidence) *
        (0.25 + 0.75 * displayCertainty);
      edges.push({
        key: `${signal}-${pathway}`,
        from: signal,
        to: pathway,
        toKind: "pathway",
        strength,
      });
    }
  }

  const primaryAnchor = PATHWAY_ANCHORS[state.primaryPathway];
  const secondaryAnchor = PATHWAY_ANCHORS[state.secondaryPathway];
  const outcome: Point = {
    x: 845,
    y: lerp(primaryAnchor.y, secondaryAnchor.y, 0.12),
  };

  const routeConfidence =
    primaryChain.length > 0
      ? primaryChain.reduce((sum, s) => sum + state.signals[s].confidence, 0) /
        primaryChain.length
      : 0;

  return {
    signals,
    pathways,
    evidence: evidenceFromAnswers(state),
    edges,
    primaryChain,
    secondaryChain,
    primaryPathway: state.primaryPathway,
    secondaryPathway: state.secondaryPathway,
    certainty: state.certainty,
    displayCertainty,
    routeConfidence,
    outcome,
    answeredCount: state.answeredCount,
    hasEvidence,
    contested:
      hasEvidence && state.answeredCount >= 3 && state.pathwayGap < CLOSE_PATHWAY_GAP,
  };
}

/** Entry point of the active route — near the evidence feeding its first signal. */
export function routeEntry(model: BrainModel): Point {
  const first = model.primaryChain[0];
  if (!first) return { x: 150, y: 300 };
  const firstPos = SIGNAL_BASE[first];
  const feeding = model.evidence.filter((e) => e.affected.includes(first));
  if (feeding.length === 0) {
    return { x: Math.max(96, firstPos.x - 150), y: firstPos.y + 26 };
  }
  const centroid = feeding.reduce(
    (acc, e) => ({ x: acc.x + e.pos.x, y: acc.y + e.pos.y }),
    { x: 0, y: 0 },
  );
  return lerpPoint(
    { x: centroid.x / feeding.length, y: centroid.y / feeding.length },
    firstPos,
    0.25,
  );
}
