import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

export const getBasePath = () => {
  const env = process.env.NEXT_PUBLIC_APP_ENV
  const servedAtRoot = env === "pub" || env === "local"
  return servedAtRoot ? "" : "/" + env
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: getBasePath(),
}

export default withNextIntl(nextConfig)
