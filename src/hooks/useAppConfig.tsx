import { useMemo } from "react"

import { DMApiTypes } from "@/api"
import appConfig from "@/config"

export default function useAppConfig() {
  return useMemo(() => {
    // it isnecessary to cast refined zod stings, but they have corresponding validation functions and should be safe
    const model = appConfig?.paramOptions
      ?.model as DMApiTypes.Schema["TranslationModel"]

    return {
      ...appConfig,
      paramOptions: {
        ...appConfig.paramOptions,
        model,
      },
    }
  }, [])
}
