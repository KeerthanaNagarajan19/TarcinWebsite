import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

interface ProfileSectionProps {
  user: any;
  onUpload: (file: File) => void;
  onUpdateUsername: (newUsername: string) => void;
}

export default function ProfileSection({ user: initialUser, onUpload, onUpdateUsername }: ProfileSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(initialUser?.username || "");
  const [preview, setPreview] = useState<string | null>(initialUser?.profilePicture || null);

  useEffect(() => {
    if (initialUser) {
      setUsername(initialUser.username || "");
      if (initialUser.profilePicture) {
        setPreview(initialUser.profilePicture);
      }
    }
  }, [initialUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setPreview(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  const handleSaveUsername = () => {
    if (username.trim() !== "" && username !== initialUser?.username) {
      onUpdateUsername(username);
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
          onKeyDown={(e) => e.key === 'Enter' && handleSaveUsername()}
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


