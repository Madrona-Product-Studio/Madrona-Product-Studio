// The example command center (Charlie, 2026-10-05): on /ai-setup, what step
// three looks like for a real kind of business. Berry Good Berry Farm is our
// demonstration business; every number is illustrative and labeled so. The
// capability list on the left is also the tab strip, so reading what it can
// do and seeing it are the same motion. No autoplay: a visitor picks a view.
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { WindowBar } from "../ReadCard";
import "./command-center.css";

type Row = { label: string; note?: string; status?: string; tone?: "you" | "ok" | "warn" };
type View = { id: string; name: string; line: string; title: string; stats?: [string, string][]; groups: { heading: string; rows: Row[] }[] };

const VIEWS: View[] = [
  {
    id: "brief", name: "Morning brief", line: "What ran overnight, and the two things that need you.",
    title: "Good morning, Maya.",
    groups: [
      { heading: "Needs you", rows: [
        { label: "Refund request from Greenridge Market", note: "Reply drafted. Yours to approve.", status: "Approve", tone: "you" },
        { label: "Saturday picking schedule", note: "Built from 38 pickup orders.", status: "Review", tone: "you" },
      ] },
      { heading: "Ran on its own", rows: [
        { label: "6 invoice reminders sent", note: "2 already paid", status: "Done", tone: "ok" },
        { label: "14 customer questions answered", note: "From your prices and hours", status: "Done", tone: "ok" },
        { label: "Reorder reminders to 9 regulars", note: "3 orders placed", status: "Done", tone: "ok" },
      ] },
    ],
  },
  {
    id: "money", name: "Money", line: "Cash, what you are owed, and what is due, in one honest view.",
    title: "Money, this week",
    stats: [["$18,420", "Cash across 3 accounts"], ["$3,260", "Owed to you, 5 invoices"], ["$4,100", "Payroll, Friday"]],
    groups: [
      { heading: "Getting paid", rows: [
        { label: "Invoice #241, Bellingham Co-op", note: "3 weeks late. Second reminder sent.", status: "Chasing", tone: "warn" },
        { label: "Invoice #238, Fairhaven Café", note: "Paid this morning", status: "Paid", tone: "ok" },
      ] },
      { heading: "Month-end", rows: [
        { label: "3 transactions flagged for review", note: "Square payout does not match the deposit", status: "Review", tone: "you" },
      ] },
    ],
  },
  {
    id: "customers", name: "Customers", line: "The inbox, reviews, and regulars, with replies drafted in your voice.",
    title: "Customers",
    stats: [["14", "Questions answered"], ["4.9★", "Reviews, 3 new"], ["2", "Regulars near a reward"]],
    groups: [
      { heading: "Waiting on you", rows: [
        { label: "Two-star review: “berries were soft”", note: "Apology and a credit drafted", status: "Send", tone: "you" },
      ] },
      { heading: "Handled", rows: [
        { label: "“Are you open Labor Day?”", note: "Answered from your hours", status: "Sent", tone: "ok" },
        { label: "Dana R., quiet for 5 weeks", note: "Win-back offer sent", status: "Sent", tone: "ok" },
      ] },
    ],
  },
  {
    id: "orders", name: "Orders & stock", line: "Online orders, pickup, and what is running low.",
    title: "Orders and stock",
    stats: [["38", "Saturday pickups"], ["2", "Café standing orders"], ["12", "Raspberry flats left"]],
    groups: [
      { heading: "Heads up", rows: [
        { label: "Raspberry flats running low", note: "Sells out by Saturday at this pace. Pick list adjusted.", status: "Watch", tone: "warn" },
      ] },
      { heading: "Handled", rows: [
        { label: "Fairhaven Café standing order", note: "Confirmed for Friday delivery", status: "Set", tone: "ok" },
        { label: "Pickup reminders", note: "Sent to Saturday's 38 customers", status: "Sent", tone: "ok" },
      ] },
    ],
  },
  {
    id: "week", name: "Weekly report", line: "Sales, what changed, and one thing worth a look, every Monday.",
    title: "Last week, in plain English",
    stats: [["+12%", "Sales vs. the week before"], ["Tue", "Slowest day"], ["41%", "Orders from regulars"]],
    groups: [
      { heading: "Worth a look", rows: [
        { label: "Blueberry pints outsold flats 3 to 1", note: "Worth pricing pints for the farm stand too", status: "Idea", tone: "you" },
        { label: "Wholesale raspberry prices up this week", note: "From the industry brief", status: "Note", tone: "warn" },
      ] },
    ],
  },
];

function Status({ row }: { row: Row }) {
  if (!row.status) return null;
  return <span className={`cc-status is-${row.tone ?? "ok"}`}>{row.status}</span>;
}

export function CommandCenter({ footer }: { footer?: ReactNode }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const view = VIEWS[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = VIEWS.length - 1;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return <div className="cc">
    <div className="cc-caps" role="tablist" aria-label="What the command center does" aria-orientation="vertical" onKeyDown={onKeyDown}>
      {VIEWS.map((v, i) => <button key={v.id} ref={el => { tabs.current[i] = el; }} type="button" role="tab" id={`cc-tab-${v.id}`} aria-controls="cc-panel" aria-selected={i === active} tabIndex={i === active ? 0 : -1} className={i === active ? "is-active" : undefined} onClick={() => setActive(i)}>
        <strong>{v.name}</strong><span>{v.line}</span>
      </button>)}
      {footer}
    </div>

    <article className="v3-artifact cc-window" aria-label="Example command center for Berry Good Berry Farm">
      <WindowBar path="berry good · command center" note="Illustrative · demo business" />
      <div className="cc-body">
        <nav className="cc-side" aria-hidden="true">
          <b className="cc-logo">Berry Good</b>
          {VIEWS.map((v, i) => <span key={v.id} className={i === active ? "is-active" : undefined}>{v.name}</span>)}
        </nav>
        <div className="cc-main" id="cc-panel" role="tabpanel" aria-labelledby={`cc-tab-${view.id}`} key={view.id}>
          <h3>{view.title}</h3>
          {view.stats && <dl className="cc-stats">{view.stats.map(([n, l]) => <div key={l}><dt>{l}</dt><dd>{n}</dd></div>)}</dl>}
          {view.groups.map(g => <section key={g.heading} className="cc-group">
            <h4>{g.heading}</h4>
            <ul>{g.rows.map(r => <li key={r.label} className={r.tone === "you" ? "is-you" : undefined}>
              <span className="cc-row-text"><b>{r.label}</b>{r.note && <small>{r.note}</small>}</span>
              <Status row={r} />
            </li>)}</ul>
          </section>)}
        </div>
      </div>
    </article>
    {footer && <div className="cc-foot-m">{footer}</div>}
  </div>;
}
