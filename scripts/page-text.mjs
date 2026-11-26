/**
 * Turns a page's rendered markup into its plain content: an ordered list of
 * blocks (headings, paragraphs, list items, quotes) with their links, sorted
 * into the site navigation, the page itself and the footer.
 *
 * scripts/prerender.mjs renders every route from the real React components,
 * runs the result through here, and writes the same blocks three ways: into
 * the page's HTML, into the .md copies and into llms.txt. One source, so the
 * copies cannot disagree with the page.
 *
 * No dependencies: React's server output is well formed, so a small tokenizer
 * is enough. Decorative subtrees (aria-hidden, svg, script, style) and form
 * controls are dropped; everything a reader would see as text is kept.
 */

const VOID = new Set(['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'wbr', 'area', 'base', 'col', 'embed', 'track']);
const SKIP = new Set(['script', 'style', 'svg', 'template', 'noscript', 'select', 'textarea', 'iframe', 'canvas', 'video', 'audio', 'picture']);
const BLOCK = new Set([
  'div', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'ul', 'ol', 'li', 'p',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'figure', 'figcaption', 'dl', 'dt', 'dd',
  'table', 'thead', 'tbody', 'tr', 'form', 'details', 'summary', 'address', 'button', 'label', 'pre',
]);
const INLINE_BOX = new Set(['span', 'small', 'i', 'b', 'strong', 'em', 'code', 'time', 'kbd']);
const TYPED = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', li: 'li', blockquote: 'quote', dt: 'h4', summary: 'h4' };

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
  if (e[0] === '#') {
    const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return Number.isFinite(code) ? String.fromCodePoint(code) : m;
  }
  return ENTITIES[e.toLowerCase()] ?? m;
});

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/\s([a-zA-Z_:][\w:.-]*)(?:="([^"]*)")?/g)) out[m[1].toLowerCase()] = decode(m[2] ?? '');
  return out;
}

