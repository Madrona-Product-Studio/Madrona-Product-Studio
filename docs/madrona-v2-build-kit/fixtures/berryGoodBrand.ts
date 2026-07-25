export const berryGoodVoiceExamples = [
  {
    id: "homepage",
    context: "Homepage",
    generic: "We offer premium locally grown berries and agricultural products for retail and wholesale customers.",
    specific: "Grown here. Picked when they’re ready. Berries that taste like berries.",
  },
  {
    id: "sold-out",
    context: "Sold out",
    generic: "This product is currently unavailable.",
    specific: "That row is picked clean. More are coming Thursday.",
  },
  {
    id: "confirmation",
    context: "Order confirmation",
    generic: "Your order has been received and will be available during the selected pickup window.",
    specific: "Your berries are set aside. We’ll see you Thursday morning.",
  },
  {
    id: "wholesale",
    context: "Wholesale introduction",
    generic: "Contact us to learn about wholesale purchasing options.",
    specific: "Stocking the stand, café, or kitchen? Tell us what you go through in a week.",
  },
] as const;

export const berryGoodApplications = [
  { id: "farm-stand", label: "Farm stand", description: "Availability, pricing, pickup, and the honor box." },
  { id: "online-ordering", label: "Online ordering", description: "A clear path from what is ripe to a confirmed pickup." },
  { id: "wholesale", label: "Wholesale", description: "Ordering and billing language for repeat business customers." },
  { id: "packaging", label: "Packaging", description: "A recognizable system that still feels simple and local." },
] as const;
