#!/usr/bin/env sh
set -eu
./scripts/wait-for-db.sh
echo "Executando migrations..."
npx prisma migrate deploy
echo "Executando seed idempotente..."
npx prisma db seed
echo "Iniciando Next.js..."
npm start
