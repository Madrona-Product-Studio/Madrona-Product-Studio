import type { ReadProfile, ReadRow, ReadTarget } from "./ReadCard";

// Where to Start: the adaptive engine (docs/redesign-2026-08/assessment-respec.md).
// The opener triages threads; follow-ups activate only for flagged threads;
// every report row derives 1:1 from an anchored answer so the read is always
// defensible. Deterministic v1; the LLM read over the free text is phase 2.

export type ThreadId = "web" | "repeat" | "hours" | "ai" | "product" | "steady";

export const openerItems: { id: ThreadId; statement: string }[] = [
  { id: "web", statement: "The website's just OK. The business is better than the site." },
  { id: "repeat", statement: "People buy once, then we never hear from them again." },
  { id: "hours", statement: "I lose hours every week to work a computer should be doing." },
  { id: "ai", statement: "Everyone says AI would help. I wouldn't know where to start." },
  { id: "product", statement: "There's something new I keep meaning to make real." },
  { id: "steady", statement: "Things mostly work. I want an outside read." },
];

export interface StepQuestion {
  id: "context" | "web" | "webSource" | "repeat" | "repeatDriver" | "hours" | "ai" | "workflow" | "aiBlocker" | "product" | "productRisk" | "readiness";
  module: string;
  question: string;
  support?: string;
  options: string[];
}

// V2 rebuild (2026-08-31): each flagged area is a two-question module — the
// anchor (how big is it) plus an evidence question (what's really driving it).
// Evidence answers feed the per-area verdict lines in the report, which is
// where the "content too thin" problem gets fixed. One idea per question,
// owner-plain, every option something a real owner has actually said to us.
const questions: Record<StepQuestion["id"], StepQuestion> = {
  context: {
    id: "context",
    module: "Context",
    question: "What kind of business are we looking at?",
    support: "Context only. It won't decide your read.",
    options: ["Retail or online store", "Food, farm, or producer", "Services or appointments", "Hospitality or travel", "Health or wellness", "Something else"],
  },
  web: {
    id: "web",
    module: "Getting found",
    question: "If a stranger only saw your website, how well would they get why to choose you?",
    support: "Not how it looks. Whether it makes the case you'd make in person.",
    options: ["They'd get it right away", "They'd get most of it", "They'd get some of it", "Honestly, the business is better than the site", "We barely have a web presence"],
  },
  webSource: {
    id: "webSource",
    module: "Getting found",
    question: "Where do new customers actually come from today?",
    support: "Best guess is fine. Pick the biggest one.",
    options: ["Word of mouth, almost entirely", "Search, people find us online", "Social posts and ads", "Walk-ins and passing trade", "Honestly, we're not sure"],
  },
  repeat: {
    id: "repeat",
    module: "Coming back",
    question: "Out of ten customers who buy once, how many do you hear from again?",
    options: ["Eight or more", "Five to seven", "Two to four", "One, maybe", "We don't really know"],
  },
  repeatDriver: {
    id: "repeatDriver",
    module: "Coming back",
    question: "When someone does come back, what usually brings them?",
    support: "The honest answer, not the aspirational one.",
    options: ["They just remember us", "We reach out personally", "An email or text we send", "A loyalty or membership thing", "We honestly can't tell"],
  },
  hours: {
    id: "hours",
    module: "Running smoother",
    question: "In a typical week, how many hours go to work a computer should be doing?",
    support: "Scheduling, retyping, chasing, copying between tools.",
    options: ["Under 2", "2 to 5", "5 to 12", "12 or more", "I've stopped counting"],
  },
  ai: {
    id: "ai",
    module: "AI leverage",
    question: "Is AI doing any real work in the business today?",
    support: "Real work means it happens even on your busy weeks.",
    options: ["Not at all", "We've poked at ChatGPT", "It helps with a task or two", "It's part of daily work", "Automation runs on its own"],
  },
  workflow: {
    id: "workflow",
    module: "Running smoother",
    question: "What's the task you dread?",
    support: "The one that follows the same shape every time and eats hours anyway. Pick the closest, or say it in your words and the read gets sharper.",
    options: ["Writing up reports or quotes", "Invoicing and paperwork", "Answering the same questions again", "Moving info between tools", "Scheduling and coordinating", "Something else"],
  },
  aiBlocker: {
    id: "aiBlocker",
    module: "AI leverage",
    question: "What's kept AI from doing more here?",
    support: "No wrong answer. This is the part everyone's honest about in person.",
    options: ["No time to figure it out", "Tried tools that didn't stick", "Don't trust it with customers", "Our info is scattered everywhere", "Didn't know where to start"],
  },
  product: {
    id: "product",
    module: "The new thing",
    question: "The thing you keep meaning to make real. Where is it right now?",
    options: ["An idea that keeps coming back", "Sketches and notes", "We started, but it stalled", "It's real, and needs to grow"],
  },
  productRisk: {
    id: "productRisk",
    module: "The new thing",
    question: "What's the make-or-break question for it?",
    support: "The thing that, if you're wrong about it, sinks the whole idea.",
    options: ["Whether people actually want it", "Whether they'll pay enough", "Whether we can build it right", "Whether we can run it day to day", "Haven't thought about it that way"],
  },
  readiness: {
    id: "readiness",
    module: "Wrapping up",
    question: "What are you ready to do about it?",
    options: ["Fix something specific that clearly isn't working", "Step back and figure out where to focus", "Prototype a better way before a big commitment", "Build the solution and put it into use", "I mostly want an outside perspective first"],
  },
};

