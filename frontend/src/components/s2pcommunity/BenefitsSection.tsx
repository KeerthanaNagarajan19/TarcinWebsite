import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaRoute,
  FaUserTie,
  FaBriefcase,
  FaGlobe,
  FaChartLine,
  FaTools
} from 'react-icons/fa';

const benefits = [
  {
    icon: FaRoute,
    title: "Guided Learning Roadmap",
    description:
      "Advance through a structured curriculum, from core concepts to specialized skills, designed for real-world applicability and long-term growth.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FaUserTie,
    title: "Industry Mentorship",
    description:
      "Gain insights and career guidance from seasoned professionals with deep industry expertise and awareness of market dynamics.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: FaBriefcase,
    title: "Real-World Internships",
    description:
      "Work on practical, portfolio-building projects that reflect current industry standards and showcase your technical capabilities.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: FaGlobe,
    title: "Global Networking",
    description:
      "Build connections with professionals, alumni, and partners worldwide to access collaborative and career opportunities.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    icon: FaChartLine,
    title: "Performance Evaluation",
    description:
      "Receive actionable feedback through continuous assessments, helping you track your progress and stay on course.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: FaTools,
    title: "Practical Training",
    description:
      "Engage in immersive, hands-on sessions led by experts at Tarcin Robotic LLP to reinforce learning through experience.",
    color: "from-indigo-600 to-blue-500",
  },
];

const BenefitsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="pt-12 pb-24 bg-white dark:bg-slate-950 relative overflow-hidden" id="benefits">
      {/* Background glow behind timeline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-20 relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-black text-black mb-8 tracking-tight"
          >
            What&apos;s in It for You?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-medium max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Discover the key advantages that make our platform ideal for your career development and professional success.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Static Track Line */}
          <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-full md:-translate-x-1/2"></div>

          {/* Animated Glow Line (Reacts to Scroll) */}
          <motion.div
            className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500 rounded-full md:-translate-x-1/2 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
            style={{ height: lineHeight, transformOrigin: 'top' }}
          ></motion.div>

          <div className="space-y-10 md:space-y-14 relative pt-10 pb-10">
            {benefits.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Content Panel (Staggered Left/Right) */}
                <div className={`md:w-1/2 pl-24 md:pl-0 w-full flex ${index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                    className="relative bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/80 dark:border-slate-800/80 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:border-blue-200 dark:hover:border-blue-900/50 transition-all duration-500 group overflow-hidden w-full max-w-lg"
                  >
                    {/* Soft Hover Aura */}
                    <div className={`absolute -inset-20 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-700 pointer-events-none`}></div>

                    <h3 className="text-xl md:text-2xl font-heading font-black text-black mb-4 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed text-justify relative z-10 text-sm md:text-base">
                      {item.description}
                    </p>

                  </motion.div>
                </div>

                {/* Central Floating Node */}
                <div className="absolute left-[36px] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0, overflow: 'visible' }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
                    className="relative z-20 group cursor-pointer"
                  >
                    {/* Neon Pulse */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-full blur-xl opacity-40 group-hover:opacity-100 group-hover:scale-[1.8] animate-pulse transition-all duration-700`}></div>

                    {/* Solid Tech Core */}
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-900 rounded-full border-4 border-slate-50 dark:border-slate-950 shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center relative z-10 overflow-hidden group-hover:border-blue-100 transition-colors duration-300">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      <item.icon size={26} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 z-10" />
                    </div>
                  </motion.div>
                </div>

                {/* Empty Half (For visual balance on desktop) */}
                <div className="hidden md:block md:w-1/2"></div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
