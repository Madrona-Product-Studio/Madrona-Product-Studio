import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: A starter guide to building with AI (Guide). The piece
// Charlie wishes he'd read on day one: the recommended setup (GitHub,
// terminal, Claude Code + Codex, Vercel, connectors) and the habits that
// make it work. First-person voice; Charlie voice pass required before
// merge. SEO target: how to start building with AI / AI coding tools.

const Arrow = () => (
  <svg viewBox="0 0 14 12" width="18" height="15" fill="none" aria-hidden="true"><path d="M1 6h11m0 0L8 2m4 4-4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
);

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const P = {
  sprout: "M12 21V11M12 11c0-4 3-7 8-7 0 4-3 7-8 7ZM12 13c0-3-2.5-5.5-6.5-5.5 0 3.2 2.5 5.5 6.5 5.5Z",
  question: "M9 9a3 3 0 1 1 4.6 2.5c-1 .7-1.6 1.3-1.6 2.5M12 17.5h.01",
  clarity: "M12 5c5 0 8.5 3.5 9.5 7-1 3.5-4.5 7-9.5 7s-8.5-3.5-9.5-7c1-3.5 4.5-7 9.5-7ZM12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
  commits: "M3 12h5M16 12h5M12 12m-3.5 0a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0",
  person: "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c1.5-4 5-6 8-6s6.5 2 8 6",
};

const STEPS = [
  {
    n: "01", name: "GitHub", time: "~15 min",
    what: <>Make a free account at github.com. GitHub is where your code lives: every project is a <b>repository</b>, and every change is saved with a note about what changed. You do not need to learn git deeply; your AI tools will do most of the git work for you. You just need the account and the mental model: this is the source of truth.</>,
    lands: ["github.com account", "one empty repository"],
  },
  {
    n: "02", name: "The terminal", time: "~30 min",
    what: <>Open the Terminal app that ships with your Mac. This is where you will talk to your AI agents. You need comfort, not mastery: how to open it, paste a command, and read what comes back. Ask your first agent to explain anything confusing; teaching you is part of its job.</>,
    lands: ["comfort opening Terminal", "one command run"],
  },
  {
    n: "03", name: "Claude Code", time: "~20 min",
    what: <>Claude Code is an AI agent that lives in your terminal: it writes the code, runs it, fixes what breaks, and explains what it did. Install it, sign in, open a session in a project folder, and describe what you want in plain language. This one tool is most of the setup.</>,
    lands: ["claude installed", "first working session"],
  },
  {
    n: "04", name: "A second agent", time: "~15 min",
    what: <>We also run Codex, a second terminal agent. Two agents matter more than it sounds: they have different strengths, you can run them side by side on different tasks, and comparing their answers teaches you judgment faster than either alone.</>,
    lands: ["codex installed", "two agents side by side"],
  },
  {
    n: "05", name: "Vercel", time: "~20 min",
    what: <>Vercel puts your project on the internet. Sign up with your GitHub account, import your repository, and from then on <b>every change you push goes live automatically</b>. The distance from "it works on my machine" to "here is the link" becomes zero.</>,
    lands: ["vercel account", "your project, live at a URL"],
  },
  {
    n: "06", name: "Connectors", time: "~20 min",
    what: <>In Claude's settings, connect the services you use: Vercel, Gmail, your calendar. Connectors give your agent reach: it can check a deployment, read the error logs, or draft the follow-up email, instead of you copying and pasting between tabs.</>,
    lands: ["Claude connectors on", "agent with reach"],
  },
];

const HABITS = [
  { icon: P.sprout, tone: "sprout", strong: "Build something real and small.", text: "Not a tutorial. Something you will actually use this month." },
  { icon: P.question, tone: "storefront", strong: "Ask why, not just what.", text: "You are building your own judgment, not just an app." },
  { icon: P.clarity, tone: "layers", strong: "Look at everything it makes.", text: "On your phone too. Taste only works if you look." },
  { icon: P.commits, tone: "sprout", strong: "Commit small and often.", text: "When something breaks, you walk back one step, not one afternoon." },
  { icon: P.person, tone: "storefront", strong: "You do not need to become an engineer.", text: "The agents supply the syntax. You supply the judgment." },
];

