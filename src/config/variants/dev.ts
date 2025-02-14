import defineConfig from "../defineConfig"

export default function createDevConfig() {
  return defineConfig({
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
      hasNexus: true,
      hasFeedbackWidget: true,
    },
  })
}
