// Demo content, keyed by agent id. The registry (data/agents.ts) decides what
// exists; this decides what the page says. A registry entry without a demo
// here falls through to /tools.
import type { AgentDemo } from "./types";
import { monthEndClose } from "./monthEndClose";
import { invoiceChasing } from "./invoiceChasing";
import { cashPosition } from "./cashPosition";
import { payrollPlanning } from "./payrollPlanning";
import { customerInbox } from "./customerInbox";
import { postSaleFollowup } from "./postSaleFollowup";
import { reviewRequests } from "./reviewRequests";
import { bestCustomers } from "./bestCustomers";
import { industryBrief } from "./industryBrief";
import { contractReview } from "./contractReview";

export type { AgentDemo } from "./types";

const all: AgentDemo[] = [
  monthEndClose,
  invoiceChasing,
  cashPosition,
  payrollPlanning,
  customerInbox,
  postSaleFollowup,
  reviewRequests,
  bestCustomers,
  industryBrief,
  contractReview,
];

export const agentDemos: Record<string, AgentDemo> = Object.fromEntries(all.map((demo) => [demo.id, demo]));
