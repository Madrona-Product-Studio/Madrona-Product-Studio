import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: The era of agentic operations (Essay). Built on the
// Product Thesis template (rail spreads with icon rows, numbered stages,
// byline, editorial close). The frame is the category shift; Madrona
// appears once, as evidence. Diagrams are the approved hq-pattern set.

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const P = {
  doc: "M7 3h7l5 5v13H7V3ZM14 3v5h5",
  clock: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3",
  monitor: "M4 5h16v11H4V5ZM9 20h6M12 16v4",
  person: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c1.5-4 5-6 8-6s6.5 2 8 6",
  target: "M12 12m-8.2 0a8.2 8.2 0 1 0 16.4 0a8.2 8.2 0 1 0-16.4 0M12 12m-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0",
  clarity: "M12 5c5 0 8.5 3.5 9.5 7-1 3.5-4.5 7-9.5 7s-8.5-3.5-9.5-7c1-3.5 4.5-7 9.5-7ZM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  outcome: "M6 21V4M6 4.5h11l-2.2 3L17 10.5H6",
  key: "M15 9a4 4 0 1 0-5.6 3.7L4 18v2h3v-2h2v-2h2l1.3-1.3A4 4 0 0 0 15 9Z",
};

const SHIFT = [
  { icon: P.doc, tone: "sprout", strong: "One source of truth.", text: "Everything the business knows, in one place it owns." },
  { icon: P.clock, tone: "storefront", strong: "AI agents on a rhythm.", text: "They read, sort, rank, and prepare while you sleep." },
  { icon: P.monitor, tone: "layers", strong: "One surface.", text: "The operation, rendered live. No second backlog." },
  { icon: P.person, tone: "sprout", strong: "A human in charge.", text: "Sending, signing, and deciding stay yours." },
];

const CHANGES = [
  { icon: P.target, tone: "sprout", text: "Attention moves up a level: the day starts briefed, not chased" },
  { icon: P.clarity, tone: "storefront", text: "Nothing falls through: everything owed or waiting is visible" },
  { icon: P.outcome, tone: "layers", text: "The business compounds: every action writes back to the source of truth" },
  { icon: P.key, tone: "sprout", text: "The owner keeps the keys: plain text, readable, portable, yours" },
];

const STAGES = [
  { num: "01", title: "Manual", body: "The business runs on scattered tools and someone's memory. Status lives in the owner's head, and the morning starts with figuring out where things stand." },
  { num: "02", title: "Assisted", body: "AI helps individuals go faster: drafting, summarizing, answering. Useful, but the operation itself is unchanged, and nothing compounds." },
  { num: "03", title: "Agentic", body: "AI agents maintain the operation on a rhythm and brief the owner. People spend their attention on judgment, relationships, and the work only they can do." },
];

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

export default function MadronaV2AgenticNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The era of agentic operations · Our POV" />
      <M2Nav active="pov" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">A point of view</p>
        <h1>The era of <span className="m2-pop">agentic operations.</span></h1>
        <p className="m2-th-standfirst">A business used to run on scattered tools and someone's memory. It can now run on one source of truth and a handful of AI agents on a rhythm, with a person firmly in charge. The change is not AI doing your work. It is your operation briefing you, so your attention goes to deciding.</p>
        <p className="m2-th-byline">Charlie Koch · Founder, Madrona Product Studio · August 2026</p>
      </section>

      {/* 1 · The shift */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The shift</p>
          <p className="m2-ab4-statement">Most businesses run on tool sprawl. The agentic version inverts it.</p>
          <div className="m2-ab4-body">
            <p>A task app, a spreadsheet, an inbox, and the owner's head stitching them together. That is the operating system of most small companies, and it taxes the scarcest thing they have: attention.</p>
            <p>Agentic AI applied to operations replaces the stitching, not the people.</p>
          </div>
        </div>
        <ul className="m2-th4-rows">
          {SHIFT.map((s) => (
            <li key={s.strong}>
              <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={s.tone}><I d={s.icon} /></span>
              <p><strong>{s.strong}</strong> <span>{s.text}</span></p>
            </li>
          ))}
        </ul>
      </section>

      {/* 2 · The pattern, drawn */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The pattern, drawn</p>
          <p className="m2-ab4-statement">Five stages, one loop. Every arrow is a commit.</p>
          <div className="m2-ab4-body">
            <p>The boundary matters: the agents never act outward on their own. They read, sort, rank, and prepare. Sending, signing, and deciding stay human.</p>
          </div>
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
          <p className="m2-pb-figcap">One example of what the next iteration of an agentic business can look like. There will be many shapes; this is the one we run every day.</p>
        </div>
      </section>

      {/* 3 · The rhythm */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The rhythm</p>
          <p className="m2-ab4-statement">The system works while you sleep and briefs you when you sit down.</p>
          <div className="m2-ab4-body">
            <p>This is what AI workflow automation looks like when it serves attention instead of replacing people: a representative day in an operation that prepares itself.</p>
          </div>
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

      {/* 4 · What changes */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">What changes</p>
          <p className="m2-ab4-statement">The point is not automation. It is attention.</p>
          <div className="m2-ab4-body">
            <p>Automation is the mechanism. The outcome is a different relationship between the owner and the operation.</p>
          </div>
        </div>
        <ul className="m2-th4-rows">
          {CHANGES.map((c) => (
            <li key={c.text}>
              <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={c.tone}><I d={c.icon} /></span>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 · Where businesses are */}
      <section className="m2-ab4 m2-ab4-sec m2-ab4-sec--full">
        <div className="m2-th4-fullhead">
          <p className="m2-kicker m2-who-kicker">Evolution over revolution</p>
          <p className="m2-ab4-railbody m2-th4-fullbody">No business needs to leap to the end state. The market is in transition, and the honest opportunity is to move one meaningful stage forward from wherever an operation is today.</p>
        </div>
        <ol className="m2-ab4-cols m2-th4-stages">
          {STAGES.map((s) => (
            <li key={s.num}>
              <p className="m2-th-stage-num">{s.num}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 6 · The schematic */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">For the technically curious</p>
          <p className="m2-ab4-statement">Five components, one bus.</p>
          <div className="m2-ab4-body">
            <p>The source of truth is the bus: every component reads it and writes it through plain git commits. No proprietary database, no lock-in, no black box.</p>
          </div>
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

      {/* 7 · Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">How we know</p>
          <p className="m2-ab4-statement">We sell what we run.</p>
        </div>
        <div className="m2-ab4-body m2-th4-point">
          <p>The diagrams above are not a concept. They are how Madrona itself runs, every day: our studio operates on this exact pattern, with a surface called Helm as the command center. And it scales down honestly; this works for a small business the same way it works for a studio.</p>
          <p>An engagement starts small, one AI agent on one real workflow and one card on a command surface, with visible payback before anything grows. Like everything we publish, this is a working document; as the pattern teaches us more, the page changes.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/pov">More from Our POV <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
