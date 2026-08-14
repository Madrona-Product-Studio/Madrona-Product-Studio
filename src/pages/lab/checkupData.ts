// Shared data + deterministic logic for the AI checkup experience.
// Used by every checkup interface variant; the interface files own only
// presentation. Questions are representative, not sacred (Charlie,
// 2026-08-14) — variants may re-voice them, but archetypes + scoring live
// here so results stay consistent.

export type ArchetypeId = "secret" | "ducttape" | "skeptic" | "onevisit" | "founder";

export const BUSINESSES = [
  ["retail", "Retail or online store"],
  ["food-farm", "Food and farm"],
  ["services", "Services and appointments"],
  ["hospitality", "Hospitality and travel"],
  ["wellness", "Health and wellness"],
  ["other", "Something else"],
] as const;

// The heart of the checkup: the settled problem voice, one statement per row.
export const STATEMENTS = [
  ["web-ok", "The website's just ok."],
  ["texts-me", "Ordering still means somebody texts me."],
  ["hours", "I lose hours every week to stuff a computer should be doing."],
  ["one-time", "People buy once, then I never hear from them again."],
  ["ai-lost", "Everyone says AI would help. I wouldn't know where to start."],
  ["idea", "I've got an idea, but I'm not spending real money until I know people will pay."],
  ["burned", "I paid someone to fix things once. It came back half-finished."],
  ["no-time", "I can't stop running the business to fix the business."],
] as const;

export const AI_TRIED = [
  ["nothing", "Nothing yet"],
  ["chatgpt", "ChatGPT here and there"],
  ["experiments", "A few experiments that didn't stick"],
  ["running", "Something running for real"],
] as const;

export const WINS = [
  ["new-customers", "More new customers"],
  ["repeat", "More repeat customers"],
  ["hours", "Hours back every week"],
  ["clarity", "A clearer picture of the business"],
  ["idea", "Getting the new idea off the ground"],
] as const;

export const label = (pairs: readonly (readonly [string, string])[], id: string) =>
  pairs.find(([k]) => k === id)?.[1] ?? id;

// Mirrors api/checkup.ts (prototype duplication; server is authoritative).
export function deriveStage(aiTried: string) {
  switch (aiTried) {
    case "nothing": return { label: "Haven't started", note: "No AI in the business yet. The first move matters more than the start date." };
    case "chatgpt": return { label: "Poking at it", note: "Using AI personally, nothing wired into how the business runs yet." };
    case "experiments": return { label: "Tried, nothing stuck", note: "Experiments disconnected from real work. Most businesses are right here." };
    default: return { label: "Running for real", note: "Something is genuinely in production. The question is what earns its place next." };
  }
}

// The owner archetypes — the Lila traveler-profile move. Each "help" line is
// the proven verb-first answer copy from the 7/21 question rows.

export const ARCHETYPES: Record<ArchetypeId, {
  name: string;
  portrait: string;
  range: string; // the field-guide one-liner under the plate
  help: string;
  doors: { title: string; to: string }[];
}> = {
  secret: {
    name: "The Best-Kept Secret",
    portrait: "Great at the work, undersold by the website. People who find you love you. The problem is the finding.",
    range: "Range: everywhere good work goes underpriced. Rarely photographed.",
    help: "We build the brand, site, content, and store that finally match the work.",
    doors: [
      { title: "Build trust", to: "/consulting#brand-and-web" },
      { title: "Grow your business", to: "/consulting#customers-and-growth" },
    ],
  },
  ducttape: {
    name: "The Duct-Tape Operator",
    portrait: "The business runs on texts, spreadsheets, and memory. It works, because you personally hold it together every week.",
    range: "Habitat: the front counter, the back office, and the inbox, simultaneously.",
    help: "We map how the work actually happens, then build the tools and agents that hand the busywork to software. Channels you own: online ordering, booking, fulfillment.",
    doors: [
      { title: "Work smarter", to: "/consulting#operations-and-ai" },
      { title: "Grow your business", to: "/consulting#customers-and-growth" },
    ],
  },
  skeptic: {
    name: "The Curious Skeptic",
    portrait: "You're pretty sure AI could help the business. Nobody has shown you how, and you're not buying the hype.",
    range: "Diet: proof. Will wait as long as it takes.",
    help: "We work in AI every day. We'll tell you straight where it pays off for your business, and where it won't.",
    doors: [{ title: "Work smarter", to: "/consulting#operations-and-ai" }],
  },
  onevisit: {
    name: "The One-Visit Wonder",
    portrait: "Customers show up, love it, and vanish. The product isn't the problem. The path back is.",
    range: "Sightings: unforgettable. Return schedule: unknown.",
    help: "We give customers useful reasons to return: repeat ordering, memberships, follow-up that doesn't depend on anyone's memory.",
    doors: [{ title: "Grow your business", to: "/consulting#customers-and-growth" }],
  },
  founder: {
    name: "The Kitchen-Table Founder",
    portrait: "The idea is real and it won't leave you alone. You just don't want to bet real money before real people say yes.",
    range: "Migration: upstream, always. Carries everything it owns.",
    help: "We get you real customer signal before real money: concept tests, smoke tests, a prototype kept deliberately small.",
    doors: [{ title: "Build something worth using", to: "/consulting#new-products" }],
  },
};

