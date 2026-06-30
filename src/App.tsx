// src/App.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* add pages here later, e.g.
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects/:id" element={<ProjectDetail />} /> */}
    </Routes>
  );
}