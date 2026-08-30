import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { ScrollToTop, PageFade } from "./components/RouteMotion";
import Layout from "./components/Layout";
// Primary-nav destinations stay eager so top-level navigation is instant.
import ServicesV3 from "./pages/v3/ServicesV3";
import HomeV3 from "./pages/v3/HomeV3";
import MadronaV2Apps from "./pages/lab/MadronaV2Apps";
import MadronaV2Connect from "./pages/lab/MadronaV2Connect";
import MadronaV2About from "./pages/lab/MadronaV2About";
import MadronaV2Pov from "./pages/lab/MadronaV2Pov";
import AgentsGallery from "./pages/lab/AgentsGallery";
// Everything deeper is route-split: articles, tool demos, the assessment, and
// legacy/lab pages don't belong in the first-load bundle.
const AgenticOperations = lazy(() => import("./pages/AgenticOperations"));
const ServicePageV3 = lazy(() => import("./pages/v3/ServicePageV3"));
const CharliePage = lazy(() => import("./pages/v3/CharliePage"));
const MadronaV2Thesis = lazy(() => import("./pages/lab/MadronaV2Thesis"));
const MadronaV2EngineNote = lazy(() => import("./pages/lab/MadronaV2EngineNote"));
const MadronaV2AgenticNote = lazy(() => import("./pages/lab/MadronaV2AgenticNote"));
const MadronaV2StarterGuideNote = lazy(() => import("./pages/lab/MadronaV2StarterGuideNote"));
const MadronaV2SystemNote = lazy(() => import("./pages/lab/MadronaV2SystemNote"));
const MadronaV2InventoryNote = lazy(() => import("./pages/lab/MadronaV2InventoryNote"));
const MadronaV2Open = lazy(() => import("./pages/lab/MadronaV2Open"));
const MadronaSystem = lazy(() => import("./pages/lab/MadronaSystem"));
const WhereToStart = lazy(() => import("./pages/v3/WhereToStart"));
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

// Old /agents/:slug demo URLs → /tools/:slug (client-side; vercel.json 301s too).
function AgentsToTools() {
  const { slug } = useParams();
  return <Navigate to={`/tools/${slug}`} replace />;
}

