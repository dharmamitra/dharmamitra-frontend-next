import defineConfig, { allPages } from "../defineConfig"

export default function createDevConfig() {
  return defineConfig({
    subPages: [...allPages].filter((page) => !/(home|guide)/.test(page)),
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
      hasNexus: true,
      hasFeedbackWidget: true,
    },
  })
}
