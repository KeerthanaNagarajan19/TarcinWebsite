import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
// import { toast } from "../components/ui/use-toast";
import { useToast } from "../../../hooks/use-toast";
import BlogForm from "./BlogForm"; // your BlogForm
import { DataTable, DataColumn } from "../../../components/admin/DataTable"; // the component you provided

export default function AdminBlogList() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

   const { toast } = useToast(); // ✅ initialize toast

  // ✅ Fetch blogs
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["/api/cms/blog"],
   
    queryFn: async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch("/api/cms/blog", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const blogs = await res.json();
  
  return blogs.map((blog: any) => ({
    ...blog,
    id: blog._id, // ✅ fix: create `id` from `_id`
  }));
},

  });

  // ✅ Delete blog post
  const deleteMutation = useMutation({
    mutationFn: async (blog: any) => {
       const blogId = blog?.id;
  if (!blogId) throw new Error("Blog ID is missing");
      console.log("Deleting blog with id:", blog.id); // ✅ Add this

      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/cms/blog/${blog.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete blog");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/blog"] });
      toast({ title: "Deleted", description: "Blog deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
    },
  });

  

  // Define table columns
  const columns: DataColumn[] = [
    { key: "title", title: "Title", type: "text" },
    { key: "summary", title: "Summary", type: "longText" },
    { key: "author", title: "Author" },
    { key: "published", title: "Published", type: "boolean" },
    { key: "publishDate", title: "Published On", type: "date" },
    { key: "tags", title: "Tags", type: "tags" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
        <button
          onClick={() => {
            setSelectedBlog(null);
            setFormOpen(true);
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          + New Post
        </button>
      </div>

      <DataTable
        data={blogs}
        columns={columns}
        onEdit={(item) => {
          setSelectedBlog(item);
          setFormOpen(true);
        }}
        // onDelete={(item) =>  {
        //   console.log("Delete item:", item);
        //   deleteMutation.mutate(item)}
        // }
        onDelete={(item) => {
  if (!item.id) {
    toast({ title: "Error", description: "Missing blog ID", variant: "destructive" });
    return;
  }
  deleteMutation.mutate(item);
}}

      />

      {formOpen && (
        <BlogForm
          blog={selectedBlog}
          isOpen={formOpen}
          onClose={() => {
            setFormOpen(false);
            setSelectedBlog(null);
          }}
        />
      )}
    </div>
  );
}
