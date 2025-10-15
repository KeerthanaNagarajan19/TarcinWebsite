import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import GalleryForm from "./GalleryForm";
import DocumentHead from "../../../components/DocumentHead";

interface GalleryPost {
  _id: string;
  id: string;
  title: string;
  description?: string;
  category?: string;
  images: string[];
  date?: string;
  createdAt: string;
}

export default function AdminGalleryList() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<GalleryPost | null>(null);

  // ✅ Fetch gallery data
  const { data: gallery = [], isLoading } = useQuery<GalleryPost[]>({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const data = await res.json();

      // ✅ Ensure consistent shape
      return Array.isArray(data)
        ? data.map((g: any) => ({
            ...g,
            id: g._id,
            images: Array.isArray(g.images) ? g.images : [],
          }))
        : [];
    },
  });

  // ✅ Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete gallery");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/gallery"]);
      toast({ title: "Gallery deleted", description: "Deleted successfully." });
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  // ✅ Columns
  const columns: DataColumn[] = [
    {
      key: "images",
      title: "Image",
      width: "100px",
      formatFn: (imgs: string[]) =>
        Array.isArray(imgs) && imgs.length > 0 ? (
          <img
            src={imgs[0]}
            alt="thumb"
            className="w-16 h-12 rounded object-cover border"
          />
        ) : (
          <div className="text-muted-foreground text-sm">No image</div>
        ),
    },
    {
      key: "title",
      title: "Title",
      type: "longText",
    },
    {
      key: "category",
      title: "Category",
      width: "120px",
      formatFn: (val) => val || <span className="text-gray-400">—</span>,
    },
    {
      key: "date",
      title: "Date",
      width: "130px",
      formatFn: (d?: string) =>
        d ? new Date(d).toLocaleDateString() : <span className="text-gray-400">—</span>,
    },
    {
      key: "createdAt",
      title: "Created",
      width: "130px",
      formatFn: (d: string) => new Date(d).toLocaleDateString(),
    },
  ];

  const handleDelete = (item: GalleryPost) => {
    const id = item.id || item._id;
    if (!id) {
      toast({ title: "Error", description: "Missing ID", variant: "destructive" });
      return;
    }
    if (confirm("Delete this gallery post?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (g: GalleryPost) => {
    setCurrentGallery(g);
    setFormOpen(true);
  };

  const handleNew = () => {
    setCurrentGallery(null);
    setFormOpen(true);
  };

  return (
    <>
      <DocumentHead title="Manage Gallery" description="Admin gallery management" />
      <AdminLayout title="Gallery">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Manage Gallery</h1>
            <p className="text-muted-foreground">
              Create, edit, or delete gallery posts.
            </p>
          </div>
          <Button onClick={handleNew}>
            <Plus className="mr-2" /> New Post
          </Button>
        </div>

        <DataTable
          data={gallery}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {formOpen && (
          <GalleryForm
            gallery={currentGallery}
            isOpen={formOpen}
            onClose={() => {
              setFormOpen(false);
              setCurrentGallery(null);
            }}
          />
        )}
      </AdminLayout>
    </>
  );
}
