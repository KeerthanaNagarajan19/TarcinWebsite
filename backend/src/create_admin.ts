// src/scripts/createAdmin.ts
import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User';


const mongo_uri = "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/official-website-db?retryWrites=true&w=majority";
if (!mongo_uri) {
  throw new Error("MONGO_URI not found in .env");
}
async function createAdmin() {
  await mongoose.connect(mongo_uri!);

  const existing = await User.findOne({ username: 'sandhiya' });
  if (existing) {
    console.log('Admin user already exists');
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = new User({
    username: 'sandhiya',
    password: hashedPassword,
    role: 'admin',
  });

  await user.save();
  console.log('✅ Admin user created successfully');
  process.exit();
}

createAdmin().catch((err) => {
  console.error('❌ Failed to create admin user:', err);
  process.exit(1);
});
