import defineConfig from "../defineConfig"

export default function createLabProductionConfig() {
  return defineConfig({
    env: "lab",
    siteUrl: "https://dharmamitra.org/lab",
    basePath: "/lab",
    featureFlags: {
      search: true,
    },
  })
}
