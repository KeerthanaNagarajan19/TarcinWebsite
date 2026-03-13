import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import ServicesSection from "../components/services/ServicesSection";
import Newsletter from "../components/home/Newsletter";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";
import { MonitorPlay, FileText, Rocket, ArrowRight } from "lucide-react";

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

        <section
          className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)" }}
        >
          <div className="absolute inset-0 opacity-15 animate-wave">
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
              @keyframes waveMove { 0% { transform: translateX(0); } 100% { transform: translateX(-100px); } }
              .animate-wave svg { animation: waveMove 5s linear infinite; }
            `}
          </style>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
              >
                Educational Services
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
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
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-black mb-6 md:mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              S2P Community Platform
            </motion.h2>
            <motion.p
              className="mt-4 text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              Our comprehensive educational ecosystem designed to connect students, teachers, and parents in a collaborative STEM learning environment.
            </motion.p>
          </div>

          {/* Split Layout: Image Left, Flow + Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 items-start">

            {/* Left side: Premium Image + Education Levels */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative h-[250px] lg:h-[320px] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=1000&q=80"
                  alt="Students collaborating"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-100 group-hover:from-blue-900/95 group-hover:via-blue-900/40 transition-all duration-700" />

                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
                  <h3 className="text-2xl font-bold text-white mb-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    Connecting Potential
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-blue-50 leading-relaxed text-sm translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] delay-75">
                      Bridging the gap between academic learning and industry readiness through collaborative STEM education.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Education Levels Grid (Now under the image) */}
              <div className="mt-2 text-center lg:text-left">
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4 pl-1">
                  Supported Education Levels
                </h3>
                <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                  {educationLevels.map((level, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md hover:border-blue-300/80 dark:hover:border-blue-500/80 transition-all duration-300 cursor-default overflow-hidden flex items-center gap-2"
                    >
                      {/* Subtle hover sweep background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Tiny glowing dot indicator */}
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-300/60 dark:bg-blue-800 group-hover:bg-blue-500 group-hover:shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all duration-300 relative z-10" />

                      {/* Text */}
                      <span className="text-[11px] font-bold text-slate-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors relative z-10 uppercase tracking-[0.2em]">
                        {level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Flow + Cards */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* Animated SVG Flow */}
              <div className="relative h-48 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 shadow-sm overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
                  <path
                    d="M100,100 C200,50 300,150 400,100 C500,50 600,150 700,100"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="5"
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
                  <circle cx="100" cy="100" r="16" fill="#3b82f6" className="pulse-circle" />
                  <text x="100" y="145" textAnchor="middle" fill="currentColor" className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">Students</text>

                  <circle cx="400" cy="100" r="16" fill="#8b5cf6" className="pulse-circle" style={{ animationDelay: "1s" }} />
                  <text x="400" y="145" textAnchor="middle" fill="currentColor" className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">Platform</text>

                  <circle cx="700" cy="100" r="16" fill="#3b82f6" className="pulse-circle" style={{ animationDelay: "2s" }} />
                  <text x="700" y="145" textAnchor="middle" fill="currentColor" className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">Industry</text>
                </svg>
                <style>{`
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

              {/* Modules List — Clean, borderless layout */}
              <div className="flex flex-col gap-6 flex-grow mt-2">
                {s2pModules.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-5"
                  >
                    {/* Icon Container - Clean style */}
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:scale-105 transition-all duration-300">
                      <i className={`${module.icon} text-2xl`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col pt-1">
                      <h3 className="text-xl md:text-2xl font-heading font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-tight tracking-tight">
                        {module.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                        {module.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>



          {/* Learning Flow Diagram */}
          <div className="mb-16">
            <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-8 text-center">
              Learning Journey
            </h3>
            <div className="bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-800/20 border border-gray-100 dark:border-gray-800 rounded-[2rem] p-10 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] relative overflow-hidden">
              {/* Premium Blur Glow Backgrounds */}
              <div className="absolute -top-[150px] -right-[150px] w-[400px] h-[400px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
              <div className="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-[100px] -z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center md:items-start max-w-5xl mx-auto">
                {/* Continuous Animated Connecting Track Background (Desktop) */}
                <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="w-full h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                  />
                </div>

                {["Explore", "Learn", "Practice", "Create", "Share", "Advance"].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center mb-10 md:mb-0 relative group w-full md:w-auto z-10 flex-1"
                  >
                    {/* Hover Glow Behind Number */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-400/30 dark:bg-blue-500/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Step Node */}
                    <motion.div
                      whileHover={{ scale: 1.15, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-[18px] bg-white dark:bg-gray-900 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center font-bold text-xl mb-5 relative z-20 group-hover:border-blue-500/50 transition-colors duration-300 cursor-default overflow-hidden"
                    >
                      <span className="relative z-10 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300">{index + 1}</span>
                      {/* Fill animation on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                    </motion.div>

                    {/* Step Title Label */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-gray-100/50 dark:group-hover:border-blue-800 transition-colors duration-300">
                      <span className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                        {step}
                      </span>
                    </div>

                    {/* Mobile Connecting Line */}
                    {index < 5 && (
                      <div className="md:hidden w-1 h-12 bg-gradient-to-b from-blue-400 to-indigo-500 my-4 rounded-full" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Ultra Premium Demo Request */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative lg:mx-8 xl:mx-16 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-blue-50 mb-16 bg-white"
          >
            {/* Subtle Light Accents */}
            <div className="absolute inset-0 bg-white z-0" />
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-50/50 blur-[120px] rounded-full z-0" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-50/50 blur-[120px] rounded-full z-0" />


            <div className="relative z-10 w-full flex flex-col items-center text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-block py-2.5 px-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm"
              >
                Evolve Your Institution
              </motion.span>

              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-black mb-8 tracking-tight"
              >
                Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Future</span> of Learning
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-12 lg:mb-16 max-w-2xl text-center"
              >
                See how our S2P Community platform can enhance STEM education at your institution. Schedule a demonstration customized for your specific needs.
              </motion.p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl mb-12 lg:mb-16">
                {[
                  { title: "Interactive Tour", desc: "Full platform walkthrough with sample lessons", icon: MonitorPlay, color: "bg-blue-50 text-blue-600", delay: 0.5 },
                  { title: "Curriculum Match", desc: "Overview of integration & assessment paths", icon: FileText, color: "bg-indigo-50 text-indigo-600", delay: 0.6 },
                  { title: "Deployment Plan", desc: "Implementation timeline & training details", icon: Rocket, color: "bg-slate-50 text-slate-600", delay: 0.7 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay, duration: 0.5 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative bg-white border border-blue-50/50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${item.color} mb-6 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                      <item.icon className="w-6 h-6" />
                    </div>

                    <h4 className="text-black font-heading font-black text-xl md:text-2xl mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="relative group"
              >
                <a
                  href="/contact"
                  className="relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-black text-white font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-slate-900 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Schedule a Demo</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1" />

                  {/* Subtle sweep effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                </a>
              </motion.div>
            </div>

            <style>{`
              @keyframes shimmer {
                100% {
                  transform: translateX(100%);
                }
              }
            `}</style>
          </motion.div>
        </div>
      </section>

      {/* <CTASection /> */}
      <Newsletter />
    </>
  );
};

export default Services;
