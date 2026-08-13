import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: Solve the system, not the symptom (Essay). Built on the
// Product Thesis template: every section pairs a LEFT rail (kicker + statement
// + short framing prose) with a RIGHT-hand visual artifact (icon rows, a
// criteria card, or numbered stages) — prose never sits alone in the right
// column. A first-person craft piece; Madrona appears once, as evidence
// (the studio's own image tool).

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const P = {
  frame: "M4 5h16v12H4V5ZM8 15l3-3 2 2 3-4 2 3",
  layers: "M12 3l9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  outcome: "M6 21V4M6 4.5h11l-2.2 3L17 10.5H6",
  target: "M12 12m-8.2 0a8.2 8.2 0 1 0 16.4 0a8.2 8.2 0 1 0-16.4 0M12 12m-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0",
  link: "M10 13a5 5 0 0 0 7 0l1-1a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-1 1a5 5 0 0 0 7 7l1-1",
  key: "M15 9a4 4 0 1 0-5.6 3.7L4 18v2h3v-2h2v-2h2l1.3-1.3A4 4 0 0 0 15 9Z",
  clock: "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6l1-7Z",
  up: "M12 19V5M5 12l7-7 7 7",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
};

type Row = { icon: string; tone: string; strong: string; text: string };

const Rows = ({ items }: { items: Row[] }) => (
  <ul className="m2-th4-rows">
    {items.map((s) => (
      <li key={s.strong}>
        <span className="m2-ab4-ico m2-ab4-ico--square" data-tone={s.tone}><I d={s.icon} /></span>
        <p><strong>{s.strong}</strong> <span>{s.text}</span></p>
      </li>
    ))}
  </ul>
);

const TRADE: Row[] = [
  { icon: P.frame, tone: "sprout", strong: "Fix the artifact.", text: "One better output. The next one starts again from zero." },
  { icon: P.layers, tone: "storefront", strong: "Fix the system.", text: "Every future output improves, and keeps improving after you move on." },
  { icon: P.outcome, tone: "layers", strong: "Spend the hour once.", text: "Linear effort, compounding return. That is the whole trade." },
];

const NOWTHEN: Row[] = [
  { icon: P.clock, tone: "sprout", strong: "Then, it cost weeks.", text: "Reworking the machine meant a team and a good reason, so patching symptoms was rational." },
  { icon: P.bolt, tone: "storefront", strong: "Now, it costs an afternoon.", text: "AI lowered the cost of fixing the things that make things, so going upstream is the default." },
];

const INVEST: Row[] = [
  { icon: P.target, tone: "sprout", strong: "How the work gets prioritized.", text: "Priorities are generated from the work itself, not a list I keep updating by hand." },
  { icon: P.link, tone: "storefront", strong: "How the pieces talk to each other.", text: "One source of truth; every surface renders it instead of holding its own copy." },
  { icon: P.key, tone: "layers", strong: "Where judgment lives.", text: "Encoded once as criteria and process, so it gets reused, not re-decided each time." },
];

const HABITS: Row[] = [
  { icon: P.up, tone: "sprout", strong: "Catch the hand-fix.", text: "When you reach to correct an output, stop and look one level up." },
  { icon: P.list, tone: "storefront", strong: "Write the criteria down.", text: "Turn your taste into an explicit rubric the tool can run on." },
  { icon: P.layers, tone: "layers", strong: "Codify what works.", text: "Save the fix as a step, a prompt, or a skill, so you never redo it." },
];

const TELL = [
  { num: "01", title: "Most symptoms are one-offs", body: "Fix it and move on. If it will not happen again, the system does not need to change, and reaching for it is a way of avoiding the simple thing in front of you." },
  { num: "02", title: "Some symptoms are signals", body: "Every so often a single broken output is telling you something true about the machine underneath. That is the one worth following upstream." },
  { num: "03", title: "The skill is the difference", body: "Follow the signal to the system. Let the one-off go. Learning to feel which is which, in the moment, is most of the craft." },
];

const PROMPTS = [
  {
    name: "Find the system behind it",
    why: "When you catch yourself about to hand-fix an output.",
    p: "I'm about to fix this by hand: [the problem]. Before I do, trace it upstream. What produced this, and what is the smallest change to that system, its prompt, criteria, inputs, or process, that would improve this whole class of output? Show me the upstream fix and the one-off fix side by side.",
  },
  {
    name: "Turn examples into criteria",
    why: "When your taste is real but unwritten.",
    p: "Here are outputs I think are good [paste] and ones I think are bad [paste]. Infer the criteria that separate them, and write it as an explicit rubric I can hand to the tool that makes these, with the reject rules for the bad ones included.",
  },
  {
    name: "Audit the tool, not the output",
    why: "When one tool keeps disappointing you.",
    p: "This keeps producing [problem] across many outputs, not just this one. Do not fix the example. Audit the tool itself, its prompt, defaults, inputs, and method, and tell me where the wrong result comes from and what to change so I stop hand-correcting it.",
  },
  {
    name: "Codify the fix so it sticks",
    why: "After you solve something well, once.",
    p: "We just solved this well: [what worked]. Turn it into something reusable, a documented step, a saved prompt, a checklist, or a skill, so next time it is automatic and I never re-solve it from scratch. Write that artifact.",
  },
  {
    name: "One-off, or signal?",
    why: "When you are not sure it is worth going upstream.",
    p: "Here is the annoyance: [paste]. Argue both sides: the case that this is a one-off I should just fix and forget, and the case that it is a signal that the system underneath is wrong. Then tell me which you believe, and why.",
  },
];

