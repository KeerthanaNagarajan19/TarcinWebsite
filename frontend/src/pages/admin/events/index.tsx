// src/pages/admin/events/index.tsx
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

interface EventRecord {
  _id: string;
  id: string;
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
  const [currentEvent, setCurrentEvent] = useState<EventRecord | null>(null);

  // 1) Fetch & map _id → id
  const { data: events = [], isLoading } = useQuery<EventRecord[]>({
    queryKey: ['/api/cms/events'],
    queryFn: async () => {
      const raw = await getQueryFn({ on401: "throw" })({
        queryKey: ['/api/cms/events']
      });
      return Array.isArray(raw)
        ? raw.map((e: any) => ({ ...e, id: e._id }))
        : [];
    },
  });

  // 2) Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (eventId: string) => {
      await apiRequest(`/api/cms/events/${eventId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['/api/cms/events']);
      toast({ title: "Event deleted", description: "Deleted successfully." });
    },
    onError: (err: any) => {
      toast({ title: "Error deleting event", description: err.message, variant: "destructive" });
    },
  });

  // 3) Table columns
  const columns: DataColumn[] = [
    { key: "title",      title: "Title",    type: "longText" },
    { key: "date",       title: "Date",     type: "date",     width: "120px" },
    { key: "location",   title: "Location",              width: "150px" },
    {
      key: "isUpcoming",
      title: "Status",
      width: "100px",
      formatFn: (v: boolean) =>
        v
          ? <Badge variant="outline">Upcoming</Badge>
          : <Badge variant="outline">Past</Badge>
    },
  ];

  // 4) Handlers
  const handleCreate = () => {
    setCurrentEvent(null);
    setFormOpen(true);
  };
  const handleEdit   = (evt: EventRecord) => {
    setCurrentEvent(evt);
    setFormOpen(true);
  };
  const handleDelete = (evt: EventRecord) => {
    deleteMutation.mutate(evt.id);
  };

  return (
    <>
      <DocumentHead title="Events Management" description="Admin: manage events" />

      <AdminLayout title="Events">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-semibold">Manage Events</h1>
            <p className="text-muted-foreground">Create, edit, and delete events.</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Event
          </Button>
        </div>

        <DataTable
          data={events}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {formOpen && (
          <EventForm
            event={currentEvent}
            isOpen={formOpen}
            onClose={() => {
              setFormOpen(false);
              setCurrentEvent(null);
            }}
          />
        )}
      </AdminLayout>
    </>
  );
}
