import { Link } from "react-router-dom";
import { nowItem } from "../../data/now";
import { track } from "../../lib/analytics";

// The "Now" strip: one quiet announcement above the nav (what's new or coming
// up), sitewide. Content lives in src/data/now.ts; the left side grounds the
// studio geographically and hides on mobile so the announcement keeps the row.
export default function NowStrip() {
  if (!nowItem) return null;
  const item = nowItem;
  const onClick = () => track("now_click", { href: item.href });
  const body = (
    <>
      <span className="m2-now-tag">{item.tag}</span>
      <span className="m2-now-text">{item.text}</span>
      <span className="m2-now-arrow" aria-hidden="true">→</span>
    </>
  );
  return (
    <div className="m2-now">
      <div className="m2-now-inner">
        <p className="m2-now-place">Bellingham, Washington · Pacific Northwest and beyond</p>
        {item.external ? (
          <a className="m2-now-link" href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>{body}</a>
        ) : (
          <Link className="m2-now-link" to={item.href} onClick={onClick}>{body}</Link>
        )}
      </div>
    </div>
  );
}
