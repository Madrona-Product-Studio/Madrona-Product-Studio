// CLI harness: verify every debug fixture resolves to its intended archetype.
// Run: node scripts/test-assessment-engine.ts   (Node 24 native type stripping)
import { FIXTURES, TEST_PROFILES } from "../src/assessment/data/fixtures.ts";
import { computeResult, finalSignalStrengths } from "../src/assessment/engine/index.ts";
import { SIGNALS } from "../src/assessment/types.ts";

let failures = 0;

for (const profile of TEST_PROFILES) {
  const fixture = FIXTURES[profile];
  const result = computeResult(fixture.answers);
  const ok = result.archetype.id === fixture.expectedArchetype;
  if (!ok) failures += 1;

  const strengths = finalSignalStrengths(fixture.answers);
  const strengthLine = SIGNALS.map(
    (s) => `${s.slice(0, 4)}:${strengths[s].toFixed(2)}`,
  ).join(" ");

  console.log(
    `${ok ? "PASS" : "FAIL"}  ${fixture.name.padEnd(20)} → ${result.archetype.id.padEnd(20)}` +
      ` (want ${fixture.expectedArchetype})${result.usedFallback ? " [FALLBACK]" : ""}`,
  );
  console.log(`      ${strengthLine}`);
  console.log(
    `      primary=${result.state.primaryPathway} secondary=${result.state.secondaryPathway}` +
      ` gap=${result.state.pathwayGap.toFixed(3)} certainty=${result.state.certainty.toFixed(2)}` +
      ` readiness=${result.state.readiness} rec="${result.recommendation.title}"`,
  );
  console.log(
    `      top: ${result.topSignals.map((t) => `${t.label} (${t.level})`).join(", ")}`,
  );
}

if (failures > 0) {
  console.error(`\n${failures} fixture(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${TEST_PROFILES.length} fixtures resolve as intended.`);
