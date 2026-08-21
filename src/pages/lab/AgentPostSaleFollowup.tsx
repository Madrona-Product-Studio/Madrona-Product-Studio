import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole, ArtifactCard, ArtifactList, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocEmail, DocProse, DocDivider } from "./AgentDoc";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// Post-sale follow-up agent, run on Berry Good. Drafts thank-yous, win-backs, and
// check-ins in the owner's voice and queues them for approval — never sends on its
// own. The service issue wearing a review's clothes is handed back to the human;
// that boundary is the point.

const HREF = "/agents/post-sale-followup";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "Square · Shopify · Email" },
  { label: "Runs", value: "Daily" },
  { label: "You approve", value: "Every message before it sends" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Watch", d: "Watches for sales, and for regulars going quiet.", icon: <Glyph d={IC.eye} /> },
  { name: "Draft", d: "Writes the right note for each moment.", icon: <Glyph d={IC.pen} /> },
  { name: "You approve", d: "Nothing sends until you okay it.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Send", d: "Sends and schedules the follow-ups.", icon: <Glyph d={IC.send} /> },
];

const FOLLOWUPS = (
  <ArtifactCard kicker="Follow-ups · queued" title="Fifteen customers, two notes, one for you.">
    <ArtifactList items={[
      "Thank-you to 12 first-time buyers — queued",
      "Win-back to 3 quiet regulars — queued",
      "Dana R. (3-star) — flagged for you",
    ]} />
    <p className="agentx-pnl-note">A follow-up rhythm is a decision before it’s an automation. You make it once; the agent runs it forever — and knows when to hand one back.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the drafted follow-ups" filename="Berry-Good_Followups_Aug-20.eml" kind="email">
        <DocEmail to="12 first-time buyers" subject="Thanks for coming to Berry Good 🍓">
          <DocProse>Thanks so much for picking Berry Good this week — we hope the berries were perfect.</DocProse>
          <DocProse>We’re open 9–5 daily through the season, fresh flats and u-pick both. Come see us again.</DocProse>
          <DocProse>— The Berry Good team</DocProse>
        </DocEmail>
        <DocDivider />
        <DocEmail to="3 regulars we miss" subject="The raspberries are in 🍓">
          <DocProse>We haven’t seen you in a few weeks and wanted to say hi.</DocProse>
          <DocProse>The raspberries you love are peaking right now — this is the sweet stretch. Save you a flat?</DocProse>
          <DocProse>— The Berry Good team</DocProse>
        </DocEmail>
        <DocDivider />
        <DocProse><strong>Held for you:</strong> Dana R. left a 3-star review. That’s a conversation, not a campaign — reach out yourself.</DocProse>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · customers",
  command: "/run-followups",
  meta: "Aug 20",
  runLabel: "Run the follow-ups",
  runHint: "One command. The agent finds the moments and drafts the notes.",
  phases: [
    { kind: "auto", running: "Scanning this week’s sales and lapsed regulars…", done: "12 first-time buyers · 3 regulars gone quiet", ms: 1200 },
    { kind: "auto", running: "Drafting follow-ups in Berry Good’s voice…", done: "3 messages drafted · 1 held for you", ms: 1300 },
    {
      kind: "gate",
      running: "3 follow-ups to approve",
      done: "2 approved · 1 held",
      head: "Three moments worth a note. The agent drafted each; you send. The one that’s really a service issue it flagged for you.",
      approveAllLabel: "Approve all and queue",
      continueLabel: "Queue approved",
      items: [
        { primary: "Thank the 12 first-time buyers", meta: "bought this week", issue: "A warm thanks and how to find you again.", suggest: "Draft: “Thanks for picking Berry Good this week…”", approveLabel: "Approve & queue" },
        { primary: "Win back 3 quiet regulars", meta: "no order in 6 weeks", issue: "A gentle ‘the raspberries are in’ nudge.", suggest: "Draft: “The raspberries you love are peaking…”", approveLabel: "Approve & queue" },
        { primary: "Follow up: Dana R.", meta: "left a 3-star review", issue: "Not a marketing moment — a service one.", suggest: "This one wants a real reply from you, not a campaign.", manual: true, manualNote: "Held — reach out to Dana yourself. A person, not a template." },
      ],
    },
    { kind: "auto", running: "Queuing approved follow-ups…", done: "Follow-ups queued and scheduled", ms: 1100, artifact: FOLLOWUPS },
  ],
  doneNote: (
    <>
      <strong>The rhythm runs itself; the exceptions come to you.</strong> The agent drafts the thank-yous and win-backs in your voice — and hands back the one that’s really a service issue.
    </>
  ),
};

export default function AgentPostSaleFollowup() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Post-sale follow-up agent — a working demo · Madrona Product Studio" />
      <M2Nav active="agents" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Customer & retention"
          name="Post-sale follow-up"
          tagline="After a sale, the agent runs the follow-up you never get around to — a thank-you, a check-in, a win-back for the ones drifting away — drafted in your voice and queued for your okay."
          spec={SPEC}
          runLabel="Run the follow-ups"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The customers and messages are made up; the draft-and-hold behavior is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Post-sale follow-up agent — a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="The follow-up you never get to.">
            <Prose>
              <p>Every sale is a chance to say thanks, and every quiet regular is a chance to win them back — but nobody has the time, so it never happens. The agent runs the rhythm and holds the moment that needs a person.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>Sending the notes is easy. Two things decide whether it earns its place.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                A follow-up rhythm — who hears from you, how soon after a sale, saying what. An hour deciding that once; then the agent runs it forever.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                The tools execute cadence; they don’t know your regulars. And a service issue wearing a review’s clothes still needs you.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Put it on your customers.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We’ll tell you in writing where this would actually help with your customers, and where it wouldn’t.</p>
              <p>When it fits, we wire your store and inbox, set the rhythm you decide, teach you how it runs, and hand it over. Yours to keep &mdash; no lock-in.</p>
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
