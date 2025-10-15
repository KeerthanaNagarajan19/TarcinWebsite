// import React, { useState } from "react";
// import AdminLayout from "../../../components/admin/AdminLayout";
// import { Button } from "../../../components/ui/button";
// import { DataTable, DataColumn } from "../../../components/admin/DataTable";
// import { Plus } from "lucide-react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useToast } from "../../../hooks/use-toast";
// import GalleryForm from "./GalleryForm";
// import DocumentHead from "../../../components/DocumentHead";

// interface GalleryPost {
//   _id: string;
//   title: string;
//   description?: string;
//   category?: string;
//   images: string[];
//   date?: string;
//   createdAt: string;
// }

// export default function GalleryManagement() {
//   const { toast } = useToast();
//   const [formOpen, setFormOpen] = useState(false);
//   const [currentGallery, setCurrentGallery] = useState<GalleryPost | null>(null);
//   const queryClient = useQueryClient();

//   // ✅ FETCH GALLERY LIST
//   const { data: gallery = [], isLoading, isError } = useQuery<GalleryPost[]>({
//     queryKey: ["/api/gallery"],
//     queryFn: async () => {
//       const res = await fetch("/api/gallery");
//       if (!res.ok) throw new Error("Failed to fetch gallery");
//       const json = await res.json();
//       const items = json?.data || [];
//       return items.map((g: any) => ({
//         ...g,
//         id: g._id,
//         images: Array.isArray(g.images) ? g.images : [],
//       }));
//     },
//     staleTime: 1000 * 60 * 2,
//   });

//   // ✅ DELETE GALLERY ITEM
//   const deleteMutation = useMutation({
//     mutationFn: async (id: string) => {
//       const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete gallery");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["/api/gallery"]);
//       toast({ title: "Deleted", description: "Gallery post deleted successfully." });
//     },
//     onError: (err: any) => {
//       toast({ title: "Error", description: err.message, variant: "destructive" });
//     },
//   });

//   // ✅ TABLE COLUMNS
//   const columns: DataColumn[] = [
//     {
//       key: "images",
//       title: "Image",
//       width: "90px",
//       formatFn: (imgs: string[]) =>
//         Array.isArray(imgs) && imgs.length > 0 ? (
//           <img
//             src={imgs[0]}
//             alt="thumb"
//             className="w-16 h-12 object-cover rounded border"
//           />
//         ) : (
//           <div className="text-gray-400 text-sm italic">No image</div>
//         ),
//     },
//     { key: "title", title: "Title", type: "longText" },
//     { key: "category", title: "Category", width: "100px" },
//     {
//       key: "date",
//       title: "Date",
//       width: "120px",
//       formatFn: (d?: string) =>
//         d ? new Date(d).toLocaleDateString() : <span className="text-gray-400">—</span>,
//     },
//     {
//       key: "createdAt",
//       title: "Created",
//       width: "120px",
//       formatFn: (d: string) => new Date(d).toLocaleDateString(),
//     },
//   ];

//   // ✅ DELETE HANDLER
//   const handleDelete = (item: GalleryPost) => {
//     const id = item._id;
//     if (!id) return toast({ title: "Error", description: "Missing ID", variant: "destructive" });
//     if (confirm(`Delete gallery "${item.title}"?`)) deleteMutation.mutate(id);
//   };

//   return (
//     <>
//       <DocumentHead title="Manage Gallery" description="Admin gallery management" />
//       <AdminLayout title="Gallery">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-xl font-semibold">Manage Gallery</h1>
//             <p className="text-muted-foreground">
//               Create, edit, or delete gallery posts.
//             </p>
//           </div>
//           <Button
//             onClick={() => {
//               setCurrentGallery(null);
//               setFormOpen(true);
//             }}
//           >
//             <Plus className="mr-2" /> New Post
//           </Button>
//         </div>

