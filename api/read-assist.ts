/**
 * AI assist for the opportunity assessment — Vercel Serverless Function.
 *
 * Two modes, both optional decoration on a deterministic flow:
 *   chips  — the visitor's free text → up to three chip ids from the fixed
 *            twelve-chip taxonomy, each with a one-line reason. The client
 *            only ever offers them; nothing is flagged without a tap.
 *   bridge — the rule-generated "What we heard" lines + the answer summary
 *            → two or three sentences that connect them. Reflect, don't
 *            sell; re-checked server-side (see src/assessment-ai/prompts.ts).
 *
 * Env: ANTHROPIC_API_KEY. When it is missing the function returns 204 and
 * the client silently does nothing. Per-request timeout 3.5 s; best-effort
 * in-memory rate limit per IP (the real one is a Vercel WAF rule on
 * /api/read-assist); responses cached by a hash of the input.
 *
 * Local testing requires `vercel dev` (functions don't run under `vite`).
 */

import Anthropic from "@anthropic-ai/sdk";
import { jsonSchemaOutputFormat } from "@anthropic-ai/sdk/helpers/json-schema";
import { createHash } from "node:crypto";
import {
  ASSIST_MODEL,
  BRIDGE_SCHEMA,
  BRIDGE_SYSTEM,
  CHIP_IDS,
  CHIP_SCHEMA,
  CHIP_SYSTEM,
  checkBridge,
} from "../src/assessment-ai/prompts.js";

const TIMEOUT_MS = 3500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 30;
const CACHE_MAX = 500;

// Best effort: the function instance may be recycled at any time and several
// may run at once. Enough to blunt a loop; a WAF rule is the real limit.
const hits = new Map<string, number[]>();
const cache = new Map<string, { status: number; body: string | null }>();

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function remember(key: string, status: number, body: string | null): Response {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
  cache.set(key, { status, body });
  return new Response(body, { status, headers: body ? { "content-type": "application/json" } : undefined });
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(null, { status: 204 });

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const mode = data.mode === "chips" || data.mode === "bridge" ? data.mode : null;
  if (!mode) return json({ error: "Invalid request." }, 400);

  if (rateLimited(clientIp(request))) return new Response(null, { status: 429 });

  const client = new Anthropic({ apiKey, maxRetries: 0, timeout: TIMEOUT_MS });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const options = { signal: controller.signal, timeout: TIMEOUT_MS };

  try {
    if (mode === "chips") {
      const text = String(data.text ?? "").replace(/\s+/g, " ").trim().slice(0, 200);
      const chips = Array.isArray(data.chips) ? data.chips.filter((c): c is string => typeof c === "string" && (CHIP_IDS as string[]).includes(c)).slice(0, 12) : [];
      if (text.length < 3) return json({ suggestions: [] });

      const key = createHash("sha256").update(`chips|${text}|${[...chips].sort().join(",")}`).digest("hex");
      const hit = cache.get(key);
      if (hit) return new Response(hit.body, { status: hit.status, headers: hit.body ? { "content-type": "application/json" } : undefined });

      const response = await client.messages.parse(
        {
          model: ASSIST_MODEL,
          max_tokens: 400,
          system: CHIP_SYSTEM,
          messages: [{
            role: "user",
            content: `Already flagged: ${chips.length ? chips.join(", ") : "nothing yet"}.\nWhat they wrote: "${text}"`,
          }],
          output_config: { format: jsonSchemaOutputFormat(CHIP_SCHEMA) },
        },
        options,
      );
      const parsed = response.stop_reason === "end_turn" ? response.parsed_output : null;
      const suggestions = (parsed?.suggestions ?? [])
        .filter(s => (CHIP_IDS as string[]).includes(s.chip) && !chips.includes(s.chip))
        .map(s => ({ chip: s.chip, reason: s.reason.replace(/[–—]/g, ",").slice(0, 120) }))
        .slice(0, 3);
      return remember(key, 200, JSON.stringify({ suggestions }));
    }

    // bridge
    const title = String(data.title ?? "").trim().slice(0, 120);
    const heard = Array.isArray(data.heard) ? data.heard.filter((l): l is string => typeof l === "string").map(l => l.slice(0, 400)).slice(0, 8) : [];
    const summary = String(data.summary ?? "").trim().slice(0, 1200);
    if (!title || heard.length < 2) return new Response(null, { status: 204 });

    const key = createHash("sha256").update(`bridge|${title}|${heard.join("|")}|${summary}`).digest("hex");
    const hit = cache.get(key);
    if (hit) return new Response(hit.body, { status: hit.status, headers: hit.body ? { "content-type": "application/json" } : undefined });

    const response = await client.messages.parse(
      {
        model: ASSIST_MODEL,
        max_tokens: 300,
        system: BRIDGE_SYSTEM,
        messages: [{
          role: "user",
          content: `Title: ${title}\n\nWhat we heard (already on the card):\n${heard.map(l => `- ${l}`).join("\n")}\n\nWhat they answered:\n${summary}`,
        }],
        output_config: { format: jsonSchemaOutputFormat(BRIDGE_SCHEMA) },
      },
      options,
    );
    const paragraph = response.stop_reason === "end_turn" ? checkBridge(response.parsed_output?.paragraph ?? "") : null;
    if (!paragraph) return remember(key, 204, null);
    return remember(key, 200, JSON.stringify({ paragraph }));
  } catch (err) {
    // Timeouts, rate limits upstream, refusals: the page shows the rule
    // lines alone. Log the class, not the visitor's text.
    console.error("read-assist", err instanceof Anthropic.APIError ? `${err.status} ${err.name}` : err instanceof Error ? err.name : "unknown");
    return new Response(null, { status: 204 });
  } finally {
    clearTimeout(timer);
  }
}
