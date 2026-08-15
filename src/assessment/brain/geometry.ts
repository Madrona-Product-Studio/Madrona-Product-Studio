// Deterministic layout + path helpers for the Signal Brain (03-SIGNAL-BRAIN-SPEC §5–§9, §14).
// No randomness at render time: every position derives from ids and engine state.
import type { Pathway, Signal } from "../types.ts";

export const VIEWBOX = { width: 900, height: 600 };

export type Point = { x: number; y: number };

// Base topology — art-directed, intentionally asymmetric (§6).
export const SIGNAL_BASE: Record<Signal, Point> = {
  trust: { x: 330, y: 118 },
  acquisition: { x: 432, y: 178 },
  retention: { x: 338, y: 258 },
  capacity: { x: 302, y: 408 },
  operations: { x: 428, y: 362 },
  systems: { x: 522, y: 442 },
  clarity: { x: 502, y: 118 },
  product: { x: 562, y: 262 },
};

export const PATHWAY_ANCHORS: Record<Pathway, Point> = {
  brandWeb: { x: 712, y: 120 },
  customersGrowth: { x: 736, y: 246 },
  operationsAI: { x: 720, y: 396 },
  newProduct: { x: 736, y: 514 },
};

// Latent semantic relationships (§10).
export const SIGNAL_EDGES: [Signal, Signal][] = [
  ["trust", "acquisition"],
  ["acquisition", "retention"],
  ["retention", "operations"],
  ["capacity", "operations"],
  ["operations", "systems"],
  ["clarity", "product"],
  ["product", "systems"],
  ["clarity", "trust"],
  ["clarity", "operations"],
  ["capacity", "retention"],
];

export const PATHWAY_SIGNALS: Record<Pathway, Signal[]> = {
  brandWeb: ["trust", "clarity", "acquisition"],
  customersGrowth: ["acquisition", "retention", "trust"],
  operationsAI: ["operations", "systems", "capacity"],
  newProduct: ["product", "clarity", "systems"],
};

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpPoint(a: Point, b: Point, t: number): Point {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/** djb2 — stable tiny hash for deterministic jitter. */
export function hash(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i += 1) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return h;
}

/** Deterministic value in [-1, 1) derived from an id + salt. */
export function jitter(id: string, salt: string): number {
  return ((hash(id + salt) % 1000) / 500) - 1;
}

/**
 * Smooth cubic between two points with horizontal bias (§14) plus a
 * controlled vertical bow so long routes look authored, not shortest-path.
 */
export function curveBetween(a: Point, b: Point, bend = 0.25, bow = 0): string {
  const dx = b.x - a.x;
  return `M ${a.x} ${a.y} C ${a.x + dx * bend} ${a.y + bow}, ${b.x - dx * bend} ${b.y + bow}, ${b.x} ${b.y}`;
}

/** One continuous smooth path through several points (Catmull-Rom → bezier). */
export function curveThrough(points: Point[], tension = 0.8): string {
  if (points.length < 2) return "";
  if (points.length === 2) return curveBetween(points[0], points[1]);
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = {
      x: p1.x + ((p2.x - p0.x) / 6) * tension,
      y: p1.y + ((p2.y - p0.y) / 6) * tension,
    };
    const c2 = {
      x: p2.x - ((p3.x - p1.x) / 6) * tension,
      y: p2.y - ((p3.y - p1.y) / 6) * tension,
    };
    d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * Deterministic evidence-node placement (§9): early questions land near the
 * left edge, later ones drift toward the centroid of the signals they touch.
 */
export function evidencePosition(
  questionIndex: number,
  answerId: string,
  affected: Signal[],
): Point {
  const jx = jitter(answerId, "x");
  const jy = jitter(answerId, "y");
  if (questionIndex <= 1 || affected.length === 0) {
    return { x: 108 + questionIndex * 46 + jx * 26, y: 150 + ((hash(answerId) % 320)) + jy * 18 };
  }
  const centroid = affected.reduce(
    (acc, s) => ({ x: acc.x + SIGNAL_BASE[s].x, y: acc.y + SIGNAL_BASE[s].y }),
    { x: 0, y: 0 },
  );
  const cx = centroid.x / affected.length;
  const cy = centroid.y / affected.length;
  const towardLeft = questionIndex <= 3 ? 0.62 : 0.4;
  return {
    x: lerp(cx, 150, towardLeft) + jx * 34,
    y: Math.min(552, Math.max(60, cy + jy * 56)),
  };
}

/**
 * The latent field: dim background nodes implying a larger network the route
 * is being discovered inside (reference image's strongest ambient idea).
 * Deterministic scatter, biased away from the exact hub positions.
 */
export const LATENT_FIELD: { pos: Point; r: number; hollow: boolean }[] = Array.from(
  { length: 26 },
  (_, i) => {
    const h = hash(`latent-${i}`);
    const x = 80 + (h % 760);
    const y = 60 + ((h >> 3) % 490);
    // Push away from any signal hub it lands on top of.
    let px = x;
    let py = y;
    for (const base of Object.values(SIGNAL_BASE)) {
      const d = Math.hypot(base.x - px, base.y - py);
      if (d < 46) {
        px += ((px - base.x) / (d || 1)) * (52 - d);
        py += ((py - base.y) / (d || 1)) * (52 - d);
      }
    }
    return {
      pos: { x: Math.min(858, Math.max(52, px)), y: Math.min(566, Math.max(40, py)) },
      r: 1.4 + ((h >> 7) % 10) / 6,
      hollow: (h >> 5) % 3 === 0,
    };
  },
);

/** Greedy chain ordering: start farthest from the anchor, walk nearest-neighbor, end at the anchor. */
export function orderChain(signals: Signal[], positions: Record<Signal, Point>, anchor: Point): Signal[] {
  if (signals.length <= 1) return [...signals];
  const remaining = new Set(signals);
  let current = [...signals].sort(
    (a, b) => distance(positions[b], anchor) - distance(positions[a], anchor),
  )[0];
  const chain = [current];
  remaining.delete(current);
  while (remaining.size > 0) {
    let best: Signal | null = null;
    let bestD = Infinity;
    for (const s of remaining) {
      const d = distance(positions[current], positions[s]);
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    current = best as Signal;
    chain.push(current);
    remaining.delete(current);
  }
  return chain;
}
