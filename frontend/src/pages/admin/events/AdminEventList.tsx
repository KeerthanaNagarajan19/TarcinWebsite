// src/pages/admin/events/index.tsx (EventsManagement)
import React, { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Button } from "../../../components/ui/button";
import { DataTable, DataColumn } from "../../../components/admin/DataTable";
import { Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import EventForm from "./EventForm";
import { Badge } from "../../../components/ui/badge";
import DocumentHead from "../../../components/DocumentHead";

interface Event {
  _id: string;     // <-- Mongo’s ObjectId
  id: string;      // <-- we’ll map this
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  registrationLink?: string;
  image?: string;
  isUpcoming: boolean;
}

export default function EventsManagement() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  // 1) Fetch & map _id → id
  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/api/cms/events'],
    queryFn: async () => {
      const raw = await getQueryFn({ on401: "throw" })
      return Array.isArray(raw)
        ? raw.map((e: any) => ({ ...e, id: e._id }))
        : [];
    },
  });

  // 2) Delete mutation uses real `id` 
  const deleteMutation = useMutation({
    mutationFn: async (eventId: string) => {
      await apiRequest(`/api/cms/events/${eventId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/cms/events']);
      toast({ title: "Event deleted", description: "Deleted successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const columns: DataColumn[] = [
    { key: "title", title: "Title", type: "longText" },
    { key: "date", title: "Date", type: "date", width: "120px" },
    { key: "location", title: "Location", width: "150px" },
    {
      key: "isUpcoming",
      title: "Status",
      width: "100px",
      formatFn: v =>
        v
          ? <Badge variant="outline">Upcoming</Badge>
          : <Badge variant="outline">Past</Badge>
    },
  ];

  // 3) Handler now always has a valid id
  const handleDelete = (evt: Event) => {
    const realId = evt.id || evt._id;
    if (!realId) {
      toast({ title: "Error", description: "Missing event ID", variant: "destructive" });
      return;
    }
    deleteMutation.mutate(realId);
  };

  return (
    <>
      <DocumentHead title="Manage Events" description="Admin events panel" />
      <AdminLayout title="Events">
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Manage Events</h1>
            <p className="text-muted-foreground">Create, edit, delete events.</p>
          </div>
          <Button onClick={() => { setCurrentEvent(null); setFormOpen(true); }}>
            <Plus className="mr-2" /> New Event
          </Button>
        </div>

        <DataTable
          data={events}
          columns={columns}
          onEdit={e => { setCurrentEvent(e); setFormOpen(true); }}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {formOpen && (
          <EventForm
            event={currentEvent}
            isOpen={formOpen}
            onClose={() => { setFormOpen(false); setCurrentEvent(null); }}
          />
        )}
      </AdminLayout>
    </>
  );
}
