#!/bin/sh
set -e

echo "🚀 clearPanel Website starting..."

# Run Prisma migrations (creates DB if not exists)
echo "📦 Running database migrations..."
npx prisma migrate deploy --schema=/app/prisma/schema.prisma

# Seed first admin user if DB is empty (uses env vars or defaults)
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@clearpanel.net}"
ADMIN_NAME="${ADMIN_NAME:-Admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-changeme123!}"

USER_COUNT=$(node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.adminUser.count().then(n => { console.log(n); p.\$disconnect(); });
" 2>/dev/null || echo "0")

if [ "$USER_COUNT" = "0" ]; then
    echo "🌱 Seeding first admin user: $ADMIN_EMAIL"
    node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const p = new PrismaClient();
bcrypt.hash('${ADMIN_PASSWORD}', 12).then(hash =>
    p.adminUser.create({ data: { email: '${ADMIN_EMAIL}', name: '${ADMIN_NAME}', password: hash, role: 'superadmin' } })
).then(u => { console.log('Admin created:', u.email); p.\$disconnect(); })
.catch(e => { console.error(e); p.\$disconnect(); });
" 2>/dev/null || echo "⚠️  Could not seed admin (may already exist)"
else
    echo "✅ Database has $USER_COUNT admin user(s), skipping seed"
fi

echo "✅ Starting Next.js server..."
exec "$@"
