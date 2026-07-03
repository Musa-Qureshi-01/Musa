import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { Stats } from "@/sections/Stats";
import { ResumeModal } from "@/components/ResumeModal";
import { EditorialLayout } from "@/pages/editorial/EditorialLayout";
import { EditorialOverview } from "@/pages/editorial/EditorialOverview";
import { Articles } from "@/pages/editorial/Articles";
import { Research } from "@/pages/editorial/Research";
import { AISecurity } from "@/pages/editorial/AISecurity";
import { Resources } from "@/pages/editorial/Resources";
import { Labs } from "@/pages/editorial/Labs";

const Home = ({ onOpenResume }) => (
  <>
    <Hero onOpenResume={onOpenResume} />
    <Projects />
    <Skills />
    <Stats />
    <About />
    <Experience />
    <Contact />
  </>
);

/* Footer + Contact only render outside /editorial routes */
function AppShell({ onOpenResume }) {
  const location = useLocation();
  const isEditorial = location.pathname.startsWith("/editorial");

  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home onOpenResume={onOpenResume} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          {/* Editorial Hub — nested routes, NO Footer inside */}
          <Route path="/editorial" element={<EditorialLayout />}>
            <Route index element={<EditorialOverview />} />
            <Route path="articles"    element={<Articles />} />
            <Route path="research"    element={<Research />} />
            <Route path="ai-security" element={<AISecurity />} />
            <Route path="resources"   element={<Resources />} />
            <Route path="labs"        element={<Labs />} />
          </Route>
        </Routes>
      </main>
      {/* Footer only on non-editorial pages */}
      {!isEditorial && <Footer />}
    </div>
  );
}

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppShell onOpenResume={() => setResumeOpen(true)} />
      {/* Modal rendered OUTSIDE the overflow-x-clip div so fixed positioning works */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
