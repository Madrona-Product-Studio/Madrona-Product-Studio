import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { studioProfile } from "../../data/studioProfile";
import "./madrona-v2.css";

const LOGOS: Record<string, string> = {
  REI: "/images/logos/rei-logo.svg",
  Healthline: "/images/logos/healthline-logo.svg",
  Microsoft: "/images/logos/microsoft-logo.svg",
};

// About V3 — founder-led point of view (implementation brief 2026-08-01).
// The page reads as a short essay: building changed the belief -> the thesis ->
// Madrona as a working theory -> the work as evidence -> trusted people ->
// work worth doing. It introduces the thesis; the full thesis lives at /thesis.

const DISCIPLINES = [
  "Designers",
  "Engineers",
  "Researchers",
  "Marketers",
  "Strategists",
  "Data scientists",
  "Writers",
  "Product leaders",
];

const IDEAS = [
  {
    title: "Clarity matters more",
    body: "As execution gets cheaper, choosing the right problems and creating focus become the scarce skills.",
  },
  {
    title: "Product leadership is evolving",
    body: "From managing the work to creating the conditions for great work.",
  },
  {
    title: "Everyone builds differently",
    body: "Each discipline carries the product forward from its own vector of strength.",
  },
];

const LoopArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12h15m-5-6 6 6-6 6" />
  </svg>
);

export default function MadronaV2About() {
  useReveal();
  const { intro, experience, community } = studioProfile;

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="About · Madrona Product Studio" />
      <M2Nav active="about" />

      {/* 1 · Founder opening */}
      <section className="m2-ab3 m2-ab3-hero">
        <div>
          <p className="m2-kicker m2-who-kicker">About Madrona</p>
          <h1>Building changed what I believe product leadership is for.</h1>
          <div className="m2-ab3-body">
            <p>For most of my career I led product teams at companies with real scale. I loved the work. But somewhere along the way, leading products came to mean managing software instead of making it.</p>
            <p>Then the tools changed. AI collapsed the distance between an important problem and working software, and I started building again. Not because I became an engineer, but because a small group of experienced people can now carry an idea all the way to something real.</p>
            <p>That changed what I believe product leadership is for: creating the conditions for a small, multidisciplinary team to solve problems that matter.</p>
          </div>
        </div>
        <figure className="m2-ab3-portrait">
          <img src={intro.portraitSrc} alt={intro.portraitAlt} />
          <figcaption>Charlie Koch · Founder</figcaption>
        </figure>
      </section>

      {/* 2 · The Product Builder Thesis (preview) */}
      <section className="m2-ab3 m2-ab3-thesis">
        <p className="m2-kicker m2-who-kicker">The Product Builder Thesis</p>
        <blockquote className="m2-ab3-quote">
          <p>AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. The future is not fewer disciplines. It is more integrated ones.</p>
        </blockquote>
        <ul className="m2-ab3-ideas">
          {IDEAS.map((idea) => (
            <li key={idea.title}>
              <h3>{idea.title}</h3>
              <span className="m2-ab3-underline" aria-hidden="true" />
              <p>{idea.body}</p>
            </li>
          ))}
        </ul>
        <a className="m2-text-link" href="/thesis">Read the full Product Builder Thesis <span aria-hidden="true">→</span></a>
      </section>

      {/* 3 · Madrona is a working theory */}
      <section className="m2-ab3 m2-ab3-theory">
        <h2>Madrona is a working theory.</h2>
        <p className="m2-ab3-question">Can small, senior, AI-enabled teams build products differently, and better?</p>
        <p className="m2-ab3-theory-body">That is the question underneath everything we do. Every product we ship and every client engagement adds evidence.</p>
        <div className="m2-ab3-loop" role="img" aria-label="The learning loop: build, learn, refine, share, and repeat">
          <span>Build</span><LoopArrow /><span>Learn</span><LoopArrow /><span>Refine</span><LoopArrow /><span>Share</span>
          <svg className="m2-ab3-loop-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5a7 7 0 1 1-6.3 4" /><path d="M5 4.5v4.7h4.7" />
          </svg>
        </div>
      </section>

      {/* 4 · The work is the evidence */}
      <section className="m2-ab3 m2-ab3-evidence">
        <h2>The work is the evidence.</h2>
        <div className="m2-ab3-evidence-grid">
          <div>
            <h3>Our own products</h3>
            <p>We build and operate our own products because they keep us close to customers, ideas, and reality. They are experiments with real stakes, and they teach us more than any document could.</p>
            <a className="m2-text-link" href="/apps">See what we're building <span aria-hidden="true">→</span></a>
          </div>
          <div>
            <h3>Client work</h3>
            <p>Every organization we work with teaches us something different about how software creates value. The practice sharpens the philosophy, and the philosophy sharpens the practice.</p>
            <a className="m2-text-link" href="/consulting">See how we help <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      {/* 5 · Built with people I trust */}
      <section className="m2-ab3 m2-ab3-people">
        <div className="m2-ab3-people-copy">
          <h2>Built with people I trust.</h2>
          <p>Over the last fifteen years, I have worked alongside exceptional designers, engineers, researchers, marketers, strategists, data scientists, and writers. Many of those relationships have lasted for years. Madrona is a way to keep building together.</p>
          <p>Every project is different, so instead of maintaining a large organization, we assemble a small senior team around each meaningful problem. It is a deliberate operating model, not a staffing model.</p>
          <div className="m2-ab3-exp">
            <ul className="m2-ab3-logos">
              {experience.companies.map((c) => (
                <li key={c}><img src={LOGOS[c]} alt={c} /></li>
              ))}
            </ul>
            <p><strong>{experience.years}</strong> building consumer products at scale</p>
          </div>
        </div>
        <ul className="m2-ab3-chips" aria-label="Disciplines in the trusted network">
          {DISCIPLINES.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      {/* 6 · Work worth doing */}
      <section className="m2-ab3 m2-ab3-worth">
        <div className="m2-ab3-worth-copy">
          <h2>Work worth doing.</h2>
          <p>AI creates extraordinary leverage, and that makes where we choose to apply it more important than ever. We want to spend ours helping people stay healthier, helping local businesses thrive, helping communities grow stronger, and helping people give more of their time to work that matters.</p>
          <p className="m2-ab3-invite">If you're working on something that matters, we'd love to hear about it. <a href="/connect">Start a conversation <span aria-hidden="true">→</span></a></p>
        </div>
        <div className="m2-ab-panel-media m2-ab-panel-media--pair m2-ab3-worth-media">
          <img src={community.images[0]} alt="Fresh local produce at a Whatcom County market" loading="lazy" />
          <img src={community.images[1]} alt="Conserved Pacific Northwest land above the water" loading="lazy" />
        </div>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
