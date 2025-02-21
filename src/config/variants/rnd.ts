import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

export default function createRNDConfig() {
  return defineConfig({
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
      hasNexus: true,
      hasFeedbackWidget: true,
    },
  })
}
