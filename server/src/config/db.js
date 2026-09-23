import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lenscraft_db';

    // Connection event listeners for production reliability
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB connection lost. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✓ MongoDB reconnected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`✗ MongoDB Runtime Error: ${err.message}`);
    });

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 20,
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error(`  Please verify your MONGODB_URI in your environment variables.`);
    if (process.env.NODE_ENV === 'production') {
      console.error('  Fatal error in production: exiting process.');
      process.exit(1);
    }
  }
};
