import React, { useState,useEffect } from "react";
import DocumentHead from "../components/shared/DocumentHead";
import ProductsSection from "../components/products/ProductsSection";
import Newsletter from "../components/home/Newsletter";
import CTASection from "../components/home/CTASection";
import { motion } from "framer-motion";
import { fadeUpVariants } from "../lib/animations";
import { Button } from "../components/ui/button";
import { Download, FileText, Shield, Zap } from "lucide-react";
import asthram from "@assets/products/feature_asthram.png";



const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'platform' | 'school' | 'implementation'>('platform');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200); // Tailwind 'md' breakpoint
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
              Our Solutions
            </motion.h1>
            <motion.p
              className="text-base md:text-2xl text-white/90 mb-8"
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
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
            >
              Featured Solution: Code Asthram
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              Our innovative coding education platform designed for schools and colleges across Tamil Nadu.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              {/* This would be a 3D model viewer in production */}
              <div className="h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 relative flex items-center justify-center">
                <img 
                  src={asthram}
                  alt="TarBot X1 Autonomous Robot" 
                  className="max-h-full object-contain" 
                />
                {/* <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-md">5
                  <button className="text-blue-600 dark:text-blue-400 mr-3">1
                    <i className="ri-fullscreen-line text-xl">2</i>
                  </button>
                  <button className="text-blue-600 dark:text-blue-400">3
                    <i className="ri-3d-rotate-line text-xl">4</i>
                  </button>
                </div> */}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariants}
              custom={1}
            >
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                Code Asthram
              </h3>
              <div className="flex items-center mb-6">
                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium px-3 py-1 rounded-full mr-3">
                  Education
                </span>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  Platform
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Code Asthram is our gamified coding education platform designed for schools and colleges. With logic-based learning paths, interactive challenges, and a progress tracking system, it provides an engaging way to learn programming fundamentals.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Gamified Learning</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Engaging game-like environment that makes learning coding concepts fun and accessible for students of all ages.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Skill Progression</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Structured learning paths from basic programming concepts to advanced algorithmic thinking.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Teacher Dashboard</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive tracking and analytics tools for educators to monitor student progress and identify areas for improvement.</p>
                  </div>
                </div>
              </div>
              
              {/* <div className="flex flex-wrap gap-4">
                <Button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors wave-btn">
                  Schedule a School Demo
                </Button>
                <Button variant="outline" className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium transition-colors">
                  <Download className="mr-2 h-4 w-4" /> Curriculum Overview
                </Button>
              </div> */}
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
        className={`px-6 py-4 font-medium transition-colors ${
          activeTab === "platform"
            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        Platform Details
      </button>
      <button
        onClick={() => setActiveTab("school")}
        className={`px-6 py-4 font-medium transition-colors ${
          activeTab === "school"
            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        School Benefits
      </button>
      <button
        onClick={() => setActiveTab("implementation")}
        className={`px-6 py-4 font-medium transition-colors ${
          activeTab === "implementation"
            ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
            : "text-gray-500 dark:text-gray-400"
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
        onChange={(e) => setActiveTab(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-3">Platform</h4>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Deployment</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Cloud-based & Local Install</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Compatibility</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Web, Mobile, Desktop</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Languages</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Tamil, English</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 dark:text-gray-300">Updates</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Quarterly content updates</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div>
                      <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-3">Education</h4>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Difficulty Levels</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Beginner to Advanced</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Curriculum</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">STEM-aligned</td>
                          </tr>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <td className="py-2 text-gray-600 dark:text-gray-300">Assessment</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Built-in progress tracking</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600 dark:text-gray-300">Content Format</td>
                            <td className="py-2 text-gray-900 dark:text-white font-medium">Interactive challenges</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {activeTab === 'school' && (
                  <div className="space-y-6">
                    <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-3">School Benefits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">NEP 2020 Aligned</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">Curriculum structured to align with National Education Policy 2020 focusing on practical skill development and computational thinking.</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <h5 className="font-medium text-green-700 dark:text-green-300 mb-2">Teacher Training</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">Comprehensive onboarding and continuous professional development for teachers to effectively guide students through the platform.</p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Offline Support</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">Partial offline functionality ensuring students can continue learning even with limited internet connectivity.</p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <h5 className="font-medium text-amber-700 dark:text-amber-300 mb-2">Analytics Dashboard</h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">Comprehensive reporting for school administrators to track student performance across classes and identify improvement areas.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'implementation' && (
                  <div>
                    <h4 className="font-heading font-semibold text-gray-900 dark:text-white mb-3">Implementation Process</h4>
                    <div className="relative pb-12">
                      <div className="absolute left-6 top-5 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      
                      <div className="relative flex items-start mb-8">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 z-10">
                          <span className="text-lg font-bold">1</span>
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Initial Assessment</h5>
                          <p className="text-gray-600 dark:text-gray-300">Our team conducts an infrastructure assessment and tailors the deployment plan to your school's facilities.</p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-start mb-8">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 z-10">
                          <span className="text-lg font-bold">2</span>
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Teacher Training</h5>
                          <p className="text-gray-600 dark:text-gray-300">Comprehensive 2-day workshop for teachers to become proficient with the platform and teaching methodology.</p>
                        </div>
                      </div>
                      
                      <div className="relative flex items-start">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 z-10">
                          <span className="text-lg font-bold">3</span>
                        </div>
                        <div className="ml-6">
                          <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Ongoing Support</h5>
                          <p className="text-gray-600 dark:text-gray-300">Regular check-ins, annual curriculum updates, and technical support to ensure smooth operation.</p>
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
