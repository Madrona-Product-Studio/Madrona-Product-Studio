import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { useCalEmbed, bookProps, bookHref, bookClick } from "./useCalEmbed";
import { track } from "../../lib/analytics";
import "./madrona-v2.css";

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

const EMAIL = "hello@madronaproduct.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TOPICS = ["AI & Operations", "Brand & Website", "Growth & Retention", "New Products", "Not sure yet"];

const expectItems = [
  { icon: "chat", title: "A 30-minute conversation", body: "We’ll explore your goals, challenges, and what’s possible." },
  { icon: "agenda", title: "A clear agenda", body: "We come prepared and make the most of your time." },
  { icon: "eye", title: "An honest point of view", body: "You’ll get straightforward feedback and ideas you can use." },
  { icon: "compass", title: "No pressure if it’s not a fit", body: "If we’re not the right partner, we’ll help point you in the right direction." },
];

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = { name?: string; email?: string };

// Where the visitor came from, remembered for the session so it survives the
// hop from a landing page to /connect. First touch wins.
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
type Attribution = Record<(typeof UTM_KEYS)[number] | "referrer", string>;

function rememberAttribution(search: string): Attribution {
  const params = new URLSearchParams(search);
  const out = {} as Attribution;
  for (const key of [...UTM_KEYS, "referrer"] as const) {
    const storageKey = `madrona_${key}`;
    let value = "";
    try { value = sessionStorage.getItem(storageKey) ?? ""; } catch { /* storage may be blocked */ }
    if (!value) {
      value = key === "referrer" ? document.referrer : (params.get(key) ?? "");
      if (value) { try { sessionStorage.setItem(storageKey, value); } catch { /* ignore */ } }
    }
    out[key] = value;
  }
  return out;
}

// The assessment hands off with ?from=ai-opportunities&read=…&chips=…&now=…&notes=…
type Handoff = { from: string; read: string; chips: string; now: string; notes: string };
function readHandoff(search: string): Handoff {
  const params = new URLSearchParams(search);
  const get = (key: string) => (params.get(key) ?? "").trim().slice(0, 500);
  return { from: get("from"), read: get("read"), chips: get("chips"), now: get("now"), notes: get("notes") };
}

function seedNotes(handoff: Handoff): string {
  if (!handoff.read && !handoff.now && !handoff.notes) return "";
  return [
    handoff.read && `My read from the AI assessment: ${handoff.read}.`,
    handoff.now && `The first move it suggested: ${handoff.now}.`,
    handoff.notes,
  ].filter(Boolean).join("\n\n");
}

