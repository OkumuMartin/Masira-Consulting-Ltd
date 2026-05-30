import { Briefcase, Users, BarChart3, BookOpen, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    icon: Briefcase,
    title: "Management Consulting",
    desc: "Strategy development, process improvement, and business performance optimization.",
  },
  {
    icon: Users,
    title: "HR Solutions",
    desc: "Outsourcing, recruitment, payroll, training, and occupational safety.",
  },
  {
    icon: BarChart3,
    title: "Sales & Marketing",
    desc: "Market research, digital marketing, branding, and growth strategies.",
  },
  {
    icon: BookOpen,
    title: "Accounting & Bookkeeping",
    desc: "Financial records, tax preparation, and comprehensive financial reporting.",
  },
  {
    icon: Monitor,
    title: "ICT Consultancy",
    desc: "IT infrastructure, system integration, cybersecurity, and digital transformation.",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="py-24 bg-gradient-surface">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Comprehensive Business Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We provide end-to-end consulting services designed to accelerate growth,
            optimize operations, and future-proof your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to="/services"
                className="group block bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 h-full"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
