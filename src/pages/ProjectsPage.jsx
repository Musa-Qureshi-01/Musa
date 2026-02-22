import { useState, useMemo, useEffect } from "react";
import { ArrowUpRight, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/Reveal";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

export const ProjectsPage = () => {
    const { projects } = portfolioData;
    const dynamicCategories = ["All", ...new Set(projects.map(p => p.category))];

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = useMemo(() => {
        if (activeCategory === "All") return projects;
        return projects.filter(p => p.category === activeCategory);
    }, [activeCategory, projects]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-24 section-padding relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            <div className="container-responsive relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <LetterReveal text="All Engineering Projects" className="text-4xl md:text-6xl font-bold text-foreground mb-6" />
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl text-muted-foreground">
                            A comprehensive archive of systems, models, and tools I've built.
                        </p>
                    </ScrollReveal>
                </div>

                {/* Categories / Filter Tabs */}
                <ScrollReveal delay={0.3}>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {dynamicCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {filteredProjects.map((project, idx) => (
                        <FadeIn key={project.id} delay={idx * 0.1}>
                            <div
                                className="group relative bg-card rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Top Banner */}
                                {project.image && (
                                    <div className="w-full h-48 border-b border-white/10 relative overflow-hidden shrink-0">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                )}

                                <div className="relative p-8 flex flex-col flex-grow z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="space-y-2">
                                            <span className="inline-block px-3 py-1 bg-secondary/50 text-secondary-foreground text-[10px] font-bold tracking-wider uppercase rounded-sm border border-white/5">
                                                {project.category}
                                            </span>
                                            <h3 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {project.tech.slice(0, 3).map((tag, tagIdx) => (
                                                    <span
                                                        key={tagIdx}
                                                        className="px-2 py-0.5 rounded text-[10px] font-medium text-muted-foreground border border-white/5"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ONE-Line Description */}
                                    <div className="text-muted-foreground font-body text-sm line-clamp-2 leading-relaxed mb-6 flex-grow">
                                        {project.description || (project.highlights && project.highlights[0])}
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
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                                    aria-label="View Source"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.link && project.link !== "#" && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                                    aria-label="View Project"
                                                >
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </div>
    );
};
