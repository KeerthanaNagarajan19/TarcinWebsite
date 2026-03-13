
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../../../hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../lib/queryClient";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface GalleryPost {
  _id?: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  images?: string[];
}

interface GalleryFormProps {
  gallery: GalleryPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  images: z.any().optional(),
});

const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

export default function GalleryForm({
  gallery,
  isOpen,
  onClose,
}: GalleryFormProps) {
  const { toast } = useToast();
  const isEditing = !!gallery?._id;

  const [existingImages, setExistingImages] = React.useState<string[]>([]);
  const [newImagePreviews, setNewImagePreviews] = React.useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "other",
      date: "",
      images: [],
    },
  });

  // Sync state when gallery prop changes
  React.useEffect(() => {
    if (gallery && isOpen) {
      setExistingImages(gallery.images || []);
      form.reset({
        title: gallery.title || "",
        description: gallery.description || "",
        category: gallery.category || "other",
        date: gallery.date ? gallery.date.split("T")[0] : "",
        images: [],
      });
    } else if (isOpen) {
      setExistingImages([]);
      form.reset({
        title: "",
        description: "",
        category: "other",
        date: "",
        images: [],
      });
    }
    setNewImagePreviews([]);
    setSelectedFiles([]);
  }, [gallery, isOpen, form]);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = gallery?._id;
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/gallery/${id}` : `/api/gallery`;

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save gallery");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: isEditing ? "Album updated successfully" : "Album created successfully",
      });
      queryClient.invalidateQueries(["gallery-all"]); // Updated to match key in GallerySection
      queryClient.invalidateQueries(["/api/gallery"]);
      onClose();
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setSelectedFiles((prev) => [...prev, ...files]);

    const previews = files.map((f) => URL.createObjectURL(f));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (path: string) => {
    setExistingImages((prev) => prev.filter((p) => p !== path));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const fd = new FormData();
    fd.append("title", values.title);
    if (values.description) fd.append("description", values.description);
    if (values.category) fd.append("category", values.category);
    if (values.date) fd.append("date", values.date);

    // Backend updateGallery expects 'existingImages' array for those we keep
    if (isEditing) {
      existingImages.forEach((img) => fd.append("existingImages", img));
    }

    // New files
    selectedFiles.forEach((file) => fd.append("images", file));

    mutation.mutate(fd);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Gallery Album" : "Create New Album"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update album details and manage photos." : "Upload multiple photos to create a new gallery album."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Album Title</FormLabel>
                      <FormControl><Input placeholder="Science Fair 2024" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-600 font-bold">Album Story (Description)</FormLabel>
                      <FormControl><Textarea placeholder="Share the beautiful story behind these moments..." className="h-32 text-base leading-relaxed" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full h-10 border rounded-md px-3 text-sm bg-white">
                            <option value="office">Office</option>
                            <option value="school">School</option>
                            <option value="college">College</option>
                            <option value="other">Other</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormLabel>Album Photos</FormLabel>
                <div className="border-2 border-dashed rounded-xl p-4 text-center bg-gray-50/50 hover:bg-gray-100/50 transition-colors relative cursor-pointer group">
                  <input
                    id="album-photos-upload"
                    name="images-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
                    <p className="text-sm font-semibold text-slate-600">Click or drag to upload photos</p>
                    <p className="text-xs text-slate-400 mt-1">Multiple files supported</p>
                  </div>
                </div>

                {/* Previews */}
                <div className="grid grid-cols-3 gap-2 mt-4 max-h-[200px] overflow-y-auto pr-1">
                  {/* Existing */}
                  {existingImages.map((img) => (
                    <div key={img} className="relative aspect-square rounded-lg overflow-hidden border bg-white group">
                      <img src={getImageUrl(img)} className="w-full h-full object-cover" alt="existing" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {/* New */}
                  {newImagePreviews.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-blue-50 group">
                      <img src={url} className="w-full h-full object-cover" alt="new" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {existingImages.length === 0 && selectedFiles.length === 0 && (
                    <div className="col-span-3 flex flex-col items-center justify-center py-6 text-slate-300 border border-dashed rounded-lg">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px] uppercase font-bold tracking-wider">No photos selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending} className="bg-blue-600 hover:bg-blue-700 w-32">
                {mutation.isPending ? "Saving..." : isEditing ? "Update Album" : "Create Album"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
