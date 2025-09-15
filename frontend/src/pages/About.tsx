import React from "react";
import DocumentHead from "../components/shared/DocumentHead";
import { motion } from "framer-motion";
import OrbNarrative from "../components/home/OrbNarrative";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";
import { fadeUpVariants, staggerContainerVariants } from "../lib/animations";
import useScrollAnimation from "../hooks/use-scroll-animation";
import AboutSection from "../components/about/AboutSection";
const alaudin = "../../assets/alaudin.jpg"

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  linkedin: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

// Note: Using placeholder data for team members - should be replaced with actual team photos and bios
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "A Alaudeen",
    position: "Founder & CEO",
    image: alaudin,
    bio: "Our leadership team brings deep technical expertise and regional understanding, with a focus on execution and product-driven solutions.",
    linkedin: "https://linkedin.com",
  },
  {
    id: 2,
    name: "Technical Team",
    position: "Engineering",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Our engineering team specializes in robotics prototyping, IoT systems, embedded development, AI integration, and custom software solutions.",
    linkedin: "https://linkedin.com",
  },
  // {
  //   id: 3,
  //   name: "Product Team",
  //   position: "Product Development",
  //   image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
  //   bio: "Product specialists focused on creating scalable solutions across our Code Asthram, SproutED LMS, CRM systems, and IoT offerings for customers.",
  //   linkedin: "https://linkedin.com",
  // },
  // {
  //   id: 4,
  //   name: "Education Team",
  //   position: "Educational Initiatives",
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
  //   bio: "Our education specialists work closely with 50+ institutions across Tamil Nadu to implement training programs and Centre of Excellence setups.",
  //   linkedin: "https://linkedin.com",
  // },
];

const timelineEvents: TimelineEvent[] = [
  {
    year: "Foundation",
    title: "Tarcin Robotic LLP Established",
    description: "Founded in Madurai, Tamil Nadu with a focus on product-driven and service-based technology solutions."
  },
  {
    year: "Education",
    title: "Institution Partnerships",
    description: "Connected with 50+ institutions across Tamil Nadu including engineering colleges, schools, and private academies."
  },
  {
    year: "Product",
    title: "Code Asthram Launch",
    description: "Released our logic-based, gamified coding education platform for schools and colleges focusing on algorithmic thinking."
  },
  {
    year: "Product",
    title: "SproutED LMS Development",
    description: "Created lightweight, modular learning management system for schools and training institutions."
  },
  {
    year: "Community",
    title: "S2P Community Launch",
    description: "Established Student to Professional community that mentors and deploys skilled students into real-world projects."
  },
  {
    year: "Innovation",
    title: "IoT & Agentic AI Integration",
    description: "Began integrating agentic AI systems into existing products and developing smart home automation solutions."
  },
];

const values: Value[] = [
  {
    icon: "ri-lightbulb-line",
    title: "Execution",
    description: "We prioritize real-world implementation over hype, focusing on practical solutions that work reliably."
  },
  {
    icon: "ri-building-2-line",
    title: "Regional Grounding",
    description: "We are deeply rooted in Tamil Nadu and understand the unique needs of our regional ecosystem."
  },
  {
    icon: "ri-team-line",
    title: "Student Ecosystems",
    description: "We leverage grassroots student talent to drive innovation without expensive overhead."
  },
  {
    icon: "ri-tools-line",
    title: "Product + Service",
    description: "We blend products and services with community engagement to create comprehensive technology solutions."
  },
];

