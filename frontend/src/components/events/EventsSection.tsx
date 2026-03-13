

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { fadeUpVariants } from "../../lib/animations";
import { Button } from "../ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
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
  const [selectedType] = useState<string>("All");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/cms/events").catch(() => null);
        // Since we cannot prevent browser from logging the native 500 error on failed fetched unless we simply avoid it entirely,
        // we'll just not log anything custom from our app to keep it as clean as possible.
        if (!res || !res.ok) return;

        const data = await res.json();
        setEvents(data);
      } catch (error) {
        // Silently catch errors
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
    <section id="events" className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-black dark:text-white"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeUpVariants}
          >
            Upcoming Events
          </motion.h2>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed text-deep-navy dark:text-gray-300"
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
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.6
                  }
                }
              }}
              viewport={{ once: false }}
              whileHover={{
                y: -12,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(37, 99, 235, 0.25)",
                borderColor: "rgba(37, 99, 235, 0.4)",
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-blue-50/50 dark:border-gray-700 flex flex-col group"
            >
              <div className="p-7 flex flex-col h-full">
                <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center overflow-hidden rounded-2xl mb-6 shadow-inner border border-gray-100/50 dark:border-gray-700/50 group-hover:border-blue-100 transition-colors">
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {event.type && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full border border-blue-100/50 shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">{event.type}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-heading font-extrabold text-black dark:text-white mb-4 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm font-medium leading-relaxed">
                    <ExpandableText text={event.description} limit={110} />
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3 shrink-0">
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="tracking-wide uppercase">{event.date}</span>
                    </div>

                    <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mr-3 shrink-0">
                        <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="tracking-wide uppercase line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] font-black text-blue-600/60 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                    View Details
                  </div>
                  {event.registrationLink ? (
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2">
                        Register <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={`/events`}>
                      <Button variant="outline" size="sm" className="rounded-xl border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 hover:border-blue-200 transition-all">
                        Details
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