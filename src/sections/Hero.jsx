import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  Download,
  Mail,
  Code2,
  Terminal,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/Reveal";
import { FlipText, LetterReveal, ScrollReveal, WipeReveal } from "@/components/TextAnimations";
import { useState, useRef, useEffect } from "react";

export const Hero = () => {
  const { personalInfo, skills } = portfolioData;
  const [isCVOpen, setIsCVOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCVOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg — hidden on mobile to keep text crisp */}
      <div className="absolute inset-0 hidden sm:block">
        <img
          src="/hero-bg.jpg"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="container-responsive pt-28 md:pt-40 lg:pt-48 pb-16 md:pb-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-7 space-y-8">

            {/* Top: Introduction */}
            <FadeIn>
              <h1 className="text-3xl md:text-5xl lg:text-5xl text-primary font-bold tracking-tight font-heading block">
                Hi, I'm Musa Qureshi <span className="inline-block hover:animate-pulse cursor-default">👋🏻</span>
              </h1>
            </FadeIn>

            {/* Middle: Animated Role Text */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground mt-4">
              <div className="text-foreground flex items-center h-[1.3em]">
                <FlipText
                  phrases={["AI Engineer", "Agentic Developer", "Data Scientist"]}
                />
              </div>
            </div>

            {/* Bottom: Tagline with Wipe Animation */}
            <div className="pt-2 flex flex-col gap-1">
              <LetterReveal
                text="Building production-grade intelligent systems."
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-body"
                delay={0.2}
              />
              <LetterReveal
                text="Designed, shipped, and refined under real-world constraints."
                className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-body"
                delay={0.4}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-6 animate-fade-in animation-delay-300">
              <Button size="lg" className="rounded-full px-6 h-12 flex items-center justify-center" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Contact Me <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <div className="relative z-50" ref={dropdownRef}>
                {/* Main CV button */}
                <button
                  onClick={() => setIsCVOpen(!isCVOpen)}
                  className="h-12 px-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-foreground text-sm font-semibold transition-all cv-shimmer-border"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                  <ChevronDown className={`w-4 h-4 opacity-60 transition-transform duration-300 ${isCVOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {isCVOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-[calc(100%+0.6rem)] left-0 w-56 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="p-1.5 flex flex-col">
                      {[
                        { label: "Agentic Developer", file: "Musa_Qureshi_Agentic_Developer.pdf" },
                        { label: "Data Scientist", file: "Musa_Qureshi_Data_Scientist.pdf" },
                        { label: "AI Engineer", file: "Musa_Qureshi_AI_Engineer.pdf" },
                      ].map(({ label, file }) => (
                        <a
                          key={label}
                          href={`/assets/${file}`}
                          download={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsCVOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group"
                        >
                          <Download className="w-3.5 h-3.5 text-zinc-600 group-hover:text-primary flex-shrink-0" />
                          {label}
                        </a>
                      ))}
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-4 animate-fade-in animation-delay-400">
              {[
                { icon: Github, href: personalInfo.socials.github },
                { icon: Linkedin, href: personalInfo.socials.linkedin },
                { icon: Twitter, href: personalInfo.socials.twitter },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1 transform duration-200 p-2 hover:bg-white/5 rounded-full"
                >
                  {<social.icon className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image — hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-5 relative animate-fade-in justify-end">
            <div className="relative w-full max-w-[280px] md:max-w-[340px] xl:max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-primary/10 group bg-card">

              {/* Continuous Animated SVG Border around Picture Container */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none group-hover:opacity-40 opacity-20 transition-opacity duration-300 z-30"
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
              >
                <path
                  d="M 20,1 L 380,1 A 19,19 0 0 1 399,20 L 399,480 A 19,19 0 0 1 380,499 L 20,499 A 19,19 0 0 1 1,480 L 1,20 A 19,19 0 0 1 20,1 Z"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="2"
                  strokeDasharray="400 1400"
                  strokeDashoffset="400"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animated-border-path"
                />
              </svg>

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              <img
                src="/assets/Musa Qureshi - Author.jpeg"
                alt={personalInfo.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 relative z-0"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none z-20" />
            </div>

            {/* Cleaner Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full z-[-1] opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* Skills Marquee */}
        <div className="mt-20 w-full overflow-hidden animate-fade-in animation-delay-600">
          <p className="text-xs font-mono text-primary/60 mb-6 text-center uppercase tracking-widest">
            Core Technologies & Frameworks
          </p>
          <div className="relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-marquee hover:[animation-play-state:paused]">
              {[...skills.agenticAI, ...skills.mlData, ...skills.development, ...skills.others, ...skills.agenticAI].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-6">
                  <span className="text-base font-medium text-muted-foreground/60 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
      animate-fade-in animation-delay-800"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-primary transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
