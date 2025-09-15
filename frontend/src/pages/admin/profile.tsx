import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

export default function ProfileSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  // ✅ Load user from backend when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUsername(data.username);
        if (data.profilePicture) {
          setPreview(`/uploads/${data.profilePicture}`);
        }
        localStorage.setItem("user", JSON.stringify(data)); // keep in sync
      })
      .catch((err) => console.error("Failed to load user", err));
  }, []);

  // 📌 Upload profile picture
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // local preview

    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("/auth/profile/picture", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      const updatedUser = { ...user, profilePicture: data.profilePicture };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setPreview(`/uploads/${data.profilePicture}`);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  // 📌 Update username
  const handleSaveUsername = async () => {
    if (username.trim() === "" || username === user?.username) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch("/auth/profile/username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Username update failed");
      const data = await res.json();

      const updatedUser = { ...user, username: data.username };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error updating username", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Profile Picture */}
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-700 text-xl">
            {username?.charAt(0).toUpperCase() || "A"}
          </div>
        )}

        {/* Camera overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
          <Camera className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {/* Username update */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-md px-3 py-1 text-center"
        />
        <button
          onClick={handleSaveUsername}
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
