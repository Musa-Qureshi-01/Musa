import { Button } from "@/components/Button";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        }  z-50`}
    >
      <nav className="container-responsive flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tighter hover:text-primary transition-colors font-heading flex flex-row items-center gap-2"
        >
          {!logoError ? (
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain"
              onError={() => setLogoError(true)}
            />
          ) : (
            <>
              M<span className="text-primary text-4xl">.</span>
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-base lg:text-lg font-medium transition-colors hover:text-primary ${(link.href === "/" && location.pathname === "/" && !location.hash) ||
                (link.href.startsWith("/#") && location.pathname === "/" && location.hash === link.href.substring(1)) ||
                (link.href !== "/" && !link.href.startsWith("/#") && location.pathname === link.href)
                ? "text-primary"
                : "text-muted-foreground"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button size="sm" className="rounded-full" onClick={() => {
            if (location.pathname !== '/') {
              window.location.href = '/#contact';
            } else {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
            Contact Me
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer hover:bg-surface rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border animate-fade-in shadow-2xl">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
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
            }} className="w-full mt-4">
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
