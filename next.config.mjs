import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const envBasePaths = {
  "dm-production": "/dmnext",
  "dm-staging": "/dmnext",
  "kj-production": "/dmnext",
  "kj-staging": "/dmnext",
  local: "/dmnext",
  "lab-production": "/dmnext",
  "lab-staging": "/dmnext",
}

const appEnv = process.env.NEXT_PUBLIC_APP_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: envBasePaths[appEnv],
}

export default withNextIntl(nextConfig)
