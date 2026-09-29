// TEMP (2026-09-29): side-by-side homepage directions for Charlie to review.
// Route: /lab/home-options/:v (a | b | c). Unlinked, noindex. Delete this
// folder and its route once a direction is picked and wired into HomeV3.
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LabMeta from "../LabMeta";
import M2Nav from "../M2Nav";
import SiteFooter from "../SiteFooter";
import { HeroChart } from "../../v3/HeroChart";
import { WindowBar } from "../../v3/ReadCard";
import { DepthSection } from "../../v3/DepthSection";
import { PracticeSection } from "../../v3/PracticeSection";
import { BerryGoodSection } from "../../v3/BerryGoodSection";
import { imgProps, SIZES } from "../../../lib/responsiveImage";
import storefrontImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import { lookGroup, workGroup, startQuestion, alsoOffers, inspection, type Question } from "./content";
import "../madrona-v2.css";
import "../../v3/v3.css";
import "../../v3/home-clarity.css";
import "./home-options.css";

const Arrow = () => <span aria-hidden="true">→</span>;

function QLink({ q }: { q: Question }) {
  return q.link.to.startsWith("#")
    ? <a className="ho-qlink" href={q.link.to}>{q.link.label} <Arrow /></a>
    : <Link className="ho-qlink" to={q.link.to}>{q.link.label} <Arrow /></Link>;
}

function CtaRow({ secondary }: { secondary: [string, string] }) {
  return <div className="v3-actions">
    <Link className="v3-btn v3-btn-primary" to="/connect">Get in touch</Link>
    <a className="v3-hero-text-link" href={secondary[1]}>{secondary[0]} <Arrow /></a>
  </div>;
}

const Cred = () => <p className="v3-hero-cred">20 years in digital <i aria-hidden="true">·</i> REI <i aria-hidden="true">·</i> Healthline <i aria-hidden="true">·</i> Microsoft, via Iconmobile</p>;

function InspectionWindow() {
  return <article className="v3-artifact v3-hero-flow" aria-label="Illustrative example: a home inspection report workflow">
    <WindowBar path={inspection.path} note="illustrative" />
    <div className="v3-flow-inputs"><span>In</span><ul>{inspection.inputs.map(([a, b]) => <li key={a}><strong>{a}</strong><em>{b}</em></li>)}</ul></div>
    <ol className="v3-flow-reads">{inspection.readings.map(r => <li key={r.note} className={`is-${r.tone}`}><code>&ldquo;{r.note}&rdquo;</code><div><strong>{r.reading}</strong><small>{r.area}</small></div><b>{r.status}</b></li>)}</ol>
    <footer className="v3-flow-out"><span>Out</span><p><strong>{inspection.out}</strong>{inspection.outDetail}</p></footer>
  </article>;
}

function SiteWindow() {
  return <figure className="ho-site">
    <article className="v3-artifact ho-site-window">
      <WindowBar path="berry-good-sigma.vercel.app" note="demonstration business" />
      <img {...imgProps(storefrontImage, SIZES.berry)} alt="The Berry Good storefront website on desktop" />
    </article>
    <figcaption>Berry Good, our demonstration business: brand, storefront, and ordering, built end to end.</figcaption>
  </figure>;
}

function Hero({ h1, flash, lede, right, secondary }: { h1: string; flash: string; lede: string; right: React.ReactNode; secondary: [string, string] }) {
  return <section className="v3-current-hero v3-hero-plain ho-hero">
    <div className="v3-shell v3-current-main">
      <div className="v3-home-copy v3-experiment-copy">
        <h1>{h1} <span>{flash}</span></h1>
        <p className="v3-lede">{lede}</p>
        <CtaRow secondary={secondary} />
        <Cred />
      </div>
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-panel-wrap">{right}</div>
    </div>
  </section>;
}

// The two-group question ledger with answers visible.
function QuestionLedger({ kicker, title }: { kicker: string; title: string }) {
  return <section className="v3-section v3-shell ho-ledger" id="questions">
    <div className="v3-help-head"><p className="v3-kicker">{kicker}</p><h2>{title}</h2></div>
    <div className="ho-groups">
      {[lookGroup, workGroup].map(group => <div key={group.label} className="ho-group">
        <header><p>{group.lead}</p><h3>{group.label}</h3></header>
        <ul>{group.questions.map(q => <li key={q.id} id={`q-${q.id}`}>
          <h4>{q.question}</h4><p>{q.answer}</p><QLink q={q} />
        </li>)}</ul>
      </div>)}
    </div>
    <AlsoRow />
  </section>;
}

function AlsoRow() {
  return <div className="ho-also">
    <div className="ho-start"><h4>{startQuestion.question}</h4><p>{startQuestion.answer}</p></div>
    <ul>{alsoOffers.map(o => <li key={o.name}><Link to={o.to}><strong>{o.name} <i aria-hidden="true">→</i></strong><span>{o.body}</span></Link></li>)}</ul>
  </div>;
}

