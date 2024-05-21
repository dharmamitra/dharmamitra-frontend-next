import { useMemo } from "react"

import appConfig from "@/config"
import { TranslationModel } from "@/utils/api/types"

export default function useAppConfig() {
  return useMemo(() => {
    // it isnecessary to cast refined zod stings, but they have corresponding validation functions and should be safe
    const model = appConfig?.paramOptions?.model as TranslationModel

    return {
      ...appConfig,
      paramOptions: {
        ...appConfig.paramOptions,
        model,
      },
    }
  }, [])
}
