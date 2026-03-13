// import { Request, Response } from 'express';
// import User from '../models/User';
// import bcrypt from 'bcryptjs';

// // Update user profile
// export const updateProfile = async (req: Request, res: Response) => {
//   const { username, currentPassword, newPassword } = req.body;
//   const userId = (req as any).user.id;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the current password is correct
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid current password' });
//     }

//     // Update username if provided and check for uniqueness
//     if (username && username !== user.username) {
//       const existingUser = await User.findOne({ username });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already taken' });
//       }
//       user.username = username;
//     }

//     // Update password if a non-empty new password is provided
//     if (newPassword && newPassword.length > 0) {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(newPassword, salt);
//     }

//     await user.save();

//     res.json({ message: 'Profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Upload profile picture
// export const uploadProfilePicture = async (req: Request, res: Response) => {
//   const userId = (req as any).user.id;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     if (req.file) {
//       user.profilePicture = `/uploads/profile/${req.file.filename}`;
//       await user.save();
//       res.json({ profilePicture: user.profilePicture });
//     } else {
//       res.status(400).json({ message: 'No file uploaded' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };


import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Update user profile (username + password)
export const updateProfile = async (req: Request, res: Response) => {
  const { username, currentPassword, newPassword } = req.body;
  const userId = (req as any).user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Update username if different
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = username;
    }

    // Update password if provided
    if (newPassword && newPassword.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    // Generate a new token in case username was updated
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        profilePicture: user.profilePicture
      },
      token
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Upload profile picture
export const uploadProfilePicture = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.file) {
      user.profilePicture = `/uploads/profile/${req.file.filename}`;
      await user.save();
      res.json({ profilePicture: user.profilePicture });
    } else {
      res.status(400).json({ message: "No file uploaded" });
    }
  } catch (error) {
    console.error("Profile picture update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// controllers/authController.ts



export const updateUsername = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new token with the updated username
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Username updated successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (err) {
    console.error("Update username error", err);
    res.status(500).json({ message: "Server error" });
  }
};

