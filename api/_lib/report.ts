/**
 * Server-side error reporting to Sentry for the functions under api/.
 *
 * Off unless SENTRY_DSN is set. Reports carry where it failed and a status or
 * error class only: never the visitor's text, name or email. Awaited on the
 * error path so the event is sent before the function returns.
 */
import * as Sentry from "@sentry/node";

let ready: boolean | null = null;

function init(): boolean {
  if (ready !== null) return ready;
  const dsn = process.env.SENTRY_DSN;
  ready = Boolean(dsn);
  if (dsn) Sentry.init({ dsn, environment: process.env.VERCEL_ENV || "development", sendDefaultPii: false, tracesSampleRate: 0 });
  return ready;
}

export async function report(where: string, detail: string): Promise<void> {
  if (!init()) return;
  Sentry.captureException(new Error(`${where}: ${detail}`), { tags: { where } });
  await Sentry.flush(2000).catch(() => false);
}
