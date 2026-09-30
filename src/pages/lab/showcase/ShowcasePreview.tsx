// TEMP (2026-09-29): showcase motion + New Products layout options.
// /lab/showcase (all, grouped) and /lab/showcase?v=<id> (one alone, full width
// section). Unlinked, noindex. DELETE this folder and its route before ship.
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import LabMeta from "../LabMeta";
import { InsReading } from "./InsReading";
import { InsSort } from "./InsSort";
import { InsPhotos } from "./InsPhotos";
import { FlowTraveler } from "./FlowTraveler";
import { FlowPlot } from "./FlowPlot";
import { FlowCalls } from "./FlowCalls";
import { NpFeature } from "./NpFeature";
import { NpRows } from "./NpRows";
import "../madrona-v2.css";
import "../../v3/v3.css";
import "../../v3/home-refactor.css";
import "./showcase.css";

type Opt = { id: string; label: string; C: () => React.ReactNode; wide?: boolean };
const groups: { title: string; opts: Opt[] }[] = [
  { title: "AI & Operations: bring the before/after to life", opts: [
    { id: "i1", label: "I1 · Reading the notes", C: InsReading },
    { id: "i2", label: "I2 · Sorting sure from unsure", C: InsSort },
    { id: "i3", label: "I3 · Photos find their place", C: InsPhotos },
  ] },
  { title: "Growth & Retention: bring the map to life", opts: [
    { id: "g1", label: "G1 · A customer travels the map", C: FlowTraveler },
    { id: "g2", label: "G2 · The map plots itself", C: FlowPlot },
    { id: "g3", label: "G3 · Your calls light up", C: FlowCalls },
  ] },
  { title: "New Products: one clean layout", opts: [
    { id: "n1", label: "N1 · One lead, two beside", C: NpFeature, wide: true },
    { id: "n2", label: "N2 · Three equal rows", C: NpRows, wide: true },
  ] },
];
const all = groups.flatMap(g => g.opts);

function Stage({ opt }: { opt: Opt }) {
  const [run, setRun] = useState(0);
  return <div className={opt.wide ? "sc-stage is-wide" : "sc-stage"}>
    <p className="sc-name">{opt.label} <button type="button" onClick={() => setRun(r => r + 1)}>Replay</button> <a href={`?v=${opt.id}`}>open alone ↗</a></p>
    <div className={opt.wide ? "" : "sc-col"} key={run}><opt.C /></div>
  </div>;
}

export default function ShowcasePreview() {
  const v = useSearchParams()[0].get("v");
  const solo = all.find(o => o.id === v);
  if (solo) return <div className="m2 v3 sc-solo"><LabMeta title={`${solo.label} · preview`} noindex /><main className="v3-section v3-shell"><Stage opt={solo} /></main></div>;
  return <div className="m2 v3 sc-gallery">
    <LabMeta title="Showcase options (preview)" noindex />
    <main className="v3-shell">
      <header className="sc-head"><p className="v3-kicker">Temporary preview</p><h1>Showcase options.</h1></header>
      {groups.map(g => <section key={g.title} className="sc-group"><h2>{g.title}</h2><div className="sc-list">{g.opts.map(o => <Stage key={o.id} opt={o} />)}</div></section>)}
    </main>
  </div>;
}
