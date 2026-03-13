import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../ui/button";

import dog from "@assets/products/dog.png";
import book from "@assets/products/book.png";
import head from "@assets/products/head.png";
import charge from "@assets/products/charge-final.png"
import code_asthram from "@assets/products/code-asthram.png";
import spouted from "@assets/products/sprouted.png";
import home from "@assets/products/home_kit.jpeg";


interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tier: "Standard" | "Premium" | "Enterprise";
}

const products: Product[] = [
  {
    id: "code-asthram",
    title: "Code Asthram",
    description:
      "Gamified, syntax-free coding platform enhancing algorithmic thinking for schools and colleges with interactive, curriculum-aligned challenges and logic learning.",
    image: code_asthram,
    category: "Educational",
    tier: "Premium",
  },
  {
    id: "sprouted-lms",
    title: "SproutED LMS",
    description:
      "Lightweight, modular LMS offering classroom tracking, content delivery, and integration features for schools and training institutions seeking digital management.",
    image: spouted,
    category: "Educational",
    tier: "Standard",
  },
  {
    id: "tarcin-crm",
    title: "Tarcin CRM / ChargeHR",
    description:
      "Customizable ERP/CRM with analytics for organizations, supporting sales, HR, and operations with scalable, integrated business process management tools.",
    image: charge,
    category: "Software",
    tier: "Enterprise",
  },
  {
    id: "smart-home-kit",
    title: "Smart Home Mini Kit",
    description:
      "IoT-based demo kit for home automation, showcasing device control, monitoring, and data visualization through intuitive, real-time dashboards.",
    image: home,
    category: "IoT Devices",
    tier: "Standard",
  },
  {
    id: "stem-kits",
    title: "STEM Kits & Books",
    description:
      "Hardware kits and Python books for Grades 3–9, NEP-aligned, fostering early programming skills, embedded systems knowledge, and technical fluency.",
    image: book,
    category: "Educational",
    tier: "Standard",
  },
  {
    id: "surveillance-robot",
    title: "Surveillance Robot",
    description:
      "Paused robotic surveillance solution with real-time monitoring features, mobility, and security integration; open for future strategic development partnerships.",
    image: dog,
    category: "Robotics",
    tier: "Enterprise",
  },
  {
    id: "harvester-agricultural-robot",
    title: "HEMAN – The Next-Gen Humanoid Robot",
    description:
      "Autonomous agricultural robot built for efficient crop harvesting, field data collection, and modern smart farming practices using robotics and AI.",
    image: head,
    category: "Robotics",
    tier: "Enterprise",
  }

];

type Category = "All Products" | "Robotics" | "IoT Devices" | "Software" | "Educational";

const ProductsSection: React.FC = () => {
  const { elementRef } = useScrollAnimation();
  const [activeCategory, setActiveCategory] = useState<Category>("All Products");
  const [showAll, setShowAll] = useState(false);

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setShowAll(false); // Reset view when changing category
  };


  const [isMobile, setIsMobile] = useState(false);

  // 📱 Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleCategoryChange = (category: string) => {
  //   setActiveCategory(category);
  // };



  return (
    <section id="products" ref={elementRef as React.RefObject<HTMLElement>} className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-heading font-black text-black mb-6 md:mb-8 tracking-tight"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Flagship Products
          </motion.h2>
          <motion.p
            className="mt-4 text-slate-500 font-medium text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={1}
          >
            Practical, execution-focused solutions built for real-world application and regional impact, spanning education, software, and IoT domains.
          </motion.p>
        </div>

        {/* Category Filters */}
        <nav aria-label="Product Categories">
          {/* <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeUpVariants}
          custom={2}
        >
          {["All Products", "Robotics", "IoT Devices", "Software", "Educational"].map(
            (category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category as Category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={`px-5 py-2 rounded-full ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </Button>
            )
          )}
        </motion.div> */}

          {/* ✅ Desktop Buttons */}
          {!isMobile && (
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={2}
            >
              {["All Products", "Robotics", "IoT Devices", "Software", "Educational"].map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category as Category)}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all ${activeCategory === category
                    ? "bg-black text-white shadow-lg shadow-black/20"
                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100"
                    }`}
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          )}
        </nav>

        {/* ✅ Mobile Dropdown */}
        {isMobile && (
          <motion.div
            className="mb-6 px-4"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={2}
          >
            <select
              value={activeCategory}
              onChange={(e) => handleCategoryChange(e.target.value as Category)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800"
            >
              {["All Products", "Robotics", "IoT Devices", "Software", "Educational"].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </motion.div>
        )}

        {/* Products */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(8px)", transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 20 }}
                className="group relative flex flex-col transition-all duration-700 h-full border-b border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 pb-6"
              >
                {/* Borderless Premium Image Area */}
                <div className="h-[280px] sm:h-[340px] w-full relative z-10 flex flex-col items-center justify-center mb-6 rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-900/40 group-hover:from-blue-50/50 group-hover:to-indigo-50/30 dark:group-hover:from-blue-900/20 dark:group-hover:to-indigo-900/10 transition-colors duration-700">
                  {/* Subtle Background Edge Glow */}
                  <div className="absolute inset-0 border border-gray-200/50 dark:border-gray-700/30 rounded-[2rem] pointer-events-none group-hover:border-blue-200/50 dark:group-hover:border-blue-700/30 transition-colors duration-700" />

                  {/* Dynamic Glowing Energy Orb behind image */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-400/10 dark:bg-blue-500/10 blur-[50px] rounded-full group-hover:bg-blue-500/20 dark:group-hover:bg-blue-400/20 group-hover:scale-[1.8] transition-all duration-700 pointer-events-none" />

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-[85%] h-[85%] object-contain filter drop-shadow-md group-hover:drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 relative"
                  />

                  {/* Floating Pedestal Shadow */}
                  <div className="absolute bottom-4 w-2/3 h-4 bg-black/10 dark:bg-black/40 blur-[12px] rounded-[100%] scale-x-50 group-hover:scale-x-75 group-hover:opacity-60 opacity-30 transition-all duration-700 pointer-events-none" />
                </div>

                {/* Borderless Content Area (No rigid boxes) */}
                <div className="flex flex-col flex-grow relative z-20 px-2">
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h3 className="text-xl md:text-2xl font-black text-black group-hover:text-blue-600 transition-colors duration-300 font-heading leading-tight">
                      {product.title}
                    </h3>
                    <span
                      className={`shrink-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md transition-all duration-300 shadow-sm ${product.category === "Robotics"
                        ? "bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-500 group-hover:text-white"
                        : product.category === "IoT Devices"
                          ? "bg-green-50 text-green-600 border border-green-100 group-hover:bg-green-500 group-hover:text-white"
                          : product.category === "Software"
                            ? "bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-500 group-hover:text-white"
                            : "bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-500 group-hover:text-white"
                        }`}
                    >
                      {product.category}
                    </span>
                  </div>

                  <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm md:text-base flex-grow">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100/60 dark:border-gray-800/60 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <Link href={`/products/${product.id}`}>
                      <Button
                        variant="ghost"
                        className="text-blue-600 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-blue-800 p-0 transition-all group/btn"
                      >
                        Explore Product
                        <i className="ri-arrow-right-line ml-2 group-hover/btn:translate-x-2 transition-transform"></i>
                      </Button>
                    </Link>

                    <div className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                      {product.tier} Tier
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Products Button */}
        {filteredProducts.length > 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 rounded-xl border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm hover:-translate-y-1"
            >
              {showAll ? "Show Less" : "View All Products"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
