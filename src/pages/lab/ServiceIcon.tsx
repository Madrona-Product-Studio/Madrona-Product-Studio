import type { ServiceId } from "../../data/services";

// One icon family shared by the homepage module and the Services page.
// Bark ring + forest line-art, with bark accents (arrow, sun) per design.
// Brand = browser + leaf · Customers = people + rising arrow · Operations = workflow + gear + sun.
const BARK = "var(--bark)";

function Glyph({ id }: { id: ServiceId }) {
  if (id === "brand-and-web") {
    return (
      <>
        <rect x="3" y="5" width="13.5" height="12" rx="2" />
        <path d="M3 8.4h13.5" />
        <circle cx="5.4" cy="6.7" r=".55" fill={BARK} stroke="none" />
        <circle cx="7.3" cy="6.7" r=".55" fill={BARK} stroke="none" />
        <circle cx="9.2" cy="6.7" r=".55" fill={BARK} stroke="none" />
        <path d="M5.6 11.3h5.4M5.6 13.7h3.4" />
        <path d="M13.6 12.2c.5-2.5 2.9-4 6-3.7.3 3.1-1.4 5.6-4.5 5.9M15 19l2.9-5.4" />
      </>
    );
  }
  if (id === "customers-and-growth") {
    return (
      <>
        <circle cx="8" cy="8" r="2.2" />
        <circle cx="12.5" cy="6.8" r="2.2" />
        <path d="M4.8 15.2c0-2.4 1.8-3.7 3.2-3.7M9.3 15.2c0-2.4 1.8-3.7 3.2-3.7" />
        <path d="M6.4 17.2l6-4.4 2.6 1.9 4.2-6" stroke={BARK} />
        <path d="M15.6 8.7h4.1v4" stroke={BARK} />
      </>
    );
  }
  return (
    <>
      <rect x="3.4" y="4.8" width="4" height="4" rx="1" />
      <rect x="9.6" y="8.6" width="4" height="4" rx="1" />
      <rect x="3.4" y="12.4" width="4" height="4" rx="1" />
      <path d="M7.4 6.8h1.1a1.6 1.6 0 0 1 1.6 1.6v.2M7.4 14.4h1.1a1.6 1.6 0 0 0 1.6-1.6v-.2" />
      <circle cx="16.4" cy="16" r="2.4" />
      <path d="M16.4 12.4v1.2M16.4 18.4v1.2M12.8 16h1.2M18.8 16h1.2M13.9 13.5l.8.8M18.1 17.7l.8.8M18.9 13.5l-.8.8M14.7 17.7l-.8.8" />
      <g stroke={BARK}>
        <path d="M13.6 11.6h2.8a1.6 1.6 0 0 1 1.6 1.6" fill="none" />
        <circle cx="18.6" cy="6.6" r="1.5" />
        <path d="M18.6 3.6v.9M18.6 8.7v.9M15.6 6.6h.9M20.7 6.6h.9M16.5 4.5l.6.6M20.1 8.1l.6.6M20.7 4.5l-.6.6M17.1 8.1l-.6.6" />
      </g>
    </>
  );
}

export function ServiceIcon({ id, className = "" }: { id: ServiceId; className?: string }) {
  return (
    <span className={`m2-svc-ico m2-svc-ico-ring ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <Glyph id={id} />
      </svg>
    </span>
  );
}
