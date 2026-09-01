// AI Opportunity Assessment engine (docs/redesign-2026-08/ai-opportunity-spec.md).
// Companion to whereToStartEngine.ts; read that file first for idiom context.
// Same discipline: every report line derives 1:1 from what the visitor gave us.
// Deterministic v1; LLM post-processing over otherText is phase 2.

import { agents } from "../../data/agents";
import { thinkingEntries } from "../../data/thinking";

// ---- Types (pinned by spec interface block) ----

export type ChipId =
  | "invoices" | "books" | "cash"
  | "questions" | "followup" | "reviews"
  | "quotes" | "content" | "contracts"
  | "scheduling" | "retyping" | "industry";

export type AreaId = "money" | "customers" | "words" | "glue";

// Evidence questions and the blocker are multi-select (several are true at
// once for a real owner; Charlie 09-01); anchors, the AI scale, and the
// readiness closer stay single-select. Multi answers are option-index arrays.
export interface OpportunityAnswers {
  chips: ChipId[];
  otherText?: string;
  moneyHours?: number;
  moneyEvidence?: number[];
  customersHours?: number;
  customersEvidence?: number[];
  wordsHours?: number;
  wordsEvidence?: number[];
  glueHours?: number;
  glueEvidence?: number[];
  ai?: number;
  blocker?: number[];
  readiness?: number;
}

export interface OppQuestion {
  id: keyof OpportunityAnswers;
  module: string;
  question: string;
  support?: string;
  options: string[];
  multi?: boolean;
  // Option index that stands alone ("mostly handled", "all of it, evenly"):
  // checking it clears the others, checking any other clears it.
  exclusive?: number;
}

export interface MapItem {
  chip: ChipId;
  label: string;
  area: AreaId;
  proofHref: string;
  proofLive: boolean; // true only for /tools/* hrefs
}

export interface OppMove {
  chip: ChipId;
  headline: string;
  support: string;
  proofHref: string;
  proofLabel: string; // "See the pattern working →" | "Read the inventory →"
}

export interface OppTool {
  name: string;
  blurb: string;
  href: string;
}

export interface OppReading {
  title: string;
  href: string;
}

export interface OpportunityReportData {
  title: string;
  overall: { grade: string; note: string };
  map: { runsItself: MapItem[]; amplified: MapItem[]; staysYours: string[] };
  moves: { rank: "Now" | "Next" | "Later"; move: OppMove }[];
  heard: string[]; // one line per flagged area + optional other echo + readiness close
  // The resource layer (Charlie 09-01): live tools matched to the checked
  // chips, on the report; personalized reading, on the rail.
  tools: OppTool[];
  reading: OppReading[];
}

// ---- The opener: chip definitions ----

// Full chip table from spec: id, label, area, proof href, proofLive.
// proofLive = true iff href is a /tools/* path (those get a "live →" affix in the map).
export const openerChips: MapItem[] = [
  { chip: "invoices",   label: "Chasing invoices and late payments",         area: "money",     proofHref: "/tools/invoice-chasing",              proofLive: true  },
  { chip: "books",      label: "Keeping the books current",                   area: "money",     proofHref: "/tools/month-end-close",               proofLive: true  },
  { chip: "cash",       label: "Knowing where cash actually stands",          area: "money",     proofHref: "/tools/cash-position",                proofLive: true  },
  { chip: "questions",  label: "Answering the same customer questions",       area: "customers", proofHref: "/tools/customer-inbox",               proofLive: true  },
  { chip: "followup",   label: "Following up after the sale",                 area: "customers", proofHref: "/tools/post-sale-followup",           proofLive: true  },
  { chip: "reviews",    label: "Asking for reviews and replying to them",     area: "customers", proofHref: "/tools/review-requests",              proofLive: true  },
  { chip: "quotes",     label: "Writing quotes, reports, and write-ups",      area: "words",     proofHref: "/thinking/ai-tools-for-small-business", proofLive: false },
  { chip: "content",    label: "Social posts and marketing content",          area: "words",     proofHref: "/thinking/ai-tools-for-small-business", proofLive: false },
  { chip: "contracts",  label: "Reading contracts and paperwork before signing", area: "words",  proofHref: "/tools/contract-review",              proofLive: true  },
  { chip: "scheduling", label: "Scheduling back-and-forth",                   area: "glue",      proofHref: "/thinking/ai-tools-for-small-business", proofLive: false },
  { chip: "retyping",   label: "Retyping things between tools",               area: "glue",      proofHref: "/thinking/ai-tools-for-small-business", proofLive: false },
  { chip: "industry",   label: "Keeping up with what's changing in the industry", area: "glue",  proofHref: "/tools/industry-brief",               proofLive: true  },
];

