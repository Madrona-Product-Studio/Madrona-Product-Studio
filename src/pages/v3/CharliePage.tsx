import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import Reveal from "./Reveal";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import portrait from "../../../docs/madrona-v2-build-kit/site-assets/about-charlie.webp";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./charlie.css";

/* /charlie — Charlie's public positioning page: the same career, read four
   ways, each door addressed to a different reader. Public and sendable; kept
   out of the main nav. Content derives from charlie-hq/job-search/pitch-kit.md
   (the internal rehearsal surface stays at /pitch-kit). */

const DOORS = [
  {
    id: "product",
    reader: "If you're hiring a product leader",
    heading: "Judgment, proven by shipping.",
    body: [
      "Leading consumer product at Microsoft, REI, and Healthline taught me judgment: what to build, what to kill, what good looks like. The last year gave me something most product leaders don't have. I ship.",
      "AI collapsed the distance between strategy and execution, and I rebuilt my toolkit around that. At my studio I take products from idea to live software in weeks. Lila Trips is live with real users and a working paywall. Helm, my flagship, is in beta.",
      "What I bring is the combination: scale experience from 90 million monthly users and a 22-million-member program, plus the daily practice of building with AI.",
    ],
    cta: { label: "Let's talk", to: "/connect" },
  },
  {
    id: "business",
    reader: "If you run a business",
    heading: "Your digital offering should be as good as your product.",
    body: [
      "I run a studio called Madrona where I use the newest digital tools, mostly AI, to help businesses solve their oldest problems.",
      "The work I love most is with people whose product is better than their digital experience: great companies where the website, the systems, or the day-to-day operations haven't caught up to the quality of the thing they actually sell. I help close that gap.",
    ],
    cta: { label: "See how the studio works", to: "/services" },
  },
  {
    id: "domains",
    reader: "If you build in travel, the outdoors, or wellness",
    heading: "I build for the parts of life people care most about.",
    body: [
      "Their health, the outdoors, how they travel. That's not positioning: I'm a hiker, skier, and boater in the Pacific Northwest, and I've built for those lives through every platform shift. Mobile at Microsoft, then eight years at REI through mobile, marketplaces, and a 22-million-member loyalty relaunch, then Healthline, where I shipped AI patient guidance at 90-million-visitor scale.",
      "Now I run a studio in the same three lanes, and I ship AI-native products weekly. Every shift, same domains. AI is the biggest shift yet, which is why I'm all in on it.",
    ],
    cta: { label: "See the products", to: "/apps" },
  },
  {
    id: "mission",
    reader: "If your work changes lives",
    heading: "Small teams change the world.",
    body: [
      "Mission-driven work that actually changes people's lives is the work I care most about. The hard, important problems are almost always understaffed, and the teams on them rarely get the senior product help they deserve.",
      "I believe a small team doing important work can absolutely change the world, and AI just made that more true. Leverage that used to take a floor of engineers now fits in a small room. If you're in social good, advocacy, public health, or anywhere the outcome is measured in lives made better, I want to hear from you.",
    ],
    cta: { label: "Tell me what you're working on", to: "/connect" },
  },
];

/* The hero hub — the page premise drawn: the circular portrait fans out
   through madrona elbow lines into the four door rows (picked from the
   2026-08-31 placement contact sheet; losing variants removed). */
function CharlieHero() {
  return <header className="v3-section v3-shell ck-hero">
    <p className="v3-kicker">Charlie Koch · Madrona Product Studio · Bellingham, WA</p>
    <h1>Builder of modern <span>digital tools.</span></h1>
    <p className="v3-lede ck-lede">
      Newest tools, oldest problems. Four ways to read the same career,
      depending on why you're here. Pick your door.
    </p>
    <div className="ck-hub">
      <svg className="ck-hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[[44, 12.5], [48.5, 37.5], [51.5, 62.5], [56, 87.5]].map(([sy, ey]) => (
          <path key={ey} d={`M21 ${sy} C 25.5 ${sy} 25.5 ${ey} 28.5 ${ey}`} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <figure className="ck-hub-portrait">
        <img src={portrait} alt="Charlie Koch outdoors at golden hour" />
      </figure>
      <nav className="ck-jump">
        {DOORS.map((d, i) => (
          <a key={d.id} href={`#${d.id}`}>
            <span>0{i + 1}</span> {d.reader}
          </a>
        ))}
      </nav>
    </div>
  </header>;
}

export default function CharliePage() {
  useCalEmbed();
  return <main className="m2 v3 ck">
    <LabMeta title="Charlie Koch · Madrona Product Studio" />
    <M2Nav />

    <CharlieHero />

    {DOORS.map((d, i) => (
      <Reveal as="section" className="v3-section v3-shell ck-door" id={d.id} key={d.id}>
        <div className="ck-door-rail">
          <p className="v3-kicker">0{i + 1} · {d.reader}</p>
          <h2>{d.heading}</h2>
        </div>
        <div className="ck-door-body">
          {d.body.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <Link className="ck-door-cta" to={d.cta.to}>{d.cta.label} →</Link>
        </div>
      </Reveal>
    ))}

    <Reveal as="section" className="v3-section v3-shell ck-throughline">
      <p className="v3-kicker">The through-line</p>
      <div className="v3-experience ck-experience">
        <span>Experience includes</span>
        <img src="/images/logos/microsoft-logo.svg" alt="Microsoft" />
        <img src="/images/logos/rei-logo.svg" alt="REI" />
        <img src="/images/logos/healthline-logo.svg" alt="Healthline" />
      </div>
      <p className="ck-throughline-note">
        Every platform shift, same domains: health, the outdoors, travel. How
        people live well.
      </p>
    </Reveal>

    <section className="v3-final-cta">
      <Reveal className="v3-shell">
        <p className="v3-kicker">The short version</p>
        <h2>Operated at scale. Still sits down and builds.</h2>
        <p>
          If that combination would compound on your team or in your business,
          I'd genuinely like to talk.
        </p>
        <a className="v3-btn v3-btn-light" href={bookHref()} {...bookProps()} onClick={bookClick}>
          Book a 30m chat
        </a>
      </Reveal>
    </section>

    <SiteFooter cta={false} />
  </main>;
}
