// backend/src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || '';

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('❌ MONGODB_URI is not defined in .env');
    return;
  }

  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB Connected Successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB Disconnected');
    });

    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error('❌ MongoDB initial connection error:', error);
    process.exit(1);
  }
};

