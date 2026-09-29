// TEMP (2026-09-29): round-2 options harness. Route /lab/round2 (all options,
// side by side) and /lab/round2?only=<id> (one option alone). Unlinked,
// noindex. Delete this folder and its route once Charlie picks.
import { useSearchParams } from "react-router-dom";
import LabMeta from "../LabMeta";
import M2Nav from "../M2Nav";
import { HeroAIThread } from "./HeroAIThread";
import { HeroWeek } from "./HeroWeek";
import { HeroWork } from "./HeroWork";
import { HeroPlace } from "./HeroPlace";
import { InspectBeforeAfter } from "./InspectBeforeAfter";
import { InspectSteps } from "./InspectSteps";
import { FlowNodes } from "./FlowNodes";
import { FlowLanes } from "./FlowLanes";
import { FlowLoop } from "./FlowLoop";
import "../madrona-v2.css";
import "../../v3/v3.css";
import "../../v3/home-refactor.css";
import "./round2.css";

const heroes = [
  { id: "h1", name: "H1 · AI at work: a conversation", C: HeroAIThread },
  { id: "h2", name: "H2 · AI at work: the week, handled", C: HeroWeek },
  { id: "h3", name: "H3 · The work itself", C: HeroWork },
  { id: "h4", name: "H4 · The place", C: HeroPlace },
];
const inspects = [
  { id: "i1", name: "I1 · Before and after", C: InspectBeforeAfter },
  { id: "i2", name: "I2 · Three steps", C: InspectSteps },
];
const flows = [
  { id: "f1", name: "F1 · Flow map", C: FlowNodes },
  { id: "f2", name: "F2 · Two lanes", C: FlowLanes },
  { id: "f3", name: "F3 · The loop", C: FlowLoop },
];
const titles = [
  ["t1", "Built for ourselves first.", "Ready for you."],
  ["t2", "Here’s what we build.", ""],
  ["t3", "What we can build", "for you."],
  ["t4", "Four ways we help.", ""],
];

export default function Round2Preview() {
  const only = useSearchParams()[0].get("only");
  const all = [...heroes, ...inspects, ...flows];
  const solo = all.find(o => o.id === only);
  if (solo) return <div className="m2 v3 r2-solo" data-option={solo.id}><LabMeta title={`${solo.name} · round 2`} noindex />{solo.id.startsWith("h") && <M2Nav />}<main className={solo.id.startsWith("h") ? "" : "v3-section v3-shell"}><div className={solo.id.startsWith("h") ? "" : "r2-col"}><solo.C /></div></main></div>;
  return <div className="m2 v3 r2">
    <LabMeta title="Homepage round 2 · options (preview)" noindex />
    <main>
      <header className="v3-shell r2-head"><p className="v3-kicker">Round 2 · temporary preview</p><h1>Options to narrow in.</h1></header>
      <section className="r2-group"><div className="v3-shell"><h2 className="r2-label">Hero</h2></div>
        {heroes.map(({ id, name, C }) => <div key={id} id={id} className="r2-hero"><div className="v3-shell"><p className="r2-name">{name} <a href={`?only=${id}`}>open alone ↗</a></p></div><C /></div>)}
      </section>
      <section className="r2-group v3-shell"><h2 className="r2-label">Section title</h2>
        <div className="r2-titles">{titles.map(([id, a, b]) => <div key={id} id={id}><p className="r2-name">{id.toUpperCase()}</p><h3 className="r2-title">{a} {b && <span>{b}</span>}</h3></div>)}</div>
      </section>
      <section className="r2-group v3-shell"><h2 className="r2-label">AI &amp; Operations showcase</h2>
        <div className="r2-grid">{inspects.map(({ id, name, C }) => <div key={id} id={id}><p className="r2-name">{name} <a href={`?only=${id}`}>open alone ↗</a></p><div className="r2-col"><C /></div></div>)}</div>
      </section>
      <section className="r2-group v3-shell"><h2 className="r2-label">Growth &amp; Retention showcase</h2>
        <div className="r2-stack">{flows.map(({ id, name, C }) => <div key={id} id={id}><p className="r2-name">{name} <a href={`?only=${id}`}>open alone ↗</a></p><div className="r2-col"><C /></div></div>)}</div>
      </section>
    </main>
  </div>;
}
