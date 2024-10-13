import defineConfig from "../defineConfig"

export default function createLabConfig() {
  return defineConfig({
    env: "lab",
    basePath: "/lab",
    siteUrl: "https://dharmamitra.org/lab",
    featureFlags: {
      hasTranslateExtendedOptions: true,
    },
  })
}
