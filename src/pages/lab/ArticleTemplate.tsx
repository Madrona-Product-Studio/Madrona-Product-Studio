import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import PovThumb from "./PovThumb";
import { thinkingEntries } from "../../data/thinking";
import "./article-template.css";

const SITE_ORIGIN = "https://www.madronaproduct.com";

/* =========================================================================
   Article template — reusable /thinking reading system (Claude candidate)

   A calm editorial reading column with a sticky in-article TOC, numbered
   sections, and a small kit of on-brand technical figures. Content pages
   compose these primitives; no page-specific styling lives here.
   ========================================================================= */

/* ---- Scroll-spy for the sticky TOC ------------------------------------- */
export function useTocSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        // Highest section still on screen wins; fall back to nearest above.
        if (visible.size) {
          const top = [...visible.entries()].sort((a, b) => {
            const ay = document.getElementById(a[0])!.getBoundingClientRect().top;
            const by = document.getElementById(b[0])!.getBoundingClientRect().top;
            return ay - by;
          })[0][0];
          setActive(top);
        }
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: [0, 0.25, 0.6, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ---- Header (title section carries the contents nav) ------------------- */
export type TocItem = { id: string; label: string };

export function ArticleHeader({
  kicker,
  author,
  authorHref = "/about",
  meta,
  title,
  standfirst,
  toc,
  visual,
}: {
  kicker: string;
  author: string;
  authorHref?: string;
  meta: string[]; // e.g. ["10 min read", "August 2026"]
  title: ReactNode;
  standfirst: ReactNode;
  toc?: TocItem[];
  visual?: ReactNode; // framed illustration shown to the right of the title
}) {
  return (
    <header className="art-head">
      <div className={`art-head-split${visual ? "" : " no-visual"}`}>
        <div className="art-head-lead">
          <p className="m2-kicker">{kicker}</p>
          <p className="art-metaline">
            by <Link to={authorHref}>{author}</Link>
            {meta.map((m) => (
              <span key={m}>
                <span className="dot">·</span>
                {m}
              </span>
            ))}
          </p>
          <h1 className="art-title">{title}</h1>
          <p className="art-standfirst">{standfirst}</p>
        </div>
        {visual && <div className="art-head-visual">{visual}</div>}
      </div>
      {toc && toc.length > 0 && (
        <nav className="art-contents" aria-label="In this article">
          <p className="art-contents-label">In this article</p>
          <ul className="art-contents-list">
            {toc.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="art-contents-link">
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tx">{t.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <hr className="art-head-rule" />
    </header>
  );
}

/* ---- Body: single full-width column ------------------------------------ */
export function ArticleBody({
  children,
  share,
}: {
  children: ReactNode;
  share?: { title: string; href: string };
}) {
  return (
    <>
      <ReadingProgress />
      <div className="art-grid">
        <div className="art-col">
          {children}
          {share && (
            <div className="art-end">
              <RelatedReading currentHref={share.href} />
              <ArticleShare title={share.title} href={share.href} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---- Reading progress bar ---------------------------------------------- */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.documentElement;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="art-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

/* ---- Share ------------------------------------------------------------- */
const shareIcon = (d: string) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.split("|").map((p, i) => <path key={i} d={p} />)}
  </svg>
);

export function ArticleShare({ title, href }: { title: string; href: string }) {
  const url = `${SITE_ORIGIN}${href}`;
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  useEffect(() => {
    setCanNative(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; no-op */
    }
  };
  const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  return (
    <div className="art-share">
      <span className="art-share-lbl">Share this</span>
      <div className="art-share-row">
        <button type="button" className={`art-share-btn art-share-copy${copied ? " is-copied" : ""}`} onClick={copy}>
          {copied ? shareIcon("M20 6 9 17l-5-5") : shareIcon("M10 13a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1|M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1")}
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
        <a className="art-share-btn art-share-ico" href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" /></svg>
        </a>
        <a className="art-share-btn art-share-ico" href={liUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          {shareIcon("M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z|M3.5 9h3v11h-3z|M9 9h2.9v1.5A3.2 3.2 0 0 1 14.7 9c3 0 3.8 1.9 3.8 4.6V20h-3v-5.3c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.8 1.4a2.6 2.6 0 0 0-.1.9V20H9z")}
        </a>
        {canNative && (
          <button type="button" className="art-share-btn art-share-ico" onClick={() => { void navigator.share?.({ title, url }); }} aria-label="Share">
            {shareIcon("M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7|M12 15V3|M8 7l4-4 4 4")}
          </button>
        )}
      </div>
    </div>
  );
}

/* ---- Related reading --------------------------------------------------- */
export function RelatedReading({ currentHref, limit = 3 }: { currentHref: string; limit?: number }) {
  const items = thinkingEntries.filter((e) => e.href !== currentHref).slice(0, limit);
  if (!items.length) return null;
  return (
    <section className="art-related" data-reveal>
      <p className="art-related-label">Keep reading</p>
      <div className="art-related-grid">
        {items.map((e) => (
          <Link key={e.href} to={e.href} className="art-related-card">
            <div className="m2-pov-plate"><PovThumb motif={e.motif} /></div>
            <div className="art-related-body">
              <span className="art-related-type">{e.type}</span>
              <h3>{e.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---- Numbered section --------------------------------------------------- */
export function ArticleSection({
  id,
  num,
  title,
  eyebrow,
  children,
}: {
  id: string;
  num: string;
  title: ReactNode;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="art-sec">
      <div className="art-sec-meta">
        <span className="art-sec-num">#&nbsp;{num}</span>
        {eyebrow && <span className="art-sec-eyebrow">{eyebrow}</span>}
      </div>
      <h2 className="art-sec-title">{title}</h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="art-prose">{children}</div>;
}

export function Figure({ children, caption }: { children: ReactNode; caption?: ReactNode }) {
  return (
    <figure className="art-fig" data-reveal>
      {children}
      {caption && <figcaption className="art-fig-cap">{caption}</figcaption>}
    </figure>
  );
}

/* ---- Code block --------------------------------------------------------- */
export type CodeLine = { t: string; cls?: "tok-key" | "tok-mut" };

export function CodeBlock({
  file,
  dark,
  lines,
  numbers = true,
}: {
  file?: string;
  dark?: boolean;
  lines: CodeLine[];
  numbers?: boolean;
}) {
  return (
    <div className={`art-code${dark ? " is-dark" : ""}`}>
      <div className="art-code-bar">
        <span className="art-code-dots"><i /><i /><i /></span>
        {file && <span className="art-code-file">{file}</span>}
      </div>
      <pre>
        <code>
          {lines.map((l, i) => (
            <span className="art-code-line" key={i}>
              {numbers && <span className="art-code-ln">{i + 1}</span>}
              <span className={`art-code-tx ${l.cls ?? ""}`}>{l.t || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ---- Pillar row --------------------------------------------------------- */
export type Pillar = { name: string; d: string; icon: ReactNode; gate?: boolean };

export function PillarRow({ items }: { items: Pillar[] }) {
  return (
    <div className="art-pillars">
      {items.map((p, i) => (
        <div key={p.name} className={`art-pillar${p.gate ? " gate" : ""}`}>
          {i > 0 && (
            <span className="art-pillar-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 8h9M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          {p.gate && <span className="art-pillar-gate">Gates</span>}
          <span className="art-pillar-ico">{p.icon}</span>
          <p className="art-pillar-name">{p.name}</p>
          <p className="art-pillar-d">{p.d}</p>
        </div>
      ))}
    </div>
  );
}

/* ---- Dark spec panel ---------------------------------------------------- */
export type PanelCol = { head: string; items: string[] };

export function SpecPanel({ title, file, cols }: { title: string; file: string; cols: PanelCol[] }) {
  return (
    <div className="art-panel">
      <div className="art-panel-head">
        <p className="art-panel-title">{title}</p>
        <span className="art-panel-file">{file}</span>
      </div>
      <div className="art-panel-cols">
        {cols.map((c) => (
          <div className="art-panel-col" key={c.head}>
            <h4>{c.head}</h4>
            <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Spec table --------------------------------------------------------- */
export type TableRow = { name: string; href?: string; path?: string; what: string; why: string };

export function SpecTable({ head, rows }: { head: [string, string, string]; rows: TableRow[] }) {
  return (
    <table className="art-table">
      <thead>
        <tr>
          <th>{head[0]}</th>
          <th>{head[1]}</th>
          <th>{head[2]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <td className="col-name">
              {r.href ? (
                <a className="art-table-jump" href={r.href}>{r.name}<span aria-hidden="true">↓</span></a>
              ) : (
                r.name
              )}
              {r.path && <small>{r.path}</small>}
            </td>
            <td>{r.what}</td>
            <td>{r.why}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---- Margin callout ----------------------------------------------------- */
export function MarginCallout({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <aside className="art-callout">
      <p className="art-callout-ey">{eyebrow}</p>
      <p className="art-callout-title">{title}</p>
      {children}
    </aside>
  );
}

/* ---- Engine schematic --------------------------------------------------- */
export type SchemaNode = { label: string; icon: ReactNode };

export function EngineSchematic({
  inputs,
  nodes,
  outputs,
  returnLabel,
}: {
  inputs: { head: string; items: string[] };
  nodes: SchemaNode[];
  outputs: { head: string; items: string[] };
  returnLabel: string;
}) {
  return (
    <div className="art-schema">
      <div className="art-schema-flow">
        <div className="art-schema-io">
          <h4>{inputs.head}</h4>
          <ul>{inputs.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
        <div className="art-schema-engine">
          {nodes.map((n, i) => (
            <span key={n.label} style={{ display: "contents" }}>
              {i > 0 && <span className="art-node-sep" aria-hidden="true">→</span>}
              <span className="art-node">
                <span className="art-node-ico">{n.icon}</span>
                <span>{n.label}</span>
              </span>
            </span>
          ))}
        </div>
        <div className="art-schema-io">
          <h4>{outputs.head}</h4>
          <ul>{outputs.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </div>
      </div>
      <div className="art-schema-return">
        <span className="line" />
        <span>↩ {returnLabel}</span>
        <span className="line" />
      </div>
    </div>
  );
}

/* ---- Parts list --------------------------------------------------------- */
export type Part = { n: string; path: string; d: ReactNode; p: string };

export function PartsList({ items }: { items: Part[] }) {
  return (
    <div className="art-parts">
      {items.map((s) => (
        <div className="art-part" key={s.n}>
          <div className="art-part-n">
            {s.n}
            <small>{s.path}</small>
          </div>
          <div className="art-part-d">
            {s.d}
            <span className="p">{s.p}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
