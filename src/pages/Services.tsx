import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase, Users, ShieldCheck, DollarSign, GraduationCap, Handshake,
  BarChart3, Megaphone, Palette, BookOpen, Calculator, FileText,
  Monitor, Server, Lock, Rocket, ArrowRight
} from "lucide-react";

const serviceCategories = [
  {
    id: "management",
    title: "General Management Consulting",
    desc: "Strategic guidance to optimize performance and drive sustainable growth.",
    icon: Briefcase,
    items: [
      { icon: Briefcase, title: "Strategy Development", desc: "Craft actionable roadmaps aligned with your business vision and market dynamics." },
      { icon: BarChart3, title: "Process Improvement", desc: "Streamline workflows, reduce waste, and enhance operational efficiency." },
      { icon: Rocket, title: "Performance Optimization", desc: "Data-driven insights to maximize profitability and organizational effectiveness." },
    ],
  },
  {
    id: "hr",
    title: "Human Resource Solutions",
    desc: "End-to-end HR services to build, manage, and develop your workforce.",
    icon: Users,
    items: [
      { icon: Users, title: "HR Outsourcing", desc: "Complete HR function management so you can focus on your core business." },
      { icon: Handshake, title: "Recruitment & Talent", desc: "Find and attract the right talent with our proven acquisition strategies." },
      { icon: ShieldCheck, title: "Occupational Safety & Health", desc: "Ensure compliance with OSH regulations and create safer workplaces." },
      { icon: DollarSign, title: "Payroll Management", desc: "Accurate, timely payroll processing with full regulatory compliance." },
      { icon: GraduationCap, title: "Training & Development", desc: "Upskill your team with customized programs aligned to business goals." },
      { icon: Handshake, title: "Labour Relations", desc: "Navigate complex labour laws and maintain productive employee relations." },
    ],
  },
  {
    id: "marketing",
    title: "Sales & Marketing Solutions",
    desc: "Drive revenue growth through strategic marketing and brand development.",
    icon: Megaphone,
    items: [
      { icon: BarChart3, title: "Market Research", desc: "Deep market analysis to identify opportunities and understand your customers." },
      { icon: Megaphone, title: "Digital Marketing", desc: "Multi-channel campaigns that increase visibility and generate leads." },
      { icon: Palette, title: "Branding & Growth", desc: "Build a compelling brand identity that resonates and drives loyalty." },
    ],
  },
  {
    id: "accounting",
    title: "Accounting & Bookkeeping",
    desc: "Comprehensive financial management to keep your business healthy.",
    icon: BookOpen,
    items: [
      { icon: BookOpen, title: "Financial Records", desc: "Accurate bookkeeping and record management you can rely on." },
      { icon: Calculator, title: "Tax Preparation", desc: "Expert tax planning and preparation to minimize liability." },
      { icon: FileText, title: "Financial Reporting", desc: "Clear, actionable financial reports for informed decision-making." },
    ],
  },
  {
    id: "ict",
    title: "ICT Consultancy",
    desc: "Modernize your technology landscape for competitive advantage.",
    icon: Monitor,
    items: [
      { icon: Server, title: "IT Infrastructure", desc: "Design and implement robust, scalable technology foundations." },
      { icon: Monitor, title: "System Integration", desc: "Seamlessly connect your systems for unified data flow and efficiency." },
      { icon: Lock, title: "Cybersecurity Advisory", desc: "Protect your assets with comprehensive security frameworks and audits." },
      { icon: Rocket, title: "Digital Transformation", desc: "Leverage emerging technologies to reimagine your business processes." },
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <SEOHead title="Services" description="Explore Masira & CO Consulting Ltd's professional services: management consulting, HR solutions, sales & marketing, accounting, and ICT consultancy for businesses in Nairobi, Kenya and East Africa." path="/services" />
      <Navbar />
      <main>
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Our Services</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Integrated Solutions for Every Business Need
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                From strategy to execution, our comprehensive service portfolio
                covers every aspect of business growth and operational excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {serviceCategories.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-24 ${ci % 2 === 1 ? "bg-gradient-surface" : ""}`}
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{cat.title}</h2>
                </div>
              </motion.div>
              <p className="text-muted-foreground mb-10 max-w-2xl">{cat.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.desc}</p>
                    <Link to="/contact" className="inline-flex items-center gap-1 text-secondary text-sm font-medium hover:gap-2 transition-all">
                      Request Service <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
