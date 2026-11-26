/**
 * Build-time prerender, no browser needed.
 *
 * Reads the per-route metadata table in src/data/siteMeta.mjs (the same
 * table LabMeta applies on client navigation) and writes a static HTML file
 * for each route with the right head tags and the page's full text in the
 * page itself: the site menu, real headings, paragraphs, lists and links,
 * inside #root. The text is read off the real React components, rendered
 * here through Vite (src/prerender-entry.ts) and reduced to plain blocks by
 * scripts/page-text.mjs. The app mounts over it (createRoot replaces what is
 * in #root), so a visitor with JavaScript sees no change; a reader without
 * it, such as an AI agent or a crawler, gets the whole page.
 *
 * From the same blocks it also writes plain markdown copies of the core
 * pages and /llms.txt, so none of them can disagree with the page. Also emits
 * dist/404.html (Vercel serves it with a 404 status for unknown paths) and
 * sitemap.xml.
 */
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import { htmlToBlocks, blocksToHtml, blocksToMarkdown, wordCount } from './page-text.mjs';
import {
  pages, notFound, SITE_ORIGIN, resolveOgImage, ogImageAlt,
} from '../src/data/siteMeta.mjs';

const distDir = path.resolve('dist');
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// Full, verbatim article prose per route (headings, paragraphs, lists, quotes),
// extracted from the article components. Baked into the static SEO block below so
// crawlers see the complete essay on the first pass, not just a teaser. Keep in
// sync with the React article components when their copy changes.
const articleContent = JSON.parse(
  fs.readFileSync(path.resolve('scripts/thinking-content.json'), 'utf-8')
);

// Articles written as data (src/data/articles/*.json) render from the same file
// the page reads, so their crawler copy cannot drift. Flatten each to sections.
const dataArticleDir = path.resolve('src/data/articles');
for (const file of fs.existsSync(dataArticleDir) ? fs.readdirSync(dataArticleDir) : []) {
  if (!file.endsWith('.json')) continue;
  const a = JSON.parse(fs.readFileSync(path.join(dataArticleDir, file), 'utf-8'));
  const out = [{ type: 'h1', text: a.title }, { type: 'p', text: a.standfirst }];
  for (const sec of a.sections) {
    out.push({ type: 'h2', text: sec.title });
    for (const b of sec.blocks) {
      if (b.type === 'prompt') out.push({ type: 'h3', text: b.title }, { type: 'p', text: b.why }, { type: 'quote', text: b.text });
      else out.push({ type: b.type === 'link' ? 'p' : b.type, text: b.text });
    }
  }
  articleContent[a.href] = out;
}

// The real pages, rendered once per route. Vite loads the app the way the dev
// server does (same plugins, same image imports), without serving anything.
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
const app = await vite.ssrLoadModule('/src/prerender-entry.ts');

// Pages that also get a plain markdown copy, linked from llms.txt.
const markdownCopies = {
  '/': '/index.md',
  '/services': '/services.md',
  '/services/ai-operations': '/services/ai-operations.md',
  '/connect': '/connect.md',
};

// A page whose render comes back thinner than this falls back to the summary.
const MIN_WORDS = 40;

// The plain copy sits in #root until the app mounts over it. It is kept off
// screen (not display:none) so nothing flashes before the app paints; with
// JavaScript off, the noscript rule puts it back on the page as the page.
const PLAIN_STYLE =
  `<style>[data-plain]{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}</style>` +
  `<noscript><style>[data-plain]{position:static;width:auto;height:auto;margin:0 auto;padding:2rem 1.25rem;max-width:44rem;overflow:visible;clip-path:none;white-space:normal;line-height:1.55}</style></noscript>`;

// "$300, credited toward setup" -> a fixed price; "From $1,500" -> a floor;
// anything else ("Quoted after setup") carries no number. Recurring prices
// ("/mo") are left as words. Nothing is stated here that the page does not.
function priceFields(price) {
  if (/\/mo|month/i.test(price)) return {};
  const fixed = price.match(/^\$([\d,]+)/);
  if (fixed) return { price: fixed[1].replace(/,/g, ''), priceCurrency: 'USD' };
  const from = price.match(/^From \$([\d,]+)/i);
  if (from) {
    return { priceSpecification: { '@type': 'PriceSpecification', minPrice: from[1].replace(/,/g, ''), priceCurrency: 'USD' } };
  }
  return {};
}

