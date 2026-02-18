#!/bin/bash
#
# Start both the local Strapi CMS and the marketing website pointing at it.
# Ctrl+C stops both servers.
#

CMS_DIR="$(cd "$(dirname "$0")/../../clickhouse-website/cms" 2>/dev/null && pwd)"
SITE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$CMS_DIR" ]; then
  echo "Error: CMS directory not found at $CMS_DIR"
  echo "Expected: ../clickhouse-website/cms/ relative to marketing-website/"
  exit 1
fi

# Point the website at the local CMS
sed -i '' 's|STRAPI_API_URL=.*|STRAPI_API_URL=http://localhost:1337|' "$SITE_DIR/.env.local"
echo "STRAPI_API_URL → http://localhost:1337"
echo ""

cleanup() {
  echo ""
  echo "Shutting down..."
  kill $CMS_PID $SITE_PID 2>/dev/null
  wait $CMS_PID $SITE_PID 2>/dev/null
  # Restore remote CMS
  sed -i '' 's|STRAPI_API_URL=.*|STRAPI_API_URL=https://cms.clickhouse-dev.com:1337|' "$SITE_DIR/.env.local"
  echo "STRAPI_API_URL → restored to remote"
  exit 0
}

trap cleanup INT TERM

# Start CMS
echo "Starting Strapi CMS (port 1337)..."
(cd "$CMS_DIR" && npm run develop) &
CMS_PID=$!

# Wait for CMS to be ready before starting the website
echo "Waiting for CMS to be ready..."
until curl -s -o /dev/null http://localhost:1337; do
  sleep 2
  # Bail out if the CMS process died
  if ! kill -0 $CMS_PID 2>/dev/null; then
    echo "Error: CMS process exited unexpectedly"
    exit 1
  fi
done
echo "CMS is ready."
echo ""

# Start website
echo "Starting marketing website (port 3005)..."
(cd "$SITE_DIR" && yarn dev) &
SITE_PID=$!

wait
