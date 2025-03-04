// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.SENTRY_RELEASE || "unknown-release",
  environment:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BUILD_VARIANT
      : process.env.NODE_ENV,
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false, // (requires `disableLogger: true` in next.config.mjs)
})
