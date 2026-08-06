import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Studio Notes entry 001 (Artifact): the build engine in three diagrams.
// The diagrams are the approved app-engine directions from
// madrona-studio/design/diagrams/app-engine (2026-08-05), restated in JSX.
// /thesis stays the belief layer; this artifact is method and evidence.

const STAGES = [
  { num: "1", name: "Bootstrap", d: <>A new app composes the platform: <b>design system, integrations, standards pre-wired.</b></> },
  { num: "2", name: "Build", d: <>Product work on proven parts: <b>auth, data, AI, payments, email</b> come from the shelf, not from scratch.</> },
  { num: "3", name: "Review", gate: true, d: <>Nothing ships unseen: <b>visual QA at two widths, motion review, security sweep.</b></> },
  { num: "4", name: "Present", gate: true, d: <>The pre-share bar: <b>polish pass and the investor-ready audit</b>, phase by phase.</> },
  { num: "5", name: "Grow", d: <>Positioning, measurement, SEO, launch: <b>a repeatable go-to-market sweep</b>, read weekly.</> },
];

const LAYERS = [
  { n: "Design systems", i: "brand, tokens, motion vocabulary, image direction" },
  { n: "Capabilities", i: "11 integration playbooks proven in shipped apps" },
  { n: "Packages", i: "hardened server code: rate limiting, AI, auth, payments" },
  { n: "Standards", i: "SEO, security, accessibility, testing, performance" },
  { n: "Skills", i: "encoded playbooks an agent can run: polish, motion, GTM, audits" },
];

const STRATA = [
  { n: "Design systems", path: "design/", d: "Brand, tokens, motion vocabulary, and image direction, so everything we make looks and moves like it was made by the same hands.", p: "restraint is the point" },
  { n: "Capabilities", path: "capabilities/", d: "Eleven integration playbooks, each documented from a shipped app: auth, database, AI, email, maps, payments, analytics, observability.", p: "proven in production, not in theory" },
  { n: "Packages", path: "packages/", d: "Hardened server code harvested from real products: rate limiting that fails safe, streaming AI with caching, auth that fails closed.", p: "tested, versioned, vendored into every app" },
  { n: "Standards", path: "standards/", d: "How we build, written down: SEO, security, accessibility, testing, performance, CI. New apps inherit them instead of rediscovering them.", p: "the craft bar, enforced" },
  { n: "Learned checks", path: "the compounding layer", d: "Twenty-plus dated findings banked from real launches, folded back into the playbooks. The engine gets smarter with every product.", p: "what AI alone can never fake" },
];

const APPS = [
  { an: "Lila Trips", as: "AI travel planning · live" },
  { an: "San Juan Boating", as: "local guide · live" },
  { an: "Garden HQ", as: "garden planner" },
  { an: "Helm", as: "operations surface" },
];

