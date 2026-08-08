import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: The checklist our launches taught us (Learning). Mined
// from the studio's banked learned checks (investor-ready audits across
// six shipped apps), curated and generalized for public use. Every item
// was learned on a real launch, not copied from a listicle.

const GROUPS: { kicker: string; statement: string; body: string; items: { lead: string; body: string }[] }[] = [
  {
    kicker: "Before anyone sees it",
    statement: "First impressions are a checklist, not a vibe.",
    body: "Most of what makes an app feel unfinished to an outsider is invisible to the person who built it. These are the checks that catch it.",
    items: [
      { lead: "Say what it is on screen one.", body: "Builders drift into assuming context. A stranger should know what this is and who it is for within five seconds, without tapping anything." },
      { lead: "Never ship an empty first screen.", body: "An empty state kills a demo faster than a bug. Seed real-looking content, and make the empty state earn its keep with a next step." },
      { lead: "The README is a landing page too.", body: "Anyone you want to impress will eventually see the repository. Its front page deserves the same care as the site's." },
      { lead: "Every link must advertise a ready destination.", body: "A nav item that leads to a stub is a small lie. Hide what is not built; an honest absence beats a broken promise." },
      { lead: "If a form is not wired, do not render it.", body: "A waitlist box that silently drops emails is worse than none. Render nothing when unconfigured; never ship UI that lies about what happens next." },
    ],
  },
  {
    kicker: "The web is hostile",
    statement: "Production breaks in ways your laptop never will.",
    body: "The gap between works-for-me and works-for-everyone is where launches go to die. Learned entries, each from a real incident.",
    items: [
      { lead: "App updates can crash your returning users.", body: "A progressive web app plus code splitting means stale chunks after every deploy. Handle the preload failure and clean up old service workers, or your most loyal users see a white screen." },
      { lead: "Favicons are not one file.", body: "Safari is picky about SVG favicons; some frameworks want exact PNG formats. Ship the boring set: SVG, PNG fallbacks, Apple touch icon, and check them in every browser you claim to support." },
      { lead: "QA the slow path, not the fast one.", body: "Lazy-loaded images and deferred scripts make the first paint lie. Test on a throttled connection and look at what a first-time visitor actually sees." },
      { lead: "A misbehaving API key masquerades as a bug.", body: "Free-tier limits, wrong environment, missing scopes: when production acts different from local, suspect the keys before the code." },
    ],
  },
  {
    kicker: "Demos, data, and security",
    statement: "A public URL changes the rules.",
    body: "The moment anyone can reach it, assume someone curious will. These checks are the difference between a demo and an incident.",
    items: [
      { lead: "A demo that can write to real data is a P0.", body: "Demo mode needs its own data and its own guardrails. Nobody outside should ever be one tap from your production records." },
      { lead: "AI prompts tuned for the owner will confuse guests.", body: "An assistant trained on your own habits routes a stranger's data somewhere strange. Demo personas need their own prompt context." },
      { lead: "Rate limit anything with a public URL.", body: "Especially endpoints that cost money per call. A per-IP counter in the database you already have is zero extra infrastructure and holds up." },
      { lead: "Verify the domain end to end before launch day.", body: "DNS, certificate, and email records. Sending an announcement from a domain whose email is broken is a launch memory you only make once." },
    ],
  },
  {
    kicker: "The small stuff that is not",
    statement: "Details are where trust is won.",
    body: "None of these block a launch. All of them quietly decide how the launch is received.",
    items: [
      { lead: "Screenshot at phone and desktop widths before calling anything done.", body: "This is a standing gate for us, not a suggestion. What you did not look at is where the embarrassment lives." },
      { lead: "Version your share images.", body: "Social caches hold onto old preview cards for weeks. Put a version in the filename and the new design actually ships." },
      { lead: "Regenerate the sitemap on every build.", body: "Sitemaps go stale the moment routes change, and stale sitemaps quietly cost you indexing." },
      { lead: "A thin section needs an honest sentence, not padding.", body: "If a part of the product is early, say so plainly. Readers forgive early; they do not forgive filler." },
    ],
  },
];

export default function MadronaV2ChecklistNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The checklist our launches taught us · Thinking" noindex />
      <M2Nav active="pov" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker"><Link className="m2-pb-crumb" to="/thinking">Thinking</Link> · Learning · Aug 2026</p>
        <h1>The checklist our launches <span className="m2-pop">taught us.</span></h1>
        <p className="m2-th-standfirst">Every product we ship ends with an audit, and every audit teaches us something we did not know. The findings get banked, dated and specific, and the next launch inherits them. This is our pre-launch checklist for shipping web apps, learned the hard way across real products, not copied from a listicle.</p>
      </section>

      {GROUPS.map((g) => (
        <section key={g.kicker} className="m2-ab4 m2-ab4-sec">
          <div className="m2-ab4-rail">
            <p className="m2-kicker m2-who-kicker">{g.kicker}</p>
            <p className="m2-ab4-statement">{g.statement}</p>
            <div className="m2-ab4-body"><p>{g.body}</p></div>
          </div>
          <div className="m2-ck-list">
            {g.items.map((it) => (
              <div key={it.lead} className="m2-ck-item">
                <span className="tick" aria-hidden="true">✓</span>
                <p><b>{it.lead}</b> {it.body}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why we keep it</p>
          <p className="m2-ab4-statement">The bank keeps growing.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Every one of these entries traces to a specific launch and a specific lesson. That is the point of the practice: findings get folded back into the playbooks, so the checklist is not a document we wrote once. It is a system that gets harder to surprise. That loop is the engine behind everything we ship.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/thinking/under-the-hood">Read: The engine behind everything we ship <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/thinking">More from Thinking <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
