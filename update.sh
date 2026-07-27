#!/bin/bash

# Dr. Moataz App - Auto Update & Deploy Script
# Usage: chmod +x update.sh && ./update.sh

set -e

# ════════════════════════════════════════
# 1. Detect if we are in the parent folder
# ════════════════════════════════════════
if [ -d "my-app" ]; then
  cd my-app
fi

# ════════════════════════════════════════
# 2. Detect Node.js 20 (required by Next.js 16)
# ════════════════════════════════════════
if command -v nvm &> /dev/null || [ -s "$HOME/.nvm/nvm.sh" ]; then
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm use 20 2>/dev/null || nvm install 20
fi

# ════════════════════════════════════════
# 3. Configuration (change PORT here)
# ════════════════════════════════════════
PORT=5600
PM2_NAME="dr-moataz-app"

echo "========================================"
echo "    Dr. Moataz App - Update & Deploy"
echo "========================================"
echo "  Port: ${PORT}"
echo ""

# ════════════════════════════════════════
# 4. Pull latest code from GitHub
# ════════════════════════════════════════
echo "[1/7] Pulling latest updates from GitHub..."
git pull origin dev

# ════════════════════════════════════════
# 5. Install dependencies
# ════════════════════════════════════════
echo "[2/7] Installing dependencies..."
npm install

# ════════════════════════════════════════
# 6. Database & Environment setup
# ════════════════════════════════════════
DB_URL="file:./data/dev.db"

echo "[3/7] Ensuring .env file exists..."
if [ ! -f ".env" ]; then
  touch .env
fi

if ! grep -q "DATABASE_URL" .env; then
  echo "DATABASE_URL=\"${DB_URL}\"" >> .env
  echo "  -> Added DATABASE_URL to .env"
fi

if ! grep -q "NEXTAUTH_SECRET" .env; then
  NEXTAUTH_SECRET=$(openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64)
  echo "NEXTAUTH_SECRET=\"${NEXTAUTH_SECRET}\"" >> .env
  echo "  -> Generated NEXTAUTH_SECRET in .env"
fi

if ! grep -q "ADMIN_USERNAME" .env; then
  echo "ADMIN_USERNAME=\"admin\"" >> .env
  echo "  -> Added default ADMIN_USERNAME to .env"
fi

if ! grep -q "ADMIN_PASSWORD" .env; then
  ADMIN_PASSWORD=$(openssl rand -base64 12 2>/dev/null || head -c 12 /dev/urandom | base64)
  echo "ADMIN_PASSWORD=\"${ADMIN_PASSWORD}\"" >> .env
  echo "  -> Generated random ADMIN_PASSWORD in .env"
fi

if ! grep -q "DOCTOR_WHATSAPP" .env; then
  echo "DOCTOR_WHATSAPP=\"972599999999\"" >> .env
  echo "  -> Added default DOCTOR_WHATSAPP to .env"
fi

# Ensure data directory exists
mkdir -p data

echo "[4/7] Generating Prisma client..."
npx prisma generate

echo "[5/7] Applying database migrations..."
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
# 7. Build the app
# ════════════════════════════════════════
echo "[6/7] Building Next.js..."
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

# ════════════════════════════════════════
# 8. Restart server (PM2 or nohup)
# ════════════════════════════════════════
echo "[7/7] Restarting server..."

if command -v pm2 &> /dev/null; then
  echo "  -> PM2 detected, restarting via pm2..."
  if pm2 list | grep -q "${PM2_NAME}"; then
    pm2 restart "${PM2_NAME}"
  else
    # Prefer standalone server if available
    if [ -f ".next/standalone/server.js" ]; then
      pm2 start .next/standalone/server.js --name "${PM2_NAME}" -- --port ${PORT}
    else
      pm2 start npm --name "${PM2_NAME}" -- start -- --port ${PORT}
    fi
  fi
  pm2 save
  echo ""
  echo "========================================"
  echo "  Deployed via PM2!"
  echo "  URL: http://$(hostname -I | awk '{print $1}'):${PORT}"
  echo "  Logs: pm2 logs ${PM2_NAME}"
  echo "========================================"
else
  echo "  -> PM2 not found, using nohup + background process..."

  # Kill any previous process on the port
  echo "  -> Killing previous process on port ${PORT}..."
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

  # Start in background via nohup
  if [ -f ".next/standalone/server.js" ]; then
    nohup env PORT=${PORT} node .next/standalone/server.js > app.log 2>&1 &
  else
    nohup env PORT=${PORT} ./node_modules/.bin/next start > app.log 2>&1 &
  fi
  NEW_PID=$!
  sleep 2

  echo ""
  echo "========================================"
  echo "  Deployed via nohup!"
  echo "  PID: ${NEW_PID}"
  echo "  URL: http://$(hostname -I | awk '{print $1}'):${PORT}"
  echo "  Log: tail -f app.log"
  echo "========================================"

  # Health check
  echo ""
  echo "[Health Check] Waiting for server to start..."
  sleep 3

  HEALTH_URL="http://localhost:${PORT}"
  if curl -s -o /dev/null -w "%{http_code}" "${HEALTH_URL}" | grep -q "200\|307\|308"; then
    echo "  -> Health check PASSED: ${HEALTH_URL}"
  else
    echo "  -> Health check WARNING: could not reach ${HEALTH_URL}"
    echo "  -> Check logs: tail -f app.log"
  fi
fi

echo ""
echo "Done!"
