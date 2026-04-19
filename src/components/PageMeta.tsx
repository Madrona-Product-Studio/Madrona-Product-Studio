import { useEffect } from "react";

interface Props {
  title?: string;
  description?: string;
}

const SITE_NAME = "Madrona Product Studio";
const DEFAULT_DESCRIPTION =
  "A small, senior product studio based in the Pacific Northwest. Strategy sprints, rapid prototyping, and fractional product leadership.";

export default function PageMeta({ title, description }: Props) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Senior Product Studio, Pacific Northwest`;
  const desc = description || DEFAULT_DESCRIPTION;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };

    setMeta("name", "description", desc);
    setMeta("property", "og:title", title || SITE_NAME);
    setMeta("property", "og:description", desc);
    setMeta("name", "twitter:title", title || SITE_NAME);
    setMeta("name", "twitter:description", desc);
  }, [fullTitle, desc, title]);

  return null;
}
