import { Link } from "react-router-dom";

// Section 2 of the v3 architecture: "What we can help with" — the Q→A
// correspondence ledger (Charlie's pick, 2026-08-29). Each item leads with a
// symptom question and answers it with an explicit service label so owners,
// founders, investors, and recruiters all get it at a glance.
interface HelpItem {
  id: string;
  question: string;
  label: string;
  detail: string;
  nouns: string;
  route: string;
}

// Canon door order: Work smarter leads sitewide (agentic-forward, 2026-08-13).
const helpItems: HelpItem[] = [
  {
    id: "ai",
    question: "Feels like AI should help, but not sure where to start?",
    label: "AI & Operations",
    detail: "Practical AI on your real workflows, from the first map to working agents.",
    nouns: "Agents, assistants, automation, internal tools",
    route: "/services/ai-operations",
  },
  {
    id: "web",
    question: "Website just OK, and not doing the business justice?",
    label: "Brand & Website",
    detail: "Brand, messaging, and a site built to earn trust.",
    nouns: "Positioning, identity, websites and stores",
    route: "/services/brand-website",
  },
  {
    id: "growth",
    question: "People buy once, then you never hear from them again?",
    label: "Growth & Retention",
    detail: "Make it easier for customers to buy, come back, and stay connected.",
    nouns: "Online stores, loyalty, lifecycle email",
    route: "/services/growth-retention",
  },
  {
    id: "product",
    question: "Have an idea that deserves to become real?",
    label: "New Products",
    detail: "From concept to something real people use.",
    nouns: "Strategy, prototypes, MVPs, launch",
    route: "/services/new-products",
  },
];

// One tinted square stamp per area (the sanctioned sage/bark/slate trio),
// with a single clean motif each — the answer side's visual anchor
// (replaced the mono Q/A markers, Charlie 2026-08-29).
// Tile tints live in CSS (v3-tile-*) so the day/dusk/night themes can
// re-ground them - inline hex here would stay pastel on the dark states.

function HelpIcon({ id }: { id: string }) {
  const paths: Record<string, React.ReactNode> = {
    ai: <><path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.4 3.4l2.1 2.1M10.5 10.5l2.1 2.1M12.6 3.4l-2.1 2.1M5.5 10.5l-2.1 2.1" /></>,
    web: <><rect x="2" y="2.5" width="12" height="11" rx="1.5" /><path d="M2 6h12M6 6v7.5" /></>,
    growth: <><path d="M2 12.5l4-4 2.5 2.5L13.5 5" /><path d="M9.5 4.5h4v4" /></>,
    product: <><path d="M8 1.8l5.5 3.1v6.2L8 14.2l-5.5-3.1V4.9L8 1.8z" /><path d="M2.7 5L8 8l5.3-3M8 8v6" /></>,
  };
  return <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[id]}</svg>;
}

export function HelpSection() {
  return <section className="v3-section v3-shell v3-help">
    <div className="v3-help-head">
      <p className="v3-kicker">What we can help with</p><h2>Four problems we hear <span>every week.</span></h2>
      <p className="v3-help-lede">Owners, founders, and teams bring us these. Each one has a clear first move, and we have built it before.</p>
    </div>
    <div className="v3-help-ledger">
      {helpItems.map((item, index) => <Link to={item.route} key={item.id} className="v3-help-ledger-row">
        <span className="v3-help-ledger-num">0{index + 1}</span>
        <h3>{item.question}</h3>
        <span className="v3-help-ledger-line" aria-hidden="true" />
        <div className="v3-help-ledger-answer">
          <span className={`v3-help-ledger-icon v3-tile-${item.id}`}><HelpIcon id={item.id} /></span>
          <div>
            <strong>{item.label} <i aria-hidden="true">→</i></strong>
            <p>{item.detail}</p>
            <small>{item.nouns}</small>
          </div>
        </div>
      </Link>)}
    </div>
  </section>;
}
