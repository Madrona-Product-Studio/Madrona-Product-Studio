/**
 * Lightweight SEO prerender — no browser needed.
 *
 * Reads the case study data and page metadata, then generates
 * a static HTML file for each route with real content in a
 * <noscript> block so Google can index it. The React app hydrates
 * on top for interactive users.
 */
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Page metadata for static pages
const pages = {
  '/': {
    title: 'Madrona Product Studio · Bellingham, Washington',
    description: 'A small, senior product studio in Bellingham, Washington. We help established businesses improve how they look, sell, and operate. We clarify the problem, design the right solution, and build it with a small senior team.',
    h1: 'Good businesses around here deserve software as good as they are.',
    body: 'Madrona is a small, senior digital product studio in the Pacific Northwest. We help established businesses improve how they look, sell, and operate: their brand and web presence, growing and keeping customers, and streamlining operations with practical tools and AI. Every engagement is led personally by Charlie Koch, with senior specialists brought in as the work calls for them. We also build and run our own products.',
  },
  '/services': {
    title: 'Services · Madrona Product Studio',
    description: 'Three ways to move a business forward: your brand and web presence, growing and keeping customers, and operations and AI. Strategy, design, and technology from a small senior team in the Pacific Northwest.',
    h1: 'Services',
    body: 'Madrona helps established businesses improve how they look, sell, and operate. Brand and web presence: new websites, brand and identity, content, and online stores. Customers and growth: acquisition, loyalty and retention, lifecycle email and text, reviews. Operations and AI: workflow fixes, small internal tools, and AI agents on your real workflows. Every engagement names its win before the work starts.',
  },
  '/about': {
    title: 'About · Madrona Product Studio',
    description: 'About Charlie Koch and Madrona Product Studio. A senior product leader with a network of designers, engineers, and researchers. Based in Bellingham, Washington.',
    h1: 'About',
    body: 'Founded by Charlie Koch. A senior product leader at the center, with a trusted network of designers, engineers, and researchers. Based in Bellingham, Washington, serving Whatcom County and the Pacific Northwest.',
  },
  '/apps': {
    title: 'Our apps · Madrona Product Studio',
    description: 'The products Madrona builds and runs: Lila Trips, the San Juan Boating Guide, Lila Yoga, Aria Health, Helm, Garden HQ, Plainly, and Hiker Link. Operating our own products keeps the work honest.',
    h1: 'Our apps',
    body: 'We build and operate our own products to solve real problems, test new ideas, and stay close to what it takes to make useful software last. Live today: Lila Trips and the San Juan Boating Guide. In development: Lila Yoga, Aria Health, Helm, Garden HQ, Plainly, and Hiker Link.',
  },
  '/connect': {
    title: 'Connect · Madrona Product Studio',
    description: 'Book a 30-minute call or send us a message about your project. Every path begins with a free 30-minute conversation with a published agenda.',
    h1: "Let's connect.",
    body: "Whatever's easiest: book a 30-minute call or send a message about your project. Every way in starts the same, a free 30-minute conversation with a published agenda. Email hello@madronaproduct.com.",
  },
};

function generateHtml(route, meta) {
  let html = template;

  // Update <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  // Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description.replace(/"/g, '&quot;')}" />`
  );

  // Update OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
  );

  // Update Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title.replace(/"/g, '&quot;')}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description.replace(/"/g, '&quot;')}" />`
  );

  // Add canonical URL
  const canonical = `<link rel="canonical" href="https://madronaproduct.com${route === '/' ? '' : route}" />`;
  html = html.replace('</head>', `  ${canonical}\n  </head>`);

  // Keep placeholder routes out of the search index
  if (meta.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex" />\n  </head>`);
  }

  // Inject SEO content in a noscript block so Google sees real text
  const seoBlock = `
    <noscript>
      <h1>${meta.h1}</h1>
      <p>${meta.body}</p>
    </noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${seoBlock}`);

  return html;
}

// Generate files
let count = 0;
for (const [route, meta] of Object.entries(pages)) {
  const html = generateHtml(route, meta);

  const filePath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route, 'index.html');

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);
  count++;
  console.log(`Generated ${route}`);
}

console.log(`\nPrerendered ${count} routes.`);

// Generate sitemap.xml from the same route set, so it can never drift from the
// pages we actually build. Excludes noindex (placeholder) routes.
const sitemapRoutes = Object.keys(pages).filter((route) => !pages[route].noindex);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapRoutes
    .map((route) => `  <url><loc>https://madronaproduct.com${route}</loc></url>`)
    .join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${sitemapRoutes.length} routes.`);
