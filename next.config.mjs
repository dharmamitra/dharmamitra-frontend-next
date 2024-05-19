import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const env = process.env.NEXT_PUBLIC_APP_ENV
const servedAtRoot = env === "pub"
const basePath = servedAtRoot ? undefined : "/" + env

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
}

export default withNextIntl(nextConfig)
