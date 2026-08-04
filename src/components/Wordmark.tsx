import { Link } from "react-router-dom";
import logotype from "../assets/brand/madrona-logotype.svg";
import logotypeReversed from "../assets/brand/madrona-logotype-reversed.svg";
import mark from "../assets/brand/madrona-mark.svg";

// Heights (px) of the locked logotype artwork per size.
const heights = {
  sm: { full: 30, mark: 26 },
  md: { full: 40, mark: 34 },
  lg: { full: 58, mark: 48 },
} as const;

interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
  as?: "div" | "a";
  /** Use the reversed (paper + light terracotta) artwork for dark backgrounds. */
  reversed?: boolean;
  className?: string;
}

export default function Wordmark({
  size = "md",
  variant = "full",
  as = "div",
  reversed = false,
  className = "",
}: Props) {
  const height = heights[size][variant];
  const src = variant === "mark" ? mark : reversed ? logotypeReversed : logotype;

  const img = (
    <img
      src={src}
      alt="Madrona Product Studio"
      height={height}
      style={{ height, width: "auto" }}
      className="block select-none"
      draggable={false}
    />
  );

  if (as === "a") {
    return (
      <Link
        to="/"
        className={`inline-flex items-center no-underline hover:opacity-80 transition-opacity ${className}`}
        aria-label="Madrona Product Studio, home"
      >
        {img}
      </Link>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`} aria-label="Madrona Product Studio">
      {img}
    </div>
  );
}
