
import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "../../hooks/use-translations";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile, useBreakpoint, BREAKPOINTS } from "../../hooks/use-mobile";
import logo from "@assets/tarcinblue.png";


const SimpleNavbar: React.FC = () => {
  const { t } = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const isMobile = useIsMobile();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (["lg", "xl", "xxl"].includes(breakpoint)) setMobileMenuOpen(false);
  }, [breakpoint]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/products", label: "Products" },
    { path: "/courses", label: "Courses" },
    { path: "/blog", label: "Blog" },
    { path: "/events", label: "Events" },
    { path: "/careers", label: "Careers" },
    { path: "/s2p-community", label: "S2P Community" },
  ];

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

      <div className="hidden lg:flex gap-3 items-center">
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={item.path}>
              <div
                className={`px-2 py-1 text-lg font-semibold rounded-md cursor-pointer transition duration-200 whitespace-nowrap border-b-2 ${
                  isActive(item.path)
                    ? "border-blue-500"
                    : "border-transparent hover:border-blue-500"
                } ${
                  scrolled
                    ? "text-white"
                    : "text-blue-900 hover:text-blue-700"
                }`}
              >
             {/* <div
  className={`px-2 py-1 text-lg font-semibold cursor-pointer transition duration-200 whitespace-nowrap
    ${isActive(item.path)
      ? scrolled
        ? "border-t-2 border-b-2 border-blue-300"
        : "border-b-2 border-blue-500"
      : "border-transparent hover:border-b-2 hover:border-blue-500"
    }
    ${scrolled ? "text-white" : "text-blue-900 hover:text-blue-700"}
  `}
> */}
                {item.label}
              </div>
            </Link>
          </motion.div>
        ))}
        <Link href="/contact">
          <Button
            className={`ml-4 border font-bold text-lg ${
              scrolled
                ? "bg-white text-blue-800 hover:bg-blue-800 hover:text-white"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            {/* {t("nav.getInTouch")}  */}
            Contact Us
          </Button>
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`p-2 focus:outline-none ${
            scrolled ? "text-white" : "text-blue-900"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.nav
        className={`lg:hidden ${scrolled ? "bg-blue-800" : "bg-blue-100"}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col px-4 py-3 space-y-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={item.path}>
                <div
                  className={`block py-2 text-base font-semibold rounded-md cursor-pointer transition duration-200 border-b-2 ${
                    isActive(item.path)
                      ? "border-blue-500"
                      : "border-transparent hover:border-blue-500"
                  } ${
                    scrolled ? "text-white" : "text-blue-900 hover:text-blue-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            </motion.div>
          ))}
          <Link href="/contact">
            <Button className="w-full bg-white text-blue-900 hover:bg-blue-50 border font-bold">
              {t("nav.getInTouch")} Contact Us
            </Button>
          </Link>
        </div>
      </motion.nav>
    )}
  </AnimatePresence>
</motion.header>

  );
};

export default SimpleNavbar;












// import React, { useState, useEffect } from "react";
// import { Link } from "wouter";
// import { useTranslations } from "../../hooks/use-translations";
// import { useTheme } from "../../hooks/use-theme";
// import { Button } from "../../components/ui/button";
// import { Menu, X, Moon, Sun } from "lucide-react";

// const Navbar: React.FC = () => {
//   const { t } = useTranslations();
//   const { theme, setTheme } = useTheme();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Handle scrolling effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Toggle theme between light and dark
//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <>
//       {/* Main Navbar */}
//       <header 
//         className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50"
//         style={{ backdropFilter: "blur(10px)" }}
//       >
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-16 sm:h-20">
//             {/* Logo */}
//             <Link href="/">
//               <div className="flex items-center space-x-2 cursor-pointer">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
//                   <span className="text-xl font-bold text-white">T</span>
//                 </div>
//                 <span className="text-xl font-bold text-gray-900 dark:text-white">Tarcin</span>
//               </div>
//             </Link>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-6">
//               <Link href="/">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.home")} Home
//                 </span>
//               </Link>
//               <Link href="/about">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.about")}About
//                 </span>
//               </Link>
//               <Link href="/services">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.services")} Services
//                 </span>
//               </Link>
//               <Link href="/products">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.products")}
//                 </span>
//               </Link>
//               <Link href="/courses">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.courses")}
//                 </span>
//               </Link>
//               <Link href="/contact">
//                 <span className="px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
//                   {t("nav.contact")}
//                 </span>
//               </Link>
//             </nav>

//             {/* Right Side Items */}
//             <div className="flex items-center space-x-4">
//               {/* Theme Toggle Button */}
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
//                 aria-label="Toggle theme"
//               >
//                 {theme === "dark" ? (
//                   <Sun className="h-5 w-5 text-yellow-500" />
//                 ) : (
//                   <Moon className="h-5 w-5 text-blue-600" />
//                 )}
//               </button>

//               {/* CTA Button */}
//               <Link href="/contact">
//                 <Button className="hidden md:flex px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
//                   {t("nav.getInTouch")}
//                 </Button>
//               </Link>

//               {/* Mobile Menu Toggle */}
//               <button
//                 className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 aria-label="Toggle mobile menu"
//               >
//                 {isMobileMenuOpen ? (
//                   <X className="h-6 w-6" />
//                 ) : (
//                   <Menu className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
//           <div 
//             className="absolute top-16 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl rounded-b-lg p-4"
//             onClick={e => e.stopPropagation()}
//           >
//             <nav className="flex flex-col space-y-4">
//               <Link href="/">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.home")}
//                 </span>
//               </Link>
//               <Link href="/about">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.about")}
//                 </span>
//               </Link>
//               <Link href="/services">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.services")}
//                 </span>
//               </Link>
//               <Link href="/products">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.products")}
//                 </span>
//               </Link>
//               <Link href="/courses">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.courses")}
//                 </span>
//               </Link>
//               <Link href="/contact">
//                 <span className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
//                   {t("nav.contact")}
//                 </span>
//               </Link>
              
//               <hr className="my-2 border-gray-200 dark:border-gray-700" />
              
//               <Link href="/contact">
//                 <Button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
//                   {t("nav.getInTouch")}
//                 </Button>
//               </Link>
//             </nav>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;