export default function MadronaV2EngineNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The Madrona engine, in three diagrams · Studio Notes" />
      <M2Nav active="notes" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker"><Link className="m2-pb-crumb" to="/notes">Studio Notes</Link> · Artifact · Aug 2026</p>
        <h1>The Madrona engine, in <span className="m2-pop">three diagrams.</span></h1>
        <p className="m2-th-standfirst">Fifteen years of product judgment, encoded into a platform every project inherits. AI is the power tool; the engine is the judgment it executes. Every launch teaches it something new.</p>
      </section>

      {/* 1 · The engine */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The engine</p>
          <p className="m2-ab4-statement">Every product rides on the same engine.</p>
        </div>
        <div className="m2-ab4-body">
          <p>A new product starts dialed-in on day one, passes the same gates as every app before it, and what it teaches us hardens the engine for the next one.</p>
          <p>This is why a small studio ships in weeks what used to take quarters, without lowering the bar.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-pb-pipe">
              {STAGES.map((s) => (
                <div key={s.name} className={`m2-pb-stage${s.gate ? " gate" : ""}`}>
                  {s.gate && <span className="m2-pb-gate-tag">Gates</span>}
                  <div className="num">{s.num}</div>
                  <div className="name">{s.name}</div>
                  <div className="d">{s.d}</div>
                </div>
              ))}
            </div>
            <div className="m2-pb-drawline"><span>↑</span><span>↑</span><span>↑</span><span>↑</span><span>↑</span></div>
            <div className="m2-pb-substrate">
              <div className="stitle">
                <span className="t">The platform, underneath everything</span>
                <span className="m">madrona-studio · one repository</span>
              </div>
              <div className="m2-pb-slayers">
                {LAYERS.map((l) => (
                  <div key={l.n} className="m2-pb-slayer"><div className="n">{l.n}</div><div className="i">{l.i}</div></div>
                ))}
              </div>
            </div>
            <div className="m2-pb-learnline"><span>The learning loop: every launch banks what it taught us, and the engine gets harder to beat</span></div>
          </div>
        </div>
      </section>

      {/* 2 · The foundation */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The foundation</p>
          <p className="m2-ab4-statement">What our products stand on.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Every product we ship sits on the same five layers. That is why a new one starts at the studio's craft bar instead of from zero, and why each launch makes the ground more solid.</p>
          <p>When we build for a client, their product stands on the same ground. The engine is part of what we leave behind.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board">
            <div className="m2-pb-apps">
              {APPS.map((a) => (
                <div key={a.an} className="m2-pb-app"><div className="an">{a.an}</div><div className="as">{a.as}</div></div>
              ))}
              <div className="m2-pb-app next"><div className="an">Your product</div><div className="as">starts here, day one</div></div>
            </div>
            <div className="m2-pb-strata">
              {STRATA.map((s) => (
                <div key={s.n} className="m2-pb-stratum">
                  <div className="sn">{s.n}<small>{s.path}</small></div>
                  <div className="sd">{s.d}</div>
                  <div className="sp">{s.p}</div>
                </div>
              ))}
            </div>
            <div className="m2-pb-gates">
              <div className="g"><div className="t">Visual QA gate</div><div className="m">Every interface change is screenshotted and inspected at phone and desktop widths before it ships.</div></div>
              <div className="g"><div className="t">Motion review</div><div className="m">Animation is a design decision: distinct options built, compared live, and held to a ten-point bar.</div></div>
              <div className="g"><div className="t">Investor-ready audit</div><div className="m">Before anyone outside sees an app: clarity, wow path, security sweep, credibility pass, honest narrative.</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · The schematic */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">For the technically curious</p>
          <p className="m2-ab4-statement">The same engine, as a schematic.</p>
        </div>
        <div className="m2-ab4-body">
          <p>One platform repository composes every new product. Gates hold the bar. Launches feed the learning bank. The loop compounds.</p>
        </div>
        <div className="m2-pb-figure">
          <div className="m2-pb-board m2-pb-bp">
            <div className="m2-pb-bpgrid">
              <div className="m2-pb-plate" style={{ gridColumn: 1, gridRow: 1 }}>
                <span className="pnum">02 BOOTSTRAP</span>
                <h4>New app, day one</h4>
                <ul><li>pick a design system</li><li>wire needed capabilities</li><li>inherit all standards</li></ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 2, gridRow: 1 }}><span>composes</span><i>←</i></div>
              <div className="m2-pb-plate core" style={{ gridColumn: 3, gridRow: "1 / span 3", alignSelf: "center" }}>
                <span className="pnum">01 THE PLATFORM</span>
                <h4>madrona-studio · one repo</h4>
                <ul>
                  <li>design/&nbsp;&nbsp;// systems, brand, motion, imagery</li>
                  <li>capabilities/&nbsp;&nbsp;// 11 integration playbooks</li>
                  <li>packages/&nbsp;&nbsp;// hardened server code</li>
                  <li>standards/&nbsp;&nbsp;// seo · security · a11y · testing</li>
                  <li>skills/&nbsp;&nbsp;// executable playbooks + gates</li>
                </ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 4, gridRow: 1 }}><span>enforces</span><i>→</i></div>
              <div className="m2-pb-plate" style={{ gridColumn: 5, gridRow: 1 }}>
                <span className="pnum">03 GATES</span>
                <h4>The craft bar</h4>
                <ul><li>visual QA, two widths</li><li>motion review, 10 standards</li><li>security + investor-ready</li></ul>
              </div>
              <div className="m2-pb-plate dark" style={{ gridColumn: 1, gridRow: 3 }}>
                <span className="pnum">05 LEARNING BANK</span>
                <h4>Compounding</h4>
                <ul><li>22+ dated production findings</li><li>GTM plays, banked per launch</li><li>folded back into 01</li></ul>
              </div>
              <div className="m2-pb-wire" style={{ gridColumn: 2, gridRow: 3 }}><span>hardens</span><i>←</i></div>
              <div className="m2-pb-wire" style={{ gridColumn: 4, gridRow: 3 }}><span>ships</span><i>→</i></div>
              <div className="m2-pb-plate" style={{ gridColumn: 5, gridRow: 3 }}>
                <span className="pnum">04 THE FLEET</span>
                <h4>Shipped proof</h4>
                <ul><li>Lila Trips · San Juan</li><li>Garden HQ · Helm · Aria</li><li>every launch feeds 05</li></ul>
              </div>
            </div>
            <div className="m2-pb-bpreturn"><i>↩</i><span>04 → 05 → 01: what shipping teaches us becomes part of the platform</span></div>
            <div className="m2-pb-bpnote"><span>fig. 2 — the madrona engine: encoded judgment, executed with AI, held to gates</span><span>rev 2026-08</span></div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Where this points</p>
          <p className="m2-ab4-statement">The engine is part of what we leave behind.</p>
        </div>
        <div className="m2-ab4-body">
          <p>We build it, set it up, and teach you to run it. A client engagement ends with your product standing on this engine and your team holding the keys. The deliverable is a business that does not need us.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/notes">More Studio Notes <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