export default function MadronaV2StarterGuideNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="A starter guide to building with AI · Our POV" />
      <M2Nav active="pov" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">From the workshop</p>
        <h1>A starter guide to <span className="m2-pop">building with AI.</span></h1>
        <p className="m2-th-standfirst">This is the piece I wish someone had handed me when I started. You do not need a computer science degree to build real software with AI anymore. You need a handful of tools set up the right way, a few habits, and something worth building. Here is the whole setup, in an afternoon.</p>
        <p className="m2-th-byline">Charlie Koch · Founder, Madrona Product Studio · August 2026</p>
      </section>

      {/* 1 · The shape */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The shape of it</p>
          <p className="m2-ab4-statement">Five pieces, one loop.</p>
          <div className="m2-ab4-body">
            <p>Every AI coding setup worth having reduces to the same loop: you describe what you want, agents in your terminal build it, GitHub keeps the source of truth, Vercel puts it on the internet, and what you learn from the live thing feeds the next round.</p>
            <p>Everything below exists to stand this loop up.</p>
          </div>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-loop m2-hq-loop--even">
              <div className="m2-hq-stage">
                <div className="num">1</div>
                <div className="name">You</div>
                <div className="m2-hq-card">
                  <div className="t">The idea, in plain language</div>
                  <div className="m">What it is, who it is for, what good looks like. This stays your job.</div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">2</div>
                <div className="name">Agents</div>
                <div className="m2-hq-card mind">
                  <div className="t">The terminal</div>
                  <div className="m2-hq-file">claude <span>Claude Code</span></div>
                  <div className="m2-hq-file">codex <span>a second opinion</span></div>
                  <div className="m">They write, run, fix, and explain.</div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">3</div>
                <div className="name">GitHub</div>
                <div className="m2-hq-card">
                  <div className="t">Source of truth</div>
                  <div className="m">Every change saved, described, reversible. Your work can never be lost.</div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">4</div>
                <div className="name">Vercel</div>
                <div className="m2-hq-card">
                  <div className="t">Live on the internet</div>
                  <div className="m">Every push deploys automatically. A real URL from day one.</div>
                </div>
              </div>
              <div className="m2-hq-conn"><Arrow /></div>
              <div className="m2-hq-stage">
                <div className="num">5</div>
                <div className="name">The world</div>
                <div className="m2-hq-act">
                  <div className="t">Real people use it</div>
                  <div className="m">What they do and say <b>feeds your next idea</b>, and the loop turns again.</div>
                </div>
              </div>
            </div>
            <div className="m2-hq-return"><span>The loop is the point: every turn makes the product and the builder better</span></div>
          </div>
          <p className="m2-pb-figcap">The builder's loop. This is the same setup we use at Madrona to ship every product we run, from travel planning to boating guides.</p>
        </div>
      </section>

      {/* 2 · The setup */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The setup</p>
          <p className="m2-ab4-statement">Six steps, one afternoon.</p>
          <div className="m2-ab4-body">
            <p>In order, because each step makes the next one easier. None of these require a credit card to start.</p>
          </div>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-rail">
              {STEPS.map((s) => (
                <div key={s.n} style={{ display: "contents" }}>
                  <div className="left"><div className="time">{s.n}</div><div className="agent">{s.name}</div><div className="mode">{s.time}</div></div>
                  <div className="right">
                    <div className="doing">{s.what}</div>
                    <div className="m2-hq-lands"><span className="lbl">You leave with</span><div className="m2-hq-chips">{s.lands.map((l) => <i key={l}>{l}</i>)}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m2-hq-railfoot">
              <span className="spine" />
              <p><b>That is the whole setup.</b> A terminal with two AI agents, GitHub holding the truth, Vercel putting it live, and connectors giving your agent reach. Everything else is habits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · The habits */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The habits</p>
          <p className="m2-ab4-statement">The tools are the easy part.</p>
          <div className="m2-ab4-body">
            <p>Everything above takes an afternoon. What separates people who ship from people who stall is not the setup. It is these.</p>
          </div>
        </div>
        <ul className="m2-th4-rows">
          {HABITS.map((h) => (
            <li key={h.strong}>
              <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={h.tone}><I d={h.icon} /></span>
              <p><strong>{h.strong}</strong> <span>{h.text}</span></p>
            </li>
          ))}
        </ul>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Where this goes</p>
          <p className="m2-ab4-statement">From setup to studio.</p>
        </div>
        <div className="m2-ab4-body">
          <p>This setup is where we started too. Everything else we have written about, the build engine, the agentic operations pattern, grew out of this loop plus time and shipped products. Start the loop, keep it turning, and write down what it teaches you.</p>
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