export default function MadronaV2SystemNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Solve the system, not the symptom · Thinking" />
      <M2Nav active="pov" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero m2-pov-hero">
        <p className="m2-kicker m2-who-kicker">A point of view</p>
        <h1>Solve the system, not the symptom.</h1>
        <p className="m2-th-standfirst">When something is wrong, the instinct is to fix the thing in front of you. Recolor the button, redo the one bad output. The higher-leverage move is almost always one level down: fix the system that produced it, so everything it makes next is better. AI made that trade cheap enough to be the default.</p>
        <p className="m2-th-byline"><Link to="/about">Charlie Koch</Link> · Founder, Madrona Product Studio · August 2026</p>
      </section>

      {/* 1 · The moment */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The moment</p>
          <p className="m2-ab4-statement">One bad image, and two ways to respond.</p>
          <div className="m2-ab4-body">
            <p>A tool of mine generated an image that was wrong: the framing off, the mood wrong. My first instinct was to fix that image, to nudge it until it looked the way I wanted.</p>
            <p>I caught myself. The image was not the problem. The tool that made it was. Fixing the image buys one good image; fixing the tool improves every image it will ever make.</p>
          </div>
        </div>
        <Rows items={TRADE} />
      </section>

      {/* 2 · The fix, specifically */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The fix, specifically</p>
          <p className="m2-ab4-statement">What that tool was, and what I changed.</p>
          <div className="m2-ab4-body">
            <p>It was OpenAI's Codex, driving its image model. The early results were the symptom: real screenshots pasted into stock device frames, the same desk every time, the interface stretched to fit.</p>
            <p>So I stopped fixing images and rewrote the instructions the tool runs on. Instead of pasting a screenshot into a pre-built scene, it now generates the whole scene with the real screenshot as the hero, guided by reusable criteria with the reject rules built in. I fixed the brief, not the image, and the whole set got better at once.</p>
          </div>
        </div>
        <div className="m2-sg-prompt m2-sg-prompt--solo m2-sys-artifact">
          <h3>The criteria, encoded once</h3>
          <p className="p">&ldquo;Use the real screenshot as the hero UI; never re-typeset it. Generate the whole scene with the device included. Warm natural light; cream, wood, paper, muted green. One clear focal point, one or two devices, screens readable at card size, correct proportions, no distortion. No glossy stock look, no hard shadows, no identical desk repeated, no forced geometry across the set. Then apply each app's scene direction: story, devices, setting, props, screenshot focus, tone. Reject any image whose screen does not fill the glass at full zoom.&rdquo;</p>
        </div>
      </section>

      {/* 3 · Why now */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why now</p>
          <p className="m2-ab4-statement">This was not a reasonable way to work until recently.</p>
          <div className="m2-ab4-body">
            <p>For most of my career, changing a system was expensive. Reworking the thing that produces the work meant weeks, a team, and a good reason, so patching symptoms was the rational move.</p>
            <p>That math changed. When fixing the machine gets cheap, going upstream stops being a luxury and becomes the obvious first move.</p>
          </div>
        </div>
        <Rows items={NOWTHEN} />
      </section>

      {/* 4 · From tool to engine */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">From tool to engine</p>
          <p className="m2-ab4-statement">The more you do it, the less it is about any single tool.</p>
          <div className="m2-ab4-body">
            <p>Lately I spend most of my building energy not on the outputs at all, but on the engine that produces them, and the whole operation gets better for it.</p>
            <p>I built the place I think from as a system, not a pile of documents I keep by hand. Each of these was a choice to improve the engine instead of the output.</p>
          </div>
        </div>
        <Rows items={INVEST} />
      </section>

      {/* 5 · Getting better at it */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Getting better at it</p>
          <p className="m2-ab4-statement">Point the tool at the tool.</p>
          <div className="m2-ab4-body">
            <p>Working on the system is a habit you can practice, and the same AI that makes your outputs can help you improve the thing that makes them.</p>
            <p>Stop asking for a better result. Start asking what produced the result. Here are prompts I actually use.</p>
          </div>
        </div>
        <Rows items={HABITS} />
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

      {/* 6 · The discipline */}
      <section className="m2-ab4 m2-ab4-sec m2-ab4-sec--full">
        <div className="m2-th4-fullhead">
          <p className="m2-kicker m2-who-kicker">The discipline</p>
          <p className="m2-ab4-railbody m2-th4-fullbody">This is easy to take too far. Not every problem is a system problem. Sometimes the button really should just be blue. I have built tidy systems for work that only needed doing, and called the building progress when the real bottleneck was me not acting. The discipline is not systematizing everything. It is knowing which symptom is a signal.</p>
        </div>
        <ol className="m2-ab4-cols m2-th4-stages">
          {TELL.map((s) => (
            <li key={s.num}>
              <p className="m2-th-stage-num">{s.num}</p>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 7 · Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">How I work now</p>
          <p className="m2-ab4-statement">Spend your attention where it compounds.</p>
        </div>
        <div className="m2-ab4-body m2-th4-point">
          <p>None of this is a trick, and it is not really about AI. It is about where you decide to spend your attention. You can spend it on the artifact and get a better artifact. Or you can spend it on the system and get a better everything.</p>
          <p>I keep choosing the system, not because it is faster, but because it is the only version of the work that compounds. Like everything we publish, this is a working note; as the practice teaches me more, the page will change.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/open">See the machines we've shared: Madrona Open <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/thinking/the-era-of-agentic-operations">Read next: The era of agentic operations <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
