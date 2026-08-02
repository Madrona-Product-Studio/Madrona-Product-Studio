import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import "./index.css";
import App from "./App";

// Vercel Web Analytics (enabled in the dashboard 2026-08-01). For a Vite SPA
// the script must be injected from code; it no-ops outside Vercel deploys.
inject();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
