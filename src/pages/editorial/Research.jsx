import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import {
    FlaskConical, CheckCircle2, Circle, Loader2, Clock, Users,
    Send, CheckCircle, AlertCircle, ChevronDown, Target, Lightbulb,
    BookOpen, GitBranch, X
} from "lucide-react";

/* ─── Glassmorphism Form Inputs ──────────────────────────────────────────── */
function GlassInput({ label, id, type = "text", required, placeholder, value, onChange, className = "" }) {
    return (
        <div className={className}>
            <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
                {label}{required && <span className="text-violet-400 ml-0.5">*</span>}
            </label>
            <input
                id={id}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-violet-500/50 focus:bg-white/[0.06] outline-none text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.05)]"
            />
        </div>
    );
}

function GlassTextarea({ label, id, required, placeholder, value, onChange, rows = 4 }) {
    return (
        <div>
            <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
                {label}{required && <span className="text-violet-400 ml-0.5">*</span>}
            </label>
            <textarea
                id={id}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows={rows}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-violet-500/50 focus:bg-white/[0.06] outline-none text-sm text-foreground placeholder:text-muted-foreground/40 transition-all duration-200 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] resize-none"
            />
        </div>
    );
}

function GlassSelect({ label, id, required, value, onChange, options, placeholder }) {
    return (
        <div>
            <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5 text-muted-foreground">
                {label}{required && <span className="text-violet-400 ml-0.5">*</span>}
            </label>
            <div className="relative">
                <select
                    id={id}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-violet-500/50 focus:bg-white/[0.06] outline-none text-sm text-foreground transition-all duration-200 backdrop-blur-sm appearance-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
                >
                    {placeholder && <option value="" className="bg-[#111]">{placeholder}</option>}
                    {options.map((o) => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
        </div>
    );
}

/* ─── Success Overlay ─────────────────────────────────────────────────────── */
function SuccessOverlay({ onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 5000);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <div className="absolute inset-0 z-20 rounded-2xl bg-card/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-5 animate-[scale-in_0.3s_ease]">
                <CheckCircle className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold font-heading text-foreground mb-2">Application Received</h3>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                Thank you for your interest in collaborating. I'll review your application and get back to you soon.
            </p>
            <button onClick={onClose} className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Close
            </button>
        </div>
    );
}

/* ─── Collaboration Form ──────────────────────────────────────────────────── */
const EXPERTISE_OPTIONS = [
    "LLMs", "Agentic AI", "AI Security", "RAG", "Machine Learning",
    "Backend Engineering", "Frontend Engineering", "Research & Academia",
    "Distributed Systems", "Mathematics & Statistics",
];

const EXP_OPTIONS = ["< 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years"];
const HOURS_OPTIONS = ["2–5 hrs/week", "5–10 hrs/week", "10–20 hrs/week", "20+ hrs/week"];

function CollaborationForm() {
    const [form, setForm] = useState({
        name: "", email: "", country: "", role: "", org: "",
        linkedin: "", github: "", expertise: "", experience: "", hours: "",
        why: "", extra: "",
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const containerRef = useRef(null);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: "7d89d23d-355c-4fa3-8383-515c4344c2b2",
                    subject: "Research Collaboration Application — Agentic Case Intelligence",
                    submission_type: "Research Collaboration",
                    ...form,
                }),
            });
            const result = await res.json();
            if (result.success) {
                setStatus("success");
                setForm({ name: "", email: "", country: "", role: "", org: "", linkedin: "", github: "", expertise: "", experience: "", hours: "", why: "", extra: "" });
            } else throw new Error();
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-card to-card p-6 md:p-8 overflow-hidden backdrop-blur-sm shadow-[0_0_60px_rgba(139,92,246,0.05)]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none" />
            {status === "success" && <SuccessOverlay onClose={() => setStatus(null)} />}

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-violet-400" />
                    </div>
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-violet-400">Collaboration Form</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-foreground mb-1">Join the Research</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Looking for engineers, researchers, and students interested in agentic AI, AI security, or case management systems.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <GlassInput label="Full Name" id="collab-name" required placeholder="Your name" value={form.name} onChange={set("name")} />
                        <GlassInput label="Email" id="collab-email" type="email" required placeholder="you@example.com" value={form.email} onChange={set("email")} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <GlassInput label="Country" id="collab-country" required placeholder="India, USA…" value={form.country} onChange={set("country")} />
                        <GlassInput label="Current Role" id="collab-role" required placeholder="Student, Engineer, Researcher…" value={form.role} onChange={set("role")} />
                    </div>
                    <GlassInput label="University or Company (optional)" id="collab-org" placeholder="IIT Bombay, Google, etc." value={form.org} onChange={set("org")} />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <GlassInput label="LinkedIn" id="collab-linkedin" type="url" required placeholder="linkedin.com/in/…" value={form.linkedin} onChange={set("linkedin")} />
                        <GlassInput label="GitHub / Portfolio" id="collab-github" type="url" placeholder="github.com/…" value={form.github} onChange={set("github")} />
                    </div>
                    <GlassSelect
                        label="Area of Expertise"
                        id="collab-expertise"
                        required
                        value={form.expertise}
                        onChange={set("expertise")}
                        options={EXPERTISE_OPTIONS}
                        placeholder="Select your primary expertise…"
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <GlassSelect label="Years of Experience" id="collab-exp" required value={form.experience} onChange={set("experience")} options={EXP_OPTIONS} placeholder="Select…" />
                        <GlassSelect label="Hours per Week Available" id="collab-hours" required value={form.hours} onChange={set("hours")} options={HOURS_OPTIONS} placeholder="Select…" />
                    </div>
                    <GlassTextarea label="Why do you want to collaborate?" id="collab-why" required placeholder="What draws you to this research? What can you contribute?" value={form.why} onChange={set("why")} rows={4} />
                    <GlassTextarea label="Anything else I should know?" id="collab-extra" placeholder="Links, papers, side projects — anything relevant." value={form.extra} onChange={set("extra")} rows={3} />

                    {status === "error" && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p className="text-xs">Something went wrong. Please try again or email me directly.</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-full bg-violet-500 hover:bg-violet-400 disabled:opacity-60 text-white font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(139,92,246,0.3)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.4)]"
                    >
                        {loading
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <><Send className="w-4 h-4" /> Submit Application</>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}

