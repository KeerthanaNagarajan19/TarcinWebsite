import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "../../hooks/use-translations";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../../components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

// Enhanced CSS-based tech chip component with more visual elements
const TechChip3D: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg h-[500px] flex items-center justify-center">
      <div className="tech-chip-container">
        <div className="tech-chip-base">
          <div className="tech-chip-inner"></div>
          <div className="tech-chip-glow"></div>

          {/* Add circuit pattern using CSS */}
          <div className="circuit-board absolute inset-0 rounded-lg opacity-30"></div>

          {/* Connecting lines */}
          <div className="absolute h-[1px] w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent top-1/3 left-1/4 rotate-45"></div>
          <div className="absolute h-[1px] w-20 bg-gradient-to-r from-transparent via-green-400 to-transparent bottom-1/3 right-1/4 -rotate-45"></div>
          <div className="absolute h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent top-1/2 right-1/3"></div>

          {/* Glowing dots with pulsing effect */}
          <div className="absolute w-3 h-3 rounded-full bg-blue-500 shadow-glow-blue top-1/4 right-1/4"></div>
          <div className="absolute w-2 h-2 rounded-full bg-green-500 shadow-glow-green bottom-1/4 left-1/4"></div>
          <div className="absolute w-4 h-4 rounded-full bg-amber-500 shadow-glow-yellow top-1/4 left-1/3"></div>

          {/* Add small labels for tech areas (Original 3 + 5 more) */}
          <div className="absolute top-1/4 right-1/6 -mt-4 mr-2 text-xs font-mono text-blue-600 bg-white/80 px-2 py-1 rounded shadow-sm">Robotics</div>
          <div className="absolute bottom-1/4 left-1/6 mb-4 ml-2 text-xs font-mono text-green-600 bg-white/80 px-2 py-1 rounded shadow-sm">IoT</div>
          <div className="absolute top-1/5 left-1/3 mt-8 text-xs font-mono text-amber-600 bg-white/80 px-2 py-1 rounded shadow-sm">AI/ML</div>

          {/* New properly placed domains */}
          <div className="absolute top-[19%] left-[60%] text-xs font-mono text-purple-700 bg-white/80 px-2 py-1 rounded shadow-sm">Agentic AI</div>
          <div className="absolute bottom-[7%] right-[10%] text-xs font-mono text-pink-700 bg-white/80 px-2 py-1 rounded shadow-sm">Automation</div>
          <div className="absolute top-[12%] right-[28%] text-xs font-mono text-red-700 bg-white/80 px-2 py-1 rounded shadow-sm">CRM</div>
          <div className="absolute top-[68%] left-[10%] text-xs font-mono text-yellow-700 bg-white/80 px-2 py-1 rounded shadow-sm">ERP</div>
          <div className="absolute bottom-[15%] left-[50%] text-xs font-mono text-indigo-700 bg-white/80 px-2 py-1 rounded shadow-sm">Data Science</div>
        </div>
      </div>
    </div>
  );
};

const HeroContent: React.FC = () => {
  const { t } = useTranslations();
  const [, navigate] = useLocation();

  const goToProducts = () => navigate("/products");
  const goToAbout = () => navigate("/about");

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      animate="visible"
      className="p-6 md:p-8 bg-white bg-opacity-90 rounded-xl shadow-lg border border-blue-100"
    >
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
        <span className="text-blue-900 drop-shadow-sm">
          {t("hero.title")}
        </span>
      </h1>
      <motion.p
        className="mt-6 text-xl text-blue-950 max-w-2xl font-medium"
        variants={fadeUpVariants}
        custom={1}
      >
        {t("hero.description")}
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col sm:flex-row gap-4"
        variants={fadeUpVariants}
        custom={2}
      >
        <Button
          onClick={goToProducts}
          className="btn btn-blue group px-6 py-3 rounded-lg text-white font-bold text-lg transition-all duration-300 flex items-center gap-2"
        >
          {t("hero.cta.explore")} Explore
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
        <Button
          onClick={goToAbout}
          variant="outline"
          className="btn btn-purple px-6 py-3 rounded-lg text-blue-900 font-bold text-lg transition-all duration-300"
        >
          {t("hero.cta.learn")} Learn More
        </Button>
      </motion.div>

      {/* Badges */}
      <motion.div
        className="mt-6 flex flex-wrap gap-3"
        variants={fadeUpVariants}
        custom={3}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Robotics
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          IoT
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          AI/ML
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          EdTech
        </span>
      </motion.div>
    </motion.div>
  );
};

export { TechChip3D, HeroContent };
