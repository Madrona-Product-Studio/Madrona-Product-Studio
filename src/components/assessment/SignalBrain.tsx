/* eslint-disable react-hooks/refs --
   The spring store is a ref-backed external store read during render by
   design: the rAF loop advances springs and bumps a frame counter, so every
   mutation is immediately followed by a render that sees fresh values. */
// The Signal Brain — the assessment's signature visualization (spec 03).
// Deterministic layout from engine state; a small spring system animates
// topology changes; theatrical phases (ingest/propagate/synthesize) are
// orchestrated here behind an imperative handle.
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { EngineState, Pathway, Signal } from "../../assessment/types.ts";
import { PATHWAYS, SIGNALS } from "../../assessment/types.ts";
import { PATHWAY_COPY, SIGNAL_LABELS } from "../../assessment/data/pathways.ts";
import {
  LATENT_FIELD,
  LATENT_LINKS,
  PATHWAY_ANCHORS,
  SIGNAL_BASE,
  VIEWBOX,
  curveBetween,
  curveThrough,
  distance,
  jitter,
} from "../../assessment/brain/geometry.ts";
import type { Point } from "../../assessment/brain/geometry.ts";
import { deriveBrainModel, routeEntry } from "../../assessment/brain/model.ts";
import "./signal-brain.css";

export type BrainPhase =
  | "idle"
  | "ingest"
  | "propagate"
  | "rebalance"
  | "settle"
  | "synthesize"
  | "locked";

export type SignalBrainHandle = {
  /** Full answer sequence: ingest → propagate → rebalance → settle. */
  runAnswerSequence: (evidenceId?: string) => void;
  /** Jump to a single phase (lab inspection). */
  trigger: (phase: BrainPhase, evidenceId?: string) => void;
};

type Props = {
  state: EngineState;
  reducedMotion?: boolean;
  showLabels?: boolean;
  showPathwayAnchors?: boolean;
  showEvidence?: boolean;
  showRawEdges?: boolean;
  showBounds?: boolean;
  onPhaseChange?: (phase: BrainPhase) => void;
  className?: string;
};

type Spring = { value: number; target: number; velocity: number; k: number; c: number };

type Pulse = {
  id: string;
  d: string;
  duration: number;
  delay: number;
  kind: "propagate" | "synthesis";
};

const SPRING_SOFT = { k: 42, c: 13 }; // deliberate rebalance drift
const SPRING_FIRM = { k: 120, c: 22 }; // radii, opacities

function springStep(s: Spring, dt: number): boolean {
  const accel = s.k * (s.target - s.value) - s.c * s.velocity;
  s.velocity += accel * dt;
  s.value += s.velocity * dt;
  if (Math.abs(s.velocity) < 0.02 && Math.abs(s.target - s.value) < 0.02) {
    s.value = s.target;
    s.velocity = 0;
    return false;
  }
  return true;
}

