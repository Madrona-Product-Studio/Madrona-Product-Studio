// The approved Madrona identity (2026-08-29): a madrona tree on a coastal
// bluff in an open circular frame, warm pixel-block canopy. Production SVGs
// live in public/brand/ (source of truth: the logo package's implementation
// brief). The wordmark in the horizontal/stacked lockups is already outlined
// — never rebuilt with a web font, never recolored via CSS filters.
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
  horizontal: "/brand/madrona-horizontal-color.svg",
  "horizontal-reversed": "/brand/madrona-horizontal-reverse.svg",
  standalone: "/brand/madrona-mark-color.svg",
  "standalone-reversed": "/brand/madrona-mark-reverse.svg",
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
