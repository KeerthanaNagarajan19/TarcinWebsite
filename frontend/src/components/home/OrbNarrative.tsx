import React from "react";
import { Orb3D, Panel } from "../../components/shared/Orb3D";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../../lib/animations";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
// import gif_logo from "../../assets/gif.mp4";


const OrbNarrative: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  const leftPanels = [
    {
      icon: "ri-robot-line",
      title: "Robotic",
      description:
        "Building intelligent systems that automate complex tasks - from industrial automation to educational robotics kits - designed for reliability and scalability.",
    },
    {
      icon: "ri-code-box-line",
      title: "Software Solutions",
      description:
        "Designing data-driven software systems including CRM, ERP, and analytics platforms that turn complex data into actionable insights, helping organizations operate efficiently.",
    },
  ];

  const rightPanels = [
    {
      icon: "ri-wifi-line",
      title: "Internet of Things (IoT)",
      description:
        "Connecting devices and systems through custom IoT solutions that enable real-time data and smarter operations across industries.",
    },
    {
      icon: "ri-book-open-line",
      title: "Educational Technology",
      description:
        "Empowering learners with tools and platforms that simplify complex concepts, fostering skill development and innovation from the ground up.",
    },
  ];

  return (
    <section
      id="orb-narrative"
      className="py-16 md:py-24 bg-blue-50 relative overflow-hidden"
    >


      <div className="container relative z-10 mx-auto px-4">
        <div
          className="text-center mb-12 md:mb-16"
          ref={elementRef as React.RefObject<HTMLDivElement>}
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] tracking-tight leading-tight"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Our Core Focus Areas
          </motion.h2>
          <motion.p
            className="mt-6 text-base md:text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            We engineer systems at the edge of innovation—from physical automation to intelligent infrastructure—that deliver meaningful, measurable outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-7xl mx-auto px-4">
          {/* Left Column Panels */}
          <div className="space-y-6 md:space-y-12 order-2 lg:order-1">
            <Panel
              title={leftPanels[0].title}
              description={leftPanels[0].description}
              delay={0.1}
              position="left"
              yOffset={100}
            />
            <Panel
              title={leftPanels[1].title}
              description={leftPanels[1].description}
              delay={0.3}
              position="left"
              yOffset={-100}
            />
          </div>

          {/* Central Orb/Logo */}
          <div className="order-1 lg:order-2 flex justify-center py-6 lg:py-0">
            <Orb3D />
          </div>

          {/* Right Column Panels */}
          <div className="space-y-6 md:space-y-12 order-3">
            <Panel
              title={rightPanels[0].title}
              description={rightPanels[0].description}
              delay={0.2}
              position="right"
              yOffset={100}
            />
            <Panel
              title={rightPanels[1].title}
              description={rightPanels[1].description}
              delay={0.4}
              position="right"
              yOffset={-100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbNarrative;