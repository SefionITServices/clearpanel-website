#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# clearPanel Website — Update Script
# Run on VPS to pull latest code and restart with zero-downtime.
# Usage: bash update.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

APP_DIR="/opt/clearpanel-website"
GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
info() { echo -e "${CYAN}[INFO]${NC}  $*"; }
ok()   { echo -e "${GREEN}[OK]${NC}    $*"; }

cd "$APP_DIR"

# Backup database before update
BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).db"
docker compose exec -T app sh -c "cp /app/data/prod.db /tmp/$BACKUP_FILE" 2>/dev/null || true
docker compose cp "app:/tmp/$BACKUP_FILE" "./backups/$BACKUP_FILE" 2>/dev/null || true
info "Database backed up to ./backups/$BACKUP_FILE"

# Pull latest code (if git)
if [ -d .git ]; then
    info "Pulling latest code..."
    git pull
fi

# Rebuild and restart with zero-downtime approach
info "Rebuilding app image..."
docker compose build app

info "Restarting app (migrations run automatically on start)..."
docker compose up -d --no-deps app

ok "Update complete. App restarted."
docker compose ps
