import { useEffect, useRef, useState } from "react";
import { getPref, setPref, skyState, THEME_EVENT, type ThemePref, type ThemeState } from "../../lib/theme";
import { track } from "../../lib/analytics";

// The sky switcher (header, 2026-08-30). Auto is not an option — the site
// always follows the Bellingham sun; this control shows what the sky decided
// (one glyph, left of Get in touch) and opens on click into a small panel
// under the face: the three states with visible labels, plus a one-line
// hint saying whether the sky or a pin is in charge (audit 2026-09-06; the
// old leftward glyph row slid over the wordmark on phones). Re-tapping the
// pinned state hands control back to the sky. Collapses on pick, Escape,
// or outside click.
const STATES: { value: ThemeState; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "dusk", label: "Dusk" },
  { value: "night", label: "Night" },
];

function Glyph({ state }: { state: ThemeState }) {
  if (state === "day") return <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><circle cx="10" cy="10" r="3.6" /><path d="M10 2.4v2M10 15.6v2M2.4 10h2M15.6 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M15.4 4.6 14 6M6 14l-1.4 1.4" /></svg>;
  if (state === "dusk") return <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 12.5a7 7 0 0 1 14 0" /><path d="M2 15.5h16M5.5 18h9" /></svg>;
  return <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" /></svg>;
}

export default function SkySwitcher() {
  const [pref, setPrefState] = useState<ThemePref>(() => getPref());
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const current: ThemeState = pref === "auto" ? skyState() : pref;

  useEffect(() => {
    const onTheme = (e: Event) =>
      setPrefState((e as CustomEvent<{ pref: ThemePref }>).detail.pref);
    window.addEventListener(THEME_EVENT, onTheme);
    return () => window.removeEventListener(THEME_EVENT, onTheme);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: Event) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); ref.current?.querySelector<HTMLButtonElement>(".sky-switch-face")?.focus(); } };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("pointerdown", close); window.removeEventListener("keydown", esc); };
  }, [open]);

  const choose = (value: ThemeState) => {
    // Re-tapping the pinned state hands control back to the sky.
    const next: ThemePref = pref === value ? "auto" : value;
    setPref(next);
    setPrefState(next);
    track("theme_switch", { theme: next, source: "header" });
    setOpen(false);
  };

  const currentLabel = STATES.find(s => s.value === current)?.label;
  const pinned = pref !== "auto";
  const hint = pinned ? "Pinned until the sky changes" : "Following the Bellingham sky";

  return (
    <div className={`sky-switch${open ? " is-open" : ""}`} ref={ref}>
      <button
        type="button"
        className="sky-switch-face"
        aria-expanded={open}
        aria-controls="sky-switch-panel"
        aria-label={`Sky: ${currentLabel}, ${hint.toLowerCase()}. Choose a sky.`}
        title={pinned ? `${hint}. Tap the pinned sky again to follow the sun.` : hint}
        onClick={() => setOpen(!open)}
      >
        <Glyph state={current} />
      </button>
      <div id="sky-switch-panel" className="sky-switch-panel" aria-hidden={!open}>
        <div className="sky-switch-row" role="group" aria-label="Sky">
          {STATES.map((s, i) => (
            <button
              key={s.value}
              type="button"
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${40 + i * 30}ms` : "0ms" }}
              className={current === s.value ? "is-on" : undefined}
              aria-pressed={pref === s.value}
              aria-label={pref === s.value ? `${s.label}, pinned. Tap again to follow the sky.` : s.label}
              onClick={() => choose(s.value)}
            >
              <Glyph state={s.value} />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <p className="sky-switch-hint">{hint}</p>
      </div>
    </div>
  );
}
