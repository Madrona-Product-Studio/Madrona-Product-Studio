// The /thinking feed — single source of truth for the studio's published
// entries. Consumed by the feed page (MadronaV2Pov) and the related-reading
// module at the foot of each article. Published work only; order is Charlie's.
import type { PovMotif } from "../pages/lab/PovThumb";

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
  {
    date: "Aug 2026",
    type: "Essay",
    title: "The Madrona Product Thesis",
    excerpt: "A working theory of how great software gets built in the AI era, and what that changes about product leadership.",
    href: "/thesis",
    motif: "target",
  },
  {
    date: "Aug 2026",
    type: "Artifact",
    title: "The engine behind everything we ship",
    excerpt: "Fifteen years of product judgment, encoded into a platform every project inherits, held to the same gates, and compounding with every launch.",
    href: "/thinking/under-the-hood",
    motif: "modules",
  },
  {
    date: "Aug 2026",
    type: "Essay",
    title: "The era of agentic operations",
    excerpt: "A business can now run on one source of truth and agents on a rhythm, with a person firmly in charge. What changes, and how to start small.",
    href: "/thinking/the-era-of-agentic-operations",
    motif: "flow",
  },
  {
    date: "Aug 2026",
    type: "Guide",
    title: "A starter guide to building real software with AI",
    excerpt: "The piece I wish someone had handed me on day one: the tools, the setup, the working prompts, and the habits that take you from zero to shipping.",
    href: "/thinking/starter-guide-to-building-with-ai",
    motif: "structure",
  },
  {
    date: "Aug 2026",
    type: "Essay",
    title: "Solve the system, not the symptom",
    excerpt: "The higher-leverage fix is rarely the output in front of you. It is the system that produced it. Why AI made fixing the machine the default, the prompts that help you do it, and how to tell which symptoms are worth it.",
    href: "/thinking/solve-the-system-not-the-symptom",
    motif: "source",
  },
];
