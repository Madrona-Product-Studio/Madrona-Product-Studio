import { useState, type FormEvent } from "react";
import { DocTitle, DocSection, DocProse, DocRow, DocStamp } from "./AgentDoc";
import { track } from "../../lib/analytics";

/* =========================================================================
   "Try it on your own text" — the one honest live demo.

   Sits beside the scripted console on the two pages where a visitor can bring
   their own input (a contract excerpt, a customer message) and see the real
   model do the real job through api/agent-demo.ts. The result renders in the
   same "file" style as the scripted artifacts. Nothing pasted is stored, and
   the footer says so. When the route is absent (a local vite preview) or the
   key is unset, the panel shows a quiet note instead of an error.
   ========================================================================= */

type Tool = "contract-review" | "customer-inbox";

type ContractResult = {
  off_task: boolean;
  note: string;
  summary: string;
  flags: { clause: string; risk: "low" | "medium" | "high"; why: string; worth_a_lawyer: boolean }[];
};
type InboxResult = { off_task: boolean; note: string; reply: string; needs_human: boolean; reason: string };

const COPY: Record<Tool, { title: string; hint: string; placeholder: string; filename: string; kind: "memo" | "email"; button: string; running: string }> = {
  "contract-review": {
    title: "Try it on your own text",
    hint: "Paste a clause or two from a real contract (strip names if you like). The agent gives you the same first read, on your words.",
    placeholder: "Paste a contract excerpt here. A lease clause, a vendor agreement, the renewal terms nobody reads…",
    filename: "Your-contract_first-read.pdf",
    kind: "memo",
    button: "Read my contract",
    running: "Reading…",
  },
  "customer-inbox": {
    title: "Try it on your own text",
    hint: "Paste a message a customer actually sent you. The agent drafts the reply, and tells you if this one needs a person.",
    placeholder: "Paste a customer message here. A question about hours, an order that went wrong, a request for a refund…",
    filename: "Your-inbox_drafted-reply.eml",
    kind: "email",
    button: "Draft the reply",
    running: "Drafting…",
  },
};

const INPUT_MAX = 4000;

type State =
  | { kind: "idle" }
  | { kind: "running" }
  | { kind: "unavailable"; note: string }
  | { kind: "error"; message: string }
  | { kind: "done"; result: ContractResult | InboxResult };

function ContractDoc({ result }: { result: ContractResult }) {
  return (
    <>
      <DocTitle business="Your text" title="First read" sub={`${result.flags.length} ${result.flags.length === 1 ? "thing" : "things"} worth a closer look`} />
      <DocSection head="What this is"><DocProse>{result.summary}</DocProse></DocSection>
      {result.flags.map((flag, index) => (
        <DocSection key={index} head={`${flag.clause} · ${flag.risk} risk`}>
          <DocProse>{flag.why}</DocProse>
          <DocRow label="Worth a lawyer?" value={flag.worth_a_lawyer ? "Yes, take this one to counsel" : "Not on its own"} />
        </DocSection>
      ))}
      <DocStamp>Not legal advice: a first read to make your conversation with counsel sharper. A demo of the contract agent on your text.</DocStamp>
    </>
  );
}

function InboxDoc({ result }: { result: InboxResult }) {
  return (
    <>
      <DocTitle business="Your inbox" title="Drafted reply" sub={result.needs_human ? "Flagged: this one needs a person" : "Ready for your okay"} />
      <DocSection head="Draft, in your voice">
        {result.reply.split(/\n+/).filter(Boolean).map((line, index) => <DocProse key={index}>{line}</DocProse>)}
      </DocSection>
      <DocSection head="Needs a human?">
        <DocRow label={result.needs_human ? "Yes" : "No"} value={result.needs_human ? "Held for you" : "Safe to send once you read it"} />
        {result.reason && <DocProse>{result.reason}</DocProse>}
      </DocSection>
      <DocStamp>Nothing sends itself. A demo of the inbox agent on your text; the real one waits for your approval every time.</DocStamp>
    </>
  );
}

export function AgentTryIt({ tool }: { tool: Tool }) {
  const copy = COPY[tool];
  const [input, setInput] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function run(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || state.kind === "running") return;
    setState({ kind: "running" });
    track("tool_try_run", { tool });
    try {
      const res = await fetch("/api/agent-demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool, input: text }),
      });
      const isJson = (res.headers.get("content-type") ?? "").includes("application/json");
      if (!isJson || res.status === 404) {
        setState({ kind: "unavailable", note: "The live demo runs on the deployed site." });
        track("tool_try_result", { tool, status: "unavailable" });
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        if (data.unavailable) {
          setState({ kind: "unavailable", note: data.error });
          track("tool_try_result", { tool, status: "unavailable" });
        } else {
          setState({ kind: "error", message: data.error || "The demo hit a snag. Try again." });
          track("tool_try_result", { tool, status: "error" });
        }
        return;
      }
      setState({ kind: "done", result: data.result });
      track("tool_try_result", { tool, status: "ok" });
    } catch {
      setState({ kind: "unavailable", note: "The live demo runs on the deployed site." });
      track("tool_try_result", { tool, status: "unavailable" });
    }
  }

  const result = state.kind === "done" ? state.result : null;
  const offTask = result?.off_task ?? false;

  return (
    <section className="agx-try" aria-label={copy.title}>
      <div className="agx-try-head">
        <p className="agx-try-kicker">Live · your text</p>
        <h2>{copy.title}</h2>
        <p>{copy.hint}</p>
      </div>
      <form className="agx-try-form" onSubmit={run}>
        <label className="agx-try-field">
          <span className="agx-sr">Your text</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, INPUT_MAX))}
            rows={7}
            maxLength={INPUT_MAX}
            placeholder={copy.placeholder}
            disabled={state.kind === "running"}
          />
        </label>
        <div className="agx-try-row">
          <button className="m2-button agx-try-run" type="submit" disabled={state.kind === "running" || !input.trim()}>
            {state.kind === "running" ? <><span className="agx-try-spin" aria-hidden="true" />{copy.running}</> : <>{copy.button}<span aria-hidden="true"> →</span></>}
          </button>
          <span className="agx-try-count">{input.length.toLocaleString()} / {INPUT_MAX.toLocaleString()}</span>
        </div>
      </form>

      {state.kind === "unavailable" && <p className="agx-try-note">{state.note}</p>}
      {state.kind === "error" && <p className="agx-try-note is-error" role="alert">{state.message}</p>}
      {state.kind === "running" && <p className="agx-try-note" aria-live="polite">The agent is reading your text. About ten seconds.</p>}

      {result && (
        <div className="agx-try-doc" aria-live="polite">
          <div className="agentx-docbar">
            <span className="agentx-docbar-file">{copy.filename}</span>
            <span className="agentx-docbar-kind">{copy.kind}</span>
          </div>
          <article className={`agentx-doc agentx-doc--${copy.kind} agx-try-doc-body`}>
            {offTask ? (
              <>
                <DocTitle business="Your text" title="Not this demo’s job" />
                <DocProse>{result.note || "That didn’t read like the kind of text this demo handles. Paste a contract excerpt or a customer message and try again."}</DocProse>
              </>
            ) : tool === "contract-review" ? (
              <ContractDoc result={result as ContractResult} />
            ) : (
              <InboxDoc result={result as InboxResult} />
            )}
          </article>
        </div>
      )}

      <p className="agx-try-foot">A demo, not advice. Nothing you paste is stored.</p>
    </section>
  );
}
