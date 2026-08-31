import { useEffect, useState } from "react";
import { THEME_EVENT, currentState, type ThemeState } from "../../lib/theme";

// The approved Madrona identity (frond, 2026-08-30): a sparse red frond
// (#E55728) on an Evergreen Charcoal disc (#2F3135), side-stack Figtree 600
// wordmark (MADRONA | PRODUCT / STUDIO, the frog structure; Charlie's pick).
// Production SVGs live in public/brand/ (generator: madrona-studio design
// library, frond-build/gen-lockups-figtree.py). The wordmark is outlined to
// paths — never rebuilt with a web font, never recolored via CSS filters.
// The lockup is theme-aware: dark sky states (dusk/night) swap to the
// reverse (cream-text) variants. Palette grounds for other surfaces live at
// public/brand/frond-{forest,moss,plum,bark}-*.svg.
type MadronaLogoVariant =
  | "horizontal"
  | "horizontal-reversed"
  | "standalone"
  | "standalone-reversed";

type MadronaLogoProps = {
  variant?: MadronaLogoVariant;
  className?: string;
  decorative?: boolean;
};

const logoSources: Record<MadronaLogoVariant, string> = {
  horizontal: "/brand/madrona-frond-horizontal.svg",
  "horizontal-reversed": "/brand/madrona-frond-horizontal-reverse.svg",
  standalone: "/brand/madrona-frond-mark.svg",
  "standalone-reversed": "/brand/madrona-frond-mark.svg",
};

function useThemeState(): ThemeState {
  const [state, setState] = useState<ThemeState>(() =>
    typeof document === "undefined" ? "day" : currentState());
  useEffect(() => {
    const onTheme = (e: Event) =>
      setState((e as CustomEvent<{ state: ThemeState }>).detail.state);
    window.addEventListener(THEME_EVENT, onTheme);
    return () => window.removeEventListener(THEME_EVENT, onTheme);
  }, []);
  return state;
}

export default function MadronaLogo({
  variant = "horizontal",
  className,
  decorative = false,
}: MadronaLogoProps) {
  const theme = useThemeState();
  const effective: MadronaLogoVariant =
    theme !== "day" && variant === "horizontal" ? "horizontal-reversed" : variant;
  return (
    <img
      className={["madrona-static-logo", className].filter(Boolean).join(" ")}
      data-logo-variant={effective}
      src={logoSources[effective]}
      alt={decorative ? "" : "Madrona Product Studio"}
    />
  );
}
