import React, { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { CalendarIcon, Search, TagIcon, User } from "lucide-react";
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

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  // Format date
  const formattedDate = format(new Date(post.publishDate), "MMM d, yyyy");
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {post.image && (
        <div className="h-48 overflow-hidden">
          <img 
            // src={`/api${post.image}`}
            src={`${post.image}`}
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-1" />
          <span>{post.author}</span>
        </div>
        <CardTitle className="text-xl font-bold hover:text-blue-800 transition-colors">
          <Link href={`blog/${post.slug}`}>
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-gray-600">{post.summary}</p>
      </CardContent>
      <CardFooter className="pt-0 flex flex-wrap gap-2">
        {post.tags && post.tags.map(tag => (
          <Badge key={tag} variant="outline" className="text-xs bg-blue-50">
            <TagIcon className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
};



const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Fetch blog posts
  const { data: posts = [], isLoading } = useQuery({ 
    queryKey: ['/api/cms/blog'],
    queryFn: getQueryFn({ on401: "returnNull" })
  });
  

  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(
      (posts as BlogPost[]).flatMap(post => post.tags || [])
    )
  );
  
  // Filter posts based on search query, active tag, and category
  const filteredPosts = (posts as BlogPost[]).filter((post: BlogPost) => {
    // Only show published posts
    if (!post.published) return false;
    
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tag
    const matchesTag = activeTag === null || (post.tags && post.tags.includes(activeTag));
    
    return matchesSearch && matchesTag;
  });
  
  // Content to show when no posts match the filters
  const noPostsContent = (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2">No posts found</h3>
      <p className="text-gray-600 mb-4">
        Try adjusting your search criteria or check back later for new content.
      </p>
      <Button onClick={() => {
        setSearchQuery("");
        setActiveTag(null);
        setActiveCategory("all");
      }}>
        Clear filters
      </Button>
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
        title="Blog - Latest News and Insights"
        description="Read the latest news, insights and technological developments from Tarcin Robotic."
      />
      
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
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#wave-lines)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes waveMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100px);
          }
        }
        .animate-wave svg {
          animation: waveMove 5s linear infinite;
        }
      `}</style>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            Blog
          </motion.h1>
          <motion.p
            className="text-base md:text-xl text-white/90 mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            custom={1}
          >
            Explore our latest articles, insights, and updates on robotics, AI, IoT solutions, 
            and more from our team of experts.
          </motion.p>
        </div>
      </div>
    </section>
      
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with search and filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Search posts..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={activeTag === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveTag(null)}
                  >
                    All
                  </Badge>
                  {allTags.map(tag => (
                    <Badge 
                      key={tag} 
                      variant={activeTag === tag ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog posts */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <Card key={i} className="h-[300px] animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post: BlogPost) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              noPostsContent
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;