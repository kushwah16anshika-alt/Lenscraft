import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './src/config/db.js';
import { configureCloudinary } from './src/config/cloudinary.js';
import apiRoutes from './src/routes/index.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

// Setup file paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect Database & Cloudinary
connectDB();
configureCloudinary();

const app = express();

// Trust reverse proxy (Required for Render, Railway, Vercel, Cloudflare, Heroku)
app.set('trust proxy', 1);

// Security Headers (Helmet)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false, // Allows flexible CDN font/image assets
  })
);

// Gzip / Deflate Compression
app.use(compression());

// Parse dynamic CORS allowed origins
const parseAllowedOrigins = () => {
  const rawOrigins = process.env.CLIENT_URL;
  if (!rawOrigins || rawOrigins === '*') return ['*'];
  return rawOrigins.split(',').map((url) => url.trim().replace(/\/$/, ''));
};

const allowedOrigins = parseAllowedOrigins();

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server, same-origin SPA)
      if (!origin) return callback(null, true);

      // Check if origin matches allowed list or wildcard
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.netlify.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }

      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      return callback(new Error(`CORS policy does not allow access from ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body Parsing Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in 15 minutes.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 login/register requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// Apply rate limits
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Mount API Routes
app.use('/api', apiRoutes);

// Static Asset Serving & SPA Routing (Production Monolith Mode)
const clientDistPath = path.resolve(__dirname, '../client/dist');
const hasClientDist = fs.existsSync(clientDistPath);

if (hasClientDist) {
  // Serve static client build assets
  app.use(express.static(clientDistPath, { maxAge: '1d' }));

  // All other non-API routes return the React index.html
  app.get('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Base Root Info Route (API-only mode)
  app.get('/', (req, res) => {
    res.json({
      name: 'LensCraft Creative Marketplace API',
      version: '1.0.0',
      status: 'healthy',
      environment: process.env.NODE_ENV || 'development',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        professionals: '/api/professionals',
        bookings: '/api/bookings',
        services: '/api/services',
      },
    });
  });
}

// Error handling middlewares (must be after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`✨ LensCraft Server Active on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📦 Serving Client: ${hasClientDist ? 'YES (Monolith /client/dist)' : 'NO (API Only)'}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});

// Graceful Shutdown Handlers
const handleGracefulShutdown = (signal) => {
  console.log(`\n[${signal}] Received. Shutting down gracefully...`);
  server.close(async () => {
    console.log('✓ HTTP server closed.');
    try {
      await mongoose.connection.close(false);
      console.log('✓ MongoDB connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('✗ Error during MongoDB disconnect:', err);
      process.exit(1);
    }
  });

  // Force close after 10s timeout
  setTimeout(() => {
    console.error('⚠️ Forcefully terminating process after timeout.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

export default app;
