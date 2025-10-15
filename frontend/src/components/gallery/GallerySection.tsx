
// // frontend/src/components/gallery/GallerySection.tsx
// import React, { useMemo, useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// type GalleryItem = {
//   _id: string;
//   title: string;
//   description?: string;
//   category: string;
//   images: string[];
//   createdAt: string;
// };

// const CATEGORIES = [
//   { label: "All", value: "" },
//   { label: "Office", value: "office" },
//   { label: "School", value: "school" },
//   { label: "College", value: "college" },
//   { label: "Other", value: "other" },
// ];

// const fetchGallery = async () => {
//   const res = await axios.get("/api/gallery?limit=500");
//   return res.data.data as GalleryItem[];
// };

// const useGallery = () =>
//   useQuery({
//     queryKey: ["gallery-all"],
//     queryFn: fetchGallery,
//     staleTime: 1000 * 60 * 2,
//   });

// /* ---------- Simple Carousel (top, independent) ---------- */
// const Carousel: React.FC<{ slides: { image: string; title?: string; category?: string }[]; interval?: number }> = ({
//   slides,
//   interval = 4000,
// }) => {
//   const [index, setIndex] = useState(0);
//   const [paused, setPaused] = useState(false);

//   useEffect(() => {
//     if (paused || slides.length <= 1) return;
//     const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
//     return () => clearInterval(t);
//   }, [paused, slides.length, interval]);

//   useEffect(() => {
//     if (index >= slides.length) setIndex(0);
//   }, [slides.length, index]);

//   const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);
//   const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);

//   if (!slides.length) return null;

//   return (
//     <div
//       className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 mt-8"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div className="relative h-64 md:h-96 w-full bg-slate-100">
//         {slides.map((s, i) => (
//           <div
//             key={i}
//             className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100 z-10" : "opacity-0 z-0"} group`}
//             aria-hidden={i !== index}
//             role="img"
//             aria-label={s.title || `Slide ${i + 1}`}
//           >
//             <img
//               src={s.image}
//               alt={s.title || `Slide ${i + 1}`}
//               className="w-full h-full object-cover"
//               loading={i === index ? "eager" : "lazy"}
//             />

//             {/* overlay: full-slide hover triggers it */}
//             <div className="absolute inset-0 flex items-end pointer-events-none">
//               <div className="p-6 w-full max-w-xl ml-6">
//                 <div className="opacity-0 group-hover:opacity-100 pointer-events-auto transition-opacity duration-200 bg-black/60 p-4 rounded text-white">
//                   {s.category && <div className="text-xs uppercase tracking-wide mb-1 text-slate-200">{s.category}</div>}
//                   <h3 className="text-lg font-semibold">{s.title}</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {slides.length > 1 && (
//         <>
//           <button
//             onClick={prev}
//             aria-label="Previous"
//             className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-2 shadow"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </button>
//           <button
//             onClick={next}
//             aria-label="Next"
//             className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-2 shadow"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// /* ---------- Card for grid items (hover reveals title/desc) ---------- */
// const Card: React.FC<{
//   image: string;
//   title?: string;
//   description?: string;
// }> = ({ image, title, description }) => {
//   return (
//     <div className="relative rounded-lg overflow-hidden shadow-sm bg-white group" role="group" aria-label={title}>
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//         loading="lazy"
//       />
//       <div className="absolute inset-0 flex items-end p-4">
//         <div className="w-full rounded-md bg-gradient-to-t from-black/70 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//           <div className="text-sm font-semibold text-white line-clamp-2">{title}</div>
//           {description ? <div className="text-xs text-slate-100 mt-1 line-clamp-2">{description}</div> : null}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------- Small inline icons (grid / list) ---------- */
// function IconGrid({ active }: { active: boolean }) {
//   return (
//     <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" aria-hidden>
//       <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
//       <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
//       <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
//       <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
//     </svg>
//   );
// }
// function IconList({ active }: { active: boolean }) {
//   return (
//     <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" aria-hidden>
//       <rect x="4" y="5" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
//       <rect x="4" y="10.5" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
//       <rect x="4" y="16" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
//     </svg>
//   );
// }

// /* ---------- Main component: Carousel + Responsive Filter + Grid + Heading ---------- */
// const GallerySection: React.FC = () => {
//   const { data = [], isLoading } = useGallery();
//   const [selected, setSelected] = useState<string>("");
//   const [mobileLayout, setMobileLayout] = useState<"list" | "grid">("list"); // default: 1 card per row on phone

//   // Carousel slides: choose first image of recent posts (deduped), up to 6
//   const slides = useMemo(() => {
//     const out: { image: string; title?: string; category?: string }[] = [];
//     const seen = new Set<string>();
//     for (const post of data) {
//       if (!post.images?.length) continue;
//       const img = post.images[0];
//       if (seen.has(img)) continue;
//       out.push({ image: img, title: post.title, category: post.category });
//       seen.add(img);
//       if (out.length >= 6) break;
//     }
//     return out;
//   }, [data]);

//   // Prepare flattened images for cards (each image becomes a card)
//   const flattened = useMemo(() => data.flatMap((post) => (post.images || []).map((img) => ({ ...post, image: img }))), [data]);

