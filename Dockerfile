# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV DATABASE_URL="file:./data/dev.db"
RUN npx prisma db push
RUN npx prisma generate
RUN npm run build

# Production stage - copy full node_modules from builder
FROM node:20-alpine AS runner
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

# Copy FULL node_modules from builder (includes prisma + all deps)
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

# Init DB if missing, then start server
CMD ["sh", "-c", "test -f /app/data/dev.db || npx prisma db push --accept-data-loss && node server.js"]
