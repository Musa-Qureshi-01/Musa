import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Github, FileText, BookOpen, Wrench, ExternalLink, Search, Filter } from "lucide-react";

const TYPE_ICONS = {
    Github: Github,
    Medium: FileText,
    Codeforces: BookOpen,
    Paper: FileText,
    Tool: Wrench,
};

const TYPE_COLORS = {
    Github: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    Medium: "bg-green-500/10 text-green-400 border-green-500/20",
    Codeforces: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    Paper: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Tool: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

function ResourceCard({ resource, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(16px)";
        const t = setTimeout(() => {
            el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 55);
        return () => clearTimeout(t);
    }, [index]);

    const Icon = TYPE_ICONS[resource.type] || FileText;
    const typeColor = TYPE_COLORS[resource.type] || "bg-secondary text-muted-foreground border-border";

    return (
        <a
            ref={ref}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-border-hover hover:bg-secondary/40 transition-all duration-200"
        >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColor.split(" ").slice(0, 1).join(" ")} border ${typeColor.split(" ").slice(2).join(" ")}`}>
                <Icon className={`w-4 h-4 ${typeColor.split(" ")[1]}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold font-heading text-foreground leading-snug group-hover:text-violet-100 transition-colors">{resource.title}</h3>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors mt-0.5" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">{resource.description}</p>
                <div className="flex flex-wrap gap-1">
                    {resource.tags?.map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary border border-border/50 text-muted-foreground/60">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
}

const CATEGORIES = ["All", "Repositories", "Research Papers", "Articles", "Developer Tools"];

export function Resources() {
    const resources = portfolioData.resources || [];
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = resources.filter((r) => {
        const matchCat = activeCategory === "All" || r.category === activeCategory;
        const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    const byCategory = CATEGORIES.filter((c) => c !== "All").reduce((acc, cat) => {
        const items = filtered.filter((r) => r.category === cat);
        if (items.length) acc[cat] = items;
        return acc;
    }, {});

    let displayIdx = 0;

    return (
        <div className="container-responsive max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Editorial Hub</span>
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mt-2 mb-3">
                    Resources
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    A curated collection of repos, papers, tools, and learning resources I've found valuable. Kept updated as I discover new things.
                </p>
            </div>

            {/* Controls */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                        type="text"
                        placeholder="Search resources…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-violet-500/40 outline-none text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors"
                    />
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === cat
                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                : "bg-card border border-border text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {activeCategory === "All" ? (
                <div className="space-y-10">
                    {Object.entries(byCategory).map(([cat, items]) => (
                        <div key={cat}>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground/60">{cat}</h2>
                                <div className="h-px flex-1 bg-border/30" />
                                <span className="text-[10px] font-mono text-muted-foreground/40">{items.length}</span>
                            </div>
                            <div className="grid gap-3">
                                {items.map((r, i) => {
                                    const idx = displayIdx++;
                                    return <ResourceCard key={r.id} resource={r} index={idx} />;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid gap-3">
                    {filtered.map((r, i) => <ResourceCard key={r.id} resource={r} index={i} />)}
                </div>
            )}

            {filtered.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-sm">No resources match your search.</p>
                </div>
            )}
        </div>
    );
}