export interface WhereToStartAnswers {
  threads: ThreadId[];
  context?: number;
  web?: number;
  webSource?: number;
  repeat?: number;
  repeatDriver?: number;
  hours?: number;
  ai?: number;
  workflow?: number;
  workflowText?: string;
  aiBlocker?: number;
  product?: number;
  productRisk?: number;
  readiness?: number;
}

// The follow-up sequence for a set of flagged threads. Context always leads,
// readiness always closes; the workflow finder rides with hours or ai.
export function buildSequence(threads: ThreadId[]): StepQuestion[] {
  const has = (t: ThreadId) => threads.includes(t);
  const seq: StepQuestion[] = [questions.context];
  if (has("web")) seq.push(questions.web, questions.webSource);
  if (has("repeat")) seq.push(questions.repeat, questions.repeatDriver);
  if (has("hours")) seq.push(questions.hours, questions.workflow);
  if (has("ai")) seq.push(questions.ai);
  if (has("ai") && !has("hours")) seq.push(questions.workflow);
  if (has("ai")) seq.push(questions.aiBlocker);
  if (has("product")) seq.push(questions.product, questions.productRisk);
  seq.push(questions.readiness);
  return seq;
}

const NOT_FLAGGED = "Not flagged today";

interface StatusMap { statuses: string[]; tones: ("quiet" | "flag")[]; nows: number[] }
const statusMaps: Record<"web" | "repeat" | "hours" | "ai", StatusMap> = {
  web: {
    statuses: ["Earning trust", "Doing OK", "Underselling", "Underselling", "Barely there"],
    tones: ["quiet", "quiet", "flag", "flag", "flag"],
    nows: [0.8, 0.62, 0.42, 0.34, 0.15],
  },
  repeat: {
    statuses: ["Coming back", "Steady", "Leaking away", "Leaking away", "Unknown"],
    tones: ["quiet", "quiet", "flag", "flag", "flag"],
    nows: [0.8, 0.6, 0.4, 0.25, 0.3],
  },
  hours: {
    statuses: ["Under 2 a week", "2 to 5 a week", "5 to 12 a week", "12+ a week", "Uncounted"],
    tones: ["quiet", "quiet", "flag", "flag", "flag"],
    nows: [0.8, 0.6, 0.38, 0.18, 0.15],
  },
  ai: {
    statuses: ["Untapped", "Untapped", "Getting started", "Working already", "Working already"],
    tones: ["flag", "flag", "quiet", "quiet", "quiet"],
    nows: [0.2, 0.25, 0.45, 0.7, 0.8],
  },
};

interface Move { headline: string; support: string; whyNow: string; drives: "web" | "repeat" | "hours" | "ai" | "product" | "none" }

