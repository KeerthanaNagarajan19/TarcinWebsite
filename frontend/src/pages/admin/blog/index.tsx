import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import BlogForm from "./BlogForm";
import { format } from "date-fns";
import { Badge } from "../../../components/ui/badge";
import DocumentHead from "../../../components/DocumentHead";
import AdminBlogList from "../blog/AdminBlogList";

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

export default function BlogManagement() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogPost | null>(null);
  
  // Fetch blog posts
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/cms/blog'],
    // queryFn: getQueryFn({ on401: "throw" }),
    queryFn: async () => {
    const res = await fetch("/api/cms/blog");
    return await res.json();
  }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    

    mutationFn: async (id: string) => {
      await apiRequest(`/api/cms/blog/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/blog'] });
      toast({
        title: "Blog post deleted",
        description: "The blog post has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete blog post: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const columns: DataColumn[] = [
    { key: "title", title: "Title", type: "longText" },
    { key: "author", title: "Author", width: "120px" },
    { 
      key: "publishDate", 
      title: "Date", 
      type: "date",
      width: "120px",
    },
    { 
      key: "published", 
      title: "Status", 
      type: "boolean",
      width: "100px",
      formatFn: (value) => value ? 
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge> : 
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Draft</Badge>
    },
    { 
      key: "tags", 
      title: "Tags", 
      type: "tags",
    },
  ];

  const handleCreate = () => {
    setCurrentBlog(null);
    setFormOpen(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setCurrentBlog(blog);
    setFormOpen(true);
  };

  const handleDelete = (blog: BlogPost) => {
    deleteMutation.mutate(blog.id);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCurrentBlog(null);
  };

  return (
    <>
      <DocumentHead
        title="Blog Management - Tarcin Robotic Admin"
        description="Manage blog posts for the Tarcin Robotic website."
      />
      
      <AdminLayout title="Blog Posts">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Manage Blog Posts</h1>
            <p className="text-muted-foreground">
              Create, edit, and delete blog posts for the website.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Blog Post
          </Button>
        </div>

        {/* <DataTable
          data={blogPosts}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        /> */}

        <AdminBlogList />

        {formOpen && (
          <BlogForm
            blog={currentBlog}
            isOpen={formOpen}
            onClose={handleFormClose}
          />
        )}
      </AdminLayout>
    </>
  );
}