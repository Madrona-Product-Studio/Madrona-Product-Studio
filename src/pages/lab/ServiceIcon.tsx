import type { ServiceId } from "../../data/services";

// One icon family for the four expression doors, shared by the homepage
// consult list, the consulting door cards, and the Services page.
// Design language matches the who-we-help audience icons: a single clean
// motif per door, 1.7 stroke, on a soft bark-tinted circle. No composites.
// Build trust = browser window · Grow = rising line · Work smarter = gear ·
// Build something worth using = cube.

function Glyph({ id }: { id: ServiceId }) {
  if (id === "brand-and-web") {
    return (
      <>
        <rect x="4" y="5.5" width="16" height="13" rx="2" />
        <path d="M4 9.3h16" />
        <path d="M7 12.6h6.4M7 15.4h4" />
      </>
    );
  }
  if (id === "customers-and-growth") {
    return (
      <>
        <path d="M4.5 17 11 10.5l3 3L19.5 8" />
        <path d="M15.6 7.6h3.9v3.9" />
      </>
    );
  }
  if (id === "operations-and-ai") {
    return (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2.8v2.6M12 18.6v2.6M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" />
      </>
    );
  }
  return (
    <>
      <path d="M12 3.6 4.6 7.8v8.4L12 20.4l7.4-4.2V7.8L12 3.6Z" />
      <path d="M4.6 7.8 12 12l7.4-4.2" />
      <path d="M12 12v8.4" />
    </>
  );
}

export function ServiceIcon({ id, className = "" }: { id: ServiceId; className?: string }) {
  return (
    <span className={`m2-svc-ico m2-svc-ico-ring ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <Glyph id={id} />
      </svg>
    </span>
  );
}
