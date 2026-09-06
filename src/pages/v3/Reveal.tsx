// Scroll reveal — the "Settle" direction (motion pass 2026-08-30). Sections
// below the fold rise ~16px and ease into place as they enter; anything on
// screen at load renders instantly with no entrance. Hidden states only ever
// come from the rv-armed class this component adds at runtime, so no-JS and
// reduced-motion paths always get the resting design.
import { useEffect, useRef } from "react";

export default function Reveal({ as = "div", className = "", children, ...rest }: { as?: React.ElementType; className?: string; children: React.ReactNode } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  // The arm/in phases are applied straight to the element's classList from
  // the effect (the decision needs layout, and React never re-renders this
  // wrapper with a different className), so nothing hidden ever reaches the
  // server or no-JS render.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add("rv-armed");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.remove("rv-armed"); el.classList.add("rv-in"); io.disconnect(); }
    }, { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => { io.disconnect(); el.classList.remove("rv-armed", "rv-in"); };
  }, []);
  const cls = `${className} rv`.trim();
  const Tag = as;
  return <Tag ref={ref} className={cls} {...rest}>{children}</Tag>;
}
