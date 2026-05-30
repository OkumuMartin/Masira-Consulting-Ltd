import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Award, TrendingUp } from "lucide-react";

const values = [
  { icon: Target, title: "Excellence", desc: "We pursue the highest standards in every engagement." },
  { icon: Heart, title: "Integrity", desc: "Transparency and ethical practice guide all our decisions." },
  { icon: Users, title: "Collaboration", desc: "We partner closely with clients to co-create solutions." },
  { icon: TrendingUp, title: "Innovation", desc: "We leverage cutting-edge approaches for lasting impact." },
];

const team = [
  { name: "James Mthembu", role: "CEO & Founder", bio: "20+ years in management consulting across Africa." },
  { name: "Priya Naidoo", role: "Head of HR Solutions", bio: "Expert in talent acquisition and organizational development." },
  { name: "Michael van der Berg", role: "Director, ICT", bio: "Digital transformation specialist with enterprise background." },
  { name: "Lindiwe Dlamini", role: "CFO & Accounting Lead", bio: "Chartered accountant with deep SME advisory experience." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead title="About Us" description="Learn about Masira & CO Consulting Ltd — our mission, vision, leadership team, and commitment to professional business consulting excellence in Nairobi, Kenya and East Africa." path="/about" />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">About Us</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
                Building Better Businesses Since 2025
              </h1>
              <p className="text-primary-foreground/80 text-lg leading-relaxed">
                Masira & CO Consulting Ltd is a multi-service professional firm dedicated to
                empowering organizations across Kenya and East Africa with integrated business solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24">
          <div className="container grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-8 shadow-card"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide accessible, high-quality consulting services that enable businesses
                of all sizes to optimize operations, develop talent, and achieve sustainable growth.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-8 shadow-card"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-5">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the most trusted consulting partner in Africa, known for delivering
                transformative results and nurturing long-term client relationships.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-gradient-surface">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Our Values</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">What Drives Us</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{v.title}</h4>
                  <p className="text-muted-foreground text-sm">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Leadership</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-card rounded-xl p-6 shadow-card text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{m.name}</h4>
                  <p className="text-secondary text-sm mb-2">{m.role}</p>
                  <p className="text-muted-foreground text-sm">{m.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </div>
  );
};

export default About;
