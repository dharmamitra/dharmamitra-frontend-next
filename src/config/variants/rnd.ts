import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig, { defaultSubPages } from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    subPages: [...defaultSubPages, "test"],
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
      hasNexus: true,
      hasFeedbackWidget: true,
      hasOCR: true,
    },
  })
}
