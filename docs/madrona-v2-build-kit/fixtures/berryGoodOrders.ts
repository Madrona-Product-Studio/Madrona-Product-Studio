export type BerryGoodOrderScenario = {
  id: string;
  label: string;
  input: string;
  steps: string[];
  output: {
    customer: string;
    product: string;
    confirmedQuantity: number | null;
    optionalQuantity: number | null;
    unit: string;
    pickupDate: string | null;
    pickupWindow: string | null;
    billingLocation: string | null;
    availability: "available" | "limited" | "unknown";
    review: string[];
  };
};

export const berryGoodOrderScenarios: BerryGoodOrderScenario[] = [
  {
    id: "clear-retail",
    label: "Clear retail order",
    input: "Hi, can I pick up two flats of raspberries Saturday morning? I can pay at the stand.",
    steps: [
      "Customer matched to an existing retail profile",
      "Product and quantity extracted",
      "Pickup window interpreted",
      "Availability checked",
      "Payment preference recorded",
      "Structured order prepared",
    ],
    output: {
      customer: "Maya Thompson",
      product: "Raspberries",
      confirmedQuantity: 2,
      optionalQuantity: null,
      unit: "flats",
      pickupDate: "Saturday",
      pickupWindow: "9 AM–noon",
      billingLocation: null,
      availability: "available",
      review: [],
    },
  },
  {
    id: "wholesale-ambiguous",
    label: "Wholesale order with uncertainty",
    input: "Hi Sarah, could we get 12 flats of strawberries for the co-op next Thursday? We may need another four depending on the weekend. Same pickup as last time. Please invoice the downtown location.",
    steps: [
      "Customer and account identified",
      "Product and confirmed quantity extracted",
      "Optional quantity separated from the confirmed order",
      "Requested date interpreted",
      "Previous pickup details found",
      "Billing location matched",
      "Availability checked",
      "Question requiring human review flagged",
    ],
    output: {
      customer: "Downtown Community Co-op",
      product: "Strawberries",
      confirmedQuantity: 12,
      optionalQuantity: 4,
      unit: "flats",
      pickupDate: "Next Thursday",
      pickupWindow: "9–11 AM",
      billingLocation: "Downtown store",
      availability: "limited",
      review: ["Decide whether to hold four optional flats and for how long."],
    },
  },
  {
    id: "missing-information",
    label: "Order missing key information",
    input: "Could you put me down for berries again next week? About the same as last time. Thanks!",
    steps: [
      "Sender matched to a prior customer",
      "Previous order located",
      "Likely product and quantity inferred but not confirmed",
      "Pickup date missing",
      "Availability cannot be reserved yet",
      "Clarifying reply drafted",
    ],
    output: {
      customer: "North Fork Café",
      product: "Mixed berries, inferred",
      confirmedQuantity: null,
      optionalQuantity: 6,
      unit: "flats",
      pickupDate: null,
      pickupWindow: null,
      billingLocation: "North Fork Café",
      availability: "unknown",
      review: ["Confirm berry mix and quantity.", "Ask for a pickup day and window."],
    },
  },
];

export const sampleOrderOptions = {
  products: ["Raspberries", "Strawberries", "Blueberries", "Mixed berry box"],
  quantities: [1, 2, 4, 6, 12],
  pickupWindows: ["Friday 3–6 PM", "Saturday 9 AM–noon", "Wholesale Thursday 9–11 AM"],
  customerTypes: ["Retail", "Wholesale"],
} as const;
