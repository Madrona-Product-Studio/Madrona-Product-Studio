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
    description: 'Madrona builds digital products, websites, and experiences for organizations doing meaningful work, and builds its own products to explore better ways of creating software.',
    h1: 'We build what should exist next.',
    body: 'Madrona builds digital products, websites, and experiences for organizations doing meaningful work. We also build our own products to explore better ways of creating software in the AI era.',
  },
  '/consulting': {
    title: 'How we help · Madrona Product Studio',
    description: 'We help you figure out what to build, then build it. Madrona works with founders, local businesses, and product teams; every engagement starts small and grows from there.',
    h1: 'How we help',
    body: 'Madrona works with founders, local businesses, and product teams. Four ways in, one practice: build trust, grow your business, work smarter, and build something worth using. We start with a 30-minute conversation, follow with a short written assessment, and recommend the smallest engagement worth doing.',
  },
  '/services': {
    title: 'Services · Madrona Product Studio',
    description: 'Four ways in, one practice: build trust, grow your business, work smarter, and build something worth using. Strategy, design, and technology from a small senior team in the Pacific Northwest.',
    h1: 'Services',
    body: 'We help you figure out what to build, then build it. Build trust: brand, websites, and digital experience. Grow your business: customer journeys, commerce, loyalty, and retention. Work smarter: workflow fixes, small internal tools, and practical AI on real workflows. Build something worth using: prototypes, MVPs, and new products taken from idea to real. Every engagement names its win before the work starts.',
  },
  '/thesis': {
    title: 'The Madrona Product Thesis · Madrona Product Studio',
    description: 'AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. A working theory from building.',
    h1: 'The Madrona Product Thesis',
    body: 'A point of view on how great software gets built in the AI era. The disciplines remain; the boundaries become more permeable. The advantage is no longer shipping more software, it is learning faster through software. Product leadership creates the conditions for a multidisciplinary team to solve important customer problems. AI is leverage; what matters is where we choose to apply it.',
  },
  '/about': {
    title: 'About · Madrona Product Studio',
    description: 'Building changed what Charlie Koch believes product leadership is for. Madrona is a working theory: can small, senior, AI-enabled teams build products differently, and better?',
    h1: 'About',
    body: 'Madrona exists to put the Madrona Product Thesis into practice. Our own products and client work are the evidence, built with trusted people across disciplines, and pointed at work that leaves the world a little better than we found it.',
  },
  '/apps': {
    title: 'Products · Madrona Product Studio',
    description: 'Products Madrona builds to solve real customer problems, create useful software, and practice better ways of building.',
    h1: 'Our products',
    body: 'Each Madrona product begins with a real customer problem and creates a place to test ideas, improve our methods, and make something useful in its own right.',
  },
  '/pov': {
    title: 'Our POV · Madrona Product Studio',
    description: 'How we see building software in the AI era: essays, artifacts, and guides from inside a working product studio. Published when the work has taught us something worth sharing.',
    h1: 'Our point of view.',
    body: 'Learnings, artifacts, and guides from inside Madrona. When the work teaches us something, we organize the thinking here so we can build on it, and so can you. The Madrona Product Thesis, Madrona under the hood, the era of agentic operations, and a starter guide to building with AI.',
  },
  '/pov/the-era-of-agentic-operations': {
    title: 'The era of agentic operations: running a business on AI agents · Madrona Product Studio',
    description: 'What agentic AI means for a real business: AI agents handle the workflow automation on a rhythm, one source of truth holds the state, and a person stays in charge. What changes, and how to start small.',
    article: { datePublished: '2026-08-05' },
    h1: 'The era of agentic operations.',
    body: 'A business used to run on scattered tools and someone’s memory. It can now run on one source of truth and a handful of agents on a rhythm: a nightly sweep, a morning pulse, a daily brief, a weekly sync, rendered live on a command surface. Agents propose; the owner decides and sends. The point is not automation, it is attention. We sell what we run: Madrona itself operates on this exact pattern.',
  },
  '/pov/starter-guide-to-building-with-ai': {
    title: 'A starter guide to building with AI: tools, setup, and first steps · Madrona Product Studio',
    description: 'How to start building software with AI: setting up GitHub, the terminal, Claude Code and Codex, deploying with Vercel, and the habits that make AI coding tools actually work. The guide I wish I had on day one.',
    article: { datePublished: '2026-08-05' },
    h1: 'A starter guide to building with AI.',
    body: 'You do not need a computer science degree to build real software with AI. This guide covers the whole setup in an afternoon: a GitHub account as your source of truth, comfort in the terminal, Claude Code and Codex as AI coding agents, Vercel deploying every change live, and Claude connectors that give your agent reach. Then the habits: build something real and small, ask why, look at everything, commit often. The tools are the easy part.',
  },
  '/pov/under-the-hood': {
    title: 'Madrona: under the hood — how we build software with AI · Madrona Product Studio',
    description: 'Inside an AI-assisted software development process that ships real products: the platform every project inherits, the quality gates that hold the bar, and the learning loop that compounds with every launch.',
    article: { datePublished: '2026-08-05' },
    h1: 'Madrona: under the hood.',
    body: 'Fifteen years of product judgment, encoded into a platform every project inherits: design systems, proven integrations, hardened code, standards, and quality gates. AI is the power tool; the engine is the judgment it executes. Every launch teaches it something new.',
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
  const canonical = `<link rel="canonical" href="https://www.madronaproduct.com${route === '/' ? '' : route}" />`;
  html = html.replace('</head>', `  ${canonical}\n  </head>`);

  // Keep placeholder routes out of the search index
  if (meta.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex" />\n  </head>`);
  }

  // Article structured data for Current entries (journal-style pages)
  if (meta.article) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1.replace(/\.$/, ''),
      description: meta.description,
      datePublished: meta.article.datePublished,
      author: { '@type': 'Person', name: 'Charlie Koch' },
      publisher: { '@type': 'Organization', name: 'Madrona Product Studio', url: 'https://www.madronaproduct.com' },
      mainEntityOfPage: `https://www.madronaproduct.com${route}`,
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`);
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
    .map((route) => `  <url><loc>https://www.madronaproduct.com${route}</loc></url>`)
    .join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${sitemapRoutes.length} routes.`);
