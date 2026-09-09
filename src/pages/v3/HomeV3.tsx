import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { Hero } from "./Hero";
import { HelpSection } from "./HelpSection";
import { PracticeSection } from "./PracticeSection";
import { BerryGoodSection } from "./BerryGoodSection";
import Reveal from "./Reveal";
import "../lab/madrona-v2.css";
import "./v3.css";
import { thinkingEntries } from "../../data/thinking";
import { ctaClick } from "../../lib/analytics";

const engineNote = thinkingEntries.find((entry) => entry.href === "/thinking/under-the-hood");

// Density pass, 2026-09-09 (Charlie): the homepage ran nine sections, ~859
// words and 41 links — roughly double every other page on the site. Cut here:
// the hero's two browser windows (the assessment example read and the services
// panel), the "Skills, stack, and tools" practice window (41 items in one card,
// and the third statement of the four services), and "The work we're drawn to"
// (four placeholder photos, 58 words, no links, two phone screens). Berry Good
// and the product grid merged into one proof section. What remains: say it,
// show the four doors, show how we work, show the proof, ask.
export default function HomeV3() {
  return <div className="m2 v3">
    <LabMeta title="Madrona Product Studio · PNW, USA" />
    <M2Nav />
    <main id="main">
    <Hero />

    <Reveal><HelpSection /></Reveal>
    <Reveal><PracticeSection /></Reveal>
    <Reveal><BerryGoodSection /></Reveal>

    <Reveal as="section" className="v3-section v3-band-light"><div className="v3-shell v3-thinking"><div><p className="v3-kicker">Thinking</p><h2>Notes from building the studio we want to work with.</h2></div><div><Link to="/thinking/the-era-of-agentic-operations"><span>Operations and AI</span><strong>The era of agentic operations</strong><em>Read the note →</em></Link><Link to="/thinking/solve-the-system-not-the-symptom"><span>Product systems</span><strong>Solve the system, not the symptom</strong><em>Read the note →</em></Link><Link to="/thinking/under-the-hood"><span>The studio engine</span><strong>{engineNote?.title ?? "The engine behind everything we ship"}</strong><em>Read the note →</em></Link></div></div></Reveal>
    <Reveal as="section" className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Have something worth building?</h2><p>Tell us where the friction is, or what you think might exist next.</p><Link className="v3-btn v3-btn-light" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-final")}>Get in touch</Link></div></Reveal>
    </main>
    <SiteFooter cta={false} />
  </div>;
}
