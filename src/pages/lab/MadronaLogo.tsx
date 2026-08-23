// 2x-density webp derivatives of the approved raster lockups (same artwork,
// downscaled to ~2x the largest display size so we don't ship the 394kB
// source PNG on every page).
import horizontal from "../../../docs/madrona_static_logo_assets/madrona-approved-logo-transparent-2x.webp";
import horizontalReversed from "../../../docs/madrona_static_logo_assets/madrona-approved-logo-reversed-transparent-2x.webp";
import standalone from "../../../docs/madrona_static_logo_assets/madrona-approved-emblem-transparent-2x.webp";
import standaloneReversed from "../../../docs/madrona_static_logo_assets/madrona-approved-emblem-reversed-transparent-2x.webp";

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
