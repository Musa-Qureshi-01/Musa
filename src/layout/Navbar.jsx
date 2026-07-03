import { Button } from "@/components/Button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/editorial", label: "Editorial" },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const elementId = href.substring(2);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-3 md:top-4 left-0 right-0 max-w-[1200px] w-[calc(100%-2rem)] mx-auto transition-all duration-500 rounded-full border border-border bg-background/60 backdrop-blur-xl py-2 px-4 md:py-2.5 md:px-6 z-50 shadow-premium ${
        isScrolled ? "bg-background/75 shadow-premium-hover border-border-hover" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight hover:text-foreground transition-colors font-heading text-foreground"
        >
          {!logoError ? (
            <img
              src="/logo.png"
              alt="Logo"
              className="h-7 w-auto object-contain dark:invert"
              onError={() => setLogoError(true)}
            />
          ) : (
            <>
              Musa<span className="text-primary text-2xl leading-none">.</span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive =
              (link.href === "/" && location.pathname === "/" && !location.hash) ||
              (link.href.startsWith("/#") && location.pathname === "/" && location.hash === link.href.substring(1)) ||
              (link.href !== "/" && !link.href.startsWith("/#") && location.pathname === link.href);

            return (
              <Link
                key={index}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative text-xs lg:text-[13px] font-medium transition-colors hover:text-foreground py-1 ${
                  isActive ? "text-foreground font-semibold" : "text-secondary-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-foreground rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA + Toggle Theme Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border/40 bg-background/20 hover:bg-secondary text-secondary-foreground hover:text-foreground transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          
          <Button size="sm" className="rounded-full text-xs font-semibold px-4 py-1.5" onClick={() => {
            if (location.pathname !== '/') {
              window.location.href = '/#contact';
            } else {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Contact
          </Button>
        </div>

        {/* Mobile Nav Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full border border-border/40 bg-background/20 hover:bg-secondary text-secondary-foreground hover:text-foreground transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
          </button>
          
          <button
            className="p-1.5 text-foreground cursor-pointer hover:bg-secondary rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full mt-2 bg-card/95 backdrop-blur-lg border border-border/40 rounded-2xl animate-fade-in shadow-2xl overflow-y-auto pb-6">
          <div className="px-6 py-5 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-secondary-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Button onClick={() => {
              setIsMobileMenuOpen(false);
              if (location.pathname !== '/') {
                window.location.href = '/#contact';
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }} className="w-full mt-2 py-2 text-xs">
              Contact
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
