#!/usr/bin/env bash
# deploy.sh — Deploy portfolify to VPS 13.222.172.60
# Usage: ./deploy.sh [branch]
#   branch defaults to "main"
# Prerequisites on the VPS:
#   - Git repo cloned at /opt/portfolify
#   - .env file placed at /opt/portfolify/.env
#   - Docker + Docker Compose v2 installed

set -euo pipefail

VPS_HOST="13.222.172.60"
VPS_USER="${VPS_USER:-admin}"         # override with: VPS_USER=ubuntu ./deploy.sh
APP_DIR="/opt/portfolify"
BRANCH="${1:-main}"

echo "▶ Deploying branch '$BRANCH' to $VPS_USER@$VPS_HOST:$APP_DIR"

ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" bash <<REMOTE
  set -euo pipefail
  echo "📂 Entering $APP_DIR"
  cd "$APP_DIR"

  echo "🔄 Pulling latest from origin/$BRANCH"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"

  echo "🐳 Building Docker image (no-cache for clean build)"
  docker compose build --no-cache

  echo "🚀 Starting containers (detached)"
  docker compose up -d --remove-orphans

  echo "🧹 Pruning dangling images"
  docker image prune -f

  echo "✅ Deploy complete. Running containers:"
  docker compose ps
REMOTE

echo ""
echo "🎉 Deployment finished → http://13.222.172.60"
