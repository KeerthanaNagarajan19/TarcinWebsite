import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import DocumentHead from "@/components/shared/DocumentHead";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import { ExpandableText } from "@/components/ui/expandable-text";


interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  image?: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const now = new Date();
  const start = new Date(event.date);
  const end = event.endDate ? new Date(event.endDate) : start;
  const isUpcoming = end >= now;

  const formattedDate = format(start, "MMM d, yyyy");
  const formattedEndDate = event.endDate
    ? format(parseISO(event.endDate), "MMM d, yyyy")
    : null;
    

  return (
   <Card className="h-auto min-h-[500px] flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg border border-gray-200">
  {event.image && (
    <div className="h-60 overflow-hidden">
      {/* <img 
        src={`/api${event.image}`}
        alt={event.title} 
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      /> */}

      <img 
  src={`/api${event.image}`}
  alt={event.title} 
  className={`w-full h-full object-cover transition-transform hover:scale-105 duration-500 ${
    isUpcoming ? "" : "grayscale"
  }`}
/>
    </div>
    
  )}

  <CardHeader className="pb-2">
    <div className="flex items-center text-sm text-gray-500 mb-2">
      <CalendarIcon className="h-4 w-4 mr-1" />
      <span>
        {formattedDate}
        {formattedEndDate && ` - ${formattedEndDate}`}
      </span>
    </div>
    <CardTitle className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors">
      {event.title}
    </CardTitle>
  </CardHeader>

  <CardContent className="pb-4 flex-grow text-gray-700">
    <div className="flex items-center text-sm text-gray-600 mb-3">
      <MapPin className="h-4 w-4 mr-1" />
      <span>{event.location}</span>
    </div>

    {/* Description with expandable content */}
    <ExpandableText text={event.description} limit={120} isHtml />
  </CardContent>

  <CardFooter className="pt-0 mt-auto">
  {event.registrationLink && event.isUpcoming ? (
    <a 
      href={event.registrationLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-full"
    >
      <Button variant="default" className="w-full">
        Register Now
      </Button>
    </a>
  ) : (
    <p className="text-sm text-muted-foreground text-center w-full">
      This event has ended.
    </p>
  )}
</CardFooter>

</Card>

  );
};

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/cms/events"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const now = new Date();

  const upcomingEvents = events.filter((event) => {
    const end = event.endDate ? new Date(event.endDate) : new Date(event.date);
    return end >= now;
  });

  const pastEvents = events.filter((event) => {
    const end = event.endDate ? new Date(event.endDate) : new Date(event.date);
    return end < now;
  });

  const filterEvents = (eventList: Event[]) =>
    eventList.filter((event) => {
      const q = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q)
      );
    });

  const filteredUpcoming = filterEvents(upcomingEvents);
  const filteredPast = filterEvents(pastEvents);

  const noEventsContent = (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2">No events found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search criteria or check back later for new events.
      </p>
      <Button onClick={() => setSearchQuery("")}>Clear search</Button>
    </div>
  );


const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
  
  return (
    <>
      <DocumentHead
        title="Events - Workshops, Webinars & Conferences"
        description="Join Tarcin Robotic's events, workshops, webinars, and conferences. Stay updated with the latest in robotics, IoT, and AI technology."
      />
      <header>
       <section className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 bg-blue-900 text-white relative overflow-hidden">
      {/* Animated wave background */}
      <div className="absolute inset-0 opacity-20 animate-wave">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="wave-lines"
              width="100"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="translate(0, 0)"
            >
              <path
                d="M 0 20 Q 25 0, 50 20 T 100 20"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#wave-lines)" />
        </svg>
      </div>

      <style>{`
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        .animate-wave svg {
          animation: waveMove 5s linear infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Events
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-white/90 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={1}
          >
            Join us at our upcoming events, workshops, and conferences to learn
            about the latest advancements in robotics, IoT, and AI technologies.
          </motion.p>
        </div>
      </div>
    </section>
    </header>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search events by title, description or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 font-medium">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {upcomingEvents.length} Upcoming Events
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-[350px] animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-gray-200 rounded w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredUpcoming.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcoming.map((event) => (
                  <article key={event._id}>
                    <EventCard event={event} />
                  </article>
                ))}
              </div>
            ) : (
              noEventsContent
            )}
          </TabsContent>

          <TabsContent value="past">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="h-[350px] animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 bg-gray-200 rounded w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPast.map((event) => (
                  <article key={event._id}>
                    <EventCard event={event} />
                  </article>
                ))}
              </div>
            ) : (
              noEventsContent
            )}
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Events;



