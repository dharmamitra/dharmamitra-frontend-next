import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

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
