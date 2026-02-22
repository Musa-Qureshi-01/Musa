import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { Reveal, FadeIn } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

export const Projects = () => {
  const { projects } = portfolioData;
  // Top 4 projects (2x2 grid)
  const displayedProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              Engineering Showcase
            </span>
          </ScrollReveal>

          <div className="mt-4 mb-6">
            <LetterReveal text="Systems that demonstrate depth." className="text-3xl md:text-4xl font-bold text-foreground font-heading" />
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400">
              Selected work highlighting agentic workflows, production ML pipelines, and full-stack engineering.
            </p>
          </ScrollReveal>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {displayedProjects.map((project, idx) => (
            <ScrollReveal key={project.id} delay={idx * 0.1}>
              <div
                className="group relative bg-white/[0.02] rounded-3xl overflow-hidden border border-white/10 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Banner */}
                {project.image && (
                  <div className="w-full h-48 border-b border-white/10 relative overflow-hidden shrink-0 group-hover:block">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}

                <div className="relative p-6 md:p-8 flex flex-col flex-grow z-10">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors font-heading mb-3">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] md:text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 font-medium border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ONE-Line Description */}
                  <div className="text-zinc-400 leading-relaxed mb-6 font-body text-sm line-clamp-2 flex-grow">
                    {project.description || (project.highlights && project.highlights[0]) || "A sophisticated technical project."}
                  </div>

                  {/* Interactive CTA (Hover Reveal) */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 z-20 relative">
                    <a
                      href={project.link && project.link !== "#" ? project.link : (project.github !== "#" ? project.github : "#")}
                      target={project.link === "#" && project.github === "#" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary opacity-0 -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:text-primary/80 flex items-center gap-1"
                    >
                      Learn More <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <div className="flex gap-3">
                      {project.github && project.github !== "#" && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" title="View Source">
                          <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                        </a>
                      )}
                      {project.link && project.link !== "#" && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors" title="Live Demo">
                          <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Show More Projects Button */}
        <div className="flex justify-center mt-16">
          <Link to="/projects" className="group">
            <Button
              variant="outline"
              className="rounded-full px-8 gap-2 pointer-events-none"
            >
              Show More Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
