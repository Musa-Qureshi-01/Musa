import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Github, 
  ExternalLink, 
  ShieldCheck, 
  FileText,
  BookOpen,
  Play,
  X 
} from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { Reveal, FadeIn } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectMediaFrame } from "@/components/ProjectMediaFrame";

const LaunchCountdown = ({ isLight, isMini = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 12 });

  useEffect(() => {
    // Target date: 12 days from now
    const targetDate = new Date("2026-07-15T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  if (isMini) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 font-mono relative overflow-hidden bg-[#0c0d0e]/95 text-white select-none">
        <div className="mb-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-zinc-400 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Launching Soon
        </div>
        <div className="flex gap-1 text-[10px] sm:text-xs font-extrabold relative z-10 text-white">
          <span>{formatNumber(timeLeft.days)}d</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.hours)}h</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.minutes)}m</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.seconds)}s</span>
        </div>
        <div className="text-[6px] tracking-[0.12em] mt-1 text-zinc-500 relative z-10 uppercase">
          T-Minus Deployment
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 font-mono relative overflow-hidden bg-black text-white">
      {/* Background Image with Low Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('/assets/launch-soon-bg.png')" }}
      />
      {/* Subtle overlay to ensure contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="mb-4 md:mb-5.5 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] md:text-[12px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-zinc-300 relative z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Launching Soon
      </div>

      <h4 className="text-[11px] md:text-[14px] font-bold tracking-[0.25em] uppercase mb-4 md:mb-6 text-center text-zinc-400 relative z-10">
        EDITORIAL.IO DEPLOYMENT TIMER
      </h4>

      <div className="grid grid-cols-4 gap-4.5 md:gap-7 max-w-sm md:max-w-md lg:max-w-lg relative z-10">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINS", value: timeLeft.minutes },
          { label: "SECS", value: timeLeft.seconds },
        ].map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-15 h-20 md:w-22 md:h-26 rounded-lg md:rounded-2xl border flex items-center justify-center text-2xl md:text-4xl font-extrabold shadow-lg bg-black/60 border-white/15 text-white backdrop-blur-sm">
              {formatNumber(unit.value)}
            </div>
            <span className="text-[9px] md:text-[11px] font-bold tracking-wider mt-2.5 text-zinc-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[260px] md:max-w-[340px] mt-7 md:mt-10 font-sans relative z-10">
        <div className="flex justify-between items-center text-[9px] md:text-[11px] font-bold text-zinc-400 tracking-wider mb-2">
          <span>PIPELINE BUILD</span>
          <span>92%</span>
        </div>
        <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden bg-white/10">
          <div 
            className="h-full rounded-full bg-white transition-all duration-500" 
            style={{ width: "92%" }} 
          />
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Extract GovernanceAI (ID 3) and ATHLEIA.AI (ID 15) as featured projects
  const featuredProjects = portfolioData.projects.filter(
    (p) => p.title === "GovernanceAI" || p.title === "ATHLEIA.AI"
  );

  return (
    <section id="projects" className="section-padding relative overflow-hidden bg-background-alt border-t border-border/20">
      <div className="container-responsive relative z-10 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-10 md:mb-12">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase font-mono">
              Selected Work
            </span>
          </ScrollReveal>
          <div className="mt-3 mb-4">
            <LetterReveal 
              text="Featured Products." 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-heading" 
            />
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed">
              Enterprise-grade AI applications built to solve complex automation and regulatory problems.
            </p>
          </ScrollReveal>
        </div>

        {/* Featured Projects Grid (Apple Style) */}
        <div className="space-y-24 md:space-y-40">
          {featuredProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const targetLink = project.title === "EDITORIAL.IO" ? "/editorial" : project.link;
            const isExternal = project.title !== "EDITORIAL.IO";
            const hasResources = !!project.resources;

            // Dynamically select theme specific assets (matches the portfolio theme style)
            const projectImage = isLight 
              ? (project.imageLight || project.image) 
              : (project.imageDark || project.image);

            const isGovAI = project.title === "GovernanceAI";
            const visualColSpan = "lg:col-span-6";
            const textColSpan = "lg:col-span-6";
            const frameMaxWidth = "max-w-[650px]";
            const frameAspectRatio = "aspect-[16/9]";

            return (
              <div 
                key={project.id} 
                className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Visual Column */}
                <div className={`w-full ${visualColSpan} ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Reveal delay={0.1} width="100%">
                    <div className={`relative group mx-auto w-full ${frameMaxWidth}`}>
                      {/* Premium Device Mockup Frame */}
                      <div className={`relative ${frameAspectRatio} rounded-[20px] md:rounded-[26px] p-1 md:p-2 border transition-all duration-500 shadow-premium
                        ${isLight 
                          ? "bg-zinc-900 border-zinc-950 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]" 
                          : "bg-zinc-100 border-zinc-200/60 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)]"
                        }`}
                      >
                        {/* Screen Wrapper */}
                        <div className={`relative w-full h-full overflow-hidden rounded-[16px] md:rounded-[22px] border transition-all duration-500
                          ${isLight 
                            ? "bg-black border-zinc-800" 
                            : "bg-white border-zinc-300"
                          }`}
                        >
                          {project.isComingSoon ? (
                            <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden select-none">
                              {/* Main Background Image - Launch Soon Banner */}
                              <div 
                                className="absolute inset-0 bg-cover bg-center opacity-90"
                                style={{ backgroundImage: "url('/assets/launch-soon-bg.png')" }}
                              />
                              {/* Dark subtle overlay vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 pointer-events-none" />

                              {/* Overlaid Corner Timer (compact tactical widget) */}
                              <div className="absolute bottom-3 right-3 w-[38%] h-[32%] max-w-[145px] max-h-[85px] bg-[#0c0d0e]/95 rounded-xl border border-white/10 shadow-2xl opacity-60 hover:opacity-100 transition-all duration-300 overflow-hidden z-20">
                                <LaunchCountdown isLight={isLight} isMini={true} />
                              </div>
                            </div>
                          ) : (
                            <ProjectMediaFrame 
                              project={project} 
                              projectImage={projectImage} 
                              isLight={isLight} 
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Text Content Column */}
                <div className={`w-full ${textColSpan} flex flex-col justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <Reveal delay={0.2}>
                    <div className="space-y-6">
                      
                      {/* Category Label */}
                      <span className="text-[10px] font-mono tracking-widest text-secondary-foreground uppercase font-bold flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading text-foreground">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed font-body">
                        {project.description}
                      </p>

                      {/* Highlights checklist */}
                      {project.highlights && (
                        <ul className="space-y-2.5 pt-2">
                          {project.highlights.slice(0, 3).map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs text-secondary-foreground font-body">
                              <span className="text-muted-foreground mt-0.5 font-semibold font-mono">—</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* CTAs */}
                      <div className="flex flex-row flex-wrap items-center gap-4 pt-4">
                        {hasResources ? (
                          <>
                            {/* Primary Button: Visit Website */}
                            <Button
                              as="a"
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="primary"
                              className="text-xs uppercase tracking-wider font-mono"
                            >
                              Visit Website <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                            {/* Secondary Button: Learn More */}
                            <Button
                              onClick={() => setActiveModalProject(project)}
                              variant="outline"
                              className="text-xs uppercase tracking-wider font-mono"
                            >
                              Learn More <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                          </>
                        ) : isExternal ? (
                          <Button
                            as="a"
                            href={targetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            className="text-xs uppercase tracking-wider font-mono"
                          >
                            View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                          </Button>
                        ) : (
                          <Button
                            as={Link}
                            to={targetLink}
                            variant="primary"
                            className="text-xs uppercase tracking-wider font-mono"
                          >
                            View Case Study <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        {!hasResources && project.github && project.github !== "#" && (
                          <Button
                            as="a"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            className="w-10 h-10 flex items-center justify-center p-0"
                          >
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects Actions */}
        <div className="flex justify-center mt-14 md:mt-20">
          <Link to="/projects">
            <Button
              variant="outline"
              size="lg"
              className="text-xs uppercase font-semibold"
            >
              View All Projects <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

      </div>

      {/* PREMIUM RESOURCE LINKS DIALOG MODAL */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setActiveModalProject(null)}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-card border border-border rounded-3xl p-6 md:p-8 shadow-premium overflow-hidden z-10"
            >
              {/* Top Row */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground font-bold">
                    Resources Hub
                  </span>
                  <h4 className="text-xl font-bold text-foreground font-heading mt-1">
                    {activeModalProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 border border-border hover:border-border-hover bg-secondary/50 text-secondary-foreground hover:text-foreground rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Resources Link Grid */}
              <div className="space-y-3">
                <a
                  href={activeModalProject.resources.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-border hover:border-border-hover hover:bg-secondary/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-secondary-foreground group-hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Live Website</div>
                      <div className="text-[10px] text-secondary-foreground">Deploy to production environment</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={activeModalProject.resources.caseStudies}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-border hover:border-border-hover hover:bg-secondary/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-secondary-foreground group-hover:text-foreground">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Case Studies</div>
                      <div className="text-[10px] text-secondary-foreground">Platform vision and architecture deep dive</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={activeModalProject.resources.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-border hover:border-border-hover hover:bg-secondary/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-secondary-foreground group-hover:text-foreground">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Technical Blog</div>
                      <div className="text-[10px] text-secondary-foreground">Implementation thoughts and milestones</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={activeModalProject.resources.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-border hover:border-border-hover hover:bg-secondary/80 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-secondary-foreground group-hover:text-foreground">
                      <Play className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Product Video</div>
                      <div className="text-[10px] text-secondary-foreground">Autonomous orchestrator runtime walkthrough</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {activeModalProject.resources.github && (
                  <a
                    href={activeModalProject.resources.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-secondary border border-border hover:border-border-hover hover:bg-secondary/80 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-card border border-border/50 flex items-center justify-center text-secondary-foreground group-hover:text-foreground">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">GitHub Repository</div>
                        <div className="text-[10px] text-secondary-foreground">Inspect backend agent architecture and pipelines</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
