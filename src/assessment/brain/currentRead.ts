// Deterministic "current read" one-liners from engine state (spec 03 §27, copy 04 §7).
import type { EngineState } from "../types.ts";

export function generateCurrentRead(
  state: EngineState,
  previous: EngineState | null,
  lastMessage: string | null,
): string | null {
  if (state.answeredCount === 0) return null;
  const s = state.signals;
  const candidates: string[] = [];

  if (previous) {
    const prevPrimary = previous.primaryPathway;
    const jumped =
      state.pathways[state.primaryPathway].absoluteStrength -
        previous.pathways[state.primaryPathway].absoluteStrength >
      0.18;
    if (state.answeredCount >= 5 && jumped) {
      candidates.push("Your desired outcome just sharpened the direction.");
    }
    if (
      state.primaryPathway === prevPrimary &&
      state.answeredCount >= 5 &&
      state.certainty > previous.certainty + 0.1
    ) {
      candidates.push("That confirms a pattern we were already seeing.");
    }
  }

  if (s.operations.relativeStrength > 0.6 && s.systems.relativeStrength > 0.6) {
    candidates.push("We’re seeing a relationship between process friction and disconnected systems.");
  }
  if (s.operations.relativeStrength > 0.6 && s.capacity.relativeStrength > 0.6) {
    candidates.push("Manual coordination and team capacity are starting to connect.");
  }
  if (s.product.relativeStrength > 0.6 && s.clarity.relativeStrength > 0.6) {
    candidates.push("There may be a real product opportunity here, but the shape is still forming.");
  }
  if (s.product.relativeStrength > 0.7 && s.clarity.relativeStrength < 0.45) {
    candidates.push("The opportunity looks increasingly buildable.");
  }
  if (s.trust.relativeStrength >= 0.99 && state.answeredCount >= 2) {
    candidates.push("The way the business shows up is becoming a stronger signal.");
  }
  if (s.acquisition.relativeStrength >= 0.99 && state.answeredCount >= 2) {
    candidates.push("Customer acquisition is emerging as a meaningful pressure point.");
  }
  if (s.retention.relativeStrength >= 0.99 && state.answeredCount >= 3) {
    candidates.push("The pattern is pointing beyond acquisition toward what happens after the first sale.");
  }
  if (state.pathwayGap < 0.07 && state.answeredCount >= 3) {
    candidates.push("Two paths are still plausible.");
  }
  if (state.certainty > 0.6 && state.answeredCount >= 4) {
    candidates.push("One path is starting to separate from the rest.");
  }
  if (state.answeredCount >= 2) {
    candidates.push("A few of these signals are starting to connect.");
  }
  candidates.push("Pattern forming.");

  return candidates.find((c) => c !== lastMessage) ?? null;
}
