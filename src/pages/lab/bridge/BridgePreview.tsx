// TEMP (2026-09-29): bridge-strip motion options (madrona-motion harness).
// /lab/bridge = all four stacked, live; /lab/bridge?v=a|b|c|d = one full page.
// Unlinked, noindex. DELETE this folder and its route before ship.
import { useSearchParams } from "react-router-dom";
import LabMeta from "../LabMeta";
import M2Nav from "../M2Nav";
import { Hero } from "../../v3/Hero";
import { AreasSection } from "../../v3/AreasSection";
import { BridgeTrail } from "./BridgeTrail";
import { BridgeRoll } from "./BridgeRoll";
import { BridgePeek } from "./BridgePeek";
import { BridgeTabs } from "./BridgeTabs";
import "../madrona-v2.css";
import "../../v3/v3.css";
import "../../v3/home-refactor.css";
import "./bridge.css";

export const VARIANTS = {
  a: { label: "A · Trail", Comp: BridgeTrail },
  b: { label: "B · Rolling capabilities", Comp: BridgeRoll },
  c: { label: "C · Peek", Comp: BridgePeek },
  d: { label: "D · Index tabs", Comp: BridgeTabs },
} as const;
type Key = keyof typeof VARIANTS;

export default function BridgePreview() {
  const v = useSearchParams()[0].get("v") as Key | null;
  if (v && v in VARIANTS) {
    const { label, Comp } = VARIANTS[v];
    return <div className={`m2 v3 br-page br-${v}`}><LabMeta title={`${label} · bridge preview`} noindex /><M2Nav />
      <main id="main"><Hero /><Comp /><AreasSection firstClassName="br-after" /></main></div>;
  }
  return <div className="m2 v3 br-gallery">
    <LabMeta title="Bridge strip · motion options (preview)" noindex />
    <main>
      <header className="v3-shell br-gallery-head"><p className="v3-kicker">Temporary preview · madrona-motion</p><h1>Bridge strip, four directions.</h1></header>
      {(Object.keys(VARIANTS) as Key[]).map(k => { const { label, Comp } = VARIANTS[k]; return <section key={k} className={`br-g br-${k}`}>
        <div className="v3-shell"><p className="br-g-label">{label} <a href={`?v=${k}`}>open full page ↗</a></p></div>
        <Hero /><Comp /><div className="br-g-after v3-shell"><p className="v3-kicker">The work</p><h2>Here’s what we build.</h2></div>
      </section>; })}
    </main>
  </div>;
}
