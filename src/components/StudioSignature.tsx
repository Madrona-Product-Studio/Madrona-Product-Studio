interface Props {
  variant?: "light" | "dark";
}

export default function StudioSignature({ variant = "light" }: Props) {
  const isLight = variant === "light";

  return (
    <div
      className={`w-full border-t ${
        isLight
          ? "bg-cream border-cream-dark"
          : "bg-ink border-ink-light/20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-end">
        <a
          href="https://madronaproduct.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-serif text-sm font-medium no-underline transition-colors ${
            isLight
              ? "text-ink-light hover:text-ink"
              : "text-cream-dark/60 hover:text-cream-dark"
          }`}
        >
          Madrona Product Studio
        </a>
      </div>
    </div>
  );
}
