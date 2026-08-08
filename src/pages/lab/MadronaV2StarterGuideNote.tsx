import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: A starter guide to building real software with AI (Guide).
// The piece Charlie wishes he'd read on day one: the recommended setup
// (GitHub, terminal, Claude Code + Codex, Vercel, connectors) with real
// keystrokes per step, the working prompts (drawn from Charlie's actual
// gates: plan-first, screenshot QA, options, ship gate, CLAUDE.md), a
// worked first build, and an FAQ. First-person voice; Charlie voice pass
// required before merge. SEO target: how to start building with AI /
// install claude code / AI coding agents.

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
    how: (
      <ol>
        <li>Go to github.com and create a free account.</li>
        <li>Click <b>New repository</b>, name it after your project (lowercase, dashes), and create it. Empty is fine.</li>
      </ol>
    ),
    lands: ["github.com account", "one empty repository"],
  },
  {
    n: "02", name: "The terminal", time: "~30 min",
    what: <>Open the Terminal app that ships with your Mac. This is where you will talk to your AI agents. You need comfort, not mastery: how to open it, paste a command, and read what comes back. Ask your first agent to explain anything confusing; teaching you is part of its job.</>,
    how: (
      <ol>
        <li>Press <code>⌘ space</code>, type <b>terminal</b>, press return.</li>
        <li>Type <code>ls</code> and press return. Those are your files. That is all the ceremony there is.</li>
      </ol>
    ),
    lands: ["comfort opening Terminal", "one command run"],
  },
  {
    n: "03", name: "Claude Code", time: "~20 min",
    what: <>Claude Code is an AI agent that lives in your terminal: it writes the code, runs it, fixes what breaks, and explains what it did. Install it, sign in, open a session in a project folder, and describe what you want in plain language. This one tool is most of the setup. It comes with a Claude Pro subscription.</>,
    how: (
      <ol>
        <li>Paste this into the terminal: <code>curl -fsSL https://claude.ai/install.sh | bash</code></li>
        <li>Open a new terminal window and type <code>claude --version</code> to confirm it installed.</li>
        <li>Move into your project folder (<code>cd your-project</code>), type <code>claude</code>, and sign in with your Claude account when the browser opens.</li>
        <li>Type your first request in plain language. Try: <i>what can you do for me?</i></li>
      </ol>
    ),
    lands: ["claude installed", "first working session"],
  },
  {
    n: "04", name: "Codex", time: "~15 min",
    what: <>We also run Codex, a second terminal agent, from OpenAI. Two agents matter more than it sounds: they have different strengths, you can run them side by side on different tasks, and comparing their answers teaches you judgment faster than either alone. It comes with a ChatGPT Plus subscription.</>,
    how: (
      <ol>
        <li>Paste this into the terminal: <code>curl -fsSL https://chatgpt.com/codex/install.sh | sh</code></li>
        <li>In your project folder, type <code>codex</code> and sign in with your ChatGPT account.</li>
      </ol>
    ),
    lands: ["codex installed", "two agents side by side"],
  },
  {
    n: "05", name: "Vercel", time: "~20 min",
    what: <>Vercel puts your project on the internet. Sign up with your GitHub account, import your repository, and from then on <b>every change you push goes live automatically</b>. The distance from "it works on my machine" to "here is the link" becomes zero.</>,
    how: (
      <ol>
        <li>Go to vercel.com and sign up with your GitHub account.</li>
        <li>Click <b>Add New Project</b>, import your repository, press <b>Deploy</b>.</li>
        <li>Or skip the clicking: ask Claude to <i>set this project up to deploy on Vercel</i> and it will walk you through it.</li>
      </ol>
    ),
    lands: ["vercel account", "your project, live at a URL"],
  },
  {
    n: "06", name: "Connectors", time: "~20 min",
    what: <>Connect the services you use so your agent has reach: it can check a deployment, read the error logs, or draft the follow-up email, instead of you copying and pasting between tabs.</>,
    how: (
      <ol>
        <li>On claude.ai, open <b>Settings → Connectors</b> and link Vercel, Gmail, and your calendar.</li>
        <li>Inside a Claude Code session, type <code>/mcp</code> to see what your agent can reach.</li>
      </ol>
    ),
    lands: ["Claude connectors on", "agent with reach"],
  },
];

// The working prompts. Each one is a practice we actually run, written as a
// copy-paste prompt. The screenshot one is the review-process unlock.
const PROMPTS = [
  {
    name: "Ask for a plan first",
    why: "Two minutes reading a plan beats twenty minutes untangling code that solved the wrong problem.",
    p: "Before you write any code, tell me your plan: what you'll build, which files you'll touch, and anything you're unsure about. Wait for my OK.",
  },
  {
    name: "Make it check its own work",
    why: "This changed my review process more than anything else. The agent catches its own visual bugs instead of me playing QA.",
    p: "Before you tell me something is done, screenshot the page at phone size and desktop size, look at both yourself, and fix anything that is visibly wrong. Then show me.",
  },
  {
    name: "Ask for options, not answers",
    why: "The first idea is rarely the best one. Comparing three real directions builds your taste faster than accepting one.",
    p: "Give me three genuinely different directions for this, not three versions of the same idea. Put them side by side so I can compare, and tell me which you'd pick and why.",
  },
  {
    name: "Keep a ship gate",
    why: "When every push goes live automatically, the approval moment is the whole safety system. Guard it.",
    p: "Never push to the live site without showing me first. Walk me through what changed and wait for my approval.",
  },
  {
    name: "Make it teach you",
    why: "You are building your own judgment, not just an app. Why beats what, every time.",
    p: "Explain what you just did and why, in plain language. What would break if we removed it?",
  },
  {
    name: "Write the rules down once",
    why: "Anything you repeat twice belongs in the instructions file. The agent reads it every session, so the project gets easier as it grows.",
    p: "Create a CLAUDE.md file for this project. Write down the design rules, the things I care about, and the mistakes to avoid. Keep it updated as we learn.",
  },
];

