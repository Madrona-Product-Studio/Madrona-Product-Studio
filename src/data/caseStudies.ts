export interface CaseStudyItem {
  label: string;
  description: string;
}

export interface WhatWeDidItem {
  label: string;
  description: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface WhatWeDid {
  lead: string;
  items: WhatWeDidItem[];
}

export interface HowItWorksLayer {
  label: string;
  items: string[];
}

export interface HowItWorks {
  intro?: string;
  layers: HowItWorksLayer[];
}

export interface FlowNode {
  /** Short role label, rendered uppercase (e.g. "CLAUDE API") */
  label: string;
  /** One- or two-sentence plain-language description of what happens here */
  body: string;
  /** Optional small spec chip (e.g. "claude-sonnet-4-6 · NDJSON") */
  tech?: string;
}

export interface PlatformService {
  label: string;
  body: string;
}

/** A side input that feeds into one of the path nodes (e.g. curated guides into the planner). */
export interface FlowBranch {
  /** Index of the path node this branch feeds into. */
  intoIndex: number;
  label?: string;
  node: FlowNode;
  /** Optional upstream node feeding the branch (e.g. live data into the guides). */
  feeder?: {
    label?: string;
    node: FlowNode;
  };
}

/** A feedback loop from one path node back up to an earlier one. */
export interface FlowLoopback {
  fromIndex: number;
  toIndex: number;
  label: string;
}

/** A data-flow / architecture diagram: a critical path plus the supporting services around it. */
export interface Architecture {
  intro?: string;
  /** The critical path, ordered top to bottom. */
  path: FlowNode[];
  /** Labels for the arrows between path nodes. Length must be path.length - 1. */
  connectors: string[];
  /** Optional side input feeding one of the path nodes. */
  branch?: FlowBranch;
  /** Optional feedback loop drawn up the right side. */
  loopback?: FlowLoopback;
  /** Label on the connector from the path into the platform boundary. */
  platformConnector?: string;
  /** Heading for the supporting-services boundary (e.g. "Runs on Vercel"). */
  platformLabel?: string;
  platform?: PlatformService[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  tags: string[];
  category: "recent" | "experience";
  externalUrl?: string;
  externalLabel?: string;
  highlights?: string[];
  statusLabel?: string;
  borderImages?: boolean;
  heroImage?: string;
  heroImageAlt?: string;
  opportunity: string;
  thesis: string;
  whatWeDid: WhatWeDid;
  howItWorks?: HowItWorks;
  architecture?: Architecture;
  builtWith: CaseStudyItem[];
  whatWeLearned: string[];
  status: string[];
}

export const caseStudies: CaseStudy[] = [
  // --- Recent work ---
  {
    slug: "lila-trips",
    title: "Lila Trips",
    client: "Studio project",
    tagline:
      "An AI travel platform for designing transformative trips in sacred landscapes.",
    tags: ["wellness travel", "responsible travel", "AI", "concept"],
    highlights: ["AI-powered itinerary engine", "Real-time multi-source data aggregation", "Auth-enabled iterative trip planning"],
    statusLabel: "Public Beta",
    category: "recent",
    externalUrl: "https://www.lilatrips.com/",
    externalLabel: "lilatrips.com",
    heroImage: "/case-studies/lila-trips/hero.jpg",
    heroImageAlt: "The Lila Trips homepage",
    opportunity:
      "Most travel products are built to optimize for the most miles, the most sights, the least time. That's useful if you're planning a long weekend. It's the wrong frame entirely if you want a trip that actually changes something. The people who travel for intention, for practice, for depth are underserved by every major travel tool, and the new wave of AI travel apps makes the problem worse, not better. More hallucinated recommendations, more \"optimized\" days, less actual place. The travelers we're building for want the inverse, and they're a category the industry doesn't yet have a name for.",
    thesis:
      "Travel that actually changes you isn't separable from how you travel. The dominant model optimizes for sights and scales for volume, which produces depleted places and depleted travelers in roughly equal measure. Wellness tourism is now an $894 billion category growing roughly 9% a year. The dominant product (resort spa, scheduled programming, controlled environments) is a category-mismatch with what's actually driving that growth: people who want unmediated nature, real practice, and to come back changed. The next decade of travel will be defined by trips that restore both the visitor and the place, in iconic outdoor terrain, rooted in real practice. There isn't a product category for this yet. There should be.\n\nA good trip isn't a list of things to do. It's a weave of place, timing, weather, wildlife, practice, and pace. The information to do that weaving well already exists, scattered across public APIs, citizen science networks, government data, and the lived knowledge of people who know a place. What's missing is a product that pulls it all together into something coherent enough to trust. Build that product, and let AI do the part it's actually good at: sequencing and personalizing, not inventing.",
    whatWeDid: {
      lead: "Built the full product: research, brand, destination guides, planner, and all the infrastructure underneath. Every destination in Lila is a place I've been to multiple times and care about deeply. The guides are grounded in years of firsthand experience, not desk research. Three areas in particular took the most work and make the thing what it is.",
      items: [
        {
          label: "An AI-powered trip planner on a leash.",
          description:
            "Most AI travel products let the model hallucinate freely and hope for the best. Lila does the opposite. Every restaurant, trail, hotel, and cultural site exists in a hand-curated guide file, and the AI can only recommend from that corpus. The trade is scale for trust, and it's the right call: itineraries feel authored, not generated. *See the planner at [lilatrips.com/plan](https://www.lilatrips.com/plan).*",
          image: "/case-studies/lila-trips/planner.jpg",
          imageAlt: "A generated Lila Trips itinerary showing day-by-day activities",
          caption: "The planner shapes days from curated guide content. Authored, not hallucinated.",
        },
        {
          label: "Destination guides that pull live context from everywhere.",
          description:
            "Each guide is a long-form editorial page backed by live data: NPS trail conditions, iNaturalist wildlife observations, Google Places enrichment for hotels, astronomy calculations for the night sky widget, real-time weather, USGS river levels. Tap a condor in the Zion guide and you get 372 real nearby observations. Open the night sky widget and the moon phase is drawn from tonight's synodic age. *[See the guides.](https://www.lilatrips.com/destinations)*",
          image: "/case-studies/lila-trips/destination-guide.jpg",
          imageAlt: "A Lila Trips destination guide page showing terrain, trails, and curated content",
          caption: "Each destination is a long-form guide backed by live data: trails, wildlife, weather, night sky.",
        },
        {
          label: "A practice library woven into the trip.",
          description:
            "The planner draws on a library of contemplative and movement practices (built separately as [Lila.yoga](https://lila.yoga)) and assigns them to days as matched companions. Day 3 at the Narrows might pair with a Taoist water meditation and a Tree Pose at the canyon rim. Not a feature bolted on. A worldview embedded in software.",
          image: "/case-studies/lila-trips/practice-companion.jpg",
          imageAlt: "A practice companion card matched to a day in a Lila Trips itinerary",
          caption: "The AI matches practices to each day based on setting and energy.",
        },
      ],
    },
    architecture: {
      intro:
        "Lila looks like one travel app. Underneath, it's a constrained AI pipeline. Your choices become a tightly-scoped prompt, Claude sequences the days, and hand-curated guides keep every recommendation real.",
      path: [
        {
          label: "You",
          body: "Pick destinations, dates, pace, and the kind of practice you want from the trip.",
        },
        {
          label: "Planning tool",
          body: "Turns your choices into a tightly-scoped prompt. Claude can only draw from hand-curated guide files — never the open web.",
          tech: "guides only",
        },
        {
          label: "Claude API",
          body: "Sequences and personalizes the days, then streams back the whole itinerary as structured JSON.",
          tech: "claude-sonnet-4-6",
        },
        {
          label: "Your itinerary",
          body: "Rendered day by day — authored, not hallucinated. Edits are batched and sent back for Claude to revise in place.",
        },
      ],
      connectors: ["your inputs", "scoped prompt", "raw JSON"],
      branch: {
        intoIndex: 1,
        label: "feeds",
        node: {
          label: "Destination guides",
          body: "Long-form pages you browse — and the planner's only source.",
        },
        feeder: {
          label: "live context",
          node: {
            label: "Live data",
            body: "Public APIs (trails, wildlife, weather, sky) via serverless proxies.",
          },
        },
      },
      loopback: {
        fromIndex: 3,
        toIndex: 2,
        label: "batched revisions",
      },
      platformConnector: "served by",
      platformLabel: "Runs on Vercel",
      platform: [
        {
          label: "Auth",
          body: "Supabase accounts and saved trips.",
        },
        {
          label: "Payments",
          body: "Stripe unlocks full itinerary planning.",
        },
        {
          label: "Email",
          body: "Resend for trip sharing and contact.",
        },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "Vite + React SPA, Tailwind for utility styling",
      },
      {
        label: "Hosting",
        description: "Vercel (static + serverless functions)",
      },
      {
        label: "AI",
        description:
          "Claude API for itinerary generation, refinement, and item alternatives, with NDJSON streaming to keep mobile connections alive during 30+ second generations",
      },
      {
        label: "Storage",
        description: "Supabase (auth, sessions, trip sharing)",
      },
      {
        label: "Payments",
        description: "Stripe — a $20 unlock opens full itinerary planning",
      },
      {
        label: "Live data",
        description:
          "NPS, Google Places, iNaturalist, AstronomyAPI, Open-Meteo, USGS, pulled through cached serverless proxies so API keys never touch the client",
      },
      {
        label: "Email",
        description: "Resend for trip sharing and contact",
      },
    ],
    whatWeLearned: [
      "The hard part of the AI-powered product isn't the AI. It's the ground truth underneath it: the guides, the curation, the constrained context, the research, the math. The AI gets the credit; the corpus does the work.",
      "Most AI products are thin. This one is deep by choice, and you can feel the difference the moment you use it.",
      "The bigger lesson is about what the category needs. A trust layer between the place, the traveler, and the operators on the ground that's credible, defensible, and not greenwashed. That's the thing the industry hasn't built yet, and it's the thing this product is reaching toward.",
    ],
    status: [
      "Live at [lilatrips.com](https://www.lilatrips.com/), in active beta with real users as of this writing. The product has already been through several research and build iterations; the public release is where it meets actual intentional travelers for the first time.",
      "The beta is focused on three things: whether the core planner is usable, whether the experience is actually desirable to the intentional-travel audience we built it for, and whether the AI-generated itineraries hold up in quality and stability across real trips.",
      "What comes next depends on what the users tell us. The likely paths forward are freemium tiers for the planner and guides, referral monetization on bookings, and small-group *Threshold Trips* as a higher-touch product. More destinations will come as the core product earns them.",
      "~~Build real, test real, scale what's earned.~~",
    ],
  },
  {
    slug: "aria-health",
    title: "Aria Health",
    client: "Studio project",
    tagline:
      "An AI health companion that guides people through menopause with structured, empathetic, stage-aware support.",
    tags: ["health", "AI", "concept", "prototype"],
    highlights: ["AI clinical guardrails", "Stage-aware personalization", "Structured conversational onboarding"],
    statusLabel: "v0",
    category: "recent",
    externalUrl: "https://aria-health-mp.vercel.app/",
    externalLabel: "aria-health-mp.vercel.app",
    heroImage: "/case-studies/aria-health/hero.jpg",
    heroImageAlt: "The Aria Health landing page. So you've been diagnosed with menopause...",
    opportunity:
      "Health platforms have decades of trusted content, but it sits behind search: articles, listicles, condition pages. When someone gets a life-changing diagnosis or enters a major transition like menopause, they don't need another article. They need a companion that synthesizes what's known, remembers their context, and meets them where they are emotionally. Generic AI assistants hallucinate medical advice. Static content doesn't adapt. Nothing in between does both well.",
    thesis:
      "An AI companion constrained to evidence-based health content, with real clinical guardrails, stage-aware context, and an empathetic conversational voice, could transform a content library into an active guidance platform. Not a doctor. Not a chatbot. A structured companion that helps people prepare for appointments, understand their symptoms, and take the next step with confidence.",
    whatWeDid: {
      lead: "Built a functional prototype that demonstrates the full concept, from first diagnosis through ongoing journey management. The prototype is scoped to the menopause transition, but the architecture is designed to generalize across any health inflection point.",
      items: [
        {
          label: "A conversational AI tuned for health, not search.",
          description:
            "Aria isn't a general-purpose chatbot pointed at a knowledge base. The system prompt encodes clinical guardrails, emotional calibration, and a structured guidance framework (Must Know, Should Consider, Can Do Today) that shapes every response. It knows when to suggest a doctor visit, when to offer reassurance, and when to simply listen. It never diagnoses, never prescribes, and always defers to professional care for medical decisions.",
          image: "/case-studies/aria-health/chat.jpg",
          imageAlt: "The Aria chat interface with conversation starters like 'I think I'm starting menopause' and 'Help me understand HRT options'",
          caption: "Structured conversation starters meet people where they are. Not a blank input box.",
        },
        {
          label: "A journey map that tracks where you are.",
          description:
            "Menopause isn't a single event. It's a multi-year transition through perimenopause, menopause, and postmenopause. Aria models the journey as a structured timeline with stages, milestones, and phase-specific guidance. The interface shows where you are, what to expect next, and what's relevant right now. Not everything at once.",
          image: "/case-studies/aria-health/journey.jpg",
          imageAlt: "A journey card showing 'Hot flashes & night sweats', card 1 of 4 in the symptom education sequence",
          caption: "Stage-specific guidance delivered as swipeable cards. One topic at a time, not a wall of text.",
        },
        {
          label: "Built as a product concept, not a demo.",
          description:
            "This isn't a slide deck or a wireframe. It's a working Next.js application with real AI conversations, a dashboard, and journey tracking. The prototype is designed to show what a health guidance product *feels like* to use (the tone, the pacing, the trust-building) not just what it looks like on a screen.",
          image: "/case-studies/aria-health/dashboard.jpg",
          imageAlt: "The Aria dashboard showing symptom tracking, journey stages, quick actions, and a chat prompt",
          caption: "Symptom tracking, journey stages, and quick actions. A working dashboard, not a wireframe.",
        },
      ],
    },
    architecture: {
      intro:
        "Aria looks like a friendly chat app. Underneath, it's a tightly guardrailed AI: your questions meet a Claude prompt that knows your stage, never diagnoses, and shapes every answer into the same structured format.",
      path: [
        { label: "You", body: "Ask a question, or pick a starter like “I think I'm starting menopause.”" },
        { label: "Claude API", body: "A deeply structured system prompt adds clinical guardrails and your stage. Never diagnoses, always defers to real care.", tech: "claude + system prompt" },
        { label: "Guided response", body: "Every answer comes back in the same shape: Must Know, Should Consider, Can Do Today." },
        { label: "Journey + dashboard", body: "Stage-aware tracking across perimenopause, menopause, and after — surfacing what's relevant right now." },
      ],
      connectors: ["your question", "structured reply", "tracked over time"],
      branch: {
        intoIndex: 1, label: "grounds",
        node: { label: "Stage-aware model", body: "Where you are in the transition shapes every response." },
        feeder: { label: "drawn from", node: { label: "Evidence-based content", body: "A trusted health library — never the open web." } },
      },
      platformConnector: "runs on",
      platformLabel: "Runs on Vercel",
      platform: [
        { label: "App", body: "Next.js App Router, Tailwind, TypeScript." },
        { label: "Generalizes", body: "Same framework fits any health inflection point." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "Next.js App Router, Tailwind CSS, TypeScript",
      },
      {
        label: "AI",
        description:
          "Claude API with a deeply structured system prompt encoding clinical guardrails, empathetic tone, and the Must Know / Should Consider / Can Do Today framework",
      },
      {
        label: "Architecture",
        description:
          "Designed to generalize. The menopause journey is the proof of concept, but the three-layer framework (triggering moments, guidance structure, delivery modes) applies to any health inflection point",
      },
    ],
    whatWeLearned: [
      "The hardest part of a health AI product isn't the AI. It's the guardrails: knowing when to speak, when to defer, when to escalate, and how to hold an empathetic tone across hundreds of conversational turns without drifting into false reassurance or clinical coldness.",
      "A structured journey model changes everything. When the AI knows what stage you're in, it stops being a search engine and starts being a companion. Context turns generic content into personal guidance.",
    ],
    status: [
      "Functional prototype, built as a product concept to demonstrate the vision. The architecture is designed to generalize beyond menopause to any health inflection point: diagnosis, treatment, recovery, major life transitions.",
      "Source available on [GitHub](https://github.com/Madrona-Product-Studio/aria).",
    ],
  },
  {
    slug: "san-juan-boating-guide",
    title: "San Juan Boating Guide",
    client: "Studio project",
    tagline:
      "A purpose-built web app for boaters cruising the San Juan Islands.",
    tags: ["travel", "local", "community", "maps"],
    highlights: ["Dock-first navigation UX", "Custom Leaflet map interface", "Cached Google Places integration"],
    statusLabel: "Live v1",
    category: "recent",
    externalUrl: "https://www.sjiboating.com/",
    externalLabel: "sjiboating.com",
    heroImage: "/case-studies/san-juan-boating-guide/hero.jpg",
    heroImageAlt:
      "The San Juan Islands Boating Guide map view with color-coded marina markers and Live Conditions widget",
    opportunity:
      "Most boating guides are built for the shelf: static PDFs, dense cruising almanacs, or whatever Google Maps returns when you search \"food near me\" from a marina. That's fine if you already know the archipelago. It's the wrong frame entirely if you're cruising it for the first time, or the tenth, and want to actually find the quiet cove, the good restaurant a short walk from the dock, the trail that's worth the tie-up. The people who travel the San Juans by boat for the anchorages, for the pace, for the island-to-island rhythm of it are underserved by every existing tool. Almanacs are stuck in print logic. Google Maps doesn't know what a VHF channel is.",
    thesis:
      "A good cruising day isn't a list of businesses sorted by distance from a highway. It's a weave of marina, tide, dock walk, weather, and island. The information to do that weaving well already exists, scattered across cruiser knowledge, state park data, NOAA, and Google's place database. What's missing is a product that pulls it all together from a boater's point of view. Build that product. Curate the entries by hand, let Google do the part it's actually good at: current photos, ratings, phone numbers, directions.",
    whatWeDid: {
      lead: "Built the full product: curation, structure, map, and all the infrastructure underneath. Three areas in particular took the most work and make the thing what it is.",
      items: [
        {
          label: "A curated guide, not a scraped one.",
          description:
            "Most travel apps let a generic search surface whatever's trending and hope for the best. This one does the opposite: every marina, restaurant, trail, gallery, and wellness studio is a hand-written entry oriented around the dock, not the highway. Drawn from three summers of cruising the San Juans, personal notes, conversations with harbormasters and other boaters, and being connected to the community. Marinas list VHF channels, moorage types, fuel availability, and depth cautions. Restaurants list walk distance from the slip. The trade is scale for trust, and it's the right call: the guide feels authored by a cruiser because it was.",
          image: "/case-studies/san-juan-boating-guide/marina.jpg",
          imageAlt:
            "A marina detail showing VHF channel, moorage type, fuel, depth. The stuff boaters actually need.",
          caption:
            "A marina detail showing VHF channel, moorage type, fuel, depth. The stuff boaters actually need.",
        },
        {
          label: "Live enrichment from Google Places.",
          description:
            "Each curated entry is backed by live data. Tap a restaurant in Friday Harbor and you get current photos, rating, phone number, website, and directions, pulled through a Vercel serverless proxy so the API key never touches the client, cached 24 hours for search results and 7 days for photos so it stays fast on spotty marina Wi-Fi. Open a marina and you see the dock as it looks this season, not as it looked in a 2011 almanac.",
          image: "/case-studies/san-juan-boating-guide/restaurant.jpg",
          imageAlt:
            "Curated entries backed by live photos, ratings, and directions from Google Places.",
          caption:
            "Curated entries backed by live photos, ratings, and directions from Google Places.",
        },
        {
          label: "Structured the way boaters actually navigate.",
          description:
            "Content is organized by island and by marina, not by category alone. Five tabs (Map, Islands, Dining, Trails, Logistics) let you move between the views that matter depending on where you are in a trip. Planning the week from home? Start with Islands. Just tied up at Deer Harbor? Open the map, tap the marker, see what's walkable. The Logistics tab collects the stuff that doesn't fit anywhere else but everyone needs: water taxi rates, ferry schedules, pumpout stations, customs clearance, whale buffer zones, a suggested multi-day route.",
          image: "/case-studies/san-juan-boating-guide/map.jpg",
          imageAlt:
            "The archipelago with color-coded markers by marina type. Boater's-eye navigation.",
          caption:
            "The archipelago with color-coded markers by marina type. Boater's-eye navigation.",
        },
      ],
    },
    architecture: {
      intro:
        "The guide looks like a fast little map app. Underneath, every pin is a hand-written entry — Google supplies the live photo, but the curation does the work of putting you in front of the right dock.",
      path: [
        { label: "You", body: "Open the map and tap a marker — a marina, a restaurant, a trail." },
        { label: "The guide", body: "Five tabs over a Leaflet map. No framework, no build step — loads fast on marina Wi-Fi.", tech: "Leaflet · vanilla JS" },
        { label: "Curated entry", body: "Dock-first detail: VHF channel, moorage, fuel, walk distance from the slip." },
        { label: "Live detail", body: "Current photos, ratings, phone, directions — fetched only when you tap.", tech: "Google Places" },
      ],
      connectors: ["browse", "tap a marker", "enriched on demand"],
      branch: {
        intoIndex: 2, label: "from",
        node: { label: "Hand-curated content", body: "99 entries across 7 islands — three summers of cruising, not a scrape." },
      },
      platformConnector: "served by",
      platformLabel: "Runs on Vercel",
      platform: [
        { label: "Hosting", body: "Static site plus serverless functions, auto-deployed." },
        { label: "Cached proxy", body: "Google key never touches the client; cached 24h / 7d." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description:
          "Vanilla HTML/CSS/JS with Leaflet for the map. No framework, no build step, loads fast on marina Wi-Fi",
      },
      {
        label: "Hosting",
        description: "Vercel (static + serverless functions), auto-deploy from GitHub",
      },
      {
        label: "Live data",
        description:
          "Google Places for photos, ratings, phone numbers, websites, and directions, pulled through cached serverless proxies so the API key never touches the client",
      },
      {
        label: "Content",
        description:
          "Hand-curated across the full cruising corridor: 7 islands, 24 marinas, 24 restaurants, 20 trails, 9 galleries, 7 wellness studios, 8 logistics reference cards. 99 entries from Bellingham and Anacortes staging points through the main ferry-served islands to the outer marine parks",
      },
    ],
    whatWeLearned: [
      "The hard part of a boater-facing product isn't the map or the API. It's the ground truth underneath it: the curation, the orientation, the decision to measure everything from the dock instead of the road. Google Places gets the credit for the nice photo; the hand-written guide does the work of putting you in front of the right place to begin with.",
      "Most travel apps are thin. This one is deep by choice, and you can feel the difference the moment you tie up and open it.",
    ],
    status: [
      "Live at [sjiboating.com](https://www.sjiboating.com/), shared with cruising boaters as a v1 for feedback and iteration. The product has been built end-to-end (curation, map, live enrichment, logistics) and now it meets actual boaters for the first time.",
      "The v1 is focused on three things: whether the dock-first orientation matches how cruisers actually plan and explore, whether the five-tab structure is the right shape for a trip that moves island to island, and whether curated entries plus live Google Places data are enough to replace the almanac and the ad-hoc searches boaters use today.",
      "What comes next depends on what the users tell us. The likely paths forward are deeper marina and anchorage detail, expansion into the Gulf Islands and South Sound, partnerships with harbormasters and marine businesses, and an offline mode for coves with no signal. More coverage will come as the core product earns it.",
      "~~Build real, test real, scale what's earned.~~",
    ],
  },
  {
    slug: "plainly",
    title: "Plainly",
    client: "Studio project",
    tagline:
      "A voice-first intake tool that turns a 5-minute conversation into a shareable therapy profile.",
    tags: ["health", "AI", "voice", "privacy"],
    highlights: ["Real-time WebRTC voice", "Voice-enabled user onboarding", "Privacy-by-design architecture"],
    statusLabel: "v0",
    borderImages: true,
    category: "recent",
    externalUrl: "https://plainly-therapy.vercel.app/",
    externalLabel: "plainly-therapy.vercel.app",
    heroImage: "/case-studies/plainly/hero.jpg",
    heroImageAlt:
      "The Plainly landing page — Share why plainly. We'll organize the rest.",
    opportunity:
      "The hardest part of therapy isn't always finding a therapist. It's the moment they say \"so, what brings you in?\" and you realize you have no idea where to start. Intake forms capture what people are willing to type. They miss what people actually mean — the hesitations, the emphasis, the thing they keep circling back to. Meanwhile, therapists spend the first 15 minutes of session one just getting oriented. Both sides lose.",
    thesis:
      "Voice surfaces what forms miss. A short, structured AI conversation — 5 minutes, no account, no forms — can produce a written profile that captures what a patient actually means, not just what they're willing to type into a text box. The patient owns the artifact, shares it with any therapist, and arrives at session one already understood. The therapist arrives already oriented. Both sides win.\n\nThe product has to earn trust in the first 30 seconds. That means no accounts, no email capture, no friction. Land, talk, get a link. The conversation is discarded after synthesis. The profile is anonymized and ephemeral. Privacy isn't a feature — it's the architecture.",
    whatWeDid: {
      lead: "Built the full product: voice conversation, profile synthesis, privacy architecture, and the design system that holds it together. Three things make it what it is.",
      items: [
        {
          label: "A real voice conversation, not a chatbot.",
          description:
            "Plainly uses the OpenAI Realtime API over WebRTC — true streaming voice, not transcription-then-respond. The conversation follows a 4-phase clinical structure (opening, why now, history and context, goals and risk) but adapts to what the person actually says. A canvas-based voice visualizer with six sine wave layers responds to whichever speaker is active, with speaker-aware color crossfade between sage (Plainly) and clay (the patient). Word-by-word text reveal at 300ms syncs to voice playback so you can read along as it speaks.",
          image: "/case-studies/plainly/conversation.jpg",
          imageAlt: "The Plainly conversation interface with voice visualizer active and word-by-word text reveal",
          caption: "Real-time voice with a 6-layer sine wave visualizer. Sage for Plainly, clay for the patient.",
        },
        {
          label: "A profile a therapist can use in 30 seconds.",
          description:
            "When the conversation ends, Claude synthesizes the transcript into a structured therapy profile — an opening line, narrative threads, therapy fit spectrums (structure vs. exploration, pacing, time focus, warmth vs. challenge), and first-session prompts. The synthesis uses medium inference: \"You seemed to return to...\" not \"exhibits symptoms of...\" Grounded in real clinical frameworks (Cooper & Norcross therapy fit axes, Prochaska stages of change) without naming them in output. Partial profiles are marked as such. Sections are nulled rather than fabricated.",
          image: "/case-studies/plainly/profile.jpg",
          imageAlt: "A therapy profile ready to save as PDF — narrative threads, therapy fit tags, and an opening line",
          caption: "Save as PDF and send to any therapist before session one. Structured, anonymized, patient-owned.",
        },
        {
          label: "Privacy by design, not privacy by policy.",
          description:
            "Transcripts are never stored — processed in memory, discarded after synthesis. Profiles are anonymized (no names, dates, locations, employers) and auto-expire after 30 days. No accounts, no email, no PII retained. The patient can delete immediately from the profile page. Plainly is not a HIPAA-covered entity because it doesn't need to be — no PHI is stored. Risk protocol with normalized screening and crisis resource handoff is built into the conversation, not bolted on.",
        },
      ],
    },
    architecture: {
      intro:
        "Plainly feels like a calm 5-minute phone call. Underneath, streaming voice becomes a transcript that lives only in memory — Claude turns it into a shareable profile, then the words are gone.",
      path: [
        { label: "You", body: "Land, talk. No account, no forms — a structured 4-phase conversation that adapts to what you say." },
        { label: "Voice conversation", body: "True streaming voice over WebRTC, not transcribe-then-respond.", tech: "OpenAI Realtime" },
        { label: "Transcript", body: "Held only while you talk — never written to a database.", tech: "in memory" },
        { label: "Claude synthesis", body: "Turns the conversation into narrative threads, therapy-fit spectrums, and a first-session opener.", tech: "Claude Sonnet 4" },
        { label: "Your profile", body: "Anonymized, saved as PDF, auto-expires in 30 days. Yours to share with any therapist." },
      ],
      connectors: ["land & talk", "streamed", "synthesized", "shareable link"],
      branch: {
        intoIndex: 3, label: "grounded in",
        node: { label: "Clinical frameworks", body: "Cooper & Norcross fit axes, Prochaska stages — never named in output." },
      },
      platformConnector: "served by",
      platformLabel: "Runs on Vercel",
      platform: [
        { label: "App", body: "Vite + React 19 on Vercel edge functions." },
        { label: "Storage", body: "Supabase holds anonymized profiles only — RLS, UUID sharing." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "Vite + React 19 + TypeScript + Tailwind v4",
      },
      {
        label: "Voice",
        description:
          "OpenAI Realtime API (GA) via WebRTC — true streaming voice with ephemeral session tokens",
      },
      {
        label: "Synthesis",
        description:
          "Claude Sonnet 4 for transcript-to-profile synthesis, with fallback to 3.5-Sonnet",
      },
      {
        label: "Storage",
        description: "Supabase — anonymized profiles only, UUID-based sharing, RLS for privacy",
      },
      {
        label: "Hosting",
        description: "Vercel (static + edge functions)",
      },
    ],
    whatWeLearned: [
      "Voice captures signal that forms miss. Hesitations, emphasis, what someone returns to — these are diagnostic. A 5-minute conversation surfaces things a 20-field intake form never would, because people talk differently than they type.",
      "The hardest design problem is trust. The product has to earn it in 30 seconds, which means zero friction (no accounts, no forms), visible privacy commitments, and a tone that's warm without being clinical or artificially cheerful. The voice, the visualizer, the pacing — all of it is trust architecture.",
      "Medium inference is the right register. The profile says \"you seemed to return to\" rather than \"exhibits symptoms of.\" It's grounded enough to be useful to a clinician and recognizable enough that the patient sees themselves in it. That middle ground is hard to hold and worth holding.",
    ],
    status: [
      "Functional v0 demonstrating the full flow: voice conversation, profile synthesis, shareable artifact. Built to show what a voice-first intake product feels like to use, not just what it looks like on a slide.",
      "Source available on [GitHub](https://github.com/themurphiest/plainly).",
      "~~The hardest part of starting therapy isn't finding a therapist. It's finding the words.~~",
    ],
  },
  {
    slug: "lila-yoga",
    title: "Lila Yoga",
    client: "Studio project",
    tagline:
      "Four card decks for a serious practice: meditations, movements, body science, and teachings. Designed as one system.",
    tags: ["wellness", "yoga", "community", "content"],
    highlights: ["Swipe-enabled interactive card UI", "Deep research-verified content", "Single-system vocabulary"],
    statusLabel: "v0",
    category: "recent",
    externalUrl: "https://lila.yoga",
    externalLabel: "lila.yoga",
    heroImage: "/case-studies/lila-yoga/hero.jpg",
    heroImageAlt:
      "The Lila Yoga landing page showing the four deck covers (meditations, movements, body, and teachings) each with its tradition symbols on a linen background",
    opportunity:
      "Wellness apps aren't short on content. They're short on content that connects. A meditation app teaches meditation. A yoga app teaches poses. An anatomy app teaches biomechanics. A philosophy app teaches concepts. None of them talk to each other, which leaves the practitioner who actually wants to understand the practice, not just follow along, stitching four vocabularies together on their own.",
    thesis:
      "Build a single system that speaks at four altitudes. A Meditations card hands you something short and usable: a paragraph, a practice, one thing to carry into the day. If you want the philosophy behind it, the Teachings deck has a card for the concept. If you want the body science, Body explains the mechanism. Legs-Up-the-Wall isn't just \"calming.\" It triggers a baroreflex. Elevated legs increase venous return, raising stroke volume, stretching the arterial wall at the carotid sinus, triggering vagal slowing. That's a real thing, with a real mechanism, and knowing it changes how the practice feels.\n\nMost wellness content picks one altitude. This offers the traverse.",
    whatWeDid: {
      lead: "Built four decks, 138 cards, with a content architecture tuned to what each deck actually is. *Meditations*: 30 practices organized around five principles drawn from wisdom traditions, each a practice you carry into a day. *Movements*: 30 yoga poses as a flowing sequence, plus breathwork. *Body*: 47 cards on anatomy and biomechanics. *Teachings*: 30 concept cards across six traditions. Each deck has its own opening and closing rituals, its own color language, and a back face structured for what that deck's content calls for.",
      items: [
        {
          label: "The vocabulary is shared across decks by design.",
          description:
            "The Body deck established 97 movement-pattern strings (*segmental spinal mobility*, *anti-extension holds*, *scapular control under load*). The Movements deck references them on every pose. A concept in Meditations prose points to its canonical card in Teachings. A practice in one deck connects to a pose in another and a mechanism in a third. The decks resonate with each other rather than talking past each other.",
          image: "/case-studies/lila-yoga/vocabulary-card.jpg",
          imageAlt:
            "A Body deck card for the Iliopsoas (hip flexors), showing the Activates tab with three movement patterns and their corresponding Movements deck exercises",
          caption:
            "The Body deck's movement vocabulary, referenced by name in the Movements deck. Learn a pattern on one card, see it on every pose that trains it.",
        },
        {
          label: "The content is research-verified.",
          description:
            "The decks make factual claims, and the claims have to be right. Twenty-two specific things were revised against clinical sources during the content pass. Diaphragm pre-activation timing comes from Hodges & Richardson 1996. Stretch-tolerance claims come from Weppler & Magnusson 2010. If a card says it, there's a reason.",
          image: "/case-studies/lila-yoga/meditation-card.jpg",
          imageAlt:
            "A Flow principle Meditations card titled \"Let the body lead,\" referencing Mushin from Zen Buddhism",
          caption:
            "The tradition is named specifically. Mushin from Zen Buddhism, not generic mindfulness.",
        },
        {
          label: "No accounts, no backend, no analytics.",
          description:
            "Two static sites, one at [lila.yoga](https://lila.yoga), one at [lilatrips.com/practice](https://www.lilatrips.com/practice). Both load fast, work offline once cached, and have nothing to sign up for. The whole Lila Yoga site is 576KB gzipped. 138 cards, 88 anatomy illustrations, four decks, one landing page. Nothing between the reader and the content.",
          image: "/case-studies/lila-yoga/movement-card.jpg",
          imageAlt:
            "The Tree Pose (Vrksasana) Movements card with a glowing amber watercolor anatomy illustration",
          caption:
            "No menus, no dashboards, no accounts. Just cards, on a linen surface.",
        },
      ],
    },
    architecture: {
      intro:
        "Lila Yoga is deliberately backend-less — there's nothing between you and the content. The depth isn't in the stack; it's in how the four decks share one vocabulary and verify their own claims.",
      path: [
        { label: "You", body: "Swipe through cards. No account, no login, works offline once cached." },
        { label: "Four decks", body: "Meditations, Movements, Body, Teachings — one system at four altitudes.", tech: "138 cards" },
      ],
      connectors: ["open & swipe"],
      branch: {
        intoIndex: 1, label: "bound by",
        node: { label: "Shared vocabulary", body: "97 movement-pattern strings cross-referenced across every deck." },
        feeder: { label: "checked against", node: { label: "Research-verified", body: "22 claims revised against clinical sources." } },
      },
      platformConnector: "shipped as",
      platformLabel: "Static, no server",
      platform: [
        { label: "Frontend", body: "React + Vite, custom CSS, no UI libraries." },
        { label: "Backend", body: "None — all content is static JS in a 576KB bundle." },
        { label: "Hosting", body: "Vercel; loads fast, works offline." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "React 18, Vite, Tailwind CSS v4 for global theme",
      },
      {
        label: "Styling",
        description:
          "Inline styles on card components for precise animation control",
      },
      {
        label: "Animations",
        description:
          "Custom CSS keyframes (flip, deal-away, stack-lift). No animation library",
      },
      {
        label: "State",
        description:
          "useState, useRef, useCallback. No Redux, no Zustand, no context providers.",
      },
      {
        label: "Backend",
        description:
          "None. All card content is static JS data shipped in the bundle.",
      },
      {
        label: "Hosting",
        description: "Vercel, auto-deploys from GitHub on push",
      },
    ],
    whatWeLearned: [
      "The hard part of this kind of product isn't design or code. It's holding the voice. Writing 138 cards across four content architectures, drawing on a dozen wisdom traditions and decades of exercise science research, and keeping the voice coherent (grounded, direct, neither clinical nor mystical) is the actual work. The decks have to read like they were written by one person who knows a lot of things. That's not an accident; it's the result of holding a voice standard through every rewrite, every research pass, every placeholder filled.",
    ],
    status: [
      "Live at [lila.yoga](https://lila.yoga) and at [lilatrips.com/practice](https://www.lilatrips.com/practice). Free, no login. Currently being shared with local yoga instructors and practitioners for feedback. The first real test of whether the decks land with people who know what a serious practice looks like.",
    ],
  },
  {
    slug: "utah-trip-guide",
    title: "Utah Trip Guide",
    client: "Studio project",
    tagline:
      "An on-trip itinerary companion that turns a week-long road trip into a swipeable, bookable, living guide.",
    tags: ["travel", "outdoor", "PWA"],
    highlights: ["Offline-first PWA", "Live weather integration", "Card-based itinerary UX"],
    statusLabel: "v0",
    category: "recent",
    externalUrl: "https://utah-trip.vercel.app",
    externalLabel: "utah-trip.vercel.app",
    heroImage: "/case-studies/utah-trip-guide/hero-cover-route.png",
    heroImageAlt:
      "The Utah Trip Guide cover card showing the Southern Utah Anniversary Adventure route from Las Vegas through Zion, Bryce Canyon, and Capitol Reef. 650 miles, 7 days, with the Offline Ready indicator visible at the bottom.",
    opportunity:
      "Most trip planning lives in scattered notes, screenshots, and browser tabs. You know where you're going (Zion, Bryce, Capitol Reef) but coordinating flights, hotels, permits, gear, and weather across seven days becomes its own planning project. And then you get there, lose cell service on the trail, and realize none of it loads. The generic AI alternatives hallucinate restaurants that closed in 2019 and confidently recommend trails that don't exist.",
    thesis:
      "A good trip guide isn't a PDF you printed once. It's a live companion, something you actually open on the trail, in the car, at dinner. The information needed to make that work already exists: real bookings, real weather, real confirmation numbers. What's missing is a container elegant enough to use daily, structured enough to trust, and resilient enough to work when the signal drops.",
    whatWeDid: {
      lead: "Built a progressive web app that turns a week-long anniversary trip into an interactive, card-based guide. Three design choices make it work:",
      items: [
        {
          label: "Cards that mirror how you move through a trip.",
          description:
            "Each day is a self-contained card you swipe through. No scrolling through a 50-page PDF to find Day 4. Mobile-first from the start: tap targets sized for trekking-pole hands, information hierarchy tuned for thumb reach, swipe gestures that feel native. It feels like flipping through a deck of travel cards, which is exactly how people think about multi-day trips.",
          image: "/case-studies/utah-trip-guide/cards-narrows-day.png",
          imageAlt:
            "A Day 3 card for The Narrows showing a morning schedule: breakfast at 8, rental gear pickup at 9, hike from 10 to 1. Tap targets for rental outfitter links and afternoon options below.",
          caption:
            "Each day is a self-contained card. Schedule, rental gear links, and afternoon options, all reachable in one thumb.",
        },
        {
          label: "Live weather baked into every decision point.",
          description:
            "Weather isn't in a separate tab. It's embedded in the days that need it. The Narrows shows current temp, wind, and precipitation chance, because whether you hike depends entirely on flash flood risk. The Bryce-to-Torrey scenic drive shows weather for both ends, since you're crossing elevation zones.",
          image: "/case-studies/utah-trip-guide/weather-flash-flood.png",
          imageAlt:
            "Weather card for Zion National Park showing 58° cloudy with wind and precipitation data, paired with a Flash Flood Safety CRITICAL callout with a tap-to-call ranger hotline button.",
          caption:
            "Weather sits next to the decision it informs. On Narrows day, that means flash-flood conditions with the ranger hotline one tap away.",
        },
        {
          label: "Every booking one tap away, even with no signal.",
          description:
            "Hotel confirmations, Sphere tickets, flight status, boarding passes. Every critical link lives exactly where you need it, with confirmation numbers visible inline. Installed as a PWA, it works offline: I used it mid-hike in Zion with zero bars to check the next day's shuttle time. The moment you need your trip guide most is usually the moment you have no service. Most travel apps fail exactly there.",
          image: "/case-studies/utah-trip-guide/booking-hotel-cliffrose.png",
          imageAlt:
            "Day 2 hotel card for the Cliffrose Springdale showing room type, check-in/out times, confirmation and Hilton Honors numbers, with Call Hotel, Hotel Website, and View Confirmation buttons.",
          caption:
            "Confirmation numbers inline, hotel phone one tap away, the confirmation PDF cached for offline access.",
        },
      ],
    },
    architecture: {
      intro:
        "The guide is a swipeable deck of days that installs to your phone and keeps working when the signal drops. The bookings are real and curated; only the weather is live.",
      path: [
        { label: "You", body: "Swipe through the trip one day at a time — schedule, bookings, weather, all in thumb reach." },
        { label: "Day cards", body: "A self-contained card per day. Installs as a PWA and runs fully offline once cached.", tech: "React + PWA" },
      ],
      connectors: ["open the trip"],
      branch: {
        intoIndex: 1, label: "live on",
        node: { label: "Live weather", body: "Open-Meteo for 5 locations, sitting next to the decision it informs." },
        feeder: { label: "alongside", node: { label: "Embedded bookings", body: "Real confirmation numbers, curated not generated — cached offline." } },
      },
      platformConnector: "served by",
      platformLabel: "Runs on Vercel",
      platform: [
        { label: "Offline", body: "Service worker caches the whole trip for no-signal trails." },
        { label: "Hosting", body: "Installable PWA on Vercel." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "React with hooks, Tailwind utilities, Lucide icons",
      },
      {
        label: "Weather",
        description: "Open-Meteo API, five locations, updated on load",
      },
      {
        label: "Deployment",
        description: "Installable PWA with offline support",
      },
      {
        label: "Data",
        description:
          "All bookings embedded statically. Curation, not generation",
      },
    ],
    whatWeLearned: [
      "The best travel guides don't try to be comprehensive. They try to be confidence-inducing. You don't need every restaurant in Springdale; you need three good ones you can book tonight. You don't need a 40-page Zion guide; you need to know The Narrows requires a wetsuit in November and here's where to rent one.",
      "Curation beats generation. A hand-built guide with real bookings earns more trust than an AI itinerary with hallucinated recommendations. The information density is high, but the interface never feels cluttered because everything has one job: get you from decision to action in one tap, whether or not you're online.",
    ],
    status: [
      "Live and actively used. Covers 7 days, 3 national parks, 650 miles, 4 hotel bookings, live weather for 5 locations, plus packing lists and budget tracking.",
      "Utah Trip Guide was the V0 for what became [Lila Trips](https://www.lilatrips.com). The hardcoded prototype that proved the thesis (that a designed, curated trip artifact beats a generated one) turned into the platform. The two products now split the job: Lila Trips handles planning and booking; Utah Trip Guide is the on-trip companion. Learnings from Utah, especially around offline resilience and the card interface, are flowing back into Lila Trips as the on-trip experience matures.",
    ],
  },
  {
    slug: "hikerlink",
    title: "HikerLink",
    client: "Studio project",
    tagline:
      "Offline trail safety for Mount Baker, powered by the hikers around you.",
    tags: ["outdoor", "safety", "P2P", "native"],
    highlights: ["P2P mesh networking", "Native iOS distribution", "Offline-first safety architecture"],
    statusLabel: "In Development",
    category: "recent",
    externalUrl: "https://hiker-link.vercel.app/",
    externalLabel: "hiker-link.vercel.app",
    heroImage: "/case-studies/hikerlink/hero.png",
    heroImageAlt: "The HikerLink trail feed showing peer-synced conditions on Mount Baker",
    opportunity:
      "Backcountry conditions change by the hour. Ice appears, creek crossings rise, trail junctions get obscured by snow. The hikers who know what's up ahead are the ones coming down, but that information dies in passing conversation. Meanwhile, every trail-conditions app on the market assumes you have cell signal, which on Mount Baker you almost never do.",
    thesis:
      "The best condition reports already exist in the heads of hikers on the trail. Build a phone-to-phone mesh that lets that knowledge spread automatically, the way word-of-mouth works on a trail, but persistent. Make the whole thing work offline-first, because that's the only honest architecture for a mountain with no signal.",
    whatWeDid: {
      lead: "Built a native-capable trail safety app focused entirely on Mount Baker. Six routes, real conditions, current season. Three things make it different from every other trail app.",
      items: [
        {
          label: "Peer-to-peer condition sharing via MultipeerConnectivity.",
          description:
            "When two hikers pass each other on the trail, even with zero cell service, their phones automatically sync trail check-ins over Bluetooth and WiFi Direct. A hiker descending can passively share \"heads up, ice on the traverse above 5,800 ft\" to everyone they walk past on the way down. No server, no signal required. The information flows like word-of-mouth, but persistent. On a busy trail day, conditions propagate down the mountain organically, each phone becoming a relay.",
          image: "/case-studies/hikerlink/trail-feed.png",
          imageAlt: "The trail feed showing condition reports from nearby hikers, including one synced via P2P",
          caption: "\"Synced from nearby hiker.\" Conditions arrive over Bluetooth, no cell signal needed.",
        },
        {
          label: "Safety built in, not bolted on.",
          description:
            "Trip plans, emergency contacts, last-known GPS coordinates, SAR phone numbers. All available offline and designed for the moment you actually need them: cold hands, low battery, no signal. The emergency screen is high-contrast and single-purpose, because that's what matters at 6,000 feet when something goes wrong.",
          image: "/case-studies/hikerlink/emergency.png",
          imageAlt: "The emergency screen showing Call 911, SAR contact, and last known GPS coordinates",
          caption: "High-contrast, single-purpose. Designed for cold hands and low battery.",
        },
        {
          label: "A native shell that earns its weight.",
          description:
            "Capacitor wraps the React app into a native iOS shell distributed via TestFlight. This isn't a vanity native app. The native layer unlocks the MultipeerConnectivity API that makes the P2P mesh possible, something a pure web PWA can't do. Up to 10,000 testers, no App Store review required.",
          image: "/case-studies/hikerlink/check-in.png",
          imageAlt: "The check-in screen with GPS coordinates, waypoint selector, and condition status buttons",
          caption: "Check in from the trail. GPS, condition, and a note, all saved locally.",
        },
      ],
    },
    architecture: {
      intro:
        "HikerLink has no server and assumes no signal. Your check-in saves to your phone, then spreads hiker-to-hiker over Bluetooth — and conditions from the people ahead of you arrive the same way.",
      path: [
        { label: "You", body: "Check in from the trail: GPS, a condition, a note. Saved to your phone first.", tech: "localStorage" },
        { label: "P2P mesh", body: "Pass another hiker and your phones sync automatically over Bluetooth / WiFi Direct. No server, no signal.", tech: "MultipeerConnectivity" },
        { label: "Nearby hikers", body: "Conditions propagate down the mountain, each phone becoming a relay." },
      ],
      connectors: ["check in", "phones pass"],
      loopback: { fromIndex: 1, toIndex: 0, label: "conditions ahead" },
      branch: {
        intoIndex: 0, label: "always on",
        node: { label: "Offline safety", body: "Trip plan, SAR numbers, last-known GPS — there when the battery's low." },
      },
      platformConnector: "wrapped by",
      platformLabel: "Native iOS shell",
      platform: [
        { label: "Native", body: "Capacitor unlocks the P2P API a web app can't reach." },
        { label: "Distribution", body: "TestFlight — up to 10k testers, no App Store review." },
        { label: "Web app", body: "Vite + React, hosted on Vercel." },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description: "Vite + React + TypeScript, Tailwind for styling",
      },
      {
        label: "Native",
        description:
          "Capacitor for iOS shell, MultipeerConnectivity for peer-to-peer mesh",
      },
      {
        label: "Offline",
        description:
          "Service worker via vite-plugin-pwa, localStorage for trip plans and check-ins",
      },
      {
        label: "Distribution",
        description: "TestFlight (up to 10k testers, no App Store review)",
      },
      {
        label: "Hosting",
        description: "Vercel",
      },
    ],
    whatWeLearned: [
      "Hyper-local beats global. Instead of trying to be a trail database for everywhere, HikerLink is a field guide for one mountain, and that constraint makes every screen better. Six routes, real conditions, current season. The app knows exactly what it is.",
      "The most interesting distribution problems are the ones where the network *is* the product. Every new phone on the trail makes the mesh better. The install incentive isn't features. It's that the person you just passed on the switchback had conditions from two hours ahead of you.",
    ],
    status: [
      "In active development. The web app is functional; the Capacitor native layer and MultipeerConnectivity integration are in progress for TestFlight distribution.",
      "~~Build for the mountain, not the App Store.~~",
    ],
  },
  // --- Selected experience ---
  {
    slug: "rei-adventures",
    title: "REI Adventures",
    client: "REI",
    tagline: "Product strategy for REI's guided trip business",
    tags: ["outdoor", "travel", "strategy"],
    category: "experience",
    opportunity:
      "REI Adventures is one of the largest adventure travel companies in the US, but the digital product experience hadn't kept pace with the quality of the trips themselves.",
    thesis:
      "A modern trip discovery and booking experience, one that felt as considered as the trips, could unlock meaningful growth in a business with strong margins and deep brand affinity.",
    whatWeDid: {
      lead: "Developed the product strategy for trip discovery, booking, and post-trip engagement. Led the team through research, concept development, and initial build.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder: what we learned from this engagement."],
    status: ["Shipped."],
  },
  {
    slug: "rei-cooperative-action",
    title: "REI Cooperative Action",
    client: "REI",
    tagline:
      "Uniting REI's member activism and charitable giving programs",
    tags: ["outdoor", "social impact", "membership"],
    category: "experience",
    opportunity: "Placeholder: the opportunity behind this work.",
    thesis: "Placeholder: the thesis we tested.",
    whatWeDid: { lead: "Placeholder: what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder: what we learned."],
    status: ["Shipped."],
  },
  {
    slug: "healthline-bezzy-daily-dose",
    title: "Healthline: Bezzy + Daily Dose",
    client: "Healthline",
    tagline: "Community and engagement products for health audiences",
    tags: ["health", "community", "consumer"],
    category: "experience",
    opportunity:
      "Healthline reaches hundreds of millions of users, but most visits are transactional: search, read, leave. There was an opportunity to build deeper, ongoing relationships through community and personalized content.",
    thesis:
      "Health content consumers would engage more deeply with a platform that combined peer community with personalized daily content, not just search-driven articles.",
    whatWeDid: {
      lead: "Led the product strategy and launch for Bezzy (peer community for chronic conditions) and Daily Dose (personalized health content), from concept through initial release.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder: what we learned from this engagement."],
    status: ["Shipped."],
  },
  {
    slug: "rei-membership",
    title: "REI Membership",
    client: "REI",
    tagline: "Rebuilding REI's member experience",
    tags: ["outdoor", "membership", "e-commerce"],
    category: "experience",
    opportunity:
      "REI's co-op membership, one of the most iconic loyalty programs in retail, needed a modern digital experience that reflected the depth of the member relationship.",
    thesis:
      "Membership at REI is more than a dividend check. A reimagined digital experience could deepen engagement and drive both retention and lifetime value.",
    whatWeDid: {
      lead: "Led the product strategy and roadmap for the membership experience redesign across web and mobile, from discovery through launch.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder: what we learned from this engagement."],
    status: ["Shipped."],
  },
];
