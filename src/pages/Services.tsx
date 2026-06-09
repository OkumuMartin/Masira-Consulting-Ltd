import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Briefcase, Users, ShieldCheck, DollarSign, GraduationCap, Handshake,
  BarChart3, Megaphone, Palette, BookOpen, Calculator, FileText,
  Monitor, Server, Lock, Rocket, ArrowRight, CheckCircle, Phone
} from "lucide-react";

const serviceCategories = [
  {
    id: "management",
    title: "General Management Consulting",
    desc: "Strategic guidance to optimize performance and drive sustainable growth.",
    icon: Briefcase,
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
    benefits: ["Improved decision making", "Increased profitability", "Streamlined operations"],
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
    color: "from-purple-500 to-purple-600",
    lightColor: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
    benefits: ["Reduced HR overhead", "Better talent retention", "Full compliance"],
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
    color: "from-orange-500 to-orange-600",
    lightColor: "bg-orange-50 dark:bg-orange-950",
    textColor: "text-orange-600 dark:text-orange-400",
    benefits: ["Increased brand visibility", "Higher lead generation", "Better ROI"],
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
    color: "from-green-500 to-green-600",
    lightColor: "bg-green-50 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
    benefits: ["KRA compliance", "Clear financial visibility", "Tax optimization"],
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
    color: "from-teal-500 to-teal-600",
    lightColor: "bg-teal-50 dark:bg-teal-950",
    textColor: "text-teal-600 dark:text-teal-400",
    benefits: ["Modern infrastructure", "Enhanced security", "Digital readiness"],
    items: [
      { icon: Server, title: "IT Infrastructure", desc: "Design and implement robust, scalable technology foundations." },
      { icon: Monitor, title: "System Integration", desc: "Seamlessly connect your systems for unified data flow and efficiency." },
      { icon: Lock, title: "Cybersecurity Advisory", desc: "Protect your assets with comprehensive security frameworks and audits." },
      { icon: Rocket, title: "Digital Transformation", desc: "Leverage emerging technologies to reimagine your business processes." },
    ],
  },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("management");

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Services"
        description="Explore Masira & CO Consulting Ltd's professional services: management consulting, HR solutions, sales & marketing, accounting, and ICT consultancy for businesses in Nairobi, Kenya and East Africa."
        path="/services"
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary text-sm font-medium">Our Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Integrated Solutions for
                <br />
                <span className="text-secondary">Every Business Need</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                From strategy to execution, our comprehensive service portfolio
                covers every aspect of business growth and operational excellence.
              </p>
              <div className="flex flex-wrap gap-3">
                {serviceCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    onClick={() => setActiveCategory(cat.id)}
                    className="flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <cat.icon size={14} className="text-secondary" />
                    <span className="text-primary-foreground/90 text-sm">{cat.title.split(" ")[0]}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Navigation */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container">
            <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
              {serviceCategories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.title.split(" ")[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Service Sections */}
        {serviceCategories.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`py-24 ${ci % 2 === 1 ? "bg-gradient-surface" : ""}`}
          >
            <div className="container">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-8 mb-12 items-center"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg`}>
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className={`text-xs font-medium uppercase tracking-widest ${cat.textColor}`}>
                        Service {String(ci + 1).padStart(2, "0")}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                        {cat.title}
                      </h2>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{cat.desc}</p>
                </div>

                {/* Benefits */}
                <div className={`${cat.lightColor} rounded-2xl p-6`}>
                  <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                    Key Benefits
                  </p>
                  <div className="space-y-3">
                    {cat.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0`}>
                          <CheckCircle size={12} className="text-white" />
                        </div>
                        <span className="text-foreground text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="mt-6 block">
                    <Button className={`w-full bg-gradient-to-r ${cat.color} border-0 text-white hover:opacity-90`}>
                      Get Started
                      <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-2 border border-border hover:border-secondary/30"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.desc}</p>
                    <Link
                      to="/contact"
                      className={`inline-flex items-center gap-1.5 text-sm font-medium ${cat.textColor} hover:gap-3 transition-all`}
                    >
                      Request Service
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Why Choose Us Banner */}
        <section className="py-20 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Get a free consultation with our experts today. No commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8">
                    Get Free Consultation
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <a href="tel:+254141482542">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8">
                    <Phone size={16} className="mr-2" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
