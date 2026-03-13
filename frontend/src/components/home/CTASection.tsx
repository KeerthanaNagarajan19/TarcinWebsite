import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../ui/button";
import { ArrowRight, PhoneCall, Gauge } from "lucide-react";

const CTASection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [, navigate] = useLocation();

  const goToContact = () => navigate("/contact");
  const goToServices = () => navigate("/services");

  return (
    // <section className="py-16 md:py-24 bg-gradient-to-r from-blue-700 to-purple-700 text-white relative overflow-hidden">
    <section className="py-16 md:py-24 bg-blue-900 text-white relative overflow-hidden">

      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeLinecap="round" d="M 0,50 A 50,50 0 0,0 100,50 A 50,50 0 0,1 200,50">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="-200 0"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </path>
              <path fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" strokeLinecap="round" d="M 0,100 A 50,50 0 0,0 100,100 A 50,50 0 0,1 200,100">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="-200 0"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </path>
              <path fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" strokeLinecap="round" d="M 0,150 A 50,50 0 0,0 100,150 A 50,50 0 0,1 200,150">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  from="0 0"
                  to="-200 0"
                  dur="24s"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wave)" />
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-5 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight leading-tight"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Ready to Transform Your Business?
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto mb-10 leading-relaxed"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Partner with Tarcin to implement cutting-edge technologies that drive efficiency, innovation, and growth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={2}
          >
            <Button
              onClick={goToContact}
              className="btn btn-blue group px-8 py-4 rounded-lg bg-white hover:text-white  text-blue-700 font-bold text-base shadow-lg hover:shadow-xl transition-all wave-btn flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" />
              Request a Consultation
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ml-1" />
            </Button>

            <Button
              onClick={goToServices}
              className="btn btn-purple px-8 py-4 rounded-lg bg-transparent border-2 border-white/50 text-white font-bold text-base hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Gauge className="w-5 h-5" />
              Explore Services
            </Button>
          </motion.div>

          {/* Client logos or trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center items-center gap-8"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={3}
          >
            <div className="bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Trusted by innovative organizations</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
