/// <reference types="vite/client" />

// vite-imagetools `as=img` imports (see src/lib/responsiveImage.ts): the
// largest rendition's URL and pixel size, plus a width-descriptor srcset
// when more than one width was requested.
declare module "*&as=img" {
  const img: { src: string; w: number; h: number; srcset?: string };
  export default img;
}
