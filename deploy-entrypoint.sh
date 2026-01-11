#!/bin/sh

echo "Waiting for database to be ready..."
# Opsional: Jika database lambat start, bisa pakai wait-for-it
# tapi biasanya Prisma cukup pintar untuk retry koneksi.

echo "🚀 Running Migrations..."
npx prisma migrate deploy

echo "🌱 Running Seed..."
# Jalankan seed. Pastikan script seed Anda aman dijalankan berulang kali.
node seed seed-superadmin 

echo "🔥 Starting Next.js..."
# Perintah asli untuk menjalankan nextjs
npm start