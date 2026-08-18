import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import PovThumb from "./PovThumb";
import { TypeCircle } from "./TypeMark";
import {
  ArticleHeader,
  ArticleBody,
  ArticleSection,
  Prose,
  Figure,
  CodeBlock,
  SpecTable,
  MarginCallout,
  PartsList,
  type TocItem,
} from "./ArticleTemplate";
import "./madrona-v2.css";
import "./playbook.css";

/* Engine article on the new /thinking reading template (Claude candidate).
   Section 1 (engine board) and Section 3 (blueprint) use the live page's
   proven m2-pb diagrams, per Charlie's pick 2026-08-15. Everything else is
   the new template: contents nav in the title, code blocks, table + callout,
   parts list. */

const TOC: TocItem[] = [
  { id: "engine", label: "The engine" },
  { id: "foundation", label: "The foundation" },
  { id: "schematic", label: "The schematic" },
  { id: "parts", label: "The parts" },
  { id: "leave-behind", label: "What we leave behind" },
];

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
  { name: "Design systems", path: "design/", what: "Brand, tokens, motion vocabulary, and image direction.", why: "Everything looks and moves like the same hands made it." },
  { name: "Capabilities", path: "capabilities/", what: "Eleven integration playbooks, each documented from a shipped app.", why: "Proven in production, not in theory." },
  { name: "Packages", path: "packages/", what: "Hardened server code: rate limiting, streaming AI, auth that fails closed.", why: "Tested, versioned, vendored into every app." },
  { name: "Standards", path: "standards/", what: "How we build, written down: SEO, security, a11y, testing, performance.", why: "New apps inherit the craft bar instead of rediscovering it." },
  { name: "Learned checks", path: "the compounding layer", what: "Twenty-plus dated findings banked from real launches.", why: "The part AI alone can never fake." },
];

const PARTS = [
  { n: "The bootstrap", path: "start dialed-in", d: "A template every new app copies on day one: strict TypeScript, tests, CI, accessibility, security headers, SEO, and a performance budget, verified green before the first feature exists.", p: "standards inherited, not rediscovered" },
  { n: "One monitoring setup", path: "the smoke detector", d: "Sentry on client and server, a tiny health endpoint in every app, an external uptime check, one alert destination. The app that takes money gets covered first.", p: "first field note, landing soon" },
  { n: "One design intelligence layer", path: "taste, installed", d: "Curated design skills (motion, premium visual direction, a design-audit orchestrator) installed as agent plugins, so every project starts with the same design judgment.", p: "installed once, every product benefits" },
  { n: "The image system", path: "art director + engine", d: "Marketing imagery as a machine: layout and type built in code, atmosphere generated, quality gates in between. The system produces the images; we direct it.", p: "already written up, read it below" },
];

/* ---- The engine board (live diagram: pipeline + substrate + learn loop) -- */
function EngineBoard() {
  return (
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
  );
}

/* ---- The blueprint (live diagram: plate-and-wire schematic) ------------- */
function Blueprint() {
  return (
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
      <div className="m2-pb-bpnote"><span>fig. 1 · the madrona engine: encoded judgment, executed with AI, held to gates</span><span>rev 2026-08</span></div>
    </div>
  );
}

