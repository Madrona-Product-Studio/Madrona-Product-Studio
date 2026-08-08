import { useEffect } from "react";

// Favicon is the simple square-M (public/favicon.svg + apple-touch-icon.png).
// These win over index.html at runtime; keep them pointed at the square mark,
// never the detailed tree mark.
const FAVICON_SVG = "/favicon.svg?v=4";
const APPLE_ICON = "/apple-touch-icon.png?v=4";

// noindex is opt-in: the V2 pages ARE the live site and must be indexable.
// Pass noindex only on genuinely internal routes (design-system lab,
// unpublished notes). Google honors a JS-injected robots meta, so a default
// noindex here would de-index the whole site.
export default function LabMeta({ title, noindex = false }: { title: string; noindex?: boolean }) {
  useEffect(() => {
    const previousTitle = document.title;
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = existing?.content;
    const previousIcons = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]'));
    const previousIconState = previousIcons.map((link) => ({
      link,
      href: link.href,
      type: link.type,
    }));
    let robots: HTMLMetaElement | null = null;
    if (noindex) {
      robots = existing ?? document.head.appendChild(document.createElement("meta"));
      robots.name = "robots";
      robots.content = "noindex, nofollow";
    }
    document.title = title;

    previousIcons.forEach((link) => link.remove());
    const vectorIcon = document.createElement("link");
    vectorIcon.rel = "icon";
    vectorIcon.type = "image/svg+xml";
    vectorIcon.href = FAVICON_SVG;
    document.head.appendChild(vectorIcon);
    const appleIcon = document.createElement("link");
    appleIcon.rel = "apple-touch-icon";
    appleIcon.href = APPLE_ICON;
    document.head.appendChild(appleIcon);

    return () => {
      document.title = previousTitle;
      if (robots) {
        if (existing && previousContent) existing.content = previousContent;
        else robots.remove();
      }
      vectorIcon.remove();
      appleIcon.remove();
      previousIconState.forEach(({ link, href, type }) => {
        link.href = href;
        link.type = type;
        document.head.appendChild(link);
      });
    };
  }, [title, noindex]);

  return null;
}
