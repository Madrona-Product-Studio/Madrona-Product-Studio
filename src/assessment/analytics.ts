// Assessment funnel events — thin wrapper over the sitewide dual-sink helper
// so existing call sites keep their name.
import { track } from "../lib/analytics";

type EventParams = Record<string, string | number | boolean>;

export function trackAssessment(event: string, params?: EventParams) {
  track(event, params);
}
