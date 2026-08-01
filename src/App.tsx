import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CaseStudyPage from "./pages/CaseStudyPage";
import HowItWorks from "./pages/HowItWorks";
import AgenticOperations from "./pages/AgenticOperations";
import StudioBrief from "./pages/StudioBrief";
import HomeLab from "./pages/HomeLab";
import MadronaV2 from "./pages/lab/MadronaV2";
import MadronaV2Home from "./pages/lab/MadronaV2Home";
import MadronaV2Services from "./pages/lab/MadronaV2Services";
import MadronaV2Apps from "./pages/lab/MadronaV2Apps";
import MadronaV2Connect from "./pages/lab/MadronaV2Connect";
import MadronaV2About from "./pages/lab/MadronaV2About";
import MadronaV2Thinking from "./pages/lab/MadronaV2Thinking";
import MadronaSystem from "./pages/lab/MadronaSystem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Story rethink: new studio front-door home; current homepage preserved as /consulting. */}
        <Route path="/" element={<MadronaV2Home />} />
        <Route path="consulting" element={<MadronaV2 />} />
        <Route path="services" element={<MadronaV2Services />} />
        <Route path="apps" element={<MadronaV2Apps />} />
        <Route path="work" element={<Navigate to="/apps" replace />} />
        <Route path="connect" element={<MadronaV2Connect />} />
        <Route path="about" element={<MadronaV2About />} />
        <Route path="thinking" element={<MadronaV2Thinking />} />

        {/* Preserve old lab URLs (bookmarks) → redirect to canonical roots. */}
        <Route path="lab/madrona-v2" element={<Navigate to="/" replace />} />
        <Route path="lab/madrona-v2/services" element={<Navigate to="/services" replace />} />
        <Route path="lab/madrona-v2/apps" element={<Navigate to="/apps" replace />} />
        <Route path="lab/madrona-system" element={<MadronaSystem />} />

        {/* Legacy pages not yet rebuilt in V2 (still old chrome). */}
        <Route element={<Layout />}>
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="services/agentic-operations" element={<AgenticOperations />} />
          <Route path="approach" element={<Navigate to="/how-it-works" replace />} />
          <Route path="writing" element={<Navigate to="/thinking" replace />} />
          <Route path="contact" element={<Navigate to="/connect" replace />} />
          <Route path="brief" element={<StudioBrief />} />
          <Route path="home-lab" element={<HomeLab />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
