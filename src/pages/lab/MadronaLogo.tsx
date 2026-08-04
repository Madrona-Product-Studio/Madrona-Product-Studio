import horizontal from "../../assets/brand/madrona-logo-horizontal.svg";
import horizontalReversed from "../../assets/brand/madrona-logo-horizontal-reversed.svg";
import standalone from "../../assets/brand/madrona-mark.svg";
import standaloneReversed from "../../assets/brand/madrona-mark-reversed.svg";

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
