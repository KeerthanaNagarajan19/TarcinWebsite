
import React, { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DocumentHead from "@/components/shared/DocumentHead";

/* ---------- Types ---------- */
type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  images: string[];
  createdAt: string;
  date?: string;
};

/* ---------- Constants ---------- */
const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Office", value: "office" },
  { label: "School", value: "school" },
  { label: "College", value: "college" },
  { label: "Other", value: "other" },
];

/* ---------- Helpers ---------- */
const getImageUrl = (path: string) => {
  if (!path) return "https://via.placeholder.com/1200x800?text=No+Image";
  if (path.startsWith("http")) return path;
  let clean = path.replace(/\\/g, "/");
  if (!clean.startsWith("/")) clean = `/${clean}`;
  return clean;
};

/* ---------- Fetch ---------- */
const fetchGallery = async (): Promise<GalleryItem[]> => {
  const res = await axios.get("/api/gallery?limit=500");
  return res.data.data as GalleryItem[];
};

const useGallery = () =>
  useQuery({
    queryKey: ["gallery-all"],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 2,
  });

/* ---------- Lightbox ---------- */
const Lightbox: React.FC<{
  images: string[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full z-10"
      >
        <X className="w-7 h-7" />
      </button>
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition z-10"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center">
        <img
          key={current}
          src={getImageUrl(images[current])}
          alt={`Photo ${current + 1}`}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/800x600?text=Image+Not+Found";
          }}
        />
        <div className="mt-4 text-white/60 text-sm font-medium">
          {current + 1} / {images.length}
        </div>
      </div>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition z-10"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};

