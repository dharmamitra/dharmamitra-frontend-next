import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
      hasNexus: true,
    },
  })
}
