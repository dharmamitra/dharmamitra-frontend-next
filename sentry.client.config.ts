// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

import appConfig from "@/config"
import { colours } from "@/utils/theme/colours"

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  release: process.env.SENTRY_RELEASE || "unknown-release",
  environment:
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BUILD_VARIANT
      : process.env.NODE_ENV,
  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    ...(appConfig.featureFlags.hasFeedbackWidget
      ? [
          Sentry.feedbackIntegration({
            // see: https://docs.sentry.io/platforms/javascript/user-feedback/configuration/
            // TODO: i18n?
            colorScheme: "light",
            themeLight: {
              accentBackground: colours.secondary,
            },
            triggerLabel: "Give feedback",
            triggerAriaLabel: "Give feedback",
            formTitle: "We value your feedback!",
            nameLabel: "Name",
            namePlaceholder: "Your Name",
            messagePlaceholder: "What would you like to let us know?",
            submitButtonLabel: "Send",
            successMessageText: "Sent! Thank you!",
          }),
        ]
      : []),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false, // (requires `disableLogger: true` in next.config.mjs)
})