// Reply-pill short labels for chat history (same order as openerChips).
export const chipShort: Record<ChipId, string> = {
  invoices:   "Invoice chasing",
  books:      "The books",
  cash:       "Cash visibility",
  questions:  "Same questions",
  followup:   "Post-sale follow-up",
  reviews:    "Reviews",
  quotes:     "Quotes and write-ups",
  content:    "Marketing content",
  contracts:  "Contracts",
  scheduling: "Scheduling",
  retyping:   "Retyping between tools",
  industry:   "Industry keeping-up",
};

// Human-readable module labels for the four areas.
export const AREA_LABELS: Record<AreaId, string> = {
  money:     "Money admin",
  customers: "Customers",
  words:     "Words and paper",
  glue:      "Glue work",
};

// ---- Per-area question definitions ----

// Shared hour scale across all four anchors (spec §"Every anchor uses the same hour scale").
const HOUR_OPTIONS = ["An hour or so", "2 to 4 hours", "4 to 8 hours", "A full day or more", "I've stopped counting"];

// Hour weights for scoring (index maps to HOUR_OPTIONS). Spec: [1,3,6,9,8].
const HOUR_WEIGHTS = [1, 3, 6, 9, 8];

// The anchor (how much time) and evidence (what drives it) questions for each area.
// IDs match the OpportunityAnswers keys so buildSequence returns usable ids.
const AREA_QUESTIONS: Record<AreaId, { anchor: OppQuestion; evidence: OppQuestion }> = {
  money: {
    anchor: {
      id: "moneyHours",
      module: "Money admin",
      question: "How much of a typical week goes to money admin, all in?",
      support: "Invoices, bookkeeping, checking balances, chasing payments.",
      options: HOUR_OPTIONS,
    },
    evidence: {
      id: "moneyEvidence",
      module: "Money admin",
      question: "What makes it drag?",
      support: "Check everything that's true.",
      multi: true,
      options: [
        "Chasing people who owe us",
        "Bookkeeping piles up between sittings",
        "Never sure where cash stands",
        "Too many systems that don't talk",
        "It all lives in my head",
      ],
    },
  },
  customers: {
    anchor: {
      id: "customersHours",
      module: "Customers",
      question: "How much of the week goes to customer messages and follow-up?",
      support: "The inbox, the check-ins, the ones you mean to send.",
      options: HOUR_OPTIONS,
    },
    evidence: {
      id: "customersEvidence",
      module: "Customers",
      question: "What's the honest state of follow-up?",
      support: "Check everything that's true. No judgment here.",
      multi: true,
      exclusive: 4,
      options: [
        "Routine questions eat the inbox",
        "Thank-yous and check-ins rarely happen",
        "We never ask for reviews",
        "Follow-up happens when I remember",
        "It's mostly handled, honestly",
      ],
    },
  },
  words: {
    anchor: {
      id: "wordsHours",
      module: "Words and paper",
      question: "How much of the week goes to writing and paperwork?",
      support: "Quotes, reports, posts, contracts, forms.",
      options: HOUR_OPTIONS,
    },
    evidence: {
      id: "wordsEvidence",
      module: "Words and paper",
      question: "Where does the writing time go?",
      support: "Check every pile that's real.",
      multi: true,
      exclusive: 4,
      options: [
        "Quotes and estimates",
        "Reports and write-ups",
        "Marketing and social content",
        "Contracts and forms",
        "All of it, evenly",
      ],
    },
  },
  glue: {
    anchor: {
      id: "glueHours",
      module: "Glue work",
      question: "How much of the week disappears into glue work?",
      support: "Scheduling, retyping, chasing info, keeping up.",
      options: HOUR_OPTIONS,
    },
    evidence: {
      id: "glueEvidence",
      module: "Glue work",
      question: "Where does the friction live?",
      support: "Check all that apply.",
      multi: true,
      exclusive: 4,
      options: [
        "Scheduling back-and-forth",
        "Retyping between tools",
        "Chasing people for information",
        "Keeping up with industry news",
        "A dozen small things, none of them big",
      ],
    },
  },
};

