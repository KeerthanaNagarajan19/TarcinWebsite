

import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants, staggerContainerVariants } from "../../lib/animations";
import { Button } from "../ui/button";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";
import { ExpandableText } from "../ui/expandable-text";

interface Event {
  type: string;
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  image?: string;
  isUpcoming: boolean;
}

const EventsSection: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  // const [selectedType, setSelectedType] = useState<"All" | "In-person" | "Webinar" | "Workshop">("All");
  
  
  useEffect(() => {
   const fetchEvents = async () => {
     try {
       const res = await fetch("/api/cms/events");
       const data = await res.json();
       setEvents(data);
     } catch (error) {
       console.error("Failed to load events:", error);
     }
   };

  fetchEvents();
  }, []);

 const upcomingEvents = events.filter((event) => {
  const eventDate = new Date(event.date);
  return eventDate >= new Date(); // Filter only future or today
});

const filteredEvents = selectedType === "All"
  ? upcomingEvents
  : upcomingEvents.filter((event) => event.type === selectedType);

  
  return (
    <section id="events" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-xl md:text-2xl font-heading font-bold text-deep-navy dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            className="mt-4 text-base text-deep-navy dark:text-gray-300 max-w-3xl mx-auto"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
            custom={1}
          >
            Join us at our workshops, webinars, and community events to learn, connect, and grow with Tarcin Robotic.
          </motion.p>
        </div>
        
        {/* <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            {["All", "In-person", "Webinar", "Workshop"].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type as any)}
                className={`${
                  selectedType === type 
                    ? "bg-blue text-white" 
                    : "bg-white dark:bg-gray-800"
                } ${
                  type === "All" 
                    ? "rounded-l-md rounded-r-none" 
                    : type === "Workshop" 
                    ? "rounded-r-md rounded-l-none" 
                    : "rounded-none"
                } border-r-0 last:border-r`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div> */}
        
        <motion.div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              variants={fadeUpVariants}
              custom={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                {/* <div className="flex items-center mb-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    event.type === "In-person" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                      : event.type === "Webinar"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  }`}>
                    {event.type}
                  </span>
                </div> */}
{/* 
                 <div className="h-60 overflow-hidden">
      <img 
      src={event.image}
        // src={`/api${event.image}`}
        alt={event.title} 
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
    </div> */}
                <div className="relative w-full aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden rounded-md">
                      <img
                       src={event.image}
                       // src={`/api${event.image}`}
                       alt={event.title}
                      className="w-full h-full object-contain p-2 transition-transform hover:scale-105 duration-500"
                       />
                </div>

                
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-3">
                  {event.title}
                </h3>
                
                {/* <p className="text-gray-600 dark:text-gray-300 mb-4">
                 <ExpandableText text={event.description} limit={120} />
                </p> */}

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <ExpandableText text={event.description} limit={120} />
                </p>

                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    {event.date}
                  </div>
                  
                  {/* <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    {event.time}
                  </div> */}
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    {event.location}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="flex items-center gap-1">
                        Register <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={`/events`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link href="/events">
            <Button
              variant="outline"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;