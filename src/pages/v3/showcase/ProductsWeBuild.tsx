// The products we build, sorted by who they are for (Charlie, 2026-10-12:
// "a similar exercise for the new products page... health & wellness,
// outdoor access, travel"). The sibling of SitesWeBuild, same spread and
// classes: pills for the space, what building there takes on the left, a
// window on the right with that space's products as tabs. Every product is
// ours, shown with its real stage from studioProducts.ts. Helm links to the
// public demo (HELM_DEMO_URL), never the real instance. San Juan stays off
// the service pages (Charlie, 2026-10).
import { useState } from "react";
import { Link } from "react-router-dom";
import { imgProps, type ResponsiveImage } from "../../../lib/responsiveImage";
import { studioProducts, STAGE_META, type StudioProduct } from "../../../data/studioProducts";
import { HELM_DEMO_URL } from "../../../data/proof";
import { CONTACT_PATH } from "../../../data/contact";
import { ctaClick, outboundClick } from "../../../lib/analytics";
import { WindowBar } from "../ReadCard";
import ariaHome from "../../../../docs/madrona-v2-build-kit/product-proof/aria/tour-home.webp?w=640;960;1440&format=webp&as=img";
import plainlyHome from "../../../../docs/madrona-v2-build-kit/product-proof/plainly/tour-home.webp?w=640;960;1440&format=webp&as=img";
import yogaHome from "../../../../docs/madrona-v2-build-kit/product-proof/lila-yoga/tour-home-pose.webp?w=640;960;1440&format=webp&as=img";
import lilaHome from "../../../../docs/madrona-v2-build-kit/product-proof/lila/tour-home-sunset.webp?w=640;960;1440&format=webp&as=img";
import gardenHome from "../../../../docs/madrona-v2-build-kit/product-proof/garden-hq/tour-home.webp?w=640;960;1440&format=webp&as=img";
import helmHome from "../../../../docs/madrona-v2-build-kit/product-proof/helm/tour-home.webp?w=640;960;1440&format=webp&as=img";
import "./sites-we-build.css";

type Item = { id: string; tab: string; img: ResponsiveImage; line: string; alt: string; href?: string; linkLabel?: string };
type Space = { id: string; label: string; hero: string; head: string; forWho: string; needs: string[]; items: Item[] };

const SPACES: Space[] = [
  {
    id: "health", label: "Health and wellness", hero: "health and wellness",
    head: "Care that feels like care.",
    forWho: "For the tender moments: a change in your health, a first therapy session, a new practice.",
    needs: ["Plain, kind words on hard subjects", "Grounded in evidence or the source, and it shows its work", "Private by default, and clear about what it is not"],
    items: [
      { id: "lila-yoga", tab: "Lila Yoga", img: yogaHome, line: "A companion for your first weeks of yoga: what it is, what the words mean, and how to practice, cited to the source.", alt: "Lila Yoga homepage: Welcome to yoga, with a figure of light in dancer pose" },
      { id: "plainly", tab: "Plainly", img: plainlyHome, line: "A five-minute voice conversation becomes a profile any therapist can read before the first session.", alt: "Plainly homepage: Thinking about starting therapy?" },
      { id: "aria-health", tab: "Aria Health", img: ariaHome, line: "A menopause guide that adapts to where you are, with clinical guardrails and questions ready for the doctor.", alt: "Aria Health homepage: So this might be menopause" },
    ],
  },
  {
    id: "outdoors", label: "Travel and the outdoors", hero: "travel and the outdoors",
    head: "Get people outside, better prepared.",
    forWho: "For trips, trails, and gardens: anything timed to the season, the weather, or the sky.",
    needs: ["Timing built in: season, weather, and daylight", "Maps and plans that match the ground", "Works on a phone, out there"],
    items: [
      { id: "lila-trips", tab: "Lila Trips", img: lilaHome, line: "An open-ended trip idea becomes a day-by-day plan, timed to the season and the sky, with checkout built in.", alt: "Lila Trips homepage at sunset: Wild places, perfectly timed" },
      { id: "garden-hq", tab: "Garden HQ", img: gardenHome, line: "Every bed, plant, and sensor on one map that is true to the garden, so next year goes better.", alt: "Garden HQ homepage: map, organize, and improve your food garden" },
    ],
  },
  {
    id: "work", label: "Work and the week", hero: "work and the week",
    head: "Tools for people who work alongside AI.",
    forWho: "For owners and small teams whose week runs on lists, notes, and follow-ups.",
    needs: ["One place people and AI agents both read and write", "Built around the day, not a dashboard", "Plain files you own and can take anywhere"],
    items: [
      { id: "helm", tab: "Helm", img: helmHome, href: HELM_DEMO_URL, linkLabel: "Try the demo", line: "Projects, priorities, and follow-ups that people and agents work from together. We run the studio on it.", alt: "Helm homepage: Everything you're running, in one place, beside the app on a laptop and a phone" },
    ],
  },
];

