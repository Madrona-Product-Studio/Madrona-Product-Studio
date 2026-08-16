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

// Full, verbatim article prose per route (headings, paragraphs, lists, quotes),
// extracted from the article components. Baked into the static SEO block below so
// crawlers see the complete essay on the first pass, not just a teaser. Keep in
// sync with the React article components when their copy changes.
const articleContent = JSON.parse(
  fs.readFileSync(path.resolve('scripts/thinking-content.json'), 'utf-8')
);

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

// Page metadata for static pages
const pages = {
  '/': {
    title: 'Madrona Product Studio · Bellingham, Washington',
    description: 'Madrona helps businesses figure out what AI and modern tools can actually do for them, then builds it. Smoother operations, customers who come back, a web presence that earns trust.',
    h1: 'We build what should exist next.',
    body: 'Madrona helps businesses figure out what AI and modern tools can actually do for them, then builds it. Smoother operations, customers who come back, a web presence that earns trust. We run our own products and operations the same way, here in the PNW and beyond.',
  },
  '/checkup': {
    title: 'Where could we help? A free five-minute read · Madrona Product Studio',
    description: 'Four quick questions, an instant written read on where AI and better tools could genuinely help your business. Free, no email needed. From Madrona Product Studio in Bellingham, Washington.',
    h1: 'Tell us where the week goes. We\'ll tell you what we see.',
    body: 'Four quick questions. As you answer, your read assembles alongside, the same short written assessment we start every engagement with. It is yours to keep either way. Which of these sound like you? The website is just ok. Ordering still means somebody texts me. I lose hours every week to stuff a computer should be doing. People buy once, then I never hear from them again. Everyone says AI would help, I would not know where to start. Your read covers what we heard, the central problem, the strongest opportunity, what better looks like, and a first move. Drafted by our AI from your answers; the human read from Charlie is free too.',
  },
  '/consulting': {
    title: 'How we help · Madrona Product Studio',
    description: 'We help you figure out what to build, then build it. Four ways in, one practice: operations and AI, customers and growth, brand and web, and new products, from a small senior team in the Pacific Northwest.',
    h1: 'How we help',
    body: 'Madrona works with founders, local businesses, and product teams. Four ways in, one practice. Work smarter: practical AI and agents on real workflows, workflow fixes, and small internal tools. Grow your business: customer journeys, commerce, loyalty, and retention. Build trust: brand, websites, and digital experience. Build something worth using: prototypes, MVPs, and new products taken from idea to real. Every engagement names its win before the work starts. We begin with a 30-minute conversation, follow with a short written assessment, and recommend the smallest engagement worth doing.',
  },
  '/thesis': {
    title: 'The Madrona Product Thesis · Madrona Product Studio',
    description: 'AI is not eliminating Product, Design, or Engineering. It is expanding what each discipline can contribute as the cost of building software falls. A working theory from building.',
    article: { datePublished: '2026-08-05', dateModified: '2026-08-07' },
    h1: 'The Madrona Product Thesis',
    ogImage: '/og-pov-thesis.png',
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
  '/thinking': {
    title: 'Thinking · Madrona Product Studio',
    description: 'How we see building software in the AI era: essays, artifacts, and guides from inside a working product studio. Published when the work has taught us something worth sharing.',
    h1: 'Thinking.',
    ogImage: '/og-thinking.png',
    body: 'Learnings, artifacts, and guides from inside Madrona. When the work teaches us something, we organize the thinking here so we can build on it, and so can you. The Madrona Product Thesis, the engine behind everything we ship, the era of agentic operations, and a starter guide to building real software with AI.',
  },
  '/thinking/the-era-of-agentic-operations': {
    title: 'The era of agentic operations: running a business on AI agents · Madrona Product Studio',
    description: 'What agentic AI means for a real business: AI agents handle the workflow automation on a rhythm, one source of truth holds the state, and a person stays in charge. What changes, and how to start small.',
    article: { datePublished: '2026-08-05', dateModified: '2026-08-07' },
    h1: 'The era of agentic operations.',
    ogImage: '/og-pov-agentic-operations.png',
    body: 'A business used to run on scattered tools and someone’s memory. It can now run on one source of truth and a handful of agents on a rhythm: a nightly sweep, a morning pulse, a daily brief, a weekly sync, rendered live on a command surface. Agents propose; the owner decides and sends. The point is not automation, it is attention. We sell what we run: Madrona itself operates on this exact pattern.',
  },
  '/thinking/starter-guide-to-building-with-ai': {
    title: 'A starter guide to building real software with AI: setup, prompts, first steps · Madrona Product Studio',
    description: 'How to start building software with AI, in an afternoon: install Claude Code and Codex, set up GitHub and Vercel, the six copy-paste prompts that make AI coding agents actually work, your first build, and an honest FAQ.',
    article: { datePublished: '2026-08-05', dateModified: '2026-08-07' },
    h1: 'A starter guide to building real software with AI.',
    ogImage: '/og-pov-starter-guide.png',
    faq: [
      { q: 'What does building software with AI cost?', a: 'GitHub and Vercel have free tiers that will carry you a long way. The agents are the real cost: Claude Code comes with Claude Pro and Codex comes with ChatGPT Plus, each about $20 a month. Starting with just Claude Code is fine.' },
      { q: 'I am not on a Mac. Does this still work?', a: 'Yes. Everything runs on Windows and Linux too, and both installers cover all three. The guide reads Mac because that is what we work on, but nothing about the loop is Mac-only.' },
      { q: 'Do I need to know how to code?', a: 'No. You need to describe what you want clearly and look carefully at what you get back. The agents supply the syntax; you supply the judgment.' },
      { q: 'Can it break something?', a: 'The agents ask before running commands or changing files, and git means every committed change is saved and reversible. The honest risk is not a broken computer, it is shipping something you did not look at, which is what the habits are for.' },
      { q: 'What if the agent gets stuck?', a: 'Commit what works, clear the conversation, and restate the goal in one sentence. If it is still circling, ask the other agent. A second opinion usually breaks the loop, which is half the reason we run two.' },
      { q: 'How long until I have something real?', a: 'An afternoon for the setup, a weekend for a first version you can put in front of someone. The loop is fast; the judgment takes longer, and that part is the fun.' },
    ],
    body: 'You do not need a computer science degree to build real software with AI. This guide covers the whole setup in an afternoon, with the actual keystrokes: install Claude Code (curl -fsSL https://claude.ai/install.sh | bash) and Codex as terminal AI coding agents, GitHub as your source of truth, Vercel deploying every change live, and connectors that give your agent reach. Then the six working prompts that do the heavy lifting: ask for a plan first, make the agent screenshot and check its own work, ask for options not answers, keep a ship gate, make it teach you, and write the rules down once in a CLAUDE.md file. Plus what to build first, the habits that separate shipping from stalling, and answers on cost, Windows vs Mac, safety, and what to do when the agent gets stuck.',
  },
  '/thinking/under-the-hood': {
    title: 'The engine behind everything we ship — how we build software with AI · Madrona Product Studio',
    description: 'Inside an AI-assisted software development process that ships real products: the bootstrap template, one monitoring setup across the whole portfolio, installed design skills, and the image system — the platform every project inherits, and how to set the same thing up yourself.',
    article: { datePublished: '2026-08-05', dateModified: '2026-08-15' },
    h1: 'The engine behind everything we ship.',
    ogImage: '/og-pov-under-the-hood.png',
    body: 'Fifteen years of product judgment, encoded into a platform every project inherits: design systems, proven integrations, hardened code, standards, and quality gates. AI is the power tool; the engine is the judgment it executes. Every launch teaches it something new. The parts, if you want to set this up yourself: a bootstrap template with standards pre-wired and verified green, one monitoring setup (Sentry, health endpoints, uptime checks, one alert destination) applied by stakes across the portfolio, a design intelligence layer installed as agent plugins, and an image system that builds type in code and generates atmosphere. Each part is becoming its own field note; this page collects them as they land.',
  },
  '/open': {
    title: 'Open — our tools, free to use · Madrona Product Studio',
    description: 'Open-source Claude Code plugins from Madrona Product Studio: a forkable plain-text operating system kept current by agents, plus the craft catalog we ship polished product with — motion, social images, launch readiness, visual QA. MIT licensed.',
    h1: 'Open.',
    body: 'Tools we build and use every day, shared because that is what being part of the community is. The belief behind them: the machine is the artifact. The flagship is operating-system, the plain-text engine we run our own studio on — you own the mind; the app renders it. The craft catalog covers motion options, animation vocabulary and review, Open Graph images, a Playwright screenshotter for visual QA, investor-ready audits, go-to-market sweeps, and pre-share cleanup. Install once with the Claude Code plugin marketplace: /plugin marketplace add Madrona-Product-Studio/madrona-open.',
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

  // og:url should reflect the actual page, not the homepage default.
  const routeUrl = `https://www.madronaproduct.com${route === '/' ? '' : route}`;
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${routeUrl}" />`
  );

  // Per-article social image (falls back to the sitewide OG when unset).
  if (meta.ogImage) {
    const ogUrl = `https://www.madronaproduct.com${meta.ogImage}`;
    const ogAlt = `${meta.h1.replace(/\.$/, '')} — Thinking, Madrona Product Studio`;
    html = html.replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${ogUrl}" />`
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${ogUrl}" />`
    );
    html = html.replace(
      /<meta property="og:image:alt" content="[^"]*" \/>/,
      `<meta property="og:image:alt" content="${ogAlt.replace(/"/g, '&quot;')}" />`
    );
  }

  // Article pages advertise the right OpenGraph type + publish date.
  if (meta.article) {
    html = html.replace(
      /<meta property="og:type" content="[^"]*" \/>/,
      `<meta property="og:type" content="article" />`
    );
    html = html.replace('</head>', `  <meta property="article:published_time" content="${meta.article.datePublished}" />\n  </head>`);
  }

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
      dateModified: meta.article.dateModified || meta.article.datePublished,
      author: { '@type': 'Person', name: 'Charlie Koch' },
      publisher: { '@type': 'Organization', name: 'Madrona Product Studio', url: 'https://www.madronaproduct.com' },
      mainEntityOfPage: `https://www.madronaproduct.com${route}`,
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
  const innerSeo = articleContent[route]
    ? renderSections(articleContent[route])
    : `<h1>${escapeHtml(meta.h1)}</h1>\n      <p>${escapeHtml(meta.body)}</p>`;
  const seoBlock = `
    <noscript>
      ${innerSeo}
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
