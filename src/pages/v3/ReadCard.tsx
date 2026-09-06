// The shared browser-window chrome for hero/lab artifacts. Lives here (not in
// Hero.tsx) so the assessment can render the card without pulling in the hero.
export function WindowBar({ path, note }: { path: string; note?: string }) {
  return <header className="v3-window-bar"><span className="v3-window-dots" aria-hidden="true"><i /><i /><i /></span><code>{path}</code>{note && <small>{note}</small>}</header>;
}
