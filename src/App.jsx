import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Services } from "@/sections/Services";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Footer } from "./layout/Footer";
import { Editorial } from "@/pages/Editorial";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { Stats } from "@/sections/Stats";
import { ResumeModal } from "@/components/ResumeModal";

const Home = ({ onOpenResume }) => (
  <>
    <Hero onOpenResume={onOpenResume} />
    <Stats />
    <About />
    <Services />
    <Projects />
    <Experience />
    <Contact />
  </>
);

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* overflow-x-clip (not hidden) so fixed-position modals aren't clipped */}
      <div className="min-h-screen overflow-x-clip">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenResume={() => setResumeOpen(true)} />} />
            <Route path="/editorial" element={<Editorial />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {/* Modal rendered OUTSIDE the overflow-x-clip div so fixed positioning works */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </BrowserRouter>
  );
}

export default App;
