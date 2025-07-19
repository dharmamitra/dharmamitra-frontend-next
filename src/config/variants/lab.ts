import { allTargetLanguages } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

export default function createLabConfig() {
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
