import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

// Import your logo (recommended method)
// Adjust the path according to where you placed the file
import logo from "@/assets/logo.png";   // ← change to your actual file name/path
// For SVG: import logo from "@/assets/logo.svg";
// For public folder: const logoSrc = "/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Insights", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          {/* Custom logo image */}
          <img
            src={logo}                    // or logoSrc if using public folder
            alt="MASIRA & CO Consulting Ltd Logo"
            className="h-9 w-auto object-contain"
            // For SVG you can also add: className="h-9 w-auto text-current" (if monochromatic)
          />

          {/* Optional: keep brand name next to logo (common pattern) */}
          <span
            className={`font-display text-xl font-bold transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            MASIRA & CO Consulting Ltd
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                location.pathname === link.path
                  ? "text-secondary"
                  : scrolled
                  ? "text-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle scrolled={scrolled} />
          <Link to="/contact">
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-primary border-0 text-primary-foreground hover:opacity-90"
            >
              Get a Consultation
            </Button>
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle scrolled={scrolled} />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-secondary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="w-full bg-gradient-primary border-0 text-primary-foreground">
                  Get a Consultation
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;