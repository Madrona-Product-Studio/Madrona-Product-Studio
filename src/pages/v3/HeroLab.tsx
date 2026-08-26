import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import { useCalEmbed } from "../lab/useCalEmbed";
import { HeroA, HeroB, HeroC } from "./HeroVariants";
import "../lab/madrona-v2.css";
import "./v3.css";

export default function HeroLab() {
  useCalEmbed();
  return <main className="m2 v3 v3-hero-lab">
    <LabMeta title="V3 hero lab · Madrona preview" noindex />
    <M2Nav />
    <header className="v3-lab-intro v3-shell"><p className="v3-kicker">Round two · Hero lab</p><h1>Three directions for a denser first viewport.</h1><p>Each direction keeps the Madrona voice and makes diagnosis, proof, and stack visible before the first scroll.</p></header>
    <section className="v3-lab-option"><div className="v3-lab-label v3-shell"><span>A</span><div><strong>Layered cluster</strong><p>Closest to the CXO reference</p></div></div><HeroA /></section>
    <section className="v3-lab-option"><div className="v3-lab-label v3-shell"><span>B</span><div><strong>Full-bleed environment</strong><p>Place first, proof floating within it</p></div></div><HeroB /></section>
    <section className="v3-lab-option"><div className="v3-lab-label v3-shell"><span>C</span><div><strong>Working surface</strong><p>The work itself becomes the signature art</p></div></div><HeroC /></section>
  </main>;
}
