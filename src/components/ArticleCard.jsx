import { ArrowUpRight } from "lucide-react";

export const ArticleCard = ({ article, index }) => {
    return (
        <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#0c1014] rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col"
            style={{ animationDelay: `${(index || 0) * 100}ms` }}
        >
            {/* Image Thumbnail / Cover */}
            <div className="w-full h-44 bg-[#0a0d10] relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:border-white/10 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1014] to-transparent opacity-50 z-10" />
                {article.image ? (
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                ) : (
                    <div className="text-zinc-500/30 font-accent text-[10px] uppercase tracking-[0.2em] flex flex-col items-center gap-3 group-hover:scale-[1.03] transition-transform duration-700 ease-out">
                        <svg className="w-6 h-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>Editorial Cover</span>
                    </div>
                )}
                {/* Content Type Badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-medium tracking-widest text-zinc-300 border border-white/10 uppercase">
                    {article.category || "Publication"}
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex flex-col h-full relative bg-gradient-to-b from-[#0c1014] to-background">
                <div className="relative z-10 flex flex-col flex-grow">

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors leading-snug font-heading flex-grow">
                        {article.title}
                    </h3>

                    {/* Short Description */}
                    {article.summary && (
                        <p className="text-sm text-zinc-400 font-body leading-relaxed mb-6 line-clamp-2">
                            {article.summary}
                        </p>
                    )}

                    {/* Metadata Row */}
                    <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-medium text-zinc-300">{article.platform || "Independent"}</span>
                            <span className="text-[10px] text-zinc-500 font-mono tracking-wider">{article.date || "Ongoing"}</span>
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors group-hover:text-primary relative overflow-hidden">
                            <span>Read</span>
                            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            {/* Accent Underline */}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};
