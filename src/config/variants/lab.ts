import defineConfig from "../defineConfig"

export default function createLabConfig() {
  return defineConfig({
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
    },
  })
}
