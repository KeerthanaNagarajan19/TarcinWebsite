import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";
import {
  Briefcase, Calendar, MapPin, Search,
  ChevronRight, Rocket, TrendingUp, Globe,
  ArrowRight, CheckCircle, Users
} from "lucide-react";
import DocumentHead from "../components/shared/DocumentHead";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  applicationLink?: string;
  postedDate: string;
  category?: string;
}

// ─── Why Join Us data ────────────────────────────────────────────────────────
const WHY_JOIN = [
  {
    icon: Rocket,
    title: "Innovation First",
    desc: "Work on cutting-edge robotics, AI, and IoT technologies that are genuinely shaping industries and transforming lives.",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: TrendingUp,
    title: "Real Growth",
    desc: "Continuous learning, mentorship, and career advancement opportunities designed to help you reach your full potential.",
    color: "from-indigo-500 to-purple-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: Globe,
    title: "Meaningful Impact",
    desc: "Build solutions that make a real difference — from schools across Tamil Nadu to industry automation systems.",
    color: "from-sky-500 to-blue-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
];

// ─── Career Card ─────────────────────────────────────────────────────────────
const CareerCard: React.FC<{ career: Career; index: number }> = ({ career, index }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedDate = (() => {
    try { return format(parseISO(career.postedDate), "MMM d, yyyy"); }
    catch { return ""; }
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${career.isActive ? "border-gray-100" : "border-gray-100 opacity-75"
        }`}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Left: icon + title */}
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${career.isActive
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-400"
              }`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-black text-xl leading-tight mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                {career.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> {career.location}
                </span>
                <span className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" /> {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            {career.department && (
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                {career.department}
              </span>
            )}
            <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] flex items-center gap-2 ${career.isActive
              ? "bg-green-50 text-green-600 border border-green-100"
              : "bg-slate-50 text-slate-400 border border-slate-100"
              }`}>
              {career.isActive && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
              {career.isActive ? "Active Now" : "Closed"}
            </span>
          </div>
        </div>

        {/* Description preview */}
        <p className={`text-slate-500 text-sm md:text-base font-medium leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
          {career.description}
        </p>

        {/* Expandable requirements */}
        <AnimatePresence>
          {expanded && career.requirements?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <h4 className="text-sm font-bold text-gray-700 mb-3">Requirements</h4>
              <ul className="space-y-2">
                {career.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-all uppercase tracking-[0.2em]"
        >
          {expanded ? "Hide Details" : "View Opportunities"}
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
        </button>

        {career.isActive ? (
          career.applicationLink ? (
            <a
              href={career.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#001D4D] hover:bg-blue-800 text-white text-[11px] font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/10 uppercase tracking-[0.2em]"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-6 py-2.5 rounded-xl uppercase tracking-wider">
              Upcoming
            </span>
          )
        ) : (
          <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-6 py-2.5 rounded-xl uppercase tracking-wider">
            Closed
          </span>
        )}
      </div>
    </motion.div>
  );
};

// ─── Skeleton ────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
    <div className="flex gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-4/5" />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Careers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState<"internship" | "job">("internship");

  const { data: careers = [], isLoading } = useQuery({
    queryKey: ["/api/cms/careers"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const jobCareers = (careers as Career[]).filter((c) => c.category === "job");
  const internshipCareers = (careers as Career[]).filter((c) => c.category === "internship");
  const selectedCareers = activeTab === "job" ? jobCareers : internshipCareers;

  // Split comma-separated values (e.g. "CSE,IT" → ["CSE", "IT"])
  const departments = [
    "all",
    ...Array.from(
      new Set(
        selectedCareers
          .flatMap((c) => (c.department || "").split(",").map((d) => d.trim()))
          .filter(Boolean)
      )
    ),
  ];
  const locations = [
    "all",
    ...Array.from(
      new Set(
        selectedCareers
          .flatMap((c) => (c.location || "").split(",").map((l) => l.trim()))
          .filter(Boolean)
      )
    ),
  ];

  const filteredCareers = selectedCareers
    .filter((c) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      const matchDept = departmentFilter === "all" || c.department === departmentFilter;
      const matchLoc = locationFilter === "all" || c.location === locationFilter;
      return matchSearch && matchDept && matchLoc;
    })
    .sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <DocumentHead
        title="Careers at Tarcin Robotics — Join Our Team"
        description="Join Tarcin Robotics. Explore internship and full-time opportunities in robotics, AI, IoT, and more."
      />

      {/* ── Hero ── */}
      <header>
        <section
          className="mt-20 pt-32 pb-20 md:pt-40 md:pb-24 text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 50%, #2A38C0 100%)" }}
        >
          <div className="absolute inset-0 opacity-15 animate-wave">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="career-wave" width="120" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 0 25 Q 30 5, 60 25 T 120 25" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#career-wave)" />
            </svg>
          </div>
          <style>{`
            @keyframes waveMove { 0%{transform:translateX(0)} 100%{transform:translateX(-120px)} }
            .animate-wave svg { animation: waveMove 6s linear infinite; }
          `}</style>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight leading-tight"
              initial="hidden" animate="visible" variants={fadeUpVariants} custom={1}
            >
              Join Our Team
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed"
              initial="hidden" animate="visible" variants={fadeUpVariants} custom={2}
            >
              Be part of a passionate team building the future of robotics, AI, and IoT in Tamil Nadu.
            </motion.p>
            {/* Stats */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeUpVariants} custom={3}
              className="flex flex-wrap justify-center gap-6 mt-6"
            >
              {[
                {
                  label: "Open Roles",
                  count: jobCareers.filter(c => c.isActive).length,
                  icon: Briefcase
                },
                {
                  label: "Internships",
                  count: internshipCareers.filter(c => c.isActive).length,
                  icon: Users
                }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl px-10 py-6 text-center min-w-[180px] shadow-2xl relative group overflow-hidden transition-all hover:bg-white/15"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col items-center">
                    <stat.icon className="w-5 h-5 text-blue-200 mb-2 opacity-80" />
                    <p className="text-4xl md:text-6xl font-black text-white drop-shadow-sm leading-none tracking-tight">
                      {stat.count}
                    </p>
                    <p className="text-[11px] text-blue-100 font-bold uppercase tracking-[0.2em] mt-3">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </header>

      {/* ── Why Join Us ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-8 tracking-tight">Why Join Tarcin?</h2>
            <p className="text-slate-500 font-medium max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">More than a job — a chance to build something that actually matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {WHY_JOIN.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className={`bg-white rounded-2xl border ${item.border} p-8 shadow-sm hover:shadow-md transition-shadow group`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-black text-black mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Openings ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-black text-black mb-6 tracking-tight">Current Openings</h2>
            <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">All positions are 100% updated by our team in real time.</p>
          </div>

          {/* Tab + Search bar */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mb-8 flex flex-col gap-4">
            {/* Row 1: Tabs */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100 gap-1 w-full sm:w-auto self-start">
              {(["internship", "job"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setDepartmentFilter("all"); setLocationFilter("all"); }}
                  className={`px-8 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all flex-1 sm:flex-none ${activeTab === tab
                    ? "bg-[#001D4D] text-white shadow-xl shadow-blue-900/10"
                    : "text-slate-500 hover:text-blue-600"
                    }`}
                >
                  {tab === "internship"
                    ? `Internships (${internshipCareers.filter(c => c.isActive).length})`
                    : `Jobs (${jobCareers.filter(c => c.isActive).length})`}
                </button>
              ))}
            </div>

            {/* Row 2: Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl border border-slate-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition placeholder:text-slate-300 min-h-[48px]"
                />
              </div>

              {/* Dept filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full py-4 px-8 text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl border border-slate-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-black min-w-[200px] appearance-none cursor-pointer"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d === "all" ? "All Departments" : d}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>

              {/* Location filter */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full py-4 px-8 text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl border border-slate-100 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-black min-w-[200px] appearance-none cursor-pointer"
                >
                  {locations.map((l) => (
                    <option key={l} value={l}>{l === "all" ? "All Locations" : l}</option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Listing */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-16 text-center">
              <div className="text-6xl mb-4 font-bold text-gray-200">?</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No openings found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or check back soon for new opportunities.</p>
              <button
                onClick={() => { setSearchQuery(""); setDepartmentFilter("all"); setLocationFilter("all"); }}
                className="bg-[#001D4D] hover:bg-blue-800 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-xl transition-all shadow-xl shadow-blue-900/10"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCareers.map((career, i) => (
                <CareerCard key={career.id} career={career} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Join Our Mission CTA ── */}
      <section
        className="py-20 text-white text-center"
        style={{ background: "linear-gradient(135deg, #2B35AE 0%, #2D3DB4 60%, #1e2f9e 100%)" }}
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight">Join Our Mission</h2>
          <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            At Tarcin Robotics, we're always evolving. If you're passionate about innovation in robotics, IoT, or AI —
            we'd love to have you on board.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#001D4D] font-bold text-[11px] px-10 py-5 rounded-2xl hover:bg-blue-50 transition-all shadow-xl shadow-black/10 uppercase tracking-[0.2em]"
          >
            Get in Touch <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Careers;
