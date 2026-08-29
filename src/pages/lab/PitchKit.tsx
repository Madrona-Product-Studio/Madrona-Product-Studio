import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import "./madrona-v2.css";
import "./pitch-kit.css";

/* Internal, unlinked, noindex. Charlie's positioning kit rendered as a Madrona
   artifact. Source of truth: hq/charlie-hq/job-search/pitch-kit.md — edit
   there, mirror here. Locked 2026-08-29 (Sam exercise + story-arc work). */

const KEEPERS = [
  { n: "01", line: "I use the newest tools to solve the oldest problems.", note: "The studio thesis in one breath. Belongs everywhere." },
  { n: "02", line: "Their digital offering isn't as good as their product is. I close that gap.", note: "The ideal-client definition, and the honest “what excites you” answer." },
  { n: "03", line: "The most joy is helping people who have great businesses develop great processes.", note: "The unguarded version, from the Sam exercise." },
  { n: "04", line: "Judgment, proven by shipping.", note: "The four-word credential." },
];

const ROOMS = [
  { room: "Director / GM / executive conversation", pick: "V1", name: "Platform-shift arc" },
  { room: "AI-native company · Staff / Principal · Lenny Summit default", pick: "V2", name: "Judgment, proven by shipping" },
  { room: "Travel / outdoor / wellness company", pick: "V3", name: "Lived-in domains" },
  { room: "Coffee, casual, unknown room", pick: "A", name: "Builder-first" },
  { room: "Casual, but they might be a lead", pick: "B", name: "Credentials-carried" },
];

const PITCHES = [
  {
    id: "V1",
    title: "The platform-shift arc",
    room: "Director / GM rooms. Leads with breadth.",
    body: "I've built consumer products through every platform shift. Mobile at Microsoft and REI. Marketplaces when I brought REI Adventures, a long-running travel business, into its digital era. New storefront, new internal operations. Membership and loyalty at 22-million-member scale. Then AI at Healthline, where I shipped their first AI patient-guidance product to a 90-million-visitor audience. The domains never changed: health, the outdoors, travel. How people live well. AI is the biggest shift I've seen, so this time I went all in. I run a product studio where I ship AI-native consumer products weekly, and my flagship, Helm, is in beta. I'm looking for a team that wants someone who has run product at scale and now builds with the tools that are rewriting how product gets built.",
  },
  {
    id: "V2",
    title: "Judgment, proven by shipping",
    room: "AI-native and Staff/Principal rooms. The Lenny Summit default.",
    body: "Leading consumer product at Microsoft, REI, and Healthline taught me judgment: what to build, what to kill, what good looks like. The last year gave me something most product leaders don't have. I ship. AI collapsed the distance between strategy and execution, and I rebuilt my toolkit around that. At my studio I take products from idea to live software in weeks. Lila Trips is live with real users and a working paywall. Helm, my flagship, is in beta. What I bring is the combination: scale experience from 90 million monthly users and a 22-million-member program, plus the daily practice of building with AI. Judgment, proven by shipping.",
  },
  {
    id: "V3",
    title: "Lived-in domains",
    room: "Travel, outdoor, and wellness companies. Leads with authenticity.",
    body: "I build products for the parts of life people care most about: their health, the outdoors, how they travel. That's not positioning. I'm a hiker, skier, and boater in the Pacific Northwest, and I've built for those lives through every platform shift: mobile at Microsoft, then eight years at REI through mobile, marketplaces, and a 22-million-member loyalty relaunch, then Healthline, where I shipped AI patient guidance at 90-million-visitor scale. Now I run a studio in the same three lanes, and I ship AI-native products weekly. Every shift, same domains, and I've built the first version each time. AI is the biggest shift yet, which is why I'm all in on it.",
  },
];

