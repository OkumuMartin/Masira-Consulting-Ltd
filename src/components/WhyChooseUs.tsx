import { Shield, TrendingUp, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Award, title: "Proven Expertise", desc: "Decades of combined experience across industries and disciplines." },
  { icon: TrendingUp, title: "Results-Driven", desc: "Measurable outcomes with clear KPIs and accountability." },
  { icon: Shield, title: "Trusted Partner", desc: "Confidential, reliable, and committed to your long-term success." },
  { icon: Clock, title: "Agile Delivery", desc: "Rapid deployment with flexible engagement models." },
];

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Team Members" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">Why Apex</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Why Leading Organizations Choose Us
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              We combine deep industry knowledge with innovative methodologies to
              deliver transformative results for businesses of all sizes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <r.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{r.title}</h4>
                    <p className="text-muted-foreground text-sm">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 shadow-card text-center"
              >
                <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">{s.value}</p>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
