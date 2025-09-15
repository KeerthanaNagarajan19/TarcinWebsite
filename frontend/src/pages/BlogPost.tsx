// import React from "react";
// import { Link, useRoute, useLocation } from "wouter";
// import { useQuery } from "@tanstack/react-query";
// import { getQueryFn } from "../lib/queryClient";
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
  
//   if (!match) {
//     return null;
//   }
  
//   const { slug } = params;
  
//   // Fetch blog post by slug
//   const { data: post = undefined, isLoading, error } = useQuery<BlogPost | undefined>({
//     queryKey: ['/api/cms/blog', slug],
//     queryFn: async () => {
//       if (!slug) return undefined;
//       const res = await fetch(`/api/cms/blog/${slug}`);
//       if (!res.ok) return undefined;
//       return await res.json();
//     }
//   });
  
//   // Handle error state
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
//         <p className="mb-6">We couldn't load the requested blog post. It may not exist or there might be a temporary issue.</p>
//         <Button onClick={() => navigate("/blog")}>
//           <ChevronLeft className="mr-2" size={16} /> Back to Blog
//         </Button>
//       </div>
//     );
//   }
  
//   // Format date from ISO string
//   const formattedDate = post && post.publishDate 
//     ? format(new Date(post.publishDate), "MMMM d, yyyy") 
//     : "";
  
//   if (!post && !isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Post Not Found</h1>
//         <p className="mb-6">We couldn't find the requested blog post. It may not exist or there might be a temporary issue.</p>
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
//         description={post ? post.summary : "Read this insightful blog post from Tarcin Robotic."}
//         image={post ? post.image : undefined}
//         type="article"
//       />
      
//       {isLoading ? (
//         <div className="container mx-auto px-4 py-12 max-w-4xl">
//           <div className="w-24 h-4 bg-gray-200 rounded mb-6 animate-pulse" />
//           <div className="h-10 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
//           <div className="h-4 bg-gray-200 rounded w-1/4 mb-8 animate-pulse" />
//           <div className="h-64 bg-gray-200 rounded mb-8 animate-pulse" />
//           <div className="space-y-3">
//             <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
//             <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
//             <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
//           </div>
//         </div>
//       ) : post ? (
//         <>

// {post.image && (
//   <section className="relative w-full bg-white mt-4">
//     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-10 py-16">
      
//       {/* Left: Image */}
//       <div className="w-full h-[280px] md:h-[400px] overflow-hidden rounded-2xl shadow-xl">
//         <img
//           src={post.image}
//           alt={post.title}
//           className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//         />
//       </div>

//       {/* Right: Title + Summary */}
//       <div className="text-left space-y-6">
        
//         <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//           {post.title}
//         </h1>
//         <div
//           className="text-gray-600 text-base md:text-lg leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: post.summary }}
//         />
        
      
//       </div>
//     </div>
//   </section>
// )}


//           {/* Content */}
//           <div className="container mx-auto px-4 py-12 max-w-4xl">
//             {/* Back to blog button */}
//             <Button 
//               variant="outline" 
//               className="mb-6"
//               onClick={() => navigate("/blog")}
//             >
//               <ChevronLeft className="mr-2" size={16} /> Back to Blog
//             </Button>
//             {/* Title (only shown if no image) */}
//             {!post.image && (
//               <>
//                 <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//                 <p className="text-xl text-gray-600 mb-6">{post.summary}</p>
//               </>
//             )}
//             {/* Meta information */}
//             <div className="flex items-center text-gray-600 mb-8">
//               <div className="flex items-center">
//                 <CalendarIcon className="h-5 w-5 mr-2" />
//                 <span>{formattedDate}</span>
//               </div>
//               <span className="mx-3">|</span>
//               <div className="flex items-center">
//                 <User className="h-5 w-5 mr-2" />
//                 <span>{post.author}</span>
//               </div>
//             </div>
//             {/* Tags */}
//             {post.tags && post.tags.length > 0 && (
//               <div className="mb-8">
//                 <div className="flex flex-wrap gap-2">
//                   {post.tags.map(tag => (
//                     <Badge key={tag} variant="outline" className="bg-blue-50">
//                       <TagIcon className="h-3 w-3 mr-1" />
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <Separator className="mb-8" />
//             {/* Main content */}
//             {post.content && /<[^>]+>/.test(post.content) ? (
//               <div 
//                 className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-a:text-blue-600"
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />
//             ) : (
//               <div className="prose prose-lg max-w-none prose-blue prose-headings:text-blue-900 prose-a:text-blue-600 whitespace-pre-line">
//                 {post.content}
//               </div>
//             )}
//             <Separator className="my-8" />
//             {/* Author section */}
//             <Card className="bg-blue-50 border-blue-100 mb-8">
//               <CardContent className="py-6">
//                 <div className="flex items-start gap-4">
//                   <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-xl">
//                     {post.author ? post.author.charAt(0).toUpperCase() : "A"}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg">{post.author}</h3>
//                     <p className="text-gray-600">
//                       Expert at Tarcin Robotic with a passion for technology and innovation.
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//             {/* Navigation button */}
//             <div className="text-center mt-8">
//               <Button onClick={() => navigate("/blog")}> 
//                 <ChevronLeft className="mr-2" size={16} /> Back to Blog
//               </Button>
//             </div>
//           </div>
//         </>
//       ) : null}
//     </>
//   );
// };

// export default BlogPost;

import React from "react";
import { Link, useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { CalendarIcon, ChevronLeft, TagIcon, User } from "lucide-react";
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

  const formattedDate = post?.publishDate
    ? format(new Date(post.publishDate), "MMMM d, yyyy")
    : "";

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
            <Button
              variant="ghost"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/blog")}
            >
              <ChevronLeft className="mr-2" size={16} /> Back to Blog
            </Button>
          </div>

          <header>
            {/* Featured Image */}
            {post.image && (
              <div className="rounded-3xl overflow-hidden shadow-md mb-10">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            {/* Post Meta */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">{post.summary}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
              </div>

              {post.tags?.length > 0 && (
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
            <h2 id="author-info" className="sr-only">Author Information</h2>
            <Card className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm">
              <CardContent className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-semibold text-lg">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-base">{post.author}</h3>
                  <p className="text-gray-600 text-sm">
                    Expert at Tarcin Robotic passionate about tech and innovation.
                  </p>
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
