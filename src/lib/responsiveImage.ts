// Responsive raster images. Tiles are imported through vite-imagetools with
// a width list, e.g.
//   import tile from "../../docs/.../helm-tile.webp?w=640;960;1280&format=webp&as=img";
// which yields { src, srcset, w, h }. imgProps() turns that into the <img>
// attributes (src, srcSet, sizes, intrinsic width/height so the browser
// reserves the box before the bytes arrive). `sizes` must describe the
// rendered width at each breakpoint; the presets below are measured from
// the CSS of the surfaces they serve.
//
// Width presets: LARGE for sources 1300px and up, SMALL for the 900px
// photography, PORTRAIT for the round headshots (rendered 180-276px).
//   LARGE    ?w=640;960;1280&format=webp&as=img
//   SMALL    ?w=450;720;900&format=webp&as=img
//   PORTRAIT ?w=360;520;780&format=webp&as=img

export interface ResponsiveImage {
  src: string;
  srcset?: string;
  w: number;
  h: number;
}

export const SIZES = {
  // Four-up tile grids on a 1240px shell.
  tile4: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 50vw, 300px",
  // Three-up tile grid on a 1240px shell (home proof strip, after the
  // 2026-09-09 density pass dropped Berry Good's duplicate card).
  tile3: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 235px, 404px",
  // Half of the shell: services overview art, door-page module image.
  half: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 720px, 576px",
  // The door page hero figure (min(520px, 92%) of its column).
  doorHero: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 720px, 520px",
  // The Berry Good window (max-width 560px, full width under 900px).
  berry: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 720px, 560px",
  // /apps product row artifact column.
  appTile: "(max-width: 560px) calc(100vw - 44px), (max-width: 1050px) 48vw, 345px",
  // About: the network-diagram portrait, the photo pair, the place figure.
  aboutPortrait: "(max-width: 900px) 188px, 276px",
  aboutPair: "(max-width: 900px) 45vw, 280px",
  aboutPlace: "(max-width: 900px) calc(100vw - 40px), 560px",
  // /charlie hub portrait.
  charliePortrait: "(max-width: 900px) 180px, 260px",
} as const;

export function imgProps(img: ResponsiveImage, sizes: string) {
  return { src: img.src, srcSet: img.srcset, sizes, width: img.w, height: img.h };
}
