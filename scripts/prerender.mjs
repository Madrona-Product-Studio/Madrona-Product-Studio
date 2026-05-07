import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import http from 'http';
import handler from 'serve-handler';

const routes = [
  '/',
  '/work',
  '/approach',
  '/writing',
  '/about',
  '/work/lila-trips',
  '/work/san-juan-boating-guide',
  '/work/aria-health',
  '/work/lila-yoga',
  '/work/utah-trip-guide',
  '/work/hikerlink',
  '/work/rei-adventures',
  '/work/rei-cooperative-action',
  '/work/healthline-bezzy-daily-dose',
  '/work/rei-membership',
];

const distDir = path.resolve('dist');

async function prerender() {
  // Serve dist with SPA fallback so all routes resolve to index.html
  const server = http.createServer((req, res) =>
    handler(req, res, {
      public: distDir,
      rewrites: [{ source: '**', destination: '/index.html' }],
    })
  );
  await new Promise(resolve => server.listen(4173, resolve));

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route}...`);

    await page.goto(url, { waitUntil: 'networkidle0' });
    const html = await page.content();

    const filePath = route === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, route, 'index.html');

    const dir = path.dirname(filePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, html);
  }

  await browser.close();
  server.close();
  console.log(`\nPrerendered ${routes.length} routes.`);
}

prerender().catch(err => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