const AboutPage: React.FC = () => {
  const { elementRef: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { elementRef: timelineRef, isVisible: timelineVisible } = useScrollAnimation();
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <>
      <DocumentHead
        title="About Us | Tarcin Robotic LLP"
        description="Learn about Tarcin Robotic LLP - our mission, team, history, and values driving innovation in robotics, IoT, AI, and educational technology based in Madurai, Tamil Nadu."
        ogTitle="About Tarcin Robotic LLP"
        ogDescription="Meet the team behind Tarcin Robotic LLP and discover our journey of innovation in robotics, IoT, AI, and educational technology."
      />

<header>
 <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-blue-900 text-white relative overflow-hidden">
<div className="absolute inset-0 opacity-20 animate-wave">
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wave-lines" width="100" height="40" patternUnits="userSpaceOnUse" patternTransform="translate(0, 0)">
        <path d="M 0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#wave-lines)" />
  </svg>
</div>

<style>
{`
  @keyframes waveMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100px);
    }
  }

  .animate-wave svg {
    animation: waveMove 5s linear infinite;
  }
`}
</style>


        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
            >
               About Our Company
            </motion.h1>
            <motion.p
              className="text-base md:text-xl text-white/90 mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              We're a passionate team creating innovative robotics, IoT, and educational platforms to empower the future and solve real-world problems.
            </motion.p>
          </div>
        </div>
      </section>
</header>
      {/* Mission Section (Using OrbNarrative component) */}
      <section className="pt-4">
        {/* <OrbNarrative /> */}
        <AboutSection />
      </section>

      {/* Team Section
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white"
              initial="hidden"
              animate={teamVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Our Leadership Team
            </motion.h2>
            <motion.p
              className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              animate={teamVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
              custom={1}
            >
              Meet the passionate experts driving innovation at Tarcin Robotic LLP.
            </motion.p>
          </div>

          {/* <motion.div
            ref={teamRef as React.RefObject<HTMLDivElement>}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={teamVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUpVariants}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="relative h-64 w-auto overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    // width={400}
                    // height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm">{member.bio}</p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-blue-300 hover:text-blue-400"
                      >
                        <i className="ri-linkedin-box-fill mr-1"></i> LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}
{/* 
          <motion.div
  ref={teamRef as React.RefObject<HTMLDivElement>}
  variants={staggerContainerVariants}
  initial="hidden"
  animate={teamVisible ? "visible" : "hidden"}
  className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto"
>
  {teamMembers.slice(0, 2).map((member) => (
    <motion.div
      key={member.id}
      variants={fadeUpVariants}
      className="w-full sm:w-[300px] bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 text-white">
            <p className="text-sm">{member.bio}</p>
            {/* <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-300 hover:text-blue-400"
            >
              <i className="ri-linkedin-box-fill mr-1"></i> LinkedIn
            </a> */}
          {/* </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white">
          {member.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{member.position}</p>
      </div>
    </motion.div>
  ))}
</motion.div>
\
        </div>
      </section> */} 

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white"
              initial="hidden"
              animate={timelineVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Our Journey
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              animate={timelineVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
              custom={1}
            >
              The story of Tarcin Robotic and our path to pioneering innovative technologies.
            </motion.p>
          </div>

          <div 
            ref={timelineRef as React.RefObject<HTMLDivElement>}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={timelineVisible ? "visible" : "hidden"}
                variants={fadeUpVariants}
                custom={index}
                className={`relative mb-12 md:w-1/2 ${
                  index % 2 === 0 ? "md:ml-0 md:mr-auto md:pr-10 md:text-left"
                  :"md:ml-auto md:pl-10 md:text-left"
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md">
                    {/* Year badge */}
                    <div className="absolute top-0 bg-blue-600 text-white py-1 px-3 rounded-full font-semibold text-sm transform -translate-y-1/2">
                      {event.year}
                    </div>
                    
                    <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white mt-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {event.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white"
              initial="hidden"
              animate={valuesVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
            >
              Our Core Values
            </motion.h2>
            <motion.p
              className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial="hidden"
              animate={valuesVisible ? "visible" : "hidden"}
              variants={fadeUpVariants}
              custom={1}
            >
              The guiding principles that drive our work and shape our culture.
            </motion.p>
          </div>

          <motion.div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={valuesVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeUpVariants}
                custom={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${value.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-base font-heading font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-justify text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials (Reusing the testimonials component) */}
      <Testimonials />

      {/* Stats (Reusing the stats component) */}
      <Stats />

      {/* Newsletter (Reusing the newsletter component) */}
      <Newsletter />
    </>
  );
};

export default AboutPage;
