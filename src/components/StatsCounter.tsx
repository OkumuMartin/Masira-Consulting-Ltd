import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Briefcase, Award, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Clients Served",
    description: "Businesses transformed across East Africa",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Briefcase,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    description: "Delivering excellence in consulting",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Rated excellent by our clients",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    icon: TrendingUp,
    value: 50,
    suffix: "+",
    label: "Businesses Transformed",
    description: "With measurable growth results",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

// Hook that counts from 0 to target when in view
const useCounter = (target: number, inView: boolean, duration = 2000) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
};

// Individual stat card
const StatCard = ({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.value, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="relative group flex flex-col items-center text-center
        p-6 sm:p-8 rounded-2xl border border-border bg-card
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center mb-4
          group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={26} className={stat.color} />
      </div>

      {/* Animated Number */}
      <div className="flex items-end gap-0.5 mb-1">
        <span
          className={`text-4xl sm:text-5xl font-display font-bold ${stat.color} leading-none`}
        >
          {count}
        </span>
        <span
          className={`text-2xl sm:text-3xl font-bold ${stat.color} leading-none mb-0.5`}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-base sm:text-lg font-semibold text-foreground mb-1">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-snug">
        {stat.description}
      </p>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0
          group-hover:w-2/3 ${stat.bg} rounded-full transition-all duration-500`}
      />
    </motion.div>
  );
};

const StatsCounter = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-muted/30">
      <div className="container px-4 mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-widest
            uppercase text-secondary bg-secondary/10 px-4 py-1.5 rounded-full mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
            Numbers That Speak for Themselves
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Over the years, we have built a track record of measurable results
            for businesses across Kenya and East Africa.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StatsCounter;