export default function MadronaV2EngineNote() {
  useReveal();

  return (
    <main className="m2 art">
      <LabMeta title="The engine behind everything we ship · Thinking" />
      <M2Nav active="pov" />

      <div className="art-wrap">
        <ArticleHeader
          kicker="Inside the practice"
          typeMark={<TypeCircle type="Artifact" />}
          author="Charlie Koch"
          meta={["10 min read", "August 2026"]}
          title={<>The engine behind everything we&nbsp;ship.</>}
          standfirst="Fifteen years of product judgment, encoded into a platform every project inherits. AI is the power tool; the engine is the judgment it executes."
          toc={TOC}
          visual={
            <div className="art-head-plate">
              <div className="m2-pov-plate">
                <PovThumb motif="modules" />
              </div>
            </div>
          }
        />

        <ArticleBody share={{ title: "The engine behind everything we ship", href: "/thinking/under-the-hood" }}>
          {/* 1 */}
          <ArticleSection id="engine" num="1" title="Every product rides on the same engine.">
            <Prose>
              <p>A new product starts dialed-in on day one, passes the same gates as every app before it, and what it teaches us hardens the engine for the next one.</p>
              <p>This is why a small studio ships in weeks what used to take quarters, <strong>without lowering the bar.</strong></p>
            </Prose>

            <Figure>
              <CodeBlock
                file="madrona-studio · one repository"
                lines={[
                  { t: "$ mps new product --compose", cls: "tok-key" },
                  { t: "  → design system, tokens, motion" },
                  { t: "  → capabilities: auth, data, ai, payments" },
                  { t: "  → standards inherited, gates armed" },
                  { t: "  ✓ ready to build", cls: "tok-mut" },
                ]}
              />
            </Figure>

            <Figure>
              <EngineBoard />
            </Figure>
          </ArticleSection>

          {/* 2 */}
          <ArticleSection id="foundation" num="2" title="What our products stand on.">
            <Prose>
              <p>Every product we ship sits on the same five layers. That is why a new one starts at the studio's craft bar instead of from zero, and why each launch makes the ground more solid.</p>
              <p>When we build for a client, their product stands on the same ground. The engine is part of what we leave behind.</p>
            </Prose>

            <Figure>
              <div className="art-table-split has-aside">
                <SpecTable
                  head={["Layer", "What it is", "Why it matters"]}
                  rows={STRATA}
                />
                <MarginCallout
                  eyebrow="from the learning bank"
                  title="A demo that can write to real data is a P0."
                >
                  <p>Nobody outside should ever be one tap from your production records.</p>
                  <CodeBlock
                    dark
                    numbers={false}
                    lines={[
                      { t: "POST /api/demo/login", cls: "tok-key" },
                      { t: "{ plan: \"demo\" }" },
                      { t: "→ demo_user, sandboxed", cls: "tok-mut" },
                    ]}
                  />
                  <p>One of twenty-plus dated findings, each banked after a real launch and folded back into the checklist every new product inherits. This one cost us a late night; now it is a gate nothing gets past.</p>
                </MarginCallout>
              </div>
            </Figure>
          </ArticleSection>

          {/* 3 */}
          <ArticleSection id="schematic" num="3" title="The same engine, as a schematic.">
            <Prose>
              <p>One platform repository composes every new product. Gates hold the bar. Launches feed the learning bank, and the loop compounds.</p>
            </Prose>

            <Figure>
              <Blueprint />
            </Figure>
          </ArticleSection>

          {/* 4 */}
          <ArticleSection id="parts" num="4" title="The parts, if you want to set this up yourself.">
            <Prose>
              <p>The engine sounds abstract until you name the parts. These four do most of the work, and none of them needs a team: a day of setup each, then they pay you back on every product after.</p>
              <p>We are writing each one up as its own field note, with the real setup, the real prices, and the mistakes included. This page collects them as they land.</p>
            </Prose>

            <Figure>
              <PartsList items={PARTS} />
            </Figure>

            <Prose>
              <p>
                <Link to="/thinking/solve-the-system-not-the-symptom">Read: Solve the system, not the symptom →</Link>
              </p>
            </Prose>
          </ArticleSection>

          {/* 5 */}
          <ArticleSection id="leave-behind" num="5" title="The engine is part of what we leave behind.">
            <Prose>
              <p>We build it, set it up, and teach you to run it. A client engagement ends with your product standing on this engine and your team holding the keys. The deliverable is a business that does not need us.</p>
              <p>Parts of the engine are already public, tools we build and use every day, <a href="https://github.com/Madrona-Product-Studio/madrona-open" target="_blank" rel="noopener noreferrer">free to take</a>.</p>
            </Prose>

            <div className="art-close-links">
              <a className="m2-text-link" href="https://github.com/Madrona-Product-Studio/madrona-open" target="_blank" rel="noopener noreferrer">The open part of the engine, on GitHub <span aria-hidden="true">→</span></a>
              <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>

      <SiteFooter cta={false} />
    </main>
  );
}
