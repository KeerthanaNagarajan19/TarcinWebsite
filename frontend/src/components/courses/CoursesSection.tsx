import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import useScrollAnimation from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
// import { Button } from "./components/ui/button";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown, ChevronUp, PlayCircle, FileText } from "lucide-react";

interface Module {
  id: string;
  number: number;
  title: string;
  isOpen: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "video" | "assignment";
}

const modules: Module[] = [
  {
    id: "module-1",
    number: 1,
    title: "Robotic Fundamentals",
    isOpen: true,
    lessons: [
      {
        id: "lesson-1-1",
        title: "Introduction to Robotic",
        duration: "45 min",
        type: "video",
      },
      {
        id: "lesson-1-2",
        title: "Robot Components and Systems",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "lesson-1-3",
        title: "Sensors and Actuators",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-1-4",
        title: "Lab Assignment: Component Analysis",
        duration: "2 hrs",
        type: "assignment",
      },
    ],
  },
  {
    id: "module-2",
    number: 2,
    title: "Programming for Robotic",
    isOpen: false,
    lessons: [
      {
        id: "lesson-2-1",
        title: "Programming Languages for Robotic",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "lesson-2-2",
        title: "Robot Operating System (ROS)",
        duration: "2 hrs",
        type: "video",
      },
      {
        id: "lesson-2-3",
        title: "Motion Planning Algorithms",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-2-4",
        title: "Programming Assignment: Basic Movement",
        duration: "3 hrs",
        type: "assignment",
      },
    ],
  },
  {
    id: "module-3",
    number: 3,
    title: "AI and Machine Learning Integration",
    isOpen: false,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Machine Learning Basics for Robotic",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-3-2",
        title: "Computer Vision for Robots",
        duration: "2 hrs",
        type: "video",
      },
      {
        id: "lesson-3-3",
        title: "Reinforcement Learning Applications",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-3-4",
        title: "Lab Assignment: Object Recognition",
        duration: "4 hrs",
        type: "assignment",
      },
    ],
  },
  {
    id: "module-4",
    number: 4,
    title: "Real-world Applications",
    isOpen: false,
    lessons: [
      {
        id: "lesson-4-1",
        title: "Industrial Automation Case Studies",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "lesson-4-2",
        title: "Healthcare Robotic",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-4-3",
        title: "Autonomous Vehicles",
        duration: "2 hrs",
        type: "video",
      },
      {
        id: "lesson-4-4",
        title: "Project: Application Proposal",
        duration: "5 hrs",
        type: "assignment",
      },
    ],
  },
  {
    id: "module-5",
    number: 5,
    title: "Capstone Project",
    isOpen: false,
    lessons: [
      {
        id: "lesson-5-1",
        title: "Project Planning and Requirements",
        duration: "2 hrs",
        type: "video",
      },
      {
        id: "lesson-5-2",
        title: "Implementation Guidance",
        duration: "1.5 hrs",
        type: "video",
      },
      {
        id: "lesson-5-3",
        title: "Testing and Evaluation",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "lesson-5-4",
        title: "Final Project Submission",
        duration: "10 hrs",
        type: "assignment",
      },
    ],
  },
];

const CoursesSection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [expandedModule, setExpandedModule] = useState("module-1");

  return (
   <section id="courses" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <motion.h2
        className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUpVariants}
      >
        Internship & Course Program
      </motion.h2>
      <motion.p
        className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeUpVariants}
        custom={1}
      >
        Upskill with our hands-on technical internship and certification courses. Learn by building real-world projects in Robotic and Artificial Intelligence.
      </motion.p>
    </div>

    {/* Main Program Card */}
    <div 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        
        {/* Program Overview */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
            Robotic & AI Internship + Certification
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            This 12-week hybrid program blends industry internship exposure with in-depth training in robotic, automation, and AI applications. Designed for students, early professionals, and tech enthusiasts.
          </p>
        </div>

        {/* Curriculum Accordion */}
        <Accordion type="single" collapsible value={expandedModule} onValueChange={setExpandedModule}>
          {modules.map((module) => (
            <AccordionItem 
              key={module.id} 
              value={module.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-0"
            >
              <AccordionTrigger className="flex items-center justify-between w-full px-6 py-4 text-left">
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full ${
                    expandedModule === module.id 
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  } flex items-center justify-center font-medium mr-3`}>
                    {module.number}
                  </span>
                  <span className="font-heading font-semibold text-gray-900 dark:text-white">
                    {module.title}
                  </span>
                </div>
              </AccordionTrigger>
              {/* <AccordionContent className="px-6 py-4 bg-white dark:bg-gray-800">
                <ul className="space-y-3">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center">
                      {lesson.type === "video" ? (
                        <PlayCircle className="text-blue-500 mr-3 h-5 w-5" />
                      ) : (
                        <FileText className="text-amber-500 mr-3 h-5 w-5" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
                      <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent> */}
              <AccordionContent className="px-6 py-4 bg-white dark:bg-gray-800">
  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
    {module.lessons.map((lesson) => (
      <li key={lesson.id} className="flex justify-between">
        <span>{lesson.title}</span>
        {/* <span className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</span> */}
      </li>
    ))}
  </ul>
</AccordionContent>

            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer: Price & CTA */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900 flex flex-wrap gap-4 items-center justify-between">
          {/* <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs.1,999</span>
            <span className="text-gray-500 dark:text-gray-400 ml-2">/ 90 Hours</span>
          </div> */}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScx_4em4gjbVOU4vI01r-jr9L0k0hShi-NG7VifyyKCNc9M-Q/viewform?usp=header">
          <Button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
            Enroll Now
          </Button>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default CoursesSection;
