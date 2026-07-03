import { GraduationCap, Award } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useRef, useState } from "react";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";
import { FadeIn } from "@/components/Reveal";

const HIGHLIGHTS = [
  "Musa Qureshi",
  "AI Engineer",
  "Editorial.io",
  "GovernanceAI",
  "Agentic Case Intelligence",
  "thoughtful system design",
];

const highlightBio = (text) => {
  const pattern = new RegExp(`(${HIGHLIGHTS.map(h => h.replace(/\./g, "\\.")).join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    HIGHLIGHTS.some(h => h.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="text-foreground font-semibold border-b border-primary/30 hover:text-primary hover:border-primary transition-all duration-200 cursor-pointer">
          {part}
        </span>
      : part
  );
};

export const About = () => {
  const { personalInfo, education, certifications } = portfolioData;
  const sectionRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const bioParagraphs = personalInfo.bio.split("\n\n").filter(Boolean);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background border-t border-border/20"
    >
      <div className="container-responsive relative z-10 mx-auto">

        {/* ── Section heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase font-mono">
              About Me
            </span>
          </ScrollReveal>
          <div className="mt-3 mb-4">
            <LetterReveal
              text="Engineering intelligence,"
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-heading"
            />
          </div>
          <FadeIn delay={0.2}>
            <span className="text-lg md:text-xl font-heading italic font-light text-secondary-foreground">
              systematizing chaos.
            </span>
          </FadeIn>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ─── Left: Summary ─── */}
          <FadeIn delay={0.15} className="lg:col-span-7 space-y-6 max-w-prose">
            <div className="flex flex-col gap-6 relative">
              {bioParagraphs.map((para, i) => {
                const isHovered = hoveredIdx === i;
                const isAnyHovered = hoveredIdx !== null;
                
                return (
                  <p 
                    key={i} 
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`text-base leading-7 font-body pl-4 border-l-2 transition-all duration-300 cursor-default select-none
                      ${isHovered 
                        ? "border-primary text-foreground translate-x-2" 
                        : isAnyHovered 
                          ? "border-transparent text-secondary-foreground/30 opacity-40 blur-[0.2px]" 
                          : "border-transparent text-secondary-foreground/75 opacity-100"
                      }`}
                  >
                    {highlightBio(para)}
                  </p>
                );
              })}
            </div>
          </FadeIn>

          {/* ─── Right: Education + Certifications ─── */}
          <FadeIn delay={0.25} className="lg:col-span-5 flex flex-col gap-8 lg:border-l border-border/20 lg:pl-10">
            {/* Education Section */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <GraduationCap className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-secondary-foreground">Education</span>
              </div>
              <div className="flex flex-col gap-3">
                {education.map((edu, i) => (
                  <div key={i} className="rounded-2xl bg-card border border-border shadow-premium hover:shadow-premium-hover p-5 hover:border-border-hover transition-all duration-300">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <p className="text-sm font-semibold text-foreground leading-snug">{edu.degree}</p>
                      <span className="text-[10px] font-mono text-secondary-foreground flex-shrink-0 mt-0.5 whitespace-nowrap">{edu.year || edu.period}</span>
                    </div>
                    <p className="text-xs text-secondary-foreground">{edu.school}</p>
                    {edu.details && (
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{edu.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            {certifications && certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Award className="w-4 h-4 text-secondary-foreground flex-shrink-0" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-secondary-foreground">Certifications</span>
                </div>
                <div className="flex flex-col gap-3">
                  {certifications.map((cert, i) => (
                    <div key={i} className="rounded-2xl bg-card border border-border shadow-premium hover:shadow-premium-hover p-5 hover:border-border-hover transition-all duration-300">
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <p className="text-sm font-semibold text-foreground leading-snug">{cert.name}</p>
                        <span className="text-[10px] font-mono text-secondary-foreground flex-shrink-0 mt-0.5 whitespace-nowrap">{cert.period}</span>
                      </div>
                      <p className="text-xs text-secondary-foreground">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>

        </div>
      </div>
    </section>
  );
};
