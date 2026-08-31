// Day / dusk / night — the site follows the Bellingham sky (Charlie,
// 2026-08-30, born from the frond-board palette exercise). Three states:
//   day   — the warm-paper site
//   dusk  — smoky plum, ~40min either side of sunrise AND sunset
//   night — evergreen charcoal, the frond board's primary ground
// The schedule is computed locally (NOAA solar equations for Bellingham),
// no API. A visitor can override via the footer switcher or ?theme=; the
// sky schedule deliberately outranks prefers-color-scheme.
export type ThemeState = "day" | "dusk" | "night";
export type ThemePref = ThemeState | "auto";

const LAT = 48.7491;
const LON = -122.4787;
const DUSK_WINDOW_MIN = 40;
const STORE_KEY = "madrona-theme";
export const THEME_EVENT = "madrona-theme";

// NOAA sunrise/sunset (UTC minutes) for a given date at Bellingham.
function sunTimesUtcMin(date: Date): { rise: number; set: number } {
  const rad = Math.PI / 180;
  const start = new Date(Date.UTC(date.getUTCFullYear(), 0, 0));
  const doy = Math.floor((date.getTime() - start.getTime()) / 864e5);
  const g = ((2 * Math.PI) / 365) * (doy - 1);
  const eqtime =
    229.18 *
    (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) -
      0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl =
    0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) -
    0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) -
    0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const ha =
    Math.acos(
      Math.cos(90.833 * rad) / (Math.cos(LAT * rad) * Math.cos(decl)) -
        Math.tan(LAT * rad) * Math.tan(decl),
    ) / rad;
  return {
    rise: 720 - 4 * (LON + ha) - eqtime,
    set: 720 - 4 * (LON - ha) - eqtime,
  };
}

function nowUtcMin(now: Date): number {
  return now.getUTCHours() * 60 + now.getUTCMinutes() + now.getUTCSeconds() / 60;
}

export function skyState(now = new Date()): ThemeState {
  const { rise, set } = sunTimesUtcMin(now);
  const t = nowUtcMin(now);
  const near = (edge: number) => Math.abs(t - edge) <= DUSK_WINDOW_MIN;
  if (near(rise) || near(set)) return "dusk";
  if (t > rise && t < set) return "day";
  return "night";
}

export function getPref(): ThemePref {
  try {
    const v = localStorage.getItem(STORE_KEY);
    if (v === "day" || v === "dusk" || v === "night" || v === "auto") return v;
  } catch { /* private mode */ }
  return "auto";
}

function resolve(pref: ThemePref): ThemeState {
  return pref === "auto" ? skyState() : pref;
}

let fadeTimer = 0;
function apply(pref: ThemePref) {
  const root = document.documentElement;
  const state = resolve(pref);
  // Any change after boot washes in slowly — the sky doesn't snap.
  if (root.dataset.theme && root.dataset.theme !== state) {
    root.classList.add("theme-fading");
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => root.classList.remove("theme-fading"), 780);
  }
  root.dataset.theme = state;
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { state, pref } }));
}

export function currentState(): ThemeState {
  const v = document.documentElement.dataset.theme;
  return v === "dusk" || v === "night" ? v : "day";
}

export function setPref(pref: ThemePref) {
  try { localStorage.setItem(STORE_KEY, pref); } catch { /* private mode */ }
  apply(pref);
}

let timer = 0;
function scheduleNextCheck() {
  // Boundaries move by ~a minute a day; a once-a-minute check is cheap,
  // correct across DST, and keeps auto mode honest during long sessions.
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    if (getPref() === "auto") apply("auto");
    scheduleNextCheck();
  }, 60_000);
}

export function initTheme() {
  const param = new URLSearchParams(window.location.search).get("theme");
  if (param === "day" || param === "dusk" || param === "night" || param === "auto") {
    setPref(param);
  } else {
    apply(getPref());
  }
  scheduleNextCheck();
}
