import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig, { allPages } from "../defineConfig"

export default function createDevConfig() {
  return defineConfig({
    subPages: [...allPages].filter((page) => !/(home|guide)/.test(page)),
    siteUrl: "http://localhost:3000",
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
      hasNexus: true,
      hasFeedbackWidget: true,
    },
  })
}
