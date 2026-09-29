import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { Hero } from "./Hero";
import { AreasSection } from "./AreasSection";
import { DepthSection } from "./DepthSection";
import { PracticeSection } from "./PracticeSection";
import Reveal from "./Reveal";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";
import { ctaClick } from "../../lib/analytics";

// Density pass, 2026-09-09 (Charlie): the homepage ran nine sections, ~859
// words and 41 links — roughly double every other page on the site. Cut here:
// the hero's two browser windows (the assessment example read and the services
// panel), the "Skills, stack, and tools" practice window (41 items in one card,
// and the third statement of the four services), and "The work we're drawn to"
// (four placeholder photos, 58 words, no links, two phone screens). Berry Good
// and the product grid merged into one proof section. What remains: say it,
// show the four doors, show how we work, show the proof, ask.
// Refactor, 2026-09-29 (Charlie): the four areas now carry the proof (each
// spread pairs the area with things we've built), so the page reads: say it,
// show what we've built in each area, why us, how we work, ask. The Thinking
// section left the homepage.
export default function HomeV3() {
  return <div className="m2 v3">
    <LabMeta title="Madrona Product Studio · PNW, USA" />
    <M2Nav />
    <main id="main">
    <Hero />

    <AreasSection />
    <Reveal><DepthSection /></Reveal>
    <Reveal><PracticeSection /></Reveal>

    <Reveal as="section" className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Seen something your organization could use?</h2><p>Tell us where the friction is, or what you’d like to exist next. The first conversation is free, and it takes 30 minutes.</p><Link className="v3-btn v3-btn-light" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-final")}>Get in touch</Link></div></Reveal>
    </main>
    <SiteFooter cta={false} />
  </div>;
}
