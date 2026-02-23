import { ArrowUpRight } from "lucide-react";

// Platform color map for badge styling
const PLATFORM_STYLES = {
    X: { bg: "bg-black", text: "text-white", border: "border-zinc-700" },
    Twitter: { bg: "bg-[#1d9bf0]/10", text: "text-[#1d9bf0]", border: "border-[#1d9bf0]/30" },
    Medium: { bg: "bg-[#02b875]/10", text: "text-[#02b875]", border: "border-[#02b875]/30" },
    LinkedIn: { bg: "bg-[#0a66c2]/10", text: "text-[#0a66c2]", border: "border-[#0a66c2]/30" },
    Research: { bg: "bg-violet-950/40", text: "text-violet-300", border: "border-violet-800/30" },
};

export const ArticleCard = ({ article, index }) => {
    const hasLink = article.link && article.link !== "#";
    const style = PLATFORM_STYLES[article.platform] ?? { bg: "bg-white/5", text: "text-zinc-300", border: "border-white/10" };

    return (
        <a
            href={hasLink ? article.link : undefined}
            target={hasLink ? "_blank" : undefined}
            rel={hasLink ? "noopener noreferrer" : undefined}
            className={`group block bg-[#0c1014] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col ${!hasLink ? "cursor-default" : ""}`}
            style={{ animationDelay: `${(index || 0) * 100}ms` }}
        >
            {/* Platform header band */}
            <div className="w-full px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0d10]">
                {/* Platform logo + name */}
                <div className="flex items-center gap-2.5">
                    {article.platformLogo ? (
                        <img
                            src={article.platformLogo}
                            alt={article.platform}
                            className="w-5 h-5 rounded object-contain"
                            onError={(e) => { e.target.style.display = "none"; }}
                        />
                    ) : (
                        <div className={`w-2 h-2 rounded-full ${style.bg} border ${style.border}`} />
                    )}
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ${style.bg} ${style.text} border ${style.border}`}>
                        {article.platform || "Article"}
                    </span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">{article.date || ""}</span>
            </div>

            {/* Content body */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-snug font-heading">
                    {article.title}
                </h3>

                {article.summary && (
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-grow mb-5">
                        {article.summary}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-[10px] text-zinc-600 italic">
                        {hasLink ? "" : "Coming soon"}
                    </span>
                    {hasLink && (
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 group-hover:text-primary transition-colors">
                            <span>{article.platform === "Research" ? "View Paper" : "Read"}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};
