// The /thinking feed — single source of truth for the studio's published
// entries. Consumed by the feed page (MadronaV2Pov) and the related-reading
// module at the foot of each article. Published work only.
// ORDER IS CURATED, not chronological (Charlie, 2026-08-17): read-first
// order — the thesis leads, then the era piece, then the starter guide.
// New entries slot in wherever they belong, not at the end.
import type { PovMotif } from "../pages/lab/PovThumb.jsx";
import { publishedLabel } from "./siteMeta.mjs";

// Dates derive from the article table (the same field the JSON-LD uses).
const dated = (href: string) => publishedLabel(href, { short: true });

export type ThinkingType = "Artifact" | "Essay" | "Learning" | "Guide" | "Announcement";

export type ThinkingEntry = {
  date: string;
  type: ThinkingType;
  title: string;
  excerpt: string;
  href: string;
  motif: PovMotif;
};

export const thinkingEntries: ThinkingEntry[] = [
  // The two Start-here pieces (2026-09-30) lead the feed: they are where a
  // visitor looking for help should begin.
  {
    date: dated("/thinking/getting-started-with-ai"),
    type: "Guide",
    title: "Getting started with AI: a plain-language guide for owners",
    excerpt: "What AI is actually good at today, three safe first projects, what to avoid, what it costs, and how to spend your first week.",
    href: "/thinking/getting-started-with-ai",
    motif: "target",
  },
  {
    date: dated("/thinking/ai-prompt-starter-pack"),
    type: "Artifact",
    title: "An AI prompt starter pack for small business owners",
    excerpt: "Nine copy-and-paste prompts for answering customers, handling paperwork, and keeping track of the week. Works in ChatGPT, Claude, Gemini, or Copilot.",
    href: "/thinking/ai-prompt-starter-pack",
    motif: "modules",
  },
  {
    date: dated("/thesis"),
    type: "Essay",
    title: "The Madrona Product Thesis",
    excerpt: "A working theory of how great software gets built in the AI era, and what that changes about product leadership.",
    href: "/thesis",
    motif: "target",
  },
  {
    date: dated("/thinking/the-era-of-agentic-operations"),
    type: "Essay",
    title: "The era of agentic operations",
    excerpt: "A business can now run on one source of truth and agents on a rhythm, with a person firmly in charge. What changes, and how to start small.",
    href: "/thinking/the-era-of-agentic-operations",
    motif: "flow",
  },
  {
    date: dated("/thinking/starter-guide-to-building-with-ai"),
    type: "Guide",
    title: "A starter guide to building real software with AI",
    excerpt: "The piece I wish someone had handed me on day one: the tools, the setup, the working prompts, and the habits that take you from zero to shipping.",
    href: "/thinking/starter-guide-to-building-with-ai",
    motif: "structure",
  },
  {
    date: dated("/thinking/ai-tools-for-small-business"),
    type: "Artifact",
    title: "The 12 jobs AI tools already do for small businesses",
    excerpt: "A living inventory of what out-of-the-box AI handles today, indexed by the problem rather than the product: the close, the invoices, the emails, the ads. Each entry with what it needs from you and where it ends.",
    href: "/thinking/ai-tools-for-small-business",
    motif: "inventory",
  },
  {
    date: dated("/thinking/solve-the-system-not-the-symptom"),
    type: "Essay",
    title: "Solve the system, not the symptom",
    excerpt: "The higher-leverage fix is rarely the output in front of you. It is the system that produced it. Why AI made fixing the machine the default, the prompts that help you do it, and how to tell which symptoms are worth it.",
    href: "/thinking/solve-the-system-not-the-symptom",
    motif: "source",
  },
  {
    date: dated("/thinking/under-the-hood"),
    type: "Artifact",
    title: "The engine behind everything we ship",
    excerpt: "Hard-won product judgment, encoded into a platform every project inherits, held to the same gates, and compounding with every launch.",
    href: "/thinking/under-the-hood",
    motif: "modules",
  },
];
