import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";
import { BookOpen, FlaskConical, Shield, Library, Layers, ArrowRight, FileText, Clock } from "lucide-react";

const HUB_SECTIONS = [
    {
        path: "/editorial/articles",
        icon: BookOpen,
        label: "Articles & Essays",
        desc: "Technical writing, project deep-dives, and essays on AI engineering.",
        accent: "from-blue-500/20 to-violet-500/10",
        iconColor: "text-blue-400",
    },
    {
        path: "/editorial/research",
        icon: FlaskConical,
        label: "Research",
        desc: "Active research on Agentic Case Intelligence. Seeking collaborators.",
        accent: "from-violet-500/20 to-fuchsia-500/10",
        iconColor: "text-violet-400",
        badge: "Active",
    },
    {
        path: "/editorial/ai-security",
        icon: Shield,
        label: "AI Security Series",
        desc: "Long-form series on AI governance, agent security, and trust infrastructure.",
        accent: "from-rose-500/20 to-orange-500/10",
        iconColor: "text-rose-400",
        badge: "Series",
    },
    {
        path: "/editorial/resources",
        icon: Library,
        label: "Resources",
        desc: "Curated repos, papers, tools, and learning resources.",
        accent: "from-emerald-500/20 to-teal-500/10",
        iconColor: "text-emerald-400",
    },
    {
        path: "/editorial/labs",
        icon: Layers,
        label: "Labs",
        desc: "Experiments, open questions, architecture sketches, and failed experiments.",
        accent: "from-amber-500/20 to-orange-500/10",
        iconColor: "text-amber-400",
    },
];

function useStagger(ref) {
    useEffect(() => {
        if (!ref.current) return;
        const els = ref.current.querySelectorAll("[data-stagger]");
        els.forEach((el, i) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            setTimeout(() => {
                el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 80 + i * 60);
        });
    }, []);
}

export function EditorialOverview() {
    const { editorial } = portfolioData;
    const containerRef = useRef(null);
    useStagger(containerRef);

    const featuredArticle = editorial.articles.find((a) => a.featured) || editorial.articles[0];
    const recentArticles = editorial.articles.filter((a) => !a.featured).slice(0, 3);

    return (
        <div ref={containerRef} className="container-responsive max-w-4xl">
            {/* Hero */}
            <div data-stagger className="mb-14">
                <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-mono tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Knowledge Hub
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground mb-5 leading-[1.1]">
                    I build.
                    <br />
                    <span className="text-muted-foreground">I research.</span>
                    <br />
                    I write.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    This is where I share what I learn, what I'm building, what I'm researching, and
                    what I'm thinking. Less portfolio, more <em>process</em>.
                </p>
            </div>

            {/* Featured Article */}
            {featuredArticle && (
                <div data-stagger className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Featured</span>
                        <div className="h-px flex-1 bg-border/40" />
                    </div>
                    <a
                        href={featuredArticle.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-2xl border border-border bg-card p-6 md:p-8 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)] relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/15 text-violet-400 border border-violet-500/20">
                                    {featuredArticle.category}
                                </span>
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {featuredArticle.readTime}
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold font-heading text-foreground mb-3 group-hover:text-violet-100 transition-colors leading-snug">
                                {featuredArticle.title}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
                                {featuredArticle.summary}
                            </p>
                            {featuredArticle.tags && (
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {featuredArticle.tags.map((t) => (
                                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 group-hover:gap-2.5 transition-all">
                                Read article <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </a>
                </div>
            )}

            {/* Section grid */}
            <div data-stagger className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Sections</span>
                    <div className="h-px flex-1 bg-border/40" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {HUB_SECTIONS.map((section) => (
                        <Link
                            key={section.path}
                            to={section.path}
                            className="group rounded-xl border border-border bg-card p-4 hover:border-border-hover transition-all duration-200 relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${section.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div className={`w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center ${section.iconColor}`}>
                                        <section.icon className="w-4 h-4" />
                                    </div>
                                    {section.badge && (
                                        <span className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                                            {section.badge}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-sm font-semibold font-heading text-foreground mb-1">{section.label}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">{section.desc}</p>
                                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Articles quick list */}
            {recentArticles.length > 0 && (
                <div data-stagger>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Recent Writing</span>
                        <div className="h-px flex-1 bg-border/40" />
                        <Link to="/editorial/articles" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-2">
                        {recentArticles.map((a) => (
                            <a
                                key={a.id}
                                href={a.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 px-4 py-3 rounded-xl border border-border hover:border-border-hover bg-card hover:bg-secondary/50 transition-all"
                            >
                                <FileText className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                                    <p className="text-xs text-muted-foreground">{a.platform} · {a.readTime}</p>
                                </div>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
