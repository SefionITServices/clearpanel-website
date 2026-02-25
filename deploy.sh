#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# clearPanel Website — VPS Deploy Script
# Run this on your Ubuntu VPS to install and start everything.
# Usage: bash deploy.sh <your-domain.com> <your-email@example.com>
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="${1:-}"
EMAIL="${2:-}"
APP_DIR="/opt/clearpanel-website"
REPO_URL="${REPO_URL:-}"   # Set if deploying from git, e.g. git@github.com:you/clearpanel-website.git

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

info()  { echo -e "${CYAN}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error() { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# ─── Validate args ────────────────────────────────────────────────────────────
[ -z "$DOMAIN" ]  && error "Usage: bash deploy.sh <domain> <email>\nExample: bash deploy.sh clearpanel.net admin@clearpanel.net"
[ -z "$EMAIL" ]   && error "Usage: bash deploy.sh <domain> <email>"
[ "$(id -u)" != "0" ] && error "Run as root: sudo bash deploy.sh ..."

info "Deploying clearPanel website to: $DOMAIN"

# ─── Install Dependencies ────────────────────────────────────────────────────
info "Installing Docker and Docker Compose..."
if ! command -v docker &>/dev/null; then
    apt-get update -qq
    apt-get install -y -qq curl ca-certificates gnupg
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update -qq
    apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
    systemctl enable --now docker
    ok "Docker installed"
else
    ok "Docker already installed"
fi

# ─── Create app directory ─────────────────────────────────────────────────────
info "Setting up app directory at $APP_DIR..."
mkdir -p "$APP_DIR"

if [ -n "$REPO_URL" ]; then
    if [ -d "$APP_DIR/.git" ]; then
        info "Pulling latest code..."
        cd "$APP_DIR" && git pull
    else
        info "Cloning repository..."
        git clone "$REPO_URL" "$APP_DIR"
        cd "$APP_DIR"
    fi
else
    # Deployed by copying files directly
    cd "$APP_DIR"
fi

# ─── Configure domain in nginx ───────────────────────────────────────────────
info "Configuring nginx for domain: $DOMAIN"
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/conf.d/app-bootstrap.conf
sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/conf.d/app.conf.ssl

# ─── Create .env.production if not present ───────────────────────────────────
if [ ! -f .env.production ]; then
    warn ".env.production not found — creating from example..."
    cp .env.production.example .env.production
    JWT_SECRET=$(openssl rand -hex 32)
    sed -i "s/your_random_64_char_hex_here/$JWT_SECRET/" .env.production
    warn "⚠️  Edit .env.production and fill in your Stripe keys before going live:"
    warn "   nano $APP_DIR/.env.production"
fi

# ─── Generate dhparam (skip if exists) ───────────────────────────────────────
if [ ! -f nginx/dhparam.pem ]; then
    info "Generating DH parameters (this takes ~1 min)..."
    openssl dhparam -out nginx/dhparam.pem 2048
    ok "dhparam.pem generated"
fi

# ─── Bootstrap: start with HTTP only to obtain SSL certs ─────────────────────
info "Starting services in HTTP-only mode for SSL certificate issuance..."
cp nginx/conf.d/app-bootstrap.conf nginx/conf.d/app.conf 2>/dev/null || true
docker compose up -d --build

info "Waiting for nginx to be ready..."
sleep 8

# ─── Issue SSL certificate ───────────────────────────────────────────────────
info "Issuing Let's Encrypt certificate for $DOMAIN..."
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN" || warn "SSL cert issuance failed — make sure DNS points to this server"

# ─── Switch to full HTTPS config ─────────────────────────────────────────────
if [ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ] || \
   docker compose run --rm certbot certificates 2>&1 | grep -q "$DOMAIN"; then
    info "SSL cert found — switching to HTTPS config..."
    cp nginx/conf.d/app.conf.ssl nginx/conf.d/app.conf
    docker compose exec nginx nginx -s reload || docker compose restart nginx
    ok "HTTPS enabled!"
else
    warn "SSL cert not found. Running in HTTP mode. Re-run after fixing DNS:"
    warn "  bash setup-ssl.sh $DOMAIN $EMAIL"
fi

# ─── Final status ─────────────────────────────────────────────────────────────
echo ""
ok "────────────────────────────────────────────"
ok "  clearPanel website deployed!"
ok "  URL:   https://$DOMAIN"
ok "  Admin: https://$DOMAIN/admin/login"
ok ""
ok "  Next steps:"
ok "  1. Edit .env.production with real Stripe keys"
ok "  2. docker compose restart app"
ok "  3. Change admin password at /admin/users"
ok "────────────────────────────────────────────"
