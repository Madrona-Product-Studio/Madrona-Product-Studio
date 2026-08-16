import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "./article-template.css";

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
export function ArticleBody({ children }: { children: ReactNode }) {
  return (
    <div className="art-grid">
      <div className="art-col">{children}</div>
    </div>
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
      {eyebrow && <p className="art-sec-eyebrow">{eyebrow}</p>}
      <div className="art-sec-head">
        <span className="art-sec-num">#&nbsp;{num}</span>
        <h2>{title}</h2>
      </div>
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
export type TableRow = { name: string; path?: string; what: string; why: string };

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
              {r.name}
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
