import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import { configureCloudinary } from './src/config/cloudinary.js';
import apiRoutes from './src/routes/index.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect Database & Cloudinary
connectDB();
configureCloudinary();

const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    name: 'LensCraft Creative Marketplace API',
    version: '1.0.0',
    status: 'running',
    docs: '/api/health',
  });
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ LensCraft Express Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});
