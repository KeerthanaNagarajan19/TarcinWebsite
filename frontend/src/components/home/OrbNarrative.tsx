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
      className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-blue-100 opacity-70"></div>
        <div className="absolute top-1/4 -left-8 w-24 h-24 rounded-full bg-blue-200 opacity-50"></div>
        <div className="absolute bottom-1/3 right-1/5 w-40 h-40 rounded-full bg-blue-50 opacity-60"></div>
      </div>

      <div className="container-fluid relative z-10 mx-auto">
        <div
          className="text-center mb-16"
          ref={elementRef as React.RefObject<HTMLDivElement>}
        >
          <motion.h2
            className="text-xl md:text-2xl font-bold text-blue-900"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Our Core Focus Areas
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-blue-950 max-w-3xl mx-auto font-medium"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            We engineer systems at the edge of innovation - from physical automation to intelligent infrastructure - that deliver meaningful, measurable outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Panels */}
          <div className="text-justify order-2 lg:order-1 space-y-8">
            {leftPanels.map((panel, index) => (
              <Panel
                key={index}
                icon={panel.icon}
                title={panel.title}
                description={panel.description}
                delay={index}
                position="left"
              />
            ))}
          </div>

          {/* Orb Visualization */}
          <div className="order-1 lg:order-2 lg:col-span-1 flex justify-center">
            <Orb3D />
          </div>

{/* <div className="order-1 lg:order-2 lg:col-span-1 flex justify-center items-center">
  <video
    src={gif_logo}
    autoPlay
    loop
    muted
    playsInline
    className="h-64 lg:h-[50vh] w-auto object-contain drop-shadow-lg rounded-xl transition-transform duration-500 hover:scale-105"
  />
</div> */}



          {/* Right Panels */}
          <div className="text-justify order-3 space-y-8">
            {rightPanels.map((panel, index) => (
              <Panel
                key={index}
                icon={panel.icon}
                title={panel.title}
                description={panel.description}
                delay={index}
                position="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrbNarrative;