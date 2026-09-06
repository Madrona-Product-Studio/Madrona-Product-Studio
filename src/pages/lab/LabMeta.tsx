import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metaFor, SITE_NAME } from "../../data/siteMeta.mjs";

// Favicon is the bold frond on the charcoal disc (public/favicon.svg +
// apple-touch-icon.png). These win over index.html at runtime.
const FAVICON_SVG = "/favicon.svg?v=5";
const APPLE_ICON = "/apple-touch-icon.png?v=5";

// Per-page head management. On every client navigation the document head is
// brought in line with the route's row in src/data/siteMeta.mjs (the same
// table the prerender bakes into the static HTML): title, description,
// Open Graph + Twitter tags, canonical, robots. The passed title is the
// fallback for routes the table does not know.
//
// noindex is opt-in: the V2 pages ARE the live site and must be indexable.
// Google honors a JS-injected robots meta, so a default noindex here would
// de-index the whole site. The table's noindex flag is honored too.

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) { el = create(); document.head.appendChild(el); }
  el.content = content;
  return el;
}
function namedMeta(name: string, content: string) {
  return upsertMeta(`meta[name="${name}"]`, () => Object.assign(document.createElement("meta"), { name }), content);
}
function propertyMeta(property: string, content: string) {
  return upsertMeta(`meta[property="${property}"]`, () => {
    const el = document.createElement("meta");
    el.setAttribute("property", property);
    return el;
  }, content);
}

export default function LabMeta({ title, noindex = false }: { title: string; noindex?: boolean }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(pathname);
    const finalTitle = meta?.title ?? title;
    const finalNoindex = noindex || Boolean(meta?.noindex);

    const previousTitle = document.title;
    const existingRobots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = existingRobots?.content;
    const previousIcons = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]'));
    const previousIconState = previousIcons.map((link) => ({ link, href: link.href, type: link.type }));

    let robots: HTMLMetaElement | null = null;
    if (finalNoindex) {
      robots = existingRobots ?? document.head.appendChild(document.createElement("meta"));
      robots.name = "robots";
      robots.content = "noindex, nofollow";
    } else if (existingRobots) {
      // A previous (noindex) page left the tag behind: clear it, since the
      // cleanup below runs after this effect on route changes.
      existingRobots.remove();
    }
    document.title = finalTitle;

    if (meta) {
      namedMeta("description", meta.description);
      propertyMeta("og:type", meta.ogType);
      propertyMeta("og:title", meta.title);
      propertyMeta("og:description", meta.description);
      propertyMeta("og:image", meta.ogImage);
      propertyMeta("og:image:alt", meta.ogImageAlt);
      propertyMeta("og:url", meta.url);
      propertyMeta("og:site_name", SITE_NAME);
      namedMeta("twitter:title", meta.title);
      namedMeta("twitter:description", meta.description);
      namedMeta("twitter:image", meta.ogImage);
      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = meta.url;
    }

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
        if (existingRobots && previousRobots) existingRobots.content = previousRobots;
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
  }, [title, noindex, pathname]);

  return null;
}
