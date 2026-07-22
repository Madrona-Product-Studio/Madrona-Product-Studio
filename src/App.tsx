import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import CaseStudyPage from "./pages/CaseStudyPage";
import Approach from "./pages/Approach";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import AgenticOperations from "./pages/AgenticOperations";
import Writing from "./pages/Writing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudioBrief from "./pages/StudioBrief";
import HomeLab from "./pages/HomeLab";
import HomeV3 from "./pages/HomeV3";
import HomeV4 from "./pages/HomeV4";
import HomeV5 from "./pages/HomeV5";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<CaseStudyPage />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="services" element={<Services />} />
          <Route path="services/agentic-operations" element={<AgenticOperations />} />
          <Route path="approach" element={<Approach />} />
          <Route path="writing" element={<Writing />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Internal working pages — not in nav, not prerendered. */}
          <Route path="brief" element={<StudioBrief />} />
          <Route path="home-lab" element={<HomeLab />} />
          <Route path="home-v3" element={<HomeV3 />} />
          <Route path="home-v4" element={<HomeV4 />} />
          <Route path="home-v5" element={<HomeV5 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
