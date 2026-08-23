import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole, ArtifactCard, ArtifactRows, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocEmail, DocProse, DocDivider } from "./AgentDoc";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// Invoice-chasing agent, run on Berry Good. Watches receivables, drafts polite
// reminders in the owner's voice, and queues them for approval — never sends on
// its own. The "who gets grace" beat is the human-in-the-loop point.

const HREF = "/tools/invoice-chasing";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "QuickBooks · Email · Stripe" },
  { label: "Runs", value: "Daily" },
  { label: "You approve", value: "Every reminder before it sends" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Watch", d: "Scans receivables for anything overdue.", icon: <Glyph d={IC.eye} /> },
  { name: "Draft", d: "Writes a reminder for each, in your voice.", icon: <Glyph d={IC.pen} /> },
  { name: "You approve", d: "Nothing sends until you okay it. You decide who gets grace.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Send & track", d: "Queues the approved ones and follows up.", icon: <Glyph d={IC.send} /> },
];

const RECEIVABLES = (
  <ArtifactCard kicker="Receivables · after the chase" title="Two nudges out, $3,550 chasing.">
    <ArtifactRows rows={[
      { label: "Total outstanding", value: "$6,180" },
      { label: "Chasing now", value: "$3,550" },
      { label: "Held for you", value: "$690" },
    ]} />
    <p className="agentx-pnl-note">The two approved reminders are queued; the agent follows up in five days if they go unanswered. You held the Bread Lab, the account you know.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the drafted reminders" filename="Berry-Good_Reminders_Aug-20.eml" kind="email">
        <DocEmail to="accounts@whatcomcoop.org" subject="Friendly follow-up: invoice #2038">
          <DocProse>Hi team,</DocProse>
          <DocProse>Just a friendly follow-up on invoice #2038 for $2,400, now a couple of weeks out. No worries at all if it’s already in motion, just making sure it didn’t slip through.</DocProse>
          <DocProse>Thanks so much, and happy to resend anything you need.</DocProse>
          <DocProse>— The Berry Good team</DocProse>
        </DocEmail>
        <DocDivider />
        <DocEmail to="hello@ferndalemarket.com" subject="Quick nudge: invoice #2044">
          <DocProse>Hope the season’s treating you well!</DocProse>
          <DocProse>A quick nudge on invoice #2044 for $1,150, now about nine days out. Whenever you get a chance is perfect.</DocProse>
          <DocProse>Thanks as always,</DocProse>
          <DocProse>— The Berry Good team</DocProse>
        </DocEmail>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · receivables",
  command: "/chase-invoices",
  meta: "Aug 20",
  runLabel: "Run the chase",
  runHint: "One command. The agent finds what’s overdue and drafts the nudges.",
  phases: [
    { kind: "auto", running: "Scanning receivables for overdue invoices…", done: "4 overdue · $6,180 outstanding", ms: 1200 },
    { kind: "auto", running: "Drafting reminders in Berry Good’s voice…", done: "3 reminders drafted · 1 held back", ms: 1400 },
    {
      kind: "gate",
      running: "3 reminders need your okay",
      done: "2 reminders approved · 1 held by you",
      head: "The agent drafted these but won’t send them. Read, approve, or hold. The late payer you like is your call.",
      approveAllLabel: "Approve all and queue",
      continueLabel: "Queue the approved",
      items: [
        { primary: "$2,400.00", meta: "Whatcom Co-op · 18 days over", issue: "Second reminder: the first went unanswered", suggest: "Draft: “Hi team, a friendly follow-up on invoice #2038, now a couple weeks out…”", approveLabel: "Approve & queue" },
        { primary: "$1,150.00", meta: "Ferndale Market · 9 days over", issue: "First reminder", suggest: "Draft: “Hope the season’s treating you well! A quick nudge on invoice #2044…”", approveLabel: "Approve & queue" },
        { primary: "$690.00", meta: "The Bread Lab · 4 days over", issue: "Long-standing weekly account, always pays", suggest: "A gentle note, or let it ride this week?", manual: true, manualNote: "Held back. You know this one. Send a nudge, or let it ride." },
      ],
    },
    { kind: "auto", running: "Queuing approved reminders…", done: "Reminders queued · follow-ups scheduled", ms: 1100, artifact: RECEIVABLES },
  ],
  doneNote: (
    <>
      <strong>Nothing sent without your say-so.</strong> The tool drafts and tracks; you decide who gets grace. The good customer who’s late is a relationship, not a workflow.
    </>
  ),
};

export default function AgentInvoiceChasing() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Invoice-chasing agent: a working demo · Madrona Product Studio" />
      <M2Nav active="tools" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Bookkeeping & finance"
          name="Invoice chasing"
          tagline="The agent watches for overdue invoices, drafts a polite reminder for each in your voice, and queues them for your okay. You decide who gets grace. It never sends on its own."
          spec={SPEC}
          runLabel="Run the chase"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The invoices and customers are made up; the workflow is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Invoice-chasing agent: a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="It drafts. You decide.">
            <Prose>
              <p>The agent does the watching and the writing, the parts that never get done because they&rsquo;re nobody&rsquo;s job. The one thing it won&rsquo;t do is hit send.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>This is close to the fastest payback on the shelf, but two things decide whether it works for you.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                Invoices actually issued from the system, so there&rsquo;s something to chase, and a few lines about your voice so the reminders sound like you and not a collections agency.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                The good customer who&rsquo;s late is a relationship decision, not a workflow. The agent drafts and queues; who gets a nudge and who gets grace stays yours.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Deploy it on your receivables.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing where this would actually help on your books, and where it wouldn&rsquo;t.</p>
              <p>When it&rsquo;s a fit, we wire it to your invoicing, teach it your voice and your grace rules, set the approval gate, and hand it to you. Yours to keep, no lock-in.</p>
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
