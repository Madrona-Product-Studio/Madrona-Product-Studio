import { Link, useSearchParams } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { SignalReport } from "./V3Artifacts";
import { HeroVariantView, type HeroVariant } from "./HeroVariants";
import "../lab/madrona-v2.css";
import "./v3.css";
import heroImage from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-editorial.webp";
import helmImage from "../../../docs/madrona-v2-build-kit/site-assets/helm-tile.webp";
import lilaImage from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sanJuanImage from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import berryImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";

const doorRoutes: Record<string, string> = { "operations-and-ai": "/v3/consulting/work-smarter", "customers-and-growth": "/consulting#customers-and-growth", "brand-and-web": "/consulting#brand-and-web", "new-products": "/consulting#new-products" };
const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];

export default function HomeV3() {
  const [searchParams] = useSearchParams();
  const selected = searchParams.get("hero");
  const heroVariant = selected === "a" || selected === "b" || selected === "c" ? selected as HeroVariant : null;
  useCalEmbed();
  return <main className="m2 v3">
    <LabMeta title="Madrona Product Studio · V3 preview" noindex />
    <M2Nav />
    <aside className="v3-now"><span>Now at Madrona</span><p>We are opening a small number of fall projects.</p><Link to="/connect">Tell us what you are working on →</Link></aside>
    {heroVariant ? <HeroVariantView variant={heroVariant} /> : <section className="v3-home-hero v3-shell">
      <div className="v3-home-copy"><p className="v3-kicker">Product strategy · design · engineering</p><h1>Figure out what to build, <span>then build it.</span></h1><p className="v3-lede">A senior product studio for teams with an important opportunity, a stubborn operating problem, or a new product worth making real.</p><div className="v3-actions"><a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a><Link className="v3-btn v3-btn-secondary" to="/checkup">Take the free signal check</Link></div></div>
      <div className="v3-hero-stage"><img src={heroImage} alt="A warm view across the Salish Sea and island shoreline" /><div className="v3-report-float"><SignalReport /></div></div>
    </section>}

    <section className="v3-section v3-shell"><div className="v3-spread-intro"><div><p className="v3-kicker">Four ways in</p><h2>Bring us the problem as you see it.</h2></div><p>The doors are different. The practice behind them is the same: find the most valuable move, make it tangible, and learn from the real thing.</p></div><div className="v3-door-grid">{serviceAreas.map((service, index) => <Link className="v3-door" to={doorRoutes[service.id]} key={service.id}><div><span>0{index + 1} · {service.name}</span><h3>{service.door}</h3><p>{service.outcome}</p></div><figure><img src={service.artifact.src} alt={service.artifact.alt} /><figcaption>{service.artifact.caption}</figcaption></figure><ul>{service.homepageItems.map(item => <li key={item}>{item}</li>)}</ul><b>Explore this work →</b></Link>)}</div></section>

    <section className="v3-section v3-shell v3-capabilities"><div><p className="v3-kicker">Skills and stack</p><h2>A whole product practice, made legible.</h2><p>Senior judgment across the work, with tools chosen for the business rather than the pitch.</p></div><div className="v3-cap-panel"><div className="v3-cap-row"><h3>Skills</h3><div>{serviceAreas.map(s => <section key={s.id}><strong>{s.door}</strong>{s.homepageItems.slice(0,3).map(i => <span key={i}>{i}</span>)}</section>)}</div></div><div className="v3-cap-row v3-stack"><h3>Stack</h3><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div></section>

    <section className="v3-section v3-shell v3-proof"><div className="v3-spread-intro"><div><p className="v3-kicker">Proof in the work</p><h2>We build products, and we run them.</h2></div><p>Our own apps keep our product judgment close to real users. Berry Good is our demonstration business for showing connected customer and operating systems.</p></div><div className="v3-proof-grid">{[[helmImage,"Helm","Beta · Our command center"],[lilaImage,"Lila Trips","Live · Adventure travel"],[sanJuanImage,"San Juan Boating Guide","Live · Salish Sea routes"],[berryImage,"Berry Good","Demo · A connected farm operation"]].map(([src,name,status]) => <figure key={name}><img src={src} alt={`${name} product interface`} /><figcaption><strong>{name}</strong><span>{status}</span></figcaption></figure>)}</div><div className="v3-experience"><span>Experience includes</span><img src="/images/logos/rei-logo.svg" alt="REI" /><img src="/images/logos/healthline-logo.svg" alt="Healthline" /><img src="/images/logos/microsoft-logo.svg" alt="Microsoft" /></div></section>

    <section className="v3-section v3-shell v3-thinking"><div><p className="v3-kicker">Thinking</p><h2>Notes from building the studio we want to work with.</h2></div><div><Link to="/thinking/the-era-of-agentic-operations"><span>Operations and AI</span><strong>The era of agentic operations</strong><em>Read the note →</em></Link><Link to="/thinking/solve-the-system-not-the-symptom"><span>Product systems</span><strong>Solve the system, not the symptom</strong><em>Read the note →</em></Link></div></section>
    <section className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Have something worth building?</h2><p>Tell us where the friction is, or what you think might exist next.</p><a className="v3-btn v3-btn-light" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a></div></section>
    <SiteFooter cta={false} />
  </main>;
}
