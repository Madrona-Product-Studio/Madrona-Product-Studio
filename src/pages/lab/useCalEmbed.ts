import { CAL_LINK, BOOKING_URL } from "../../data/booking";
import { track } from "../../lib/analytics";

// Cal.com popup booking, loaded only when someone books. Nothing here touches
// the network at page load: the embed script (~90 KB from app.cal.com) is
// fetched the first time a booking button is hovered/focused (prefetchCal)
// or clicked (bookClick), and the popup is opened programmatically.
//
// Wiring for a booking CTA:
//   <a href={bookHref()} {...bookProps()} onClick={bookClick}>Book a call</a>
// bookHref() is the no-JS fallback, bookProps() warms the embed on intent,
// bookClick() records the conversion and opens the modal. All of it no-ops
// gracefully when CAL_LINK is unset.

type CalApi = Awaited<ReturnType<typeof import("@calcom/embed-react").getCalApi>>;

let calPromise: Promise<CalApi> | null = null;
let uiApplied = false;

// Start loading the embed (idempotent). Safe to call on pointerenter/focus.
export function prefetchCal(): Promise<CalApi | null> {
  if (!CAL_LINK) return Promise.resolve(null);
  if (!calPromise) {
    calPromise = import("@calcom/embed-react").then(({ getCalApi }) => getCalApi());
    calPromise.catch(() => { calPromise = null; });
  }
  return calPromise;
}

// Brand the popup once. The embed applies "ui" to whatever iframe is live and
// replays it for later ones; calling it again after a closed modal tore its
// iframe down throws ("iframe doesn't exist"), so it runs exactly once and
// never after a modal has been opened.
function applyUi(cal: CalApi) {
  if (uiApplied) return;
  uiApplied = true;
  try {
    cal("ui", {
      theme: "light",
      cssVarsPerTheme: { light: { "cal-brand": "#E55728" }, dark: { "cal-brand": "#E55728" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  } catch {
    // Cosmetic only; the modal config below still carries the layout.
  }
}

// Open the booking popup. Resolves false when the embed is unavailable.
export async function openCal(notes?: string): Promise<boolean> {
  if (!CAL_LINK) return false;
  const cal = await prefetchCal();
  if (!cal) return false;
  applyUi(cal);
  cal("modal", { calLink: CAL_LINK, config: notes ? { layout: "month_view", notes } : { layout: "month_view" } });
  return true;
}

// Warm the embed on intent. Spread onto the booking anchor/button.
export function bookProps(): { onPointerEnter?: () => void; onFocus?: () => void } {
  if (!CAL_LINK) return {};
  const warm = () => { void prefetchCal(); };
  return { onPointerEnter: warm, onFocus: warm };
}

// Fallback href (used if the embed hasn't loaded / JS disabled).
export function bookHref(): string {
  if (CAL_LINK) return `https://cal.com/${CAL_LINK}`;
  return BOOKING_URL || "/connect";
}

// The one funnel event GA4/Vercel can't see on their own: the Cal.com popup
// lives outside the page, so the primary conversion is recorded here. Then
// the modal opens in place; if the embed can't load (blocked, offline) the
// click falls through to the plain cal.com page instead.
// A `data-cal-notes` attribute on the anchor (the assessment result sets one
// with the read) is prefilled into the booking's notes field.
export function bookClick(e: { preventDefault: () => void; currentTarget?: EventTarget | null }): void {
  track("book_click", { source: window.location.pathname });
  if (!CAL_LINK) return;
  e.preventDefault();
  const el = e.currentTarget as HTMLElement | null | undefined;
  const notes = el && el.dataset ? el.dataset.calNotes : undefined;
  void openCal(notes).then((opened) => {
    if (opened) return;
    const w = window.open(bookHref(), "_blank", "noopener");
    if (!w) window.location.assign(bookHref());
  }).catch(() => {
    window.location.assign(bookHref());
  });
}

// Kept for compatibility with pages that still call it; the embed no longer
// loads at mount, so there is nothing for a hook to do.
export function useCalEmbed(): void {}
