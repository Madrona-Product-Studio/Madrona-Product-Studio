import { ArtifactCard, ArtifactList } from "../../pages/lab/AgentConsole";
import { DocButton, DocTitle, DocSection, DocProse, DocStamp } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// Industry-intelligence agent, run on Berry Good. Reads the trade's sources
// overnight, compares against a base file, and briefs the owner on what
// actually changed, each signal routed to a next move. The genericizable
// flagship: one pattern, any industry.

const BRIEF = (
  <ArtifactCard kicker="Morning brief · Aug 20" title="What changed overnight.">
    <ArtifactList items={[
      "Raspberry prices up 8%: pricing revisit added to today",
      "New u-pick competitor 12 miles south: watching",
      "Heat wave Thu–Sat: noted, no action yet",
    ]} />
    <p className="agentx-pnl-note">Three lines, not fourteen sources. The agent read the night so you didn’t have to.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="Read the full brief" filename="Berry-Good_Morning-Brief_Aug-20.pdf" kind="memo">
        <DocTitle business="Berry Good Berry Farm" title="Morning Brief" sub="Overnight sweep · August 20, 2026" />
        <DocSection head="What changed overnight">
          <DocProse>Three of fourteen sources moved since yesterday. The rest is filed as noise. Here’s what earned your attention, each with a suggested move.</DocProse>
        </DocSection>
        <DocSection head="1 · Raspberry prices up 8%">
          <DocProse>USDA weekly, regional. Third straight week up, and your U-pick price now sits below market. <strong>Suggested move:</strong> revisit U-pick pricing for the holiday weekend.</DocProse>
        </DocSection>
        <DocSection head="2 · New u-pick competitor, 12 miles south">
          <DocProse>Bellingham Berries opened weekend u-pick with similar hours. <strong>Suggested move:</strong> note it in the competitive file and watch their pricing.</DocProse>
        </DocSection>
        <DocSection head="3 · Heat wave Thursday–Saturday">
          <DocProse>NOAA has the weekend peaking near 94°F; ripening will accelerate. Filed for you. No action needed unless it changes your picking plan.</DocProse>
        </DocSection>
        <DocStamp>Sources read: USDA weekly, regional trade press, three competitors, NOAA. Compiled overnight by the industry agent · August 20, 2026.</DocStamp>
      </DocButton>
    </div>
  </ArtifactCard>
);

export const industryBrief: AgentDemo = {
  id: "industry-brief",
  title: "Industry-intelligence agent: a working demo",
  tagline: "Overnight, the agent reads your industry’s reports, prices, and news, compares them to what it already knows, and hands you a short brief of what actually changed, each signal with a suggested next move.",
  spec: { runs: "Nightly", approve: "What becomes an action", setup: "About a week" },
  pipeline: [
    { name: "Read", d: "Reads your industry’s sources overnight.", icon: "eye" },
    { name: "Compare", d: "Weighs each against your base file.", icon: "filter" },
    { name: "What changed", d: "Surfaces only what actually moved.", icon: "chart" },
    { name: "You route", d: "You pick what’s worth acting on.", icon: "shield", gate: true },
  ],
  script: {
    title: "Berry Good · industry",
    command: "/industry-sweep",
    meta: "Overnight · Aug 20",
    runLabel: "Run the sweep",
    runHint: "One command. The agent reads the night’s sources and briefs you on what moved.",
    phases: [
      { kind: "auto", running: "Reading overnight sources (14)…", done: "14 sources read · USDA, trade press, 3 competitors, weather", ms: 1300 },
      { kind: "auto", running: "Comparing against your base file…", done: "3 changes worth your attention · 11 filed as noise", ms: 1400 },
      {
        kind: "gate",
        running: "3 signals: pick what becomes an action",
        done: "2 signals routed to today",
        head: "A brief, not a feed. Here’s what moved since yesterday. Send what matters to your day; skip the rest.",
        approveAllLabel: "Route all to today",
        continueLabel: "Route selected",
        items: [
          { primary: "Raspberry prices +8%", meta: "USDA weekly · regional", issue: "Third straight week up. Your U-pick sits below market.", suggest: "Suggested move: Revisit U-pick pricing for the holiday weekend.", approveLabel: "Add to today" },
          { primary: "New u-pick 12 mi south", meta: "Competitor · social", issue: "Bellingham Berries opened weekend u-pick, similar hours.", suggest: "Suggested move: Note in the competitive file; watch their pricing.", approveLabel: "Add to today" },
          { primary: "Heat wave Thu–Sat", meta: "NOAA · 94°F peak", issue: "Hot weekend ahead: ripening will accelerate.", suggest: "A weather note. Already on your radar?", manual: true, manualNote: "Filed for you. No action needed unless it changes your picking plan." },
        ],
      },
      { kind: "auto", running: "Writing the morning brief…", done: "Brief ready", ms: 1000, artifact: BRIEF },
    ],
    doneNote: (
      <>
        <strong>A brief, not a feed.</strong> The agent reads everything and surfaces the little that moved; you decide what earns your day. Point it at your trade instead of berries and it’s the cheapest strategy work you’ll ever buy.
      </>
    ),
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. The sources and signals are made up; the sweep-and-brief pattern is the real one.",
  how: {
    title: "Reads the night, briefs the morning.",
    lede: <>The value isn&rsquo;t more information: it&rsquo;s less. The agent reads far more than you could and hands back only what changed against what you already know.</>,
  },
  honest: {
    lede: "The magic is in the base file. Two things decide whether the brief is signal or noise.",
    needs: <>A base file worth comparing against: the players, the pressures, the calendar, the questions that matter in your trade. We write the first one with you; it&rsquo;s what turns a feed into a brief.</>,
    ends: <>It surfaces what moved and suggests a move; it doesn&rsquo;t make the call. Whether a competitor&rsquo;s opening or a price swing is worth acting on is judgment, and that stays yours.</>,
  },
  deploy: {
    title: "Point it at your industry.",
    body: [
      <>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing whether an industry agent would earn its keep in your trade, and what its base file should watch.</>,
      <>When it&rsquo;s a fit, we write the base file with you, wire the sources, set the nightly rhythm, and teach you to run it. Yours to keep, no lock-in.</>,
    ],
  },
};
