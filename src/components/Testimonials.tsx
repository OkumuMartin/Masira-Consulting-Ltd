import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "Apex transformed our HR operations completely. Their outsourcing solution saved us 40% in operational costs while improving employee satisfaction scores.",
    name: "Sarah Mokoena",
    title: "CEO, TechBridge Solutions",
  },
  {
    quote: "The strategic consulting team helped us navigate a complex market entry. Revenue grew 3x within 18 months of implementing their recommendations.",
    name: "David Nkosi",
    title: "Managing Director, GreenField Exports",
  },
  {
    quote: "Their ICT consultancy modernized our entire infrastructure. The cybersecurity framework they implemented gives us peace of mind every day.",
    name: "Amanda Chen",
    title: "CTO, MediCare Group",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-surface">
      <div className="container">
        <div className="text-center mb-12">
          <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl p-8 md:p-12 shadow-card text-center"
            >
              <Quote className="w-10 h-10 text-secondary/30 mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-display italic">
                "{testimonials[current].quote}"
              </blockquote>
              <p className="font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-muted-foreground text-sm">{testimonials[current].title}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-secondary w-6" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
