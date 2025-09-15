import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import logo from "../../assets/Logo_T.png"

interface PanelProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
  position: "left" | "right";
}

const Panel: React.FC<PanelProps> = ({
  icon,
  title,
  description,
  delay,
  position,
}) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    once: true,
  });

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={fadeUpVariants}
      custom={delay}
      className="p-6 bg-white rounded-xl hover:shadow-lg shadow-md transition-shadow duration-300 border border-blue-100"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 p-3 bg-blue-100 text-blue-800 rounded-lg shadow-sm">
          <i className={`${icon} text-2xl`}></i>
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-bold text-blue-900 mb-2">{title} </h3>
          <p className="text-blue-950">
            {description} 
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Orb3D: React.FC = () => {
  return (
    // <div className="orb-container mx-auto flex justify-center items-center h-full">
    //   <div className="relative h-[300px] w-[300px] flex items-center justify-center">
    //     {/* CSS-based orb with animation */}
    //     <div className="orb">
    //       {/* Add inner reflection effect */}
    //       <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full"></div>
          
    //       {/* Add circuit pattern */}
    //       <div className="circuit-lines"></div>
          
    //       {/* Add floating dots */}
    //       <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-blue-500 shadow-glow-blue"></div>
    //       <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-green-500 shadow-glow-green"></div>
    //       <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-amber-500 shadow-glow-yellow"></div>
    //     </div>
        
    //     {/* Add glow effect */}
    //     <div className="absolute inset-0 hero-glow"></div>
    //   </div>
    // </div>

    <div className="flex justify-center items-center h-[400px] w-[400px] mx-auto">
  <div className="logo-wrapper rounded-full p-6 bg-white/10 animate-blink-spin shadow-custom-glow">
    <img src={logo} alt="logo" className="w-48 h-48 object-contain rounded-full" />
  </div>
</div>

  );
};

export { Orb3D, Panel };