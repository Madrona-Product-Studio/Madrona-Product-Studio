import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import { BOOKING_URL, TEXT_NUMBER } from "../data/booking";

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Record<string, unknown>) => void;
  }
}

type Status = "idle" | "submitting" | "success" | "error";

const FIELD =
  "w-full bg-card border border-line rounded px-4 py-3 text-ink placeholder:text-muted " +
  "focus:border-madrona focus:outline-none focus:ring-1 focus:ring-madrona/40 transition-colors";

const BTN =
  "press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm " +
  "hover:bg-madrona-dark no-underline disabled:opacity-60 disabled:cursor-not-allowed";

export default function Connect() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value, // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please email hello@madronaproduct.com.");
        setStatus("error");
        return;
      }
      window.gtag?.("event", "contact_submit", { event_category: "engagement" });
      setStatus("success");
    } catch {
      setError("Couldn't reach the server. Please email hello@madronaproduct.com.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl">
      <PageMeta
        title="Connect"
        description="Three ways to start: book a 30-minute call, send a message, or text. Every path begins with a free 30-minute conversation with a published agenda."
      />
      <section>
        <h1 className="mb-5">Let's connect.</h1>
        <p className="text-ink70 text-lg leading-relaxed mb-12">
          Whatever's easiest for you. Every way in starts the same: a free
          30-minute conversation, and{" "}
          <Link to="/how-it-works" className="text-madrona hover:text-madrona-dark transition-colors">
            the agenda is published
          </Link>
          . No pitch, no pressure.
        </p>

        {/* 1 — Book a call: the quickest way in */}
        <div className="border-t border-line pt-8 mb-10">
          <h2 className="text-xl mb-2">Book a 30-minute call</h2>
          <p className="text-ink70 leading-relaxed mb-5">
            Grab a time that works. We'll talk through where you're at and
            where we could help.
          </p>
          {BOOKING_URL && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={BTN}
            >
              Pick a time
            </a>
          )}
        </div>

        {/* 2 — Text: renders only once a business number is wired (see booking.ts) */}
        {TEXT_NUMBER && (
          <div className="border-t border-line pt-8 mb-10">
            <h2 className="text-xl mb-2">Send a text</h2>
            <p className="text-ink70 leading-relaxed mb-5">
              Prefer to keep it quick? Text us and we'll take it from there.
            </p>
            <a href={`sms:${TEXT_NUMBER}`} className={BTN}>
              Send a text
            </a>
          </div>
        )}

        {/* 3 — Send a message: the form (emails us, reply-to you) */}
        <div className="border-t border-line pt-8">
          <h2 className="text-xl mb-2">Send a message</h2>
          {status === "success" ? (
            <div className="border-l-2 border-madrona/40 pl-6 py-1 mt-4">
              <p className="text-ink font-medium mb-1">Thanks, we got it.</p>
              <p className="text-ink70 leading-relaxed">
                We'll be in touch soon. If it's urgent, email us directly at{" "}
                <a href="mailto:hello@madronaproduct.com">hello@madronaproduct.com</a>.
              </p>
            </div>
          ) : (
            <>
              <p className="text-ink70 leading-relaxed mb-6">
                Tell us what you're building and we'll reply with times.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                    What are you building?
                  </label>
                  <textarea id="message" name="message" required rows={5} className={FIELD} />
                </div>

                {/* Honeypot — hidden from humans, catches bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="company">Company (leave blank)</label>
                  <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-madrona-dark">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={status === "submitting"} className={BTN}>
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-muted text-sm mt-10">
          Prefer your own email client? <a href="mailto:hello@madronaproduct.com">hello@madronaproduct.com</a>
        </p>
      </section>
    </div>
  );
}
