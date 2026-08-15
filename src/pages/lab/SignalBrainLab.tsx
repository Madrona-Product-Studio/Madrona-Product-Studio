// Signal Brain lab — mandatory art-direction harness (spec 03 §32).
// TEMP route, unlinked from the public site. Remove before the assessment ships.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SignalBrain from "../../components/assessment/SignalBrain.tsx";
import type { BrainPhase, SignalBrainHandle } from "../../components/assessment/SignalBrain.tsx";
import { QUESTIONS } from "../../assessment/data/questions.ts";
import { FIXTURES, TEST_PROFILES } from "../../assessment/data/fixtures.ts";
import type { TestProfile } from "../../assessment/data/fixtures.ts";
import { PATHWAY_COPY, PATHWAY_FORMULAS, SIGNAL_LABELS } from "../../assessment/data/pathways.ts";
import { computeEngineState, computeResult } from "../../assessment/engine/index.ts";
import { fullSetSignalCeilings } from "../../assessment/engine/scoreSignals.ts";
import { maxPossiblePathwayScore } from "../../assessment/engine/scorePathways.ts";
import { generateCurrentRead } from "../../assessment/brain/currentRead.ts";
import { PATHWAYS, SIGNALS } from "../../assessment/types.ts";
import type { AnswerMap, EngineState, Signal } from "../../assessment/types.ts";
import "./signal-brain-lab.css";

const CEILINGS = fullSetSignalCeilings();
const EMPTY_SLIDERS = Object.fromEntries(SIGNALS.map((s) => [s, 0])) as Record<Signal, number>;

function syntheticState(
  sliders: Record<Signal, number>,
  confidence: number,
  answeredCount: number,
): EngineState {
  const raw = Object.fromEntries(
    SIGNALS.map((s) => [s, (sliders[s] / 100) * CEILINGS[s]]),
  ) as Record<Signal, number>;
  const maxRel = Math.max(...SIGNALS.map((s) => raw[s]), 0.0001);
  const signals = Object.fromEntries(
    SIGNALS.map((s) => [
      s,
      {
        raw: raw[s],
        absoluteStrength: sliders[s] / 100,
        relativeStrength: raw[s] / maxRel,
        evidenceCount: sliders[s] > 0 ? 1 : 0,
        confidence,
      },
    ]),
  ) as EngineState["signals"];

  const pathwayRaw = Object.fromEntries(
    PATHWAYS.map((p) => [
      p,
      SIGNALS.reduce((sum, s) => sum + raw[s] * (PATHWAY_FORMULAS[p][s] ?? 0), 0),
    ]),
  ) as Record<(typeof PATHWAYS)[number], number>;
  const maxPathway = Math.max(...PATHWAYS.map((p) => pathwayRaw[p]), 0.0001);
  const pathways = Object.fromEntries(
    PATHWAYS.map((p) => {
      const ceiling = maxPossiblePathwayScore(p, QUESTIONS);
      return [
        p,
        {
          raw: pathwayRaw[p],
          absoluteStrength: Math.min(1, pathwayRaw[p] / ceiling),
          relativeStrength: pathwayRaw[p] / maxPathway,
          normalized: Math.round(Math.min(1, pathwayRaw[p] / ceiling) * 100),
        },
      ];
    }),
  ) as EngineState["pathways"];

  const ranked = [...PATHWAYS].sort(
    (a, b) => pathways[b].absoluteStrength - pathways[a].absoluteStrength,
  );
  const gap = pathways[ranked[0]].absoluteStrength - pathways[ranked[1]].absoluteStrength;
  return {
    answers: {},
    answeredCount,
    signals,
    pathways,
    primaryPathway: ranked[0],
    secondaryPathway: ranked[1],
    pathwayGap: gap,
    certainty: Math.min(1, Math.max(0, gap / 0.32)),
    readiness: null,
  };
}

function partialAnswers(profile: TestProfile, step: number): AnswerMap {
  const all = FIXTURES[profile].answers;
  const out: AnswerMap = {};
  QUESTIONS.slice(0, step).forEach((q) => {
    out[q.id] = all[q.id];
  });
  return out;
}

