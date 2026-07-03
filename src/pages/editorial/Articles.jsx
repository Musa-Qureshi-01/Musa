import { useState, useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { Clock, Calendar, Tag, ArrowUpRight, Search } from "lucide-react";

const PLATFORM_COLORS = {
    Medium: "bg-green-500/10 text-green-400 border-green-500/20",
    X: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Codeforces: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    GitHub: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

function ArticleCard({ article, index }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        const t = setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 70);
        return () => clearTimeout(t);
    }, [index]);

    const platformClass = PLATFORM_COLORS[article.platform] || "bg-secondary text-muted-foreground border-border";
    const dateStr = new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    return (
        <a
            ref={ref}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-2xl border border-border bg-card p-5 hover:border-violet-500/30 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(139,92,246,0.08)] overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {article.image && (
                <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-secondary">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            <div className="relative z-10">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${platformClass}`}>
                        {article.platform}
                    </span>
                    {article.category && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                            {article.category}
                        </span>
                    )}
                    {article.featured && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-violet-400">
                            Featured
                        </span>
                    )}
                </div>

                <h3 className="text-sm font-semibold font-heading text-foreground mb-2 leading-snug group-hover:text-violet-100 transition-colors">
                    {article.title}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {article.summary}
                </p>

                {article.tags && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map((t) => (
                            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground/70">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
                        {article.readTime && (
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {article.readTime}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {dateStr}
                        </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-violet-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
            </div>
        </a>
    );
}

const ALL_CATEGORIES = ["All", "AI Security", "Agentic AI", "Computer Vision", "Engineering", "Mindset"];

export function Articles() {
    const { editorial } = portfolioData;
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = editorial.articles.filter((a) => {
        const matchCat = activeCategory === "All" || a.category === activeCategory;
        const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <div className="container-responsive max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Editorial Hub</span>
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mt-2 mb-3">
                    Articles & Essays
                </h1>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                    Technical deep-dives, project postmortems, engineering essays, and writing about AI, systems, and building.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                    <input
                        type="text"
                        placeholder="Search articles…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-card border border-border focus:border-violet-500/40 outline-none text-sm text-foreground placeholder:text-muted-foreground/40 transition-colors"
                    />
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {ALL_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeCategory === cat
                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border-hover"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                    {filtered.map((article, i) => (
                        <ArticleCard key={article.id} article={article} index={i} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-sm">No articles match your search.</p>
                </div>
            )}
        </div>
    );
}
