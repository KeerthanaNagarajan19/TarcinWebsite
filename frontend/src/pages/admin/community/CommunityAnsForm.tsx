import React, { useEffect, useState } from "react";
import axios from "axios";

interface ForumPost {
  _id: string;
  name: string;
  question: string;
  answer?: string;
}

const AdminForumPanel: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const fetchPosts = async () => {
    const res = await axios.get("/api/forum");
    setPosts(res.data);
  };

  const handleAnswer = async (id: string) => {
    const answer = answers[id];
    if (!answer) return;
    await axios.put(`/api/forum/${id}`, { answer });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Admin Q&A Panel</h2>
      {posts.map((post) => (
        <div key={post._id} className="mb-6 bg-gray-100 p-4 rounded shadow">
          <p><strong>{post.name}</strong>: {post.question}</p>
          {post.answer ? (
            <p className="mt-2 text-green-700"><strong>Answered:</strong> {post.answer}</p>
          ) : (
            <div className="mt-2">
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Type your answer..."
                value={answers[post._id] || ""}
                onChange={(e) => setAnswers({ ...answers, [post._id]: e.target.value })}
              />
              <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => handleAnswer(post._id)}
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminForumPanel;
