# San Juan Islands Boating Guide

A purpose-built web app for boaters cruising the San Juan Islands.

https://sanjuan-guide.vercel.app/

![Hero](./images/01-hero-homepage.png)
*The San Juan Islands Boating Guide homepage*

## Opportunity

Most boating guides are built for the shelf — static PDFs, dense cruising almanacs, or whatever Google Maps returns when you search "food near me" from a marina. That's fine if you already know the archipelago. It's the wrong frame entirely if you're cruising it for the first time, or the tenth, and want to actually find the quiet cove, the good restaurant a short walk from the dock, the trail that's worth the tie-up. The people who travel the San Juans by boat — for the anchorages, for the pace, for the island-to-island rhythm of it — are underserved by every existing tool. Almanacs are stuck in print logic. Google Maps doesn't know what a VHF channel is.

## Thesis

A good cruising day isn't a list of businesses sorted by distance from a highway. It's a weave — of marina, tide, dock walk, weather, island. The information to do that weaving well already exists, scattered across cruiser knowledge, state park data, NOAA, and Google's place database. What's missing is a product that pulls it all together from a boater's point of view. Build that product — curate the entries by hand, let Google do the part it's actually good at: current photos, ratings, phone numbers, directions.

## What we did

Built the full product — curation, structure, map, and all the infrastructure underneath. Three areas in particular took the most work and make the thing what it is:

### A curated guide, not a scraped one.

Most travel apps let a generic search surface whatever's trending and hope for the best. This one does the opposite: every marina, restaurant, trail, gallery, and wellness studio is a hand-written entry oriented around the dock, not the highway. Marinas list VHF channels, moorage types, fuel availability, and depth cautions. Restaurants list walk distance from the slip. The trade is scale for trust, and it's the right call — the guide feels authored by a cruiser, not scraped.

![Marina detail card](./images/02-marina-detail-card.png)
*A marina detail showing VHF channel, moorage type, fuel, depth — the stuff boaters actually need.*

### Live enrichment from Google Places.

Each curated entry is backed by live data. Tap a restaurant in Friday Harbor and you get current photos, rating, phone number, website, and directions — pulled through a Vercel serverless proxy so the API key never touches the client, cached 24 hours for search results and 7 days for photos so it stays fast on spotty marina Wi-Fi. Open a marina and you see the dock as it looks this season, not as it looked in a 2011 almanac.

![Restaurant modal with live Google Places data](./images/03-restaurant-modal.png)
*Curated entries backed by live photos, ratings, and directions from Google Places.*

### Structured the way boaters actually navigate.

Content is organized by island and by marina, not by category alone. Five tabs — Map, Islands, Dining, Trails, Logistics — let you move between the views that matter depending on where you are in a trip. Planning the week from home? Start with Islands. Just tied up at Deer Harbor? Open the map, tap the marker, see what's walkable. The Logistics tab collects the stuff that doesn't fit anywhere else but everyone needs: water taxi rates, ferry schedules, pumpout stations, customs clearance, whale buffer zones, a suggested multi-day route.

![Interactive map view](./images/04-map-view.png)
*The archipelago with color-coded markers by marina type — boater's-eye navigation.*

## Built with

**Frontend**
Vanilla HTML/CSS/JS with Leaflet for the map — no framework, no build step, loads fast on marina Wi-Fi

**Hosting**
Vercel (static + serverless functions), auto-deploy from GitHub

**Live data**
Google Places for photos, ratings, phone numbers, websites, and directions — pulled through cached serverless proxies so the API key never touches the client

**Content**
Hand-curated across the full cruising corridor: 7 islands, 24 marinas, 24 restaurants, 20 trails, 9 galleries, 7 wellness studios, 8 logistics reference cards — 99 entries from Bellingham and Anacortes staging points through the main ferry-served islands to the outer marine parks

## What we learned

The hard part of a boater-facing product isn't the map or the API. It's the ground truth underneath it — the curation, the orientation, the decision to measure everything from the dock instead of the road. Google Places gets the credit for the nice photo; the hand-written guide does the work of putting you in front of the right place to begin with.

Most travel apps are thin. This one is deep by choice, and you can feel the difference the moment you tie up and open it.

## Status

Live at [sanjuan-guide.vercel.app](https://sanjuan-guide.vercel.app/), shared with cruising boaters as a v1 for feedback and iteration. The product has been built end-to-end — curation, map, live enrichment, logistics — and now it meets actual boaters for the first time.

The v1 is focused on three things: whether the dock-first orientation matches how cruisers actually plan and explore, whether the five-tab structure is the right shape for a trip that moves island to island, and whether the curated entries plus live Google Places data are enough to replace the almanac and the ad-hoc searches boaters use today.

What comes next depends on what the users tell us. The likely paths forward are deeper marina and anchorage detail, expansion into the Gulf Islands and South Sound, partnerships with harbormasters and marine businesses, and an offline mode for coves with no signal. More coverage will come as the core product earns it.

Build real, test real, scale what's earned.
