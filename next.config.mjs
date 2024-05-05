import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

// TODO: the plan is to switch to using subdomains
// and basePath config should be removed at that time.
const env = process.env.NEXT_PUBLIC_APP_ENV
const basePath = env && env.length > 0 ? "/" + env : undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
}

export default withNextIntl(nextConfig)
