/**
 * AI checkup — Vercel Serverless Function (PROTOTYPE).
 *
 * Receives the visitor's structured answers from /checkup and returns a short
 * written read drafted live by Claude, in the shape of the Madrona written
 * assessment (what we heard / central problem / strongest opportunity / what
 * better looks like / first move). Stage and door routing are deterministic;
 * only the narrative is generated.
 *
 * Required env var (set in the Vercel project):
 *   ANTHROPIC_API_KEY — without it the endpoint returns 503 and the client
 *                       falls back to a deterministic offline draft.
 *
 * Local testing requires `vercel dev` (functions don't run under `vite`).
 */
import Anthropic from "@anthropic-ai/sdk";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// Mirrors the client-side copy in MadronaV2Checkup.tsx (prototype duplication;
// server stays authoritative for the final read).
function deriveStage(aiTried: string): { label: string; note: string } {
  switch (aiTried) {
    case "nothing":
      return { label: "Haven't started", note: "No AI in the business yet. That is a fine place to be; the first move matters more than the start date." };
    case "chatgpt":
      return { label: "Poking at it", note: "Using AI tools personally, nothing wired into how the business runs yet." };
    case "experiments":
      return { label: "Tried, nothing stuck", note: "Experiments exist but are disconnected from real work. This is where most businesses are right now." };
    default:
      return { label: "Running for real", note: "Something is genuinely in production. The question becomes what earns its place next." };
  }
}

const DOOR_LABELS: Record<string, string> = {
  "operations-and-ai": "Work smarter",
  "customers-and-growth": "Grow your business",
  "brand-and-web": "Build trust",
  "new-products": "Build something worth using",
};

function deriveDoors(friction: string[], customerStuck: string[], win: string): string[] {
  const scores = new Map<string, number>();
  const bump = (id: string, by = 1) => scores.set(id, (scores.get(id) ?? 0) + by);
  if (friction.length) bump("operations-and-ai", friction.length + 1);
  for (const c of customerStuck) {
    if (c === "finding" || c === "understanding") bump("brand-and-web", 2);
    if (c === "ordering") bump("customers-and-growth", 2);
    if (c === "return") bump("customers-and-growth", 2);
  }
  if (win === "hours") bump("operations-and-ai", 2);
  if (win === "new-customers") bump("brand-and-web", 2);
  if (win === "repeat") bump("customers-and-growth", 2);
  if (win === "idea") bump("new-products", 3);
  if (win === "clarity") bump("operations-and-ai", 2);
  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => id);
}

const READ_SCHEMA = {
  type: "object",
  properties: {
    whatWeHeard: { type: "string", description: "1-2 sentences reflecting their answers back in plain language." },
    centralProblem: { type: "string", description: "1-2 sentences naming the highest-friction pattern." },
    strongestOpportunity: { type: "string", description: "1-2 sentences on where AI or better tooling would genuinely help first." },
    whatBetterLooksLike: { type: "string", description: "1 sentence, concrete and checkable, in the owner's terms." },
    firstMove: { type: "string", description: "1-2 sentences describing the smallest useful first step." },
  },
  required: ["whatWeHeard", "centralProblem", "strongestOpportunity", "whatBetterLooksLike", "firstMove"],
  additionalProperties: false,
} as const;

const SYSTEM = `You draft short written reads for Madrona Product Studio, a small senior product studio in Bellingham, Washington. A visitor answered a five-question checkup about their business; you write the honest mini version of Madrona's written assessment.

Voice rules, non-negotiable:
- Plain, warm, specific. Second person ("you", "your week").
- Symptom language, never consultant vocabulary (no "retention", "funnel", "digital transformation", "leverage synergies").
- No em-dashes anywhere. Use commas and periods.
- Never a score, percentage, or grade. Never a guarantee. Honest expectations only.
- No hype about AI. AI is a tool; where it will not help, say so.
- If their answers suggest things mostly work, say that plainly rather than inventing a problem.
- Each field: at most 2 short sentences. Total read under 180 words.`;

export async function POST(request: Request): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const business = String(data.business ?? "").slice(0, 60);
  const friction = (Array.isArray(data.friction) ? data.friction : []).map(String).slice(0, 8);
  const aiTried = String(data.aiTried ?? "").slice(0, 30);
  const customerStuck = (Array.isArray(data.customerStuck) ? data.customerStuck : []).map(String).slice(0, 8);
  const win = String(data.win ?? "").slice(0, 30);
  if (!business || !aiTried || !win) return json({ error: "Missing answers." }, 400);

  const stage = deriveStage(aiTried);
  const doors = deriveDoors(friction, customerStuck, win);

  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "offline" }, 503);

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Their answers:
- Kind of business: ${business}
- Where the week disappears (their words for repetitive friction): ${friction.join("; ") || "they did not flag any"}
- AI so far: ${stage.label}. ${stage.note}
- Where customers get stuck: ${customerStuck.join("; ") || "they say this part mostly works"}
- The one thing they want working better: ${win}

Madrona's internal routing put them nearest these service areas: ${doors.map((d) => DOOR_LABELS[d]).join(" and ")}. Do not name the service areas in the read; write the read so it naturally points that direction.

Write the read.`,
        },
      ],
      output_config: { format: { type: "json_schema", schema: READ_SCHEMA } },
    });

    const text = response.content.find((b) => b.type === "text")?.text;
    if (!text) return json({ error: "offline" }, 503);
    return json({ read: JSON.parse(text), stage, doors });
  } catch {
    return json({ error: "offline" }, 503);
  }
}
