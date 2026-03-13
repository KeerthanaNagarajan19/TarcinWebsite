import React, { useState, useRef, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { CalendarIcon, ChevronLeft, TagIcon, User, Share2 } from "lucide-react";
import DocumentHead from "../components/shared/DocumentHead";
import { format } from "date-fns";

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

/* ---------- ShareMenu (mobile + desktop) ---------- */
type ShareMenuProps = {
  post?: BlogPost | undefined;
};

function ShareMenu({ post }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleWhatsApp = () => {
    const text = `${post?.title ? post.title + " - " : ""}${url}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(wa, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      setOpen(false);
    } catch (err) {
      // fallback
      const tmp = document.createElement("input");
      tmp.value = url;
      document.body.appendChild(tmp);
      tmp.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } finally {
        document.body.removeChild(tmp);
      }
      setOpen(false);
    }
  };

  const openNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || document.title,
          text: post?.title ? `${post.title}` : undefined,
          url,
        });
        return true;
      } catch (err) {
        // user cancelled or error — ignore
      }
    }
    return false;
  };

  const onClickShare = async () => {
    const usedNative = await openNativeShare();
    if (!usedNative) {
      setOpen((s) => !s);
    }
  };

  return (
    <div ref={ref} className="relative flex items-center">
      {/* visible on all sizes; native share will handle mobile automatically */}
      <button
        onClick={onClickShare}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Share post"
        className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-slate-100 transition"
        title="Share"
      >
        <Share2 className="w-5 h-5 text-slate-600" />
      </button>

      {/* Popover fallback (WhatsApp / Copy link) */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 transform origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          } transition-all duration-150`}
        role="menu"
        aria-hidden={!open}
      >
        <div className="p-2">
          <button
            onClick={handleWhatsApp}
            className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-2"
            role="menuitem"
          >
            <svg
              className="w-4 h-4 text-green-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M21 3s-2.1-1-5.4-1C12.5 2 7.6 5.2 6 11.1 4.3 17.9 8.6 22 12 23.4c1.3.5 3.1.3 4.8-.1 1.1-.3 2.3-1 3-2.2.2-.3.1-.8-.3-1-.8-.4-2.1-1-3.1-1.5-.9-.4-1.9-.1-2.6.6-.7.6-1.6 1.4-2.6 1-1.3-.5-3.9-2.8-4.6-7.9C3 6.9 7.5 4 11.9 3 16 2 21 3 21 3z" />
            </svg>
            WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="w-full text-left px-3 py-2 rounded hover:bg-slate-50 flex items-center gap-2"
            role="menuitem"
          >
            <svg
              className="w-4 h-4 text-slate-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="8" y="3" width="13" height="13" rx="2" />
              <path d="M3 12v7a2 2 0 0 0 2 2h11" />
            </svg>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main BlogPost Component ---------- */
const BlogPost: React.FC = () => {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/blog/:slug");

  if (!match) return null;

  const { slug } = params;

  const { data: post = undefined, isLoading, error } = useQuery<BlogPost | undefined>({
    queryKey: ["/api/cms/blog", slug],
    queryFn: async () => {
      if (!slug) return undefined;
      const res = await fetch(`/api/cms/blog/${slug}`);
      if (!res.ok) return undefined;
      return await res.json();
    },
  });

  const formattedDate = post?.publishDate ? format(new Date(post.publishDate), "MMMM d, yyyy") : "";

  if (error || (!post && !isLoading)) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find the requested blog post.</p>
        <Button onClick={() => navigate("/blog")}>
          <ChevronLeft className="mr-2" size={16} /> Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <>
      <DocumentHead
        title={post ? `${post.title} - Tarcin Robotic Blog` : "Blog Post"}
        description={post?.summary || "Read this insightful blog post from Tarcin Robotic."}
        image={post?.image}
        type="article"
      />

      {isLoading ? (
        <div className="container mx-auto px-6 py-16 max-w-5xl animate-pulse space-y-4">
          <div className="w-1/2 h-8 bg-gray-200 rounded" />
          <div className="w-1/3 h-4 bg-gray-200 rounded" />
          <div className="w-full h-72 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/4" />
          </div>
        </div>
      ) : post ? (
        <article className="container mx-auto px-6 py-16 max-w-5xl">
          {/* Back Button */}
          <div className="mb-10">
            <Button variant="ghost" className="text-blue-600 hover:underline" onClick={() => navigate("/blog")}>
              <ChevronLeft className="mr-2" size={16} /> Back to Blog
            </Button>
          </div>

          <header>
            {/* Featured Image */}
            {post.image && (
              <div className="flex justify-center mb-12">
                <div className="rounded-[32px] overflow-hidden shadow-xl border border-gray-100/50 bg-white">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="max-h-[600px] w-auto block object-contain transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              </div>
            )}

            {/* Post Meta */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
              <div
                className="text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.summary || "" }}
              />

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>

                {/* ShareMenu placed to the far right */}
                <div className="ml-auto">{post && <ShareMenu post={post} />}</div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-blue-100 text-blue-700 flex items-center gap-1 px-2 py-1 text-sm"
                    >
                      <TagIcon className="w-3 h-3" /> {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>

          <Separator className="my-10" />

          {/* Blog Content */}
          <div className="prose prose-blue prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
            {post.content && /<[^>]+>/.test(post.content) ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <div className="whitespace-pre-line">{post.content}</div>
            )}
          </div>

          <Separator className="my-12" />

          {/* Author Card */}
          <section aria-labelledby="author-info">
            <h2 id="author-info" className="sr-only">
              Author Information
            </h2>
            <Card className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm">
              <CardContent className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base">{post.author}</h3>
                  <p className="text-gray-600 text-sm">Expert at Tarcin Robotic passionate about tech and innovation.</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Back Button Bottom */}
          <div className="text-center mt-10">
            <Button onClick={() => navigate("/blog")}>
              <ChevronLeft className="mr-2" size={16} /> Back to Blog
            </Button>
          </div>
        </article>
      ) : null}
    </>
  );
};

export default BlogPost;



// import React from "react";
// import { Link, useRoute, useLocation } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent } from "../components/ui/card";
// import { Badge } from "../components/ui/badge";
// import { Button } from "../components/ui/button";
// import { Separator } from "../components/ui/separator";
// import { CalendarIcon, ChevronLeft, TagIcon, User } from "lucide-react";
// import DocumentHead from "../components/shared/DocumentHead";
// import { format } from "date-fns";

// interface BlogPost {
//   id: string;
//   title: string;
//   slug: string;
//   summary: string;
//   content: string;
//   author: string;
//   publishDate: string;
//   image?: string;
//   tags?: string[];
//   published: boolean;
// }

// const BlogPost: React.FC = () => {
//   const [, navigate] = useLocation();
//   const [match, params] = useRoute("/blog/:slug");

//   if (!match) return null;

//   const { slug } = params;

//   const { data: post = undefined, isLoading, error } = useQuery<BlogPost | undefined>({
//     queryKey: ["/api/cms/blog", slug],
//     queryFn: async () => {
//       if (!slug) return undefined;
//       const res = await fetch(`/api/cms/blog/${slug}`);
//       if (!res.ok) return undefined;
//       return await res.json();
//     },
//   });

//   const formattedDate = post?.publishDate
//     ? format(new Date(post.publishDate), "MMMM d, yyyy")
//     : "";

//   if (error || (!post && !isLoading)) {
//     return (
//       <div className="container mx-auto px-6 py-20 text-center">
//         <h1 className="text-3xl font-bold text-red-600 mb-4">Post Not Found</h1>
//         <p className="text-gray-600 mb-6">We couldn't find the requested blog post.</p>
//         <Button onClick={() => navigate("/blog")}>
//           <ChevronLeft className="mr-2" size={16} /> Back to Blog
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <DocumentHead
//         title={post ? `${post.title} - Tarcin Robotic Blog` : "Blog Post"}
//         description={post?.summary || "Read this insightful blog post from Tarcin Robotic."}
//         image={post?.image}
//         type="article"
//       />

//       {isLoading ? (
//         <div className="container mx-auto px-6 py-16 max-w-5xl animate-pulse space-y-4">
//           <div className="w-1/2 h-8 bg-gray-200 rounded" />
//           <div className="w-1/3 h-4 bg-gray-200 rounded" />
//           <div className="w-full h-72 bg-gray-200 rounded" />
//           <div className="space-y-2">
//             <div className="h-4 bg-gray-200 rounded w-full" />
//             <div className="h-4 bg-gray-200 rounded w-3/4" />
//             <div className="h-4 bg-gray-200 rounded w-2/4" />
//           </div>
//         </div>
//       ) : post ? (
//         <article className="container mx-auto px-6 py-16 max-w-5xl">
//           {/* Back Button */}
//           <div className="mb-10">
//             <Button
//               variant="ghost"
//               className="text-blue-600 hover:underline"
//               onClick={() => navigate("/blog")}
//             >
//               <ChevronLeft className="mr-2" size={16} /> Back to Blog
//             </Button>
//           </div>

//           <header>
//             {/* Featured Image */}
//             {post.image && (
//               <div className="rounded-3xl overflow-hidden shadow-md mb-10">
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
//                 />
//               </div>
//             )}

//             {/* Post Meta */}
//             <div className="space-y-6">
//               <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
//               <p className="text-lg text-gray-700 leading-relaxed">{post.summary}</p>

//               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
//                 <div className="flex items-center">
//                   <CalendarIcon className="w-4 h-4 mr-2" />
//                   {formattedDate}
//                 </div>
//                 <div className="flex items-center">
//                   <User className="w-4 h-4 mr-2" />
//                   {post.author}
//                 </div>
//               </div>

//               {post.tags?.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map((tag) => (
//                     <Badge
//                       key={tag}
//                       variant="outline"
//                       className="bg-blue-100 text-blue-700 flex items-center gap-1 px-2 py-1 text-sm"
//                     >
//                       <TagIcon className="w-3 h-3" /> {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </header>

//           <Separator className="my-10" />

//           {/* Blog Content */}
//           <div className="prose prose-blue prose-lg max-w-none prose-headings:text-blue-900 prose-a:text-blue-600">
//             {post.content && /<[^>]+>/.test(post.content) ? (
//               <div dangerouslySetInnerHTML={{ __html: post.content }} />
//             ) : (
//               <div className="whitespace-pre-line">{post.content}</div>
//             )}
//           </div>

//           <Separator className="my-12" />

//           {/* Author Card */}
//           <section aria-labelledby="author-info">
//             <h2 id="author-info" className="sr-only">Author Information</h2>
//             <Card className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm">
//               <CardContent className="flex items-start gap-4">
//                 <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-lg">
//                   {post.author.charAt(0).toUpperCase()}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-base">{post.author}</h3>
//                   <p className="text-gray-600 text-sm">
//                     Expert at Tarcin Robotic passionate about tech and innovation.
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </section>

//           {/* Back Button Bottom */}
//           <div className="text-center mt-10">
//             <Button onClick={() => navigate("/blog")}>
//               <ChevronLeft className="mr-2" size={16} /> Back to Blog
//             </Button>
//           </div>
//         </article>
//       ) : null}
//     </>
//   );
// };

// export default BlogPost;
