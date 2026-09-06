/**
 * Lightweight SEO prerender, no browser needed.
 *
 * Reads the per-route metadata table in src/data/siteMeta.mjs (the same
 * table LabMeta applies on client navigation) and writes a static HTML file
 * for each route with the right head tags and real content in a <noscript>
 * block so crawlers index it. The React app hydrates on top for interactive
 * users. Also emits dist/404.html (Vercel serves it with a 404 status for
 * unknown paths) and sitemap.xml.
 */
import fs from 'fs';
import path from 'path';
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
      author: { '@type': 'Person', name: 'Charlie Koch', url: `${SITE_ORIGIN}/charlie` },
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

  // Inject SEO content in a noscript block so Google sees real text. Article
  // routes emit their full verbatim prose; other routes fall back to the summary.
  const innerSeo = seoHtml
    ?? (route && articleContent[route]
      ? renderSections(articleContent[route])
      : `<h1>${escapeHtml(meta.h1)}</h1>\n      <p>${escapeHtml(meta.body)}</p>`);
  const seoBlock = `
    <noscript>
      ${innerSeo}
    </noscript>`;
  html = replaceTag(html, /<div id="root"><\/div>/, `<div id="root"></div>${seoBlock}`);

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

// The 404 shell: same app, the NotFound copy in noscript, no canonical, noindex.
const notFoundHtml = generateHtml(null, {
  title: notFound.title,
  description: notFound.body,
  h1: notFound.h1,
  body: notFound.body,
}, {
  noindex: true,
  seoHtml:
    `<h1>${escapeHtml(notFound.h1)}</h1>\n      <p>${escapeHtml(notFound.body)}</p>\n      <ul>` +
    notFound.links.map((l) => `<li><a href="${l.to}">${escapeHtml(l.label)}</a></li>`).join('') +
    `</ul>`,
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
