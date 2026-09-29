// Selected work: the marine survey report tool (positioning clarity pass,
// 2026-09-29). Charlie's flagship example of "AI in the workflow". Real client
// work, anonymized as "a marine surveyor" until the client grants reference
// permission (item 1 in the draft terms). Claims stay honest to the stage: the
// ~3 hours is his current write-up time from our research; the tool is a proof
// of concept, so the page states the goal and never a measured time saving.
const steps = [
  ["Read", "His shorthand becomes structured findings, each with a confidence level."],
  ["Confirm", "Anything uncertain waits for him. Nothing enters the report unconfirmed."],
  ["Assemble", "Findings, system tables, and photos land in his template, numbered and cross-referenced."],
  ["Value", "Comparable sales become a draft value range he can adjust."],
];

export function WorkStorySection() {
  return <section className="v3-section v3-band-light v3-story" id="work"><div className="v3-shell v3-story-grid">
    <div className="v3-story-rail">
      <p className="v3-kicker">Selected work</p>
      <h2>From field notes to a finished report.</h2>
      <p className="v3-help-lede">A marine surveyor spends a few hours on a boat, then about three more hours at his desk turning shorthand notes and camera photos into a 35-page condition and valuation report. We built a tool that does the assembly, so he starts from a draft instead of a blank page.</p>
      <p className="v3-story-meta"><span>Client work</span><span>AI in the workflow</span><span>Proof of concept, in review</span></p>
    </div>
    <div className="v3-story-body">
      <ol className="v3-story-steps">{steps.map(([name, body], index) => <li key={name}><span>0{index + 1}</span><strong>{name}</strong><p>{body}</p></li>)}</ol>
      <div className="v3-story-bar">
        <div><span>Before</span><p>About three hours of typing per report, in a Word template he built himself.</p></div>
        <div><span>The goal</span><p>Start from a draft he reviews and finishes in Word, with no loss in quality.</p></div>
      </div>
    </div>
  </div></section>;
}