function InspectionExhibit({ withWindow }: { withWindow: boolean }) {
  return <section className="v3-section v3-band-light ho-exhibit" id="example"><div className={`v3-shell ${withWindow ? "ho-exhibit-grid" : "ho-exhibit-solo"}`}>
    <div className="ho-exhibit-rail">
      <p className="v3-kicker">An example of what we build</p>
      <h2>From field notes to a finished report.</h2>
      <p className="v3-help-lede">A home inspector spends a few hours on site, then hours more turning notes and photos into a report. A tool like this does the assembly and leaves the judgment with the inspector, who starts from a draft instead of a blank page. The same pattern fits quotes, grant reports, and board packets.</p>
      <p className="ho-note">Illustrative example, based on the kind of reporting work we are building for clients.</p>
    </div>
    <div className="ho-exhibit-body">
      {withWindow && <InspectionWindow />}
      <ol className="v3-story-steps ho-steps">{inspection.steps.map(([name, body], i) => <li key={name}><span>0{i + 1}</span><strong>{name}</strong><p>{body}</p></li>)}</ol>
    </div>
  </div></section>;
}

// Showroom hero: two selectable previews.
function ShowroomWindow() {
  const [tab, setTab] = useState<"site" | "report">("site");
  return <div className="ho-showroom">
    <div className="ho-tabs" role="tablist" aria-label="Preview">
      <button type="button" role="tab" aria-selected={tab === "site"} className={tab === "site" ? "is-active" : ""} onClick={() => setTab("site")}>A clearer website</button>
      <button type="button" role="tab" aria-selected={tab === "report"} className={tab === "report" ? "is-active" : ""} onClick={() => setTab("report")}>From notes to report</button>
    </div>
    {tab === "site" ? <SiteWindow /> : <><InspectionWindow /><p className="v3-hero-caption">Illustrative example of a reporting workflow.</p></>}
  </div>;
}

function QuestionIndex() {
  return <section className="v3-section v3-shell ho-index" id="questions">
    <div className="ho-index-grid">
      <div><p className="v3-kicker">Sound familiar?</p><h2>Start from the problem.</h2><p className="v3-help-lede">The same few questions come up with businesses and nonprofits alike. Each one points to what we would build.</p></div>
      <div className="ho-index-list">{[lookGroup, workGroup].map(g => <div key={g.label}><p className="ho-index-label">{g.label}</p><ul>{g.questions.map(q => <li key={q.id}><span>{q.question}</span><QLink q={q} /></li>)}</ul></div>)}</div>
    </div>
    <AlsoRow />
  </section>;
}

// Questions-up-front hero: the question list is the hero's right side.
function QuestionPanel() {
  return <article className="v3-artifact ho-qpanel">
    <WindowBar path="sound familiar?" note="six common ones" />
    {[lookGroup, workGroup].map(g => <div key={g.label} className="ho-qpanel-group"><p>{g.label}</p><ul>{g.questions.map(q => <li key={q.id}><a href={`#q-${q.id}`}><span>{q.question}</span><i aria-hidden="true">↓</i></a></li>)}</ul></div>)}
  </article>;
}

const FinalCta = () => <section className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Tell us what isn’t working yet.</h2><p>The website, the follow-up, or the process that eats the week. It starts with a free 30-minute conversation.</p><Link className="v3-btn v3-btn-light" to="/connect">Get in touch</Link></div></section>;

export default function HomeOptions() {
  const v = (useParams().v ?? "a").toLowerCase();
  let body: React.ReactNode;
  if (v === "b") {
    body = <>
      <Hero h1="See what better" flash="could look like." lede="Brands and websites people understand. AI workflows your team can actually use. Designed and built by a small senior studio." right={<ShowroomWindow />} secondary={["See the examples", "#brand"]} />
      <BerryGoodSection />
      <InspectionExhibit withWindow={false} />
      <QuestionIndex />
      <DepthSection />
      <PracticeSection />
    </>;
  } else if (v === "c") {
    body = <>
      <Hero h1="Better brands, websites, and workflows." flash="Built with AI, done well." lede="For organizations that are better than their brand, their website, or the way their work gets done. We figure out what will actually help, then build it." right={<QuestionPanel />} secondary={["Find your question", "#questions"]} />
      <QuestionLedger kicker="Sound familiar?" title="What we would build for each." />
      <InspectionExhibit withWindow />
      <BerryGoodSection />
      <DepthSection />
      <PracticeSection />
    </>;
  } else {
    body = <>
      <Hero h1="A better website." flash="A smoother working day." lede="Madrona designs brands and websites, and builds practical AI workflows that give your team more time for the work that matters." right={<SiteWindow />} secondary={["Sound familiar?", "#questions"]} />
      <QuestionLedger kicker="Sound familiar?" title="Where we usually help." />
      <InspectionExhibit withWindow />
      <DepthSection />
      <PracticeSection />
    </>;
  }
  return <div className="m2 v3">
    <LabMeta title={`Homepage option ${v.toUpperCase()} · Madrona (preview)`} noindex />
    <M2Nav />
    <main id="main">{body}<FinalCta /></main>
    <SiteFooter cta={false} />
  </div>;
}
