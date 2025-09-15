import { Variants } from "framer-motion";

// Fade up animation for text and content blocks
export const fadeUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.1,
    }
  }),
};

// Scale animation for cards and buttons
export const scaleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: custom * 0.1,
    }
  }),
};

// Staggered container animation for grid layouts
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Slide in from left
export const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.1,
    }
  }),
};

// Slide in from right
export const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: (custom = 0) => ({ 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: custom * 0.1,
    }
  }),
};

// Counting animation for stats
export const countingAnimation = (
  element: HTMLElement | null, 
  end: number, 
  duration: number = 2000, 
  startDelay: number = 0
) => {
  if (!element) return;
  
  let startTime: number | null = null;
  const startValue = 0;
  
  const step = (timestamp: number) => {
    if (!startTime) {
      if (startDelay > 0) {
        startTime = timestamp - 16; // Subtract one frame to begin
        setTimeout(() => requestAnimationFrame(step), startDelay);
        return;
      }
      startTime = timestamp;
    }
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * (end - startValue) + startValue);
    
    element.textContent = currentValue.toString();
    
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = end.toString();
    }
  };
  
  requestAnimationFrame(step);
};