const SIZES_WIN = "(max-width: 900px) calc(100vw - 32px), 760px";
const SIZES_HERO = "(max-width: 900px) 80vw, 460px";
const NOTE_TO = `${CONTACT_PATH}?from=products-we-build`;

function product(id: string): StudioProduct {
  const p = studioProducts.find(x => x.id === id);
  if (!p) throw new Error(`ProductsWeBuild: unknown product ${id}`);
  return p;
}

// The hero: one product from each space, fanned, labeled by the space.
export function ProductsHero() {
  const picks = [SPACES[1].items[0], SPACES[0].items[0], SPACES[2].items[0]];
  const labels = [SPACES[1].hero, SPACES[0].hero, SPACES[2].hero];
  return <div className="swb-hero" aria-label="Three products we built">
    {picks.map((it, i) => <figure key={it.id} className={`v3-artifact swb-hero-win swb-hero-${i}`}>
      <WindowBar path={labels[i]} />
      <img {...imgProps(it.img, SIZES_HERO)} alt={it.alt} decoding="async" />
    </figure>)}
  </div>;
}

export function ProductsWeBuild() {
  const [si, setSi] = useState(0);
  const [ii, setIi] = useState(0);
  const s = SPACES[si];
  const it = s.items[ii];
  const p = product(it.id);
  const href = it.href ?? p.primaryAction?.href;
  const linkLabel = it.linkLabel ?? p.primaryAction?.label ?? `Visit ${p.name}`;
  return <div className="swb">
    <div className="swb-pills" role="tablist" aria-label="Who it is for">
      {SPACES.map((x, i) => <button key={x.id} type="button" role="tab" aria-selected={i === si} aria-controls="pwb-panel"
        className={i === si ? "is-on" : ""} onClick={() => { setSi(i); setIi(0); }}>{x.label}</button>)}
    </div>
    <div className="swb-spread" id="pwb-panel" role="tabpanel" aria-label={s.label}>
      <div className="swb-info">
        <h3>{s.head}</h3>
        <p className="swb-for">{s.forWho}</p>
        <ul className="swb-needs">{s.needs.map(n => <li key={n}>{n}</li>)}</ul>
        <div className="swb-example">
          <p className="swb-meta"><span>{p.name}</span><em>{STAGE_META[p.stage].label}</em></p>
          {href && <a className="v3-btn v3-btn-primary" href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, `products-${p.id}`)}>
            {linkLabel} <span aria-hidden="true">↗︎</span><span className="swb-sr"> (opens in a new tab)</span>
          </a>}
          <Link className="swb-more" to={NOTE_TO} onClick={ctaClick("Tell us your idea", NOTE_TO, `products-${s.id}`)}>
            Tell us your idea <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <figure className="swb-stage">
        <article className="v3-artifact swb-win">
          <div className="swb-winbar">
            <span className="swb-dots" aria-hidden="true"><i /><i /><i /></span>
            <div className="swb-tabs">{s.items.map((x, i) => <button key={x.id} type="button" aria-pressed={i === ii}
              className={i === ii ? "is-on" : ""} onClick={() => setIi(i)}>{x.tab}</button>)}</div>
          </div>
          <div className="swb-screen">
            <img {...imgProps(it.img, SIZES_WIN)} alt={it.alt} loading="lazy" decoding="async" />
          </div>
        </article>
        <figcaption className="swb-line">{it.line}</figcaption>
      </figure>
    </div>
    <p className="swb-note">Every product here is ours, built by the studio. Each one shows its real stage, from live to still in development.</p>
  </div>;
}
