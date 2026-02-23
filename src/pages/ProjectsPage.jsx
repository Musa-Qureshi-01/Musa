import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
    ArrowUpRight, Github, Play, FileText, ExternalLink,
    ArrowLeft, X, ChevronRight, BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/Reveal";

// ─── Category Definitions ──────────────────────────────────────────────────
const CATEGORIES = [
    { id: "all", label: "All Projects" },
    { id: "ongoing", label: "Ongoing" },
    { id: "agentic", label: "Agentic/GenAI" },
    { id: "mldl", label: "ML/DL/Data" },
    { id: "others", label: "Others" },
    { id: "resources", label: "Resources & Learnings" },
];

const AGENTIC_CATS = ["Healthcare AI", "Agentic AI & FinTech", "GenAI & Content", "AI Tooling & Orchestration"];
const MLDL_CATS = ["Computer Vision & Civic Tech", "ML/DL Engineering"];
const OTHERS_CATS = ["Interactive AI Research", "Full-Stack Web", "Frontend & Design"];
const isOngoing = (p) => p.link === "#" && p.github === "#";

const filterProjects = (projects, catId) => {
    switch (catId) {
        case "all": return projects;
        case "ongoing": return projects.filter(isOngoing);
        case "agentic": return projects.filter(p => AGENTIC_CATS.includes(p.category));
        case "mldl": return projects.filter(p => MLDL_CATS.includes(p.category));
        case "others": return projects.filter(p => OTHERS_CATS.includes(p.category));
        default: return projects;
    }
};

// --- 3-D Drum Scroller ---
const ITEM_PX   = 52;
const ANGLE_DEG = 18;

