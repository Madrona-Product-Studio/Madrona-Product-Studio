export interface Article {
  title: string;
  description: string;
  date: string;
  url: string;
  source: string;
}

// TODO: Add real articles and links
export const articles: Article[] = [
  {
    title: "Placeholder: The Case for Smaller Product Teams",
    description:
      "Why the best product work is happening in small, senior teams — not scaled organizations.",
    date: "2025-01-15",
    url: "#",
    source: "LinkedIn",
  },
  {
    title: "Placeholder: What Fractional Product Leadership Actually Looks Like",
    description:
      "A practical look at how embedded product leadership works for early-stage teams.",
    date: "2024-11-20",
    url: "#",
    source: "LinkedIn",
  },
  {
    title: "Placeholder: Strategy Sprints — When and Why",
    description:
      "How a focused sprint can unblock a roadmap that's been stuck for months.",
    date: "2024-09-05",
    url: "#",
    source: "LinkedIn",
  },
];
