import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import ServicesSection from "../components/services/ServicesSection";
import Newsletter from "../components/home/Newsletter";
import CTASection from "../components/home/CTASection";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";
import { CheckCircle } from "lucide-react";

const Services: React.FC = () => {
  // Data for S2P (Source-to-Pay) flow
  const s2pModules = [
    {
      title: "Collaborative Learning",
      description: "Interactive platform for students to learn, collaborate, and work on hands-on STEM projects that promote teamwork and knowledge sharing.",
      icon: "ri-team-line"
    },
    {
      title: "Educational Resources",
      description: "Extensive library of learning materials in Tamil and English, covering robotics, coding, IoT, and other STEM subjects for all age groups.",
      icon: "ri-book-open-line"
    },
    {
      title: "Progress Tracking",
      description: "Comprehensive student performance monitoring with detailed analytics for educators to identify areas for improvement and personalized attention.",
      icon: "ri-line-chart-line"
    },
    {
      title: "Project-Based Learning",
      description: "Real-world problem-solving activities that encourage critical thinking and practical application of STEM concepts in everyday situations.",
      icon: "ri-lightbulb-line"
    }
  ];

  const educationLevels = [
    "Primary School", "Middle School", "High School", "College",
    "Vocational", "Teacher Training", "Professional Development", "Community Education"
  ];

  return (
    <>
      <DocumentHead
        title="Services | Tarcin Robotic LLP"
        description="Explore our educational solutions, teacher training programs, and implementation services tailored specifically for educational institutions in Tamil Nadu."
        ogTitle="Educational Services - Tarcin Robotic LLP"
        ogDescription="Discover our comprehensive educational technology solutions including Code Asthram platform and teacher training designed to enhance STEM learning."
      />

      {/* Hero Banner */}
      <header>
        {/* <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden"> */}

          {/* <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" d="M 0,50 L 100,50 M 50,0 L 50,100" />
                  <circle cx="50" cy="50" r="3" fill="rgba(255, 255, 255, 0.5)" />
                  <circle cx="0" cy="50" r="3" fill="rgba(255, 255, 255, 0.5)" />
                  <circle cx="100" cy="50" r="3" fill="rgba(255, 255, 255, 0.5)" />
                  <circle cx="50" cy="0" r="3" fill="rgba(255, 255, 255, 0.5)" />
                  <circle cx="50" cy="100" r="3" fill="rgba(255, 255, 255, 0.5)" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div> */}

        <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-blue-900 text-white relative overflow-hidden">
<div className="absolute inset-0 opacity-20 animate-wave">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wave-lines" width="100" height="40" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
        <path d="M 0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#wave-lines)" />
  </svg>
</div>

<style>
{`
  @keyframes waveMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100px);
    }
  }

  .animate-wave svg {
    animation: waveMove 5s linear infinite;
  }
`}
</style>


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
            >
              Educational Services
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-white/90 mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              Empowering educators with technology solutions that enhance STEM learning and nurture future innovators.
            </motion.p>
          </div>
        </div>
      </section>
      </header>

      {/* Services Tab Section */}
      <ServicesSection />

      {/* S2P Community Section */}
      <section id="s2p" className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              S2P Community Platform
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              Our comprehensive educational ecosystem designed to connect students, teachers, and parents in a collaborative STEM learning environment.
            </motion.p>
          </div>

          {/* Animated SVG Path with hotspots */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="relative h-64 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200">
                <path
                  d="M100,100 C200,50 300,150 400,100 C500,50 600,150 700,100"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  style={{
                    animation: "dash 3s linear forwards"
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                
                {/* Hotspots */}
                <circle cx="100" cy="100" r="15" fill="#3b82f6" className="pulse-circle" />
                <text x="100" y="140" textAnchor="middle" fill="currentColor" className="text-sm">Students</text>
                
                <circle cx="400" cy="100" r="15" fill="#8b5cf6" className="pulse-circle" style={{ animationDelay: "1s" }} />
                <text x="400" y="140" textAnchor="middle" fill="currentColor" className="text-sm">Platform</text>
                
                <circle cx="700" cy="100" r="15" fill="#3b82f6" className="pulse-circle" style={{ animationDelay: "2s" }} />
                <text x="700" y="140" textAnchor="middle" fill="currentColor" className="text-sm">Industry</text>
              </svg>
              <style jsx>{`
                @keyframes dash {
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .pulse-circle {
                  animation: pulse 2s infinite;
                }
                @keyframes pulse {
                  0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
                  }
                  70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
                  }
                  100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Modules List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {s2pModules.map((module, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariants}
                custom={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-6 flex flex-col h-full transform perspective-1000">
                  <div className="flex-grow">
                    <div className="w-14 h-14 mb-6 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <i className={`${module.icon} text-3xl`}></i>
                    </div>
                    <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-3">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {module.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education Levels Grid */}
          <div className="mb-16">
            <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Supported Education Levels
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {educationLevels.map((level, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUpVariants}
                  custom={index * 0.1}
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-base font-semibold text-gray-700 dark:text-gray-300">{level}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Learning Flow Diagram */}
          <div className="mb-16">
            <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Learning Journey
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
                {["Explore", "Learn", "Practice", "Create", "Share", "Advance"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center mb-6 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-2">
                      {index + 1}
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 font-medium">{step}</div>
                    {index < 5 && (
                      <div className="hidden md:block h-0.5 w-16 bg-blue-200 dark:bg-blue-900 my-2 mx-4 rotate-90 md:rotate-0 md:absolute md:translate-x-24 md:translate-y-6"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Request */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Request a Demo
            </h3>
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                  See how our S2P Community platform can enhance STEM education at your institution. Schedule a demonstration customized for your specific educational needs.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Interactive platform walkthrough with sample lesson plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Overview of curriculum integration and assessment options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">Implementation timeline and teacher training details</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <motion.a
                  href="/contact" 
                  className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors wave-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule a Demo
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Newsletter />
    </>
  );
};

export default Services;
