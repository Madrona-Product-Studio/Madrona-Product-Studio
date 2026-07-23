import { Link } from "react-router-dom";

const DEFAULT_CLS =
  "press inline-block bg-madrona text-paper px-8 py-3.5 rounded font-medium text-sm hover:bg-madrona-dark no-underline";

interface Props {
  children: React.ReactNode;
  /** Overrides the default button styling entirely (e.g. the hero variant). */
  className?: string;
}

/**
 * The single sitewide primary CTA. Routes to /connect, where the visitor
 * chooses how to get started (book a call, message, or text). Every "Let's
 * connect" button on the site is this component — one label, one destination.
 */
export default function ConnectCta({ children, className = DEFAULT_CLS }: Props) {
  return (
    <Link to="/connect" className={className}>
      {children}
    </Link>
  );
}
