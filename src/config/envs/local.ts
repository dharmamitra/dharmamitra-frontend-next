import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    env: "local",
    siteUrl: "http://localhost:3000",
    featureFlags: {
      search: true,
      translateExtendedOptions: true,
    },
  })
}