// Service and offer structured data, built from the same steps the page
// renders (src/data/offer.ts), so the two cannot disagree.
const serviceOffers = {
  '/services/ai-operations': { serviceType: 'AI & Operations', steps: app.AI_PATH },
};

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => escapeHtml(s).replace(/"/g, '&quot;');

// Render an ordered section list to semantic HTML, grouping runs of list items
// into a single <ul>. Skips empty/purely-numeric fragments.
function renderSections(sections) {
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
  for (const { type, text } of sections) {
    const t = (text || '').trim();
    if (!t || /^[\d\s.]+$/.test(t)) continue;
    if (type === 'li') {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${escapeHtml(t)}</li>`);
      continue;
    }
    closeList();
    if (type === 'h1') out.push(`<h1>${escapeHtml(t)}</h1>`);
    else if (type === 'h2') out.push(`<h2>${escapeHtml(t)}</h2>`);
    else if (type === 'h3') out.push(`<h3>${escapeHtml(t)}</h3>`);
    else if (type === 'quote') out.push(`<blockquote>${escapeHtml(t)}</blockquote>`);
    else out.push(`<p>${escapeHtml(t)}</p>`);
  }
  closeList();
  return out.join('\n      ');
}

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: template is missing ${pattern}`);
  return html.replace(pattern, replacement);
}

// Fill the head for one route. `route` may be null for the 404 shell.
function generateHtml(route, meta, { seoHtml, noindex = false } = {}) {
  // (seoHtml is the plain copy of the page, already rendered.)
  let html = template;
  const url = route ? `${SITE_ORIGIN}${route === '/' ? '' : route}` : SITE_ORIGIN;
  const ogImage = `${SITE_ORIGIN}${resolveOgImage(route || '/', meta)}`;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = replaceTag(html, /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${attr(meta.description)}" />`);
  html = replaceTag(html, /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${attr(meta.title)}" />`);
  html = replaceTag(html, /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${attr(meta.description)}" />`);
  html = replaceTag(html, /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`);
  html = replaceTag(html, /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`);
  html = replaceTag(html, /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`);
  html = replaceTag(html, /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`);
  html = replaceTag(html, /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`);
  html = replaceTag(html, /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${attr(ogImageAlt(meta))}" />`);

  // Article pages advertise the right OpenGraph type + publish date.
  if (meta.article) {
    html = replaceTag(html, /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="article" />`);
    html = html.replace('</head>', `  <meta property="article:published_time" content="${meta.article.datePublished}" />\n  </head>`);
    if (meta.article.dateModified) {
      html = html.replace('</head>', `  <meta property="article:modified_time" content="${meta.article.dateModified}" />\n  </head>`);
    }
  }

  // Canonical URL (only for real routes; the 404 shell has none).
  if (route) {
    html = html.replace('</head>', `  <link rel="canonical" href="${url}" />\n  </head>`);
  }

  // Keep internal / placeholder routes and the 404 out of the search index.
  if (noindex || meta.noindex) {
    html = html.replace('</head>', `  <meta name="robots" content="noindex" />\n  </head>`);
  }

  // Article structured data.
  if (meta.article && route) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1.replace(/\.$/, ''),
      description: meta.description,
      image: [ogImage],
      datePublished: meta.article.datePublished,
      dateModified: meta.article.dateModified || meta.article.datePublished,
      author: { '@type': 'Person', name: 'Charlie Koch', url: `${SITE_ORIGIN}/about` },
      publisher: {
        '@type': 'Organization',
        name: 'Madrona Product Studio',
        url: SITE_ORIGIN,
        logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/brand/frond-icon-512.png` },
      },
      mainEntityOfPage: url,
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(ld)}</script>\n  </head>`);
  }

  // FAQ structured data, where a page carries a Q&A section.
  if (meta.faq) {
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: meta.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n  </head>`);
  }

  // Service and offer structured data, where a page states its steps and prices.
  if (route && serviceOffers[route]) {
    const { serviceType, steps } = serviceOffers[route];
    const serviceLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceType,
      serviceType,
      description: meta.description,
      url,
      provider: { '@type': 'ProfessionalService', name: 'Madrona Product Studio', url: SITE_ORIGIN },
      offers: steps.map((step) => ({
        '@type': 'Offer',
        name: step.name,
        description: `${step.line} ${step.price}.`,
        url: `${url}#${step.id}`,
        ...priceFields(step.price),
      })),
    };
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(serviceLd)}</script>\n  </head>`);
  }

  // Point readers at the markdown copy where there is one.
  if (route && markdownCopies[route]) {
    html = html.replace('</head>', `  <link rel="alternate" type="text/markdown" href="${markdownCopies[route]}" />\n  </head>`);
  }

  // The plain copy of the page goes inside #root, where the app mounts over
  // it. The fallback (a page that could not be rendered) is the summary.
  const innerSeo = seoHtml
    ?? (route && articleContent[route]
      ? renderSections(articleContent[route])
      : `<h1>${escapeHtml(meta.h1)}</h1>\n      <p>${escapeHtml(meta.body)}</p>`);
  html = html.replace('</head>', `  ${PLAIN_STYLE}\n  </head>`);
  html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root"><div data-plain>
      ${innerSeo}
    </div></div>`);

  return html;
}

