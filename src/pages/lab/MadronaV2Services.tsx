import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { ServiceIcon } from "./ServiceIcon";
import { useReveal } from "./useReveal";
import { serviceAreas, type ServiceId } from "../../data/services";
import servicesHero from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import "./madrona-v2.css";

const CTA_LABEL: Record<ServiceId, string> = {
  "brand-and-web": "your brand and web presence",
  "customers-and-growth": "your customer journey",
  "operations-and-ai": "your operations and AI opportunities",
  "new-products": "your product idea",
};

function Check() {
  return <svg className="m2-sp-check" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M6 10.2l2.5 2.5L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function useActiveSection(ids: ServiceId[]) {
  const [active, setActive] = useState<ServiceId>(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as ServiceId);
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export default function MadronaV2Services() {
  useReveal();
  const ids = serviceAreas.map((s) => s.id);
  const active = useActiveSection(ids);
  const activeIdx = ids.indexOf(active);
  const fill = ids.length > 1 ? (activeIdx / (ids.length - 1)) * 100 : 0;

  return (
    <main className="m2 m2-sp-page">
      <LabMeta title="Services · Madrona Product Studio" />
      <M2Nav active="consulting" />

      <section className="m2-phead">
        <div className="m2-ab-intro-copy">
          <h1>Services</h1>
          <span className="m2-ab-rule" aria-hidden="true" />
          <p className="m2-ab-headline">We help you figure out what to build, <span className="m2-pop">then build it.</span></p>
          <div className="m2-ab-body">
            <p>Four ways in, one practice: every engagement starts small, focused where it will make the biggest difference, and grows from there.</p>
          </div>
        </div>
        <div className="m2-ab-intro-visual">
          <div className="m2-phead-media"><img src={servicesHero} alt="Sun breaking over a forested island in the Salish Sea" /></div>
        </div>
      </section>

      <div className="m2-sp-layout">
        <nav className="m2-sp-rail" aria-label="Service areas">
          <span className="m2-sp-rail-line" aria-hidden="true" />
          <span className="m2-sp-rail-fill" style={{ height: `calc(${fill}% * 0.92)` }} aria-hidden="true" />
          {serviceAreas.map((s, i) => {
            const on = active === s.id;
            return (
              <a key={s.id} href={`#${s.id}`} className={on ? "is-active" : ""} aria-current={on ? "true" : undefined}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                <span className="m2-sp-rail-dot" aria-hidden="true" />
                <span className="m2-sp-rail-num">{`0${i + 1}`}</span>
                <span className="m2-sp-rail-label">{s.door}</span>
              </a>
            );
          })}
        </nav>

        <div className="m2-sp-sections">
          {serviceAreas.map((s) => (
            <section className="m2-sp-section" id={s.id} key={s.id} data-reveal>
              <div className="m2-sp-head">
                <div className="m2-sp-head-copy">
                  <p className="m2-kicker">{s.name}</p>
                  <div className="m2-sp-title"><ServiceIcon id={s.id} /><h2>{s.door}</h2></div>
                  <p className="m2-sp-outcome">{s.outcome}</p>
                  <p className="m2-sp-summary">{s.summary}</p>
                  <ul className="m2-sp-values">
                    {s.valuePoints.map((v) => <li key={v.title}><strong>{v.title}</strong><p>{v.description}</p></li>)}
                  </ul>
                </div>
                <figure className="m2-sp-artifact">
                  <img src={s.artifact.src} alt={s.artifact.alt} loading="lazy" />
                  <figcaption>{s.artifact.caption}</figcaption>
                </figure>
              </div>

              <div className="m2-sp-detail">
                <div className="m2-sp-col m2-sp-included">
                  <h3>Included services</h3>
                  {s.capabilityGroups.map((g) => (
                    <div className="m2-sp-capgroup" key={g.title}>
                      <p className="m2-sp-capgroup-title">{g.title}</p>
                      <ul>{g.items.map((i) => <li key={i}><Check />{i}</li>)}</ul>
                    </div>
                  ))}
                </div>
                <div className="m2-sp-col">
                  <h3>Typical problems</h3>
                  <ul className="m2-sp-problems">{s.problems.slice(0, 5).map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <div className="m2-sp-col">
                  <h3>What we might make</h3>
                  <ul className="m2-sp-outputs">{s.outputs.map((o) => <li key={o}>{o}</li>)}</ul>
                </div>
                <div className="m2-sp-col">
                  <h3>How we start</h3>
                  <p className="m2-sp-start">{s.startingPoint}</p>
                  <Link className="m2-text-link m2-sp-cta" to="/connect">Talk with us about {CTA_LABEL[s.id]} <span>→</span></Link>
                  {s.pov && <Link className="m2-text-link m2-sp-cta" to={s.pov.to}>{s.pov.label} <span>→</span></Link>}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="m2-sp-begin">
        <ServiceIcon id="brand-and-web" className="m2-sp-begin-mark" />
        <div className="m2-sp-begin-copy">
          <h2>Not sure where to begin?</h2>
          <p>We’ll help you find the right starting point.</p>
        </div>
        <Link className="m2-button" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
