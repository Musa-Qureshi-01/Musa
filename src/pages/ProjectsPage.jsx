import { useState, useMemo, useEffect, useRef } from "react";
import {
    ArrowUpRight, Github, Play, FileText, ExternalLink,
    ArrowLeft, X, ChevronRight, BookOpen, Sparkles, ArrowRight,
    Star, GitFork, Code2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { FadeIn } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { ProjectMediaFrame } from "@/components/ProjectMediaFrame";

// ─── Category Definitions ──────────────────────────────────────────────────
const CATEGORIES = [
    { id: "featured", label: "Featured" },
    { id: "agentic", label: "AI Systems" },
    { id: "mldl", label: "ML / Data" },
    { id: "software", label: "Web / SW Development" },
    { id: "research", label: "Research & Learning" },
];

const AGENTIC_CATS = [
    "Healthcare AI", 
    "Agentic AI & FinTech", 
    "AI Security & Governance", 
    "AI-Native Collaborative Documentation Platform", 
    "AI Tooling & Orchestration",
    "AI-Powered Public Governance",
    "Industrial AI & Enterprise Intelligence"
];

const MLDL_CATS = [
    "Computer Vision & Civic Tech",
    "ML/DL Engineering",
    "AI-Powered Public Governance",
    "Interactive AI Research"
];

const SWE_CATS = [
    "Full-Stack Web", 
    "Frontend & Design"
];

const RESOURCE_STYLES = {
    Github: { border: "border-zinc-500/20", badge: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300", Icon: Github },
    Notion: { border: "border-violet-500/20", badge: "bg-violet-500/10 text-violet-600 dark:text-violet-300", Icon: BookOpen },
    PDF: { border: "border-rose-500/20", badge: "bg-rose-500/10 text-rose-600 dark:text-rose-300", Icon: FileText },
    Medium: { border: "border-[#02b875]/20", badge: "bg-[#02b875]/10 text-[#02b875]", Icon: BookOpen },
    Codeforces: { border: "border-[#f89f1b]/20", badge: "bg-[#f89f1b]/10 text-[#f89f1b]", Icon: Code2 },
};

// ─── Launch Countdown Component ─────────────────────────────────────────────
const LaunchCountdown = ({ isLight, isMini = false }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 12 });

  useEffect(() => {
    const targetDate = new Date("2026-07-15T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  if (isMini) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-2 font-mono relative overflow-hidden bg-[#0c0d0e]/95 text-white select-none">
        <div className="mb-1 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[7px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-zinc-400 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Launching Soon
        </div>
        <div className="flex gap-1 text-[10px] sm:text-xs font-extrabold relative z-10 text-white">
          <span>{formatNumber(timeLeft.days)}d</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.hours)}h</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.minutes)}m</span>
          <span className="text-zinc-500">:</span>
          <span>{formatNumber(timeLeft.seconds)}s</span>
        </div>
        <div className="text-[6px] tracking-[0.12em] mt-1 text-zinc-500 relative z-10 uppercase">
          T-Minus Deployment
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8 font-mono relative overflow-hidden bg-black text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: "url('/assets/launch-soon-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      <div className="mb-3 md:mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-widest uppercase border bg-white/5 border-white/10 text-zinc-300 relative z-10">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Launching Soon
      </div>

      <h4 className="text-[10px] md:text-[12px] font-bold tracking-[0.2em] uppercase mb-4 md:mb-5 text-center text-zinc-400 relative z-10">
        EDITORIAL.IO DEPLOYMENT TIMER
      </h4>

      <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-sm md:max-w-md relative z-10">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINS", value: timeLeft.minutes },
          { label: "SECS", value: timeLeft.seconds },
        ].map((unit, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-14 h-18 md:w-20 md:h-24 rounded-lg md:rounded-xl border flex items-center justify-center text-xl md:text-3xl font-extrabold shadow-lg bg-black/60 border-white/15 text-white backdrop-blur-sm">
              {formatNumber(unit.value)}
            </div>
            <span className="text-[9px] md:text-[10px] font-bold tracking-wider mt-2.5 text-zinc-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[240px] md:max-w-[300px] mt-6 md:mt-8 font-sans relative z-10">
        <div className="flex justify-between items-center text-[9px] md:text-[10px] font-bold text-zinc-400 tracking-wider mb-2">
          <span>PIPELINE BUILD</span>
          <span>92%</span>
        </div>
        <div className="w-full h-1.5 md:h-2 rounded-full overflow-hidden bg-white/10">
          <div 
            className="h-full rounded-full bg-white transition-all duration-500" 
            style={{ width: "92%" }} 
          />
        </div>
      </div>
    </div>
  );
};

