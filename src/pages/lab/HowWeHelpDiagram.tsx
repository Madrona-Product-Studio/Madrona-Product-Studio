// "How we help" header diagram: WHO we help (the three audiences) anchors the
// center, HOW we help (the engagement) orbits it clockwise as a directed
// journey. Same family DNA as the products cycle + About network. Square, sits
// in the right column of the /consulting two-column header.

const I = ({ d, s = 24 }: { d: string; s?: number }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const IC = {
  talk: "M4 6h13a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-1-2V8a2 2 0 0 1 2-2Z",
  view: "M7 3h7l4 4v14H7zM14 3v4h4M10 12.5h5M10 16h3",
  decide: "M4 12.5l4.5 4.5L20 6",
  build: "M9 8l-4 4 4 4M15 8l4 4-4 4",
};
const AUD = {
  sprout: "M12 20.2v-7.4 M12 12.8C11.6 9.4 9.3 7.5 5.8 7.3c.2 3.5 2.5 5.6 6.2 5.5Z M12 11.2c.3-2.7 2.1-4.3 5.2-4.5-.2 2.8-2.1 4.6-5.2 4.5Z M5.4 20.2c2-.9 4.1-1.3 6.6-1.3s4.6.4 6.6 1.3",
  storefront: "M4.6 7h14.8l.9 3c-.4 1.2-1.4 1.9-2.7 1.9-1 0-1.9-.5-2.4-1.3-.5.8-1.4 1.3-2.4 1.3s-1.9-.5-2.4-1.3c-.5.8-1.4 1.3-2.4 1.3-1.3 0-2.3-.7-2.7-1.9l.9-3Z M5.6 12.6V19h12.8v-6.4",
  layers: "M12 4 4.8 8 12 12l7.2-4L12 4Z M4.8 12 12 16l7.2-4 M4.8 16 12 20l7.2-4",
};

const AUDIENCES = [
  { tone: "sage", icon: AUD.sprout, name: "Founders" },
  { tone: "bark", icon: AUD.storefront, name: "Local businesses" },
  { tone: "slate", icon: AUD.layers, name: "Product teams" },
] as const;

const STEPS = [
  { id: "talk", icon: IC.talk, tone: "sage", title: "Talk it through", sub: "Free 30-min", place: "top", deg: -90 },
  { id: "view", icon: IC.view, tone: "bark", title: "A point of view", sub: "Written, free", place: "right", deg: 0 },
  { id: "decide", icon: IC.decide, tone: "slate", title: "Decide what to build", sub: "Scoped proposal", place: "bottom", deg: 90 },
  { id: "build", icon: IC.build, tone: "bark", title: "Then we build it", sub: "Design, build & ship", place: "left", deg: 180 },
] as const;

const R = 35, TRIM = 18;
const at = (deg: number) => ({ x: 50 + R * Math.cos((deg * Math.PI) / 180), y: 50 + R * Math.sin((deg * Math.PI) / 180) });

export default function HowWeHelpDiagram() {
  const segs = [0, 1, 2].map((i) => {
    const p1 = at(STEPS[i].deg + TRIM), p2 = at(STEPS[i + 1].deg - TRIM);
    return `M${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`;
  });
  return (
    <div className="hc-arc">
      <svg className="hc-arc-lines" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <marker id="hc-arw" markerWidth="7" markerHeight="7" refX="3.6" refY="3" orient="auto">
            <path d="M0.6 0.8 L4.6 3 L0.6 5.2" fill="none" stroke="var(--bark)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {segs.map((d, i) => <path key={i} d={d} markerEnd="url(#hc-arw)" />)}
      </svg>

      <div className="hc-arc-center">
        <span className="hc-arc-ctitle">Who we help</span>
        <ul className="hc-arc-clist hc-arc-clist--ico">
          {AUDIENCES.map((a) => (
            <li key={a.name}><span className={`hc-arc-ci hc-arc-ci--${a.tone}`}><I d={a.icon} s={17} /></span>{a.name}</li>
          ))}
        </ul>
      </div>

      {STEPS.map((n) => {
        const p = at(n.deg);
        return (
          <div className={`hc-arc-node hc-arc-node--${n.place}`} key={n.id} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className={`hc-chip hc-chip--${n.tone}`}><I d={n.icon} s={23} /></span>
            <span className="hc-arc-label"><strong>{n.title}</strong><span>{n.sub}</span></span>
          </div>
        );
      })}
    </div>
  );
}
