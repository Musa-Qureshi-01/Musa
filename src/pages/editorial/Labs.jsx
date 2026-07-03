import { useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
    FlaskConical, HelpCircle, Cpu, XCircle, Calendar,
    CheckCircle2, Loader2, Circle, Lightbulb, AlertTriangle
} from "lucide-react";

function useReveal(ref, delay = 0) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        const t = setTimeout(() => {
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, delay);
        return () => clearTimeout(t);
    }, [delay]);
}

function SectionHeader({ icon: Icon, label, color = "text-muted-foreground" }) {
    return (
        <div className="flex items-center gap-3 mb-5">
            <Icon className={`w-4 h-4 ${color}`} />
            <h2 className="text-xs font-mono tracking-[0.15em] uppercase text-muted-foreground/60">{label}</h2>
            <div className="h-px flex-1 bg-border/30" />
        </div>
    );
}

function StatusBadge({ status }) {
    const configs = {
        active: { label: "Active", classes: "bg-violet-500/10 text-violet-400 border-violet-500/20 dot-violet" },
        complete: { label: "Complete", classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
        paused: { label: "Paused", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    };
    const c = configs[status] || configs.paused;
    return (
        <span className={`inline-flex items-center gap-1.5 text-[9px] font-mono px-2 py-0.5 rounded-full border ${c.classes}`}>
            {status === "active" && <span className="w-1 h-1 rounded-full bg-violet-400 animate-pulse" />}
            {c.label}
        </span>
    );
}

function ExperimentCard({ exp, index }) {
    const ref = useRef(null);
    useReveal(ref, index * 70);

    return (
        <div ref={ref} className="rounded-xl border border-border bg-card p-5 hover:border-border-hover transition-all duration-200">
            <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-sm font-semibold font-heading text-foreground leading-snug">{exp.title}</h3>
                <StatusBadge status={exp.status} />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
            <div className="flex flex-wrap items-center gap-2">
                {exp.tags?.map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary border border-border text-muted-foreground/60">{t}</span>
                ))}
                {exp.started && (
                    <span className="text-[10px] text-muted-foreground/40 flex items-center gap-1 ml-auto">
                        <Calendar className="w-3 h-3" />
                        Started {new Date(exp.started).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                )}
            </div>
        </div>
    );
}

function SketchCard({ sketch, index }) {
    const ref = useRef(null);
    useReveal(ref, index * 70);

    return (
        <div ref={ref} className="rounded-xl border border-border bg-card p-5 hover:border-violet-500/20 transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-[9px] font-mono text-violet-400/60 uppercase tracking-wider">Architecture Sketch</span>
                </div>
                <h3 className="text-sm font-semibold font-heading text-foreground mb-2 leading-snug">{sketch.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{sketch.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    {sketch.tags?.map((t) => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400/60">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FailedExperimentCard({ exp, index }) {
    const ref = useRef(null);
    useReveal(ref, index * 70);

    return (
        <div ref={ref} className="rounded-xl border border-rose-500/15 bg-rose-500/5 p-5 hover:border-rose-500/25 transition-all">
            <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <h3 className="text-sm font-semibold text-foreground leading-snug">{exp.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{exp.description}</p>
            <div className="flex gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <Lightbulb className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-rose-300/80 font-medium italic">Lesson: {exp.lesson}</p>
            </div>
        </div>
    );
}

function OpenQuestionCard({ question, index }) {
    const ref = useRef(null);
    useReveal(ref, index * 50);

    return (
        <div ref={ref} className="flex gap-3 p-4 rounded-xl border border-border bg-card hover:border-amber-500/20 transition-all group">
            <HelpCircle className="w-4 h-4 text-amber-400/60 shrink-0 mt-0.5 group-hover:text-amber-400 transition-colors" />
            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{question}</p>
        </div>
    );
}

export function Labs() {
    const { editorial } = portfolioData;
    const labs = editorial.labs;

    return (
        <div className="container-responsive max-w-4xl space-y-14">
            {/* Header */}
            <div>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Editorial Hub</span>
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mt-2 mb-3">
                    Labs
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    {labs.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/8 text-amber-400/80 text-[11px] font-mono">
                    <AlertTriangle className="w-3 h-3" />
                    This is an open notebook — not polished. Messy by design.
                </div>
            </div>

            {/* Experiments */}
            <section>
                <SectionHeader icon={FlaskConical} label="Experiments" color="text-violet-400" />
                <div className="grid sm:grid-cols-2 gap-3">
                    {labs.experiments.map((exp, i) => (
                        <ExperimentCard key={exp.id} exp={exp} index={i} />
                    ))}
                </div>
            </section>

            {/* Architecture Sketches */}
            <section>
                <SectionHeader icon={Cpu} label="Architecture Sketches" color="text-violet-400" />
                <div className="grid sm:grid-cols-2 gap-3">
                    {labs.architectureSketches.map((s, i) => (
                        <SketchCard key={s.id} sketch={s} index={i} />
                    ))}
                </div>
            </section>

            {/* Failed Experiments */}
            <section>
                <SectionHeader icon={XCircle} label="Failed Experiments" color="text-rose-400" />
                <p className="text-xs text-muted-foreground mb-5">
                    Experiments that didn't work, and what I learned from them. Documenting failures is as important as documenting successes.
                </p>
                <div className="grid gap-3">
                    {labs.failedExperiments.map((exp, i) => (
                        <FailedExperimentCard key={exp.id} exp={exp} index={i} />
                    ))}
                </div>
            </section>

            {/* Open Questions */}
            <section>
                <SectionHeader icon={HelpCircle} label="Open Questions" color="text-amber-400" />
                <p className="text-xs text-muted-foreground mb-5">
                    Questions I don't have answers to yet. Thinking in public.
                </p>
                <div className="grid gap-2">
                    {labs.openQuestions.map((q, i) => (
                        <OpenQuestionCard key={i} question={q} index={i} />
                    ))}
                </div>
            </section>
        </div>
    );
}
