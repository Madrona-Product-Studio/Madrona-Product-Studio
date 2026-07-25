export const audiences = [
  { id: "farms-food", title: "Farms and food", description: "Orders, inventory, wholesale accounts, changing availability, and customers who need clear answers." },
  { id: "outdoor-travel", title: "Outdoor and travel", description: "Complex information, high-consideration decisions, and experiences that must work before and during the trip." },
  { id: "health-wellness", title: "Health and wellness", description: "Trust, appointments, ongoing relationships, and information people need to understand." },
  { id: "shops-services", title: "Shops and services", description: "Being found, making the sale, bringing people back, and keeping the operation manageable." },
] as const;

export const serviceAreas = [
  {
    id: "brand-web",
    title: "Brand and web",
    line: "Look as good as the business actually is.",
    description: "Positioning, identity, messaging, websites, content, and online stores that help people understand and choose the business.",
    deliverables: ["Positioning", "Brand systems", "Websites", "Content", "Online stores"],
  },
  {
    id: "customers-growth",
    title: "Customers and growth",
    line: "Make it easier to understand, buy, return, and stay connected.",
    description: "Customer journeys and systems that turn first interest into a clear purchase and a lasting relationship.",
    deliverables: ["Customer journeys", "Commerce", "Memberships", "Loyalty", "Retention"],
  },
  {
    id: "operations-ai",
    title: "Operations and AI",
    line: "Remove repetitive work and make the business easier to run.",
    description: "Focused internal tools, integrations, automation, and practical AI grounded in real workflows and human review.",
    deliverables: ["Workflow design", "Internal tools", "Integrations", "Automation", "Agents"],
  },
] as const;

export const capabilityStages = [
  { id: "strategy", title: "Strategy and roadmap", description: "Assessment, opportunity framing, priorities, and success measures." },
  { id: "brand", title: "Brand and identity", description: "Positioning, voice, visual system, and real applications." },
  { id: "prototype", title: "Design and prototype", description: "Flows, interfaces, scenarios, and customer feedback before full investment." },
  { id: "build", title: "Web and product", description: "Responsive, accessible working software with a maintainable system behind it." },
  { id: "automation", title: "AI and automation", description: "Inputs, rules, agent actions, structured output, and explicit human decisions." },
] as const;
