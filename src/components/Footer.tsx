import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

// Import your logo (adjust path according to your project structure)
import logo from "@/assets/logo.png";  // ← change this to match your actual logo file

// ────────────────────────────────────────────────
// Enhanced Reusable Legal Modal Component
// (unchanged from your latest version)
// ────────────────────────────────────────────────
interface LegalModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  lastUpdated: number;
  children: React.ReactNode;
}

const LegalModal = ({ isOpen, onOpenChange, title, lastUpdated, children }: LegalModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 outline-none"
                initial={{ opacity: 0, scale: 0.92, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", damping: 22, stiffness: 280, duration: 0.35 }}
              >
                <div
                  className="
                    relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl
                    max-h-[90vh] overflow-y-auto
                    rounded-2xl bg-card shadow-2xl ring-1 ring-border/40
                    border border-border/60
                  "
                >
                  <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-card border-b border-border/50">
                    <Dialog.Title className="text-xl sm:text-2xl font-semibold text-foreground pr-8">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Close dialog"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="px-6 py-6 sm:py-8 text-sm text-muted-foreground leading-relaxed space-y-5">
                    <p className="text-xs text-muted-foreground/80 pb-2 border-b border-border/30">
                      Last updated: {lastUpdated}
                    </p>
                    {children}
                  </div>

                  <div className="sticky bottom-0 z-10 px-6 py-5 bg-card border-t border-border/50 flex justify-end">
                    <Dialog.Close asChild>
                      <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all">
                        I Understand
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

// ────────────────────────────────────────────────
// Main Footer Component – with logo instead of "I"
// ────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section – replaced "I" with logo */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={logo}
                alt="Masira & CO Consulting Ltd logo"
                className="h-9 w-auto object-contain"
              />
              <span className="font-display text-xl font-bold">MASIRA & CO Consulting Ltd</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Integrated business solutions that empower organizations to achieve
              sustainable growth and operational excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors">Insights</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/services" className="hover:text-secondary transition-colors">Management Consulting</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">HR Solutions</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">Sales & Marketing</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition-colors">ICT Consultancy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                <span>Fedha, Embakasi East, Nairobi</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-secondary" />
                <a href="tel:+254751128860" className="hover:text-secondary transition-colors">+254 751 128 860</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-secondary" />
                <a href="mailto:info@masiraconsultingltd.com" className="hover:text-secondary transition-colors">info@masiraconsultingltd.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>© {currentYear} MASIRA & CO Consulting Ltd. All rights reserved.</p>

          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="hover:text-secondary transition-colors"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              onClick={() => setTermsOpen(true)}
              className="hover:text-secondary transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <LegalModal
        isOpen={privacyOpen}
        onOpenChange={setPrivacyOpen}
        title="Privacy Policy"
        lastUpdated={currentYear}
      >
        {/* ... modal content remains unchanged ... */}
        <h5 className="text-base font-semibold text-foreground mt-2 mb-3">1. Introduction</h5>
        <p>
          MASIRA & Co Consulting Limited is committed to protecting your personal information in accordance with the Protection of Personal Information Act (POPIA) and other applicable data protection laws.
        </p>
        {/* rest of privacy policy content ... */}
      </LegalModal>

      {/* Terms of Service Modal */}
      <LegalModal
        isOpen={termsOpen}
        onOpenChange={setTermsOpen}
        title="Terms of Service"
        lastUpdated={currentYear}
      >
        {/* ... modal content remains unchanged ... */}
        <h5 className="text-base font-semibold text-foreground mt-2 mb-3">1. Acceptance of Terms</h5>
        <p>
          By accessing or using the IBS Consulting website and services, you agree to be bound by these Terms of Service.
        </p>
        {/* rest of terms content ... */}
      </LegalModal>
    </footer>
  );
};

export default Footer;
