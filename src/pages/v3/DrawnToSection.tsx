import farmsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-farms-food.webp";
import outdoorsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-outdoor-travel.webp";
import healthImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-health-wellness.webp";
import shopsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-shops-services.webp";

// "The work we're drawn to" — ported from the live site's AudienceSection
// (Charlie, 2026-08-29; replaced the bare experience-logos strip). Same four
// verticals and photography, restyled into the v3 idiom.
const audiences = [
  { image: healthImage, id: "health", title: "Health & wellness", copy: "Care through clarity" },
  { image: outdoorsImage, id: "outdoors", title: "Travel & hospitality", copy: "Journeys with substance" },
  { image: shopsImage, id: "shops", title: "Retail & local commerce", copy: "Local businesses, stronger" },
  { image: farmsImage, id: "farms", title: "Food & agriculture", copy: "From soil to shelf" },
];

function AudienceIcon({ id }: { id: string }) {
  const paths: Record<string, React.ReactNode> = {
    farms: <path d="M12 21V9m0 5c-4 0-7-2.4-7-6 4 0 7 2.4 7 6Zm0-4c0-3.6 2.7-6 7-6 0 3.6-2.7 6-7 6Z" />,
    outdoors: <><path d="m3.5 18 6.3-10 3.1 4.7 2.2-3.2 5.4 8.5H3.5Z" /><path d="m7.3 12 2.5-4 1.8 2.7M9.5 18c1.8-2.3 3.7-3 5.8-2.2" /></>,
    health: <path d="M20 8.7c0 5.1-8 10.1-8 10.1S4 13.8 4 8.7C4 4 9.8 3 12 6.8 14.2 3 20 4 20 8.7Z" />,
    shops: <path d="M4 10h16M6 10v10h12V10M5 10l1.5-5h11l1.5 5M9 20v-6h6v6" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[id]}</svg>;
}

export function DrawnToSection() {
  return <section className="v3-section v3-band-light v3-drawn"><div className="v3-shell">
    <div className="v3-help-head">
      <p className="v3-kicker">The work we're drawn to</p>
      <h2>Where people, place, and purpose <span>come first.</span></h2>
      <p className="v3-help-lede">The products we build and the businesses we partner with share a thread: grounded work that makes everyday life richer.</p>
    </div>
    <div className="v3-drawn-grid">
      {audiences.map(({ image, id, title, copy }) => <figure key={id}>
        <img src={image} alt="" loading="lazy" decoding="async" />
        <figcaption><span className="v3-drawn-icon"><AudienceIcon id={id} /></span><div><strong>{title}</strong><small>{copy}</small></div></figcaption>
      </figure>)}
    </div>
  </div></section>;
}
