// // backend/src/routes/authRoutes.ts
// import { Router, Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import User from '../models/User';
// import { authenticate } from '../middleware/auth';

// dotenv.config();
// const router = Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// // 🔐 POST /api/auth/login
// router.post('/login', async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//   const token = jwt.sign(
//     { id: user._id, username: user.username, role: user.role },
//     JWT_SECRET,
//     { expiresIn: '1d' }
//   );

//   res.json({
//     token,
//     user: {
//       id: user._id,
//       username: user.username,
//       role: user.role,
//     },
//   });
// });

// // ✅ GET /api/auth/me → Validate token and return user info
// router.get('/me', authenticate, (req: Request, res: Response) => {
//   const user = (req as any).user;
//   res.json(user); // already set by middleware
// });

// import { updateProfile, uploadProfilePicture } from '../controllers/userController';
// import { uploadProfile } from '../middleware/upload';

// // Update user profile
// router.put('/profile', authenticate, updateProfile);

// // Upload profile picture
// router.post('/profile/picture', authenticate, uploadProfile.single('profilePicture'), uploadProfilePicture);


// export default router;


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

// ✅ Return user info
router.get("/me", authenticate, (req: Request, res: Response) => {
  res.json((req as any).user);
});

// ✅ Update profile
router.put("/profile", authenticate, updateProfile);

// ✅ Upload profile picture
router.post("/profile/picture", authenticate, uploadProfile.single("profilePicture"), uploadProfilePicture);
router.put("/profile/username", authenticate, updateUsername);

export default router;
