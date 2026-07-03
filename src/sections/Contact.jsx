import {
  Mail, Phone, MapPin, Send, CheckCircle, AlertCircle,
  ArrowRight, Calendar, Zap, BookOpen, Code2, Mic2, GitBranch
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

/* ─── Scroll reveal ──────────────────────────────────────────────────────── */
function useScrollReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ─── Glass input (dual-mode) ────────────────────────────────────────────── */
function GlassInput({ label, id, type = "text", required, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5 transition-colors duration-200 ${focused ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}{required && <span className="text-violet-500 ml-0.5">*</span>}
      </label>
      <input
        id={id} type={type} required={required}
        placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-3.5 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200
          bg-card border border-border
          focus:border-foreground/40 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]
          .light &:focus:shadow-[0_0_0_3px_rgba(0,0,0,0.08)]`}
      />
    </div>
  );
}

function GlassTextarea({ label, id, required, placeholder, value, onChange, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5 transition-colors duration-200 ${focused ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}{required && <span className="text-violet-500 ml-0.5">*</span>}
      </label>
      <textarea
        id={id} required={required} placeholder={placeholder}
        value={value} onChange={onChange} rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-3.5 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 resize-none
          bg-card border border-border
          focus:border-foreground/40 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
      />
    </div>
  );
}

/* ─── Submit button ──────────────────────────────────────────────────────── */
function SubmitButton({ loading }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="submit" disabled={loading}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`relative w-full h-11 rounded-full overflow-hidden font-semibold text-sm tracking-wide transition-all duration-150 group/btn
        bg-foreground text-background border border-foreground disabled:opacity-50
        hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)]
        ${pressed ? "scale-[0.98]" : "hover:scale-[1.01]"}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 ease-out" />
      <span className="relative flex items-center justify-center gap-2">
        {loading
          ? <span className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin" />
          : <><Send className="w-3.5 h-3.5" /> Send message <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" /></>
        }
      </span>
    </button>
  );
}

/* ─── Success state ──────────────────────────────────────────────────────── */
function SuccessState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-full border border-foreground/20 bg-foreground/5 flex items-center justify-center mb-4">
        <CheckCircle className="w-6 h-6 text-foreground" />
      </div>
      <h3 className="text-base font-bold font-heading text-foreground mb-1.5">Message sent.</h3>
      <p className="text-xs text-muted-foreground max-w-[220px] leading-relaxed mb-4">
        I'll get back to you within 24–48 hours.
      </p>
      <button onClick={onReset} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
        Send another
      </button>
    </div>
  );
}

/* ─── Availability roles ─────────────────────────────────────────────────── */
const AVAILABILITY = [
  { icon: Code2,     label: "AI & Software Engineering",    desc: "Production AI & scalable software" },
  { icon: Zap,       label: "Forward Deployed Engineering", desc: "Enterprise AI deployment & integration" },
  { icon: GitBranch, label: "Research & Collaboration",     desc: "AI Security & Agentic AI research" },
  { icon: BookOpen,  label: "AI Consulting",                desc: "LLMs, automation & AI strategy" },
];

