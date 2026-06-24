import { Shield, TrendingUp, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  {
    icon: Award,
    title: "Proven Expertise",
    desc: "Decades of combined experience across industries and disciplines in Kenya and East Africa.",
  },
  {
    icon: TrendingUp,
    title: "Results-Driven",
    desc: "Measurable outcomes with clear KPIs and full accountability to your business goals.",
  },
  {
    icon: Shield,
    title: "Trusted Partner",
    desc: "Confidential, reliable, and fully committed to your long-term success.",
  },
  {
    icon: Clock,
    title: "Agile Delivery",
    desc: "Rapid deployment with flexible engagement models tailored to your needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Text Content */}
          <div>
            <p className="text-secondary font-medium text-sm uppercase tracking-wide mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Why Leading Organizations Choose Masira & CO
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              We combine deep industry knowledge with innovative methodologies to
              deliver transformative results for businesses of all sizes across
              Kenya and East Africa.
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

          {/* RIGHT — Visual Brand Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl bg-gradient-primary p-10 text-primary-foreground text-center shadow-elevated">
              <p className="text-6xl font-display font-bold mb-2">10+</p>
              <p className="text-lg font-semibold mb-8 text-primary-foreground/90">
                Years Serving Businesses in East Africa
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "Kenya", label: "Headquartered In" },
                  { value: "5+", label: "Industries Covered" },
                  { value: "East Africa", label: "Region Served" },
                  { value: "24/7", label: "Client Support" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
                  >
                    <p className="text-xl font-bold text-primary-foreground">
                      {item.value}
                    </p>
                    <p className="text-xs text-primary-foreground/70 mt-1">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;