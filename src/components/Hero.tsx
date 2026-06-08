import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Expert Consultants" },
];

const highlights = [
  "Free first consultation",
  "Nairobi based, East Africa wide",
  "Tailored business solutions",
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt="Modern corporate office"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10 py-32">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-secondary text-sm font-medium">
              Integrated Business Solutions — Nairobi, Kenya
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Empowering Businesses
            <br />
            with Integrated
            <br />
            <span className="text-secondary relative">
              Excellence
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary/50 origin-left"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-primary-foreground/80 text-lg md:text-xl mb-6 leading-relaxed max-w-lg"
          >
            From strategy to execution — we deliver management consulting, HR,
            accounting, ICT, and marketing solutions that drive measurable growth.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            {highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-8 group shadow-lg hover:shadow-xl transition-all"
              >
                Get Free Consultation
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+254141482542">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 group"
              >
                <Phone size={18} className="mr-2" />
                Call Us Now
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center sm:text-left"
              >
                <p className="text-2xl md:text-3xl font-display font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/70 text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;