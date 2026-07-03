import { BrainCircuit, Database, BookOpen, Layers } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

const services = [
    {
        icon: Layers,
        title: "FSD SaaS Builder",
        description: "Designing and delivering feature-sliced, end-to-end SaaS systems — from architecture and APIs to frontend, data, and deployment — built for scale, maintainability, and real-world use.",
    },
    {
        icon: BrainCircuit,
        title: "Agentic/Generative AI",
        description: "Building LLM-powered and agentic systems using LangGraph and modern AI stacks, including RAG pipelines, tool orchestration, and autonomous workflows that operate reliably in production.",
    },
    {
        icon: Database,
        title: "ML/DL Engineering",
        description: "Developing end-to-end machine learning systems, covering data pipelines, model training and evaluation, and production-grade MLOps pipelines for reliable deployment and iteration.",
    },
    {
        icon: BookOpen,
        title: "Research & Mentorship",
        description: "Conducting deep technical exploration and applied research, supported by technical writing and mentorship — helping engineers understand systems deeply and apply AI effectively.",
    },
];

export const Services = () => {
    return (
        <section id="services" className="section-padding relative overflow-hidden bg-background-alt border-t border-border/20">
            <div className="container-responsive relative z-10 mx-auto">
                <div className="relative">
                    <div className="text-center mx-auto max-w-3xl mb-16">
                        <ScrollReveal>
                            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase font-mono">
                                Services & Solutions
                            </span>
                        </ScrollReveal>
                        <div className="mt-3 mb-4">
                            <LetterReveal 
                                text="What I Do." 
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-heading" 
                            />
                        </div>
                        <ScrollReveal delay={0.2}>
                            <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed">
                                Specialized services across the AI and Full-Stack spectrum.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                        {services.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={idx} delay={0.2 + (idx * 0.1)}>
                                    <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-premium hover:shadow-premium-hover hover:border-border-hover transition-all duration-300 group h-full flex flex-col relative overflow-hidden">
                                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-5 text-secondary-foreground group-hover:text-foreground transition-colors border border-border">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <h4 className="text-base font-bold mb-2 text-foreground font-heading">{item.title}</h4>
                                        <p className="text-xs text-secondary-foreground leading-relaxed font-body flex-grow">
                                            {item.description}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
