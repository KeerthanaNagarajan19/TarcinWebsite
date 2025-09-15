import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "../../lib/animations";
import { useScrollAnimation } from "../../hooks/use-scroll-animation";
import { Button } from "../ui/button";
import { Calendar, Clock, MapPin, List, Video, Users, Settings } from "lucide-react";
import { Link } from "wouter";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  time?: string;
  type: string;
}

const CalendarAndListEventsSection: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  const { elementRef: eventsRef, isVisible: eventsVisible } = useScrollAnimation();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const monthStart = new Date(currentYear, currentMonth, 1);
  const monthEnd = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = monthEnd.getDate();
  const startWeekDay = monthStart.getDay() === 0 ? 7 : monthStart.getDay();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/cms/events");
        const data = await res.json();
        const upcoming = data.filter((event: Event) => new Date(event.date) >= new Date());
        setEvents(upcoming);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const getEventForDate = (day: number) => {
    return events.find((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      );
    });
  };

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(today);

  const renderTypeIcon = (type: string) => {
    if (type === "Webinar") return <Video className="text-blue-500" />;
    if (type === "In-person") return <Users className="text-green-500" />;
    if (type === "Workshop") return <Settings className="text-purple-500" />;
    return <Calendar className="text-gray-400" />;
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white">
            Training Sessions & Demos
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join our regular training sessions, demos, and workshops designed for educational institutions and student communities.
          </p>
        </div>

        {/* Toggle */}
        <nav className="flex justify-center mb-8" aria-label="Event view toggle">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              className="rounded-l-lg rounded-r-none border-r-0"
              onClick={() => setViewMode("calendar")}
            >
              <Calendar className="h-4 w-4 mr-2" /> Calendar View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              className="rounded-md"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" /> List View
            </Button>
          </div>
        </nav>

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <motion.div
            ref={eventsRef as React.RefObject<HTMLDivElement>}
            variants={staggerContainerVariants}
            initial="hidden"
            animate={eventsVisible ? "visible" : "hidden"}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="text-center text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                {monthName} {currentYear}
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-600 dark:text-gray-300">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: startWeekDay - 1 }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {Array.from({ length: totalDays }, (_, i) => i + 1).map((date) => {
                  const matchedEvent = getEventForDate(date);
                  return (
                    <div
                      key={date}
                      className={`aspect-square flex flex-col items-center justify-center p-1 rounded-md text-center ${
                        matchedEvent
                          ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                          : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <span className="text-sm font-medium">{date}</span>
                      {matchedEvent && (
                        <span className="text-xs text-blue-600 dark:text-blue-300 mt-1 leading-tight truncate">
                          {matchedEvent.title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Calendar Event Cards (Below Calendar) */}
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-blue-500 dark:text-blue-400">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {event.location} • <Clock className="inline h-4 w-4 mr-1" />
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === "list" && (
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
                    {/* Type replaced with icon */}
                    <div className="mb-2">
                      <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        {renderTypeIcon(event.type)}
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
                      {event.time && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-blue-500" />
                          {event.time}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                      {event.location}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex">
                    <Link href="/contact">
                      <Button className="whitespace-nowrap">Contact Us</Button>
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
    </section>
  );
};

export default CalendarAndListEventsSection;
