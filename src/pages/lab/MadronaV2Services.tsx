import { useEffect, useState } from "react";
import LabMeta from "./LabMeta";
import MadronaLogo from "./MadronaLogo";
import SiteFooter from "./SiteFooter";
import { ServiceIcon } from "./ServiceIcon";
import { useReveal } from "./useReveal";
import { serviceAreas, type ServiceId } from "../../data/services";
import "./madrona-v2.css";

const CTA_LABEL: Record<ServiceId, string> = {
  "brand-and-web": "your brand and web presence",
  "customers-and-growth": "your customer journey",
  "operations-and-ai": "your operations and AI opportunities",
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

  return (
    <main className="m2 m2-sp-page">
      <LabMeta title="Services · Madrona Product Studio" />
      <header className="m2-nav">
        <a className="m2-logo-link" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
        <nav aria-label="Primary">
          <a aria-current="page" href="/services">Services</a>
          <a href="/apps">Our apps</a>
          <a href="/about">About</a>
        </nav>
        <a className="m2-button m2-nav-cta" href="/connect">Let’s connect</a>
      </header>

      <section className="m2-sp-intro">
        <p className="m2-kicker m2-sp-eyebrow">Services</p>
        <h1>Services</h1>
        <p>We help established businesses improve how they look, sell, and operate—with strategy, design, and technology that lasts.</p>
      </section>

      <div className="m2-sp-layout">
        <nav className="m2-sp-nav" aria-label="Service areas">
          {serviceAreas.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? "is-active" : ""} aria-current={active === s.id ? "true" : undefined}>{s.name}</a>
          ))}
        </nav>

        <div className="m2-sp-sections">
          {serviceAreas.map((s) => (
            <section className="m2-sp-section" id={s.id} key={s.id} data-reveal>
              <div className="m2-sp-head">
                <div className="m2-sp-head-copy">
                  <div className="m2-sp-title"><ServiceIcon id={s.id} /><h2>{s.name}</h2></div>
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
                  <a className="m2-text-link m2-sp-cta" href="/connect">Talk with us about {CTA_LABEL[s.id]} <span>→</span></a>
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
        <a className="m2-button" href="/connect">Tell us what you’re working on <span aria-hidden="true">→</span></a>
      </section>

      <SiteFooter />
    </main>
  );
}
