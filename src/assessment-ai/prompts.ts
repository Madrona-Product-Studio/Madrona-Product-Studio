// The two prompts behind /api/read-assist, kept in one place so the honesty
// constraints are easy to see and to change together.
//
// Why these constraints exist: the assessment's whole promise is that every
// line derives from what the visitor said. The model is never asked to
// judge the business or invent a recommendation. In "chips" mode it may only
// pick from the fixed twelve-chip taxonomy (so a suggestion is always
// something the deterministic engine already knows how to handle), and the
// visitor still has to tap to add it. In "bridge" mode it may only restate
// what the rule-generated lines and the answer summary already say, in the
// studio's voice: reflect, don't sell; no new capability claims; no numbers
// (no percentages, no hour counts, no "3x"); no em-dashes; at most sixty
// words. The server re-checks the length, digit, and dash rules and drops
// the paragraph if the model slips, so a bad output degrades to nothing.

import { openerChips, type ChipId } from "../pages/v3/opportunityEngine.js";

export const CHIP_IDS: ChipId[] = openerChips.map(c => c.chip);

// Model: a small, fast one; the tasks are classification and a short
// paraphrase, and the client gives up after 3.5 s regardless.
export const ASSIST_MODEL = "claude-haiku-4-5";

export const CHIP_SYSTEM = [
  "You read one sentence a small-business owner wrote about what eats their week and match it to a fixed list of twelve jobs.",
  "Return up to three job ids from the list, most likely first, each with a one-line reason in plain words that quotes or closely paraphrases what they wrote.",
  "Only suggest a job the text actually points at. If nothing matches, return an empty list. Never invent a job outside the list, never suggest one already flagged, and never add advice.",
  "Reasons: under fifteen words, no numbers, no dashes, no exclamation marks, no marketing language.",
  "",
  "The twelve jobs (id: what it means):",
  ...openerChips.map(c => `${c.chip}: ${c.label}`),
].join("\n");

export const CHIP_SCHEMA = {
  type: "object",
  properties: {
    suggestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          chip: { type: "string", enum: CHIP_IDS },
          reason: { type: "string" },
        },
        required: ["chip", "reason"],
        additionalProperties: false,
      },
    },
  },
  required: ["suggestions"],
  additionalProperties: false,
} as const;

export const BRIDGE_SYSTEM = [
  "You write for Madrona Product Studio, a small senior product studio in the Pacific Northwest. Voice: we, direct, warm, plain, editorial, restrained.",
  "You are given the title of a short written read, the lines the read already says under \"What we heard\", and a summary of what the visitor answered.",
  "Write two or three sentences, at most sixty words, that connect those lines: what they have in common, what the week they describe sounds like.",
  "Rules, all hard: reflect what they said back to them; do not sell, do not recommend, do not promise, do not name a product, tool, or capability that is not already in the lines; no numbers of any kind, no percentages, no hour counts; no em-dashes or en-dashes; no exclamation marks; no bullet points; no headings; no greeting.",
  "If the lines do not support two honest sentences, return an empty string.",
].join("\n");

export const BRIDGE_SCHEMA = {
  type: "object",
  properties: { paragraph: { type: "string" } },
  required: ["paragraph"],
  additionalProperties: false,
} as const;

// The server-side re-check of the bridge rules. Returns the paragraph or
// null; a failure here means the card shows the rule lines alone.
export function checkBridge(text: string): string | null {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return null;
  if (/[–—\d%!#*]/.test(t)) return null;
  const words = t.split(" ").length;
  if (words < 12 || words > 60) return null;
  const sentences = t.split(/[.?]\s/).length;
  if (sentences > 3) return null;
  return t;
}
