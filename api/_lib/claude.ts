/**
 * The one Claude client for the api/ functions.
 *
 * Key comes from ANTHROPIC_API_KEY in the Vercel project (all environments).
 * When it is unset, `claudeClient()` returns null and every caller degrades:
 * /api/agent-demo answers 503 with a friendly note, and /api/contact simply
 * skips its triage line. Nothing a visitor pastes is logged here or anywhere
 * downstream; the inputs go to the model and the result goes back, that's it.
 */
import Anthropic from "@anthropic-ai/sdk";

// One model for both routes, run at low effort: the tasks are short
// classification and drafting jobs, and low effort keeps the round trip
// inside the route timeouts (4 s for triage, 20 s for the demo).
export const MODEL = "claude-opus-5";

let client: Anthropic | null | undefined;

export function claudeClient(): Anthropic | null {
  if (client !== undefined) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  client = apiKey ? new Anthropic({ apiKey, maxRetries: 0 }) : null;
  return client;
}