const workflowMoves: Move[] = [
  { headline: "Let AI draft the write-ups you redo every week.", support: "Start with the report or quote that follows the same shape every time.", whyNow: "AI can now draft in your exact format, from the notes and photos you already keep.", drives: "hours" },
  { headline: "Take the invoicing and paperwork off your plate first.", support: "Start with the pile that shows up every month, same as last month.", whyNow: "AI can now read, fill, and chase the documents you handle by hand.", drives: "hours" },
  { headline: "Give the questions you answer every day a first responder.", support: "Start with the five answers you type over and over.", whyNow: "AI can now answer from your real products, policies, and calendar.", drives: "hours" },
  { headline: "Fix the highest-friction handoff before adding another tool.", support: "Start with the workflow people already repeat.", whyNow: "AI can now move information between the tools you already use.", drives: "hours" },
  { headline: "Let the scheduling run itself before you hire for it.", support: "Start with the back-and-forth that fills your inbox.", whyNow: "AI can now hold the calendar, confirmations, and reminders end to end.", drives: "hours" },
  { headline: "Start where the hours are going.", support: "We'd map the workflow you named and take the drudgery out of it, with your judgment kept in.", whyNow: "The newest tools are best at exactly this kind of repeated work.", drives: "hours" },
];

const productMoves: Move[] = [
  { headline: "Put the idea in front of ten real customers.", support: "A small test beats a big plan, before any real money.", whyNow: "Prototypes are now cheap enough to test before you commit.", drives: "product" },
  { headline: "Turn the sketches into something people can touch.", support: "The first version's job is to earn a reaction, not to be finished.", whyNow: "A working prototype now takes weeks, not quarters.", drives: "product" },
  { headline: "Get the stalled build to the smallest usable version.", support: "Real usage will tell you what deserves to exist.", whyNow: "The distance from stalled to usable has never been shorter.", drives: "product" },
  { headline: "Grow it on real signal, not guesses.", support: "Instrument what's live, then double down where usage points.", whyNow: "Measurement and iteration are cheaper than they've ever been.", drives: "product" },
];

const threadMoves: Record<"web" | "repeat", Move> = {
  web: { headline: "Make the site sell the business as well as you do in person.", support: "Positioning first, then pages that earn trust.", whyNow: "A clear story converts before any new marketing spend.", drives: "web" },
  repeat: { headline: "Build the come-back path before chasing new customers.", support: "Start with the follow-up that personal memory handles today.", whyNow: "Loyalty, reminders, and lifecycle email no longer need an enterprise budget.", drives: "repeat" },
};

const outsideMove: Move = { headline: "Start with a 30-minute outside read.", support: "Nothing urgent flagged. A second set of eyes finds what routine hides.", whyNow: "You keep the written read either way.", drives: "none" };

function resolveMove(a: WhereToStartAnswers): Move {
  if (a.workflow !== undefined) return workflowMoves[a.workflow];
  if (a.product !== undefined) return productMoves[a.product];
  const flagged = (t: "web" | "repeat") => a[t] !== undefined && statusMaps[t].tones[a[t]!] === "flag";
  // Web outranks repeat only when its answer is more severe.
  if (flagged("web") && flagged("repeat")) return statusMaps.web.nows[a.web!] <= statusMaps.repeat.nows[a.repeat!] ? threadMoves.web : threadMoves.repeat;
  if (flagged("web")) return threadMoves.web;
  if (flagged("repeat")) return threadMoves.repeat;
  return outsideMove;
}

// The named read — the persona moment at the result (Charlie 08-30: the old
// checkup's personas made the ending feel earned; this brings that reward
// into the report-first format). Named for what we heard, not a horoscope.
const READ_TITLES: Record<Move["drives"], string> = {
  web: "The business that's better than its website.",
  repeat: "The one-visit favorite.",
  hours: "The owner-powered operation.",
  ai: "The leverage hiding in plain sight.",
  product: "The idea that deserves to be real.",
  none: "The steady ship, worth a second look.",
};

