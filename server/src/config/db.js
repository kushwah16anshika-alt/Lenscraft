import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Read MONGODB_URI or MONGO_URI (support both common naming conventions)
    const rawUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    const uri = rawUri ? rawUri.trim().replace(/^["']|["']$/g, '') : null;

    if (!uri && process.env.NODE_ENV === 'production') {
      console.error('\n✗ MongoDB Configuration Error: Neither MONGODB_URI nor MONGO_URI is set.');
      console.error('👉 Please configure MONGODB_URI in your Render Dashboard:');
      console.error('   1. Open dashboard.render.com -> Select your Web Service');
      console.error('   2. Go to Environment tab');
      console.error('   3. Add Variable:');
      console.error('      Key:   MONGODB_URI');
      console.error('      Value: mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/lenscraft_db?retryWrites=true&w=majority\n');
      process.exit(1);
    }

    const connectionString = uri || 'mongodb://127.0.0.1:27017/lenscraft_db';

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

    const conn = await mongoose.connect(connectionString, {
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
