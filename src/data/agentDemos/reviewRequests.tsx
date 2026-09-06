import { ArtifactCard, ArtifactList } from "../../pages/lab/AgentConsole";
import { DocButton, DocEmail, DocProse, DocDivider } from "../../pages/lab/AgentDoc";
import type { AgentDemo } from "./types";

// Review-requests agent, run on Berry Good. Asks the right customers for a
// review at the right moment, in the owner's voice, and drafts replies to the
// ones that come in. It asks; it never fakes. The critical review always goes
// to the human, and no ask ever carries an incentive.

const REVIEWED = (
  <ArtifactCard kicker="Reviews · this week" title="Eight asks out, one reply for you.">
    <ArtifactList items={[
      "Review ask → 8 repeat customers, sent",
      "Reply to Marcus T. (★★★★★): posted",
      "Reply to Dana R. (★★★): held for you",
    ]} />
    <p className="agentx-pnl-note">Automate the ask, never the review. Incentivized or faked reviews break every platform’s rules, and your customers’ trust.</p>
    <div className="agentx-artifact-actions">
      <DocButton label="View the review drafts" filename="Berry-Good_Reviews_Aug-20.eml" kind="email">
        <DocEmail to="8 repeat customers" subject="A quick favor? 🍓">
          <DocProse>You’ve been coming back to Berry Good and it means a lot to us.</DocProse>
          <DocProse>If you’ve got ten seconds, a quick Google review helps other folks find us. No pressure at all. Thanks either way.</DocProse>
          <DocProse>Berry Good</DocProse>
        </DocEmail>
        <DocDivider />
        <DocEmail to="Marcus T. · public reply" subject="Re: ★★★★★ “Best berries in Whatcom”">
          <DocProse>Thank you, Marcus. This made our whole team’s day. See you at peak raspberry season! 🍓</DocProse>
          <DocProse>Berry Good</DocProse>
        </DocEmail>
        <DocDivider />
        <DocProse><strong>Held for you:</strong> Dana R. left ★★★ (“flat was light”). That one deserves a real apology and a make-good, in your words, not a template.</DocProse>
      </DocButton>
    </div>
  </ArtifactCard>
);

export const reviewRequests: AgentDemo = {
  id: "review-requests",
  title: "Review-requests agent: a working demo",
  tagline: "The agent asks for the review nobody remembers to ask for (the right customers, at the right moment, in your voice) and drafts replies to the ones that come in. It asks; it never fakes.",
  spec: { runs: "After each sale", approve: "Every ask and reply", setup: "A few days" },
  pipeline: [
    { name: "Spot", d: "Finds the customers worth asking.", icon: "eye" },
    { name: "Draft", d: "Writes the ask and reply drafts in your voice.", icon: "pen" },
    { name: "You approve", d: "Every ask and reply waits for you.", icon: "shield", gate: true },
    { name: "Send", d: "Sends the asks and posts your replies.", icon: "send" },
  ],
  script: {
    title: "Berry Good · reviews",
    command: "/ask-reviews",
    meta: "Aug 20",
    runLabel: "Run the asks",
    runHint: "One command. The agent finds who to ask and drafts the replies.",
    phases: [
      { kind: "auto", running: "Finding customers worth asking…", done: "8 happy repeat customers this week · 2 new reviews to answer", ms: 1200 },
      { kind: "auto", running: "Drafting asks and reply drafts…", done: "3 drafts for your okay", ms: 1300 },
      {
        kind: "gate",
        running: "3 to approve",
        done: "2 approved · 1 for you",
        head: "Asks go only to happy repeat customers, never with an incentive. Reply drafts wait for you. The critical review it flagged for a real answer.",
        approveAllLabel: "Approve all",
        continueLabel: "Send approved",
        items: [
          { primary: "Ask 8 repeat customers for a review", meta: "3rd+ purchase, all smooth", issue: "The ask nobody gets around to.", suggest: "Draft: “If you’ve got a sec, a Google review really helps us…”", approveLabel: "Approve & send" },
          { primary: "Reply to Marcus T. · ★★★★★", meta: "“Best berries in Whatcom”", issue: "A warm thank-you reply.", suggest: "Draft: “Thank you, Marcus. Made our day…”", approveLabel: "Approve & post" },
          { primary: "Reply to Dana R. · ★★★", meta: "“flat was light”", issue: "A real service reply, not a template.", suggest: "This one’s yours: a genuine apology and a make-good.", manual: true, manualNote: "Held. Answer Dana yourself. The critical one always needs a person." },
        ],
      },
      { kind: "auto", running: "Sending approved asks…", done: "8 asks sent · 1 reply posted · 1 held", ms: 1100, artifact: REVIEWED },
    ],
    doneNote: (
      <>
        <strong>Automate the ask, never the review.</strong> The agent asks the right people at the right moment and drafts the warm replies, and hands you the critical one to answer yourself.
      </>
    ),
  },
  caption: "A scripted run on Berry Good Berry Farm, our demonstration business. The customers are made up; the ask-and-hold behavior is the real one.",
  how: {
    title: "Asks the right people. Answers with care.",
    lede: "Every happy customer is a review you never asked for. The agent spots the ones worth asking, drafts the ask in your voice, and drafts the replies to the reviews that come back: the warm ones for a tap, the hard one for you.",
  },
  honest: {
    lede: <>The drafting is easy. Two things decide whether it&rsquo;s trustworthy.</>,
    needs: "Your Google Business Profile connected, and sales history so it asks the right people at the right time.",
    ends: <>Automate the ask, never the review itself, and the unhappy customer&rsquo;s reply is always yours to write.</>,
  },
  deploy: {
    title: "Put it on your reviews.",
    body: [
      <>It starts with a free 30-minute conversation. We&rsquo;ll tell you in writing where this would actually help on your reviews, and where it wouldn&rsquo;t.</>,
      <>When it fits, we connect your Business Profile and point of sale, set the ask rules, teach it your voice, and hand it over. Yours to keep, no lock-in.</>,
    ],
  },
};
