# ==========================================
# Multi-stage Production Dockerfile for LensCraft
# ==========================================

# 1. Build Client Assets
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# 2. Install Production Server Dependencies
FROM node:20-alpine AS server-deps
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production

# 3. Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

# Install non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy server code and production node_modules
COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/ ./server/

# Copy built client static assets
COPY --from=client-builder /app/client/dist ./client/dist

# Set permissions
USER nodejs

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server/server.js"]