/* ─── Progress Step ───────────────────────────────────────────────────────── */
function ProgressStep({ phase, description, status, index }) {
    const icons = { complete: CheckCircle2, active: Loader2, upcoming: Circle };
    const Icon = icons[status] || Circle;
    const color = status === "complete" ? "text-emerald-400" : status === "active" ? "text-violet-400" : "text-muted-foreground/30";
    const lineColor = status === "complete" ? "bg-emerald-400/40" : "bg-border/30";

    return (
        <div className="flex gap-4 relative" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${status === "complete" ? "bg-emerald-500/15 border border-emerald-500/30" : status === "active" ? "bg-violet-500/15 border border-violet-500/30" : "bg-secondary border border-border"}`}>
                    <Icon className={`w-4 h-4 ${color} ${status === "active" ? "animate-spin" : ""}`} />
                </div>
                <div className={`w-0.5 h-full mt-1 ${lineColor}`} />
            </div>
            <div className="pb-8">
                <p className={`text-sm font-semibold ${status !== "upcoming" ? "text-foreground" : "text-muted-foreground/60"}`}>{phase}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

/* ─── Research Page ───────────────────────────────────────────────────────── */
export function Research() {
    const { editorial } = portfolioData;
    const r = editorial.research;

    return (
        <div className="container-responsive max-w-4xl space-y-12">
            {/* Header */}
            <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Editorial Hub / Research</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        {r.status}
                    </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mb-2">{r.title}</h1>
                <p className="text-sm text-muted-foreground font-mono">{r.subtitle}</p>
            </div>

            {/* Seeking collaborators banner */}
            <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-r from-violet-500/10 via-violet-500/5 to-transparent p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-foreground">{r.statusLabel}</p>
                    <p className="text-xs text-muted-foreground">Engineers, researchers, and students welcome.</p>
                </div>
            </div>

            {/* Abstract */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-violet-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Abstract</h2>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                    <p className="text-sm text-foreground leading-relaxed font-body">{r.abstract}</p>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Problem Statement</h2>
                </div>
                <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-6">
                    <p className="text-sm text-foreground leading-relaxed">{r.problemStatement}</p>
                </div>
            </section>

            {/* Research Direction */}
            <section className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                    <GitBranch className="w-4 h-4 text-sky-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Research Direction</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.researchDirection}</p>
            </section>

            {/* Objectives */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Objectives</h2>
                </div>
                <ol className="space-y-3">
                    {r.objectives.map((obj, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="shrink-0 w-5 h-5 rounded bg-secondary border border-border flex items-center justify-center text-[10px] font-mono text-muted-foreground/60 mt-0.5">{i + 1}</span>
                            <span className="leading-relaxed">{obj}</span>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Expected Contributions */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Expected Contributions</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                    {r.expectedContributions.map((c, i) => (
                        <div key={i} className="flex gap-3 p-4 rounded-xl border border-border bg-card text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                            {c}
                        </div>
                    ))}
                </div>
            </section>

            {/* Research Progress */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <FlaskConical className="w-4 h-4 text-violet-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Current Progress</h2>
                </div>
                <div>
                    {r.currentProgress.map((step, i) => (
                        <ProgressStep key={step.phase} {...step} index={i} />
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Research Timeline</h2>
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                    {r.timeline.map((t) => (
                        <div
                            key={t.quarter}
                            className={`p-4 rounded-xl border transition-all ${t.done
                                ? "border-emerald-500/25 bg-emerald-500/8"
                                : "border-border bg-card"}`}
                        >
                            <p className="text-[10px] font-mono text-muted-foreground/60 mb-1">{t.quarter}</p>
                            <p className={`text-xs font-medium ${t.done ? "text-emerald-300" : "text-muted-foreground"}`}>{t.milestone}</p>
                            {t.done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-2" />}
                        </div>
                    ))}
                </div>
            </section>

            {/* Collaboration Form */}
            <section>
                <div className="flex items-center gap-2 mb-6">
                    <Users className="w-4 h-4 text-violet-400" />
                    <h2 className="text-xs font-mono tracking-[0.12em] uppercase text-muted-foreground">Collaborate With Me</h2>
                </div>
                <CollaborationForm />
            </section>
        </div>
    );
}
