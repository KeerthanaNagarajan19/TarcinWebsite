import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { staggerContainerVariants, fadeUpVariants } from "../../lib/animations";

interface Feature {
  icon: string;
  title: string;
  description: string;
  bgColorLight: string;
  bgColorDark: string;
  textColor: string;
  darkTextColor: string;
}

const features: Feature[] = [
  {
    icon: "ri-robot-line",
    title: "Robotic & Automation",
    description: "Designing and prototyping autonomous systems, surveillance robots, and humanoids for practical applications.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
  {
    icon: "ri-cpu-line",
    title: "IoT & Embedded Systems",
    description: "End-to-end smart automation systems, including demo kits and deployable prototypes like Smart Home Mini Kits.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
  {
    icon: "ri-brain-line",
    title: "AI & Data Science",
    description: "Predictive systems, analytics-driven software, and exploratory agentic AI integrations for business intelligence.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
  {
    icon: "ri-dashboard-line",
    title: "Observability & Analytics",
    description: "Intelligent dashboards, monitoring tools, and data intelligence platforms that provide actionable insights.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
  {
    icon: "ri-code-box-line",
    title: "Custom Software Development",
    description: "Tailored CRM/ERP systems, automation backends, and internal business solutions that drive operational efficiency.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
  {
    icon: "ri-book-open-line",
    title: "EdTech & Community",
    description: "Educational tools and platforms that support skill-building, curriculum alignment, and STEM growth for students.",
    bgColorLight: "bg-blue-100",
    bgColorDark: "bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-300",
  },
];

const Features: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section id="features" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-xl md:text-2xl font-bold text-deep-navy"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Core Technology Domains
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy max-w-3xl mx-auto font-medium"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Operating across a diversified and interconnected technology stack to deliver execution-focused solutions with regional impact.
          </motion.p>
        </div>

        <motion.div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              custom={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className={`w-14 h-14 mb-6 rounded-lg ${feature.bgColorLight} ${feature.bgColorDark} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <i className={`${feature.icon} text-3xl ${feature.textColor} ${feature.darkTextColor}`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-justify text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
