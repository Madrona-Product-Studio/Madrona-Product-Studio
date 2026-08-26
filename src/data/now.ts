// The "Now" strip — one quiet announcement above the nav, sitewide.
// The FIRST entry is the one that shows; keep the list curated so swapping
// the headline is a one-line reorder. Retired entries can simply be deleted.
export type NowItem = {
  /** Short uppercase chip: "New" · "Coming up" · "Now booking" */
  tag: string;
  text: string;
  /** Internal route, or full URL with external: true */
  href: string;
  external?: boolean;
};

export const nowItems: NowItem[] = [
  {
    tag: "New",
    text: "The era of agentic operations",
    href: "/thinking/the-era-of-agentic-operations",
  },
  {
    tag: "Now booking",
    text: "Free 30-minute conversations for September",
    href: "/connect",
  },
];

export const nowItem: NowItem | undefined = nowItems[0];
