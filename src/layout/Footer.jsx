import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "@/data/portfolio";

const { socials } = portfolioData.personalInfo;

/* ─── SVG icons ──────────────────────────────────────────────────────────── */
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.8A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.8A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.44 6.4-3.21 6.4-1.77 0-3.21-2.86-3.21-6.4s1.44-6.4 3.21-6.4c1.77 0 3.21 2.86 3.21 6.4zM24 12c0 3.17-.5 5.75-1.07 5.75S21.86 15.17 21.86 12s.5-5.75 1.07-5.75S24 8.83 24 12z" />
  </svg>
);

/* ─── Social button — theme-aware ────────────────────────────────────────── */
function SocialBtn({ href, label, Icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/s flex flex-col items-center gap-1.5"
    >
      <div
        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200
          border-border bg-secondary text-muted-foreground
          group-hover/s:border-foreground group-hover/s:bg-foreground group-hover/s:text-background
          group-hover/s:-translate-y-1 group-hover/s:shadow-[0_6px_20px_rgba(0,0,0,0.15)]`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-[8px] font-mono tracking-wider uppercase leading-none transition-colors duration-200 ${hovered ? "text-foreground" : "text-muted-foreground"}`}>
        {label.split(" / ")[0]}
      </span>
    </a>
  );
}

/* ─── Building item ──────────────────────────────────────────────────────── */
function BuildingItem({ label, desc, href, internal }) {
  const [hovered, setHovered] = useState(false);
  const cls = "group/b flex items-center justify-between gap-2 py-2.5 border-b border-border last:border-b-0 transition-all duration-200";

  const inner = (
    <>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-tight transition-colors duration-200 ${hovered ? "text-foreground" : "text-muted-foreground"}`}>
          {label}
        </p>
        <p className="text-[10px] text-muted-foreground/60">{desc}</p>
      </div>
      <ArrowUpRight
        className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${hovered ? "text-foreground -translate-y-0.5 translate-x-0.5" : "text-muted-foreground/30"}`}
      />
    </>
  );

  return internal ? (
    <Link to={href} className={cls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </a>
  );
}

/* ─── Nav item ───────────────────────────────────────────────────────────── */
function NavItem({ label, href, internal }) {
  const [hovered, setHovered] = useState(false);
  const cls = "group/n flex items-center gap-2 text-sm transition-colors duration-200 w-fit py-1";

  const inner = (
    <>
      <span className={`h-px transition-all duration-200 bg-foreground ${hovered ? "w-6" : "w-3 opacity-30"}`} />
      <span className={`font-medium transition-colors duration-200 ${hovered ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </>
  );

  return internal ? (
    <Link to={href} className={cls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {inner}
    </a>
  );
}

/* ─── Scroll reveal ──────────────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const SOCIALS = [
  { label: "GitHub",    href: socials.github,    Icon: Github     },
  { label: "LinkedIn",  href: socials.linkedin,  Icon: Linkedin   },
  { label: "X",         href: socials.twitter,   Icon: XIcon      },
  { label: "Medium",    href: socials.medium,    Icon: MediumIcon },
  { label: "Instagram", href: socials.instagram, Icon: Instagram  },
  { label: "Email",     href: `mailto:${portfolioData.personalInfo.email}`, Icon: Mail },
];

const BUILDING = [
  { label: "Editorial.io",              desc: "AI publishing platform",   href: "/editorial",             internal: true  },
  { label: "GovernanceAI",              desc: "AI security & governance", href: "https://governancexai.vercel.app/", internal: false },
  { label: "Agentic Case Intelligence", desc: "Active research",          href: "/editorial/research",    internal: true  },
  { label: "AI Security Series",        desc: "Long-form writing",        href: "/editorial/ai-security", internal: true  },
];

const NAV = [
  { label: "Home",      href: "/",          internal: true  },
  { label: "Projects",  href: "/projects",  internal: true  },
  { label: "Editorial", href: "/editorial", internal: true  },
  { label: "Contact",   href: "#contact",   internal: false },
];

/* ─── Footer ─────────────────────────────────────────────────────────────── */
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const topRef    = useReveal(0);
  const gridRef   = useReveal(100);
  const bottomRef = useReveal(180);

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      <div className="container-responsive relative z-10">

        {/* ── Closing statement ── */}
        <div ref={topRef} className="pt-16 md:pt-20 pb-12 border-b border-border">
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-5">
            Musa Qureshi · AI Engineer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading tracking-tight text-foreground leading-[1.05] mb-6">
            Let's build the
            <br />
            <span className="text-muted-foreground">future of AI.</span>
          </h2>
          {/* Two emails */}
          <div className="flex flex-col gap-2">
            {[
              portfolioData.personalInfo.email,
              "musa.qureshi@bansalinstitutes.ac.in",
            ].map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="group/e inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                <span className="underline underline-offset-4 decoration-border group-hover/e:decoration-foreground/50 transition-all break-all">
                  {email}
                </span>
                <ArrowUpRight className="w-3 h-3 shrink-0 group-hover/e:-translate-y-0.5 group-hover/e:translate-x-0.5 transition-transform" />
              </a>
            ))}
          </div>
        </div>

        {/* ── 3-col grid ── */}
        <div ref={gridRef} className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-b border-border">

          {/* Currently Building */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground mb-1">
              Currently Building
            </p>
            <div>
              {BUILDING.map((item) => (
                <BuildingItem key={item.label} {...item} />
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground mb-3">
              Navigate
            </p>
            <nav className="flex flex-col">
              {NAV.map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
            </nav>
          </div>

          {/* Follow */}
          <div>
            <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-muted-foreground mb-4">
              Follow
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <SocialBtn key={s.label} href={s.href} label={s.label} Icon={s.Icon} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Signature ── */}
        <div ref={bottomRef} className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="/" className="text-base font-bold font-heading tracking-tight text-foreground hover:opacity-70 transition-opacity">
            Musa<span className="text-muted-foreground">.</span>
          </a>
          <p className="text-[9px] font-mono text-muted-foreground tracking-wider text-center">
            Designed & engineered by Musa Qureshi · {currentYear}
          </p>
          <p className="text-[9px] font-mono text-muted-foreground tracking-wider">
            All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
};
