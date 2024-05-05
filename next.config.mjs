import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

// Environment base path set in scripts/set_env.sh.
// TODO: the plan is to switch to using subdomains
// and basePath config should be removed at that time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
}

export default withNextIntl(nextConfig)
