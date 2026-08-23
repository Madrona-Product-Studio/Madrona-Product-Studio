import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/* =========================================================================
   Agent document viewer

   Lets an agent's output open as a viewable "file" — a modal with light
   file-chrome (a filename bar) and the document rendered inside, styled per
   kind (statement / memo / email / packet). In the demo these are rendered
   previews on made-up data, NOT live Google Docs; a deployed agent would
   produce the real file. Reusable across every agent in the gallery.
   ========================================================================= */

export type DocKind = "statement" | "memo" | "email" | "packet";

const KIND_LABEL: Record<DocKind, string> = {
  statement: "Statement",
  memo: "Memo",
  email: "Email",
  packet: "Packet",
};

function FileGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3v5h5M14 3H6v18h12V8z" />
    </svg>
  );
}

export function DocButton({
  label,
  filename,
  kind,
  children,
}: {
  label: string;
  filename: string;
  kind: DocKind;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button type="button" className="agentx-docbtn" onClick={() => setOpen(true)}>
        <FileGlyph />{label}<span aria-hidden="true"> →</span>
      </button>
      {open && createPortal(
        <div className="agentx-docoverlay" role="dialog" aria-modal="true" aria-label={filename} onClick={() => setOpen(false)}>
          <div className="agentx-docmodal" onClick={(e) => e.stopPropagation()}>
            <div className="agentx-docbar">
              <span className="agentx-docbar-file"><FileGlyph />{filename}</span>
              <span className="agentx-docbar-kind">{KIND_LABEL[kind]}</span>
              <button type="button" className="agentx-docclose" aria-label="Close" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div className="agentx-docscroll">
              <article className={`agentx-doc agentx-doc--${kind}`}>{children}</article>
            </div>
            <p className="agentx-docfoot">Demo: a rendered preview on made-up data, not a live document. A deployed agent produces the real file.</p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* ---- Document building blocks --------------------------------------------- */

export function DocTitle({ business, title, sub }: { business: string; title: string; sub?: string }) {
  return (
    <header className="agentx-doc-title">
      <p className="agentx-doc-biz">{business}</p>
      <h3>{title}</h3>
      {sub && <p className="agentx-doc-sub">{sub}</p>}
    </header>
  );
}

export function DocSection({ head, children }: { head?: string; children: ReactNode }) {
  return (
    <section className="agentx-doc-sec">
      {head && <h4 className="agentx-doc-head">{head}</h4>}
      {children}
    </section>
  );
}

export function DocRow({ label, value, strong, indent, rule }: { label: ReactNode; value?: ReactNode; strong?: boolean; indent?: boolean; rule?: boolean }) {
  return (
    <div className={`agentx-doc-row${strong ? " is-strong" : ""}${indent ? " is-indent" : ""}${rule ? " has-rule" : ""}`}>
      <span className="agentx-doc-row-l">{label}</span>
      {value != null && <span className="agentx-doc-row-v">{value}</span>}
    </div>
  );
}

export function DocNote({ children }: { children: ReactNode }) {
  return <p className="agentx-doc-note">{children}</p>;
}

export function DocStamp({ children }: { children: ReactNode }) {
  return <p className="agentx-doc-stamp">{children}</p>;
}

export function DocProse({ children }: { children: ReactNode }) {
  return <p className="agentx-doc-p">{children}</p>;
}

export function DocDivider() {
  return <hr className="agentx-doc-divider" />;
}

// One email (for invoice reminders, customer replies). Body is <DocProse> lines.
export function DocEmail({ to, subject, children }: { to: string; subject: string; children: ReactNode }) {
  return (
    <div className="agentx-doc-email-msg">
      <div className="agentx-doc-email-head">
        <div><span>To</span><b>{to}</b></div>
        <div><span>Subject</span><b>{subject}</b></div>
      </div>
      <div className="agentx-doc-email-body">{children}</div>
    </div>
  );
}
