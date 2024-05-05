#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

# Next.js builds with .env.production
echo "NEXT_PUBLIC_APP_ENV=$ENVIRONMENT" >.env.production

if [ "$ENVIRONMENT" = "local" || "$ENVIRONMENT" = "dm" ]; then
    echo "NEXT_PUBLIC_BASE_PATH=" >>.env.production
fi

if [ "$ENVIRONMENT" = "lab" ]; then
    echo "NEXT_PUBLIC_BASE_PATH=/lab" >>.env.production
fi

if [ "$ENVIRONMENT" = "kp" ]; then
    echo "NEXT_PUBLIC_BASE_PATH=/kp" >>.env.production
fi

echo NEXT_PUBLIC_DM_API_BASE_URL=https://dharmamitra.org/api >>.env.production
# Optional: Add other environment-specific configurations
# echo "Other configurations can be added here"

echo ".env.production updated for $ENVIRONMENT environment"
