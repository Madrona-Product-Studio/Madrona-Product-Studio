import { ArtifactCard, ArtifactRows } from "../../pages/lab/AgentConsole";
import { DocButton, DocTitle, DocSection, DocRow, DocNote, DocStamp } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// Cash-position agent, run on Berry Good. Reads every connected account each
// morning, forecasts the next 30 days, flags the tight week, and packages a
// one-page brief. The "one shortfall, pick what to do" beat is the human gate.
// It reads; it never moves money.

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

export const cashPosition: AgentDemo = {
  id: "cash-position",
  title: "Cash-position agent: a working demo",
  tagline: "One command pulls every account into a single honest number: what’s in the bank, what’s coming, what’s committed this week, with the shortfalls flagged before they bite. It reads; it never moves money.",
  spec: { runs: "Every morning", approve: "Any action it suggests", setup: "A few days" },
  pipeline: [
    { name: "Gather", d: "Pulls balances from every connected account.", icon: "link" },
    { name: "Project", d: "Forecasts the next 30 days of in and out.", icon: "chart" },
    { name: "You review", d: "Flags shortfalls; you decide what to do.", icon: "shield", gate: true },
    { name: "Brief", d: "Puts it on one page each morning.", icon: "doc" },
  ],
  script: {
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
        running: "One shortfall: pick what to do",
        done: "2 actions routed",
        head: "Sept 2 looks tight: payroll lands before two big receivables. Here’s how to cover it. Your call.",
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
        <strong>It reads; it never moves money.</strong> One honest number, the tight week flagged early, and a plan you approved, before it became a problem.
      </>
    ),
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. The accounts and numbers are made up; the workflow is the real one.",
  how: {
    title: "Reads everything. Moves nothing.",
    lede: <>No black box. The agent runs the same four beats every morning, and it hands control back at the one that&rsquo;s yours to make.</>,
  },
  honest: {
    lede: "A clean demo hides the parts that decide whether this actually works on your operation. Two of them are worth saying plainly.",
    needs: <>Every account connected: bank, cards, processors. The pulse is only as honest as what it can see; if half your money moves through a system it can&rsquo;t reach, you get a confident number that&rsquo;s wrong.</>,
    ends: <>It reads and forecasts; it never moves money. Which invoice to chase, and whether to dip into savings, stays your call.</>,
  },
  deploy: {
    title: "Put it on your accounts.",
    body: [
      <>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing where an agent like this would actually help on your books, and where it wouldn&rsquo;t.</>,
      <>When it&rsquo;s a fit, we connect your accounts, set the morning rhythm, and teach you to run it. Yours to keep, no lock-in.</>,
    ],
  },
};
