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

// One model for both routes: the contact triage line and the two tool demos
// are short classification and drafting jobs where a mid-tier model is
// plenty and the round trip stays inside the route timeouts (4 s for
// triage, 20 s for the demo). The assessment assist uses the small fast
// model (src/assessment-ai/prompts.ts). Override per environment with
// ANTHROPIC_MODEL if a deploy wants to trade cost for judgment.
export const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

let client: Anthropic | null | undefined;

export function claudeClient(): Anthropic | null {
  if (client !== undefined) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  client = apiKey ? new Anthropic({ apiKey, maxRetries: 0 }) : null;
  return client;
}
