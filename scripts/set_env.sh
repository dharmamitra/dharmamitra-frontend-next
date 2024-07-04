#!/bin/bash

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Exiting script: no environment argument provided."
    exit 1
fi

echo "# maintained via scripts/set_env.sh\n" >.env

echo "NEXT_PUBLIC_APP_ENV=$ENVIRONMENT" >>.env

echo NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL=https://dharmamitra.org/api >>.env
echo NEXT_PUBLIC_DM_SEARCH_API_BASE_URL=https://dharmamitra.org/api-search >>.env
echo NEXT_PUBLIC_BN_TEMP_API_BASE_URL=https://dharmamitra.org/api-db/ >>.env

# Optional: Add other environment-specific configurations
# echo "Other configurations can be added here"

echo ".env updated for $ENVIRONMENT environment"