export default function SignalBrainLab() {
  const [mode, setMode] = useState<"sliders" | "profile">("profile");
  const [profile, setProfile] = useState<TestProfile>("duct-tape");
  const [step, setStep] = useState(7);
  const [sliders, setSliders] = useState<Record<Signal, number>>({ ...EMPTY_SLIDERS, operations: 70, systems: 62 });
  const [confidence, setConfidence] = useState(0.7);
  const [synthAnswered, setSynthAnswered] = useState(5);
  const [phase, setPhase] = useState<BrainPhase>("idle");
  const [playing, setPlaying] = useState(false);

  const [showLabels, setShowLabels] = useState(true);
  const [showAnchors, setShowAnchors] = useState(true);
  const [showEvidence, setShowEvidence] = useState(true);
  const [showRawEdges, setShowRawEdges] = useState(false);
  const [showBounds, setShowBounds] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [fps, setFps] = useState(0);
  const [lastRead, setLastRead] = useState<string | null>(null);

  const brain = useRef<SignalBrainHandle>(null);
  const prevState = useRef<EngineState | null>(null);
  const playTimer = useRef<number | null>(null);

  const state = useMemo(() => {
    if (mode === "profile") return computeEngineState(partialAnswers(profile, step));
    return syntheticState(sliders, confidence, synthAnswered);
  }, [mode, profile, step, sliders, confidence, synthAnswered]);

  const result = useMemo(
    () => (mode === "profile" && step === 7 ? computeResult(FIXTURES[profile].answers) : null),
    [mode, profile, step],
  );

  // Current-read line, updated on settled state changes.
  useEffect(() => {
    if (state.answeredCount === 0 && SIGNALS.every((s) => state.signals[s].raw === 0)) {
      setLastRead(null);
    } else {
      const read = generateCurrentRead(state, prevState.current, lastRead);
      if (read) setLastRead(read);
    }
    prevState.current = state;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // FPS meter.
  useEffect(() => {
    let frames = 0;
    let start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      frames += 1;
      if (now - start >= 1000) {
        setFps(Math.round((frames * 1000) / (now - start)));
        frames = 0;
        start = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const evidenceIdAt = useCallback(
    (p: TestProfile, s: number): string | undefined => {
      if (s < 1) return undefined;
      const q = QUESTIONS[s - 1];
      const a = FIXTURES[p].answers[q.id];
      return a ? `${q.id}:${a}` : undefined;
    },
    [],
  );

  const stepForward = useCallback(() => {
    setStep((current) => {
      const next = Math.min(7, current + 1);
      if (next !== current) {
        window.setTimeout(() => brain.current?.runAnswerSequence(evidenceIdAt(profile, next)), 40);
      }
      return next;
    });
  }, [profile, evidenceIdAt]);

  const stopPlay = useCallback(() => {
    setPlaying(false);
    if (playTimer.current != null) {
      window.clearInterval(playTimer.current);
      playTimer.current = null;
    }
  }, []);

  const playProfile = useCallback(() => {
    stopPlay();
    setMode("profile");
    setStep(0);
    setPlaying(true);
    brain.current?.trigger("idle");
    let s = 0;
    playTimer.current = window.setInterval(() => {
      s += 1;
      if (s > 7) {
        stopPlay();
        window.setTimeout(() => brain.current?.trigger("synthesize"), 700);
        return;
      }
      setStep(s);
      brain.current?.runAnswerSequence(evidenceIdAt(profile, s));
    }, 2400);
  }, [profile, evidenceIdAt, stopPlay]);

  useEffect(() => () => stopPlay(), [stopPlay]);

  const selectProfile = (next: TestProfile | "empty") => {
    stopPlay();
    brain.current?.trigger("idle");
    if (next === "empty") {
      setMode("sliders");
      setSliders({ ...EMPTY_SLIDERS });
      return;
    }
    setMode("profile");
    setProfile(next);
    setStep(7);
  };

  const replay = useCallback(() => {
    if (mode === "profile" && step > 0) {
      const s = step;
      setStep(s - 1);
      window.setTimeout(() => {
        setStep(s);
        brain.current?.runAnswerSequence(evidenceIdAt(profile, s));
      }, 420);
    } else {
      brain.current?.runAnswerSequence();
    }
  }, [mode, step, profile, evidenceIdAt]);

  const strongest = [...SIGNALS]
    .sort((a, b) => state.signals[b].relativeStrength - state.signals[a].relativeStrength)
    .slice(0, 3)
    .filter((s) => state.signals[s].relativeStrength > 0.2);

  return (
    <div className="sbl">
      <aside className="sbl-rail">
        <header className="sbl-head">
          <p className="sbl-eyebrow">Madrona · internal lab</p>
          <h1>Signal Brain</h1>
        </header>

        <section className="sbl-group">
          <h2>Test profile</h2>
          <select
            value={mode === "sliders" ? "empty" : profile}
            onChange={(e) => selectProfile(e.target.value as TestProfile | "empty")}
          >
            <option value="empty">Empty (sliders)</option>
            {TEST_PROFILES.map((p) => (
              <option key={p} value={p}>
                {FIXTURES[p].name}
              </option>
            ))}
          </select>
          {mode === "profile" && (
            <div className="sbl-run">
              <button onClick={playProfile} disabled={playing}>
                {playing ? "Playing…" : "▶ Play Q1–Q7"}
              </button>
              <button onClick={stepForward} disabled={playing || step >= 7}>
                Step ({step}/7)
              </button>
              <button
                onClick={() => {
                  stopPlay();
                  setStep(0);
                  brain.current?.trigger("idle");
                }}
              >
                Reset
              </button>
            </div>
          )}
        </section>

        <section className="sbl-group">
          <h2>Phase</h2>
          <div className="sbl-phases">
            {(["idle", "ingest", "propagate", "rebalance", "synthesize", "locked"] as BrainPhase[]).map(
              (p) => (
                <button
                  key={p}
                  className={phase === p ? "is-active" : ""}
                  onClick={() => brain.current?.trigger(p, evidenceIdAt(profile, step))}
                >
                  {p}
                </button>
              ),
            )}
            <button onClick={replay}>replay</button>
          </div>
        </section>

        <section className="sbl-group">
          <h2>Signals {mode === "profile" ? "(from profile — switch to Empty to drive)" : ""}</h2>
          {SIGNALS.map((s) => {
            const value =
              mode === "profile"
                ? Math.round(state.signals[s].absoluteStrength * 100)
                : sliders[s];
            return (
              <label key={s} className="sbl-slider">
                <span>
                  {SIGNAL_LABELS[s]}
                  <em>{value}</em>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  disabled={mode === "profile"}
                  onChange={(e) =>
                    setSliders((prev) => ({ ...prev, [s]: Number(e.target.value) }))
                  }
                />
              </label>
            );
          })}
          {mode === "sliders" && (
            <>
              <label className="sbl-slider">
                <span>
                  Confidence<em>{confidence.toFixed(2)}</em>
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={confidence * 100}
                  onChange={(e) => setConfidence(Number(e.target.value) / 100)}
                />
              </label>
              <label className="sbl-slider">
                <span>
                  Questions answered<em>{synthAnswered}</em>
                </span>
                <input
                  type="range"
                  min={0}
                  max={7}
                  value={synthAnswered}
                  onChange={(e) => setSynthAnswered(Number(e.target.value))}
                />
              </label>
            </>
          )}
        </section>

        <section className="sbl-group">
          <h2>Debug</h2>
          {(
            [
              ["Labels", showLabels, setShowLabels],
              ["Pathway anchors", showAnchors, setShowAnchors],
              ["Evidence nodes", showEvidence, setShowEvidence],
              ["Raw edges", showRawEdges, setShowRawEdges],
              ["Geometry bounds", showBounds, setShowBounds],
              ["Reduced motion", reducedMotion, setReducedMotion],
            ] as const
          ).map(([label, value, set]) => (
            <label key={label} className="sbl-toggle">
              <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} />
              {label}
            </label>
          ))}
        </section>
      </aside>

      <main className="sbl-stage">
        <div className="sbl-stage-head">
          <p className="sbl-live">
            <i /> Live pathway
          </p>
          <p className="sbl-read">{lastRead ?? "Waiting for signals."}</p>
        </div>
        <div className="sbl-canvas">
          <SignalBrain
            ref={brain}
            state={state}
            reducedMotion={reducedMotion}
            showLabels={showLabels}
            showPathwayAnchors={showAnchors}
            showEvidence={showEvidence}
            showRawEdges={showRawEdges}
            showBounds={showBounds}
            onPhaseChange={setPhase}
          />
        </div>
        <footer className="sbl-metrics">
          <span>{fps} fps</span>
          <span>phase {phase}</span>
          <span>
            primary <b>{PATHWAY_COPY[state.primaryPathway].name}</b>
          </span>
          <span>
            secondary <b>{PATHWAY_COPY[state.secondaryPathway].name}</b>
          </span>
          <span>certainty {state.certainty.toFixed(2)}</span>
          <span>gap {state.pathwayGap.toFixed(3)}</span>
          {strongest.length > 0 && (
            <span>top {strongest.map((s) => SIGNAL_LABELS[s]).join(" · ")}</span>
          )}
          {result && (
            <span className="sbl-archetype">
              → {result.archetype.name}
              {result.usedFallback ? " [fallback]" : ""}
            </span>
          )}
        </footer>
        <footer className="sbl-scores">
          {PATHWAYS.map((p) => (
            <div key={p} className={p === state.primaryPathway ? "is-primary" : ""}>
              <span>{PATHWAY_COPY[p].name}</span>
              <div className="sbl-bar">
                <i style={{ width: `${Math.round(state.pathways[p].absoluteStrength * 100)}%` }} />
              </div>
              <em>{state.pathways[p].normalized}</em>
            </div>
          ))}
        </footer>
      </main>
    </div>
  );
}
