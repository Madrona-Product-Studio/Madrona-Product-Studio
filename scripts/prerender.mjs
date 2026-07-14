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
    title: 'Madrona Product Studio · Senior Product Studio, Pacific Northwest',
    description: 'We help companies figure out what to build, and then build it. Strategy sprints, rapid prototyping, and fractional product leadership.',
    h1: 'We turn ideas into working products.',
    body: 'Madrona Product Studio is a small, senior product studio based in the Pacific Northwest. We help companies figure out what to build, and then build it. Strategy sprints. Rapid prototyping. Fractional product leadership.',
  },
  '/work': {
    title: 'Work · Madrona Product Studio',
    description: 'Recent product work and selected experience from Madrona Product Studio.',
    h1: 'Products we\'ve shipped',
    body: 'Studio projects and client engagements. Lila Trips, San Juan Boating Guide, Aria Health, Lila Yoga, Utah Trip Guide, HikerLink.',
  },
  '/approach': {
    title: 'Approach · Madrona Product Studio',
    description: 'How Madrona Product Studio works: strategy sprints, rapid prototyping, and fractional product leadership.',
    h1: 'How we work',
    body: 'Strategy sprints, rapid prototyping, and fractional product leadership. A small, senior team that thinks and builds together.',
  },
  '/writing': {
    title: 'Writing · Madrona Product Studio',
    description: 'Articles and essays from Madrona Product Studio.',
    h1: 'Writing',
    body: 'Articles and essays on product strategy, design, and building things that matter.',
    // Placeholder content — keep out of the sitemap and search index until real articles ship.
    noindex: true,
  },
  '/about': {
    title: 'About · Madrona Product Studio',
    description: 'About Charlie Koch and Madrona Product Studio. A senior product leader with a network of designers, engineers, and researchers.',
    h1: 'About',
    body: 'Founded by Charlie Koch. A senior product leader at the center, with a trusted network of designers, engineers, and researchers.',
  },
  '/contact': {
    title: 'Contact · Madrona Product Studio',
    description: "Tell us what you're building. We'll figure out together whether there's a fit.",
    h1: "Let's talk about what you're building.",
    body: "Whether you're shaping a strategy, proving a concept, or looking for a senior product partner, we'd love to hear what you're working on. Email hello@madronaproduct.com.",
  },
};

// Load case study data by parsing the TS file for slugs, titles, taglines, and opportunities
const caseStudiesFile = fs.readFileSync(
  path.resolve('src/data/caseStudies.ts'),
  'utf-8'
);

// Extract case studies with a simple regex approach
const studyRegex = /slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?tagline:\s*\n?\s*"([^"]+)"[\s\S]*?opportunity:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;

let match;
while ((match = studyRegex.exec(caseStudiesFile)) !== null) {
  const [, slug, title, tagline, opportunity] = match;
  const opp = opportunity.replace(/\\"/g, '"').replace(/\\n/g, ' ');
  pages[`/work/${slug}`] = {
    title: `${title} · Madrona Product Studio`,
    description: tagline,
    h1: title,
    body: `${tagline} ${opp}`,
  };
}

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
