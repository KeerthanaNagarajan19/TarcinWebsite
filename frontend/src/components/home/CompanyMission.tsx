import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { Link } from "wouter";
import missionImg from "../../assets/company_mission_visual.png";

const CompanyMission: React.FC = () => {
  const { elementRef } = useScrollAnimation({
    threshold: 0.1,
  });

  const values = [
    {
      icon: "ri-focus-3-line",
      title: "Execution-Driven Innovation",
      desc: "We develop solutions grounded in real-world impact, not just theory.",
      bgColor: "bg-blue-50/80",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-500/10",
      borderColor: "hover:border-blue-200"
    },
    {
      icon: "ri-earth-line",
      title: "Regional Focus",
      desc: "Focused on solving challenges unique to Tamil Nadu & South India.",
      bgColor: "bg-indigo-50/80",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-500/10",
      borderColor: "hover:border-indigo-200"
    },
    {
      icon: "ri-team-line",
      title: "Community Development",
      desc: "We mentor the S2P community to become job-ready and innovative.",
      bgColor: "bg-teal-50/80",
      iconColor: "text-teal-600",
      iconBg: "bg-teal-500/10",
      borderColor: "hover:border-teal-200"
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden" ref={elementRef as React.RefObject<HTMLDivElement>}>
      <div className="container mx-auto px-4 lg:px-16">

        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left Column: Visual with Badge */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-100">
              <img
                src={missionImg}
                alt="Tarcin Mission"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>

            {/* Floating Badge (Glassmorphism) */}
            <motion.div
              className="absolute bottom-10 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-5"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-[#001D4D] text-lg">Tarcin Robotic LLP</h4>
                <p className="text-gray-500 text-sm font-medium">Execution-first. Always.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Values & CTA */}
          <div className="lg:w-1/2">
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-bold text-[#001D4D] mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              What Drives Us
            </motion.h2>

            <div className="flex flex-col gap-6 mb-12">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  className={`${val.bgColor} p-5 md:p-6 rounded-[1.5rem] border border-transparent ${val.borderColor} transition-all duration-300 group cursor-pointer flex items-center gap-5`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{
                    x: 15,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.08)",
                    scale: 1.02
                  }}
                >
                  <div className={`w-12 h-12 ${val.iconBg} rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12`}>
                    <i className={`${val.icon} ${val.iconColor} text-2xl`}></i>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#001D4D] mb-0.5">{val.title}</h4>
                    <p className="text-gray-500 font-medium text-[0.85rem] leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/about">
                <button className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold tracking-wide hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-100 flex items-center gap-3 active:scale-95 group">
                  Learn More About Us
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-2"></i>
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMission;
