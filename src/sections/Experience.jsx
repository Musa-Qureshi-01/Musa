import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ScrollReveal } from "@/components/TextAnimations";
import { Building, Calendar, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interactive Premium Experience Card
const ExperienceCard = ({ exp, isLight }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLightPos({ x, y });

    // Premium subtle 3D tilt: max 4 degrees
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 4;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Extract key phrases for custom interactive highlight
  const highlightText = (text) => {
    const keywords = [
      "RAG pipelines",
      "agentic workflows",
      "autonomous and semi-autonomous agent systems",
      "full-stack AI SaaS products",
      "frontend and full-stack engineering",
      "data pipelines",
      "applied AI",
      "Machine Learning algorithms",
      "feature engineering",
      "FinTech forecasting model"
    ];

    let result = text;
    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      result = result.replace(regex, `<span class="text-foreground font-semibold underline decoration-border-hover/50 hover:decoration-primary transition-colors cursor-help">$1</span>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-full p-6 md:p-8 lg:p-10 rounded-[24px] md:rounded-[32px] border border-border bg-card shadow-premium hover:border-border-hover hover:shadow-premium-hover transition-all duration-500 flex flex-col justify-between select-none overflow-hidden"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: isHovered ? "none" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s, box-shadow 0.4s",
      }}
    >
      {/* Light Reflection Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 240px at ${lightPos.x}px ${lightPos.y}px, ${
            isLight ? "rgba(9, 9, 9, 0.03)" : "rgba(255, 255, 255, 0.05)"
          }, transparent 80%)`
        }}
      />

      {/* Top glowing line decoration */}
      <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10`} />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          {/* Card Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-border bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              {exp.period}
            </span>
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-all duration-300">
              <Building className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-secondary-foreground font-medium">{exp.company}</span>
            </div>
          </div>

          {/* Role Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-foreground tracking-tight mb-3 transition-colors duration-300 group-hover:text-primary">
            {exp.role}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-secondary-foreground font-medium mb-6 font-body leading-relaxed max-w-[95%]">
            {exp.description}
          </p>

          {/* Bullet points accomplishments */}
          <div className="space-y-4">
            {exp.achievements.map((ach, aIdx) => (
              <div 
                key={aIdx} 
                className="group/item flex items-start gap-3.5 text-xs sm:text-sm text-secondary-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1.5 hover:font-medium cursor-pointer"
              >
                <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover/item:scale-125
                  ${isLight ? "bg-zinc-300 group-hover/item:bg-zinc-950" : "bg-white/20 group-hover/item:bg-white"}
                `} />
                <p className="leading-relaxed font-body">{highlightText(ach)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer Tech Stack */}
        <div className="pt-5 border-t border-border/10 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase font-bold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            Applied Tech
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(exp.role === "AI Consultant" 
              ? ["LangGraph", "Generative AI", "RAG Systems", "Python"] 
              : exp.role === "Freelance Software Engineer"
              ? ["React", "Next.js", "FastAPI", "PostgreSQL"] 
              : ["PyTorch", "FinBERT NLP", "Time-Series forecasting", "Python"]
            ).map((t) => (
              <span 
                key={t} 
                className="px-2 py-0.5 rounded text-[8px] font-mono border border-border bg-secondary text-secondary-foreground hover:border-border-hover hover:bg-secondary/80 transition-all duration-300 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const { experience } = portfolioData;
  const trackRef = useRef(null);
  const pinRef = useRef(null);
  const ambientOrbRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLight, setIsLight] = useState(false);

  // Monitor theme state changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsLight(document.documentElement.classList.contains("light"));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mm = gsap.matchMedia();

    // Enable GSAP Cinematic Scroll Pinning only on Desktop (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "experience-trigger",
          trigger: trackRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            let newIdx = 0;
            if (progress >= 0.4 && progress < 0.8) {
              newIdx = 1;
            } else if (progress >= 0.8) {
              newIdx = 2;
            }
            setActiveIdx(newIdx);
          }
        }
      });

      // Stacked cards transition scrub
      const cards = gsap.utils.toArray(".experience-card-deck");
      
      // Initial settings with validation checks
      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, scale: 0.94, y: 30, pointerEvents: "none" });
        gsap.set(cards[0], { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" });
      }

      // Timeline progress bar track scrub
      tl.to(".timeline-progress-fill", {
        height: "100%",
        ease: "none",
        duration: 2
      }, 0);

      // Card 1 -> Card 2 Transition
      if (cards.length > 1) {
        tl.to(cards[0], {
          opacity: 0,
          scale: 1.04,
          y: -30,
          pointerEvents: "none",
          duration: 0.6
        }, 0.2);
        tl.to(cards[1], {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.6
        }, 0.2);
      }

      // Card 2 -> Card 3 Transition
      if (cards.length > 2) {
        tl.to(cards[1], {
          opacity: 0,
          scale: 1.04,
          y: -30,
          pointerEvents: "none",
          duration: 0.6
        }, 1.0);
        tl.to(cards[2], {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.6
        }, 1.0);
      }
    });

    return () => mm.revert();
  }, []);

  // Background light configuration based on active experience card index
  const getOrbGradient = () => {
    if (isLight) {
      return activeIdx === 0
        ? "radial-gradient(circle, rgba(13,148,136,0.04) 0%, transparent 70%)"
        : activeIdx === 1
        ? "radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)";
    } else {
      return activeIdx === 0
        ? "radial-gradient(circle, rgba(20,184,166,0.09) 0%, transparent 70%)"
        : activeIdx === 1
        ? "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)";
    }
  };

  return (
    <section 
      id="experience" 
      className="relative w-full overflow-hidden border-t bg-noise transition-colors duration-500 bg-background-alt border-border"
    >
      {/* Dynamic Ambient Blur Background Light */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{ background: getOrbGradient() }}
      />

      {/* Cinematic Desktop Scroll Experience (>= 1024px) */}
      <div ref={trackRef} className="relative w-full hidden lg:block h-[180vh]">
        <div ref={pinRef} className="w-full h-screen flex flex-col justify-center overflow-hidden">
          <div className="container-responsive grid grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Interactive Timeline Progress HUD */}
            <div className="col-span-5 flex flex-col pr-12 relative">
              <div className="text-left mb-12">
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">Journey</span>
                <h2 className="text-3xl font-heading font-extrabold tracking-tight mt-1 text-foreground">
                  Engineering Path
                </h2>
              </div>

              {/* Progress Milestones Checklist */}
              <div className="relative flex flex-col gap-16 pr-[8.5px]">
                {/* Timeline Track Lines (aligned to centers of milestone nodes) */}
                <div className="absolute right-[8px] top-[10px] bottom-[10px] w-[1.5px] bg-border/20 z-0" />
                <div className="timeline-progress-fill absolute right-[8px] top-[10px] w-[1.5px] bg-primary origin-top z-10" style={{ height: "0%" }} />

                {experience.map((exp, idx) => {
                  const isActive = idx === activeIdx;
                  const isCompleted = idx < activeIdx;
                  return (
                    <div 
                      key={exp.id} 
                      onClick={() => {
                        if (!trackRef.current) return;
                        const rect = trackRef.current.getBoundingClientRect();
                        const scrollTop = window.scrollY || document.documentElement.scrollTop;
                        const containerTop = rect.top + scrollTop;
                        const targetScroll = containerTop + idx * (window.innerHeight * 0.4);
                        window.scrollTo({
                          top: targetScroll + 5,
                          behavior: "smooth"
                        });
                      }}
                      className={`flex items-center justify-end gap-6 text-right transition-all duration-500 cursor-pointer group select-none relative z-10
                        ${isActive ? "opacity-100 scale-102" : "opacity-35 hover:opacity-60"}
                      `}
                    >
                      <div className="flex flex-col">
                        <span className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-300
                          ${isActive ? "text-primary font-bold" : "text-zinc-500"}
                        `}>
                          {exp.period}
                        </span>
                        <span className={`text-sm font-heading mt-1 transition-colors duration-300
                          ${isActive ? "text-foreground font-extrabold" : "text-secondary-foreground"}
                        `}>
                          {exp.role}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono mt-0.5 font-medium">{exp.company}</span>
                      </div>
                      
                      {/* Node circle tracker */}
                      <div className={`relative z-20 -mr-[8.5px] w-4 h-4 rounded-full bg-background border transition-all duration-500 flex items-center justify-center
                        ${isActive 
                          ? "border-primary scale-110 shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
                          : "border-border"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500
                          ${isActive ? "bg-primary" : "bg-transparent"}
                          ${isCompleted ? "bg-zinc-500" : ""}
                        `} />
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Cinematic Card stack display slot */}
            <div className="col-span-7 relative h-[520px] flex items-center justify-start pl-12">
              <div className="relative w-full max-w-[580px] h-[480px]">
                {experience.map((exp, idx) => (
                  <div 
                    key={exp.id} 
                    className="experience-card-deck absolute inset-0 w-full h-full"
                  >
                    <ExperienceCard exp={exp} isLight={isLight} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Editorial Scroll List (< 1024px) */}
      <div className="lg:hidden container-responsive py-16 relative z-10">
        <div className="text-left mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase font-bold">Journey</span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mt-1 text-foreground">
            Engineering Path
          </h2>
        </div>

        <div className="relative flex flex-col gap-10">
          {/* Vertical central tracker line */}
          <div className="absolute left-[17px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-border via-border/40 to-transparent" />

          {experience.map((exp, idx) => (
            <div key={exp.id} className="relative pl-10">
              {/* Tracker Dot */}
              <div className="absolute left-[12px] top-7 w-[11px] h-[11px] bg-background border-2 border-primary rounded-full z-10">
                {idx === 0 && (
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                )}
              </div>

              <ScrollReveal delay={idx * 0.1}>
                <div className="w-full">
                  <ExperienceCard exp={exp} isLight={isLight} />
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
