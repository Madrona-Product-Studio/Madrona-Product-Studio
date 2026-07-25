export const sanJuanRouteScenario = {
  start: "Bellingham",
  destination: "Sucia Island",
  conditionsLabel: "Illustrative conditions only",
  disclaimer: "Interface demonstration. Not current navigational guidance. Verify charts, weather, tides, notices, and vessel requirements before departure.",
  routes: [
    {
      id: "direct",
      name: "Direct crossing",
      distance: "Approx. 20 NM",
      duration: "Approx. 2.5–3.5 hours",
      bestFor: "A direct run when conditions and crew comfort support open-water exposure.",
      tradeoff: "Faster, with fewer protected fallback points.",
      possibleStop: "None planned",
      verify: ["Wind and sea state", "Visibility", "Fuel range", "Current notices"],
    },
    {
      id: "island-protected",
      name: "Island-protected route",
      distance: "Approx. 25 NM",
      duration: "Approx. 3.5–5 hours",
      bestFor: "A more sheltered-feeling route with additional decision points and possible stops.",
      tradeoff: "Longer and more complex, with more route choices to manage.",
      possibleStop: "Matia or nearby protected water, depending on verified conditions",
      verify: ["Passage depths", "Currents", "Anchorage availability", "Protected-area restrictions"],
    },
  ],
} as const;