// The three cross-cutting closers (always appended, in spec order).
const CROSS_CUTTING: OppQuestion[] = [
  {
    id: "ai",
    module: "AI today",
    question: "Is AI doing any real work in the business today?",
    support: "Real work means it happens even on your busy weeks.",
    options: ["Not at all", "We've poked at ChatGPT", "It helps with a task or two", "It's part of daily work", "Automation runs on its own"],
  },
  {
    id: "blocker",
    module: "AI today",
    question: "What's kept AI from doing more here?",
    support: "No wrong answer. Check everything that's played a part.",
    multi: true,
    options: ["No time to figure it out", "Tried tools that didn't stick", "Don't trust it with customers", "Our info is scattered everywhere", "Didn't know where to start"],
  },
  {
    id: "readiness",
    module: "Wrapping up",
    question: "What are you ready to do about it?",
    options: [
      "Fix something specific that clearly isn't working",
      "Step back and figure out where to focus",
      "Prototype a better way before a big commitment",
      "Build the solution and put it into use",
      "I mostly want an outside perspective first",
    ],
  },
];

// ---- Per-area verdict lines (authored by engine, derived from anchor+evidence) ----
// 4 areas x 5 evidence options = 20 lines. Voice: owner-plain, what-we-heard,
// defensible from the answer. No em-dashes. No scores or percentages.

// Voice rule (critic pass 09-01): "What we heard" REFLECTS, it never sells.
// Each line mirrors what the visitor said and what it costs; the remedy
// lives in the Where-to-start moves, not here.

// Money: evidence = [Chasing people who owe us | Bookkeeping piles up | Never sure where cash stands | Too many systems | It all lives in my head]
const MONEY_VERDICTS = [
  "The drag is the chasing. Reminding people to pay you follows the same script every time, and right now the script runs on you.",
  "Bookkeeping piles up because it waits for a person to sit down. The pile is a symptom; the sitting-down requirement is the problem.",
  "Not knowing where cash stands taxes every other decision in the week. That's a visibility problem before it's an admin one.",
  "Too many systems that don't talk means you are the integration. Every handoff between them runs on your hours.",
  "The money state lives in your head, which works until the week gets full. Heads don't scale; ledgers do.",
];

// Customers: evidence = [Routine questions eat inbox | Thank-yous and check-ins rarely happen | We never ask for reviews | Follow-up happens when I remember | It's mostly handled, honestly]
const CUSTOMER_VERDICTS = [
  "Routine questions are eating the inbox, which means your own policies and answers are being retyped one customer at a time.",
  "Thank-yous and check-ins rarely happen because they depend on someone remembering. Memory is doing a system's job.",
  "The happiest customers stay silent right where new customers are looking, because nobody asks them not to.",
  "Follow-up that happens when you remember is follow-up that mostly doesn't happen. The intent is there; the trigger isn't.",
  "Mostly handled is worth taking seriously. The part that slips first when things get busy is the part worth watching.",
];

// Words: evidence = [Quotes and estimates | Reports and write-ups | Marketing and social content | Contracts and forms | All of it, evenly]
const WORDS_VERDICTS = [
  "Quotes and estimates follow the same shape every time you write one. You're paying fresh hours for repeated structure.",
  "The reports and write-ups repeat their structure every week. The thinking is yours; most of the typing isn't.",
  "Marketing content moves to the bottom of the pile whenever the week fills. It needs consistency, and busy weeks are where consistency dies.",
  "Contracts get signed with less scrutiny than they deserve. That's not carelessness, it's a time budget.",
  "When every pile drags evenly, no single fix stands out, which is usually why nothing gets fixed.",
];

