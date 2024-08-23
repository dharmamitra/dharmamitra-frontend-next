import { useMemo } from "react"

import appConfig from "@/config"

export default function useAppConfig() {
  return useMemo(() => {
    return {
      ...appConfig,
      customParamOptions: {
        ...appConfig.customParamOptions,
      },
    }
  }, [])
}
