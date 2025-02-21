#!/bin/bash

BUILD_VARIANT=$1

if [ -z "$BUILD_VARIANT" ]; then
    echo "Exiting script: no BUILD_VARIANT argument provided."
    exit 1
fi

echo "updating project for $BUILD_VARIANT build variant"

echo "# maintained via scripts/set_build_variant.sh\n" >.env

echo "NEXT_PUBLIC_BUILD_VARIANT=$BUILD_VARIANT" >>.env

echo NEXT_PUBLIC_DM_TRANSLATION_API_BASE_URL=https://dharmamitra.org/api >>.env
echo NEXT_PUBLIC_DM_SEARCH_API_BASE_URL=https://dharmamitra.org/api-search >>.env
echo NEXT_PUBLIC_BN_V2_API_BASE_URL=https://dharmamitra.org/api-db/ >>.env

echo NEXT_PUBLIC_DHARAMNEXUS_URL=https://dharmamitra.org/nexus >>.env

echo NEXT_PUBLIC_SENTRY_DSN=https://b871842ffbdbe38e2a7af465fc135c60@o4508779444568064.ingest.de.sentry.io/4508802717843536 >>.env


# Optional: Add other variant-specific configurations
# echo "Other configurations can be added here"



if [ "$BUILD_VARIANT" == "pub" ]; then
    echo "NEXT_PUBLIC_SENTRY_ENABLED=" >>.env
    rm -f sentry.client.config.ts
    rm -f sentry.server.config.ts
    rm -f sentry.edge.config.ts
    rm -f src/instrumentation.ts
    rm -f src/app/global-error.tsx
    echo "removed Sentry files for $BUILD_VARIANT variant"
else
    echo "NEXT_PUBLIC_SENTRY_ENABLED=true" >>.env
    cp example.sentry.client.config.ts sentry.client.config.ts
    cp example.sentry.server.config.ts sentry.server.config.ts
    cp example.sentry.edge.config.ts sentry.edge.config.ts
    cp example.instrumentation.ts src/instrumentation.ts
    cp example.global-error.tsx src/app/global-error.tsx
    echo "copied Sentry files for $BUILD_VARIANT variant"
fi

echo "updated $BUILD_VARIANT build variant .env variables"


