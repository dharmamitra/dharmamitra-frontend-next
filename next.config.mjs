import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

// TODO: site delivery is due to be switched to subdomains
// remove basePath config when ready
const envBasePaths = {
  dm: "/dmnext",
  kp: "/dmnext",
  local: "/dmnext",
  lab: "/dmnext",
}

const appEnv = process.env.NEXT_PUBLIC_APP_ENV

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: envBasePaths[appEnv],
}

export default withNextIntl(nextConfig)
