// The per-agent content object behind every /tools/:slug page. The registry
// entry in data/agents.ts carries the gallery-level facts (name, category,
// connectors, cadence, button labels, proof); this carries the page: the
// tagline, the spec card, the pipeline, the scripted console run, and the
// three prose sections. One shape, ten instances, one page component.
import type { ReactNode } from "react";
import type { ConsoleScript } from "../../pages/lab/AgentConsole";
import type { AGENT_ICONS } from "../../pages/lab/agentIcons";

export type AgentIconKey = keyof typeof AGENT_ICONS;

export type AgentDemo = {
  id: string;
  // Document title (LabMeta) and the share title, e.g. "Month-end close agent: a working demo".
  title: string;
  tagline: ReactNode;
  // The at-a-glance card. "Connects to" comes from the registry's connectors.
  spec: { runs: string; approve: string; setup: string };
  pipeline: { name: string; d: string; icon: AgentIconKey; gate?: boolean }[];
  script: ConsoleScript;
  // The caption under the console: what is made up, what is real.
  caption: string;
  how: { title: string; lede: ReactNode };
  honest: { lede: ReactNode; needs: ReactNode; ends: ReactNode };
  deploy: { title: string; body: ReactNode[] };
};