const FAQ = [
  {
    q: "What does this cost?",
    a: <>GitHub and Vercel have free tiers that will carry you a long way. The agents are the real cost: Claude Code comes with Claude Pro and Codex comes with ChatGPT Plus, each about $20 a month as I write this. Starting with just Claude Code is fine.</>,
  },
  {
    q: "I'm not on a Mac. Does this still work?",
    a: <>Yes. Everything here runs on Windows and Linux too, and both installers cover all three. The guide reads Mac because that is what I work on, but nothing about the loop is Mac-only.</>,
  },
  {
    q: "Do I need to know how to code?",
    a: <>No. You need to describe what you want clearly and look carefully at what you get back. You will absorb more than you expect by asking why, but the agents supply the syntax. You supply the judgment.</>,
  },
  {
    q: "Can it break something?",
    a: <>The agents ask before running commands or changing files, and git means every committed change is saved and reversible. The honest risk is not a broken computer. It is shipping something you didn't look at, which is what the habits are for.</>,
  },
  {
    q: "What if the agent gets stuck?",
    a: <>Commit what works, clear the conversation, and restate the goal in one sentence. If it is still circling, ask the other agent. A second opinion usually breaks the loop, which is half the reason we run two.</>,
  },
  {
    q: "How long until I have something real?",
    a: <>An afternoon for the setup, a weekend for a first version you can put in front of someone. The loop is fast. The judgment takes longer, and that part is the fun.</>,
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
      <LabMeta title="A starter guide to building real software with AI · Thinking" />
      <M2Nav active="pov" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero m2-pov-hero">
        <p className="m2-kicker m2-who-kicker">From the workshop</p>
        <h1>A starter guide to building real software with AI.</h1>
        <p className="m2-th-standfirst">This is the piece I wish someone had handed me when I started. You do not need a computer science degree to build real software with AI anymore. You need a handful of tools set up the right way, a few habits, and something worth building. Here is the whole setup, in an afternoon.</p>
        <p className="m2-th-byline"><Link to="/about">Charlie Koch</Link> · Founder, Madrona Product Studio · August 2026</p>
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
        </div>
        <div className="m2-ab4-body">
          <p>In order, because each step makes the next one easier. GitHub and Vercel are free; the two agents come with subscriptions you may already have. Each step pairs the idea with the actual keystrokes, so you are never left wondering what to type.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-hq-rail m2-sg-rail">
              {STEPS.map((s) => (
                <div key={s.n} style={{ display: "contents" }}>
                  <div className="left"><div className="time">{s.n}</div><div className="agent">{s.name}</div><div className="mode">{s.time}</div></div>
                  <div className="right">
                    <div className="doing">{s.what}</div>
                    <div className="m2-sg-do"><span className="lbl">The keystrokes</span>{s.how}</div>
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

      {/* 3 · The prompts */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The prompts</p>
          <p className="m2-ab4-statement">Six prompts that do the heavy lifting.</p>
        </div>
        <div className="m2-ab4-body">
          <p>The tools take an afternoon; prompting well is what compounds. These are not magic words, they are working agreements, and every one came from a mistake I stopped repeating. Copy them, then grow your own.</p>
        </div>
        <div className="m2-sg-prompts">
          {PROMPTS.map((pr) => (
            <div key={pr.name} className="m2-sg-prompt">
              <h3>{pr.name}</h3>
              <p className="why">{pr.why}</p>
              <p className="p">&ldquo;{pr.p}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · Your first build */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Your first build</p>
          <p className="m2-ab4-statement">Real, small, and yours.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Do not build a to-do app from a tutorial. Pick something you will actually use this month: a guide to a place you know, a tool for your own work, a site for someone you like. One of our first was a boating guide to the San Juan Islands. A real place, a real need, small enough to ship in a weekend, and it is still live.</p>
          <p>Your day-one prompt can be this simple:</p>
          <div className="m2-sg-prompt m2-sg-prompt--solo">
            <p className="p">&ldquo;I want to build [the thing]: a website that [does what] for [who]. Set up a new project in this folder, keep it simple, and get a first version on screen that I can look at. Then tell me what you did.&rdquo;</p>
          </div>
          <p>Then look at what comes back, react honestly, and go again. That is the whole method.</p>
        </div>
      </section>

      {/* 5 · The habits */}
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

      {/* 6 · FAQ */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Fair questions</p>
          <p className="m2-ab4-statement">The questions I get.</p>
        </div>
        <div className="m2-sg-faq">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
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
            <Link className="m2-text-link" to="/thinking">More from Thinking <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
