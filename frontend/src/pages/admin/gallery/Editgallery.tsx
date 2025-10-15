import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "../../../components/admin/AdminLayout";
import { useToast } from "../../../hooks/use-toast";

type GalleryPost = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  images: string[];
  date?: string;
  createdAt: string;
};

const fetchGalleryById = async (id: string) => {
  const res = await axios.get(`/api/gallery/${id}`);
  return res.data.data as GalleryPost;
};

const EditGallery: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["gallery-item", id],
    queryFn: () => fetchGalleryById(id!),
    enabled: !!id,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [date, setDate] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [toRemove, setToRemove] = useState<Set<string>>(new Set());
  const [newFiles, setNewFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!data) return;
    setTitle(data.title || "");
    setDescription(data.description || "");
    setCategory(data.category || "other");
    const d = data.date || data.createdAt;
    try {
      setDate(d ? new Date(d).toISOString().slice(0, 10) : "");
    } catch {
      setDate("");
    }
    setExistingImages(Array.isArray(data.images) ? data.images : []);
    setToRemove(new Set());
    setNewFiles([]);
  }, [data]);

  const toggleRemove = (img: string) => {
    setToRemove((prev) => {
      const next = new Set(prev);
      if (next.has(img)) next.delete(img);
      else next.add(img);
      return next;
    });
  };

  const updateMutation = useMutation({
    mutationFn: async (fd: FormData) => {
      // DO NOT set Content-Type; browser will set boundary
      const res = await axios.put(`/api/gallery/${id}`, fd);
      return res.data;
    },
    onSuccess: () => {
      toast?.success?.("Gallery updated");
      qc.invalidateQueries({ queryKey: ["gallery-admin"] });
      qc.invalidateQueries({ queryKey: ["gallery-all"] });
      qc.invalidateQueries({ queryKey: ["gallery-item", id] });
      navigate("/admin/gallery");
    },
    onError: (err: any) => {
      toast?.error?.(err?.response?.data?.message || "Update failed");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!title?.trim()) {
      toast?.error?.("Title is required");
      return;
    }

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description || "");
    fd.append("category", category);
    if (date) fd.append("date", date);

    newFiles.forEach((f) => fd.append("images", f));
    Array.from(toRemove).forEach((img) => fd.append("removeImages", img));

    try {
      await updateMutation.mutateAsync(fd);
      // success handled in onSuccess
    } catch {
      // error handled in onError
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="p-4">Loading…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Edit Gallery Post</h2>
          <button
            onClick={() => navigate("/admin/gallery")}
            className="text-sm px-3 py-1 bg-gray-100 rounded"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
              <option value="office">Office</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Existing Images (click to toggle remove)</label>
            <div className="flex flex-wrap gap-3">
              {existingImages.length === 0 && <div className="text-sm text-gray-600">No existing images</div>}
              {existingImages.map((img) => {
                const removed = toRemove.has(img);
                return (
                  <div key={img} className="relative">
                    <img
                      src={img}
                      alt=""
                      className={`w-32 h-24 object-cover rounded border ${removed ? "opacity-40 grayscale" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleRemove(img)}
                      className={`absolute left-1 top-1 text-xs px-2 py-1 rounded ${removed ? "bg-red-600 text-white" : "bg-white text-gray-800 shadow"}`}
                    >
                      {removed ? "Keep" : "Remove"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Add Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
              className="w-full p-2 border rounded"
            />
            {newFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-700">{newFiles.length} new file(s) selected</div>
            )}
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={updateMutation.isLoading} className="bg-blue-600 text-white px-4 py-2 rounded">
              {updateMutation.isLoading ? "Saving…" : "Save Changes"}
            </button>
            <button type="button" onClick={() => navigate("/admin/gallery")} className="px-4 py-2 rounded border">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditGallery;