import { useState } from "react";
import { Link } from "react-router-dom";
import { updatedLabel } from "../../data/siteMeta.mjs";
import type { ThinkingType } from "../../data/thinking";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import PovThumb, { type PovMotif } from "./PovThumb";
import { TypeCircle } from "./TypeMark";
import { ArticleHeader, ArticleBody, ArticleSection, Prose, Figure } from "./ArticleTemplate";
import "./madrona-v2.css";
import "./playbook.css";

// Articles written as data (2026-09-30): the Resources "Start here" pieces.
// The copy lives in src/data/articles/<slug>.json, which this renders and
// scripts/prerender.mjs reads for the crawler copy, so the two cannot drift
// (the older articles keep a hand-synced copy in scripts/thinking-content.json).

type Block =
  | { type: "p" | "li" | "h3"; text: string }
  | { type: "prompt"; title: string; why: string; text: string }
  | { type: "link"; to: string; text: string };

export type DataArticleContent = {
  href: string;
  type: ThinkingType;
  kicker: string;
  title: string;
  shareTitle: string;
  standfirst: string;
  readTime: string;
  motif: PovMotif;
  sections: { id: string; eyebrow: string; title: string; blocks: Block[] }[];
};

function PromptCard({ title, why, text }: { title: string; why: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }, () => {});
  };
  return <div className="m2-sg-prompt da-prompt">
    <div className="da-prompt-head">
      <h3>{title}</h3>
      <button type="button" className="da-copy" onClick={copy} aria-label={`Copy the prompt: ${title}`}>{copied ? "Copied" : "Copy"}</button>
    </div>
    <p className="why">{why}</p>
    <p className="p">{text}</p>
  </div>;
}

type TextBlock = Extract<Block, { type: "p" | "li" | "h3" }>;
const isText = (b: Block): b is TextBlock => b.type === "p" || b.type === "li" || b.type === "h3";

// One run of text (paragraphs, subheads, list items) shares a single Prose so
// the template's rhythm applies; list items group into one <ul>. Prompts group
// into one card grid, links into one row.
function TextRun({ blocks }: { blocks: TextBlock[] }) {
  const out: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "li") {
      const items: string[] = [];
      while (i < blocks.length && blocks[i].type === "li") items.push(blocks[i++].text);
      i--;
      out.push(<ul key={`ul${i}`}>{items.map(t => <li key={t}>{t}</li>)}</ul>);
    } else if (b.type === "h3") out.push(<h3 key={i}>{b.text}</h3>);
    else out.push(<p key={i}>{b.text}</p>);
  }
  return <Prose>{out}</Prose>;
}

function renderBlocks(blocks: Block[]) {
  const out: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (isText(b)) {
      const run: TextBlock[] = [];
      while (i < blocks.length && isText(blocks[i])) run.push(blocks[i++] as TextBlock);
      out.push(<TextRun key={`t${i}`} blocks={run} />);
    } else if (b.type === "prompt") {
      const cards: Extract<Block, { type: "prompt" }>[] = [];
      while (i < blocks.length && blocks[i].type === "prompt") cards.push(blocks[i++] as Extract<Block, { type: "prompt" }>);
      out.push(<Figure key={`pr${i}`}><div className="m2-sg-prompts da-prompts">{cards.map(c => <PromptCard key={c.title} {...c} />)}</div></Figure>);
    } else {
      const links: Extract<Block, { type: "link" }>[] = [];
      while (i < blocks.length && blocks[i].type === "link") links.push(blocks[i++] as Extract<Block, { type: "link" }>);
      out.push(<div key={`ln${i}`} className="m2-th-close-links da-links">{links.map(l => <Link key={l.to} className="m2-text-link" to={l.to}>{l.text} <span aria-hidden="true">→</span></Link>)}</div>);
    }
  }
  return out;
}

export default function DataArticle({ article: a }: { article: DataArticleContent }) {
  useReveal();
  return <div className="m2 art">
    <LabMeta title={`${a.shareTitle} · Resources`} />
    <M2Nav active="resources" />
    <main id="main">
      <div className="art-wrap">
        <ArticleHeader
          kicker={a.kicker}
          typeMark={<TypeCircle type={a.type} />}
          author="Charlie Koch"
          meta={[a.readTime, `Updated ${updatedLabel(a.href)}`]}
          title={a.title}
          standfirst={a.standfirst}
          toc={a.sections.map(s => ({ id: s.id, label: s.title.replace(/\.$/, "") }))}
          visual={<div className="art-head-plate"><div className="m2-pov-plate"><PovThumb motif={a.motif} /></div></div>}
        />
        <ArticleBody share={{ title: a.shareTitle, href: a.href }}>
          {a.sections.map((s, n) => <ArticleSection key={s.id} id={s.id} num={String(n + 1)} eyebrow={s.eyebrow} title={s.title}>
            {renderBlocks(s.blocks)}
          </ArticleSection>)}
        </ArticleBody>
      </div>
    </main>
    <SiteFooter cta={false} />
  </div>;
}
