import { useState, type FormEvent, type ReactNode } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { useCalEmbed, bookProps, bookHref, bookClick } from "./useCalEmbed";
import "./madrona-v2.css";

import connectHero from "../../../docs/madrona-v2-build-kit/site-assets/services-hero.webp";

const CX_ICONS: Record<string, ReactNode> = {
  leaf: <path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13Zm0 0c2-5 5-8 9-10" />,
  tree: <path d="M12 3 6 12h4l-3 5h10l-3-5h4L12 3ZM12 17v4" />,
  waves: <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9.5h18M8 3v4M16 3v4" /></>,
  plane: <><path d="M21 3 3 10.5l7 2.5 2.5 7L21 3Z" /><path d="m10 13 11-10" /></>,
  chat: <path d="M5 4h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3.5V5a1 1 0 0 1 1-1z" />,
  agenda: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 9h6M9 13h6M9 17h4" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m9 15 2-6 4-2-2 6-4 2Z" /></>,
  mail: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="m4 8 8 5 8-5" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7 10.5V16M7 7.2v.01M11 16v-3.4a1.6 1.6 0 0 1 3.2 0V16M11 16v-5.5" /></>,
  pin: <><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></>,
  people: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="16.6" cy="9.6" r="2.2" /><path d="M15.2 19a5 5 0 0 1 5.3-4.6" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
};

function CxIcon({ name }: { name: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{CX_ICONS[name]}</svg>;
}

const expectItems = [
  { icon: "chat", title: "A 30-minute conversation", body: "We’ll explore your goals, challenges, and what’s possible." },
  { icon: "agenda", title: "A clear agenda", body: "We come prepared and make the most of your time." },
  { icon: "eye", title: "An honest point of view", body: "You’ll get straightforward feedback and ideas you can use." },
  { icon: "compass", title: "No pressure if it’s not a fit", body: "If we’re not the right partner, we’ll help point you in the right direction." },
];

type Status = "idle" | "submitting" | "success" | "error";

export default function MadronaV2Connect() {
  useReveal();
  useCalEmbed();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";
    const message = [
      `What's not working: ${val("notWorking")}`,
      `Hoping to improve: ${val("improve")}`,
      val("organization") && `Organization: ${val("organization")}`,
      val("website") && `Website: ${val("website")}`,
      val("notes") && `Anything else: ${val("notes")}`,
    ].filter(Boolean).join("\n\n");
    const payload = { name: val("name"), email: val("email"), message, company: val("company") };

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || "Something went wrong. Please email hello@madronaproduct.com."); setStatus("error"); return; }
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "contact_submit", { event_category: "engagement" });
      setStatus("success");
    } catch {
      setError("Couldn’t reach the server. Please email hello@madronaproduct.com."); setStatus("error");
    }
  }


  return (
    <main className="m2 m2-cx-page">
      <LabMeta title="Let’s connect · Madrona Product Studio" />
      <M2Nav />

      <section className="m2-cx-hero">
        <div className="m2-cx-hero-copy">
          <h1>Let’s connect.</h1>
          <span className="m2-cx-rule" aria-hidden="true" />
          <p>Bring us an important problem, an early idea, or something already in motion. We help you figure out what to build, then build it.</p>
          <div className="m2-cx-tags">
            <span><CxIcon name="clock" />30-minute conversation</span>
            <span><CxIcon name="check" />No prep needed</span>
            <span><CxIcon name="people" />Senior team from the start</span>
          </div>
        </div>
        <div className="m2-cx-hero-media"><img src={connectHero} alt="Pacific Northwest coastline in warm light" /></div>
      </section>

      <section className="m2-cx-actions">
        <div className="m2-cx-action" data-reveal>
          <span className="m2-cx-action-icon m2-cx-action-icon--bark"><CxIcon name="calendar" /></span>
          <div>
            <h3>Book a conversation</h3>
            <p>A focused 30-minute call to talk through where you are and where we can make the biggest difference. Free, no prep needed.</p>
            <a className="m2-button" href={bookHref()} onClick={bookClick} target="_blank" rel="noopener noreferrer" {...bookProps()}>Schedule a call <span>↗</span></a>
          </div>
        </div>
        <div className="m2-cx-action" data-reveal>
          <span className="m2-cx-action-icon m2-cx-action-icon--forest"><CxIcon name="plane" /></span>
          <div>
            <h3>Send a message</h3>
            <p>Tell us what you’re working on and get a thoughtful response, usually within two business days.</p>
            <a className="m2-button m2-button-secondary" href="#send">Write to us <span>↓</span></a>
          </div>
        </div>
      </section>

      <section className="m2-cx-main" id="send">
        <div className="m2-cx-formwrap">
          <h2>Send us a message</h2>
          <p className="m2-cx-formsub">We’d love to hear what you’re working on.</p>
          {status === "success" ? (
            <div className="m2-cx-success">
              <span className="m2-cx-action-icon m2-cx-action-icon--forest"><CxIcon name="check" /></span>
              <h3>Thanks — your message is on its way.</h3>
              <p>We’ll get back to you within two business days.</p>
            </div>
          ) : (
            <form className="m2-cx-form" onSubmit={handleSubmit} noValidate>
              <div className="m2-cx-row">
                <label className="m2-cx-field"><span>Your name <b>*</b></span><input name="name" type="text" required autoComplete="name" placeholder="First and last name" /></label>
                <label className="m2-cx-field"><span>Email address <b>*</b></span><input name="email" type="email" required autoComplete="email" placeholder="name@company.com" /></label>
              </div>
              <div className="m2-cx-row">
                <label className="m2-cx-field"><span>Business / Organization <b>*</b></span><input name="organization" type="text" required placeholder="Company or organization name" /></label>
                <label className="m2-cx-field"><span>Website or prototype URL</span><input name="website" type="text" placeholder="https://yourwebsite.com" /></label>
              </div>
              <label className="m2-cx-field"><span>What’s not working right now? <b>*</b></span><textarea name="notWorking" required rows={2} placeholder="Share the challenges, gaps, or friction you’re facing." /></label>
              <label className="m2-cx-field"><span>What are you hoping to improve? <b>*</b></span><textarea name="improve" required rows={2} placeholder="What would success look like for this project?" /></label>
              <label className="m2-cx-field"><span>Anything else we should know?</span><textarea name="notes" rows={3} placeholder="Share any additional context, goals, or timeline." /></label>
              <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="m2-cx-hp" />
              <div className="m2-cx-submit">
                <button className="m2-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send message"} <span>↗</span></button>
                <p className="m2-cx-privacy">We respect your privacy. Your information is safe with us.</p>
              </div>
              {status === "error" && <p className="m2-cx-error">{error}</p>}
            </form>
          )}
        </div>

        <aside className="m2-cx-side">
          <div className="m2-cx-card">
            <h3>What to expect</h3>
            <ul className="m2-cx-expect">
              {expectItems.map((it) => (
                <li key={it.title}><span className="m2-cx-expect-ic"><CxIcon name={it.icon} /></span><div><strong>{it.title}</strong><p>{it.body}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="m2-cx-card">
            <h3>Contact information</h3>
            <ul className="m2-cx-contact">
              <li><CxIcon name="mail" />hello@madronaproduct.com</li>
              <li><CxIcon name="pin" />Based in the Pacific Northwest</li>
            </ul>
          </div>
          <div className="m2-cx-card m2-cx-respond">
            <span className="m2-cx-expect-ic"><CxIcon name="clock" /></span>
            <div><strong>We usually respond</strong><p>Within 2 business days</p></div>
          </div>
        </aside>
      </section>

      <SiteFooter cta={false} />
    </main>
  );
}
