import defineConfig, { defaultSubPages } from "../defineConfig"

import { allTargetLanguages } from "@/utils/api/translation/params"

export default function createDevConfig() {
  return defineConfig({
    subPages: [...defaultSubPages, "test"],
    siteUrl: "http://localhost:3000",
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasFeedbackWidget: true,
    },
  })
}
