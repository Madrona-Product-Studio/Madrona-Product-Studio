// Suspense fallback for route-split pages: reserves a full-height page ground
// in the current sky's color while the chunk loads, so navigating to a lazy
// route never flashes a different color or collapses the scroll height. No
// spinner; the page arrives in under a frame on a warm cache and the settle
// animation carries the arrival.
export default function RouteGround() {
  return <div aria-hidden="true" style={{ minHeight: "100vh", background: "var(--color-bg)" }} />;
}