// ─── Resource Card Component ────────────────────────────────────────────────
const ResourceCard = ({ item, idx }) => {
    const isGithub = item.type.toLowerCase() === "github";
    const hasLink = item.link && item.link !== "#";
    const Tag = hasLink ? "a" : "div";
    const tagProps = hasLink ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

    // Parse repository name from link
    let defaultOwner = "Musa-Qureshi-01";
    let defaultRepo = item.title.replace(/\s+/g, "-");
    if (hasLink) {
        try {
            const url = new URL(item.link);
            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts.length >= 2) {
                defaultOwner = pathParts[0];
                defaultRepo = pathParts[1];
            }
        } catch (e) {}
    }

    const [stats, setStats] = useState({ 
        stars: null, 
        forks: null, 
        language: "Python",
        owner: defaultOwner,
        repo: defaultRepo
    });

    useEffect(() => {
        if (!isGithub || !item.link || item.link === "#") return;
        try {
            const url = new URL(item.link);
            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts.length >= 2) {
                const owner = pathParts[0];
                const repo = pathParts[1];
                fetch(`https://api.github.com/repos/${owner}/${repo}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.stargazers_count !== undefined) {
                            setStats({
                                stars: data.stargazers_count,
                                forks: data.forks_count,
                                language: data.language || "Python",
                                owner,
                                repo
                            });
                        }
                    })
                    .catch(() => {});
            }
        } catch (e) {}
    }, [isGithub, item.link]);

    if (isGithub) {
        return (
            <FadeIn delay={idx * 0.05}>
                <Tag {...tagProps}
                    className="group relative flex flex-col h-full bg-card border border-border hover:border-border-hover rounded-2xl p-6 transition-all duration-300 hover:shadow-premium-hover cursor-pointer"
                >
                    {/* Repository Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                            <Github className="w-5 h-5 text-secondary-foreground group-hover:text-primary transition-colors duration-300" />
                            <div className="text-xs font-mono tracking-tight text-secondary-foreground leading-none">
                                <span className="opacity-50">{stats.owner}</span>
                                <span className="opacity-40 px-1">/</span>
                                <span className="font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">{stats.repo}</span>
                            </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-secondary-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-secondary-foreground leading-relaxed flex-grow mb-6 font-body">
                        {item.description}
                    </p>

                    {/* Repository Footer Metadata */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                        {/* Language */}
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-secondary-foreground">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5]" />
                            <span>{stats.language}</span>
                        </div>
                        {/* Stars */}
                        <div className="flex items-center gap-1 text-[10px] font-mono text-secondary-foreground">
                            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                            <span>{stats.stars !== null ? stats.stars : "—"}</span>
                        </div>
                        {/* Forks */}
                        <div className="flex items-center gap-1 text-[10px] font-mono text-secondary-foreground">
                            <GitFork className="w-3.5 h-3.5" />
                            <span>{stats.forks !== null ? stats.forks : "—"}</span>
                        </div>
                    </div>
                </Tag>
            </FadeIn>
        );
    }

    // Fallback for non-github resources (Notion, PDF etc.)
    const s = RESOURCE_STYLES[item.type] ?? RESOURCE_STYLES.PDF;
    return (
        <FadeIn delay={idx * 0.05}>
            <Tag {...tagProps}
                className={`group flex flex-col h-full bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:border-border-hover hover:shadow-premium-hover ${hasLink ? "cursor-pointer" : "cursor-default opacity-75"}`}
            >
                <div className="flex items-start justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider uppercase ${s.badge}`}>
                        <s.Icon className="w-3.5 h-3.5" /> {item.type}
                    </span>
                    {hasLink && <ArrowUpRight className="w-3.5 h-3.5 text-secondary-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
                </div>
                <h3 className="text-sm font-bold font-heading text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">{item.title}</h3>
                <p className="text-xs text-secondary-foreground leading-relaxed line-clamp-3 flex-grow mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {item.tags?.map((t, i) => <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-secondary border border-border text-secondary-foreground font-mono">{t}</span>)}
                </div>
                {!hasLink && <p className="text-[9px] text-muted-foreground mt-3 italic">Link coming soon</p>}
            </Tag>
        </FadeIn>
    );
};

