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

// Customer-email agent, run on Berry Good. Drafts first answers to routine
// questions in the owner's voice, and refuses to touch anything sensitive.
// The upset customer always routes to the human — that boundary is the point.

const HREF = "/tools/customer-inbox";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "Gmail / Inbox · your FAQ" },
  { label: "Runs", value: "Continuously" },
  { label: "You approve", value: "Every reply before it sends" },
  { label: "Setup", value: "A few days" },
];

const PIPELINE: Pillar[] = [
  { name: "Read", d: "Reads new customer messages as they arrive.", icon: <Glyph d={IC.mail} /> },
  { name: "Draft", d: "Answers the routine ones from your FAQ, in your voice.", icon: <Glyph d={IC.pen} /> },
  { name: "You approve", d: "Every reply waits for you. Sensitive ones it won’t touch.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Send", d: "Sends what you approve; logs the rest.", icon: <Glyph d={IC.send} /> },
];

const HANDLED = (
  <ArtifactCard kicker="Inbox · handled" title="Two answered, one waiting for you.">
    <ArtifactList items={[
      "Labor Day hours — replied in your voice",
      "Raspberry availability — replied in your voice",
      "Short order — flagged, waiting for you",
    ]} />
    <p className="agentx-pnl-note">The agent cleared the routine two in seconds. The one that needed a human is sitting at the top of your inbox.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the drafted replies" filename="Berry-Good_Replies_Aug-20.eml" kind="email">
        <DocEmail to="Customer · hours question" subject="Re: Are you open Labor Day?">
          <DocProse>Yes! We’re open 9–5 all Labor Day weekend, u-pick included. See you then 🍓</DocProse>
          <DocProse>— Berry Good Berry Farm</DocProse>
        </DocEmail>
        <DocDivider />
        <DocEmail to="Customer · availability" subject="Re: Do you have raspberries now?">
          <DocProse>We do — raspberries are peaking this week. Fresh flats and u-pick are both open, 9–5 daily.</DocProse>
          <DocProse>— Berry Good Berry Farm</DocProse>
        </DocEmail>
        <DocDivider />
        <DocProse><strong>Held for you:</strong> “My order was short 2 flats.” The agent won’t answer an upset customer — that one’s waiting at the top of your inbox.</DocProse>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · inbox",
  command: "/triage-inbox",
  meta: "3 new",
  runLabel: "Run the triage",
  runHint: "One command. The agent reads the new messages and drafts what it safely can.",
  phases: [
    { kind: "auto", running: "Reading 3 new customer messages…", done: "3 read · 2 routine, 1 needs you", ms: 1200 },
    { kind: "auto", running: "Drafting replies from your FAQ…", done: "2 drafts ready · 1 held for you", ms: 1300 },
    {
      kind: "gate",
      running: "2 drafts to approve · 1 for you",
      done: "2 replies approved · 1 left for you",
      head: "The agent drafted the easy two in your voice. The third it won’t touch — read it and you’ll see why.",
      approveAllLabel: "Approve both and send",
      continueLabel: "Send approved",
      items: [
        { primary: "Are you open Labor Day?", meta: "email · 2:14pm", issue: "Routine hours question", suggest: "Draft: “Yes! We’re open 9–5 all Labor Day weekend, u-pick included. See you then 🍓”", approveLabel: "Approve & send" },
        { primary: "Do you have raspberries now?", meta: "text · 1:47pm", issue: "Availability — pulled from today’s crop status", suggest: "Draft: “We do — raspberries are peaking this week. Fresh flats and u-pick both open.”", approveLabel: "Approve & send" },
        { primary: "My order was short 2 flats", meta: "email · 12:30pm", issue: "Upset customer, and money’s involved", suggest: "Held: this one’s yours. A short apology and a make-good beats any template.", manual: true, manualNote: "The agent won’t answer an upset customer. Open it and reply yourself." },
      ],
    },
    { kind: "auto", running: "Sending approved replies…", done: "2 sent in your voice · 1 waiting for you", ms: 1000, artifact: HANDLED },
  ],
  doneNote: (
    <>
      <strong>The upset customer is always yours to answer.</strong> The agent drafts the easy ones in your voice and you send with a tap — but it knows the difference between a hours question and a hard one, which is the whole point.
    </>
  ),
};

export default function AgentCustomerInbox() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Customer-email agent — a working demo · Madrona Product Studio" />
      <M2Nav active="tools" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Customer service"
          name="Customer email"
          tagline="The agent drafts first answers to routine customer questions in your voice — hours, availability, orders — and holds anything sensitive for you. The upset customer always comes to you."
          spec={SPEC}
          runLabel="Run the triage"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The messages are made up; the draft-and-hold behavior is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Customer-email agent — a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="Answers the easy ones. Knows the hard ones.">
            <Prose>
              <p>Most customer email is the same six questions. The agent handles those in your voice and, crucially, recognizes the message that isn&rsquo;t routine and steps back.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>The drafting is easy. Two things decide whether it&rsquo;s trustworthy.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                Written answers to draw from — your hours, your policies, your shipping and return rules. If it isn&rsquo;t written down, the AI guesses, confidently. An afternoon writing your ten most common answers is the highest-leverage hour here.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                The upset customer. The agent drafts the routine ones and holds the rest for you. Draft with AI, but the message that needs a human, you send yourself.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Put it on your inbox.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing where this would actually help on your inbox, and where it wouldn&rsquo;t.</p>
              <p>When it&rsquo;s a fit, we write your FAQ into it, teach it your voice and what to never touch, set the approval gate, and hand it over. Yours to keep &mdash; no lock-in.</p>
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
