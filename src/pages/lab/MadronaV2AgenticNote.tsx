import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: The studio that runs itself (Learning). How agentic
// operations work, shown on the operation we actually run. Figures are the
// approved hq-pattern diagram directions (loop + day rail + blueprint) from
// madrona-studio/design/diagrams/hq-pattern, genericized for public eyes:
// the pattern is real, the task examples are representative, and client
// demos always use demo data.

const Arrow = () => (
  <svg viewBox="0 0 14 12" width="18" height="15" fill="none" aria-hidden="true"><path d="M1 6h11m0 0L8 2m4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
);

const RAIL = [
  { time: "3:00 am", agent: "Nightly sweep", mode: "autonomous", doing: <>Scans the outside world for <b>new opportunities</b>, checks each one is still real, and files the worth-acting-on batch with a one-line reason each.</>, lands: ["repo commit", "morning batch"] },
  { time: "5:00 am", agent: "Morning pulse", mode: "autonomous, cloud", doing: <>Reads <b>email and calendar</b>: replies that arrived, meetings today, anything gone stale. Refreshes the ranked priorities before the day starts.</>, lands: ["priorities", "owed-by-you list"] },
  { time: "8:30 am", agent: "Daily brief", mode: "10 minutes, together", doing: <>One decision surface: <b>what changed overnight, what to approve, today's top three</b>. Decisions made here fan out into prepared work.</>, lands: ["today's moves", "send queue"] },
  { time: "all day", agent: "Capture", mode: "Siri, phone, any session", doing: <>Say it once and it is <b>filed where it belongs</b>: a task, a lead, a grocery item. Nothing lives in your head or a sticky note.</>, lands: ["the right list", "repo commit"] },
  { time: "Monday", agent: "Chief-of-staff sync", mode: "20 minutes, weekly", doing: <>The conductor: <b>what moved, what slipped, what is owed</b>, one needle-mover per thread. Keeps every track visibly green, yellow, or red.</>, lands: ["track status", "scoreboard"] },
];

export default function MadronaV2AgenticNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The studio that runs itself · Current" />
      <M2Nav active="current" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker"><Link className="m2-pb-crumb" to="/current">Current</Link> · Learning · Aug 2026</p>
        <h1>The studio that <span className="m2-pop">runs itself.</span></h1>
        <p className="m2-th-standfirst">How agentic operations work, shown on the operation we actually run. Madrona's own studio runs on one source of truth and a handful of agents on a rhythm. Nothing here is a demo; this is the pattern we sell, doing its day job.</p>
      </section>

      {/* 1 · The pattern */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The pattern</p>
          <p className="m2-ab4-statement">One repository runs the operation.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Everything the studio knows lives in one git repository: the strategy that says how to decide, and the live work itself. Agents enrich it on a rhythm, one surface renders it, and a person acts on it. Every arrow is a commit.</p>
          <p>That last part matters: because the whole operation is plain text in version control, it is readable, auditable, and owned by the operator, not by a vendor.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-loop">
              <div className="m2-hq-stage">
                <div className="num">1</div>
                <div className="name">Capture</div>
                <div className="m2-hq-card">
                  <div className="m2-hq-rows">
                    <div className="row"><div className="m2-hq-what">Siri and phone<small>one sentence, filed for you</small></div></div>
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
                  <div className="t">hq <small>· git</small></div>
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
                    <div className="row"><span className="m2-hq-when">weekly</span><div className="m2-hq-what">Chief-of-staff sync<small>the conductor</small></div></div>
                  </div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">4</div>
                <div className="name">Surface</div>
                <div className="m2-hq-helm">
                  <div className="bar">HELM · helm.day</div>
                  <div className="hero"><i>Today's three moves</i><em>ranked by strategy, with the why</em></div>
                  <div className="r"><span className="dot" />Send the proposal</div>
                  <div className="r"><span className="dot" />Reply to the customer</div>
                  <div className="r"><span className="dot" />Decide on the batch</div>
                </div>
                <div className="desc">The repository, rendered as a command center. No second backlog to maintain.</div>
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
            <div className="m2-hq-return"><span>Every action writes back to the repository, so tomorrow starts smarter</span></div>
          </div>
        </div>
      </section>

      {/* 2 · The rhythm */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The rhythm</p>
          <p className="m2-ab4-statement">A day in a self-running operation.</p>
        </div>
        <div className="m2-ab4-body">
          <p>The system works while you sleep and briefs you when you sit down. The agents never act outward on their own: they read, sort, rank, and prepare, and the owner spends their attention on deciding and doing.</p>
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
              <p><b>The spine is one git repository.</b> Helm renders it live as a command center. Agents propose; the owner decides and sends. Every action commits back, so the system compounds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · The schematic */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">For the technically curious</p>
          <p className="m2-ab4-statement">The same operation, as a schematic.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Five components, one bus. The repository is the bus: every component reads it and writes it through plain git commits. No proprietary database, no lock-in, no black box.</p>
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
                <h4>hq · git repository</h4>
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
                <h4>Helm · command center</h4>
                <ul><li>renders the repo live</li><li>ranked hero + track lights</li><li>capture + approve from phone</li></ul>
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
            <div className="m2-pb-bpreturn"><i>↩</i><span>05 → 01: every operator action commits back, so the system compounds</span></div>
            <div className="m2-pb-bpnote"><span>fig. 1 — the hq pattern, as run daily at madrona product studio</span><span>rev 2026-08</span></div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Where this points</p>
          <p className="m2-ab4-statement">We sell what we run.</p>
        </div>
        <div className="m2-ab4-body">
          <p>An agentic-operations engagement starts small: one agent on one real workflow, and one card on a command surface, with visible payback before anything grows. The pattern above is the reference implementation, and it is how this studio actually runs.</p>
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
