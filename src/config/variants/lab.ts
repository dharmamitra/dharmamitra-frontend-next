import defineConfig from "../defineConfig"

import { allTargetLanguages } from "@/utils/api/translation/params"

export default function createLabConfig() {
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
