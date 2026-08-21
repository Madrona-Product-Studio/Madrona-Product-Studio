// Shared line-icon paths for agent pages (pipeline beats + needs/ends facts).
// Kept in its own module so the template file only exports components
// (react-refresh / fast-refresh requirement).
export const AGENT_ICONS = {
  key: "M15 9a4 4 0 1 0-5.6 3.7L4 18v2h3v-2h2v-2h2l1.3-1.3A4 4 0 0 0 15 9Z",
  flag: "M5 21V4m0 1h12l-2.5 3.5L17 12H5",
  link: "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1",
  match: "M2 12l5 5L18 6M22 10l-9 9-2-2",
  shield: "M12 3l7 3v5c0 4.5-3 7-7 8-4-1-7-3.5-7-8V6zM9.5 12l1.8 1.8L15 10",
  doc: "M14 3v5h5M14 3H6v18h12V8zM9 13h6M9 17h4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  mail: "M4 5h16v14H4zM4 6l8 6 8-6",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0",
  chart: "M3 3v18h18M7 15l3-4 3 3 4-6",
  filter: "M3 5h18l-7 8v5l-4 2v-7z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
} as const;
