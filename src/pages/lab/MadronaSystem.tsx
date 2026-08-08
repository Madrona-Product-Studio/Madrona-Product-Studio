import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import MadronaLogo from "./MadronaLogo";
import "./madrona-v2.css";
import lightAppIcon from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-mark.svg";
import darkAppIcon from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-mark-reverse.svg";
import usageReference from "../../../docs/madrona_logo_assets/references/website-usage-guide-reference.png";
import systemReference from "../../../docs/madrona_logo_assets/references/logo-system-reference.png";
import horizontalAsset from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-logo-horizontal.svg";
import reversedAsset from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-logo-horizontal-reverse.svg";
import markAsset from "../../../docs/madrona-v2-build-kit/brand/madrona/web/madrona-mark.svg";

const colors = [
  ["Off white", "#f7f4ef"],
  ["Surface", "#fffdf8"],
  ["Shell", "#efe8dc"],
  ["Sand", "#e3dac5"],
  ["Ink", "#222222"],
  ["Forest", "#1f3b33"],
  ["Terracotta", "#c86a3d"],
] as const;

export default function MadronaSystem() {
  return (
    <main className="m2 m2-system">
      <LabMeta title="Madrona V2 System Lab" noindex />
      <header className="m2-system-hero">
        <p className="m2-kicker">Internal design lab · noindex</p>
        <h1>A warm, practical system for serious work.</h1>
        <p>Editorial hierarchy, grounded materials, and useful product evidence. Calm enough to trust. Specific enough to remember.</p>
        <Link className="m2-text-link" to="/lab/madrona-v2">View the homepage concept <span>→</span></Link>
      </header>

      <section className="m2-system-section" aria-labelledby="logo-title">
        <div className="m2-section-heading"><p className="m2-kicker">Identity</p><h2 id="logo-title">Logo system in production</h2><p className="m2-guide-note">The approved raster boards are the visual source of truth. These earlier web lockups are temporary until faithful vectors are complete.</p></div>
        <div>
          <div className="m2-status-note"><strong>Vector production pending</strong><p>The July SVG reconstruction was rejected for inaccurate geometry, typography, spacing, and reversed-file construction. Do not use files from <code>docs/madrona_logo_assets</code> in production.</p></div>
          <div className="m2-logo-system">
            <figure className="m2-logo-surface m2-logo-surface-light"><MadronaLogo /><figcaption><strong>Approved static lockup</strong><span>Temporary raster source of truth during vector production</span></figcaption></figure>
            <figure className="m2-logo-surface m2-logo-surface-dark"><MadronaLogo variant="horizontal-reversed" /><figcaption><strong>Derived static reverse</strong><span>Approved raster colors adapted for temporary dark-surface use</span></figcaption></figure>
            <figure className="m2-logo-surface m2-logo-mark"><MadronaLogo variant="standalone" /><figcaption><strong>Approved static emblem</strong><span>For compact brand and avatar applications</span></figcaption></figure>
          </div>
          <div className="m2-rule-strip">
            <p><strong>120px minimum</strong><span>Horizontal digital lockup</span></p>
            <p><strong>32px minimum</strong><span>Standalone mark</span></p>
            <p><strong>1× lowercase m</strong><span>Minimum clear space</span></p>
            <p><strong>Never modify</strong><span>Internal color or geometry</span></p>
          </div>
        </div>
      </section>

      <section className="m2-system-section" aria-labelledby="selection-title">
        <div className="m2-section-heading"><p className="m2-kicker">Selection</p><h2 id="selection-title">Choose by context.</h2><p className="m2-guide-note">The context determines the asset. Do not force the complete wordmark into spaces where the subtitle becomes unreadable.</p></div>
        <div className="m2-usage-matrix">
          <article><span>01</span><h3>Desktop header</h3><MadronaLogo /><p>Primary horizontal on off-white. Maintain generous clear space.</p></article>
          <article className="m2-usage-dark"><span>02</span><h3>Dark footer</h3><MadronaLogo variant="horizontal-reversed" /><p>Transparent derived reverse for Forest Green until the final vector set is approved.</p></article>
          <article><span>03</span><h3>Mobile and favicon</h3><div className="m2-compact-marks"><img src={lightAppIcon} alt="Light Madrona app icon" /><MadronaLogo variant="standalone" /></div><p>Use the standalone mark below the full lockup’s readable size.</p></article>
          <article className="m2-usage-dark"><span>04</span><h3>Production standard</h3><div className="m2-production-check">Raster overlay<br /><strong>must match</strong></div><p>New vectors require direct overlay comparison against the approved raster.</p></article>
        </div>
      </section>

      <section className="m2-system-section" aria-labelledby="colors-title">
        <div className="m2-section-heading"><p className="m2-kicker">Foundation</p><h2 id="colors-title">Color and material</h2></div>
        <div className="m2-swatches">
          {colors.map(([name, value]) => (
            <div className="m2-swatch" key={name}><span style={{ background: value }} /><strong>{name}</strong><code>{value}</code></div>
          ))}
        </div>
      </section>

      <section className="m2-system-section m2-system-type" aria-labelledby="type-title">
        <div className="m2-section-heading"><p className="m2-kicker">Typography</p><h2 id="type-title">Clear first, expressive second.</h2></div>
        <div><p className="m2-display">Make the digital side work.</p><p className="m2-editorial">A selective editorial voice.</p><p className="m2-body-demo">Inter does the daily work. It stays direct and legible at every size, leaving Fraunces for a few human moments.</p></div>
      </section>

      <section className="m2-system-section" aria-labelledby="elements-title">
        <div className="m2-section-heading"><p className="m2-kicker">Elements</p><h2 id="elements-title">Actions and surfaces</h2></div>
        <div className="m2-element-grid">
          <div className="m2-element-row"><Link className="m2-button" to="/connect">Let’s connect</Link><button className="m2-button m2-button-secondary">Explore the work</button><a className="m2-text-link" href="#principles">See our process <span>→</span></a></div>
          <article className="m2-mini-card"><span className="m2-chip">Live product</span><h3>Evidence, not decoration</h3><p>Each interface example should help a visitor understand a real capability.</p></article>
          <article className="m2-agent-card"><div className="m2-agent-head"><span className="m2-avatar">BG</span><div><strong>Order intake</strong><small>Ready for review</small></div></div><p>12 flats · strawberries<br />Thursday, 9–11 AM</p></article>
        </div>
      </section>

      <section className="m2-system-section" aria-labelledby="assets-title">
        <div className="m2-section-heading"><p className="m2-kicker">Asset library</p><h2 id="assets-title">Production files</h2><p className="m2-guide-note">SVG is the canonical website format. PNG and PDF exports exist for compatibility and print workflows.</p></div>
        <div className="m2-asset-library">
          {[
            ["Primary horizontal SVG", "Light backgrounds", horizontalAsset],
            ["Reversed horizontal SVG", "Forest and dark backgrounds", reversedAsset],
            ["Standalone mark SVG", "Favicon, avatar, compact use", markAsset],
            ["Temporary light mark SVG", "Compact neutral surfaces", lightAppIcon],
            ["Temporary reversed mark SVG", "Compact forest surfaces", darkAppIcon],
          ].map(([name, use, href]) => <a href={href} download key={name}><span><strong>{name}</strong><small>{use}</small></span><b aria-hidden="true">↓</b></a>)}
        </div>
      </section>

      <section className="m2-system-section" aria-labelledby="references-title">
        <div className="m2-section-heading"><p className="m2-kicker">Reference boards</p><h2 id="references-title">Shared identity direction</h2><p className="m2-guide-note">These boards document intended usage and visual character. The packaged SVG files remain the source of truth for production.</p></div>
        <div className="m2-reference-grid">
          <a href={usageReference} target="_blank" rel="noreferrer"><img src={usageReference} alt="Madrona website logo usage reference board" /><span>Website usage guide reference ↗</span></a>
          <a href={systemReference} target="_blank" rel="noreferrer"><img src={systemReference} alt="Madrona logo system and color reference board" /><span>Logo system reference ↗</span></a>
        </div>
      </section>

      <section id="principles" className="m2-system-section m2-principles">
        <div className="m2-section-heading"><p className="m2-kicker">Interaction</p><h2>Quiet, useful, and immediate.</h2></div>
        <ol><li><strong>Show the state.</strong><span>No theatrical loading or fake typing.</span></li><li><strong>Reward intent.</strong><span>Motion clarifies a change or hierarchy.</span></li><li><strong>Respect the user.</strong><span>Keyboard, focus, contrast, and reduced motion are defaults.</span></li></ol>
      </section>
    </main>
  );
}
