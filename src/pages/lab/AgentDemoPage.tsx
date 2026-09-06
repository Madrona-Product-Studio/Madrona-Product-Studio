import { Link, Navigate, useParams } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { ArticleBody, ArticleSection, Prose, Figure, PillarRow, type Pillar } from "./ArticleTemplate";
import { AgentDemoHero, AgentFact, Glyph, type AgentSpec } from "./AgentDemoTemplate";
import { AGENT_ICONS as IC } from "./agentIcons";
import { AgentConsole } from "./AgentConsole";
import { AgentTryIt } from "./AgentTryIt";
import { findAgent } from "../../data/agents";
import { agentDemos } from "../../data/agentDemos";
import { BERRY_URL, HELM_DEMO_URL } from "../../data/proof";
import { ctaClick, outboundClick } from "../../lib/analytics";
import "./madrona-v2.css";
import "./playbook.css";
import "./agent-demo.css";

// One page for every /tools/:slug. The registry (data/agents.ts) supplies the
// gallery-level facts and the demo module (data/agentDemos) supplies the
// content; this component only lays them out. The console, the document
// viewer, the captions, and the human-approval gate are exactly what the ten
// hand-written pages had; they just stopped being ten files.

const PROOF = {
  berry: { href: BERRY_URL, label: "the live Berry Good storefront", lead: "The storefront this agent would sit behind:" },
  helm: { href: HELM_DEMO_URL, label: "the Helm demo", lead: "The kind of command surface it reports into:" },
} as const;

export default function AgentDemoPage() {
  const { slug } = useParams();
  const agent = findAgent(slug);
  const demo = slug ? agentDemos[slug] : undefined;
  useReveal();
  if (!agent || !demo) return <Navigate to="/tools" replace />;

  const source = `tools/${agent.id}`;
  const proof = PROOF[agent.proof];
  const spec: AgentSpec[] = [
    { label: "Connects to", value: agent.connects.join(" · ") },
    { label: "Runs", value: demo.spec.runs },
    { label: "You approve", value: demo.spec.approve },
    { label: "Setup", value: demo.spec.setup },
  ];
  const pipeline: Pillar[] = demo.pipeline.map((step) => ({ name: step.name, d: step.d, icon: <Glyph d={IC[step.icon]} />, gate: step.gate }));

  return (
    <div className="m2 art agentx-page">
      <LabMeta title={`${demo.title} · Madrona Product Studio`} />
      <M2Nav active="tools" />
      <main id="main">
      <div className="art-wrap">
        <AgentDemoHero
          category={agent.category}
          name={agent.name}
          tagline={demo.tagline}
          spec={spec}
          source={source}
          runLabel={agent.runLabel}
          deployLabel={agent.deployLabel}
        />
        <hr className="agx-hero-rule" />

        <div className={`agx-demo${agent.liveDemo ? " agx-demo--paired" : ""}`} id="run">
          <div className="agx-demo-scripted">
            <AgentConsole script={demo.script} />
            <p className="agx-demo-cap">{demo.caption}</p>
            <p className="agx-demo-proof">
              {proof.lead} <a href={proof.href} target="_blank" rel="noopener noreferrer" onClick={outboundClick(proof.href, source)}>{proof.label} <span aria-hidden="true">↗︎</span></a>
            </p>
          </div>
          {agent.liveDemo && (agent.id === "contract-review" || agent.id === "customer-inbox") && <AgentTryIt tool={agent.id} />}
        </div>

        <ArticleBody share={{ title: demo.title, href: agent.href }}>
          <ArticleSection id="how" num="1" eyebrow="How it works" title={demo.how.title}>
            <Prose><p>{demo.how.lede}</p></Prose>
            <Figure><PillarRow items={pipeline} /></Figure>
          </ArticleSection>

          <ArticleSection id="honest" num="2" eyebrow="The honest version" title="What the demo skips, and we don't.">
            <Prose><p>{demo.honest.lede}</p></Prose>
            <div className="art-inv-facts">
              <AgentFact tone="sprout" icon={IC.key} label="What it needs from you">{demo.honest.needs}</AgentFact>
              <AgentFact tone="storefront" icon={IC.flag} label="Where it ends">{demo.honest.ends}</AgentFact>
            </div>
          </ArticleSection>

          <ArticleSection id="deploy" num="3" eyebrow="Start small" title={demo.deploy.title}>
            <Prose>{demo.deploy.body.map((para, index) => <p key={index}>{para}</p>)}</Prose>
            <div className="art-close-links">
              <Link className="m2-text-link" to="/connect" onClick={ctaClick("Get in touch", "/connect", source)}>Get in touch <span aria-hidden="true">→</span></Link>
              <Link className="m2-text-link" to="/tools">See the other tools <span aria-hidden="true">→</span></Link>
            </div>
          </ArticleSection>
        </ArticleBody>
      </div>
      </main>
      <SiteFooter />
    </div>
  );
}
