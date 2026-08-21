import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole, ArtifactCard, ArtifactList, type ConsoleScript } from "./AgentConsole";
import { DocButton, DocTitle, DocSection, DocProse, DocStamp } from "./AgentDoc";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// Contract-review agent, run on Berry Good. Reads a contract end to end,
// flags the terms and risks that matter, answers questions in plain English,
// and — crucially — points to the one clause worth a lawyer. A sharp first
// read, not a substitute for counsel.

const HREF = "/tools/contract-review";

const SPEC: AgentSpec[] = [
  { label: "Connects to", value: "PDF upload · Email" },
  { label: "Runs", value: "On demand" },
  { label: "You approve", value: "Nothing signs automatically" },
  { label: "Setup", value: "Minutes" },
];

const PIPELINE: Pillar[] = [
  { name: "Read", d: "Reads the contract end to end.", icon: <Glyph d={IC.eye} /> },
  { name: "Flag", d: "Surfaces the terms and risks that matter.", icon: <Glyph d={IC.flag} /> },
  { name: "You review", d: "You decide what needs a real lawyer.", icon: <Glyph d={IC.shield} />, gate: true },
  { name: "Answer", d: "Answers your questions in plain English.", icon: <Glyph d={IC.doc} /> },
];

const REVIEW = (
  <ArtifactCard kicker="Contract review · Cooler-lease.pdf" title="Signable — after two edits and one call.">
    <ArtifactList items={[
      "Auto-renewal (§7.2) — reminder added",
      "Repairs clause (§4.1) — flagged to negotiate",
      "Personal guarantee (§11) — take to counsel",
    ]} />
    <p className="agentx-pnl-note">It flags, it doesn’t decide, and it isn’t your lawyer. For the lease or the partnership, the review buys you a sharper conversation with counsel — not a substitute for one.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the review" filename="Berry-Good_Contract-Review_Cooler-lease.pdf" kind="memo">
        <DocTitle business="Berry Good Berry Farm" title="Contract Review" sub="Cooler-lease.pdf · commercial equipment lease · 11 pages" />
        <DocSection head="§7.2 · Auto-renewal">
          <DocProse>Renews for 36 months unless you cancel 90 days before term end. <strong>Do:</strong> add the cancel date to your calendar now.</DocProse>
        </DocSection>
        <DocSection head="§4.1 · Repairs">
          <DocProse>You cover all repairs, including normal wear — unusual for a lease. <strong>Do:</strong> ask them to strike or cap it.</DocProse>
        </DocSection>
        <DocSection head="§11 · Personal guarantee">
          <DocProse>You’d be personally liable, not just the farm. <strong>Do:</strong> take this one to a lawyer before signing.</DocProse>
        </DocSection>
        <DocStamp>Not legal advice — a first read to make your conversation with counsel sharper. Reviewed by the contract agent.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

const SCRIPT: ConsoleScript = {
  title: "Berry Good · contracts",
  command: "/review-contract",
  meta: "Cooler-lease.pdf",
  runLabel: "Run the review",
  runHint: "One command. The agent reads the contract and flags what matters.",
  phases: [
    { kind: "auto", running: "Reading Cooler-lease.pdf (11 pages)…", done: "Read · 11 pages · commercial equipment lease", ms: 1300 },
    { kind: "auto", running: "Checking terms against your risk flags…", done: "3 things worth a closer look", ms: 1300 },
    {
      kind: "gate",
      running: "3 flags — how to handle each",
      done: "2 noted · 1 to counsel",
      head: "Not legal advice — a sharp first read. Here’s what stood out before you sign. The heavy one it’s telling you to take to a lawyer.",
      approveAllLabel: "Note all",
      continueLabel: "Route selected",
      items: [
        { primary: "Auto-renews for 36 months", meta: "§7.2 · easy to miss", issue: "Renews unless you cancel 90 days out. Long tail.", suggest: "Suggested: add the cancel date to your calendar.", approveLabel: "Add reminder" },
        { primary: "You cover all repairs", meta: "§4.1", issue: "Even normal wear is on you. Unusual for a lease.", suggest: "Suggested: ask them to strike it.", approveLabel: "Note to negotiate" },
        { primary: "Personal guarantee clause", meta: "§11 · high stakes", issue: "You’d be personally liable, not just the farm.", suggest: "This is the one worth a lawyer.", manual: true, manualNote: "Take §11 to counsel before you sign. The agent flags it; it won’t advise on it." },
      ],
    },
    { kind: "auto", running: "Writing the plain-English summary…", done: "Summary ready", ms: 1100, artifact: REVIEW },
  ],
  doneNote: (
    <>
      <strong>It flags; it doesn’t decide.</strong> A sharp first read that makes the terms plain and points you to the one clause worth a lawyer — so your conversation with counsel is a good one.
    </>
  ),
};

export default function AgentContractReview() {
  useReveal();
  return (
    <main className="m2 art agentx-page">
      <LabMeta title="Contract-review agent — a working demo · Madrona Product Studio" />
      <M2Nav active="tools" />
      <div className="art-wrap">
        <AgentDemoHero
          category="Admin & legal"
          name="Contract review"
          tagline="Before you sign, the agent reads the contract, flags the terms and risks that matter, and answers your questions in plain English. It’s a sharp first read — not your lawyer."
          spec={SPEC}
          runLabel="Run the review"
        />
        <hr className="agx-hero-rule" />

        <div className="agx-demo" id="run">
          <AgentConsole script={SCRIPT} />
          <p className="agx-demo-cap">A scripted run on Berry Good Berry Farm, our demonstration business. The contract and flags are made up; the read-and-flag pattern is the real one.</p>
        </div>

        <ArticleBody share={{ title: "Contract-review agent — a working demo", href: HREF }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title="Reads it all. Flags what matters.">
            <Prose>
              <p>The value isn&rsquo;t a legal opinion &mdash; it&rsquo;s a clear-eyed first read. The agent works through the whole document and hands back the handful of terms that deserve your attention, in plain English.</p>
            </Prose>
            <Figure><PillarRow items={PIPELINE} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose>
              <p>The read is only as good as what it can see, and it stops well short of legal advice.</p>
            </Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">
                The contract as a file it can read, and your questions about it.
              </AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">
                It flags, it doesn&rsquo;t decide, and it is not your lawyer. The lease, the partnership, the personal guarantee &mdash; the review sharpens your conversation with counsel; it doesn&rsquo;t replace it.
              </AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title="Put it on your next contract.">
            <Prose>
              <p>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing whether a contract agent would earn its keep in your operation, and what it should watch for.</p>
              <p>When it fits, we set it up on your documents, tune it to the terms you care about, and teach you to run it. Yours to keep &mdash; no lock-in.</p>
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
