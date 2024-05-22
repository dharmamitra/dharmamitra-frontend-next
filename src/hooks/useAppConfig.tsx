import { useMemo } from "react"

import { DMApi } from "@/api"
import appConfig from "@/config"

export default function useAppConfig() {
  return useMemo(() => {
    // it isnecessary to cast refined zod stings, but they have corresponding validation functions and should be safe
    const model = appConfig?.paramOptions
      ?.model as DMApi.Schema["TranslationModel"]

    return {
      ...appConfig,
      paramOptions: {
        ...appConfig.paramOptions,
        model,
      },
    }
  }, [])
}
