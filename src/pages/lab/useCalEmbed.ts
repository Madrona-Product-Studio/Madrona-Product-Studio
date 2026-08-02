import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_LINK, BOOKING_URL } from "../../data/booking";

// Cal.com popup embed for the "Book a time" CTAs. Call useCalEmbed() once per
// page that has a booking button; add {...bookProps()} to the button and use
// bookHref() as its href fallback. All no-ops gracefully when CAL_LINK is unset.

export function useCalEmbed() {
  useEffect(() => {
    if (!CAL_LINK) return;
    let cancelled = false;
    (async () => {
      const cal = await getCalApi();
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#c86a3d" }, dark: { "cal-brand": "#c86a3d" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
    return () => { cancelled = true; };
  }, []);
}

// Attributes the cal.com embed hooks onto to open the popup on click.
export function bookProps(): Record<string, string> {
  if (!CAL_LINK) return {};
  return { "data-cal-link": CAL_LINK, "data-cal-config": JSON.stringify({ layout: "month_view" }) };
}

// Fallback href (used if the embed script hasn't loaded / JS disabled).
export function bookHref(): string {
  if (CAL_LINK) return `https://cal.com/${CAL_LINK}`;
  return BOOKING_URL || "/connect";
}

// When the embed is active, the modal handles the click — suppress the
// anchor's own navigation so a new tab doesn't open alongside the modal.
// With JS disabled the handler never runs and the href still works.
export function bookClick(e: { preventDefault: () => void }): void {
  if (CAL_LINK) e.preventDefault();
}
