import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, type AgentSpec } from "./AgentDemoTemplate";
import { AgentConsole, ArtifactCard, ArtifactRows, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocTitle, DocSection, DocRow, DocStamp } from "./AgentDoc";
import { AGENT_ICONS as IC } from "./agentIcons";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// The payroll-planning agent, run on Berry Good — our demonstration farm. The
// console is a scripted, self-contained simulation: no real books connect, no
// QuickBooks or Gusto call is made. It shows the *shape* of the work — settle
// cash, forecast the run, gate on the owner's approval to chase, plan — the
// same shape the real agent runs. It plans; your provider still runs payroll.
// Built on the AgentConsole engine + the agent-deployment template so every
// gallery entry stays consistent.

const HREF = "/tools/payroll-planning";

const Glyph = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "QuickBooks · PayPal · Gusto" },
  { label: "Runs", value: "Before each run" },
  { label: "You approve", value: "Any invoice it chases" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Settle", d: "Settles cash against PayPal and QuickBooks.", icon: <Glyph d={IC.link} /> },
  { name: "Forecast", d: "Projects 30 days to the next run.", icon: <Glyph d={IC.chart} /> },
  { name: "You approve", d: "Ranks invoices to chase; you pick.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Plan", d: "Hands you a clear-payroll plan.", icon: <Glyph d={IC.doc} /> },
];

const PLAN_ARTIFACT = (
  <ArtifactCard kicker="Payroll plan · Sept 6 run" title="Payroll clears, with room to spare.">
    <ArtifactRows
      rows={[
        { label: "Available now", value: "$18,140" },
        { label: "Next payroll (Sept 6)", value: "$16,900" },
        { label: "Buffer today", value: "$1,240" },
      ]}
      foot={{ label: "Buffer after queued chases", value: "$4,790" }}
    />
    <p className="agentx-pnl-note">Nothing here moves money or runs payroll. That stays with Gusto. The agent just makes sure the account is ready.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the payroll plan" filename="Berry-Good_Payroll-Plan_Sept-6.pdf" kind="statement">
        <DocTitle business="Berry Good Berry Farm" title="Payroll Plan" sub="For the run dated September 6, 2026" />
        <DocSection head="Cash position">
          <DocRow label="Available now" value="$18,140" indent />
          <DocRow label="Payroll due (Sept 6)" value="$16,900" indent />
          <DocRow label="Buffer before chasing" value="$1,240" rule />
        </DocSection>
        <DocSection head="Queued to chase">
          <DocRow label="Whatcom Co-op (#2038)" value="$2,400" indent />
          <DocRow label="Ferndale Market (#2044)" value="$1,150" indent />
          <DocRow label="Buffer after chases" value="$4,790" rule />
        </DocSection>
        <DocStamp>Payroll planning only: running payroll, taxes, benefits, and compliance stay with your provider. Prepared by the payroll agent · Sept 6 run.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · payroll",
  command: "/plan-payroll",
  meta: "Run: Sept 6",
  runLabel: "Run the plan",
  runHint: "One command. The agent checks the run clears and how to make sure of it.",
  phases: [
    { kind: "auto", running: "Settling QuickBooks cash against PayPal…", done: "Available now $18,140 · next payroll $16,900 (Sept 6)", ms: 1200 },
    { kind: "auto", running: "Forecasting 30 days to the run…", done: "Clears, but the buffer is thin ($1,240)", ms: 1400 },
    {
      kind: "gate",
      running: "Thin buffer: chase to be safe?",
      done: "2 invoices queued to chase",
      head: "Payroll clears, but only just. Chasing these lands cash before the run and makes it comfortable. Your call.",
      approveAllLabel: "Chase both and continue",
      continueLabel: "Queue selected",
      items: [
        { primary: "$2,400 · Whatcom Co-op", meta: "18 days over · likely to pay on a nudge", issue: "Lands well before Sept 6.", suggest: "Suggested: queue a reminder.", approveLabel: "Queue chase" },
        { primary: "$1,150 · Ferndale Market", meta: "9 days over", issue: "Adds margin on top.", suggest: "Suggested: queue a reminder.", approveLabel: "Queue chase" },
        { primary: "$690 · The Bread Lab", meta: "always pays, never late", issue: "Not worth a nudge for this one.", suggest: "Leave it, it’ll come.", manual: true, manualNote: "Skip this one. You know they’re good for it." },
      ],
    },
    { kind: "auto", running: "Writing the payroll plan…", done: "Plan ready", ms: 1100, artifact: PLAN_ARTIFACT },
  ],
  doneNote: (
    <>
      <strong>It plans; it never runs payroll.</strong> The agent makes sure the cash is ready and the buffer’s real. The run itself stays with your provider.
    </>
  ),
};

function Fact({ tone, icon, label, children }: { tone: string; icon: string; label: string; children: ReactNode }) {
  return (
    <div>
      <span className="m2-ab4-ico art-inv-ico" data-tone={tone}><Glyph d={icon} /></span>
      <p className="art-inv-lbl">{label}</p>
      <p>{children}</p>
    </div>
  );
}

export default function AgentPayrollPlanning() {
  useReveal();

  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Payroll-planning agent: a working demo · Madrona Product Studio" />
      <M2Nav active="tools" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Bookkeeping & finance"
          name="Payroll planning"
          runLabel="Run the plan"
          tagline="Before each payroll run, the agent settles your cash against what’s landing, forecasts whether payroll clears comfortably, and ranks which invoices to chase so it does. It plans; your provider still runs payroll."
          spec={SPEC}
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. Nothing connects to a real ledger. It’s the shape of the real thing, on made-up numbers.</p>
        </div>

        <ArticleBody share={{ title: "Payroll-planning agent: a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="Settles the cash, forecasts the run.">
            <Prose>
              <p>No black box. The agent runs the same four steps before every payroll, and it hands control back at the one that matters.</p>
            </Prose>
            <Figure>
              <PillarRow items={PIPELINE} />
            </Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>A clean demo hides the parts that decide whether this actually works on your operation. Two of them are worth saying plainly.</p>
            </Prose>
            <div className="art-inv-facts">
              <Fact tone="sprout" icon={IC.key} label="What it needs from you">
                Your QuickBooks and processor accounts connected, and a payroll date to plan toward.
              </Fact>
              <Fact tone="storefront" icon={IC.flag} label="Where it ends">
                This is payroll planning. Running payroll, taxes, benefits, and compliance stay with your payroll provider. The agent just makes sure the cash is ready.
              </Fact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Plan your next run.">
            <Prose>
              <p>It starts with a 30-minute conversation, and it&rsquo;s free. We&rsquo;ll tell you in writing where an agent like this would actually help on your operation, and where it wouldn&rsquo;t.</p>
              <p>When it&rsquo;s a fit, we connect the accounts, set it to run before each payroll, and teach you to run it. It&rsquo;s yours to keep, no lock-in.</p>
            </Prose>
            <div className="art-close-links">
              <Link className="m2-text-link" to="/connect">Book a free 30-minute call <span aria-hidden="true">→</span></Link>
              <Link className="m2-text-link" to="/tools">See the other tools <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>
      <SiteFooter />
    </main>
  );
}
