import { WindowBar } from "./ReadCard";
import { imgProps, SIZES, type ResponsiveImage } from "../../lib/responsiveImage";

// A real piece of work as a landing-page hero, framed as a browser window
// (2026-10-05: Brand & Website opens on the brand collage, Ecommerce on the
// storefront).
export function HeroShot({ src, path, note, alt, position = "50% 0" }: { src: ResponsiveImage; path: string; note: string; alt: string; position?: string }) {
  return <figure className="v3-artifact ais-hero-img">
    <WindowBar path={path} note={note} />
    <img {...imgProps(src, SIZES.berry)} alt={alt} style={{ objectPosition: position }} decoding="async" />
  </figure>;
}
