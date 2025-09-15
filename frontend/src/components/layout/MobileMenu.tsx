import React from "react";
import { Link, useLocation } from "wouter";
import { useTranslations } from "../../hooks/use-translations";
import LanguageSelector from "./LanguageSelector";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { 
  Home, Info, Briefcase, Box, GraduationCap, 
  Calendar, Award, Users, Contact, ChevronRight
} from "lucide-react";
import { useBreakpoint, BREAKPOINTS } from "../../hooks/use-mobile";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslations();
  const [location] = useLocation();
  const breakpoint = useBreakpoint();

  // Close menu on larger screens
  React.useEffect(() => {
    if (breakpoint && ['lg', 'xl', 'xxl'].includes(breakpoint) && isOpen) {
      onClose();
    }
  }, [breakpoint, isOpen, onClose]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.25,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.025
      },
    },
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Helper to check active route
  const isActive = (path: string) => location === path;

  // Icons mapped to menu items for visual enhancement
  const getIcon = (path: string) => {
    switch(path) {
      case '/': return <Home size={18} />;
      case '/about': return <Info size={18} />;
      case '/services': return <Briefcase size={18} />;
      case '/products': return <Box size={18} />;
      case '/courses': return <GraduationCap size={18} />;
      case '/blog': return <Award size={18} />;
      case '/events': return <Calendar size={18} />;
      case '/careers': return <Briefcase size={18} />;
      case '/s2p-community': return <Users size={18} />;
      case '/contact': return <Contact size={18} />;
      default: return <ChevronRight size={18} />;
    }
  };

  const menuItems = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/products", label: t("nav.products") },
    { href: "/courses", label: t("nav.courses") },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/careers", label: "Careers" },
    { href: "/s2p-community", label: "S2P Community" },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Mobile menu */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            className="lg:hidden fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-gray-900 shadow-xl overflow-hidden z-50"
          >
            <div className="py-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              <div className="space-y-1 px-3">
                {menuItems.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <Link href={item.href} onClick={onClose}>
                      <div 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(item.href)
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className={isActive(item.href) ? 'text-white' : 'text-blue-600 dark:text-blue-400'}>
                          {getIcon(item.href)}
                        </span>
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Call to action */}
              <motion.div variants={itemVariants} className="px-3 pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 mt-4">
                <Link href="/contact" onClick={onClose}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                    {t("nav.getInTouch")}
                  </Button>
                </Link>
              </motion.div>
              
              {/* Language Selector */}
              <motion.div variants={itemVariants} className="px-3 py-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {t("nav.selectLanguage")}
                </div>
                <LanguageSelector isMobile={true} />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
