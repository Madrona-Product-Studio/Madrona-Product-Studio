import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { Hero } from "./Hero";
import { LeadsSection } from "./LeadsSection";
import { WorkStorySection } from "./WorkStorySection";
import { DepthSection } from "./DepthSection";
import { PracticeSection } from "./PracticeSection";
import { BerryGoodSection } from "./BerryGoodSection";
import Reveal from "./Reveal";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-clarity.css";
import { ctaClick } from "../../lib/analytics";

// Density pass, 2026-09-09 (Charlie): the homepage ran nine sections, ~859
// words and 41 links — roughly double every other page on the site. Cut here:
// the hero's two browser windows (the assessment example read and the services
// panel), the "Skills, stack, and tools" practice window (41 items in one card,
// and the third statement of the four services), and "The work we're drawn to"
// (four placeholder photos, 58 words, no links, two phone screens). Berry Good
// and the product grid merged into one proof section. What remains: say it,
// show the four doors, show how we work, show the proof, ask.
//
// Positioning clarity pass, 2026-09-29 (Charlie + Opus + Astra review): the
// four doors became two leads (brand and web, AI in the workflow) plus a quiet
// "also" row; real client work (the marine survey tool) leads the proof; the
// depth behind the wedge moved onto the page; Thinking left (it is in the nav).
// Say it, show the two things, show the work, show why us, how, ask.
export default function HomeV3() {
  return <div className="m2 v3">
    <LabMeta title="Madrona Product Studio · PNW, USA" />
    <M2Nav />
    <main id="main">
    <Hero />

    <Reveal><LeadsSection /></Reveal>
    <Reveal><WorkStorySection /></Reveal>
    <Reveal><BerryGoodSection /></Reveal>
    <Reveal><DepthSection /></Reveal>
    <Reveal><PracticeSection /></Reveal>
    <Reveal as="section" className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Tell us what isn't working yet.</h2><p>The brand, the website, or the process that eats the week. It starts with a free 30-minute conversation.</p><Link className="v3-btn v3-btn-light" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-final")}>Get in touch</Link></div></Reveal>
    </main>
    <SiteFooter cta={false} />
  </div>;
}