// Glue: evidence = [Scheduling back-and-forth | Retyping between tools | Chasing people for information | Keeping up with industry news | A dozen small things]
const GLUE_VERDICTS = [
  "The scheduling loop is always the same: propose, wait, adjust, confirm. It's a loop, and you're the one walking it.",
  "Retyping between tools is pure transfer cost. Nothing new gets created; the hours still leave.",
  "Chasing people for information feels productive and produces nothing. It's waiting, dressed as work.",
  "Keeping up with the industry happens in the gaps, which means it happens inconsistently.",
  "A dozen small things, none of them big, is how a week disappears without anything to point at.",
];

// ---- Move copy table (pinned from spec) ----
// Per-chip headline and support. proofLabel rule: /tools proofs → "See the pattern working →", article → "Read the inventory →".

const MOVE_TABLE: Record<ChipId, { headline: string; support: string }> = {
  invoices:   { headline: "Let the invoice chasing run itself.",           support: "Overdue invoices get a polite reminder drafted in your voice. You decide who gets grace." },
  books:      { headline: "Make month-end a review, not a project.",        support: "The books reconcile against your processors; you approve what's flagged." },
  cash:       { headline: "Start every morning knowing the cash position.", support: "Every account pulled into one honest number, tight weeks flagged early." },
  questions:  { headline: "Give the routine questions a first responder.",   support: "First drafts from your real products and policies; sensitive ones come back to you." },
  followup:   { headline: "Run the follow-up you never get to.",             support: "The thank-you, the check-in, and the win-back, drafted and queued for your okay." },
  reviews:    { headline: "Ask for the review at the right moment.",         support: "The right customers get asked after the right purchase. It asks; it never fakes." },
  quotes:     { headline: "Let AI draft the write-ups you redo every week.", support: "Start with the quote or report that follows the same shape every time." },
  content:    { headline: "Turn one good hour into a month of content.",     support: "AI drafts in your voice from what you already know; you edit, it ships." },
  contracts:  { headline: "Read every contract before you sign it.",         support: "Terms and risks flagged, with the one clause worth a lawyer pointed out." },
  scheduling: { headline: "Let the scheduling run itself.",                  support: "The back-and-forth, confirmations, and reminders held end to end." },
  retyping:   { headline: "Kill the retyping between tools.",                support: "Information moves itself between the systems you already use." },
  industry:   { headline: "Get briefed on your trade overnight.",            support: "The sources read while you sleep; what actually changed, each with a next move." },
};

// ---- Named reads (dominant area by score) ----
// Spec: dominant area = highest hour-weight on its anchor; ties break money → customers → words → glue.
const READ_TITLES: Record<AreaId | "none", string> = {
  money:     "The back office that runs itself.",
  customers: "The follow-up you never get to.",
  words:     "The writing you do twice.",
  glue:      "A thousand small jobs, one fix.",
  none:      "The steady ship, worth a second look.",
};

// ---- Overall grades (by count of flagged areas) ----
const OVERALL: [string, string][] = [
  ["The steady ship.",              "Nothing urgent flagged. Worth an outside read all the same."],
  ["One clear opportunity.",        "One part of the week is asking for leverage, and it has a first step."],
  ["Hours hiding in plain sight.",  "More than one part of the week is asking for leverage. Each has a working pattern to follow."],
  ["A week's worth of leverage.",   "Most of the week has leverage waiting, which means several honest wins available."],
];

// ---- Helper: which areas are flagged ----
function flaggedAreas(chips: ChipId[]): AreaId[] {
  const chipsByArea = openerChips.reduce<Record<AreaId, ChipId[]>>(
    (acc, ci) => { acc[ci.area].push(ci.chip); return acc; },
    { money: [], customers: [], words: [], glue: [] }
  );
  const order: AreaId[] = ["money", "customers", "words", "glue"];
  return order.filter(a => chips.some(c => chipsByArea[a].includes(c)));
}

