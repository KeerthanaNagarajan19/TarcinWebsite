// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "wouter";
// import { useScrollAnimation } from "@/hooks/use-scroll-animation";
// import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
// import { Button } from "@/components/ui/button";

// interface Product {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   category: string;
//   tier: "Standard" | "Premium" | "Enterprise";
// }

// const products: Product[] = [
//   {
//     id: "code-asthram",
//     title: "Code Asthram",
//     description: "A logic-based, gamified coding education platform aimed at schools and colleges. Focuses on algorithmic thinking, syntax-free learning, and interactive curriculum experiences.",
//     image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Educational",
//     tier: "Premium",
//   },
//   {
//     id: "sprouted-lms",
//     title: "SproutED LMS",
//     description: "A lightweight, modular learning management system built for schools and training institutions, with classroom tracking and integration features.",
//     image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Educational",
//     tier: "Standard",
//   },
//   {
//     id: "tarcin-crm",
//     title: "Tarcin CRM / ChargeHR",
//     description: "Internal and customizable ERP/CRM systems with analytics layers, tailored for organizations of all sizes.",
//     image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Software",
//     tier: "Enterprise",
//   },
//   {
//     id: "smart-home-kit",
//     title: "Smart Home Mini Kit",
//     description: "A deployable, IoT-driven demonstration unit for end-to-end home automation with data visualization and control dashboards.",
//     image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "IoT Devices",
//     tier: "Standard",
//   },
//   {
//     id: "stem-kits",
//     title: "STEM Kits & Books",
//     description: "Hardware kits and Python + Embedded learning books designed for Grades 3–9. Aligns with NEP and supports early technical fluency.",
//     image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Educational",
//     tier: "Standard",
//   },
//   {
//     id: "surveillance-robot",
//     title: "Surveillance Robot",
//     description: "Currently paused project - A robotic surveillance solution for security and monitoring applications. Available for strategic partnerships.",
//     image: "https://images.unsplash.com/photo-1517260739337-6799d239ce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Robotics",
//     tier: "Enterprise",
//   },
//    {
//     id: "stem-kits",
//     title: "STEM Kits & Books",
//     description: "Hardware kits and Python + Embedded learning books designed for Grades 3–9. Aligns with NEP and supports early technical fluency.",
//     image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
//     category: "Educational",
//     tier: "Standard",
//   },
// ];

// type Category = "All Products" | "Robotics" | "IoT Devices" | "Software" | "Educational";

// const ProductsSection: React.FC = () => {
//   const { elementRef, isVisible } = useScrollAnimation();
//   const [activeCategory, setActiveCategory] = useState<Category>("All Products");

//   // Ensure we always have products visible
//   const filteredProducts = 
//     activeCategory === "All Products" 
//       ? products 
//       : products.filter(product => product.category === activeCategory);
      
//   // Make sure we're not showing an empty state due to filter mismatch
//   const handleCategoryChange = (category: Category) => {
//     setActiveCategory(category);
//     // If there are no products in this category, we'll log it (for debugging)
//     if (category !== "All Products" && !products.some(p => p.category === category)) {
//       console.log(`No products found in category: ${category}`);
//     }
//   };

//   return (
//     <section id="products" className="py-16 md:py-24 bg-white dark:bg-gray-800">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <motion.h2
//             className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white"
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//           >
//             Flagship Products
//           </motion.h2>
//           <motion.p
//             className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//             custom={1}
//           >
//             Practical, execution-focused solutions built for real-world application and regional impact, spanning education, software, and IoT domains.
//           </motion.p>
//         </div>

//         {/* Filters */}
//         <motion.div
//           className="flex flex-wrap justify-center gap-4 mb-12"
//           initial="hidden"
//           animate={isVisible ? "visible" : "hidden"}
//           variants={fadeUpVariants}
//           custom={2}
//         >
//           {["All Products", "Robotics", "IoT Devices", "Software", "Educational"].map((category) => (
//             <Button
//               key={category}
//               onClick={() => handleCategoryChange(category as Category)}
//               variant={activeCategory === category ? "default" : "outline"}
//               className={`px-5 py-2 rounded-full ${
//                 activeCategory === category
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//               }`}
//             >
//               {category}
//             </Button>
//           ))}
//         </motion.div>

//         {/* Products Grid */}
//         <motion.div
//           ref={elementRef as React.RefObject<HTMLDivElement>}
//           variants={staggerContainerVariants}
//           initial="hidden"
//           animate={isVisible ? "visible" : "hidden"}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           {filteredProducts.map((product) => (
//             <motion.div
//               key={product.id}
//               variants={fadeUpVariants}
//               className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
//             >
//               {/* 3D model would be rendered here with React Three Fiber in actual implementation */}
//               <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 overflow-hidden relative">
//                 <img 
//                   src={product.image} 
//                   alt={product.title} 
//                   className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500" 
//                 />
//               </div>
              
//               <div className="p-6">
//                 <div className="flex justify-between items-start mb-4">
//                   <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">{product.title}</h3>
//                   <span 
//                     className={`px-3 py-1 text-sm font-medium rounded-full ${
//                       product.category === "Robotics" 
//                         ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300" 
//                         : product.category === "IoT Devices" 
//                         ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
//                         : product.category === "Software"
//                         ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
//                         : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
//                     }`}
//                   >
//                     {product.category}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">
//                   {product.description}
//                 </p>
                
//                 <div className="flex justify-between items-center">
//                   <Link href={`/products/${product.id}`}>
//                     <Button
//                       variant="link"
//                       className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center p-0"
//                     >
//                       View Details
//                       <i className="ri-arrow-right-line ml-2"></i>
//                     </Button>
//                   </Link>
                  
//                   <div className="text-sm text-gray-500 dark:text-gray-400">
//                     <i className="ri-award-line mr-1"></i> {product.tier}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
        
//         <div className="text-center mt-12">
//           <Link href="/products">
//             <Button
//               variant="outline"
//               className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//             >
//               View All Products
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsSection;


import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/animations";
import { Button } from "@/components/ui/button";

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
  const { elementRef, isVisible } = useScrollAnimation();
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
    <section id="products" className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-xl md:text-2xl font-heading font-bold text-deep-navy dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Flagship Products
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
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
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeUpVariants}
          custom={2}
        >
          {["All Products", "Robotics", "IoT Devices", "Software", "Educational"].map((category) => (
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
          ))}
        </motion.div>
      )}
      </nav>

      {/* ✅ Mobile Dropdown */}
      {isMobile && (
        <motion.div
          className="mb-6 px-4"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeUpVariants}
          custom={2}
        >
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
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
          ref={elementRef as React.RefObject<HTMLDivElement>}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visibleProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUpVariants}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </h3>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      product.category === "Robotics"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                        : product.category === "IoT Devices"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                        : product.category === "Software"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                        : "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    }`}
                  >
                    {product.category}
                  </span>
                </div>

                <p className="text-justify text-gray-600 dark:text-gray-300 mb-6">
                  {product.description}
                </p>

                <div className="flex justify-between items-center">
                  <Link href={`/products/${product.id}`}>
                    <Button
                      variant="link"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center p-0"
                    >
                      View Details
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Button>
                  </Link>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <i className="ri-award-line mr-1"></i> {product.tier}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Products Button */}
                {filteredProducts.length > 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
