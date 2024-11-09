import defineConfig from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    env: "rnd",
    basePath: "/rnd",
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
    },
  })
}
