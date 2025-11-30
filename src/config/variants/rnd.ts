import defineConfig from "../defineConfig"

import { allTargetLanguages } from "@/utils/api/translation/params"

export default function createRNDConfig() {
  return defineConfig({
    customParamOptions: {
      targetLanguages: allTargetLanguages,
    },
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasFeedbackWidget: true,
    },
  })
}
