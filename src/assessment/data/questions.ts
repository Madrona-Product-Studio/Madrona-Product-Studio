// Q1–Q7 verbatim from 01-ENGINE-SPEC.md §7 (copy confirmed in 04-CONTENT-COPY.md §4).
import type { AssessmentQuestion } from "../types.ts";

export const QUESTIONS: AssessmentQuestion[] = [
  {
    id: "q1-context",
    stage: "Context",
    eyebrow: "Context",
    question: "What kind of business are we looking at?",
    supportingText: "This gives us context. It won’t determine your result.",
    answers: [
      { id: "retail", label: "Retail or online store", weights: { acquisition: 1, retention: 1, operations: 1 } },
      { id: "food-farm", label: "Food, farm, or producer", weights: { trust: 1, operations: 2, capacity: 1 } },
      { id: "services", label: "Services or appointments", weights: { acquisition: 1, retention: 1, operations: 2 } },
      { id: "hospitality", label: "Hospitality or travel", weights: { acquisition: 1, retention: 1, operations: 1, systems: 1 } },
      { id: "health", label: "Health or wellness", weights: { trust: 2, retention: 1, systems: 1 } },
      { id: "other", label: "Something else", weights: {} },
    ],
  },
  {
    id: "q2-friction",
    stage: "Friction",
    eyebrow: "Friction",
    question: "Where do you feel the most friction right now?",
    supportingText: "Pick what you notice most often. Up to three.",
    multi: true,
    maxSelections: 3,
    answers: [
      { id: "understanding", label: "People don’t immediately understand why they should choose us", weights: { trust: 4, clarity: 2 } },
      { id: "more-customers", label: "We need more of the right customers", weights: { acquisition: 4, trust: 1 } },
      { id: "repeat-business", label: "Customers come once, but not often enough again", weights: { retention: 4, acquisition: 1 } },
      { id: "manual-work", label: "Too much work still happens manually", weights: { operations: 4, capacity: 2 } },
      { id: "disconnected-systems", label: "Our tools and processes don’t really work together", weights: { systems: 4, operations: 2 } },
      { id: "new-thing", label: "We have something new we want to build", weights: { product: 4, clarity: 2 } },
    ],
  },
  {
    id: "q3-reality",
    stage: "Friction",
    eyebrow: "Friction",
    question: "Which of these sounds like the business today?",
    supportingText: "Choose any that ring true. Up to three.",
    multi: true,
    maxSelections: 3,
    answers: [
      { id: "better-than-presence", label: "The business is better than the way we present it", weights: { trust: 4, clarity: 1 } },
      { id: "attention-disappears", label: "We get attention, but too much interest disappears before becoming revenue", weights: { acquisition: 4, trust: 1 } },
      { id: "personal-followup", label: "We rely on personal follow-up to keep customers engaged", weights: { retention: 3, operations: 2 } },
      { id: "few-people-hold-it", label: "A few people are holding too much of the operation together", weights: { capacity: 4, operations: 2 } },
      { id: "information-everywhere", label: "Important information lives across inboxes, spreadsheets, docs, and different tools", weights: { systems: 4, operations: 2 } },
      { id: "ideas-no-priority", label: "We have ideas, but struggle to decide what deserves to become real", weights: { product: 3, clarity: 4 } },
    ],
  },
  {
    id: "q4-time",
    stage: "Friction",
    eyebrow: "Friction",
    question: "What consumes more time than it should?",
    supportingText: "Pick up to three.",
    multi: true,
    maxSelections: 3,
    answers: [
      { id: "explain", label: "Explaining what we do over and over", weights: { trust: 3, clarity: 2 } },
      { id: "find-convert", label: "Finding and converting new customers", weights: { acquisition: 4 } },
      { id: "followup", label: "Following up and keeping customers engaged", weights: { retention: 3, operations: 1 } },
      { id: "coordination", label: "Scheduling, coordinating, copying, checking, or updating", weights: { operations: 4, capacity: 2 } },
      { id: "move-information", label: "Moving information between tools and people", weights: { systems: 4, operations: 2 } },
      { id: "decide-next", label: "Figuring out what we should build or improve next", weights: { product: 3, clarity: 3 } },
    ],
  },
  {
    id: "q5-outcome",
    stage: "Direction",
    eyebrow: "Direction",
    question: "Six months from now, what would make the biggest difference?",
    supportingText: "Choose the outcome that would actually change the business.",
    answers: [
      { id: "understood-trusted", label: "People understand us quickly and trust what they see", weights: { trust: 5 } },
      { id: "more-right-customers", label: "More of the right people become customers", weights: { acquisition: 5 } },
      { id: "customers-return", label: "Customers come back more often and stay connected", weights: { retention: 5 } },
      { id: "less-manual", label: "The business runs with less manual work and fewer dropped balls", weights: { operations: 4, capacity: 2 } },
      { id: "systems-together", label: "Our systems work together and give us a clearer view of what’s happening", weights: { systems: 5, operations: 1 } },
      { id: "new-real", label: "A new product, service, or experience is real and in people’s hands", weights: { product: 5, clarity: 1 } },
    ],
  },
  {
    id: "q6-workaround",
    stage: "Direction",
    eyebrow: "Direction",
    question: "How are you making it work today?",
    supportingText: "Choose any that apply. Up to three.",
    multi: true,
    maxSelections: 3,
    answers: [
      { id: "effort-memory", label: "Mostly through personal effort and memory", weights: { capacity: 4, operations: 3 } },
      { id: "patchwork", label: "A patchwork of tools and workarounds", weights: { systems: 4, operations: 2 } },
      { id: "one-person", label: "One person knows how everything works", weights: { capacity: 5, systems: 1 } },
      { id: "more-process", label: "We keep adding process, but it still feels messy", weights: { operations: 3, systems: 3 } },
      { id: "nothing-sticks", label: "We’ve tried improving it, but nothing has really stuck", weights: { clarity: 3, systems: 1 } },
      { id: "not-tackled", label: "We haven’t really tackled it yet", weights: { clarity: 4, product: 1 } },
    ],
  },
  {
    id: "q7-readiness",
    stage: "Direction",
    eyebrow: "Direction",
    question: "What are you ready to do about it?",
    answers: [
      { id: "fix-specific", label: "Fix something specific that clearly isn’t working", weights: { clarity: -1 }, readiness: "fix-specific" },
      { id: "find-focus", label: "Step back and figure out where to focus", weights: { clarity: 3 }, readiness: "find-focus" },
      { id: "prototype", label: "Prototype a better way before making a big commitment", weights: { product: 2, clarity: 1 }, readiness: "prototype" },
      { id: "build", label: "Build the solution and put it into use", weights: { product: 3 }, readiness: "build" },
      { id: "outside-perspective", label: "I mostly want an outside perspective first", weights: { clarity: 2 }, readiness: "outside-perspective" },
    ],
  },
];

export function getQuestion(id: string): AssessmentQuestion {
  const question = QUESTIONS.find((q) => q.id === id);
  if (!question) throw new Error(`Unknown question: ${id}`);
  return question;
}
