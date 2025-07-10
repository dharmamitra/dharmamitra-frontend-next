#!/bin/bash

BUILD_VARIANT=$1

if [ -z "$BUILD_VARIANT" ]; then
    echo "Exiting script: no BUILD_VARIANT argument provided."
    exit 1
fi

echo "# maintained via scripts/set_build_variant.sh\n" >.env

echo "NEXT_PUBLIC_BUILD_VARIANT=$BUILD_VARIANT" >>.env

echo NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL=https://dharmamitra.org/api >>.env
echo NEXT_PUBLIC_DM_SEARCH_API_BASE_URL=https://dharmamitra.org/api-search >>.env
echo NEXT_PUBLIC_BN_V2_API_BASE_URL=https://dharmamitra.org/api-db/ >>.env

echo NEXT_PUBLIC_SENTRY_DSN=https://b871842ffbdbe38e2a7af465fc135c60@o4508779444568064.ingest.de.sentry.io/4508802717843536 >>.env

# Optional: Add other variant-specific configurations
# echo "Other configurations can be added here"

echo ".env updated for $BUILD_VARIANT environment"
