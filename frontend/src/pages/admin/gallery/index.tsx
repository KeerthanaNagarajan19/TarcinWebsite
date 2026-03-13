import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast";
import GalleryForm from "./GalleryForm";
import DocumentHead from "../../../components/DocumentHead";
import { Card, CardContent } from "../../../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

interface GalleryPost {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  images: string[];
  date?: string;
  createdAt: string;
}

export default function GalleryManagement() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<GalleryPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // ✅ FETCH GALLERY LIST
  const { data: gallery = [], isLoading, isError } = useQuery<GalleryPost[]>({
    queryKey: ["/api/gallery"],
    queryFn: async () => {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to fetch gallery");
      const json = await res.json();
      const items = json?.data || [];
      return items.map((g: any) => ({
        ...g,
        id: g._id,
        images: Array.isArray(g.images) ? g.images.map((img: string) =>
          img.startsWith('http') ? img : `${window.location.protocol}//${window.location.host}/api${img}`
        ) : [],
      }));
    },
    staleTime: 1000 * 60 * 2,
  });

  // ✅ DELETE GALLERY ITEM
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete gallery");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gallery"] });
      toast({ title: "Deleted", description: "Gallery post deleted successfully." });
      setDeleteId(null);
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleDelete = () => {
    if (deleteId) deleteMutation.mutate(deleteId);
  };

  return (
    <>
      <DocumentHead title="Gallery - Admin Dashboard" description="Manage your site gallery" />
      <AdminLayout title="Gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Gallery</h1>
              <p className="mt-1 text-lg text-gray-500">Manage Gallery</p>
            </div>
            <Button
              onClick={() => {
                setCurrentGallery(null);
                setFormOpen(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Post
            </Button>
          </div>

          {/* Main Content Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px] relative overflow-hidden">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-lg font-medium">Loading gallery...</p>
              </div>
            ) : isError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-6 text-center">
                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl font-semibold">Failed to load gallery list</p>
                <Button variant="outline" className="mt-4" onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/gallery"] })}>
                  Try Again
                </Button>
              </div>
            ) : gallery.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-20 h-20 mb-4 opacity-10" />
                <p className="text-xl font-medium">No images found in gallery</p>
                <p className="mt-2 text-gray-400">Click "New Post" to add your first image.</p>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {gallery.map((item) => (
                    <Card key={item._id} className="group relative overflow-hidden rounded-xl border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gray-50">
                      <CardContent className="p-0 aspect-square relative overflow-hidden">
                        {item.images?.[0] ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ImageIcon className="w-12 h-12 text-gray-400" />
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-white/20 hover:bg-blue-600 text-white border-none backdrop-blur-sm transition-all duration-200 scale-90 group-hover:scale-100"
                            onClick={() => {
                              setCurrentGallery(item);
                              setFormOpen(true);
                            }}
                          >
                            <Edit2 className="w-5 h-5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-white/20 hover:bg-red-600 text-white border-none backdrop-blur-sm transition-all duration-200 scale-90 group-hover:scale-100"
                            onClick={() => setDeleteId(item._id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        {/* Image Info Overlay (Optional but nice for Corporate style) */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-white font-semibold truncate leading-tight">{item.title}</p>
                          {item.category && <p className="text-gray-300 text-xs mt-1 uppercase tracking-wider">{item.category}</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Modal for Create/Edit */}
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

        {/* ✅ Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold">Delete Gallery Post?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-500 mt-2">
                This action cannot be undone. This will permanently delete the image from your gallery server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 gap-2">
              <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-6"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
}
