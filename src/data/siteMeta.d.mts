// Types for siteMeta.mjs (kept as plain ESM so the Node prerender can import
// it without a build step). Keep the two files in step.

export interface ArticleDates {
  datePublished: string; // ISO date, YYYY-MM-DD
  dateModified?: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export interface PageMeta {
  title: string;
  description: string;
  h1: string;
  body: string;
  ogImage?: string;
  article?: ArticleDates;
  faq?: FaqEntry[];
  noindex?: boolean;
}

export interface ResolvedMeta {
  route: string;
  url: string;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: "article" | "website";
  noindex: boolean;
  article: ArticleDates | null;
}

export const SITE_ORIGIN: string;
export const SITE_NAME: string;
export const DEFAULT_OG_IMAGE: string;
export const DEFAULT_OG_ALT: string;
export const starterGuideFaq: FaqEntry[];
export const notFound: {
  title: string;
  kicker: string;
  h1: string;
  body: string;
  links: { to: string; label: string }[];
};
export const pages: Record<string, PageMeta>;

export function normalizePath(pathname: string): string;
export function resolveOgImage(route: string, meta: PageMeta | undefined): string;
export function ogImageAlt(meta: PageMeta | undefined): string;
export function metaFor(pathname: string): ResolvedMeta | null;
export function monthLabel(iso: string, opts?: { short?: boolean }): string;
export function publishedLabel(route: string, opts?: { short?: boolean }): string;
export function updatedLabel(route: string, opts?: { short?: boolean }): string;
