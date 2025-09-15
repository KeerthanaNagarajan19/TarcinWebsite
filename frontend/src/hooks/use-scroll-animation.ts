import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number; // 0 to 1, percentage of element visibility required
  rootMargin?: string; // margin around the root
  once?: boolean; // whether to run the animation only once
}

/**
 * Hook to trigger animations when an element comes into view
 */
export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { 
    threshold = 0.1, 
    rootMargin = "0px", 
    once = true 
  } = options;
  
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once]);

  return { elementRef, isVisible };
};

export default useScrollAnimation;
