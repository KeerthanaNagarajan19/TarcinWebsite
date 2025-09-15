import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import CareerForm from "./CareerForm";
import { Badge } from "../../../components/ui/badge";
import DocumentHead from "../../../components/DocumentHead";

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  applicationLink?: string;
  postedDate: string;
}

export default function CareersManagement() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentCareer, setCurrentCareer] = useState<Career | null>(null);
  
  // Fetch careers
const { data: careers = [], isLoading } = useQuery<Career[]>({
  queryKey: ['/api/cms/careers'],
  queryFn: getQueryFn({ on401: "throw" }),
  select: (rawData: any[]) =>
    Array.isArray(rawData)
      ? rawData.map((c) => ({ ...c, id: c._id }))
      : [],
});


  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/cms/careers/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/careers'] });
      toast({
        title: "Job listing deleted",
        description: "The job listing has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete job listing: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const columns: DataColumn[] = [
    { key: "title", title: "Job Title", type: "longText" },
    { key: "department", title: "Department", width: "150px" },
    { key: "location", title: "Location", width: "150px" },
    { 
      key: "postedDate", 
      title: "Posted On", 
      type: "date",
      width: "120px",
    },
    { 
      key: "isActive", 
      title: "Status", 
      width: "100px",
      formatFn: (value) => value ? 
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge> : 
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>
    },
  ];

  const handleCreate = () => {
    setCurrentCareer(null);
    setFormOpen(true);
  };

  const handleEdit = (career: Career) => {
    setCurrentCareer(career);
    setFormOpen(true);
  };

  const handleDelete = (career: Career) => {
    deleteMutation.mutate(career.id);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setCurrentCareer(null);
  };

  return (
    <>
      <DocumentHead
        title="Careers Management - Tarcin Robotic Admin"
        description="Manage job listings for the Tarcin Robotic website."
      />
      
      <AdminLayout title="Careers">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Manage Job Listings</h1>
            <p className="text-muted-foreground">
              Create, edit, and delete job listings for the website.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Job Listing
          </Button>
        </div>

        <DataTable
          data={careers}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {formOpen && (
          <CareerForm
            career={currentCareer}
            isOpen={formOpen}
            onClose={handleFormClose}
          />
        )}
      </AdminLayout>
    </>
  );
}