export function computeReadProfile(a: WhereToStartAnswers): ReadProfile {
  const move = resolveMove(a);
  const row = (key: "web" | "repeat" | "hours" | "ai", label: string): ReadRow => {
    const answer = a[key];
    if (answer === undefined) return { label, status: NOT_FLAGGED, tone: "quiet" };
    const map = statusMaps[key];
    const barked = map.tones[answer] === "flag" && (move.drives === key || (move.drives === "hours" && key === "ai" && a.hours === undefined));
    return { label, status: map.statuses[answer], tone: barked ? "bark" : map.tones[answer] };
  };
  const rows = [row("web", "Web presence"), row("repeat", "Repeat customers"), row("hours", "Hours lost to admin"), row("ai", "AI leverage")];

  const targets: ReadTarget[] = [];
  const flaggedNow = (key: "web" | "repeat" | "hours" | "ai") =>
    a[key] !== undefined && statusMaps[key].tones[a[key]!] === "flag" ? statusMaps[key].nows[a[key]!] : undefined;
  const webNow = flaggedNow("web");
  if (webNow !== undefined) targets.push({ label: "Clearer offer", target: "Clear", now: webNow, bark: move.drives === "web" });
  const repeatNow = flaggedNow("repeat");
  if (repeatNow !== undefined) targets.push({ label: "Repeat path", target: "Connected", now: repeatNow, bark: move.drives === "repeat" });
  const opsNows = [flaggedNow("hours"), flaggedNow("ai")].filter((n): n is number => n !== undefined);
  if (opsNows.length) targets.push({ label: "Admin relief", target: "Useful", now: Math.min(...opsNows), bark: move.drives === "hours" || move.drives === "ai" });

  return {
    path: "madronaproduct.com/where-to-start",
    note: "your read",
    title: READ_TITLES[move.drives],
    rows,
    targets,
    move: { headline: move.headline, support: move.support, whyNow: move.whyNow },
  };
}

// The live building state for the right pane: the same card, assembling.
// Opener checks wake rows to "Listening"; each answered follow-up stamps the
// real status in; targets draw as areas resolve; the recommendation stays a
// placeholder (move: null) until the result computes for real.
// Holds the verdict back (Charlie, 2026-08-29): answered rows show a
// redacted chip, not their status; targets appear as unlabeled shimmer bars
// (one per answered area, regardless of verdict, so presence reveals
// nothing); the recommendation slot only ever hints. The picture visibly
// gets clearer, then the result reveals the real content.
export function computeBuildProfile(a: WhereToStartAnswers): ReadProfile {
  const flagged = (t: ThreadId) => a.threads.includes(t);
  const row = (key: "web" | "repeat" | "hours" | "ai", label: string): ReadRow => {
    if (a[key] !== undefined) return { label, status: "", tone: "captured" };
    if (flagged(key)) return { label, status: "Listening", tone: "pending" };
    return { label, status: "", tone: "dormant" };
  };
  const rows = [row("web", "Web presence"), row("repeat", "Repeat customers"), row("hours", "Hours lost to admin"), row("ai", "AI leverage")];

  const hiddenTarget: ReadTarget = { label: "", target: "", now: 0, hidden: true };
  const targets: ReadTarget[] = [];
  if (a.web !== undefined) targets.push(hiddenTarget);
  if (a.repeat !== undefined) targets.push(hiddenTarget);
  if (a.hours !== undefined || a.ai !== undefined) targets.push(hiddenTarget);

  const moveForming = a.workflow !== undefined || !!a.workflowText?.trim() || a.product !== undefined;
  return {
    path: "madronaproduct.com/where-to-start",
    note: "assembling",
    rows,
    targets,
    move: null,
    movePlaceholder: moveForming ? "Taking shape. Revealed at the end." : "Resolves at the end.",
  };
}

// Progress for the pane footer: how many flagged areas have their read in.
export function buildProgress(a: WhereToStartAnswers): { read: number; flaggedTotal: number } {
  const keys: ("web" | "repeat" | "hours" | "ai")[] = ["web", "repeat", "hours", "ai"];
  const flaggedKeys = keys.filter(k => a.threads.includes(k));
  return { read: flaggedKeys.filter(k => a[k] !== undefined).length, flaggedTotal: flaggedKeys.length };
}

// The plain-sentence recap under the card: one line per flagged row, in the
// order the card lists them, plus the readiness close.
export function buildRecap(a: WhereToStartAnswers): string[] {
  const lines: string[] = [];
  const flaggedLine = (key: "web" | "repeat" | "hours" | "ai") => {
    if (a[key] !== undefined && statusMaps[key].tones[a[key]!] === "flag") {
      const verdict = areaVerdict(key, a);
      if (verdict && !lines.includes(verdict)) lines.push(verdict);
    }
  };
  (["web", "repeat", "hours", "ai"] as const).forEach(flaggedLine);
  if (a.product !== undefined) lines.push(a.productRisk !== undefined ? PRODUCT_VERDICTS[a.productRisk] : "The new thing you named deserves a real test, small enough to learn from cheaply.");
  if (!lines.length) lines.push("Nothing urgent flagged. That usually means the next win is something routine hides. An outside read is the cheap way to find it.");
  const readiness = ["You said something specific is broken. The conversation starts there.", "You said you want focus. We'd map the options and rank them by payback.", "You said prototype first. We agree, that's how we work anyway.", "You said you're ready to build. We'd scope the smallest useful version.", "You asked for perspective first. That's what the free 30 minutes is for."];
  if (a.readiness !== undefined) lines.push(readiness[a.readiness]);
  return lines;
}

