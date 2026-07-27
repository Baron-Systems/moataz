#!/bin/bash

# Dr. Moataz App - Local Start Script
# Usage: chmod +x start.sh && ./start.sh

set -e

# ════════════════════════════════════════
# 1. Detect if we are in the parent folder
# ════════════════════════════════════════
if [ -d "my-app" ]; then
  cd my-app
fi

# ════════════════════════════════════════
# 2. Ensure Node.js 20 & npm are installed
# ════════════════════════════════════════
if command -v nvm &> /dev/null || [ -s "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm use 20 2>/dev/null || nvm install 20
fi

if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
  echo "[System] Node.js / npm not found. Installing..."
  if command -v apt &> /dev/null; then
    apt update -y && apt install -y curl
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
  elif command -v dnf &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    dnf install -y nodejs
  elif command -v apk &> /dev/null; then
    apk add --no-cache nodejs npm
  else
    echo "ERROR: Could not detect package manager. Please install Node.js 20 manually."
    exit 1
  fi
  echo "[System] Node.js $(node -v) / npm $(npm -v) installed successfully."
fi

# ════════════════════════════════════════
# 3. Configuration (change PORT here)
# ════════════════════════════════════════
PORT=5600

echo "========================================"
echo "    Dr. Moataz App - Build & Start"
echo "========================================"
echo "  Port: ${PORT}"
echo ""

# ════════════════════════════════════════
# 4. Database & Environment Setup
# ════════════════════════════════════════
DB_URL="file:./data/dev.db"

echo "[1/6] Ensuring SQLite database directory exists..."
mkdir -p data

echo "[2/6] Setting up .env file..."
if [ ! -f ".env" ]; then
  touch .env
fi

if ! grep -q "DATABASE_URL" .env; then
  echo "DATABASE_URL=\"${DB_URL}\"" >> .env
  echo "  -> Added DATABASE_URL to .env"
else
  echo "  -> DATABASE_URL already exists in .env"
fi

if ! grep -q "NEXTAUTH_SECRET" .env; then
  NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
  echo "NEXTAUTH_SECRET=\"${NEXTAUTH_SECRET}\"" >> .env
  echo "  -> Generated NEXTAUTH_SECRET in .env"
else
  echo "  -> NEXTAUTH_SECRET already exists in .env"
fi

if ! grep -q "ADMIN_USERNAME" .env; then
  echo "ADMIN_USERNAME=\"admin\"" >> .env
  echo "  -> Added default ADMIN_USERNAME to .env"
else
  echo "  -> ADMIN_USERNAME already exists in .env"
fi

if ! grep -q "ADMIN_PASSWORD" .env; then
  ADMIN_PASSWORD=$(openssl rand -base64 12 2>/dev/null || head -c 12 /dev/urandom | base64)
  echo "ADMIN_PASSWORD=\"${ADMIN_PASSWORD}\"" >> .env
  echo "  -> Generated random ADMIN_PASSWORD in .env"
else
  echo "  -> ADMIN_PASSWORD already exists in .env"
fi

if ! grep -q "DOCTOR_WHATSAPP" .env; then
  echo "DOCTOR_WHATSAPP=\"972599999999\"" >> .env
  echo "  -> Added default DOCTOR_WHATSAPP to .env"
else
  echo "  -> DOCTOR_WHATSAPP already exists in .env"
fi

# ════════════════════════════════════════
# 5. Dependencies
# ════════════════════════════════════════
echo "[3/6] Installing dependencies..."
if [ ! -d "node_modules" ]; then
  npm install
else
  echo "  -> node_modules found, skipping install"
fi

echo "[4/6] Generating Prisma client..."
npx prisma generate

# ════════════════════════════════════════
# 6. Database (apply migrations for SQLite)
# ════════════════════════════════════════
echo "[5/6] Applying database migrations..."
set +e
npx prisma migrate deploy
MIGRATE_STATUS=$?
set -e

if [ $MIGRATE_STATUS -ne 0 ]; then
  echo "  ! Migrations failed. Resetting database..."
  rm -f data/dev.db*
  npx prisma migrate reset --force --skip-generate
fi

# ════════════════════════════════════════
# 7. Build & Start
# ════════════════════════════════════════
echo "[6/6] Building Next.js..."
npm run build

# Link static files for standalone output
if [ -d ".next/standalone" ]; then
  echo "  -> Linking static files for standalone..."
  cd .next/standalone
  ln -sfn ../../public public 2>/dev/null || true
  mkdir -p .next
  ln -sfn ../../../.next/static .next/static 2>/dev/null || true
  cd ../..
fi

echo ""
echo "[6/6] Killing previous process on port ${PORT}..."
fuser -k ${PORT}/tcp -9 2>/dev/null || true
kill $(lsof -t -i :${PORT} 2>/dev/null) 2>/dev/null || true
pkill -9 -f "next start" 2>/dev/null || true
pkill -9 -f "npm start" 2>/dev/null || true
pkill -9 -f "server.js" 2>/dev/null || true
pkill -9 node 2>/dev/null || true

# Wait until the port is really free
for i in {1..10}; do
  if ! lsof -ti :${PORT} > /dev/null 2>&1; then
    break
  fi
  echo "  -> Waiting for port ${PORT} to be free... ($i)"
  sleep 1
done

echo ""
echo "========================================"
echo "  App is running!"
echo "  Local:    http://localhost:${PORT}"
echo "  Network:  http://$(hostname -I | awk '{print $1}'):${PORT}"
echo ""
echo "  Admin login:"
echo "    Username: admin"
echo "    Password: (see .env file - ADMIN_PASSWORD)"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Prefer standalone server if available, otherwise next start
if [ -f ".next/standalone/server.js" ]; then
  PORT=${PORT} node .next/standalone/server.js
else
  PORT=${PORT} ./node_modules/.bin/next start
fi
