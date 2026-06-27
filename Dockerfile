# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV DATABASE_URL="file:./data/dev.db"
RUN mkdir -p /app/data
RUN npx prisma db push
RUN npx prisma generate
RUN npm run build

# Production stage - full node image for fast prisma install
FROM node:20 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL="file:./data/dev.db"

RUN mkdir -p /app/data

# Copy standalone output
COPY --from=builder /app/.next/standalone ./

# Copy public assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Copy prisma files for db commands
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install prisma CLI (fast on full node image with prebuilt binaries)
RUN npm install prisma --no-save

EXPOSE 3000

# Init DB if missing, then start server
CMD ["sh", "-c", "test -f /app/data/dev.db || npx prisma db push --accept-data-loss && node server.js"]
