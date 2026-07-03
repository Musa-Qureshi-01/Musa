import { useState, useEffect, useRef } from "react";
import { Github, Code2, GitFork, Star, CalendarDays, Trophy, TrendingUp, Swords } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { GitHubCalendar } from 'react-github-calendar';

import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";
import { FadeIn } from "@/components/Reveal";

// ── Animated counter ──────────────────────────────────────────────
const AnimatedNumber = ({ value, loading, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { duration: 1400, bounce: 0 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (isInView && !loading && value > 0) motionVal.set(value);
    }, [isInView, loading, value, motionVal]);

    useEffect(() => spring.on("change", (v) => setDisplay(Math.floor(v))), [spring]);

    return <span ref={ref}>{loading ? "—" : display.toLocaleString()}{suffix}</span>;
};


// ── Difficulty bar ────────────────────────────────────────────────
const DiffBar = ({ label, solved, total, color, beats, loading, delay = 0 }) => {
    const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (
        <div ref={ref}>
            <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${color}`}>{label}</span>
                <span className="text-xs text-zinc-500 font-mono">
                    {loading ? "—" : solved}
                    <span className="text-zinc-700">/{total}</span>
                    <span className="text-zinc-600 ml-1.5">Beats {loading ? "—" : beats}%</span>
                </span>
            </div>
            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color.replace("text-", "bg-")}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }}
                />
            </div>
        </div>
    );
};

// ── Codeforces Rank Colors ─────────────────────────────────────────
const getCfColor = (rating) => {
    if (rating === 0) return { text: "text-zinc-500", stroke: "stroke-zinc-500", border: "border-zinc-500/20" };
    if (rating < 1200) return { text: "text-zinc-400", stroke: "stroke-zinc-400/80", border: "border-zinc-500/20" }; // Newbie
    if (rating < 1400) return { text: "text-emerald-400", stroke: "stroke-emerald-400", border: "border-emerald-500/20" }; // Pupil
    if (rating < 1600) return { text: "text-cyan-400", stroke: "stroke-cyan-400", border: "border-cyan-500/20" }; // Specialist
    if (rating < 1900) return { text: "text-blue-400", stroke: "stroke-blue-400", border: "border-blue-500/20" }; // Expert
    if (rating < 2100) return { text: "text-purple-400", stroke: "stroke-purple-400", border: "border-purple-500/20" }; // Candidate Master
    if (rating < 2300) return { text: "text-orange-400", stroke: "stroke-orange-400", border: "border-orange-500/20" }; // Master
    return { text: "text-red-500", stroke: "stroke-red-500", border: "border-red-500/20" }; // Grandmaster
};

// Helper to capitalize rank name
const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

// ── Main component ────────────────────────────────────────────────
export const Stats = () => {
    const [githubStats, setGithubStats] = useState({ followers: 0, public_repos: 0 });
    const [leetcodeStats, setLeetcodeStats] = useState({
        solvedCount: 0, totalQuestions: 3846,
        easy: 0, totalEasy: 927, easyBeats: 0,
        medium: 0, totalMedium: 2010, mediumBeats: 0,
        hard: 0, totalHard: 909, hardBeats: 0,
        activeDays: 0, submissionCalendar: "{}",
    });
    const [codeforcesStats, setCodeforcesStats] = useState({
        rating: 0,
        maxRating: 0,
        rank: "Unrated",
        maxRank: "None",
    });
    const [loading, setLoading] = useState(true);

    const [isLight, setIsLight] = useState(() => document.documentElement.classList.contains("light"));

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsLight(document.documentElement.classList.contains("light"));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => observer.disconnect();
    }, []);

    const githubUsername = portfolioData.personalInfo.socials.github.split("/").filter(Boolean).pop();
    const leetcodeUsername = portfolioData.personalInfo.socials.leetcode.split("/").filter(Boolean).pop();
    const codeforcesUsername = portfolioData.personalInfo.socials.codeforces 
        ? portfolioData.personalInfo.socials.codeforces.split("/").filter(Boolean).pop() 
        : "Musa06";

    useEffect(() => {
        const fetch_ = async () => {
            try {
                const [ghRes, lcProfileRes, lcSolvedRes, lcCalRes, cfRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${githubUsername}`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/calendar`),
                    fetch(`https://codeforces.com/api/user.info?handles=${codeforcesUsername}`),
                ]);
                if (ghRes.ok) {
                    const d = await ghRes.json().catch(() => ({}));
                    setGithubStats({ followers: d.followers || 0, public_repos: d.public_repos || 0 });
                }
                const lcProfile = lcProfileRes.ok ? await lcProfileRes.json().catch(() => ({})) : {};
                const lcSolved = lcSolvedRes.ok ? await lcSolvedRes.json().catch(() => ({})) : {};
                const lcCal = lcCalRes.ok ? await lcCalRes.json().catch(() => ({})) : {};
                setLeetcodeStats({
                    solvedCount: lcSolved.solvedProblem || lcProfile.totalSolved || 0,
                    totalQuestions: lcProfile.totalQuestions || 3846,
                    easy: lcSolved.easySolved || 0,
                    totalEasy: lcProfile.totalEasy || 927,
                    easyBeats: Math.round(lcProfile.easyBeatsPercent || 0),
                    medium: lcSolved.mediumSolved || 0,
                    totalMedium: lcProfile.totalMedium || 2010,
                    mediumBeats: Math.round(lcProfile.mediumBeatsPercent || 0),
                    hard: lcSolved.hardSolved || 0,
                    totalHard: lcProfile.totalHard || 909,
                    hardBeats: Math.round(lcProfile.hardBeatsPercent || 0),
                    activeDays: lcCal.totalActiveDays || 0,
                    submissionCalendar: lcCal.submissionCalendar || "{}",
                });
                if (cfRes.ok) {
                    const cfData = await cfRes.json().catch(() => ({}));
                    if (cfData.status === "OK" && cfData.result && cfData.result[0]) {
                        const user = cfData.result[0];
                        setCodeforcesStats({
                            rating: user.rating || 0,
                            maxRating: user.maxRating || 0,
                            rank: user.rank || "Unrated",
                            maxRank: user.maxRank || "None",
                        });
                    }
                }
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetch_();
    }, [githubUsername, leetcodeUsername, codeforcesUsername]);


    const solvedPct = leetcodeStats.totalQuestions > 0
        ? (leetcodeStats.solvedCount / leetcodeStats.totalQuestions) * 100 : 0;
    const circumference = 2 * Math.PI * 32;

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden hidden md:block bg-background-alt border-t border-border/20">
            <div className="container-responsive relative z-10 mx-auto">

                {/* ── Section heading — same pattern as all sections ── */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <ScrollReveal>
                        <span className="text-zinc-500 text-sm font-medium tracking-wider uppercase font-mono">
                            Developer Metrics
                        </span>
                    </ScrollReveal>
                    <div className="mt-3 mb-4">
                        <LetterReveal
                            text="Code & Profile Statistics."
                            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-heading"
                        />
                    </div>
                    <FadeIn delay={0.15}>
                        <span className="inline-flex items-center gap-1.5 text-[10px] text-foreground font-mono font-bold tracking-wider uppercase border border-border px-3 py-1 rounded-full bg-card">
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                            Live Data
                        </span>
                    </FadeIn>
                </div>

                {/* ── Three cards side-by-side on desktop ── */}
                <motion.div
                    className="grid md:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >

                    {/* ═══ GitHub Record ═══════════════════════════════════════ */}
                    <div className="bg-card rounded-2xl border border-border shadow-premium hover:shadow-premium-hover p-6 flex flex-col gap-5 hover:border-border-hover transition-all duration-300">

                        {/* Identity row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
                                    <Github className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">GitHub</p>
                                    <a href={portfolioData.personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
                                        className="text-[11px] text-secondary-foreground hover:text-foreground transition-colors">
                                        @{githubUsername}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-secondary-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                            </div>
                        </div>

                        {/* Key numbers */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                                <div className="flex items-center gap-1.5 text-secondary-foreground text-[10px] uppercase tracking-wider mb-1.5">
                                    <GitFork className="w-3 h-3" /> Repositories
                                </div>
                                <p className="text-2xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={githubStats.public_repos} loading={loading} />
                                </p>
                            </div>
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40">
                                <div className="flex items-center gap-1.5 text-secondary-foreground text-[10px] uppercase tracking-wider mb-1.5">
                                    <Star className="w-3 h-3" /> Followers
                                </div>
                                <p className="text-2xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={githubStats.followers} loading={loading} />
                                </p>
                            </div>
                        </div>

                        {/* Contribution heatmap — full, readable */}
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-secondary-foreground mb-3">Contribution Activity</p>
                            <div className="overflow-x-auto pb-1 custom-scrollbar">
                                <GitHubCalendar
                                    username={githubUsername}
                                    colorScheme={isLight ? "light" : "dark"}
                                    theme={isLight ? {
                                        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                        dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                                    } : {
                                        light: ['#1a2228', '#1c493d', '#1e6c4e', '#20905f', '#22b470'],
                                        dark: ['#1a2228', '#1c493d', '#1e6c4e', '#20905f', '#22b470'],
                                    }}
                                    blockSize={10}
                                    blockMargin={3}
                                    fontSize={11}
                                    hideColorLegend={false}
                                    showWeekdayLabels
                                />
                            </div>
                        </div>
                    </div>

                    {/* ═══ LeetCode Record ══════════════════════════════════════ */}
                    <div className="bg-card rounded-2xl border border-border shadow-premium hover:shadow-premium-hover p-6 flex flex-col gap-5 hover:border-border-hover transition-all duration-300">

                        {/* Identity row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
                                    <Code2 className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">LeetCode</p>
                                    <a href={portfolioData.personalInfo.socials.leetcode} target="_blank" rel="noopener noreferrer"
                                        className="text-[11px] text-secondary-foreground hover:text-amber-500 transition-colors">
                                        @{leetcodeUsername}
                                    </a>
                                </div>
                            </div>
                            <div className="text-[10px] text-secondary-foreground flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                <AnimatedNumber value={leetcodeStats.activeDays} loading={loading} suffix=" days active" />
                            </div>
                        </div>

                        {/* Solved count + ring */}
                        <div className="flex items-center gap-6">
                            {/* Circular SVG */}
                            <div className="relative flex-shrink-0 w-[80px] h-[80px]">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="32" className="stroke-muted fill-none" strokeWidth="5" />
                                    <motion.circle
                                        cx="40" cy="40" r="32"
                                        className="stroke-amber-500 fill-none"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        initial={{ strokeDashoffset: circumference }}
                                        animate={isInView && !loading
                                            ? { strokeDashoffset: circumference * (1 - solvedPct / 100) }
                                            : {}}
                                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-base font-bold font-mono text-foreground leading-none">
                                        <AnimatedNumber value={leetcodeStats.solvedCount} loading={loading} />
                                    </span>
                                    <span className="text-[9px] text-secondary-foreground mt-0.5 uppercase tracking-wider font-semibold">Solved</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="text-xs text-secondary-foreground mb-1">
                                    <span className="text-foreground font-semibold font-mono">
                                        {loading ? "—" : Math.round(solvedPct)}%
                                    </span>{" "}
                                    of {leetcodeStats.totalQuestions.toLocaleString()} problems
                                </p>
                                <p className="text-[11px] text-zinc-500 leading-snug">Practice consistency across difficulty tiers</p>
                            </div>
                        </div>

                        {/* Difficulty breakdown */}
                        <div className="space-y-3.5">
                            <DiffBar label="Easy" color="text-emerald-500"
                                solved={leetcodeStats.easy} total={leetcodeStats.totalEasy}
                                beats={leetcodeStats.easyBeats} loading={loading} delay={0.3} />
                            <DiffBar label="Medium" color="text-amber-500"
                                solved={leetcodeStats.medium} total={leetcodeStats.totalMedium}
                                beats={leetcodeStats.mediumBeats} loading={loading} delay={0.45} />
                            <DiffBar label="Hard" color="text-rose-500"
                                solved={leetcodeStats.hard} total={leetcodeStats.totalHard}
                                beats={leetcodeStats.hardBeats} loading={loading} delay={0.6} />
                        </div>

                        {/* Summary footer */}
                        <div className="pt-3 border-t border-border/40 grid grid-cols-2 gap-3 mt-auto">
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40 text-center">
                                <p className="text-xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={leetcodeStats.solvedCount} loading={loading} />
                                </p>
                                <p className="text-[10px] text-secondary-foreground mt-0.5 uppercase tracking-wider">Total Solved</p>
                            </div>
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40 text-center">
                                <p className="text-xl font-bold font-mono text-amber-500">
                                    {loading ? "—" : `${Math.round(solvedPct)}%`}
                                </p>
                                <p className="text-[10px] text-secondary-foreground mt-0.5 uppercase tracking-wider">Completion</p>
                            </div>
                        </div>
                    </div>
                    {/* ═══ Codeforces Card ═══════════════════════════════════ */}
                    <div className="bg-card rounded-2xl border border-border shadow-premium hover:shadow-premium-hover p-6 flex flex-col gap-5 hover:border-border-hover transition-all duration-300 group/cf">

                        {/* Identity row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center border border-border/50">
                                    <Swords className={`w-5 h-5 ${getCfColor(codeforcesStats.rating).text}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">Codeforces</p>
                                    <a href={portfolioData.personalInfo.socials.codeforces || "https://codeforces.com/profile/Musa06"} target="_blank" rel="noopener noreferrer"
                                        className="text-[11px] text-secondary-foreground hover:text-foreground transition-colors">
                                        @{codeforcesUsername}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-emerald-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                            </div>
                        </div>

                        {/* Rating ring */}
                        <div className="flex flex-col items-center justify-center gap-2 py-4">
                            <div className="relative w-[80px] h-[80px] flex items-center justify-center">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="32" className="stroke-muted fill-none" strokeWidth="5" />
                                    <motion.circle
                                        cx="40" cy="40" r="32"
                                        className={`fill-none ${getCfColor(codeforcesStats.rating).stroke}`}
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        initial={{ strokeDashoffset: circumference }}
                                        animate={isInView && !loading
                                            ? { strokeDashoffset: circumference * (1 - Math.min(codeforcesStats.rating / 3000, 1)) }
                                            : {}}
                                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                                    />
                                </svg>
                                <div className="flex flex-col items-center justify-center z-10">
                                    <span className="text-base font-bold font-mono text-foreground leading-none">
                                        <AnimatedNumber value={codeforcesStats.rating} loading={loading} />
                                    </span>
                                    <span className="text-[9px] text-secondary-foreground mt-0.5 uppercase tracking-wider font-semibold">Rating</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-secondary-foreground text-center">
                                {capitalize(codeforcesStats.rank)} · Competitive programming
                            </p>
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40 text-center">
                                <div className="flex items-center justify-center gap-1 text-secondary-foreground text-[10px] uppercase tracking-wider mb-1.5">
                                    <Trophy className="w-3 h-3 text-secondary-foreground/60" /> Rank
                                </div>
                                <p className={`text-sm font-bold font-mono ${getCfColor(codeforcesStats.rating).text}`}>
                                    {capitalize(codeforcesStats.rank)}
                                </p>
                            </div>
                            <div className="bg-secondary/40 rounded-xl p-3 border border-border/40 text-center">
                                <div className="flex items-center justify-center gap-1 text-secondary-foreground text-[10px] uppercase tracking-wider mb-1.5">
                                    <TrendingUp className="w-3 h-3 text-secondary-foreground/60" /> Max Rating
                                </div>
                                <p className="text-base font-bold font-mono text-foreground">
                                    <AnimatedNumber value={codeforcesStats.maxRating} loading={loading} />
                                </p>
                            </div>
                        </div>

                        {/* Divider + note */}
                        <div className="pt-3 border-t border-border/40">
                            <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
                                Actively solving algorithmic problems to strengthen DSA fundamentals
                            </p>
                        </div>
                    </div>


                </motion.div>
            </div>
        </section>
    );
};
