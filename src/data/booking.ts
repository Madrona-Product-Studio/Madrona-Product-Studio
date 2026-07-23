// Booking destination for every "Book a 30m free chat" CTA sitewide.
//
// When the Google Calendar appointment schedule exists (calendar.google.com
// → Create → Appointment schedule → "30-minute conversation" → share link),
// set BOOKING_URL to that link and every CTA switches to direct booking.
// Until then, CTAs route to /how-it-works, whose own button falls back to
// the /contact form.
export const BOOKING_URL: string | null = null;
