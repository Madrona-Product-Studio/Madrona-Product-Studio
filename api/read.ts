/**
 * "Email me this read" — Vercel Serverless Function.
 *
 * Receives { email, r, company } from the assessment result, rebuilds the
 * report on the server from the permalink code (so nobody can use this to
 * send arbitrary text), and sends it via Resend: the plain-text read to the
 * visitor, and a copy to the studio with the visitor's email as reply-to
 * plus the chips, moves, and free text so Charlie sees the context.
 *
 * Same env vars as api/contact.ts:
 *   RESEND_API_KEY, CONTACT_TO, CONTACT_FROM
 *
 * Best-effort in-memory rate limit per IP; the real one is a Vercel WAF
 * rule on /api/read. Local testing requires `vercel dev`.
 */

import { computeOpportunityReport, isComplete, summarizeAnswers, chipShort } from "../src/pages/v3/opportunityEngine";
import { decodeAnswers, encodeAnswers } from "../src/pages/v3/readLink";
import { renderReadText, SITE_ORIGIN } from "../src/pages/v3/readText";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO = process.env.CONTACT_TO || "hello@madronaproduct.com";
const FROM = process.env.CONTACT_FROM || "Madrona Product Studio <hello@madronaproduct.com>";
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const hits = new Map<string, number[]>();

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

async function send(apiKey: string, message: Record<string, unknown>): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from: FROM, ...message }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
  return res.ok;
}

export async function POST(request: Request): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const email = String(data.email ?? "").trim();
  const code = String(data.r ?? "").trim();
  const honeypot = String(data.company ?? "").trim(); // bots fill hidden fields

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (honeypot) return json({ ok: true });

  if (!email || !EMAIL_RE.test(email) || email.length > 200) {
    return json({ error: "That email doesn't look right." }, 400);
  }
  const answers = decodeAnswers(code);
  if (!answers || !isComplete(answers)) {
    return json({ error: "That read couldn't be rebuilt. Try the Copy link button instead." }, 400);
  }

  if (rateLimited(clientIp(request))) {
    return json({ error: "That's a few in a row. Try again in a little while." }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "Email isn't set up yet. Use Copy link to keep this read." }, 500);
  }

  const report = computeOpportunityReport(answers);
  const permalink = `${SITE_ORIGIN}/ai-opportunities?r=${encodeAnswers(answers)}`;
  const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const text = renderReadText(report, { permalink, today });

  const toVisitor = await send(apiKey, {
    to: [email],
    subject: `Your read: ${report.title}`,
    text: `Here is the read you asked for, once, and nothing else.\n\n${text}`,
  });
  if (!toVisitor) {
    return json({ error: "Something went wrong sending it. Use Copy link to keep this read." }, 502);
  }

  const context = [
    `Visitor: ${email}`,
    `Read: ${report.title}`,
    `Flagged: ${answers.chips.map(c => chipShort[c]).join(", ")}`,
    `Moves: ${report.moves.map(m => `${m.rank}: ${m.move.headline}`).join(" · ") || "none"}`,
    `In their words: ${answers.otherText?.trim() || "(nothing written)"}`,
    "",
    summarizeAnswers(answers),
    "",
    permalink,
    "",
    "----",
    "",
    text,
  ].join("\n");
  await send(apiKey, {
    to: [TO],
    reply_to: email,
    subject: `Read emailed: ${report.title} (${email})`,
    text: context,
  });

  return json({ ok: true });
}
