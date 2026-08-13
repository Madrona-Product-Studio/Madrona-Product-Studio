import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Open — the studio's open-source tools (the "Madrona Open" plugin marketplace).
// The flagship operating-system engine plus a craft catalog. Card grid; every
// card links to the tool's directory on GitHub and shows its one-line install.

const REPO = "https://github.com/Madrona-Product-Studio/madrona-open";

const CRAFT = [
  { name: "animation-vocabulary", desc: "Turns a vague description of a motion effect into its exact term, so you can prompt for it." },
  { name: "motion-options", desc: "Builds 3–4 genuinely distinct motion directions, reviews them live side by side, ships the winner." },
  { name: "og-image", desc: "Designs and wires great social-share images — one idea, brand color, bold mark." },
  { name: "screenshot", desc: "A tiny Playwright screenshotter for visual QA, capped to stay under AI image-size limits." },
  { name: "investor-ready", desc: "Makes an app judgeable by a stranger in 60 seconds: first-run, wow-path, credibility polish." },
  { name: "gtm-sweep", desc: "Takes an app to market as a measured sweep — positioning, launch, and a read/iterate loop." },
  { name: "presentable-pass", desc: "Pre-share cleanup: footer, stale model names, disclaimers, mobile polish, then a PR." },
  { name: "review-animations", desc: "Reviews motion code against a high craft bar and returns a Block/Approve verdict." },
];

function ToolCard({ name, desc }: { name: string; desc: string }) {
  return (
    <a className="m2-open-card" href={`${REPO}/tree/main/plugins/${name}`} target="_blank" rel="noopener noreferrer">
      <h3>{name}</h3>
      <p className="why">{desc}</p>
      <p className="p">/plugin install {name}@madrona-open</p>
      <span className="m2-open-gh">View on GitHub →</span>
    </a>
  );
}

export default function MadronaV2Open() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Open · Madrona Product Studio" />
      <M2Nav active="open" />

      {/* Masthead */}
      <section className="m2-ab4 m2-th-hero m2-pov-hero">
        <p className="m2-kicker m2-who-kicker">Open source</p>
        <h1>Open.</h1>
        <p className="m2-th-standfirst">Tools we build and use every day, shared because that's what being part of the community is. The belief behind them: the machine is the artifact. When you get good at something, the leverage isn't the one output, it's the reusable system that makes good outputs every time. Here are a few of ours.</p>
      </section>

      {/* Install */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Install</p>
          <p className="m2-ab4-statement">One line to add the collection, one to install a tool.</p>
          <div className="m2-ab4-body">
            <p>Everything here is a Claude Code plugin. Add the marketplace once, then install any tool. MIT licensed, provided as-is.</p>
          </div>
        </div>
        <div className="m2-sg-prompt m2-sg-prompt--solo m2-sys-artifact">
          <p className="p">/plugin marketplace add Madrona-Product-Studio/madrona-open{"\n"}/plugin install operating-system@madrona-open</p>
        </div>
      </section>

      {/* Flagship */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The flagship</p>
          <p className="m2-ab4-statement">An open operating system you own.</p>
          <div className="m2-ab4-body">
            <p>Most productivity tools want you to move your life inside them. This is the opposite. The source of truth is plain text you own; agents keep it current on a rhythm; any surface just renders it. You own the mind; the app renders it.</p>
            <p>It's the engine we run our own studio on, extracted into a starter you can fork — the ground-level version of <Link className="m2-text-link" to="/thinking/the-era-of-agentic-operations">the era of agentic operations</Link>.</p>
          </div>
        </div>
        <a className="m2-open-card m2-open-card--feature" href={`${REPO}/tree/main/plugins/operating-system`} target="_blank" rel="noopener noreferrer">
          <h3>operating-system</h3>
          <p className="why">A forkable substrate — a decision layer plus a live work file with machine-maintained blocks — and the routines that keep it current: capture, prioritize, daily-brief, weekly-sync.</p>
          <p className="p">/plugin install operating-system@madrona-open</p>
          <span className="m2-open-gh">View on GitHub →</span>
        </a>
      </section>

      {/* The craft catalog */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The craft catalog</p>
          <p className="m2-ab4-statement">How we ship polished product.</p>
          <div className="m2-ab4-body">
            <p>Motion, design, social images, launch, and the visual-QA primitive underneath them. Install only what you want.</p>
          </div>
        </div>
        <div className="m2-open-grid">
          {CRAFT.map((t) => <ToolCard key={t.name} {...t} />)}
        </div>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why we publish</p>
          <p className="m2-ab4-statement">Builders who teach.</p>
        </div>
        <div className="m2-ab4-body m2-th4-point">
          <p>We share what the work teaches us. A craft gets better in the open, and a tool you can read and fork is more honest than one you can only admire. Take these, make them yours.</p>
          <div className="m2-th-close-links">
            <a className="m2-text-link" href={REPO} target="_blank" rel="noopener noreferrer">The repository on GitHub <span aria-hidden="true">→</span></a>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
