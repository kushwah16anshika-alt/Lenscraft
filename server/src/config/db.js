import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db';
    const conn = await mongoose.connect(uri);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error(`  Please ensure MongoDB is running or check your MONGODB_URI in server/.env`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