const COFFEES = [
  {
    id: "A",
    title: "Builder-first",
    room: "Coffee, casual, unknown room.",
    body: "I'm a product builder. I run a studio called Madrona where I use the newest digital tools, mostly AI, to help businesses solve their oldest problems. The work I love most is with people whose product is better than their digital experience. I help close that gap.",
  },
  {
    id: "B",
    title: "Credentials-carried",
    room: "Casual, but they might be a lead.",
    body: "I've led consumer product at Microsoft, REI, and Healthline, and now I build. At my studio I ship AI-native products weekly, and my favorite work is with great businesses whose digital offering isn't as good as what they actually sell. Newest tools, oldest problems.",
  },
];

const RULES = [
  "Spoken versions ship only after they're rewritten in Charlie's own hand.",
  "No em-dashes in anything outward. Plain punctuation.",
  "No career-total year counts. Name the shifts, not the decades.",
  "Microsoft is always in the credentials row. The arc starts there.",
  "REI Adventures was brought into its digital era, never “launched.”",
];

export default function PitchKit() {
  return (
    <div className="m2">
      <LabMeta title="Pitch Kit · Madrona Product Studio" noindex />
      <M2Nav />

      <header className="pk-hero">
        <div className="pk-shell">
          <p className="pk-kicker">Madrona Product Studio · Internal · 2026-08-29</p>
          <h1>The Pitch Kit</h1>
          <p className="pk-identity">Builder of modern digital tools.</p>
          <p className="pk-thesis">Newest tools, oldest problems.</p>
        </div>
      </header>

      <section className="pk-section">
        <div className="pk-shell pk-spread">
          <div className="pk-rail">
            <h2>Keeper lines</h2>
            <p>Charlie's own words. These outrank all drafted copy.</p>
          </div>
          <ol className="pk-ledger">
            {KEEPERS.map((k) => (
              <li key={k.n}>
                <span className="pk-num">{k.n}</span>
                <blockquote>{k.line}</blockquote>
                <p>{k.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pk-section">
        <div className="pk-shell pk-spread">
          <div className="pk-rail">
            <h2>Pick the pitch</h2>
            <p>It's a system, not a single spine. Match the room; any pitch takes the same close.</p>
          </div>
          <table className="pk-rooms">
            <tbody>
              {ROOMS.map((r) => (
                <tr key={r.room}>
                  <td>{r.room}</td>
                  <td><b>{r.pick}</b> · {r.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pk-section">
        <div className="pk-shell">
          <p className="pk-groupkicker">Thirty seconds, spoken</p>
        </div>
        {PITCHES.map((p) => (
          <div className="pk-shell pk-spread pk-pitch" key={p.id}>
            <div className="pk-rail">
              <span className="pk-vid">{p.id}</span>
              <h3>{p.title}</h3>
              <p>{p.room}</p>
            </div>
            <blockquote className="pk-body">{p.body}</blockquote>
          </div>
        ))}
      </section>

      <section className="pk-section">
        <div className="pk-shell">
          <p className="pk-groupkicker">Two or three sentences, coffee</p>
        </div>
        <div className="pk-shell pk-coffees">
          {COFFEES.map((c) => (
            <div className="pk-coffee" key={c.id}>
              <span className="pk-vid">{c.id}</span>
              <h3>{c.title}</h3>
              <p className="pk-coffeeroom">{c.room}</p>
              <blockquote>{c.body}</blockquote>
            </div>
          ))}
        </div>
      </section>

      <section className="pk-section pk-close">
        <div className="pk-shell">
          <p className="pk-groupkicker">The close, any room</p>
          <p className="pk-closeline">
            What I'm looking for is a team where that combination compounds: someone who has
            operated at your scale, and who can also sit down and build.
          </p>
        </div>
      </section>

      <section className="pk-section">
        <div className="pk-shell pk-spread">
          <div className="pk-rail">
            <h2>Standing rules</h2>
            <p>Locked. A pitch that breaks one of these doesn't ship.</p>
          </div>
          <ul className="pk-rules">
            {RULES.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="pk-shell pk-sourcenote">
        Source of truth: <code>charlie-hq/job-search/pitch-kit.md</code>. Edit there; this page mirrors it.
      </div>

      <SiteFooter />
    </div>
  );
}
