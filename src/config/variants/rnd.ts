import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

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
