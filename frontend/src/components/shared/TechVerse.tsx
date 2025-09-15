import React from "react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../lib/animations";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { LucideSparkles } from "lucide-react";

const domains = [
  { label: "Robotics", color: "text-blue-600", x: 160, y: 0 },
  { label: "IoT", color: "text-green-600", x: 113, y: 113 },
  { label: "AI/ML", color: "text-purple-600", x: 0, y: 160 },
  { label: "EdTech", color: "text-amber-600", x: -113, y: 113 },
  { label: "Workflow Automation", color: "text-pink-600", x: -160, y: 0 },
  { label: "Agentic AI", color: "text-red-600", x: -113, y: -113 },
  { label: "Data Science", color: "text-teal-600", x: 0, y: -160 },
  { label: "CRM & ERP", color: "text-blue-800", x: 113, y: -113 },
];

const TechVerse: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="tech-verse"
      className="py-20 md:py-28 bg-gradient-to-br from-white via-blue-50 to-white overflow-hidden relative"
    >
      <div className="container-fluid mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          ref={elementRef as React.RefObject<HTMLDivElement>}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeUpVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Our TechVerse Ecosystem
          </h2>
          <p className="text-xl text-blue-950 font-medium">
            Every domain we engineer is a node in a connected system - collaboratively
            driving innovation, intelligence, and impact across industries.
          </p>
        </motion.div>

        {/* Orb container */}
        <div className="relative h-[400px] w-full flex items-center justify-center">
          {/* Core Orb */}
          <div className="relative z-10 h-[140px] w-[140px] rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-2xl flex items-center justify-center">
            <LucideSparkles className="text-white w-8 h-8 animate-pulse" />
          </div>

          {/* Orbiting Domains */}
          {domains.map((domain, i) => (
            <motion.div
              key={i}
              className={`absolute px-2 py-1 rounded shadow-md bg-white/80 backdrop-blur-sm font-mono text-xs font-semibold ${domain.color}`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring" }}
              style={{
                transform: `translate(${domain.x}px, ${domain.y}px)`,
              }}
            >
              {domain.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-24 h-24 bg-blue-200 rounded-full opacity-40 blur-2xl" />
        <div className="absolute bottom-[15%] right-[15%] w-32 h-32 bg-purple-200 rounded-full opacity-40 blur-2xl" />
        <div className="absolute top-[30%] right-[20%] w-20 h-20 bg-amber-200 rounded-full opacity-40 blur-xl" />
      </div>
    </section>
  );
};

export default TechVerse;
