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

import Cropper from "react-easy-crop";
import { Slider } from "../../../components/ui/slider"; // use any slider component you have
import { Dialog as CropDialog, DialogContent as CropContent } from "../../../components/ui/dialog";
import getCroppedImg from "../../../lib/cropImage"; // we'll add this helper




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

export default function GalleryForm({
  gallery,
  isOpen,
  onClose,
}: GalleryFormProps) {
  const { toast } = useToast();
  const isEditing = !!gallery?._id;

const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
const [crop, setCrop] = React.useState({ x: 0, y: 0 });
const [zoom, setZoom] = React.useState(1);
const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
const [showCropper, setShowCropper] = React.useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: gallery?.title || "",
      description: gallery?.description || "",
      category: gallery?.category || "other",
      date: gallery?.date ? gallery.date.split("T")[0] : "",
      images: [],
    },
  });

  // ✅ React Query Mutation for Create / Update
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const id = gallery?._id;
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/gallery/${id}` : `/api/gallery`;

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save gallery");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: isEditing
          ? "Gallery updated successfully."
          : "Gallery created successfully.",
      });
      queryClient.invalidateQueries(["/api/gallery"]);
      onClose();
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  // ✅ Handle Form Submission
  const onSubmit = (values: any) => {
    const fd = new FormData();
    fd.append("title", values.title);
    if (values.description) fd.append("description", values.description);
    if (values.category) fd.append("category", values.category);
    if (values.date) fd.append("date", values.date);

    // ✅ If editing, attach the existing ID
    if (gallery?._id) fd.append("_id", gallery._id);

    if (values.images?.length)
      Array.from(values.images).forEach((f: any) => fd.append("images", f));

    mutation.mutate(fd);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Gallery" : "Create Gallery"}</DialogTitle>
          <DialogDescription>
            Fill in details to {isEditing ? "update" : "create"} a gallery post.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter gallery title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select {...field} className="w-full border p-2 rounded bg-white">
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
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) =>
                        form.setValue("images", e.target.files as any)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
  control={form.control}
  name="images"
  render={() => (
    <FormItem>
      <FormLabel>Images</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setSelectedImage(reader.result as string);
                setShowCropper(true);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Crop Dialog */}
<CropDialog open={showCropper} onOpenChange={setShowCropper}>
  <CropContent className="sm:max-w-[600px]">
    <div className="relative w-full h-[400px] bg-gray-900">
      {selectedImage && (
        <Cropper
          image={selectedImage}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedArea) =>
            setCroppedAreaPixels(croppedArea)
          }
        />
      )}
    </div>
    <div className="p-4 flex flex-col gap-3">
      <Slider
        min={1}
        max={3}
        step={0.1}
        value={[zoom]}
        onValueChange={(val) => setZoom(val[0])}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setShowCropper(false)}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            if (!selectedImage || !croppedAreaPixels) return;
            const croppedFile = await getCroppedImg(selectedImage, croppedAreaPixels);
            form.setValue("images", [croppedFile]);
            setShowCropper(false);
          }}
        >
          Crop & Save
        </Button>
      </div>
    </div>
  </CropContent>
</CropDialog>


            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending
                  ? "Saving..."
                  : isEditing
                  ? "Update"
                  : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
