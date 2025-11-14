import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig, { defaultSubPages } from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    subPages: [...defaultSubPages, "test"],
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasFeedbackWidget: true,
    },
  })
}