function RolePill({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group/role relative overflow-hidden flex items-center gap-2 px-3 py-2 rounded-xl border cursor-default select-none
        transition-all duration-300 ease-out
        border-border bg-secondary
        hover:border-foreground/30 hover:bg-foreground hover:text-background hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        ${hovered ? "scale-[1.04]" : "scale-100"}`}
    >
      {/* Shine sweep on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/role:translate-x-full transition-transform duration-500 ease-out pointer-events-none" />

      <item.icon className={`w-3.5 h-3.5 shrink-0 transition-colors duration-200 ${hovered ? "text-background" : "text-muted-foreground"}`} />
      <div>
        <p className={`text-xs font-semibold leading-tight transition-colors duration-200 ${hovered ? "text-background" : "text-foreground"}`}>
          {item.label}
        </p>
        <p className={`text-[10px] leading-tight transition-colors duration-200 ${hovered ? "text-background/70" : "text-muted-foreground"}`}>
          {item.desc}
        </p>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const contactInfo = [
  { icon: Mail,   label: "Personal",  value: portfolioData.personalInfo.email,               href: `mailto:${portfolioData.personalInfo.email}` },
  { icon: Mail,   label: "Institute", value: "musa.qureshi@bansalinstitutes.ac.in",          href: "mailto:musa.qureshi@bansalinstitutes.ac.in" },
  { icon: Phone,  label: "Phone",     value: portfolioData.personalInfo.phone,               href: `tel:${portfolioData.personalInfo.phone.replace(/\s+/g, "")}` },
  { icon: MapPin, label: "Location",  value: portfolioData.personalInfo.location,            href: "#" },
];

/* ─── Main ───────────────────────────────────────────────────────────────── */
export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading,  setLoading]  = useState(false);
  const [status,   setStatus]   = useState(null);

  const headerRef = useScrollReveal(0);
  const bodyRef   = useScrollReveal(100);

  const set = (k) => (e) => setFormData((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "7d89d23d-355c-4fa3-8383-515c4344c2b2", ...formData }),
      });
      const data = await res.json();
      if (data.success) { setStatus("success"); setFormData({ name: "", email: "", message: "" }); }
      else throw new Error();
    } catch { setStatus("error"); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background border-t border-border">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-foreground/[0.025] rounded-full blur-[100px]" />
      </div>

      <div className="container-responsive relative z-10 py-16 md:py-20">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-10 md:mb-12">
          <span className="inline-block text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground leading-tight mb-3">
            Let's build something&nbsp;great.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Have a project, idea, or question? I'd love to hear from you.
          </p>
        </div>

        {/* ── Content grid ── */}
        <div ref={bodyRef} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 items-start">

          {/* Form card */}
          <div className="rounded-2xl border border-border bg-card shadow-premium p-5 sm:p-6">
            {status === "success" ? (
              <SuccessState onReset={() => setStatus(null)} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <GlassInput label="Name"  id="cn-name"  required placeholder="Your name"       value={formData.name}    onChange={set("name")} />
                  <GlassInput label="Email" id="cn-email" type="email" required placeholder="you@example.com" value={formData.email}   onChange={set("email")} />
                </div>
                <GlassTextarea
                  label="Message" id="cn-msg" required
                  placeholder="Tell me about your project, idea, or question…"
                  value={formData.message} onChange={set("message")} rows={5}
                />

                {status === "error" && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p className="text-xs">Something went wrong. Please try again or email me directly.</p>
                  </div>
                )}

                <SubmitButton loading={loading} />

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">or</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <a
                  href="https://cal.com/musa-qureshi-01/15min"
                  target="_blank" rel="noopener noreferrer"
                  className="group/cal flex items-center justify-center gap-2 h-10 rounded-full border border-border bg-secondary hover:border-foreground/40 hover:bg-foreground hover:text-background text-sm font-medium text-muted-foreground transition-all duration-200"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Book a 15-min call
                  <ArrowRight className="w-3.5 h-3.5 group-hover/cal:translate-x-0.5 transition-transform" />
                </a>
              </form>
            )}
          </div>

          {/* ── Info sidebar — sticky, max-height capped ── */}
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            <div className="relative rounded-2xl border border-border bg-card shadow-premium p-5">

              {/* Contact rows */}
              <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground mb-3">Contact</p>
              <div className="space-y-2.5 mb-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-2.5 hover:opacity-70 transition-opacity"
                  >
                    <item.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[8px] font-mono tracking-wider uppercase text-muted-foreground/60 leading-none mb-0.5">{item.label}</p>
                      <p className="text-xs text-foreground break-all leading-tight">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-border mb-4" />

              {/* Available For — compact pill badges (no description) */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground">Available For</p>
              </div>
              <div className="flex flex-col gap-2">
                {AVAILABILITY.map((item) => (
                  <RolePill key={item.label} item={item} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
