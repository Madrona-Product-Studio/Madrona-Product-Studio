// Wordmark-bearing lockups: same emblem art, new Lexend/DM Sans wordmark.
import horizontal from "../../assets/brand/madrona-logo-horizontal.svg";
import horizontalReversed from "../../assets/brand/madrona-logo-horizontal-reversed.svg";
// Emblem-only marks: unchanged (existing approved emblem).
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