export function scoreArchetypes(statements: string[], aiTried: string, win: string) {
  const s = new Map<ArchetypeId, number>();
  const bump = (id: ArchetypeId, by: number) => s.set(id, (s.get(id) ?? 0) + by);
  const has = (id: string) => statements.includes(id);

  if (has("web-ok")) bump("secret", 2);
  if (has("texts-me")) { bump("ducttape", 2); bump("onevisit", 1); }
  if (has("hours")) bump("ducttape", 2);
  if (has("one-time")) bump("onevisit", 2);
  if (has("ai-lost")) bump("skeptic", 2);
  if (has("idea")) bump("founder", 3);
  if (has("burned")) bump("secret", 1);
  if (has("no-time")) bump("ducttape", 1);

  if (win === "new-customers") bump("secret", 2);
  if (win === "repeat") bump("onevisit", 2);
  if (win === "hours") bump("ducttape", 2);
  if (win === "clarity") { bump("ducttape", 1); bump("skeptic", 1); }
  if (win === "idea") bump("founder", 3);
  if ((aiTried === "nothing" || aiTried === "chatgpt") && has("ai-lost")) bump("skeptic", 1);
  if (aiTried === "experiments") bump("skeptic", 1);

  const ranked = [...s.entries()].sort((a, b) => b[1] - a[1]);
  const primary: ArchetypeId = ranked[0]?.[0] ?? "skeptic";
  const secondary = ranked[1] && ranked[1][1] >= 2 ? ranked[1][0] : null;
  return { primary, secondary };
}


// Distinct per-archetype fallback copy so a deterministic read never
// repeats the portrait/help lines verbatim.
export const OFFLINE_ANGLES: Record<ArchetypeId, { problem: string; opportunity: string }> = {
  secret: {
    problem: "The gap is between how good the work is and how it reads online. New customers can't see what regulars already know.",
    opportunity: "Closing that gap is very doable, and it usually pays back in the numbers you already watch: calls, orders, bookings.",
  },
  ducttape: {
    problem: "You are the software. Orders, reminders, and follow-ups run through your attention, and your attention is the scarcest thing in the business.",
    opportunity: "The unglamorous automations usually pay first: the re-typing, the reminders, the questions you answer twenty times a week.",
  },
  skeptic: {
    problem: "The blocker isn't the tools, it's translation. Nobody has connected what AI can do to what your week actually looks like.",
    opportunity: "A straight answer exists for your business: where AI genuinely pays off, and where it honestly won't. Getting that answer is a small job, not a leap of faith.",
  },
  onevisit: {
    problem: "First visits are working. The path back isn't built yet, so every month starts from zero.",
    opportunity: "A useful reason to return beats any amount of new marketing, and it is usually cheaper to build.",
  },
  founder: {
    problem: "The risk isn't the idea, it's spending real money before real people have said yes.",
    opportunity: "Demand can be tested small and cheap, before a real budget is committed. Most ideas should be tested exactly that way.",
  },
};

