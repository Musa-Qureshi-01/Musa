import { GraduationCap, Award, Cpu, Database, Code2, Wrench } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";
import { FadeIn } from "@/components/Reveal";

const chipGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};
const chip = {
  hidden: { opacity: 0, scale: 0.9, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

const SKILL_GROUPS = [
  { label: "Languages & Dev", icon: Code2, accent: "text-sky-400", key: "development" },
  { label: "ML & Data", icon: Database, accent: "text-amber-400", key: "mlData" },
  { label: "AI & LLMs", icon: Cpu, accent: "text-primary", key: "agenticAI" },
  { label: "Tools & Infra", icon: Wrench, accent: "text-rose-400", key: "others" },
];

const HIGHLIGHTS = [
  "Musa Qureshi",
  "AI engineering",
  "agentic systems",
  "quantitative research",
];

const highlightBio = (text) => {
  const pattern = new RegExp(`(${HIGHLIGHTS.join("|")})`, "gi");
  const parts = text.split(pattern);
  return parts.map((part, i) =>
    HIGHLIGHTS.some(h => h.toLowerCase() === part.toLowerCase())
      ? <span key={i} className="text-primary font-semibold">{part}</span>
      : part
  );
};

export const About = () => {
  const { personalInfo, education, skills, certifications } = portfolioData;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const bioParagraphs = personalInfo.bio.split("\n\n").filter(Boolean);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="container-responsive relative z-10 mx-auto">

        {/* ── Section heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              About Me
            </span>
          </ScrollReveal>
          <div className="mt-4 mb-3">
            <LetterReveal
              text="Engineering intelligence,"
              className="text-3xl md:text-4xl font-bold text-foreground font-heading"
            />
          </div>
          <FadeIn delay={0.2}>
            <span className="text-xl md:text-2xl font-heading italic font-light text-muted-foreground">
              systematizing chaos.
            </span>
          </FadeIn>
        </div>

        {/* ── Two-column body ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ─── Left: Summary + Education ─── */}
          <FadeIn delay={0.15} className="h-full">
            <div className="flex flex-col gap-7">

              {/* Professional Summary */}
              <div className="space-y-5 max-w-prose">
                {bioParagraphs.map((para, i) => (
                  <p key={i} className="text-base leading-7 text-zinc-200 font-body">
                    {highlightBio(para)}
                  </p>
                ))}
              </div>

              {/* Education card */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <GraduationCap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Education</span>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  {education.map((edu, i) => (
                    <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 hover:border-white/10 transition-colors min-h-[110px]">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <p className="text-sm font-semibold text-foreground leading-snug">{edu.degree}</p>
                        <span className="text-[10px] font-mono text-primary flex-shrink-0 mt-0.5 whitespace-nowrap">{edu.year || edu.period}</span>
                      </div>
                      <p className="text-xs text-zinc-500">{edu.school}</p>
                      {edu.details && (
                        <p className="text-[11px] text-zinc-600 mt-1.5 leading-relaxed">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ─── Right: Skills + Certification ─── */}
          <FadeIn delay={0.25} className="h-full">
            <div className="flex flex-col gap-7 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">

              {/* Core Skills — 4 groups */}
              <div>
                <div className="flex items-center gap-2.5 mb-5">
                  <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Core Skills</span>
                </div>
                <div className="space-y-5">
                  {SKILL_GROUPS.map((group) => {
                    const Icon = group.icon;
                    const items = skills[group.key] || [];
                    return (
                      <div key={group.label}>
                        <div className={`flex items-center gap-1.5 mb-2.5 text-[10px] font-bold uppercase tracking-widest ${group.accent}`}>
                          <Icon className="w-3 h-3" />
                          {group.label}
                        </div>
                        <motion.div
                          className="flex flex-wrap gap-1.5"
                          variants={chipGroup}
                          initial="hidden"
                          animate={isInView ? "visible" : "hidden"}
                        >
                          {items.map((skill) => (
                            <motion.span
                              key={skill}
                              variants={chip}
                              className="text-[12px] px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-zinc-300 font-medium hover:bg-white/[0.07] hover:text-foreground transition-colors cursor-default leading-none"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Certification card */}
              {certifications && certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Certification</span>
                  </div>
                  <div className="space-y-2">
                    {certifications.map((cert, i) => (
                      <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 hover:border-amber-400/20 transition-colors min-h-[110px]">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className="text-sm font-semibold text-foreground leading-snug">{cert.name}</p>
                          <span className="text-[10px] font-mono text-amber-400 flex-shrink-0 mt-0.5 whitespace-nowrap">{cert.period}</span>
                        </div>
                        <p className="text-xs text-zinc-500">{cert.issuer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
