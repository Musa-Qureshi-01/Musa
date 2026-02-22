import { BrainCircuit, Database, BookOpen, Layers } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

const services = [
    {
        icon: Layers,
        title: "FSD SaaS Builder",
        description: "End-to-end Feature-Sliced Design (FSD) architecture for scalable, maintainable SaaS products.",
    },
    {
        icon: BrainCircuit,
        title: "Agentic/Generative AI",
        description: "Building autonomous agents using LangGraph and LLMs, creating custom tools and workflows.",
    },
    {
        icon: Database,
        title: "ML/DL Engineering",
        description: "End-to-end model training, building, evaluation, and reliable MLOps pipelines.",
    },
    {
        icon: BookOpen,
        title: "Research & Mentorship",
        description: "Deep dive studies, technical writing, and guiding aspiring engineers in AI and full-stack development.",
    },
];

export const Services = () => {
    return (
        <section id="services" className="section-padding relative overflow-hidden bg-background">
            <div className="container-responsive relative z-10 mx-auto">
                <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    <div className="text-center mb-8 pt-4">
                        <ScrollReveal>
                            <h3 className="text-lg md:text-xl font-bold text-foreground font-heading">What I Do</h3>
                        </ScrollReveal>
                        <ScrollReveal delay={0.1}>
                            <p className="text-[11px] md:text-xs text-muted-foreground mt-1">Specialized services across the AI and Full-Stack spectrum.</p>
                        </ScrollReveal>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                        {services.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={idx} delay={0.2 + (idx * 0.1)}>
                                    <div className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/10 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group h-full flex flex-col relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500" />

                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-primary/20 shadow-lg shadow-primary/5">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="text-lg font-bold mb-2 text-foreground font-heading group-hover:text-primary transition-colors">{item.title}</h4>
                                        <p className="text-sm text-zinc-400 leading-relaxed font-body flex-grow">
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
