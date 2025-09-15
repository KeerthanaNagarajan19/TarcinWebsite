import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";

interface Testimonial {
  text: string;
  author: string;
  position: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    text: "The 20-day challenge at Tarcin was a meaningful experience. I learned new skills, worked with a great team, and improved my confidence. Each day brought something new, and the mentors were very supportive. I'm thankful for this opportunity and the growth it gave me.",
    author: "Bhavana",
    position: "CTO, Manufacturing Corp",
    initials: "S",
  },
  {
    text: "The value added session by tarcin was excellent. we came to know about new things in cloud computing,the staff who took the webinar mr.mohamed arsath was very kind and explaining everything calmly. overall the session was great experience.",
    author: "Raghul",
    position: "Learning Director, Global Education",
    initials: "M",
  },
  {
    text: "Thank you for taking the time to share your positive experience with us and it is good and easy to understand we want more to learn nd understand about emerging technologies such as AI,python,digital marketing.",
    author: "Noorul Ayesha ",
    position: "Operations Head, Logistics Plus",
    initials: "NA",
  },
  {
    text: "We Have Learnt So Many New Terms About Cloud Computing And Web Technologies Words. It Was Very Useful Session For Everyone .It Was Very Good Experience, Thank You.We Understood So Many Things Clearly.We Have Experienced With So Many Real Time Experiences.",
    author: "Sai Sindhu Sri",
    position: "CISO, Financial Services Inc.",
    initials: "S",
  },
  {
    text: "The Section Was Very Useful For Us. We Learned A Lot Of New Things. Our Mentor, Arshath Sir Did A Very Good Job. He Taught Us From The Basics Which Helped Us To Understand Things Clearly. All Of His Real Time Examples Made Us To Completely Understand The Concept Easily. We Are Now Eagerly Waiting To Learn New Things. We Got Motivated To Do Things Efficiently.Thankyou.",
    author: "Nivetha Kirubakaran",
    position: "Research Director, BioTech Innovations",
    initials: "NK",
  },
];

const Testimonials: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Auto-scroll carousel
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isVisible]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset timer when manually changing slides
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-gray-800 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
  className="text-xl md:text-2xl font-heading font-bold text-deep-navy dark:text-white"
  initial="hidden"
  animate={isVisible ? "visible" : "hidden"}
  variants={fadeUpVariants}
>
  What Our Clients Say
</motion.h2>

<motion.p
  className="mt-3 text-base text-deep-navy dark:text-gray-300 max-w-2xl mx-auto"
  initial="hidden"
  animate={isVisible ? "visible" : "hidden"}
  variants={fadeUpVariants}
  custom={1}
>
  Real feedback from organizations that have transformed their operations with our solutions.
</motion.p>

        </div>

        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="relative overflow-hidden"
        >
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-yellow-400"></i>
                  ))}
                </div>
                
                <p className="text-justify text-gray-700 dark:text-gray-300 mb-6 text-sm">
                  "{testimonials[activeIndex].text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
                    {testimonials[activeIndex].initials}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-heading font-semibold text-gray-900 dark:text-white">
                      {testimonials[activeIndex].author}
                    </h4>
                    {/* <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonials[activeIndex].position}
                    </p> */}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex
                    ? "bg-blue-600 dark:bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-400"
                } transition-colors`}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
