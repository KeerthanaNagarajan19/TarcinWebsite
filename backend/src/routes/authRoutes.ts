
import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import { authenticate } from "../middleware/auth";
import { updateProfile, uploadProfilePicture } from "../controllers/userController";
import { uploadProfile } from "../middleware/upload";
import { updateUsername } from "../controllers/userController";

dotenv.config();
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

// 🔐 Login
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role,
    },
  });
});

// ✅ Return full user info (including profilePicture) from DB
router.get("/me", authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update profile
router.put("/profile", authenticate, updateProfile);

// ✅ Upload profile picture
router.post("/profile/picture", authenticate, uploadProfile.single("profilePicture"), uploadProfilePicture);
router.put("/profile/username", authenticate, updateUsername);

export default router;
