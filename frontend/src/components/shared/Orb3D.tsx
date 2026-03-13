import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
// @ts-ignore
import logo from "../../assets/Logo_T.png";

interface PanelProps {
  title: string;
  description: string;
  delay: number;
  position: "left" | "right";
  yOffset?: number;
}

// Reads screen width synchronously on first render (no timing mismatch)
function useIsMobile(breakpoint = 1024): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") return window.innerWidth < breakpoint;
    return false;
  });
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

const Panel: React.FC<PanelProps> = ({
  title,
  description,
  delay,
  position,
  yOffset = 0,
}) => {
  const { elementRef } = useScrollAnimation({
    threshold: 0.1,
    once: false,
  });
  const isMobile = useIsMobile(1024);

  // On desktop: fly in dramatically from far left/right
  // On mobile: simple fade-up from below
  const initialX = isMobile ? 0 : (position === "left" ? 450 : -450);
  const initialY = isMobile ? 40 : yOffset;

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        y: -5,
        scale: 1.01,
        boxShadow: "0 15px 30px rgba(37,99,235,0.1)",
        borderColor: "rgba(37,99,235,0.2)"
      }}
      className="p-6 md:p-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-[2rem] md:rounded-[2.5rem] shadow-xl border border-blue-50/50 dark:border-gray-700/50 transition-all duration-300 group cursor-pointer w-full lg:max-w-[800px] min-h-[120px] flex flex-col justify-center mx-auto relative z-20"
    >
      <div className="relative z-10">
        <h3 className="text-lg md:text-xl font-bold text-[#001D4D] dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-xs md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Orb3D: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[260px] w-[260px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] mx-auto relative">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-blue-400/10 blur-[100px] rounded-full animate-pulse" />

      <div className="logo-wrapper relative z-10 rounded-full p-4 md:p-6 bg-white/10 backdrop-blur-sm animate-blink-spin shadow-custom-glow flex items-center justify-center">
        <img src={logo} alt="logo" className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 object-contain rounded-full" />
      </div>
    </div>
  );
};

export { Orb3D, Panel };