import { WindowBar } from "../ReadCard";
import "./automation-map.css";

// Growth & Retention showcase (2026-09-29 refactor). Charlie's reference was a
// viral neon whiteboard of plumber automations; this keeps its substance (one
// customer, booking to repeat visit, one review branch) in Madrona's language:
// a single rail, with only the moments a person makes the call marked. Illustrative, labeled as such: no client,
// no numbers, no prices.

// Review pass (same day): cut from ten steps to seven (the window ran ~1,300px
// tall on a phone); "Automatic" became the unmarked default, so only the
// moments a person makes the call carry a tag, and that tag is ink, not
// orange (orange stays the identity color, never a status). The job report is
// drafted for the tech to check, not sent unseen, to match the AI & Operations
// promise. Every customer gets the review link; an unhappy one also gets a
// call. The branch lost its card borders, and "Outcomes" became "Intended
// benefits", since this is a proposed process, not a measured one.

type Who = "auto" | "you" | "start";
type Step = { title: string; detail: string; who: Who };

const tag: Partial<Record<Who, string>> = { you: "Your call", start: "Customer" };

const phases: { label: string; steps: Step[]; branchAfter?: boolean }[] = [
  {
    label: "Booking",
    steps: [
      { who: "start", title: "Books a repair online", detail: "A leaking water heater, booked from the website at 9pm." },
      { who: "auto", title: "Confirmation, and a customer record", detail: "Date, time, and a way to reschedule. The job lands on their record." },
      { who: "you", title: "A tech is assigned", detail: "You choose who goes. The schedule and address are filled in." },
    ],
  },
  {
    label: "The visit",
    steps: [
      { who: "auto", title: "A reminder, then an “on the way” text", detail: "An easy reschedule the day before; the tech’s name on the day." },
      { who: "you", title: "Notes and photos become a job report", detail: "Drafted for the tech to check, then sent with the invoice." },
    ],
  },
  {
    label: "After",
    branchAfter: true,
    steps: [
      { who: "auto", title: "Asks how it went, with a review link", detail: "Every customer, a couple of days later." },
    ],
  },
  {
    label: "Later",
    steps: [
      { who: "auto", title: "Seasonal reminders, and a note when it’s been a while", detail: "The yearly flush, the winter pipe check, so they call you first." },
    ],
  },
];

function Row({ step }: { step: Step }) {
  const label = tag[step.who];
  return <li className={`v3-am-step is-${step.who}`}>
    <i className="v3-am-mark" aria-hidden="true" />
    <div className="v3-am-text"><strong>{step.title}</strong><span>{step.detail}</span></div>
    {label && <b className="v3-am-tag">{label}</b>}
  </li>;
}

function Branch() {
  return <li className="v3-am-branch">
    <div className="v3-am-fork" aria-hidden="true"><i /><i /></div>
    <div className="v3-am-arms">
      <section className="v3-am-arm is-good" aria-label="If it went well">
        <p className="v3-am-arm-when">If it went well</p>
        <strong>A thank-you</strong>
        <span>And one gentle nudge if the review is still unwritten.</span>
      </section>
      <section className="v3-am-arm is-bad" aria-label="If it didn’t">
        <p className="v3-am-arm-when">If it didn’t</p>
        <strong>A task for you to call them</strong>
        <span>A person reaches out, not a form letter.</span>
        <b className="v3-am-tag">Your call</b>
      </section>
    </div>
  </li>;
}

export function AutomationMap() {
  return <article className="v3-artifact v3-am" aria-label="Illustrative example: one customer’s journey at a local plumbing company">
    <WindowBar path="plumbing-co / one customer" note="Illustrative example" />
    <div className="v3-am-head">
      <p className="v3-am-eyebrow">A local plumbing company</p>
      <p className="v3-am-title">One customer, from booking to repeat visit</p>
      <p className="v3-am-sub">Every step runs on its own unless it’s marked “Your{"\u00a0"}call.”</p>
    </div>
    <ol className="v3-am-flow">
      {phases.map(phase => <li key={phase.label} className="v3-am-phase">
        <span className="v3-am-phase-label">{phase.label}</span>
        <ol className="v3-am-steps">
          {phase.steps.map(step => <Row key={step.title} step={step} />)}
          {phase.branchAfter && <Branch />}
        </ol>
      </li>)}
    </ol>
    <footer className="v3-am-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
