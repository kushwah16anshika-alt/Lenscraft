# 🚀 LensCraft Platform — Production Deployment Guide

This guide walks you through deploying the **LensCraft** Creative Marketplace platform to production. LensCraft is fully configured to support either **Single-Service Fullstack Monolith** (easiest) or **Decoupled Architecture** (Vercel Frontend + Render/Railway Backend).

---

## 📋 Table of Contents
1. [Prerequisites: MongoDB Atlas & Cloudinary](#1-prerequisites)
2. [Option A: Deploy to Render (Recommended — 1-Click Monolith)](#option-a-deploy-to-render-fullstack-monolith)
3. [Option B: Decoupled Deploy (Vercel Frontend + Render Backend)](#option-b-decoupled-deploy-vercel--render)
4. [Option C: Docker & Docker Compose](#option-c-docker--docker-compose)
5. [Option D: Railway Deployment](#option-d-railway-deployment)
6. [Database Seeding in Production](#database-seeding-in-production)
7. [Environment Variables Reference](#environment-variables-reference)

---

## 1. Prerequisites

### A. MongoDB Atlas (Cloud Database)
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a **Free Shared Cluster (M0)**.
3. Under **Security → Database Access**, create a database user (e.g. `lenscraft_admin` with password).
4. Under **Security → Network Access**, add IP `0.0.0.0/0` (Allow Access from Anywhere).
5. Click **Connect → Drivers (Node.js)** and copy your connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/lenscraft_db?retryWrites=true&w=majority
   ```

### B. Cloudinary (Optional Media Storage)
1. Sign up at [cloudinary.com](https://cloudinary.com).
2. From the Dashboard, copy:
   - `Cloud Name`
   - `API Key`
   - `API Secret`
*(Note: If omitted, the app will continue to function seamlessly using default fallback media URLs).*

---

## Option A: Deploy to Render (Fullstack Monolith)
*Best for lowest complexity and zero CORS headaches.*

1. Push your repository to **GitHub** or **GitLab**.
2. Go to [dashboard.render.com](https://dashboard.render.com) and click **New + → Web Service**.
3. Connect your repository.
4. Set the following settings:
   - **Name**: `lenscraft-platform`
   - **Region**: Closest to your users (e.g., Oregon, Frankfurt, Singapore)
   - **Branch**: `main`
   - **Root Directory**: *(leave blank)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add **Environment Variables**:
   | Variable | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production optimizers & static serving |
   | `PORT` | `5000` | Port for Express server |
   | `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
   | `JWT_SECRET` | *(generate random 32+ char string)* | Secure secret for user sessions |
   | `JWT_EXPIRES_IN` | `7d` | Token lifetime |
   | `CLIENT_URL` | `*` | Or your custom domain |
   | `CLOUDINARY_CLOUD_NAME` | *(optional)* | Cloudinary cloud name |
   | `CLOUDINARY_API_KEY` | *(optional)* | Cloudinary API key |
   | `CLOUDINARY_API_SECRET` | *(optional)* | Cloudinary API secret |

6. Click **Create Web Service**.
7. Once deployed, visit your Render URL (e.g., `https://lenscraft-platform.onrender.com`).

---

## Option B: Decoupled Deploy (Vercel + Render)

### Step 1: Deploy Backend to Render
1. Create a **New Web Service** on Render pointing to your repo.
2. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variables**:
     - `NODE_ENV` = `production`
     - `MONGODB_URI` = `mongodb+srv://...`
     - `JWT_SECRET` = *(random secret)*
     - `CLIENT_URL` = `https://your-app.vercel.app` *(or `*` during setup)*
3. Copy your backend URL: e.g. `https://lenscraft-api.onrender.com`.

### Step 2: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
2. Import your Git repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
4. Add **Environment Variables**:
   | Variable | Value |
   | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://lenscraft-api.onrender.com/api` |
   | `VITE_APP_NAME` | `LensCraft` |
5. Click **Deploy**. Vercel will build and serve your frontend with automated edge caching and instant page loads.

---

## Option C: Docker & Docker Compose

### Run locally or on VPS with Docker Compose
To run the full stack (Node app + MongoDB) with zero dependencies:
```bash
# Build and run containers
docker compose up --build -d

# Check running status
docker compose ps

# View application logs
docker compose logs -f app
```
The application will be live at `http://localhost:5000`.

### Deploy standalone Docker container
```bash
docker build -t lenscraft:latest .
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGODB_URI="mongodb+srv://..." \
  -e JWT_SECRET="your_secure_secret" \
  lenscraft:latest
```

---

## Option D: Railway Deployment

1. Go to [railway.app](https://railway.app) and create a **New Project**.
2. Click **Deploy from GitHub repo**.
3. Railway automatically detects the root `package.json` scripts:
   - Build: `npm run build`
   - Start: `npm start`
4. Add your environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).
5. Under Settings → **Networking**, click **Generate Domain**.

---

## Database Seeding in Production

To seed initial sample creators, categories, and marketplace reviews:

### Remotely from your local machine:
```bash
# In the server directory, temporarily point MONGODB_URI to Atlas:
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/lenscraft_db" npm run seed
```

### Or inside Render / Railway Web Shell:
```bash
npm run seed
```

---

## 🔍 Verification & Health Check

LensCraft includes a built-in health diagnostic endpoint. After deployment, check:
```http
GET https://your-domain.com/api/health
```
Expected Response:
```json
{
  "success": true,
  "message": "LensCraft API is healthy",
  "data": {
    "status": "online",
    "timestamp": "2026-09-23T17:15:00.000Z",
    "uptime": 124.5,
    "database": "connected",
    "environment": "production"
  }
}
```

---

## 🛡️ Production Security Checklist

- [x] **Helmet HTTP Headers**: XSS, clickjacking, sniff protection enabled.
- [x] **Gzip/Brotli Compression**: High throughput compression for all assets and JSON responses.
- [x] **Rate Limiting**: Protection against API spamming (500 req/15m) and authentication brute-force (30 req/15m).
- [x] **Reverse Proxy Trust**: Enabled `trust proxy: 1` for Render, Vercel, and Cloudflare.
- [x] **SPA 404 Fallback**: `_redirects` and `vercel.json` rewrite rules avoid 404s on browser reloads.
- [x] **Dynamic Route Splitting**: `React.lazy` chunks ensure fastest First Contentful Paint (FCP).
- [x] **Frontend Error Boundary**: Graceful error handling prevents blank screen crashes.
