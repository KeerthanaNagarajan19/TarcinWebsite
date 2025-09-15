// Responsive Navbar with Dropdown Grouping
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@assets/tarcinblue.png";

const SimpleNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
const [manualToggle, setManualToggle] = useState(false);

  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-blue-900 shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Tarcin Logo" className="h-16 w-auto drop-shadow-md" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
            {[
              { label: "Overview", path: "/" },
              { label: "Know Us", path: "/about" },
              { label: "Solutions", path: "/services" },
              { label: "Our Products", path: "/products" },
              { label: "Learning Hub", path: "/courses" },
            ].map((item) => (
              <Link href={item.path} key={item.path}>
                <div
                  className={`text-lg font-semibold cursor-pointer border-b-2 px-2 py-1 transition duration-200 ${
                    isActive(item.path)
                      ? "border-blue-500 text-blue-700"
                      : "border-transparent hover:border-blue-500 hover:text-blue-700"
                  } ${scrolled ? "text-white" : "text-blue-900"}`}
                >
                  {item.label}
                </div>
              </Link>
            ))}

            {/* Desktop Community Dropdown */}
<div
  className="relative"
  onMouseEnter={() => !manualToggle && setCommunityOpen(true)}
  onMouseLeave={() => !manualToggle && setCommunityOpen(false)}
