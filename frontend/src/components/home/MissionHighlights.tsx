import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { slideInLeftVariants, slideInRightVariants } from "../../lib/animations";
import { Target, Globe, Users } from "lucide-react";

const MissionHighlights: React.FC = () => {
    const highlights = [
        {
            icon: <Target className="w-6 h-6 text-blue-600" />,
            title: "Execution-Driven Innovation",
            description: "We develop solutions grounded in real-world impact, not just theory.",
        },
        {
            icon: <Globe className="w-6 h-6 text-blue-600" />,
            title: "Regional Focus",
            description: "Focused on solving challenges unique to Tamil Nadu & South India.",
        },
        {
            icon: <Users className="w-6 h-6 text-blue-600" />,
            title: "Community Development",
            description: "We mentor the S2P community to become job-ready and innovative.",
        },
    ];

    return (
        <section className="py-20 bg-blue-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Leftside Image Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideInLeftVariants}
                        className="w-full relative rounded-2xl overflow-hidden shadow-xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                            alt="Mission and Technology"
                            className="w-full h-auto object-cover"
                        />
                        {/* The text "MISSION" overlay could be added via HTML/CSS if needed, but for now we'll just use a cool tech image or gradient overlay */}
                        <div className="absolute inset-0 bg-blue-900/40 mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-widest uppercase" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                                Mission
                            </h2>
                        </div>
                    </motion.div>

                    {/* Rightside Highlights Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideInRightVariants}
                        className="flex flex-col gap-6 md:gap-8"
                    >
                        <div className="flex flex-col gap-6 md:gap-8">
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                                    className="flex items-start gap-4 md:gap-5"
                                >
                                    <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="mt-2 md:mt-4"
                        >
                            <Link to="/about">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5 min-h-[48px]">
                                    Learn More About Us
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default MissionHighlights;
