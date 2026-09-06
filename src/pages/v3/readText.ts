// The read as plain text: what the emailed copy carries. Same sections as
// the card, in order, with the proof URLs spelled out. No HTML on purpose;
// a read is a document, and plain text survives every mail client.

import type { OpportunityReportData } from "./opportunityEngine.js";

export const SITE_ORIGIN = "https://madronaproduct.com";

export function renderReadText(report: OpportunityReportData, opts: { permalink: string; today: string }): string {
  const lines: string[] = [];
  const url = (path: string) => `${SITE_ORIGIN}${path}`;

  lines.push("AI OPPORTUNITY ASSESSMENT");
  lines.push(`Madrona Product Studio · ${opts.today}`);
  lines.push("");
  lines.push(report.title.toUpperCase());
  lines.push(`${report.overall.grade} ${report.overall.note}`);
  lines.push("");

  const { map } = report;
  if (map.runsItself.length || map.amplified.length || map.staysYours.length) {
    lines.push("YOUR WEEK, SORTED");
    if (map.runsItself.length) {
      lines.push("Runs itself:");
      for (const item of map.runsItself) lines.push(`  - ${item.label}${item.proofLive ? ` (live: ${url(item.proofHref)})` : ""}`);
    }
    if (map.amplified.length) {
      lines.push("You, amplified:");
      for (const item of map.amplified) lines.push(`  - ${item.label}${item.proofLive ? ` (live: ${url(item.proofHref)})` : ""}`);
    }
    if (map.staysYours.length) {
      lines.push("Stays yours:");
      for (const line of map.staysYours) lines.push(`  - ${line}`);
    }
    lines.push("");
  }

  lines.push("WHERE TO START");
  if (report.movesLead) lines.push(report.movesLead);
  if (report.moves.length) {
    for (const { rank, move } of report.moves) {
      lines.push(`${rank.toUpperCase()}: ${move.headline}`);
      lines.push(`  ${move.support}`);
      lines.push(`  ${move.proofLabel.replace(" →", "")}: ${url(move.proofHref)}`);
    }
  } else {
    lines.push("Nothing urgent flagged. Worth retaking in a month if the week changes.");
  }
  lines.push("");

  if (report.tools.length) {
    lines.push("TOOLS WORTH A LOOK");
    for (const tool of report.tools) {
      lines.push(`${tool.name}: ${url(tool.href)}`);
      lines.push(`  ${tool.blurb}`);
    }
    lines.push(`Every tool, with live demos: ${url("/tools")}`);
    lines.push("");
  }

  if (report.heard.length) {
    lines.push("WHAT WE HEARD");
    for (const line of report.heard) lines.push(`- ${line}`);
    lines.push("");
  }

  lines.push("This read lives at:");
  lines.push(opts.permalink);
  lines.push("");
  lines.push("Assembled from your answers. A free read from Madrona Product Studio, PNW, USA.");
  lines.push(`Talk it through: ${url("/connect")}`);
  return lines.join("\n");
}
