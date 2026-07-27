// Ways to connect, wired in one place. The sitewide "Let's connect" CTA
// (see ConnectCta) routes to /connect, which surfaces these options.

// Direct booking link (calendar.google.com → Create → Appointment schedule →
// "30-minute conversation" → share link). The /connect "Book a call" option
// opens this in a new tab.
export const BOOKING_URL: string | null = "https://calendar.app.google/UsSNGWa1EdW6Az8aA";

// Cal.com booking. Set to your public event-type path: "username/event-slug"
// (e.g. "charlie-koch/30min" → cal.com/charlie-koch/30min). When set, the
// "Book a time" CTAs open the cal.com booking flow in an on-brand popup modal
// (via @calcom/embed-react); https://cal.com/<CAL_LINK> is the no-JS fallback.
// Leave null to fall back to BOOKING_URL.
export const CAL_LINK: string | null = "charlie-koch-kbd3ru/30min";

// Business texting number for the /connect "Send a text" option — NOT a
// personal cell. Set to an E.164 number (e.g. "+13605551234") once a service
// is chosen (Google Voice / OpenPhone); the text option renders only when set.
export const TEXT_NUMBER: string | null = null;
