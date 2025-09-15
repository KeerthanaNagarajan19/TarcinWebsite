import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";
import DocumentHead from "../../components/shared/DocumentHead";

const fetchSubscribers = async () => {
  const res = await axios.get("/api/newsletter/admin/list");
  return res.data.list;
};

const deleteSubscriber = async (id: string) => {
  await axios.delete(`/api/newsletter/admin/${id}`);
};

const NewsletterSubscribers: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: subscribers = [], isLoading } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: fetchSubscribers,
  });

  const mutation = useMutation({
    mutationFn: deleteSubscriber,
    onSuccess: () => queryClient.invalidateQueries(["newsletter-subscribers"]),
  });

  return (
    <AdminLayout title="Newsletter Subscribers">
      <DocumentHead title="Newsletter Subscribers" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : subscribers.length === 0 ? (
          <p>No subscribers found.</p>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Confirmed</th>
                <th className="border px-2 py-1">Preferences</th>
                <th className="border px-2 py-1">Subscribed At</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub: any) => (
                <tr key={sub.id}>
                  <td className="border px-2 py-1">{sub.email}</td>
                  <td className="border px-2 py-1">{sub.confirmed ? "Yes" : "No"}</td>
                  <td className="border px-2 py-1">
                    {sub.preferences
                      ? Object.entries(sub.preferences)
                          .map(([k, v]) => `${k}: ${v ? "✔️" : "❌"}`)
                          .join(", ")
                      : "—"}
                  </td>
                  <td className="border px-2 py-1">
                    {sub.subscribedAt
                      ? new Date(sub.subscribedAt).toLocaleString()
                      : "—"}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => mutation.mutate(sub.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default NewsletterSubscribers;