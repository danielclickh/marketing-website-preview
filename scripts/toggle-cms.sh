#!/bin/bash
#
# Toggle STRAPI_API_URL between remote CMS and local CMS in .env.local
#

ENV_FILE="$(dirname "$0")/../.env.local"
REMOTE="https://cms.clickhouse-dev.com:1337"
LOCAL="http://localhost:1337"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env.local not found at $ENV_FILE"
  exit 1
fi

CURRENT=$(grep '^STRAPI_API_URL=' "$ENV_FILE" | cut -d'=' -f2-)

if [ "$CURRENT" = "$LOCAL" ]; then
  sed -i '' "s|STRAPI_API_URL=$LOCAL|STRAPI_API_URL=$REMOTE|" "$ENV_FILE"
  echo "Switched to REMOTE CMS: $REMOTE"
else
  sed -i '' "s|STRAPI_API_URL=$CURRENT|STRAPI_API_URL=$LOCAL|" "$ENV_FILE"
  echo "Switched to LOCAL CMS: $LOCAL"
fi

echo ""
echo "Restart the dev server for changes to take effect."
