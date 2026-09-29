// TEMP (2026-09-29): shared copy for the homepage-options preview route
// (/lab/home-options/:v). Remove with the harness once Charlie picks a direction.
// Question set: Claude's draft refined by Astra (docs/positioning-2026-09).
// Examples are illustrative ("the kind of thing we build"), never client results.

export interface Question {
  id: string;
  question: string;
  answer: string;
  link: { label: string; to: string };
}

export const lookGroup = {
  label: "How people find and experience you",
  lead: "Brand and web",
  questions: [
    { id: "site", question: "Does your website do your work justice?", answer: "A clear brand, sharper messaging, and a website that reflects the quality of your work and is easy to keep up to date.", link: { label: "Brand and web", to: "/services/brand-website" } },
    { id: "find", question: "Is it hard for people to find you and take the next step?", answer: "Clear service or program pages, better search visibility, and simpler booking, buying, donating, or signing up.", link: { label: "Brand and web", to: "/services/brand-website" } },
    { id: "back", question: "How do you keep people coming back?", answer: "Easier renewals, repeat visits, and useful follow-up with the customers, donors, and members you already have.", link: { label: "Example: post-sale follow-up", to: "/tools/post-sale-followup" } },
  ] as Question[],
};

export const workGroup = {
  label: "How the work gets done",
  lead: "AI in the workflow",
  questions: [
    { id: "reports", question: "Why does putting reports together take so long?", answer: "Notes, photos, and records turned into a draft report your team reviews and finishes. Think home inspections, or board reports built from program records.", link: { label: "Example: an inspection report", to: "#example" } },
    { id: "copy", question: "Are you entering the same information in three places?", answer: "Your existing tools connected so information moves on its own, with anything unusual sent back to a person.", link: { label: "Example: month-end close", to: "/tools/month-end-close" } },
    { id: "inbox", question: "Are requests getting lost in the inbox?", answer: "Intake, routing, and drafted replies, with one shared view of what still needs attention.", link: { label: "Example: customer email", to: "/tools/customer-inbox" } },
  ] as Question[],
};

export const startQuestion = {
  question: "Could AI help, and where would you start?",
  answer: "A paid strategy sprint finds a worthwhile first step. Sometimes that means an existing tool, and sometimes it means not building at all.",
};

export const alsoOffers = [
  { name: "Strategy sprint", body: "A paid, focused look at what will actually help. Sometimes the answer is not to build.", to: "/services#practice" },
  { name: "New products", body: "From prototype to a launched product. We build and run our own, too.", to: "/services/new-products" },
  { name: "Ongoing partner", body: "A senior digital and product partner, on call as the work needs.", to: "/connect" },
];

// The illustrative workflow: a home inspection report.
export const inspection = {
  path: "example / home inspection report",
  inputs: [["Field notes", "typed or handwritten"], ["Photos", "straight off the phone"], ["Property facts", "from the listing"]],
  readings: [
    { note: "roof - granule loss NE", reading: "Granule loss on the northeast roof slope", area: "Roofing", status: "Confirmed", tone: "done" },
    { note: "gfci kit x", reading: "Kitchen GFCI outlet does not trip", area: "Electrical", status: "Confirm", tone: "check" },
    { note: "stain ceil bath ?", reading: "Bathroom ceiling stain: active leak or old?", area: "Unclear", status: "Needs inspector", tone: "ask" },
  ],
  out: "A draft report in your own template.",
  outDetail: "Findings grouped, photos placed, summary written. Nothing goes in unconfirmed.",
  steps: [
    ["Read", "Field notes become structured findings, each with a confidence level."],
    ["Confirm", "Anything uncertain waits for the inspector. Nothing enters the report unconfirmed."],
    ["Assemble", "Findings, photos, and the summary land in your template, in your wording."],
    ["Send", "The inspector finishes in Word or a browser and sends the same day."],
  ],
};
