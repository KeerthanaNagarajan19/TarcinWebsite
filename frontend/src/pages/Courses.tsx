import React, { useState } from "react";
import DocumentHead from "../components/shared/DocumentHead";
import CoursesSection from "../components/courses/CoursesSection";
import Newsletter from "../components/home/Newsletter";
import CTASection from "../components/home/CTASection";
import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "../lib/animations";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Button } from "../components/ui/button";
import { Calendar, List, Globe, Star, Users, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import { upcomingCourses, Course } from "../data/upcomingCourses";
import AlumniBarChart from "../components/courses/AlumniBarChart";
import EventCalendarSection from "@/components/events/EventCalendarSection";
import { useCourses } from "../hooks/use-courses";
import Coursedata from "../components/courses/Coursedata"


const events = [
  {
    id: "workshop-1",
    title: "Code Asthram Demo for Educational Institutions",
    date: "Monthly",
    time: "10:00 AM - 12:00 PM",
    location: "Madurai Office & Online",
    type: "In-person",
  },
  {
    id: "webinar-1",
    title: "S2P Community Introduction: Student to Professional Pathway",
    date: "Quarterly",
    time: "3:00 PM - 4:30 PM",
    location: "Online",
    type: "Webinar",
  },
  {
    id: "training-1",
    title: "Centre of Excellence (CoE) Setup Workshop for Colleges",
    date: "On Request",
    time: "Full Day",
    location: "Customer Campus",
    type: "Training",
  },
];

const Courses: React.FC = () => {
  const { elementRef: coursesRef, isVisible: coursesVisible } = useScrollAnimation();
  const { elementRef: eventsRef, isVisible: eventsVisible } = useScrollAnimation();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const [showAllCourses, setShowAllCourses] = useState(false)
  // const [coursesVisible, setCoursesVisible] = useState(false)
   const { data: courses, isLoading, error } = useCourses(); // ✅ hook used correctly


  return (
    <>
      <DocumentHead
        title="Education & Training | Tarcin Robotic LLP"
        description="Enhance your skills with our Code Asthram platform, S2P Community and technical training programs for educational institutions across Tamil Nadu."
        ogTitle="Education & Training - Tarcin Robotic LLP"
        ogDescription="Discover our comprehensive training programs and educational initiatives for schools and colleges in Tamil Nadu."
      />

      {/* Hero Banner */}
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
              Education & Training
            </motion.h1>
            <motion.p
              className="text-base md:text-2xl text-white/90 mb-8"
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              custom={1}
            >
              Empowering educational institutions across Tamil Nadu with innovative learning solutions and training programs.
            </motion.p>
          </div>
        </div>
      </section>
      </header>

      {/* Main Course Section */}
      <CoursesSection />

      <AlumniBarChart />

      {/* Upcoming Courses */}

      <Coursedata />

      {/* <section  className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
              Educational Programs
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our educational solutions designed for schools, colleges, and training institutions across Tamil Nadu.
            </p>
          </div>

          <motion.div
            ref={coursesRef as React.RefObject<HTMLDivElement>}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={coursesVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={fadeUpVariants}
                custom={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-y-2">
                    <div className="w-1/2 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="w-1/2 flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {course.rating} ({Math.round(course.rating * 100)} reviews)
                    </div>
                    <div className="w-1/2 flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {course.level}
                    </div>
                    <div className="w-1/2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} 
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {course.price}
                    </span>
                    <Link href={`/courses/${course.id}`}>
                      <Button
                        variant="default"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View All Courses
              </Button>
          </div>
        </div>
      </section> */}

    {/* <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 dark:text-white">
            Educational Programs
          </h2>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our educational solutions designed for schools, colleges, and training institutions across Tamil Nadu.
          </p>
        </div>

        <motion.div
          ref={coursesRef as React.RefObject<HTMLDivElement>}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={coursesVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(showAllCourses ? upcomingCourses : upcomingCourses?.slice(0, 3))?.map((course, index) => (
            <motion.div
              key={course.id}
              variants={fadeUpVariants}
              custom={index}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {course.description}
                </p> */}

                {/* <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-y-2">
                  <div className="w-1/2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating} ({Math.round(course.rating * 100)} reviews)
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {course.level}
                  </div>
                  <div className="w-1/2 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                </div> */}

                {/* <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"> */}
                  {/* <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {course.price}
                  </span> */}
                   {/* <div className="w-1/2 flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating} ({Math.round(course.rating * 100)} reviews)
                  </div>
                  <Link href={`/courses/${course.id}`}>
                    <Button
                      variant="default"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {upcomingCourses.length > 3 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? 'Show Less' : 'View All Courses'}
            </Button>
          </div>
        )}
      </div>
    </section> */}

      {/* Events Section */}
      {/* <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
              Training Sessions & Demos
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our regular training sessions, demos, and workshops designed for educational institutions and student communities.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <Button
                variant={viewMode === 'calendar' ? "default" : "outline"}
                className="rounded-l-lg rounded-r-none border-r-0"
                onClick={() => setViewMode('calendar')}
              >
                <Calendar className="h-4 w-4 mr-2" /> Calendar View
              </Button>
              <Button
                variant={viewMode === 'list' ? "default" : "outline"}
                className="rounded-md"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" /> List View
              </Button>
            </div>
          </div> */}

          {/* Calendar View */}
          {/* {viewMode === 'calendar' && (
            <motion.div
              ref={eventsRef as React.RefObject<HTMLDivElement>}
              variants={staggerContainerVariants}
              initial="hidden"
              animate={eventsVisible ? "visible" : "hidden"}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-300">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map(date => {
                    const hasEvent = events.some(event => 
                      event.date === 'Monthly' && (date === 15) || 
                      event.date === 'Quarterly' && (date === 5 || date === 20) ||
                      event.date === 'On Request' && (date === 10 || date === 25)
                    );
                    
                    return (
                      <div 
                        key={date} 
                        className={`aspect-square flex flex-col items-center justify-center p-1 rounded-md ${
                          hasEvent 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                            : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <span className="text-sm">{date}</span>
                        {hasEvent && (
                          <div className="w-2 h-2 mt-1 rounded-full bg-blue-500"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 space-y-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Upcoming Events</h4>
                  {events.map((event) => (
                    <div key={event.id} className="flex gap-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{event.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                          <Clock className="h-3 w-3" /> {event.time} • <MapPin className="h-3 w-3" /> {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )} */}
          
          {/* List View */}
          {/* {viewMode === 'list' && (
            <motion.div
              ref={eventsRef as React.RefObject<HTMLDivElement>}
              variants={staggerContainerVariants}
              initial="hidden"
              animate={eventsVisible ? "visible" : "hidden"}
              className="max-w-4xl mx-auto space-y-6"
            >
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={fadeUpVariants}
                  custom={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          event.type === "In-person" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : event.type === "Webinar"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <div className="flex items-center mr-4 mb-2 sm:mb-0">
                          <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-500" />
                          {event.time}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex">
                      <Link href="/contact">
                        <Button className="whitespace-nowrap">
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/events">
              <Button
                variant="outline"
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                See All Events
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      <EventCalendarSection/>

      <CTASection />
      <Newsletter />
    </>
  );
};

export default Courses;