const DrumScroller = ({ categories, activeId, onChange }) => {
    const n = categories.length;
    const [idx, setIdx]   = useState(() => Math.max(0, categories.findIndex(c => c.id === activeId)));
    const [boxH, setBoxH] = useState(400);
    const idxRef          = useRef(idx);
    const containerRef    = useRef(null);
    const startY          = useRef(null);
    const isDragging      = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => setBoxH(entry.contentRect.height));
        ro.observe(el);
        setBoxH(el.clientHeight);
        return () => ro.disconnect();
    }, []);

    useEffect(() => { idxRef.current = idx; }, [idx]);

    useEffect(() => {
        const i = categories.findIndex(c => c.id === activeId);
        if (i >= 0 && i !== idxRef.current) { idxRef.current = i; setIdx(i); }
    }, [activeId, categories]);

    const go = useCallback((next) => {
        const c = Math.max(0, Math.min(n - 1, next));
        idxRef.current = c;
        setIdx(c);
        onChange(categories[c].id);
    }, [n, categories, onChange]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onWheel = (e) => { e.preventDefault(); go(idxRef.current + (e.deltaY > 0 ? 1 : -1)); };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [go]);

    const onKeyDown    = (e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); go(idxRef.current + 1); }
        if (e.key === "ArrowUp")   { e.preventDefault(); go(idxRef.current - 1); }
    };
    const onTouchStart = (e) => { startY.current = e.touches[0].clientY; };
    const onTouchEnd   = (e) => {
        if (startY.current == null) return;
        const dy = startY.current - e.changedTouches[0].clientY;
        if (Math.abs(dy) > 10) go(idxRef.current + (dy > 0 ? 1 : -1));
        startY.current = null;
    };
    const onMouseDown  = (e) => { startY.current = e.clientY; isDragging.current = false; };
    const onMouseMove  = (e) => {
        if (startY.current == null) return;
        const dy = startY.current - e.clientY;
        if (Math.abs(dy) > 18) {
            isDragging.current = true;
            go(idxRef.current + (dy > 0 ? 1 : -1));
            startY.current = e.clientY;
        }
    };
    const onMouseUp = () => { startY.current = null; };

    const center  = boxH / 2;
    const maxDist = Math.ceil(boxH / (2 * ITEM_PX)) + 1;

    return (
        <div
            ref={containerRef}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="relative select-none outline-none w-full flex-1"
            style={{ cursor: "ns-resize", perspective: "600px", perspectiveOrigin: "50% 50%", overflow: "hidden", minHeight: 0 }}
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10"
                style={{ height: center * 0.6, background: "linear-gradient(to bottom, var(--color-background) 0%, transparent 100%)" }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
                style={{ height: center * 0.6, background: "linear-gradient(to top, var(--color-background) 0%, transparent 100%)" }} />

            {categories.map((cat, i) => {
                const dist    = i - idx;
                const active  = dist === 0;
                const absDist = Math.abs(dist);
                if (absDist > maxDist) return null;
                const top    = center + dist * ITEM_PX - ITEM_PX / 2;
                const angleX = dist * ANGLE_DEG;
                const blurPx = Math.min(absDist * 2, 7);
                const opa    = active ? 1 : Math.max(0.08, 1 - absDist * 0.22);
                const fSize  = active ? "1.05rem" : (Math.max(0.72, 0.98 - absDist * 0.13) + "rem");
                const fw     = active ? 800 : 500;
                const color  = active ? "#f2f4f7" : "#6b7280";
                return (
                    <div key={cat.id} onClick={() => !isDragging.current && go(i)}
                        style={{
                            position: "absolute", left: 0, right: 0, top, height: ITEM_PX,
                            transform: "rotateX(" + angleX + "deg)",
                            filter: "blur(" + blurPx + "px)",
                            opacity: opa,
                            transition: "top 0.26s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.26s ease, opacity 0.26s ease, filter 0.26s ease",
                            transformOrigin: "50% 50%", cursor: "pointer",
                            display: "flex", alignItems: "center", paddingLeft: "0.75rem", overflow: "hidden",
                        }}
                    >
                        <span style={{ width: 20, flexShrink: 0, opacity: active ? 1 : 0, transition: "opacity 0.22s", fontSize: "0.85rem", color: "#f2f4f7" }}>→</span>
                        <span style={{
                            fontSize: fSize, fontWeight: fw, color,
                            fontFamily: "var(--font-heading)",
                            letterSpacing: active ? "-0.01em" : "0.01em",
                            transition: "font-size 0.26s ease, color 0.26s ease",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0,
                        }}>{cat.label}</span>
                    </div>
                );
            })}
        </div>
    );
};


