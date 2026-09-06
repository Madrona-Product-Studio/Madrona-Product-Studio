import { ArtifactCard, ArtifactList, ArtifactRows } from "../../pages/lab/AgentConsole";
import { DocButton, DocTitle, DocSection, DocRow, DocNote, DocStamp } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// The month-end close agent, run on Berry Good, our demonstration farm. The
// console is a scripted, self-contained simulation: no real books connect, no
// QuickBooks call is made. It shows the shape of the work (reconcile, gate on
// the owner's approval, narrate, package), the same shape the real agent runs.

const PNL_ARTIFACT = (
  <ArtifactCard kicker="Profit & loss · August 2026" title="Berry Good’s strongest month of the season.">
    <ArtifactRows
      rows={[
        { label: "Revenue", value: "$18,420" },
        { label: "Cost of goods", value: "$6,240" },
        { label: "Operating expenses", value: "$4,880" },
      ]}
      foot={{ label: "Net income", value: "$7,300" }}
    />
    <p className="agentx-pnl-note">U-pick revenue rose 22% over July on peak raspberry weeks, while packaging costs held flat. Net margin landed at 40%.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the full statement" filename="Berry-Good_P&L_Aug-2026.pdf" kind="statement">
        <DocTitle business="Berry Good Berry Farm" title="Profit &amp; Loss" sub="For the month ended August 31, 2026" />
        <DocSection head="Revenue">
          <DocRow label="U-pick sales" value="$11,240" indent />
          <DocRow label="Wholesale (co-ops)" value="$5,180" indent />
          <DocRow label="Farm stand" value="$2,000" indent />
          <DocRow label="Total revenue" value="$18,420" rule />
        </DocSection>
        <DocSection head="Cost of goods sold">
          <DocRow label="Seed, supplies, and picking labor" value="$6,240" indent />
          <DocRow label="Gross profit" value="$12,180" rule />
        </DocSection>
        <DocSection head="Operating expenses">
          <DocRow label="Seasonal labor" value="$3,100" indent />
          <DocRow label="Packaging" value="$760" indent />
          <DocRow label="Fuel &amp; equipment" value="$620" indent />
          <DocRow label="Other" value="$400" indent />
          <DocRow label="Total operating expenses" value="$4,880" rule />
        </DocSection>
        <DocRow label="Net income" value="$7,300" strong />
        <DocRow label="Net margin" value="40%" />
        <DocNote>August was Berry Good’s strongest month of the season. U-pick revenue rose 22% over July on peak raspberry weeks, while packaging costs held flat.</DocNote>
        <DocStamp>Prepared by the month-end close agent · reconciled against QuickBooks, Square, and PayPal · every adjustment carries your approval · August 31, 2026.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

const PACKET_ARTIFACT = (
  <ArtifactCard kicker="Close packet · ready to send" title="August 2026 close">
    <ArtifactList items={[
      "Reconciled profit & loss",
      "Balance-sheet summary",
      "3 approved adjustments, with your notes",
      "Bank and processor reconciliation",
      "Plain-English narrative for your accountant",
    ]} />
    <div className="agentx-artifact-actions">
      <DocButton label="Open the close packet" filename="Berry-Good_Close-Packet_Aug-2026.pdf" kind="packet">
        <DocTitle business="Berry Good Berry Farm" title="August 2026 Close Packet" sub="Prepared for your accountant" />
        <DocSection head="Contents">
          <DocRow label="1 · Reconciled profit & loss" />
          <DocRow label="2 · Balance-sheet summary" />
          <DocRow label="3 · Adjustments approved by you" />
          <DocRow label="4 · Bank & processor reconciliation" />
          <DocRow label="5 · Plain-English narrative" />
        </DocSection>
        <DocSection head="Adjustments approved by you">
          <DocRow label="Deposit, Aug 14 → Invoice #2041" value="$1,240.00" indent />
          <DocRow label="Square payout → U-pick sales" value="$420.00" indent />
          <DocRow label="PayPal fee → Processing fees" value="$88.50" indent />
        </DocSection>
        <DocSection head="Reconciliation">
          <DocRow label="QuickBooks · Square · PayPal transactions matched" value="145 / 145" />
        </DocSection>
        <DocStamp>Every figure reconciled August 31, 2026. Every adjustment carries your approval. Ready to hand to your accountant.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

export const monthEndClose: AgentDemo = {
  id: "month-end-close",
  title: "Month-end close agent: a working demo",
  tagline: "One command runs the close: reconciled against your payment processors, flagged wherever it needs a human, written up as a plain-English P&L, and packaged for your accountant. Every step that touches money stops for you.",
  spec: { runs: "Monthly, or on demand", approve: "Every step that moves money", setup: "About a week, then it’s yours" },
  pipeline: [
    { name: "Connect", d: "Pulls August from QuickBooks, Square, and PayPal.", icon: "link" },
    { name: "Reconcile", d: "Matches every transaction against the settlements.", icon: "match" },
    { name: "You approve", d: "Stops on anything unmatched. Nothing moves without your call.", icon: "shield", gate: true },
    { name: "Write & package", d: "Writes the P&L and builds the accountant-ready close.", icon: "doc" },
  ],
  script: {
    title: "Berry Good · books",
    command: "/close-month",
    meta: "August 2026",
    runLabel: "Run the close",
    runHint: "One command. About twenty seconds of the agent’s work, played out here.",
    phases: [
      { kind: "auto", running: "Connecting to QuickBooks…", done: "Connected to QuickBooks · 145 transactions synced for August", ms: 1100 },
      { kind: "auto", running: "Reconciling books against Square and PayPal settlements…", done: "142 of 145 matched automatically · 3 need your review", ms: 1500 },
      {
        kind: "gate",
        running: "3 transactions need your review",
        done: "3 adjustments approved by you",
        head: "The agent stopped here on purpose. These three need a human. Your call.",
        approveAllLabel: "Approve all three and continue",
        continueLabel: "Continue the close",
        items: [
          { primary: "$1,240.00", meta: "Deposit · Aug 14", issue: "No matching invoice", suggest: "Agent suggests: Match to Invoice #2041 (Bellingham Food Co-op)", approveLabel: "Approve this fix" },
          { primary: "$420.00", meta: "Square payout · Aug 22", issue: "Booked as Uncategorized Income", suggest: "Agent suggests: Recategorize as U-pick sales", approveLabel: "Approve this fix" },
          { primary: "$88.50", meta: "PayPal fee · Aug 9", issue: "Uncategorized", suggest: "Agent suggests: Recategorize as Payment processing fees", approveLabel: "Approve this fix" },
        ],
      },
      { kind: "auto", running: "Writing the plain-English P&L…", done: "P&L narrative ready", ms: 1300, artifact: PNL_ARTIFACT },
      { kind: "auto", running: "Packaging the accountant-ready close packet…", done: "Close packet ready to send", ms: 1200, artifact: PACKET_ARTIFACT },
    ],
    doneNote: (
      <>
        <strong>Every step that touched money waited for your approval.</strong> The close got dramatically shorter. The judgment stayed yours, and your accountant stayed your accountant.
      </>
    ),
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. Nothing connects to a real ledger. It’s the shape of the real thing, on made-up numbers.",
  how: {
    title: "Four beats, one of them yours.",
    lede: "No black box. The agent runs the same four steps every close, and it hands control back at the one that matters.",
  },
  honest: {
    lede: "A clean demo hides the parts that decide whether this actually works on your operation. Two of them are worth saying plainly.",
    needs: <>Books that are roughly current, and QuickBooks connected once. The agent reconciles what&rsquo;s there. If three months are uncategorized, the first run hands you a cleanup list, not a close, which is genuinely useful to know.</>,
    ends: <>The mismatches it flags still need your call, and a messy chart of accounts confuses every tool in this category. This shortens the close. It doesn&rsquo;t replace the person who owns the numbers.</>,
  },
  deploy: {
    title: "Deploy it on your books.",
    body: [
      <>It starts with a 30-minute conversation, and it&rsquo;s free. We&rsquo;ll tell you in writing where an agent like this would actually help on your operation, and where it wouldn&rsquo;t.</>,
      <>When it&rsquo;s a fit, we install it on your real systems, encode your accounts and thresholds, set the approval gates, and teach you to run it. It&rsquo;s yours to keep, no lock-in. We build it and leave you capable.</>,
    ],
  },
};
