import defineConfig from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
      hasNexus: true,
    },
  })
}