>
  <button
    onClick={() => {
      const newState = !communityOpen;
      setCommunityOpen(newState);
      setManualToggle(newState);
    }}
    className={`flex items-center gap-1 text-lg font-semibold px-2 py-1 border-b-2 transition duration-200 ${
      communityOpen ? "border-blue-500 text-blue-700" : "border-transparent hover:border-blue-500"
    } ${scrolled ? "text-white" : "text-blue-900"}`}
  >
    Explore <ChevronDown size={16} />
  </button>

  <AnimatePresence>
    {communityOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48 z-50 text-md text-blue-900"
        onMouseEnter={() => !manualToggle && setCommunityOpen(true)}
        onMouseLeave={() => !manualToggle && setCommunityOpen(false)}
      >
        {[
          { label: "Blog", path: "/blog" },
          { label: "Event", path: "/events" },
          { label: "Join Our Team", path: "/careers" },
          { label: "S2P Network", path: "/s2p-community" },
          { label: "Tutor", path: "/tutor" },
        ].map((item) => (
          <Link href={item.path} key={item.path} onClick={() => setCommunityOpen(false)}>
            <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer">{item.label}</div>
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>


            <Link href="/contact">
              <button  className={`ml-4 px-4 py-2 text-base font-bold rounded transition duration-200 ${
      scrolled
        ? "bg-white text-blue-900 hover:bg-gray-100"
        : "bg-blue-900 text-white hover:bg-blue-800"
    }`}>
                Let's Connect
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-blue-100 px-4 py-3"
            aria-label="Mobile Navigation"
          >
            {[
              { label: "Overview", path: "/" },
              { label: "Our Story", path: "/about" },
              { label: "Our Expertise", path: "/services" },
              { label: "Our Products", path: "/products" },
              { label: "Learning Hub", path: "/courses" },,
              { label: "Blog", path: "/blog" },
              { label: "Events", path: "/events" },
              { label: "Join Our Team", path: "/careers" },
              { label: "S2P Network", path: "/s2p-community" },
              { label: "Tutor", path: "/tutor" },
            ].map((item) => (
              <Link href={item.path} key={item.path}>
                <div className="py-2 font-semibold text-blue-900">{item.label}</div>
              </Link>
            ))}

            <Link href="/contact">
              <div className="mt-4 px-4 py-2 text-center bg-blue-900 text-white font-bold rounded">
                Let's Connect
              </div>
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default SimpleNavbar;

// Responsive Navbar with Dropdown Grouping
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "wouter";
// import { Menu, X, ChevronDown } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import logo from "@assets/tarcinblue.png";

// const SimpleNavbar: React.FC = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [communityOpen, setCommunityOpen] = useState(false);
//   const [location] = useLocation();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const isActive = (path: string) => location === path;

//   const handleMobileLinkClick = () => {
//     setMobileMenuOpen(false);
//     setCommunityOpen(false); // ✅ close community on any other nav click
//   };

//   return (
//     <motion.header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-blue-900 shadow-lg" : "bg-transparent"
//       }`}
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <a href="/" className="flex items-center">
//             <img src={logo} alt="Tarcin Logo" className="h-16 w-auto drop-shadow-md" />
//           </a>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-6">
//             {[
//               { label: "Welcome", path: "/" },
//               { label: "About", path: "/about" },
//               { label: "Services", path: "/services" },
//               { label: "Products", path: "/products" },
//               { label: "Courses", path: "/courses" },
//             ].map((item) => (
//               <Link href={item.path} key={item.path}>
//                 <div
//                   className={`text-lg font-semibold cursor-pointer border-b-2 px-2 py-1 transition duration-200 ${
//                     isActive(item.path)
//                       ? "border-blue-500 text-blue-700"
//                       : "border-transparent hover:border-blue-500 hover:text-blue-700"
//                   } ${scrolled ? "text-white" : "text-blue-900"}`}
//                 >
//                   {item.label}
//                 </div>
//               </Link>
//             ))}

//             {/* Desktop Community Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setCommunityOpen(!communityOpen)}
//                 className={`flex items-center gap-1 text-lg font-semibold px-2 py-1 border-b-2 transition duration-200 ${
//                   communityOpen ? "border-blue-500 text-blue-700" : "border-transparent hover:border-blue-500"
//                 } ${scrolled ? "text-white" : "text-blue-900"}`}
//               >
//                 Explore <ChevronDown size={16} />
//               </button>
//               <AnimatePresence>
//                 {communityOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48 z-50 text-md text-blue-900"
//                   >
//                     {[
//                       { label: "Blog", path: "/blog" },
//                       { label: "Events", path: "/events" },
//                       { label: "Careers", path: "/careers" },
//                       { label: "S2P Community", path: "/s2p-community" },
//                       { label: "Tutor", path: "/tutor" },
//                     ].map((item) => (
//                       <Link href={item.path} key={item.path} onClick={() => setCommunityOpen(false)}>
//                         <div className="px-4 py-2 hover:bg-blue-50 cursor-pointer">{item.label}</div>
//                       </Link>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <Link href="/contact">
//               <button className="ml-4 px-4 py-2 bg-blue-900 text-white hover:bg-blue-800 font-bold rounded">
//                 Contact Us
//               </button>
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="lg:hidden">
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.nav
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="lg:hidden bg-blue-100 px-4 py-3"
//           >
//             {[
//               { label: "Home", path: "/" },
//               { label: "About", path: "/about" },
//               { label: "Services", path: "/services" },
//               { label: "Products", path: "/products" },
//               { label: "Courses", path: "/courses" },
//             ].map((item) => (
//               <Link href={item.path} key={item.path}>
//                 <div className="py-2 font-semibold text-blue-900" onClick={handleMobileLinkClick}>
//                   {item.label}
//                 </div>
//               </Link>
//             ))}

//             {/* Community toggle and list */}
//             <div className="pt-2 border-t mt-2">
//               <button
//                 onClick={() => setCommunityOpen(!communityOpen)}
//                 className="font-bold text-blue-800 w-full text-left py-2"
//               >
//                 Community {communityOpen ? "▲" : "▼"}
//               </button>

//               <AnimatePresence>
//                 {communityOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="overflow-hidden"
//                   >
//                     {[
//                       { label: "Blog", path: "/blog" },
//                       { label: "Events", path: "/events" },
//                       { label: "Careers", path: "/careers" },
//                       { label: "S2P Community", path: "/s2p-community" },
//                       { label: "Tutor", path: "/tutor" },
//                     ].map((item) => (
//                       <Link href={item.path} key={item.path}>
//                         <div className="py-2 pl-4 text-blue-900" onClick={handleMobileLinkClick}>
//                           {item.label}
//                         </div>
//                       </Link>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <Link href="/contact">
//               <div
//                 className="mt-4 px-4 py-2 text-center bg-blue-900 text-white font-bold rounded"
//                 onClick={handleMobileLinkClick}
//               >
//                 Contact Us
//               </div>
//             </Link>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// };

// export default SimpleNavbar;
