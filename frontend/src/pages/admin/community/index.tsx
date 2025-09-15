import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import { Badge } from "../../../components/ui/badge";
import DocumentHead from "../../../components/DocumentHead";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../../components/ui/dialog";

interface CommunityStory {
  id: string;
  name: string;
  role: string;
  institution?: string;
  story: string;
  image?: string;
  approved: boolean;
  submissionDate: string;
}

export default function CommunityManagement() {
  const { toast } = useToast();
  const [viewStory, setViewStory] = useState<CommunityStory | null>(null);
  
  // Fetch community stories (including unapproved ones)
  const { data: stories = [], isLoading } = useQuery<CommunityStory[]>({
    queryKey: ['/api/cms/community-stories/all'],
    queryFn: getQueryFn({ on401: "throw" }),
     select: (rawData: any[]) =>
    Array.isArray(rawData)
      ? rawData.map((c) => ({ ...c, id: c._id }))
      : [],
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/cms/community-stories/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/community-stories/all'] });
      toast({
        title: "Story deleted",
        description: "The community story has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete community story: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async ({ id, approved }: { id: string; approved: boolean }) => {
      await apiRequest(`/api/cms/community-stories/${id}/approve`, {
        method: 'PUT',
        body: JSON.stringify({ approved }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/community-stories/all'] });
      toast({
        title: "Story updated",
        description: "The community story approval status has been updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update approval status: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const columns: DataColumn[] = [
    { key: "name", title: "Name", width: "150px" },
    { key: "role", title: "Role", width: "150px" },
    { key: "institution", title: "Institution", width: "150px" },
    { 
      key: "story", 
      title: "Story", 
      type: "longText" 
    },
    { 
      key: "submissionDate", 
      title: "Submitted", 
      type: "date",
      width: "120px",
    },
    { 
      key: "approved", 
      title: "Status", 
      width: "100px",
      formatFn: (value) => value ? 
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge> : 
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>
    },
  ];

  const handleView = (story: CommunityStory) => {
    setViewStory(story);
  };

  const handleApprove = (story: CommunityStory) => {
    approveMutation.mutate({ id: story.id, approved: true });
  };

  const handleReject = (story: CommunityStory) => {
    approveMutation.mutate({ id: story.id, approved: false });
  };

  const handleDelete = (story: CommunityStory) => {
    deleteMutation.mutate(story.id);
  };

  const closeViewDialog = () => {
    setViewStory(null);
  };

  // Custom actions for this page
  const ActionButtons = ({ story }: { story: CommunityStory }) => (
    <div className="flex space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleView(story)}
        className="size-8"
      >
        <Eye className="size-4" />
      </Button>
      
      {!story.approved && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleApprove(story)}
          className="size-8 text-green-500 hover:text-green-600 hover:bg-green-50"
        >
          <CheckCircle className="size-4" />
        </Button>
      )}
      
      {story.approved && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleReject(story)}
          className="size-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
        >
          <XCircle className="size-4" />
        </Button>
      )}
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => handleDelete(story)}
        className="size-8 text-red-500 hover:text-red-600 hover:bg-red-50"
      >
        <XCircle className="size-4" />
      </Button>
    </div>
  );

  return (
    <>
      <DocumentHead
        title="Community Stories Management - Tarcin Robotic Admin"
        description="Manage community stories for the Tarcin Robotic website."
      />
      
      <AdminLayout title="Community Stories">
        <div className="mb-6">
          <h1 className="text-xl font-semibold">Manage Community Stories</h1>
          <p className="text-muted-foreground">
            Review, approve, reject, and delete community stories submitted by users.
          </p>
        </div>

        <DataTable
          data={stories}
          columns={columns}
          onEdit={handleView}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {viewStory && (
          <Dialog open={!!viewStory} onOpenChange={closeViewDialog}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Community Story Details</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(viewStory.submissionDate).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">From</h3>
                  <p>{viewStory.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {viewStory.role}{viewStory.institution ? `, ${viewStory.institution}` : ''}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium">Story</h3>
                  <p className="whitespace-pre-line">{viewStory.story}</p>
                </div>
                
                {viewStory.image && (
                  <div>
                    <h3 className="font-medium">Image</h3>
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <img 
                        src={viewStory.image} 
                        alt={`${viewStory.name}'s story`}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium">Status</h3>
                  {viewStory.approved ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending Approval</Badge>
                  )}
                </div>
              </div>
              
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={closeViewDialog}>
                  Close
                </Button>
                
                {!viewStory.approved ? (
                  <Button
                    variant="default"
                    onClick={() => {
                      handleApprove(viewStory);
                      closeViewDialog();
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Approve Story
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    onClick={() => {
                      handleReject(viewStory);
                      closeViewDialog();
                    }}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    Reject Story
                  </Button>
                )}
                
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(viewStory);
                    closeViewDialog();
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </AdminLayout>
    </>
  );
}