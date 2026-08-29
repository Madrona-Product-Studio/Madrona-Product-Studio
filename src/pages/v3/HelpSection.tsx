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
    label: "AI consulting",
    detail: "Practical AI on your real workflows, from the first map to working agents.",
    nouns: "Agents, assistants, automation, internal tools",
    route: "/v3/services/work-smarter",
  },
  {
    id: "growth",
    question: "People buy once, then you never hear from them again?",
    label: "Growth and retention",
    detail: "Make it easier for customers to buy, come back, and stay connected.",
    nouns: "Online stores, loyalty, lifecycle email",
    route: "/v3/services/grow-your-business",
  },
  {
    id: "web",
    question: "Website just OK, and not doing the business justice?",
    label: "Website redesign",
    detail: "Brand, messaging, and a site built to earn trust.",
    nouns: "Positioning, identity, websites and stores",
    route: "/v3/services/build-trust",
  },
  {
    id: "product",
    question: "Have an idea that deserves to become real?",
    label: "New product building",
    detail: "From concept to something real people use.",
    nouns: "Strategy, prototypes, MVPs, launch",
    route: "/v3/services/new-products",
  },
];

export function HelpSection() {
  return <section className="v3-section v3-shell v3-help">
    <div className="v3-help-head">
      <div><p className="v3-kicker">What we can help with</p><h2>Four problems we hear <span>every week.</span></h2></div>
      <p className="v3-help-lede">Owners, founders, and teams bring us these. Each one has a clear first move, and we have built it before.</p>
    </div>
    <div className="v3-help-ledger">
      {helpItems.map((item, index) => <Link to={item.route} key={item.id} className="v3-help-ledger-row">
        <span className="v3-help-ledger-num">0{index + 1}</span>
        <div className="v3-help-ledger-question">
          <span>Q</span>
          <h3>{item.question}</h3>
        </div>
        <span className="v3-help-ledger-line" aria-hidden="true" />
        <div className="v3-help-ledger-answer">
          <span>A</span>
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
