import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { Hero } from "./Hero";
import { AreasSection } from "./AreasSection";
import { ClosingSection } from "./ClosingSection";
import Reveal from "./Reveal";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

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
// 2026-09-30 (Charlie): the bridge strip under the hero became the hero's
// right column (a vertical route); the week window moved to area 01. Later
// the same day, "How we work" and the final CTA band merged into one close,
// and Why us moved to /about with no teaser left behind.
export default function HomeV3() {
  return <div className="m2 v3">
    <LabMeta title="Madrona Product Studio · PNW, USA" />
    <M2Nav />
    <main id="main">
    <Hero />
    <AreasSection intro={null} />
    <Reveal><ClosingSection /></Reveal>

    </main>
    <SiteFooter cta={false} />
  </div>;
}