// The per-area verdict lines (V2 rebuild): every line derives from the
// anchor + evidence pair the visitor actually gave, in the what-we-heard
// voice. These are the written layer of the report; the recap reuses them.
const WEB_VERDICTS = [
  "New business rides on word of mouth, and the site loses the trust referrals arrive with.",
  "People find you by search, so the site is doing the selling. Right now it's underselling.",
  "Social brings people in; the site is where they cool off before buying.",
  "Trade walks in today, but online the business is invisible in the first place people check.",
  "Not knowing where customers come from is its own finding. Measurement comes free with the fix.",
];
const REPEAT_VERDICTS = [
  "Return visits depend on customers remembering you. Memory is doing a system's job.",
  "The come-back path lives in your personal outreach, so it stops whenever you get busy.",
  "You have a channel. It isn't wired to a rhythm that actually brings people back.",
  "There's a loyalty mechanism, but the leak says it isn't doing the work yet.",
  "Nobody can see what brings people back. Visibility is the first fix, and it's cheap.",
];
const WORKFLOW_TARGETS = ["the write-ups", "invoicing and paperwork", "the questions you answer daily", "moving info between tools", "scheduling and coordinating", "the workflow you named"];
const AI_VERDICTS = [
  "The blocker is time, not tech. That's why the first win has to run itself once it's set up.",
  "You tried tools that didn't stick. The fix is pointing AI at one real workflow, not another subscription.",
  "You don't trust it with customers. Right call. Draft-for-approval keeps every send in your hands.",
  "Your information is scattered, so that's step one. It pays off well beyond AI.",
  "Nothing's wrong here. You just haven't had a guide, which is the cheapest problem on this list.",
];
const PRODUCT_VERDICTS = [
  "The make-or-break is whether people want it. A prototype answers that in weeks, not quarters.",
  "The open question is price. Real customers before real money is how it gets settled.",
  "The risk is the build itself. A thin working version de-risks it before any big spend.",
  "The worry is running it day to day. Design the operation alongside the product, not after it.",
  "Naming the make-or-break question is the first piece of work, and it's a good afternoon's work.",
];

export function areaVerdict(key: "web" | "repeat" | "hours" | "ai", a: WhereToStartAnswers): string | undefined {
  const flagged = a[key] !== undefined && statusMaps[key].tones[a[key]!] === "flag";
  if (key === "web") return flagged ? (a.webSource !== undefined ? WEB_VERDICTS[a.webSource] : "The business is stronger than the way it shows up online.") : a.web !== undefined ? "The site is pulling its weight." : undefined;
  if (key === "repeat") return flagged ? (a.repeatDriver !== undefined ? REPEAT_VERDICTS[a.repeatDriver] : "Customers like you once. There's no path that brings them back on its own.") : a.repeat !== undefined ? "The come-back path is working." : undefined;
  if (key === "hours") {
    if (!flagged) return a.hours !== undefined ? "Admin is under control." : undefined;
    if (a.workflowText?.trim()) { const text = a.workflowText.trim(); return `In your words: "${/[.!?]$/.test(text) ? text : `${text}.`}" That's where we'd look first.`; }
    if (a.workflow !== undefined) return `Most of the lost hours have an address: ${WORKFLOW_TARGETS[a.workflow]}. Repeated work with the same shape every week is exactly what software handles now.`;
    return "Hours are going to work that follows the same shape every week.";
  }
  if (!flagged) return a.ai === 2 ? "AI has a foothold. The pattern that got the first task working will carry the next one." : a.ai !== undefined ? "AI is already earning its keep here." : undefined;
  return a.aiBlocker !== undefined ? AI_VERDICTS[a.aiBlocker] : "AI isn't pulling weight yet. The wins come from one real workflow, not another tool subscription.";
}

