/**
 * Contact form handler — Vercel Serverless Function.
 *
 * Receives a JSON POST from the /contact page and emails it via Resend.
 * Required env vars (set in the Vercel project, all environments):
 *   RESEND_API_KEY  — from resend.com (the sending domain must be verified)
 *   CONTACT_TO      — where inquiries land (default: hello@madronaproduct.com)
 *   CONTACT_FROM    — verified sender (default: "Madrona Product Studio
 *                     <hello@madronaproduct.com>")
 *
 * Local testing requires `vercel dev` (functions don't run under `vite`).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO = process.env.CONTACT_TO || "hello@madronaproduct.com";
const FROM = process.env.CONTACT_FROM || "Madrona Product Studio <hello@madronaproduct.com>";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request): Promise<Response> {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  const honeypot = String(data.company ?? "").trim(); // bots fill hidden fields

  // Silently accept honeypot hits so bots don't learn they were caught.
  if (honeypot) return json({ ok: true });

  if (!name || !email || !message) {
    return json({ error: "Please fill in your name, email, and a message." }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ error: "That email doesn't look right." }, 400);
  }
  if (name.length > 200 || email.length > 200 || message.length > 5000) {
    return json({ error: "That's a bit long — please shorten it." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: "The form isn't configured yet. Email hello@madronaproduct.com." }, 500);
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New inquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json({ error: "Something went wrong sending your message. Please email us directly." }, 502);
  }

  return json({ ok: true });
}
