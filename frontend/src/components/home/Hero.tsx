import React from "react";
import { TechChip3D } from "../../components/shared/TechChip3D";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import {Link} from "react-router-dom"

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("orb-narrative");
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <section className="relative min-h-60 overflow-hidden flex items-center bg-gradient-to-br from-white to-blue-50">
      {/* Background elements */}
      <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100 rounded-bl-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-200 rounded-tr-full opacity-40"></div>
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-blue-50 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/5 w-24 h-24 bg-blue-50 rounded-full opacity-30 blur-xl"></div>
      </div>
      
      <div className="container-fluid relative z-10 mx-auto py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="order-2 lg:order-1 space-y-6 max-w-2xl">
            <h1 className="text-justify text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-950 leading-tight">
              Deep-Tech.<br/> Thoughtfully Engineered
            </h1>
            <p className="text-justify text-lg sm:text-xl text-gray-700">
              TARCIN, We are a Deep-Tech StartUp creating execution-first solutions across Robotic, IoT, AI, Data Science, Observability, and Custom Software. We operate at the intersection of engineering depth and practical impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition">
                Explore Our Work
              </button>
              </Link>
              <Link to="/services">
              <button className="border border-blue-700 text-blue-700 px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                See Our Services
              </button>
              </Link>
            </div>
          </div>

          {/* 3D Tech Chip Visualization */}
          <div className="order-1 lg:order-2 flex justify-center">
            <TechChip3D />
          </div>
        </div>

        {/* Scroll indicator - now clickable */}
        {/* <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
          role="button"
          aria-label="Scroll to next section"
        >
          <span className="text-sm text-blue-900 font-medium mb-2 bg-white px-3 py-1 rounded-full shadow-sm">
            Scroll Down
          </span>
          <ArrowDown className="h-5 w-5 text-blue-900 bg-white rounded-full p-1 shadow-sm" />
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;