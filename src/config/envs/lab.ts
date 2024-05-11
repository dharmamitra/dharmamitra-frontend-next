import defineConfig from "../defineConfig"

export default function createLabConfig() {
  return defineConfig({
    env: "lab",
    siteUrl: "https://dharmamitra.org/lab",
    basePath: "/lab",
    featureFlags: {
      translateExtendedOptions: true,
    },
  })
}
