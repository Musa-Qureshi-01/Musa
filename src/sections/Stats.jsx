import { useState, useEffect, useRef } from "react";
import { Github, Code2, GitFork, Star, CalendarDays } from "lucide-react";
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
    const [loading, setLoading] = useState(true);

    const githubUsername = portfolioData.personalInfo.socials.github.split("/").filter(Boolean).pop();
    const leetcodeUsername = portfolioData.personalInfo.socials.leetcode.split("/").filter(Boolean).pop();

    useEffect(() => {
        const fetch_ = async () => {
            try {
                const [ghRes, lcProfileRes, lcSolvedRes, lcCalRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${githubUsername}`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`),
                    fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/calendar`),
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
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetch_();
    }, [githubUsername, leetcodeUsername]);


    const solvedPct = leetcodeStats.totalQuestions > 0
        ? (leetcodeStats.solvedCount / leetcodeStats.totalQuestions) * 100 : 0;
    const circumference = 2 * Math.PI * 32;

    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden hidden md:block bg-background">
            <div className="container-responsive relative z-10 mx-auto">

                {/* ── Section heading — same pattern as all sections ── */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <ScrollReveal>
                        <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                            Developer Metrics
                        </span>
                    </ScrollReveal>
                    <div className="mt-4 mb-3">
                        <LetterReveal
                            text="Code & Profile Statistics."
                            className="text-3xl md:text-4xl font-bold text-foreground font-heading"
                        />
                    </div>
                    <FadeIn delay={0.15}>
                        <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium tracking-wider uppercase border border-primary/20 px-3 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Live Data
                        </span>
                    </FadeIn>
                </div>

                {/* ── Two records side-by-side ── */}
                <motion.div
                    className="grid md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >

                    {/* ═══ GitHub Record ═══════════════════════════════════════ */}
                    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.07] p-6 flex flex-col gap-5 hover:border-white/[0.12] transition-colors">

                        {/* Identity row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Github className="w-5 h-5 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">GitHub</p>
                                    <a href={portfolioData.personalInfo.socials.github} target="_blank" rel="noopener noreferrer"
                                        className="text-[11px] text-zinc-500 hover:text-primary transition-colors">
                                        @{githubUsername}
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                            </div>
                        </div>

                        {/* Key numbers */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
                                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase tracking-wider mb-1.5">
                                    <GitFork className="w-3 h-3" /> Repositories
                                </div>
                                <p className="text-2xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={githubStats.public_repos} loading={loading} />
                                </p>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
                                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase tracking-wider mb-1.5">
                                    <Star className="w-3 h-3" /> Followers
                                </div>
                                <p className="text-2xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={githubStats.followers} loading={loading} />
                                </p>
                            </div>
                        </div>

                        {/* Contribution heatmap — full, readable */}
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-3">Contribution Activity</p>
                            <div className="overflow-x-auto pb-1 custom-scrollbar">
                                <GitHubCalendar
                                    username={githubUsername}
                                    colorScheme="dark"
                                    theme={{
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
                    <div className="bg-white/[0.02] rounded-2xl border border-white/[0.07] p-6 flex flex-col gap-5 hover:border-white/[0.12] transition-colors">

                        {/* Identity row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Code2 className="w-5 h-5 text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground leading-none">LeetCode</p>
                                    <a href={portfolioData.personalInfo.socials.leetcode} target="_blank" rel="noopener noreferrer"
                                        className="text-[11px] text-zinc-500 hover:text-amber-400 transition-colors">
                                        @{leetcodeUsername}
                                    </a>
                                </div>
                            </div>
                            <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                <AnimatedNumber value={leetcodeStats.activeDays} loading={loading} suffix=" days active" />
                            </div>
                        </div>

                        {/* Solved count + ring */}
                        <div className="flex items-center gap-6">
                            {/* Circular SVG */}
                            <div className="relative flex-shrink-0 w-[80px] h-[80px]">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="32" className="stroke-white/5 fill-none" strokeWidth="5" />
                                    <motion.circle
                                        cx="40" cy="40" r="32"
                                        className="stroke-amber-400 fill-none"
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
                                    <span className="text-[9px] text-zinc-500 mt-0.5 uppercase tracking-wider">Solved</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="text-xs text-zinc-400 mb-1">
                                    <span className="text-foreground font-semibold font-mono">
                                        {loading ? "—" : Math.round(solvedPct)}%
                                    </span>{" "}
                                    of {leetcodeStats.totalQuestions.toLocaleString()} problems
                                </p>
                                <p className="text-[11px] text-zinc-600">Practice consistency across difficulty tiers</p>
                            </div>
                        </div>

                        {/* Difficulty breakdown */}
                        <div className="space-y-3.5">
                            <DiffBar label="Easy" color="text-emerald-400"
                                solved={leetcodeStats.easy} total={leetcodeStats.totalEasy}
                                beats={leetcodeStats.easyBeats} loading={loading} delay={0.3} />
                            <DiffBar label="Medium" color="text-amber-400"
                                solved={leetcodeStats.medium} total={leetcodeStats.totalMedium}
                                beats={leetcodeStats.mediumBeats} loading={loading} delay={0.45} />
                            <DiffBar label="Hard" color="text-rose-400"
                                solved={leetcodeStats.hard} total={leetcodeStats.totalHard}
                                beats={leetcodeStats.hardBeats} loading={loading} delay={0.6} />
                        </div>



                        {/* Summary footer */}
                        <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-3 mt-auto">
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center">
                                <p className="text-xl font-bold font-mono text-foreground">
                                    <AnimatedNumber value={leetcodeStats.solvedCount} loading={loading} />
                                </p>
                                <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">Total Solved</p>
                            </div>
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 text-center">
                                <p className="text-xl font-bold font-mono text-amber-400">
                                    {loading ? "—" : `${Math.round(solvedPct)}%`}
                                </p>
                                <p className="text-[10px] text-zinc-500 mt-0.5 uppercase tracking-wider">Completion</p>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
