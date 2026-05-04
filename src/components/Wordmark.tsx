import { Link } from "react-router-dom";

const sizes = {
  sm: { text: "text-[16px]", bullet: "w-[10px] h-[10px]", gap1: "gap-1.5", gap2: "gap-2" },
  md: { text: "text-[22px]", bullet: "w-[14px] h-[14px]", gap1: "gap-2", gap2: "gap-2.5" },
  lg: { text: "text-[32px]", bullet: "w-[20px] h-[20px]", gap1: "gap-2.5", gap2: "gap-3" },
} as const;

interface Props {
  size?: "sm" | "md" | "lg";
  variant?: "full" | "mark";
  as?: "div" | "a";
  className?: string;
}

export default function Wordmark({ size = "md", variant = "full", as = "div", className = "" }: Props) {
  const s = sizes[size];

  const content = (
    <>
      <span
        className={`${s.bullet} rounded-full bg-madrona shrink-0`}
        aria-hidden="true"
      />
      {variant === "full" && (
        <span className={`flex items-baseline ${s.gap2} ${s.text} tracking-[-0.01em] leading-none`}>
          <span className="font-medium text-ink lowercase">madrona</span>
          <span className="font-light text-ink-light lowercase">product studio</span>
        </span>
      )}
    </>
  );

  const sharedClassName = `inline-flex items-center ${s.gap1} no-underline ${className}`;

  if (as === "a") {
    return (
      <Link
        to="/"
        className={`${sharedClassName} hover:opacity-80 transition-opacity`}
        aria-label="Madrona Product Studio — home"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className={sharedClassName} aria-label="Madrona Product Studio">
      {content}
    </div>
  );
}
