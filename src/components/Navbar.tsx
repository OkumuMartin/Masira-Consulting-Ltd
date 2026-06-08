import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Insights", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-primary text-primary-foreground text-xs py-2 px-4 flex items-center justify-between relative z-50"
          >
            <div className="container flex items-center justify-between w-full">
              <div className="flex items-center gap-6">
                <a href="tel:+254141482542" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Phone size={12} />
                  <span>+254 141 482 542</span>
                </a>
                <a href="mailto:info@masiraconsultingltd.com" className="hidden sm:flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Mail size={12} />
                  <span>info@masiraconsultingltd.com</span>
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-primary-foreground/80">🎯 Free consultation for new clients</span>
                <button
                  onClick={() => setAnnouncementVisible(false)}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
            : "bg-background/95 backdrop-blur-sm border-b border-border/50"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.img
                src={logo}
                alt="Masira & CO Consulting Ltd"
                className="h-10 w-10 rounded-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div className="hidden sm:block">
                <p className="font-display font-bold text-foreground text-sm leading-tight">
                  Masira & CO
                </p>
                <p className="text-muted-foreground text-xs">Consulting Ltd</p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-secondary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* CTA Button - Desktop */}
              <Link to="/contact" className="hidden md:block">
                <Button
                  size="sm"
                  className="bg-gradient-primary border-0 text-primary-foreground hover:opacity-90 font-medium px-5 shadow-md hover:shadow-lg transition-all"
                >
                  Get Consultation
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="text-foreground" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} className="text-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="container py-4 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-secondary/10 text-secondary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {link.label}
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 pb-2 px-1"
                >
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-gradient-primary border-0 text-primary-foreground hover:opacity-90 font-medium">
                      Get Free Consultation
                    </Button>
                  </Link>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-2 pb-1 px-4 flex flex-col gap-2 border-t border-border mt-2"
                >
                  <a href="tel:+254141482542" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-colors">
                    <Phone size={12} />
                    +254 141 482 542
                  </a>
                  <a href="mailto:info@masiraconsultingltd.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-colors">
                    <Mail size={12} />
                    info@masiraconsultingltd.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
