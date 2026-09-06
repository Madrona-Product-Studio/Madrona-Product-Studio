import { Link } from "react-router-dom";

// The example read that used to live here (SignalReport) is now the real
// artifact: Hero.tsx renders OpportunityReport from a fixture the engine
// itself produces.

export function BriefArtifact() {
  const rows = [
    ["Prices", "Raspberry flats are up at the wholesale market this week.", "Review pricing"],
    ["Weather", "Heat Saturday afternoon; mornings stay clear.", "Plan picking window"],
    ["Demand", "Two cafés asked about standing orders.", "Draft follow-up"],
  ];
  return (
    <article className="v3-artifact v3-brief-card">
      <header><span>The what-changed brief</span><small>Tuesday · 6:04 am</small></header>
      <div className="v3-brief-title"><span>Berry Good · Demo</span><strong>Three signals worth acting on</strong></div>
      <ul>{rows.map(([tag, text, action], i) => <li key={tag}><span>{tag}</span><p>{text}</p><em className={i === 0 ? "is-routed" : ""}>{action}</em></li>)}</ul>
      <footer>Prepared by the industry agent · Human review required</footer>
    </article>
  );
}

export function WorkflowArtifact() {
  return (
    <article className="v3-artifact v3-flow-card">
      <header><span>Order intake · Demo</span><small>4 items today</small></header>
      <div className="v3-flow">
        <div><small>Request</small><b>Café standing order</b><span>Email received</span></div>
        <i>→</i>
        <div><small>Decision</small><b>Inventory checked</b><span>Review ready</span></div>
        <i>→</i>
        <div><small>Action</small><b>Reply drafted</b><span className="v3-bark">Needs approval</span></div>
      </div>
    </article>
  );
}

export function ReviewArtifact() {
  return (
    <article className="v3-artifact v3-review-card">
      <header><span>Review queue</span><small>2 need attention</small></header>
      <div><span>Customer reply</span><b>Standing order availability</b><em>Ready to approve</em></div>
      <div><span>Invoice follow-up</span><b>North Fork Market · 14 days</b><em>Drafted</em></div>
      <Link to="/tools">Open the live demos <span aria-hidden="true">→</span></Link>
    </article>
  );
}