/* ---------- Main Gallery Section ---------- */
const GallerySection: React.FC = () => {
  const { data = [], isLoading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<GalleryItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Dynamic years
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    data.forEach((item) => {
      const d = new Date(item.date || item.createdAt);
      if (!isNaN(d.getTime())) yearSet.add(d.getFullYear());
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [data]);

  // Filtered list
  const filteredEvents = useMemo(() => {
    return data.filter((event) => {
      const d = new Date(event.date || event.createdAt);
      const matchCategory = !selectedCategory || event.category === selectedCategory;
      const matchYear = !selectedYear || d.getFullYear().toString() === selectedYear;
      return matchCategory && matchYear;
    });
  }, [data, selectedCategory, selectedYear]);


  const handleEventClick = (event: GalleryItem) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedEvent(null);
    setLightboxIndex(null);
  };

  return (
    <>
      <DocumentHead
        title="Gallery - Tarcin Robotics"
        description="Explore moments from our events, workshops, and innovations."
      />

      <div className="pt-32 pb-16 bg-white min-h-[600px] px-4">
        {selectedEvent ? (
          /* ===== Album Detail View ===== */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-7xl mx-auto text-left"
            >
              {/* ===== BACK BUTTON ===== */}
              <button
                onClick={handleBack}
                className="group flex items-center text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
                Back to Gallery
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                {/* LEFT COLUMN: Visual Gallery (Images) - Now also sticky if shorter than content */}
                <div className="lg:col-span-7 space-y-10 lg:sticky lg:top-28">
                  {/* Featured Large Image */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 group aspect-[4/3] md:aspect-[16/10]"
                    onClick={() => setLightboxIndex(0)}
                  >
                    <img
                      src={getImageUrl(selectedEvent.images[0])}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 cursor-zoom-in"
                    />
                  </motion.div>

                  {/* Rest of the Gallery Images */}
                  <div className="grid grid-cols-2 gap-6 md:gap-8">
                    {selectedEvent.images.slice(1).map((img, i) => {
                      const isWide = (i + 1) % 5 === 0;
                      return (
                        <motion.div
                          key={`img-gallery-${i}`}
                          whileHover={{ y: -8 }}
                          className={`rounded-[32px] overflow-hidden shadow-md border border-gray-100 cursor-zoom-in group ${isWide ? 'col-span-2' : ''}`}
                          onClick={() => setLightboxIndex(i + 1)}
                        >
                          <div className={`${isWide ? 'aspect-[21/9]' : 'aspect-square md:aspect-[3/4]'} overflow-hidden`}>
                            <img
                              src={getImageUrl(img)}
                              alt={`Memory ${i + 2}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT COLUMN: The Story (Sticky Sidebar) */}
                <div className="lg:col-span-5 lg:sticky lg:top-28 py-2">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-px w-10 bg-blue-600"></span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Album story</span>
                  </div>

                  <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9] lg:max-w-md font-sans">
                    {selectedEvent.title}
                  </h2>

                  {selectedEvent.description ? (
                    <div className="max-w-none mb-10">
                      <p 
                        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }} 
                        className="text-xl md:text-2xl font-sans text-gray-700 leading-relaxed text-justify"
                      >
                        {selectedEvent.description}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400 font-medium italic mb-10 lg:max-w-sm">
                      Witness the moments that define our journey through innovation and excellence.
                    </p>
                  )}

                  <div className="flex items-center gap-6 pt-8 border-t border-gray-100">
                    <div className="flex -space-x-4">
                      {selectedEvent.images.slice(0, 3).map((img, i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm bg-gray-100">
                          <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                      {selectedEvent.images.length > 3 && (
                        <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-white text-[10px] font-black shadow-sm">
                          +{selectedEvent.images.length - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-tight">Archive View</span>
                      <span className="text-xs font-bold text-gray-900">
                        {new Date(selectedEvent.date || selectedEvent.createdAt).toLocaleDateString("en-US", {
                          month: "long", year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {lightboxIndex !== null && (
                <Lightbox
                  images={selectedEvent.images}
                  initialIndex={lightboxIndex}
                  onClose={() => setLightboxIndex(null)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          /* ===== Albums List View ===== */
          <div className="max-w-7xl mx-auto">

            {/* ALBUM CAROUSEL (One at a time with animation) */}
            <div className="relative max-w-7xl mx-auto group/carousel">
              {isLoading ? (
                <div className="py-24 text-center">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-100 border-t-blue-600 mx-auto mb-6" />
                  <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[10px]">Preparing Showcase...</p>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="py-24 text-center text-slate-400 font-black uppercase tracking-widest text-sm border-2 border-dashed rounded-[40px]">
                  No memories found matching these filters.
                </div>
              ) : (
                <AlbumCarousel events={filteredEvents} onEventClick={handleEventClick} />
              )}
            </div>

            {/* Top Bar: Filters (Moved below the carousel) */}
            <div className="w-full bg-blue-50/40 rounded-[32px] p-4 md:p-5 shadow-sm mt-12 mb-12 flex flex-wrap items-center justify-between gap-4 border border-blue-100">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <select
                    id="category-filter"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-white border-0 text-gray-900 text-[13px] font-bold rounded-2xl pl-5 pr-12 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.8rem' }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <select
                    id="year-filter"
                    name="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="bg-white border-0 text-gray-900 text-[13px] font-bold rounded-2xl pl-5 pr-12 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2.5\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '0.8rem' }}
                  >
                    <option value="">All Years</option>
                    {years.map((y) => (
                      <option key={y} value={y.toString()}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => { setSelectedCategory(""); setSelectedYear(""); }}
                className="text-[11px] font-black text-blue-600 hover:text-blue-800 transition uppercase tracking-[0.15em] px-6 py-2"
              >
                Reset Filters
              </button>
            </div>
            {/* ALBUM GRID (Below filters) */}
            <div className="mt-12 mb-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  onClick={() => handleEventClick(event)}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-slate-100">
                    <img
                      src={getImageUrl(event.images[0])}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=No+Image";
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur text-blue-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {event.category}
                      </span>
                    </div>
                    {event.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 text-white text-xs font-bold bg-black/50 backdrop-blur px-2.5 py-1 rounded-full">
                        +{event.images.length - 1} photos
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem] flex items-center">
                      {event.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between text-slate-500">
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {new Date(event.date || event.createdAt).getFullYear()}
                      </span>
                      <ChevronRight className="w-5 h-5 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/* ---------- Carousel Sub-Component ---------- */
const AlbumCarousel: React.FC<{
  events: GalleryItem[];
  onEventClick: (e: GalleryItem) => void;
}> = ({ events, onEventClick }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  // Auto play
  useEffect(() => {
    const timer = setInterval(nextSlide, 3000); // Decreased from 5000 to 3000
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const currentEvent = events[index];

  return (
    <div className="relative overflow-hidden rounded-[48px] h-[450px] md:h-[600px] shadow-2xl bg-slate-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 cursor-pointer"
          onClick={() => onEventClick(currentEvent)}
        >
          {/* Cinematic Slide Layout: Image Top + Info Bottom (No Overlap) */}
          <div className="flex flex-col w-full h-full bg-slate-950">
            {/* 1. Vertical Image Container (Main Focus) */}
            <div className="relative flex-grow flex items-center justify-center overflow-hidden">
              {/* Blurred Background Layer (Aesthetic filler) */}
              <img
                src={getImageUrl(currentEvent.images[0])}
                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
                alt=""
              />

              {/* Main Image (Covering Full Width & Height) */}
              <img
                src={getImageUrl(currentEvent.images[0])}
                className="relative z-10 w-full h-full object-cover transition-all duration-1000"
                alt={currentEvent.title}
              />

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* 2. Integrated Info Bar (Never covers image content) */}
            <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/5 px-8 py-6 md:px-12 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-10">
              <div className="flex flex-col gap-1 flex-grow">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-sm shadow-blue-500/50" />
                  <span className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap">
                    {currentEvent.category} &bull; {currentEvent.images.length} High-Res Photos
                  </span>
                </div>
                <h2 className="text-xl md:text-3xl font-black text-white tracking-tight line-clamp-1">
                  {currentEvent.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-blue-600 hover:bg-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-600/10 active:scale-95 group/btn cursor-pointer">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white group-hover/btn:text-slate-900">
                  View Album
                </span>
                <ChevronRight className="w-4 h-4 text-white group-hover/btn:text-slate-900 group-hover/btn:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav Arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all opacity-0 group-hover/carousel:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {events.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};


export default GallerySection;
