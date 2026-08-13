import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop, PageFade } from "./components/RouteMotion";
import Layout from "./components/Layout";
import CaseStudyPage from "./pages/CaseStudyPage";
import AgenticOperations from "./pages/AgenticOperations";
import MadronaV2 from "./pages/lab/MadronaV2";
import MadronaV2Home from "./pages/lab/MadronaV2Home";
import MadronaV2Apps from "./pages/lab/MadronaV2Apps";
import MadronaV2Connect from "./pages/lab/MadronaV2Connect";
import MadronaV2About from "./pages/lab/MadronaV2About";
import MadronaV2Thesis from "./pages/lab/MadronaV2Thesis";
import MadronaV2Pov from "./pages/lab/MadronaV2Pov";
import MadronaV2EngineNote from "./pages/lab/MadronaV2EngineNote";
import MadronaV2AgenticNote from "./pages/lab/MadronaV2AgenticNote";
import MadronaV2StarterGuideNote from "./pages/lab/MadronaV2StarterGuideNote";
import MadronaV2SystemNote from "./pages/lab/MadronaV2SystemNote";
import MadronaV2Open from "./pages/lab/MadronaV2Open";
import MadronaSystem from "./pages/lab/MadronaSystem";
import MadronaV2Checkup from "./pages/lab/MadronaV2Checkup";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageFade>
      <Routes>
        {/* Story rethink: new studio front-door home; current homepage preserved as /consulting. */}
        <Route path="/" element={<MadronaV2Home />} />
        <Route path="consulting" element={<MadronaV2 />} />
        {/* Services folded into the one "How we help" page (2026-08-10) —
            the four doors now live in depth on /consulting. */}
        <Route path="services" element={<Navigate to="/consulting#services" replace />} />
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
        <Route path="open" element={<MadronaV2Open />} />
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
        {/* PROTOTYPE — AI checkup; unlinked + noindexed until approved. */}
        <Route path="checkup" element={<MadronaV2Checkup />} />

        {/* Preserve old lab URLs (bookmarks) → redirect to canonical roots. */}
        <Route path="lab/madrona-v2" element={<Navigate to="/" replace />} />
        <Route path="lab/madrona-v2/services" element={<Navigate to="/consulting#services" replace />} />
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
          <Route path="writing" element={<Navigate to="/thinking" replace />} />
          <Route path="contact" element={<Navigate to="/connect" replace />} />
        </Route>

        {/* Unknown URLs land home rather than on a blank screen. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </PageFade>
    </BrowserRouter>
  );
}
