import createNextIntlPlugin from "next-intl/plugin"
import createMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs"

const withNextIntl = createNextIntlPlugin()

export const getBasePath = () => {
  const { NEXT_PUBLIC_BUILD_VARIANT: variant, NODE_ENV: env } = process.env
  const servedAtRoot = variant === "pub" || env === "development"
  return servedAtRoot ? undefined : "/" + variant
}

/**
 * @type {import('next').NextConfig}
 *
 * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
 * @see https://calvinf.com/blog/2023/11/10/node-js-20-yarn-4-and-next-js-on-docker/
 */
const nextConfig = {
  basePath: getBasePath(),
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_DISABLE_ESLINT === "true",
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  reactStrictMode: true,
  images: {
    // https://nextjs.org/docs/app/api-reference/components/image#configuration-options
    formats: ["image/avif", "image/webp"],
  },
}

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: { remarkPlugins: [], rehypePlugins: [] },
})

export default withSentryConfig(withNextIntl(withMDX(nextConfig)), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "dharmamitra",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
