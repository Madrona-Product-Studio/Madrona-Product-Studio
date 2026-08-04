import horizontal from "../../../docs/madrona_static_logo_assets/madrona-approved-logo-transparent.png";
import horizontalReversed from "../../../docs/madrona_static_logo_assets/madrona-approved-logo-reversed-transparent.png";
import standalone from "../../../docs/madrona_static_logo_assets/madrona-approved-emblem-transparent.png";
import standaloneReversed from "../../../docs/madrona_static_logo_assets/madrona-approved-emblem-reversed-transparent.png";

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
  horizontal,
  "horizontal-reversed": horizontalReversed,
  standalone,
  "standalone-reversed": standaloneReversed,
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
