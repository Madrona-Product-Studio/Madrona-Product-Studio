import farmsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-farms-food.webp";
import outdoorsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-outdoor-travel.webp";
import healthImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-health-wellness.webp";
import shopsImage from "../../../docs/madrona-v2-build-kit/placeholders/photography/audience-shops-services.webp";

function AudienceIcon({ type }: { type: "farms" | "outdoors" | "health" | "shops" }) {
  if (type === "farms") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9m0 5c-4 0-7-2.4-7-6 4 0 7 2.4 7 6Zm0-4c0-3.6 2.7-6 7-6 0 3.6-2.7 6-7 6Z" /></svg>;
  if (type === "outdoors") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3.5 18 6.3-10 3.1 4.7 2.2-3.2 5.4 8.5H3.5Z" /><path d="m7.3 12 2.5-4 1.8 2.7M9.5 18c1.8-2.3 3.7-3 5.8-2.2" /></svg>;
  if (type === "health") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 8.7c0 5.1-8 10.1-8 10.1S4 13.8 4 8.7C4 4 9.8 3 12 6.8 14.2 3 20 4 20 8.7Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16M6 10v10h12V10M5 10l1.5-5h11l1.5 5M9 20v-6h6v6" /></svg>;
}

export default function AudienceSection() {
  return (
    <section className="m2-audiences" aria-labelledby="audience-title">
      <div className="m2-audience-intro"><p className="m2-kicker">The work we’re drawn to</p><h2 id="audience-title">Where people, place, and purpose <span className="m2-keep-together">come first.</span></h2><p>The products we build and the businesses we partner with share a thread: grounded work that makes everyday life richer.</p></div>
      <div className="m2-audience-grid">
        {[
          { image: farmsImage, type: "farms" as const, title: "Food & agriculture", copy: "From soil to shelf" },
          { image: outdoorsImage, type: "outdoors" as const, title: "Travel & hospitality", copy: "Journeys with substance" },
          { image: healthImage, type: "health" as const, title: "Health & wellness", copy: "Care through clarity" },
          { image: shopsImage, type: "shops" as const, title: "Retail & commerce", copy: "Local businesses, stronger" },
        ].map(({ image, type, title, copy }) => <article className="m2-audience" key={title} data-reveal><div className="m2-audience-image"><img src={image} alt="" /></div><div className="m2-audience-caption"><span className="m2-audience-icon"><AudienceIcon type={type} /></span><div><h3>{title}</h3><p>{copy}</p></div></div></article>)}
      </div>
    </section>
  );
}
