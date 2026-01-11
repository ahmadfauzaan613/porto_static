# ===== BASE =====
FROM node:20-alpine AS base
# Install library pendukung untuk Prisma di Alpine
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# ===== DEPENDENCIES =====
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ===== BUILD =====
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate
RUN npm run build

# ===== RUNTIME =====
FROM node:20-alpine AS runner
WORKDIR /app
# Install openssl lagi di runner
RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# ⬇️ PENTING: Copy folder prisma agar bisa migrate di production
COPY --from=builder /app/prisma ./prisma

# Copy custom script untuk start (opsional, lihat langkah 3)
COPY deploy-entrypoint.sh ./deploy-entrypoint.sh
RUN chmod +x ./deploy-entrypoint.sh

EXPOSE 3000
# Kita ganti CMD jadi pakai script entrypoint
CMD ["./deploy-entrypoint.sh"]