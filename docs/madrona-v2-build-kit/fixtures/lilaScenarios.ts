export const lilaScenarios = [
  {
    id: "unhurried-quiet-full",
    inputs: { pace: "Unhurried", preference: "Quiet places", duration: "Full day" },
    title: "A slow day along the canyon edge",
    rationale: "Fewer stops, shorter transfers, and time to stay when a place feels right.",
    plan: [
      { time: "8:00 AM", title: "Early overlook walk", reason: "Cooler air and softer light before the crowds arrive." },
      { time: "10:30 AM", title: "Long breakfast in town", reason: "A deliberate pause instead of another rushed stop." },
      { time: "1:00 PM", title: "Quiet side-canyon trail", reason: "A less iconic route with more room to settle in." },
      { time: "5:30 PM", title: "Sunset from the mesa", reason: "End in one place rather than driving between viewpoints." },
    ],
  },
  {
    id: "active-iconic-full",
    inputs: { pace: "Active", preference: "Iconic sights", duration: "Full day" },
    title: "The essential landscape in one ambitious day",
    rationale: "Early starts and tighter transitions make room for the region’s defining experiences.",
    plan: [
      { time: "6:30 AM", title: "Signature canyon hike", reason: "Start before heat and congestion build." },
      { time: "11:30 AM", title: "Fast lunch and reset", reason: "Keep the middle of the day practical." },
      { time: "1:00 PM", title: "Scenic drive with two short walks", reason: "Cover more terrain without adding another major hike." },
      { time: "6:00 PM", title: "Classic sunset viewpoint", reason: "Finish with the view the destination is known for." },
    ],
  },
  {
    id: "unhurried-iconic-half",
    inputs: { pace: "Unhurried", preference: "Iconic sights", duration: "Half day" },
    title: "One defining experience, done well",
    rationale: "A focused half day protects the sense of place instead of squeezing in a checklist.",
    plan: [
      { time: "2:00 PM", title: "Scenic approach and orientation", reason: "Understand the landscape before entering it." },
      { time: "3:00 PM", title: "One signature walk", reason: "Choose the experience with the strongest payoff for the available time." },
      { time: "6:00 PM", title: "Early dinner nearby", reason: "Avoid ending the day with another long transfer." },
    ],
  },
] as const;
