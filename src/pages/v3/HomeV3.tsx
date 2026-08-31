import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed } from "../lab/useCalEmbed";
import { Hero } from "./Hero";
import { HelpSection } from "./HelpSection";
import { PracticeSection } from "./PracticeSection";
import { BerryGoodSection } from "./BerryGoodSection";
import { DrawnToSection } from "./DrawnToSection";
import { PracticeWindowSection } from "./PracticeWindow";
import Reveal from "./Reveal";
import "../lab/madrona-v2.css";
import "./v3.css";
import helmImage from "../../../docs/madrona-v2-build-kit/site-assets/helm-tile.webp";
import lilaImage from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sanJuanImage from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import berryImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";


export default function HomeV3() {
  useCalEmbed();
  return <main className="m2 v3">
    <LabMeta title="Madrona Product Studio · Bellingham, Washington" />
    <M2Nav />
    <Hero />

    <Reveal><HelpSection /></Reveal>
    <Reveal><PracticeSection /></Reveal>
    <Reveal><BerryGoodSection /></Reveal>

    <Reveal><PracticeWindowSection /></Reveal>

    <Reveal as="section" className="v3-section v3-shell v3-proof"><div className="v3-help-head"><p className="v3-kicker">Proof in the work</p><h2>We build products, <span>and we run them.</span></h2><p className="v3-help-lede">Our own apps keep our product judgment close to real users, from live travel products to the demonstration farm.</p></div><div className="v3-proof-grid">{[[helmImage,"Helm","Beta · Our command center","/apps",false],[lilaImage,"Lila Trips","Live · Adventure travel","https://lilatrips.com",true],[sanJuanImage,"San Juan Boating Guide","Live · Salish Sea routes","https://www.sjiboating.com/",true],[berryImage,"Berry Good","Demo · A connected farm operation","/apps",false]].map(([src,name,status,href,external]) => external ? <a className="v3-proof-card" key={name as string} href={href as string} target="_blank" rel="noreferrer"><img src={src as string} alt={`${name} product interface`} /><figcaption><div><strong>{name}</strong><span>{status}</span></div><i aria-hidden="true">↗</i></figcaption></a> : <Link className="v3-proof-card" key={name as string} to={href as string}><img src={src as string} alt={`${name} product interface`} /><figcaption><div><strong>{name}</strong><span>{status}</span></div><i aria-hidden="true">→</i></figcaption></Link>)}</div><Link className="v3-practice-link v3-proof-all" to="/apps">See all products <span aria-hidden="true">→</span></Link></Reveal>

    <Reveal><DrawnToSection /></Reveal>

    <Reveal as="section" className="v3-section v3-shell v3-thinking"><div><p className="v3-kicker">Thinking</p><h2>Notes from building the studio we want to work with.</h2></div><div><Link to="/thinking/the-era-of-agentic-operations"><span>Operations and AI</span><strong>The era of agentic operations</strong><em>Read the note →</em></Link><Link to="/thinking/solve-the-system-not-the-symptom"><span>Product systems</span><strong>Solve the system, not the symptom</strong><em>Read the note →</em></Link><Link to="/thinking/starter-guide-to-building-with-ai"><span>Getting started</span><strong>A starter guide to building with AI</strong><em>Read the note →</em></Link><Link to="/thinking/under-the-hood"><span>The studio engine</span><strong>Under the hood: how we build</strong><em>Read the note →</em></Link></div></Reveal>
    <Reveal as="section" className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Have something worth building?</h2><p>Tell us where the friction is, or what you think might exist next.</p><Link className="v3-btn v3-btn-light" to="/connect">Get in touch</Link></div></Reveal>
    <SiteFooter cta={false} />
  </main>;
}
