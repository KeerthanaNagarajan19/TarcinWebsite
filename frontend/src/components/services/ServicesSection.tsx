import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "../../hooks/use-translations";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants, slideInLeftVariants, slideInRightVariants } from "../../lib/animations";
import { Button } from "../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

import edu from "@assets/courses/education.jpeg";
import crm from "@assets/service/crm2.jpeg";;


interface ServiceTab {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
  caseStudy: {
    title: string;
    description: string;
    image: string;
  };
}

const serviceTabs: ServiceTab[] = [
  {
    id: "erp",
    label: "Custom ERP/CRM Solutions",
    title: "Custom ERP/CRM & Automation",
    description: "Tailored business automation solutions for startups, schools, and small enterprises that streamline operations and improve efficiency.",
    features: [
      "Customizable ERP/CRM systems for specific business needs",
      "Automation backends for business processes",
      "Analytics dashboards for real-time monitoring",
      "Internal business tools with user-friendly interfaces",
      "Integration with existing systems and workflows",
    ],
    caseStudy: {
      title: "Small Business Transformation",
      description: "Our custom CRM system helped a small enterprise streamline their customer management processes, reducing administrative overhead by 35%.",
      image: crm,
    },
  },
  {
    id: "pdaas",
    label: "Product Dev",
    title: "Product Development as a Service",
    description: "Outsourced, full-cycle product building via our internal teams and the S2P Community student pipeline, delivering cost-effective innovation.",
    features: [
      "End-to-end product development from concept to deployment",
      "Involvement of talented students through S2P Community",
      "Iterative development with regular feedback cycles",
      "Focus on practical, deployable solutions",
      "Cost-effective innovation without expensive overhead",
    ],
    caseStudy: {
      title: "Student-Powered Innovation",
      description: "Our S2P Community helped develop a functional prototype for a local business, blending professional guidance with fresh student perspectives.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&h=500&q=80",
    },
  },
  {
    id: "training",
    label: "Corporate & Institutional Training",
    title: "Technical Training Programs",
    description: "Short-term to year-long skilling programs in Python, AI, IoT, Data Science, OpenCV, and related technologies, designed for practical application.",
    features: [
      "Hands-on training in Python, AI, and IoT",
      "Curriculum designed for real-world application",
      "Experienced instructors with industry background",
      "Tailored programs for institutions and corporations",
      "Practical project-based learning approach",
    ],
    caseStudy: {
      title: "College Skill Enhancement",
      description: "Our training program at an engineering college helped bridge the gap between theoretical knowledge and practical skills needed in the industry.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&h=500&q=80",
    },
  },
  {
    id: "iot",
    label: "IoT Deployment",
    title: "IoT Deployment & Integration",
    description: "Custom home, building, and enterprise automation solutions with analytics dashboards for real-time monitoring and control.",
    features: [
      "End-to-end smart automation systems",
      "Deployable IoT prototypes like Smart Home Mini Kits",
      "Real-time data visualization dashboards",
      "Remote monitoring and control capabilities",
      "Analytics-driven insights from IoT data",
    ],
    caseStudy: {
      title: "Smart Campus Initiative",
      description: "We helped a college campus implement IoT-based monitoring systems for energy usage and security, resulting in 25% improved resource efficiency.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&h=500&q=80",
    },
  },
  {
    id: "ai",
    label: "AI/Data Integrations",
    title: "AI & Data Science Solutions",
    description: "Building data pipelines, dashboards, visualizations, and embedded ML models for business intelligence and decision-making.",
    features: [
      "Predictive systems for business intelligence",
      "Analytics-driven software development",
      "Exploratory agentic AI integrations",
      "Data visualization and interpretation tools",
      "Custom ML models for specific business needs",
    ],
    caseStudy: {
      title: "Data-Driven Decisions",
      description: "Our analytics dashboard helped a local business gain insights into customer behavior patterns, enabling more effective inventory management.",
      image: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=800&h=500&q=80",
    },
  },
  {
    id: "edu",
    label: "Edu Licensing",
    title: "Educational Tools & Content",
    description: "Licensing of Code Asthram, SproutED LMS, and STEM kits for school networks and educational institutions.",
    features: [
      "Access to Code Asthram coding education platform",
      "SproutED LMS implementation and customization",
      "STEM kits aligned with NEP curriculum standards",
      "Teacher training and support materials",
      "Ongoing technical support and updates",
    ],
    caseStudy: {
      title: "School Network Implementation",
      description: "A network of schools in Tamil Nadu implemented our Code Asthram platform, enhancing coding education for over 2,000 students.",
     image:edu,
      // image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500&q=80",
    },
  },
];

const ServicesSection: React.FC = () => {
  const { t } = useTranslations();
  const { elementRef, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState("erp");

const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const tabFromUrl = searchParams.get("tab") || "erp";

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const newTab = params.get("tab") || "erp";
  setActiveTab(newTab);
}, [location.search]);

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200); // Tailwind 'md' breakpoint
    };
    handleResize(); // Run on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-xl md:text-2xl font-heading font-bold text-deep-navy dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Service Offerings
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Our unique mix of product + service + community offers practical solutions across multiple technology domains, with a focus on regional impact.
          </motion.p>
        </div>

       <Tabs
      defaultValue="erp"
      value={activeTab}
      onValueChange={setActiveTab}
      ref={elementRef as React.RefObject<HTMLDivElement>}
    >
      {/* ✅ Desktop Tabs */}
      {!isMobile && (
        <TabsList
          className="
            mb-8
            flex
            border-b border-gray-200 dark:border-gray-700
            w-full
            justify-start
            md:justify-around
            overflow-x-auto
            md:overflow-x-visible
            flex-wrap
            md:flex-nowrap
          "
        >
          {serviceTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={`px-4 sm:px-8 py-4 font-medium ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      )}

      {/* ✅ Mobile Dropdown */}
      {isMobile && (
        <div className="mb-6 px-2">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-800"
          >
            {serviceTabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ✅ Tab Content */}
      {serviceTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="outline-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              animate={isVisible && activeTab === tab.id ? "visible" : "hidden"}
              variants={slideInLeftVariants}
            >
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                {tab.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{tab.description}</p>
              <ul className="space-y-3 mb-8">
                {tab.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isVisible && activeTab === tab.id ? "visible" : "hidden"}
              variants={slideInRightVariants}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={tab.caseStudy.image}
                alt={tab.caseStudy.title}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h4 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                  Case Study: {tab.caseStudy.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{tab.caseStudy.description}</p>
              </div>
            </motion.div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
      </div>
    </section>
  );
};

export default ServicesSection;
