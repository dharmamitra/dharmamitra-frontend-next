import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

export const getBasePath = () => {
  const env = process.env.NEXT_PUBLIC_APP_ENV
  const servedAtRoot = env === "pub" || env === "local"
  return servedAtRoot ? "" : "/" + env
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
  webpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.devtool = "hidden-source-map"
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_DISABLE_ESLINT === "true",
  },
}

export default withNextIntl(nextConfig)