// Old /v3/services preview URLs → the promoted real routes.
function V3ToServices() {
  const { slug } = useParams();
  return <Navigate to={`/services/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageFade>
      <Suspense fallback={null}>
      <Routes>
        {/* V3 promoted 2026-08-29: the redesign is the live site. */}
        <Route path="/" element={<HomeV3 />} />
        <Route path="services/ai-operations" element={<ServicePageV3 serviceId="operations-and-ai" />} />
        <Route path="services/brand-website" element={<ServicePageV3 serviceId="brand-and-web" />} />
        <Route path="services/growth-retention" element={<ServicePageV3 serviceId="customers-and-growth" />} />
        <Route path="services/new-products" element={<ServicePageV3 serviceId="new-products" />} />
        {/* Charlie's public positioning page — sendable, out of the nav.
            Sibling of the internal /pitch-kit rehearsal surface. */}
        <Route path="charlie" element={<CharliePage />} />
        {/* Day-old door slugs (2026-08-29 launch prep) → the label slugs. */}
        <Route path="services/work-smarter" element={<Navigate to="/services/ai-operations" replace />} />
        <Route path="services/build-trust" element={<Navigate to="/services/brand-website" replace />} />
        <Route path="services/grow-your-business" element={<Navigate to="/services/growth-retention" replace />} />
        {/* Old /v3 preview URLs → the real routes (vercel.json 301s too). */}
        <Route path="v3" element={<Navigate to="/" replace />} />
        <Route path="v3/services/:slug" element={<V3ToServices />} />
        <Route path="v3/consulting/work-smarter" element={<Navigate to="/services/ai-operations" replace />} />
        <Route path="services" element={<ServicesV3 />} />
        <Route path="consulting" element={<Navigate to="/services" replace />} />
        <Route path="apps" element={<MadronaV2Apps />} />
        <Route path="work" element={<Navigate to="/apps" replace />} />
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
            Moved from /agents → /tools (2026-08-21); old URLs redirect below. */}
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
        {/* Old /agents URLs → /tools (belt-and-suspenders with vercel.json 301s). */}
        <Route path="agents" element={<Navigate to="/tools" replace />} />
        <Route path="agents/:slug" element={<AgentsToTools />} />
        {/* Old /pov URLs redirect into /thinking. */}
        <Route path="pov" element={<Navigate to="/thinking" replace />} />
        <Route path="pov/under-the-hood" element={<Navigate to="/thinking/under-the-hood" replace />} />
        <Route path="pov/the-era-of-agentic-operations" element={<Navigate to="/thinking/the-era-of-agentic-operations" replace />} />
        <Route path="pov/starter-guide-to-building-with-ai" element={<Navigate to="/thinking/starter-guide-to-building-with-ai" replace />} />
        <Route path="current" element={<Navigate to="/thinking" replace />} />
        <Route path="current/under-the-hood" element={<Navigate to="/thinking/under-the-hood" replace />} />
        <Route path="current/the-era-of-agentic-operations" element={<Navigate to="/thinking/the-era-of-agentic-operations" replace />} />
        <Route path="current/starter-guide-to-building-with-ai" element={<Navigate to="/thinking/starter-guide-to-building-with-ai" replace />} />
        <Route path="current/the-studio-that-runs-itself" element={<Navigate to="/thinking/the-era-of-agentic-operations" replace />} />
        <Route path="journal" element={<Navigate to="/thinking" replace />} />
        <Route path="journal/the-madrona-engine" element={<Navigate to="/thinking/under-the-hood" replace />} />
        <Route path="notes" element={<Navigate to="/thinking" replace />} />
        <Route path="playbook" element={<Navigate to="/thinking" replace />} />
        <Route path="thesis" element={<MadronaV2Thesis />} />
        {/* Where to Start — the free assessment (report-first respec,
            docs/redesign-2026-08/assessment-respec.md). Canonical; it took
            over from /checkup (Charlie sign-off 2026-08-30). */}
        <Route path="where-to-start" element={<WhereToStart />} />
        {/* Old assessment URLs → the new canonical tool (vercel.json 301s too). */}
        <Route path="checkup" element={<Navigate to="/where-to-start" replace />} />
        <Route path="signal-check" element={<Navigate to="/where-to-start" replace />} />

        {/* Preserve old lab URLs (bookmarks) → redirect to canonical roots. */}
        <Route path="lab/madrona-v2" element={<Navigate to="/" replace />} />
        <Route path="lab/madrona-v2/services" element={<Navigate to="/services#services" replace />} />
        <Route path="lab/madrona-v2/apps" element={<Navigate to="/apps" replace />} />
        {/* Internal design-system study — kept routable for working sessions,
            but never linked from the public site. */}
        <Route path="lab/madrona-system" element={<MadronaSystem />} />

        {/* Legacy pages not yet rebuilt in V2 (still old chrome). */}
        <Route element={<Layout />}>
          <Route path="services/agentic-operations" element={<AgenticOperations />} />
        </Route>
        {/* Case studies retired 2026-08-23 → the products page (vercel.json 301s too). */}
        <Route path="work/:slug" element={<Navigate to="/apps" replace />} />
        {/* Engagement-model content now lives on the practice page (V2). */}
        <Route path="how-it-works" element={<Navigate to="/services" replace />} />
        <Route path="approach" element={<Navigate to="/services" replace />} />
        <Route path="writing" element={<Navigate to="/thinking" replace />} />
        <Route path="contact" element={<Navigate to="/connect" replace />} />

        {/* Unknown URLs land home rather than on a blank screen. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      </PageFade>
    </BrowserRouter>
  );
}
