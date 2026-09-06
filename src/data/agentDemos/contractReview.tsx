import { ArtifactCard, ArtifactList } from "../../pages/lab/AgentConsole";
import { DocButton, DocTitle, DocSection, DocProse, DocStamp } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// Contract-review agent, run on Berry Good. Reads a contract end to end,
// flags the terms and risks that matter, answers questions in plain English,
// and, crucially, points to the one clause worth a lawyer. A sharp first
// read, not a substitute for counsel.

const REVIEW = (
  <ArtifactCard kicker="Contract review · Cooler-lease.pdf" title="Signable, after two edits and one call.">
    <ArtifactList items={[
      "Auto-renewal (§7.2): reminder added",
      "Repairs clause (§4.1): flagged to negotiate",
      "Personal guarantee (§11): take to counsel",
    ]} />
    <p className="agentx-pnl-note">It flags, it doesn’t decide, and it isn’t your lawyer. For the lease or the partnership, the review buys you a sharper conversation with counsel, not a substitute for one.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the review" filename="Berry-Good_Contract-Review_Cooler-lease.pdf" kind="memo">
        <DocTitle business="Berry Good Berry Farm" title="Contract Review" sub="Cooler-lease.pdf · commercial equipment lease · 11 pages" />
        <DocSection head="§7.2 · Auto-renewal">
          <DocProse>Renews for 36 months unless you cancel 90 days before term end. <strong>Do:</strong> add the cancel date to your calendar now.</DocProse>
        </DocSection>
        <DocSection head="§4.1 · Repairs">
          <DocProse>You cover all repairs, including normal wear, which is unusual for a lease. <strong>Do:</strong> ask them to strike or cap it.</DocProse>
        </DocSection>
        <DocSection head="§11 · Personal guarantee">
          <DocProse>You’d be personally liable, not just the farm. <strong>Do:</strong> take this one to a lawyer before signing.</DocProse>
        </DocSection>
        <DocStamp>Not legal advice: a first read to make your conversation with counsel sharper. Reviewed by the contract agent.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

export const contractReview: AgentDemo = {
  id: "contract-review",
  title: "Contract-review agent: a working demo",
  tagline: "Before you sign, the agent reads the contract, flags the terms and risks that matter, and answers your questions in plain English. It’s a sharp first read, not your lawyer.",
  spec: { runs: "On demand", approve: "Nothing signs automatically", setup: "Minutes" },
  pipeline: [
    { name: "Read", d: "Reads the contract end to end.", icon: "eye" },
    { name: "Flag", d: "Surfaces the terms and risks that matter.", icon: "flag" },
    { name: "You review", d: "You decide what needs a real lawyer.", icon: "shield", gate: true },
    { name: "Answer", d: "Answers your questions in plain English.", icon: "doc" },
  ],
  script: {
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
        running: "3 flags: how to handle each",
        done: "2 noted · 1 to counsel",
        head: "Not legal advice: a sharp first read. Here’s what stood out before you sign. The heavy one it’s telling you to take to a lawyer.",
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
        <strong>It flags; it doesn’t decide.</strong> A sharp first read that makes the terms plain and points you to the one clause worth a lawyer, so your conversation with counsel is a good one.
      </>
    ),
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. The contract and flags are made up; the read-and-flag pattern is the real one.",
  how: {
    title: "Reads it all. Flags what matters.",
    lede: <>The value isn&rsquo;t a legal opinion: it&rsquo;s a clear-eyed first read. The agent works through the whole document and hands back the handful of terms that deserve your attention, in plain English.</>,
  },
  honest: {
    lede: "The read is only as good as what it can see, and it stops well short of legal advice.",
    needs: "The contract as a file it can read, and your questions about it.",
    ends: <>It flags, it doesn&rsquo;t decide, and it is not your lawyer. The lease, the partnership, the personal guarantee: the review sharpens your conversation with counsel; it doesn&rsquo;t replace it.</>,
  },
  deploy: {
    title: "Put it on your next contract.",
    body: [
      <>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing whether a contract agent would earn its keep in your operation, and what it should watch for.</>,
      <>When it fits, we set it up on your documents, tune it to the terms you care about, and teach you to run it. Yours to keep, no lock-in.</>,
    ],
  },
};
