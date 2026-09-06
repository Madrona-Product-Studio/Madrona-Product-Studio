/**
 * Shared request guards for the serverless functions under api/.
 *
 * Everything here is best-effort and in-memory: Vercel functions are
 * short-lived and run on more than one instance, so a limiter keyed in module
 * scope only holds for the life of one warm instance. That is still enough to
 * blunt a naive loop from a single client. The durable version is a Vercel WAF
 * rate-limit rule on `/api/(.*)` in the project dashboard (Firewall → Rules →
 * Rate limit); add that and treat this as the second line, not the first.
 *
 * Files under api/_lib are not deployed as functions (Vercel skips
 * underscore-prefixed paths); they are bundled into whatever imports them.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value);
}

// The caller's IP as Vercel reports it. `x-forwarded-for` is a comma list with
// the client first; `x-real-ip` is Vercel's own single-value header.
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export function isJsonRequest(request: Request): boolean {
  const type = request.headers.get("content-type") ?? "";
  return type.toLowerCase().startsWith("application/json");
}

// Sliding-window per-key limiter. Returns true when the key is over `limit`
// hits inside `windowMs`. Old timestamps are pruned on every call, and the
// map is capped so a flood of distinct keys cannot grow it without bound.
const windows = new Map<string, number[]>();
const MAX_KEYS = 5000;

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (windows.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    windows.set(key, hits);
    return true;
  }
  hits.push(now);
  if (!windows.has(key) && windows.size >= MAX_KEYS) {
    const oldest = windows.keys().next().value;
    if (oldest !== undefined) windows.delete(oldest);
  }
  windows.set(key, hits);
  return false;
}

// Per-instance daily counter, used as a best-effort spend guard on the
// model-backed routes. Resets when the UTC date changes, and independently on
// every cold start, so it bounds one instance's day rather than the account.
let dayKey = "";
let dayCount = 0;

export function overDailyCap(cap: number): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  if (dayCount >= cap) return true;
  dayCount += 1;
  return false;
}

// Read a string field off a parsed JSON body, trimmed and capped. Anything that
// is not a string (or is over the cap) collapses to the empty string, so a
// caller can treat "" as absent and never has to think about types.
export function str(data: Record<string, unknown>, key: string, max: number): string {
  const value = data[key];
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return trimmed.length > max ? "" : trimmed;
}

// A list of short strings (topics, chip ids). Non-string entries are dropped;
// the list is capped in count and per-item length.
export function strList(data: Record<string, unknown>, key: string, maxItems: number, maxLen: number): string[] {
  const value = data[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter((item) => item && item.length <= maxLen)
    .slice(0, maxItems);
}