// ---- Helper: hour weight for an area's anchor answer ----
function hourWeight(a: OpportunityAnswers, area: AreaId): number {
  const key: Record<AreaId, keyof OpportunityAnswers> = {
    money: "moneyHours", customers: "customersHours", words: "wordsHours", glue: "glueHours",
  };
  const val = a[key[area]];
  return val !== undefined ? HOUR_WEIGHTS[val as number] : 0;
}

// ---- buildSequence ----
// Per-area anchor+evidence pairs for flagged areas only, in spec order
// (money → customers → words → glue), then the three cross-cutting closers.
export function buildSequence(chips: ChipId[]): OppQuestion[] {
  const order: AreaId[] = ["money", "customers", "words", "glue"];
  const flagged = flaggedAreas(chips);
  const seq: OppQuestion[] = [];
  for (const area of order) {
    if (flagged.includes(area)) {
      seq.push(AREA_QUESTIONS[area].anchor, AREA_QUESTIONS[area].evidence);
    }
  }
  seq.push(...CROSS_CUTTING);
  return seq;
}

// ---- computeOpportunityReport ----

// Spec group membership (determines runsItself vs amplified bucket).
const RUNS_ITSELF_CHIPS = new Set<ChipId>(["invoices","books","cash","questions","reviews","scheduling","retyping","industry"]);
const AMPLIFIED_CHIPS   = new Set<ChipId>(["quotes","content","contracts","followup"]);

// Readiness closer lines — verbatim from whereToStartEngine.ts buildRecap.
const READINESS_LINES = [
  "You said something specific is broken. The conversation starts there.",
  "You said you want focus. We'd map the options and rank them by payback.",
  "You said prototype first. We agree, that's how we work anyway.",
  "You said you're ready to build. We'd scope the smallest useful version.",
  "You asked for perspective first. That's what the free 30 minutes is for.",
];

