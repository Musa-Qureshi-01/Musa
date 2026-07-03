import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Download,
  Terminal,
  CheckCircle,
  Instagram,
  Cpu,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/Button";

const MediumIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} {...props}>
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.8A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.8A6.8 6.8 0 0 1 13.54 12zM20.96 12a6.8 6.8 0 0 1-3.21 5.76V6.24A6.8 6.8 0 0 1 20.96 12zM24 12a5.43 5.43 0 0 1-1.07 3.19l-2.67-3.19 2.67-3.19A5.43 5.43 0 0 1 24 12z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

/* ─── Premium Calm Flip Text (Guarantees zero overlapping/opacity fighting) ─── */
const CalmFlipText = ({ phrases }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="relative inline-flex items-center h-[1.3em] overflow-hidden select-none font-accent">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 whitespace-nowrap text-foreground flex items-center justify-center lg:justify-start"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
      {/* Hidden layout spacer to guarantee single line container width */}
      <span className="opacity-0 pointer-events-none select-none whitespace-nowrap">
        {phrases.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
    </div>
  );
};

export const Hero = ({ onOpenResume }) => {
  const { personalInfo, skills } = portfolioData;

  // Cinematic scroll transforms
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -40]);

  // Subtle interactive cursor/parallax coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      // Slow down response for premium weight
      const x = (e.clientX - window.innerWidth / 2) / 60;
      const y = (e.clientY - window.innerHeight / 2) / 60;
      setCoords({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-background px-6">
      
      {/* Premium subtle background gradient + paper grain texture */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-opacity)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-opacity)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.8]" />
        {/* Soft lighting highlight that breathing-loops and responds slightly to cursor */}
        <motion.div
          animate={{ opacity: [0.015, 0.03, 0.015], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ x: coords.x * 0.4, y: coords.y * 0.4 }}
          className="absolute top-[15%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/20 rounded-full blur-[140px]"
        />
        {/* Fine Noise Texture */}
        <div className="absolute inset-0 opacity-[0.012] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+')] mix-blend-overlay" />
      </div>

      {/* Main Container with scroll parallax */}
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="container-responsive pt-24 lg:pt-36 pb-12 relative z-10 w-full flex flex-col justify-center"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-20 items-center w-full">

          {/* TEXT COLUMN */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full space-y-7">
            
            {/* Mobile pulse graphic */}
            <div className="flex lg:hidden justify-center w-full mb-2 mt-1 relative" aria-hidden="true">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-border animate-ping opacity-20" />
                <div className="w-11 h-11 rounded-full border border-border bg-card/80 backdrop-blur-md flex items-center justify-center shadow-premium relative z-10">
                  <Cpu className="w-5 h-5 text-foreground animate-pulse" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-[clamp(1.85rem,6.5vw,2.5rem)] lg:text-5xl font-bold tracking-tight font-heading text-foreground leading-[1.1]">
                Hi, I'm Musa Qureshi <span className="inline-block hover:animate-bounce cursor-default select-none">👋🏻</span>
              </h1>
              
              {/* Refined clean role switcher */}
              <div className="text-[clamp(1.15rem,4vw,1.45rem)] lg:text-2.5xl font-semibold tracking-tight text-foreground/90 h-[1.3em] flex items-center justify-center lg:justify-start">
                <CalmFlipText phrases={["AI & Software Engineer", "Forward Deployed Engineer"]} />
              </div>
            </div>

            {/* Subheadings */}
            <div className="flex flex-col gap-2 max-w-lg">
              <p className="text-sm sm:text-base lg:text-[17px] text-foreground/75 font-medium leading-relaxed font-body">
                Building production-grade intelligent systems.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-body">
                Designed, shipped, and refined under real-world constraints.
              </p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[340px] sm:max-w-sm lg:flex lg:flex-row lg:w-auto lg:max-w-none pt-2 relative z-20">
              <Button 
                size="lg" 
                className="w-full lg:w-auto text-xs tracking-wider uppercase font-semibold hover:shadow-premium-hover transition-all" 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
              
              <Button
                as="a"
                href="/assets/Musa_Qureshi_Resume.pdf"
                download="Musa_Qureshi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full lg:w-auto text-xs tracking-wider uppercase font-semibold border-border hover:border-foreground/30 hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
              >
                <Download className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start items-center gap-4.5 pt-1 relative z-10 w-full">
              {[
                { icon: Github, href: personalInfo.socials.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
                { icon: TwitterIcon, href: personalInfo.socials.twitter, label: "X" },
                { icon: MediumIcon, href: personalInfo.socials.medium, label: "Medium" },
                { icon: Instagram, href: personalInfo.socials.instagram, label: "Instagram" },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="group/s relative flex flex-col items-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-border flex items-center justify-center text-muted-foreground transition-all duration-200 group-hover/s:bg-foreground group-hover/s:border-foreground group-hover/s:text-background group-hover/s:-translate-y-0.5 group-hover/s:shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
                    <soc.icon className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* LIVING AI GRAPHIC (Parallax + subtle node activity) */}
          <div 
            className="order-1 lg:order-2 lg:col-span-5 relative hidden lg:flex justify-center lg:justify-end w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              style={{
                x: coords.x,
                y: coords.y,
                rotateX: coords.y * -0.5,
                rotateY: coords.x * 0.5,
                transformStyle: "preserve-3d"
              }}
              className="relative w-full max-w-[400px] xl:max-w-[445px] aspect-[1/1] bg-card border border-border rounded-3xl p-5 flex flex-col justify-between overflow-hidden shadow-premium transition-shadow duration-300"
            >
              {/* Subtle visual lighting sweep inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                {/* Node connection lines */}
                {["M 200 200 L 80 100", "M 200 200 L 80 300", "M 200 200 L 320 100", "M 200 200 L 320 300"].map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    stroke="currentColor"
                    className="text-border/40"
                    strokeWidth="1.2"
                    fill="none"
                  />
                ))}

                {/* Animated light pulses */}
                <motion.path
                  d="M 200 200 L 80 100"
                  stroke="currentColor"
                  className="text-foreground/30 dark:text-white/20"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6 14"
                  animate={{ strokeDashoffset: [-40, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M 200 200 L 320 300"
                  stroke="currentColor"
                  className="text-foreground/30 dark:text-white/20"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="6 14"
                  animate={{ strokeDashoffset: [0, 40] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {/* Status Header */}
              <div className="flex justify-between w-full relative z-10">
                <div className="px-2.5 py-0.5 rounded-full bg-secondary border border-border flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1 h-1 rounded-full bg-zinc-400" />
                  <span className="text-[9px] font-mono tracking-wider text-muted-foreground font-semibold uppercase">Editorial.io</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-full bg-secondary border border-border flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-wider text-muted-foreground font-semibold uppercase">Governance.ai</span>
                </div>
              </div>

              {/* Core node with breathing pulse */}
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div 
                  className="w-20 h-20 rounded-full bg-background border border-border flex flex-col items-center justify-center relative z-20 shadow-premium"
                  animate={{ 
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered ? "0 10px 30px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Terminal className="w-4 h-4 text-foreground mb-0.5 animate-pulse" />
                  <span className="text-[8px] font-mono uppercase tracking-widest text-muted-foreground font-bold">CORE v1.2</span>
                </motion.div>

                {/* Sub cards */}
                <div className="absolute top-[8%] left-[2%] z-20">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-2.5 w-28 shadow-premium hover:border-foreground/20 transition-colors duration-200">
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Research Agent</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[9px] font-medium text-foreground font-mono leading-none">Syncing...</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[8%] left-[2%] z-20">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-2.5 w-28 shadow-premium hover:border-foreground/20 transition-colors duration-200">
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-1">Drafting Engine</p>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-foreground rounded-full" 
                        animate={{ width: ["0%", "85%", "85%", "0%"] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <span className="text-[7px] font-mono text-zinc-500 mt-0.5 block">Compiling...</span>
                  </div>
                </div>

                <div className="absolute top-[8%] right-[2%] z-20">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-2.5 w-28 shadow-premium hover:border-foreground/20 transition-colors duration-200">
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Compliance Check</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-2.5 h-2.5 text-foreground dark:text-white flex-shrink-0" />
                      <span className="text-[9px] font-semibold text-foreground font-mono leading-none">Verified (100%)</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-[8%] right-[2%] z-20">
                  <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-2.5 w-28 shadow-premium hover:border-foreground/20 transition-colors duration-200">
                    <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Risk Score</p>
                    <div className="flex items-end gap-1">
                      <span className="text-xs font-bold font-mono text-foreground leading-none">0.02</span>
                      <span className="text-[7px] font-mono text-emerald-500 font-semibold leading-none mb-0.5">OPTIMAL</span>
                    </div>
                    <div className="mt-1 flex gap-0.5 h-1 items-end">
                      <div className="w-2 h-0.5 bg-secondary rounded-full" />
                      <div className="w-2 h-1 bg-secondary rounded-full" />
                      <div className="w-2 h-0.5 bg-foreground rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex justify-between items-center w-full relative z-10 border-t border-border pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">Core Status</span>
                </div>
                <div className="text-[8px] font-mono text-muted-foreground font-semibold uppercase tracking-wider">
                  Operational
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Moving technology stack ticker (DO NOT MODIFY OR REDESIGN) */}
        <div className="mt-8 lg:mt-16 w-full overflow-hidden animate-fade-in">
          <p className="text-[9px] font-mono text-zinc-500 mb-4 text-center uppercase tracking-widest">
            Core Technologies & Frameworks
          </p>
          <div className="relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...skills.agenticAI, ...skills.mlData, ...skills.development, ...skills.others, ...skills.agenticAI].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-5">
                  <span className="text-[12px] font-medium text-zinc-500 hover:text-foreground transition-colors cursor-default whitespace-nowrap">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-muted-foreground uppercase animate-pulse">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </motion.div>
      </div>

    </section>
  );
};
