import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { CalendarIcon, MapPin, Search, Clock, ArrowRight } from "lucide-react";
import DocumentHead from "@/components/shared/DocumentHead";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";

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

// ─── Countdown Hook (High Precision) ──────────────────────────────────────────
function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    const calc = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return timeLeft;
}

// ─── Countdown Display ───────────────────────────────────────────────────────
const CountdownTimer: React.FC<{ date: string; endDate?: string }> = ({ date, endDate }) => {
  const now = new Date();
  const start = new Date(date);

  // Smart Target: If event started, count down to End Date. Otherwise, count down to Start Date.
  const target = (now >= start && endDate) ? endDate : date;
  const { days, hours, minutes, seconds } = useCountdown(target);

  const units = [
    { label: "Days", value: days },
    { label: "Hrs", value: hours },
    { label: "Min", value: minutes },
    { label: "Sec", value: seconds },
  ];

  return (
    <div className="flex items-center gap-2 mt-4">
      <Clock className="w-4 h-4 text-blue-500 shrink-0" />
      <div className="flex gap-2">
        {units.map(({ label, value }) => (
          <div key={label} className="relative flex flex-col items-center bg-white border border-slate-100 rounded-xl px-3 py-2 min-w-[56px] shadow-sm">
            <span className={`text-xl font-black text-blue-600 leading-none ${label === 'Sec' ? 'animate-pulse' : ''}`}>
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Featured Upcoming Card ──────────────────────────────────────────────────
const FeaturedUpcomingCard: React.FC<{ event: Event }> = ({ event }) => {
  const start = parseISO(event.date);
  const formattedDate = format(start, "MMM d, yyyy");
  const formattedEnd = event.endDate ? format(parseISO(event.endDate), "MMM d, yyyy") : null;
  const endTarget = event.endDate ? parseISO(event.endDate) : start;
  const isEnded = new Date() > endTarget;

  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
        {/* Left Side: Premium Image Container - Adjusted to fit image width */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group [perspective:1000px] z-10 w-full lg:w-auto"
        >
          {/* Ambient Glow behind card */}
          <div className="absolute inset-0 bg-blue-500/5 blur-[60px] rounded-[2.5rem] group-hover:bg-blue-500/10 transition-all duration-1000" />

          <div className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-700 relative transform-gpu transition-all duration-700 group-hover:[transform:rotateY(3deg)_rotateX(-1deg)] w-full lg:w-fit">
            {/* Image Container - Background removed, height fixed, width follows image */}
            <div className="h-[280px] sm:h-[320px] lg:h-[380px] relative flex items-center justify-center overflow-hidden">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-auto object-contain group-hover:scale-105 transition-all duration-700 relative z-20"
                />
              ) : (
                <div className="w-full h-full bg-slate-50 flex items-center justify-center relative z-20 min-w-[300px]">
                  <CalendarIcon className="w-12 h-12 text-blue-200" />
                </div>
              )}

              {/* Status Badge */}
              <span className="absolute top-4 left-4 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Live Now
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content Section - Takes remaining space */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-20 flex-1"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-blue-50 text-blue-700 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-100 shadow-sm flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-blue-600" /> Featured Event
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-heading font-black text-black leading-[1.1] mb-6 tracking-tight text-left">
            {event.title}
          </h2>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3 bg-blue-50/50 px-4 py-2 rounded-full border border-blue-100/50">
              <CalendarIcon className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-bold text-blue-900 tracking-wider uppercase">{formattedDate}{formattedEnd && ` – ${formattedEnd}`}</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="text-[11px] font-bold text-slate-600 tracking-wider uppercase">{event.location}</span>
            </div>
          </div>

          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-8 text-left max-w-2xl line-clamp-3">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="mb-5 scale-[0.85] origin-left">
            {!isEnded && <CountdownTimer date={event.date} endDate={event.endDate} />}
          </div>

          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#001D4D] hover:bg-blue-800 text-white font-bold text-[11px] px-8 py-4 rounded-xl shadow-lg shadow-blue-900/10 transition-all hover:-translate-y-1 uppercase tracking-[0.2em]"
            >
              Secure Spot <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
};

// ─── Upcoming Event Card (Modern Upgrade) ───────────────────────────────────
const UpcomingCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const start = parseISO(event.date);
  const day = format(start, "dd");
  const month = format(start, "MMM");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 relative"
    >
      {/* Date Badge Float */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-2 flex flex-col items-center min-w-[55px] border border-white">
        <span className="text-xl font-black text-blue-600 leading-none">{day}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{month}</span>
      </div>

      <div className="relative overflow-hidden h-52">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <CalendarIcon className="w-10 h-10 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100/50">
            Upcoming
          </span>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> {event.location}
          </span>
        </div>

        <h3 className="font-heading font-bold text-black text-xl leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 tracking-tight">
          {event.title}
        </h3>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
          {event.registrationLink ? (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Register for ${event.title}`}
              className="text-blue-600 text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2 group/btn transition-all"
            >
              Secure Spot <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
            </a>
          ) : (
            <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider italic">Opening soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// ─── Past Event Card (Modern Upgrade) ──────────────────────────────────────────
const PastCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const start = parseISO(event.date);
  const day = format(start, "dd");
  const month = format(start, "MMM");

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 relative flex flex-col"
    >
      {/* Date Badge Float (Archival Muted) */}
      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md shadow-sm rounded-2xl p-2 flex flex-col items-center min-w-[50px] border border-slate-50 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-lg font-black text-slate-400 group-hover:text-blue-600 transition-colors leading-none">{day}</span>
        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">{month}</span>
      </div>

      {/* Polaroid Image Area */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200">
            <CalendarIcon className="w-10 h-10" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-slate-400 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
            <MapPin className="w-3 h-3" /> {event.location}
          </span>
        </div>

        <h3 className="font-bold text-slate-600 text-sm leading-snug mb-2 group-hover:text-slate-900 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <div className="mt-auto pt-3 border-t border-slate-50">
          <span className="text-[10px] font-semibold text-slate-400 lowercase tracking-tight italic">
            archived event
          </span>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Featured Past Card ──────────────────────────────────────────────────────
const FeaturedPastCard: React.FC<{ event: Event }> = ({ event }) => {
  const formattedDate = format(parseISO(event.date), "MMM d, yyyy");
  const formattedEnd = event.endDate ? format(parseISO(event.endDate), "MMM d, yyyy") : null;

  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
        {/* Left Side: Premium Image Container */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group [perspective:1000px] z-10 w-full lg:w-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 relative transform-gpu transition-all duration-700 w-full lg:w-fit">
            <div className="h-[280px] sm:h-[320px] lg:h-[380px] relative flex items-center justify-center overflow-hidden bg-slate-50">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 relative z-20"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center relative z-20 min-w-[300px]">
                  <CalendarIcon className="w-12 h-12 text-slate-200" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-20 flex-1"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-slate-100 text-slate-600 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
              Captured Memory
            </span>
          </div>

          <h2 className="text-xl lg:text-2xl font-heading font-black text-slate-700 leading-tight mb-3 tracking-tight text-left">
            {event.title}
          </h2>

          <div className="space-y-1.5 mb-5 text-[13px]">
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <CalendarIcon className="w-3 h-3" />
              <span>{formattedDate}{formattedEnd && ` – ${formattedEnd}`}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold">
              <MapPin className="w-3 h-3" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-gray-600 text-xs leading-relaxed mb-5 text-left max-w-xl line-clamp-3 italic">
            {event.description?.replace(/<[^>]*>/g, "")}
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-400 font-black text-[9px] px-4 py-2 rounded-lg border border-slate-200 uppercase tracking-wider">
            Archived Record
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="bg-gray-200" style={{ aspectRatio: "3/4", maxHeight: "280px" }} />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-5 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-9 bg-gray-200 rounded-xl w-full mt-4" />
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────
const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/cms/events"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const now = new Date();

  const upcoming = events.filter((e) => {
    const end = e.endDate ? new Date(e.endDate) : new Date(e.date);
    return end >= now;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = events.filter((e) => {
    const end = e.endDate ? new Date(e.endDate) : new Date(e.date);
    return end < now;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filterList = (list: Event[]) =>
    list.filter((e) => {
      const q = searchQuery.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    });

  const filteredUpcoming = filterList(upcoming);
  const filteredPast = filterList(past);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <DocumentHead
        title="Events & Workshops | Tarcin Robotics"
        description="Join Tarcin Robotics events, workshops and webinars on robotics, AI and IoT."
      />

      {/* ── Hero ── */}
      <header>
        <section
          className="mt-20 pt-32 pb-16 md:pt-40 md:pb-20 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)" }}
        >
          <div className="absolute inset-0 opacity-15 animate-wave">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ev-wave" width="120" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 0 25 Q 30 5, 60 25 T 120 25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#ev-wave)" />
            </svg>
          </div>
          <style>{`
            @keyframes waveMove { 0%{transform:translateX(0)} 100%{transform:translateX(-120px)} }
            .animate-wave svg { animation: waveMove 6s linear infinite; }
          `}</style>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
                initial="hidden" animate="visible" variants={fadeUpVariants}
              >
                Events & Workshops
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed mb-8"
                initial="hidden" animate="visible" variants={fadeUpVariants} custom={1}
              >
                Join our workshops, webinars, and conferences on robotics, AI, and IoT technologies.
              </motion.p>
              {/* Live counters */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUpVariants} custom={2}
                className="flex items-center justify-center gap-4"
              >
                <span className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 text-sm font-bold px-4 py-2 rounded-full">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {upcoming.length} Upcoming
                </span>
                <span className="flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm font-semibold px-4 py-2 rounded-full">
                  {past.length} Past Events
                </span>
              </motion.div>
            </div>
          </div>
        </section>
      </header>

      {/* ── Content ── */}
      <section className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Updated Search + Tabs Bar */}
          <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white/50 p-3 mb-12 flex flex-col lg:flex-row items-center gap-4">
            {/* Nav Tabs */}
            <div className="flex bg-slate-100 rounded-[2rem] p-1.5 w-full lg:w-auto">
              {(["upcoming", "past"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 lg:flex-none px-10 py-3.5 rounded-[1.8rem] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab
                    ? "bg-white text-blue-600 shadow-xl shadow-blue-900/10"
                    : "text-slate-500 hover:text-blue-800"
                    }`}
                >
                  {tab === "upcoming" ? "Live & Future" : "Archive"}
                </button>
              ))}
            </div>

            {/* Quick Stats Badge */}
            <div className="hidden lg:flex items-center gap-4 px-4 border-l border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{upcoming.length} Events coming up</span>
              </div>
            </div>

            {/* Premium Search */}
            <div className="relative flex-1 w-full lg:max-w-md ml-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              <input
                type="text"
                aria-label="Search events"
                placeholder="Find an event, workshop or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-sm rounded-[2rem] border-none bg-slate-50 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400 min-h-[48px]"
              />
            </div>
          </div>

          {/* ── UPCOMING TAB ── */}
          {activeTab === "upcoming" && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : filteredUpcoming.length === 0 ? (
                <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No upcoming events</h3>
                  <p className="text-gray-500">Check back soon — new events are being planned!</p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Featured */}
                  <FeaturedUpcomingCard event={filteredUpcoming[0]} />
                  {/* Grid */}
                  {filteredUpcoming.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredUpcoming.slice(1).map((event, i) => (
                        <UpcomingCard key={event._id} event={event} index={i} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ── PAST TAB ── */}
          {activeTab === "past" && (
            <>
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : filteredPast.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                  <div className="text-5xl mb-6 grayscale opacity-20">🗂️</div>
                  <h3 className="text-xl font-bold text-slate-400">Our history is still being written...</h3>
                  <p className="text-slate-300 text-sm mt-1">Past events and successful workshops will appear here as captured memories.</p>
                </div>
              ) : (
                <>
                  {/* Featured Archived Event */}
                  <FeaturedPastCard event={filteredPast[0]} />
                  
                  {/* Archived Grid */}
                  {filteredPast.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredPast.slice(1).map((event, i) => (
                        <PastCard key={event._id || i} event={event} index={i} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