export function computeOpportunityReport(a: OpportunityAnswers): OpportunityReportData {
  const { chips } = a;
  const flagged = flaggedAreas(chips);

  // ---- Map: runsItself, amplified ----
  // Only checked chips appear; sorted into their group by spec membership.
  const chipDefs = new Map(openerChips.map(ci => [ci.chip, ci]));

  const runsItself: MapItem[] = chips.filter(c => RUNS_ITSELF_CHIPS.has(c)).map(c => chipDefs.get(c)!);
  const amplified:  MapItem[] = chips.filter(c => AMPLIFIED_CHIPS.has(c)).map(c => chipDefs.get(c)!);

  // ---- Stays-yours (honesty rules, always ≥1) ----
  const staysYours: string[] = [];
  if (a.blocker?.includes(2)) { // "Don't trust it with customers"
    staysYours.push("The sensitive replies. Drafts wait for your okay; nothing sends itself.");
  }
  if (chips.includes("followup")) {
    staysYours.push("The relationships. AI drafts the words; the caring stays yours.");
  }
  if (!staysYours.length) {
    staysYours.push("The judgment calls. Pricing, people, and promises stay human.");
  }

  // ---- Named read: dominant area by hour-weight ----
  // Ties break money → customers → words → glue (spec order, so first-wins).
  let dominantArea: AreaId | "none" = "none";
  let bestWeight = 0;
  for (const area of flagged) { // flagged is already in spec order
    const w = hourWeight(a, area);
    if (w > bestWeight) { bestWeight = w; dominantArea = area; }
  }

  // ---- Overall grade ----
  const overallPair = OVERALL[Math.min(flagged.length, 3)];

  // ---- Ranked moves (up to 3) ----
  // Score by area hour-weight; break ties money → customers → words → glue.
  // Within an area, prefer the checked chip with a live /tools proof first.
  // Only flagged areas produce moves (they have answers).

  // Sort flagged areas by descending hour-weight (ties keep spec order).
  const areaOrder: AreaId[] = ["money", "customers", "words", "glue"];
  const sortedAreas = [...flagged].sort((x, y) => {
    const diff = hourWeight(a, y) - hourWeight(a, x);
    if (diff !== 0) return diff;
    return areaOrder.indexOf(x) - areaOrder.indexOf(y); // lower index = higher priority
  });

  const buildMove = (chip: ChipId): OppMove => {
    const ci = chipDefs.get(chip)!;
    const { headline, support } = MOVE_TABLE[chip];
    return {
      chip,
      headline,
      support,
      proofHref: ci.proofHref,
      proofLabel: ci.proofLive ? "See the pattern working →" : "Read the inventory →",
    };
  };

  const ranks: ("Now" | "Next" | "Later")[] = ["Now", "Next", "Later"];
  const moves: OpportunityReportData["moves"] = [];
  const usedChips = new Set<ChipId>();

  for (const area of sortedAreas) {
    if (moves.length >= 3) break;
    // Chips for this area that the visitor checked.
    const areaChips = chips.filter(c => chipDefs.get(c)!.area === area);
    if (!areaChips.length) continue;
    // Pick chip: live /tools proof first, then first checked.
    const pick = areaChips.find(c => chipDefs.get(c)!.proofLive) ?? areaChips[0];
    if (!usedChips.has(pick)) {
      usedChips.add(pick);
      moves.push({ rank: ranks[moves.length], move: buildMove(pick) });
    }
  }

  // ---- What we heard (heard[]) ----
  // One verdict line per flagged area, derived from anchor + evidence.
  const heard: string[] = [];

  // Evidence is multi-select; the card still gets ONE line per area so the
  // read stays tight. Rule: an exclusive pick speaks for itself; three or
  // more picks use the area's everything-drags line where one exists (the
  // exclusive slot doubles as it); otherwise the first-checked line leads.
  for (const area of flagged) {
    const evidenceKey: Record<AreaId, keyof OpportunityAnswers> = {
      money: "moneyEvidence", customers: "customersEvidence", words: "wordsEvidence", glue: "glueEvidence",
    };
    const picks = (a[evidenceKey[area]] as number[] | undefined) ?? [];
    const verdicts: string[] = area === "money" ? MONEY_VERDICTS : area === "customers" ? CUSTOMER_VERDICTS : area === "words" ? WORDS_VERDICTS : GLUE_VERDICTS;
    const exclusiveIdx = AREA_QUESTIONS[area].evidence.exclusive;
    // Only words/glue have an "everything drags" line (their exclusive slot);
    // customers' exclusive means the opposite ("mostly handled"), so it never
    // stands in for many picks.
    const manyIdx = area === "words" || area === "glue" ? exclusiveIdx : undefined;
    let line: string | undefined;
    if (exclusiveIdx !== undefined && picks.includes(exclusiveIdx)) line = verdicts[exclusiveIdx];
    else if (picks.length >= 3 && manyIdx !== undefined) line = verdicts[manyIdx];
    else if (picks.length) line = verdicts[Math.min(...picks)];
    // Fall back to a neutral line if somehow the evidence wasn't answered.
    heard.push(line ?? `Most of the drag in ${AREA_LABELS[area].toLowerCase()} has a repeatable shape. That's what software handles best.`);
  }

  // otherText echo (same quoting pattern as whereToStartEngine.ts workflow echo).
  if (a.otherText?.trim()) {
    const text = a.otherText.trim();
    heard.push(`In your words: "${/[.!?]$/.test(text) ? text : `${text}.`}" That gets read separately.`);
  }

  // Readiness closer (verbatim lines, reused from whereToStartEngine.ts).
  if (a.readiness !== undefined) {
    heard.push(READINESS_LINES[a.readiness]);
  }

  // ---- Tools worth a look (report resource layer) ----
  // Every checked chip whose proof is a live /tools demo surfaces its agent
  // from the registry (name + blurb are the registry's, so copy never
  // drifts). Registry order; the visitor's picks decide membership.
  const wantedTools = new Set(
    chips.map(c => chipDefs.get(c)!).filter(ci => ci.proofLive).map(ci => ci.proofHref),
  );
  const tools: OppTool[] = agents
    .filter(agent => wantedTools.has(agent.href))
    .map(agent => ({ name: agent.name, blurb: agent.blurb, href: agent.href }));

  // ---- Worth reading (rail resource layer) ----
  // Personalized picks from the thinking feed, capped at three: the 12-jobs
  // inventory always leads; the starter guide joins when AI is not yet doing
  // real work; the era essay joins when the week is leaking in 2+ areas.
  const byHref = new Map(thinkingEntries.map(entry => [entry.href, entry]));
  const readingHrefs = ["/thinking/ai-tools-for-small-business"];
  if (a.ai !== undefined && a.ai <= 1) readingHrefs.push("/thinking/starter-guide-to-building-with-ai");
  if (flagged.length >= 2) readingHrefs.push("/thinking/the-era-of-agentic-operations");
  const reading: OppReading[] = readingHrefs
    .map(href => byHref.get(href))
    .filter((entry): entry is NonNullable<typeof entry> => !!entry)
    .slice(0, 3)
    .map(entry => ({ title: entry.title, href: entry.href }));

  return {
    title: READ_TITLES[dominantArea],
    overall: { grade: overallPair[0], note: overallPair[1] },
    map: { runsItself, amplified, staysYours },
    moves,
    heard,
    tools,
    reading,
  };
}

