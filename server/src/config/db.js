import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lenscraft_db');
    console.log(`✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    // If not in test or development fallback, we log clearly
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
