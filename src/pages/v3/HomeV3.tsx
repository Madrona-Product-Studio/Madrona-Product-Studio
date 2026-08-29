import { Link } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { Hero } from "./Hero";
import { HelpSection } from "./HelpSection";
import { PracticeSection } from "./PracticeSection";
import { BerryGoodSection } from "./BerryGoodSection";
import "../lab/madrona-v2.css";
import "./v3.css";
import helmImage from "../../../docs/madrona-v2-build-kit/site-assets/helm-tile.webp";
import lilaImage from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp";
import sanJuanImage from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp";
import berryImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";

const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];

export default function HomeV3() {
  useCalEmbed();
  return <main className="m2 v3">
    <LabMeta title="Madrona Product Studio · V3 preview" noindex />
    <M2Nav />
    <Hero />

    <HelpSection />
    <PracticeSection />
    <BerryGoodSection />

    <section className="v3-section v3-shell v3-capabilities"><div><p className="v3-kicker">Skills and stack</p><h2>A whole product practice, made legible.</h2><p>Senior judgment across the work, with tools chosen for the business rather than the pitch.</p></div><div className="v3-cap-panel"><div className="v3-cap-row"><h3>Skills</h3><div>{serviceAreas.map(s => <section key={s.id}><strong>{s.door}</strong>{s.homepageItems.slice(0,3).map(i => <span key={i}>{i}</span>)}</section>)}</div></div><div className="v3-cap-row v3-stack"><h3>Stack</h3><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></div></div></section>

    <section className="v3-section v3-shell v3-proof"><div className="v3-spread-intro"><div><p className="v3-kicker">Proof in the work</p><h2>We build products, and we run them.</h2></div><p>Our own apps keep our product judgment close to real users. Berry Good is our demonstration business for showing connected customer and operating systems.</p></div><div className="v3-proof-grid">{[[helmImage,"Helm","Beta · Our command center"],[lilaImage,"Lila Trips","Live · Adventure travel"],[sanJuanImage,"San Juan Boating Guide","Live · Salish Sea routes"],[berryImage,"Berry Good","Demo · A connected farm operation"]].map(([src,name,status]) => <figure key={name}><img src={src} alt={`${name} product interface`} /><figcaption><strong>{name}</strong><span>{status}</span></figcaption></figure>)}</div><div className="v3-experience"><span>Experience includes</span><img src="/images/logos/rei-logo.svg" alt="REI" /><img src="/images/logos/healthline-logo.svg" alt="Healthline" /><img src="/images/logos/microsoft-logo.svg" alt="Microsoft" /></div></section>

    <section className="v3-section v3-shell v3-thinking"><div><p className="v3-kicker">Thinking</p><h2>Notes from building the studio we want to work with.</h2></div><div><Link to="/thinking/the-era-of-agentic-operations"><span>Operations and AI</span><strong>The era of agentic operations</strong><em>Read the note →</em></Link><Link to="/thinking/solve-the-system-not-the-symptom"><span>Product systems</span><strong>Solve the system, not the symptom</strong><em>Read the note →</em></Link></div></section>
    <section className="v3-final-cta"><div className="v3-shell"><p className="v3-kicker">Start with a conversation</p><h2>Have something worth building?</h2><p>Tell us where the friction is, or what you think might exist next.</p><a className="v3-btn v3-btn-light" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a></div></section>
    <SiteFooter cta={false} />
  </main>;
}
