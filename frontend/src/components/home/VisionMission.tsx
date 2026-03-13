import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Reads screen width synchronously on first render (no timing mismatch)
function useIsMobile(breakpoint = 768): boolean {
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

const VisionMission: React.FC = () => {
    const isMobile = useIsMobile(768);

    return (
        <section id="vision-mission" className="py-24 bg-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-50 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100"
                    >
                        <span className="text-blue-600 font-bold text-xs tracking-widest uppercase">Purpose & Values</span>
                    </motion.div>

                    <motion.h2
                        className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-black mb-6 md:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                    >
                        Our Vision & Mission
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        At Tarcin LLP, we empower regional communities with technology that transforms
                        education and sustainability into real-world progress.
                    </motion.p>
                </div>

                <div className="max-w-[1450px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {/* Vision Card — flies in from the right on desktop, fades up on mobile */}
                    <motion.div
                        className="relative px-6 py-10 sm:px-10 md:px-12 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-blue-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group flex flex-col justify-center transition-all duration-300"
                        initial={{ opacity: 0, x: isMobile ? 0 : "120%", y: isMobile ? 40 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 150,
                            damping: 18
                        }}
                        whileHover={{ y: -6, boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)", borderColor: "rgba(37,99,235,0.2)" }}
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-[60px] group-hover:bg-blue-100 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                    <i className="ri-rocket-2-line text-xl"></i>
                                </div>
                                <span className="text-blue-600 font-bold text-xs tracking-widest uppercase">Our Vision</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-heading">Our Vision</h3>
                            <p className="text-gray-600 font-medium leading-relaxed text-base sm:text-[1.1rem]">
                                We envision a future where technology uplifts regional communities, making sustainability,
                                accessibility, and education cornerstones of inclusive growth.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission Card — flies in from the left on desktop, fades up on mobile */}
                    <motion.div
                        className="relative px-6 py-10 sm:px-10 md:px-12 rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-blue-50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden group flex flex-col justify-center transition-all duration-300"
                        initial={{ opacity: 0, x: isMobile ? 0 : "-120%", y: isMobile ? 40 : 0 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{
                            duration: 0.4,
                            type: "spring",
                            stiffness: 150,
                            damping: 18
                        }}
                        whileHover={{ y: -6, boxShadow: "0 40px 80px -20px rgba(0,0,0,0.1)", borderColor: "rgba(37,99,235,0.2)" }}
                    >
                        {/* Background Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-[60px] group-hover:bg-blue-100 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                    <i className="ri-shield-flash-line text-xl"></i>
                                </div>
                                <span className="text-blue-600 font-bold text-xs tracking-widest uppercase">Our Mission</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-heading">Our Mission</h3>
                            <p className="text-gray-600 font-medium leading-relaxed text-base sm:text-[1.1rem]">
                                We build practical, impactful tech solutions that serve Tamil Nadu and Southern India—bridging innovation with execution.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
