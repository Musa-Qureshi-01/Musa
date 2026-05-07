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
import { FlipText, LetterReveal } from "@/components/TextAnimations";

export const Hero = () => {
  const { personalInfo, skills } = portfolioData;

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

      {/* Animated Background Blobs for Mobile */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] right-[-10%] w-[250px] h-[250px] bg-primary/20 blur-[80px] rounded-full sm:hidden pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-emerald-500/20 blur-[80px] rounded-full sm:hidden pointer-events-none z-0"
      />

      {/* Content */}
      <div className="container-responsive pt-20 md:pt-32 lg:pt-40 pb-10 md:pb-16 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* PROFILE IMAGE COLUMN - Displays FIRST on Mobile, RIGHT on Desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative animate-fade-in flex justify-center lg:justify-end w-full">
            <div className="relative w-[220px] sm:w-[260px] md:w-[340px] xl:w-[380px] aspect-[4/5] hero-profile-frame group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay hero-image-glass opacity-0 pointer-events-none z-10 rounded-[calc(2rem-4px)]" />
              <img
                src="/assets/Musa Qureshi - Author.jpeg"
                alt={personalInfo.name}
                className="w-full h-full object-cover rounded-[calc(2rem-4px)] transition-transform duration-700 ease-out group-hover:scale-105 relative z-0"
              />
            </div>
            {/* Cleaner Glow Behind Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full z-[-1] opacity-50 pointer-events-none" />
          </div>

          {/* TEXT CONTENT COLUMN - Displays SECOND on Mobile, LEFT on Desktop */}
          <div className="order-2 lg:order-1 lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Top: Introduction */}
            <FadeIn>
              <h1 className="text-3xl md:text-5xl lg:text-5xl text-primary font-bold tracking-tight font-heading block">
                Hi, I'm Musa Qureshi <span className="inline-block hover:animate-pulse cursor-default">👋🏻</span>
              </h1>
            </FadeIn>

            {/* Middle: Animated Role Text */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground mt-2 sm:mt-4">
              <div className="text-foreground flex justify-center lg:justify-start items-center h-[1.3em]">
                <FlipText
                  phrases={["AI Engineer", "Agentic Developer", "Data Scientist"]}
                />
              </div>
            </div>

            {/* Bottom: Tagline with Wipe Animation */}
            <div className="pt-2 flex flex-col gap-1 items-center lg:items-start">
              <LetterReveal
                text="Building production-grade intelligent systems."
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-body"
                delay={0.2}
              />
              <LetterReveal
                text="Designed, shipped, and refined under real-world constraints."
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed font-body"
                delay={0.4}
              />
            </div>

            {/* CTAs */}
            <div className="flex flex-row flex-wrap justify-center lg:justify-start items-center gap-3 pt-4 sm:pt-6 animate-fade-in animation-delay-300 relative z-20">
              <Button size="lg" className="rounded-full px-6 h-12 flex items-center justify-center" onClick={() => document.getElementById('contact').scrollIntoView()}>
                Contact Me <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="/assets/Musa_Qureshi_Resume.pdf"
                download="Musa_Qureshi_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-foreground text-sm font-semibold transition-all cv-shimmer-border"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start items-center gap-5 pt-2 sm:pt-4 animate-fade-in animation-delay-400 relative z-10 cursor-pointer">
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
        </div>

        {/* Skills Marquee */}
        <div className="mt-8 md:mt-16 w-full overflow-hidden animate-fade-in animation-delay-600">
          <p className="text-xs font-mono text-primary/60 mb-6 text-center uppercase tracking-widest">
            Core Technologies & Frameworks
          </p>
          <div className="relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
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