export default function MadronaV2Connect() {
  useReveal();
  useCalEmbed();
  const { pathname, search } = useLocation();
  const handoff = useMemo(() => readHandoff(search), [search]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [topics, setTopics] = useState<string[]>(() => (handoff.from || handoff.read ? ["AI & Operations"] : []));
  const [notes, setNotes] = useState(() => seedNotes(handoff));
  // Set in the effect below (a render must stay pure); 0 until then.
  const startedAt = useRef(0);
  const attribution = useRef<Attribution | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    attribution.current = rememberAttribution(search);
  }, [search]);

  const toggleTopic = (topic: string) =>
    setTopics(current => current.includes(topic) ? current.filter(item => item !== topic) : [...current, topic]);

  function validate(name: string, email: string): FieldErrors {
    const errors: FieldErrors = {};
    if (name.trim().length < 2) errors.name = "Please add your name so we know who to reply to.";
    if (!email.trim()) errors.email = "Please add an email address so we can reply.";
    else if (!EMAIL_RE.test(email.trim())) errors.email = "That email doesn’t look right. Check for a typo?";
    return errors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement)?.value ?? "";
    const errors = validate(val("name"), val("email"));
    setFieldErrors(errors);
    if (errors.name || errors.email) {
      track("contact_error", { reason: "validation" });
      (form.elements.namedItem(errors.name ? "name" : "email") as HTMLInputElement | null)?.focus();
      return;
    }

    setStatus("submitting");
    setError("");
    const attr = attribution.current ?? rememberAttribution(search);
    const payload = {
      name: val("name").trim(),
      email: val("email").trim(),
      organization: val("organization").trim(),
      topics,
      message: notes.trim(),
      company: val("company"),
      startedAt: startedAt.current,
      page: pathname + search,
      referrer: attr.referrer,
      utm_source: attr.utm_source,
      utm_medium: attr.utm_medium,
      utm_campaign: attr.utm_campaign,
      from: handoff.from,
      read: handoff.read,
      chips: handoff.chips,
      now: handoff.now,
    };

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        track("contact_error", { reason: `api_${res.status}` });
        setError(data.error || "Something went wrong."); setStatus("error"); return;
      }
      track("contact_submit", { topics: topics.join(",") || "none", from: handoff.from || "direct" });
      setStatus("success");
    } catch {
      track("contact_error", { reason: "network" });
      setError("Couldn’t reach the server."); setStatus("error");
    }
  }

  const mailto = <a href={`mailto:${EMAIL}`} onClick={() => track("email_click", { source: "connect" })}>{EMAIL}</a>;

  return (
    <div className="m2 m2-cx-page">
      <LabMeta title="Let’s connect · Madrona Product Studio" />
      <M2Nav />
      <main id="main">

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
      </section>

      <section className="m2-cx-main" id="send">
        <div className="m2-cx-formwrap">
          <h2>Send us a message</h2>
          <p className="m2-cx-formsub">{handoff.read ? "We’ve carried your read over. Add anything you like, then send." : "We’d love to hear what you’re working on."}</p>
          {status === "success" ? (
            <div className="m2-cx-success">
              <span className="m2-cx-action-icon m2-cx-action-icon--forest"><CxIcon name="check" /></span>
              <h3>Thanks. Your message is on its way.</h3>
              <p>We reply within two business days. A copy is on its way to your inbox.</p>
            </div>
          ) : (
            <form className="m2-cx-form" onSubmit={handleSubmit} noValidate>
              <div className="m2-cx-row">
                <label className={`m2-cx-field${fieldErrors.name ? " is-invalid" : ""}`}>
                  <span>Your name <b>*</b></span>
                  <input name="name" type="text" required autoComplete="name" placeholder="First and last name" aria-invalid={fieldErrors.name ? true : undefined} aria-describedby={fieldErrors.name ? "cx-err-name" : undefined} onChange={() => fieldErrors.name && setFieldErrors(f => ({ ...f, name: undefined }))} />
                  {fieldErrors.name && <em className="m2-cx-field-msg" id="cx-err-name" role="alert">{fieldErrors.name}</em>}
                </label>
                <label className={`m2-cx-field${fieldErrors.email ? " is-invalid" : ""}`}>
                  <span>Email address <b>*</b></span>
                  <input name="email" type="email" required autoComplete="email" placeholder="name@company.com" aria-invalid={fieldErrors.email ? true : undefined} aria-describedby={fieldErrors.email ? "cx-err-email" : undefined} onChange={() => fieldErrors.email && setFieldErrors(f => ({ ...f, email: undefined }))} />
                  {fieldErrors.email && <em className="m2-cx-field-msg" id="cx-err-email" role="alert">{fieldErrors.email}</em>}
                </label>
              </div>
              <label className="m2-cx-field"><span>Business / Organization</span><input name="organization" type="text" autoComplete="organization" placeholder="Company or organization name" /></label>
              <fieldset className="m2-cx-topics">
                <legend>What do you need help with?</legend>
                <div className="m2-cx-topic-grid">
                  {TOPICS.map(topic => (
                    <button type="button" key={topic} className={`m2-cx-topic${topics.includes(topic) ? " is-on" : ""}`} aria-pressed={topics.includes(topic)} onClick={() => toggleTopic(topic)}>
                      {topic}<i aria-hidden="true">{topics.includes(topic) ? "✓" : "+"}</i>
                    </button>
                  ))}
                </div>
              </fieldset>
              <label className="m2-cx-field"><span>What’s going on?</span><textarea name="notes" rows={handoff.read ? 6 : 3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="A sentence or two is plenty. We’ll take it from there." /></label>
              <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="m2-cx-hp" />
              <div className="m2-cx-submit">
                <button className="m2-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Send message"} <span>↗︎</span></button>
                <p className="m2-cx-privacy">We respect your privacy. Your information is safe with us.</p>
              </div>
              {status === "error" && <p className="m2-cx-error" role="alert">{error} Or email us directly at {mailto}.</p>}
            </form>
          )}
        </div>

        <aside className="m2-cx-side">
          <div className="m2-cx-card m2-cx-book">
            <h3>Prefer to talk first?</h3>
            <p className="m2-cx-book-sub">Schedule a free 30-minute call to talk through where you are and where we can help. No prep needed.</p>
            <a className="m2-button m2-button-secondary" href={bookHref()} onClick={bookClick} data-book-placement="connect-side" {...bookProps()}>Schedule a 30-minute call <span>↗︎</span></a>
            <p className="m2-cx-book-label">What to expect</p>
            <ul className="m2-cx-expect">
              {expectItems.map((it) => (
                <li key={it.title}><span className="m2-cx-expect-ic"><CxIcon name={it.icon} /></span><div><strong>{it.title}</strong><p>{it.body}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="m2-cx-card">
            <h3>Contact information</h3>
            <ul className="m2-cx-contact">
              <li><CxIcon name="mail" />{mailto}</li>
              <li><CxIcon name="pin" />Based in the Pacific Northwest</li>
            </ul>
          </div>
          <div className="m2-cx-card m2-cx-respond">
            <span className="m2-cx-expect-ic"><CxIcon name="clock" /></span>
            <div><strong>We usually respond</strong><p>Within two business days</p></div>
          </div>
        </aside>
      </section>

      </main>

      <SiteFooter cta={false} />
    </div>
  );
}
