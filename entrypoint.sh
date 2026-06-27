#!/bin/sh
set -e

# Init DB if missing
if [ ! -f /app/data/dev.db ]; then
  echo "Initializing database..."
  npx prisma db push --accept-data-loss
fi

# Start server
echo "Starting server..."
exec node server.js
