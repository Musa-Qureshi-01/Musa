import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight, X, Maximize2, FileText, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { Reveal, FadeIn } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";

// --- Custom Trace Button Component ---
const TraceButton = ({ children, href, onClick, className = "", primary = false }) => {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full overflow-hidden group transition-all duration-300 z-10
        ${primary
          ? "bg-primary/10 text-primary hover:text-primary-foreground border border-primary/30 hover:border-primary hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.4)]"
          : "bg-white/5 text-zinc-300 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white"
        } ${className}`}
    >
      {/* Animated Glow Backdrop on hover for primary */}
      {primary && (
        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-[-1]" />
      )}

      {/* Subtle Trace border overlay */}
      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-primary/50 transition-colors duration-500 z-[-1]" />

      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </Component>
  );
};

// --- Project Card Component ---
const ProjectCard = ({ project, onLearnMore, index, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={`group relative flex-shrink-0 w-[85vw] sm:w-[280px] md:w-[320px] lg:w-[350px] backdrop-blur-md rounded-2xl overflow-hidden border transition-all duration-700 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col snap-center hover:-translate-y-1 ${isActive ? "border-primary/50 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)] bg-zinc-900/80" : "border-white/10 bg-zinc-900/40"}`}
      style={{
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
    >
      {/* Hot-Mask Reveal overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none z-0 mix-blend-screen" />

      {/* Soft Glow Radial on hover */}
      <div className="absolute -inset-24 bg-primary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-[-1]" />

      {/* Banner */}
      <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden relative border-b border-white/10 shrink-0 bg-zinc-950">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-10 pointer-events-none" />

        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transform origin-center ${project.image.includes('coming-soon') ? '' : 'scale-105 group-hover:scale-110'} transition-transform duration-1000 ease-[0.21,0.47,0.32,0.98]`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
            <span className="text-zinc-600 text-sm tracking-widest uppercase">No Preview</span>
          </div>
        )}

        {/* bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 group-hover:translate-y-4 transition-all duration-700 z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-grow z-10 relative">
        <h3 className="text-xl font-bold font-heading mb-2 text-zinc-100 group-hover:text-primary transition-colors duration-500 ease-out">
          {project.title}
        </h3>

        {/* Compact Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400 font-medium group-hover:bg-white/10 group-hover:text-zinc-300 transition-colors duration-500">
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-400 font-medium group-hover:bg-white/10 group-hover:text-zinc-300 transition-colors duration-500">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* 1-Line Description */}
        <p className="text-sm text-zinc-400 line-clamp-2 mb-6 font-body flex-grow group-hover:text-zinc-300 transition-colors duration-500">
          {project.description || (project.highlights && project.highlights[0])}
        </p>

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <div className="flex gap-3 w-full">
            {project.link && project.link !== "#" && (
              <TraceButton href={project.link} primary className="flex-1 justify-center py-2.5 bg-primary/10 hover:bg-primary/20 hover:text-white border-primary/50 text-[11px] sm:text-xs font-medium tracking-wide">
                Preview <ExternalLink className="w-3.5 h-3.5" />
              </TraceButton>
            )}
            <TraceButton onClick={() => onLearnMore(project)} className="flex-1 justify-center py-2.5 bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white text-[11px] sm:text-xs font-medium tracking-wide">
              Learn More
            </TraceButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Project Modal (Expanded View) ---
