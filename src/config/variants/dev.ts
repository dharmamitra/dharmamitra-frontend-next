import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig, { defaultSubPages } from "../defineConfig"

export default function createDevConfig() {
  return defineConfig({
    subPages: [...defaultSubPages, "test"],
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
