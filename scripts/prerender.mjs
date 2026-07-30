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
    description: 'Madrona is a small senior product studio building digital products, websites, and experiences, and helping teams adopt better ways of creating them in the AI era.',
    h1: 'We build what should exist next.',
    body: 'Madrona builds products and digital experiences for clients, builds its own products, and helps organizations strengthen how they build. The studio combines strategy, design, software, and practical AI-enabled methods in service of meaningful work.',
  },
  '/consulting': {
    title: 'How we help · Madrona Product Studio',
    description: 'Build the product and strengthen the team. Madrona helps organizations shape opportunities, create digital products and experiences, and evolve how they build.',
    h1: 'Build the product. Strengthen the team.',
    body: 'Work with Madrona to build products and experiences, shape an opportunity, or help your team build differently. Engagements adapt to the organization’s current stage, constraints, and strengths.',
  },
  '/services': {
    title: 'Services · Madrona Product Studio',
    description: 'Three ways to move a business forward: your brand and web presence, growing and keeping customers, and operations and AI. Strategy, design, and technology from a small senior team in the Pacific Northwest.',
    h1: 'Services',
    body: 'Madrona helps established businesses improve how they look, sell, and operate. Brand and web presence: new websites, brand and identity, content, and online stores. Customers and growth: acquisition, loyalty and retention, lifecycle email and text, reviews. Operations and AI: workflow fixes, small internal tools, and AI agents on your real workflows. Every engagement names its win before the work starts.',
  },
  '/about': {
    title: 'About · Madrona Product Studio',
    description: 'Madrona is a product-building practice led by Charlie Koch, combining client work, original products, and public learning in service of meaningful problems.',
    h1: 'About',
    body: 'Madrona exists to explore how great software is built in the AI era and direct that capability toward problems that matter. Charlie Koch leads each engagement with a trusted network of senior specialists.',
  },
  '/apps': {
    title: 'Products · Madrona Product Studio',
    description: 'Products Madrona builds to solve real customer problems, create useful software, and practice better ways of building.',
    h1: 'Our products',
    body: 'Each Madrona product begins with a real customer problem and creates a place to test ideas, improve our methods, and make something useful in its own right.',
  },
  '/thinking': {
    title: 'Thinking · Madrona Product Studio',
    description: 'Notes from Madrona on product leadership, small teams, responsible AI, and the changing craft of software creation.',
    h1: 'What we’re learning',
    body: 'Madrona shares what the work teaches us about product leadership, small teams, responsible AI, and the changing craft of software creation. The Teams That Build Next is forthcoming.',
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
