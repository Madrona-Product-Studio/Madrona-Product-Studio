// The approved Madrona identity (frond, 2026-08-30): a sparse red frond
// (#E55728) on an Evergreen Charcoal disc (#2F3135), Jost 500 spaced-caps
// wordmark with PRODUCT STUDIO in the red. Production SVGs live in
// public/brand/ (generator: madrona-studio design library, frond-build/
// gen-lockups.py). The wordmark is outlined to paths — never rebuilt with
// a web font, never recolored via CSS filters. The other palette grounds
// (frond-{forest,moss,plum,bark}-*.svg) are system assets for OG cards,
// studio signatures, and app icons.
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

// Horizontal lockups use UI-tightened viewBox variants (the brief's originals
// bake in ~30% whitespace on the right, which made the header logo render
// small and left-floated). The mark is untouched — only dead space removed.
const logoSources: Record<MadronaLogoVariant, string> = {
  horizontal: "/brand/madrona-frond-horizontal.svg",
  "horizontal-reversed": "/brand/madrona-frond-horizontal-reverse.svg",
  standalone: "/brand/madrona-frond-mark.svg",
  "standalone-reversed": "/brand/madrona-frond-mark.svg",
};

export default function MadronaLogo({
  variant = "horizontal",
  className,
  decorative = false,
}: MadronaLogoProps) {
  return (
    <img
      className={["madrona-static-logo", className].filter(Boolean).join(" ")}
      data-logo-variant={variant}
      src={logoSources[variant]}
      alt={decorative ? "" : "Madrona Product Studio"}
    />
  );
}
