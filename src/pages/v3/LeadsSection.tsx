import { Link } from "react-router-dom";

// What we do (positioning clarity pass, 2026-09-29). Replaces the four-door
// "Four problems we hear every week" ledger. Charlie's call: lead with two
// things, brand and web and AI in the workflow, then name the rest quietly.
// The two leads get the space; the supporting offers share one hairline row.
const leads = [
  {
    id: "brand",
    label: "Brand and web",
    title: "A brand and website as good as the business.",
    body: "Positioning, identity, and the site or store people actually use, designed and built to a high bar so they understand you, trust you, and choose you.",
    includes: ["Brand identity and messaging", "Websites and online stores", "Customer journeys that bring people back"],
    route: "/services/brand-website",
  },
  {
    id: "workflow",
    label: "AI in the workflow",
    title: "Workflows where software does the assembly.",
    body: "We find the slow, manual work, the notes, photos, documents, reports, and follow-up, and rebuild it so people keep the judgment and software does the rest.",
    includes: ["Reports and documents drafted from raw material", "Intake, inbox, and follow-up", "Internal tools and agents, with a human checkpoint"],
    route: "/services/ai-operations",
  },
];

const alsoOffers = [
  { name: "New products", body: "From prototype to a launched product. We build and run our own, too.", route: "/services/new-products" },
  { name: "Strategy sprint", body: "A paid, focused look at what will actually help. Sometimes the answer is not to build.", route: "/services#practice" },
  { name: "Ongoing partner", body: "A senior digital and product partner, on call as the work needs.", route: "/connect" },
];

export function LeadsSection() {
  return <section className="v3-section v3-shell v3-leads">
    <div className="v3-help-head">
      <p className="v3-kicker">What we do</p>
      <h2>How your business looks. <span className="v3-flash">How it works.</span></h2>
    </div>
    <div className="v3-leads-grid">
      {leads.map((lead, index) => <article key={lead.id} className="v3-lead">
        <p className="v3-lead-label"><span>0{index + 1}</span>{lead.label}</p>
        <h3>{lead.title}</h3>
        <p>{lead.body}</p>
        <ul>{lead.includes.map(item => <li key={item}>{item}</li>)}</ul>
        <Link className="v3-practice-link" to={lead.route}>{lead.label} <span aria-hidden="true">→</span></Link>
      </article>)}
    </div>
    <div className="v3-also">
      <p className="v3-also-label">We also do</p>
      <ul>{alsoOffers.map(offer => <li key={offer.name}><Link to={offer.route}><strong>{offer.name} <i aria-hidden="true">→</i></strong><span>{offer.body}</span></Link></li>)}</ul>
    </div>
  </section>;
}