/** Rendered HTML to blocks: [{ type, region, segs: [{ text, href?, link? }] }]. */
export function htmlToBlocks(html) {
  const blocks = [];
  const stack = []; // { tag, a?: linkId, href? }
  let buf = [];
  let skipDepth = 0;
  let linkSeq = 0;
  let mainSeen = false;

  const inTag = (tag) => stack.some((e) => e.tag === tag);
  const region = () => {
    if (inTag('main')) return 'main';
    if (inTag('footer')) return 'footer';
    return mainSeen ? 'footer' : 'nav';
  };
  const blockType = () => {
    for (let i = stack.length - 1; i >= 0; i--) if (TYPED[stack[i].tag]) return TYPED[stack[i].tag];
    return 'p';
  };
  const flush = () => {
    const segs = [];
    let soft = false;
    for (const s of buf) {
      if (s.soft) { soft = true; continue; }
      const last = segs[segs.length - 1];
      // Two labels set side by side by layout (a number and a title, a name
      // and a status) have no space between them in the markup; add one.
      const gap = soft && last && /\S$/.test(last.text) && /^[\p{L}\p{N}$(“"]/u.test(s.text) ? ' ' : '';
      soft = false;
      if (last && last.link === s.link) last.text += gap + s.text;
      else segs.push({ ...s, text: (last && gap ? ((last.text += gap), '') : '') + s.text });
    }
    buf = [];
    for (const s of segs) s.text = s.text.replace(/\s+/g, ' ');
    while (segs.length && !segs[0].text.trim()) segs.shift();
    while (segs.length && !segs[segs.length - 1].text.trim()) segs.pop();
    if (!segs.length) return;
    segs[0].text = segs[0].text.replace(/^\s+/, '');
    // Trailing arrows are button dressing.
    segs[segs.length - 1].text = segs[segs.length - 1].text.replace(/[\s→↗↘←︎]+$/u, '');
    if (!segs[segs.length - 1].text) segs.pop();
    if (!segs.length) return;
    const text = segs.map((s) => s.text).join('');
    // Nothing but digits, arrows or punctuation is decoration, not content.
    if (!/[\p{L}]/u.test(text) && !/\d{2,}/.test(text)) return;
    const where = region();
    // Outside the page itself, keep only what links somewhere (the menus).
    if (where !== 'main' && !segs.some((s) => s.href) && inTag('button')) return;
    blocks.push({ type: where === 'nav' ? 'li' : blockType(), region: where, segs });
  };

  const tokens = html.matchAll(/<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g);
  for (const [tok] of tokens) {
    if (tok.startsWith('<!--')) continue;
    if (tok[0] !== '<') {
      if (skipDepth) continue;
      const top = [...stack].reverse().find((e) => e.a);
      buf.push(top ? { text: decode(tok), href: top.href, link: top.a } : { text: decode(tok) });
      continue;
    }
    const closing = tok[1] === '/';
    const tag = tok.slice(closing ? 2 : 1).match(/^[a-zA-Z0-9]+/)[0].toLowerCase();
    const selfClosed = VOID.has(tag) || tok.endsWith('/>');

    if (skipDepth) {
      if (selfClosed) continue;
      skipDepth += closing ? -1 : 1;
      continue;
    }
    if (closing) {
      if (BLOCK.has(tag) || (tag === 'a' && region() !== 'main')) flush();
      if (tag === 'td' || tag === 'th') buf.push({ text: ' | ' });
      if (stack.some((e) => e.tag === tag && e.box)) buf.push({ soft: true });
      for (let i = stack.length - 1; i >= 0; i--) if (stack[i].tag === tag) { stack.length = i; break; }
      continue;
    }
    const a = attrs(tok.slice(1 + tag.length));
    if (SKIP.has(tag) || a['aria-hidden'] === 'true') {
      if (!selfClosed) skipDepth = 1;
      buf.push({ soft: true });
      continue;
    }
    if (tag === 'br') { buf.push({ text: ' ' }); continue; }
    if (selfClosed) continue;
    if (tag === 'main') mainSeen = true;
    if (BLOCK.has(tag)) flush();
    if (tag === 'a') {
      const href = a.href || '';
      // Menus list one link per line; in running text, keep two links apart.
      if (region() !== 'main') flush();
      else if (buf.length && buf[buf.length - 1].link && !/\s$/.test(buf[buf.length - 1].text)) buf.push({ text: ' ' });
      if (href && !href.startsWith('#')) stack.push({ tag, a: ++linkSeq, href });
      else if (region() !== 'main') { skipDepth = 1; continue; } // "Skip to content"
      else stack.push({ tag });
      continue;
    }
    const box = INLINE_BOX.has(tag);
    if (box) buf.push({ soft: true });
    stack.push({ tag, box });
  }
  flush();

  // A link wrapped around a whole card stays on one block: its first heading,
  // or its first line. The rest of the card reads as plain text.
  const byLink = new Map();
  blocks.forEach((b, i) => b.segs.forEach((s) => {
    if (!s.link) return;
    if (!byLink.has(s.link)) byLink.set(s.link, new Set());
    byLink.get(s.link).add(i);
  }));
  for (const [link, set] of byLink) {
    if (set.size < 2) continue;
    const idx = [...set];
    const keep = idx.find((i) => /^h\d$/.test(blocks[i].type)) ?? idx[0];
    for (const i of idx) if (i !== keep) for (const s of blocks[i].segs) if (s.link === link) { delete s.href; delete s.link; }
  }

  // Drop exact repeats: a line said twice in a row, or a menu link listed twice.
  const out = [];
  const seenMenu = new Set();
  for (const b of blocks) {
    const key = `${b.type}|${b.segs.map((s) => `${s.text}>${s.href || ''}`).join('|')}`;
    const prev = out[out.length - 1];
    if (prev && prev.key === key) continue;
    if (b.region !== 'main') {
      if (seenMenu.has(`${b.region}|${key}`)) continue;
      seenMenu.add(`${b.region}|${key}`);
    }
    out.push({ ...b, key });
  }
  return out.map((b) => ({ type: b.type, region: b.region, segs: b.segs }));
}

export const blockText = (b) => b.segs.map((s) => s.text).join('');
export const wordCount = (blocks) =>
  blocks.reduce((n, b) => n + blockText(b).split(/\s+/).filter(Boolean).length, 0);

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeAttr = (s) => escapeHtml(s).replace(/"/g, '&quot;');

function blocksHtml(blocks, indent) {
  const out = [];
  let inList = false;
  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };
  for (const b of blocks) {
    const inner = b.segs
      .map((s) => (s.href ? `<a href="${escapeAttr(s.href)}">${escapeHtml(s.text)}</a>` : escapeHtml(s.text)))
      .join('');
    if (b.type === 'li') {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inner}</li>`);
      continue;
    }
    closeList();
    const tag = b.type === 'quote' ? 'blockquote' : b.type;
    out.push(`<${tag}>${inner}</${tag}>`);
  }
  closeList();
  return out.join(`\n${indent}`);
}

/** Blocks to plain semantic HTML: the site menu, the page, the footer. */
export function blocksToHtml(blocks, indent = '        ') {
  const part = (region) => blocks.filter((b) => b.region === region);
  const out = [];
  if (part('nav').length) out.push(`<nav aria-label="Site">\n${indent}${blocksHtml(part('nav'), indent)}\n      </nav>`);
  out.push(`<main>\n${indent}${blocksHtml(part('main'), indent)}\n      </main>`);
  if (part('footer').length) out.push(`<footer>\n${indent}${blocksHtml(part('footer'), indent)}\n      </footer>`);
  return out.join('\n      ');
}

/** The page's own blocks (no menu, no footer) to markdown, links made absolute. */
export function blocksToMarkdown(blocks, origin) {
  const abs = (href) => (href.startsWith('/') ? `${origin}${href}` : href);
  const out = [];
  let prevType = null;
  for (const b of blocks.filter((x) => x.region === 'main')) {
    const text = b.segs.map((s) => (s.href ? `[${s.text.trim()}](${abs(s.href)})${/\s$/.test(s.text) ? ' ' : ''}` : s.text)).join('');
    let line;
    if (/^h\d$/.test(b.type)) line = `${'#'.repeat(Number(b.type[1]))} ${text}`;
    else if (b.type === 'li') line = `- ${text}`;
    else if (b.type === 'quote') line = `> ${text}`;
    else line = text;
    out.push(b.type === 'li' && prevType === 'li' ? line : `\n${line}`);
    prevType = b.type;
  }
  return `${out.join('\n').trim()}\n`;
}
