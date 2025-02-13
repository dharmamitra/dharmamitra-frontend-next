import createNextIntlPlugin from "next-intl/plugin"
import createMDX from "@next/mdx"
import { withSentryConfig } from "@sentry/nextjs"

const withNextIntl = createNextIntlPlugin()

const getBasePath = () => {
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
  productionBrowserSourceMaps: true,
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

/**
 * @see https://github.com/getsentry/sentry-webpack-plugin#options
 * @see https://www.npmjs.com/package/@sentry/webpack-plugin
 * @see https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
 */
const sentryConfig = {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
  tunnelRoute: "/monitoring-tunnel",
  hideSourceMaps: true,
  disableLogger: false,
  sourcemaps: {
    disable: false,
    deleteSourcemapsAfterUpload: true,
  },
}

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: { remarkPlugins: [], rehypePlugins: [] },
})

export default withSentryConfig(withNextIntl(withMDX(nextConfig)), sentryConfig)
