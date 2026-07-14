interface Props {
  variant?: "light" | "dark";
}

export default function StudioSignature({ variant = "light" }: Props) {
  const isLight = variant === "light";

  return (
    <div
      className={`w-full border-t ${
        isLight
          ? "bg-paper border-line"
          : "bg-ink border-paper/15"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-end">
        <a
          href="https://madronaproduct.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-serif text-sm font-medium no-underline transition-colors ${
            isLight
              ? "text-ink70 hover:text-ink"
              : "text-paper/60 hover:text-paper"
          }`}
        >
          Madrona Product Studio
        </a>
      </div>
    </div>
  );
}