// ─── Learn-More Modal ───────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
    }, [onClose]);
    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/65 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: "spring", damping: 26, stiffness: 300 }}
                    className="relative w-full max-w-3xl bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[88vh] flex flex-col"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="overflow-y-auto flex-grow">
                        {project.image && (
                            <div className="w-full h-52 lg:h-72 relative bg-zinc-900 border-b border-white/10 shrink-0">
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        {!project.image && (
                            <div className="w-full h-28 bg-gradient-to-br from-primary/10 via-zinc-900 to-black border-b border-white/10 flex items-center px-8">
                                {isOngoing(project) && <span className="text-[9px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">In Progress</span>}
                            </div>
                        )}
                        <div className="p-6 sm:p-8 lg:p-10">
                            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{project.category}</p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-4">{project.title}</h2>
                            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base mb-8">{project.description}</p>
                            {project.highlights?.length > 0 && (
                                <div className="mb-8 pl-4 border-l-2 border-primary/40">
                                    <p className="text-white text-sm font-semibold mb-3">Key Highlights</p>
                                    <ul className="space-y-2">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="text-zinc-400 text-sm leading-relaxed flex gap-2">
                                                <ChevronRight className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />{h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="mb-8">
                                <p className="text-white text-sm font-semibold mb-3">Tech Stack</p>
                                <div className="flex flex-wrap gap-2">{project.tech.map((t, i) => <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300">{t}</span>)}</div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
                                {project.link && project.link !== "#" && <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 text-sm font-medium transition-all">Live Demo <ExternalLink className="w-4 h-4" /></a>}
                                {project.github && project.github !== "#" && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:border-white/30 hover:text-white text-sm font-medium transition-all">GitHub <Github className="w-4 h-4" /></a>}
                                {project.video && <a href={project.video} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-blue-400 hover:border-blue-500 text-sm font-medium transition-all">Demo Video <Play className="w-4 h-4" /></a>}
                                {project.article && <a href={project.article} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-emerald-400 hover:border-emerald-500 text-sm font-medium transition-all">Article <FileText className="w-4 h-4" /></a>}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ─── Resource Card  (GitHub / Notion / PDF) ─────────────────────────────────
const RESOURCE_STYLES = {
    GitHub: { border: "border-zinc-700/50", badge: "bg-zinc-800 text-zinc-300", Icon: Github },
    Notion: { border: "border-violet-900/40", badge: "bg-violet-950/50 text-violet-300", Icon: BookOpen },
    PDF: { border: "border-rose-900/40", badge: "bg-rose-950/50 text-rose-300", Icon: FileText },
};

const ResourceCard = ({ item, idx }) => {
    const s = RESOURCE_STYLES[item.type] ?? RESOURCE_STYLES.PDF;
    const hasLink = item.link && item.link !== "#";
    const Tag = hasLink ? "a" : "div";
    const tagProps = hasLink ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};
    return (
        <FadeIn delay={idx * 0.06}>
            <Tag {...tagProps}
                className={`group flex flex-col h-full bg-zinc-900 border ${s.border} rounded-2xl p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${hasLink ? "cursor-pointer" : "cursor-default opacity-75"}`}
            >
                <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${s.badge}`}>
                        <s.Icon className="w-3.5 h-3.5" /> {item.type}
                    </span>
                    {hasLink && <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
                </div>
                <h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 flex-grow mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.tags?.map((t, i) => <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-zinc-500">{t}</span>)}
                </div>
                {!hasLink && <p className="text-[9px] text-zinc-600 mt-3 italic">Link coming soon</p>}
            </Tag>
        </FadeIn>
    );
};

// ─── Project Card ──────────────────────────────────────────────────────────
const ProjectCard = ({ project, idx, onLearnMore }) => (
    <FadeIn delay={idx * 0.06}>
        <div className="group relative bg-card rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {project.image ? (
                <div className="w-full h-44 border-b border-white/10 relative overflow-hidden shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                </div>
            ) : (
                <div className="w-full h-32 border-b border-white/5 shrink-0 flex items-center justify-center bg-gradient-to-br from-primary/10 via-zinc-900 to-black relative overflow-hidden">
                    <span className="text-6xl opacity-[0.07] font-extrabold select-none" style={{ fontFamily: "var(--font-heading)" }}>{project.title.charAt(0)}</span>
                    {isOngoing(project) && <span className="absolute top-3 right-3 text-[9px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">Coming Soon</span>}
                </div>
            )}
            <div className="relative p-5 flex flex-col flex-grow z-10">
                <div className="mb-3">
                    <span className="inline-block px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-[9px] font-bold tracking-wider uppercase rounded border border-white/5 mb-2">{project.category}</span>
                    <h3 className="text-lg font-bold font-heading group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tech.slice(0, 4).map((tag, i) => <span key={i} className="px-2 py-0.5 rounded text-[9px] font-medium text-muted-foreground border border-white/5">{tag}</span>)}
                    </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 flex-grow mb-4">{project.description || project.highlights?.[0]}</p>
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
                    <button onClick={() => onLearnMore(project)} className="text-sm font-medium text-zinc-400 hover:text-primary flex items-center gap-1 transition-colors group/btn">
                        Learn More <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                    <div className="flex gap-1">
                        {project.link && project.link !== "#" && <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-primary transition-colors" title="Live Demo"><ExternalLink className="w-3.5 h-3.5" /></a>}
                        {project.github && project.github !== "#" && <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-foreground transition-colors" title="GitHub"><Github className="w-3.5 h-3.5" /></a>}
                        {project.video && <a href={project.video} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-zinc-500 hover:text-blue-400 transition-colors" title="Demo Video"><Play className="w-3.5 h-3.5" /></a>}
                        {project.article && <a href={project.article} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-400 transition-colors" title="Article"><FileText className="w-3.5 h-3.5" /></a>}
                    </div>
                </div>
            </div>
        </div>
    </FadeIn>
);

// ─── Main Page ─────────────────────────────────────────────────────────────
export const ProjectsPage = () => {
    const { projects, resources = [] } = portfolioData;
    const [activeId, setActiveId] = useState("all");
    const [selectedProject, setSelected] = useState(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const isResources = activeId === "resources";
    const displayed = useMemo(() => filterProjects(projects, activeId), [activeId, projects]);

    return (
        <>
            <div className="flex min-h-screen pt-20 bg-background">

                {/* ── Fixed-height sticky sidebar ─────────────────────────────── */}
                <aside className="hidden md:flex flex-col flex-shrink-0 border-r border-white/5 sticky top-20 self-start"
                    style={{ width: 260, height: "calc(100vh - 80px)" }}>
                    <div className="px-6 pt-8 pb-3 flex-shrink-0">
                        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors group text-xs font-medium">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                    </div>
                    <div className="px-6 pb-2 flex-shrink-0">
                        <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-zinc-600">Categories</p>
                    </div>
                    <div className="flex-1 flex items-center overflow-hidden">
                        <DrumScroller categories={CATEGORIES} activeId={activeId} onChange={setActiveId} />
                    </div>
                    <p className="flex-shrink-0 text-[9px] text-zinc-700 text-center tracking-widest py-5">scroll or drag</p>
                </aside>

                {/* ── Main content ────────────────────────────────────────────── */}
                <main className="flex-1 min-w-0 px-8 lg:px-12 xl:px-16 py-10 pb-28 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-highlight/5 rounded-full blur-3xl translate-y-1/4 pointer-events-none" />

                    {/* mobile pills */}
                    <div className="flex md:hidden flex-wrap gap-2 mb-8">
                        <Link to="/" className="w-full inline-flex items-center gap-1.5 text-zinc-500 hover:text-primary text-xs mb-2"><ArrowLeft className="w-3.5 h-3.5" /> Back</Link>
                        {CATEGORIES.map(cat => (
                            <button key={cat.id} onClick={() => setActiveId(cat.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeId === cat.id ? "bg-primary text-primary-foreground" : "bg-white/5 text-zinc-400 hover:bg-white/10"}`}>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Animated heading */}
                    <AnimatePresence mode="wait">
                        <motion.div key={`h-${activeId}`}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                            className="mb-10 relative z-10"
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.025em" }}>
                                {CATEGORIES.find(c => c.id === activeId)?.label ?? "All Projects"}
                            </h1>
                            <p className="text-zinc-500 text-sm">
                                {isResources
                                    ? `${resources.length} resource${resources.length !== 1 ? "s" : ""} — repos, templates & notes`
                                    : `${displayed.length} project${displayed.length !== 1 ? "s" : ""}`}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Content grid */}
                    <AnimatePresence mode="wait">
                        {isResources ? (
                            <motion.div key="res"
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}
                                className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 relative z-10"
                            >
                                {resources.length
                                    ? resources.map((r, i) => <ResourceCard key={r.id} item={r} idx={i} />)
                                    : <p className="col-span-3 text-zinc-500 text-sm py-12 text-center">No resources added yet.</p>}
                            </motion.div>
                        ) : (
                            <motion.div key={activeId}
                                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}
                                className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10"
                            >
                                {displayed.length
                                    ? displayed.map((p, i) => <ProjectCard key={p.id} project={p} idx={i} onLearnMore={setSelected} />)
                                    : <p className="col-span-3 text-zinc-500 text-sm py-12 text-center">No projects in this category yet.</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelected(null)} />}
        </>
    );
};
