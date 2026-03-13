import React from "react";
import { TechChip3D } from "../../components/shared/TechChip3D";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Abstract Gradient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-400/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-indigo-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Content text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100/50 shadow-sm mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-[0.15em]">The Future of Automation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black text-slate-900 leading-[1.05] tracking-tight"
            >
              Deep-Tech.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Thoughtfully<br />Engineered
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              TARCIN is a deep-tech startup creating execution-first solutions across Robotic, IoT, AI, Data Science, Observability, and Custom Software. We operate at the intersection of engineering depth and practical impact.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Link 
                to="/products"
                className="group relative inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-2xl overflow-hidden font-bold transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto shadow-xl shadow-slate-900/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Explore Our Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link 
                to="/services"
                className="group inline-flex items-center justify-center bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold transition-all hover:border-slate-900 hover:bg-slate-50 active:scale-95 w-full sm:w-auto"
              >
                <span className="flex items-center gap-2">
                  See Our Services
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column / Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative mt-16 lg:mt-0 flex justify-center"
          >
            <div className="relative z-10 w-full max-w-lg transform hover:-translate-y-4 transition-transform duration-500 ease-out">
               <TechChip3D />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;