#!/bin/bash

# تحديد Node.js 20 (مطلوب من Next.js 16)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# Build
echo "Building..."
npm run build

# ربط الملفات الثابتة
echo "Linking static files..."
cd .next/standalone
ln -sfn ../../public public 2>/dev/null
mkdir -p .next
ln -sfn ../../static .next/static 2>/dev/null

echo "Done! Run: node .next/standalone/server.js"
