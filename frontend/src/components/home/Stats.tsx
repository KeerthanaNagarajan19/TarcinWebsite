import React, { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { useInView } from "framer-motion";

interface Stat {
  icon: string;
  value: number;
  label: string;
  color: string;
  suffix?: string;
}

const stats: Stat[] = [
  {
    icon: "ri-building-line",
    value: 50,
    label: "Institutions Connected",
    color: "#2563eb", // Blue
  },
  {
    icon: "ri-user-follow-line",
    value: 10000,
    label: "Students Engaged",
    color: "#9333ea", // Purple
  },
  {
    icon: "ri-graduation-cap-line",
    value: 5,
    label: "Centres of Excellence",
    color: "#d97706", // Amber
  },
  {
    icon: "ri-community-line",
    value: 5,
    label: "Years Building Community",
    color: "#16a34a", // Green
  },
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-50/30 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-50/20 blur-[100px] rounded-full -z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            S2P Community & Institutional Presence
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Student to Professional pipeline filters, mentors, and deploys skilled students into real-world client and internal projects, creating a sustainable talent ecosystem.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index }: { stat: Stat; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, stat.value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (value) => setCount(Math.floor(value)),
      });
      return () => controls.stop();
    } else {
      setCount(0);
    }
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 text-center relative border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] group overflow-hidden"
    >
      {/* Card Hover Glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-1 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
        style={{ backgroundColor: stat.color }}
      ></div>

      {/* Icon Frame */}
      <div className="mb-8 relative inline-block">
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 transition-colors duration-300"
          style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
          animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <i className={`${stat.icon} text-3xl`}></i>
        </motion.div>
        <div
          className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: stat.color }}
        ></div>
      </div>

      {/* Value */}
      <div
        className="text-5xl font-heading font-bold mb-3 tracking-tight"
        style={{ color: stat.color }}
      >
        <span>{count.toLocaleString()}</span>
        <span className="text-3xl ml-1">+</span>
      </div>

      {/* Label */}
      <p className="text-gray-600 font-bold text-sm md:text-base tracking-wide uppercase opacity-90 group-hover:opacity-100 transition-opacity">
        {stat.label}
      </p>

      {/* Background Decor */}
      <div
        className="absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 rounded-full"
        style={{ backgroundColor: stat.color }}
      ></div>
    </motion.div>
  );
};

export default Stats;
