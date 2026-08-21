import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ConnectorRow } from "./connectors";

/* =========================================================================
   Agent-deployment demo template

   A functional header for an interactive agent demo — the shell for the
   /agents gallery. Deliberately NOT the /thinking article header: no byline,
   no standfirst. Instead it answers, at a glance, the two questions a business
   owner actually has — what does this agent do, and what would it take to
   deploy it on my operation — with a spec card and clear actions.
   ========================================================================= */

export type AgentSpec = { label: string; value: ReactNode };

export const Glyph = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

// The needs-from-you / where-it-ends fact block — same shape as the inventory
// article, so every agent page frames its honest boundaries identically.
export function AgentFact({ tone, icon, label, children }: { tone: string; icon: string; label: string; children: ReactNode }) {
  return (
    <div>
      <span className="m2-ab4-ico art-inv-ico" data-tone={tone}><Glyph d={icon} /></span>
      <p className="art-inv-lbl">{label}</p>
      <p>{children}</p>
    </div>
  );
}

export function AgentDemoHero({
  category,
  name,
  tagline,
  spec,
  runHref = "#run",
  runLabel = "Run the live demo",
  deployHref = "/connect",
  deployLabel = "Deploy this on your books",
}: {
  category: string;
  name: string;
  tagline: ReactNode;
  spec: AgentSpec[];
  runHref?: string;
  runLabel?: string;
  deployHref?: string;
  deployLabel?: string;
}) {
  return (
    <header className="agx-hero">
      <div className="agx-hero-main">
        <p className="agx-hero-eyebrow">
          <span className="agx-tag">Agent</span>
          <span className="agx-hero-cat">{category}</span>
        </p>
        <h1 className="agx-hero-title">{name}</h1>
        <p className="agx-hero-tagline">{tagline}</p>
        <div className="agx-hero-actions">
          <a className="m2-button agx-run-btn" href={runHref}>
            {runLabel}<span aria-hidden="true"> ↓</span>
          </a>
          <Link className="m2-button m2-button-secondary" to={deployHref}>
            {deployLabel}<span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>

      <aside className="agx-spec" aria-label="How this agent deploys">
        <p className="agx-spec-cap">At a glance</p>
        <dl className="agx-spec-list">
          {spec.map((s) => (
            <div className="agx-spec-row" key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                {s.label === "Connects to" && typeof s.value === "string"
                  ? <ConnectorRow items={s.value.split(" · ")} />
                  : s.value}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </header>
  );
}
