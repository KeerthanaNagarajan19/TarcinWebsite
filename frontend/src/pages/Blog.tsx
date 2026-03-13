import React, { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";
import { CalendarIcon, Search, Tag, ArrowRight } from "lucide-react";
import DocumentHead from "../components/shared/DocumentHead";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  image?: string;
  tags?: string[];
  published: boolean;
}

// ─── Fallback gradient when image is missing ───────────────────────────────
const FALLBACK_COLORS = [
  "from-blue-500 to-indigo-700",
  "from-indigo-500 to-purple-700",
  "from-sky-500 to-blue-700",
  "from-violet-500 to-indigo-700",
  "from-blue-600 to-cyan-600",
];
const fallbackGradient = (index: number) =>
  FALLBACK_COLORS[index % FALLBACK_COLORS.length];

// ─── Author initial avatar ──────────────────────────────────────────────────
const AuthorAvatar: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="flex items-center">
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-[10px] font-bold mr-2 bg-gradient-to-br ${fallbackGradient(name?.length || 0)}`}>
        {name?.charAt(0)?.toUpperCase() || "A"}
      </span>
      <span className="text-black font-bold text-[11px] uppercase tracking-[0.2em]">{name}</span>
    </div>
  );
};

// ─── Refined Blog Card ──────────────────────────────────────────────────────
const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const [imageError, setImageError] = React.useState(false);

  const formattedDate = (() => {
    try { return format(new Date(post.publishDate), "MMM d, yyyy"); }
    catch { return ""; }
  })();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full"
    >
      {/* Image Section */}
      <div className="h-56 relative overflow-hidden bg-gray-50">
        {post.image && !imageError ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${fallbackGradient(index)} flex items-center justify-center`}>
            <span className="text-white/20 text-7xl font-black">{post.title?.charAt(0)}</span>
          </div>
        )}
        {/* Top-Right Category Badge */}
        {post.tags && post.tags[0] && (
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-black text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg border border-white/50">
            {post.tags[0]}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-1">
        {/* Meta: Date & Author */}
        <div className="flex items-center text-[11px] text-slate-400 mb-5 gap-6">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-500">
            <CalendarIcon className="h-3.5 w-3.5 text-blue-500" />
            {formattedDate}
          </span>
          <AuthorAvatar name={post.author} />
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-heading font-black text-black text-2xl leading-tight mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer tracking-tight">
            {post.title}
          </h3>
        </Link>

        {/* Summary Container */}
        <div className="flex-1 overflow-hidden mb-8">
          <div
            className="text-slate-500 text-sm md:text-base font-medium leading-relaxed line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.summary || "" }}
          />
        </div>

        {/* Bottom Action Area */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <div className="flex flex-wrap gap-2">
            {(post.tags || []).slice(0, 2).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/blog/${post.slug}`}>
            <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600 hover:text-blue-800 flex items-center gap-2 group/read transition-all">
              Read <ArrowRight className="w-4 h-4 group-hover/read:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

// ─── Skeleton Loaders ───────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-56 bg-gray-100" />
    <div className="p-7 space-y-4">
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-6 bg-gray-100 rounded w-full" />
      <div className="h-4 bg-gray-100 rounded w-3/4" />
    </div>
  </div>
);

// ─── Main Blog Page ─────────────────────────────────────────────────────────
const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/cms/blog"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const publishedPosts = (posts as BlogPost[]).filter((p) => p.published !== false);

  const allTags = Array.from(
    new Set(publishedPosts.flatMap((p) => p.tags || []))
  );

  const filteredPosts = publishedPosts.filter((post) => {
    const title = post.title || "";
    const summary = post.summary || "";
    const matchesSearch =
      searchQuery === "" ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === null || (post.tags && post.tags.includes(activeTag));
    return matchesSearch && matchesTag;
  });

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: custom * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <>
      <DocumentHead
        title="Blog – Latest News and Insights | Tarcin Robotics"
        description="Read the latest articles, insights and updates on robotics, AI and IoT from Tarcin Robotics."
      />

      {/* ── Hero ── */}
      <section
        className="mt-20 pt-32 pb-16 md:pt-40 md:pb-24 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight"
              initial="hidden" animate="visible" variants={fadeUpVariants}
            >
              Blog & Insights
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
              initial="hidden" animate="visible" variants={fadeUpVariants} custom={1}
            >
              Explore our latest innovations, research breakthroughs, and strategic updates from the frontier of robotics.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

            {/* ── Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">

                {/* Search Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Article title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all font-medium text-slate-600"
                    />
                  </div>
                </div>

                {/* Total Articles Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 relative overflow-hidden group">
                  <div className="relative z-10">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Total Articles</p>
                    <p className="text-5xl font-black text-black mb-2 tracking-tighter">{publishedPosts.length}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Published & Live</p>
                    </div>
                  </div>
                </div>

                {/* Filter by Tag Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Filter by Tag</h3>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => setActiveTag(null)}
                      className={`text-[10px] font-bold px-4 py-2 rounded-full border transition-all uppercase tracking-widest ${activeTag === null
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                        : "bg-slate-50 text-slate-500 border-slate-100 hover:border-blue-400 hover:text-blue-600"
                        }`}
                    >
                      All
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                        className={`text-[10px] font-bold px-5 py-2.5 rounded-full border transition-all uppercase tracking-[0.2em] transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${activeTag === tag
                          ? "bg-black text-white border-black shadow-black/10"
                          : "bg-slate-50 text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600"
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Blog Cards Grid ── */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-white rounded-[40px] p-20 text-center shadow-sm border border-gray-100">
                  <div className="text-6xl mb-6 opacity-20">📭</div>
                  <h3 className="text-2xl font-heading font-black text-black mb-2 tracking-tight">No articles found</h3>
                  <p className="text-slate-500 mb-8 font-medium">Try a different search or clear the filters.</p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveTag(null); }}
                    className="bg-black hover:bg-slate-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] px-10 py-5 rounded-2xl transition-all shadow-xl shadow-black/20 hover:-translate-y-1"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 content-start">
                  {filteredPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;