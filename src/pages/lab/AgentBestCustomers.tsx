import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole, ArtifactCard, ArtifactRows, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocTitle, DocSection, DocProse, DocStamp } from "./AgentDoc";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// Best-customers agent, run on Berry Good. Works the sales history into a
// straight answer — who the best customers are by margin, not spend — then
// hands the owner the harder question of what to do about it. The analysis is
// instant; the decision isn't.

const HREF = "/tools/best-customers";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "Square · QuickBooks · Shopify" },
  { label: "Runs", value: "On demand" },
  { label: "You approve", value: "What becomes an action" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Pull", d: "Pulls your full sales history.", icon: <Glyph d={IC.link} /> },
  { name: "Analyze", d: "Ranks customers by margin, not just spend.", icon: <Glyph d={IC.chart} /> },
  { name: "You decide", d: "You pick what’s worth acting on.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Report", d: "Hands you the answer, and the question.", icon: <Glyph d={IC.doc} /> },
];

const REPORT = (
  <ArtifactCard kicker="Customer analysis · season to date" title="Your best dollars aren’t where you’d think.">
    <ArtifactRows rows={[
      { label: "Top 12% of customers", value: "61% of margin" },
      { label: "Best channel by margin", value: "Wholesale · 42%" },
      { label: "Top-margin item", value: "Raspberry flats" },
    ]} />
    <p className="agentx-pnl-note">Knowing your top customers is a query. Deciding what to build for them is strategy, and no workflow ships that part.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the full report" filename="Berry-Good_Customer-Analysis_Season.pdf" kind="memo">
        <DocTitle business="Berry Good Berry Farm" title="Customer Analysis" sub="Season to date · 1,840 orders across 3 channels" />
        <DocSection head="The headline">
          <DocProse>Your top 12% of customers drive 61% of your margin. Concentrate there, gently.</DocProse>
        </DocSection>
        <DocSection head="1 · Wholesale out-earns the stand">
          <DocProse>Co-op accounts run 42% margin versus 31% at u-pick. <strong>Move:</strong> a short wholesale outreach list, drafted.</DocProse>
        </DocSection>
        <DocSection head="2 · 73 nearly-regulars">
          <DocProse>They ordered twice, then went quiet. <strong>Move:</strong> hand them to the follow-up agent for a win-back.</DocProse>
        </DocSection>
        <DocSection head="3 · Raspberry flats carry the margin">
          <DocProse>Highest-margin item you sell, well above mixed boxes. Filed for a merchandising call at peak.</DocProse>
        </DocSection>
        <DocStamp>The analysis is instant; the decisions are yours. Compiled by the best-customers agent · season to date.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · sales",
  command: "/best-customers",
  meta: "Season to date",
  runLabel: "Run the analysis",
  runHint: "One command. The agent works the numbers and hands you the moves.",
  phases: [
    { kind: "auto", running: "Pulling season-to-date sales history…", done: "1,840 orders · 610 customers · 3 channels", ms: 1300 },
    { kind: "auto", running: "Ranking by margin, not just spend…", done: "Top 12% of customers drive 61% of margin", ms: 1400 },
    {
      kind: "gate",
      running: "3 findings: act on any?",
      done: "2 routed to action",
      head: "The numbers are easy; the moves are the point. Here’s what stood out. Pick what’s worth doing.",
      approveAllLabel: "Act on all",
      continueLabel: "Route selected",
      items: [
        { primary: "Wholesale beats u-pick on margin", meta: "42% vs 31%", issue: "Your best dollars come from co-op accounts, not the stand.", suggest: "Suggested: draft a wholesale outreach list.", approveLabel: "Add to today" },
        { primary: "73 ‘nearly-regulars’", meta: "2 orders, then quiet", issue: "One nudge could turn them into regulars.", suggest: "Suggested: hand to the follow-up agent.", approveLabel: "Route to follow-up" },
        { primary: "Raspberry flats = top-margin item", meta: "vs mixed boxes", issue: "Worth featuring at peak.", suggest: "A merchandising note.", manual: true, manualNote: "Filed. A call for you and the stand, not an automation." },
      ],
    },
    { kind: "auto", running: "Writing the report…", done: "Report ready", ms: 1100, artifact: REPORT },
  ],
  doneNote: (
    <>
      <strong>The analysis is instant; the decision isn’t.</strong> The agent ranks your customers by what they’re actually worth, then hands you the harder question of what to do about it.
    </>
  ),
};

export default function AgentBestCustomers() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Best-customers agent: a working demo · Madrona Product Studio" />
      <M2Nav active="tools" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Sales & intelligence"
          name="Best customers"
          tagline="One command works your sales history into a straight answer: who your best customers actually are, by margin not just spend, then hands you the harder question of what to do about it."
          spec={SPEC}
          runLabel="Run the analysis"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The orders and findings are made up; the analyze-and-decide pattern is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Best-customers agent: a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="Answers the query, poses the question.">
            <Prose>
              <p>Ranking your customers is arithmetic; the agent does it in seconds. The value is what it does next: it points you at the few moves the numbers actually justify, and leaves the deciding to you.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>The demo runs on made-up orders. Two things decide whether the real answer is worth acting on.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                Your sales history living somewhere it can read: Square, QuickBooks, Shopify, wherever the orders actually are.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                The analysis is instant; the decision isn&rsquo;t. The answer usually hands you a harder question, and that one&rsquo;s yours.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Point it at your sales.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing whether a best-customers agent would earn its keep on your operation, and what it should watch for.</p>
              <p>When it fits, we connect your sales history, set it to run on demand, teach you to run it, and it&rsquo;s yours to keep, no lock-in.</p>
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