const ProjectModal = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 mb:p-12 pointer-events-none">
        {/* Dimmer Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden pointer-events-auto max-h-[90vh] flex flex-col"
        >
          {/* Close Header */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-grow">
            {/* Expanded Banner */}
            {project.image && (
              <div className="w-full h-48 sm:h-64 lg:h-80 relative bg-zinc-900 border-b border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Modal Content */}
            <div className={"p-6 sm:p-8 lg:p-10 " + (!project.image ? "pt-12" : "")}>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white mb-2">{project.title}</h2>
              <p className="text-primary text-sm font-medium mb-6 uppercase tracking-wider">{project.category}</p>

              <p className="text-zinc-300 leading-relaxed mb-8 text-base sm:text-lg">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-8 pl-4 border-l-2 border-primary/50">
                  <h4 className="text-white font-medium mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-zinc-400 leading-relaxed list-disc ml-4">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Tech Stack */}
              <div className="mb-10">
                <h4 className="text-white font-medium mb-3">Technologies & Architecture</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="text-sm px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Actions - Grid layout for Modal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10 mt-auto">
                {project.link && project.link !== "#" && (
                  <TraceButton href={project.link} primary className="w-full justify-center py-3 border-primary bg-primary/10 hover:bg-primary/20 hover:text-white">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </TraceButton>
                )}

                {project.github && project.github !== "#" && (
                  <TraceButton href={project.github} className="w-full justify-center py-3 bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-white hover:border-white">
                    GitHub <Github className="w-4 h-4" />
                  </TraceButton>
                )}

                {project.video && (
                  <TraceButton href={project.video} className="w-full justify-center py-3 border-blue-900/50 bg-blue-950/30 text-blue-400 hover:border-blue-500 hover:text-blue-300 hover:bg-blue-900/50">
                    Play Video <Play className="w-4 h-4" />
                  </TraceButton>
                )}

                {project.article && (
                  <TraceButton href={project.article} className="w-full justify-center py-3 border-emerald-900/50 bg-emerald-950/30 text-emerald-400 hover:border-emerald-500 hover:text-emerald-300 hover:bg-emerald-900/50">
                    Read Article <FileText className="w-4 h-4" />
                  </TraceButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// --- Gallery Layout ---
export const Projects = () => {
  const { projects } = portfolioData;
  const baseProjects = projects.slice(0, 4);
  // Duplicate array multiple times to create a robust pseudo-infinite loop
  const displayedProjects = [...baseProjects, ...baseProjects, ...baseProjects, ...baseProjects];

  const [selectedProject, setSelectedProject] = useState(null);
  const sliderRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const slide = useCallback((direction) => {
    if (sliderRef.current) {
      // 350px max-width + updated larger gap (64px / 48px / 32px)
      const gapWidth = window.innerWidth >= 1024 ? 64 : window.innerWidth >= 768 ? 48 : 32;
      const cardWidth = Math.min(window.innerWidth * 0.85, 350) + gapWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  const getBaseWidth = () => {
    const gapWidth = window.innerWidth >= 1024 ? 64 : window.innerWidth >= 768 ? 48 : 32;
    return Math.min(window.innerWidth * 0.85, 350) + gapWidth;
  };

  // Seamless scroll reset logic
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    if (slider.scrollWidth === 0) return; // Not fully rendered yet

    const baseWidth = getBaseWidth();
    const setWidth = baseWidth * baseProjects.length;

    // When we scroll past the first set (left bounce) or past the third set (right bounce)
    // we instantly silently snap back to the middle (second) set.
    if (slider.scrollLeft <= baseWidth) {
      // Snapping from far left back to middle clone
      slider.style.scrollBehavior = 'auto'; // Disable smooth scroll temporarily
      slider.scrollLeft += setWidth;
      slider.style.scrollBehavior = 'smooth';
    } else if (slider.scrollLeft >= setWidth * 2.5) {
      // Snapping from far right back to middle clone
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft -= setWidth;
      slider.style.scrollBehavior = 'smooth';
    }

    const index = Math.round(slider.scrollLeft / baseWidth);
    setActiveIndex(index % baseProjects.length);
  }, [baseProjects.length]);

  // Initial center position setup
  useEffect(() => {
    if (sliderRef.current) {
      const setWidth = getBaseWidth() * baseProjects.length;
      // Start perfectly at the beginning of the second set of clones
      sliderRef.current.scrollLeft = setWidth;
    }
  }, []);

  // Auto Slider Logic & Active Tracking
  useEffect(() => {
    if (isHovered || isDragging) return; // Pause on hover/drag

    const slideInterval = setInterval(() => {
      slide('right');
    }, 4000); // 4 seconds auto-play

    return () => clearInterval(slideInterval);
  }, [isHovered, isDragging, slide]);

  // Desktop Drag to scroll
  const handleMouseDown = (e) => {
    if (!sliderRef.current || window.innerWidth < 1024) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };
  const handleMouseLeave = () => { setIsDragging(false); setIsHovered(false); };
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section id="projects" className="relative overflow-hidden min-h-screen flex flex-col justify-center py-20 pb-24">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-responsive relative z-10">
        {/* Header */}
        <div className="text-center mx-auto max-w-3xl mb-12">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              Engineering Showcase
            </span>
          </ScrollReveal>

          <div className="mt-4 mb-4">
            <LetterReveal text="Systems that demonstrate depth." className="text-2xl sm:text-4xl md:text-5xl font-bold text-white font-heading" />
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400 text-base md:text-lg">
              Selected real-world applications highlighting agentic workflows, production ML pipelines, and full-stack engineering.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Gallery Slider Container w/ Fade Edges */}
        <div
          className="relative -mx-4 sm:mx-0 group/slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >

          {/* Gallery Controls (Absolute Sides) */}
          <div className="hidden md:flex absolute inset-y-0 -left-6 -right-6 items-center justify-between pointer-events-none z-20">
            <button
              onClick={() => slide('left')}
              className="pointer-events-auto p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white transition-all duration-500 shadow-xl group cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => slide('right')}
              className="pointer-events-auto p-3 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white transition-all duration-500 shadow-xl group cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <motion.div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-8 sm:gap-12 lg:gap-16 overflow-x-auto snap-x snap-mandatory px-4 sm:px-12 pb-12 pt-8 hide-scrollbar select-none z-10 relative ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} items-center`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
            }}
          >
            {displayedProjects.map((project, idx) => (
              <ProjectCard
                key={`${project.id}-clone-${idx}`}
                project={project}
                index={idx}
                isActive={(idx % baseProjects.length) === activeIndex}
                onLearnMore={setSelectedProject}
              />
            ))}
          </motion.div>
        </div>

        {/* Show More Actions */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hover-glitch relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium rounded-full overflow-hidden group border border-primary/40 bg-transparent text-white transition-all duration-500 hover:shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]"
              data-text="View Full Projects Archive"
            >
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              {/* Rotating Trace line */}
              <div className="absolute inset-[-100%] z-[-1] overflow-hidden group-hover:animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(var(--color-primary-rgb),0.8)_360deg)]" />
              </div>
              <div className="absolute inset-[1px] bg-zinc-950 rounded-full z-0 pointer-events-none group-hover:bg-zinc-950/80 transition-colors duration-500" />

              <span className="hover-glitch-text relative z-10 flex items-center gap-2 font-heading tracking-wide">
                View Full Projects Archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Expanded Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
