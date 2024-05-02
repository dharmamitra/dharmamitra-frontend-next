#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: $0 <environment>"
    exit 1
fi

# Next.js builds with .env.production
echo "NEXT_PUBLIC_APP_ENV=$ENVIRONMENT" >.env.production

# Optional: Add other environment-specific configurations
# echo "Other configurations can be added here"

echo ".env.production updated with NEXT_PUBLIC_APP_ENV=$ENVIRONMENT"
