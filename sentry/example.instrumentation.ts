// src/instrumentation.ts

import * as Sentry from "@sentry/nextjs"

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Path will be correct after build-time file copy
    await import("../sentry.server.config")
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Path will be correct after build-time file copy
    await import("../sentry.edge.config")
  }
}

export const onRequestError = Sentry.captureRequestError
