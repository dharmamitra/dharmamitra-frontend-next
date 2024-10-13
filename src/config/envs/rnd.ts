import defineConfig from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    env: "rnd",
    basePath: "/rnd",
    featureFlags: {
      search: true,
      hasTranslateExtendedOptions: true,
    },
  })
}
