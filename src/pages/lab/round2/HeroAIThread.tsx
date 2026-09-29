// TEMP round-2 option H1 (2026-09-29): "AI at work: a conversation".
// Brief: docs/positioning-2026-09/round2-brief.md
//
// The homepage hero frame (copy left, window right, the contour chart behind)
// with the window replaced by one short inbox thread: a customer asks to move a
// repair, AI drafts the reply and proposes the new slot, and a person approves
// it with one tap. It plays once (about 5s) and rests on the settled thread, so
// a still frame tells the whole story. Motion is transform and opacity only,
// and every row holds its space from the first frame (no layout shift). With
// reduced motion the settled end state renders directly.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ctaClick } from "../../../lib/analytics";
import { HeroChart } from "../../v3/HeroChart";
import { WindowBar } from "../../v3/ReadCard";
import "./hero-ai-thread.css";

const DRAFT = "Of course. Monday at 9:00 am is open, same two-hour window. Want me to book it?";

function Copy() {
  return <div className="v3-home-copy v3-experiment-copy">
    <h1>Websites, products, and AI that works for your business. <span>Made in the Pacific Northwest.</span></h1>
    <p className="v3-lede">We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.</p>
    <div className="v3-actions">
      <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link>
      <a className="v3-hero-text-link" href="#work" onClick={ctaClick("See the work", "#work", "home-hero")}>See the work <span aria-hidden="true">→</span></a>
    </div>
  </div>;
}

// The sequence waits, paused on its first frame, until the window is on
// screen: at 390 the window sits below the fold, and a thread that played
// out of sight would only ever be seen at rest.
function useStartInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [play, setPlay] = useState<"wait" | "run">("wait");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setPlay("run"); return; }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setPlay("run"); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, play] as const;
}

function Thread() {
  const [ref, play] = useStartInView<HTMLElement>();
  return <article ref={ref} data-play={play} className="v3-artifact h1t-window" aria-label="Illustrative example: a customer asks to move a repair, AI drafts the reply and proposes a new time, and a person approves it before it is sent.">
    <WindowBar path="inbox · reschedule request" note="Illustrative example" />
    <ol className="h1t-thread">
      <li className="h1t-row h1t-customer">
        <p className="h1t-who">Customer <time>8:12 am</time></p>
        <div className="h1t-body">
          <p className="h1t-msg">Hi, something came up Thursday. Could we move the water heater repair to early next week?</p>
        </div>
      </li>
      <li className="h1t-row h1t-ai">
        <p className="h1t-who">AI draft <time>8:12 am</time></p>
        <div className="h1t-body">
          <p className="h1t-drafting" aria-hidden="true">Checking the schedule<i /><i /><i /></p>
          <p className="h1t-msg h1t-draft">{DRAFT.split(" ").map((word, i) => <span key={i} style={{ "--i": i } as CSSProperties}>{word} </span>)}</p>
          <p className="h1t-slot">
            <span className="h1t-old">Thu 2:00 pm<b aria-hidden="true" /></span>
            <span className="h1t-arrow" aria-hidden="true">→</span>
            <span className="h1t-new">Mon 9:00 am</span>
          </p>
        </div>
      </li>
      <li className="h1t-row h1t-you">
        <p className="h1t-who">You <time>8:14 am</time></p>
        <div className="h1t-body h1t-decide">
          <p className="h1t-actions" aria-hidden="true"><span className="h1t-edit">Edit</span><span className="h1t-approve">Approve and send</span></p>
          <p className="h1t-sent"><span className="h1t-check" aria-hidden="true">✓</span> Approved and sent. Calendar updated.</p>
        </div>
      </li>
    </ol>
    <footer className="h1t-foot">AI drafts the reply. Nothing goes out until a person approves it.</footer>
  </article>;
}

export function HeroAIThread() {
  return <section className="v3-current-hero v3-hero-plain h1t">
    <div className="v3-shell v3-current-main">
      <Copy />
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-panel-wrap"><Thread /></div>
    </div>
  </section>;
}
