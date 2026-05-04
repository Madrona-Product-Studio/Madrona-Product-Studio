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

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  tags: string[];
  category: "recent" | "experience";
  externalUrl?: string;
  externalLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  opportunity: string;
  thesis: string;
  whatWeDid: WhatWeDid;
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
      "A travel platform for designing transformative trips in sacred landscapes.",
    tags: ["wellness", "travel", "AI", "concept"],
    category: "recent",
    externalUrl: "https://www.lilatrips.com/",
    externalLabel: "lilatrips.com",
    heroImage: "/case-studies/lila-trips/hero.jpg",
    heroImageAlt: "The Lila Trips homepage",
    opportunity:
      "Most travel products are built to optimize — most trails, most sights, least time. That's useful if you're planning a long weekend. It's the wrong frame entirely if you want a trip that actually changes something. The people who travel that way — for intention, for practice, for depth — are underserved by every major travel tool, and the new wave of AI travel apps makes the problem worse, not better. More hallucinated recommendations, more \"optimized\" days, less actual place.",
    thesis:
      "A good trip isn't a list of things to do. It's a weave — of place, timing, weather, sky, wildlife, practice, pace. The information to do that weaving well already exists, scattered across public APIs, citizen science networks, government data, and the lived knowledge of people who know a place. What's missing is a product that pulls it all together into something coherent enough to trust. Build that product — and let AI do the part it's actually good at: sequencing and personalizing, not inventing.",
    whatWeDid: {
      lead: "Built the full product — research, brand, destination guides, planner, and all the infrastructure underneath. Every destination in Lila is a place I've been to multiple times and care about deeply — the guides are grounded in years of firsthand experience, not desk research. Three areas in particular took the most work and make the thing what it is:",
      items: [
        {
          label: "An AI-powered trip planner on a leash.",
          description:
            "Most AI travel products let the model hallucinate freely and hope for the best. Lila does the opposite: every restaurant, trail, hotel, and cultural site exists in a hand-curated guide file, and the AI can only recommend from that corpus. The trade is scale for trust, and it's the right call — itineraries feel authored, not generated. *See the planner at [lilatrips.com/plan](https://www.lilatrips.com/plan).*",
          image: "/case-studies/lila-trips/planner.jpg",
          imageAlt: "A generated Lila Trips itinerary showing day-by-day activities",
          caption: "The planner shapes days from curated guide content — authored, not hallucinated.",
        },
        {
          label: "Destination guides that pull live context from everywhere.",
          description:
            "Each guide is a long-form editorial page backed by live data — NPS trail conditions, iNaturalist wildlife observations, Google Places enrichment for restaurants and hotels, astronomy calculations for the night sky widget, real-time weather, USGS river levels. Tap a condor in the Zion guide and you get 372 real nearby observations. Open the night sky widget and the moon phase is drawn from tonight's synodic age. *[See the guides.](https://www.lilatrips.com/destinations)*",
          image: "/case-studies/lila-trips/destination-guide.jpg",
          imageAlt: "A Lila Trips destination guide page showing terrain, trails, and curated content",
          caption: "Each destination is a long-form guide backed by live data — trails, wildlife, weather, night sky.",
        },
        {
          label: "A practice library woven into the trip.",
          description:
            "The planner draws on a library of contemplative and movement practices (built separately as [Lila.yoga](https://lila.yoga)) and assigns them to days as matched companions. Day 3 at the Narrows might pair with a Taoist water meditation and a Tree Pose at the canyon rim. Not a feature bolted on — a worldview embedded in software.",
          image: "/case-studies/lila-trips/practice-companion.jpg",
          imageAlt: "A practice companion card matched to a day in a Lila Trips itinerary",
          caption: "The AI matches practices to each day based on setting and energy.",
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
        description: "Supabase (sessions, trip sharing)",
      },
      {
        label: "Live data",
        description:
          "NPS, Google Places, iNaturalist, AstronomyAPI, Open-Meteo, USGS — pulled through cached serverless proxies so API keys never touch the client",
      },
      {
        label: "Email",
        description: "Resend for trip sharing and contact",
      },
    ],
    whatWeLearned: [
      "The hard part of AI-powered product isn't the AI. It's the ground truth underneath it — the guides, the curation, the constrained context, the research, the math. The AI gets the credit; the corpus does the work.",
      "Most AI products are thin. This one is deep by choice, and you can feel the difference the moment you use it.",
    ],
    status: [
      "Live at [lilatrips.com](https://www.lilatrips.com/), in active beta with real users as of this writing. The product has already been through several research and build iterations; the public release is where it meets actual intentional travelers for the first time.",
      "The beta is focused on three things: whether the core planner is usable, whether the experience is actually desirable to the intentional-travel audience we built it for, and whether the AI-generated itineraries hold up in quality and stability across real trips.",
      "What comes next depends on what the users tell us. The likely paths forward are freemium tiers for the planner and guides, referral monetization on bookings, and small-group *Threshold Trips* as a higher-touch product. More destinations will come as the core product earns them.",
      "~~Build real, test real, scale what's earned.~~",
    ],
  },
  {
    slug: "san-juan-boating-guide",
    title: "San Juan Boating Guide",
    client: "Studio project",
    tagline:
      "A purpose-built web app for boaters cruising the San Juan Islands.",
    tags: ["travel", "local", "community", "maps"],
    category: "recent",
    externalUrl: "https://sanjuan-guide.vercel.app/",
    externalLabel: "sanjuan-guide.vercel.app",
    heroImage: "/case-studies/san-juan-boating-guide/hero.jpg",
    heroImageAlt:
      "The San Juan Islands Boating Guide homepage",
    opportunity:
      "Most boating guides are built for the shelf — static PDFs, dense cruising almanacs, or whatever Google Maps returns when you search \"food near me\" from a marina. That's fine if you already know the archipelago. It's the wrong frame entirely if you're cruising it for the first time, or the tenth, and want to actually find the quiet cove, the good restaurant a short walk from the dock, the trail that's worth the tie-up. The people who travel the San Juans by boat — for the anchorages, for the pace, for the island-to-island rhythm of it — are underserved by every existing tool. Almanacs are stuck in print logic. Google Maps doesn't know what a VHF channel is.",
    thesis:
      "A good cruising day isn't a list of businesses sorted by distance from a highway. It's a weave — of marina, tide, dock walk, weather, island. The information to do that weaving well already exists, scattered across cruiser knowledge, state park data, NOAA, and Google's place database. What's missing is a product that pulls it all together from a boater's point of view. Build that product — curate the entries by hand, let Google do the part it's actually good at: current photos, ratings, phone numbers, directions.",
    whatWeDid: {
      lead: "Built the full product — curation, structure, map, and all the infrastructure underneath. Three areas in particular took the most work and make the thing what it is:",
      items: [
        {
          label: "A curated guide, not a scraped one.",
          description:
            "Most travel apps let a generic search surface whatever's trending and hope for the best. This one does the opposite: every marina, restaurant, trail, gallery, and wellness studio is a hand-written entry oriented around the dock, not the highway — drawn from three summers of cruising the San Juans, personal notes, conversations with harbormasters and other boaters, and being connected to the community. Marinas list VHF channels, moorage types, fuel availability, and depth cautions. Restaurants list walk distance from the slip. The trade is scale for trust, and it's the right call — the guide feels authored by a cruiser because it was.",
          image: "/case-studies/san-juan-boating-guide/marina.jpg",
          imageAlt:
            "A marina detail showing VHF channel, moorage type, fuel, depth — the stuff boaters actually need.",
          caption:
            "A marina detail showing VHF channel, moorage type, fuel, depth — the stuff boaters actually need.",
        },
        {
          label: "Live enrichment from Google Places.",
          description:
            "Each curated entry is backed by live data. Tap a restaurant in Friday Harbor and you get current photos, rating, phone number, website, and directions — pulled through a Vercel serverless proxy so the API key never touches the client, cached 24 hours for search results and 7 days for photos so it stays fast on spotty marina Wi-Fi. Open a marina and you see the dock as it looks this season, not as it looked in a 2011 almanac.",
          image: "/case-studies/san-juan-boating-guide/restaurant.jpg",
          imageAlt:
            "Curated entries backed by live photos, ratings, and directions from Google Places.",
          caption:
            "Curated entries backed by live photos, ratings, and directions from Google Places.",
        },
        {
          label: "Structured the way boaters actually navigate.",
          description:
            "Content is organized by island and by marina, not by category alone. Five tabs — Map, Islands, Dining, Trails, Logistics — let you move between the views that matter depending on where you are in a trip. Planning the week from home? Start with Islands. Just tied up at Deer Harbor? Open the map, tap the marker, see what's walkable. The Logistics tab collects the stuff that doesn't fit anywhere else but everyone needs: water taxi rates, ferry schedules, pumpout stations, customs clearance, whale buffer zones, a suggested multi-day route.",
          image: "/case-studies/san-juan-boating-guide/map.jpg",
          imageAlt:
            "The archipelago with color-coded markers by marina type — boater's-eye navigation.",
          caption:
            "The archipelago with color-coded markers by marina type — boater's-eye navigation.",
        },
      ],
    },
    builtWith: [
      {
        label: "Frontend",
        description:
          "Vanilla HTML/CSS/JS with Leaflet for the map — no framework, no build step, loads fast on marina Wi-Fi",
      },
      {
        label: "Hosting",
        description: "Vercel (static + serverless functions), auto-deploy from GitHub",
      },
      {
        label: "Live data",
        description:
          "Google Places for photos, ratings, phone numbers, websites, and directions — pulled through cached serverless proxies so the API key never touches the client",
      },
      {
        label: "Content",
        description:
          "Hand-curated across the full cruising corridor: 7 islands, 24 marinas, 24 restaurants, 20 trails, 9 galleries, 7 wellness studios, 8 logistics reference cards — 99 entries from Bellingham and Anacortes staging points through the main ferry-served islands to the outer marine parks",
      },
    ],
    whatWeLearned: [
      "The hard part of a boater-facing product isn't the map or the API. It's the ground truth underneath it — the curation, the orientation, the decision to measure everything from the dock instead of the road. Google Places gets the credit for the nice photo; the hand-written guide does the work of putting you in front of the right place to begin with.",
      "Most travel apps are thin. This one is deep by choice, and you can feel the difference the moment you tie up and open it.",
    ],
    status: [
      "Live at [sanjuan-guide.vercel.app](https://sanjuan-guide.vercel.app/), shared with cruising boaters as a v1 for feedback and iteration. The product has been built end-to-end — curation, map, live enrichment, logistics — and now it meets actual boaters for the first time.",
      "The v1 is focused on three things: whether the dock-first orientation matches how cruisers actually plan and explore, whether the five-tab structure is the right shape for a trip that moves island to island, and whether the curated entries plus live Google Places data are enough to replace the almanac and the ad-hoc searches boaters use today.",
      "What comes next depends on what the users tell us. The likely paths forward are deeper marina and anchorage detail, expansion into the Gulf Islands and South Sound, partnerships with harbormasters and marine businesses, and an offline mode for coves with no signal. More coverage will come as the core product earns it.",
      "~~Build real, test real, scale what's earned.~~",
    ],
  },
  {
    slug: "lila-yoga",
    title: "Lila Yoga",
    client: "Studio project",
    tagline:
      "Four card decks for a serious practice — meditations, movements, body science, and teachings — designed as one system.",
    tags: ["wellness", "yoga", "community", "content"],
    category: "recent",
    externalUrl: "https://lila.yoga",
    externalLabel: "lila.yoga",
    heroImage: "/case-studies/lila-yoga/hero.jpg",
    heroImageAlt:
      "The Lila Yoga landing page, showing the four deck covers — meditations, movements, body, and teachings — each with its tradition symbols on a linen background",
    opportunity:
      "Wellness apps aren't short on content. They're short on content that connects. A meditation app teaches meditation. A yoga app teaches poses. An anatomy app teaches biomechanics. A philosophy app teaches concepts. None of them talk to each other, which leaves the practitioner who actually wants to understand the practice — not just follow along — stitching four vocabularies together on their own.",
    thesis:
      "Build a single system that speaks at four altitudes. A Meditations card hands you something short and usable — a paragraph, a practice, one thing to carry into the day. If you want the philosophy behind it, the Teachings deck has a card for the concept. If you want the body science, Body explains the mechanism: Legs-Up-the-Wall isn't just \"calming\" — it triggers a baroreflex. Elevated legs increase venous return, raising stroke volume, stretching the arterial wall at the carotid sinus, triggering vagal slowing. That's a real thing, with a real mechanism, and knowing it changes how the practice feels.\n\nMost wellness content picks one altitude. This offers the traverse.",
    whatWeDid: {
      lead: "Built four decks, 138 cards, with a content architecture tuned to what each deck actually is. *Meditations* — 30 practices organized around five principles drawn from wisdom traditions, each a practice you carry into a day. *Movements* — 30 yoga poses as a flowing sequence, plus breathwork. *Body* — 47 cards on anatomy and biomechanics. *Teachings* — 30 concept cards across six traditions. Each deck has its own opening and closing rituals, its own color language, and a back face structured for what that deck's content calls for.",
      items: [
        {
          label: "The vocabulary is shared across decks by design.",
          description:
            "The Body deck established 97 movement-pattern strings — *segmental spinal mobility*, *anti-extension holds*, *scapular control under load*. The Movements deck references them on every pose. A concept in Meditations prose points to its canonical card in Teachings. A practice in one deck connects to a pose in another and a mechanism in a third. The decks resonate with each other rather than talking past each other.",
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
            "Two static sites — one at [lila.yoga](https://lila.yoga), one at [lilatrips.com/practice](https://www.lilatrips.com/practice). Both load fast, work offline once cached, and have nothing to sign up for. The whole Lila Yoga site is 576KB gzipped. 138 cards, 88 anatomy illustrations, four decks, one landing page. Nothing between the reader and the content.",
          image: "/case-studies/lila-yoga/movement-card.jpg",
          imageAlt:
            "The Tree Pose (Vrksasana) Movements card with a glowing amber watercolor anatomy illustration",
          caption:
            "No menus, no dashboards, no accounts. Just cards, on a linen surface.",
        },
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
          "Custom CSS keyframes — flip, deal-away, stack-lift — no animation library",
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
      "The hard part of this kind of product isn't design or code. It's holding the voice. Writing 138 cards across four content architectures, drawing on a dozen wisdom traditions and decades of exercise science research, and keeping the voice coherent — grounded, direct, neither clinical nor mystical — is the actual work. The decks have to read like they were written by one person who knows a lot of things. That's not an accident; it's the result of holding a voice standard through every rewrite, every research pass, every placeholder filled.",
    ],
    status: [
      "Live at [lila.yoga](https://lila.yoga) and at [lilatrips.com/practice](https://www.lilatrips.com/practice). Free, no login. Currently being shared with local yoga instructors and practitioners for feedback — the first real test of whether the decks land with people who know what a serious practice looks like.",
    ],
  },
  {
    slug: "aria-health",
    title: "Aria Health",
    client: "Studio project",
    tagline:
      "An AI health companion that guides people through menopause — not with generic information, but with structured, empathetic, stage-aware support.",
    tags: ["health", "AI", "concept", "prototype"],
    category: "recent",
    externalUrl: "https://github.com/Madrona-Product-Studio/aria",
    externalLabel: "GitHub",
    heroImage: "/case-studies/aria-health/hero.jpg",
    heroImageAlt: "The Aria Health landing page — So you've been diagnosed with menopause...",
    opportunity:
      "Health platforms have decades of trusted content, but it sits behind search — articles, listicles, condition pages. When someone gets a life-changing diagnosis or enters a major transition like menopause, they don't need another article. They need a companion that synthesizes what's known, remembers their context, and meets them where they are emotionally. Generic AI assistants hallucinate medical advice. Static content doesn't adapt. Nothing in between does both well.",
    thesis:
      "An AI companion constrained to evidence-based health content — with real clinical guardrails, stage-aware context, and an empathetic conversational voice — could transform a content library into an active guidance platform. Not a doctor. Not a chatbot. A structured companion that helps people prepare for appointments, understand their symptoms, and take the next step with confidence.",
    whatWeDid: {
      lead: "Built a functional prototype that demonstrates the full concept — from first diagnosis through ongoing journey management. The prototype is scoped to the menopause transition, but the architecture is designed to generalize across any health inflection point.",
      items: [
        {
          label: "A conversational AI tuned for health, not search.",
          description:
            "Aria isn't a general-purpose chatbot pointed at a knowledge base. The system prompt encodes clinical guardrails, emotional calibration, and a structured guidance framework — Must Know, Should Consider, Can Do Today — that shapes every response. It knows when to suggest a doctor visit, when to offer reassurance, and when to simply listen. It never diagnoses, never prescribes, and always defers to professional care for medical decisions.",
          image: "/case-studies/aria-health/chat.jpg",
          imageAlt: "The Aria chat interface with conversation starters like 'I think I'm starting menopause' and 'Help me understand HRT options'",
          caption: "Structured conversation starters meet people where they are — not a blank input box.",
        },
        {
          label: "A journey map that tracks where you are.",
          description:
            "Menopause isn't a single event — it's a multi-year transition through perimenopause, menopause, and postmenopause. Aria models the journey as a structured timeline with stages, milestones, and phase-specific guidance. The interface shows where you are, what to expect next, and what's relevant right now — not everything at once.",
          image: "/case-studies/aria-health/journey.jpg",
          imageAlt: "A journey card showing 'Hot flashes & night sweats' — card 1 of 4 in the symptom education sequence",
          caption: "Stage-specific guidance delivered as swipeable cards — one topic at a time, not a wall of text.",
        },
        {
          label: "Built as a product concept, not a demo.",
          description:
            "This isn't a slide deck or a wireframe. It's a working Next.js application with real AI conversations, a dashboard, and journey tracking. The prototype is designed to show what a health guidance product *feels like* to use — the tone, the pacing, the trust-building — not just what it looks like on a screen.",
          image: "/case-studies/aria-health/dashboard.jpg",
          imageAlt: "The Aria dashboard showing symptom tracking, journey stages, quick actions, and a chat prompt",
          caption: "Symptom tracking, journey stages, and quick actions — a working dashboard, not a wireframe.",
        },
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
          "Designed to generalize — the menopause journey is the proof of concept, but the three-layer framework (triggering moments, guidance structure, delivery modes) applies to any health inflection point",
      },
    ],
    whatWeLearned: [
      "The hardest part of a health AI product isn't the AI. It's the guardrails — knowing when to speak, when to defer, when to escalate, and how to hold an empathetic tone across hundreds of conversational turns without drifting into false reassurance or clinical coldness.",
      "A structured journey model changes everything. When the AI knows what stage you're in, it stops being a search engine and starts being a companion. Context turns generic content into personal guidance.",
    ],
    status: [
      "Functional prototype, built as a product concept to demonstrate the vision. The architecture is designed to generalize beyond menopause to any health inflection point — diagnosis, treatment, recovery, major life transitions.",
      "Source available on [GitHub](https://github.com/Madrona-Product-Studio/aria).",
    ],
  },
  {
    slug: "utah-trip-guide",
    title: "Utah Trip Guide",
    client: "Studio project",
    tagline:
      "An on-trip itinerary companion that turns a week-long road trip into a swipeable, bookable, living guide.",
    tags: ["travel", "outdoor", "PWA"],
    category: "recent",
    externalUrl: "https://utah-trip.vercel.app",
    externalLabel: "utah-trip.vercel.app",
    heroImage: "/case-studies/utah-trip-guide/hero-cover-route.png",
    heroImageAlt:
      "The Utah Trip Guide cover card showing the Southern Utah Anniversary Adventure route from Las Vegas through Zion, Bryce Canyon, and Capitol Reef — 650 miles, 7 days — with the \"Offline Ready\" indicator visible at the bottom.",
    opportunity:
      "Most trip planning lives in scattered notes, screenshots, and browser tabs. You know where you're going — Zion, Bryce, Capitol Reef — but coordinating flights, hotels, permits, gear, and weather across seven days becomes its own planning project. And then you get there, lose cell service on the trail, and realize none of it loads. The generic AI alternatives hallucinate restaurants that closed in 2019 and confidently recommend trails that don't exist.",
    thesis:
      "A good trip guide isn't a PDF you printed once. It's a live companion — something you actually open on the trail, in the car, at dinner. The information needed to make that work already exists: real bookings, real weather, real confirmation numbers. What's missing is a container elegant enough to use daily, structured enough to trust, and resilient enough to work when the signal drops.",
    whatWeDid: {
      lead: "Built a progressive web app that turns a week-long anniversary trip into an interactive, card-based guide. Three design choices make it work:",
      items: [
        {
          label: "Cards that mirror how you move through a trip.",
          description:
            "Each day is a self-contained card you swipe through — no scrolling through a 50-page PDF to find Day 4. Mobile-first from the start: tap targets sized for trekking-pole hands, information hierarchy tuned for thumb reach, swipe gestures that feel native. It feels like flipping through a deck of travel cards, which is exactly how people think about multi-day trips.",
          image: "/case-studies/utah-trip-guide/cards-narrows-day.png",
          imageAlt:
            "A Day 3 card for The Narrows showing a morning schedule: breakfast at 8, rental gear pickup at 9, hike from 10 to 1. Tap targets for rental outfitter links and afternoon options below.",
          caption:
            "Each day is a self-contained card. Schedule, rental gear links, and afternoon options — all reachable in one thumb.",
        },
        {
          label: "Live weather baked into every decision point.",
          description:
            "Weather isn't in a separate tab — it's embedded in the days that need it. The Narrows shows current temp, wind, and precipitation chance, because whether you hike depends entirely on flash flood risk. The Bryce-to-Torrey scenic drive shows weather for both ends, since you're crossing elevation zones.",
          image: "/case-studies/utah-trip-guide/weather-flash-flood.png",
          imageAlt:
            "Weather card for Zion National Park showing 58° cloudy with wind and precipitation data, paired with a Flash Flood Safety CRITICAL callout with a tap-to-call ranger hotline button.",
          caption:
            "Weather sits next to the decision it informs. On Narrows day, that means flash-flood conditions with the ranger hotline one tap away.",
        },
        {
          label: "Every booking one tap away, even with no signal.",
          description:
            "Hotel confirmations, Sphere tickets, flight status, boarding passes — every critical link lives exactly where you need it, with confirmation numbers visible inline. Installed as a PWA, it works offline: I used it mid-hike in Zion with zero bars to check the next day's shuttle time. The moment you need your trip guide most is usually the moment you have no service. Most travel apps fail exactly there.",
          image: "/case-studies/utah-trip-guide/booking-hotel-cliffrose.png",
          imageAlt:
            "Day 2 hotel card for the Cliffrose Springdale showing room type, check-in/out times, confirmation and Hilton Honors numbers, with Call Hotel, Hotel Website, and View Confirmation buttons.",
          caption:
            "Confirmation numbers inline, hotel phone one tap away, the confirmation PDF cached for offline access.",
        },
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
          "All bookings embedded statically — curation, not generation",
      },
    ],
    whatWeLearned: [
      "The best travel guides don't try to be comprehensive — they try to be confidence-inducing. You don't need every restaurant in Springdale; you need three good ones you can book tonight. You don't need a 40-page Zion guide; you need to know The Narrows requires a wetsuit in November and here's where to rent one.",
      "Curation beats generation. A hand-built guide with real bookings earns more trust than an AI itinerary with hallucinated recommendations. The information density is high, but the interface never feels cluttered because everything has one job: get you from decision to action in one tap — whether or not you're online.",
    ],
    status: [
      "Live and actively used. Covers 7 days, 3 national parks, 650 miles, 4 hotel bookings, live weather for 5 locations, plus packing lists and budget tracking.",
      "Utah Trip Guide was the V0 for what became [Lila Trips](https://www.lilatrips.com). The hardcoded prototype that proved the thesis — that a designed, curated trip artifact beats a generated one — turned into the platform. The two products now split the job: Lila Trips handles planning and booking; Utah Trip Guide is the on-trip companion. Learnings from Utah, especially around offline resilience and the card interface, are flowing back into Lila Trips as the on-trip experience matures.",
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
      "A modern trip discovery and booking experience — one that felt as considered as the trips — could unlock meaningful growth in a business with strong margins and deep brand affinity.",
    whatWeDid: {
      lead: "Developed the product strategy for trip discovery, booking, and post-trip engagement. Led the team through research, concept development, and initial build.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
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
    opportunity: "Placeholder — the opportunity behind this work.",
    thesis: "Placeholder — the thesis we tested.",
    whatWeDid: { lead: "Placeholder — what we did.", items: [] },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned."],
    status: ["Shipped."],
  },
  {
    slug: "healthline-bezzy-daily-dose",
    title: "Healthline — Bezzy + Daily Dose",
    client: "Healthline",
    tagline: "Community and engagement products for health audiences",
    tags: ["health", "community", "consumer"],
    category: "experience",
    opportunity:
      "Healthline reaches hundreds of millions of users, but most visits are transactional — search, read, leave. There was an opportunity to build deeper, ongoing relationships through community and personalized content.",
    thesis:
      "Health content consumers would engage more deeply with a platform that combined peer community with personalized daily content — not just search-driven articles.",
    whatWeDid: {
      lead: "Led the product strategy and launch for Bezzy (peer community for chronic conditions) and Daily Dose (personalized health content), from concept through initial release.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
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
      "REI's co-op membership — one of the most iconic loyalty programs in retail — needed a modern digital experience that reflected the depth of the member relationship.",
    thesis:
      "Membership at REI is more than a dividend check. A reimagined digital experience could deepen engagement and drive both retention and lifetime value.",
    whatWeDid: {
      lead: "Led the product strategy and roadmap for the membership experience redesign across web and mobile, from discovery through launch.",
      items: [],
    },
    builtWith: [],
    whatWeLearned: ["Placeholder — what we learned from this engagement."],
    status: ["Shipped."],
  },
];
