import { portfolioData } from "@/data/portfolio";
import { Reveal, FadeIn } from "@/components/Reveal";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

export const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              Career Journey
            </span>
          </ScrollReveal>
          <div className="mt-4 mb-6">
            <LetterReveal text="Building systems that scale." className="text-3xl md:text-4xl font-bold text-foreground font-heading" />
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400">
              My professional path in AI engineering and full-stack development.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="flex flex-col pb-8">
            {experience.map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div
                  className={`relative grid md:grid-cols-2 gap-8 ${idx > 0 ? "mt-12 md:-mt-12 lg:-mt-24" : ""
                    }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                    {idx === 0 && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-8 md:pl-0 ${idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                      }`}
                  >
                    <div
                      className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/10 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide mb-3">
                          {exp.period}
                        </span>
                        <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                        <p className="text-lg text-muted-foreground font-medium mb-6">{exp.company}</p>

                        <div className="text-left space-y-4">
                          <p className="text-zinc-300 leading-relaxed font-body text-sm md:text-base">
                            {exp.description}
                          </p>
                          <div className="space-y-6">
                            {exp.achievements.map((achievement, aIdx) => {
                              // Handle complex sectioned achievements (e.g., Current Focus, Background)
                              if (typeof achievement === "object" && achievement.title) {
                                return (
                                  <div key={aIdx} className="space-y-2">
                                    <h4 className="text-secondary-foreground text-sm font-semibold tracking-wide">{achievement.title}</h4>
                                    <ul className="space-y-2">
                                      {achievement.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start gap-3 text-sm text-zinc-400 font-body">
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              }

                              // Handle standard string achievements
                              return (
                                <ul key={aIdx} className="space-y-2">
                                  <li className="flex items-start gap-3 text-sm text-zinc-400 font-body">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                </ul>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
