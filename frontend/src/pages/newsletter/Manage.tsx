import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NewsletterManage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const email = params.get("email") || "";
  const token = params.get("token") || "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleUnsubscribe = async () => {
    setStatus("loading");
    try {
      await axios.post("/api/newsletter/unsubscribe", { email, token });
      setStatus("success");
      setMessage("You have been unsubscribed from our newsletter.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.response?.data?.message || "An error occurred.");
    }
  };

  if (!email || !token) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-2">Invalid Link</h2>
        <p>This newsletter management link is invalid or incomplete.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Manage Newsletter Subscription</h2>
      <p className="mb-4">Email: <b>{email}</b></p>
      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={handleUnsubscribe}
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" ? "Processing..." : "Unsubscribe"}
      </button>
      {status === "success" && (
        <p className="mt-4 text-green-600">{message}</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">{message}</p>
      )}
    </div>
  );
};

export default NewsletterManage;