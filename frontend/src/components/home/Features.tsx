import React from "react";
import { motion } from "framer-motion";
// @ts-ignore
import techMainImg from "../../assets/illustrations/tech_center_final.png";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "ri-robot-line",
    title: "ROBOTIC & AUTOMATION",
    description: "Designing and prototyping autonomous systems, surveillance robots, and humanoids for practical applications.",
  },
  {
    icon: "ri-cpu-line",
    title: "IOT & EMBEDDED SYSTEMS",
    description: "End-to-end smart automation systems, including demo kits and deployable prototypes like Smart Home Mini Kits.",
  },
  {
    icon: "ri-brain-line",
    title: "AI & DATA SCIENCE",
    description: "Predictive systems, analytics-driven software, and exploratory agentic AI integrations for business intelligence.",
  },
  {
    icon: "ri-code-box-line",
    title: "CUSTOM SOFTWARE DEVELOPMENT",
    description: "Tailored CRM/ERP systems, automation backends, and internal business solutions that drive operational efficiency.",
  },
  {
    icon: "ri-dashboard-line",
    title: "OBSERVABILITY & ANALYTICS",
    description: "Intelligent dashboards, monitoring tools, and data intelligence platforms that provide actionable insights.",
  },
  {
    icon: "ri-book-open-line",
    title: "EDTECH & COMMUNITY",
    description: "Educational tools and platforms that support skill-building, curriculum alignment, and STEM growth for students.",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 lg:py-36 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-20 lg:mb-24 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] tracking-tight leading-tight">
            Advanced Technology Domains
          </h2>
          <motion.div
            className="w-16 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>

        {/* Mobile & Tablet: Simple Grid Layout */}
        <div className="block lg:hidden px-4">
          {/* Center image */}
          <motion.div
            className="flex justify-center mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src={techMainImg}
              alt="Technology Main"
              className="w-full max-w-[200px] sm:max-w-xs h-auto drop-shadow-2xl animate-float-slow"
            />
          </motion.div>
          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                initialX={0}
                initialY={20}
                animationType={["mechanical", "pulse", "neural", "expansion", "floatUp", "flip"][index] as AnimationType}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3 Columns Layout with Laptop in the Center */}
        <div className="hidden lg:grid grid-cols-3 gap-x-12 gap-y-24 items-center relative">

          {/* Column 1: Left */}
          <div className="space-y-24">
            <FeatureCard feature={features[0]} index={0} initialX="120%" initialY="30%" animationType="mechanical" />
            <FeatureCard feature={features[3]} index={3} initialX="120%" initialY="-30%" animationType="expansion" />
          </div>

          {/* Column 2: Center */}
          <div className="flex justify-center flex-col items-center">
            <motion.div
              className="w-full max-w-[450px] relative z-10"
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            >
              <img
                src={techMainImg}
                alt="Technology Main"
                className="w-full h-auto drop-shadow-2xl animate-float-slow"
              />
            </motion.div>
          </div>

          {/* Column 3: Right */}
          <div className="space-y-24">
            <FeatureCard feature={features[1]} index={1} initialX="-120%" initialY="30%" animationType="pulse" />
            <FeatureCard feature={features[4]} index={4} initialX="-120%" initialY="-30%" animationType="floatUp" />
          </div>

          {/* Bottom Row */}
          <div className="col-span-3 flex flex-row justify-center gap-x-12 mt-[-40px]">
            <FeatureCard feature={features[2]} index={2} initialX={0} initialY="-100%" animationType="neural" />
            <FeatureCard feature={features[5]} index={5} initialX={0} initialY="-100%" animationType="flip" />
          </div>

        </div>
      </div>
    </section>
  );
};

type AnimationType = "mechanical" | "pulse" | "neural" | "expansion" | "floatUp" | "flip";

const FeatureCard = ({
  feature,
  index,
  initialX,
  initialY,
  animationType
}: {
  feature: Feature;
  index: number;
  initialX: string | number;
  initialY: string | number;
  animationType: AnimationType;
}) => {

  // Custom variants based on animation type
  const variants = {
    hidden: {
      opacity: 0,
      scale: animationType === "expansion" ? 0 : 0.1,
      x: initialX,
      y: initialY,
      rotate: animationType === "mechanical" ? -45 : animationType === "flip" ? 90 : 0,
      filter: animationType === "neural" ? "blur(10px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        delay: index * 0.2,
        type: "spring",
        stiffness: animationType === "mechanical" ? 60 : 40,
        damping: animationType === "pulse" ? 10 : 18,
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      whileHover={animationType === "pulse" ? { scale: 1.1, filter: "brightness(1.2)" } : { y: -8 }}
      className="flex flex-col items-center text-center group cursor-default"
    >
      <motion.div
        className="mb-5 relative"
        animate={animationType === "pulse" ? {
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        } : {}}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-blue-50/50">
          <i className={`${feature.icon} text-4xl md:text-5xl text-blue-500 group-hover:text-blue-600`}></i>
        </div>

        {/* Particle / Glow for AI/Neural */}
        {animationType === "neural" && (
          <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
        )}
      </motion.div>

      <motion.div
        initial={animationType === "floatUp" ? { y: 20, opacity: 0 } : {}}
        whileInView={animationType === "floatUp" ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#001D4D] mb-3 font-heading tracking-tight uppercase leading-tight">
          {feature.title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed text-gray-700 font-medium max-w-[280px] md:max-w-[320px] mx-auto group-hover:text-gray-900 transition-colors">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Features;