// ─── Flagship Project Spread (Editorial Panel) ──────────────────────────────
const FlagshipSpread = ({ project, idx, onLearnMore, isLight }) => {
    const isEven = idx % 2 === 0;
    const projectImage = isLight 
      ? (project.imageLight || project.image) 
      : (project.imageDark || project.image);

    const cardRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
            className="group relative w-full bg-card rounded-[24px] border border-border p-6 md:p-10 lg:p-12 overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-border-hover transition-all duration-500"
        >
            {/* Spotlight reflection sheen */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, ${
                        isLight ? "rgba(9, 9, 9, 0.02)" : "rgba(255, 255, 255, 0.04)"
                    }, transparent 80%)`
                }}
            />

            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* Image bezel column */}
                <div className={`w-full lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative group/mockup overflow-hidden rounded-[16px]">
                        <div className={`relative aspect-[16/10] rounded-[18px] p-1 border transition-all duration-500 shadow-xl
                            ${isLight 
                                ? "bg-zinc-900 border-zinc-950" 
                                : "bg-zinc-100 border-zinc-200/60"
                            }`}
                        >
                            <div className={`relative w-full h-full overflow-hidden rounded-[12px] border transition-all duration-500
                                ${isLight 
                                    ? "bg-black border-zinc-800" 
                                    : "bg-white border-zinc-300"
                                }`}
                            >
                                {project.isComingSoon ? (
                                    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden select-none">
                                        {/* Main Background Image - Launch Soon Banner */}
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center opacity-90"
                                            style={{ backgroundImage: "url('/assets/launch-soon-bg.png')" }}
                                        />
                                        {/* Dark subtle overlay vignette */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 pointer-events-none" />

                                        {/* Overlaid Corner Timer (compact tactical widget) */}
                                        <div className="absolute bottom-3 right-3 w-[38%] h-[32%] max-w-[145px] max-h-[85px] bg-[#0c0d0e]/95 rounded-xl border border-white/10 shadow-2xl opacity-90 hover:opacity-100 transition-all duration-300 overflow-hidden z-20">
                                            <LaunchCountdown isLight={isLight} isMini={true} />
                                        </div>
                                    </div>
                                ) : (
                                    <ProjectMediaFrame 
                                        project={project} 
                                        projectImage={projectImage} 
                                        isLight={isLight} 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Typography content column */}
                <div className={`w-full lg:col-span-5 flex flex-col justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-primary uppercase font-bold mb-3.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                        Flagship Platform
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tracking-tight mb-4">
                        {project.title}
                    </h2>
                    <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed mb-6 font-body">
                        {project.description}
                    </p>
                    
                    {project.highlights && (
                        <ul className="space-y-3 mb-8">
                            {project.highlights.slice(0, 3).map((h, i) => (
                                <li key={i} className="text-xs text-secondary-foreground flex items-start gap-2.5 leading-relaxed font-body">
                                    <span className="text-muted-foreground mt-0.5 font-semibold font-mono">—</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex items-center gap-5">
                        <Button variant="primary" onClick={() => onLearnMore(project)} className="text-xs uppercase tracking-wider">
                            Explore Product <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        {project.link && project.link !== "#" && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-secondary-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors">
                                Launch Site <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Supporting Project Card ────────────────────────────────────────────────
const SupportingCard = ({ project, idx, onLearnMore, isLight }) => {
    const isGithubCard = project.isGithubCard;
    const projectImage = isLight 
      ? (project.imageLight || project.image) 
      : (project.imageDark || project.image);

    // Parse owner and repo name from link
    let defaultOwner = "Musa-Qureshi-01";
    let defaultRepo = project.title.replace(/\s+/g, "-");
    if (project.github && project.github !== "#") {
        try {
            const url = new URL(project.github);
            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts.length >= 2) {
                defaultOwner = pathParts[0];
                defaultRepo = pathParts[1];
            }
        } catch (e) {}
    }

    const [stats, setStats] = useState({ 
        stars: null, 
        forks: null, 
        language: "Python",
        owner: defaultOwner,
        repo: defaultRepo
    });

    useEffect(() => {
        if (!isGithubCard || !project.github || project.github === "#") return;
        try {
            const url = new URL(project.github);
            const pathParts = url.pathname.split("/").filter(Boolean);
            if (pathParts.length >= 2) {
                const owner = pathParts[0];
                const repo = pathParts[1];
                fetch(`https://api.github.com/repos/${owner}/${repo}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data && data.stargazers_count !== undefined) {
                            setStats({
                                stars: data.stargazers_count,
                                forks: data.forks_count,
                                language: data.language || "Python",
                                owner,
                                repo
                            });
                        }
                    })
                    .catch(() => {});
            }
        } catch (e) {}
    }, [isGithubCard, project.github]);

    const cardRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    if (isGithubCard) {
        return (
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                className="group relative bg-card rounded-2xl border border-border p-6 flex flex-col justify-between overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-border-hover transition-all duration-500 h-full cursor-pointer"
                onClick={() => {
                    if (project.github && project.github !== "#") {
                        window.open(project.github, "_blank", "noopener,noreferrer");
                    }
                }}
            >
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${
                            isLight ? "rgba(9, 9, 9, 0.015)" : "rgba(255, 255, 255, 0.03)"
                        }, transparent 80%)`
                    }}
                />

                <div className="relative z-10 flex flex-col h-full gap-4">
                    {/* Repository Header */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Github className="w-5 h-5 text-secondary-foreground group-hover:text-primary transition-colors duration-300" />
                            <div className="text-xs font-mono tracking-tight text-secondary-foreground leading-none">
                                <span className="opacity-50">{stats.owner}</span>
                                <span className="opacity-40 px-1">/</span>
                                <span className="font-extrabold text-foreground group-hover:text-primary transition-colors duration-300">{stats.repo}</span>
                            </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-secondary-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    {/* Description */}
                    <p className="text-xs text-secondary-foreground leading-relaxed flex-grow font-body">
                        {project.description}
                    </p>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-4">
                            {/* Language */}
                            <div className="flex items-center gap-1.5 text-[10px] font-mono text-secondary-foreground">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5]" />
                                <span>{stats.language}</span>
                            </div>
                            {/* Stars */}
                            <div className="flex items-center gap-1 text-[10px] font-mono text-secondary-foreground">
                                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                                <span>{stats.stars !== null ? stats.stars : "—"}</span>
                            </div>
                            {/* Forks */}
                            <div className="flex items-center gap-1 text-[10px] font-mono text-secondary-foreground">
                                <GitFork className="w-3.5 h-3.5" />
                                <span>{stats.forks !== null ? stats.forks : "—"}</span>
                            </div>
                        </div>
                        
                        {/* Explore CTA */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onLearnMore(project);
                            }}
                            className="text-xs font-semibold text-secondary-foreground hover:text-primary flex items-center gap-1 transition-colors group/btn z-20"
                        >
                            Explore <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
            className="group relative bg-card rounded-2xl border border-border p-5 flex flex-col justify-between overflow-hidden shadow-premium hover:shadow-premium-hover hover:border-border-hover transition-all duration-500 h-full"
        >
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${
                        isLight ? "rgba(9, 9, 9, 0.015)" : "rgba(255, 255, 255, 0.03)"
                    }, transparent 80%)`
                }}
            />

            <div className="relative z-10 flex flex-col h-full gap-4">
                {projectImage && (
                    <div className="w-full p-4 border-b border-border bg-secondary/15 rounded-xl shrink-0 flex items-center justify-center relative overflow-hidden">
                        <div className={`relative w-full aspect-[16/10] rounded-xl p-0.5 border transition-all duration-500 shadow-md
                            ${isLight ? "bg-zinc-900 border-zinc-950" : "bg-zinc-100 border-zinc-200/60"}`}
                        >
                            <div className={`relative w-full h-full overflow-hidden rounded-[10px] border transition-all duration-500
                                ${isLight ? "bg-black border-zinc-800" : "bg-white border-zinc-300"}`}
                            >
                                {project.isComingSoon ? (
                                    <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden select-none">
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center opacity-90"
                                            style={{ backgroundImage: `url('${projectImage}')` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 pointer-events-none" />
                                        <div className="absolute bottom-2 right-2 w-[45%] h-[38%] max-w-[120px] max-h-[70px] bg-[#0c0d0e]/95 rounded-lg border border-white/10 shadow-2xl opacity-90 transition-all duration-300 overflow-hidden z-20">
                                            <LaunchCountdown isLight={isLight} isMini={true} />
                                        </div>
                                    </div>
                                ) : (
                                    <img 
                                        src={projectImage} 
                                        alt={project.title} 
                                        className="w-full h-full object-contain bg-transparent transition-transform duration-700 group-hover:scale-[1.03]" 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col flex-grow justify-between">
                    <div>
                        <div className="mb-2">
                            <span className="inline-block px-2 py-0.5 bg-secondary text-secondary-foreground text-[8px] font-bold tracking-wider uppercase rounded border border-border">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground font-heading group-hover:text-primary transition-colors leading-tight mb-2">
                            {project.title}
                        </h3>
                        <p className="text-xs text-secondary-foreground leading-relaxed mb-4 font-body line-clamp-2">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                        <button onClick={() => onLearnMore(project)} className="text-xs font-semibold text-secondary-foreground hover:text-primary flex items-center gap-1 transition-colors group/btn">
                            Explore <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                        <div className="flex gap-1">
                            {project.link && project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-transparent hover:border-border hover:bg-secondary text-secondary-foreground hover:text-primary transition-all duration-300">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {project.github && project.github !== "#" && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-transparent hover:border-border hover:bg-secondary text-secondary-foreground hover:text-foreground transition-all duration-300">
                                    <Github className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Learn-More Modal ───────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose, isLight }) => {
    const projectImage = isLight 
      ? (project.imageLight || project.image) 
      : (project.imageDark || project.image);
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
                    className="relative w-full max-w-3xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[88vh] flex flex-col"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-secondary/80 hover:bg-secondary rounded-full text-secondary-foreground hover:text-foreground border border-border transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                    <div className="overflow-y-auto flex-grow">
                        {project.isComingSoon ? (
                            <div className="w-full p-6 sm:p-8 bg-zinc-900/40 border-b border-white/5 flex items-center justify-center shrink-0">
                                <div className={`relative w-full max-w-[480px] aspect-[16/10] rounded-[18px] p-1 border transition-all duration-500 shadow-lg
                                    ${isLight 
                                        ? "bg-zinc-900 border-zinc-950" 
                                        : "bg-zinc-100 border-zinc-200/60"
                                    }`}
                                >
                                    <div className={`relative w-full h-full overflow-hidden rounded-[12px] border transition-all duration-500
                                        ${isLight 
                                            ? "bg-black border-zinc-800" 
                                            : "bg-white border-zinc-300"
                                        }`}
                                    >
                                        <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center overflow-hidden select-none">
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center opacity-90"
                                                style={{ backgroundImage: "url('/assets/launch-soon-bg.png')" }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30 pointer-events-none" />

                                            <div className="absolute bottom-3 right-3 w-[38%] h-[32%] max-w-[145px] max-h-[85px] bg-[#0c0d0e]/95 rounded-xl border border-white/10 shadow-2xl opacity-60 hover:opacity-100 transition-all duration-300 overflow-hidden z-20">
                                                <LaunchCountdown isLight={isLight} isMini={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : projectImage ? (
                            <div className="w-full p-6 sm:p-8 bg-zinc-900/40 border-b border-white/5 flex items-center justify-center shrink-0">
                                <div className={`relative w-full max-w-[480px] aspect-[16/10] rounded-[18px] p-1 border transition-all duration-500 shadow-lg
                                    ${isLight 
                                        ? "bg-zinc-900 border-zinc-950" 
                                        : "bg-zinc-100 border-zinc-200/60"
                                    }`}
                                >
                                    <div className={`relative w-full h-full overflow-hidden rounded-[12px] border transition-all duration-500
                                        ${isLight 
                                            ? "bg-black border-zinc-800" 
                                            : "bg-white border-zinc-300"
                                        }`}
                                    >
                                        <img 
                                            src={projectImage} 
                                            alt={project.title} 
                                            className="w-full h-full object-contain bg-transparent" 
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-28 bg-gradient-to-br from-primary/5 via-secondary to-background border-b border-border flex items-center px-8">
                            </div>
                        )}
                        <div className="p-6 sm:p-8 lg:p-10">
                            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{project.category}</p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground mb-4">{project.title}</h2>
                            <p className="text-secondary-foreground leading-relaxed text-sm sm:text-base mb-6">{project.description}</p>
                            
                            {project.problem && (
                                <div className="mb-6 pl-4 border-l-2 border-red-500/40">
                                    <p className="text-foreground text-sm font-semibold mb-2 font-mono uppercase tracking-wider text-[11px] text-zinc-400">The Problem</p>
                                    <p className="text-secondary-foreground text-sm leading-relaxed font-body">{project.problem}</p>
                                </div>
                            )}
                            
                            {project.solution && (
                                <div className="mb-8 pl-4 border-l-2 border-emerald-500/40">
                                    <p className="text-foreground text-sm font-semibold mb-2 font-mono uppercase tracking-wider text-[11px] text-zinc-400">The Solution</p>
                                    <p className="text-secondary-foreground text-sm leading-relaxed font-body">{project.solution}</p>
                                </div>
                            )}

                            {project.highlights?.length > 0 && (
                                <div className="mb-8 pl-4 border-l-2 border-primary/40">
                                    <p className="text-foreground text-sm font-semibold mb-3">Key Highlights</p>
                                    <ul className="space-y-2">
                                        {project.highlights.map((h, i) => (
                                            <li key={i} className="text-secondary-foreground text-sm leading-relaxed flex gap-2">
                                                <ChevronRight className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />{h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {project.services && (
                                <div className="mb-8">
                                    <p className="text-foreground text-sm font-semibold mb-3">Core Services</p>
                                    <div className="border border-border rounded-2xl overflow-hidden bg-secondary/15">
                                        <table className="w-full text-left border-collapse text-xs font-body">
                                            <thead>
                                                <tr className="border-b border-border bg-secondary/40 font-mono text-[9px] uppercase tracking-wider text-secondary-foreground">
                                                    <th className="p-3 font-bold">Service</th>
                                                    <th className="p-3 font-bold">Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.services.map((srv, idx) => (
                                                    <tr key={idx} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                                                        <td className="p-3 font-semibold text-foreground whitespace-nowrap">{srv.name}</td>
                                                        <td className="p-3 text-secondary-foreground">{srv.desc}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            <div className="mb-8">
                                <p className="text-foreground text-sm font-semibold mb-3">Tech Stack</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs px-3 py-1.5 rounded-lg bg-secondary border border-border text-secondary-foreground font-mono">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border">
                                {project.link && project.link !== "#" && (
                                    <Button as="a" href={project.link} target="_blank" rel="noopener noreferrer" variant="primary" className="text-xs uppercase tracking-wider">
                                        Live Demo <ExternalLink className="w-4 h-4" />
                                    </Button>
                                )}
                                {project.github && project.github !== "#" && (
                                    <Button as="a" href={project.github} target="_blank" rel="noopener noreferrer" variant="outline" className="text-xs uppercase tracking-wider">
                                        GitHub <Github className="w-4 h-4" />
                                    </Button>
                                )}
                                {project.video && (
                                    <Button as="a" href={project.video} target="_blank" rel="noopener noreferrer" variant="outline" className="text-xs uppercase tracking-wider text-blue-500 border-blue-500/20 hover:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400/20 dark:hover:bg-blue-400/10">
                                        Demo Video <Play className="w-4 h-4" />
                                    </Button>
                                )}
                                {project.article && (
                                    <Button as="a" href={project.article} target="_blank" rel="noopener noreferrer" variant="outline" className="text-xs uppercase tracking-wider text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-400/20 dark:hover:bg-emerald-400/10">
                                        Article <FileText className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// ─── Premium Segmented Chips Navigation ──────────────────────────────────
const SegmentedChips = ({ activeId, onChange, isLight }) => {
    return (
        <div className="flex items-center gap-1 p-1 bg-secondary/90 border border-border/80 rounded-full max-w-full overflow-x-auto scrollbar-none shadow-premium-sm">
            {CATEGORIES.map((cat) => {
                const isActive = cat.id === activeId;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        className={`relative px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap outline-none
                            ${isActive 
                                ? "text-primary-foreground font-black scale-[1.03]" 
                                : "text-secondary-foreground hover:text-foreground font-semibold"
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeCategoryChip"
                                className="absolute inset-0 bg-primary rounded-full z-0"
                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                            />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

// ─── Main Projects Page Component ──────────────────────────────────────────
export const ProjectsPage = () => {
    const { projects, resources = [] } = portfolioData;
    const [activeId, setActiveId] = useState("featured");
    const [selectedProject, setSelected] = useState(null);
    const [isLight, setIsLight] = useState(false);
    const isScrollingRef = useRef(false);

    useEffect(() => {
        setIsLight(document.documentElement.classList.contains("light"));
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.classList.contains("light"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Categorized lists
    const featuredProjects = useMemo(() => projects.filter(p => p.title === "GovernanceAI" || p.title === "ATHLEIA.AI"), [projects]);
    const agenticProjects = useMemo(() => projects.filter(p => AGENTIC_CATS.includes(p.category) && !featuredProjects.some(f => f.id === p.id)), [projects, featuredProjects]);
    const mldlProjects = useMemo(() => projects.filter(p => MLDL_CATS.includes(p.category) && !featuredProjects.some(f => f.id === p.id)), [projects, featuredProjects]);
    const sweProjects = useMemo(() => projects.filter(p => SWE_CATS.includes(p.category)), [projects]);

    // Intersection observers connecting scroll targets back to selector active pills
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -55% 0px",
            threshold: 0.05
        };

        const observerCallback = (entries) => {
            if (isScrollingRef.current) return;
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        CATEGORIES.forEach((cat) => {
            const el = document.getElementById(cat.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [projects]);

    const handleChipChange = (catId) => {
        setActiveId(catId);
        isScrollingRef.current = true;
        const el = document.getElementById(catId);
        if (el) {
            const headerOffset = 150;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 850);
        }
    };

    return (
        <>
            <div className="min-h-screen pt-28 pb-36 bg-background text-foreground transition-colors duration-500">
                
                {/* ── Editorial Header Spread ────────────────────────────────── */}
                <header className="container-responsive max-w-6xl mx-auto px-6 mb-10 text-center md:text-left">
                    <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground hover:text-primary transition-all group text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <div className="max-w-3xl mt-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 border border-primary/20 text-primary mb-5">
                            Product Gallery
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading tracking-tight text-foreground mb-4 leading-none">
                            Crafting production AI systems.
                        </h1>
                        <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed font-body max-w-2xl">
                            A curated gallery of platforms, systems, and research engineered to combine planning orchestration, retrieval-augmented intelligence, and enterprise integrations.
                        </p>
                    </div>
                </header>

                {/* ── Sticky segmented chip selector pinned under header ── */}
                <div className="sticky top-20 z-40 w-full flex justify-center py-4 bg-background/80 backdrop-blur-md border-b border-border/30 mb-12 px-6 transition-colors duration-500">
                    <SegmentedChips 
                        activeId={activeId} 
                        onChange={handleChipChange} 
                        isLight={isLight} 
                    />
                </div>

                {/* ── Product Exploration Content continuous sections flow ───── */}
                <main className="container-responsive max-w-6xl mx-auto px-6 space-y-24 md:space-y-36">
                    
                    {/* 1. Featured Section */}
                    <section id="featured" className="scroll-mt-48 space-y-12 md:space-y-16">
                        <div className="border-b border-border pb-4 flex justify-between items-end">
                            <h2 className="font-heading text-lg font-black uppercase tracking-[0.2em] text-foreground">Featured Products</h2>
                            <span className="text-[10px] font-mono text-secondary-foreground">{featuredProjects.length} systems</span>
                        </div>
                        {featuredProjects.map((p, i) => (
                            <FlagshipSpread 
                                key={p.id} 
                                project={p} 
                                idx={i} 
                                onLearnMore={setSelected} 
                                isLight={isLight} 
                            />
                        ))}
                    </section>

                    {/* 2. AI Systems Section */}
                    <section id="agentic" className="scroll-mt-48 space-y-12">
                        <div className="border-b border-border pb-4 flex justify-between items-end">
                            <h2 className="font-heading text-lg font-black uppercase tracking-[0.2em] text-foreground">AI Systems</h2>
                            <span className="text-[10px] font-mono text-secondary-foreground">{agenticProjects.length} systems</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {agenticProjects.map((p, i) => (
                                <SupportingCard 
                                    key={p.id} 
                                    project={p} 
                                    idx={i} 
                                    onLearnMore={setSelected} 
                                    isLight={isLight} 
                                />
                            ))}
                        </div>
                    </section>

                    {/* 3. Machine Learning Section */}
                    <section id="mldl" className="scroll-mt-48 space-y-12">
                        <div className="border-b border-border pb-4 flex justify-between items-end">
                            <h2 className="font-heading text-lg font-black uppercase tracking-[0.2em] text-foreground">ML / Data</h2>
                            <span className="text-[10px] font-mono text-secondary-foreground">{mldlProjects.length} systems</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {mldlProjects.map((p, i) => (
                                <SupportingCard 
                                    key={p.id} 
                                    project={p} 
                                    idx={i} 
                                    onLearnMore={setSelected} 
                                    isLight={isLight} 
                                />
                            ))}
                        </div>
                    </section>

                    {/* 4. Software Engineering Section */}
                    <section id="software" className="scroll-mt-48 space-y-12">
                        <div className="border-b border-border pb-4 flex justify-between items-end">
                            <h2 className="font-heading text-lg font-black uppercase tracking-[0.2em] text-foreground">Web / SW Development</h2>
                            <span className="text-[10px] font-mono text-secondary-foreground">{sweProjects.length} systems</span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {sweProjects.map((p, i) => (
                                <SupportingCard 
                                    key={p.id} 
                                    project={p} 
                                    idx={i} 
                                    onLearnMore={setSelected} 
                                    isLight={isLight} 
                                />
                            ))}
                        </div>
                    </section>

                    {/* 5. Research & Learning Section */}
                    <section id="research" className="scroll-mt-48 space-y-12">
                        <div className="border-b border-border pb-4 flex justify-between items-end">
                            <h2 className="font-heading text-lg font-black uppercase tracking-[0.2em] text-foreground">Research & Learning</h2>
                            <span className="text-[10px] font-mono text-secondary-foreground">{resources.length} items</span>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resources.map((r, i) => (
                                <ResourceCard 
                                    key={r.id} 
                                    item={r} 
                                    idx={i} 
                                />
                            ))}
                        </div>
                    </section>

                </main>

            </div>

            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelected(null)} 
                    isLight={isLight} 
                />
            )}
        </>
    );
};
