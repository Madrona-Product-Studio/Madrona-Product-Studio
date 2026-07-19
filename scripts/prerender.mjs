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
    description: 'A small, senior product studio in Bellingham, Washington. We help companies figure out what to build, then build it. Every engagement starts with a free 45-minute conversation.',
    h1: 'We turn ideas into working products.',
    body: 'Madrona Product Studio is a small, senior product studio in Bellingham, Washington, serving the Pacific Northwest and beyond. We help companies figure out what to build, then build it. Every engagement starts with a free 45-minute conversation with a published agenda.',
  },
  '/work': {
    title: 'Work · Madrona Product Studio',
    description: 'Recent product work from Madrona Product Studio.',
    h1: 'Products we\'ve shipped',
    body: 'Studio products at every stage. Lila Trips, San Juan Boating Guide, Helm, GardenHQ, Plainly, Aria Health, Lila Yoga, HikerLink, Utah Trip Guide.',
  },
  '/how-it-works': {
    title: 'How it works · Madrona Product Studio',
    description: 'A free 45-minute conversation with a published agenda, a short written assessment, then a scoped proposal if it makes sense. How every Madrona engagement starts.',
    h1: 'How it works',
    body: 'Step one: a free 45-minute conversation with a published agenda covering where you are at, where you have been, your biggest opportunities to grow or get more efficient, and what is already on your mind. Step two: a short written assessment of where we can help. Step three: a scoped proposal with scope, cost, and approach.',
  },
  '/services': {
    title: 'Services · Madrona Product Studio',
    description: 'Madrona works across the whole arc of a business: demand (brand, web, content, marketing, e-commerce), operations (blueprinting, efficiencies, AI agents), and channel & fulfillment (DTC, ordering, booking).',
    h1: 'What we do',
    body: 'Demand: brand, web presence, content, performance marketing, e-commerce. Operations: service blueprinting, efficiencies, AI agents and tools, with agentic operations as the flagship. Channel and fulfillment: direct-to-consumer channels, online ordering, booking, fulfillment support.',
  },
  '/services/agentic-operations': {
    title: 'Agentic operations · Madrona Product Studio',
    description: 'Business agents on your real workflows, and one command surface that shows the whole operation. Madrona runs its own studio this way, and builds the same architecture for clients.',
    h1: 'Agentic operations',
    body: 'Business agents working real workflows on a schedule, and a command surface rendered from one source of truth. A worked example: the industry agent, a base knowledge file, a scheduled sweep, a what-changed digest, signals routed to action. We run our own operation this way, with Helm as the command center. First engagements start with one agent and one dashboard card.',
  },
  '/approach': {
    title: 'Approach · Madrona Product Studio',
    description: 'The philosophy behind Madrona Product Studio: strategy and software made by the same people, in short, high-signal engagements.',
    h1: 'How we work',
    body: 'Strategy without software is a slide deck. Software without strategy is a feature factory. We do both, together: one senior lead, a trusted network, AI where it pulls its weight.',
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
    description: 'About Charlie Koch and Madrona Product Studio. A senior product leader with a network of designers, engineers, and researchers. Based in Bellingham, Washington.',
    h1: 'About',
    body: 'Founded by Charlie Koch. A senior product leader at the center, with a trusted network of designers, engineers, and researchers. Based in Bellingham, Washington, serving Whatcom County and the Pacific Northwest.',
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
