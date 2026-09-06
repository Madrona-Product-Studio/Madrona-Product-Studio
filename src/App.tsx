import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop, PageFade } from "./components/RouteMotion";
// The home, the services overview, the four service doors (the most-clicked
// links off the home), the products page and /connect stay eager so the
// core path never waits on a chunk. Everything else is route-split so that
// only its own CSS (playbook.css, agent-demo.css, charlie.css...) rides
// along; those were previously render-blocking on every page.
import ServicesV3 from "./pages/v3/ServicesV3";
import HomeV3 from "./pages/v3/HomeV3";
import ServicePageV4 from "./pages/v3/ServicePageV4";
import MadronaV2Apps from "./pages/lab/MadronaV2Apps";
import MadronaV2Connect from "./pages/lab/MadronaV2Connect";
import RouteGround from "./components/RouteGround";
const MadronaV2About = lazy(() => import("./pages/lab/MadronaV2About"));
const MadronaV2Pov = lazy(() => import("./pages/lab/MadronaV2Pov"));
const AgentsGallery = lazy(() => import("./pages/lab/AgentsGallery"));
const CharliePage = lazy(() => import("./pages/v3/CharliePage"));
const MadronaV2Thesis = lazy(() => import("./pages/lab/MadronaV2Thesis"));
const MadronaV2EngineNote = lazy(() => import("./pages/lab/MadronaV2EngineNote"));
const MadronaV2AgenticNote = lazy(() => import("./pages/lab/MadronaV2AgenticNote"));
const MadronaV2StarterGuideNote = lazy(() => import("./pages/lab/MadronaV2StarterGuideNote"));
const MadronaV2SystemNote = lazy(() => import("./pages/lab/MadronaV2SystemNote"));
const MadronaV2InventoryNote = lazy(() => import("./pages/lab/MadronaV2InventoryNote"));
const MadronaV2Open = lazy(() => import("./pages/lab/MadronaV2Open"));
const MadronaSystem = lazy(() => import("./pages/lab/MadronaSystem"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WhereToStart = lazy(() => import("./pages/v3/WhereToStart"));
const PitchKit = lazy(() => import("./pages/lab/PitchKit"));
const AgentMonthEndClose = lazy(() => import("./pages/lab/AgentMonthEndClose"));
const AgentInvoiceChasing = lazy(() => import("./pages/lab/AgentInvoiceChasing"));
const AgentIndustryBrief = lazy(() => import("./pages/lab/AgentIndustryBrief"));
const AgentCustomerInbox = lazy(() => import("./pages/lab/AgentCustomerInbox"));
const AgentCashPosition = lazy(() => import("./pages/lab/AgentCashPosition"));
const AgentPayrollPlanning = lazy(() => import("./pages/lab/AgentPayrollPlanning"));
const AgentPostSaleFollowup = lazy(() => import("./pages/lab/AgentPostSaleFollowup"));
const AgentReviewRequests = lazy(() => import("./pages/lab/AgentReviewRequests"));
const AgentBestCustomers = lazy(() => import("./pages/lab/AgentBestCustomers"));
const AgentContractReview = lazy(() => import("./pages/lab/AgentContractReview"));

// Retired URLs (old /agents, /pov, /current, /work, /how-it-works, the /v3
// previews, the old assessment slugs, and the /lab/madrona-v2 pages) are
// 301'd by vercel.json before the app ever loads, so they are not mirrored
// here. Add a redirect there, not a client-side <Navigate>.

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageFade>
      <Suspense fallback={<RouteGround />}>
      <Routes>
        {/* V3 promoted 2026-08-29: the redesign is the live site. */}
        <Route path="/" element={<HomeV3 />} />
        <Route path="services/ai-operations" element={<ServicePageV4 serviceId="operations-and-ai" />} />
        <Route path="services/brand-website" element={<ServicePageV4 serviceId="brand-and-web" />} />
        <Route path="services/growth-retention" element={<ServicePageV4 serviceId="customers-and-growth" />} />
        <Route path="services/new-products" element={<ServicePageV4 serviceId="new-products" />} />
        {/* Charlie's public positioning page — sendable, out of the nav.
            Sibling of the internal /pitch-kit rehearsal surface. */}
        <Route path="charlie" element={<CharliePage />} />
        <Route path="services" element={<ServicesV3 />} />
        <Route path="apps" element={<MadronaV2Apps />} />
        <Route path="connect" element={<MadronaV2Connect />} />
        <Route path="about" element={<MadronaV2About />} />
        {/* Thinking — the studio feed (renamed from Our POV 2026-08-07). */}
        <Route path="thinking" element={<MadronaV2Pov />} />
        <Route path="thinking/under-the-hood" element={<MadronaV2EngineNote />} />
        <Route path="thinking/the-era-of-agentic-operations" element={<MadronaV2AgenticNote />} />
        <Route path="thinking/starter-guide-to-building-with-ai" element={<MadronaV2StarterGuideNote />} />
        <Route path="thinking/solve-the-system-not-the-symptom" element={<MadronaV2SystemNote />} />
        <Route path="thinking/ai-tools-for-small-business" element={<MadronaV2InventoryNote />} />
        <Route path="open" element={<MadronaV2Open />} />
        {/* Tools — the deployable-agent gallery + one live demo per agent,
            all built on the AgentConsole engine + agent-deployment template.
            Moved from /agents → /tools (2026-08-21); old URLs 301 in vercel.json. */}
        <Route path="tools" element={<AgentsGallery />} />
        <Route path="tools/month-end-close" element={<AgentMonthEndClose />} />
        <Route path="tools/invoice-chasing" element={<AgentInvoiceChasing />} />
        <Route path="tools/industry-brief" element={<AgentIndustryBrief />} />
        <Route path="tools/customer-inbox" element={<AgentCustomerInbox />} />
        <Route path="tools/cash-position" element={<AgentCashPosition />} />
        <Route path="tools/payroll-planning" element={<AgentPayrollPlanning />} />
        <Route path="tools/post-sale-followup" element={<AgentPostSaleFollowup />} />
        <Route path="tools/review-requests" element={<AgentReviewRequests />} />
        <Route path="tools/best-customers" element={<AgentBestCustomers />} />
        <Route path="tools/contract-review" element={<AgentContractReview />} />
        <Route path="thesis" element={<MadronaV2Thesis />} />
        {/* AI Opportunity Assessment — the refocused free assessment
            (docs/redesign-2026-08/ai-opportunity-spec.md). Canonical URL is
            /ai-opportunities (Charlie sign-off 2026-09-01). */}
        <Route path="ai-opportunities" element={<WhereToStart />} />
        {/* Internal design-system study — kept routable for working sessions,
            but never linked from the public site. */}
        <Route path="lab/madrona-system" element={<MadronaSystem />} />
        {/* Charlie's positioning kit — internal, unlinked, noindex. Source of
            truth: charlie-hq/job-search/pitch-kit.md. */}
        <Route path="pitch-kit" element={<PitchKit />} />

        {/* Unknown URLs get a real 404 (the prerender emits dist/404.html
            from the same copy for direct hits). */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      </PageFade>
    </BrowserRouter>
  );
}
