# Pre-launch checklist — madronaproduct.com

Run this gate before any big update merges to `main`. First run: 2026-08-01
(practice-frame redesign, ~35 commits). Companion to the `investor-ready`
skill (which covers the *audit*; this covers the *push*).

## A · Content & claims

- [ ] **Advertised-link inventory as a set** — `grep -rhoE 'href="/[a-z#-]*"' src/pages/lab/*.tsx | sort -u`. Every advertised destination is *ready to be seen*, not just alive. Inverse too: no real page missing from nav/footer.
- [ ] Every external product link returns 200 AND is safe to share (stage labels truthful; Helm only ever via `?demo=1`).
- [ ] No internal/working pages routed (briefs, labs, experiments).
- [ ] Naming consistent across surfaces (product names, thesis name, CTA verb).
- [ ] Copy rules: no em-dashes, no "transformation" language, thesis never the hero (site `CLAUDE.md` §Structural moves).

## B · Technical gate

- [ ] `npm run build` green (typecheck + prerender + sitemap) and `npm run lint` clean.
- [ ] **Production preview smoke** (`npx vite preview`), not just the dev server: every route × 1440px + 390px — correct `<h1>`, correct `<title>`, zero console/network errors. (Local 404 on `/_vercel/insights/script.js` is expected — Vercel serves it in prod.)
- [ ] Placeholder routes noindexed AND excluded from `dist/sitemap.xml` AND not linked from any advertised surface.
- [ ] og image/meta current (check `og:image:alt` against the live tagline), favicons real (not template boilerplate), robots.txt points at the sitemap.
- [ ] `vercel.json` SPA fallback covers removed/unknown routes; catch-all `<Route path="*">` lands home, not blank.
- [ ] Analytics wired in code (`@vercel/analytics` `inject()` — the dashboard toggle alone does nothing for a Vite SPA).
- [ ] Serverless env vars documented and set in Vercel (`RESEND_API_KEY`, optional `CONTACT_TO`/`CONTACT_FROM`).

## C · Merge & deploy

- [ ] Branch pushed and current; merge `main` cleanly (no force-push, resolve keeping both sides' real changes).
- [ ] Push `main`; watch the Vercel deploy go green.

## D · Post-deploy verification (within minutes of going live)

- [ ] Spot-load every route on the live domain (mobile + desktop once each).
- [ ] `curl -s https://madronaproduct.com | grep og:image` — og meta live; paste the URL into a link-preview debugger once.
- [ ] `https://madronaproduct.com/_vercel/insights/script.js` returns 200; first pageviews appear in the Vercel Analytics dashboard.
- [ ] Submit the contact form for real; confirm the email arrives.
- [ ] Click the booking link; confirm the Google appointment page books.
- [ ] Click the LinkedIn footer link (bots can't verify it; a human must).
- [ ] `https://madronaproduct.com/sitemap.xml` and `/robots.txt` serve the new versions.

## Human-only items (can't be automated)

- LinkedIn link, real form submission, real booking, analytics dashboard.
- The judgment calls log: which apps are public-ready, custom `.app` domains
  for the `*.vercel.app` products (open item, 2026-08-01).