// ---- V2 report (the Readiness Assessment rebuild, 2026-08-30) ----
// The on-screen report card: named read, an overall word grade, per-area
// meters with owner-plain grades, and RANKED moves (now / next / later)
// instead of a single recommendation. Print carries the whyNow detail.
export interface ReportArea {
  key: "web" | "repeat" | "hours" | "ai" | "product";
  label: string;
  grade: string;
  level: number | null; // 0..1 meter fill; null = not read today
  flagged: boolean;
  detail?: string; // the written verdict for this area (V2 rebuild)
}
export interface ReadinessReportData {
  title: string;
  overall: { grade: string; note: string };
  areas: ReportArea[];
  moves: { rank: "Now" | "Next" | "Later"; move: Move }[];
}

const AREA_LABELS: Record<ReportArea["key"], string> = {
  web: "Web presence", repeat: "Repeat customers", hours: "Hours lost to admin", ai: "AI leverage", product: "The new thing",
};
const PRODUCT_GRADES = ["An idea, still", "Sketched", "Stalled mid-build", "Live and growing"];
const PRODUCT_LEVELS = [0.25, 0.4, 0.35, 0.7];

const OVERALL: [string, string][] = [
  ["The steady ship", "Nothing urgent flagged. Worth an outside read all the same."],
  ["One clear move", "One area is asking for attention, and it has a first step."],
  ["Ready in places", "Strong where it counts, with two clear places to gain ground."],
  ["Big upside waiting", "Several areas flagged, which means several honest wins available."],
];

const aiMove: Move = { headline: "Put AI on the work you already repeat.", support: "Start with one workflow that happens the same way every week.", whyNow: "The newest tools are best at exactly this kind of repeated work.", drives: "ai" };

export function computeReadinessReport(a: WhereToStartAnswers): ReadinessReportData {
  const keys: ("web" | "repeat" | "hours" | "ai")[] = ["web", "repeat", "hours", "ai"];
  const areas: ReportArea[] = keys.map((key) => {
    const answer = a[key];
    if (answer === undefined) return { key, label: AREA_LABELS[key], grade: "Not read today", level: null, flagged: false };
    const map = statusMaps[key];
    return { key, label: AREA_LABELS[key], grade: map.statuses[answer], level: map.nows[answer], flagged: map.tones[answer] === "flag", detail: areaVerdict(key, a) };
  });
  if (a.product !== undefined) {
    areas.push({ key: "product", label: AREA_LABELS.product, grade: PRODUCT_GRADES[a.product], level: PRODUCT_LEVELS[a.product], flagged: true, detail: a.productRisk !== undefined ? PRODUCT_VERDICTS[a.productRisk] : "The new thing you named deserves a real test, small enough to learn from cheaply." });
  }

  const flaggedCount = areas.filter((area) => area.flagged).length;
  const overallPair = OVERALL[Math.min(flaggedCount, 3)];

  const primary = resolveMove(a);
  const fallbackFor: Record<string, Move> = { web: threadMoves.web, repeat: threadMoves.repeat, hours: workflowMoves[5], ai: aiMove };
  const seen = new Set([primary.headline]);
  const candidates: Move[] = [];
  // severity order: most-broken flagged areas first
  const flaggedSorted = areas.filter((area) => area.flagged && area.level !== null).sort((x, y) => (x.level! - y.level!));
  for (const area of flaggedSorted) {
    const candidate = fallbackFor[area.key];
    if (candidate && !seen.has(candidate.headline)) { seen.add(candidate.headline); candidates.push(candidate); }
  }
  if (a.product !== undefined && primary.drives !== "product") {
    const productMove = productMoves[a.product];
    if (!seen.has(productMove.headline)) { seen.add(productMove.headline); candidates.push(productMove); }
  }
  if (!candidates.length && primary.drives !== "none") candidates.push(outsideMove);

  const ranks: ("Now" | "Next" | "Later")[] = ["Now", "Next", "Later"];
  const moves = [primary, ...candidates].slice(0, 3).map((move, index) => ({ rank: ranks[index], move }));

  return { title: READ_TITLES[primary.drives], overall: { grade: overallPair[0], note: overallPair[1] }, areas, moves };
}
