import { useEffect } from "react";
import favicon from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-mark.svg";
import appIcon from "../../../docs/madrona-v2-build-kit/brand/madrona/web/apple-touch-icon-180.png";

export default function LabMeta({ title }: { title: string }) {
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
    const robots = existing ?? document.head.appendChild(document.createElement("meta"));
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.title = title;

    previousIcons.forEach((link) => link.remove());
    const vectorIcon = document.createElement("link");
    vectorIcon.rel = "icon";
    vectorIcon.type = "image/svg+xml";
    vectorIcon.href = favicon;
    document.head.appendChild(vectorIcon);
    const appleIcon = document.createElement("link");
    appleIcon.rel = "apple-touch-icon";
    appleIcon.href = appIcon;
    document.head.appendChild(appleIcon);

    return () => {
      document.title = previousTitle;
      if (existing && previousContent) existing.content = previousContent;
      else robots.remove();
      vectorIcon.remove();
      appleIcon.remove();
      previousIconState.forEach(({ link, href, type }) => {
        link.href = href;
        link.type = type;
        document.head.appendChild(link);
      });
    };
  }, [title]);

  return null;
}
