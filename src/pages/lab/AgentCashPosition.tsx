import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole, ArtifactCard, ArtifactRows, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocTitle, DocSection, DocRow, DocNote, DocStamp } from "./AgentDoc";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// Cash-position agent, run on Berry Good. Reads every connected account each
// morning, forecasts the next 30 days, flags the tight week, and packages a
// one-page brief. The "one shortfall, pick what to do" beat is the human gate.
// It reads; it never moves money. Built on the AgentConsole engine + the
// agent-deployment template so every gallery entry stays consistent.

const HREF = "/agents/cash-position";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "QuickBooks · Bank feeds · Stripe" },
  { label: "Runs", value: "Every morning" },
  { label: "You approve", value: "Any action it suggests" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Gather", d: "Pulls balances from every connected account.", icon: <Glyph d={IC.link} /> },
  { name: "Project", d: "Forecasts the next 30 days of in and out.", icon: <Glyph d={IC.chart} /> },
  { name: "You review", d: "Flags shortfalls; you decide what to do.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Brief", d: "Puts it on one page each morning.", icon: <Glyph d={IC.doc} /> },
];

const CASH_BRIEF = (
  <ArtifactCard kicker="Cash brief · Aug 20" title="One tight week, and a plan for it.">
    <ArtifactRows
      rows={[
        { label: "In the bank", value: "$20,480" },
        { label: "Coming in (30d)", value: "$9,200" },
        { label: "Going out (30d)", value: "$14,600" },
      ]}
      foot={{ label: "Projected low point", value: "$1,280 · Sept 2" }}
    />
    <p className="agentx-pnl-note">The number is only as honest as its connections; every account here is linked. The two queued actions cover the tight week.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the cash brief" filename="Berry-Good_Cash-Brief_Aug-20.pdf" kind="statement">
        <DocTitle business="Berry Good Berry Farm" title="Cash Position" sub="Morning brief · August 20, 2026" />
        <DocSection head="In the bank">
          <DocRow label="Checking" value="$12,480" indent />
          <DocRow label="Savings" value="$8,000" indent />
          <DocRow label="Total in bank" value="$20,480" rule />
        </DocSection>
        <DocSection head="Next 30 days">
          <DocRow label="Expected inflows" value="$9,200" indent />
          <DocRow label="Expected outflows" value="$14,600" indent />
          <DocRow label="Net movement" value="&minus;$5,400" rule />
        </DocSection>
        <DocRow label="Projected low point" value="$1,280 · Sept 2" strong />
        <DocNote>After the two queued actions, the low point stays comfortably positive.</DocNote>
        <DocStamp>Compiled by the cash agent · reads every connected account, never moves money · August 20, 2026.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · cash",
  command: "/cash-pulse",
  meta: "Aug 20",
  runLabel: "Run the pulse",
  runHint: "One command. The agent reads every account and flags the week ahead.",
  phases: [
    { kind: "auto", running: "Pulling balances from 4 connected accounts…", done: "Checking $12,480 · Savings $8,000 · Stripe pending $2,340", ms: 1200 },
    { kind: "auto", running: "Projecting the next 30 days…", done: "Inflows $9,200 · outflows $14,600 · one tight week ahead", ms: 1400 },
    {
      kind: "gate",
      running: "One shortfall — pick what to do",
      done: "2 actions routed",
      head: "Sept 2 looks tight — payroll lands before two big receivables. Here’s how to cover it. Your call.",
      approveAllLabel: "Do all and continue",
      continueLabel: "Route selected",
      items: [
        { primary: "Chase $2,400 from Whatcom Co-op", meta: "18 days overdue", issue: "Covers most of the gap on its own.", suggest: "Suggested: queue a reminder today.", approveLabel: "Queue reminder" },
        { primary: "Delay the cooler purchase", meta: "$1,800 · not urgent", issue: "Push it past the 5th and the week clears.", suggest: "Suggested: move to Sept 8.", approveLabel: "Reschedule" },
        { primary: "Move $3,000 from savings", meta: "buffer transfer", issue: "Only if the receivable slips.", suggest: "A backstop, your call.", manual: true, manualNote: "The agent won’t move money. Transfer it yourself if you want the cushion." },
      ],
    },
    { kind: "auto", running: "Writing the morning cash brief…", done: "Cash brief ready", ms: 1100, artifact: CASH_BRIEF },
  ],
  doneNote: (
    <>
      <strong>It reads; it never moves money.</strong> One honest number, the tight week flagged early, and a plan you approved — before it became a problem.
    </>
  ),
};

export default function AgentCashPosition() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Cash-position agent — a working demo · Madrona Product Studio" />
      <M2Nav active="agents" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Bookkeeping & finance"
          name="Cash position"
          tagline="One command pulls every account into a single honest number — what’s in the bank, what’s coming, what’s committed this week — with the shortfalls flagged before they bite. It reads; it never moves money."
          spec={SPEC}
          runLabel="Run the pulse"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The accounts and numbers are made up; the workflow is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Cash-position agent — a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="Reads everything. Moves nothing.">
            <Prose>
              <p>No black box. The agent runs the same four beats every morning, and it hands control back at the one that&rsquo;s yours to make.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>A clean demo hides the parts that decide whether this actually works on your operation. Two of them are worth saying plainly.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                Every account connected &mdash; bank, cards, processors. The pulse is only as honest as what it can see; if half your money moves through a system it can&rsquo;t reach, you get a confident number that&rsquo;s wrong.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                It reads and forecasts; it never moves money. Which invoice to chase, and whether to dip into savings, stays your call.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Put it on your accounts.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing where an agent like this would actually help on your books, and where it wouldn&rsquo;t.</p>
              <p>When it&rsquo;s a fit, we connect your accounts, set the morning rhythm, and teach you to run it. Yours to keep &mdash; no lock-in.</p>
            </Prose>
            <div className="art-close-links">
              <Link className="m2-text-link" to="/connect">Book a free 30-minute call <span aria-hidden="true">→</span></Link>
              <Link className="m2-text-link" to="/agents">See the other agents <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>
      <SiteFooter />
    </main>
  );
}
