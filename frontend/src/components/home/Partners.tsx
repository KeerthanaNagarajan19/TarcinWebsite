import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { schools } from "../../data"; // Ensure array of objects with { name, image }

const PartnerSchools: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const speed = 50; // pixels per second

  // Move logos continuously unless paused
  useAnimationFrame((_t, delta) => {
    if (!isPaused) {
      baseX.set(baseX.get() - (speed * delta) / 1000);
    }
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const totalWidth = el.scrollWidth / 2; // because of duplicated logos
    if (Math.abs(baseX.get()) >= totalWidth) {
      baseX.set(0);
    }
  });

  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-[#001D4D] mb-6"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Trusted by Top Educational Institutions
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Proudly partnering with renowned schools to support academic excellence and innovation in learning.
          </motion.p>
        </div>

        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="relative w-full overflow-hidden py-8"
        >
          <motion.div
            ref={containerRef}
            className="flex items-center gap-12 min-w-max"
            style={{ x: baseX }}
          >
            {[...schools, ...schools].map((school, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 inline-flex items-center justify-center w-36 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl shadow transition-transform duration-300 cursor-pointer hover:scale-110"
                title={school.name}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img
                  src={school.image}
                  alt={school.name}
                  className="h-14 object-contain transition-transform duration-300"
                />
                {/* Show name only on hover */}
                <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-black dark:text-white bg-white/80 dark:bg-black/80 rounded-b-xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {school.name}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSchools;



// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import useScrollAnimation from "../../hooks/use-scroll-animation";
// import { fadeUpVariants } from "../../lib/animations";
// import { schools } from "../../data"; // Ensure this is an array of objects with `name` and `image` fields

// const PartnerSchools: React.FC = () => {
//   const { elementRef, isVisible } = useScrollAnimation();
//   const [isPaused, setIsPaused] = useState(false);

//   return (
//     <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <motion.h2
//             className="text-3xl md:text-4xl font-heading font-bold text-deep-navy dark:text-white"
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//           >
//             Trusted by Top Educational Institutions
//           </motion.h2>
//           <motion.p
//             className="mt-4 text-xl text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//             custom={1}
//           >
//             Proudly partnering with renowned schools to support academic excellence and innovation in learning.
//           </motion.p>
//         </div>

//         <div
//           ref={elementRef as React.RefObject<HTMLDivElement>}
//           className="relative w-full overflow-hidden py-8"
//         >
//           <motion.div
//             className="flex items-center gap-12 min-w-max"
//             animate={isPaused ? { x: "0%" } : { x: ["0%", "-100%"] }}
//             transition={{
//               duration: 60, // Smooth for lots of logos
//               ease: "linear",
//               repeat: isPaused ? 0 : Infinity,
//             }}
//           >
//             {[...schools, ...schools].map((school, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 inline-flex items-center justify-center w-36 h-20 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:scale-105 hover:brightness-110 transition-transform duration-300 cursor-pointer"
//                 title={school.name}
//                 onMouseEnter={() => setIsPaused(true)}
//                 onMouseLeave={() => setIsPaused(false)}
//               >
//                 <img
//                   src={school.image}
//                   alt={school.name}
//                   className="h-14 object-contain"
//                 />
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PartnerSchools;