//   // Client-side filtering (filter only affects the cards grid)
//   const filtered = useMemo(() => {
//     if (!selected) return flattened;
//     return flattened.filter((f) => f.category === selected);
//   }, [flattened, selected]);

//   // Grid column classes: on small screens use mobileLayout; on md+ keep fixed responsive columns
//   const smallColsClass = mobileLayout === "list" ? "grid-cols-1" : "grid-cols-2";

//   return (
//     <section className="py-10 bg-white">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Top: Carousel (independent) */}
//         <Carousel slides={slides} />

//         {/* Centered heading (above filter) */}
//         <div className="text-center mb-6">
//           <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Gallery</h2>
//           <p className="max-w-2xl mx-auto text-md md:text-lg text-slate-600 mt-3">
//             Moments from our office activities, school and college events — thoughtfully curated, beautifully captured,
//             and ready to share.
//           </p>
//         </div>

//         {/* Responsive Filter: pills on md+, select + two icons on small screens */}
//         <div className="mb-6 flex items-center justify-center">
//           {/* desktop / tablet pills */}
//           <div className="hidden md:flex flex-wrap justify-center gap-3" role="tablist" aria-label="Gallery categories">
//             {CATEGORIES.map((c) => (
//               <button
//                 key={c.value}
//                 onClick={() => setSelected(c.value)}
//                 aria-pressed={selected === c.value}
//                 aria-label={`Filter ${c.label}`}
//                 className={`px-3 py-1 rounded-full text-sm font-medium transition-shadow ${
//                   selected === c.value ? "bg-blue-600 text-white shadow" : "bg-white border"
//                 }`}
//               >
//                 {c.label}
//               </button>
//             ))}
//           </div>

//           {/* mobile select + layout icons */}
//           <div className="flex items-center gap-3 w-full max-w-xs md:hidden">
//             <div className="relative flex-1">
//               <label htmlFor="gallery-filter" className="sr-only">
//                 Choose category
//               </label>
//               <select
//                 id="gallery-filter"
//                 value={selected}
//                 onChange={(e) => setSelected(e.target.value)}
//                 className="block w-full rounded-full border px-4 py-2 pr-10 text-sm bg-white"
//                 aria-label="Filter gallery"
//               >
//                 {CATEGORIES.map((c) => (
//                   <option key={c.value} value={c.value}>
//                     {c.label}
//                   </option>
//                 ))}
//               </select>
//               {/* chevron icon */}
//               {/* <div className="pointer-events-none absolute inset-y-0 right-3 top-0 flex items-center">
//                 <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="none" aria-hidden>
//                   <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </div> */}
//             </div>

//             {/* two icons (grid/list) */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setMobileLayout("grid")}
//                 aria-pressed={mobileLayout === "grid"}
//                 aria-label="Grid view"
//                 className={`p-2 rounded ${mobileLayout === "grid" ? "bg-slate-100" : "bg-white"}`}
//               >
//                 <IconGrid active={mobileLayout === "grid"} />
//               </button>
//               <button
//                 onClick={() => setMobileLayout("list")}
//                 aria-pressed={mobileLayout === "list"}
//                 aria-label="List view"
//                 className={`p-2 rounded ${mobileLayout === "list" ? "bg-slate-100" : "bg-white"}`}
//               >
//                 <IconList active={mobileLayout === "list"} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Cards grid */}
//         {isLoading ? (
//           <div className="py-16 text-center text-slate-500">Loading photos…</div>
//         ) : filtered.length === 0 ? (
//           <div className="py-12 text-center text-slate-500">No photos found for this category.</div>
//         ) : (
//           <div
//             id="gallery-grid"
//             className={`grid ${smallColsClass} sm:grid-cols-3 md:grid-cols-4 gap-4`}
//             aria-live="polite"
//           >
//             {filtered.map((item, idx) => (
//               <div key={`${item._id}-${idx}`} className="group">
//                 <Card image={item.image} title={item.title} description={item.description} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default GallerySection;


import React, { useMemo, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- Types ---------- */
type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  images: string[];
  createdAt: string;
  date?: string; // <-- use server-provided date if available
};

/* ---------- Constants ---------- */
const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Office", value: "office" },
  { label: "School", value: "school" },
  { label: "College", value: "college" },
  { label: "Other", value: "other" },
];

/* ---------- Fetch Hook ---------- */
const fetchGallery = async () => {
  const res = await axios.get("/api/gallery?limit=500");
  return res.data.data as GalleryItem[];
};

const useGallery = () =>
  useQuery({
    queryKey: ["gallery-all"],
    queryFn: fetchGallery,
    staleTime: 1000 * 60 * 2,
  });

