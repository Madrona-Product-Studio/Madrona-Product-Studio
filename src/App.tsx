import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop, PageFade } from "./components/RouteMotion";
import Layout from "./components/Layout";
import CaseStudyPage from "./pages/CaseStudyPage";
import AgenticOperations from "./pages/AgenticOperations";
import MadronaV2 from "./pages/lab/MadronaV2";
import MadronaV2Home from "./pages/lab/MadronaV2Home";
import MadronaV2Services from "./pages/lab/MadronaV2Services";
import MadronaV2Apps from "./pages/lab/MadronaV2Apps";
import MadronaV2Connect from "./pages/lab/MadronaV2Connect";
import MadronaV2About from "./pages/lab/MadronaV2About";
import MadronaV2Thesis from "./pages/lab/MadronaV2Thesis";
import MadronaV2Current from "./pages/lab/MadronaV2Current";
import MadronaV2EngineNote from "./pages/lab/MadronaV2EngineNote";
import MadronaV2AgenticNote from "./pages/lab/MadronaV2AgenticNote";
import MadronaSystem from "./pages/lab/MadronaSystem";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageFade>
      <Routes>
        {/* Story rethink: new studio front-door home; current homepage preserved as /consulting. */}
        <Route path="/" element={<MadronaV2Home />} />
        <Route path="consulting" element={<MadronaV2 />} />
        <Route path="services" element={<MadronaV2Services />} />
        <Route path="apps" element={<MadronaV2Apps />} />
        <Route path="work" element={<Navigate to="/apps" replace />} />
        <Route path="connect" element={<MadronaV2Connect />} />
        <Route path="about" element={<MadronaV2About />} />
        {/* Current — the studio feed (2026-08-05). */}
        <Route path="current" element={<MadronaV2Current />} />
        <Route path="current/under-the-hood" element={<MadronaV2EngineNote />} />
        <Route path="current/the-era-of-agentic-operations" element={<MadronaV2AgenticNote />} />
        <Route path="current/the-studio-that-runs-itself" element={<Navigate to="/current/the-era-of-agentic-operations" replace />} />
        <Route path="journal" element={<Navigate to="/current" replace />} />
        <Route path="journal/the-madrona-engine" element={<Navigate to="/current/under-the-hood" replace />} />
        <Route path="notes" element={<Navigate to="/current" replace />} />
        <Route path="playbook" element={<Navigate to="/current" replace />} />
        <Route path="thinking" element={<Navigate to="/current" replace />} />
        <Route path="thesis" element={<MadronaV2Thesis />} />

        {/* Preserve old lab URLs (bookmarks) → redirect to canonical roots. */}
        <Route path="lab/madrona-v2" element={<Navigate to="/" replace />} />
        <Route path="lab/madrona-v2/services" element={<Navigate to="/services" replace />} />
        <Route path="lab/madrona-v2/apps" element={<Navigate to="/apps" replace />} />
        {/* Internal design-system study — kept routable for working sessions,
            but never linked from the public site. */}
        <Route path="lab/madrona-system" element={<MadronaSystem />} />

        {/* Legacy pages not yet rebuilt in V2 (still old chrome). */}
        <Route element={<Layout />}>
          <Route path="work/:slug" element={<CaseStudyPage />} />
          {/* Engagement-model content now lives on the practice page (V2). */}
          <Route path="how-it-works" element={<Navigate to="/consulting" replace />} />
          <Route path="services/agentic-operations" element={<AgenticOperations />} />
          <Route path="approach" element={<Navigate to="/consulting" replace />} />
          <Route path="writing" element={<Navigate to="/current" replace />} />
          <Route path="contact" element={<Navigate to="/connect" replace />} />
        </Route>

        {/* Unknown URLs land home rather than on a blank screen. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </PageFade>
    </BrowserRouter>
  );
}
