import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { countingAnimation } from "../../lib/animations";

interface Stat {
  icon: string;
  value: number;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: "ri-building-line",
    value: 50,
    label: "Institutions Connected",
    color: "blue",
  },
  {
    icon: "ri-user-follow-line",
    value: 10000,
    label: "Students Engaged",
    color: "purple",
  },
  {
    icon: "ri-graduation-cap-line",
    value: 5,
    label: "Centres of Excellence",
    color: "amber",
  },
  {
    icon: "ri-community-line",
    value: 5,
    label: "Years Building Community",
    color: "green",
  },
];

const Stats: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        countingAnimation(countersRef.current[index], stat.value);
      });
    }
  }, [isVisible]);

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-xl md:text-2xl font-heading font-bold text-deep-navy dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            S2P Community & Institutional Presence
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Our Student to Professional pipeline filters, mentors, and deploys skilled students into real-world client and internal projects, creating a sustainable talent ecosystem.
          </motion.p>
        </div>

        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center relative overflow-hidden group hover:shadow-xl transition-shadow duration-300`}
            >
              <div className={`absolute inset-0 bg-${stat.color}-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <i className={`${stat.icon} text-4xl text-${stat.color}-500 mb-4`}></i>
              <div className={`text-4xl sm:text-5xl font-heading font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                <span ref={el => countersRef.current[index] = el}>0</span>
                {stat.value === 98 ? "%" : "+"}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
