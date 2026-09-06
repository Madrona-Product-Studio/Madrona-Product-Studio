// AI Opportunity Assessment engine (docs/redesign-2026-08/ai-opportunity-spec.md).
// Discipline: every report line derives 1:1 from what the visitor gave us.
// Deterministic; the optional AI assist (src/assessment-ai) only suggests
// chips and bridges the heard lines, it never writes a verdict.

import { agents } from "../../data/agents.js";
import { thinkingEntries } from "../../data/thinking.js";

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
  // The three closers can be skipped; area questions are what the read is
  // built from, so they stay required.
  skippable?: boolean;
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
  chip: ChipId;
  name: string;
  blurb: string;
  href: string;
}

export type MoveRank = "Now" | "Next" | "Later" | "Also";

export interface OppReading {
  title: string;
  href: string;
}

export interface OpportunityReportData {
  title: string;
  overall: { grade: string; note: string };
  map: { runsItself: MapItem[]; amplified: MapItem[]; staysYours: string[] };
  // A fourth rank exists so four flagged areas never lose one silently.
  moves: { rank: MoveRank; move: OppMove }[];
  // One line under the moves heading, set by the AI-today answer: extend
  // what already runs, or start with one. Absent when the closer was skipped.
  movesLead?: string;
  heard: string[]; // one line per flagged area + optional other echo + readiness close
  // The area the title comes from ("none" for the steady ship) and the Now
  // move's chip, for analytics and the booking notes.
  dominantArea: AreaId | "none";
  nowChip?: ChipId;
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

// Hour weights for scoring (index maps to HOUR_OPTIONS). The spec had the
// last two as 9 and 8; "I've stopped counting" is the most overwhelmed
// answer, so it weighs the most (audit 2026-09-06).
const HOUR_WEIGHTS = [1, 3, 6, 9, 10];

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
    skippable: true,
    options: ["Not at all", "We've poked at ChatGPT", "It helps with a task or two", "It's part of daily work", "Automation runs on its own"],
  },
  {
    id: "blocker",
    module: "AI today",
    question: "What's kept AI from doing more here?",
    support: "No wrong answer. Check everything that's played a part.",
    multi: true,
    skippable: true,
    options: ["No time to figure it out", "Tried tools that didn't stick", "Don't trust it with customers", "Our info is scattered everywhere", "Didn't know where to start"],
  },
  {
    id: "readiness",
    module: "Wrapping up",
    question: "What are you ready to do about it?",
    skippable: true,
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

// ---- Helpers: areas, chips, evidence ----
const AREA_ORDER: AreaId[] = ["money", "customers", "words", "glue"];

const ANCHOR_KEY: Record<AreaId, keyof OpportunityAnswers> = {
  money: "moneyHours", customers: "customersHours", words: "wordsHours", glue: "glueHours",
};
const EVIDENCE_KEY: Record<AreaId, keyof OpportunityAnswers> = {
  money: "moneyEvidence", customers: "customersEvidence", words: "wordsEvidence", glue: "glueEvidence",
};

const chipDefs = new Map(openerChips.map(ci => [ci.chip, ci]));

// Evidence option → the chip it speaks for (null = no single chip). This is
// the seam that keeps "What we heard" and "Where to start" agreeing: an
// evidence pick scores its chip when the moves are ranked, and a flagged
// chip pre-checks its evidence row when the question is asked.
const EVIDENCE_CHIP: Record<AreaId, (ChipId | null)[]> = {
  money:     ["invoices", "books", "cash", null, null],
  customers: ["questions", "followup", "reviews", "followup", null],
  words:     ["quotes", "quotes", "content", "contracts", null],
  glue:      ["scheduling", "retyping", null, "industry", null],
};

export function flaggedAreas(chips: ChipId[]): AreaId[] {
  return AREA_ORDER.filter(a => chips.some(c => chipDefs.get(c)?.area === a));
}

function chipsInArea(chips: ChipId[], area: AreaId): ChipId[] {
  return chips.filter(c => chipDefs.get(c)?.area === area);
}

function hourIndex(a: OpportunityAnswers, area: AreaId): number | undefined {
  return a[ANCHOR_KEY[area]] as number | undefined;
}

function hourWeight(a: OpportunityAnswers, area: AreaId): number {
  const val = hourIndex(a, area);
  return val !== undefined ? HOUR_WEIGHTS[val] : 0;
}

function evidencePicks(a: OpportunityAnswers, area: AreaId): number[] {
  return (a[EVIDENCE_KEY[area]] as number[] | undefined) ?? [];
}

// The evidence rows the checked chips already answer. Used to pre-check the
// evidence question and to stand in for it when it isn't asked (an area
// with one chip has nothing to disambiguate).
export function presetEvidence(chips: ChipId[]): Partial<OpportunityAnswers> {
  const out: Record<string, number[]> = {};
  for (const area of flaggedAreas(chips)) {
    const rows = EVIDENCE_CHIP[area]
      .map((chip, i) => (chip && chips.includes(chip) ? i : -1))
      .filter(i => i >= 0);
    if (rows.length) out[EVIDENCE_KEY[area]] = rows;
  }
  return out as Partial<OpportunityAnswers>;
}

// ---- buildSequence ----
// Per-area anchor (+ evidence when the area has more than one chip, since a
// single chip already says where the time goes) for flagged areas only, in
// spec order (money → customers → words → glue), then the three closers.
export function buildSequence(chips: ChipId[]): OppQuestion[] {
  const seq: OppQuestion[] = [];
  for (const area of flaggedAreas(chips)) {
    seq.push(AREA_QUESTIONS[area].anchor);
    if (chipsInArea(chips, area).length > 1) seq.push(AREA_QUESTIONS[area].evidence);
  }
  seq.push(...CROSS_CUTTING);
  return seq;
}

// Prune answers for areas that are no longer flagged, so going back to the
// opener and unchecking a chip can't leave a stale anchor steering the read.
export function pruneAnswers(a: OpportunityAnswers): OpportunityAnswers {
  const flagged = new Set(flaggedAreas(a.chips));
  const next: OpportunityAnswers = { ...a };
  for (const area of AREA_ORDER) {
    if (!flagged.has(area)) {
      delete next[ANCHOR_KEY[area]];
      delete next[EVIDENCE_KEY[area]];
    }
  }
  return next;
}

// Every question the sequence asks that isn't skippable has an answer.
export function isComplete(a: OpportunityAnswers): boolean {
  if (!a.chips.length) return false;
  return buildSequence(a.chips).every(q => {
    if (q.skippable) return true;
    const v = a[q.id];
    return q.multi ? Array.isArray(v) && v.length > 0 : v !== undefined;
  });
}

// ---- computeOpportunityReport ----

// Spec group membership (determines runsItself vs amplified bucket).
const RUNS_ITSELF_CHIPS = new Set<ChipId>(["invoices","books","cash","questions","reviews","scheduling","retyping","industry"]);
const AMPLIFIED_CHIPS   = new Set<ChipId>(["quotes","content","contracts","followup"]);

// Readiness closer lines (the same five the earlier assessment used).
const READINESS_LINES = [
  "You said something specific is broken. The conversation starts there.",
  "You said you want focus. We'd map the options and rank them by payback.",
  "You said prototype first. We agree, that's how we work anyway.",
  "You said you're ready to build. We'd scope the smallest useful version.",
  "You asked for perspective first. That's what the free 30 minutes is for.",
];

// The AI-today answer sets the register of the moves: extend what runs, or
// start with one. Index maps to the closer's options; skipped = no line.
const MOVES_LEAD = [
  "Nothing runs on its own yet, so start with one move and let it earn the next.",
  "You've poked at ChatGPT. The first move turns poking into a job that runs on its own.",
  "AI already helps with a task or two. The first move makes one of those run without you.",
  "AI is part of daily work here, so these extend what already runs rather than starting over.",
  "Automation already runs on its own. These moves add to it; nothing here starts from zero.",
];

// An area that costs an hour or so, or that the visitor called mostly
// handled, isn't where the leverage is. It stays on the map and gets a
// heard line, but it doesn't title the read or earn a move.
function isQuietArea(a: OpportunityAnswers, area: AreaId): boolean {
  if (hourIndex(a, area) === 0) return true;
  const exclusive = AREA_QUESTIONS[area].evidence.exclusive;
  return area === "customers" && exclusive !== undefined && evidencePicks(a, area).includes(exclusive);
}

const HEARD_QUIET: Record<AreaId, string> = {
  money:     "Money admin takes about an hour a week. That's not where the hours are hiding, so it stays off the moves.",
  customers: "Customer follow-up takes about an hour a week. Not where the hours are hiding, so it stays off the moves.",
  words:     "Writing and paperwork take about an hour a week. Not where the hours are hiding, so they stay off the moves.",
  glue:      "Glue work takes about an hour a week. Not where the hours are hiding, so it stays off the moves.",
};

export function computeOpportunityReport(a: OpportunityAnswers): OpportunityReportData {
  const { chips } = a;
  const flagged = flaggedAreas(chips);

  // Effective chips: what was checked, plus what the evidence named. A
  // visitor who checks "invoices" then says the drag is bookkeeping has
  // flagged the books; the map, moves, and tools follow that.
  const effective: ChipId[] = [...chips];
  for (const area of flagged) {
    for (const i of evidencePicks(a, area)) {
      const chip = EVIDENCE_CHIP[area][i];
      if (chip && !effective.includes(chip)) effective.push(chip);
    }
  }

  // ---- Map: runsItself, amplified ----
  const runsItself: MapItem[] = effective.filter(c => RUNS_ITSELF_CHIPS.has(c)).map(c => chipDefs.get(c)!);
  const amplified:  MapItem[] = effective.filter(c => AMPLIFIED_CHIPS.has(c)).map(c => chipDefs.get(c)!);

  // ---- Stays-yours (honesty rules, always ≥1) ----
  const staysYours: string[] = [];
  if (a.blocker?.includes(2)) { // "Don't trust it with customers"
    staysYours.push("The sensitive replies. Drafts wait for your okay; nothing sends itself.");
  }
  if (effective.includes("followup")) {
    staysYours.push("The relationships. AI drafts the words; the caring stays yours.");
  }
  if (!staysYours.length) {
    staysYours.push("The judgment calls. Pricing, people, and promises stay human.");
  }

  // ---- Active areas: flagged and not quiet ----
  const active = flagged.filter(area => !isQuietArea(a, area));
  const scattered = a.blocker?.includes(3) ?? false; // "Our info is scattered everywhere"

  // Area score: hour weight, with a nudge to glue when the info is
  // scattered (that's the glue problem in the owner's words).
  const areaScore = (area: AreaId) => hourWeight(a, area) + (scattered && area === "glue" ? 1 : 0);

  // ---- Named read: dominant area by score, ties in spec order ----
  let dominantArea: AreaId | "none" = "none";
  let bestScore = 0;
  for (const area of active) {
    const s = areaScore(area);
    if (s > bestScore) { bestScore = s; dominantArea = area; }
  }

  // ---- Overall grade (by count of active areas) ----
  const overallPair = OVERALL[Math.min(active.length, 3)];

  // ---- Ranked moves, one per active area ----
  // Areas sort by score; within an area the chip the evidence named wins,
  // then a live /tools proof breaks ties, then checked order.
  const sortedAreas = [...active].sort((x, y) => {
    const diff = areaScore(y) - areaScore(x);
    return diff !== 0 ? diff : AREA_ORDER.indexOf(x) - AREA_ORDER.indexOf(y);
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

  const ranks: MoveRank[] = ["Now", "Next", "Later", "Also"];
  const moves: OpportunityReportData["moves"] = [];
  const usedChips = new Set<ChipId>();

  for (const area of sortedAreas) {
    if (moves.length >= ranks.length) break;
    const named = evidencePicks(a, area).map(i => EVIDENCE_CHIP[area][i]).filter((c): c is ChipId => !!c);
    const candidates = chipsInArea(effective, area).filter(c => !usedChips.has(c));
    if (!candidates.length) continue;
    const chipScore = (c: ChipId) =>
      (chips.includes(c) ? 1 : 0) +
      (named.includes(c) ? 2 : 0) +
      (chipDefs.get(c)!.proofLive ? 0.5 : 0) +
      (scattered && c === "retyping" ? 2 : 0);
    const pick = [...candidates].sort((x, y) => {
      const diff = chipScore(y) - chipScore(x);
      return diff !== 0 ? diff : effective.indexOf(x) - effective.indexOf(y);
    })[0];
    usedChips.add(pick);
    moves.push({ rank: ranks[moves.length], move: buildMove(pick) });
  }

  // ---- What we heard (heard[]) ----
  // One line per flagged area. Rule: an exclusive pick speaks for itself;
  // three or more distinct piles (two rows that name the same chip, like
  // quotes and reports, count once) use the area's everything-drags line
  // where one exists (words and glue); otherwise the first-checked line
  // leads. Quiet-by-hours areas say so plainly.
  const heard: string[] = [];
  for (const area of flagged) {
    if (hourIndex(a, area) === 0) { heard.push(HEARD_QUIET[area]); continue; }
    const picks = evidencePicks(a, area);
    const verdicts: string[] = area === "money" ? MONEY_VERDICTS : area === "customers" ? CUSTOMER_VERDICTS : area === "words" ? WORDS_VERDICTS : GLUE_VERDICTS;
    const exclusiveIdx = AREA_QUESTIONS[area].evidence.exclusive;
    const manyIdx = area === "words" || area === "glue" ? exclusiveIdx : undefined;
    const piles = new Set(picks.map(i => EVIDENCE_CHIP[area][i] ?? `row${i}`)).size;
    let line: string | undefined;
    if (exclusiveIdx !== undefined && picks.includes(exclusiveIdx)) line = verdicts[exclusiveIdx];
    else if (piles >= 3 && manyIdx !== undefined) line = verdicts[manyIdx];
    else if (picks.length) line = verdicts[picks[0]];
    heard.push(line ?? `Most of the drag in ${AREA_LABELS[area].toLowerCase()} has a repeatable shape. That's what software handles best.`);
  }

  // The blocker that deserves an echo: tools that didn't stick.
  if (a.blocker?.includes(1)) {
    heard.push("You've tried tools that didn't stick. Worth naming: the ones that stick start from one job you already repeat, not from the tool.");
  }

  // otherText echo. Nothing in the engine reads it; the call does.
  if (a.otherText?.trim()) {
    const text = a.otherText.trim();
    heard.push(`In your words: "${/[.!?]$/.test(text) ? text : `${text}.`}" We'll bring that up on the call.`);
  }

  // Readiness closer (skipped = no line).
  if (a.readiness !== undefined) {
    heard.push(READINESS_LINES[a.readiness]);
  }

  // ---- Tools worth a look (report resource layer) ----
  // Every effective chip whose proof is a live /tools demo surfaces its
  // agent from the registry (name + blurb are the registry's, so copy never
  // drifts). Registry order; the visitor's picks decide membership.
  const chipByHref = new Map(effective.map(c => chipDefs.get(c)!).filter(ci => ci.proofLive).map(ci => [ci.proofHref, ci.chip]));
  const tools: OppTool[] = agents
    .filter(agent => chipByHref.has(agent.href))
    .map(agent => ({ chip: chipByHref.get(agent.href)!, name: agent.name, blurb: agent.blurb, href: agent.href }));

  // ---- Worth reading (rail resource layer) ----
  // Personalized picks from the thinking feed, capped at three: the 12-jobs
  // inventory always leads; the starter guide joins when AI is not yet doing
  // real work; the era essay joins when the week is leaking in 2+ areas.
  const byHref = new Map(thinkingEntries.map(entry => [entry.href, entry]));
  const readingHrefs = ["/thinking/ai-tools-for-small-business"];
  if (a.ai !== undefined && a.ai <= 1) readingHrefs.push("/thinking/starter-guide-to-building-with-ai");
  if (active.length >= 2) readingHrefs.push("/thinking/the-era-of-agentic-operations");
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
    movesLead: a.ai !== undefined && moves.length ? MOVES_LEAD[a.ai] : undefined,
    heard,
    dominantArea,
    nowChip: moves[0]?.move.chip,
    tools,
    reading,
  };
}

// ---- Plain-words answer summary ----
// What the visitor told us, as one short paragraph of their own choices.
// Feeds the booking notes, the studio copy of the emailed read, and the
// AI bridge (which may only restate what is in here).
export function summarizeAnswers(a: OpportunityAnswers): string {
  const parts: string[] = [];
  if (a.chips.length) parts.push(`Flagged: ${a.chips.map(c => chipShort[c]).join(", ")}.`);
  for (const area of flaggedAreas(a.chips)) {
    const h = hourIndex(a, area);
    const picks = evidencePicks(a, area).map(i => AREA_QUESTIONS[area].evidence.options[i]);
    const bits: string[] = [];
    if (h !== undefined) bits.push(`${HOUR_OPTIONS[h].toLowerCase()} a week`);
    if (picks.length) bits.push(picks.join("; ").toLowerCase());
    if (bits.length) parts.push(`${AREA_LABELS[area]}: ${bits.join(". ")}.`);
  }
  if (a.ai !== undefined) parts.push(`AI today: ${CROSS_CUTTING[0].options[a.ai].toLowerCase()}.`);
  if (a.blocker?.length) parts.push(`What's held it back: ${a.blocker.map(i => CROSS_CUTTING[1].options[i].toLowerCase()).join("; ")}.`);
  if (a.readiness !== undefined) parts.push(`Ready to: ${CROSS_CUTTING[2].options[a.readiness].toLowerCase()}.`);
  if (a.otherText?.trim()) parts.push(`In their words: "${a.otherText.trim()}"`);
  return parts.join(" ");
}

// ---- Live pane building state ----
// Right-pane preview while answering: four area rows that wake as chips are
// checked and redact once the anchor lands. Moves hint without revealing.

export interface LiveAreaRow {
  area: AreaId;
  label: string;
  // dormant = not flagged, listening = chip checked (flagged, anchor pending),
  // captured = anchor answered (verdict held for reveal).
  state: "dormant" | "listening" | "captured";
}

export interface LivePaneState {
  areas: LiveAreaRow[];
  // Hint copy for the moves slot.
  movePlaceholder: string;
}

export function buildLiveState(a: OpportunityAnswers): LivePaneState {
  const flagged = new Set(flaggedAreas(a.chips));

  // An area is "captured" once its anchor answer exists.
  const capturedAreas = new Set(AREA_ORDER.filter(area => hourIndex(a, area) !== undefined));

  const areas: LiveAreaRow[] = AREA_ORDER.map(area => ({
    area,
    label: AREA_LABELS[area],
    state: capturedAreas.has(area) ? "captured" : flagged.has(area) ? "listening" : "dormant",
  }));

  // Moves hint: "Taking shape." once any anchor is in, else "Resolves at the end."
  const movePlaceholder = capturedAreas.size > 0
    ? "Taking shape. Revealed at the end."
    : "Resolves at the end.";

  return { areas, movePlaceholder };
}

// ---- Progress ----
// How many flagged areas have their anchor answered (= their read is in).
export function buildProgress(a: OpportunityAnswers): { read: number; flaggedTotal: number } {
  const flagged = flaggedAreas(a.chips);
  const read = flagged.filter(area => hourIndex(a, area) !== undefined).length;
  return { read, flaggedTotal: flagged.length };
}
