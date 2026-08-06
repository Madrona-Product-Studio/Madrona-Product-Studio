import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: The era of agentic operations (Essay). The frame is the
// category shift a business can make, not Madrona's internals; our own
// operation appears once, as evidence ("we sell what we run"). Figures are
// the approved hq-pattern diagrams (loop + day rail + blueprint) with
// generic labels; client demos always use demo data.

const Arrow = () => (
  <svg viewBox="0 0 14 12" width="18" height="15" fill="none" aria-hidden="true"><path d="M1 6h11m0 0L8 2m4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
);

const RAIL = [
  { time: "3:00 am", agent: "Nightly sweep", mode: "autonomous", doing: <>Scans the outside world for <b>new opportunities</b>, checks each one is still real, and files the worth-acting-on batch with a one-line reason each.</>, lands: ["a commit", "the morning batch"] },
  { time: "5:00 am", agent: "Morning pulse", mode: "autonomous", doing: <>Reads <b>email and calendar</b>: replies that arrived, meetings today, anything gone stale. Refreshes the ranked priorities before the day starts.</>, lands: ["priorities", "owed-by-you list"] },
  { time: "8:30 am", agent: "Daily brief", mode: "10 minutes, together", doing: <>One decision surface: <b>what changed overnight, what to approve, today's top three</b>. Decisions made here fan out into prepared work.</>, lands: ["today's moves", "send queue"] },
  { time: "all day", agent: "Capture", mode: "voice, phone, any session", doing: <>Say it once and it is <b>filed where it belongs</b>: a task, a lead, a supply order. Nothing lives in your head or a sticky note.</>, lands: ["the right list", "a commit"] },
  { time: "Monday", agent: "Weekly sync", mode: "20 minutes, weekly", doing: <>The conductor: <b>what moved, what slipped, what is owed</b>, one needle-mover per area. Keeps every part of the business visibly green, yellow, or red.</>, lands: ["track status", "scoreboard"] },
];

const CHANGES = [
  { lead: "Attention moves up a level.", body: "The owner stops chasing status and starts the day already briefed. Time goes to deciding and doing, which are the two things only a person can do." },
  { lead: "Nothing falls through.", body: "Everything owed, promised, or waiting is visible in one place. The system remembers, so people do not have to." },
  { lead: "The business compounds.", body: "Every action writes back to the source of truth. The operation is smarter on Friday than it was on Monday, and it never starts over." },
  { lead: "The owner keeps the keys.", body: "The whole operation is plain text in version control: readable, auditable, portable. No vendor owns your business's brain." },
];

export default function MadronaV2AgenticNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The era of agentic operations · Current" />
      <M2Nav active="current" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker"><Link className="m2-pb-crumb" to="/current">Current</Link> · Essay · Aug 2026</p>
        <h1>The era of <span className="m2-pop">agentic operations.</span></h1>
        <p className="m2-th-standfirst">A business used to run on scattered tools and someone's memory. It can now run on one source of truth and a handful of agents on a rhythm, with a person firmly in charge. The change is not AI doing your work. It is your operation briefing you, so your attention goes to deciding.</p>
      </section>

      {/* 1 · The shift */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The shift</p>
          <p className="m2-ab4-statement">One source of truth, agents that prepare, one surface, a human who decides.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Most businesses run on tool sprawl: a task app, a spreadsheet, an inbox, and the owner's head stitching them together. The agentic version inverts that. Everything the business knows lives in one place. Agents enrich it on a schedule. One surface renders it. A person acts on it.</p>
          <p>The agents never act outward on their own. They read, sort, rank, and prepare. Sending, signing, and deciding stay human.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-loop">
              <div className="m2-hq-stage">
                <div className="num">1</div>
                <div className="name">Capture</div>
                <div className="m2-hq-card">
                  <div className="m2-hq-rows">
                    <div className="row"><div className="m2-hq-what">Voice and phone<small>one sentence, filed for you</small></div></div>
                    <div className="row"><div className="m2-hq-what">Any work session<small>notes land where they belong</small></div></div>
                    <div className="row"><div className="m2-hq-what">Email and calendar<small>swept automatically</small></div></div>
                  </div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">2</div>
                <div className="name">Source of truth</div>
                <div className="m2-hq-card mind">
                  <div className="t">the operation <small>· git</small></div>
                  <div className="m2-hq-file">strategy.md <span>how to decide</span></div>
                  <div className="m2-hq-file">the-work.md <span>everything live</span></div>
                  <div className="m">Machine-kept blocks inside:</div>
                  <div className="m2-hq-chips"><i>Priorities, ranked</i><i>Track status</i><i>Owed by you</i><i>Scoreboard</i></div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">3</div>
                <div className="name">Routines</div>
                <div className="m2-hq-card">
                  <div className="m2-hq-rows">
                    <div className="row"><span className="m2-hq-when">3:00a</span><div className="m2-hq-what">Nightly sweep<small>finds new opportunities</small></div></div>
                    <div className="row"><span className="m2-hq-when">5:00a</span><div className="m2-hq-what">Morning pulse<small>reads inbox and calendar</small></div></div>
                    <div className="row"><span className="m2-hq-when">daily</span><div className="m2-hq-what">Daily brief<small>one decision surface</small></div></div>
                    <div className="row"><span className="m2-hq-when">weekly</span><div className="m2-hq-what">Weekly sync<small>the conductor</small></div></div>
                  </div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">4</div>
                <div className="name">Surface</div>
                <div className="m2-hq-helm">
                  <div className="bar">COMMAND CENTER</div>
                  <div className="hero"><i>Today's three moves</i><em>ranked by strategy, with the why</em></div>
                  <div className="r"><span className="dot" />Send the proposal</div>
                  <div className="r"><span className="dot" />Reply to the customer</div>
                  <div className="r"><span className="dot" />Decide on the batch</div>
                </div>
                <div className="desc">The source of truth, rendered live. No second backlog to maintain.</div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">5</div>
                <div className="name">You act</div>
                <div className="m2-hq-act">
                  <div className="t">The person stays the decider</div>
                  <div className="m">Agents prepare and tee up. <b>A human sends, signs, and decides.</b> The system exists to make acting easy.</div>
                </div>
              </div>
            </div>
            <div className="m2-hq-return"><span>Every action writes back to the source of truth, so tomorrow starts smarter</span></div>
          </div>
        </div>
      </section>

      {/* 2 · The rhythm */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The rhythm</p>
          <p className="m2-ab4-statement">A day in an agentic operation.</p>
        </div>
        <div className="m2-ab4-body">
          <p>The system works while you sleep and briefs you when you sit down. Here is what a representative day looks like when the operation prepares itself.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-rail">
              {RAIL.map((r) => (
                <div key={r.agent} style={{ display: "contents" }}>
                  <div className="left"><div className="time">{r.time}</div><div className="agent">{r.agent}</div><div className="mode">{r.mode}</div></div>
                  <div className="right">
                    <div className="doing">{r.doing}</div>
                    <div className="m2-hq-lands"><span className="lbl">Lands in</span><div className="m2-hq-chips">{r.lands.map((l) => <i key={l}>{l}</i>)}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m2-hq-railfoot">
              <span className="spine" />
              <p><b>The spine is one source of truth.</b> A command surface renders it live. Agents propose; the owner decides and sends. Every action commits back, so the operation compounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · What changes */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">What changes</p>
          <p className="m2-ab4-statement">The point is not automation. It is attention.</p>
        </div>
        <div className="m2-ab4-body">
          {CHANGES.map((c) => (
            <p key={c.lead}><b>{c.lead}</b> {c.body}</p>
          ))}
        </div>
      </section>

      {/* 4 · The schematic */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">For the technically curious</p>
          <p className="m2-ab4-statement">The reference architecture.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Five components, one bus. The source of truth is the bus: every component reads it and writes it through plain git commits. No proprietary database, no lock-in, no black box.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board m2-pb-bp">
            <div className="m2-pb-bpgrid">
              <div className="m2-pb-plate" style={{ gridColumn: 1, gridRow: 1 }}>
                <span className="pnum">02 CAPTURE</span>
                <h4>Inputs</h4>
                <ul><li>voice / phone shortcut</li><li>any work session</li><li>email + calendar sweep</li></ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 2, gridRow: 1 }}><span>capture()</span><i>→</i></div>
              <div className="m2-pb-plate core" style={{ gridColumn: 3, gridRow: "1 / span 3", alignSelf: "center" }}>
                <span className="pnum">01 SOURCE OF TRUTH</span>
                <h4>the operation · git repository</h4>
                <ul>
                  <li>strategy.md&nbsp;&nbsp;// judgment: weights, heuristics</li>
                  <li>the-work.md&nbsp;&nbsp;// everything live, one file</li>
                  <li>generated blocks: priorities · tracks · owed · scoreboard</li>
                  <li>plain markdown. diffable. yours.</li>
                </ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 4, gridRow: 1 }}><span>renders</span><i>→</i></div>
              <div className="m2-pb-plate" style={{ gridColumn: 5, gridRow: 1 }}>
                <span className="pnum">04 SURFACE</span>
                <h4>Command center</h4>
                <ul><li>renders the source live</li><li>ranked hero + track lights</li><li>capture + approve from phone</li></ul>
              </div>
              <div className="m2-pb-plate" style={{ gridColumn: 1, gridRow: 3 }}>
                <span className="pnum">03 ROUTINES</span>
                <h4>Agents on a rhythm</h4>
                <ul><li>03:00 nightly sweep</li><li>05:00 morning pulse</li><li>daily brief · weekly sync</li></ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 2, gridRow: 3 }}><span>read + write</span><i>→</i></div>
              <div className="m2-pb-wire" style={{ gridColumn: 4, gridRow: 3 }}><span>tees up</span><i>→</i></div>
              <div className="m2-pb-plate dark" style={{ gridColumn: 5, gridRow: 3 }}>
                <span className="pnum">05 OPERATOR</span>
                <h4>The human</h4>
                <ul><li>decides, signs, sends</li><li>agents never act outward alone</li></ul>
              </div>
            </div>
            <div className="m2-pb-bpreturn"><i>↩</i><span>05 → 01: every operator action commits back, so the operation compounds</span></div>
            <div className="m2-pb-bpnote"><span>fig. 1 — the agentic operations pattern</span><span>rev 2026-08</span></div>
          </div>
        </div>
      </section>

      {/* 5 · How we know */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">How we know</p>
          <p className="m2-ab4-statement">We sell what we run.</p>
        </div>
        <div className="m2-ab4-body">
          <p>The diagrams above are not a concept. They are how Madrona itself runs, every day: our studio operates on this exact pattern, with a surface called Helm as the command center. An engagement starts small, one agent on one real workflow and one card on a command surface, with visible payback before anything grows.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/current">More from Current <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