/* ---------- Carousel Component ---------- */
const Carousel: React.FC<{ slides: { image: string; title?: string; category?: string }[]; interval?: number }> = ({
  slides,
  interval = 4000,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, slides.length, interval]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8 mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-64 md:h-96 w-full bg-slate-100">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            } group`}
          >
            <img
              src={s.image}
              alt={s.title || `Slide ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i === index ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 flex items-end pointer-events-none">
              <div className="p-6 w-full max-w-xl ml-6">
                <div className="opacity-0 group-hover:opacity-100 pointer-events-auto transition-opacity duration-200 bg-black/60 p-4 rounded text-white">
                  {s.category && (
                    <div className="text-xs uppercase tracking-wide mb-1 text-slate-200">{s.category}</div>
                  )}
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-2 shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white p-2 shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
};

/* ---------- Card Component ---------- */
const Card: React.FC<{
  image: string;
  title?: string;
  description?: string;
}> = ({ image, title, description }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm bg-white group" role="group" aria-label={title}>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-end p-4">
        <div className="w-full rounded-md bg-gradient-to-t from-black/70 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="text-sm font-semibold text-white line-clamp-2">{title}</div>
          {description ? <div className="text-xs text-slate-100 mt-1 line-clamp-2">{description}</div> : null}
        </div>
      </div>
    </div>
  );
};

/* ---------- Icons ---------- */
function IconGrid({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
    </svg>
  );
}
function IconList({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? "text-blue-600" : "text-slate-500"}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="10.5" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="16" width="16" height="3" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Main Gallery Section ---------- */
const GallerySection: React.FC = () => {
  const { data = [], isLoading } = useGallery();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [mobileLayout, setMobileLayout] = useState<"list" | "grid">("list");

  // Carousel slides - prefer post.date (server-provided) for ordering/deduping
  const slides = useMemo(() => {
    // sort by date desc (use date if present, fallback to createdAt)
    const sorted = [...data].sort((a, b) => {
      const da = new Date(a.date || a.createdAt).getTime();
      const db = new Date(b.date || b.createdAt).getTime();
      return db - da;
    });
    const out: { image: string; title?: string; category?: string }[] = [];
    const seen = new Set<string>();
    for (const post of sorted) {
      if (!post.images?.length) continue;
      const img = post.images[0];
      if (seen.has(img)) continue;
      out.push({ image: img, title: post.title, category: post.category });
      seen.add(img);
      if (out.length >= 6) break;
    }
    return out;
  }, [data]);

  // Flatten data (each image → card)
  const flattened = useMemo(
    () =>
      data.flatMap((post) =>
        (post.images || []).map((img) => ({
          ...post,
          image: img,
        }))
      ),
    [data]
  );

  // Extract years dynamically from post.date (fallback to createdAt)
  const years = useMemo(() => {
    const yearSet = new Set<number>();
    data.forEach((item) => {
      const d = item.date || item.createdAt;
      const parsed = new Date(d);
      if (!isNaN(parsed.getTime())) yearSet.add(parsed.getFullYear());
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [data]);

  // Months list
  const MONTHS = [
    { label: "All Months", value: "" },
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];

  // Filtering logic: use item.date if available, else createdAt
  const filtered = useMemo(() => {
    return flattened.filter((item) => {
      const dateVal = item.date || item.createdAt;
      const createdAt = new Date(dateVal);
      const matchCategory = !selectedCategory || item.category === selectedCategory;
      const matchYear = !selectedYear || createdAt.getFullYear().toString() === selectedYear;
      const matchMonth = !selectedMonth || createdAt.getMonth().toString() === selectedMonth;
      return matchCategory && matchYear && matchMonth;
    });
  }, [flattened, selectedCategory, selectedYear, selectedMonth]);

  const smallColsClass = mobileLayout === "list" ? "grid-cols-1" : "grid-cols-2";

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Carousel */}
        <Carousel slides={slides} />

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Gallery</h2>
          <p className="max-w-2xl mx-auto text-md md:text-lg text-slate-600 mt-3">
            Explore moments from our office activities, school and college events — thoughtfully captured and beautifully shared.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8 flex-wrap">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm bg-white"
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded-full px-4 py-2 text-sm bg-white"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>

          {/* Mobile layout toggle */}
          <div className="flex items-center gap-2 md:hidden mt-2">
            <button
              onClick={() => setMobileLayout("grid")}
              aria-pressed={mobileLayout === "grid"}
              aria-label="Grid view"
              className={`p-2 rounded ${mobileLayout === "grid" ? "bg-slate-100" : "bg-white"}`}
            >
              <IconGrid active={mobileLayout === "grid"} />
            </button>
            <button
              onClick={() => setMobileLayout("list")}
              aria-pressed={mobileLayout === "list"}
              aria-label="List view"
              className={`p-2 rounded ${mobileLayout === "list" ? "bg-slate-100" : "bg-white"}`}
            >
              <IconList active={mobileLayout === "list"} />
            </button>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory("");
              setSelectedMonth("");
              setSelectedYear("");
            }}
            className="text-sm text-blue-600 underline ml-2"
          >
            Clear Filters
          </button>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-16 text-center text-slate-500">Loading photos…</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-slate-500">No photos found for this filter.</div>
        ) : (
          <div className={`grid ${smallColsClass} sm:grid-cols-3 md:grid-cols-4 gap-4`} aria-live="polite">
            {filtered.map((item, idx) => (
              <div key={`${item._id}-${idx}`} className="group">
                <Card image={item.image} title={item.title} description={item.description} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;