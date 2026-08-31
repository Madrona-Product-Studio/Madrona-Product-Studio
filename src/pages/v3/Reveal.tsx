// Scroll reveal — the "Settle" direction (motion pass 2026-08-30). Sections
// below the fold rise ~16px and ease into place as they enter; anything on
// screen at load renders instantly with no entrance. Hidden states only ever
// come from the rv-armed class this component adds at runtime, so no-JS and
// reduced-motion paths always get the resting design.
import { createElement, useEffect, useRef, useState } from "react";

export default function Reveal({ as = "div", className = "", children, ...rest }: { as?: React.ElementType; className?: string; children: React.ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"idle" | "armed" | "in">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setPhase("armed");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPhase("in"); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `${className} rv${phase === "armed" ? " rv-armed" : ""}${phase === "in" ? " rv-in" : ""}`.trim();
  return createElement(as, { ref, className: cls, ...rest }, children);
}
