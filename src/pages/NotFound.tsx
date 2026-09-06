import { Link } from "react-router-dom";
import LabMeta from "./lab/LabMeta";
import M2Nav from "./lab/M2Nav";
import SiteFooter from "./lab/SiteFooter";
import { notFound } from "../data/siteMeta.mjs";
import "./lab/madrona-v2.css";
import "./v3/v3.css";

// The 404. Same chrome as every other page, copy from siteMeta.mjs so the
// static dist/404.html the prerender emits says the same thing. Vercel serves
// that file with a real 404 status for paths nothing else matches; this
// component covers the client-side case (an in-app link to a path that no
// longer exists).
export default function NotFound() {
  return (
    <main className="m2 v3">
      <LabMeta title={notFound.title} noindex />
      <M2Nav />
      <section className="v3-current-hero v3-svc-hero">
        <div className="v3-shell">
          <p className="v3-kicker">{notFound.kicker}</p>
          <h1>{notFound.h1}</h1>
          <p className="v3-lede">{notFound.body}</p>
          <div className="v3-actions">
            <Link className="v3-btn v3-btn-primary" to={notFound.links[0].to}>{notFound.links[0].label}</Link>
            {notFound.links.slice(1).map((l) => (
              <Link key={l.to} className="v3-hero-text-link" to={l.to}>{l.label} <span aria-hidden="true">→</span></Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter cta={false} />
    </main>
  );
}
