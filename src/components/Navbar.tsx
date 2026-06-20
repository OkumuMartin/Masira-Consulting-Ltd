import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
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
  { label: "Pay Now", path: "/payment" },
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
            className="bg-gradient-primary text-primary-foreground text-xs py-2 px-4 relative z-50"
          >
            <div className="container flex items-center justify-between w-full flex-wrap gap-2">
              <div className="flex items-center gap-4 flex-wrap">
                <a href="tel:+254141482542" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Phone size={11} />
                  <span>+254 141 482 542</span>
                </a>
                <a href="mailto:info@masiraconsultingltd.com" className="flex items-center gap-1.5 hover:text-secondary transition-colors">
                  <Mail size={11} />
                  <span>info@masiraconsultingltd.com</span>
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden lg:block text-primary-foreground/80">Free consultation for new clients</span>
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

            {/* Logo + Company Name — visible on ALL screens */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <motion.img
                src={logo}
                alt="Masira & CO Consulting Ltd"
                className="h-9 w-9 rounded-full object-cover shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <div>
                <p className="font-display font-bold text-foreground text-sm leading-tight tracking-wide">
                  Masira & CO
                </p>
                <p className="text-secondary text-xs font-medium tracking-wider uppercase">
                  Consulting Ltd
                </p>
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
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* CTA Button - Desktop only */}
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

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-3 pb-2 px-1"
                >
                  <Link to="/contact" className="block">
                    <Button className="w-full bg-gradient-primary border-0 text-primary-foreground hover:opacity-90 font-medium text-sm py-5">
                      Get Free Consultation
                    </Button>
                  </Link>
                </motion.div>

                {/* Mobile Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="pt-3 pb-2 px-4 flex flex-col gap-3 border-t border-border"
                >
                  <a href="tel:+254141482542" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-secondary" />
                    </div>
                    +254 141 482 542 (Safaricom)
                  </a>
                  <a href="tel:+254751128860" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Phone size={14} className="text-secondary" />
                    </div>
                    +254 751 128 860 (Airtel)
                  </a>
                  <a href="mailto:info@masiraconsultingltd.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <Mail size={14} className="text-secondary" />
                    </div>
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
