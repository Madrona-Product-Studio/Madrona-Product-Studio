import { Link } from "react-router-dom";
import { BOOKING_URL } from "../data/booking";

const DEFAULT_CLS =
  "press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline";

interface Props {
  children: React.ReactNode;
  /** Where the CTA goes until BOOKING_URL exists. */
  fallbackTo?: string;
  /** Overrides the default button styling entirely (e.g. the hero variant). */
  className?: string;
}

/**
 * The sitewide "Book a 30m free chat" button. Renders a direct booking link
 * once BOOKING_URL is set; routes into the site funnel until then.
 */
export default function BookCta({ children, fallbackTo = "/how-it-works", className = DEFAULT_CLS }: Props) {
  return BOOKING_URL ? (
    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link to={fallbackTo} className={className}>
      {children}
    </Link>
  );
}