export const SignalBrain = forwardRef<SignalBrainHandle, Props>(function SignalBrain(
  {
    state,
    reducedMotion = false,
    showLabels = false,
    showPathwayAnchors = false,
    showEvidence = true,
    showRawEdges = false,
    showBounds = false,
    onPhaseChange,
    className,
  },
  ref,
) {
  const model = useMemo(() => deriveBrainModel(state), [state]);
  const [phase, setPhaseState] = useState<BrainPhase>("idle");
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [ingestFocus, setIngestFocus] = useState<string | null>(null);
  const [, setFrame] = useState(0);

  const springs = useRef<Map<string, Spring>>(new Map());
  const rafRef = useRef<number | null>(null);
  const lastTime = useRef<number>(0);
  const timeouts = useRef<number[]>([]);
  const phaseRef = useRef<BrainPhase>("idle");

  const setPhase = useCallback(
    (next: BrainPhase) => {
      phaseRef.current = next;
      setPhaseState(next);
      onPhaseChange?.(next);
    },
    [onPhaseChange],
  );

  const spring = useCallback((key: string, fallback: number): number => {
    const existing = springs.current.get(key);
    if (existing) return existing.value;
    springs.current.set(key, { value: fallback, target: fallback, velocity: 0, ...SPRING_FIRM });
    return fallback;
  }, []);

  const ensureLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastTime.current = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime.current) / 1000);
      lastTime.current = now;
      let active = false;
      for (const s of springs.current.values()) {
        if (springStep(s, dt)) active = true;
      }
      setFrame((f) => f + 1);
      if (active) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const setTarget = useCallback(
    (key: string, target: number, params: { k: number; c: number }, fallback?: number) => {
      let s = springs.current.get(key);
      if (!s) {
        s = { value: fallback ?? target, target, velocity: 0, ...params };
      }
      s.k = params.k;
      s.c = params.c;
      s.target = target;
      if (reducedMotion) {
        s.value = target;
        s.velocity = 0;
      }
      springs.current.set(key, s);
    },
    [reducedMotion],
  );

  // ---- Target application: every model change is a rebalance (§21). ----
  useEffect(() => {
    const synth = phaseRef.current === "synthesize" || phaseRef.current === "locked";
    for (const id of SIGNALS) {
      const vis = model.signals[id];
      setTarget(`sig:${id}:x`, vis.target.x, SPRING_SOFT, SIGNAL_BASE[id].x);
      setTarget(`sig:${id}:y`, vis.target.y, SPRING_SOFT, SIGNAL_BASE[id].y);
      const emphasized = synth && (vis.onPrimaryRoute || vis.onSecondaryRoute);
      setTarget(`sig:${id}:r`, emphasized ? Math.max(vis.radius, 11) : vis.radius, SPRING_FIRM, 5);
      setTarget(`sig:${id}:conf`, vis.confidence, SPRING_FIRM, 0.15);
    }
    for (const edge of model.edges) {
      setTarget(`edge:${edge.key}`, edge.strength, SPRING_FIRM, 0);
    }
    for (const p of PATHWAYS) {
      const vis = model.pathways[p];
      // Primary emphasis is earned with displayCertainty, not granted at Q1.
      const emphasis = synth ? 1 : model.displayCertainty;
      const base = vis.isPrimary
        ? 0.25 + 0.4 * emphasis
        : vis.isSecondary
          ? 0.18 + 0.15 * emphasis
          : 0.12;
      setTarget(`pw:${p}:o`, base + vis.relative * 0.25, SPRING_FIRM, 0.1);
      setTarget(
        `pw:${p}:r`,
        vis.isPrimary
          ? 6 + (4 + 6 * emphasis) * vis.relative * (synth ? 1.25 : 1)
          : 5 + 5 * vis.relative,
        SPRING_FIRM,
        5,
      );
    }
    for (const e of model.evidence) {
      const age = model.answeredCount - 1 - e.questionIndex;
      const base = age <= 0 ? 0.75 : age === 1 ? 0.5 : 0.3;
      setTarget(`ev:${e.id}:o`, synth ? 0.12 : base, SPRING_FIRM, 0);
    }

    // Route reach: how far along entry→chain→anchor→outcome the line extends.
    const entry = routeEntry(model);
    const pts = [
      entry,
      ...model.primaryChain.map((s) => model.signals[s].target),
      PATHWAY_ANCHORS[model.primaryPathway],
      model.outcome,
    ];
    let total = 0;
    const cumulative = pts.map((p, i) => {
      if (i > 0) total += distance(pts[i - 1], p);
      return total;
    });
    const fInternal = total > 0 ? cumulative[pts.length - 3] / total : 0;
    const fAnchor = total > 0 ? cumulative[pts.length - 2] / total : 0;
    // Slider-driven lab states have no discrete answers; give them a working
    // progress floor. Real runs earn progress one answer at a time.
    const sliderDriven = model.hasEvidence && model.evidence.length === 0;
    const progress = Math.max(model.answeredCount / 7, sliderDriven ? 0.45 : 0);
    // Q1 is deliberately low-weight context: no route until a second answer
    // gives the hypothesis something to stand on (Charlie, 2026-08-14).
    const routeAlive =
      model.hasEvidence &&
      model.primaryChain.length > 0 &&
      (sliderDriven || synth || model.answeredCount >= 2);
    const anchorPull = Math.max(0, Math.min(1, (progress - 0.35) / 0.65));
    const reach = !routeAlive
      ? 0
      : synth
        ? 1
        : fInternal * (0.25 + 0.75 * progress) +
          (fAnchor - fInternal) * model.displayCertainty * anchorPull * 0.9;
    setTarget("route:reach", reach, SPRING_SOFT, 0);
    setTarget("route:o", routeAlive ? 1 : 0, SPRING_FIRM, 0);

    const secStrength = model.pathways[model.secondaryPathway].relative;
    setTarget(
      "route2:o",
      model.secondaryChain.length > 0
        ? Math.max(0.08, (1 - model.displayCertainty * 0.75) * 0.4 * secStrength)
        : 0,
      SPRING_FIRM,
      0,
    );

    setTarget(
      "outcome:o",
      !model.hasEvidence
        ? 0
        : synth
          ? 0.95
          : model.answeredCount >= 4
            ? model.displayCertainty * 0.5
            : 0,
      SPRING_SOFT,
      0,
    );
    ensureLoop();
  }, [model, setTarget, ensureLoop, phase]);

  // ---- Phase orchestration. ----
  const clearTimers = useCallback(() => {
    for (const t of timeouts.current) window.clearTimeout(t);
    timeouts.current = [];
  }, []);

  const later = useCallback((fn: () => void, ms: number) => {
    timeouts.current.push(window.setTimeout(fn, ms));
  }, []);

  const spawnPropagation = useCallback(
    (evidenceId?: string) => {
      const source: Point = (() => {
        const e = model.evidence.find((ev) => ev.id === evidenceId);
        if (e) return e.pos;
        const last = model.evidence[model.evidence.length - 1];
        return last ? last.pos : { x: 112, y: 300 };
      })();
      const targetsList = (() => {
        const e = model.evidence.find((ev) => ev.id === evidenceId) ?? model.evidence[model.evidence.length - 1];
        const affected = e ? e.affected : model.primaryChain;
        return affected.slice(0, 3);
      })();
      const next: Pulse[] = targetsList.map((sig, i) => ({
        id: `${Date.now()}-${sig}-${i}`,
        d: curveBetween(
          source,
          { x: spring(`sig:${sig}:x`, SIGNAL_BASE[sig].x), y: spring(`sig:${sig}:y`, SIGNAL_BASE[sig].y) },
          0.35,
          jitter(sig, "bow") * 26,
        ),
        duration: 620 + i * 90,
        delay: i * 110,
        kind: "propagate",
      }));
      setPulses((p) => [...p, ...next]);
    },
    [model, spring],
  );

  const runAnswerSequence = useCallback(
    (evidenceId?: string) => {
      clearTimers();
      if (reducedMotion) {
        setPhase("settle");
        return;
      }
      setPhase("ingest");
      setIngestFocus(evidenceId ?? null);
      later(() => {
        setPhase("propagate");
        spawnPropagation(evidenceId);
      }, 260);
      later(() => setPhase("rebalance"), 900);
      later(() => {
        setPhase("settle");
        setIngestFocus(null);
      }, 2000);
      later(() => setPhase("idle"), 2450);
    },
    [clearTimers, later, reducedMotion, setPhase, spawnPropagation],
  );

  const runSynthesis = useCallback(() => {
    clearTimers();
    setPhase("synthesize");
    if (reducedMotion) {
      later(() => setPhase("locked"), 250);
      return;
    }
    later(() => {
      setPulses((p) => [
        ...p,
        ...model.primaryChain.slice(0, 2).map((sig, i) => ({
          id: `syn-${Date.now()}-${sig}`,
          d: curveBetween(
            { x: spring(`sig:${sig}:x`, SIGNAL_BASE[sig].x), y: spring(`sig:${sig}:y`, SIGNAL_BASE[sig].y) },
            model.outcome,
            0.3,
            jitter(sig, "syn") * 30,
          ),
          duration: 900 + i * 140,
          delay: i * 160,
          kind: "synthesis" as const,
        })),
      ]);
    }, 1400);
    later(() => setPhase("locked"), 2600);
  }, [clearTimers, later, model, reducedMotion, setPhase, spring]);

  useImperativeHandle(
    ref,
    () => ({
      runAnswerSequence,
      trigger: (next: BrainPhase, evidenceId?: string) => {
        clearTimers();
        if (next === "synthesize") {
          runSynthesis();
          return;
        }
        if (next === "propagate") {
          setPhase("propagate");
          spawnPropagation(evidenceId);
          later(() => setPhase("idle"), 1100);
          return;
        }
        if (next === "ingest") {
          setPhase("ingest");
          setIngestFocus(evidenceId ?? null);
          later(() => setPhase("idle"), 700);
          return;
        }
        setPhase(next);
      },
    }),
    [runAnswerSequence, runSynthesis, spawnPropagation, clearTimers, later, setPhase],
  );

  useEffect(() => () => {
    clearTimers();
    // Reset the handle so a StrictMode remount can restart the loop.
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [clearTimers]);

  // ---- Frame-time geometry from animated values. ----
  const sigPos = (id: Signal): Point => ({
    x: spring(`sig:${id}:x`, SIGNAL_BASE[id].x),
    y: spring(`sig:${id}:y`, SIGNAL_BASE[id].y),
  });

  const entry = routeEntry(model);
  const routePoints: Point[] = [
    entry,
    ...model.primaryChain.map(sigPos),
    PATHWAY_ANCHORS[model.primaryPathway],
    model.outcome,
  ];
  const reach = Math.max(0, Math.min(1, spring("route:reach", 0)));
  const routeOpacity = spring("route:o", 0);

  // Node-to-node segments (the reference look): each is a gentle authored
  // arc, drawn in as the overall reach passes through it.
  const segLengths = routePoints.slice(1).map((p, i) => distance(routePoints[i], p));
  const routeTotal = segLengths.reduce((a, b) => a + b, 0) || 1;
  let routeAcc = 0;
  const routeSegments = routePoints.slice(1).map((p, i) => {
    const a = routePoints[i];
    const start = routeAcc / routeTotal;
    routeAcc += segLengths[i];
    const end = routeAcc / routeTotal;
    const local = Math.max(0, Math.min(1, (reach - start) / Math.max(1e-4, end - start)));
    return {
      key: `seg-${i}`,
      d: curveBetween(a, p, 0.32, jitter(`seg-${i}`, model.primaryPathway) * 18),
      local,
    };
  });

  const secondaryPoints: Point[] =
    model.secondaryChain.length > 0
      ? [
          ...model.secondaryChain.map(sigPos),
          PATHWAY_ANCHORS[model.secondaryPathway],
        ]
      : [];
  const secondaryD =
    secondaryPoints.length === 2
      ? curveBetween(
          secondaryPoints[0],
          secondaryPoints[1],
          0.3,
          28 + jitter(model.secondaryPathway, "bow2") * 18,
        )
      : secondaryPoints.length > 2
        ? curveThrough(secondaryPoints)
        : "";
  const secondaryOpacity = spring("route2:o", 0);

  const outcomeOpacity = spring("outcome:o", 0);

  const strongest = [...SIGNALS].sort(
    (a, b) => model.signals[b].relative - model.signals[a].relative,
  );
  const core = strongest[0];
  const glowSet = new Set(strongest.slice(0, 3).filter((s) => model.signals[s].relative > 0.25));

  const ambientEdges = useMemo(() => {
    return model.edges
      .filter((e) => e.toKind === "signal")
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 2);
  }, [model.edges]);

  const gradientId = useId().replace(/[^a-zA-Z0-9-]/g, "") + "-sb-route";

  const ariaLabel = (() => {
    const tops = strongest
      .slice(0, 3)
      .filter((s) => model.signals[s].relative > 0.2)
      .map((s) => SIGNAL_LABELS[s]);
    if (tops.length === 0) return "Live analysis map, waiting for signals.";
    return `Current strongest signals: ${tops.join(", ")}. ${PATHWAY_COPY[model.primaryPathway].name} is the leading pathway, with ${PATHWAY_COPY[model.secondaryPathway].name} secondary.`;
  })();

  return (
    <svg
      className={`sb sb--${phase}${reducedMotion ? " sb--reduced" : ""}${className ? ` ${className}` : ""}`}
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1={entry.x}
          y1={entry.y}
          x2={model.outcome.x}
          y2={model.outcome.y}
        >
          <stop offset="0" stopColor="var(--sb-green-bright)" />
          <stop offset="0.52" stopColor="var(--sb-green)" />
          <stop offset="0.78" stopColor="var(--sb-orange)" />
          <stop offset="1" stopColor="var(--sb-orange-bright)" />
        </linearGradient>
      </defs>

      {/* Background field (§28) */}
      <g className="sb-guides" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <line key={`gv${i}`} x1={180 + i * 180} y1={34} x2={180 + i * 180} y2={688} className="sb-grid" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`gh${i}`} x1={60} y1={180 + i * 180} x2={840} y2={180 + i * 180} className="sb-grid" />
        ))}
        <ellipse className="sb-orbit" cx={430} cy={356} rx={330} ry={256} />
        <ellipse className="sb-orbit sb-orbit--2" cx={450} cy={362} rx={248} ry={182} />
        {LATENT_LINKS.map(([a, b], i) => (
          <path
            key={`ll${i}`}
            className="sb-latent-link"
            d={curveBetween(a, b, 0.3, jitter(`ll${i}`, "bow") * 10)}
          />
        ))}
        {LATENT_FIELD.map((dot, i) => (
          <circle
            key={`lf${i}`}
            cx={dot.pos.x}
            cy={dot.pos.y}
            r={dot.r}
            className={dot.hollow ? "sb-latent-dot sb-latent-dot--hollow" : "sb-latent-dot"}
          />
        ))}
        {[46, 78, 112].map((r, i) => (
          <circle
            key={`oc${i}`}
            className="sb-outcome-field"
            cx={model.outcome.x}
            cy={model.outcome.y}
            r={r}
            style={{
              opacity:
                (0.03 + model.displayCertainty * 0.05 * (3 - i) * 0.5) *
                (phase === "synthesize" || phase === "locked" ? 2.2 : 1),
            }}
          />
        ))}
      </g>

      {showBounds && (
        <g className="sb-bounds" aria-hidden="true">
          {[
            { x: 80, w: 160, label: "evidence" },
            { x: 250, w: 310, label: "signals" },
            { x: 610, w: 150, label: "pathways" },
            { x: 790, w: 70, label: "outcome" },
          ].map((band) => (
            <g key={band.label}>
              <rect x={band.x} y={20} width={band.w} height={680} />
              <text x={band.x + 6} y={36}>{band.label}</text>
            </g>
          ))}
        </g>
      )}

      {/* Latent + active edges */}
      <g className="sb-edges" aria-hidden="true">
        {model.edges.map((edge) => {
          const a = sigPos(edge.from);
          const b = edge.toKind === "signal" ? sigPos(edge.to as Signal) : PATHWAY_ANCHORS[edge.to as Pathway];
          const strength = Math.max(0, Math.min(1, spring(`edge:${edge.key}`, 0)));
          const opacity = showRawEdges ? 0.5 : 0.06 + 0.68 * strength;
          const width = 0.8 + 2.4 * strength;
          return (
            <path
              key={edge.key}
              className="sb-edge"
              d={curveBetween(a, b, 0.28, jitter(edge.key, "bow") * 22)}
              style={{ opacity, strokeWidth: width }}
            />
          );
        })}
      </g>

      {/* Secondary hypothesis route */}
      {secondaryD && (
        <g className="sb-route2" aria-hidden="true" style={{ opacity: secondaryOpacity }}>
          <path d={secondaryD} className="sb-route2-line" />
        </g>
      )}

      {/* Active route: green evidence segments arcing toward an orange outcome (§12) */}
      <g className="sb-route" aria-hidden="true" style={{ opacity: routeOpacity }}>
        {routeSegments.map((seg) =>
          seg.local <= 0 ? null : (
            <g key={seg.key}>
              <path
                d={seg.d}
                className="sb-route-under"
                pathLength={1}
                style={{ stroke: `url(#${gradientId})`, strokeDasharray: `${seg.local} 1` }}
              />
              <path
                d={seg.d}
                className="sb-route-line"
                pathLength={1}
                style={{ stroke: `url(#${gradientId})`, strokeDasharray: `${seg.local} 1` }}
              />
            </g>
          ),
        )}
        {reach > 0.02 && (
          <circle cx={entry.x} cy={entry.y} r={4.2} className="sb-entry-ring" />
        )}
      </g>

      {/* Evidence nodes (§9) */}
      {showEvidence && (
        <g className="sb-evidence" aria-hidden="true">
          {model.evidence.map((e) => {
            const opacity = spring(`ev:${e.id}:o`, 0);
            const r = Math.min(6, 2.6 + e.magnitude * 0.35);
            const focus = ingestFocus === e.id;
            return (
              <g key={e.id} className={focus ? "sb-ev sb-ev--focus" : "sb-ev"}>
                {focus && <circle cx={e.pos.x} cy={e.pos.y} r={r + 9} className="sb-ev-bloom" />}
                <circle cx={e.pos.x} cy={e.pos.y} r={r} style={{ opacity }} className="sb-ev-dot" />
              </g>
            );
          })}
        </g>
      )}

      {/* Pathway attractors (§7) */}
      <g className="sb-pathways" aria-hidden="true">
        {PATHWAYS.map((p) => {
          const vis = model.pathways[p];
          const o = spring(`pw:${p}:o`, 0.1);
          const r = spring(`pw:${p}:r`, 5);
          // Anchors take color as their pathway strengthens, so the map shows
          // where the help is needed even when two pathways run close.
          const cls = [
            "sb-pw",
            vis.isPrimary ? "sb-pw--primary" : "",
            vis.isSecondary ? "sb-pw--secondary" : "",
            !vis.isPrimary && vis.relative > 0.55 ? "sb-pw--warm" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <g key={p} className={cls} style={{ opacity: o }}>
              <circle cx={vis.pos.x} cy={vis.pos.y} r={r + 6} className="sb-pw-halo" />
              <circle cx={vis.pos.x} cy={vis.pos.y} r={r} className="sb-pw-dot" />
              {(showPathwayAnchors || phase === "locked") && (
                <text x={vis.pos.x} y={vis.pos.y - r - 10} className="sb-pw-label">
                  {PATHWAY_COPY[p].name}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Signal hubs (§ B layer) */}
      <g className="sb-nodes">
        {SIGNALS.map((id) => {
          const pos = sigPos(id);
          const r = spring(`sig:${id}:r`, 5);
          const conf = Math.max(0.04, Math.min(1, spring(`sig:${id}:conf`, 0.15)));
          const vis = model.signals[id];
          const onRoute = vis.onPrimaryRoute;
          // Confirmed route hubs earn the reference's checkmark treatment —
          // confidence-gated so checks accumulate across the run, not at Q1.
          const checked =
            onRoute && model.hasEvidence && vis.strength > 0.2 && vis.confidence > 0.32;
          const cls = [
            "sb-node",
            onRoute ? "sb-node--route" : "",
            checked ? "sb-node--checked" : "",
            vis.onSecondaryRoute ? "sb-node--route2" : "",
            glowSet.has(id) ? "sb-node--glow" : "",
            id === core && vis.relative > 0.3 ? "sb-node--core" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <g key={id} className={cls}>
              {glowSet.has(id) && <circle cx={pos.x} cy={pos.y} r={r * 2.6} className="sb-node-glow" />}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                className="sb-node-dot"
                style={{ fillOpacity: checked ? 1 : 0.24 + vis.relative * 0.5 }}
              />
              {checked && (
                <path
                  className="sb-check"
                  d={`M ${pos.x - r * 0.44} ${pos.y + r * 0.04} L ${pos.x - r * 0.08} ${pos.y + r * 0.38} L ${pos.x + r * 0.5} ${pos.y - r * 0.32}`}
                  pathLength={1}
                />
              )}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r + 4.5}
                pathLength={1}
                className="sb-node-ring"
                style={{ strokeDasharray: `${conf} 1` }}
                transform={`rotate(-90 ${pos.x} ${pos.y})`}
              />
              {showLabels && (
                <text x={pos.x} y={pos.y - r - 9} className="sb-node-label">
                  {SIGNAL_LABELS[id]}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* Traveling pulses (§29) */}
      <g className="sb-pulses" aria-hidden="true">
        {pulses.map((pulse) => (
          <circle
            key={pulse.id}
            r={pulse.kind === "synthesis" ? 3.4 : 2.6}
            className={`sb-pulse sb-pulse--${pulse.kind}`}
            style={{
              offsetPath: `path("${pulse.d}")`,
              animationDuration: `${pulse.duration}ms`,
              animationDelay: `${pulse.delay}ms`,
            }}
            onAnimationEnd={() => setPulses((p) => p.filter((x) => x.id !== pulse.id))}
          />
        ))}
        {!reducedMotion &&
          (phase === "idle" || phase === "settle") &&
          ambientEdges.map((edge, i) => {
            const a = sigPos(edge.from);
            const b = edge.toKind === "signal" ? sigPos(edge.to as Signal) : PATHWAY_ANCHORS[edge.to as Pathway];
            return (
              <circle
                key={`amb-${edge.key}`}
                r={1.8}
                className="sb-ambient"
                style={{
                  offsetPath: `path("${curveBetween(a, b, 0.28, jitter(edge.key, "bow") * 22)}")`,
                  animationDuration: `${9 + i * 3.5}s`,
                  animationDelay: `${i * 2.2}s`,
                }}
              />
            );
          })}
      </g>

      {/* Outcome gravity well (§8) */}
      <g className="sb-outcome" aria-hidden="true" style={{ opacity: outcomeOpacity }}>
        {[16, 30, 48].map((r, i) => (
          <circle key={r} cx={model.outcome.x} cy={model.outcome.y} r={r} className={`sb-outcome-ring sb-outcome-ring--${i}`} />
        ))}
        <circle cx={model.outcome.x} cy={model.outcome.y} r={5.5} className="sb-outcome-core" />
      </g>
    </svg>
  );
});

export default SignalBrain;
