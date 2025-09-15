// import React from "react";
// import { motion } from "framer-motion";
// import { useScrollAnimation } from "../../hooks/use-scroll-animation";
// import { fadeUpVariants } from "../../lib/animations";
// import { Button } from "../ui/button";
// import { Link } from "wouter";
// import demo from "../../assets/service/mission.jpg"; 

// const CompanyMission: React.FC = () => {
//   const { elementRef, isVisible } = useScrollAnimation({
//     threshold: 0.2,
//   });

//   return (
//     <section className="py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden relative">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
//         {/* Row 1: Vision and Mission side by side */}
//         <div
//           ref={elementRef as React.RefObject<HTMLDivElement>}
//           className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
//         >
//           {/* Left: Our Vision */}
//           <motion.div
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//             className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
//           >
//             <div className="text-sm text-blue-700 font-medium uppercase mb-2">
//               Our Vision
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               Empowering Communities Through Sustainable Innovation
//             </h3>
//             <p className="text-gray-700">
//               We envision a future where technology is thoughtfully engineered to uplift regional communities -
//               making education, sustainability, and accessibility cornerstones of inclusive progress across Tamil Nadu and Southern India.
//             </p>
//           </motion.div>

//           {/* Right: Our Mission */}
//           <motion.div
//             initial="hidden"
//             animate={isVisible ? "visible" : "hidden"}
//             variants={fadeUpVariants}
//             className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
//           >
//             <div className="text-sm text-blue-700 font-medium uppercase mb-2">
//               Our Mission
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-2">
//               Building Sustainable Technology for Regional Impact
//             </h3>
//             <p className="text-gray-700">
//               At Tarcin Robotic LLP, we’re committed to creating technology solutions that solve real-world problems while focusing on education,
//               sustainability, and accessibility. Our approach balances innovation with practical execution.
//             </p>
//           </motion.div>
//         </div>

//  {/* Row 2: Image (left) and Core Values (right) */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
//   {/* Image - Left side on desktop, full width first on mobile */}
 
//  <motion.div
//   initial="hidden"
//   animate={isVisible ? "visible" : "hidden"}
//   variants={fadeUpVariants}
//   className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition duration-300 order-1 md:order-none"
// >
//   <div className="w-full h-[300px] md:h-[300px]">
//     <img
//       src={demo}
//       alt="Tarcin Robotic Collaboration"
//       className="object-cover w-full h-full"
//     />
//   </div>
// </motion.div>



//  {/* Core Values - Right side */}
// <motion.div
//   initial="hidden"
//   animate={isVisible ? "visible" : "hidden"}
//   variants={fadeUpVariants}
//   className="space-y-10 w-full"  // full width container with vertical spacing
// >
//   {/* Use flex-col instead of grid for vertical stacking */}
//   <div className="flex flex-col gap-6 w-full">
    
//     {/* Each item takes full width and is flex row */}
//     <div className="flex gap-4 items-start w-full">
//       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl flex-shrink-0">
//         <i className="ri-focus-3-line"></i>
//       </div>
//       <div className="flex-1"> {/* flex-1 makes this div take remaining width */}
//         <h4 className="font-semibold text-gray-900 text-xl">Execution-Driven Innovation</h4>
//         <p className="text-gray-700 text-sm">
//           Building practical solutions with real-world applications rather than theoretical concepts.
//         </p>
//       </div>
//     </div>

//     <div className="flex gap-4 items-start w-full">
//       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl flex-shrink-0">
//         <i className="ri-earth-line"></i>
//       </div>
//       <div className="flex-1">
//         <h4 className="font-semibold text-gray-900 text-xl">Regional Focus</h4>
//         <p className="text-gray-700 text-sm">
//           Creating technology for Tamil Nadu and Southern India.
//         </p>
//       </div>
//     </div>

//     <div className="flex gap-4 items-start w-full">
//       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-xl flex-shrink-0">
//         <i className="ri-team-line"></i>
//       </div>
//       <div className="flex-1">
//         <h4 className="font-semibold text-gray-900 text-xl">Community Development</h4>
//         <p className="text-gray-700 text-sm">
//           Mentoring students and developing the S2P Community for real-world readiness.
//         </p>
//       </div>
//     </div>
//   </div>

//   <div className="pt-6 w-full">
//     <Link href="/about">
//       <Button
//         variant="default"
//         className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow-md"
//       >
//         Learn More About Us
//       </Button>
//     </Link>
//   </div>
// </motion.div>

// </div>

//       </div>
//     </section>
//   );
// };

// export default CompanyMission;




import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../ui/button";
import { Link } from "wouter";
import demo from "../../assets/service/mission.jpg";

const CompanyMission: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-100 opacity-80 z-0" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 z-10 space-y-24">
        {/* Banner Head */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="text-4xl font-extrabold text-blue-800 mb-4"
          >
            Our Vision & Mission
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="text-gray-600 text-lg"
          >
            At Tarcin Robotic LLP, we empower regional communities with technology that transforms education and sustainability into real-world progress.
          </motion.p>
        </div>

        {/* Mission & Vision Cards */}
        <div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="grid md:grid-cols-2 gap-10"
        >
          {[
            {
              title: "Our Vision",
              description:
                "We envision a future where technology uplifts regional communities, making sustainability, accessibility, and education cornerstones of inclusive growth.",
            },
            {
              title: "Our Mission",
              description:
                "We build practical, impactful tech solutions that serve Tamil Nadu and Southern India—bridging innovation with execution.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
              className="bg-white border-l-4 border-blue-600 shadow-md p-8 rounded-2xl hover:shadow-xl transition duration-300"
            >
              <h4 className="text-blue-700 text-sm uppercase font-semibold mb-2">{item.title}</h4>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Image and Core Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition duration-300"
          >
            <div className="w-full h-[300px] md:h-[350px]">
              <img
                src={demo}
                alt="Our Work"
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="space-y-8"
          >
            {[
              {
                icon: "ri-focus-3-line",
                title: "Execution-Driven Innovation",
                desc: "We develop solutions grounded in real-world impact, not just theory.",
              },
              {
                icon: "ri-earth-line",
                title: "Regional Focus",
                desc: "Focused on solving challenges unique to Tamil Nadu & South India.",
              },
              {
                icon: "ri-team-line",
                title: "Community Development",
                desc: "We mentor the S2P community to become job-ready and innovative.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-2xl">
                  <i className={item.icon}></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}

            <Link href="/about">
             <div className="pt-6">
               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Learn More About Us
                </button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMission;
