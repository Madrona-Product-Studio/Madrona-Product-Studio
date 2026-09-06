import { ArtifactCard, ArtifactRows } from "../../pages/lab/AgentConsole";
import { DocButton, DocTitle, DocSection, DocRow, DocStamp } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// The payroll-planning agent, run on Berry Good. A scripted, self-contained
// simulation: no real books connect, no QuickBooks or Gusto call is made. It
// shows the shape of the work (settle cash, forecast the run, gate on the
// owner's approval to chase, plan). It plans; your provider still runs payroll.

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

export const payrollPlanning: AgentDemo = {
  id: "payroll-planning",
  title: "Payroll-planning agent: a working demo",
  tagline: "Before each payroll run, the agent settles your cash against what’s landing, forecasts whether payroll clears comfortably, and ranks which invoices to chase so it does. It plans; your provider still runs payroll.",
  spec: { runs: "Before each run", approve: "Any invoice it chases", setup: "A few days" },
  pipeline: [
    { name: "Settle", d: "Settles cash against PayPal and QuickBooks.", icon: "link" },
    { name: "Forecast", d: "Projects 30 days to the next run.", icon: "chart" },
    { name: "You approve", d: "Ranks invoices to chase; you pick.", icon: "shield", gate: true },
    { name: "Plan", d: "Hands you a clear-payroll plan.", icon: "doc" },
  ],
  script: {
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
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. Nothing connects to a real ledger. It’s the shape of the real thing, on made-up numbers.",
  how: {
    title: "Settles the cash, forecasts the run.",
    lede: "No black box. The agent runs the same four steps before every payroll, and it hands control back at the one that matters.",
  },
  honest: {
    lede: "A clean demo hides the parts that decide whether this actually works on your operation. Two of them are worth saying plainly.",
    needs: "Your QuickBooks and processor accounts connected, and a payroll date to plan toward.",
    ends: "This is payroll planning. Running payroll, taxes, benefits, and compliance stay with your payroll provider. The agent just makes sure the cash is ready.",
  },
  deploy: {
    title: "Plan your next run.",
    body: [
      <>It starts with a 30-minute conversation, and it&rsquo;s free. We&rsquo;ll tell you in writing where an agent like this would actually help on your operation, and where it wouldn&rsquo;t.</>,
      <>When it&rsquo;s a fit, we connect the accounts, set it to run before each payroll, and teach you to run it. It&rsquo;s yours to keep, no lock-in.</>,
    ],
  },
};
