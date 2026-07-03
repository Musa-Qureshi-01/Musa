import { useState, useEffect, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { ArrowLeft, BookOpen, FlaskConical, Layers, Shield, Library, ChevronRight } from "lucide-react";

const NAV_ITEMS = [
    { path: "/editorial", label: "Overview", icon: BookOpen, exact: true },
    { path: "/editorial/articles", label: "Articles & Essays", icon: BookOpen },
    { path: "/editorial/research", label: "Research", icon: FlaskConical },
    { path: "/editorial/ai-security", label: "AI Security Series", icon: Shield },
    { path: "/editorial/resources", label: "Resources", icon: Library },
    { path: "/editorial/labs", label: "Labs", icon: Layers },
];

function ScrollProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[100] bg-border/30">
            <div
                className="h-full bg-gradient-to-r from-violet-500 via-primary to-violet-400 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

export function EditorialLayout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const isActive = (item) => {
        if (item.exact) return location.pathname === item.path;
        return location.pathname === item.path || location.pathname.startsWith(item.path + "/");
    };

    const activeItem = NAV_ITEMS.find((i) => isActive(i)) || NAV_ITEMS[0];

    return (
        <div className="min-h-screen bg-background relative">
            <ScrollProgressBar />

            {/* Fixed sidebar (desktop) */}
            <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col pt-20 pb-8 px-5 border-r border-border/40 bg-background/95 backdrop-blur-xl z-30">
                <div className="mb-8 mt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Portfolio
                    </Link>
                    <div className="mb-1">
                        <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground/60">Knowledge Hub</span>
                    </div>
                    <h2 className="text-base font-bold font-heading text-foreground tracking-tight">Editorial</h2>
                </div>

                <nav className="flex flex-col gap-1 flex-1">
                    {NAV_ITEMS.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                                    ${active
                                        ? "bg-foreground/8 text-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    }`}
                            >
                                {active && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-full" />
                                )}
                                <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-400" : "text-muted-foreground group-hover:text-foreground"}`} />
                                <span>{item.label}</span>
                                {active && <ChevronRight className="w-3 h-3 ml-auto text-muted-foreground/50" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-6 border-t border-border/30">
                    <div className="px-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">Active Research</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Agentic Case Intelligence</p>
                    </div>
                </div>
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-[60px] md:top-[70px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30">
                <div className="container-responsive flex items-center gap-3 py-3 px-4">
                    <Link to="/" className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <button
                        className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-secondary border border-border text-sm font-medium text-foreground cursor-pointer select-none transition-all active:scale-[0.98]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <activeItem.icon className="w-4 h-4 text-violet-400" />
                        {activeItem.label}
                        <ChevronRight className={`w-3.5 h-3.5 ml-auto transition-transform duration-300 ${mobileMenuOpen ? "rotate-90" : ""}`} />
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="container-responsive pb-3 px-4 animate-fade-in">
                        <div className="bg-secondary rounded-2xl border border-border overflow-hidden shadow-premium">
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-border/40 last:border-b-0 transition-colors
                                            ${active ? "text-foreground bg-foreground/5 font-semibold" : "text-muted-foreground"}`}
                                    >
                                        <item.icon className={`w-4 h-4 ${active ? "text-violet-400" : "text-muted-foreground/60"}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Main content area */}
            <div className="lg:pl-64">
                <div className="pt-32 lg:pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