// ---- Live pane building state ----
// Right-pane preview while answering: four area rows that wake as chips are
// checked and redact once the anchor lands. Map shows shimmer groups once any
// evidence answer exists. Moves hint without revealing.

export interface LiveAreaRow {
  area: AreaId;
  label: string;
  // dormant = not flagged, listening = chip checked (flagged, anchor pending),
  // captured = anchor answered (verdict held for reveal).
  state: "dormant" | "listening" | "captured";
}

export interface LivePaneState {
  areas: LiveAreaRow[];
  // One shimmer placeholder per area that has an evidence answer (map is forming).
  hiddenShimmerCount: number;
  // Hint copy for the moves slot.
  movePlaceholder: string;
}

export function buildLiveState(a: OpportunityAnswers): LivePaneState {
  const { chips } = a;
  const flagged = new Set(flaggedAreas(chips));

  // An area is "captured" once its anchor answer exists.
  const capturedAreas = new Set<AreaId>();
  if (a.moneyHours !== undefined)     capturedAreas.add("money");
  if (a.customersHours !== undefined) capturedAreas.add("customers");
  if (a.wordsHours !== undefined)     capturedAreas.add("words");
  if (a.glueHours !== undefined)      capturedAreas.add("glue");

  const areas: LiveAreaRow[] = (["money", "customers", "words", "glue"] as AreaId[]).map(area => ({
    area,
    label: AREA_LABELS[area],
    state: capturedAreas.has(area) ? "captured" : flagged.has(area) ? "listening" : "dormant",
  }));

  // One hidden shimmer per area that has an evidence answer (map is taking shape).
  const evidenceAnswered = [
    a.moneyEvidence !== undefined,
    a.customersEvidence !== undefined,
    a.wordsEvidence !== undefined,
    a.glueEvidence !== undefined,
  ].filter(Boolean).length;

  // Moves hint: "Taking shape." once any evidence answer exists, else "Resolves at the end."
  const movePlaceholder = evidenceAnswered > 0
    ? "Taking shape. Revealed at the end."
    : "Resolves at the end.";

  return { areas, hiddenShimmerCount: evidenceAnswered, movePlaceholder };
}

// ---- Progress ----
// How many flagged areas have their anchor answered (= their read is in).
export function buildProgress(a: OpportunityAnswers): { read: number; flaggedTotal: number } {
  const flagged = flaggedAreas(a.chips);
  const answered = (anchor: keyof OpportunityAnswers) => a[anchor] !== undefined;
  const anchorKeys: Record<AreaId, keyof OpportunityAnswers> = {
    money: "moneyHours", customers: "customersHours", words: "wordsHours", glue: "glueHours",
  };
  const read = flagged.filter(area => answered(anchorKeys[area])).length;
  return { read, flaggedTotal: flagged.length };
}