// Render one route to its plain blocks. Internal (noindex) pages keep their
// short summary: they are routable but not written out in full for readers.
// A page that fails to render, or comes back nearly empty, falls back too,
// and says so in the build log.
async function pageBlocks(route, meta) {
  if (meta.noindex) return null;
  try {
    const blocks = htmlToBlocks(await app.renderRoute(route));
    const mainWords = wordCount(blocks.filter((b) => b.region === 'main'));
    if (mainWords < MIN_WORDS) {
      console.warn(`WARNING ${route}: rendered only ${mainWords} words; using the summary instead.`);
      return null;
    }
    return blocks;
  } catch (err) {
    console.warn(`WARNING ${route}: could not render (${String(err.message).split('\n')[0]}); using the summary instead.`);
    return null;
  }
}

// Generate files
let count = 0;
const rendered = {};
for (const [route, meta] of Object.entries(pages)) {
  const blocks = await pageBlocks(route, meta);
  if (blocks) rendered[route] = blocks;
  const html = generateHtml(route, meta, blocks ? { seoHtml: blocksToHtml(blocks) } : {});
  const filePath = route === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, route, 'index.html');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);
  count++;
  console.log(`Generated ${route}${blocks ? ` (${wordCount(blocks)} words)` : ' (summary)'}`);
}
console.log(`\nPrerendered ${count} routes, ${Object.keys(rendered).length} with their full text.`);

// Markdown copies of the core pages: the page's own blocks, nothing added.
for (const [route, file] of Object.entries(markdownCopies)) {
  if (!rendered[route]) throw new Error(`prerender: no rendered text for ${route}, so ${file} cannot be written`);
  const body = blocksToMarkdown(rendered[route], SITE_ORIGIN);
  const filePath = path.join(distDir, file);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${body}\nSource: ${SITE_ORIGIN}${route === '/' ? '' : route}\n`);
  console.log(`Generated ${file}`);
}

// llms.txt: a short index for AI agents. Every sentence in it is one the site
// already states (the metadata table, the offer steps, the contact details);
// only the section labels are new.
const pageLine = (route) =>
  `- [${pages[route].title.split(' · ')[0]}](${SITE_ORIGIN}${route === '/' ? '' : route}): ${pages[route].description}`;
const llmsTxt = [
  `# Madrona Product Studio`,
  ``,
  `> ${pages['/'].description}`,
  ``,
  `## Pages as plain markdown`,
  ``,
  ...Object.entries(markdownCopies).map(([route, file]) =>
    `- [${pages[route].title.split(' · ')[0]}](${SITE_ORIGIN}${file}): ${pages[route].description}`),
  ``,
  `## AI & Operations: the steps and what each costs`,
  ``,
  ...app.AI_PATH.map((step) =>
    `- [${step.name}](${SITE_ORIGIN}/services/ai-operations#${step.id}): ${step.line} ${step.price}.`),
  ``,
  `## How to start`,
  ``,
  `- [${pages[app.CONTACT_PATH].title.split(' · ')[0]}](${SITE_ORIGIN}${app.CONTACT_PATH}): ${pages[app.CONTACT_PATH].description}`,
  `- Email: ${app.CONTACT_EMAIL}. ${app.REPLY_PROMISE}`,
  ``,
  `## All pages`,
  ``,
  ...Object.keys(pages).filter((route) => !pages[route].noindex).map(pageLine),
  ``,
].join('\n');
fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt);
console.log('Generated llms.txt');

// The 404 shell: same app, the NotFound copy as its plain text, no canonical, noindex.
const notFoundHtml = generateHtml(null, {
  title: notFound.title,
  description: notFound.body,
  h1: notFound.h1,
  body: notFound.body,
}, {
  noindex: true,
  seoHtml:
    `<main><h1>${escapeHtml(notFound.h1)}</h1>\n      <p>${escapeHtml(notFound.body)}</p>\n      <ul>` +
    notFound.links.map((l) => `<li><a href="${l.to}">${escapeHtml(l.label)}</a></li>`).join('') +
    `</ul></main>`,
});
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log('Generated 404.html');

// Generate sitemap.xml from the same route set, so it can never drift from the
// pages we actually build. Excludes noindex (internal) routes. Articles carry
// <lastmod> from their dateModified; pages without a real date omit it.
const sitemapRoutes = Object.keys(pages).filter((route) => !pages[route].noindex);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapRoutes
    .map((route) => {
      const a = pages[route].article;
      const lastmod = a ? `<lastmod>${a.dateModified || a.datePublished}</lastmod>` : '';
      return `  <url><loc>${SITE_ORIGIN}${route === '/' ? '' : route}</loc>${lastmod}</url>`;
    })
    .join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${sitemapRoutes.length} routes.`);

await vite.close();
