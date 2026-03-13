import React, { useState, useEffect } from "react";
import DocumentHead from "../components/shared/DocumentHead";
import ProductsSection from "../components/products/ProductsSection";
import Newsletter from "../components/home/Newsletter";
import CTASection from "../components/home/CTASection";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";
import { FileText, Shield, Zap } from "lucide-react";
import asthram from "@assets/products/code-asthram.png";
const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'platform' | 'school' | 'implementation'>('platform');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <DocumentHead
        title="Products | Tarcin Robotic LLP"
        description="Discover our innovative products including custom IoT devices, robotics, and software solutions designed for educational institutions and smart applications."
        ogTitle="Products - Tarcin Robotic LLP"
        ogDescription="Explore our range of technological solutions including Code Asthram, SproutED LMS, and IoT devices for smart applications in Tamil Nadu."
      />

      {/* Hero Banner */}
      <header>
        <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)' }}>

          <div className="absolute inset-0 opacity-15 animate-wave">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wave-lines" width="120" height="50" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
                  <path d="M 0 25 Q 30 5, 60 25 T 120 25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
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
                className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
              >
                Our Solutions
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 mb-8 font-medium leading-relaxed max-w-2xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                custom={1}
              >
                Educational platforms, custom IoT devices, and software solutions for educational institutions.
              </motion.p>
            </div>
          </div>
        </section>
      </header>

      {/* Products Section */}
      <ProductsSection />

      {/* Featured Product Detail */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-heading font-black text-black mb-6 md:mb-8 tracking-tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              Featured Solution: Code Asthram
            </motion.h2>
            <motion.p
              className="mt-4 text-slate-500 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              Our innovative coding education platform designed for schools and colleges across Tamil Nadu.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group [perspective:1000px] z-10"
            >
              {/* Massive Ambient Glow */}
              <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-600/20 blur-[80px] rounded-[3rem] group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-all duration-1000" />

              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/50 dark:border-gray-700/50 relative transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:[transform:rotateY(5deg)_rotateX(-2deg)]">
                {/* Image Container */}
                <div className="h-[400px] sm:h-[450px] lg:h-[550px] bg-gradient-to-br from-blue-50 to-white relative flex items-center justify-center p-8 lg:p-12 overflow-hidden">

                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                  <img
                    src={asthram}
                    alt="Code Asthram Platform"
                    className="w-full h-full object-contain group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700 relative z-20"
                  />

                  {/* Floating Deco Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 right-12 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl opacity-20 blur-2xl z-0"
                  />
                  <motion.div
                    animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 left-12 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-10 blur-3xl z-0"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              className="relative z-20"
            >
              <motion.div variants={fadeUpVariants}>
                <h3 className="text-3xl lg:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-6 drop-shadow-sm tracking-tight text-left">
                  Code Asthram
                </h3>
              </motion.div>

              <motion.div variants={fadeUpVariants} className="flex flex-wrap items-center mb-8 gap-3">
                <span className="bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-amber-100 shadow-sm flex items-center gap-1.5">
                  <i className="ri-medal-fill"></i> Education
                </span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-1.5">
                  <i className="ri-macbook-line"></i> Platform
                </span>
              </motion.div>

              <motion.p variants={fadeUpVariants} className="text-slate-500 mb-10 text-lg md:text-xl leading-relaxed text-left font-medium">
                Code Asthram is our globally-inspired, <span className="font-bold text-black">gamified coding education platform</span> designed for schools and colleges. With logic-based learning paths, interactive challenges, and a progress tracking system, it provides an engaging way to master programming fundamentals.
              </motion.p>

              <div className="space-y-4">
                {[
                  { icon: Zap, title: 'Gamified Learning', desc: 'Engaging game-like environment that makes learning coding concepts fun and accessible for students of all ages.', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/10', border: 'border-yellow-100 dark:border-yellow-500/20' },
                  { icon: Shield, title: 'Skill Progression', desc: 'Structured learning paths from basic programming concepts to advanced algorithmic thinking.', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10', border: 'border-green-100 dark:border-green-500/20' },
                  { icon: FileText, title: 'Teacher Dashboard', desc: 'Comprehensive tracking and analytics tools for educators to monitor student progress and identify areas for improvement.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
                    }}
                    whileHover={{ scale: 1.02, x: 8 }}
                    className="flex items-start p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer group text-left relative overflow-hidden"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
 
                    <div className={`mt-0.5 mr-5 p-3 rounded-xl ${item.bg} ${item.color} ${item.border} border shadow-inner group-hover:rotate-12 transition-transform duration-300 relative z-10 shrink-0`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-black text-lg md:text-xl mb-1.5 group-hover:text-blue-600 transition-colors font-heading tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Technical Specifications */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            >
              {/* <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex flex-wrap">
                  <button 
                    onClick={() => setActiveTab('platform')}
                    className={`px-6 py-4 font-medium transition-colors ${activeTab === 'platform' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    Platform Details
                  </button>
                  <button 
                    onClick={() => setActiveTab('school')}
                    className={`px-6 py-4 font-medium transition-colors ${activeTab === 'school' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    School Benefits
                  </button>
                  <button 
                    onClick={() => setActiveTab('implementation')}
                    className={`px-6 py-4 font-medium transition-colors ${activeTab === 'implementation' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    Implementation
                  </button>
                </nav>
              </div> */}

              <div className="border-b border-gray-200 dark:border-gray-700">
                {/* Desktop Tab Buttons */}
                {!isMobile && (
                  <nav className="flex flex-wrap">
                    <button
                      onClick={() => setActiveTab("platform")}
                      className={`px-8 py-6 font-heading font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "platform"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-slate-400 hover:text-blue-600"
                        }`}
                    >
                      Platform Details
                    </button>
                    <button
                      onClick={() => setActiveTab("school")}
                      className={`px-8 py-6 font-heading font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "school"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-slate-400 hover:text-blue-600"
                        }`}
                    >
                      School Benefits
                    </button>
                    <button
                      onClick={() => setActiveTab("implementation")}
                      className={`px-8 py-6 font-heading font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === "implementation"
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-slate-400 hover:text-blue-600"
                        }`}
                    >
                      Implementation
                    </button>
                  </nav>
                )}

                {/* Mobile Dropdown */}
                {isMobile && (
                  <div className="p-4">
                    <select
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value as any)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-3 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800 min-h-[48px]"
                    >
                      <option value="platform">Platform Details</option>
                      <option value="school">School Benefits</option>
                      <option value="implementation">Implementation</option>
                    </select>
                  </div>
                )}
              </div>


              <div className="p-6">
                {activeTab === 'platform' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <div>
                      <h4 className="font-heading font-bold text-black text-xl md:text-2xl mb-5">Platform</h4>
                      <table className="w-full text-sm md:text-base font-medium">
                        <tbody className="text-slate-600">
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Deployment</td>
                            <td className="py-3 text-black">Cloud-based & Local Install</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Compatibility</td>
                            <td className="py-3 text-black">Web, Mobile, Desktop</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Languages</td>
                            <td className="py-3 text-black">Tamil, English</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Updates</td>
                            <td className="py-3 text-black">Quarterly content updates</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-black text-xl md:text-2xl mb-5">Education</h4>
                      <table className="w-full text-sm md:text-base font-medium">
                        <tbody className="text-slate-600">
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Level</td>
                            <td className="py-3 text-black">Beginner to Advanced</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Curriculum</td>
                            <td className="py-3 text-black">STEM-aligned</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Assessment</td>
                            <td className="py-3 text-black">Built-in tracking</td>
                          </tr>
                          <tr>
                            <td className="py-3 pr-4 font-bold text-slate-400 uppercase text-[11px] tracking-wider">Format</td>
                            <td className="py-3 text-black">Interactive challenges</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'school' && (
                  <div className="space-y-8">
                    <h4 className="font-heading font-bold text-black text-xl md:text-2xl mb-6">School Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <h5 className="font-heading font-bold text-blue-900 text-lg mb-2">NEP 2020 Aligned</h5>
                        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">Curriculum structured to align with National Education Policy 2020 focusing on practical skill development and computational thinking.</p>
                      </div>
                      <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                        <h5 className="font-heading font-bold text-green-900 text-lg mb-2">Teacher Training</h5>
                        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">Comprehensive onboarding and continuous professional development for teachers to effectively guide students through the platform.</p>
                      </div>
                      <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                        <h5 className="font-heading font-bold text-purple-900 text-lg mb-2">Offline Support</h5>
                        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">Partial offline functionality ensuring students can continue learning even with limited internet connectivity.</p>
                      </div>
                      <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                        <h5 className="font-heading font-bold text-amber-900 text-lg mb-2">Analytics Dashboard</h5>
                        <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed">Comprehensive reporting for school administrators to track student performance across classes and identify improvement areas.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'implementation' && (
                  <div className="space-y-8">
                    <h4 className="font-heading font-bold text-black text-xl md:text-2xl mb-8 text-left">Implementation Process</h4>
                    <div className="relative pb-12">
                      <div className="absolute left-6 top-5 bottom-0 w-1 bg-slate-100"></div>
 
                      <div className="relative flex items-start mb-10">
                        <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 z-10 font-black shadow-sm">
                          1
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg md:text-xl font-heading font-bold text-black mb-2">Initial Assessment</h5>
                          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-xl">Our team conducts an infrastructure assessment and tailors the deployment plan to your school's facilities.</p>
                        </div>
                      </div>
 
                      <div className="relative flex items-start mb-10">
                        <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 z-10 font-black shadow-sm">
                          2
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg md:text-xl font-heading font-bold text-black mb-2">Teacher Training</h5>
                          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-xl">Comprehensive 2-day workshop for teachers to become proficient with the platform and teaching methodology.</p>
                        </div>
                      </div>
 
                      <div className="relative flex items-start">
                        <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 z-10 font-black shadow-sm">
                          3
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg md:text-xl font-heading font-bold text-black mb-2">Ongoing Support</h5>
                          <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-xl">Regular check-ins, annual curriculum updates, and technical support to ensure smooth operation.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
      <Newsletter />
    </>
  );
};

export default Products;
