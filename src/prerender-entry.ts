// Build-time only: loaded by scripts/prerender.mjs through Vite's SSR loader,
// never by the browser bundle. Renders the real route tree to static HTML so
// the plain copy of each page (in the HTML, the .md files and llms.txt) is
// read off the same components a visitor sees and cannot drift from them.
import { createElement } from "react";
import { StaticRouter } from "react-router-dom";
import { prerender } from "react-dom/static";
import { AppRoutes } from "./App";

export { AI_PATH } from "./data/offer";
export { CONTACT_EMAIL, CONTACT_PATH, REPLY_PROMISE } from "./data/contact";

export async function renderRoute(route: string): Promise<string> {
  // prerender waits for every lazy route chunk before it resolves.
  const { prelude } = await prerender(
    createElement(StaticRouter, { location: route }, createElement(AppRoutes)),
  );
  return new Response(prelude).text();
}
