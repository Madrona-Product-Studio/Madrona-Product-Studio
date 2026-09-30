// Resources (2026-09-30): Tools and Articles in one place, replacing the
// separate /tools gallery and /thinking feed (both 301 here). Organized by
// what a visitor needs (Charlie: someone arriving for help should find a way
// to start first): Start here (the free assessment and the two most
// practical articles), the tools to try, then the thinking to go deeper.
// Labeled spreads throughout. Anchors: #start, #tools, #articles.
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import PovThumb from "./PovThumb";
import { TypeCircle } from "./TypeMark";
import { agents, CATEGORY } from "../../data/agents";
import { thinkingEntries, type ThinkingEntry } from "../../data/thinking";
import { ctaClick } from "../../lib/analytics";
import "./madrona-v2.css";
import "./playbook.css"; // the article type circles (TypeCircle)
import "./resources.css";

// The practical pieces lead; everything else is "go deeper".
const START_HREFS = ["/thinking/getting-started-with-ai", "/thinking/ai-prompt-starter-pack", "/thinking/ai-tools-for-small-business"];
const byHref = (href: string) => thinkingEntries.find(e => e.href === href)!;
const startHere = START_HREFS.map(byHref);
const deeper = thinkingEntries.filter(e => !START_HREFS.includes(e.href));

function ArticleRow({ e }: { e: ThinkingEntry }) {
  return <Link to={e.href} className="rs-row">
    <div className="rs-row-media"><div className="rs-thumb"><PovThumb motif={e.motif} /></div></div>
    <div className="rs-row-body">
      <p className="rs-meta m2-tm-b"><TypeCircle type={e.type} /><span>{e.type}</span><span>{e.date}</span></p>
      <h3>{e.title}</h3>
      <p>{e.excerpt}</p>
    </div>
    <span className="rs-go">Read <span aria-hidden="true">→</span></span>
  </Link>;
}

export default function Resources() {
  return <div className="m2 m2-ab-page">
    <LabMeta title="Resources · Madrona Product Studio" />
    <M2Nav active="resources" />
    <main id="main">
      <section className="rs-hero">
        <p className="m2-kicker">Resources</p>
        <h1>Resources.</h1>
        <p className="rs-lede">Free help for putting AI to work: a way to start, tools you can try, and the thinking behind them.</p>
      </section>

      <section className="rs-wrap rs-spread" id="start" aria-labelledby="rs-start">
        <div className="rs-rail">
          <p className="m2-kicker">Start here</p>
          <h2 id="rs-start">Getting started with AI.</h2>
          <p>Not sure where AI fits in your business? Start with a two-minute read on your own week, then the pieces we point people to first.</p>
        </div>
        <div>
          <Link to="/ai-opportunities" className="rs-lead" onClick={ctaClick("Take the assessment", "/ai-opportunities", "resources-start")}>
            <p className="rs-meta"><span className="rs-pill">Free · 2 minutes · no email</span></p>
            <h3>Where does your week actually go?</h3>
            <p>Flag what eats your time and get a short, honest map of where AI can help, and the first move worth making.</p>
            <span className="rs-go">Take the AI opportunity assessment <span aria-hidden="true">→</span></span>
          </Link>
          <div className="rs-list">{startHere.map(e => <ArticleRow key={e.href} e={e} />)}</div>
        </div>
      </section>

      <section className="rs-wrap rs-spread" id="tools" aria-labelledby="rs-tools">
        <div className="rs-rail">
          <p className="m2-kicker">Try the tools</p>
          <h2 id="rs-tools">Try the AI tools we deploy.</h2>
          <p>Interactive demos on Berry Good, our demonstration farm. Each one stops for a person wherever money, customers, or judgment are involved.</p>
        </div>
        <div>{Object.values(CATEGORY).map(cat => <div key={cat} className="rs-cgroup">
          <p className="rs-chead">{cat}</p>
          {agents.filter(a => a.category === cat).map(a => <Link key={a.id} to={a.href} className="rs-crow"><strong>{a.name}</strong><em>{a.cadence}</em><span aria-hidden="true">→</span></Link>)}
        </div>)}</div>
      </section>

      <section className="rs-wrap rs-spread" id="articles" aria-labelledby="rs-articles">
        <div className="rs-rail">
          <p className="m2-kicker">Go deeper</p>
          <h2 id="rs-articles">How we think about building.</h2>
          <p>Essays, guides, and artifacts from inside the studio. They publish when there’s something worth sharing.</p>
        </div>
        <div className="rs-list">{deeper.map(e => <ArticleRow key={e.href} e={e} />)}</div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