//         {/* ✅ Show loading or error */}
//         {isLoading ? (
//           <div className="text-center py-20 text-gray-500">Loading gallery…</div>
//         ) : isError ? (
//           <div className="text-center py-20 text-red-500">
//             Failed to load gallery list.
//           </div>
//         ) : (
//           <DataTable
//             data={gallery}
//             columns={columns}
//             onEdit={(g) => {
//               setCurrentGallery(g);
//               setFormOpen(true);
//             }}
//             onDelete={handleDelete}
//             isLoading={isLoading}
//           />
//         )}

//         {/* ✅ Modal for Create/Edit */}
//         {formOpen && (
//           <GalleryForm
//             gallery={currentGallery}
//             isOpen={formOpen}
//             onClose={() => {
//               setFormOpen(false);
//               setCurrentGallery(null);
//             }}
//           />
//         )}
//       </AdminLayout>
//     </>
//   );
// }




import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast";
import GalleryForm from "./GalleryForm";
import DocumentHead from "../../../components/DocumentHead";

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
        images: Array.isArray(g.images) ? g.images : [],
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
      queryClient.invalidateQueries(["/api/gallery"]);
      toast({ title: "Deleted", description: "Gallery post deleted successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  // ✅ HANDLE DELETE
  const handleDelete = (item: GalleryPost) => {
    const id = item._id;
    if (!id) return toast({ title: "Error", description: "Missing ID", variant: "destructive" });
    if (confirm(`Delete gallery "${item.title}"?`)) deleteMutation.mutate(id);
  };

  // ✅ HANDLE SAVE (CREATE/EDIT)
  const handleSave = (updatedGallery: GalleryPost, isEdit: boolean) => {
    queryClient.setQueryData<GalleryPost[]>(["/api/gallery"], (old = []) => {
      if (isEdit) {
        // Replace the existing gallery with the updated one
        return old.map((g) => (g._id === updatedGallery._id ? updatedGallery : g));
      } else {
        // Add new gallery at the top
        return [updatedGallery, ...old];
      }
    });
    toast({ title: "Success", description: "Gallery post saved successfully." });
    setFormOpen(false);
    setCurrentGallery(null);
  };

  // ✅ TABLE COLUMNS
  const columns: DataColumn[] = [
    {
      key: "images",
      title: "Image",
      width: "90px",
      formatFn: (imgs: string[]) =>
        Array.isArray(imgs) && imgs.length > 0 ? (
          <img
            src={imgs[0]}
            alt="thumb"
            className="w-16 h-12 object-cover rounded border"
          />
        ) : (
          <div className="text-gray-400 text-sm italic">No image</div>
        ),
    },
    { key: "title", title: "Title", type: "longText" },
    { key: "category", title: "Category", width: "100px" },
    {
      key: "date",
      title: "Date",
      width: "120px",
      formatFn: (d?: string) =>
        d ? new Date(d).toLocaleDateString() : <span className="text-gray-400">—</span>,
    },
    {
      key: "createdAt",
      title: "Created",
      width: "120px",
      formatFn: (d: string) => new Date(d).toLocaleDateString(),
    },
  ];

  return (
    <>
      <DocumentHead title="Manage Gallery" description="Admin gallery management" />
      <AdminLayout title="Gallery">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">Manage Gallery</h1>
            <p className="text-muted-foreground">
              Create, edit, or delete gallery posts.
            </p>
          </div>
          <Button
            onClick={() => {
              setCurrentGallery(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2" /> New Post
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">Loading gallery…</div>
        ) : isError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load gallery list.
          </div>
        ) : (
          <DataTable
            data={gallery}
            columns={columns}
            onEdit={(g) => {
              setCurrentGallery(g);
              setFormOpen(true);
            }}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        )}

        {formOpen && (
          <GalleryForm
            gallery={currentGallery}
            isOpen={formOpen}
            onClose={() => {
              setFormOpen(false);
              setCurrentGallery(null);
            }}
            onSave={handleSave} // Pass the save handler to replace item
          />
        )}
      </AdminLayout>
    </>
  );
}
