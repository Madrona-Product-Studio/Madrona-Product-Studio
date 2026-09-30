// Homepage choreography (Charlie, 2026-09-29): the hero's this-week panel plays
// first, then whatever sits below it (the bridge) makes its entrance. The hero
// announces when it has settled; followers wait for that signal, unless the
// visitor has already scrolled past the hero, reduced motion is on, or a
// fallback timeout passes, so nothing below can ever get stuck.

const EVENT = "madrona:hero-settled";
let settled = false;

/** Called by the hero once its sequence has finished (or will not play). */
export function markHeroSettled() {
  if (settled) return;
  settled = true;
  window.dispatchEvent(new Event(EVENT));
}

/** Resets the flag when the hero mounts, so a client-side revisit replays in order. */
export function resetHeroSequence() {
  settled = false;
}

/**
 * Runs `cb` once the hero has settled, or after `fallbackMs`, whichever is
 * first. Returns a cleanup function.
 */
export function afterHero(cb: () => void, fallbackMs = 5200): () => void {
  if (settled) { cb(); return () => {}; }
  let done = false;
  const run = () => { if (done) return; done = true; window.removeEventListener(EVENT, run); clearTimeout(timer); cb(); };
  const timer = window.setTimeout(run, fallbackMs);
  window.addEventListener(EVENT, run);
  return () => { done = true; window.removeEventListener(EVENT, run); clearTimeout(timer); };
}
