import { useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Shield, Clock, Calendar, ArrowUpRight, Lock, Zap, Eye, EyeOff } from "lucide-react";

/* ── Redacted text block (blurred / classified look) ─────────────────────── */
function Redacted({ text, className = "" }) {
    return (
        <span
            className={`select-none blur-[5px] opacity-50 ${className}`}
            aria-hidden="true"
        >
            {text}
        </span>
    );
}

/* ── Redaction bar (solid black block) ───────────────────────────────────── */
function RedactionBar({ width = "w-full", height = "h-3" }) {
    return <span className={`inline-block ${width} ${height} bg-foreground/20 rounded align-middle`} />;
}

function EpisodeCard({ ep, index, total }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        const t = setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 90);
        return () => clearTimeout(t);
    }, [index]);

    const isPublished = ep.status === "published";
    const isLocked = !isPublished; // everything that's not published is "locked"

    const dateStr = new Date(ep.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return (
        <div ref={ref} className="flex gap-5 group">
            {/* Episode spine */}
            <div className="flex flex-col items-center">
                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold font-mono text-sm border transition-all
                        ${isPublished
                            ? "bg-rose-500/15 border-rose-500/25 text-rose-300 group-hover:bg-rose-500/25"
                            : "bg-secondary/50 border-dashed border-border/50 text-muted-foreground/40"
                        }`}
                >
                    {isPublished ? ep.episode : <Lock className="w-4 h-4" />}
                </div>
                {index < total - 1 && (
                    <div className={`w-0.5 flex-1 mt-2 ${isPublished ? "bg-rose-500/20" : "bg-border/20 border-dashed"}`} />
                )}
            </div>

            {/* Content */}
            <div className={`flex-1 pb-10 ${index === total - 1 ? "pb-0" : ""}`}>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono ${isLocked ? "text-muted-foreground/25" : "text-muted-foreground/50"}`}>
                        Episode {ep.episode}
                    </span>

                    {/* Status badge — only "Published" shown for episode 1 */}
                    {isPublished ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-rose-500/10 text-rose-400 border-rose-500/20">
                            Published
                        </span>
                    ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-secondary/40 text-muted-foreground/30 border-border/30 select-none">
                            ██████████
                        </span>
                    )}

                    {/* Reading time — anonymised for unreleased */}
                    <span className={`text-[10px] flex items-center gap-1 ${isLocked ? "text-muted-foreground/25" : "text-muted-foreground/50"}`}>
                        <Clock className="w-3 h-3" />
                        {isPublished ? ep.readTime : "8–12 min"}
                    </span>

                    {/* Date — only shown for published */}
                    {isPublished && (
                        <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />{dateStr}
                        </span>
                    )}
                </div>

                {/* Title */}
                {isPublished ? (
                    <h3 className="text-base font-semibold font-heading text-foreground mb-2 leading-snug">
                        {ep.title}
                    </h3>
                ) : (
                    <div className="mb-2 relative">
                        {/* Blurred/redacted title */}
                        <h3
                            className="text-base font-semibold font-heading text-foreground/60 leading-snug blur-[6px] select-none pointer-events-none"
                            aria-hidden="true"
                        >
                            {ep.title}
                        </h3>
                        {/* Classified overlay label */}
                        <div className="absolute inset-0 flex items-center">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-border/60 border border-border text-[9px] font-mono text-muted-foreground/40 tracking-widest uppercase">
                                <EyeOff className="w-2.5 h-2.5" /> Not Released
                            </span>
                        </div>
                    </div>
                )}

                {/* Description */}
                {isPublished ? (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {ep.description}
                    </p>
                ) : (
                    <div className="mb-4 space-y-1.5 select-none pointer-events-none" aria-hidden="true">
                        {/* Redacted lines */}
                        <div className="h-3 rounded bg-muted-foreground/10 w-full blur-[2px]" />
                        <div className="h-3 rounded bg-muted-foreground/8 w-5/6 blur-[2px]" />
                        <div className="h-3 rounded bg-muted-foreground/6 w-4/5 blur-[2px]" />
                        <div className="h-3 rounded bg-muted-foreground/8 w-3/4 blur-[2px]" />
                    </div>
                )}

                {/* Tags — blurred for unreleased */}
                {ep.tags && (
                    <div className={`flex flex-wrap gap-1.5 mb-4 ${isLocked ? "blur-[4px] opacity-30 pointer-events-none select-none" : ""}`} aria-hidden={isLocked}>
                        {ep.tags.map((t) => (
                            <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground/70">
                                {t}
                            </span>
                        ))}
                    </div>
                )}

                {/* CTA */}
                {isPublished ? (
                    <a
                        href={ep.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
                    >
                        Read on Medium <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                ) : (
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/25 font-mono select-none">
                        <Lock className="w-3 h-3" />
                        <span className="tracking-wider">██████ ██████</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export function AISecurity() {
    const { editorial } = portfolioData;
    const series = editorial.aiSecurity;

    const totalEps = series.episodes.length;
    const publishedEps = series.episodes.filter((e) => e.status === "published").length;

    // Progress is fixed at 10% as specified
    const progressPct = 10;

    return (
        <div className="container-responsive max-w-4xl">
            {/* Header */}
            <div className="mb-10">
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Editorial Hub</span>
                <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground">
                        {series.seriesTitle}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] font-mono">
                        <Zap className="w-3 h-3" />
                        Ongoing Series
                    </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    {series.seriesDescription}
                </p>
            </div>

            {/* Series progress */}
            <div className="mb-10 rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider mb-1">Series Progress</p>
                        <p className="text-sm font-medium text-foreground">
                            {publishedEps} of 8–12 episodes published
                        </p>
                        <p className="text-[10px] text-muted-foreground/40 mt-0.5 flex items-center gap-1">
                            <EyeOff className="w-3 h-3" /> Remaining episodes are classified until release
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold font-heading text-foreground">{progressPct}%</p>
                        <p className="text-[10px] text-muted-foreground">complete</p>
                    </div>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-700"
                        style={{ width: `${progressPct}%` }}
                    />
                </div>
                <div className="mt-3 flex gap-4 text-[10px] text-muted-foreground/50">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Published
                    </span>
                    <span className="flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Remaining — Classified
                    </span>
                </div>
            </div>

            {/* Episodes */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <Shield className="w-4 h-4 text-rose-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Episodes</h2>
                    <div className="h-px flex-1 bg-border/40" />
                    <span className="text-[10px] font-mono text-muted-foreground/30 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {publishedEps}/8–12 visible
                    </span>
                </div>
                <div>
                    {series.episodes.map((ep, i) => (
                        <EpisodeCard key={ep.episode} ep={ep} index={i} total={totalEps} />
                    ))}
                </div>
            </div>
        </div>
    );
}
